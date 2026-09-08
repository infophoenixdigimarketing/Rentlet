import type { Metadata } from "next";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <StaticPage title="About Rentlet" subtitle="Your Space. Your Choice.">
      <p>
        Rentlet is a modern real-estate marketplace built for India — a single place to rent, buy, sell,
        and discover land, commercial spaces, PGs and flatmates, without brokerage games or fake listings.
      </p>
      <p>
        We verify property details and ownership before a listing goes live, connect tenants and buyers
        directly with owners and agents, and give owners the tools to manage leads, visits and enquiries
        from one dashboard.
      </p>
      <h2>What we stand for</h2>
      <ul>
        <li>Verified listings — identity, location and photos checked before publishing.</li>
        <li>Direct owner contact — no middlemen, no hidden brokerage.</li>
        <li>Transparent pricing — real rent, deposit and sale figures, no bait-and-switch.</li>
      </ul>
    </StaticPage>
  );
}
