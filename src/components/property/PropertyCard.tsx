"use client";

import Link from "next/link";
import { Heart, BedDouble, Bath, Ruler, ShieldCheck, Phone } from "lucide-react";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { Badge } from "@/components/ui/Badge";
import { cn, priceLabel, formatINR } from "@/lib/utils";
import { amenityMap } from "@/lib/data/amenities";
import { useIsFavorited } from "@/lib/favorites";
import { toggleFavorite } from "@/lib/favorite-actions";
import { useAuth } from "@/lib/auth";
import { toPublicProperty } from "@/lib/public-property";
import { leadsService } from "@/lib/services/leads.service";
import { notificationsService } from "@/lib/services/notifications.service";
import { toast } from "@/lib/toast";
import type { Property } from "@/types/property";

export function PropertyCard({ property: raw, className }: { property: Property; className?: string }) {
  // Public surface — never expose owner identity or exact location.
  const property = toPublicProperty(raw);
  const saved = useIsFavorited(property.id);
  const { user } = useAuth();
  const detailHref = `/property/${property.slug}/${property.id}`;
  // Viewing a property requires an account — send logged-out users to login first.
  const href = user ? detailHref : `/login?next=${encodeURIComponent(detailHref)}`;

  // Owner phone/address aren't on the listing — this raises a CRM lead so a RENTLET
  // agent calls the seeker with the full details (mirrors OwnerCard on the detail page).
  function askAgent() {
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
    <div
      className={cn(
        "group flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10",
        className
      )}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Link href={href} className="absolute inset-0 block" aria-label={property.title}>
          {property.images[0] ? (
            // eslint-disable-next-line @next/next/no-img-element -- local /public asset, not user-uploaded/remote
            <img
              src={property.images[0]}
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <PropertyImage
              id={property.id}
              propertyType={property.propertyType}
              locality={property.locality}
              city={property.city}
              className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </Link>
        <div className="pointer-events-none absolute left-3 right-11 top-3 flex flex-wrap gap-1.5">
          {property.featured && <Badge variant="orange">FEATURED</Badge>}
          {property.verificationStatus === "approved" && (
            <Badge variant="verified">
              <ShieldCheck className="h-3 w-3" /> VERIFIED
            </Badge>
          )}
          {property.postedBy === "owner" && <Badge variant="outline">OWNER</Badge>}
        </div>
        <button
          type="button"
          aria-label={saved ? "Remove from favorites" : "Save property"}
          aria-pressed={saved}
          onClick={() => toggleFavorite(property.id)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow transition-transform hover:scale-110"
        >
          <Heart className={cn("h-4 w-4 transition-colors", saved && "fill-brand-orange text-brand-orange")} />
        </button>
      </div>

      <Link href={href} className="flex flex-1 flex-col p-4 pb-0">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-lg font-extrabold text-brand-navy">{priceLabel(property)}</span>
          {property.listingType === "rent" && property.deposit != null && (
            <span className="text-xs font-medium text-muted-foreground">
              {formatINR(property.deposit)} Deposit
            </span>
          )}
        </div>

        <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-foreground">{property.title}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {property.locality}, {property.city}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/70">
          {property.bedrooms != null && (
            <span className="inline-flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5" /> {property.bedrooms} BHK
            </span>
          )}
          {property.bathrooms != null && (
            <span className="inline-flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" /> {property.bathrooms} Bath
            </span>
          )}
          {property.builtUpArea != null && (
            <span className="inline-flex items-center gap-1">
              <Ruler className="h-3.5 w-3.5" /> {property.builtUpArea.toLocaleString("en-IN")} sq.ft
            </span>
          )}
        </div>

        {property.amenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 3).map((a) => (
              <span key={a} className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
                {amenityMap[a]?.label ?? a}
              </span>
            ))}
          </div>
        )}
      </Link>

      <div className="mt-4 flex flex-col gap-2 border-t border-border p-4 pt-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => toggleFavorite(property.id)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-border py-2 text-xs font-semibold text-foreground/70 hover:bg-muted"
          >
            <Heart className={cn("h-3.5 w-3.5 shrink-0", saved && "fill-brand-orange text-brand-orange")} /> Save
          </button>
          <Link
            href={href}
            className="inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-lg border border-border py-2 text-xs font-semibold text-brand-navy hover:bg-brand-navy-light"
          >
            View Details
          </Link>
        </div>
        <button
          type="button"
          onClick={askAgent}
          className="inline-flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-brand-orange py-2.5 text-xs font-semibold text-white hover:bg-brand-orange-dark"
        >
          <Phone className="h-3.5 w-3.5 shrink-0" /> Ask Agent
        </button>
      </div>
    </div>
  );
}
