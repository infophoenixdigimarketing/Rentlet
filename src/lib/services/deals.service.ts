// The "ADMIN RECORD" terminal node of the CRM pipeline: when a staff member marks a
// lead "Deal closed", a Deal is written to this immutable ledger; "Admin record"
// acknowledges it. Mock-only for now (no `deals` collection wired to Firebase yet).
import { leadsService } from "@/lib/services/leads.service";
import type { Lead } from "@/types/dashboard";

export interface Deal {
  id: string;
  leadId: string;
  propertyId: string;
  propertyTitle: string;
  enquirer: string;
  staff: string;
  listingType: "rent" | "sale" | "unknown";
  closedAt: string;
  /** monthly rent or sale price at close, if known */
  value: number | null;
  recorded: boolean;
}

class DealsService {
  private store: Deal[] = [];
  private listeners: (() => void)[] = [];
  private snapshot = this.store.slice();
  private backfilled = false;

  private emit() {
    this.snapshot = this.store.slice();
    this.listeners.forEach((l) => l());
  }

  // Leads already sitting at "deal_closed" / "recorded" (seed data or an earlier session)
  // should show in the ledger too — materialise them the first time it's read.
  private backfill() {
    if (this.backfilled) return;
    this.backfilled = true;
    for (const lead of leadsService.getAll()) {
      if (lead.stage !== "deal_closed" && lead.stage !== "recorded") continue;
      if (this.hasForLead(lead.id)) continue;
      this.store.push({
        id: `deal-${lead.id}`,
        leadId: lead.id,
        propertyId: lead.propertyId,
        propertyTitle: lead.propertyTitle,
        enquirer: lead.userName,
        staff: lead.assignedStaff ?? "Unassigned",
        listingType: "unknown",
        closedAt: lead.createdAt,
        value: lead.negotiation?.agreed ?? null,
        recorded: lead.stage === "recorded",
      });
    }
    this.store.sort((a, b) => b.closedAt.localeCompare(a.closedAt));
    this.snapshot = this.store.slice();
  }

  getAll(): Deal[] {
    this.backfill();
    return this.snapshot;
  }
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  hasForLead(leadId: string) {
    return this.store.some((d) => d.leadId === leadId);
  }
  /** Idempotent — called when a lead reaches the "deal_closed" stage. */
  recordFromLead(lead: Lead, opts: { listingType?: "rent" | "sale"; value?: number | null } = {}) {
    if (this.hasForLead(lead.id)) return;
    this.store = [
      {
        id: `deal-${lead.id}`,
        leadId: lead.id,
        propertyId: lead.propertyId,
        propertyTitle: lead.propertyTitle,
        enquirer: lead.userName,
        staff: lead.assignedStaff ?? "Unassigned",
        listingType: opts.listingType ?? "unknown",
        closedAt: new Date().toISOString().slice(0, 10),
        value: opts.value ?? null,
        recorded: false,
      },
      ...this.store,
    ];
    this.emit();
  }
  markRecorded(leadId: string) {
    this.store = this.store.map((d) => (d.leadId === leadId ? { ...d, recorded: true } : d));
    this.emit();
  }
}

export const dealsService = new DealsService();
