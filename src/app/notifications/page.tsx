"use client";

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
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuth } from "@/lib/auth";
import { useNotifications, notificationsForRole } from "@/lib/notifications";
import { notificationsService } from "@/lib/services/notifications.service";
import { timeAgo, cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
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

export default function NotificationsPage() {
  const { user } = useAuth();
  const allNotifications = useNotifications();
  const notifications = notificationsForRole(allNotifications, user?.role);

  if (!user) {
    return (
      <div className="container-rentlet py-16">
        <EmptyState
          icon={Bell}
          title="Login required"
          description="Sign in to see your notifications."
          action={
            <Link href="/login" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
              Login
            </Link>
          }
        />
      </div>
    );
  }

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="container-rentlet max-w-2xl py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground">{unread} unread</p>
        </div>
        {unread > 0 && (
          <button
            type="button"
            onClick={() => notificationsService.markAllRead()}
            className="text-sm font-semibold text-brand-navy hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState className="mt-6" icon={Bell} title="No notifications yet" description="We'll let you know when something happens." />
      ) : (
        <div className="mt-5 flex flex-col gap-2">
          {notifications.map((n) => {
            const Icon = ICONS[n.type];
            const content = (
              <>
                <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", ACCENTS[n.type])}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-foreground">{n.title}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">{n.body}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">{timeAgo(n.createdAt)}</span>
                </span>
                {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />}
              </>
            );
            const rowClass = cn(
              "flex items-start gap-3 rounded-xl border border-border bg-white p-4 transition-colors hover:bg-muted",
              !n.read && "bg-brand-navy-light/30"
            );
            return n.href ? (
              <Link key={n.id} href={n.href} onClick={() => notificationsService.markRead(n.id)} className={rowClass}>
                {content}
              </Link>
            ) : (
              <button key={n.id} type="button" onClick={() => notificationsService.markRead(n.id)} className={cn(rowClass, "text-left")}>
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
