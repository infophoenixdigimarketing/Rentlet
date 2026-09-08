"use client";

import { useMemo, useState } from "react";
import { ScrollText } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useDeals } from "@/lib/dashboard-hooks";
import { useStaffAuth } from "@/lib/staff-auth";
import { cn } from "@/lib/utils";

const TYPE_LABEL: Record<string, string> = { rent: "Rental", sale: "Sale", unknown: "—" };

export default function StaffDealsPage() {
  const { staff } = useStaffAuth();
  const deals = useDeals();
  const [scope, setScope] = useState<"mine" | "all">("mine");

  const rows = useMemo(
    () => (scope === "mine" ? deals.filter((d) => d.staff === staff?.name) : deals),
    [deals, scope, staff]
  );

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Closed Deals</h1>
        <p className="text-sm text-muted-foreground">
          {deals.filter((d) => d.staff === staff?.name).length} closed by {staff?.name}
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
            {s === "mine" ? "Mine" : "All"}
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={ScrollText}
          title="No closed deals yet"
          description="Move a lead to the “Deal closed” stage to record it here."
        />
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-semibold">Property</th>
                <th className="px-4 py-3 font-semibold">Enquirer</th>
                <th className="px-4 py-3 font-semibold">Type</th>
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
                  <td className="px-4 py-3 text-muted-foreground">{TYPE_LABEL[d.listingType]}</td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{d.closedAt}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-bold",
                        d.recorded ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      )}
                    >
                      {d.recorded ? "Recorded" : "Pending admin"}
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
