import { Input } from "@/components/ui/Input";
import type { WizardState } from "@/types/wizard";

export function Step5Pricing({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">Pricing</h2>
      <p className="mt-1 text-sm text-muted-foreground">Set a fair price — you can always change it later.</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {state.listingType === "sale" ? (
          <Input label="Sale Price (₹)" type="number" required value={state.price} onChange={(e) => update({ price: e.target.value })} placeholder="8500000" />
        ) : (
          <Input label="Monthly Rent (₹)" type="number" required value={state.rent} onChange={(e) => update({ rent: e.target.value })} placeholder="28000" />
        )}
        <Input label="Deposit (₹)" type="number" value={state.deposit} onChange={(e) => update({ deposit: e.target.value })} placeholder="100000" />
        <Input label="Maintenance (₹/month)" type="number" value={state.maintenance} onChange={(e) => update({ maintenance: e.target.value })} placeholder="2200" />
      </div>

      <label className="mt-5 flex items-center gap-2.5 text-sm text-foreground">
        <input
          type="checkbox"
          checked={state.negotiable}
          onChange={(e) => update({ negotiable: e.target.checked })}
          className="h-4 w-4 rounded border-border accent-brand-orange"
        />
        Price is negotiable
      </label>
    </div>
  );
}
