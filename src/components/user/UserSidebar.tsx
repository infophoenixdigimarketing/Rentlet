"use client";

import { useRouter } from "next/navigation";
import { UserRound, Heart, Bookmark, CalendarClock, Bell, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { authService } from "@/lib/services/auth.service";
import { Avatar } from "@/components/ui/Avatar";
import { toast } from "@/lib/toast";
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
  const router = useRouter();
  if (!user) return null;

  async function logout() {
    await authService.logout();
    toast("Logged out");
    router.push("/");
  }

  return (
    <div className="lg:w-56 lg:shrink-0">
      <div className="mb-2 hidden items-center gap-3 rounded-xl bg-white px-3.5 py-3 lg:flex">
        <Avatar userId={user.id} name={user.name} className="h-10 w-10 text-sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
          <p className="text-xs capitalize text-muted-foreground">{user.role}</p>
        </div>
      </div>

      <SidebarNav links={LINKS} ariaLabel="My account" />

      <button
        type="button"
        onClick={logout}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 lg:justify-start"
      >
        <LogOut className="h-4 w-4" /> Logout
      </button>
    </div>
  );
}
