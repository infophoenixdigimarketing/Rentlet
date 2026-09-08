import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiePolicyPage() {
  return (
    <StaticPage title="Cookie Policy" subtitle="Last updated August 2026.">
      <p>
        Rentlet uses a small number of essential browser storage items to keep the site working — keeping
        you signed in, remembering your saved searches, and remembering preferences like your last-viewed
        city or search filters.
      </p>
      <h2>What we use</h2>
      <ul>
        <li><strong>Essential:</strong> session/auth tokens (Firebase Authentication) — required to keep you logged in.</li>
        <li><strong>Functional:</strong> local storage for saved searches, favorites and UI preferences on this device.</li>
      </ul>
      <p>
        We don&apos;t use third-party advertising or tracking cookies. You can clear cookies and local
        storage at any time from your browser settings — you may need to log in again afterward.
      </p>
    </StaticPage>
  );
}
