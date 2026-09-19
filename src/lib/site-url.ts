// Canonical origin for the app. Prefer the NEXT_PUBLIC_SITE_URL env var (set it in .env.local
// to override, e.g. for local dev); otherwise default straight to the real production domain.
//
// This used to branch on NODE_ENV === "production" to pick between the live domain and
// localhost, on the assumption that a production build always reports NODE_ENV as exactly
// "production". On Hostinger's Node hosting that assumption didn't hold — the running process
// didn't report "production", so every server-rendered link (welcome emails, property page
// canonical/OG URLs, JSON-LD) silently pointed recipients at http://localhost:3000 instead of
// rentlet.in. Defaulting to the real domain unless explicitly told otherwise removes that
// dependency on a signal the host doesn't set reliably.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentlet.in";
