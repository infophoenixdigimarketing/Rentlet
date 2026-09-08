import type { Property } from "@/types/property";

// A house-seeker must never see owner-provided private data. Anything passed as a prop to a
// public client component is serialized into the page's RSC payload (readable by scrapers even
// if not rendered), so sanitize the Property object BEFORE it crosses that boundary:
//   - owner identity  -> generic label
//   - exact address / pincode -> area only
//   - map coordinates -> rounded to ~1km so the pin is the locality, not the house
// Owner name, phone, email and the full address stay admin/staff-only (see lib/data/owner-contacts.ts).
export function toPublicProperty(p: Property): Property {
  return {
    ...p,
    ownerName: "RENTLET Verified Owner",
    address: [p.locality, p.city].filter(Boolean).join(", "),
    pincode: "",
    latitude: Math.round(p.latitude * 50) / 50,
    longitude: Math.round(p.longitude * 50) / 50,
  };
}
