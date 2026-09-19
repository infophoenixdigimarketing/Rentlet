import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { CarouselRow } from "@/components/home/CarouselRow";
import { allProperties } from "@/lib/data/seed-properties";
import { toPublicProperty } from "@/lib/public-property";
import { searchProvider, type SearchFilters } from "@/lib/services/search.service";

export async function PropertyShowcaseSection({
  title,
  subtitle,
  ids,
  filters,
  viewAllHref,
  tone = "white",
  limit = 6,
}: {
  title: string;
  subtitle: string;
  /** Fallback demo listings, shown only while no real listing matches `filters` yet. */
  ids: string[];
  /** Same shape /properties search uses — real, admin-approved listings matching this win over `ids`. */
  filters: SearchFilters;
  viewAllHref: string;
  /** alternates section backgrounds down the page so real photo-heavy sections don't blur together */
  tone?: "white" | "muted";
  limit?: number;
}) {
  // Same real-first/demo-fallback pattern already used by getFeatured() and the /properties
  // search page — real, admin-approved listings replace the curated demo cards automatically
  // the moment enough of them exist for this section, with zero further code changes needed.
  const { items } = await searchProvider.search({ ...filters, sort: "newest" });
  const real = items.slice(0, limit).map(toPublicProperty);
  const properties =
    real.length > 0
      ? real
      : ids
          .map((id) => allProperties.find((p) => p.id === id))
          .filter((p) => p != null)
          .filter((p) => p.status === "active" && p.verificationStatus === "approved")
          .map(toPublicProperty);
  if (properties.length === 0) return null;

  return (
    <section className={tone === "muted" ? "bg-muted py-14 lg:py-20" : "py-14 lg:py-20"}>
      <div className="container-rentlet">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold text-foreground lg:text-3xl">{title}</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
          <Link
            href={viewAllHref}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-navy hover:text-brand-orange"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8">
          <CarouselRow fadeFrom={tone === "muted" ? "from-muted" : "from-white"}>
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
