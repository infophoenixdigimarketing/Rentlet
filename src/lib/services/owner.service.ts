// "My properties" store for the owner dashboard (spec §22-23). Mock mode uses a fixed
// in-memory slice of the seed catalogue (demo simplification — every signed-in owner sees the
// same portfolio). Firebase mode is a live `properties` query scoped to
// `where('ownerId', '==', session.uid)`, re-bound whenever the signed-in user changes.
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { allProperties } from "@/lib/data/seed-properties";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { getDb } from "@/lib/firebase/client";
import { authService } from "@/lib/services/auth.service";
import { propertyRepository, mapPropertyDoc, PROPERTIES_COLLECTION } from "@/lib/services/properties.service";
import type { Property, PropertyStatus } from "@/types/property";

export interface OwnerPropertiesService {
  getAll(): Property[];
  subscribe(listener: () => void): () => void;
  /** Post-property wizard (spec §16) hands its finished listing to this — see post-property.service.ts.
   *  No-op in Firebase mode: the live query already picks up the new doc. */
  addProperty(property: Property): void;
  /** All three below return once the write is confirmed (Firestore mode) so callers can
   *  surface a failure — a permission-denied write must not silently report success while
   *  nothing actually changed. */
  setStatus(id: string, status: PropertyStatus): Promise<void>;
  toggleFeatured(id: string): Promise<void>;
  remove(id: string): Promise<void>;
}

class MockOwnerPropertiesService implements OwnerPropertiesService {
  private store: Property[] = allProperties.slice(0, 9).map((p) => ({ ...p }));
  private listeners: (() => void)[] = [];
  private snapshot = this.store.slice();

  private emit() {
    this.snapshot = this.store.slice();
    this.listeners.forEach((l) => l());
  }

  getAll(): Property[] {
    return this.snapshot;
  }
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  addProperty(property: Property) {
    this.store = [property, ...this.store];
    this.emit();
  }
  async setStatus(id: string, status: PropertyStatus) {
    this.store = this.store.map((p) => (p.id === id ? { ...p, status } : p));
    this.emit();
  }
  async toggleFeatured(id: string) {
    this.store = this.store.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p));
    this.emit();
  }
  async remove(id: string) {
    this.store = this.store.filter((p) => p.id !== id);
    this.emit();
  }
}

class FirebaseOwnerPropertiesService implements OwnerPropertiesService {
  private snapshot: Property[] = [];
  private listeners: (() => void)[] = [];
  private unsubQuery: (() => void) | null = null;
  private boundUid: string | null | undefined = undefined;

  constructor() {
    if (typeof window === "undefined") return;
    authService.subscribe((user) => this.bindToUser(user?.id ?? null));
    this.bindToUser(authService.getCurrentUser()?.id ?? null);
  }

  private bindToUser(uid: string | null) {
    if (uid === this.boundUid) return;
    this.boundUid = uid;
    this.unsubQuery?.();
    this.unsubQuery = null;

    if (!uid) {
      this.snapshot = [];
      this.listeners.forEach((l) => l());
      return;
    }
    const q = query(collection(getDb(), PROPERTIES_COLLECTION), where("ownerId", "==", uid), orderBy("createdAt", "desc"));
    this.unsubQuery = onSnapshot(q, (snap) => {
      // remove() is a soft delete (status -> "deleted", see propertyRepository.remove) so the
      // document stays queryable for records — but it must drop out of "My Properties" itself.
      this.snapshot = snap.docs.map((d) => mapPropertyDoc(d.id, d.data())).filter((p) => p.status !== "deleted");
      this.listeners.forEach((l) => l());
    });
  }

  getAll(): Property[] {
    return this.snapshot;
  }
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  addProperty(property: Property) {
    void property; // no-op — the onSnapshot listener above already reflects the newly created document
  }
  setStatus(id: string, status: PropertyStatus) {
    return propertyRepository.update(id, { status });
  }
  toggleFeatured(id: string) {
    const current = this.snapshot.find((p) => p.id === id);
    return current ? propertyRepository.update(id, { featured: !current.featured }) : Promise.resolve();
  }
  remove(id: string) {
    return propertyRepository.remove(id);
  }
}

export const ownerPropertiesService: OwnerPropertiesService = isFirestoreEnabled()
  ? new FirebaseOwnerPropertiesService()
  : new MockOwnerPropertiesService();
