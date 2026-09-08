import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <StaticPage title="Privacy Policy" subtitle="Last updated August 2026.">
      <p>
        We collect the information you give us directly — name, email, phone, and the details of any
        property you post or enquire about — and use it to run the marketplace: matching you with
        listings, letting owners respond to your enquiries, and keeping your account secure.
      </p>
      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t sell your personal data to third parties.</li>
        <li>We don&apos;t share your phone number with an owner/agent until you take an action that requires it (e.g. sending an enquiry, scheduling a visit).</li>
      </ul>
      <h2>Your data, your control</h2>
      <p>
        You can review and update your profile at any time from your account, and request deletion of
        your account and associated data by contacting support.
      </p>
      <h2>Security</h2>
      <p>
        Authentication is handled by Firebase Authentication; passwords are never stored or visible to
        Rentlet in plain text.
      </p>
    </StaticPage>
  );
}
