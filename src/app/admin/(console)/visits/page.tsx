"use client";

import { useMemo, useState } from "react";
import { CalendarClock, Check, X, Users, CheckCheck, Phone } from "lucide-react";
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

const FILTERS: (VisitStatus | "all")[] = ["all", "requested", "confirmed", "completed", "rejected"];

// ScheduleVisitModal packs "Contact: +91 98765… — <note>" into the visit message.
// Split it so admin sees the number on its own line and just the note as the quote.
function splitContact(message: string | null): { phone: string | null; note: string | null } {
  if (!message) return { phone: null, note: null };
  const m = message.match(/^Contact:\s*([^—]+?)\s*(?:—\s*([\s\S]*))?$/);
  if (m) return { phone: m[1].trim(), note: m[2]?.trim() || null };
  return { phone: null, note: message };
}

export default function AdminVisitsPage() {
  const visits = useVisits();
  const [filter, setFilter] = useState<VisitStatus | "all">("all");

  const shown = useMemo(
    () => (filter === "all" ? visits : visits.filter((v) => v.status === filter)),
    [visits, filter]
  );
  const pending = visits.filter((v) => v.status === "requested").length;

  function respond(id: string, status: VisitStatus, label: string) {
    visitsService.setStatus(id, status);
    toast(label, status === "confirmed" ? "success" : "info");
  }

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Scheduled Visits</h1>
        <p className="text-sm text-muted-foreground">
          {visits.length} total · {pending} awaiting confirmation
        </p>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize",
              filter === f
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-border text-foreground hover:bg-muted"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={CalendarClock}
          title="Nothing here"
          description="Visits booked by house-seekers show up here for a RENTLET manager to confirm."
        />
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {shown.map((v) => (
            <div
              key={v.id}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{v.userName}</p>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize",
                      STATUS_STYLE[v.status]
                    )}
                  >
                    {v.status}
                  </span>
                </div>
                <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{v.propertyTitle}</p>
                {(() => {
                  const { phone, note } = splitContact(v.message);
                  return (
                    <>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/70">
                        <span className="inline-flex items-center gap-1">
                          <CalendarClock className="h-3.5 w-3.5" /> {v.date}, {v.slot}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> {v.visitorCount} visitor{v.visitorCount > 1 ? "s" : ""}
                        </span>
                        {phone && (
                          <a
                            href={`tel:${phone.replace(/\s+/g, "")}`}
                            className="inline-flex items-center gap-1 font-semibold text-brand-navy hover:underline"
                          >
                            <Phone className="h-3.5 w-3.5" /> <span className="tabular-nums">{phone}</span>
                          </a>
                        )}
                      </div>
                      {note && (
                        <p className="mt-1.5 text-xs italic text-muted-foreground">&ldquo;{note}&rdquo;</p>
                      )}
                    </>
                  );
                })()}
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                {v.status === "requested" && (
                  <>
                    <button
                      type="button"
                      onClick={() => respond(v.id, "confirmed", `Visit confirmed for ${v.date}, ${v.slot} — ${v.userName} notified.`)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                    >
                      <Check className="h-3.5 w-3.5" /> Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => respond(v.id, "rejected", "Visit declined — requester notified.")}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                    >
                      <X className="h-3.5 w-3.5" /> Decline
                    </button>
                  </>
                )}
                {v.status === "confirmed" && (
                  <button
                    type="button"
                    onClick={() => respond(v.id, "completed", "Marked as completed.")}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted"
                  >
                    <CheckCheck className="h-3.5 w-3.5" /> Mark completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
