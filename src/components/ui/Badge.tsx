import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide",
  {
    variants: {
      variant: {
        orange: "bg-brand-orange text-white",
        navy: "bg-brand-navy text-white",
        verified: "bg-emerald-600 text-white",
        outline: "border border-border bg-white/90 text-foreground backdrop-blur",
        subtleOrange: "bg-brand-orange-light text-brand-orange-dark",
        subtleNavy: "bg-brand-navy-light text-brand-navy",
      },
    },
    defaultVariants: { variant: "navy" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
