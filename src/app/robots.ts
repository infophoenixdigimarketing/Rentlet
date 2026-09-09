import type { MetadataRoute } from "next";

// Served at /robots.txt. Public marketing + search pages are crawlable; anything behind a
// login (dashboards, account pages, the admin/staff consoles) and the API are not.
import { SITE_URL } from "@/lib/site-url";

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
