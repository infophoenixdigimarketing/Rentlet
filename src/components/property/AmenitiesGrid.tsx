import {
  Car,
  MoveVertical,
  Zap,
  ShieldCheck,
  Dumbbell,
  Waves,
  Building2,
  Trees,
  Camera,
  Droplets,
  Wifi,
  Flame,
  PawPrint,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { amenityMap, type AmenityDef } from "@/lib/data/amenities";

const ICONS: Record<AmenityDef["icon"], LucideIcon> = {
  car: Car,
  "move-vertical": MoveVertical,
  zap: Zap,
  "shield-check": ShieldCheck,
  dumbbell: Dumbbell,
  waves: Waves,
  "building-2": Building2,
  trees: Trees,
  camera: Camera,
  droplets: Droplets,
  wifi: Wifi,
  flame: Flame,
  "paw-print": PawPrint,
  layers: Layers,
};

// Per-icon tint (light bg + icon colour) so each amenity reads at a glance.
const TINT: Record<AmenityDef["icon"], string> = {
  car: "bg-blue-50 text-blue-600",
  "move-vertical": "bg-violet-50 text-violet-600",
  zap: "bg-amber-50 text-amber-600",
  "shield-check": "bg-emerald-50 text-emerald-600",
  dumbbell: "bg-rose-50 text-rose-600",
  waves: "bg-cyan-50 text-cyan-600",
  "building-2": "bg-indigo-50 text-indigo-600",
  trees: "bg-green-50 text-green-600",
  camera: "bg-zinc-100 text-zinc-600",
  droplets: "bg-sky-50 text-sky-600",
  wifi: "bg-teal-50 text-teal-600",
  flame: "bg-brand-orange-light text-brand-orange",
  "paw-print": "bg-fuchsia-50 text-fuchsia-600",
  layers: "bg-purple-50 text-purple-600",
};

export function AmenitiesGrid({ amenities }: { amenities: string[] }) {
  if (amenities.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {amenities.map((id) => {
        const def = amenityMap[id];
        if (!def) return null;
        const Icon = ICONS[def.icon];
        return (
          <div key={id} className="flex items-center gap-2.5 rounded-xl border border-border bg-white px-3.5 py-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                TINT[def.icon] ?? "bg-brand-navy-light text-brand-navy"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="text-sm font-medium text-foreground">{def.label}</span>
          </div>
        );
      })}
    </div>
  );
}
