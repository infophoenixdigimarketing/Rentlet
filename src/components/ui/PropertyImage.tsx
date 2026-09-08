// On-brand generated placeholder — no external image URLs to break (spec §64).
// Deterministic per-id gradient + property-type icon watermark so cards still feel distinct.
import {
  Building2,
  Home,
  Trees,
  Warehouse,
  Store,
  Briefcase,
  BedDouble,
  Castle,
  LandPlot,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropertyType } from "@/types/property";

const ICONS: Record<PropertyType, LucideIcon> = {
  apartment: Building2,
  independent_house: Home,
  villa: Castle,
  plot: LandPlot,
  land: Trees,
  pg: BedDouble,
  flatmate: BedDouble,
  office: Briefcase,
  shop: Store,
  showroom: Store,
  warehouse: Warehouse,
  other: Building2,
};

const GRADIENTS = [
  "from-brand-navy to-brand-navy-dark",
  "from-brand-navy-dark via-brand-navy to-[#0a4f9e]",
  "from-[#0a4f9e] to-brand-navy-dark",
  "from-brand-navy to-[#083a70]",
];

function hashIndex(seed: string, mod: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % mod;
}

export function PropertyImage({
  id,
  propertyType,
  locality,
  city,
  className,
}: {
  id: string;
  propertyType: PropertyType;
  locality?: string;
  city?: string;
  className?: string;
}) {
  const Icon = ICONS[propertyType] ?? Building2;
  const gradient = GRADIENTS[hashIndex(id, GRADIENTS.length)];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        gradient,
        className
      )}
    >
      <Icon className="h-16 w-16 text-white/15" strokeWidth={1.25} aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,90,0,0.25),transparent_45%)]" />
      {(locality || city) && (
        <span className="absolute bottom-2.5 left-3 text-[11px] font-medium text-white/70">
          {[locality, city].filter(Boolean).join(", ")}
        </span>
      )}
    </div>
  );
}
