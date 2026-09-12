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

/** Shape kept for the offline/mock fallback only — the live build uses real Google OAuth
 *  (signInWithPopup), which returns the actual signed-in account and ignores this. */
export interface GoogleDemoAccount {
  id: string;
  name: string;
  email: string;
}
export const GOOGLE_DEMO_ACCOUNTS: GoogleDemoAccount[] = [
  { id: "google-user", name: "Rentlet User", email: "user@example.com" },
];

export interface AuthProvider {
  getCurrentUser(): AuthUser | null;
  /** True once the session has actually been checked — the Firebase provider needs a tick
   *  after page load before it knows whether there's a signed-in user. Gated pages should show
   *  a neutral loading state (not "please log in") until this is true, or a refresh flashes the
   *  logged-out screen before flipping to the real one. Always true for the mock provider. */
  isAuthReady(): boolean;
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
  /** Email a fresh 6-digit verification code to the signed-in user's address. */
  resendEmailVerification(): Promise<void>;
  /** Check the code the user typed against the one just emailed to them. On success, marks the
   *  account verified and refreshes the cached user so `emailVerified` is up to date. Throws
   *  with a plain-English message (wrong code, expired, too many attempts) on failure. */
  verifyEmailOtp(code: string): Promise<boolean>;
  /** Re-check whether the signed-in user's email is now confirmed (also refreshes the cached
   *  user so `emailVerified` is up to date). Returns the fresh value. */
  refreshEmailVerified(): Promise<boolean>;
}

function isBrowser() {
  return typeof window !== "undefined";
}

/** No pre-seeded accounts on the live build — every user is a real Firebase sign-up.
 *  (This only ever runs in the offline/mock fallback, which starts with an empty store.) */
function seedUsers(): StoredUser[] {
  return [];
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
    // Mock mode has no real email backend to confirm against — never block the demo on this.
    emailVerified: true,
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

  // Mock mode hydrates synchronously from localStorage the moment it's first asked — there's
  // no async gap, so gated pages never need to show a loading state for it.
  isAuthReady(): boolean {
    return true;
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
        emailVerified: true,
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
      emailVerified: true,
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
        emailVerified: true,
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

  // Mock mode has no real email backend — nothing to send or re-check; every account reads
  // as already verified (see strip()).
  async resendEmailVerification(): Promise<void> {
    await delay(300);
  }

  async verifyEmailOtp(): Promise<boolean> {
    await delay(300);
    return true;
  }

  async refreshEmailVerified(): Promise<boolean> {
    return true;
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
  /** Phone-OTP sign-ups have no Firebase Auth email, but the register form still collects one
   *  as a contact address — it's kept here (and editable from the profile page). */
  emailOverride?: string | null;
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

function ensureLocalProfile(uid: string, defaults: { role?: UserRole; email?: string | null } = {}): LocalProfileExtras {
  const existing = loadLocalProfile(uid);
  if (existing) {
    let next = existing;
    // The register flow re-runs with an explicit role — honour a switch (e.g. someone who
    // first signed up "looking for property" comes back and registers as an owner/agent).
    // `defaults.role` is only set from the register/verify path, never from onAuthStateChanged.
    if (defaults.role && defaults.role !== next.role) {
      next = { ...next, role: defaults.role };
    }
    // Backfill a contact email captured at sign-up if it wasn't stored yet (older sessions).
    if (defaults.email && !next.emailOverride) {
      next = { ...next, emailOverride: defaults.email };
    }
    if (next !== existing) saveLocalProfile(uid, next);
    return next;
  }
  const created: LocalProfileExtras = {
    role: defaults.role ?? "tenant",
    isVerified: false,
    createdAt: new Date().toISOString(),
    emailOverride: defaults.email ?? undefined,
  };
  saveLocalProfile(uid, created);
  return created;
}

function firebaseUserToAuthUser(
  firebaseUser: FirebaseUser,
  defaults: { name?: string; role?: UserRole; email?: string | null } = {}
): AuthUser {
  const extras = ensureLocalProfile(firebaseUser.uid, defaults);
  return {
    id: firebaseUser.uid,
    name: defaults.name ?? firebaseUser.displayName ?? "Rentlet User",
    email: firebaseUser.email ?? extras.emailOverride ?? defaults.email ?? null,
    phone: extras.phoneOverride ?? firebaseUser.phoneNumber,
    role: extras.role,
    isVerified: extras.isVerified,
    // No Auth email (phone-OTP account) => nothing to confirm, treat as verified.
    emailVerified: firebaseUser.email ? firebaseUser.emailVerified : true,
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
  const rawMsg = err instanceof Error && err.message ? err.message : "";
  if (!code) return rawMsg || "Something went wrong. Please try again.";
  // auth/operation-not-allowed covers two very different causes — the Phone provider being
  // off, and SMS to the caller's country being blocked by the SMS region policy. The message
  // text is the only way to tell them apart.
  if (code === "auth/operation-not-allowed" && /region/i.test(rawMsg)) {
    return "SMS to your country is turned off. In Firebase → Authentication → Settings → SMS region policy, allow your region (or set Deny with an empty list) — or use email / Google.";
  }
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
    case "auth/operation-not-allowed":
      return "Phone sign-in isn't enabled for this project yet. In Firebase → Authentication → Sign-in method, enable Phone — or use email / Google.";
    case "auth/quota-exceeded":
      return "SMS limit reached for now. Try again later, or use email / Google.";
    case "auth/captcha-check-failed":
    case "auth/invalid-app-credential":
    case "auth/argument-error":
      return "Phone verification failed to load. Reload the page and try again — or use email / Google to sign in.";
    case "auth/billing-not-enabled":
      return "Phone sign-in needs the Firebase Blaze plan. Use email / Google instead.";
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
      // Surface the raw code so an unexpected failure is at least diagnosable.
      return `Couldn't complete that (${code}). Try again, or use email / Google.`;
  }
}

// Firebase Auth's own email verification is link-only (no client-SDK way to turn that into a
// typed code), so this is a small custom OTP system backed by the Admin SDK on the server side —
// see api/auth/send-email-otp and api/auth/verify-email-otp.
async function sendEmailOtpRequest(firebaseUser: FirebaseUser): Promise<void> {
  const idToken = await firebaseUser.getIdToken();
  const res = await fetch("/api/auth/send-email-otp", {
    method: "POST",
    headers: { Authorization: `Bearer ${idToken}` },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { error?: string });
    throw new Error(body.error || "Couldn't send the verification code.");
  }
}

class FirebaseAuthProvider implements AuthProvider {
  private listeners: ((user: AuthUser | null) => void)[] = [];
  private current: AuthUser | null = null;
  // Firebase needs a tick after page load to restore (or confirm there's no) session — false
  // until the first onAuthStateChanged callback, real or empty.
  private ready = false;
  private confirmationResult: ConfirmationResult | null = null;
  private recaptcha: RecaptchaVerifier | null = null;

  constructor() {
    if (typeof window === "undefined") return; // never runs during SSR/RSC
    onAuthStateChanged(getFirebaseAuth(), (firebaseUser) => {
      this.current = firebaseUser ? firebaseUserToAuthUser(firebaseUser) : null;
      this.ready = true;
      this.listeners.forEach((l) => l(this.current));
    });
  }

  getCurrentUser(): AuthUser | null {
    return this.current;
  }

  isAuthReady(): boolean {
    return this.ready;
  }

  subscribe(listener: (user: AuthUser | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private getRecaptcha(): RecaptchaVerifier {
    if (this.recaptcha) return this.recaptcha;
    // A stable host that is NEVER removed (deleting a node grecaptcha still references crashes
    // its script — "reading 'style' of null"). `display:none` also breaks the invisible widget,
    // so it's parked off-screen. Each verifier gets its OWN fresh child inside the host, so a
    // rebuilt verifier never lands on an element that already holds a widget ("already rendered
    // in this element"). Safe to wipe here: resetRecaptcha() has already called clear().
    let host = document.getElementById("rentlet-recaptcha-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "rentlet-recaptcha-host";
      host.style.cssText = "position:absolute;left:-10000px;top:0;";
      document.body.appendChild(host);
    }
    host.innerHTML = "";
    const target = document.createElement("div");
    host.appendChild(target);
    this.recaptcha = new RecaptchaVerifier(getFirebaseAuth(), target, { size: "invisible" });
    return this.recaptcha;
  }

  private resetRecaptcha() {
    try {
      this.recaptcha?.clear(); // releases grecaptcha's DOM references
    } catch {
      /* already torn down */
    }
    this.recaptcha = null;
  }

  async sendOtp(phone: string): Promise<void> {
    try {
      this.confirmationResult = await signInWithPhoneNumber(getFirebaseAuth(), phone, this.getRecaptcha());
    } catch (e) {
      // A failed attempt leaves the invisible widget in a spent state — rebuild it for the retry.
      this.resetRecaptcha();
      throw new Error(friendlyAuthError(e));
    }
  }

  async verifyOtp(_phone: string, code: string, newUser?: { name: string; role: UserRole; email?: string }): Promise<AuthUser> {
    if (!this.confirmationResult) throw new Error("Request an OTP before verifying it.");
    try {
      const credential = await this.confirmationResult.confirm(code);
      const user = firebaseUserToAuthUser(credential.user, newUser);
      this.current = user;
      this.ready = true;
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
      this.ready = true;
      return user;
    } catch (e) {
      throw new Error(friendlyAuthError(e));
    }
  }

  async registerWithEmail(input: { name: string; email: string; password: string; role: UserRole }): Promise<AuthUser> {
    try {
      const credential = await createUserWithEmailAndPassword(getFirebaseAuth(), input.email, input.password);
      await updateFirebaseDisplayName(credential.user, { displayName: input.name });
      // Email the 6-digit verification code. Best-effort: a failure here (rate limit, mail
      // server hiccup, etc.) must not block an otherwise-successful signup — EmailVerifyGate's
      // "Resend code" covers a failed first send.
      await sendEmailOtpRequest(credential.user).catch(() => {});
      const user = firebaseUserToAuthUser(credential.user, { name: input.name, role: input.role });
      this.current = user;
      this.ready = true;
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
      this.ready = true;
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

    if (patch.email !== undefined) {
      const nextEmail = patch.email?.trim() || null;
      if (firebaseUser.email) {
        // This account has a real email credential — change it in Firebase Auth.
        if (nextEmail && nextEmail.toLowerCase() !== firebaseUser.email.toLowerCase()) {
          try {
            await updateFirebaseEmail(firebaseUser, nextEmail);
          } catch (e) {
            const code = typeof e === "object" && e !== null && "code" in e ? String((e as { code: unknown }).code) : "";
            if (code === "auth/email-already-in-use")
              throw new Error("That email is already used by another account.");
            if (code === "auth/requires-recent-login")
              throw new Error("For security, log out and log back in, then change your email.");
            throw new Error(friendlyAuthError(e));
          }
        }
      } else {
        // Phone-OTP account has no Auth email — keep the contact address in the local profile.
        const extras = ensureLocalProfile(firebaseUser.uid);
        saveLocalProfile(firebaseUser.uid, { ...extras, emailOverride: nextEmail });
      }
    }

    if (patch.phone !== undefined) {
      const extras = ensureLocalProfile(firebaseUser.uid);
      saveLocalProfile(firebaseUser.uid, { ...extras, phoneOverride: patch.phone });
    }

    const user = firebaseUserToAuthUser(firebaseUser);
    this.current = user;
    this.ready = true;
    this.listeners.forEach((l) => l(user));
    return user;
  }

  async resendEmailVerification(): Promise<void> {
    const firebaseUser = getFirebaseAuth().currentUser;
    if (!firebaseUser) throw new Error("Not signed in.");
    if (!firebaseUser.email) throw new Error("This account has no email to verify.");
    await sendEmailOtpRequest(firebaseUser);
  }

  async verifyEmailOtp(code: string): Promise<boolean> {
    const firebaseUser = getFirebaseAuth().currentUser;
    if (!firebaseUser) throw new Error("Not signed in.");
    const idToken = await firebaseUser.getIdToken();
    const res = await fetch("/api/auth/verify-email-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
      body: JSON.stringify({ code }),
    });
    const body = await res.json().catch(() => ({}) as { error?: string });
    if (!res.ok) throw new Error(body.error || "Couldn't verify that code.");
    // The Admin SDK just flipped emailVerified server-side — reload to pick it up here too.
    await firebaseUser.reload();
    const user = firebaseUserToAuthUser(firebaseUser);
    this.current = user;
    this.ready = true;
    this.listeners.forEach((l) => l(user));
    return user.emailVerified;
  }

  async refreshEmailVerified(): Promise<boolean> {
    const firebaseUser = getFirebaseAuth().currentUser;
    if (!firebaseUser) return false;
    await firebaseUser.reload();
    const user = firebaseUserToAuthUser(firebaseUser);
    this.current = user;
    this.ready = true;
    this.listeners.forEach((l) => l(user));
    return user.emailVerified;
  }
}

export const authService: AuthProvider = isFirebaseConfigured() ? new FirebaseAuthProvider() : new MockAuthProvider();
