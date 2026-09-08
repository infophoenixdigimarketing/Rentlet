"use client";

import { useState } from "react";
import { LayoutGrid, List, Map as MapIcon, SearchX } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyListRow } from "@/components/property/PropertyListRow";
import { MapView } from "@/components/search/MapView";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

type View = "grid" | "list" | "map";
const PAGE_SIZE = 9;

export function PropertiesView({ properties }: { properties: Property[] }) {
  const [view, setView] = useState<View>("grid");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = properties.slice(0, visible);

  if (properties.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No properties found"
        description="Try changing your filters or searching a different locality."
        className="mt-4"
      />
    );
  }

  return (
    <div>
      <div className="flex justify-end">
        <div className="inline-flex gap-0.5 rounded-lg border border-border bg-white p-1">
          {(
            [
              { id: "grid", icon: LayoutGrid, label: "Grid" },
              { id: "list", icon: List, label: "List" },
              { id: "map", icon: MapIcon, label: "Map" },
            ] as const
          ).map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={view === v.id}
              aria-label={v.label}
              onClick={() => setView(v.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold",
                view === v.id ? "bg-brand-navy text-white" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <v.icon className="h-3.5 w-3.5" /> {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {view === "map" && <MapView properties={properties} />}

        {view === "grid" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}

        {view === "list" && (
          <div className="flex flex-col gap-4">
            {shown.map((p) => (
              <PropertyListRow key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>

      {view !== "map" && visible < properties.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className={cn(buttonVariants({ variant: "outline", size: "md" }))}
          >
            Load More ({properties.length - visible} more)
          </button>
        </div>
      )}
    </div>
  );
}
