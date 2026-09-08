import Link from "next/link";
import { Key, Home, Tag, Trees, Building2, BedDouble, Users2, ArrowRight, type LucideIcon } from "lucide-react";

// Deliberately a compact, icon-led list rather than more photo cards — PurposeShowcase already
// covers the same 7 destinations with large imagery right below the hero; repeating that
// treatment here would be visual clutter. This section reads more like a quick "jump to" index.
// Each purpose gets its own icon-chip colour (resting tint + solid on hover).
const PURPOSES: { icon: LucideIcon; label: string; href: string; chip: string }[] = [
  { icon: Key, label: "Find a Home to Rent", href: "/properties?listingType=rent", chip: "bg-brand-orange-light text-brand-orange group-hover:bg-brand-orange group-hover:text-white" },
  { icon: Home, label: "Buy Your Dream Home", href: "/properties?listingType=sale", chip: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white" },
  { icon: Tag, label: "Sell Your Property", href: "/post-property", chip: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white" },
  { icon: Trees, label: "Find Land", href: "/properties?type=plot,land", chip: "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white" },
  { icon: Building2, label: "Find Commercial Space", href: "/properties?type=office,shop,showroom,warehouse", chip: "bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white" },
  { icon: BedDouble, label: "Find a PG", href: "/properties?type=pg", chip: "bg-fuchsia-50 text-fuchsia-600 group-hover:bg-fuchsia-600 group-hover:text-white" },
  { icon: Users2, label: "Find a Flatmate", href: "/properties?type=flatmate", chip: "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white" },
];

export function PurposeLinks() {
  return (
    <section className="bg-brand-navy-light/40 py-14 lg:py-16">
      <div className="container-rentlet">
        <h2 className="text-center text-2xl font-extrabold text-foreground lg:text-3xl">Find the Right Property for Your Purpose</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {PURPOSES.map(({ icon: Icon, label, href, chip }) => (
            <Link
              key={label}
              href={href}
              className="group flex items-center gap-2.5 rounded-full border border-border bg-white py-2.5 pl-2.5 pr-4 text-sm font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${chip}`}>
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              {label}
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
