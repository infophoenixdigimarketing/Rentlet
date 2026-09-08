import type { Furnishing, ListingType, PropertyType } from "@/types/property";

// Post-property wizard state (spec §16, 12 steps). `media` holds real browser File objects for
// a genuine drag-and-drop/preview experience; nothing is uploaded anywhere (no Storage backend
// yet — Phase 12), so the submitted listing falls back to the usual generated PropertyImage
// placeholder, same as every other seed listing.
export interface WizardMediaFile {
  id: string;
  file: File;
  previewUrl: string;
}

export interface WizardState {
  listingType: ListingType | null;
  category: PropertyType | null;

  country: string;
  state: string;
  city: string;
  locality: string;
  pincode: string;
  latitude: number | null;
  longitude: number | null;

  bedrooms: number | null;
  bathrooms: number | null;
  balconies: number | null;
  floor: string;
  totalFloors: string;
  builtUpArea: string;
  carpetArea: string;
  facing: string | null;
  propertyAge: string | null;

  rent: string;
  price: string;
  deposit: string;
  maintenance: string;
  negotiable: boolean;

  furnishing: Furnishing | null;

  amenities: string[];

  cover: WizardMediaFile | null;
  gallery: WizardMediaFile[];
  video: WizardMediaFile | null;
  floorPlan: WizardMediaFile | null;

  title: string;
  description: string;

  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
}

export const initialWizardState: WizardState = {
  listingType: null,
  category: null,
  country: "India",
  state: "",
  city: "",
  locality: "",
  pincode: "",
  latitude: null,
  longitude: null,
  bedrooms: null,
  bathrooms: null,
  balconies: null,
  floor: "",
  totalFloors: "",
  builtUpArea: "",
  carpetArea: "",
  facing: null,
  propertyAge: null,
  rent: "",
  price: "",
  deposit: "",
  maintenance: "",
  negotiable: true,
  furnishing: null,
  amenities: [],
  cover: null,
  gallery: [],
  video: null,
  floorPlan: null,
  title: "",
  description: "",
  ownerName: "",
  ownerPhone: "",
  ownerEmail: "",
};
