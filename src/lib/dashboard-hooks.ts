"use client";

import { useSyncExternalStore } from "react";
import { ownerPropertiesService } from "@/lib/services/owner.service";
import { leadsService } from "@/lib/services/leads.service";
import { visitsService } from "@/lib/services/visits.service";
import { dealsService } from "@/lib/services/deals.service";
import { adminVisitsService } from "@/lib/services/admin-visits.service";
import { adminLeadsService } from "@/lib/services/admin-leads.service";

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

// Site-wide (all owners), for the admin/staff consoles only — see admin-visits.service.ts and
// admin-leads.service.ts for why these can't just reuse useVisits()/useLeads() above.
export function useAdminVisits() {
  return useSyncExternalStore(
    (cb) => adminVisitsService.subscribe(cb),
    () => adminVisitsService.getAll(),
    () => adminVisitsService.getAll()
  );
}

export function useAdminLeads() {
  return useSyncExternalStore(
    (cb) => adminLeadsService.subscribe(cb),
    () => adminLeadsService.getAll(),
    () => adminLeadsService.getAll()
  );
}

export function useDeals() {
  return useSyncExternalStore(
    (cb) => dealsService.subscribe(cb),
    () => dealsService.getAll(),
    () => dealsService.getAll()
  );
}
