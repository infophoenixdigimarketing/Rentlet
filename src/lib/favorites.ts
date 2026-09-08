"use client";

import { useCallback, useSyncExternalStore } from "react";
import { favoritesService } from "@/lib/services/favorites.service";
import { EMPTY_ARRAY } from "@/lib/utils";

export function useFavorites() {
  return useSyncExternalStore(
    (cb) => favoritesService.subscribe(cb),
    () => favoritesService.getAll(),
    () => EMPTY_ARRAY
  );
}

export function useIsFavorited(propertyId: string) {
  const subscribe = useCallback((cb: () => void) => favoritesService.subscribe(cb), []);
  const getSnapshot = useCallback(() => favoritesService.isSaved(propertyId), [propertyId]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
