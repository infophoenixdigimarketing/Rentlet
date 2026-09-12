// Shared by every Firebase-backed properties reader (properties.service.ts, owner.service.ts,
// search.service.ts, admin.service.ts). Kept in its own module, not re-exported from
// properties.service.ts, because properties.service.ts itself imports admin.service.ts (to call
// adminPropertiesService.refresh() from the mock repository) — importing back from
// properties.service.ts here would make that a circular import, and a Firebase*Service
// constructor that runs at module-load time (see admin.service.ts) would then read
// PROPERTIES_COLLECTION before it's initialized.
import { toIso } from "@/lib/firebase/firestore-helpers";
import type { Property } from "@/types/property";

export const PROPERTIES_COLLECTION = "properties";

export function mapPropertyDoc(id: string, data: Record<string, unknown>): Property {
  return {
    ...(data as Omit<Property, "id" | "createdAt">),
    id,
    createdAt: toIso(data.createdAt) ?? new Date().toISOString(),
  } as Property;
}
