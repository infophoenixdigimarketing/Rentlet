import type { SearchFilters } from "@/lib/services/search.service";

// Mirrors docs/01-database-schema.md `saved_searches` collection (spec §19).
export interface SavedSearch {
  id: string;
  label: string;
  filters: SearchFilters;
  notify: boolean;
  createdAt: string;
}
