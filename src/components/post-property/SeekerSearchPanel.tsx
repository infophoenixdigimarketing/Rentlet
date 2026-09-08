"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { allCities } from "@/lib/data/cities";
import { getLocalities } from "@/lib/services/search.service";

const TABS = [
  { id: "rent", label: "Rent" },
  { id: "commercial", label: "Commercial" },
] as const;
type Tab = (typeof TABS)[number]["id"];

const BHKS = [
  { label: "1 BHK", value: "1" },
  { label: "2 BHK", value: "2" },
  { label: "3 BHK", value: "3" },
  { label: "4 BHK", value: "4" },
  { label: "5+ BHK", value: "5" },
];

const FIELD =
  "h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-foreground outline-none focus:border-brand-navy";

// Compact "I'm looking for a property" search, shown when the seeker toggle on the
// post-property landing page is opened. Submits into the real /properties search.
export function SeekerSearchPanel() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("rent");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [bhk, setBhk] = useState("");
  const [landOnly, setLandOnly] = useState(false);

  const isCommercial = tab === "commercial";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const qs = new URLSearchParams();

    if (isCommercial) {
      qs.set("type", "office,shop,showroom,warehouse");
    } else {
      qs.set("listingType", "rent");
      if (landOnly) qs.set("type", "plot,land");
      else if (bhk) qs.set("bhk", bhk);
    }

    if (city) qs.set("city", city);
    if (locality) {
      qs.set("near", locality);
      qs.set("sort", "nearest");
    }

    router.push(`/properties?${qs.toString()}`);
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5">
      <div className="flex gap-1 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2 text-sm font-bold transition-colors",
              tab === t.id
                ? "border-brand-orange text-brand-orange-dark"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <select value={city} onChange={(e) => setCity(e.target.value)} className={cn(FIELD, "sm:w-44")}>
          <option value="">All cities</option>
          {allCities.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          className={cn(FIELD, "flex-1")}
        >
          <option value="">Locality or area (optional)</option>
          {getLocalities(city).map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <Button type="submit" size="md" className="sm:px-6">
          <Search className="h-4 w-4" /> Search
        </Button>
      </div>

      {!isCommercial && (
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <input
              type="radio"
              name="seeker-kind"
              checked={!landOnly}
              onChange={() => setLandOnly(false)}
              className="h-4 w-4 accent-brand-orange"
            />
            Full House
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <input
              type="radio"
              name="seeker-kind"
              checked={landOnly}
              onChange={() => setLandOnly(true)}
              className="h-4 w-4 accent-brand-orange"
            />
            Land / Plot
          </label>

          {!landOnly && (
            <select value={bhk} onChange={(e) => setBhk(e.target.value)} className={cn(FIELD, "h-9 w-auto")}>
              <option value="">BHK Type</option>
              {BHKS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </form>
  );
}
