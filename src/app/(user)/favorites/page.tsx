"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Phone, Plus } from "lucide-react";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { useFavorites } from "@/lib/favorites";
import { favoritesService } from "@/lib/services/favorites.service";
import { propertyRepository } from "@/lib/services/properties.service";
import { cn, priceLabel, timeAgo } from "@/lib/utils";
import { toast } from "@/lib/toast";
import type { FavoriteEntry } from "@/types/favorites";
import type { Property } from "@/types/property";

export default function FavoritesPage() {
  const entries = useFavorites();
  // Recomputed on every render, not stored in state — favoritesService.addFolder() emits on the
  // same subscription useFavorites() already listens to, so this stays in sync for free.
  const folders = favoritesService.getFolders();
  const [folder, setFolder] = useState("All");
  const [newFolder, setNewFolder] = useState("");
  const [properties, setProperties] = useState<Record<string, Property>>({});

  useEffect(() => {
    let cancelled = false;
    Promise.all(entries.map((e) => propertyRepository.getById(e.propertyId))).then((results) => {
      if (cancelled) return;
      const map: Record<string, Property> = {};
      results.forEach((p, i) => {
        if (p) map[entries[i].propertyId] = p;
      });
      setProperties(map);
    });
    return () => {
      cancelled = true;
    };
  }, [entries]);

  const filtered = folder === "All" ? entries : entries.filter((e) => e.folder === folder);

  function addFolder(e: React.FormEvent) {
    e.preventDefault();
    if (!newFolder.trim()) return;
    favoritesService.addFolder(newFolder.trim());
    setFolder(newFolder.trim());
    setNewFolder("");
  }

  return (
    <div>
      <h1 className="text-xl font-extrabold text-foreground">Favorites</h1>
      <p className="mt-1 text-sm text-muted-foreground">{entries.length} saved properties</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {["All", ...folders].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFolder(f)}
            className={cn(
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold",
              folder === f ? "border-brand-navy bg-brand-navy text-white" : "border-border bg-white text-foreground hover:bg-muted"
            )}
          >
            {f}
          </button>
        ))}
        <form onSubmit={addFolder} className="flex items-center gap-1">
          <input
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            placeholder="New folder"
            className="h-8 w-28 rounded-full border border-dashed border-border bg-white px-3 text-xs outline-none focus:border-brand-navy"
          />
          <button type="submit" aria-label="Add folder" className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-muted">
            <Plus className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={Heart}
          title="No saved properties yet"
          description="Tap the heart on any listing to save it here."
          action={
            <Link href="/properties" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
              Browse Properties
            </Link>
          }
        />
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {filtered.map((entry) => {
            const property = properties[entry.propertyId];
            if (!property) return null;
            return <FavoriteRow key={entry.propertyId} entry={entry} property={property} folders={folders} />;
          })}
        </div>
      )}
    </div>
  );
}

function FavoriteRow({ entry, property, folders }: { entry: FavoriteEntry; property: Property; folders: string[] }) {
  const href = `/property/${property.slug}/${property.id}`;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-3 sm:flex-row sm:items-center">
      <Link href={href} className="relative block h-32 w-full shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-28">
        <PropertyImage id={property.id} propertyType={property.propertyType} className="h-full w-full" />
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={href} className="line-clamp-1 text-sm font-semibold text-foreground hover:text-brand-navy">
          {property.title}
        </Link>
        <p className="mt-0.5 text-xs text-muted-foreground">{property.locality}, {property.city}</p>
        <p className="mt-1 text-sm font-bold text-brand-navy">{priceLabel(property)}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">Saved {timeAgo(entry.savedAt)}</p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <select
          value={entry.folder}
          onChange={(e) => favoritesService.moveToFolder(property.id, e.target.value)}
          className="h-9 rounded-lg border border-border bg-white px-2.5 text-xs font-medium outline-none focus:border-brand-navy"
        >
          {folders.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-orange-light px-3 py-2 text-xs font-semibold text-brand-orange-dark hover:bg-brand-orange hover:text-white"
        >
          <Phone className="h-3.5 w-3.5" /> Contact
        </button>
        <button
          type="button"
          aria-label="Remove from favorites"
          onClick={() => {
            favoritesService.remove(property.id);
            toast("Removed from favorites", "info");
          }}
          className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-red-50 hover:text-red-600"
        >
          <Heart className="h-4 w-4 fill-current" />
        </button>
      </div>
    </div>
  );
}
