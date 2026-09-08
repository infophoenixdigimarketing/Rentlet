"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound, Heart, Bookmark, CalendarClock, Bell } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/profile", label: "My Profile", icon: UserRound },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/saved-searches", label: "Saved Searches", icon: Bookmark },
  { href: "/visits", label: "Scheduled Visits", icon: CalendarClock },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export function UserSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  if (!user) return null;

  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <nav className="flex gap-1 overflow-x-auto lg:w-56 lg:shrink-0 lg:flex-col lg:overflow-visible" aria-label="My account">
      <div className="mb-2 hidden items-center gap-3 rounded-xl bg-white px-3.5 py-3 lg:flex">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-light text-sm font-bold text-brand-navy">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
          <p className="text-xs capitalize text-muted-foreground">{user.role}</p>
        </div>
      </div>

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
