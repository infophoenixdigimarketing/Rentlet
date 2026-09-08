// Small shared helpers so every Firebase-backed service (lib/services/*.ts) talks to Firestore
// the same way — consistent id-injection, timestamp handling, and snapshot mapping.
import {
  Timestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
  type DocumentSnapshot,
} from "firebase/firestore";

/** Firestore Timestamp | Date | ISO string | undefined -> ISO string (or null). */
export function toIso(value: unknown): string | null {
  if (value == null) return null;
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return null;
}

/** Maps a query snapshot to `{ id, ...data }` objects, running each doc through `mapper`. */
export function mapSnapshot<T>(snap: QuerySnapshot<DocumentData>, mapper: (id: string, data: DocumentData) => T): T[] {
  return snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => mapper(d.id, d.data()));
}

export function mapDoc<T>(snap: DocumentSnapshot<DocumentData>, mapper: (id: string, data: DocumentData) => T): T | null {
  if (!snap.exists()) return null;
  return mapper(snap.id, snap.data());
}

/** Strips `undefined` values — Firestore rejects them (use `null` instead), unlike our TS types
 * which often model "not set" as `undefined` on optional fields. */
export function stripUndefined<T extends Record<string, unknown>>(obj: T): T {
  const out = { ...obj };
  for (const key of Object.keys(out)) {
    if (out[key as keyof T] === undefined) delete out[key as keyof T];
  }
  return out;
}
