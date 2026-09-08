import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Stamp, Truck, ShieldCheck } from "lucide-react";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = {
  title: "Rental Agreement",
  description:
    "Get a lawyer-verified rental agreement drafted, e-stamped and delivered — handled end to end by a RENTLET manager.",
};

const STEPS = [
  { icon: FileText, title: "Share the details", body: "Owner, tenant, rent, deposit and term — your RENTLET manager collects everything over a call." },
  { icon: ShieldCheck, title: "We draft & verify", body: "A standard, lawyer-reviewed agreement is prepared with your clauses added." },
  { icon: Stamp, title: "E-stamp & e-sign", body: "The agreement is e-stamped for your state and signed digitally by both parties." },
  { icon: Truck, title: "Delivered to you", body: "A signed PDF plus, where you want it, a printed copy couriered to your address." },
];

const INCLUDES = [
  "Parties, property address and 11-month term (renewable by mutual consent)",
  "Monthly rent, due date, security deposit and maintenance",
  "Lock-in period and notice period for either party",
  "Condition at handover, repairs and normal wear-and-tear",
  "Utility charges, property tax and society dues split",
  "Use restrictions, sub-letting and inspection rights",
];

export default function RentalAgreementPage() {
  return (
    <StaticPage
      title="Rental Agreement"
      subtitle="A lawyer-verified rent agreement, e-stamped and delivered — a RENTLET manager handles the whole process."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {STEPS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-border bg-white p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy-light text-brand-navy">
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-sm font-bold text-foreground">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>

      <h2>What the agreement covers</h2>
      <ul>
        {INCLUDES.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>

      <h2>Pricing</h2>
      <p>
        Charged per agreement and varies by state stamp duty and whether you want home delivery of a
        printed copy. Your RENTLET manager confirms the exact amount before anything is drafted — no
        payment is taken upfront.
      </p>

      <div className="rounded-2xl border border-brand-navy/15 bg-brand-navy-light/50 p-5">
        <p className="text-sm font-bold text-brand-navy">Ready to get your rental agreement?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Tell us about the tenancy and a RENTLET manager will call you to start the draft.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-dark"
          >
            Request rental agreement
          </Link>
          <Link
            href="/post-property"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Post a property instead
          </Link>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        This page is an overview of the service. The binding contract is the agreement signed by the
        owner and the tenant. See our{" "}
        <Link href="/terms" className="font-semibold text-brand-navy underline">
          Terms &amp; Conditions
        </Link>
        .
      </p>
    </StaticPage>
  );
}
