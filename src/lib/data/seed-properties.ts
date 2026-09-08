import type { Property, PropertyType, PropertyCategory, Furnishing } from "@/types/property";
import { featuredProperties } from "@/lib/data/properties";

// Deterministic generator (no Math.random — reproducible builds/tests) that expands the 6
// hand-authored properties into a realistic ~54-listing catalogue across the spec's seed cities
// (§64), so /properties filters have enough variety to actually demonstrate. Phase 12 replaces
// this whole module with a Firestore import script; the shape (Property[]) doesn't change.

interface CityDef {
  city: string;
  state: string;
  localities: string[];
  lat: number;
  lng: number;
}

const CITIES: CityDef[] = [
  { city: "Bengaluru", state: "Karnataka", localities: ["Whitefield", "Indiranagar", "HSR Layout", "Koramangala", "Sarjapur Road", "Electronic City"], lat: 12.9716, lng: 77.5946 },
  { city: "Mumbai", state: "Maharashtra", localities: ["Bandra West", "Andheri East", "Powai", "Malad West", "Thane West", "Chembur"], lat: 19.076, lng: 72.8777 },
  { city: "Chennai", state: "Tamil Nadu", localities: ["Adyar", "Anna Nagar", "T. Nagar", "Velachery", "OMR", "Porur"], lat: 13.0827, lng: 80.2707 },
  { city: "Hyderabad", state: "Telangana", localities: ["Gachibowli", "Madhapur", "Kondapur", "Banjara Hills", "Kukatpally", "Manikonda"], lat: 17.385, lng: 78.4867 },
];

const TYPE_CYCLE: { type: PropertyType; category: PropertyCategory; listingType: "rent" | "sale" }[] = [
  { type: "apartment", category: "residential", listingType: "rent" },
  { type: "apartment", category: "residential", listingType: "sale" },
  { type: "independent_house", category: "residential", listingType: "rent" },
  { type: "villa", category: "residential", listingType: "sale" },
  { type: "plot", category: "land", listingType: "sale" },
  { type: "pg", category: "pg_flatmate", listingType: "rent" },
  { type: "office", category: "commercial", listingType: "rent" },
  { type: "shop", category: "commercial", listingType: "rent" },
  { type: "warehouse", category: "commercial", listingType: "sale" },
];

const FURNISHING: Furnishing[] = ["unfurnished", "semi_furnished", "fully_furnished"];
const AMENITY_POOL = [
  "parking", "lift", "power_backup", "security", "gym", "swimming_pool",
  "club_house", "garden", "cctv", "water_supply", "wifi", "gas_pipeline",
];
const OWNER_NAMES = [
  "Rahul Iyer", "Sneha Kapoor", "Manoj Pillai", "Divya Krishnan", "Aditya Verma",
  "Lakshmi Narayanan", "Rohit Bhatia", "Meera Suresh", "Sanjay Gowda", "Nisha Reddy",
];
const POSTED_BY: Property["postedBy"][] = ["owner", "owner", "agent", "owner", "builder"];

function titleFor(type: PropertyType, bhk: number | null, listingType: "rent" | "sale", locality: string) {
  const action = listingType === "rent" ? "for Rent" : "for Sale";
  switch (type) {
    case "apartment":
      return `${bhk} BHK Apartment ${action} in ${locality}`;
    case "independent_house":
      return `${bhk} BHK Independent House ${action} in ${locality}`;
    case "villa":
      return `${bhk} BHK Villa ${action} in ${locality}`;
    case "plot":
      return `Residential Plot ${action} in ${locality}`;
    case "pg":
      return `Premium PG Accommodation ${action} in ${locality}`;
    case "office":
      return `Office Space ${action} in ${locality}`;
    case "shop":
      return `Commercial Shop ${action} in ${locality}`;
    case "warehouse":
      return `Warehouse ${action} in ${locality}`;
    default:
      return `Property ${action} in ${locality}`;
  }
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function generate(): Property[] {
  const out: Property[] = [];
  let n = 0;

  for (const cityDef of CITIES) {
    for (let i = 0; i < 12; i++) {
      n++;
      const cycle = TYPE_CYCLE[i % TYPE_CYCLE.length];
      const locality = cityDef.localities[i % cityDef.localities.length];
      const isResidential = cycle.category === "residential";
      const bhk = isResidential ? 1 + (i % 4) : null;
      const id = `s${n}`;
      const owner = OWNER_NAMES[n % OWNER_NAMES.length];
      const basePrice = 12000 + ((i * 3700 + cityDef.lat * 100) % 60000);
      const rent = cycle.listingType === "rent" ? Math.round(basePrice / 500) * 500 : null;
      const saleBase = 3000000 + ((i * 850000 + n * 210000) % 25000000);
      const price = cycle.listingType === "sale" ? Math.round(saleBase / 50000) * 50000 : null;
      // Every TYPE_CYCLE entry occurs exactly once per city (fixed `i`), so keying builtUpArea
      // off `i` alone made every listing of a given type — across every city — report the
      // identical area (most visible on the homepage's Land and PG & Flatmates rails, which
      // each showcase one listing per type per city side by side). Keyed off `n` (unique per
      // listing in the whole catalogue) instead so it actually varies.
      const area = cycle.category === "land" ? 800 + (n * 137) % 2600 : 450 + (n * 97) % 2200;
      const amenities = AMENITY_POOL.filter((_, ai) => (n + ai) % 3 !== 0).slice(0, 3 + (i % 4));
      const title = titleFor(cycle.type, bhk, cycle.listingType, locality);

      out.push({
        id,
        slug: `${slugify(title)}-${slugify(cityDef.city)}`,
        ownerId: `su${n % OWNER_NAMES.length}`,
        ownerName: owner,
        ownerVerified: n % 3 !== 0,
        postedBy: POSTED_BY[n % POSTED_BY.length],
        title,
        description: `${title}. Well-connected to major roads and everyday conveniences, close to ${locality}'s commercial strip.`,
        listingType: cycle.listingType,
        propertyType: cycle.type,
        category: cycle.category,
        price,
        rent,
        deposit: cycle.listingType === "rent" ? (rent ?? 0) * (2 + (i % 3)) : null,
        maintenance: isResidential ? 500 + (i % 6) * 300 : null,
        negotiable: i % 2 === 0,
        city: cityDef.city,
        state: cityDef.state,
        locality,
        address: `${locality} Main Road`,
        pincode: `${560000 + n}`.slice(0, 6),
        latitude: cityDef.lat + ((i % 6) - 3) * 0.01,
        longitude: cityDef.lng + ((i % 5) - 2) * 0.01,
        bedrooms: bhk,
        bathrooms: isResidential ? Math.max(1, (bhk ?? 1) - (i % 2)) : cycle.category === "commercial" ? 1 : null,
        balconies: isResidential ? i % 3 : null,
        builtUpArea: area,
        carpetArea: cycle.category === "land" ? null : Math.round(area * 0.86),
        floor: cycle.category === "land" ? null : i % 12,
        totalFloors: cycle.category === "land" ? null : 4 + (i % 15),
        facing: ["East", "West", "North", "South"][i % 4],
        furnishing: isResidential || cycle.category === "commercial" ? FURNISHING[i % FURNISHING.length] : null,
        propertyAge: cycle.category === "land" ? null : `${1 + (i % 12)} years`,
        availableFrom: i % 4 === 0 ? "Immediate" : "Within 30 days",
        genderPreference: cycle.category === "pg_flatmate" ? (["male", "female", "any"] as const)[n % 3] : null,
        amenities,
        images: [],
        verificationStatus: n % 5 === 0 ? "pending" : "approved",
        status: "active",
        featured: n % 7 === 0,
        noBrokerage: i % 2 === 0,
        views: 80 + ((n * 37) % 2400),
        leadsCount: 2 + ((n * 5) % 60),
        savedCount: 4 + ((n * 3) % 140),
        createdAt: new Date(2026, 7, 1 + (n % 24)).toISOString().slice(0, 10),
      });
    }
  }

  return out;
}

// Hand-picked real photos + light title/listingType touch-ups for a specific, deterministic
// subset of the generated catalogue — used to power the homepage's Rent/Buy/Land/Commercial/
// PG & Flatmates sections with real, working property detail pages (not fake homepage-only
// data): every id below already exists in `generatedProperties` with a real slug that
// propertyRepository.getById/getBySlugAndId resolves, so "View Details" always lands somewhere
// real. Only images/title/listingType/propertyType/price/rent/deposit are touched — a title
// change means the slug is recomputed too, so old links to the untouched auto-title would 404;
// nothing links to these by their pre-override slug anywhere in the app.
const SHOWCASE_OVERRIDES: Record<string, Partial<Property>> = {
  // Rent
  s1: { images: ["/images/showcase/studio-1bhk.jpg"] },
  s10: { images: ["/images/properties/p3-apartment-interior.jpg"] },
  s3: { images: ["/images/showcase/living-3bhk.jpg"] },
  s16: {
    title: "4 BHK Luxury Villa for Rent in Malad West",
    listingType: "rent",
    price: null,
    rent: 95000,
    deposit: 285000,
    images: ["/images/categories/independent-houses.jpg"],
  },
  s25: { images: ["/images/categories/new-projects.jpg"] },
  s34: { images: ["/images/showcase/coliving.jpg"] },

  // Buy
  s2: { images: ["/images/categories/new-projects.jpg"] },
  s4: { images: ["/images/categories/independent-houses.jpg"] },
  s28: { images: ["/images/showcase/villa-premium.jpg"] },
  s14: { images: ["/images/properties/p3-apartment-interior.jpg"] },
  s27: {
    title: "3 BHK Independent House for Sale in T. Nagar",
    listingType: "sale",
    rent: null,
    deposit: null,
    price: 18500000,
    images: ["/images/categories/buy-property.jpg"],
  },

  // Land & Plots
  s5: { images: ["/images/categories/land.jpg"] },
  s17: { title: "Gated Community Plot for Sale in Thane West", images: ["/images/showcase/gated-community.jpg"] },
  s29: { title: "Farm Land for Sale near OMR", images: ["/images/showcase/farmland.jpg"] },
  // Genuine vacant-land photography for a 4th, visually distinct card wasn't findable (several
  // sourcing attempts this session returned unrelated photos, discarded) — using a commercial
  // building photo instead, on the reasoning real listings for zoned commercial land often
  // market the type of development the plot is approved for.
  s41: { title: "Commercial Land for Sale in Kukatpally", images: ["/images/categories/apartments.jpg"] },

  // Commercial
  s7: { images: ["/images/showcase/office-modern.jpg"] },
  s8: { images: ["/images/categories/commercial.jpg"] },
  s20: { title: "Showroom Space for Rent in Andheri East", propertyType: "showroom", images: ["/images/properties/p5-apartment.jpg"] },
  s9: { images: ["/images/showcase/warehouse.jpg"] },
  s33: { title: "Commercial Building for Sale in T. Nagar", images: ["/images/properties/p1-apartment-exterior.jpg"] },

  // PG & Flatmates
  s6: { title: "Premium PG for Men in Electronic City", genderPreference: "male", images: ["/images/categories/pg.jpg"] },
  s18: { title: "Premium PG for Women in Chembur", genderPreference: "female", images: ["/images/showcase/coliving.jpg"] },
  s30: { title: "Co-living Space in Porur", genderPreference: "any", images: ["/images/categories/flatmates.jpg"] },
  s42: { title: "Flatmate Wanted — Shared Room in Manikonda", propertyType: "flatmate", genderPreference: "any", images: ["/images/showcase/studio-1bhk.jpg"] },

  // Luxury Villas (s28 also appears in Buy, s16 also appears in Rent — both genuinely are
  // villas, so showing them again in a dedicated villas showcase is consistent, not a bug)
  s40: { images: ["/images/categories/buy-property.jpg"] },
};

function applyShowcaseOverrides(properties: Property[]): Property[] {
  return properties.map((p) => {
    const patch = SHOWCASE_OVERRIDES[p.id];
    if (!patch) return p;
    const merged = { ...p, ...patch };
    if (patch.title) merged.slug = `${slugify(merged.title)}-${slugify(merged.city)}`;
    return merged;
  });
}

export const generatedProperties: Property[] = applyShowcaseOverrides(generate());

// Homepage section rails (spec: "Rent/Buy/Land/Commercial/PG & Flatmates must all be clearly
// visible on the homepage") — real ids from generatedProperties, each carrying a real photo via
// SHOWCASE_OVERRIDES above, in a fixed display order.
export const rentShowcaseIds = ["s1", "s10", "s3", "s16", "s25", "s34"];
export const buyShowcaseIds = ["s2", "s4", "s28", "s14", "s27"];
export const landShowcaseIds = ["s5", "s17", "s29", "s41"];
export const commercialShowcaseIds = ["s7", "s8", "s20", "s9", "s33"];
export const pgFlatmatesShowcaseIds = ["s6", "s18", "s30", "s42"];
// "p2" is featuredProperties' hand-authored villa (Adyar, Chennai) — resolves fine since
// allProperties spreads featuredProperties + generatedProperties together, below.
export const luxuryVillaShowcaseIds = ["p2", "s40", "s16", "s28"];

// Full catalogue used by search/filter — the curated `featuredProperties` stay separately
// exported (and included here) so the homepage's hand-picked rail is unaffected.
export const allProperties: Property[] = [...featuredProperties, ...generatedProperties];
