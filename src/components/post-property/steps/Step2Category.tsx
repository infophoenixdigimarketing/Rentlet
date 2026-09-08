import {
  Building2, Home, Castle, LandPlot, Trees, BedDouble, Users2,
  Briefcase, Store, Warehouse, MoreHorizontal, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { WizardState } from "@/types/wizard";
import type { PropertyType } from "@/types/property";

const CATEGORIES: { id: PropertyType; label: string; icon: LucideIcon }[] = [
  { id: "apartment", label: "Apartment", icon: Building2 },
  { id: "independent_house", label: "Independent House", icon: Home },
  { id: "villa", label: "Villa", icon: Castle },
  { id: "plot", label: "Plot", icon: LandPlot },
  { id: "land", label: "Land", icon: Trees },
  { id: "pg", label: "PG", icon: BedDouble },
  { id: "flatmate", label: "Flatmate", icon: Users2 },
  { id: "office", label: "Office", icon: Briefcase },
  { id: "shop", label: "Shop", icon: Store },
  { id: "showroom", label: "Showroom", icon: Store },
  { id: "warehouse", label: "Warehouse", icon: Warehouse },
  { id: "other", label: "Other", icon: MoreHorizontal },
];

export function Step2Category({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">Property category</h2>
      <p className="mt-1 text-sm text-muted-foreground">What type of property is this?</p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => update({ category: c.id })}
            className={cn(
              "flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-colors",
              state.category === c.id ? "border-brand-orange bg-brand-orange-light/40" : "border-border hover:border-brand-navy"
            )}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy-light text-brand-navy">
              <c.icon className="h-5 w-5" />
            </span>
            <span className="text-xs font-semibold text-foreground">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
