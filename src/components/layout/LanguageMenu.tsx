"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGES, readActiveLang, switchLanguage, type LangCode } from "@/lib/translate";

export function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<LangCode>("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration from a cookie
    setActive(readActiveLang());
  }, []);

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(code: LangCode) {
    setOpen(false);
    setActive(code);
    switchLanguage(code);
  }

  return (
    <div ref={ref} className="notranslate relative" translate="no">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Change language"
        title="Language"
        className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted hover:text-brand-navy"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden lg:inline">Language</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-56 origin-top-right overflow-hidden rounded-2xl border border-border bg-white p-1.5 shadow-2xl shadow-black/10">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => choose(l.code)}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-sm font-medium hover:bg-muted",
                l.code === active ? "text-brand-navy" : "text-foreground/85"
              )}
            >
              <span className="min-w-0 truncate text-left">
                {l.label}
                {l.en !== l.label && <span className="text-muted-foreground"> ({l.en})</span>}
              </span>
              {l.code === active && <Check className="h-4 w-4 shrink-0 text-brand-orange" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
