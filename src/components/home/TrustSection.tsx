import { CheckCircle2 } from "lucide-react";

const POINTS = [
  "Verified Properties",
  "Genuine Owners & Agents",
  "No Fake Listings",
  "Secure Property Discovery",
  "Properties Across India",
];

export function TrustSection() {
  return (
    <section className="border-y border-border bg-white py-14 lg:py-16">
      <div className="container-rentlet flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-2xl font-extrabold text-foreground lg:text-3xl">
          Real Properties. Verified Listings. Better Choices.
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {POINTS.map((point) => (
            <span key={point} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-orange" />
              {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
