"use client";

import { useSyncExternalStore } from "react";
import { staffAuthService } from "@/lib/services/staff-auth.service";

export function useStaffAuth() {
  const staff = useSyncExternalStore(
    (onChange) => staffAuthService.subscribe(() => onChange()),
    () => staffAuthService.getCurrentStaff(),
    () => null
  );
  return { staff, isStaff: staff != null };
}
