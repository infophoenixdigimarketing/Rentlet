"use client";

import { useMemo, useState } from "react";
import { PipelineTable, ALL_STAGES } from "@/components/crm/PipelineTable";
import { useLeads } from "@/lib/dashboard-hooks";
import { STAGE_META } from "@/lib/lead-pipeline";
import { cn } from "@/lib/utils";
import type { LeadStage } from "@/types/dashboard";

export default function AdminPipelinePage() {
  const leads = useLeads();
  const [filter, setFilter] = useState<LeadStage | "all" | "unassigned">("all");

  const filtered = useMemo(() => {
    if (filter === "all") return leads;
    if (filter === "unassigned") return leads.filter((l) => !l.assignedStaff);
    return leads.filter((l) => l.stage === filter);
  }, [leads, filter]);

  const unassigned = leads.filter((l) => !l.assignedStaff).length;
  const closed = leads.filter((l) => l.stage === "deal_closed" || l.stage === "recorded").length;

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">CRM Pipeline</h1>
        <p className="text-sm text-muted-foreground">
          {leads.length} leads · {unassigned} unassigned · {closed} closed
        </p>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {(["all", "unassigned", ...ALL_STAGES] as const).map((s) => (
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
            {s === "all" ? "All" : s === "unassigned" ? "Unassigned" : STAGE_META[s].label}
          </button>
        ))}
      </div>

      <PipelineTable leads={filtered} />
    </div>
  );
}
