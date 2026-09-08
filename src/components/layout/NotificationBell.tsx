"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  XCircle,
  Users,
  MessageSquare,
  CalendarClock,
  CalendarCheck,
  CalendarX,
  TrendingDown,
  Sparkles,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useNotifications } from "@/lib/notifications";
import { notificationsService } from "@/lib/services/notifications.service";
import { timeAgo, cn } from "@/lib/utils";
import type { NotificationType } from "@/types/notification";

const ICONS: Record<NotificationType, LucideIcon> = {
  PROPERTY_APPROVED: CheckCircle2,
  PROPERTY_REJECTED: XCircle,
  NEW_LEAD: Users,
  NEW_MESSAGE: MessageSquare,
  VISIT_REQUEST: CalendarClock,
  VISIT_ACCEPTED: CalendarCheck,
  VISIT_REJECTED: CalendarX,
  PRICE_DROP: TrendingDown,
  NEW_MATCH: Sparkles,
  SUBSCRIPTION_EXPIRING: CreditCard,
};

const ACCENTS: Record<NotificationType, string> = {
  PROPERTY_APPROVED: "text-emerald-600 bg-emerald-50",
  PROPERTY_REJECTED: "text-red-600 bg-red-50",
  NEW_LEAD: "text-brand-navy bg-brand-navy-light",
  NEW_MESSAGE: "text-brand-navy bg-brand-navy-light",
  VISIT_REQUEST: "text-amber-600 bg-amber-50",
  VISIT_ACCEPTED: "text-emerald-600 bg-emerald-50",
  VISIT_REJECTED: "text-red-600 bg-red-50",
  PRICE_DROP: "text-brand-orange bg-brand-orange-light",
  NEW_MATCH: "text-brand-orange bg-brand-orange-light",
  SUBSCRIPTION_EXPIRING: "text-amber-600 bg-amber-50",
};

export function NotificationBell({ className }: { className?: string }) {
  const { user } = useAuth();
  const notifications = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  if (!user) return null;

  return (
    <div className={cn("relative", className)} ref={ref}>
      <button
        type="button"
        aria-label="Notifications"
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-full p-2 text-foreground/80 hover:bg-muted"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-orange px-1 text-[10px] font-bold text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[88vw] overflow-hidden rounded-xl border border-border bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-bold text-foreground">Notifications</p>
            {unread > 0 && (
              <button
                type="button"
                onClick={() => notificationsService.markAllRead()}
                className="text-xs font-semibold text-brand-navy hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">No notifications yet.</p>
            ) : (
              notifications.slice(0, 8).map((n) => {
                const Icon = ICONS[n.type];
                return (
                  <Link
                    key={n.id}
                    href={n.href ?? "/notifications"}
                    onClick={() => {
                      notificationsService.markRead(n.id);
                      setOpen(false);
                    }}
                    className={cn("flex items-start gap-3 border-b border-border px-4 py-3 last:border-0 hover:bg-muted", !n.read && "bg-brand-navy-light/30")}
                  >
                    <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", ACCENTS[n.type])}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-foreground">{n.title}</span>
                      <span className="mt-0.5 block line-clamp-2 text-xs text-muted-foreground">{n.body}</span>
                      <span className="mt-1 block text-[10px] text-muted-foreground">{timeAgo(n.createdAt)}</span>
                    </span>
                    {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />}
                  </Link>
                );
              })
            )}
          </div>

          <Link
            href="/notifications"
            onClick={() => setOpen(false)}
            className="block border-t border-border px-4 py-2.5 text-center text-xs font-semibold text-brand-navy hover:bg-muted"
          >
            View all
          </Link>
        </div>
      )}
    </div>
  );
}
