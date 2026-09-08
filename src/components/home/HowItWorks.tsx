"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { howItWorksTenant, howItWorksOwner } from "@/lib/data/content";

export function HowItWorks() {
  const [audience, setAudience] = useState<"tenant" | "owner">("tenant");
  const steps = audience === "tenant" ? howItWorksTenant : howItWorksOwner;

  return (
    <section id="how-it-works" className="scroll-mt-20 bg-brand-navy-dark py-14 lg:py-20">
      <div className="container-rentlet">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="text-2xl font-extrabold text-white lg:text-3xl">How Rentlet Works</h2>
            <p className="mt-1.5 text-sm text-white/60">Search → Shortlist → Contact → Schedule Visit → Move.</p>
          </div>
          <div className="inline-flex rounded-full bg-white/10 p-1">
            {(["tenant", "owner"] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAudience(a)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-colors",
                  audience === a ? "bg-brand-orange text-white" : "text-white/70 hover:text-white"
                )}
              >
                {a === "tenant" ? "For Tenants & Buyers" : "For Owners"}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.step} className="relative rounded-2xl bg-white/5 p-6">
              <span className="text-4xl font-extrabold text-white/15">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-base font-bold text-white">{s.title}</h3>
              <p className="mt-1.5 text-sm text-white/60">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
