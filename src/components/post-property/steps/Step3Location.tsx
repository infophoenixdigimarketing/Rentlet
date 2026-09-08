"use client";

import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { allCities } from "@/lib/data/cities";
import type { WizardState } from "@/types/wizard";

// Same blueprint-grid placeholder style as LocationMap/MapView — click anywhere to drop a pin;
// the click position is normalized into a plausible lat/lng so "Map location" is a real,
// working interaction rather than a static image. Real Google Maps picker lands in Phase 12.
function MapPicker({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const xFrac = (e.clientX - rect.left) / rect.width;
    const yFrac = (e.clientY - rect.top) / rect.height;
    const latitude = 37 - yFrac * 29; // roughly spans India's latitude range
    const longitude = 68 + xFrac * 29; // roughly spans India's longitude range
    update({ latitude, longitude });
  }

  const hasPin = state.latitude != null && state.longitude != null;

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Map Location</p>
      <div
        onClick={onClick}
        className="relative mt-2 h-48 cursor-crosshair overflow-hidden rounded-xl bg-brand-navy-light"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 23px, rgba(6,59,120,0.15) 24px), repeating-linear-gradient(90deg, transparent, transparent 23px, rgba(6,59,120,0.15) 24px)",
          }}
          aria-hidden
        />
        {hasPin ? (
          <span
            className="absolute -translate-x-1/2 -translate-y-full text-brand-orange"
            style={{
              left: `${((state.longitude! - 68) / 29) * 100}%`,
              top: `${((37 - state.latitude!) / 29) * 100}%`,
            }}
          >
            <MapPin className="h-7 w-7 fill-brand-orange-light" />
          </span>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-brand-navy/60">
            Click to drop a pin at your property&apos;s location
          </span>
        )}
      </div>
      {hasPin && (
        <p className="mt-1.5 text-xs text-muted-foreground">
          Pinned at {state.latitude!.toFixed(4)}, {state.longitude!.toFixed(4)}
        </p>
      )}
    </div>
  );
}

export function Step3Location({ state, update }: { state: WizardState; update: (p: Partial<WizardState>) => void }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">Where is the property located?</h2>
      <p className="mt-1 text-sm text-muted-foreground">Buyers and tenants search by location first.</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Country" value={state.country} onChange={(e) => update({ country: e.target.value })} />
        <Input label="State" value={state.state} onChange={(e) => update({ state: e.target.value })} placeholder="e.g. Karnataka" />

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-foreground/80">City</span>
          <select
            value={state.city}
            onChange={(e) => update({ city: e.target.value })}
            className="h-11 rounded-xl border border-border bg-white px-3.5 text-sm text-foreground outline-none focus:border-brand-navy"
          >
            <option value="">Select a city</option>
            {allCities.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </label>

        <Input label="Locality" required value={state.locality} onChange={(e) => update({ locality: e.target.value })} placeholder="e.g. Whitefield" />
        <Input label="Pincode" required value={state.pincode} onChange={(e) => update({ pincode: e.target.value })} placeholder="560066" maxLength={6} />
      </div>

      <div className="mt-5">
        <MapPicker state={state} update={update} />
      </div>
    </div>
  );
}
