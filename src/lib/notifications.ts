"use client";

import { useSyncExternalStore } from "react";
import { notificationsService } from "@/lib/services/notifications.service";

export function useNotifications() {
  return useSyncExternalStore(
    (cb) => notificationsService.subscribe(cb),
    () => notificationsService.getAll(),
    () => notificationsService.getAll()
  );
}
