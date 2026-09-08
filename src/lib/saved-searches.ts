"use client";

import { useSyncExternalStore } from "react";
import { savedSearchesService } from "@/lib/services/saved-searches.service";
import { EMPTY_ARRAY } from "@/lib/utils";

export function useSavedSearches() {
  return useSyncExternalStore(
    (cb) => savedSearchesService.subscribe(cb),
    () => savedSearchesService.getAll(),
    () => EMPTY_ARRAY
  );
}
