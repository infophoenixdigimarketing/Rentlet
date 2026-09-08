// Admin property moderation (spec §25). Deliberately mutates the SAME `allProperties` array
// that search.service.ts and properties.service.ts read from (not a private copy) — so
// approving/rejecting/suspending a listing here actually changes what tenants see in
// /properties search, the same way it would against a shared Firestore document in production.
import { allProperties } from "@/lib/data/seed-properties";
import type { Property, PropertyStatus, VerificationStatus } from "@/types/property";

let listeners: (() => void)[] = [];
let snapshot = allProperties.slice();

function emit() {
  snapshot = allProperties.slice();
  listeners.forEach((l) => l());
}

function update(id: string, patch: Partial<Property>) {
  const idx = allProperties.findIndex((p) => p.id === id);
  if (idx === -1) return;
  allProperties[idx] = { ...allProperties[idx], ...patch };
  emit();
}

export const adminPropertiesService = {
  getAll(): Property[] {
    return snapshot;
  },
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  /** Re-read `allProperties` and notify subscribers — called after a new listing is posted
   *  so the admin console shows every property an owner submits, right away. */
  refresh() {
    emit();
  },
  approve(id: string) {
    update(id, { verificationStatus: "approved" as VerificationStatus, status: "active" as PropertyStatus, rejectionReason: null });
  },
  reject(id: string, reason: string) {
    update(id, { verificationStatus: "rejected" as VerificationStatus, status: "paused" as PropertyStatus, rejectionReason: reason });
  },
  setUnderReview(id: string) {
    update(id, { verificationStatus: "under_review" as VerificationStatus });
  },
  suspend(id: string) {
    update(id, { status: "paused" as PropertyStatus });
  },
  reactivate(id: string) {
    update(id, { status: "active" as PropertyStatus });
  },
  toggleFeatured(id: string) {
    const p = allProperties.find((x) => x.id === id);
    if (p) update(id, { featured: !p.featured });
  },
  remove(id: string) {
    update(id, { status: "deleted" as PropertyStatus });
  },
};
