"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  // Which section is expanded — one at a time, matching the mobile menu accordion.
  const [expanded, setExpanded] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  function close() {
    setOpen(false);
    setExpanded(null);
  }

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
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
        onClick={() => (open ? close() : setOpen(true))}
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
          {/* Collapsible sections — same accordion behaviour as the mobile menu. Language
              switcher lives in its own header control on desktop, so it's not repeated here. */}
          <div className="max-h-[70vh] overflow-y-auto p-1.5">
            {MENU_SECTIONS.map((section) => {
              const isOpen = expanded === section.heading;
              return (
                <div key={section.heading}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : section.heading)}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2.5 text-sm font-bold text-foreground/85 hover:bg-muted"
                  >
                    {section.heading}
                    <ChevronDown
                      className={cn("ml-auto h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")}
                    />
                  </button>
                  {isOpen && (
                    <div className="mb-1 ml-2 flex flex-col border-l border-border pl-2">
                      {section.links.map((l) => (
                        <Link
                          key={l.label + l.href}
                          href={l.href}
                          onClick={close}
                          className="rounded-lg px-2.5 py-2 text-sm font-medium text-foreground/75 hover:bg-muted hover:text-brand-navy"
                        >
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
