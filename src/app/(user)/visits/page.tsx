"use client";

import Link from "next/link";
import { CalendarClock, Users } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { useMyVisits } from "@/lib/visits";
import { cn } from "@/lib/utils";
import type { VisitStatus } from "@/types/dashboard";

const STATUS_STYLE: Record<VisitStatus, string> = {
  requested: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  completed: "bg-brand-navy-light text-brand-navy",
  cancelled: "bg-muted text-muted-foreground",
  rejected: "bg-red-100 text-red-700",
};

export default function MyVisitsPage() {
  const { user } = useAuth();
  const visits = useMyVisits(user?.id);

  return (
    <div>
      <h1 className="text-xl font-extrabold text-foreground">Scheduled Visits</h1>
      <p className="mt-1 text-sm text-muted-foreground">{visits.length} visit requests you&apos;ve made</p>

      {visits.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={CalendarClock}
          title="No scheduled visits"
          description="Schedule a visit from any property page to see it here."
          action={
            <Link href="/properties" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
              Browse Properties
            </Link>
          }
        />
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {visits.map((v) => (
            <div key={v.id} className="rounded-2xl border border-border bg-white p-4">
              <div className="flex items-center gap-2">
                <p className="line-clamp-1 flex-1 text-sm font-semibold text-foreground">{v.propertyTitle}</p>
                <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize", STATUS_STYLE[v.status])}>
                  {v.status}
                </span>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/70">
                <span className="inline-flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" /> {v.date}, {v.slot}</span>
                <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {v.visitorCount} visitor{v.visitorCount > 1 ? "s" : ""}</span>
              </div>
              {v.message && <p className="mt-1.5 text-xs italic text-muted-foreground">&ldquo;{v.message}&rdquo;</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
