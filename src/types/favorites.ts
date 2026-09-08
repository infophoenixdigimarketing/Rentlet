// Mirrors docs/01-database-schema.md `favorites` collection (spec §18 — folders supported).
export interface FavoriteEntry {
  propertyId: string;
  folder: string;
  savedAt: string; // ISO
}

export const DEFAULT_FOLDERS = ["Saved", "My Homes", "Investment", "Shortlist"];
