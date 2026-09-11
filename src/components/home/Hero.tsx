import Link from "next/link";
import { ShieldCheck, Home as HomeIcon, Building2, Hotel, Trees, BedDouble, PlusCircle, FileText } from "lucide-react";

// The property-type visuals the hero communicates — real photos, each a real link to its
// filtered search. Every category the site supports is represented here so the whole
// offering is visible on one screen without scrolling.
const COLLAGE = [
  { label: "HOUSE", icon: HomeIcon, image: "/images/categories/independent-houses.jpg", href: "/properties?type=independent_house" },
  { label: "APARTMENTS", icon: Building2, image: "/images/categories/apartments.jpg", href: "/properties?type=apartment" },
  { label: "VILLAS", icon: Hotel, image: "/images/categories/villas.jpg", href: "/properties?type=villa" },
  { label: "COMMERCIAL", icon: Building2, image: "/images/categories/commercial.jpg", href: "/properties?type=office,shop,showroom,warehouse" },
  { label: "PLOTS & LAND", icon: Trees, image: "/images/categories/land.jpg", href: "/properties?type=plot,land" },
  { label: "PG / CO-LIVING", icon: BedDouble, image: "/images/categories/pg.jpg", href: "/properties?type=pg,flatmate" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-navy-dark">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 15%, rgba(255,90,0,0.28), transparent 40%), radial-gradient(circle at 88% 0%, rgba(10,79,158,0.55), transparent 45%)",
        }}
        aria-hidden
      />

      <div className="container-rentlet relative pb-8 pt-4 sm:pb-10 sm:pt-5 lg:pb-10 lg:pt-6">
        {/* Primary CTAs — mobile only (lg:hidden). On desktop both already sit in the header;
            here they cover the small screens where the header hides them behind the menu.
            Kept compact (small text, tight padding) so they don't push the category photos
            too far down the page. */}
        <div className="mb-2.5 flex animate-fade-up flex-wrap gap-1.5 lg:hidden">
          <Link
            href="/post-property"
            className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-brand-navy shadow-md shadow-black/20 transition-transform hover:-translate-y-0.5 sm:flex-none"
          >
            <PlusCircle className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
            Post Property — Free
          </Link>
          <Link
            href="/rental-agreement"
            className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-white/40 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/10 sm:flex-none"
          >
            <FileText className="h-3.5 w-3.5 shrink-0" />
            Rent Agreement
          </Link>
        </div>

        {/* Rent / Sell / Lease quick links — mobile only, the header's top nav is hidden there */}
        <div className="mb-3 flex animate-fade-up gap-1.5 lg:hidden">
          {[
            { label: "Rent", href: "/properties?listingType=rent" },
            { label: "Sell", href: "/post-property" },
            { label: "Lease", href: "/properties?listingType=rent&type=office,shop,showroom,warehouse" },
          ].map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="flex-1 rounded-lg border border-white/25 bg-white/5 py-1.5 text-center text-xs font-bold text-white transition-colors hover:bg-white/15"
            >
              {c.label}
            </Link>
          ))}
        </div>

        {/* Top row: trust badge on the left, headline + subtext on the top right */}
        <div className="flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-orange-dark px-3.5 py-1.5 text-xs font-bold text-white shadow-lg shadow-brand-orange/30 ring-1 ring-white/20">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-brand-orange">
              <ShieldCheck className="h-3 w-3" />
            </span>
            Trusted by 50,000+ home seekers across India
          </span>

          <div className="max-w-2xl sm:text-right">
            <h1 className="text-lg font-extrabold leading-tight text-white sm:text-xl lg:text-2xl">
              Find a Place You&apos;ll Love to Call Home
            </h1>
          </div>
        </div>

        {/* Subtext — left-aligned below the top row */}
        <p className="mt-3 max-w-xl animate-fade-up text-xs text-white/70 sm:text-sm">
          Discover verified homes, apartments, villas, plots and commercial spaces across India.
        </p>

        {/* Hero visual: every property category — real photos with real links, all six
            visible on one screen (2 cols on mobile, 3 cols from sm up). */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {COLLAGE.map(({ label, icon: Icon, image, href }) => (
            <Link
              key={label}
              href={href}
              className="group relative flex h-36 flex-col justify-end overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:-translate-y-1 sm:h-44 lg:h-52"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- local /public asset */}
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/95 via-brand-navy-dark/25 to-transparent" />
              <span className="relative m-2.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold tracking-wide text-brand-navy shadow-md sm:text-xs">
                <Icon className="h-3.5 w-3.5 text-brand-orange" /> {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
