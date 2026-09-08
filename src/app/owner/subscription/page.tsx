"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { PLANS } from "@/lib/data/plans";

export default function OwnerSubscriptionPage() {
  const [current, setCurrent] = useState<string>("free");

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Subscription</h1>
        <p className="text-sm text-muted-foreground">Choose a plan that fits how much you list.</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {PLANS.map((plan) => {
          const isCurrent = current === plan.id;
          return (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border-2 bg-white p-5",
                plan.popular ? "border-brand-orange" : "border-border"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-orange px-3 py-1 text-[10px] font-bold text-white">
                  MOST POPULAR
                </span>
              )}
              <h3 className="text-sm font-bold text-foreground">{plan.name}</h3>
              <p className="mt-2">
                <span className="text-2xl font-extrabold text-brand-navy">{plan.price}</span>
                <span className="text-xs text-muted-foreground"> {plan.period}</span>
              </p>
              <ul className="mt-4 flex flex-1 flex-col gap-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-foreground/80">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" /> {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled={isCurrent}
                onClick={() => {
                  setCurrent(plan.id);
                  toast(
                    plan.id === "free"
                      ? "Switched to Free plan"
                      : `Plan selected. Payment (Razorpay/Cashfree) wires in Phase 12 — env vars are already scaffolded in .env.example.`,
                    "info"
                  );
                }}
                className={cn(
                  "mt-5 rounded-xl py-2.5 text-sm font-semibold",
                  isCurrent ? "bg-muted text-muted-foreground" : "bg-brand-navy text-white hover:bg-brand-navy-dark"
                )}
              >
                {isCurrent ? "Current Plan" : "Choose Plan"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
