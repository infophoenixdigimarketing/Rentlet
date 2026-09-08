// Turns a finished WizardState into a real Property. Mock mode pushes it straight into the
// shared seed arrays (unchanged demo behaviour). Firebase mode uploads every selected media
// file to Storage first (spec §16 step 8 / §51 — compression + validation live in
// lib/firebase/storage-upload.ts), then writes the property via propertyRepository.create(),
// which is what actually lands it in Firestore, tenant search, the owner dashboard, and the
// admin moderation queue simultaneously (all three read the same collection).
import { allProperties } from "@/lib/data/seed-properties";
import { setOwnerContact } from "@/lib/data/owner-contacts";
import { ownerPropertiesService } from "@/lib/services/owner.service";
import { adminPropertiesService } from "@/lib/services/admin.service";
import { propertyRepository } from "@/lib/services/properties.service";
import { isFirestoreEnabled } from "@/lib/firebase/config";
import { uploadPropertyMedia, propertyMediaPath } from "@/lib/firebase/storage-upload";
import type { WizardState, WizardMediaFile } from "@/types/wizard";
import type { Property, PropertyCategory } from "@/types/property";
import type { AuthUser } from "@/types/user";

const CATEGORY_OF: Record<NonNullable<WizardState["category"]>, PropertyCategory> = {
  apartment: "residential",
  independent_house: "residential",
  villa: "residential",
  plot: "land",
  land: "land",
  pg: "pg_flatmate",
  flatmate: "pg_flatmate",
  office: "commercial",
  shop: "commercial",
  showroom: "commercial",
  warehouse: "commercial",
  other: "residential",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function num(v: string): number | null {
  const n = Number(v);
  return v.trim() !== "" && !Number.isNaN(n) ? n : null;
}

let nextId = 1000;

/** Pure builder — also used by Step11Preview to render the listing before it's actually submitted.
 *  `media` defaults to the empty-images placeholder path (preview / mock submit); real Storage
 *  URLs are spliced in by submitProperty() below when Firebase is configured. */
export function buildProperty(
  w: WizardState,
  user: AuthUser,
  id = `own${nextId}`,
  media: { images: string[]; videos: string[]; floorPlanUrl: string | null } = { images: [], videos: [], floorPlanUrl: null }
): Property {
  const title = w.title.trim() || `${w.category ?? "Property"} for ${w.listingType === "rent" ? "Rent" : "Sale"} in ${w.locality}`;

  const property: Property = {
    id,
    slug: `${slugify(title)}-${slugify(w.city || "india")}`,
    ownerId: user.id,
    ownerName: w.ownerName.trim() || user.name,
    ownerVerified: user.isVerified,
    postedBy: user.role === "agent" || user.role === "builder" ? user.role : "owner",

    title,
    description: w.description.trim(),
    listingType: w.listingType ?? "rent",
    propertyType: w.category ?? "apartment",
    category: CATEGORY_OF[w.category ?? "apartment"],

    price: w.listingType === "sale" ? num(w.price) : null,
    rent: w.listingType === "rent" ? num(w.rent) : null,
    deposit: num(w.deposit),
    maintenance: num(w.maintenance),
    negotiable: w.negotiable,

    city: w.city.trim(),
    state: w.state.trim(),
    locality: w.locality.trim(),
    address: `${w.locality}, ${w.city}`.trim(),
    pincode: w.pincode.trim(),
    latitude: w.latitude ?? 20.5937,
    longitude: w.longitude ?? 78.9629,

    bedrooms: w.bedrooms,
    bathrooms: w.bathrooms,
    balconies: w.balconies,
    builtUpArea: num(w.builtUpArea),
    carpetArea: num(w.carpetArea),
    floor: num(w.floor),
    totalFloors: num(w.totalFloors),
    facing: w.facing,
    furnishing: w.furnishing,
    propertyAge: w.propertyAge,
    availableFrom: "Immediate",

    amenities: w.amenities,
    images: media.images,
    videos: media.videos,
    floorPlanUrl: media.floorPlanUrl,

    verificationStatus: "pending",
    rejectionReason: null,
    status: "active",
    featured: false,
    noBrokerage: true,

    views: 0,
    leadsCount: 0,
    savedCount: 0,

    createdAt: new Date().toISOString().slice(0, 10),
  };

  return property;
}

export interface SubmitProgress {
  /** 0-100 across all files combined, or null while a step has no meaningful percentage. */
  percent: number | null;
  label: string;
}

async function uploadAll(
  propertyId: string,
  w: WizardState,
  onProgress?: (p: SubmitProgress) => void
): Promise<{ images: string[]; videos: string[]; floorPlanUrl: string | null }> {
  const files: { slot: string; file: WizardMediaFile; kind: "image" | "video" }[] = [];
  if (w.cover) files.push({ slot: "cover", file: w.cover, kind: "image" });
  w.gallery.forEach((f, i) => files.push({ slot: `gallery-${i}`, file: f, kind: "image" }));
  if (w.video) files.push({ slot: "video", file: w.video, kind: "video" });
  if (w.floorPlan) files.push({ slot: "floorplan", file: w.floorPlan, kind: "image" });

  const images: string[] = [];
  const videos: string[] = [];
  let floorPlanUrl: string | null = null;

  for (let i = 0; i < files.length; i++) {
    const { slot, file, kind } = files[i];
    onProgress?.({ percent: Math.round((i / files.length) * 100), label: `Uploading ${slot.replace(/-\d+$/, "")}...` });
    const { url } = await uploadPropertyMedia(file.file, propertyMediaPath(propertyId, slot, file.file), kind, (pct) =>
      onProgress?.({ percent: Math.round(((i + pct / 100) / files.length) * 100), label: `Uploading ${slot.replace(/-\d+$/, "")}...` })
    );
    if (slot === "video") videos.push(url);
    else if (slot === "floorplan") floorPlanUrl = url;
    else if (slot === "cover") images.unshift(url); // cover always first
    else images.push(url);
  }

  onProgress?.({ percent: 100, label: "Saving listing..." });
  return { images, videos, floorPlanUrl };
}

export async function submitProperty(w: WizardState, user: AuthUser, onProgress?: (p: SubmitProgress) => void): Promise<Property> {
  if (!isFirestoreEnabled()) {
    const property = buildProperty(w, user, `own${nextId++}`);
    allProperties.unshift(property);
    ownerPropertiesService.addProperty(property);
    // Surface it in the admin moderation queue straight away (it's still "pending").
    adminPropertiesService.refresh();
    // Owner contact goes to the admin-only store, never onto the Property object.
    setOwnerContact(property.ownerId, {
      name: property.ownerName,
      phone: w.ownerPhone.trim() || user.phone || "Not shared",
      email: w.ownerEmail.trim() || user.email || "Not shared",
    });
    return property;
  }

  // Firebase mode: create the doc first (so we have a stable id for the Storage path), upload
  // media against that id, then patch the doc with the resulting URLs. buildProperty() fills in
  // id/createdAt/views/leadsCount/savedCount for the preview step's benefit, but those must NOT
  // leak into the Firestore write (propertyRepository.create() generates its own id and counters)
  // — an actual destructure, not just a type-level Omit, so the stray fields are truly gone from
  // the object handed to create(), not just hidden from the type checker.
  const draft = buildProperty(w, user);
  const { id, createdAt, views, leadsCount, savedCount, ...createInput } = draft;
  void id;
  void createdAt;
  void views;
  void leadsCount;
  void savedCount;
  onProgress?.({ percent: null, label: "Creating listing..." });
  const created = await propertyRepository.create(createInput);

  const media = await uploadAll(created.id, w, onProgress);
  if (media.images.length || media.videos.length || media.floorPlanUrl) {
    await propertyRepository.update(created.id, media);
  }

  return { ...created, ...media };
}
