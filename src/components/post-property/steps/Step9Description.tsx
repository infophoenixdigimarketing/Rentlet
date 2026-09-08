import { Sparkles } from "lucide-react";
import { Input } from "@/components/ui/Input";
import type { WizardState } from "@/types/wizard";

// spec §74 — AI listing-description generator, kept as a deterministic local template so the
// demo needs no paid AI API key; swap the body of generate() for a real model call later
// (lib/services/ai.service.ts is where that interface will live once Phase 12 wires a backend).
function generate(state: WizardState): string {
  const bhk = state.bedrooms != null ? `${state.bedrooms} BHK ` : "";
  const furnishing = state.furnishing ? state.furnishing.replace("_", " ") : "";
  const area = state.builtUpArea ? `${state.builtUpArea} sq.ft` : "";
  const amenityList = state.amenities.length ? ` Amenities include ${state.amenities.slice(0, 4).join(", ").replace(/_/g, " ")}.` : "";
  return `Spacious ${bhk}${state.category?.replace("_", " ") ?? "property"} available for ${state.listingType === "sale" ? "sale" : "rent"} in ${state.locality || "a prime location"}, ${state.city}. ${area ? `${area} of thoughtfully laid-out space, ` : ""}${furnishing ? `${furnishing} and ready to move in.` : "ready to move in."}${amenityList} Close to schools, hospitals and everyday conveniences — schedule a visit to see it for yourself.`;
}

export function Step9Description({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">Description</h2>
      <p className="mt-1 text-sm text-muted-foreground">Give it a title and tell buyers or tenants what makes it special.</p>

      <div className="mt-5 flex flex-col gap-4">
        <Input
          name="listingTitle"
          label="Listing Title"
          required
          value={state.title}
          onChange={(e) => update({ title: e.target.value })}
          placeholder={`e.g. Premium ${state.bedrooms ?? 2} BHK Apartment for ${state.listingType === "sale" ? "Sale" : "Rent"} in ${state.locality || "Whitefield"}`}
        />

        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground/80">Description</span>
            <button
              type="button"
              onClick={() => update({ description: generate(state) })}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:underline"
            >
              <Sparkles className="h-3.5 w-3.5" /> Generate with AI
            </button>
          </div>
          <textarea
            rows={6}
            value={state.description}
            onChange={(e) => update({ description: e.target.value })}
            placeholder="Describe the property, nearby landmarks, why it's a great fit..."
            className="mt-1.5 w-full resize-none rounded-xl border border-border px-3.5 py-3 text-sm outline-none focus:border-brand-navy"
          />
        </div>
      </div>
    </div>
  );
}
