"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, MapPin, LocateFixed } from "lucide-react";
import { cn } from "@/lib/utils";
import { filtersToSearchString } from "@/lib/search-params";
import { getLocalities, type SearchFilters } from "@/lib/services/search.service";
import type { Furnishing, PropertyType } from "@/types/property";
import { amenities as amenityList } from "@/lib/data/amenities";
import { Button } from "@/components/ui/Button";
import { CityCombobox } from "@/components/search/CityCombobox";

const PROPERTY_TYPES: { id: PropertyType; label: string }[] = [
  { id: "apartment", label: "Apartment" },
  { id: "independent_house", label: "Independent House" },
  { id: "villa", label: "Villa" },
  { id: "plot", label: "Plot / Land" },
  { id: "pg", label: "PG / Hostel" },
  { id: "office", label: "Office" },
  { id: "shop", label: "Shop" },
  { id: "warehouse", label: "Warehouse" },
];

const FURNISHING_OPTIONS: { id: Furnishing; label: string }[] = [
  { id: "unfurnished", label: "Unfurnished" },
  { id: "semi_furnished", label: "Semi Furnished" },
  { id: "fully_furnished", label: "Fully Furnished" },
];

const POSTED_BY_OPTIONS: { id: "owner" | "agent" | "builder"; label: string }[] = [
  { id: "owner", label: "Owner" },
  { id: "agent", label: "Agent" },
  { id: "builder", label: "Builder" },
];

function toggleIn<T>(arr: T[] | undefined, value: T): T[] {
  const set = new Set(arr ?? []);
  if (set.has(value)) set.delete(value);
  else set.add(value);
  return Array.from(set);
}

export function FilterPanel({
  initial,
  onApplied,
}: {
  initial: SearchFilters;
  /** called after navigating — lets the mobile drawer close itself */
  onApplied?: () => void;
}) {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFilters>(initial);
  const [locating, setLocating] = useState(false);

  // Keep `sort: "nearest"` in step with whether a reference point exists, unless the user
  // has deliberately picked a price/newest sort.
  function normalizeSort(f: SearchFilters): SearchFilters {
    const hasReference = Boolean(f.near) || f.nearLat != null;
    if (hasReference && (f.sort == null || f.sort === "relevance")) return { ...f, sort: "nearest" };
    if (!hasReference && f.sort === "nearest") return { ...f, sort: undefined };
    return f;
  }

  function apply() {
    router.push(`/properties?${filtersToSearchString(normalizeSort(filters))}`);
    onApplied?.();
  }

  // Merge a patch and navigate straight away — every control uses this so filters take
  // effect on click/change with no "Apply Filters" step. It does NOT close the mobile
  // drawer (that would dismiss it after a single tap); use the "Show results" button for that.
  function applyNow(patch: SearchFilters) {
    const next = normalizeSort({ ...filters, ...patch });
    setFilters(next);
    router.push(`/properties?${filtersToSearchString(next)}`);
  }

  function pickListingType(lt: "rent" | "sale") {
    const nextType = filters.listingType === lt ? undefined : lt;

    // Choosing "Rent" auto-orders results by nearest place. Reuse an existing reference
    // if there is one, otherwise ask the browser for the user's location, then apply.
    const hasReference = Boolean(filters.near) || filters.nearLat != null;
    if (nextType === "rent" && !hasReference && typeof navigator !== "undefined" && navigator.geolocation) {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocating(false);
          applyNow({
            listingType: "rent",
            nearLat: Number(pos.coords.latitude.toFixed(5)),
            nearLng: Number(pos.coords.longitude.toFixed(5)),
            sort: "nearest",
          });
        },
        () => {
          setLocating(false);
          applyNow({ listingType: "rent" });
        },
        { timeout: 8000, maximumAge: 300000 }
      );
      return;
    }

    applyNow({ listingType: nextType });
  }

  function reset() {
    setFilters({});
    router.push("/properties");
    onApplied?.();
  }

  function useMyLocation() {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const next = normalizeSort({
          ...filters,
          near: undefined,
          nearLat: Number(pos.coords.latitude.toFixed(5)),
          nearLng: Number(pos.coords.longitude.toFixed(5)),
        });
        setFilters(next);
        router.push(`/properties?${filtersToSearchString(next)}`);
        onApplied?.();
      },
      () => setLocating(false),
      { timeout: 8000, maximumAge: 300000 }
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Listing Type</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Filters apply as you change them — Rent also orders results by nearest place.
        </p>
        <div className="mt-2 flex gap-2">
          {((filters.listingType === "sale" ? ["sale"] : ["rent"]) as ("rent" | "sale")[]).map((lt) => (
            <button
              key={lt}
              type="button"
              onClick={() => pickListingType(lt)}
              className={cn(
                "flex-1 rounded-lg border px-3 py-2 text-sm font-semibold capitalize",
                filters.listingType === lt ? "border-brand-navy bg-brand-navy text-white" : "border-border text-foreground hover:bg-muted"
              )}
            >
              {lt === "sale" ? "Buy" : "Rent"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">City</p>
        <CityCombobox value={filters.city} onChange={(city) => applyNow({ city })} />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Show Nearest To</p>
        <p className="mt-1 text-[11px] text-muted-foreground">Order results by distance — closest areas first.</p>
        <select
          value={filters.near ?? ""}
          onChange={(e) =>
            applyNow({ near: e.target.value || undefined, nearLat: undefined, nearLng: undefined })
          }
          className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy"
        >
          <option value="">Any area</option>
          {getLocalities(filters.city).map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        {filters.nearLat != null && !filters.near && (
          <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-brand-navy">
            <MapPin className="h-3 w-3" /> Using your current location
          </p>
        )}
        <button
          type="button"
          onClick={useMyLocation}
          disabled={locating}
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy hover:underline disabled:opacity-60"
        >
          <LocateFixed className="h-3.5 w-3.5" />
          {locating ? "Locating…" : "Use my current location"}
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Bedrooms</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => applyNow({ bedrooms: toggleIn(filters.bedrooms, b) })}
              className={cn(
                "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2.5 text-sm font-semibold",
                filters.bedrooms?.includes(b) ? "border-brand-navy bg-brand-navy text-white" : "border-border text-foreground hover:bg-muted"
              )}
            >
              {b === 5 ? "5+" : b}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Price Range (₹)</p>
        <div className="mt-2 flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={filters.minPrice ?? ""}
            onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value ? Number(e.target.value) : undefined }))}
            onBlur={() => applyNow({})}
            onKeyDown={(e) => e.key === "Enter" && applyNow({})}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy"
          />
          <span className="text-muted-foreground">–</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={filters.maxPrice ?? ""}
            onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
            onBlur={() => applyNow({})}
            onKeyDown={(e) => e.key === "Enter" && applyNow({})}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy"
          />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Property Type</p>
        <div className="mt-2 flex flex-col gap-2">
          {PROPERTY_TYPES.map((t) => (
            <label key={t.id} className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={filters.propertyTypes?.includes(t.id) ?? false}
                onChange={() => applyNow({ propertyTypes: toggleIn(filters.propertyTypes, t.id) })}
                className="h-4 w-4 rounded border-border accent-brand-orange"
              />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Furnishing</p>
        <div className="mt-2 flex flex-col gap-2">
          {FURNISHING_OPTIONS.map((t) => (
            <label key={t.id} className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={filters.furnishing?.includes(t.id) ?? false}
                onChange={() => applyNow({ furnishing: toggleIn(filters.furnishing, t.id) })}
                className="h-4 w-4 rounded border-border accent-brand-orange"
              />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Posted By</p>
        <div className="mt-2 flex flex-col gap-2">
          {POSTED_BY_OPTIONS.map((t) => (
            <label key={t.id} className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={filters.postedBy?.includes(t.id) ?? false}
                onChange={() => applyNow({ postedBy: toggleIn(filters.postedBy, t.id) })}
                className="h-4 w-4 rounded border-border accent-brand-orange"
              />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Amenities</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {amenityList.map((a) => (
            <label key={a.id} className="flex items-center gap-2 text-xs text-foreground">
              <input
                type="checkbox"
                checked={filters.amenities?.includes(a.id) ?? false}
                onChange={() => applyNow({ amenities: toggleIn(filters.amenities, a.id) })}
                className="h-3.5 w-3.5 rounded border-border accent-brand-orange"
              />
              {a.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">More Filters</p>
        <div className="mt-2 flex flex-col gap-2">
          {(
            [
              { key: "verifiedOnly", label: "Verified Only" },
              { key: "noBrokerage", label: "No Brokerage" },
              { key: "petFriendly", label: "Pet Friendly" },
              { key: "featuredOnly", label: "Featured" },
            ] as const
          ).map((t) => (
            <label key={t.key} className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={Boolean(filters[t.key])}
                onChange={() => applyNow({ [t.key]: !filters[t.key] })}
                className="h-4 w-4 rounded border-border accent-brand-orange"
              />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 flex gap-2 border-t border-border bg-white pt-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        {/* Filters already apply on change; on mobile this just closes the drawer. */}
        <Button className="flex-1 lg:hidden" onClick={apply}>
          Show results
        </Button>
      </div>
    </div>
  );
}
