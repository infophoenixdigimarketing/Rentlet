"use client";

import { useCallback, useSyncExternalStore } from "react";
import { visitsService } from "@/lib/services/visits.service";
import { EMPTY_ARRAY } from "@/lib/utils";

export function useMyVisits(userId: string | undefined) {
  const subscribe = useCallback((cb: () => void) => visitsService.subscribe(cb), []);
  const getSnapshot = useCallback(() => (userId ? visitsService.getMine(userId) : EMPTY_ARRAY), [userId]);
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_ARRAY);
}
