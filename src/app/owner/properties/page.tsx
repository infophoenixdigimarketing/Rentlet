"use client";

import { useState } from "react";
import Link from "next/link";
import { Pause, Play, Star, Trash2, CheckCircle2, Pencil, Building2 } from "lucide-react";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { buttonVariants } from "@/components/ui/Button";
import { useOwnerProperties } from "@/lib/dashboard-hooks";
import { ownerPropertiesService } from "@/lib/services/owner.service";
import { priceLabel, cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import type { Property, PropertyStatus } from "@/types/property";

const STATUS_STYLE: Record<PropertyStatus, string> = {
  active: "bg-emerald-100 text-emerald-700",
  paused: "bg-amber-100 text-amber-700",
  rented: "bg-brand-navy-light text-brand-navy",
  sold: "bg-brand-navy-light text-brand-navy",
  draft: "bg-muted text-muted-foreground",
  deleted: "bg-red-100 text-red-700",
};

export default function OwnerPropertiesPage() {
  const properties = useOwnerProperties();

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">My Properties</h1>
        <p className="text-sm text-muted-foreground">{properties.length} listings</p>
      </div>

      {properties.length === 0 ? (
        <EmptyState
          className="mt-6"
          icon={Building2}
          title="No properties yet"
          description="Post your first property to start receiving leads."
          action={
            <Link href="/post-property" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
              Post Property
            </Link>
          }
        />
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {properties.map((p) => (
            <PropertyRow key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function PropertyRow({ property }: { property: Property }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function togglePause() {
    const next = property.status === "active" ? "paused" : "active";
    ownerPropertiesService.setStatus(property.id, next);
    toast(next === "active" ? "Listing published" : "Listing paused");
  }

  function boost() {
    ownerPropertiesService.toggleFeatured(property.id);
    toast(property.featured ? "Boost removed" : "Listing boosted to Featured");
  }

  function markDone() {
    const next = property.listingType === "rent" ? "rented" : "sold";
    ownerPropertiesService.setStatus(property.id, next);
    toast(`Marked as ${next}`);
  }

  function del() {
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      setTimeout(() => setConfirmingDelete(false), 3000);
      return;
    }
    ownerPropertiesService.remove(property.id);
    toast("Listing deleted", "info");
  }

  const isClosed = property.status === "rented" || property.status === "sold";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-3 sm:flex-row">
      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl sm:w-44">
        <PropertyImage id={property.id} propertyType={property.propertyType} className="h-full w-full" />
        {property.featured && (
          <span className="absolute left-2 top-2">
            <Badge variant="orange">FEATURED</Badge>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-sm font-semibold text-foreground">{property.title}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{property.locality}, {property.city}</p>
            <p className="mt-1 text-sm font-bold text-brand-navy">{priceLabel(property)}</p>
          </div>
          <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold capitalize", STATUS_STYLE[property.status])}>
            {property.status}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>{property.views.toLocaleString("en-IN")} views</span>
          <span>{property.leadsCount} leads</span>
          <span>{property.savedCount} saved</span>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          <button
            type="button"
            onClick={() => toast("Editing opens the Post Property wizard — arriving in Phase 7", "info")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
          {!isClosed && (
            <button
              type="button"
              onClick={togglePause}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
            >
              {property.status === "active" ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {property.status === "active" ? "Pause" : "Publish"}
            </button>
          )}
          <button
            type="button"
            onClick={boost}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold",
              property.featured ? "border-brand-orange bg-brand-orange-light text-brand-orange-dark" : "border-border text-foreground hover:bg-muted"
            )}
          >
            <Star className="h-3.5 w-3.5" /> {property.featured ? "Boosted" : "Boost"}
          </button>
          {!isClosed && (
            <button
              type="button"
              onClick={markDone}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Mark as {property.listingType === "rent" ? "Rented" : "Sold"}
            </button>
          )}
          <button
            type="button"
            onClick={del}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold",
              confirmingDelete ? "border-red-500 bg-red-50 text-red-600" : "border-border text-foreground hover:bg-muted"
            )}
          >
            <Trash2 className="h-3.5 w-3.5" /> {confirmingDelete ? "Confirm delete?" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
