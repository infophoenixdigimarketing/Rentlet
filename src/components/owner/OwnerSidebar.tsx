"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/owner/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/owner/properties", label: "My Properties", icon: Building2 },
  { href: "/owner/leads", label: "Leads", icon: Users },
  { href: "/owner/analytics", label: "Analytics", icon: BarChart3 },
];

export function OwnerSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto lg:w-56 lg:shrink-0 lg:flex-col lg:overflow-visible" aria-label="Owner dashboard">
      {LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors",
              active ? "bg-brand-navy text-white" : "text-foreground/75 hover:bg-muted"
            )}
          >
            <link.icon className="h-4 w-4" /> {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
