import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <StaticPage title="Careers at Rentlet" subtitle="We're building the most trusted real-estate marketplace in India.">
      <p>
        We&apos;re not actively hiring for specific roles right now, but we&apos;re always glad to hear from
        people who care about building honest, verified, well-designed products for renters, buyers and
        property owners.
      </p>
      <p>
        If that sounds like you, write to us at{" "}
        <a href="mailto:careers@rentlet.in" className="font-semibold text-brand-navy hover:text-brand-orange">
          careers@rentlet.in
        </a>{" "}
        with a bit about yourself and what you&apos;d want to work on.
      </p>
    </StaticPage>
  );
}
