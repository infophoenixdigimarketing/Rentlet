"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/admin-auth";

export function AdminGate({ children }: { children: React.ReactNode }) {
  const { admin } = useAdminAuth();
  const router = useRouter();
  // useAdminAuth() is SSR-safe by always reporting `null` on the very first client render (to
  // match the server-rendered HTML) even when a real session exists in localStorage — React
  // corrects it to the true value right after. Redirecting on that transient `null` would bounce
  // a genuinely logged-in admin back to /login on every hard navigation. This mirrors the
  // mounted-check in components/ui/Toaster.tsx: only act once we know we're past that correction.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (mounted && !admin) router.replace("/admin/login");
  }, [mounted, admin, router]);

  if (!mounted || !admin) return null;
  return <>{children}</>;
}
