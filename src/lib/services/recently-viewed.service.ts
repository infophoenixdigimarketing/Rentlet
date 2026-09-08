// Recently viewed properties (spec §17) — localStorage per signed-in user, capped at 12,
// most-recent first. Phase 12 could move this server-side (property_views collection already
// exists in the schema) but per-device localStorage is arguably the right home even then.
import { authService } from "@/lib/services/auth.service";

function isBrowser() {
  return typeof window !== "undefined";
}
function storageKey(userId: string) {
  return `rentlet_recently_viewed_${userId}`;
}
const MAX = 12;

export const recentlyViewedService = {
  record(propertyId: string) {
    const user = authService.getCurrentUser();
    if (!user || !isBrowser()) return;
    let ids: string[] = [];
    try {
      ids = JSON.parse(window.localStorage.getItem(storageKey(user.id)) ?? "[]");
    } catch {
      ids = [];
    }
    ids = [propertyId, ...ids.filter((id) => id !== propertyId)].slice(0, MAX);
    window.localStorage.setItem(storageKey(user.id), JSON.stringify(ids));
  },
  getIds(userId: string): string[] {
    if (!isBrowser()) return [];
    try {
      return JSON.parse(window.localStorage.getItem(storageKey(userId)) ?? "[]");
    } catch {
      return [];
    }
  },
};
