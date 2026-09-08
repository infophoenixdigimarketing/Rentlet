"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs } from "@/lib/data/content";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section id="faq" className="scroll-mt-20 bg-muted py-14 lg:py-20">
      <div className="container-rentlet max-w-3xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-extrabold text-foreground lg:text-3xl">Frequently Asked Questions</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Everything you need to know before you get started.</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          {faqs.map((item) => {
            const open = openId === item.id;
            return (
              <div key={item.id} className="overflow-hidden rounded-xl border border-border bg-white">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-foreground">{item.q}</span>
                  <Plus className={cn("h-4 w-4 shrink-0 text-brand-orange transition-transform duration-300", open && "rotate-45")} />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
