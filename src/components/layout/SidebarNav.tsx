"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type SidebarLink = { href: string; label: string; icon: LucideIcon };

/**
 * Dashboard side nav. On mobile it's a tap-to-open dropdown that shows the current page and
 * reveals every link below it; on lg+ it's the usual vertical list. `variant="dark"` is for
 * the navy console chrome (staff/admin).
 */
export function SidebarNav({
  links,
  ariaLabel,
  variant = "light",
  className,
}: {
  links: SidebarLink[];
  ariaLabel: string;
  variant?: "light" | "dark";
  className?: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = links.find((l) => l.href === pathname) ?? links[0];
  const dark = variant === "dark";

  const activeCls = dark ? "bg-brand-orange text-white" : "bg-brand-navy text-white";
  const idleCls = dark ? "text-white/75 hover:bg-white/10" : "text-foreground/75 hover:bg-muted";

  function renderLinks(onNavigate?: () => void) {
    return links.map((link) => {
      const active = pathname === link.href;
      return (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
            active ? activeCls : idleCls
          )}
        >
          <link.icon className="h-4 w-4 shrink-0" /> {link.label}
        </Link>
      );
    });
  }

  return (
    <nav className={className} aria-label={ariaLabel}>
      {/* Mobile: dropdown */}
      <div className="relative lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-semibold",
            dark ? "border-white/15 bg-white/5 text-white" : "border-border bg-white text-foreground"
          )}
        >
          <current.icon className={cn("h-4 w-4 shrink-0", dark ? "text-brand-orange" : "text-brand-navy")} />
          {current.label}
          <ChevronDown
            className={cn(
              "ml-auto h-4 w-4 transition-transform",
              dark ? "text-white/60" : "text-muted-foreground",
              open && "rotate-180"
            )}
          />
        </button>
        {open && (
          <>
            <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="fixed inset-0 z-30" />
            <div
              className={cn(
                "absolute inset-x-0 top-full z-40 mt-1 flex flex-col gap-0.5 rounded-xl border p-1.5 shadow-lg",
                dark ? "border-white/15 bg-brand-navy-dark" : "border-border bg-white"
              )}
            >
              {renderLinks(() => setOpen(false))}
            </div>
          </>
        )}
      </div>

      {/* Desktop: vertical list */}
      <div className="hidden flex-col gap-1 lg:flex">{renderLinks()}</div>
    </nav>
  );
}
