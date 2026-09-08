"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { FilterPanel } from "@/components/search/FilterPanel";
import { cn } from "@/lib/utils";
import type { SearchFilters } from "@/lib/services/search.service";
import { activeFilterCount } from "@/lib/search-params";

export function MobileFilters({ initial }: { initial: SearchFilters }) {
  const [open, setOpen] = useState(false);
  const count = activeFilterCount(initial);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-foreground lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" /> Filters
        {count > 0 && (
          <span className={cn("flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1 text-[11px] font-bold text-white")}>
            {count}
          </span>
        )}
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Filters" className="sm:max-w-sm">
        <FilterPanel initial={initial} onApplied={() => setOpen(false)} />
      </Modal>
    </>
  );
}
