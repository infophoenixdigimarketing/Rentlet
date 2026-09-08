"use client";

import { useEffect, useRef, useState } from "react";
import { Headset, CalendarClock, Heart, Share2, UserRound, ChevronDown, FileText } from "lucide-react";
import { ScheduleVisitModal } from "@/components/property/ScheduleVisitModal";
import { AgreementModal } from "@/components/property/AgreementModal";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { notificationsService } from "@/lib/services/notifications.service";
import { leadsService } from "@/lib/services/leads.service";
import { useIsFavorited } from "@/lib/favorites";
import { toggleFavorite } from "@/lib/favorite-actions";
import { useAuth } from "@/lib/auth";
import type { Property } from "@/types/property";
import type { AuthUser } from "@/types/user";

const GENDER_LABEL: Record<string, string> = {
  male: "For Men",
  female: "For Women",
  any: "For Anyone",
};

// Options shown when the gender pill is clicked.
const GENDER_OPTIONS: { value: string; label: string }[] = [
  { value: "female", label: "For Women" },
  { value: "male", label: "For Men" },
  { value: "any", label: "Both / Anyone" },
];

// Managed-brokerage model (spec §76): seekers never contact the owner directly. A single
// "Contact agent" action writes a CRM lead — it's auto-assigned to a RENTLET relationship
// manager, shows on the admin pipeline, and the owner sees a read-only status on /owner/leads.
function contactAgent(property: Property, user: AuthUser | null) {
  if (!user) {
    toast("Login to contact a RENTLET agent about this property", "info");
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
    `${user.name} wants to contact an agent about "${property.title}" — assign a manager.`,
    "/admin/pipeline"
  );
  toast("A RENTLET agent will call you shortly with the full property details.");
}

export function ActionBar({ property }: { property: Property }) {
  const { user } = useAuth();
  const saved = useIsFavorited(property.id);
  const [visitOpen, setVisitOpen] = useState(false);
  const [agreementOpen, setAgreementOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderChoice, setGenderChoice] = useState<string>(property.genderPreference ?? "any");
  const genderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!genderOpen) return;
    function onDown(e: MouseEvent) {
      if (genderRef.current && !genderRef.current.contains(e.target as Node)) setGenderOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [genderOpen]);

  function toggleSave() {
    toggleFavorite(property.id);
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: property.title, url });
        return;
      } catch {
        // user cancelled — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      toast("Link copied to clipboard");
    } catch {
      toast("Couldn't copy link", "error");
    }
  }

  return (
    <>
      {/* Desktop / tablet action row */}
      <div className="hidden flex-wrap items-center gap-2 sm:flex">
        <button
          type="button"
          onClick={() => contactAgent(property, user)}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-dark"
        >
          <Headset className="h-4 w-4" /> Contact Agent
        </button>
        <button
          type="button"
          onClick={() => setVisitOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-orange-dark"
        >
          <CalendarClock className="h-4 w-4" /> Schedule Visit
        </button>
        <button
          type="button"
          aria-pressed={saved}
          onClick={toggleSave}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
        >
          <Heart className={cn("h-4 w-4", saved && "fill-brand-orange text-brand-orange")} /> Save
        </button>
        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
        >
          <Share2 className="h-4 w-4" /> Share
        </button>
        {property.listingType === "rent" && (
          <button
            type="button"
            onClick={() => setAgreementOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
          >
            <FileText className="h-4 w-4" /> Agreement
          </button>
        )}

        {property.genderPreference && (
          <div ref={genderRef} className="relative">
            <button
              type="button"
              onClick={() => setGenderOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={genderOpen}
              className="inline-flex items-center gap-2 rounded-xl border border-brand-orange/30 bg-brand-orange-light px-3.5 py-2.5 text-sm font-semibold text-brand-orange-dark hover:bg-brand-orange-light/70"
            >
              <UserRound className="h-4 w-4" />
              {GENDER_LABEL[genderChoice] ?? "For Anyone"}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", genderOpen && "rotate-180")} />
            </button>

            {genderOpen && (
              <div className="absolute left-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-white p-1.5 shadow-xl shadow-black/10">
                {GENDER_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => {
                      setGenderChoice(o.value);
                      setGenderOpen(false);
                    }}
                    className={cn(
                      "block w-full rounded-lg px-2.5 py-2 text-left text-sm font-medium hover:bg-muted",
                      genderChoice === o.value ? "text-brand-navy" : "text-foreground/85"
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile sticky bottom bar (spec §33) */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-border bg-white/95 p-3 backdrop-blur sm:hidden">
        <button
          type="button"
          aria-label="Save property"
          aria-pressed={saved}
          onClick={toggleSave}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-foreground"
        >
          <Heart className={cn("h-5 w-5", saved && "fill-brand-orange text-brand-orange")} />
        </button>
        <button
          type="button"
          onClick={() => contactAgent(property, user)}
          className="flex flex-[1.4] items-center justify-center gap-1.5 rounded-xl bg-brand-navy py-3 text-sm font-semibold text-white"
        >
          <Headset className="h-4 w-4" /> Contact Agent
        </button>
        <button
          type="button"
          onClick={() => setVisitOpen(true)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-orange py-3 text-sm font-semibold text-white"
        >
          <CalendarClock className="h-4 w-4" /> Visit
        </button>
      </div>

      <ScheduleVisitModal open={visitOpen} onClose={() => setVisitOpen(false)} propertyId={property.id} propertyTitle={property.title} ownerId={property.ownerId} />
      <AgreementModal open={agreementOpen} onClose={() => setAgreementOpen(false)} property={property} />
    </>
  );
}
