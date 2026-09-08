import Link from "next/link";
import { InstagramIcon, FacebookIcon, XIcon, YoutubeIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { Logo } from "@/components/ui/Logo";

// No "Download App" column — there is no Rentlet mobile app, so App Store/Play Store badges
// would be fake links. Every link below resolves to a real page (see /sitemap for the full
// list) — How It Works and FAQs point at the homepage sections' own anchor ids.
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Properties",
    links: [
      { label: "Rent", href: "/properties?listingType=rent" },
      { label: "Buy", href: "/properties?listingType=sale" },
      { label: "Sell", href: "/post-property" },
      { label: "Land", href: "/properties?type=plot,land" },
      { label: "Commercial", href: "/properties?type=office,shop,showroom,warehouse" },
      { label: "PG", href: "/properties?type=pg" },
      { label: "Flatmates", href: "/properties?type=flatmate" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "FAQs", href: "/#faq" },
      { label: "Site Map", href: "/sitemap" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Listing Terms", href: "/listing-terms" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", icon: FacebookIcon, href: "#" },
  { label: "Instagram", icon: InstagramIcon, href: "#" },
  { label: "X", icon: XIcon, href: "#" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "#" },
  { label: "YouTube", icon: YoutubeIcon, href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-brand-navy-dark text-white">
      <div className="container-rentlet grid gap-10 py-14 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div>
          <Logo className="h-14" />
          <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-white/50">
            YOUR SPACE. YOUR CHOICE.
          </p>
          <p className="mt-1.5 text-xs font-medium text-brand-orange">Serving India since 2026</p>
          <p className="mt-4 max-w-xs text-sm text-white/60">
            <span className="font-semibold text-white/80">Local Office (Kudlu Gate):</span> BMR Enclave,
            46/2, Kudlu Gate, Krishna Reddy Layout, Bengaluru, Karnataka.
          </p>
          <div className="mt-4 flex flex-col gap-1.5 text-sm text-white/70">
            <a href="tel:+919180105646" className="hover:text-white">+91 91801 05646</a>
            <a href="mailto:rentlet28@gmail.com" className="hover:text-white">rentlet28@gmail.com</a>
          </div>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-brand-orange hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-rentlet flex flex-col items-center justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Rentlet. All rights reserved.</p>
          <p>Made for India&apos;s next generation of home seekers and owners.</p>
        </div>
      </div>
    </footer>
  );
}
