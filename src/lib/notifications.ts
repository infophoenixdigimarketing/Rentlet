"use client";

import { useSyncExternalStore } from "react";
import { notificationsService } from "@/lib/services/notifications.service";
import type { AppNotification, NotificationType } from "@/types/notification";
import type { UserRole } from "@/types/user";

export function useNotifications() {
  return useSyncExternalStore(
    (cb) => notificationsService.subscribe(cb),
    () => notificationsService.getAll(),
    () => notificationsService.getAll()
  );
}

// Notification types that only make sense for someone who LISTS property (owner/agent/builder)
// or staff — a property seeker should never see "new lead on your listing", "your listing was
// approved", "someone wants to visit your property", etc.
const LISTER_ONLY: ReadonlySet<NotificationType> = new Set<NotificationType>([
  "PROPERTY_APPROVED",
  "PROPERTY_REJECTED",
  "NEW_LEAD",
  "VISIT_REQUEST",
  "SUBSCRIPTION_EXPIRING",
]);

const SEEKER_ROLES: ReadonlySet<UserRole> = new Set<UserRole>(["tenant", "buyer"]);

/** Filter a notification list down to what the given role should actually see. */
export function notificationsForRole<T extends Pick<AppNotification, "type">>(
  list: T[],
  role: UserRole | undefined
): T[] {
  if (role && SEEKER_ROLES.has(role)) return list.filter((n) => !LISTER_ONLY.has(n.type));
  return list;
}
