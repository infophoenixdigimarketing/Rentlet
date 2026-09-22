import type { Metadata } from "next";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { StaticPage } from "@/components/layout/StaticPage";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <StaticPage title="Contact Us" subtitle="We usually respond within one business day.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <a href="mailto:rentlet28@gmail.com" className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 hover:border-brand-orange/40">
          <Mail className="h-5 w-5 shrink-0 text-brand-orange" />
          <span>
            <span className="block text-sm font-semibold text-foreground">Email</span>
            <span className="block text-xs text-muted-foreground">rentlet28@gmail.com</span>
          </span>
        </a>
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4">
          <Phone className="h-5 w-5 shrink-0 text-brand-orange" />
          <span>
            <span className="block text-sm font-semibold text-foreground">Phone</span>
            <a href="tel:+919180105646" className="block text-xs text-muted-foreground hover:text-brand-orange">
              +91 91801 05646
            </a>
            <a href="tel:+919894274168" className="block text-xs text-muted-foreground hover:text-brand-orange">
              +91 98942 74168
            </a>
          </span>
        </div>
        <a href="https://www.rentlet.in" className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 hover:border-brand-orange/40">
          <Globe className="h-5 w-5 shrink-0 text-brand-orange" />
          <span>
            <span className="block text-sm font-semibold text-foreground">Website</span>
            <span className="block text-xs text-muted-foreground">www.rentlet.in</span>
          </span>
        </a>
        <a
          // Name + coordinates still wasn't reliable enough to guarantee Maps resolves to this
          // exact registered listing ("Phoenix Ventures Group") — it can still fall back to a
          // bare/generic pin if the text doesn't match precisely. The "cid" link below is that
          // listing's own unique Google ID (decoded from the URL you get from Maps' own Share
          // button on the listing), which opens that exact place every time, unambiguously.
          href="https://www.google.com/maps?cid=764917165578611502"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3 rounded-2xl border border-border bg-white p-4 hover:border-brand-orange/40"
        >
          <MapPin className="h-5 w-5 shrink-0 text-brand-orange" />
          <span>
            <span className="block text-sm font-semibold text-foreground">Office</span>
            <span className="block text-xs text-muted-foreground">
              BMR Enclave, 46/2, Kudlu Gate, Krishna Reddy Layout, Hosapalaya, Muneshwara Nagar, Bengaluru, Karnataka 560068
            </span>
          </span>
        </a>
      </div>
      <p className="mt-2">
        For property-specific queries, use the Contact / Call / WhatsApp buttons on the listing itself —
        that reaches the owner directly and is usually faster.
      </p>
    </StaticPage>
  );
}
