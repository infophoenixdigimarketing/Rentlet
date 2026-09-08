// Leads = the RENTLET CRM pipeline (spec §23, §76 + the staff-operated deal flow).
// Mock mode deterministically generates realistic-looking leads against the owner's
// property slice, seeds them across the pipeline stages with a handling staff member,
// and accepts real create() calls from the contact flow (ActionBar's trackLead).
// Firebase mode is a live `leads` query scoped to `where('ownerId', '==', session.uid)`.
import { collection, doc, addDoc, updateDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { authService } from "@/lib/services/auth.service";
import { ownerPropertiesService } from "@/lib/services/owner.service";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { getDb } from "@/lib/firebase/client";
import { toIso } from "@/lib/firebase/firestore-helpers";
import { createMockPersistence, mockId } from "@/lib/services/mock-persistence";
import { RENTLET_STAFF } from "@/lib/data/staff";
import { DEFAULT_DOCUMENTS, type Lead, type LeadStage, type LeadSource, type LeadVisit, type LeadNegotiation } from "@/types/dashboard";

const STAGE_ORDER: LeadStage[] = [
  "lead", "assigned", "follow_up", "site_visit",
  "negotiation", "documentation", "deal_closed", "recorded",
];
const reached = (stage: LeadStage, mark: LeadStage) =>
  STAGE_ORDER.indexOf(stage) >= STAGE_ORDER.indexOf(mark);

function freshDocuments() {
  return DEFAULT_DOCUMENTS.map((d) => ({ ...d }));
}

export interface CreateLeadInput {
  propertyId: string;
  propertyTitle: string;
  ownerId: string;
  userName: string;
  userPhone: string;
  source: LeadSource;
}

export interface LeadsService {
  getAll(): Lead[];
  subscribe(listener: () => void): () => void;
  /** advance / move the lead to a pipeline stage */
  setStage(id: string, stage: LeadStage): void;
  /** assign (or reassign) the handling relationship manager */
  assign(id: string, staff: string | null): void;
  /** prepend a dated activity note from the handling staff */
  addNote(id: string, note: string): void;
  /** set the next planned follow-up date (ISO yyyy-mm-dd) */
  setNextAction(id: string, date: string | null): void;
  /** site-visit sub-record */
  setVisit(id: string, visit: LeadVisit | null): void;
  /** merge a patch into the negotiation sub-record */
  setNegotiation(id: string, patch: Partial<LeadNegotiation>): void;
  /** flip one documentation-checklist item */
  toggleDocument(id: string, label: string): void;
  create(input: CreateLeadInput): void;
}

const NAMES = [
  "Kavya Iyer", "Rohan Das", "Sneha Pillai", "Vikram Nair", "Ananya Joshi",
  "Farhan Ali", "Meera Krishnan", "Aditya Kumar", "Divya Menon", "Karthik Reddy",
  "Priyanka Rao", "Suresh Babu",
];
const SOURCES: LeadSource[] = ["contact", "call", "whatsapp", "chat", "visit"];
const SEED_STAGES: LeadStage[] = [
  "lead", "assigned", "follow_up", "site_visit",
  "negotiation", "documentation", "deal_closed", "recorded",
];

function generateSeedLeads(): Lead[] {
  const properties = ownerPropertiesService.getAll();
  const leads: Lead[] = [];
  let n = 0;
  for (const property of properties) {
    const count = 2 + (property.id.charCodeAt(1) % 4);
    for (let i = 0; i < count; i++) {
      n++;
      const name = NAMES[n % NAMES.length];
      const stage = SEED_STAGES[n % SEED_STAGES.length];
      const assigned = stage === "lead" ? null : RENTLET_STAFF[n % RENTLET_STAFF.length];
      leads.push({
        id: `lead${n}`,
        propertyId: property.id,
        propertyTitle: property.title,
        userName: name,
        userPhone: `+91 9${String(100000000 + n * 37).slice(0, 9)}`,
        source: SOURCES[n % SOURCES.length],
        stage,
        assignedStaff: assigned,
        nextAction:
          stage === "lead" || stage === "recorded" || stage === "deal_closed"
            ? null
            : new Date(2026, 8, 1 + (n % 20)).toISOString().slice(0, 10),
        notes: assigned ? [`${new Date(2026, 7, 1 + (n % 24)).toISOString().slice(0, 10)} — ${assigned} picked up the lead.`] : [],
        visit: reached(stage, "site_visit")
          ? {
              date: new Date(2026, 8, 2 + (n % 18)).toISOString().slice(0, 10),
              slot: ["11:00 AM", "1:00 PM", "4:00 PM", "6:30 PM"][n % 4],
              done: reached(stage, "negotiation"),
            }
          : null,
        negotiation: reached(stage, "negotiation")
          ? {
              asking: 20000 + (n % 8) * 5000,
              offer: 18000 + (n % 8) * 5000,
              agreed: reached(stage, "documentation") ? 19000 + (n % 8) * 5000 : null,
            }
          : null,
        documents: freshDocuments().map((d, di) => ({
          ...d,
          done: reached(stage, "documentation") && di < 2 + (n % 3),
        })),
        createdAt: new Date(2026, 7, 1 + (n % 24)).toISOString().slice(0, 10),
      });
    }
  }
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// Bump when generateSeedLeads() / Lead shape changes so old cached rows are dropped.
const LEADS_SEED_VERSION = "2026-09-03";
const leadsPersistence = createMockPersistence<Lead>("rentlet:leads", LEADS_SEED_VERSION);

class MockLeadsService implements LeadsService {
  private store: Lead[];
  private listeners: (() => void)[] = [];
  private snapshot: Lead[];
  private assignCursor = 0;

  constructor() {
    this.store = leadsPersistence.load() ?? generateSeedLeads();
    this.snapshot = this.store.slice();
    leadsPersistence.save(this.store);
    // Another tab logged an enquiry / moved a pipeline stage — sync it in.
    leadsPersistence.onExternalChange((rows) => {
      this.store = rows;
      this.snapshot = this.store.slice();
      this.listeners.forEach((l) => l());
    });
  }

  /** Round-robin the next incoming lead onto a relationship manager. */
  private nextStaff(): string {
    const s = RENTLET_STAFF[this.assignCursor % RENTLET_STAFF.length];
    this.assignCursor++;
    return s;
  }

  private emit() {
    this.snapshot = this.store.slice();
    leadsPersistence.save(this.store);
    this.listeners.forEach((l) => l());
  }

  private patch(id: string, fn: (l: Lead) => Lead) {
    this.store = this.store.map((l) => (l.id === id ? fn(l) : l));
    this.emit();
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
    this.patch(id, (l) => ({
      ...l,
      stage,
      // moving off "lead" without an owner auto-claims nothing — assignment is explicit
      nextAction: stage === "deal_closed" || stage === "recorded" ? null : l.nextAction,
    }));
  }
  assign(id: string, staff: string | null) {
    this.patch(id, (l) => ({
      ...l,
      assignedStaff: staff,
      stage: staff && l.stage === "lead" ? "assigned" : l.stage,
    }));
  }
  addNote(id: string, note: string) {
    const stamped = `${new Date().toISOString().slice(0, 10)} — ${note.trim()}`;
    this.patch(id, (l) => ({ ...l, notes: [stamped, ...l.notes] }));
  }
  setNextAction(id: string, date: string | null) {
    this.patch(id, (l) => ({ ...l, nextAction: date || null }));
  }
  setVisit(id: string, visit: LeadVisit | null) {
    this.patch(id, (l) => ({ ...l, visit }));
  }
  setNegotiation(id: string, patch: Partial<LeadNegotiation>) {
    this.patch(id, (l) => ({
      ...l,
      negotiation: { asking: null, offer: null, agreed: null, ...(l.negotiation ?? {}), ...patch },
    }));
  }
  toggleDocument(id: string, label: string) {
    this.patch(id, (l) => ({
      ...l,
      documents: (l.documents.length ? l.documents : freshDocuments()).map((d) =>
        d.label === label ? { ...d, done: !d.done } : d
      ),
    }));
  }
  create(input: CreateLeadInput) {
    const staff = this.nextStaff();
    const today = new Date().toISOString().slice(0, 10);
    const lead: Lead = {
      id: mockId("lead-live"),
      propertyId: input.propertyId,
      propertyTitle: input.propertyTitle,
      userName: input.userName,
      userPhone: input.userPhone,
      source: input.source,
      stage: "assigned",
      assignedStaff: staff,
      nextAction: today,
      notes: [`${today} — Auto-assigned to ${staff} from a ${input.source} enquiry.`],
      visit: null,
      negotiation: null,
      documents: freshDocuments(),
      createdAt: today,
    };
    this.store = [lead, ...this.store];
    this.emit();
  }
}

// ---------------------------------------------------------------------------------------------

const COLLECTION = "leads";

class FirebaseLeadsService implements LeadsService {
  private snapshot: Lead[] = [];
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
      this.snapshot = [];
      this.emit();
      return;
    }
    const q = query(collection(getDb(), COLLECTION), where("ownerId", "==", uid), orderBy("createdAt", "desc"));
    this.unsub = onSnapshot(q, (snap) => {
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
      this.emit();
    });
  }

  private emit() {
    this.listeners.forEach((l) => l());
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
    const current = this.snapshot.find((l) => l.id === id)?.negotiation ?? {
      asking: null,
      offer: null,
      agreed: null,
    };
    void updateDoc(doc(getDb(), COLLECTION, id), { negotiation: { ...current, ...patch } });
  }
  toggleDocument(id: string, label: string) {
    const current = this.snapshot.find((l) => l.id === id)?.documents ?? freshDocuments();
    void updateDoc(doc(getDb(), COLLECTION, id), {
      documents: current.map((d) => (d.label === label ? { ...d, done: !d.done } : d)),
    });
  }
  create(input: CreateLeadInput) {
    const staff = RENTLET_STAFF[Date.now() % RENTLET_STAFF.length];
    const today = new Date().toISOString().slice(0, 10);
    void addDoc(collection(getDb(), COLLECTION), {
      propertyId: input.propertyId,
      propertyTitle: input.propertyTitle,
      ownerId: input.ownerId,
      userName: input.userName,
      userPhone: input.userPhone,
      source: input.source,
      stage: "assigned" as LeadStage,
      assignedStaff: staff,
      nextAction: today,
      notes: [`${today} — Auto-assigned to ${staff} from a ${input.source} enquiry.`],
      visit: null,
      negotiation: null,
      documents: freshDocuments(),
      createdAt: serverTimestamp(),
    });
  }
}

export const leadsService: LeadsService = isFirestoreEnabled() ? new FirebaseLeadsService() : new MockLeadsService();
