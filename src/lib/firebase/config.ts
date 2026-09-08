// Single source of truth for whether real Firebase is configured. Every service in
// lib/services/*.ts checks isFirebaseConfigured() once at module load and picks its real
// (Firebase-backed) or mock implementation accordingly — see docs/04-firebase-integration.md.
//
// Required env vars (apps/web/.env.local, copied from .env.example at the repo root):
//   NEXT_PUBLIC_FIREBASE_API_KEY
//   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
//   NEXT_PUBLIC_FIREBASE_PROJECT_ID
//   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
//   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
//   NEXT_PUBLIC_FIREBASE_APP_ID
// These are the client SDK config values — safe to expose to the browser (they are not
// secrets; access control is enforced by Firestore/Storage security rules, not by hiding
// this config). Get them from Firebase Console → Project settings → General → "Your apps" →
// Web app → SDK setup and configuration → Config.

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let cached: boolean | null = null;

/** True once every required NEXT_PUBLIC_FIREBASE_* var is set to a non-empty value. */
export function isFirebaseConfigured(): boolean {
  if (cached != null) return cached;
  cached = Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.storageBucket &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId
  );
  return cached;
}

/** VAPID key for FCM web push — from Firebase Console → Cloud Messaging → Web Push certificates. */
export const fcmVapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

// By explicit product decision, Firebase is wired up for website login (Firebase Authentication,
// in auth.service.ts) only. Firestore — the database behind properties, favorites, saved
// searches, leads, visits, chat, notifications, and the admin console — stays on each service's
// mock/local implementation for now, even when isFirebaseConfigured() is true. Every
// Firestore-backed service already has a real FirebaseXService implementation written and ready
// (see lib/services/*.ts); flip this to `isFirebaseConfigured()` when Firestore should go live —
// no other code changes needed.
export function isFirestoreEnabled(): boolean {
  return isFirebaseConfigured();
}
