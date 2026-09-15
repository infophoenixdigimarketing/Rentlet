// Site-wide leads, for admin/staff consoles only (admin/pipeline, staff/pipeline). Same reasoning
// as admin-visits.service.ts: leads.service.ts's Firebase implementation is scoped to the
// signed-in user's own ownerId for the owner dashboard, which would hide every other owner's
// leads from the admin/staff pipeline. Mock mode already has one shared, unscoped store.
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDb, getFirebaseAuth } from "@/lib/firebase/client";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { leadsService } from "@/lib/services/leads.service";
import { toIso } from "@/lib/firebase/firestore-helpers";
import { DEFAULT_DOCUMENTS, type Lead, type LeadStage, type LeadVisit, type LeadNegotiation } from "@/types/dashboard";

export interface AdminLeadsService {
  getAll(): Lead[];
  subscribe(listener: () => void): () => void;
  setStage(id: string, stage: LeadStage): void;
  assign(id: string, staff: string | null): void;
  addNote(id: string, note: string): void;
  setNextAction(id: string, date: string | null): void;
  setVisit(id: string, visit: LeadVisit | null): void;
  setNegotiation(id: string, patch: Partial<LeadNegotiation>): void;
  toggleDocument(id: string, label: string): void;
}

function freshDocuments() {
  return DEFAULT_DOCUMENTS.map((d) => ({ ...d }));
}

const COLLECTION = "leads";

class FirebaseAdminLeadsService implements AdminLeadsService {
  private snapshot: Lead[] = [];
  private listeners: (() => void)[] = [];

  private unsubQuery: (() => void) | null = null;

  constructor() {
    if (typeof window === "undefined") return;
    // Subscribing to this query immediately (at module-load time) can race Firebase Auth
    // restoring the session after a page load/navigation — if the very first attempt lands
    // before that finishes, the query is rejected as unauthenticated and Firestore does NOT
    // retry on its own once a listener has errored out, even after the real session resolves a
    // moment later. onAuthStateChanged always fires with the actual, settled auth state, so
    // wait for that instead of subscribing blindly (and re-subscribe if the signed-in user ever
    // changes, matching the pattern already used for the owner-scoped services).
    onAuthStateChanged(getFirebaseAuth(), () => {
      this.unsubQuery?.();
      this.unsubQuery = null;
      const q = query(collection(getDb(), COLLECTION), orderBy("createdAt", "desc"));
      this.unsubQuery = onSnapshot(
        q,
        (snap) => {
          this.snapshot = snap.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              propertyId: data.propertyId,
              propertyTitle: data.propertyTitle,
              userName: data.userName,
              userPhone: data.userPhone,
              source: data.source,
              stage: (data.stage ?? "lead") as LeadStage,
              assignedStaff: data.assignedStaff ?? null,
              nextAction: toIso(data.nextAction) ?? null,
              notes: Array.isArray(data.notes) ? data.notes : [],
              visit: data.visit ?? null,
              negotiation: data.negotiation ?? null,
              documents: Array.isArray(data.documents) && data.documents.length ? data.documents : freshDocuments(),
              createdAt: toIso(data.createdAt) ?? new Date().toISOString(),
            } as Lead;
          });
          this.listeners.forEach((l) => l());
        },
        () => {
          this.snapshot = [];
          this.listeners.forEach((l) => l());
        }
      );
    });
  }

  getAll(): Lead[] {
    return this.snapshot;
  }
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  setStage(id: string, stage: LeadStage) {
    void updateDoc(doc(getDb(), COLLECTION, id), { stage });
  }
  assign(id: string, staff: string | null) {
    void updateDoc(doc(getDb(), COLLECTION, id), { assignedStaff: staff });
  }
  addNote(id: string, note: string) {
    const stamped = `${new Date().toISOString().slice(0, 10)} — ${note.trim()}`;
    const current = this.snapshot.find((l) => l.id === id)?.notes ?? [];
    void updateDoc(doc(getDb(), COLLECTION, id), { notes: [stamped, ...current] });
  }
  setNextAction(id: string, date: string | null) {
    void updateDoc(doc(getDb(), COLLECTION, id), { nextAction: date || null });
  }
  setVisit(id: string, visit: LeadVisit | null) {
    void updateDoc(doc(getDb(), COLLECTION, id), { visit });
  }
  setNegotiation(id: string, patch: Partial<LeadNegotiation>) {
    const current = this.snapshot.find((l) => l.id === id)?.negotiation ?? { asking: null, offer: null, agreed: null };
    void updateDoc(doc(getDb(), COLLECTION, id), { negotiation: { ...current, ...patch } });
  }
  toggleDocument(id: string, label: string) {
    const current = this.snapshot.find((l) => l.id === id)?.documents ?? freshDocuments();
    void updateDoc(doc(getDb(), COLLECTION, id), {
      documents: current.map((d) => (d.label === label ? { ...d, done: !d.done } : d)),
    });
  }
}

export const adminLeadsService: AdminLeadsService = isFirestoreEnabled() ? new FirebaseAdminLeadsService() : leadsService;
