import Link from "next/link";
import { MapPin } from "lucide-react";
import { popularCities } from "@/lib/data/cities";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-brand-navy to-brand-navy-dark",
  "from-[#0a4f9e] to-brand-navy-dark",
  "from-brand-navy-dark to-[#083a70]",
];

export function PopularCities() {
  return (
    <section className="py-14 lg:py-20">
      <div className="container-rentlet">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold text-foreground lg:text-3xl">Explore Properties Across India</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Verified listings across India&apos;s fastest-growing real-estate markets.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {popularCities.map((city, i) => (
            <Link
              key={city.id}
              href={`/properties?city=${city.id}`}
              className={cn(
                "group relative flex h-32 flex-col justify-end overflow-hidden rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1",
                !city.imageUrl && cn("bg-gradient-to-br", GRADIENTS[i % GRADIENTS.length])
              )}
            >
              {city.imageUrl && (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element -- local /public asset */}
                  <img
                    src={city.imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </>
              )}
              <MapPin className="absolute right-3 top-3 h-5 w-5 text-white/20 transition-colors group-hover:text-brand-orange/60" />
              <span className="relative text-sm font-bold text-white">{city.name}</span>
              <span className="relative text-xs text-white/60">
                {city.propertyCount.toLocaleString("en-IN")}+ properties
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
