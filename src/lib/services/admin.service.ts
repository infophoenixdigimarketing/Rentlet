// Admin property moderation (spec §25).
// Mock mode deliberately mutates the SAME `allProperties` array that search.service.ts and
// properties.service.ts read from (not a private copy) — so approving/rejecting/suspending a
// listing here actually changes what tenants see in /properties search, the same way it would
// against a shared Firestore document in production.
// Firebase mode is a live, unfiltered `properties` listener — readable only by a real
// Firebase-authenticated admin (firestore.rules' isAdmin()); everyone else's query is rejected
// outright (an unfiltered collection read can't be proven safe by the rules engine unless
// isAdmin() is true), so the demo-admin session shows an empty queue until a real admin account
// is set up. See admin-auth.service.ts.
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { allProperties } from "@/lib/data/seed-properties";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { getDb } from "@/lib/firebase/client";
import { mapPropertyDoc, PROPERTIES_COLLECTION } from "@/lib/services/properties.service";
import type { Property, PropertyStatus, VerificationStatus } from "@/types/property";

export interface AdminPropertiesService {
  getAll(): Property[];
  subscribe(listener: () => void): () => void;
  /** Re-read the source and notify subscribers. No-op in Firebase mode — the live listener
   *  already pushes updates as they happen. */
  refresh(): void;
  approve(id: string): void;
  reject(id: string, reason: string): void;
  setUnderReview(id: string): void;
  suspend(id: string): void;
  reactivate(id: string): void;
  toggleFeatured(id: string): void;
  remove(id: string): void;
}

let listeners: (() => void)[] = [];
let snapshot = allProperties.slice();

function emit() {
  snapshot = allProperties.slice();
  listeners.forEach((l) => l());
}

function mockUpdate(id: string, patch: Partial<Property>) {
  const idx = allProperties.findIndex((p) => p.id === id);
  if (idx === -1) return;
  allProperties[idx] = { ...allProperties[idx], ...patch };
  emit();
}

class MockAdminPropertiesService implements AdminPropertiesService {
  getAll(): Property[] {
    return snapshot;
  }
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }
  refresh() {
    emit();
  }
  approve(id: string) {
    mockUpdate(id, { verificationStatus: "approved" as VerificationStatus, status: "active" as PropertyStatus, rejectionReason: null });
  }
  reject(id: string, reason: string) {
    mockUpdate(id, { verificationStatus: "rejected" as VerificationStatus, status: "paused" as PropertyStatus, rejectionReason: reason });
  }
  setUnderReview(id: string) {
    mockUpdate(id, { verificationStatus: "under_review" as VerificationStatus });
  }
  suspend(id: string) {
    mockUpdate(id, { status: "paused" as PropertyStatus });
  }
  reactivate(id: string) {
    mockUpdate(id, { status: "active" as PropertyStatus });
  }
  toggleFeatured(id: string) {
    const p = allProperties.find((x) => x.id === id);
    if (p) mockUpdate(id, { featured: !p.featured });
  }
  remove(id: string) {
    mockUpdate(id, { status: "deleted" as PropertyStatus });
  }
}

class FirebaseAdminPropertiesService implements AdminPropertiesService {
  private firebaseSnapshot: Property[] = [];
  private firebaseListeners: (() => void)[] = [];

  constructor() {
    if (typeof window === "undefined") return;
    const q = query(collection(getDb(), PROPERTIES_COLLECTION), orderBy("createdAt", "desc"));
    onSnapshot(
      q,
      (snap) => {
        this.firebaseSnapshot = snap.docs.map((d) => mapPropertyDoc(d.id, d.data()));
        this.firebaseListeners.forEach((l) => l());
      },
      () => {
        // Not signed in as a real admin — the query is rejected outright. Show an empty
        // queue rather than throwing.
        this.firebaseSnapshot = [];
        this.firebaseListeners.forEach((l) => l());
      }
    );
  }

  getAll(): Property[] {
    return this.firebaseSnapshot;
  }
  subscribe(listener: () => void) {
    this.firebaseListeners.push(listener);
    return () => {
      this.firebaseListeners = this.firebaseListeners.filter((l) => l !== listener);
    };
  }
  refresh() {
    // no-op — the live listener above already reflects every change
  }
  approve(id: string) {
    void updateDoc(doc(getDb(), PROPERTIES_COLLECTION, id), {
      verificationStatus: "approved" as VerificationStatus,
      status: "active" as PropertyStatus,
      rejectionReason: null,
    });
  }
  reject(id: string, reason: string) {
    void updateDoc(doc(getDb(), PROPERTIES_COLLECTION, id), {
      verificationStatus: "rejected" as VerificationStatus,
      status: "paused" as PropertyStatus,
      rejectionReason: reason,
    });
  }
  setUnderReview(id: string) {
    void updateDoc(doc(getDb(), PROPERTIES_COLLECTION, id), { verificationStatus: "under_review" as VerificationStatus });
  }
  suspend(id: string) {
    void updateDoc(doc(getDb(), PROPERTIES_COLLECTION, id), { status: "paused" as PropertyStatus });
  }
  reactivate(id: string) {
    void updateDoc(doc(getDb(), PROPERTIES_COLLECTION, id), { status: "active" as PropertyStatus });
  }
  toggleFeatured(id: string) {
    const p = this.firebaseSnapshot.find((x) => x.id === id);
    if (p) void updateDoc(doc(getDb(), PROPERTIES_COLLECTION, id), { featured: !p.featured });
  }
  remove(id: string) {
    void updateDoc(doc(getDb(), PROPERTIES_COLLECTION, id), { status: "deleted" as PropertyStatus });
  }
}

export const adminPropertiesService: AdminPropertiesService = isFirestoreEnabled()
  ? new FirebaseAdminPropertiesService()
  : new MockAdminPropertiesService();
