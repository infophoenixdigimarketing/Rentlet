// Property reviews. Mock mode persists to localStorage (per property, visible to anyone using
// this browser); Firebase mode is a live `reviews` query scoped to one property at a time,
// subscribed to lazily the first time a given propertyId is asked for.
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { authService } from "@/lib/services/auth.service";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { getDb } from "@/lib/firebase/client";
import { toIso } from "@/lib/firebase/firestore-helpers";
import type { Review } from "@/types/review";

export interface ReviewsService {
  getForProperty(propertyId: string): Review[];
  subscribe(propertyId: string, listener: () => void): () => void;
  add(propertyId: string, rating: number, comment: string): Promise<void>;
}

function isBrowser() {
  return typeof window !== "undefined";
}

class MockReviewsService implements ReviewsService {
  private cache = new Map<string, Review[]>();
  private listeners = new Map<string, Set<() => void>>();

  private storageKey(propertyId: string) {
    return `rentlet_reviews_${propertyId}`;
  }

  private load(propertyId: string): Review[] {
    if (this.cache.has(propertyId)) return this.cache.get(propertyId)!;
    let reviews: Review[] = [];
    if (isBrowser()) {
      try {
        reviews = JSON.parse(window.localStorage.getItem(this.storageKey(propertyId)) ?? "[]");
      } catch {
        reviews = [];
      }
    }
    this.cache.set(propertyId, reviews);
    return reviews;
  }

  private persist(propertyId: string, reviews: Review[]) {
    this.cache.set(propertyId, reviews);
    if (isBrowser()) window.localStorage.setItem(this.storageKey(propertyId), JSON.stringify(reviews));
  }

  private emit(propertyId: string) {
    this.listeners.get(propertyId)?.forEach((l) => l());
  }

  getForProperty(propertyId: string): Review[] {
    return this.load(propertyId);
  }

  subscribe(propertyId: string, listener: () => void) {
    if (!this.listeners.has(propertyId)) this.listeners.set(propertyId, new Set());
    this.listeners.get(propertyId)!.add(listener);
    return () => {
      this.listeners.get(propertyId)?.delete(listener);
    };
  }

  async add(propertyId: string, rating: number, comment: string) {
    const user = authService.getCurrentUser();
    if (!user) throw new Error("Log in to write a review.");
    const review: Review = {
      id: `rev${Date.now()}`,
      propertyId,
      userId: user.id,
      userName: user.name || "Rentlet user",
      rating,
      comment,
      createdAt: new Date().toISOString(),
    };
    this.persist(propertyId, [review, ...this.load(propertyId)]);
    this.emit(propertyId);
  }
}

// ---------------------------------------------------------------------------------------------

const COLLECTION = "reviews";

function mapReview(id: string, data: Record<string, unknown>): Review {
  return {
    id,
    propertyId: data.propertyId as string,
    userId: data.userId as string,
    userName: (data.userName as string) || "Rentlet user",
    rating: data.rating as number,
    comment: data.comment as string,
    createdAt: toIso(data.createdAt) ?? new Date().toISOString(),
  };
}

// useSyncExternalStore requires getSnapshot() to return a *stable* reference when nothing has
// changed — a fresh `[]` literal on every call reads as "changed" on every render and sends
// React into an infinite "Maximum update depth exceeded" loop (same class of bug fixed earlier
// in FirebaseVisitsService). Seeding the cache with this one shared empty array before the
// listener resolves keeps the pre-data snapshot referentially stable.
const EMPTY: Review[] = [];

class FirebaseReviewsService implements ReviewsService {
  private cache = new Map<string, Review[]>();
  private listeners = new Map<string, Set<() => void>>();
  private unsubs = new Map<string, () => void>();

  private ensureSubscribed(propertyId: string) {
    if (this.unsubs.has(propertyId)) return;
    this.cache.set(propertyId, EMPTY);
    const q = query(collection(getDb(), COLLECTION), where("propertyId", "==", propertyId), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      this.cache.set(propertyId, snap.docs.map((d) => mapReview(d.id, d.data())));
      this.emit(propertyId);
    });
    this.unsubs.set(propertyId, unsub);
  }

  private emit(propertyId: string) {
    this.listeners.get(propertyId)?.forEach((l) => l());
  }

  getForProperty(propertyId: string): Review[] {
    return this.cache.get(propertyId) ?? EMPTY;
  }

  subscribe(propertyId: string, listener: () => void) {
    this.ensureSubscribed(propertyId);
    if (!this.listeners.has(propertyId)) this.listeners.set(propertyId, new Set());
    this.listeners.get(propertyId)!.add(listener);
    return () => {
      this.listeners.get(propertyId)?.delete(listener);
    };
  }

  async add(propertyId: string, rating: number, comment: string) {
    const user = authService.getCurrentUser();
    if (!user) throw new Error("Log in to write a review.");
    await addDoc(collection(getDb(), COLLECTION), {
      propertyId,
      userId: user.id,
      userName: user.name || "Rentlet user",
      rating,
      comment,
      createdAt: serverTimestamp(),
    });
  }
}

export const reviewsService: ReviewsService = isFirestoreEnabled() ? new FirebaseReviewsService() : new MockReviewsService();
