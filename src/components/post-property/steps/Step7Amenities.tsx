import {
  Car, MoveVertical, Zap, ShieldCheck, Dumbbell, Waves, Building2,
  Trees, Camera, Droplets, Wifi, Flame, PawPrint, Layers, type LucideIcon,
} from "lucide-react";
import { amenities, type AmenityDef } from "@/lib/data/amenities";
import { cn } from "@/lib/utils";
import type { WizardState } from "@/types/wizard";

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

export function Step7Amenities({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  function toggle(id: string) {
    const set = new Set(state.amenities);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    update({ amenities: Array.from(set) });
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">Amenities</h2>
      <p className="mt-1 text-sm text-muted-foreground">Select everything that applies.</p>

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {amenities.map((a) => {
          const Icon = ICONS[a.icon];
          const selected = state.amenities.includes(a.id);
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => toggle(a.id)}
              className={cn(
                "flex items-center gap-2.5 rounded-xl border-2 px-3.5 py-3 text-left transition-colors",
                selected ? "border-brand-orange bg-brand-orange-light/40" : "border-border hover:border-brand-navy"
              )}
            >
              <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", selected ? "bg-brand-orange text-white" : "bg-brand-navy-light text-brand-navy")}>
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="text-xs font-semibold text-foreground">{a.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
