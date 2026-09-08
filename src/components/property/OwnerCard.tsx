"use client";

import { BadgeCheck, Clock3, ShieldCheck, Headset, Phone } from "lucide-react";
import { leadsService } from "@/lib/services/leads.service";
import { notificationsService } from "@/lib/services/notifications.service";
import { useAuth } from "@/lib/auth";
import { toast } from "@/lib/toast";
import type { Property } from "@/types/property";

// Managed-brokerage model: a house-seeker never sees the owner's identity or contact on the
// public listing. This card presents RENTLET as the single point of contact; owner details
// (name, phone, email, exact address) are admin/staff-only and shared by an agent after a visit.
export function OwnerCard({ property }: { property: Property }) {
  const { user } = useAuth();

  function requestDetailsFromAgent() {
    if (!user) {
      toast("Login to get property details from a RENTLET agent", "info");
      return;
    }
    leadsService.create({
      propertyId: property.id,
      propertyTitle: property.title,
      ownerId: property.ownerId,
      userName: user.name,
      userPhone: user.phone ?? "Not shared",
      source: "contact",
    });
    notificationsService.push(
      "NEW_LEAD",
      `${user.name} requested full details for "${property.title}" — assign an agent.`,
      "/admin/pipeline"
    );
    toast("A RENTLET agent will call you with the full property details.");
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-5">
      <div className="rounded-xl border border-brand-navy/15 bg-brand-navy-light/50 p-4">
        <p className="flex items-center gap-1.5 text-sm font-bold text-brand-navy">
          <Headset className="h-4 w-4 shrink-0" /> Get details from a RENTLET agent
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Exact address, owner contact, documents and availability — an assigned agent walks you
          through everything and arranges the visit.
        </p>
        <button
          type="button"
          onClick={requestDetailsFromAgent}
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-brand-navy py-2.5 text-xs font-semibold text-white hover:bg-brand-navy-dark"
        >
          <Phone className="h-3.5 w-3.5" /> Request property details
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-foreground">Listed &amp; managed by RENTLET</p>
          <p className="text-xs text-muted-foreground">Owner details are verified and kept private.</p>
        </div>
      </div>

      <ul className="mt-3 flex flex-col gap-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" /> Identity, ownership &amp; documents checked
        </li>
        <li className="flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5" /> A relationship manager typically calls back within 2 hours
        </li>
      </ul>
    </div>
  );
}
