// Visits (spec §15 / §77). Mock mode deterministically seeds owner-side demo visits and accepts
// real create() calls from ScheduleVisitModal. Firebase mode is two live `visits` queries — one
// scoped to `ownerId` (what the owner dashboard shows) and one scoped to `requesterId` (what the
// requester's own /visits page shows) — both reading the same collection.
import { collection, doc, addDoc, updateDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { authService } from "@/lib/services/auth.service";
import { ownerPropertiesService } from "@/lib/services/owner.service";
import { notificationsService } from "@/lib/services/notifications.service";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { getDb } from "@/lib/firebase/client";
import { createMockPersistence, mockId } from "@/lib/services/mock-persistence";
import type { OwnerVisit, VisitStatus } from "@/types/dashboard";

export interface CreateVisitInput {
  propertyId: string;
  propertyTitle: string;
  ownerId: string;
  requesterId: string;
  requesterName: string;
  date: string;
  slot: string;
  visitorCount: number;
  message: string | null;
}

export interface VisitsService {
  /** Visits FOR the signed-in owner's properties. */
  getAll(): OwnerVisit[];
  /** Visits the given user requested, on properties they don't own. */
  getMine(userId: string): OwnerVisit[];
  subscribe(listener: () => void): () => void;
  create(input: CreateVisitInput): OwnerVisit;
  setStatus(id: string, status: VisitStatus): void;
}

function notifyStatusChange(visit: OwnerVisit, status: VisitStatus) {
  if (status === "confirmed") {
    notificationsService.push("VISIT_ACCEPTED", `Your visit for ${visit.propertyTitle} on ${visit.date} was confirmed.`, "/visits");
  } else if (status === "rejected") {
    notificationsService.push("VISIT_REJECTED", `Your visit request for ${visit.propertyTitle} was declined.`, "/visits");
  }
}

const NAMES = ["Ritika Shah", "Arjun Malhotra", "Pooja Verma", "Nikhil Bhatt", "Shreya Gupta", "Manish Tiwari"];
const SLOTS = ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "6:00 PM"];
const STATUSES: VisitStatus[] = ["requested", "requested", "confirmed", "completed", "cancelled"];

function generateSeedVisits(): OwnerVisit[] {
  const properties = ownerPropertiesService.getAll().slice(0, 6);
  return properties.map((property, i) => {
    // Same "Contact: … — note" shape ScheduleVisitModal produces, so the admin Visits
    // page shows a real contact number for the demo rows too.
    const phone = `+91 ${String(90000_00000 + i * 21349)}`.slice(0, 14);
    const note = i % 2 === 0 ? "Looking to move in within a month." : "";
    return {
      id: `visit${i + 1}`,
      propertyId: property.id,
      propertyTitle: property.title,
      ownerId: property.ownerId,
      userName: NAMES[i % NAMES.length],
      requesterId: null,
      date: new Date(2026, 7, 26 + i).toISOString().slice(0, 10),
      slot: SLOTS[i % SLOTS.length],
      visitorCount: 1 + (i % 3),
      message: note ? `Contact: ${phone} — ${note}` : `Contact: ${phone}`,
      status: STATUSES[i % STATUSES.length],
    };
  });
}

// Bump when generateSeedVisits() / OwnerVisit shape changes so old cached rows are dropped.
const VISITS_SEED_VERSION = "2026-09-03";
const visitsPersistence = createMockPersistence<OwnerVisit>("rentlet:visits", VISITS_SEED_VERSION);

class MockVisitsService implements VisitsService {
  private store: OwnerVisit[];
  private listeners: (() => void)[] = [];
  private snapshot: OwnerVisit[];
  private mineCache: Record<string, OwnerVisit[]> = {};

  constructor() {
    // Rows persisted by an earlier session/other tab win; otherwise seed and publish that
    // baseline so every tab starts from the same list.
    this.store = visitsPersistence.load() ?? generateSeedVisits();
    this.snapshot = this.store.slice();
    visitsPersistence.save(this.store);
    // Another tab created / confirmed a visit — pull its rows in and re-render.
    visitsPersistence.onExternalChange((rows) => {
      this.store = rows;
      this.snapshot = this.store.slice();
      this.mineCache = {};
      this.listeners.forEach((l) => l());
    });
  }

  private emit() {
    this.snapshot = this.store.slice();
    this.mineCache = {};
    visitsPersistence.save(this.store);
    this.listeners.forEach((l) => l());
  }

  getAll(): OwnerVisit[] {
    return this.snapshot;
  }
  getMine(userId: string): OwnerVisit[] {
    if (!this.mineCache[userId]) {
      this.mineCache[userId] = this.snapshot.filter((v) => v.requesterId === userId);
    }
    return this.mineCache[userId];
  }
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  create(input: CreateVisitInput): OwnerVisit {
    const visit: OwnerVisit = {
      id: mockId("visit"),
      propertyId: input.propertyId,
      propertyTitle: input.propertyTitle,
      ownerId: input.ownerId,
      userName: input.requesterName,
      requesterId: input.requesterId,
      date: input.date,
      slot: input.slot,
      visitorCount: input.visitorCount,
      message: input.message,
      status: "requested",
    };
    this.store = [visit, ...this.store];
    this.emit();
    return visit;
  }
  setStatus(id: string, status: VisitStatus) {
    this.store = this.store.map((v) => (v.id === id ? { ...v, status } : v));
    this.emit();
    const visit = this.store.find((v) => v.id === id);
    if (visit) notifyStatusChange(visit, status);
  }
}

// ---------------------------------------------------------------------------------------------

const COLLECTION = "visits";

function toVisit(id: string, data: Record<string, unknown>): OwnerVisit {
  return {
    id,
    propertyId: data.propertyId as string,
    propertyTitle: data.propertyTitle as string,
    ownerId: (data.ownerId as string) ?? null,
    userName: data.userName as string,
    requesterId: (data.requesterId as string) ?? null,
    date: data.date as string,
    slot: data.slot as string,
    visitorCount: (data.visitorCount as number) ?? 1,
    message: (data.message as string) ?? null,
    status: data.status as VisitStatus,
  };
}

class FirebaseVisitsService implements VisitsService {
  private ownerSnapshot: OwnerVisit[] = [];
  private mineSnapshots: Record<string, OwnerVisit[]> = {};
  private mineUnsubs: Record<string, () => void> = {};
  private listeners: (() => void)[] = [];
  private boundUid: string | null | undefined = undefined;
  private unsubOwner: (() => void) | null = null;

  constructor() {
    if (typeof window === "undefined") return;
    authService.subscribe((user) => this.bindToUser(user?.id ?? null));
    this.bindToUser(authService.getCurrentUser()?.id ?? null);
  }

  private bindToUser(uid: string | null) {
    if (uid === this.boundUid) return;
    this.boundUid = uid;
    this.unsubOwner?.();
    this.unsubOwner = null;
    if (!uid) {
      this.ownerSnapshot = [];
      this.emit();
      return;
    }
    const q = query(collection(getDb(), COLLECTION), where("ownerId", "==", uid), orderBy("date", "desc"));
    this.unsubOwner = onSnapshot(q, (snap) => {
      this.ownerSnapshot = snap.docs.map((d) => toVisit(d.id, d.data()));
      this.emit();
    });
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }

  getAll(): OwnerVisit[] {
    return this.ownerSnapshot;
  }

  getMine(userId: string): OwnerVisit[] {
    if (!this.mineUnsubs[userId]) {
      const q = query(collection(getDb(), COLLECTION), where("requesterId", "==", userId), orderBy("date", "desc"));
      this.mineUnsubs[userId] = onSnapshot(q, (snap) => {
        this.mineSnapshots[userId] = snap.docs.map((d) => toVisit(d.id, d.data()));
        this.emit();
      });
    }
    return this.mineSnapshots[userId] ?? [];
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  create(input: CreateVisitInput): OwnerVisit {
    const optimistic: OwnerVisit = {
      id: `pending-${Date.now()}`,
      propertyId: input.propertyId,
      propertyTitle: input.propertyTitle,
      ownerId: input.ownerId,
      userName: input.requesterName,
      requesterId: input.requesterId,
      date: input.date,
      slot: input.slot,
      visitorCount: input.visitorCount,
      message: input.message,
      status: "requested",
    };
    void addDoc(collection(getDb(), COLLECTION), {
      propertyId: input.propertyId,
      propertyTitle: input.propertyTitle,
      ownerId: input.ownerId,
      userName: input.requesterName,
      requesterId: input.requesterId,
      date: input.date,
      slot: input.slot,
      visitorCount: input.visitorCount,
      message: input.message,
      status: "requested" as VisitStatus,
      createdAt: serverTimestamp(),
    });
    return optimistic;
  }

  setStatus(id: string, status: VisitStatus) {
    void updateDoc(doc(getDb(), COLLECTION, id), { status }).then(() => {
      const visit = this.ownerSnapshot.find((v) => v.id === id);
      if (visit) notifyStatusChange({ ...visit, status }, status);
    });
  }
}

export const visitsService: VisitsService = isFirestoreEnabled() ? new FirebaseVisitsService() : new MockVisitsService();
