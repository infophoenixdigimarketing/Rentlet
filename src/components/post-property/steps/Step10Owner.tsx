import { Input } from "@/components/ui/Input";
import type { WizardState } from "@/types/wizard";

export function Step10Owner({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">Owner details</h2>
      <p className="mt-1 text-sm text-muted-foreground">How should interested buyers or tenants reach you?</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input name="ownerName" label="Full Name" required value={state.ownerName} onChange={(e) => update({ ownerName: e.target.value })} />
        <Input name="ownerPhone" label="Phone Number" required type="tel" value={state.ownerPhone} onChange={(e) => update({ ownerPhone: e.target.value })} placeholder="98765 43210" />
        <Input name="ownerEmail" label="Email" type="email" value={state.ownerEmail} onChange={(e) => update({ ownerEmail: e.target.value })} />
      </div>
    </div>
  );
}
