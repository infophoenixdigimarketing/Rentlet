import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = {
  title: "Listing Terms — Owners, Agents & Builders",
  description:
    "The rules for listing a property on Rentlet as an Owner, Agent/Broker or Builder/Developer — eligibility, accurate information, photos, pricing, prohibited activities and the declarations you accept.",
};

type Role = "owner" | "agent" | "builder";
const ROLE_TITLE: Record<Role, string> = {
  owner: "Listing Terms — Property Owner",
  agent: "Listing Terms — Agent / Broker",
  builder: "Listing Terms — Builder / Developer",
};

/* --------------------------------------------------------------------------- OWNER */
function OwnerTerms() {
  return (
    <>
      <h2>Terms for a Property Owner</h2>

      <p className="font-semibold text-foreground">Owner eligibility</p>
      <p>By selecting <strong>Owner</strong>, you confirm that:</p>
      <ul>
        <li>You are the legal owner of the property, or you have valid authorisation from the legal owner to post and manage it.</li>
        <li>You have the legal right to rent, lease or sell the property.</li>
        <li>You will not falsely claim ownership of a property.</li>
      </ul>
      <p>An Owner must not post another person&apos;s property without permission.</p>

      <p className="font-semibold text-foreground">Direct Owner / No Broker policy</p>
      <p>If you list as <strong>Direct Owner</strong> or <strong>No Broker</strong>, you confirm that:</p>
      <ul>
        <li>You are posting directly as the property owner.</li>
        <li>You are not hiding your identity as an agent or broker.</li>
        <li>No undisclosed brokerage fee will be charged.</li>
        <li>You will not redirect users to another broker or agent.</li>
        <li>You will not advertise an agent-managed property as an Owner property.</li>
      </ul>
      <ul>
        <li>A broker cannot create a fake Owner account.</li>
        <li>An agent cannot post under the Owner category.</li>
        <li>A property cannot be marked &ldquo;No Broker&rdquo; if a brokerage fee is secretly charged.</li>
      </ul>

      <p className="font-semibold text-foreground">Property information</p>
      <p>The Owner must provide accurate: property type, location, size, number of rooms and bathrooms, furnishing, amenities, parking, rent or selling price, security deposit, maintenance charges and availability date.</p>

      <p className="font-semibold text-foreground">Property photos</p>
      <ul>
        <li>Photos belong to the actual property and accurately represent it.</li>
        <li>Photos are not copied without permission and are not misleading.</li>
      </ul>
      <p>Fake or unrelated photos may result in the listing being removed.</p>

      <p className="font-semibold text-foreground">Pricing</p>
      <p>The Owner must clearly state rent or selling price, security deposit, maintenance charges, parking charges and any other compulsory charges. Hidden charges are not allowed.</p>

      <p className="font-semibold text-foreground">Property availability</p>
      <p>The Owner must update the listing when the property is rented, sold, leased or temporarily unavailable. An unavailable property should not stay active only to collect enquiries.</p>

      <p className="font-semibold text-foreground">Prohibited activities</p>
      <p>The Owner must not: post fake or duplicate properties; provide fake prices; use false photographs; pretend to be an Owner; hide brokerage charges; collect user information for spam; or mislead tenants or buyers.</p>

      <p className="font-semibold text-foreground">Declarations you accept</p>
      <ul>
        <li>I confirm that I am the legal Owner of this property, or am authorised to post it.</li>
        <li>I confirm that all property details and photographs are genuine.</li>
        <li>If I select &ldquo;No Broker&rdquo;, I confirm that no undisclosed brokerage fee will be charged.</li>
        <li>I agree to the Rentlet Terms &amp; Conditions.</li>
      </ul>
    </>
  );
}

/* --------------------------------------------------------------------------- BUILDER */
function BuilderTerms() {
  return (
    <>
      <h2>Terms for a Builder / Developer</h2>

      <p className="font-semibold text-foreground">Builder authorisation</p>
      <p>By selecting <strong>Builder / Developer</strong>, you confirm that you are the builder, developer or legally authorised representative of the project, that you have permission to advertise it, and that you have the legal right to sell, rent or promote the listed units.</p>

      <p className="font-semibold text-foreground">Project information</p>
      <p>The Builder must provide correct information about: project name, location, property type, number of available units, unit sizes, pricing, amenities, possession status, construction status, availability, parking and facilities. False project information must not be provided.</p>

      <p className="font-semibold text-foreground">Project images and media</p>
      <ul>
        <li>All images, videos, floor plans and brochures must represent the actual project and must be used with appropriate authorisation.</li>
        <li>Completed-property images and sample images must be clearly distinguished.</li>
        <li>Computer-generated images, sample images and artist impressions should be clearly identified where appropriate.</li>
      </ul>

      <p className="font-semibold text-foreground">Pricing and charges</p>
      <p>Builders must clearly disclose the applicable charges where relevant: base property price, booking amount, maintenance charges, parking charges, registration-related charges and other mandatory charges. A misleading price that excludes compulsory charges must not be advertised without reasonable disclosure.</p>

      <p className="font-semibold text-foreground">Construction status</p>
      <p>Builders must provide accurate information on under-construction / completed status, possession availability and the expected completion timeline. A false possession or completion date must not be provided.</p>

      <p className="font-semibold text-foreground">Unit availability</p>
      <p>Builders must keep reasonable accuracy on available, sold and reserved units and on pricing changes. Units no longer available must be updated.</p>

      <p className="font-semibold text-foreground">Prohibited activities</p>
      <p>Builders must not: advertise non-existent or fake projects; provide false possession dates; use misleading project images; show unavailable units as available; hide compulsory charges; provide false amenities; or misrepresent construction status.</p>

      <p className="font-semibold text-foreground">Builder responsibility</p>
      <p>The Builder is responsible for the project, pricing and construction information, property availability, uploaded media, and legal authorisation to advertise the project.</p>

      <p className="font-semibold text-foreground">Declarations you accept</p>
      <ul>
        <li>I confirm that I am the Builder / Developer or a legally authorised representative of this project.</li>
        <li>I confirm that the project details, prices, availability and construction information are accurate.</li>
        <li>I agree to the Rentlet Terms &amp; Conditions.</li>
      </ul>
    </>
  );
}

/* --------------------------------------------------------------------------- AGENT */
function AgentTerms() {
  return (
    <>
      <h2>Terms for an Agent / Broker</h2>

      <p className="font-semibold text-foreground">Agent identity</p>
      <p>By selecting <strong>Agent / Broker</strong>, you confirm that you are acting as a property agent, broker, consultant or authorised representative, that you will clearly identify yourself as an Agent, and that you will not pretend to be the Owner or create fake Owner accounts.</p>

      <p className="font-semibold text-foreground">Authorisation to post</p>
      <p>An Agent may post a property only with authorisation from the Owner or Builder, or where the Agent has legal authority to market the property. An Agent must not post a property without permission.</p>

      <p className="font-semibold text-foreground">&ldquo;No Broker&rdquo; category restriction</p>
      <p>Agents cannot post a property as <strong>Direct Owner</strong>, <strong>No Broker</strong> or <strong>Owner Listed</strong> unless Rentlet explicitly provides an authorised option for such representation and it is clearly disclosed. An Agent must clearly select <strong>Agent / Broker</strong>.</p>

      <p className="font-semibold text-foreground">Property information</p>
      <p>The Agent is responsible for providing accurate information received from the Owner or Builder and should verify, where reasonably possible, the location, price, availability, property type, amenities and photos. False information must not be provided intentionally.</p>

      <p className="font-semibold text-foreground">Brokerage and commission</p>
      <p>The Agent should clearly communicate applicable brokerage or commission arrangements where required. The Agent must not secretly charge additional brokerage, claim &ldquo;No Brokerage&rdquo; while charging commission, mislead users about service fees, or demand undisclosed charges.</p>

      <p className="font-semibold text-foreground">Property photos</p>
      <p>Agents must use genuine property photos, have authorisation to use uploaded media, not use photos of another property, and avoid misleading editing.</p>

      <p className="font-semibold text-foreground">Duplicate listings</p>
      <p>An Agent must not post the same property multiple times to manipulate search results. Rentlet may remove duplicate listings.</p>

      <p className="font-semibold text-foreground">Agent conduct</p>
      <p>Agents must communicate professionally and must not harass users, send spam, use abusive language, provide fraudulent information, pressure users into transactions, or collect unnecessary sensitive information.</p>

      <p className="font-semibold text-foreground">Declarations you accept</p>
      <ul>
        <li>I confirm that I am an authorised Agent / Broker for this property.</li>
        <li>I will clearly identify myself as an Agent and will not represent myself as the Owner.</li>
        <li>I will clearly disclose applicable brokerage or commission charges.</li>
        <li>I agree to the Rentlet Terms &amp; Conditions.</li>
      </ul>
    </>
  );
}

/* --------------------------------------------------------------------------- COMMON */
function CommonTerms() {
  return (
    <>
      <h2>Common terms for Owner, Builder &amp; Agent</h2>
      <ul>
        <li><strong>Accurate information</strong> — every user must provide accurate information.</li>
        <li><strong>Genuine property</strong> — every listing must be genuine and legally allowed to be advertised.</li>
        <li><strong>No fake listings</strong> — fake, misleading, duplicate or fraudulent listings are prohibited.</li>
        <li><strong>Correct contact information</strong> — users must provide valid contact details.</li>
        <li><strong>Listing updates</strong> — the person who posted the property must update it when information changes.</li>
        <li>
          <strong>Platform rights</strong> — Rentlet may review listings, request corrections, hide or remove fake or duplicate
          listings, restrict accounts, and suspend accounts involved in serious violations.
        </li>
      </ul>
    </>
  );
}

function DifferencesTable() {
  return (
    <>
      <h2>Key differences</h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="py-2 pr-3 font-semibold">Feature</th>
              <th className="py-2 pr-3 font-semibold">Owner</th>
              <th className="py-2 pr-3 font-semibold">Builder</th>
              <th className="py-2 font-semibold">Agent</th>
            </tr>
          </thead>
          <tbody className="[&_td]:py-2 [&_td]:pr-3 [&_tr]:border-b [&_tr]:border-border/60">
            <tr><td>Can post as Direct Owner</td><td>Yes</td><td>No</td><td>No</td></tr>
            <tr><td>Can select &ldquo;No Broker&rdquo;</td><td>Yes</td><td>No</td><td>No</td></tr>
            <tr><td>Can charge brokerage</td><td>No (as Direct Owner)</td><td>No</td><td>Yes, if properly disclosed</td></tr>
            <tr><td>Can post multiple properties</td><td>Yes</td><td>Yes (projects / units)</td><td>Yes (authorised properties)</td></tr>
            <tr><td>Needs owner / project authorisation</td><td>Own property</td><td>Project authority</td><td>Yes</td></tr>
            <tr><td>Can post under Owner category</td><td>Yes</td><td>No</td><td>No</td></tr>
            <tr><td>Must disclose professional role</td><td>Owner</td><td>Builder / Developer</td><td>Agent / Broker</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default async function ListingTermsPage(props: PageProps<"/listing-terms">) {
  const params = await props.searchParams;
  const raw = Array.isArray(params.role) ? params.role[0] : params.role;
  const role = (["owner", "agent", "builder"].includes(raw ?? "") ? raw : undefined) as Role | undefined;

  return (
    <StaticPage
      title={role ? ROLE_TITLE[role] : "Listing Terms — Owners, Agents & Builders"}
      subtitle={
        role
          ? "These terms apply when you post a property on Rentlet in this role. They are in addition to the general Terms & Conditions. Last updated September 2026."
          : "These terms apply when you post a property on Rentlet. They are in addition to the general Terms & Conditions. Last updated September 2026."
      }
    >
      {role === "owner" && <OwnerTerms />}
      {role === "agent" && <AgentTerms />}
      {role === "builder" && <BuilderTerms />}

      {!role && (
        <>
          <OwnerTerms />
          <BuilderTerms />
          <AgentTerms />
        </>
      )}

      <CommonTerms />
      {!role && <DifferencesTable />}
    </StaticPage>
  );
}
