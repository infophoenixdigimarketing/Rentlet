import { ShieldCheck, IndianRupee, BadgeCheck, SearchCheck, Lock, BellRing, TrendingDown, CalendarClock, LayoutDashboard, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const PRIMARY: { icon: LucideIcon; title: string; description: string; tile: string; ring: string }[] = [
  {
    icon: ShieldCheck,
    title: "Verified Properties",
    description: "Every listing is checked for identity, location and photos before it goes live.",
    tile: "bg-emerald-100 text-emerald-600",
    ring: "hover:ring-emerald-200",
  },
  {
    icon: IndianRupee,
    title: "No Brokerage Options",
    description: "Deal directly with owners on thousands of listings — zero brokerage fees.",
    tile: "bg-brand-orange-light text-brand-orange",
    ring: "hover:ring-brand-orange/25",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Listings",
    description: "Real owners, real properties — no fake or duplicate listings, ever.",
    tile: "bg-blue-100 text-blue-600",
    ring: "hover:ring-blue-200",
  },
  {
    icon: SearchCheck,
    title: "Easy Property Search",
    description: "Powerful filters and map-first discovery to find exactly what you need, fast.",
    tile: "bg-violet-100 text-violet-600",
    ring: "hover:ring-violet-200",
  },
];

const MORE = [
  { icon: Lock, label: "Secure & Simple" },
  { icon: BellRing, label: "Smart Saved Searches" },
  { icon: TrendingDown, label: "Price-Drop Alerts" },
  { icon: CalendarClock, label: "One-Click Visit Scheduling" },
  { icon: LayoutDashboard, label: "Owner Lead Dashboard" },
];

export function WhyRentlet() {
  return (
    <section className="py-14 lg:py-20">
      <div className="container-rentlet">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold text-foreground lg:text-3xl">Why Choose Rentlet</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Built to remove the guesswork from renting, buying and selling property in India.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRIMARY.map(({ icon: Icon, title, description, tile, ring }) => (
            <div
              key={title}
              className={cn(
                "flex flex-col items-center rounded-2xl border border-border bg-white p-6 text-center shadow-sm ring-2 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                ring
              )}
            >
              <span className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", tile)}>
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 text-base font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-muted/60 p-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">And more:</span>
          {MORE.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-medium text-foreground/80"
            >
              <Icon className="h-3.5 w-3.5 text-brand-orange" strokeWidth={1.75} /> {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
