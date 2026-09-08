"use client";

import Link from "next/link";
import { Heart, BedDouble, Bath, Ruler, ShieldCheck, Phone } from "lucide-react";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { Badge } from "@/components/ui/Badge";
import { cn, priceLabel, formatINR } from "@/lib/utils";
import { amenityMap } from "@/lib/data/amenities";
import { useIsFavorited } from "@/lib/favorites";
import { toggleFavorite } from "@/lib/favorite-actions";
import type { Property } from "@/types/property";

export function PropertyListRow({ property }: { property: Property }) {
  const saved = useIsFavorited(property.id);
  const href = `/property/${property.slug}/${property.id}`;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-3 transition-shadow hover:shadow-lg hover:shadow-brand-navy/5 sm:flex-row">
      <Link href={href} className="relative block h-44 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-56">
        <PropertyImage id={property.id} propertyType={property.propertyType} locality={property.locality} city={property.city} className="h-full w-full" />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {property.featured && <Badge variant="orange">FEATURED</Badge>}
          {property.verificationStatus === "approved" && (
            <Badge variant="verified"><ShieldCheck className="h-3 w-3" /> VERIFIED</Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-lg font-extrabold text-brand-navy">{priceLabel(property)}</span>
            <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold text-foreground">{property.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{property.locality}, {property.city}</p>
          </div>
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => toggleFavorite(property.id)}
            className="shrink-0 rounded-full p-2 text-muted-foreground hover:bg-muted"
          >
            <Heart className={cn("h-4 w-4", saved && "fill-brand-orange text-brand-orange")} />
          </button>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/70">
          {property.bedrooms != null && <span className="inline-flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" /> {property.bedrooms} BHK</span>}
          {property.bathrooms != null && <span className="inline-flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {property.bathrooms} Bath</span>}
          {property.builtUpArea != null && <span className="inline-flex items-center gap-1"><Ruler className="h-3.5 w-3.5" /> {property.builtUpArea.toLocaleString("en-IN")} sq.ft</span>}
          {property.deposit != null && property.listingType === "rent" && <span>{formatINR(property.deposit)} Deposit</span>}
        </div>

        {property.amenities.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 4).map((a) => (
              <span key={a} className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
                {amenityMap[a]?.label ?? a}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-3">
          <Link href={href} className="inline-flex flex-1 items-center justify-center rounded-lg border border-border py-2 text-xs font-semibold text-brand-navy hover:bg-brand-navy-light sm:flex-none sm:px-5">
            View Details
          </Link>
          <button type="button" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-orange-light py-2 text-xs font-semibold text-brand-orange-dark hover:bg-brand-orange hover:text-white sm:flex-none sm:px-5">
            <Phone className="h-3.5 w-3.5" /> Contact
          </button>
        </div>
      </div>
    </div>
  );
}
