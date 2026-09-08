import Link from "next/link";
import { ArrowRight, Building2, Home, Tag, MapPinned, Briefcase, BedDouble, Users, type LucideIcon } from "lucide-react";

const SHOWCASE: { id: string; title: string; description: string; image: string; href: string; icon: LucideIcon }[] = [
  {
    id: "rent",
    title: "Rent",
    description: "Verified rental homes, apartments and villas.",
    image: "/images/categories/apartments.jpg",
    href: "/properties?listingType=rent",
    icon: Building2,
  },
  {
    id: "buy",
    title: "Buy",
    description: "Buy your dream home from thousands of listings.",
    image: "/images/categories/buy-property.jpg",
    href: "/properties?listingType=sale",
    icon: Home,
  },
  {
    id: "sell",
    title: "Sell",
    description: "List your property and reach genuine buyers quickly.",
    image: "/images/showcase/living-3bhk.jpg",
    href: "/post-property",
    icon: Tag,
  },
  {
    id: "land",
    title: "Land",
    description: "Residential plots, farmland and commercial land.",
    image: "/images/categories/land.jpg",
    href: "/properties?type=plot,land",
    icon: MapPinned,
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "Offices, shops and commercial spaces.",
    image: "/images/categories/commercial.jpg",
    href: "/properties?type=office,shop,showroom,warehouse",
    icon: Briefcase,
  },
  {
    id: "pg",
    title: "PG",
    description: "Comfortable PGs and co-living spaces.",
    image: "/images/categories/pg.jpg",
    href: "/properties?type=pg",
    icon: BedDouble,
  },
  {
    id: "flatmates",
    title: "Flatmates",
    description: "Find compatible flatmates and shared stays.",
    image: "/images/categories/flatmates.jpg",
    href: "/properties?type=flatmate",
    icon: Users,
  },
];

export function PurposeShowcase() {
  return (
    <section className="py-14 lg:py-20">
      <div className="container-rentlet">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold text-foreground lg:text-3xl">Explore Properties by Category</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Find the right property for your every need.</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {SHOWCASE.map(({ id, title, description, image, href, icon: Icon }) => (
            <Link
              key={id}
              href={href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10"
            >
              <div className="h-24 w-full overflow-hidden sm:h-28">
                {/* eslint-disable-next-line @next/next/no-img-element -- local /public asset */}
                <img src={image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="relative flex-1 p-4 pt-7">
                <span className="absolute -top-6 left-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-brand-orange-light text-brand-orange shadow-md">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h3 className="text-base font-bold text-foreground">{title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
                <ArrowRight className="mt-2 h-4 w-4 text-brand-navy transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
