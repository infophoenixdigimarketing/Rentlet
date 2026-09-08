"use client";

import { useMemo, useState } from "react";
import { ScrollText, CheckCircle2 } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useDeals } from "@/lib/dashboard-hooks";
import { dealsService } from "@/lib/services/deals.service";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<string, string> = { rent: "Rental", sale: "Sale", unknown: "—" };

function inr(v: number | null) {
  if (v == null) return "—";
  return `₹${v.toLocaleString("en-IN")}`;
}

export default function AdminDealsPage() {
  const deals = useDeals();
  const [showRecorded, setShowRecorded] = useState(true);

  const rows = useMemo(
    () => (showRecorded ? deals : deals.filter((d) => !d.recorded)),
    [deals, showRecorded]
  );

  const pending = deals.filter((d) => !d.recorded).length;

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Deal Ledger</h1>
        <p className="text-sm text-muted-foreground">
          {deals.length} closed deals · {pending} awaiting admin record
        </p>
      </div>

      <label className="mt-4 flex w-fit items-center gap-2 text-sm text-foreground">
        <input
          type="checkbox"
          checked={showRecorded}
          onChange={(e) => setShowRecorded(e.target.checked)}
          className="h-4 w-4 rounded border-border accent-brand-navy"
        />
        Show already-recorded deals
      </label>

      {rows.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={ScrollText}
          title="No deals yet"
          description="Deals appear here when a lead reaches the “Deal closed” stage in the CRM pipeline."
        />
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Property</th>
                <th className="px-4 py-3 font-semibold">Enquirer</th>
                <th className="px-4 py-3 font-semibold">Manager</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Value</th>
                <th className="px-4 py-3 font-semibold">Closed</th>
                <th className="px-4 py-3 font-semibold">Record</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.id} className="border-b border-border last:border-0">
                  <td className="max-w-[220px] px-4 py-3 text-foreground/80">
                    <span className="line-clamp-2">{d.propertyTitle}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground">{d.enquirer}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.staff}</td>
                  <td className="px-4 py-3 text-muted-foreground">{TYPE_LABEL[d.listingType]}</td>
                  <td className="px-4 py-3 tabular-nums text-foreground">{inr(d.value)}</td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{d.closedAt}</td>
                  <td className="px-4 py-3">
                    {d.recorded ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Recorded
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => dealsService.markRecorded(d.leadId)}
                        className={cn(
                          "rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-navy-dark"
                        )}
                      >
                        Mark recorded
                      </button>
                    )}
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
