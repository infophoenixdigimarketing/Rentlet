import { BedDouble, Bath, LandPlot, Ruler, Layers, Compass, Sofa, CalendarClock, Wallet, Users, UserRound } from "lucide-react";
import type { Property } from "@/types/property";

const FURNISHING_LABEL: Record<string, string> = {
  unfurnished: "Unfurnished",
  semi_furnished: "Semi Furnished",
  fully_furnished: "Fully Furnished",
};

const GENDER_LABEL: Record<string, string> = {
  male: "Men only",
  female: "Women only",
  any: "Anyone",
};

// Rough guideline occupancy for a residential unit — ~2 people per bedroom (a studio/1RK still
// fits 1). Shown as "People Allowed" so seekers can gauge suitability at a glance.
function maxOccupancy(bedrooms: number): number {
  return Math.max(1, bedrooms * 2);
}

// Per-metric icon tint (bg + icon colour) — keeps the grid scannable and on-brand while
// giving each stat its own identity, same visual language as the post-property tiles.
const TINT: Record<string, string> = {
  Bedrooms: "bg-indigo-50 text-indigo-600",
  "People Allowed": "bg-sky-50 text-sky-600",
  "Preferred For": "bg-fuchsia-50 text-fuchsia-600",
  Bathrooms: "bg-cyan-50 text-cyan-600",
  "Built-up Area": "bg-amber-50 text-amber-600",
  "Carpet Area": "bg-emerald-50 text-emerald-600",
  Floor: "bg-violet-50 text-violet-600",
  Facing: "bg-rose-50 text-rose-600",
  Furnishing: "bg-brand-orange-light text-brand-orange",
  "Available From": "bg-teal-50 text-teal-600",
  Maintenance: "bg-blue-50 text-blue-600",
};

export function PropertyInfoGrid({ property: p }: { property: Property }) {
  const items = [
    p.bedrooms != null && { icon: BedDouble, label: "Bedrooms", value: `${p.bedrooms} BHK` },
    p.listingType === "rent" && p.bedrooms != null && {
      icon: Users,
      label: "People Allowed",
      value: `Up to ${maxOccupancy(p.bedrooms)} people`,
    },
    p.genderPreference && {
      icon: UserRound,
      label: "Preferred For",
      value: GENDER_LABEL[p.genderPreference] ?? "Anyone",
    },
    p.bathrooms != null && { icon: Bath, label: "Bathrooms", value: String(p.bathrooms) },
    p.builtUpArea != null && { icon: Ruler, label: "Built-up Area", value: `${p.builtUpArea.toLocaleString("en-IN")} sq.ft` },
    p.carpetArea != null && { icon: LandPlot, label: "Carpet Area", value: `${p.carpetArea.toLocaleString("en-IN")} sq.ft` },
    p.floor != null && p.totalFloors != null && { icon: Layers, label: "Floor", value: `${p.floor} of ${p.totalFloors}` },
    p.facing && { icon: Compass, label: "Facing", value: p.facing },
    p.furnishing && { icon: Sofa, label: "Furnishing", value: FURNISHING_LABEL[p.furnishing] },
    p.availableFrom && { icon: CalendarClock, label: "Available From", value: p.availableFrom },
    p.maintenance != null && p.maintenance > 0 && {
      icon: Wallet,
      label: "Maintenance",
      value: `₹${p.maintenance.toLocaleString("en-IN")}/month`,
    },
  ].filter(Boolean) as { icon: typeof BedDouble; label: string; value: string }[];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="rounded-xl border border-border bg-white p-3.5">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              TINT[item.label] ?? "bg-brand-orange-light text-brand-orange"
            }`}
          >
            <item.icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <p className="mt-2 text-[11px] font-medium text-muted-foreground">{item.label}</p>
          <p className="text-sm font-bold text-foreground">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
