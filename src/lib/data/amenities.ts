// Central amenity registry (spec §16 step 7, §47 admin-editable list). Both PropertyCard's
// compact chips and the property-detail Amenities grid read from here so labels/icons never
// drift between views. Admin CMS (Phase 11) will make this list editable without a deploy.
export interface AmenityDef {
  id: string;
  label: string;
  icon:
    | "car"
    | "move-vertical"
    | "zap"
    | "shield-check"
    | "dumbbell"
    | "waves"
    | "building-2"
    | "trees"
    | "camera"
    | "droplets"
    | "wifi"
    | "flame"
    | "paw-print"
    | "layers";
}

export const amenities: AmenityDef[] = [
  { id: "parking", label: "Parking", icon: "car" },
  { id: "lift", label: "Lift", icon: "move-vertical" },
  { id: "power_backup", label: "Power Backup", icon: "zap" },
  { id: "security", label: "Security", icon: "shield-check" },
  { id: "gym", label: "Gym", icon: "dumbbell" },
  { id: "swimming_pool", label: "Swimming Pool", icon: "waves" },
  { id: "club_house", label: "Club House", icon: "building-2" },
  { id: "garden", label: "Garden", icon: "trees" },
  { id: "cctv", label: "CCTV", icon: "camera" },
  { id: "water_supply", label: "Water Supply", icon: "droplets" },
  { id: "wifi", label: "Internet", icon: "wifi" },
  { id: "gas_pipeline", label: "Gas Pipeline", icon: "flame" },
  { id: "pet_friendly", label: "Pet Friendly", icon: "paw-print" },
  { id: "gated_layout", label: "Gated Layout", icon: "layers" },
];

export const amenityMap: Record<string, AmenityDef> = Object.fromEntries(
  amenities.map((a) => [a.id, a])
);
