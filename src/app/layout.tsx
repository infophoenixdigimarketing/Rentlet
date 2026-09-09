import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Toaster } from "@/components/ui/Toaster";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rentlet — Your Space. Your Choice.",
    template: "%s | Rentlet",
  },
  description:
    "Rentlet is a modern Indian real-estate marketplace for rent, sale, land, PG, flatmates and commercial properties — verified listings, direct owner contact.",
  keywords: [
    "real estate India",
    "property for rent",
    "property for sale",
    "flats for rent",
    "PG accommodation",
    "commercial property",
  ],
  openGraph: {
    title: "Rentlet — Your Space. Your Choice.",
    description:
      "Discover verified homes, apartments, villas, plots and commercial spaces across India.",
    siteName: "Rentlet",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rentlet — Your Space. Your Choice.",
    description: "Discover verified homes, apartments, villas, plots and commercial spaces across India.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SiteChrome>{children}</SiteChrome>
        <Toaster />
      </body>
    </html>
  );
}
