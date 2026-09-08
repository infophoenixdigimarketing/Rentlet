"use client";

import { useMemo, useState } from "react";
import { Phone, Users2, ShieldCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useLeads } from "@/lib/dashboard-hooks";
import { STAGE_META } from "@/lib/lead-pipeline";
import { cn } from "@/lib/utils";
import { LEAD_STAGES, type LeadStage } from "@/types/dashboard";

const SOURCE_LABEL: Record<string, string> = {
  contact: "Contact Form",
  call: "Call",
  whatsapp: "WhatsApp",
  chat: "Chat",
  visit: "Visit Request",
};

// Owners no longer contact enquirers directly — a RENTLET relationship manager works
// the lead. Phone numbers stay hidden; the owner sees pipeline status only.
function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return "+91 •••••••••";
  return `+91 ••••••• ${digits.slice(-2)}`;
}

export default function OwnerLeadsPage() {
  const leads = useLeads();
  const [filter, setFilter] = useState<LeadStage | "all">("all");

  const filtered = useMemo(
    () => (filter === "all" ? leads : leads.filter((l) => l.stage === filter)),
    [leads, filter]
  );

  const closed = leads.filter((l) => l.stage === "deal_closed" || l.stage === "recorded").length;

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Enquiries</h1>
        <p className="text-sm text-muted-foreground">
          {leads.length} enquiries across your listings · {closed} closed
        </p>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-xl bg-brand-navy-light/50 px-4 py-3 text-sm text-foreground">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy" />
        <p>
          A RENTLET relationship manager handles every enquiry end-to-end — follow-ups, visits,
          negotiation and paperwork. This page is a live view of where each one stands.
        </p>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {(["all", ...LEAD_STAGES] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold",
              filter === s
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-border text-foreground hover:bg-muted"
            )}
          >
            {s === "all" ? "All" : STAGE_META[s].label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState className="mt-6" icon={Users2} title="Nothing here" description="Try a different stage filter." />
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Enquirer</th>
                <th className="px-4 py-3 font-semibold">Property</th>
                <th className="px-4 py-3 font-semibold">Manager</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Stage</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-foreground">{lead.userName}</p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3 shrink-0" />
                      <span className="tabular-nums">{maskPhone(lead.userPhone)}</span>
                    </p>
                  </td>
                  <td className="max-w-[220px] px-4 py-3 text-foreground/80">
                    <span className="line-clamp-2">{lead.propertyTitle}</span>
                    {lead.negotiation?.agreed ? (
                      <span className="mt-0.5 block text-xs font-semibold text-emerald-700">
                        Agreed ₹{lead.negotiation.agreed.toLocaleString("en-IN")}
                      </span>
                    ) : lead.visit?.date ? (
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        Visit {lead.visit.date}
                        {lead.visit.slot ? ` · ${lead.visit.slot}` : ""}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {lead.assignedStaff ?? <span className="italic">Unassigned</span>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{lead.createdAt}</td>
                  <td className="px-4 py-3 text-muted-foreground">{SOURCE_LABEL[lead.source]}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2.5 py-1 text-xs font-bold",
                        STAGE_META[lead.stage].style
                      )}
                    >
                      {STAGE_META[lead.stage].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
