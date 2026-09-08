"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, X } from "lucide-react";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { cn, priceLabel } from "@/lib/utils";
import type { Property } from "@/types/property";

// Real implementation swaps this for the Google Maps JS SDK, with property.latitude/longitude
// feeding actual markers (docs/00-architecture.md — Maps). This placeholder normalizes the
// same lat/lng into a percentage position on a static blueprint background so the interaction
// pattern (pin → preview card) is real, even though the basemap isn't.
export function MapView({ properties }: { properties: Property[] }) {
  const [selected, setSelected] = useState<Property | null>(properties[0] ?? null);

  const positioned = useMemo(() => {
    const lats = properties.map((p) => p.latitude);
    const lngs = properties.map((p) => p.longitude);
    const minLat = Math.min(...lats), maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
    const spreadLat = maxLat - minLat || 1;
    const spreadLng = maxLng - minLng || 1;

    return properties.map((p) => ({
      property: p,
      top: 12 + (1 - (p.latitude - minLat) / spreadLat) * 72,
      left: 14 + ((p.longitude - minLng) / spreadLng) * 72,
    }));
  }, [properties]);

  if (properties.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
      <div className="relative h-[32rem] overflow-hidden rounded-2xl bg-brand-navy-light">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(6,59,120,0.15) 28px), repeating-linear-gradient(90deg, transparent, transparent 27px, rgba(6,59,120,0.15) 28px)",
          }}
          aria-hidden
        />
        {positioned.map(({ property, top, left }) => (
          <button
            key={property.id}
            type="button"
            onClick={() => setSelected(property)}
            style={{ top: `${top}%`, left: `${left}%` }}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-full rounded-full px-2.5 py-1 text-xs font-bold shadow-md transition-transform hover:z-10 hover:scale-110",
              selected?.id === property.id ? "z-10 bg-brand-orange text-white" : "bg-white text-brand-navy"
            )}
          >
            {priceLabel(property)}
          </button>
        ))}
      </div>

      {selected && (
        <div className="relative overflow-hidden rounded-2xl border border-border bg-white">
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setSelected(null)}
            className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-foreground shadow"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <PropertyImage id={selected.id} propertyType={selected.propertyType} className="h-40 w-full" />
          <div className="p-4">
            <p className="text-lg font-extrabold text-brand-navy">{priceLabel(selected)}</p>
            <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-foreground">{selected.title}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {selected.locality}, {selected.city}
            </p>
            <Link
              href={`/property/${selected.slug}/${selected.id}`}
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-brand-navy py-2 text-xs font-semibold text-white hover:bg-brand-navy-dark"
            >
              View Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
