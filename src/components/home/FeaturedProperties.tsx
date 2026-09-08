import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { CarouselRow } from "@/components/home/CarouselRow";
import { propertyRepository } from "@/lib/services/properties.service";
import { toPublicProperty } from "@/lib/public-property";

export async function FeaturedProperties() {
  const properties = (await propertyRepository.getFeatured(6)).map(toPublicProperty);

  return (
    <section className="bg-muted py-14 lg:py-20">
      <div className="container-rentlet">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold text-foreground lg:text-3xl">Featured Properties</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Hand-picked, verified listings from trusted owners.
          </p>
          <Link
            href="/properties"
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy hover:text-brand-orange"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8">
          <CarouselRow fadeFrom="from-muted">
            {properties.map((property) => (
              <div key={property.id} data-carousel-item className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[320px]">
                <PropertyCard property={property} className="h-full" />
              </div>
            ))}
          </CarouselRow>
        </div>
      </div>
    </section>
  );
}
