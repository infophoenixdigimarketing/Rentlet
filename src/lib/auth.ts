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
  // Firebase needs a tick after page load to confirm the session — until isAuthReady() is
  // true, `user` being null doesn't mean "logged out", it means "don't know yet". Gated pages
  // should show a neutral loading state on `loading`, not their logged-out UI, or a refresh
  // flashes the wrong screen before flipping to the real one.
  const loading = useSyncExternalStore(
    (onChange) => authService.subscribe(() => onChange()),
    () => !authService.isAuthReady(),
    () => true
  );
  return { user, isAuthenticated: user != null, loading };
}
