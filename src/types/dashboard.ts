// Mirrors docs/01-database-schema.md `leads` and `visits` collections.
// The RENTLET CRM pipeline: every interested enquiry becomes a Lead that a staff
// member (relationship manager) drives through these stages to a closed deal.
export type LeadStage =
  | "lead"            // just arrived, unassigned
  | "assigned"        // a staff member owns it
  | "follow_up"       // in active contact
  | "site_visit"      // visit scheduled / done
  | "negotiation"     // price being agreed
  | "documentation"   // agreement / KYC in progress
  | "deal_closed"     // signed & paid
  | "recorded"        // written to the admin deal ledger
  | "lost";           // dropped out

export const LEAD_STAGES: LeadStage[] = [
  "lead", "assigned", "follow_up", "site_visit",
  "negotiation", "documentation", "deal_closed", "recorded",
];

export type LeadSource = "contact" | "call" | "whatsapp" | "chat" | "visit";

// Structured sub-records for the middle pipeline stages (replace ad-hoc notes).
export interface LeadVisit {
  date: string;   // yyyy-mm-dd
  slot: string;   // "11:00 AM"
  done: boolean;
}
export interface LeadNegotiation {
  asking: number | null;
  offer: number | null;
  agreed: number | null;
}
export interface LeadDocument {
  label: string;
  done: boolean;
}

export const DEFAULT_DOCUMENTS: LeadDocument[] = [
  { label: "Owner KYC", done: false },
  { label: "Tenant / Buyer KYC", done: false },
  { label: "Rental agreement / Sale deed", done: false },
  { label: "Police verification", done: false },
  { label: "Payment receipt", done: false },
];

export interface Lead {
  id: string;
  propertyId: string;
  propertyTitle: string;
  userName: string;
  userPhone: string;
  source: LeadSource;
  stage: LeadStage;
  /** relationship manager handling this lead — null until assigned */
  assignedStaff: string | null;
  /** ISO date of the next planned follow-up, or null */
  nextAction: string | null;
  /** most-recent-first activity notes from the handling staff */
  notes: string[];
  /** Site-visit sub-record */
  visit: LeadVisit | null;
  /** Negotiation sub-record */
  negotiation: LeadNegotiation | null;
  /** Documentation checklist */
  documents: LeadDocument[];
  createdAt: string;
}

export type VisitStatus = "requested" | "confirmed" | "completed" | "cancelled" | "rejected";

export interface OwnerVisit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  /** the property owner's uid — used to scope the owner-facing query in Firebase mode; null for seed data */
  ownerId: string | null;
  userName: string;
  /** requesting user's id — null for seeded/demo visits with no real requester (spec §77 shows this on both the owner and the requester's own dashboard) */
  requesterId: string | null;
  date: string;
  slot: string;
  visitorCount: number;
  message: string | null;
  status: VisitStatus;
}
