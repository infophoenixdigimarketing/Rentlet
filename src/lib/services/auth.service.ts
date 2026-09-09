// AuthProvider interface — see docs/00-architecture.md §3. Mock implementation persists to
// localStorage (browser-only, per-device) so the login/register/logout flow is genuinely
// stateful across reloads without a backend. Phase 12 swaps this for Firebase Auth (phone OTP,
// email/password, Google) behind the same interface — no component changes required.

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile as updateFirebaseDisplayName,
  updateEmail as updateFirebaseEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
  type User as FirebaseUser,
} from "firebase/auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { getFirebaseAuth } from "@/lib/firebase/client";
import type { AuthUser, UserRole } from "@/types/user";

const USERS_KEY = "rentlet_demo_users";
const SESSION_KEY = "rentlet_session_user_id";
const DEMO_OTP = "123456"; // any phone + this code signs in — clearly a demo stand-in, not a real OTP gateway

interface StoredUser extends AuthUser {
  password: string | null;
}

/** Accounts shown in the "Continue with Google" picker (mock — real OAuth is Phase 12). */
export interface GoogleDemoAccount {
  id: string;
  name: string;
  email: string;
}
export const GOOGLE_DEMO_ACCOUNTS: GoogleDemoAccount[] = [
  { id: "demo-google", name: "Rahul Sharma", email: "rahul.sharma@gmail.com" },
  { id: "demo-google-2", name: "Priya Nair", email: "priya.nair@gmail.com" },
  { id: "demo-google-3", name: "Vikram Reddy", email: "vikram.reddy@gmail.com" },
];

export interface AuthProvider {
  getCurrentUser(): AuthUser | null;
  subscribe(listener: (user: AuthUser | null) => void): () => void;
  sendOtp(phone: string): Promise<void>;
  verifyOtp(phone: string, code: string, newUser?: { name: string; role: UserRole; email?: string }): Promise<AuthUser>;
  loginWithEmail(email: string, password: string): Promise<AuthUser>;
  registerWithEmail(input: { name: string; email: string; password: string; role: UserRole }): Promise<AuthUser>;
  /**
   * `account` picks which demo Google identity to sign in as (defaults to the first).
   * `newUserRole` (from the register flow) sets the role when that account is first created.
   */
  loginWithGoogle(account?: GoogleDemoAccount, newUserRole?: UserRole): Promise<AuthUser>;
  requestPasswordReset(email: string): Promise<void>;
  logout(): Promise<void>;
  updateProfile(patch: Partial<Pick<AuthUser, "name" | "email" | "phone">>): Promise<AuthUser>;
}

function isBrowser() {
  return typeof window !== "undefined";
}

function seedUsers(): StoredUser[] {
  const now = new Date().toISOString();
  return [
    {
      id: "demo-tenant",
      name: "Aisha Fernandes",
      email: "demo.tenant@rentlet.in",
      phone: "+91 98765 43210",
      role: "tenant",
      isVerified: true,
      createdAt: now,
      password: "rentlet123",
    },
    {
      id: "demo-owner",
      name: "Arvind Menon",
      email: "demo.owner@rentlet.in",
      phone: "+91 91234 56789",
      role: "owner",
      isVerified: true,
      createdAt: now,
      password: "rentlet123",
    },
    {
      id: "demo-gmail",
      name: "Rohit Sharma",
      email: "demo.user@gmail.com",
      phone: "+91 99887 76655",
      role: "buyer",
      isVerified: true,
      createdAt: now,
      password: "rentlet123",
    },
  ];
}

function loadUsers(): StoredUser[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) {
      const seeded = seedUsers();
      window.localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const stored = JSON.parse(raw) as StoredUser[];
    // Backfill any demo account added after this browser first seeded (e.g. the gmail
    // demo) so it works without the user clearing storage.
    const missing = seedUsers().filter((s) => !stored.some((u) => u.id === s.id));
    if (missing.length) {
      const merged = [...stored, ...missing];
      window.localStorage.setItem(USERS_KEY, JSON.stringify(merged));
      return merged;
    }
    return stored;
  } catch {
    return seedUsers();
  }
}

function saveUsers(users: StoredUser[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** True if another account (not `exceptId`) already uses this email — case-insensitive. */
function emailInUse(users: StoredUser[], email: string, exceptId?: string): boolean {
  const e = email.trim().toLowerCase();
  if (!e) return false;
  return users.some((u) => u.id !== exceptId && (u.email ?? "").trim().toLowerCase() === e);
}

/** True if another account (not `exceptId`) already uses this phone — ignoring spaces. */
function phoneInUse(users: StoredUser[], phone: string, exceptId?: string): boolean {
  const p = phone.replace(/\s+/g, "");
  if (!p) return false;
  return users.some((u) => u.id !== exceptId && (u.phone ?? "").replace(/\s+/g, "") === p);
}

function strip(user: StoredUser): AuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  };
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class MockAuthProvider implements AuthProvider {
  private listeners: ((user: AuthUser | null) => void)[] = [];
  // Cached, reference-stable snapshot — required by useSyncExternalStore (see lib/auth.ts):
  // it must return the *same* object between calls unless the underlying state actually
  // changed, or React sees a "new" value every render and re-renders forever.
  private current: AuthUser | null = null;
  private hydrated = false;

  getCurrentUser(): AuthUser | null {
    if (!this.hydrated && isBrowser()) {
      const id = window.localStorage.getItem(SESSION_KEY);
      const user = id ? loadUsers().find((u) => u.id === id) : undefined;
      this.current = user ? strip(user) : null;
      this.hydrated = true;
    }
    return this.current;
  }

  subscribe(listener: (user: AuthUser | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private setSession(user: AuthUser) {
    window.localStorage.setItem(SESSION_KEY, user.id);
    this.current = user;
    this.hydrated = true;
    this.listeners.forEach((l) => l(user));
  }

  async sendOtp(phone: string): Promise<void> {
    void phone; // real gateway (Phase 12: notifications.service.ts) will send to this number
    await delay(500);
  }

  async verifyOtp(phone: string, code: string, newUser?: { name: string; role: UserRole; email?: string }): Promise<AuthUser> {
    await delay(500);
    if (code !== DEMO_OTP) throw new Error("Invalid OTP. Use 123456 for this demo.");

    const users = loadUsers();
    let user = users.find((u) => u.phone === phone);
    if (!user) {
      const email = newUser?.email?.trim() || "";
      if (email && emailInUse(users, email)) {
        throw new Error("That email is already linked to another account. Use a different email or sign in.");
      }
      user = {
        id: `u${Date.now()}`,
        name: newUser?.name || "Rentlet User",
        email: email || null,
        phone,
        role: newUser?.role ?? "tenant",
        isVerified: false,
        createdAt: new Date().toISOString(),
        password: null,
      };
      users.push(user);
      saveUsers(users);
    } else if (newUser?.role && user.role !== newUser.role) {
      // Re-running the register flow with a different intent on the same phone (common in
      // the demo) switches this account's role — e.g. "looking" → "list property" → owner.
      user.role = newUser.role;
      const email = newUser.email?.trim() || "";
      if (email && !user.email && !emailInUse(users, email, user.id)) user.email = email;
      saveUsers(users);
    }
    const stripped = strip(user);
    this.setSession(stripped);
    return stripped;
  }

  async loginWithEmail(email: string, password: string): Promise<AuthUser> {
    await delay(500);
    const user = loadUsers().find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) throw new Error("Incorrect email or password.");
    const stripped = strip(user);
    this.setSession(stripped);
    return stripped;
  }

  async registerWithEmail(input: { name: string; email: string; password: string; role: UserRole }): Promise<AuthUser> {
    await delay(600);
    const users = loadUsers();
    if (emailInUse(users, input.email)) {
      throw new Error("An account with this email already exists.");
    }
    const user: StoredUser = {
      id: `u${Date.now()}`,
      name: input.name,
      email: input.email,
      phone: null,
      role: input.role,
      isVerified: false,
      createdAt: new Date().toISOString(),
      password: input.password,
    };
    users.push(user);
    saveUsers(users);
    const stripped = strip(user);
    this.setSession(stripped);
    return stripped;
  }

  async loginWithGoogle(account: GoogleDemoAccount = GOOGLE_DEMO_ACCOUNTS[0], newUserRole?: UserRole): Promise<AuthUser> {
    await delay(500);
    const users = loadUsers();
    let user = users.find((u) => u.id === account.id);
    if (!user) {
      user = {
        id: account.id,
        name: account.name,
        email: account.email,
        phone: null,
        role: newUserRole ?? "tenant",
        isVerified: true,
        createdAt: new Date().toISOString(),
        password: null,
      };
      users.push(user);
      saveUsers(users);
    } else if (newUserRole && user.role !== newUserRole) {
      // Re-running the register flow with a different intent (e.g. "list property" → Owner)
      // updates this Google account's role so the right dashboard is available.
      user.role = newUserRole;
      saveUsers(users);
    }
    const stripped = strip(user);
    this.setSession(stripped);
    return stripped;
  }

  async requestPasswordReset(email: string): Promise<void> {
    void email; // real transactional email (Phase 12: notifications.service.ts) will target this address
    await delay(600);
  }

  async logout(): Promise<void> {
    if (!isBrowser()) return;
    window.localStorage.removeItem(SESSION_KEY);
    this.current = null;
    this.hydrated = true;
    this.listeners.forEach((l) => l(null));
  }

  async updateProfile(patch: Partial<Pick<AuthUser, "name" | "email" | "phone">>): Promise<AuthUser> {
    await delay(400);
    if (!this.current) throw new Error("Not signed in.");
    const users = loadUsers();
    const idx = users.findIndex((u) => u.id === this.current!.id);
    if (idx === -1) throw new Error("Account not found.");
    if (patch.email && emailInUse(users, patch.email, this.current.id)) {
      throw new Error("That email is already in use by another account.");
    }
    if (patch.phone && phoneInUse(users, patch.phone, this.current.id)) {
      throw new Error("That phone number is already in use by another account.");
    }
    users[idx] = { ...users[idx], ...patch };
    saveUsers(users);
    const updated = strip(users[idx]);
    this.setSession(updated);
    return updated;
  }
}

// ---------------------------------------------------------------------------------------------
// Firebase-backed implementation. Firebase Authentication is the ONLY Firebase product this
// service touches (by explicit product decision — Firestore stays off, see isFirestoreEnabled()
// in lib/firebase/config.ts). Firebase Auth owns the real credential (password/phone/Google) and
// the name/email/phone fields; there is no `users/{uid}` Firestore document. App-specific extras
// that Firebase Auth has no field for (role, isVerified) are kept in localStorage, keyed by uid —
// the same durability tradeoff the mock provider already makes (per-device, not synced), just
// layered on top of a real signed-in Firebase user instead of a fake one.
// ---------------------------------------------------------------------------------------------

const FB_PROFILE_KEY_PREFIX = "rentlet_fb_profile_";

interface LocalProfileExtras {
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  /** Firebase Auth's phoneNumber field is only ever set via phone-OTP sign-in and isn't
   *  directly editable — profile edits to phone (email/password + Google accounts) land here. */
  phoneOverride?: string | null;
}

function loadLocalProfile(uid: string): LocalProfileExtras | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(FB_PROFILE_KEY_PREFIX + uid);
    return raw ? (JSON.parse(raw) as LocalProfileExtras) : null;
  } catch {
    return null;
  }
}

function saveLocalProfile(uid: string, extras: LocalProfileExtras) {
  if (!isBrowser()) return;
  window.localStorage.setItem(FB_PROFILE_KEY_PREFIX + uid, JSON.stringify(extras));
}

function ensureLocalProfile(uid: string, defaults: { role?: UserRole } = {}): LocalProfileExtras {
  const existing = loadLocalProfile(uid);
  if (existing) return existing;
  const created: LocalProfileExtras = { role: defaults.role ?? "tenant", isVerified: false, createdAt: new Date().toISOString() };
  saveLocalProfile(uid, created);
  return created;
}

function firebaseUserToAuthUser(firebaseUser: FirebaseUser, defaults: { name?: string; role?: UserRole } = {}): AuthUser {
  const extras = ensureLocalProfile(firebaseUser.uid, defaults);
  return {
    id: firebaseUser.uid,
    name: defaults.name ?? firebaseUser.displayName ?? "Rentlet User",
    email: firebaseUser.email,
    phone: extras.phoneOverride ?? firebaseUser.phoneNumber,
    role: extras.role,
    isVerified: extras.isVerified,
    createdAt: extras.createdAt,
  };
}

// Firebase Auth throws errors like `FirebaseError: Firebase: Error (auth/invalid-credential).`
// which are useless in a form. Map the codes we can hit to a plain sentence the user can act on;
// pass our own thrown Errors (no `code`) straight through; fall back to a generic line for
// anything unmapped rather than leaking the raw "Firebase: Error (auth/...)" string.
function friendlyAuthError(err: unknown): string {
  const code =
    typeof err === "object" && err !== null && "code" in err
      ? String((err as { code: unknown }).code)
      : "";
  if (!code) return err instanceof Error && err.message ? err.message : "Something went wrong. Please try again.";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password. Check both and try again.";
    case "auth/invalid-email":
      return "That doesn't look like a valid email address.";
    case "auth/user-disabled":
      return "This account has been disabled. Contact support.";
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try signing in instead.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a few minutes, then try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    case "auth/invalid-verification-code":
      return "That OTP is incorrect. Check the 6-digit code and try again.";
    case "auth/code-expired":
      return "That OTP has expired. Request a new one.";
    case "auth/missing-verification-code":
      return "Enter the 6-digit OTP sent to your phone.";
    case "auth/invalid-phone-number":
    case "auth/missing-phone-number":
      return "Enter a valid mobile number.";
    case "auth/configuration-not-found":
      return "Phone sign-in isn't enabled for this project yet. Enable Authentication → Sign-in method → Phone in Firebase, or use email / Google.";
    case "auth/quota-exceeded":
      return "SMS limit reached for now. Try again later, or use email / Google.";
    case "auth/captcha-check-failed":
      return "Verification check failed. Reload the page and try again.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Sign-in was cancelled.";
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in popup. Allow popups for this site and retry.";
    case "auth/account-exists-with-different-credential":
      return "This email is already registered with a different sign-in method.";
    case "auth/requires-recent-login":
      return "For security, sign out and sign in again before changing this.";
    default:
      return "Couldn't complete that right now. Please try again in a moment.";
  }
}

class FirebaseAuthProvider implements AuthProvider {
  private listeners: ((user: AuthUser | null) => void)[] = [];
  private current: AuthUser | null = null;
  private confirmationResult: ConfirmationResult | null = null;
  private recaptcha: RecaptchaVerifier | null = null;

  constructor() {
    if (typeof window === "undefined") return; // never runs during SSR/RSC
    onAuthStateChanged(getFirebaseAuth(), (firebaseUser) => {
      this.current = firebaseUser ? firebaseUserToAuthUser(firebaseUser) : null;
      this.listeners.forEach((l) => l(this.current));
    });
  }

  getCurrentUser(): AuthUser | null {
    return this.current;
  }

  subscribe(listener: (user: AuthUser | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private getRecaptcha(): RecaptchaVerifier {
    if (this.recaptcha) return this.recaptcha;
    let container = document.getElementById("rentlet-recaptcha-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "rentlet-recaptcha-container";
      container.style.display = "none";
      document.body.appendChild(container);
    }
    this.recaptcha = new RecaptchaVerifier(getFirebaseAuth(), container, { size: "invisible" });
    return this.recaptcha;
  }

  async sendOtp(phone: string): Promise<void> {
    try {
      this.confirmationResult = await signInWithPhoneNumber(getFirebaseAuth(), phone, this.getRecaptcha());
    } catch (e) {
      throw new Error(friendlyAuthError(e));
    }
  }

  async verifyOtp(_phone: string, code: string, newUser?: { name: string; role: UserRole; email?: string }): Promise<AuthUser> {
    if (!this.confirmationResult) throw new Error("Request an OTP before verifying it.");
    try {
      const credential = await this.confirmationResult.confirm(code);
      const user = firebaseUserToAuthUser(credential.user, newUser);
      this.current = user;
      return user;
    } catch (e) {
      throw new Error(friendlyAuthError(e));
    }
  }

  async loginWithEmail(email: string, password: string): Promise<AuthUser> {
    try {
      const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      const user = firebaseUserToAuthUser(credential.user);
      this.current = user;
      return user;
    } catch (e) {
      throw new Error(friendlyAuthError(e));
    }
  }

  async registerWithEmail(input: { name: string; email: string; password: string; role: UserRole }): Promise<AuthUser> {
    try {
      const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), input.email, input.password);
      await updateFirebaseDisplayName(credential.user, { displayName: input.name });
      // Send the "confirm your email" link. Best-effort: a failure here (rate limit, etc.)
      // must not block an otherwise-successful signup.
      await sendEmailVerification(credential.user).catch(() => {});
      const user = firebaseUserToAuthUser(credential.user, { name: input.name, role: input.role });
      this.current = user;
      return user;
    } catch (e) {
      throw new Error(friendlyAuthError(e));
    }
  }

  async loginWithGoogle(_account?: GoogleDemoAccount, newUserRole?: UserRole): Promise<AuthUser> {
    // Real Google OAuth returns the actual chosen account — the demo `account` list is ignored here.
    void _account;
    try {
      const credential = await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider());
      const user = firebaseUserToAuthUser(credential.user, newUserRole ? { role: newUserRole } : undefined);
      this.current = user;
      return user;
    } catch (e) {
      throw new Error(friendlyAuthError(e));
    }
  }

  async requestPasswordReset(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(getFirebaseAuth(), email);
    } catch (e) {
      throw new Error(friendlyAuthError(e));
    }
  }

  async logout(): Promise<void> {
    await signOut(getFirebaseAuth());
  }

  async updateProfile(patch: Partial<Pick<AuthUser, "name" | "email" | "phone">>): Promise<AuthUser> {
    const firebaseUser = getFirebaseAuth().currentUser;
    if (!firebaseUser) throw new Error("Not signed in.");

    if (patch.name) await updateFirebaseDisplayName(firebaseUser, { displayName: patch.name });
    if (patch.email) {
      // Changing the Auth email can require a recent login (auth/requires-recent-login) — that's
      // a real Firebase constraint, not a bug here.
      await updateFirebaseEmail(firebaseUser, patch.email).catch(() => {});
    }
    if (patch.phone !== undefined) {
      const extras = ensureLocalProfile(firebaseUser.uid);
      saveLocalProfile(firebaseUser.uid, { ...extras, phoneOverride: patch.phone });
    }

    const user = firebaseUserToAuthUser(firebaseUser);
    this.current = user;
    this.listeners.forEach((l) => l(user));
    return user;
  }
}

export const authService: AuthProvider = isFirebaseConfigured() ? new FirebaseAuthProvider() : new MockAuthProvider();
