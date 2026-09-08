import { Star } from "lucide-react";
import { testimonials } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export function Testimonials() {
  return (
    <section className="py-14 lg:py-20">
      <div className="container-rentlet">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold text-foreground lg:text-3xl">What People Say</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Real stories from Rentlet tenants, buyers and owners.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="flex flex-col rounded-2xl border border-border bg-white p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < t.rating ? "fill-brand-orange text-brand-orange" : "fill-border text-border"
                    )}
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-light text-sm font-bold text-brand-navy">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
