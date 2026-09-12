// SearchProvider interface — see docs/00-architecture.md §3 and §36 (search architecture).
// Mock implementation filters/sorts the in-memory catalogue; a later phase swaps this for
// Algolia/Elasticsearch/OpenSearch behind the same interface, with zero change to
// FilterPanel/PropertiesView, which only ever call `searchProvider.search(filters)`.

import { collection, getDocs, query, where } from "firebase/firestore";
import type { Property, PropertyType, Furnishing } from "@/types/property";
import { allProperties } from "@/lib/data/seed-properties";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { getDb } from "@/lib/firebase/client";
import { PROPERTIES_COLLECTION, mapPropertyDoc } from "@/lib/firebase/properties-shared";

export type SortOption = "relevance" | "newest" | "price_asc" | "price_desc" | "nearest";

export interface SearchFilters {
  city?: string;
  listingType?: "rent" | "sale";
  propertyTypes?: PropertyType[];
  minPrice?: number;
  maxPrice?: number;
  minArea?: number;
  maxArea?: number;
  /** PG/flatmate only. "any" is a listing's own preference value, not a wildcard filter. */
  gender?: "male" | "female" | "any";
  bedrooms?: number[]; // 5 means "5+"
  furnishing?: Furnishing[];
  amenities?: string[];
  postedBy?: Property["postedBy"][];
  verifiedOnly?: boolean;
  noBrokerage?: boolean;
  petFriendly?: boolean;
  featuredOnly?: boolean;
  sort?: SortOption;
  /** "Nearest first" reference point — a locality name (e.g. "Electronic City"). */
  near?: string;
  /** "Nearest first" reference point from the browser's geolocation. Wins over `near`. */
  nearLat?: number;
  nearLng?: number;
}

export interface SearchResult {
  items: Property[];
  total: number;
}

export interface SearchProvider {
  search(filters: SearchFilters): Promise<SearchResult>;
}

function priceOf(p: Property): number {
  return p.listingType === "rent" ? p.rent ?? 0 : p.price ?? 0;
}

// --- "Nearest first" support -------------------------------------------------
// Centroid of every locality in the catalogue, averaged from its listings' coords.
// Lets "Show nearest to <locality>" resolve to a point without a separate geo dataset.
type LocalityPoint = { lat: number; lng: number; city: string; locality: string };

const localityIndex: Map<string, LocalityPoint> = (() => {
  const acc = new Map<string, { lat: number; lng: number; n: number; city: string; locality: string }>();
  for (const p of allProperties) {
    if (p.latitude == null || p.longitude == null || !p.locality) continue;
    const key = `${p.city.toLowerCase()}||${p.locality.toLowerCase()}`;
    const cur = acc.get(key) ?? { lat: 0, lng: 0, n: 0, city: p.city, locality: p.locality };
    cur.lat += p.latitude;
    cur.lng += p.longitude;
    cur.n += 1;
    acc.set(key, cur);
  }
  const out = new Map<string, LocalityPoint>();
  for (const [key, v] of acc) out.set(key, { lat: v.lat / v.n, lng: v.lng / v.n, city: v.city, locality: v.locality });
  return out;
})();

/** Localities available as a "nearest to" reference, optionally narrowed to one city. */
export function getLocalities(city?: string): string[] {
  const seen = new Set<string>();
  const res: string[] = [];
  for (const v of localityIndex.values()) {
    if (city && v.city.toLowerCase() !== city.toLowerCase()) continue;
    if (!seen.has(v.locality)) {
      seen.add(v.locality);
      res.push(v.locality);
    }
  }
  return res.sort((a, b) => a.localeCompare(b));
}

/** Resolve a locality name to its centroid; `city` disambiguates same-named localities. */
export function localityPoint(locality: string, city?: string): { lat: number; lng: number } | null {
  if (!locality) return null;
  if (city) {
    const hit = localityIndex.get(`${city.toLowerCase()}||${locality.toLowerCase()}`);
    if (hit) return { lat: hit.lat, lng: hit.lng };
  }
  for (const v of localityIndex.values()) {
    if (v.locality.toLowerCase() === locality.toLowerCase()) return { lat: v.lat, lng: v.lng };
  }
  return null;
}

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

/** Shared by both providers — everything past "already-discoverable listings, unfiltered" is
 *  plain in-memory filter/sort, since Firestore has no native support for this query shape
 *  (multiple range filters + several sort orders) without an external index (a later phase). */
function filterAndSort(candidates: Property[], filters: SearchFilters): Property[] {
  let items = candidates;

  if (filters.city) items = items.filter((p) => p.city.toLowerCase() === filters.city!.toLowerCase());
  if (filters.listingType) items = items.filter((p) => p.listingType === filters.listingType);
  if (filters.propertyTypes?.length) items = items.filter((p) => filters.propertyTypes!.includes(p.propertyType));
  if (filters.minPrice != null) items = items.filter((p) => priceOf(p) >= filters.minPrice!);
  if (filters.maxPrice != null) items = items.filter((p) => priceOf(p) <= filters.maxPrice!);
  if (filters.minArea != null) items = items.filter((p) => (p.builtUpArea ?? 0) >= filters.minArea!);
  if (filters.maxArea != null) items = items.filter((p) => (p.builtUpArea ?? 0) <= filters.maxArea!);
  if (filters.gender === "male" || filters.gender === "female") {
    items = items.filter((p) => p.genderPreference === filters.gender || p.genderPreference === "any");
  }
  if (filters.bedrooms?.length) {
    items = items.filter((p) => {
      if (p.bedrooms == null) return false;
      return filters.bedrooms!.some((b) => (b >= 5 ? p.bedrooms! >= 5 : p.bedrooms === b));
    });
  }
  if (filters.furnishing?.length) items = items.filter((p) => p.furnishing && filters.furnishing!.includes(p.furnishing));
  if (filters.amenities?.length) items = items.filter((p) => filters.amenities!.every((a) => p.amenities.includes(a)));
  if (filters.postedBy?.length) items = items.filter((p) => filters.postedBy!.includes(p.postedBy));
  if (filters.verifiedOnly) items = items.filter((p) => p.verificationStatus === "approved");
  if (filters.noBrokerage) items = items.filter((p) => p.noBrokerage);
  if (filters.petFriendly) items = items.filter((p) => p.amenities.includes("pet_friendly"));
  if (filters.featuredOnly) items = items.filter((p) => p.featured);

  // Reference point for "nearest" ordering: explicit coords (browser geolocation) win,
  // otherwise the centroid of the chosen "near" locality. If neither resolves, "nearest"
  // gracefully degrades to relevance.
  const refPoint =
    filters.nearLat != null && filters.nearLng != null
      ? { lat: filters.nearLat, lng: filters.nearLng }
      : filters.near
        ? localityPoint(filters.near, filters.city)
        : null;

  // A "near" reference with no explicit sort choice auto-selects "nearest" (the requested
  // automatic behaviour); an explicit price/newest choice is always respected.
  const sort: SortOption = filters.sort ?? (refPoint ? "nearest" : "relevance");
  const relevance = (a: Property, b: Property) => Number(b.featured) - Number(a.featured) || b.views - a.views;

  return [...items].sort((a, b) => {
    switch (sort) {
      case "newest":
        return b.createdAt.localeCompare(a.createdAt);
      case "price_asc":
        return priceOf(a) - priceOf(b);
      case "price_desc":
        return priceOf(b) - priceOf(a);
      case "nearest":
        if (!refPoint) return relevance(a, b);
        return (
          haversineKm(refPoint.lat, refPoint.lng, a.latitude, a.longitude) -
            haversineKm(refPoint.lat, refPoint.lng, b.latitude, b.longitude) || relevance(a, b)
        );
      default:
        return relevance(a, b);
    }
  });
}

class MockSearchProvider implements SearchProvider {
  async search(filters: SearchFilters): Promise<SearchResult> {
    // Only admin-verified listings are discoverable. A freshly posted property stays
    // invisible to house-seekers until an admin approves it (spec §25).
    const discoverable = allProperties.filter((p) => p.status === "active" && p.verificationStatus === "approved");
    const items = filterAndSort(discoverable, filters);
    return { items, total: items.length };
  }
}

// Firestore has no native support for this query shape (several range filters + multiple sort
// orders) without an external index (a later phase, per the file header) — so this fetches every
// discoverable listing once and reuses the exact same in-memory filter/sort as the mock provider.
class FirebaseSearchProvider implements SearchProvider {
  async search(filters: SearchFilters): Promise<SearchResult> {
    const snap = await getDocs(
      query(
        collection(getDb(), PROPERTIES_COLLECTION),
        where("status", "==", "active"),
        where("verificationStatus", "==", "approved")
      )
    );
    const discoverable = snap.docs.map((d) => mapPropertyDoc(d.id, d.data()));
    const items = filterAndSort(discoverable, filters);
    return { items, total: items.length };
  }
}

export const searchProvider: SearchProvider = isFirestoreEnabled() ? new FirebaseSearchProvider() : new MockSearchProvider();
