"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { SortOption } from "@/lib/services/search.service";

const OPTIONS: { id: SortOption; label: string }[] = [
  { id: "relevance", label: "Relevance" },
  { id: "nearest", label: "Nearest first" },
  { id: "newest", label: "Newest" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
];

export function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = (searchParams.get("sort") as SortOption) ?? "relevance";

  function onChange(value: string) {
    const qs = new URLSearchParams(searchParams.toString());
    if (value === "relevance") qs.delete("sort");
    else qs.set("sort", value);

    // "Nearest first" needs a reference point. If the URL doesn't already carry one
    // (a locality via `near`, or coords), ask the browser for the user's location.
    const hasReference = qs.get("near") || qs.get("nearLat");
    if (value === "nearest" && !hasReference && typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          qs.set("nearLat", pos.coords.latitude.toFixed(5));
          qs.set("nearLng", pos.coords.longitude.toFixed(5));
          router.push(`/properties?${qs.toString()}`);
        },
        // denied / unavailable: still switch — the service falls back to relevance order
        () => router.push(`/properties?${qs.toString()}`),
        { timeout: 8000, maximumAge: 300000 }
      );
      return;
    }

    router.push(`/properties?${qs.toString()}`);
  }

  return (
    <select
      value={current}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Sort properties"
      className="rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-foreground outline-none focus:border-brand-navy"
    >
      {OPTIONS.map((o) => (
        <option key={o.id} value={o.id}>
          Sort: {o.label}
        </option>
      ))}
    </select>
  );
}
