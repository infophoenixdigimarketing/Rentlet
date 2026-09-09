import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { propertyRepository } from "@/lib/services/properties.service";
import { toPublicProperty } from "@/lib/public-property";
import { priceLabel, formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Gallery } from "@/components/property/Gallery";
import { ActionBar } from "@/components/property/ActionBar";
import { TrustBadges } from "@/components/property/TrustBadges";
import { PropertyInfoGrid } from "@/components/property/PropertyInfoGrid";
import { AmenitiesGrid } from "@/components/property/AmenitiesGrid";
import { LocationMap } from "@/components/property/LocationMap";
import { OwnerCard } from "@/components/property/OwnerCard";
import { ReviewsSection } from "@/components/property/ReviewsSection";
import { SimilarProperties } from "@/components/property/SimilarProperties";
import { RecordView } from "@/components/property/RecordView";
import { UserGate } from "@/components/user/UserGate";
import { JsonLd } from "@/components/seo/JsonLd";

import { SITE_URL } from "@/lib/site-url";

async function loadProperty(slug: string, id: string) {
  const property = await propertyRepository.getBySlugAndId(slug, id);
  if (!property) notFound();
  return property;
}

export async function generateMetadata(props: PageProps<"/property/[slug]/[id]">): Promise<Metadata> {
  const { slug, id } = await props.params;
  const property = await propertyRepository.getBySlugAndId(slug, id);
  if (!property) return { title: "Property not found" };

  const description = `${property.title} in ${property.locality}, ${property.city}. ${priceLabel(
    property
  )}. ${property.bedrooms ? `${property.bedrooms} BHK, ` : ""}${property.builtUpArea ?? ""} sq.ft.`.trim();

  return {
    title: property.title,
    description,
    alternates: { canonical: `/property/${property.slug}/${property.id}` },
    openGraph: { title: property.title, description, type: "website" },
  };
}

export default async function PropertyDetailPage(props: PageProps<"/property/[slug]/[id]">) {
  const { slug, id } = await props.params;
  const raw = await loadProperty(slug, id);
  // Everything below the fold is public — strip owner identity / exact location first.
  const property = toPublicProperty(raw);
  const similar = (await propertyRepository.getSimilar(raw, 3)).map(toPublicProperty);

  const url = `${SITE_URL}/property/${property.slug}/${property.id}`;
  const amount = raw.listingType === "rent" ? raw.rent : raw.price;

  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: raw.title,
    description: raw.description,
    url,
    image: property.images?.length ? property.images : undefined,
    datePosted: raw.createdAt ?? undefined,
    // Area-level only — exact street address and pincode are not public (managed-brokerage model).
    address: {
      "@type": "PostalAddress",
      addressLocality: property.locality,
      addressRegion: property.state,
      addressCountry: "IN",
    },
    numberOfRooms: property.bedrooms ?? undefined,
    numberOfBathroomsTotal: property.bathrooms ?? undefined,
    floorSize: property.builtUpArea
      ? { "@type": "QuantitativeValue", value: property.builtUpArea, unitCode: "FTK" }
      : undefined,
    offers: amount
      ? {
          "@type": "Offer",
          price: amount,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          ...(raw.listingType === "rent"
            ? { priceSpecification: { "@type": "UnitPriceSpecification", price: amount, priceCurrency: "INR", unitCode: "MON" } }
            : {}),
        }
      : undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: property.city, item: `${SITE_URL}/properties?city=${encodeURIComponent(property.city)}` },
      { "@type": "ListItem", position: 3, name: property.title, item: url },
    ],
  };

  return (
    <>
    {/* Structured data sits outside the login gate so logged-out crawlers still get it
        (it only carries the already-public area-level fields). */}
    <JsonLd data={[listingJsonLd, breadcrumbJsonLd]} />
    <UserGate
      title="Login to view this property"
      description="Sign in to see full property details, photos and to contact a RENTLET agent."
    >
    <div className="container-rentlet py-6 pb-28 sm:pb-10">
      <RecordView propertyId={property.id} />

      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-brand-navy">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/properties?city=${property.city}`} className="hover:text-brand-navy">{property.city}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="line-clamp-1 text-foreground">{property.title}</span>
      </nav>

      <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <Gallery property={property} />

          <div className="mt-5 flex flex-wrap gap-1.5">
            {property.featured && <Badge variant="orange">FEATURED</Badge>}
            {property.verificationStatus === "approved" && <Badge variant="verified">VERIFIED</Badge>}
            {property.noBrokerage && <Badge variant="subtleNavy">NO BROKERAGE</Badge>}
          </div>

          <h1 className="mt-2 text-xl font-extrabold text-foreground sm:text-2xl">{property.title}</h1>
          {/* House-seekers see the area only. The exact address, pincode and owner
              contact are shared by a RENTLET manager once a visit is booked (spec §33). */}
          <p className="mt-1 text-sm text-muted-foreground">
            {property.locality}, {property.city}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground/80">
            Exact address shared by your RENTLET manager after you book a visit
          </p>

          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <span className="text-2xl font-extrabold text-brand-navy sm:text-3xl">{priceLabel(property)}</span>
            {property.listingType === "rent" && property.deposit != null && (
              <span className="text-sm text-muted-foreground">+ {formatINR(property.deposit)} deposit</span>
            )}
            {property.maintenance != null && property.maintenance > 0 && (
              <span className="text-sm text-muted-foreground">+ {formatINR(property.maintenance)}/month maintenance</span>
            )}
            {property.negotiable && <span className="text-xs font-semibold text-brand-orange">Negotiable</span>}
          </div>

          <div className="mt-5">
            <ActionBar property={property} />
          </div>

          <div className="mt-6">
            <TrustBadges property={property} />
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-bold text-foreground">Overview</h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{property.description}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-bold text-foreground">Property Details</h2>
            <div className="mt-3">
              <PropertyInfoGrid property={property} />
            </div>
          </section>

          {property.amenities.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-bold text-foreground">Amenities</h2>
              <div className="mt-3">
                <AmenitiesGrid amenities={property.amenities} />
              </div>
            </section>
          )}

          <section className="mt-8">
            <h2 className="text-lg font-bold text-foreground">Location &amp; Nearby Places</h2>
            <div className="mt-3">
              <LocationMap property={property} />
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-bold text-foreground">Reviews</h2>
            <div className="mt-3">
              <ReviewsSection />
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <OwnerCard property={property} />
        </aside>
      </div>

      <div className="mt-14">
        <SimilarProperties properties={similar} />
      </div>
    </div>
    </UserGate>
    </>
  );
}
