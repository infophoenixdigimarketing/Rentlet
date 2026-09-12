"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, UserCircle2, ChevronDown, Check, Globe, KeyRound, IndianRupee, Tag, FileSignature, PlusCircle, ScrollText, LogOut, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { buttonVariants } from "@/components/ui/Button";
import { UserMenu } from "@/components/layout/UserMenu";
import { NotificationBell } from "@/components/layout/NotificationBell";
import { HeaderMenu, MENU_SECTIONS } from "@/components/layout/HeaderMenu";
import { LanguageMenu } from "@/components/layout/LanguageMenu";
import { LANGUAGES, readActiveLang, switchLanguage, type LangCode } from "@/lib/translate";
import { authService } from "@/lib/services/auth.service";
import { useAuth } from "@/lib/auth";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

// Top nav: Rent / Buy / Sell, each opening a property-type submenu. Every href goes to the real,
// working /properties search (filtered) or /post-property — no 404 routes.
type NavItem = { label: string; href: string };
const NAV_MENUS: { label: string; href: string; icon: LucideIcon; items: NavItem[] }[] = [
  {
    label: "Rent",
    href: "/properties?listingType=rent",
    icon: KeyRound,
    items: [
      { label: "Houses", href: "/properties?listingType=rent&type=independent_house" },
      { label: "Apartments", href: "/properties?listingType=rent&type=apartment" },
      { label: "Villas", href: "/properties?listingType=rent&type=villa" },
      { label: "PG / Co-living", href: "/properties?type=pg,flatmate" },
      { label: "Flatmates", href: "/properties?type=flatmate" },
      { label: "Commercial", href: "/properties?listingType=rent&type=office,shop,showroom,warehouse" },
    ],
  },
  {
    label: "Buy",
    href: "/properties?listingType=sale",
    icon: IndianRupee,
    items: [
      { label: "Houses", href: "/properties?listingType=sale&type=independent_house" },
      { label: "Apartments", href: "/properties?listingType=sale&type=apartment" },
      { label: "Villas", href: "/properties?listingType=sale&type=villa" },
      { label: "Commercial", href: "/properties?listingType=sale&type=office,shop,showroom,warehouse" },
    ],
  },
  {
    label: "Sell",
    href: "/post-property",
    icon: Tag,
    items: [
      { label: "Post a House", href: "/post-property" },
      { label: "Post an Apartment", href: "/post-property" },
      { label: "Post a Villa", href: "/post-property" },
      { label: "Post Commercial", href: "/post-property" },
    ],
  },
  {
    label: "Lease",
    href: "/properties?listingType=rent&type=office,shop,showroom,warehouse",
    icon: FileSignature,
    items: [
      { label: "Office Space", href: "/properties?listingType=rent&type=office" },
      { label: "Shops & Retail", href: "/properties?listingType=rent&type=shop,showroom" },
      { label: "Warehouse & Godown", href: "/properties?listingType=rent&type=warehouse" },
      { label: "Rental Agreement", href: "/rental-agreement" },
      { label: "List for Lease", href: "/post-property" },
    ],
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  // Mobile menu: which top-level category (Rent/Buy/Sell/Lease) is expanded. One at a time.
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [lang, setLang] = useState<LangCode>("en");
  const { user } = useAuth();
  const router = useRouter();

  function closeMenu() {
    setOpen(false);
    setExpandedMenu(null);
  }

  // UserMenu (with its own Logout) only renders in the desktop actions bar — the mobile panel
  // needs its own way out.
  async function logout() {
    closeMenu();
    await authService.logout();
    toast("Logged out");
    router.push("/");
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot hydration from a cookie
    setLang(readActiveLang());
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur">
      <div className="header-row container-rentlet flex h-14 items-center justify-between gap-4 lg:gap-6">
        <Link href="/" aria-label="Rentlet home" className="flex shrink-0 items-center gap-2">
          <Logo className="h-9 w-auto lg:h-10" />
          {/* Brand name stays "RENTLET" in every language (and keeps the header compact). */}
          <span className="notranslate text-xl font-extrabold tracking-tight lg:text-2xl" translate="no">
            <span style={{ color: "var(--color-orange)" }}>RENT</span>
            <span style={{ color: "var(--color-navy)" }}>LET</span>
          </span>
        </Link>

        <nav className="header-primary-nav hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_MENUS.map((menu) => (
            <div key={menu.label} className="group relative">
              <Link
                href={menu.href}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted hover:text-brand-navy group-hover:bg-muted group-hover:text-brand-navy xl:px-3"
              >
                <menu.icon className="h-4 w-4 text-brand-orange" strokeWidth={2} />
                {menu.label}
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="invisible    absolute left-0 top-full z-50 w-48 translate-y-1 rounded-xl border border-border bg-white p-1.5 opacity-0 shadow-xl shadow-black/10 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {menu.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block rounded-lg px-2.5 py-1 text-sm font-medium text-foreground/85 hover:bg-muted hover:text-brand-navy"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="header-actions hidden items-center gap-1.5 lg:flex">
          <Link href="/rental-agreement" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "header-secondary-cta hidden gap-1.5 xl:inline-flex")}>
            <ScrollText className="h-4 w-4" strokeWidth={2} />
            Rent Agreement
          </Link>
          <Link href="/post-property" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "header-cta hidden gap-1.5 xl:inline-flex")}>
            <PlusCircle className="h-4 w-4" strokeWidth={2} />
            Post Property
          </Link>
          {user ? (
            <>
              <NotificationBell />
              <UserMenu />
            </>
          ) : (
            <>
              <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
                Login
              </Link>
              <Link href="/register" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
                Sign Up
              </Link>
            </>
          )}
          <LanguageMenu />
          <HeaderMenu />
        </div>

        <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
          {user ? (
            <>
              <NotificationBell />
              <Link href="/profile" aria-label="Profile" className="rounded-full p-2 text-foreground/80 hover:bg-muted">
                <UserCircle2 className="h-5 w-5" />
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-full border border-border px-2.5 py-1.5 text-xs font-bold text-foreground/85 hover:bg-muted">
                Login
              </Link>
              <Link href="/register" className="rounded-full bg-brand-orange px-2.5 py-1.5 text-xs font-bold text-white hover:bg-brand-orange-dark">
                Sign Up
              </Link>
            </>
          )}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => (open ? closeMenu() : setOpen(true))}
            className="rounded-full p-2 text-foreground/80 hover:bg-muted"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-white transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[85vh] overflow-y-auto" : "max-h-0 border-t-0"
        )}
      >
        <nav className="container-rentlet flex flex-col gap-1 py-3" aria-label="Mobile">
          {NAV_MENUS.map((menu) => {
            const expanded = expandedMenu === menu.label;
            return (
              <div key={menu.label}>
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setExpandedMenu(expanded ? null : menu.label)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold text-foreground/85 hover:bg-muted"
                >
                  <menu.icon className="h-4 w-4 text-brand-orange" strokeWidth={2} />
                  {menu.label}
                  <ChevronDown className={cn("ml-auto h-4 w-4 text-muted-foreground transition-transform", expanded && "rotate-180")} />
                </button>
                {expanded && (
                  <div className="ml-3 flex flex-col border-l border-border pl-2">
                    <Link
                      href={menu.href}
                      onClick={closeMenu}
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-brand-navy hover:bg-muted"
                    >
                      All {menu.label}
                    </Link>
                    {menu.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeMenu}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-muted"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {MENU_SECTIONS.map((section) => {
            const expanded = expandedMenu === section.heading;
            return (
              <div key={section.heading} className="mt-1 border-t border-border pt-1">
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setExpandedMenu(expanded ? null : section.heading)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold text-foreground/85 hover:bg-muted"
                >
                  {section.heading}
                  <ChevronDown className={cn("ml-auto h-4 w-4 text-muted-foreground transition-transform", expanded && "rotate-180")} />
                </button>
                {expanded && (
                  <div className="ml-3 flex flex-col border-l border-border pl-2">
                    {section.links.map((l) => (
                      <Link
                        key={l.label + l.href}
                        href={l.href}
                        onClick={closeMenu}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/75 hover:bg-muted"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Language — no globe menu on mobile, so offer it in the panel (collapsed) */}
          <div className="notranslate mt-1 border-t border-border pt-1" translate="no">
            <button
              type="button"
              aria-expanded={expandedMenu === "__lang__"}
              onClick={() => setExpandedMenu(expandedMenu === "__lang__" ? null : "__lang__")}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold text-foreground/85 hover:bg-muted"
            >
              <Globe className="h-4 w-4 text-brand-orange" />
              Language
              <ChevronDown
                className={cn(
                  "ml-auto h-4 w-4 text-muted-foreground transition-transform",
                  expandedMenu === "__lang__" && "rotate-180"
                )}
              />
            </button>
            {expandedMenu === "__lang__" && (
              <div className="ml-3 flex flex-col border-l border-border pl-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      closeMenu();
                      setLang(l.code);
                      switchLanguage(l.code);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted",
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
            )}
          </div>

          <div className="mt-3 flex gap-2 px-1">
            <Link
              href="/post-property"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "outline", size: "md" }), "flex-1 gap-1.5")}
            >
              <PlusCircle className="h-4 w-4" strokeWidth={2} />
              Post Property
            </Link>
            <Link
              href={user ? "/profile" : "/login"}
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "navy", size: "md" }), "flex-1")}
            >
              {user ? user.name.split(" ")[0] : "Login"}
            </Link>
          </div>

          {!user && (
            <div className="mt-2 px-1">
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "primary", size: "md" }), "block w-full text-center")}
              >
                Sign Up
              </Link>
            </div>
          )}

          {user && (
            <button
              type="button"
              onClick={logout}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
