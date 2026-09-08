import { Armchair, Sofa, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WizardState } from "@/types/wizard";
import type { Furnishing } from "@/types/property";

const OPTIONS: { id: Furnishing; label: string; description: string; icon: typeof Home }[] = [
  { id: "unfurnished", label: "Unfurnished", description: "No furniture or appliances", icon: Home },
  { id: "semi_furnished", label: "Semi Furnished", description: "Fans, lights, some fixtures", icon: Armchair },
  { id: "fully_furnished", label: "Fully Furnished", description: "Move-in ready with furniture", icon: Sofa },
];

export function Step6Furnishing({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">Furnishing</h2>
      <p className="mt-1 text-sm text-muted-foreground">How furnished is the property?</p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => update({ furnishing: o.id })}
            className={cn(
              "flex flex-col items-start gap-3 rounded-2xl border-2 p-5 text-left transition-colors",
              state.furnishing === o.id ? "border-brand-orange bg-brand-orange-light/40" : "border-border hover:border-brand-navy"
            )}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy-light text-brand-navy">
              <o.icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-bold text-foreground">{o.label}</span>
              <span className="block text-xs text-muted-foreground">{o.description}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
