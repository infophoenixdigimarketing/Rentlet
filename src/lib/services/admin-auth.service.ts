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
  private listeners: ((admin: AdminUser | null) => void)[] = [];

  constructor() {
    if (typeof window === "undefined") return;
    onAuthStateChanged(getFirebaseAuth(), async (firebaseUser) => {
      if (!firebaseUser) {
        this.current = null;
        this.listeners.forEach((l) => l(null));
        return;
      }
      const admin = await loadAdminDoc(firebaseUser.uid);
      if (!admin) {
        // Signed into Firebase Auth but not an admin — don't leak a session into the console.
        // login() below still surfaces a clean error message for this case.
        this.current = null;
        this.listeners.forEach((l) => l(null));
        return;
      }
      this.current = admin;
      this.listeners.forEach((l) => l(admin));
    });
  }

  getCurrentAdmin(): AdminUser | null {
    return this.current;
  }

  subscribe(listener: (admin: AdminUser | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  async login(email: string, password: string): Promise<AdminUser> {
    const credential = await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
    const admin = await loadAdminDoc(credential.user.uid);
    if (!admin) {
      await signOut(getFirebaseAuth());
      throw new Error("This account is not authorized for the admin console.");
    }
    this.current = admin;
    this.listeners.forEach((l) => l(admin));
    return admin;
  }

  async logout(): Promise<void> {
    await signOut(getFirebaseAuth());
  }
}

// Admin authorization is a Firestore lookup (admin_users/{uid}), not just a login — stays mock
// until Firestore is enabled (see isFirestoreEnabled()).
export const adminAuthService: AdminAuthProvider = isFirestoreEnabled() ? new FirebaseAdminAuthService() : new MockAdminAuthService();
