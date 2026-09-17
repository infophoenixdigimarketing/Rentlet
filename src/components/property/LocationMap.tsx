"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { MapPin, TrainFront, Bus, School, Cross, ShoppingBag, Briefcase, Plane } from "lucide-react";
import type { Property } from "@/types/property";

const NEARBY_TYPES = [
  { icon: TrainFront, label: "Metro Station", tint: "bg-indigo-50 text-indigo-600" },
  { icon: Bus, label: "Bus Stop", tint: "bg-amber-50 text-amber-600" },
  { icon: School, label: "School", tint: "bg-sky-50 text-sky-600" },
  { icon: Cross, label: "Hospital", tint: "bg-rose-50 text-rose-600" },
  { icon: ShoppingBag, label: "Mall", tint: "bg-fuchsia-50 text-fuchsia-600" },
  { icon: Briefcase, label: "Office Hub", tint: "bg-emerald-50 text-emerald-600" },
  { icon: Plane, label: "Airport", tint: "bg-cyan-50 text-cyan-600" },
];

// Real distances come from the Google Maps Places API against property.latitude/longitude
// (docs/00-architecture.md — Maps). Deterministic mock distances stand in for this phase.
function nearbyDistances(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return NEARBY_TYPES.map((t, i) => ({
    ...t,
    distanceKm: (0.4 + ((h >> (i * 3)) % 45) / 10).toFixed(1),
  }));
}

// A stable pseudo-random offset (~150-300m) so the map never centers on the exact plot — the
// same property always jitters the same way, but no two nearby listings land on one spot either.
function privacyOffset(seed: string): { dLat: number; dLng: number } {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 33 + seed.charCodeAt(i)) >>> 0;
  const angle = (h % 360) * (Math.PI / 180);
  const metres = 150 + (h % 150); // 150–300m
  const metresPerDegLat = 111_320;
  const metresPerDegLng = 111_320 * Math.cos((0 * Math.PI) / 180);
  return {
    dLat: (Math.cos(angle) * metres) / metresPerDegLat,
    dLng: (Math.sin(angle) * metres) / (metresPerDegLng || 1),
  };
}

/**
 * Approximate-area map — never plots the exact coordinates. We jitter the center by ~150-300m
 * (stable per listing) and draw a soft radius circle instead of a pin, so a visitor can see
 * roughly where the property is without being able to walk straight to the door. The exact
 * address is only ever shared by a RENTLET agent after contact (see the CTA beside this map).
 */
export function LocationMap({ property }: { property: Property }) {
  const nearby = nearbyDistances(property.id);
  const mapRef = useRef<HTMLDivElement>(null);
  const hasCoords = Boolean(property.latitude && property.longitude);

  useEffect(() => {
    if (!hasCoords || !mapRef.current) return;
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !mapRef.current) return;

      const { dLat, dLng } = privacyOffset(property.id);
      const center: [number, number] = [property.latitude + dLat, property.longitude + dLng];

      map = L.map(mapRef.current, {
        center,
        zoom: 14,
        maxZoom: 15, // caps out before rooftop/street level — keeps the area approximate
        minZoom: 11,
        scrollWheelZoom: false,
        attributionControl: false,
      });
      map.on("click", () => map?.scrollWheelZoom.enable());
      map.on("mouseout", () => map?.scrollWheelZoom.disable());

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      // Soft privacy radius instead of an exact pin.
      L.circle(center, {
        radius: 450,
        color: "#ff5a00",
        weight: 1.5,
        fillColor: "#ff5a00",
        fillOpacity: 0.15,
      }).addTo(map);
      L.circleMarker(center, {
        radius: 5,
        color: "#ff5a00",
        weight: 2,
        fillColor: "#fff",
        fillOpacity: 1,
      }).addTo(map);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [hasCoords, property.id, property.latitude, property.longitude]);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div className="flex flex-col gap-2">
        <div className="relative h-64 overflow-hidden rounded-2xl bg-brand-navy-light lg:h-full lg:min-h-70">
          {hasCoords ? (
            <div ref={mapRef} className="h-full w-full" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(6,59,120,0.15) 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(6,59,120,0.15) 24px)",
                }}
                aria-hidden
              />
              <div className="relative flex flex-col items-center gap-2 text-brand-navy">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-orange text-white shadow-lg">
                  <MapPin className="h-5 w-5" />
                </span>
                <span className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold shadow">
                  {property.locality}, {property.city}
                </span>
              </div>
            </div>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground">
          Shaded area is approximate — the exact address is shared by a RENTLET agent after you request details.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {nearby.map((item) => (
          <li key={item.label} className="flex items-center justify-between rounded-xl border border-border bg-white px-3.5 py-2.5">
            <span className="flex items-center gap-2.5 text-sm text-foreground">
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.tint}`}>
                <item.icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              {item.label}
            </span>
            <span className="text-xs font-semibold text-muted-foreground">{item.distanceKm} km</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
