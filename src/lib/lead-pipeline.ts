import type { LeadStage } from "@/types/dashboard";

// Presentation for each CRM pipeline stage — shared by the owner (read-only) and
// admin/staff (editable) lead views so labels and colours never drift.
export const STAGE_META: Record<LeadStage, { label: string; style: string; step: number | null }> = {
  lead:          { label: "New lead",       style: "bg-brand-navy-light text-brand-navy",   step: 1 },
  assigned:      { label: "Assigned",       style: "bg-sky-100 text-sky-700",               step: 2 },
  follow_up:     { label: "Follow-up",      style: "bg-amber-100 text-amber-700",           step: 3 },
  site_visit:    { label: "Site visit",     style: "bg-indigo-100 text-indigo-700",         step: 4 },
  negotiation:   { label: "Negotiation",    style: "bg-orange-100 text-orange-700",         step: 5 },
  documentation: { label: "Documentation",  style: "bg-violet-100 text-violet-700",         step: 6 },
  deal_closed:   { label: "Deal closed",    style: "bg-emerald-600 text-white",             step: 7 },
  recorded:      { label: "Admin record",   style: "bg-emerald-100 text-emerald-700",       step: 8 },
  lost:          { label: "Lost",           style: "bg-red-100 text-red-700",               step: null },
};

export function stageLabel(stage: LeadStage) {
  return STAGE_META[stage].label;
}
