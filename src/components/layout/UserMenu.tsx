"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, Heart, Bookmark, CalendarClock, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { authService } from "@/lib/services/auth.service";
import { Avatar } from "@/components/ui/Avatar";
import { toast } from "@/lib/toast";

export function UserMenu() {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (!user) return null;

  const links = [
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/saved-searches", label: "Saved Searches", icon: Bookmark },
    { href: "/visits", label: "Scheduled Visits", icon: CalendarClock },
    ...(user.role !== "tenant" && user.role !== "buyer"
      ? [{ href: "/owner/dashboard", label: "Owner Dashboard", icon: LayoutDashboard }]
      : []),
  ];

  async function logout() {
    await authService.logout();
    setOpen(false);
    toast("Logged out");
    router.push("/");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 hover:bg-muted"
      >
        <Avatar userId={user.id} name={user.name} className="h-8 w-8 text-xs" />
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-border bg-white py-1.5 shadow-xl">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 border-b border-border px-3.5 py-2.5 hover:bg-muted"
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-foreground">{user.name}</span>
              <span className="block text-xs capitalize text-muted-foreground">{user.role} · View profile</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-foreground hover:bg-muted"
            >
              <l.icon className="h-4 w-4 text-muted-foreground" /> {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2.5 border-t border-border px-3.5 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
