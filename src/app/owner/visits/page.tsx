"use client";

import { CalendarClock, Check, X, Users } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { useVisits } from "@/lib/dashboard-hooks";
import { visitsService } from "@/lib/services/visits.service";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import type { VisitStatus } from "@/types/dashboard";

const STATUS_STYLE: Record<VisitStatus, string> = {
  requested: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  completed: "bg-brand-navy-light text-brand-navy",
  cancelled: "bg-muted text-muted-foreground",
  rejected: "bg-red-100 text-red-700",
};

export default function OwnerVisitsPage() {
  const visits = useVisits();

  function respond(id: string, status: VisitStatus) {
    visitsService.setStatus(id, status);
    toast(status === "confirmed" ? "Visit confirmed" : "Visit declined", status === "confirmed" ? "success" : "info");
  }

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Scheduled Visits</h1>
        <p className="text-sm text-muted-foreground">{visits.length} visit requests across your listings</p>
      </div>

      {visits.length === 0 ? (
        <EmptyState className="mt-6" icon={CalendarClock} title="No scheduled visits" description="Visit requests from interested tenants and buyers will appear here." />
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {visits.map((v) => (
            <div key={v.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{v.userName}</p>
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize", STATUS_STYLE[v.status])}>
                    {v.status}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{v.propertyTitle}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/70">
                  <span className="inline-flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" /> {v.date}, {v.slot}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {v.visitorCount} visitor{v.visitorCount > 1 ? "s" : ""}</span>
                </div>
                {v.message && <p className="mt-1.5 text-xs italic text-muted-foreground">&ldquo;{v.message}&rdquo;</p>}
              </div>

              {v.status === "requested" && (
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => respond(v.id, "confirmed")}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                  >
                    <Check className="h-3.5 w-3.5" /> Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => respond(v.id, "rejected")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    <X className="h-3.5 w-3.5" /> Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
