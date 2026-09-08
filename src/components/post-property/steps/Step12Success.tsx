import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

export function Step12Success({ property }: { property: Property }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <CheckCircle2 className="h-8 w-8" />
      </span>
      <h2 className="mt-5 text-xl font-extrabold text-foreground">Submitted for verification!</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        &ldquo;{property.title}&rdquo; is live and visible to buyers/tenants now, with a Pending
        Verification badge — our team reviews it shortly and clears it to Verified.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href={`/property/${property.slug}/${property.id}`} className={cn(buttonVariants({ variant: "outline", size: "md" }))}>
          View Listing
        </Link>
        <Link href="/owner/properties" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
          Go to My Properties
        </Link>
      </div>
    </div>
  );
}
