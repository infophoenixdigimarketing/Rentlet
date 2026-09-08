import Link from "next/link";
import { ArrowRight, CheckCircle2, Home } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const POINTS = ["List in under 5 minutes", "Get a Verified badge", "Track leads in real time"];

export function OwnerCTA() {
  return (
    <section className="py-14 lg:py-20">
      <div className="container-rentlet">
        <div className="relative overflow-hidden rounded-3xl bg-brand-navy px-6 py-12 sm:px-12 lg:py-16">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element -- local /public asset */}
            <img src="/images/showcase/living-3bhk.jpg" alt="" className="h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/95 to-brand-navy/70" />
          </div>
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 90% 20%, rgba(255,90,0,0.35), transparent 45%)",
            }}
            aria-hidden
          />
          <span
            className="absolute right-10 top-1/2 hidden h-24 w-24 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-xl xl:flex"
            aria-hidden
          >
            <Home className="h-10 w-10 text-brand-navy" strokeWidth={1.5} />
          </span>
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between xl:pr-36">
            <div className="max-w-lg">
              <h2 className="text-2xl font-extrabold text-white lg:text-3xl">
                Have a Property to Sell or Rent?
              </h2>
              <p className="mt-2 text-sm text-white/70 lg:text-base">
                List your property on Rentlet and reach genuine property seekers across India.
              </p>
              <ul className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-6">
                {POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-white/85">
                    <CheckCircle2 className="h-4 w-4 text-brand-orange" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/post-property"
                className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
              >
                Post Your Property <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "border border-white/30 text-white hover:bg-white/10 hover:text-white"
                )}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
