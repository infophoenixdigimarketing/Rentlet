import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <StaticPage title="Terms & Conditions" subtitle="Last updated September 2026.">
      <p>
        By using Rentlet, you agree to these terms. Rentlet is a listings marketplace connecting property
        owners/agents with tenants and buyers — we are not a party to any tenancy or sale agreement made
        between users.
      </p>
      <h2>Listings</h2>
      <p>
        Owners and agents are responsible for the accuracy of the information they post. Rentlet reviews
        listings for verification but does not guarantee every detail (price, availability, condition) is
        current at the moment you view it — always confirm directly with the owner before making a decision.
      </p>
      <h2>Account use</h2>
      <ul>
        <li>One account per person; keep your login credentials confidential.</li>
        <li>No fake listings, duplicate postings, or misuse of contact details collected through the platform.</li>
        <li>We may suspend accounts that violate these terms or India&apos;s applicable laws.</li>
      </ul>
      <h2>Payments</h2>
      <p>
        Searching, contacting owners and basic listing are free. Optional paid features (e.g. featured
        listings) are clearly priced before purchase.
      </p>
      <h2>Fraud &amp; misrepresentation</h2>
      <p>
        You are solely responsible for the truth, legality and completeness of everything you post or
        share. Listing a property you do not own or are not authorised to list, uploading forged or
        misleading documents, impersonating another person, or misusing contact details is prohibited
        and may be reported to the authorities. You must also comply with all applicable laws — including
        RERA, tenancy, KYC and tax rules — and keep your login credentials and OTP confidential.
      </p>
      <h2>Liability &amp; disclaimer</h2>
      <p>
        Rentlet is a discovery platform only. It does not own, inspect, hold, verify legal title to, or
        guarantee any property, price, document or person, and it does not provide legal, financial or
        tax advice. All visits, payments, negotiations, agreements and background checks happen directly
        between users, who must carry out their own due diligence.
      </p>
      <p>
        To the fullest extent permitted by law, Rentlet, its operators, employees and developers are not
        liable for any loss, claim, penalty, data misuse or dispute — including fraud, impersonation,
        forged or misleading documents, unauthorised listings, account compromise, or failed
        transactions — arising from another user&apos;s conduct or from your own account and activity. You
        agree to indemnify Rentlet against claims brought against it because of content you post or
        actions you take on the platform.
      </p>
    </StaticPage>
  );
}
