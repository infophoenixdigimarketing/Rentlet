"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown, Plus } from "lucide-react";
import { searchCities } from "@/lib/data/cities";
import { cn } from "@/lib/utils";

// Type-ahead city selector for the search filters. Shows the whole list on open; typing
// filters (with alias + prefix ranking) so you never have to scroll ~1000 options.
export function CityCombobox({
  value,
  onChange,
  allowCustom = true,
}: {
  value: string | undefined;
  onChange: (city: string | undefined) => void;
  allowCustom?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const list = searchCities(query).slice(0, 60);
  const typed = query.trim();
  const canAddTyped =
    allowCustom && typed.length >= 2 && !list.some((c) => c.name.toLowerCase() === typed.toLowerCase());

  function pick(city: string | undefined) {
    onChange(city);
    setQuery("");
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative mt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-left text-sm outline-none focus:border-brand-navy"
      >
        <span className={cn("flex-1 truncate", value ? "text-foreground" : "text-muted-foreground")}>
          {value || "All cities"}
        </span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
          <div className="flex items-center gap-2 border-b border-border px-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a city…  (e.g. de, ban, trichy)"
              className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground/70"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto py-1">
            <li>
              <button
                type="button"
                onClick={() => pick(undefined)}
                className={cn(
                  "flex w-full px-4 py-2 text-left text-sm hover:bg-muted",
                  !value && "font-semibold text-brand-navy"
                )}
              >
                All cities
              </button>
            </li>
            {canAddTyped && (
              <li>
                <button
                  type="button"
                  onClick={() => pick(typed)}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-semibold text-brand-navy hover:bg-brand-navy-light/50"
                >
                  <Plus className="h-4 w-4 shrink-0" />
                  Use &ldquo;{typed}&rdquo;
                </button>
              </li>
            )}
            {list.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => pick(c.name)}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-muted",
                    value === c.name && "font-semibold text-brand-navy"
                  )}
                >
                  <span>{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.state}</span>
                </button>
              </li>
            ))}
            {list.length === 0 && !canAddTyped && (
              <li className="px-4 py-3 text-sm text-muted-foreground">No cities match &ldquo;{query}&rdquo;.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
