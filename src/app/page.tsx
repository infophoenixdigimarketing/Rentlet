import { Suspense } from "react";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { TrustBenefits } from "@/components/home/TrustBenefits";
import { QuickCategories } from "@/components/home/QuickCategories";
import { PurposeShowcase } from "@/components/home/PurposeShowcase";
import { PropertyShowcaseSection } from "@/components/home/PropertyShowcaseSection";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { PopularCities } from "@/components/home/PopularCities";
import { PurposeLinks } from "@/components/home/PurposeLinks";
import { TrustSection } from "@/components/home/TrustSection";
import { WhyRentlet } from "@/components/home/WhyRentlet";
import { HowItWorks } from "@/components/home/HowItWorks";
import { OwnerCTA } from "@/components/home/OwnerCTA";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { PropertyCardSkeleton } from "@/components/property/PropertyCardSkeleton";
import { rentShowcaseIds, buyShowcaseIds, luxuryVillaShowcaseIds } from "@/lib/data/seed-properties";

function FeaturedPropertiesSkeleton() {
  return (
    <section className="bg-muted py-14 lg:py-20">
      <div className="container-rentlet">
        <div className="h-8 w-56 rounded bg-white" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Section order follows the latest spec's numbered sequence exactly (Hero -> Category cards ->
// Featured Properties -> Popular Rentals/Sale/Residential Land/Commercial/PG & Co-Living ->
// Popular Cities -> Why Rentlet -> Post Property CTA -> Footer[layout]); everything built in
// earlier turns and not part of that numbered list (QuickCategories, Luxury Villas, Purpose
// links, Trust, HowItWorks, Testimonials, FAQ) is kept, not removed, slotted in between.
//
// PG & Co-Living and Flatmates stay ONE combined section rather than being split in two: the
// catalogue only has 4 real listings across that whole category (2 PG, 1 co-living, 1 flatmate)
// — splitting them would leave a "Flatmates" section with a single lonely card, which reads as
// broken, not premium. Flatmates is still fully reachable (category card, purpose link, footer,
// nav) — it just doesn't get its own mostly-empty carousel.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  // Root layout supplies the default title/description/OG — here we just pin the canonical.
  alternates: { canonical: "/" },
};

// Brand + site-search structured data — helps Google show the org knowledge panel and a
// sitelinks search box for "rentlet".
const homeJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rentlet",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description:
      "Rentlet is a modern Indian real-estate marketplace for rent, sale, land, PG, flatmates and commercial properties.",
    areaServed: "IN",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rentlet",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/properties?city={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
      <Hero />
      <TrustBenefits />

      <Suspense fallback={<FeaturedPropertiesSkeleton />}>
        <FeaturedProperties />
      </Suspense>

      <PurposeShowcase />

      <QuickCategories />

      <PropertyShowcaseSection
        title="Popular Rentals"
        subtitle="Apartments, independent houses and villas — verified, brokerage-free."
        ids={rentShowcaseIds}
        viewAllHref="/properties?listingType=rent"
        tone="white"
      />
      <PropertyShowcaseSection
        title="Properties for Sale"
        subtitle="Premium apartments, villas and independent houses across India."
        ids={buyShowcaseIds}
        viewAllHref="/properties?listingType=sale"
        tone="muted"
      />
      <PropertyShowcaseSection
        title="Luxury Villas"
        subtitle="Premium, spacious villas for those who want more space and privacy."
        ids={luxuryVillaShowcaseIds}
        viewAllHref="/properties?type=villa"
        tone="muted"
      />

      <WhyRentlet />

      <PopularCities />

      <PurposeLinks />
      <TrustSection />

      <HowItWorks />
      <OwnerCTA />
      <Testimonials />
      <FAQ />
    </>
  );
}
