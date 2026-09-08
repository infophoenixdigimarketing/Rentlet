// Favorites (spec §18) — folder support (My Homes / Investment / Shortlist / custom). Mock
// mode persists to localStorage per signed-in user. Firebase mode is a live `favorites` query
// (doc id `{uid}_{propertyId}`, so toggling is naturally idempotent) plus a `favoriteFolders`
// array field on the user's own `users/{uid}` document.
import {
  collection,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { authService } from "@/lib/services/auth.service";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { getDb } from "@/lib/firebase/client";
import { toIso } from "@/lib/firebase/firestore-helpers";
import type { FavoriteEntry } from "@/types/favorites";
import { DEFAULT_FOLDERS } from "@/types/favorites";

export interface FavoritesService {
  getAll(): FavoriteEntry[];
  getFolders(): string[];
  isSaved(propertyId: string): boolean;
  subscribe(listener: () => void): () => void;
  toggle(propertyId: string, folder?: string): void;
  remove(propertyId: string): void;
  moveToFolder(propertyId: string, folder: string): void;
  addFolder(name: string): void;
}

function isBrowser() {
  return typeof window !== "undefined";
}

class MockFavoritesService implements FavoritesService {
  private entries: FavoriteEntry[] = [];
  private folders: string[] = DEFAULT_FOLDERS;
  private loadedForUserId: string | null | undefined = undefined;
  private listeners: (() => void)[] = [];

  private storageKey(userId: string) {
    return `rentlet_favorites_${userId}`;
  }
  private foldersKey(userId: string) {
    return `rentlet_favorite_folders_${userId}`;
  }

  private ensureLoaded() {
    const uid = authService.getCurrentUser()?.id ?? null;
    if (uid === this.loadedForUserId) return;
    this.loadedForUserId = uid;
    if (!uid || !isBrowser()) {
      this.entries = [];
      this.folders = DEFAULT_FOLDERS;
      return;
    }
    try {
      this.entries = JSON.parse(window.localStorage.getItem(this.storageKey(uid)) ?? "[]");
    } catch {
      this.entries = [];
    }
    try {
      const stored = JSON.parse(window.localStorage.getItem(this.foldersKey(uid)) ?? "null");
      this.folders = Array.isArray(stored) && stored.length ? stored : DEFAULT_FOLDERS;
    } catch {
      this.folders = DEFAULT_FOLDERS;
    }
  }

  private persist() {
    const uid = this.loadedForUserId;
    if (!uid || !isBrowser()) return;
    window.localStorage.setItem(this.storageKey(uid), JSON.stringify(this.entries));
    window.localStorage.setItem(this.foldersKey(uid), JSON.stringify(this.folders));
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }

  getAll(): FavoriteEntry[] {
    this.ensureLoaded();
    return this.entries;
  }
  getFolders(): string[] {
    this.ensureLoaded();
    return this.folders;
  }
  isSaved(propertyId: string): boolean {
    this.ensureLoaded();
    return this.entries.some((e) => e.propertyId === propertyId);
  }
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  toggle(propertyId: string, folder = "Saved") {
    this.ensureLoaded();
    if (this.entries.some((e) => e.propertyId === propertyId)) {
      this.entries = this.entries.filter((e) => e.propertyId !== propertyId);
    } else {
      this.entries = [...this.entries, { propertyId, folder, savedAt: new Date().toISOString() }];
    }
    this.persist();
    this.emit();
  }
  remove(propertyId: string) {
    this.ensureLoaded();
    this.entries = this.entries.filter((e) => e.propertyId !== propertyId);
    this.persist();
    this.emit();
  }
  moveToFolder(propertyId: string, folder: string) {
    this.ensureLoaded();
    this.entries = this.entries.map((e) => (e.propertyId === propertyId ? { ...e, folder } : e));
    this.persist();
    this.emit();
  }
  addFolder(name: string) {
    this.ensureLoaded();
    if (!name.trim() || this.folders.includes(name.trim())) return;
    this.folders = [...this.folders, name.trim()];
    this.persist();
    this.emit();
  }
}

// ---------------------------------------------------------------------------------------------

const COLLECTION = "favorites";
function favDocId(uid: string, propertyId: string) {
  return `${uid}_${propertyId}`;
}

class FirebaseFavoritesService implements FavoritesService {
  private entries: FavoriteEntry[] = [];
  private folders: string[] = DEFAULT_FOLDERS;
  private listeners: (() => void)[] = [];
  private boundUid: string | null | undefined = undefined;
  private unsubEntries: (() => void) | null = null;
  private unsubUser: (() => void) | null = null;

  constructor() {
    if (typeof window === "undefined") return;
    authService.subscribe((user) => this.bindToUser(user?.id ?? null));
    this.bindToUser(authService.getCurrentUser()?.id ?? null);
  }

  private bindToUser(uid: string | null) {
    if (uid === this.boundUid) return;
    this.boundUid = uid;
    this.unsubEntries?.();
    this.unsubUser?.();
    this.unsubEntries = null;
    this.unsubUser = null;

    if (!uid) {
      this.entries = [];
      this.folders = DEFAULT_FOLDERS;
      this.emit();
      return;
    }

    const q = query(collection(getDb(), COLLECTION), where("userId", "==", uid), orderBy("savedAt", "desc"));
    this.unsubEntries = onSnapshot(q, (snap) => {
      this.entries = snap.docs.map((d) => {
        const data = d.data();
        return { propertyId: data.propertyId, folder: data.folder ?? "Saved", savedAt: toIso(data.savedAt) ?? new Date().toISOString() };
      });
      this.emit();
    });

    this.unsubUser = onSnapshot(doc(getDb(), "users", uid), (snap) => {
      const stored = snap.data()?.favoriteFolders;
      this.folders = Array.isArray(stored) && stored.length ? stored : DEFAULT_FOLDERS;
      this.emit();
    });
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }

  getAll(): FavoriteEntry[] {
    return this.entries;
  }
  getFolders(): string[] {
    return this.folders;
  }
  isSaved(propertyId: string): boolean {
    return this.entries.some((e) => e.propertyId === propertyId);
  }
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  toggle(propertyId: string, folder = "Saved") {
    const uid = this.boundUid;
    if (!uid) return;
    const ref = doc(getDb(), COLLECTION, favDocId(uid, propertyId));
    if (this.isSaved(propertyId)) {
      void deleteDoc(ref);
    } else {
      void setDoc(ref, { userId: uid, propertyId, folder, savedAt: serverTimestamp() });
    }
  }
  remove(propertyId: string) {
    const uid = this.boundUid;
    if (!uid) return;
    void deleteDoc(doc(getDb(), COLLECTION, favDocId(uid, propertyId)));
  }
  moveToFolder(propertyId: string, folder: string) {
    const uid = this.boundUid;
    if (!uid) return;
    void updateDoc(doc(getDb(), COLLECTION, favDocId(uid, propertyId)), { folder });
  }
  addFolder(name: string) {
    const uid = this.boundUid;
    if (!uid || !name.trim()) return;
    // setDoc(..., {merge: true}) rather than updateDoc(): auth.service.ts no longer creates a
    // users/{uid} document (Firebase Auth is the only Firebase product login touches — see
    // auth.service.ts), so this doc may not exist yet. updateDoc() throws "No document to
    // update" in that case; a merge-write creates it on first use instead.
    void setDoc(doc(getDb(), "users", uid), { favoriteFolders: arrayUnion(name.trim()) }, { merge: true });
  }
}

export const favoritesService: FavoritesService = isFirestoreEnabled() ? new FirebaseFavoritesService() : new MockFavoritesService();
