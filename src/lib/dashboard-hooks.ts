"use client";

import { useSyncExternalStore } from "react";
import { ownerPropertiesService } from "@/lib/services/owner.service";
import { leadsService } from "@/lib/services/leads.service";
import { visitsService } from "@/lib/services/visits.service";
import { dealsService } from "@/lib/services/deals.service";

// Same useSyncExternalStore pattern as lib/auth.ts — each mock service is its own external
// store, so no Context/Provider is needed and every subscriber re-renders on mutation.
export function useOwnerProperties() {
  return useSyncExternalStore(
    (cb) => ownerPropertiesService.subscribe(cb),
    () => ownerPropertiesService.getAll(),
    () => ownerPropertiesService.getAll()
  );
}

export function useLeads() {
  return useSyncExternalStore(
    (cb) => leadsService.subscribe(cb),
    () => leadsService.getAll(),
    () => leadsService.getAll()
  );
}

export function useVisits() {
  return useSyncExternalStore(
    (cb) => visitsService.subscribe(cb),
    () => visitsService.getAll(),
    () => visitsService.getAll()
  );
}

export function useDeals() {
  return useSyncExternalStore(
    (cb) => dealsService.subscribe(cb),
    () => dealsService.getAll(),
    () => dealsService.getAll()
  );
}
