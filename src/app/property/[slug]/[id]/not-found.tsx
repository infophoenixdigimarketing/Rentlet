import Link from "next/link";
import { SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Spec §54 — a 404 must never be a bare browser error page.
export default function PropertyNotFound() {
  return (
    <div className="container-rentlet flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy-light text-brand-navy">
        <SearchX className="h-7 w-7" strokeWidth={1.5} />
      </span>
      <h1 className="mt-5 text-2xl font-extrabold text-foreground">Property not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        This listing may have been rented, sold, or removed by its owner. Let&apos;s find you
        something else.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "md" }))}>
          Go Home
        </Link>
        <Link href="/properties" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
          Search Properties
        </Link>
      </div>
    </div>
  );
}
