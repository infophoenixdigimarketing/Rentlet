import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, children, ...props }, ref) => (
    <label className="flex flex-1 flex-col gap-1 min-w-0">
      {label && (
        <span className="px-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      )}
      <span className="relative flex items-center">
        <select
          ref={ref}
          className={cn(
            "peer w-full appearance-none rounded-xl border border-transparent bg-transparent py-2 pl-1 pr-6 text-sm font-medium text-foreground outline-none",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 h-4 w-4 text-muted-foreground" />
      </span>
    </label>
  )
);
Select.displayName = "Select";
