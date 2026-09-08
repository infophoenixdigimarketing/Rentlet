// Mirrors docs/01-database-schema.md `properties` collection.
// Lives under apps/web/src/types for now; promoted to packages/types once
// apps/admin exists and workspaces are wired (see docs/00-architecture.md).

export type ListingType = "rent" | "sale";

export type PropertyCategory =
  | "residential"
  | "land"
  | "commercial"
  | "pg_flatmate";

export type PropertyType =
  | "apartment"
  | "independent_house"
  | "villa"
  | "plot"
  | "land"
  | "pg"
  | "flatmate"
  | "office"
  | "shop"
  | "showroom"
  | "warehouse"
  | "other";

export type Furnishing = "unfurnished" | "semi_furnished" | "fully_furnished";

export type VerificationStatus = "pending" | "under_review" | "approved" | "rejected";

export type PropertyStatus = "draft" | "active" | "paused" | "rented" | "sold" | "deleted";

export interface Property {
  id: string;
  slug: string;
  ownerId: string;
  ownerName: string;
  ownerVerified: boolean;
  postedBy: "owner" | "agent" | "builder";

  title: string;
  description: string;
  listingType: ListingType;
  propertyType: PropertyType;
  category: PropertyCategory;

  price: number | null;
  rent: number | null;
  deposit: number | null;
  maintenance: number | null;
  negotiable: boolean;

  city: string;
  state: string;
  locality: string;
  address: string;
  pincode: string;
  latitude: number;
  longitude: number;

  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  builtUpArea: number | null;
  carpetArea: number | null;
  floor: number | null;
  totalFloors: number | null;
  facing: string | null;
  furnishing: Furnishing | null;
  propertyAge: string | null;
  availableFrom: string | null;
  /** PG/flatmate listings only — who the room/bed is for. */
  genderPreference?: "male" | "female" | "any" | null;

  amenities: string[];
  images: string[];
  /** optional — most seed/mock listings don't set these; real Storage uploads (Phase 12) do */
  videos?: string[];
  floorPlanUrl?: string | null;

  verificationStatus: VerificationStatus;
  /** required by admin when verificationStatus is "rejected" (spec §25) */
  rejectionReason?: string | null;
  status: PropertyStatus;
  featured: boolean;
  noBrokerage: boolean;

  views: number;
  leadsCount: number;
  savedCount: number;

  createdAt: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  propertyCount: number;
  imageUrl: string;
}

export interface PropertyCategoryCard {
  id: string;
  title: string;
  icon: string;
  propertyCount: number;
  imageUrl: string;
  href: string;
}
