// PropertyRepository interface — see docs/00-architecture.md §3. Mock implementation reads the
// static seed catalogue; the Firebase-backed one below reads/writes the real `properties`
// Firestore collection. Both implement the exact same interface, so every component that calls
// `propertyRepository.*` needs zero changes when NEXT_PUBLIC_FIREBASE_* env vars are set.

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit as fsLimit,
  serverTimestamp,
} from "firebase/firestore";
import type { Property, PropertyStatus, VerificationStatus } from "@/types/property";
import { featuredProperties } from "@/lib/data/properties";
import { allProperties } from "@/lib/data/seed-properties";
import { adminPropertiesService } from "@/lib/services/admin.service";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { getDb } from "@/lib/firebase/client";
import { mapSnapshot, mapDoc, stripUndefined } from "@/lib/firebase/firestore-helpers";
import { PROPERTIES_COLLECTION, mapPropertyDoc } from "@/lib/firebase/properties-shared";

export { PROPERTIES_COLLECTION, mapPropertyDoc };

export interface PropertyRepository {
  getFeatured(limit?: number): Promise<Property[]>;
  getById(id: string): Promise<Property | null>;
  getBySlugAndId(slug: string, id: string): Promise<Property | null>;
  getSimilar(property: Property, limit?: number): Promise<Property[]>;
  /** Owner/admin CRUD (spec: "Property CRUD"). Mock mode mutates the in-memory seed arrays so
   *  the rest of the mock services (owner/admin dashboards) see the change immediately. */
  create(input: Omit<Property, "id" | "createdAt" | "views" | "leadsCount" | "savedCount">): Promise<Property>;
  update(id: string, patch: Partial<Property>): Promise<void>;
  remove(id: string): Promise<void>;
}

// A listing is only publicly discoverable once an admin has verified it (spec §25).
// Owner/admin dashboards read their own scoped stores, so they still see everything.
const isDiscoverable = (p: Property) => p.status === "active" && p.verificationStatus === "approved";

class MockPropertyRepository implements PropertyRepository {
  async getFeatured(limit = 6): Promise<Property[]> {
    return featuredProperties.filter(isDiscoverable).slice(0, limit);
  }

  async getById(id: string): Promise<Property | null> {
    return allProperties.find((p) => p.id === id) ?? null;
  }

  async getBySlugAndId(slug: string, id: string): Promise<Property | null> {
    const p = allProperties.find((x) => x.id === id && x.slug === slug);
    return p && isDiscoverable(p) ? p : null;
  }

  async getSimilar(property: Property, limit = 3): Promise<Property[]> {
    const pool = allProperties.filter((p) => p.id !== property.id && isDiscoverable(p));
    const sameCity = pool.filter((p) => p.city === property.city);
    const rest = pool.filter((p) => p.city !== property.city);
    return [...sameCity, ...rest].slice(0, limit);
  }

  async create(input: Omit<Property, "id" | "createdAt" | "views" | "leadsCount" | "savedCount">): Promise<Property> {
    const property: Property = {
      ...input,
      id: `own${Date.now()}`,
      views: 0,
      leadsCount: 0,
      savedCount: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    allProperties.unshift(property);
    adminPropertiesService.refresh();
    return property;
  }

  async update(id: string, patch: Partial<Property>): Promise<void> {
    const idx = allProperties.findIndex((p) => p.id === id);
    if (idx !== -1) allProperties[idx] = { ...allProperties[idx], ...patch };
    adminPropertiesService.refresh();
  }

  async remove(id: string): Promise<void> {
    const idx = allProperties.findIndex((p) => p.id === id);
    if (idx !== -1) allProperties[idx] = { ...allProperties[idx], status: "deleted" as PropertyStatus };
  }
}

// ---------------------------------------------------------------------------------------------
// Firebase-backed implementation. Doc id === Property.id throughout (predictable, and every
// caller already threads `property.id` around as the join key for favorites/leads/visits/chat).
// ---------------------------------------------------------------------------------------------

const COLLECTION = PROPERTIES_COLLECTION;

function propertiesCol() {
  return collection(getDb(), COLLECTION);
}

function propertyDoc(id: string) {
  return doc(getDb(), COLLECTION, id);
}

const toProperty = mapPropertyDoc;

class FirebasePropertyRepository implements PropertyRepository {
  async getFeatured(limitCount = 6): Promise<Property[]> {
    const q = query(
      propertiesCol(),
      where("status", "==", "active"),
      where("featured", "==", true),
      orderBy("createdAt", "desc"),
      fsLimit(limitCount)
    );
    const snap = await getDocs(q);
    return mapSnapshot(snap, toProperty);
  }

  async getById(id: string): Promise<Property | null> {
    const snap = await getDoc(propertyDoc(id));
    return mapDoc(snap, toProperty);
  }

  async getBySlugAndId(slug: string, id: string): Promise<Property | null> {
    const property = await this.getById(id);
    return property && property.slug === slug ? property : null;
  }

  async getSimilar(property: Property, limitCount = 3): Promise<Property[]> {
    const sameCity = await getDocs(
      query(
        propertiesCol(),
        where("status", "==", "active"),
        where("city", "==", property.city),
        fsLimit(limitCount + 1)
      )
    );
    let results = mapSnapshot(sameCity, toProperty).filter((p) => p.id !== property.id);
    if (results.length < limitCount) {
      const rest = await getDocs(query(propertiesCol(), where("status", "==", "active"), fsLimit(limitCount + 1)));
      const extra = mapSnapshot(rest, toProperty).filter((p) => p.id !== property.id && !results.some((r) => r.id === p.id));
      results = [...results, ...extra];
    }
    return results.slice(0, limitCount);
  }

  async create(input: Omit<Property, "id" | "createdAt" | "views" | "leadsCount" | "savedCount">): Promise<Property> {
    const ref = doc(propertiesCol());
    const payload = stripUndefined({ ...input, views: 0, leadsCount: 0, savedCount: 0, createdAt: serverTimestamp() });
    await setDoc(ref, payload);
    const created = await this.getById(ref.id);
    if (!created) throw new Error("Property was created but could not be re-read.");
    return created;
  }

  async update(id: string, patch: Partial<Property>): Promise<void> {
    const clean = stripUndefined(patch as Record<string, unknown>);
    // Firestore rejects `undefined`; a caller passing `rejectionReason: null` to clear it is
    // fine as-is (null is a valid Firestore value), so only true `undefined`s get filtered.
    await updateDoc(propertyDoc(id), clean);
  }

  async remove(id: string): Promise<void> {
    await updateDoc(propertyDoc(id), { status: "deleted" as PropertyStatus, deletedAt: serverTimestamp() });
  }
}

export const propertyRepository: PropertyRepository = isFirestoreEnabled()
  ? new FirebasePropertyRepository()
  : new MockPropertyRepository();

export type { VerificationStatus };
