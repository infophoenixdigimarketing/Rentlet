// Site-wide visits, for admin/staff consoles only (admin/visits, staff/pipeline's future use).
// visits.service.ts's Firebase implementation is deliberately scoped to `where('ownerId', '==',
// <signed-in user>)` for the owner dashboard — an admin signed into the same Firebase Auth
// session would otherwise only ever see visits on properties they personally own. Mock mode
// already has one shared store with no such scoping, so it's reused as-is; only Firebase mode
// needs a real unfiltered listener (readable by a real admin per firestore.rules' isAdmin()).
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { getDb } from "@/lib/firebase/client";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { visitsService } from "@/lib/services/visits.service";
import { notificationsService } from "@/lib/services/notifications.service";
import type { OwnerVisit, VisitStatus } from "@/types/dashboard";

export interface AdminVisitsService {
  getAll(): OwnerVisit[];
  subscribe(listener: () => void): () => void;
  setStatus(id: string, status: VisitStatus): void;
}

function notifyStatusChange(visit: OwnerVisit, status: VisitStatus) {
  if (status === "confirmed") {
    notificationsService.push("VISIT_ACCEPTED", `Your visit for ${visit.propertyTitle} on ${visit.date} was confirmed.`, "/visits");
  } else if (status === "rejected") {
    notificationsService.push("VISIT_REJECTED", `Your visit request for ${visit.propertyTitle} was declined.`, "/visits");
  }
}

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

class FirebaseAdminVisitsService implements AdminVisitsService {
  private snapshot: OwnerVisit[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window === "undefined") return;
    const q = query(collection(getDb(), COLLECTION), orderBy("date", "desc"));
    onSnapshot(
      q,
      (snap) => {
        this.snapshot = snap.docs.map((d) => toVisit(d.id, d.data()));
        this.listeners.forEach((l) => l());
      },
      () => {
        // Not signed in as a real admin — the unfiltered query is rejected outright.
        this.snapshot = [];
        this.listeners.forEach((l) => l());
      }
    );
  }

  getAll(): OwnerVisit[] {
    return this.snapshot;
  }
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  setStatus(id: string, status: VisitStatus) {
    void updateDoc(doc(getDb(), COLLECTION, id), { status }).then(() => {
      const visit = this.snapshot.find((v) => v.id === id);
      if (visit) notifyStatusChange({ ...visit, status }, status);
    });
  }
}

export const adminVisitsService: AdminVisitsService = isFirestoreEnabled()
  ? new FirebaseAdminVisitsService()
  : visitsService;
