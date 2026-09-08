import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sitemap" };

const GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Properties",
    links: [
      { label: "Rent", href: "/properties?listingType=rent" },
      { label: "Buy", href: "/properties?listingType=sale" },
      { label: "Sell / Post Property", href: "/post-property" },
      { label: "Land", href: "/properties?type=plot,land" },
      { label: "Commercial", href: "/properties?type=office,shop,showroom,warehouse" },
      { label: "PG", href: "/properties?type=pg" },
      { label: "Flatmates", href: "/properties?type=flatmate" },
      { label: "All Properties", href: "/properties" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Login", href: "/login" },
      { label: "Create Account", href: "/register" },
      { label: "Favorites", href: "/favorites" },
      { label: "Saved Searches", href: "/saved-searches" },
      { label: "Messages", href: "/messages" },
      { label: "Scheduled Visits", href: "/visits" },
      { label: "Owner Dashboard", href: "/owner/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Help & Legal",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "FAQs", href: "/#faq" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="container-rentlet max-w-4xl py-14 lg:py-20">
      <h1 className="text-3xl font-extrabold text-foreground lg:text-4xl">Sitemap</h1>
      <p className="mt-3 text-base text-muted-foreground">Every page on Rentlet, in one place.</p>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-navy">{group.title}</h2>
            <ul className="mt-3 flex flex-col gap-2">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-foreground/80 hover:text-brand-orange hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
