import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Help Center" };

const TOPICS = [
  { q: "Is Rentlet free for tenants and buyers?", a: "Yes. Searching, saving properties, saved-search alerts and contacting owners is always free for tenants and buyers." },
  { q: "How does property verification work?", a: "Every listing goes through an identity, location and photo check before it's marked Verified and shown to searchers." },
  { q: "Do I need to pay brokerage?", a: "No — Rentlet connects you directly with the owner or agent. There's no brokerage fee for using the platform." },
  { q: "How do I list my property?", a: "Use \"Post Property\" in the header — it's a guided, step-by-step form and takes a few minutes." },
  { q: "Can I schedule a property visit online?", a: "Yes, from any property page — pick a date and time slot and the owner confirms it from their dashboard." },
];

export default function HelpPage() {
  return (
    <StaticPage title="Help Center" subtitle="Answers to the questions we hear most often.">
      {TOPICS.map((t) => (
        <div key={t.q}>
          <h2>{t.q}</h2>
          <p>{t.a}</p>
        </div>
      ))}
      <p className="mt-4">
        Still stuck?{" "}
        <Link href="/contact" className="font-semibold text-brand-navy hover:text-brand-orange">
          Contact us
        </Link>{" "}
        and we&apos;ll help directly.
      </p>
    </StaticPage>
  );
}
