"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Flag } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAdminReports } from "@/lib/admin-data";
import { adminReportsService } from "@/lib/services/admin-reports.service";
import { REPORT_REASON_LABEL } from "@/lib/data/admin-seed";
import { cn } from "@/lib/utils";
import type { ReportStatus } from "@/types/admin";

const STATUSES: { id: ReportStatus; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "investigating", label: "Investigating" },
  { id: "resolved", label: "Resolved" },
  { id: "rejected", label: "Rejected" },
];

const STATUS_STYLE: Record<ReportStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  investigating: "bg-brand-navy-light text-brand-navy",
  resolved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-muted text-muted-foreground",
};

export default function AdminReportsPage() {
  const reports = useAdminReports();
  const [filter, setFilter] = useState<ReportStatus | "all">("all");

  const filtered = useMemo(() => (filter === "all" ? reports : reports.filter((r) => r.status === filter)), [reports, filter]);

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground">{reports.filter((r) => r.status === "pending").length} pending review</p>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {(["all", ...STATUSES.map((s) => s.id)] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize",
              filter === s ? "border-brand-navy bg-brand-navy text-white" : "border-border bg-white text-foreground hover:bg-muted"
            )}
          >
            {s === "all" ? "All" : STATUSES.find((x) => x.id === s)?.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState className="mt-6" icon={Flag} title="No reports here" description="Try a different status filter." />
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {filtered.map((r) => (
            <div key={r.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">{REPORT_REASON_LABEL[r.reason]}</span>
                  <span className="text-xs text-muted-foreground">reported by {r.reportedBy} · {r.createdAt}</span>
                </div>
                <p className="mt-1.5 line-clamp-1 text-sm font-semibold text-foreground">{r.propertyTitle}</p>
                {r.details && <p className="mt-0.5 text-xs text-muted-foreground">{r.details}</p>}
                <Link href={`/admin/properties`} className="mt-1.5 inline-block text-xs font-semibold text-brand-navy hover:underline">
                  Review listing →
                </Link>
              </div>

              <select
                value={r.status}
                onChange={(e) => adminReportsService.setStatus(r.id, e.target.value as ReportStatus)}
                className={cn("shrink-0 rounded-full border-0 px-3 py-1.5 text-xs font-bold capitalize outline-none", STATUS_STYLE[r.status])}
              >
                {STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
