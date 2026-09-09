import type { MetadataRoute } from "next";
import { allProperties } from "@/lib/data/seed-properties";

// Served at /sitemap.xml. Static marketing/search routes + one entry per publicly
// discoverable property. In Firebase mode swap `allProperties` for a `where('status','==',
// 'active')` + `where('verificationStatus','==','approved')` query.
import { SITE_URL } from "@/lib/site-url";

const STATIC_PATHS: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/properties", priority: 0.9, changeFrequency: "hourly" },
  { path: "/properties?listingType=rent", priority: 0.8, changeFrequency: "hourly" },
  { path: "/properties?listingType=sale", priority: 0.8, changeFrequency: "hourly" },
  { path: "/properties?type=plot,land", priority: 0.7, changeFrequency: "daily" },
  { path: "/properties?type=office,shop,showroom,warehouse", priority: 0.7, changeFrequency: "daily" },
  { path: "/properties?type=pg", priority: 0.7, changeFrequency: "daily" },
  { path: "/properties?type=flatmate", priority: 0.7, changeFrequency: "daily" },
  { path: "/post-property", priority: 0.8, changeFrequency: "monthly" },
  { path: "/rental-agreement", priority: 0.6, changeFrequency: "monthly" },
  { path: "/about", priority: 0.4, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.4, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.4, changeFrequency: "yearly" },
  { path: "/help", priority: 0.4, changeFrequency: "monthly" },
  { path: "/sitemap", priority: 0.2, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/listing-terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/login", priority: 0.3, changeFrequency: "yearly" },
  { path: "/register", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((s) => ({
    url: `${SITE_URL}${s.path}`,
    lastModified: now,
    changeFrequency: s.changeFrequency,
    priority: s.priority,
  }));

  const propertyEntries: MetadataRoute.Sitemap = allProperties
    .filter((p) => p.status === "active" && p.verificationStatus === "approved")
    .map((p) => ({
      url: `${SITE_URL}/property/${p.slug}/${p.id}`,
      lastModified: p.createdAt ? new Date(p.createdAt) : now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [...staticEntries, ...propertyEntries];
}
