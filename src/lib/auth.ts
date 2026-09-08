"use client";

import { useSyncExternalStore } from "react";
import { authService } from "@/lib/services/auth.service";

// No Context/Provider needed — authService is itself the external store (a module singleton),
// so any component can subscribe directly. useSyncExternalStore also gives us SSR-safe
// hydration for free: server snapshot is always null, client snapshot is the real session.
export function useAuth() {
  const user = useSyncExternalStore(
    (onChange) => authService.subscribe(() => onChange()),
    () => authService.getCurrentUser(),
    () => null
  );
  return { user, isAuthenticated: user != null };
}
