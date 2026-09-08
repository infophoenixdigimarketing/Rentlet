"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark, Search, Pencil, Trash2, Bell, BellOff } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { useSavedSearches } from "@/lib/saved-searches";
import { savedSearchesService } from "@/lib/services/saved-searches.service";
import { filtersToSearchString } from "@/lib/search-params";
import { cn, timeAgo } from "@/lib/utils";
import { toast } from "@/lib/toast";
import type { SavedSearch } from "@/types/saved-search";

export default function SavedSearchesPage() {
  const searches = useSavedSearches();

  return (
    <div>
      <h1 className="text-xl font-extrabold text-foreground">Saved Searches</h1>
      <p className="mt-1 text-sm text-muted-foreground">{searches.length} saved — we&apos;ll notify you about new matches.</p>

      {searches.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={Bookmark}
          title="No saved searches yet"
          description="Save your filters from any search to get notified about new matches."
          action={
            <Link href="/properties" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
              Start Searching
            </Link>
          }
        />
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {searches.map((s) => (
            <SavedSearchRow key={s.id} search={s} />
          ))}
        </div>
      )}
    </div>
  );
}

function SavedSearchRow({ search }: { search: SavedSearch }) {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(search.label);
  const href = `/properties?${filtersToSearchString(search.filters)}`;

  function saveLabel() {
    savedSearchesService.rename(search.id, label.trim() || search.label);
    setEditing(false);
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        {editing ? (
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={saveLabel}
            onKeyDown={(e) => e.key === "Enter" && saveLabel()}
            autoFocus
            className="w-full rounded-lg border border-border px-2.5 py-1.5 text-sm font-semibold outline-none focus:border-brand-navy"
          />
        ) : (
          <p className="text-sm font-semibold text-foreground">{search.label}</p>
        )}
        <p className="mt-1 text-xs text-muted-foreground">Saved {timeAgo(search.createdAt)}</p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => {
            savedSearchesService.toggleNotify(search.id);
            toast(search.notify ? "Notifications off for this search" : "You'll be notified about new matches");
          }}
          title={search.notify ? "Notifications on" : "Notifications off"}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg border",
            search.notify ? "border-brand-orange bg-brand-orange-light text-brand-orange-dark" : "border-border text-muted-foreground hover:bg-muted"
          )}
        >
          {search.notify ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={() => setEditing(true)}
          title="Edit"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <Link href={href} className="inline-flex items-center gap-1.5 rounded-lg bg-brand-navy px-3 py-2 text-xs font-semibold text-white hover:bg-brand-navy-dark">
          <Search className="h-3.5 w-3.5" /> Search Now
        </Link>
        <button
          type="button"
          onClick={() => {
            savedSearchesService.remove(search.id);
            toast("Saved search deleted", "info");
          }}
          title="Delete"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
