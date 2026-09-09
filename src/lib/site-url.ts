// Canonical origin for the app. Prefer the NEXT_PUBLIC_SITE_URL env var (set per environment
// on the host); if it's missing, fall back to the real production domain in a production
// build and to localhost in development — so canonical/OG/sitemap URLs are never wrong on the
// live site just because an env var wasn't set.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production" ? "https://rentlet.in" : "http://localhost:3000");
