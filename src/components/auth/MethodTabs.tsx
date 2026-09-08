"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MethodTabs({ tabs }: { tabs: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div>
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={cn(
              "rounded-lg py-2 text-sm font-semibold transition-colors",
              active === t.id ? "bg-white text-brand-navy shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-5">{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}
