import { Home, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WizardState } from "@/types/wizard";

export function Step1Intent({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  const options = [
    { id: "rent" as const, label: "Rent", description: "List your property for tenants to rent", icon: Home },
    { id: "sell" as const, label: "Sell", description: "List your property for buyers to purchase", icon: IndianRupee },
  ];

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">What do you want to do?</h2>
      <p className="mt-1 text-sm text-muted-foreground">Choose how you&apos;d like to list this property.</p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => update({ listingType: o.id === "sell" ? "sale" : "rent" })}
            className={cn(
              "flex flex-col items-start gap-3 rounded-2xl border-2 p-5 text-left transition-colors",
              (o.id === "sell" ? state.listingType === "sale" : state.listingType === "rent")
                ? "border-brand-orange bg-brand-orange-light/40"
                : "border-border hover:border-brand-navy"
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
