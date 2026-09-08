"use client";

import { useSyncExternalStore } from "react";
import { adminAuthService } from "@/lib/services/admin-auth.service";

export function useAdminAuth() {
  const admin = useSyncExternalStore(
    (onChange) => adminAuthService.subscribe(() => onChange()),
    () => adminAuthService.getCurrentAdmin(),
    () => null
  );
  return { admin, isAdmin: admin != null };
}
