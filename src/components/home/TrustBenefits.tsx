import { ShieldCheck, LayoutGrid, UsersRound, Headset, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const BENEFITS: {
  icon: LucideIcon;
  title: string;
  description: string;
  tile: string;
}[] = [
  { icon: ShieldCheck, title: "Verified Properties", description: "100% verified listings", tile: "bg-emerald-100 text-emerald-600" },
  { icon: LayoutGrid, title: "Wide Range", description: "Homes for every need", tile: "bg-blue-100 text-blue-600" },
  { icon: UsersRound, title: "Trusted Platform", description: "50,000+ happy users", tile: "bg-violet-100 text-violet-600" },
  { icon: Headset, title: "Hassle Free", description: "Expert support", tile: "bg-brand-orange-light text-brand-orange" },
];

export function TrustBenefits() {
  return (
    <section className="border-b border-border bg-white py-10">
      <div className="container-rentlet grid grid-cols-2 gap-6 sm:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, description, tile }) => (
          <div key={title} className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
            <span className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl", tile)}>
              <Icon className="h-7 w-7" strokeWidth={1.75} />
            </span>
            <span>
              <span className="block text-sm font-bold text-foreground">{title}</span>
              <span className="block text-xs text-muted-foreground">{description}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
