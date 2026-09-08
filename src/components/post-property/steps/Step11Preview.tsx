"use client";

import { PropertyImage } from "@/components/ui/PropertyImage";
import { Badge } from "@/components/ui/Badge";
import { PropertyInfoGrid } from "@/components/property/PropertyInfoGrid";
import { AmenitiesGrid } from "@/components/property/AmenitiesGrid";
import { buildProperty } from "@/lib/services/post-property.service";
import { priceLabel, formatINR } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import type { WizardState } from "@/types/wizard";

export function Step11Preview({ state }: { state: WizardState }) {
  const { user } = useAuth();
  if (!user) return null;
  const property = buildProperty(state, user, "preview");

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">Preview your listing</h2>
      <p className="mt-1 text-sm text-muted-foreground">This is how it will look to buyers and tenants.</p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border">
        <div className="relative h-56 w-full">
          <PropertyImage id="preview" propertyType={property.propertyType} className="h-full w-full" />
          <div className="absolute left-3 top-3 flex gap-1.5">
            <Badge variant="orange">PREVIEW</Badge>
            <Badge variant="outline">PENDING VERIFICATION</Badge>
          </div>
        </div>

        <div className="p-5">
          <p className="text-2xl font-extrabold text-brand-navy">{priceLabel(property)}</p>
          {property.deposit != null && property.listingType === "rent" && (
            <p className="text-xs text-muted-foreground">+ {formatINR(property.deposit)} deposit</p>
          )}
          <h3 className="mt-1.5 text-base font-bold text-foreground">{property.title || "Untitled listing"}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {property.locality || "Locality"}, {property.city || "City"}
          </p>

          <div className="mt-4">
            <PropertyInfoGrid property={property} />
          </div>

          {property.description && <p className="mt-4 text-sm leading-relaxed text-foreground/80">{property.description}</p>}

          {property.amenities.length > 0 && (
            <div className="mt-4">
              <AmenitiesGrid amenities={property.amenities} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
