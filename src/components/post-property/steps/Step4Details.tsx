import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import type { WizardState } from "@/types/wizard";

const FACINGS = ["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"];
const AGES = ["Under construction", "0-1 years", "1-5 years", "5-10 years", "10+ years"];
const LAND_TYPES: { id: NonNullable<WizardState["landType"]>; label: string }[] = [
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "agricultural", label: "Agricultural" },
  { id: "industrial", label: "Industrial" },
];

function NumberStepper({ label, value, onChange }: { label: string; value: number | null; onChange: (v: number | null) => void }) {
  return (
    <div>
      <p className="text-xs font-semibold text-foreground/80">{label}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {[0, 1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2.5 text-sm font-semibold",
              value === n ? "border-brand-navy bg-brand-navy text-white" : "border-border text-foreground hover:bg-muted"
            )}
          >
            {n === 5 ? "5+" : n}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Step4Details({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  const isResidential = state.category === "apartment" || state.category === "independent_house" || state.category === "villa" || state.category === "pg" || state.category === "flatmate";
  const isLand = state.category === "plot" || state.category === "land";

  if (isLand) {
    return (
      <div>
        <h2 className="text-lg font-bold text-foreground">Plot / Land details</h2>
        <p className="mt-1 text-sm text-muted-foreground">Help buyers know exactly what they&apos;re getting.</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Plot Area (sq.ft)"
            type="number"
            required
            value={state.builtUpArea}
            onChange={(e) => update({ builtUpArea: e.target.value })}
            placeholder="2400"
          />
          <Input
            label="Approach Road Width (ft)"
            type="number"
            value={state.roadWidth}
            onChange={(e) => update({ roadWidth: e.target.value })}
            placeholder="30"
          />
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold text-foreground/80">Land Type</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {LAND_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => update({ landType: t.id })}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-semibold",
                  state.landType === t.id ? "border-brand-navy bg-brand-navy text-white" : "border-border text-foreground hover:bg-muted"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold text-foreground/80">Facing</p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {FACINGS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => update({ facing: f })}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-semibold",
                  state.facing === f ? "border-brand-navy bg-brand-navy text-white" : "border-border text-foreground hover:bg-muted"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <label className="mt-5 flex cursor-pointer items-center gap-3">
          <button
            type="button"
            role="switch"
            aria-checked={state.boundaryWall}
            onClick={() => update({ boundaryWall: !state.boundaryWall })}
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full transition-colors",
              state.boundaryWall ? "bg-brand-navy" : "bg-border"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                state.boundaryWall ? "translate-x-5.5" : "translate-x-0.5"
              )}
            />
          </button>
          <span className="text-sm text-foreground">Boundary wall built</span>
        </label>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">Property details</h2>
      <p className="mt-1 text-sm text-muted-foreground">Help buyers and tenants know exactly what they&apos;re getting.</p>

      {isResidential && (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <NumberStepper label="Bedrooms (BHK)" value={state.bedrooms} onChange={(v) => update({ bedrooms: v })} />
          <NumberStepper label="Bathrooms" value={state.bathrooms} onChange={(v) => update({ bathrooms: v })} />
          <NumberStepper label="Balconies" value={state.balconies} onChange={(v) => update({ balconies: v })} />
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Floor" type="number" value={state.floor} onChange={(e) => update({ floor: e.target.value })} placeholder="e.g. 5" />
        <Input label="Total Floors" type="number" value={state.totalFloors} onChange={(e) => update({ totalFloors: e.target.value })} placeholder="e.g. 14" />
        <Input label="Built-up Area (sq.ft)" type="number" required value={state.builtUpArea} onChange={(e) => update({ builtUpArea: e.target.value })} placeholder="1250" />
        <Input label="Carpet Area (sq.ft)" type="number" value={state.carpetArea} onChange={(e) => update({ carpetArea: e.target.value })} placeholder="1080" />
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold text-foreground/80">Facing</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {FACINGS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => update({ facing: f })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold",
                state.facing === f ? "border-brand-navy bg-brand-navy text-white" : "border-border text-foreground hover:bg-muted"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold text-foreground/80">Property Age</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {AGES.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => update({ propertyAge: a })}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold",
                state.propertyAge === a ? "border-brand-navy bg-brand-navy text-white" : "border-border text-foreground hover:bg-muted"
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
