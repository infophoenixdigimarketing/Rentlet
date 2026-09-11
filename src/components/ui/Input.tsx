"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, type, ...props }, ref) => {
    const inputId = id ?? props.name;
    // Every password field gets a show/hide toggle for free.
    const [reveal, setReveal] = React.useState(false);
    const isPassword = type === "password";

    return (
      <label className="flex flex-col gap-1.5" htmlFor={inputId}>
        {label && <span className="text-xs font-semibold text-foreground/80">{label}</span>}
        <span className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            type={isPassword ? (reveal ? "text" : "password") : type}
            className={cn(
              "h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-navy",
              isPassword && "pr-10",
              error && "border-red-400 focus:border-red-500",
              className
            )}
            aria-invalid={Boolean(error)}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setReveal((v) => !v)}
              aria-label={reveal ? "Hide password" : "Show password"}
              tabIndex={-1}
              className="absolute right-3 flex items-center text-muted-foreground hover:text-foreground"
            >
              {reveal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </span>
        {error && <span className="text-xs font-medium text-red-600">{error}</span>}
      </label>
    );
  }
);
Input.displayName = "Input";
