import Link from "next/link";
import {
  Building2,
  Home,
  Briefcase,
  Trees,
  BedDouble,
  Castle,
  HardHat,
  Users,
  type LucideIcon,
} from "lucide-react";
import { quickCategories } from "@/lib/data/categories";

const ICONS: Record<string, LucideIcon> = {
  "building-2": Building2,
  home: Home,
  briefcase: Briefcase,
  trees: Trees,
  "bed-double": BedDouble,
  castle: Castle,
  "hard-hat": HardHat,
  users: Users,
};

export function QuickCategories() {
  return (
    <section className="py-14 lg:py-20">
      <div className="container-rentlet">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold text-foreground lg:text-3xl">Browse by Category</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Whatever you&apos;re looking for, Rentlet has it covered.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8 lg:gap-4">
          {quickCategories.map((cat) => {
            const Icon = ICONS[cat.icon] ?? Building2;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/20"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- local /public asset */}
                <img
                  src={cat.imageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/90 via-brand-navy-dark/25 to-transparent" />
                <span className="relative flex flex-col items-center gap-2 p-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-orange text-white shadow-lg">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                  </span>
                  <span className="block text-xs font-bold text-white sm:text-sm">{cat.title}</span>
                  <span className="block text-[10px] font-medium text-white/70">
                    {cat.propertyCount.toLocaleString("en-IN")}+ listings
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
