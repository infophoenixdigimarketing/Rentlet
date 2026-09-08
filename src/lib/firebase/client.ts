// Lazy Firebase client SDK singletons. "Lazy" matters here for two reasons: (1) this file is
// imported transitively by every service module, including on the server during SSR/RSC
// rendering, where initializing Auth/Messaging would either throw or be pointless; (2) when
// Firebase isn't configured at all (local demo mode), nothing in this file should run.
// Every getter below throws a clear error if called while isFirebaseConfigured() is false —
// callers (the Firebase-backed service implementations) only ever call these after already
// checking isFirebaseConfigured(), so in practice that throw path is unreachable in demo mode.
import { type FirebaseApp, getApps, initializeApp } from "firebase/app";
import { type Auth, getAuth } from "firebase/auth";
import { type Firestore, getFirestore } from "firebase/firestore";
import { type FirebaseStorage, getStorage } from "firebase/storage";
import { type Messaging, getMessaging, isSupported as isMessagingSupported } from "firebase/messaging";
import { firebaseConfig, isFirebaseConfigured } from "@/lib/firebase/config";

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let storageInstance: FirebaseStorage | null = null;

function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error(
      "Firebase is not configured — set NEXT_PUBLIC_FIREBASE_* env vars (see .env.example) before calling any Firebase-backed service."
    );
  }
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (!authInstance) authInstance = getAuth(getFirebaseApp());
  return authInstance;
}

export function getDb(): Firestore {
  if (!dbInstance) dbInstance = getFirestore(getFirebaseApp());
  return dbInstance;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storageInstance) storageInstance = getStorage(getFirebaseApp());
  return storageInstance;
}

/** Resolves to null in any environment where FCM can't run (SSR, unsupported browser, no HTTPS). */
export async function getFirebaseMessaging(): Promise<Messaging | null> {
  if (typeof window === "undefined" || !isFirebaseConfigured()) return null;
  if (!(await isMessagingSupported().catch(() => false))) return null;
  return getMessaging(getFirebaseApp());
}
