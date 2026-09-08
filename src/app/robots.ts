import type { MetadataRoute } from "next";

// Served at /robots.txt. Public marketing + search pages are crawlable; anything behind a
// login (dashboards, account pages, the admin/staff consoles) and the API are not.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/staff/",
        "/owner/",
        "/favorites",
        "/saved-searches",
        "/visits",
        "/messages",
        "/notifications",
        "/profile",
        "/forgot-password",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
