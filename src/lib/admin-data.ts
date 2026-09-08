"use client";

import { useSyncExternalStore } from "react";
import { adminPropertiesService } from "@/lib/services/admin.service";
import { adminUsersService } from "@/lib/services/admin-users.service";
import { adminReportsService } from "@/lib/services/admin-reports.service";
import { adminSettingsService } from "@/lib/services/admin-settings.service";

export function useAdminProperties() {
  return useSyncExternalStore(
    (cb) => adminPropertiesService.subscribe(cb),
    () => adminPropertiesService.getAll(),
    () => adminPropertiesService.getAll()
  );
}

export function useAdminUsers() {
  return useSyncExternalStore(
    (cb) => adminUsersService.subscribe(cb),
    () => adminUsersService.getAll(),
    () => adminUsersService.getAll()
  );
}

export function useAdminReports() {
  return useSyncExternalStore(
    (cb) => adminReportsService.subscribe(cb),
    () => adminReportsService.getAll(),
    () => adminReportsService.getAll()
  );
}

export function useAdminSettings() {
  return useSyncExternalStore(
    (cb) => adminSettingsService.subscribe(cb),
    () => adminSettingsService.get(),
    () => adminSettingsService.get()
  );
}
