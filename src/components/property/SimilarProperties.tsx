import { PropertyCard } from "@/components/property/PropertyCard";
import { toPublicProperty } from "@/lib/public-property";
import type { Property } from "@/types/property";

export function SimilarProperties({ properties }: { properties: Property[] }) {
  if (properties.length === 0) return null;
  const publicList = properties.map(toPublicProperty);

  return (
    <section>
      <h2 className="text-xl font-extrabold text-foreground">Similar Properties</h2>
      <p className="mt-1 text-sm text-muted-foreground">Other listings you might like nearby.</p>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {publicList.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  );
}
