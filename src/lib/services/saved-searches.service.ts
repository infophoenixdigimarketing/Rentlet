// Saved searches (spec §19). Mock mode persists to localStorage per signed-in user. Firebase
// mode is a live `saved_searches` query scoped to the signed-in uid. The "notify" flag is where
// a Cloud Function (onPropertyWrite -> match saved searches -> NEW_MATCH notification) attaches
// without this service's shape changing — see functions/src/index.ts.
import { collection, doc, deleteDoc, setDoc, updateDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { authService } from "@/lib/services/auth.service";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { getDb } from "@/lib/firebase/client";
import { toIso } from "@/lib/firebase/firestore-helpers";
import type { SavedSearch } from "@/types/saved-search";
import type { SearchFilters } from "@/lib/services/search.service";

export interface SavedSearchesService {
  getAll(): SavedSearch[];
  subscribe(listener: () => void): () => void;
  save(label: string, filters: SearchFilters): SavedSearch;
  rename(id: string, label: string): void;
  toggleNotify(id: string): void;
  remove(id: string): void;
}

function isBrowser() {
  return typeof window !== "undefined";
}

class MockSavedSearchesService implements SavedSearchesService {
  private entries: SavedSearch[] = [];
  private loadedForUserId: string | null | undefined = undefined;
  private listeners: (() => void)[] = [];
  private nextId = 1;

  private storageKey(userId: string) {
    return `rentlet_saved_searches_${userId}`;
  }

  private ensureLoaded() {
    const uid = authService.getCurrentUser()?.id ?? null;
    if (uid === this.loadedForUserId) return;
    this.loadedForUserId = uid;
    if (!uid || !isBrowser()) {
      this.entries = [];
      return;
    }
    try {
      this.entries = JSON.parse(window.localStorage.getItem(this.storageKey(uid)) ?? "[]");
    } catch {
      this.entries = [];
    }
  }

  private persist() {
    const uid = this.loadedForUserId;
    if (!uid || !isBrowser()) return;
    window.localStorage.setItem(this.storageKey(uid), JSON.stringify(this.entries));
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }

  getAll(): SavedSearch[] {
    this.ensureLoaded();
    return this.entries;
  }
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  save(label: string, filters: SearchFilters): SavedSearch {
    this.ensureLoaded();
    const entry: SavedSearch = { id: `ss${this.nextId++}`, label, filters, notify: true, createdAt: new Date().toISOString() };
    this.entries = [entry, ...this.entries];
    this.persist();
    this.emit();
    return entry;
  }
  rename(id: string, label: string) {
    this.ensureLoaded();
    this.entries = this.entries.map((e) => (e.id === id ? { ...e, label } : e));
    this.persist();
    this.emit();
  }
  toggleNotify(id: string) {
    this.ensureLoaded();
    this.entries = this.entries.map((e) => (e.id === id ? { ...e, notify: !e.notify } : e));
    this.persist();
    this.emit();
  }
  remove(id: string) {
    this.ensureLoaded();
    this.entries = this.entries.filter((e) => e.id !== id);
    this.persist();
    this.emit();
  }
}

// ---------------------------------------------------------------------------------------------

const COLLECTION = "saved_searches";

class FirebaseSavedSearchesService implements SavedSearchesService {
  private entries: SavedSearch[] = [];
  private listeners: (() => void)[] = [];
  private boundUid: string | null | undefined = undefined;
  private unsub: (() => void) | null = null;

  constructor() {
    if (typeof window === "undefined") return;
    authService.subscribe((user) => this.bindToUser(user?.id ?? null));
    this.bindToUser(authService.getCurrentUser()?.id ?? null);
  }

  private bindToUser(uid: string | null) {
    if (uid === this.boundUid) return;
    this.boundUid = uid;
    this.unsub?.();
    this.unsub = null;
    if (!uid) {
      this.entries = [];
      this.emit();
      return;
    }
    const q = query(collection(getDb(), COLLECTION), where("userId", "==", uid), orderBy("createdAt", "desc"));
    this.unsub = onSnapshot(q, (snap) => {
      this.entries = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          label: data.label,
          filters: data.filters ?? {},
          notify: data.notify ?? true,
          createdAt: toIso(data.createdAt) ?? new Date().toISOString(),
        };
      });
      this.emit();
    });
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }

  getAll(): SavedSearch[] {
    return this.entries;
  }
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  save(label: string, filters: SearchFilters): SavedSearch {
    const uid = this.boundUid;
    const ref = doc(collection(getDb(), COLLECTION));
    const optimistic: SavedSearch = { id: ref.id, label, filters, notify: true, createdAt: new Date().toISOString() };
    if (uid) void setDoc(ref, { userId: uid, label, filters, notify: true, createdAt: serverTimestamp() });
    return optimistic;
  }
  rename(id: string, label: string) {
    void updateDoc(doc(getDb(), COLLECTION, id), { label });
  }
  toggleNotify(id: string) {
    const current = this.entries.find((e) => e.id === id);
    if (current) void updateDoc(doc(getDb(), COLLECTION, id), { notify: !current.notify });
  }
  remove(id: string) {
    void deleteDoc(doc(getDb(), COLLECTION, id));
  }
}

export const savedSearchesService: SavedSearchesService = isFirestoreEnabled()
  ? new FirebaseSavedSearchesService()
  : new MockSavedSearchesService();
