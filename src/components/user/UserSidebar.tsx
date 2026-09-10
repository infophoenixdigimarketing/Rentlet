"use client";

import { UserRound, Heart, Bookmark, CalendarClock, Bell } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { SidebarNav } from "@/components/layout/SidebarNav";

const LINKS = [
  { href: "/profile", label: "My Profile", icon: UserRound },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/saved-searches", label: "Saved Searches", icon: Bookmark },
  { href: "/visits", label: "Scheduled Visits", icon: CalendarClock },
  { href: "/notifications", label: "Notifications", icon: Bell },
];

export function UserSidebar() {
  const { user } = useAuth();
  if (!user) return null;

  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="lg:w-56 lg:shrink-0">
      <div className="mb-2 hidden items-center gap-3 rounded-xl bg-white px-3.5 py-3 lg:flex">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy-light text-sm font-bold text-brand-navy">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
          <p className="text-xs capitalize text-muted-foreground">{user.role}</p>
        </div>
      </div>

      <SidebarNav links={LINKS} ariaLabel="My account" />
    </div>
  );
}
