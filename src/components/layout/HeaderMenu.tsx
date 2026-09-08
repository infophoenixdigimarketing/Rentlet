"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGES, readActiveLang, switchLanguage, type LangCode } from "@/lib/translate";

export type MenuLink = { label: string; href: string };

// NoBroker-style "Menu" dropdown. Every href points at a route that actually exists
// (see the note in Header.tsx about earlier nav links that silently 404'd).
export const MENU_SECTIONS: { heading: string; links: MenuLink[] }[] = [
  {
    heading: "Explore",
    links: [
      { label: "Rent a Home", href: "/properties?listingType=rent" },
      { label: "Buy a Property", href: "/properties?listingType=sale" },
      { label: "Land & Plots", href: "/properties?type=plot,land" },
      { label: "Commercial Spaces", href: "/properties?type=office,shop,showroom,warehouse" },
      { label: "PG / Co-living", href: "/properties?type=pg,flatmate" },
    ],
  },
  {
    heading: "For Owners",
    links: [
      { label: "Post Your Property", href: "/post-property" },
      { label: "Rental Agreement", href: "/rental-agreement" },
      { label: "Owner Dashboard", href: "/owner/dashboard" },
      { label: "Leads", href: "/owner/leads" },
      { label: "Analytics", href: "/owner/analytics" },
    ],
  },
  {
    heading: "Your Account",
    links: [
      { label: "Saved Properties", href: "/favorites" },
      { label: "Saved Searches", href: "/saved-searches" },
      { label: "Site Visits", href: "/visits" },
      { label: "Notifications", href: "/notifications" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Help Center", href: "/help" },
      { label: "Careers", href: "/careers" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
  {
    heading: "Staff & Admin",
    links: [
      { label: "Admin Console", href: "/admin/login" },
      { label: "Staff Console", href: "/staff/login" },
    ],
  },
];

export function HeaderMenu() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<LangCode>("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration from a cookie
    setLang(readActiveLang());
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

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted hover:text-brand-navy"
      >
        <Menu className="h-4 w-4" />
        Menu
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 origin-top-right overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-black/10">
          <div className="max-h-[70vh] overflow-y-auto p-1.5">
            {/* Language — same switch as the header globe, mirrored here */}
            <div className="notranslate border-b border-border px-1.5 py-1.5" translate="no">
              <p className="px-1 pb-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                Language
              </p>
              <div className="flex flex-col">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setLang(l.code);
                      switchLanguage(l.code);
                    }}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-sm font-medium hover:bg-muted",
                      l.code === lang ? "text-brand-navy" : "text-foreground/85"
                    )}
                  >
                    <span className="min-w-0 truncate text-left">
                      {l.label}
                      {l.en !== l.label && <span className="text-muted-foreground"> ({l.en})</span>}
                    </span>
                    {l.code === lang && <Check className="h-4 w-4 shrink-0 text-brand-orange" />}
                  </button>
                ))}
              </div>
            </div>

            {MENU_SECTIONS.map((section) => (
              <div key={section.heading} className="px-1.5 py-1.5">
                <p className="px-1 pb-1 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  {section.heading}
                </p>
                <div className="flex flex-col">
                  {section.links.map((l) => (
                    <Link
                      key={l.label + l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-2.5 py-2 text-sm font-medium text-foreground/85 hover:bg-muted hover:text-brand-navy"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
