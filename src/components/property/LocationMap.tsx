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

export function LocationMap({ property }: { property: Property }) {
  const nearby = nearbyDistances(property.id);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-brand-navy-light lg:h-full">
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
          <span className="text-[11px] text-brand-navy/60">
            Interactive Google Maps view — Phase 12
          </span>
        </div>
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
