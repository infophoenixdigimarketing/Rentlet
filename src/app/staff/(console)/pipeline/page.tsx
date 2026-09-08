"use client";

import { useMemo, useState } from "react";
import { PipelineTable, ALL_STAGES } from "@/components/crm/PipelineTable";
import { useLeads } from "@/lib/dashboard-hooks";
import { useStaffAuth } from "@/lib/staff-auth";
import { STAGE_META } from "@/lib/lead-pipeline";
import { cn } from "@/lib/utils";
import type { LeadStage } from "@/types/dashboard";

export default function StaffPipelinePage() {
  const { staff } = useStaffAuth();
  const leads = useLeads();
  const [scope, setScope] = useState<"mine" | "all">("mine");
  const [stage, setStage] = useState<LeadStage | "all">("all");

  const mine = useMemo(
    () => leads.filter((l) => l.assignedStaff === staff?.name),
    [leads, staff]
  );
  const base = scope === "mine" ? mine : leads;
  const filtered = useMemo(
    () => (stage === "all" ? base : base.filter((l) => l.stage === stage)),
    [base, stage]
  );

  const dueToday = mine.filter(
    (l) => l.nextAction && l.nextAction <= new Date().toISOString().slice(0, 10)
  ).length;

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">My Pipeline</h1>
        <p className="text-sm text-muted-foreground">
          {mine.length} leads assigned to {staff?.name} · {dueToday} follow-ups due
        </p>
      </div>

      <div className="mt-4 inline-flex rounded-full border border-border p-0.5 text-xs font-semibold">
        {(["mine", "all"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setScope(s)}
            className={cn(
              "rounded-full px-4 py-1.5",
              scope === s ? "bg-brand-navy text-white" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {s === "mine" ? "My leads" : "All leads"}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {(["all", ...ALL_STAGES] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStage(s)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold",
              stage === s
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-border text-foreground hover:bg-muted"
            )}
          >
            {s === "all" ? "All stages" : STAGE_META[s].label}
          </button>
        ))}
      </div>

      <PipelineTable leads={filtered} />
    </div>
  );
}
