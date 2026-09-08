"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useStaffAuth } from "@/lib/staff-auth";

export function StaffGate({ children }: { children: React.ReactNode }) {
  const { staff } = useStaffAuth();
  const router = useRouter();
  // Same transient-null guard as AdminGate: the store reports null on the first client
  // render to match SSR, so only redirect once we're past that correction.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (mounted && !staff) router.replace("/staff/login");
  }, [mounted, staff, router]);

  if (!mounted || !staff) return null;
  return <>{children}</>;
}
