// Single source of truth for turning the /properties URL query string into a SearchFilters
// object and back. Used server-side (page.tsx parses incoming searchParams) and client-side
// (FilterPanel/SortSelect build the next URL) so the two never drift.
import type { SearchFilters, SortOption } from "@/lib/services/search.service";
import type { Furnishing, PropertyType } from "@/types/property";

export type RawSearchParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

function list(v: string | string[] | undefined): string[] {
  const s = first(v);
  return s ? s.split(",").filter(Boolean) : [];
}

export function parseFilters(params: RawSearchParams): SearchFilters {
  const filters: SearchFilters = {};

  const city = first(params.city);
  if (city) filters.city = city;

  const listingType = first(params.listingType);
  if (listingType === "rent" || listingType === "sale") filters.listingType = listingType;

  const propertyTypes = list(params.type) as PropertyType[];
  if (propertyTypes.length) filters.propertyTypes = propertyTypes;

  const minPrice = first(params.minPrice);
  if (minPrice) filters.minPrice = Number(minPrice);
  const maxPrice = first(params.maxPrice);
  if (maxPrice) filters.maxPrice = Number(maxPrice);

  const minArea = first(params.minArea);
  if (minArea) filters.minArea = Number(minArea);
  const maxArea = first(params.maxArea);
  if (maxArea) filters.maxArea = Number(maxArea);

  const gender = first(params.gender);
  if (gender === "male" || gender === "female" || gender === "any") filters.gender = gender;

  const bhk = list(params.bhk).map(Number).filter((n) => !Number.isNaN(n));
  if (bhk.length) filters.bedrooms = bhk;

  const furnishing = list(params.furnishing) as Furnishing[];
  if (furnishing.length) filters.furnishing = furnishing;

  const amenities = list(params.amenities);
  if (amenities.length) filters.amenities = amenities;

  const postedBy = list(params.postedBy) as Property_postedBy[];
  if (postedBy.length) filters.postedBy = postedBy;

  if (first(params.verified) === "1") filters.verifiedOnly = true;
  if (first(params.noBrokerage) === "1") filters.noBrokerage = true;
  if (first(params.pet) === "1") filters.petFriendly = true;
  if (first(params.featured) === "1") filters.featuredOnly = true;

  const sort = first(params.sort) as SortOption | undefined;
  if (sort) filters.sort = sort;

  const near = first(params.near);
  if (near) filters.near = near;
  const nearLat = first(params.nearLat);
  if (nearLat && !Number.isNaN(Number(nearLat))) filters.nearLat = Number(nearLat);
  const nearLng = first(params.nearLng);
  if (nearLng && !Number.isNaN(Number(nearLng))) filters.nearLng = Number(nearLng);

  return filters;
}

// Small local alias to avoid importing the full Property type just for the postedBy union.
type Property_postedBy = "owner" | "agent" | "builder";

export function filtersToSearchString(filters: SearchFilters): string {
  const qs = new URLSearchParams();
  if (filters.city) qs.set("city", filters.city);
  if (filters.listingType) qs.set("listingType", filters.listingType);
  if (filters.propertyTypes?.length) qs.set("type", filters.propertyTypes.join(","));
  if (filters.minPrice != null) qs.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice != null) qs.set("maxPrice", String(filters.maxPrice));
  if (filters.minArea != null) qs.set("minArea", String(filters.minArea));
  if (filters.maxArea != null) qs.set("maxArea", String(filters.maxArea));
  if (filters.gender) qs.set("gender", filters.gender);
  if (filters.bedrooms?.length) qs.set("bhk", filters.bedrooms.join(","));
  if (filters.furnishing?.length) qs.set("furnishing", filters.furnishing.join(","));
  if (filters.amenities?.length) qs.set("amenities", filters.amenities.join(","));
  if (filters.postedBy?.length) qs.set("postedBy", filters.postedBy.join(","));
  if (filters.verifiedOnly) qs.set("verified", "1");
  if (filters.noBrokerage) qs.set("noBrokerage", "1");
  if (filters.petFriendly) qs.set("pet", "1");
  if (filters.featuredOnly) qs.set("featured", "1");
  if (filters.sort) qs.set("sort", filters.sort);
  if (filters.near) qs.set("near", filters.near);
  if (filters.nearLat != null) qs.set("nearLat", String(filters.nearLat));
  if (filters.nearLng != null) qs.set("nearLng", String(filters.nearLng));
  return qs.toString();
}

export function activeFilterCount(filters: SearchFilters): number {
  return (
    (filters.propertyTypes?.length ?? 0) +
    (filters.bedrooms?.length ?? 0) +
    (filters.furnishing?.length ?? 0) +
    (filters.amenities?.length ?? 0) +
    (filters.postedBy?.length ?? 0) +
    (filters.minPrice != null ? 1 : 0) +
    (filters.maxPrice != null ? 1 : 0) +
    (filters.minArea != null ? 1 : 0) +
    (filters.maxArea != null ? 1 : 0) +
    (filters.gender ? 1 : 0) +
    (filters.near || filters.nearLat != null ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0) +
    (filters.noBrokerage ? 1 : 0) +
    (filters.petFriendly ? 1 : 0) +
    (filters.featuredOnly ? 1 : 0)
  );
}
