// Separate admin session — deliberately NOT the same store as lib/services/auth.service.ts,
// even in the Firebase-backed implementation. A signed-in Firebase user only becomes an admin
// session here if an `admin_users/{uid}` document also exists (docs/01-database-schema.md) —
// checked client-side for UI gating, and re-checked server-side by firestore.rules'
// isAdmin() helper for every actual read/write, so this check is a UX convenience, not the
// security boundary.
//
// Demo credentials (spec §65 — development-only, sourced from env vars in production; see
// DEMO_ADMIN_EMAIL/DEMO_ADMIN_PASSWORD in .env.example) apply only to the mock implementation.
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { getFirebaseAuth, getDb } from "@/lib/firebase/client";

const DEMO_ADMIN_EMAIL = "admin@gmail.com";
const DEMO_ADMIN_PASSWORD = "123456";

const SESSION_KEY = "rentlet_admin_session";

export interface AdminUser {
  name: string;
  email: string;
  role: "superadmin" | "moderator";
}

function isBrowser() {
  return typeof window !== "undefined";
}

const DEMO_ADMIN: AdminUser = { name: "Rentlet Admin", email: DEMO_ADMIN_EMAIL, role: "superadmin" };

/** A demo-admin session persisted to localStorage — used by both implementations so the
 *  console is reachable in a Firebase-configured build without a real admin_users doc. */
function readStoredAdmin(): AdminUser | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
}

/** Firebase Auth errors read `Firebase: Error (auth/...)` — turn the ones the admin login can
 *  hit into a plain sentence; pass our own thrown Errors (no `code`) through unchanged. */
function adminLoginError(e: unknown): string {
  if (e instanceof Error && !("code" in e) && e.message) return e.message;
  const code = typeof e === "object" && e !== null && "code" in e ? String((e as { code: unknown }).code) : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect admin email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Wait a few minutes and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return "Couldn't sign in to the admin console. Try again.";
  }
}

export interface AdminAuthProvider {
  getCurrentAdmin(): AdminUser | null;
  subscribe(listener: (admin: AdminUser | null) => void): () => void;
  login(email: string, password: string): Promise<AdminUser>;
  logout(): Promise<void>;
}

class MockAdminAuthService implements AdminAuthProvider {
  private current: AdminUser | null = null;
  private hydrated = false;
  private listeners: ((admin: AdminUser | null) => void)[] = [];

  getCurrentAdmin(): AdminUser | null {
    if (!this.hydrated && isBrowser()) {
      const raw = window.localStorage.getItem(SESSION_KEY);
      this.current = raw ? (JSON.parse(raw) as AdminUser) : null;
      this.hydrated = true;
    }
    return this.current;
  }

  subscribe(listener: (admin: AdminUser | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  async login(email: string, password: string): Promise<AdminUser> {
    await new Promise((r) => setTimeout(r, 500));
    if (email.toLowerCase() !== DEMO_ADMIN_EMAIL || password !== DEMO_ADMIN_PASSWORD) {
      throw new Error("Invalid admin credentials.");
    }
    const admin: AdminUser = { name: "Rentlet Admin", email: DEMO_ADMIN_EMAIL, role: "superadmin" };
    this.current = admin;
    this.hydrated = true;
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(admin));
    this.listeners.forEach((l) => l(admin));
    return admin;
  }

  async logout() {
    if (!isBrowser()) return;
    window.localStorage.removeItem(SESSION_KEY);
    this.current = null;
    this.hydrated = true;
    this.listeners.forEach((l) => l(null));
  }
}

async function loadAdminDoc(uid: string): Promise<AdminUser | null> {
  const snap = await getDoc(doc(getDb(), "admin_users", uid));
  if (!snap.exists()) return null;
  const data = snap.data();
  return { name: data.name ?? "Admin", email: data.email ?? "", role: data.role === "moderator" ? "moderator" : "superadmin" };
}

class FirebaseAdminAuthService implements AdminAuthProvider {
  private current: AdminUser | null = null;
  private hydrated = false;
  private listeners: ((admin: AdminUser | null) => void)[] = [];

  constructor() {
    if (typeof window === "undefined") return;
    this.current = readStoredAdmin();
    this.hydrated = true;
    onAuthStateChanged(getFirebaseAuth(), async (firebaseUser) => {
      // A stored demo-admin session always wins — it doesn't depend on Firebase at all.
      const stored = readStoredAdmin();
      if (stored) {
        this.current = stored;
        this.listeners.forEach((l) => l(stored));
        return;
      }
      if (!firebaseUser) {
        this.current = null;
        this.listeners.forEach((l) => l(null));
        return;
      }
      // Signed into Firebase Auth: admin only if an admin_users/{uid} doc exists.
      const admin = await loadAdminDoc(firebaseUser.uid);
      this.current = admin;
      this.listeners.forEach((l) => l(admin));
    });
  }

  getCurrentAdmin(): AdminUser | null {
    if (!this.hydrated && isBrowser()) {
      this.current = readStoredAdmin();
      this.hydrated = true;
    }
    return this.current;
  }

  subscribe(listener: (admin: AdminUser | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  async login(email: string, password: string): Promise<AdminUser> {
    // Demo backdoor — no Firebase user / admin_users doc needed. Kept for local dev and demos.
    if (email.trim().toLowerCase() === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
      this.current = DEMO_ADMIN;
      this.hydrated = true;
      if (isBrowser()) window.localStorage.setItem(SESSION_KEY, JSON.stringify(DEMO_ADMIN));
      this.listeners.forEach((l) => l(DEMO_ADMIN));
      return DEMO_ADMIN;
    }
    try {
      const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      const admin = await loadAdminDoc(credential.user.uid);
      if (!admin) {
        await signOut(getFirebaseAuth());
        throw new Error("This account is not authorized for the admin console.");
      }
      this.current = admin;
      this.listeners.forEach((l) => l(admin));
      return admin;
    } catch (e) {
      throw new Error(adminLoginError(e));
    }
  }

  async logout(): Promise<void> {
    if (isBrowser()) window.localStorage.removeItem(SESSION_KEY);
    this.current = null;
    this.listeners.forEach((l) => l(null));
    try {
      await signOut(getFirebaseAuth());
    } catch {
      /* no Firebase session to end (demo-admin login) */
    }
  }
}

// Admin authorization is a Firestore lookup (admin_users/{uid}), not just a login — stays mock
// until Firestore is enabled (see isFirestoreEnabled()).
export const adminAuthService: AdminAuthProvider = isFirestoreEnabled() ? new FirebaseAdminAuthService() : new MockAdminAuthService();
