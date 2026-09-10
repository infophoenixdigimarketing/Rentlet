"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Phone,
  MessageCircle,
  ShieldCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  BadgeIndianRupee,
  Zap,
  Users2,
  Quote,
  Building2,
  Home,
  Building,
  Layers,
  Castle,
  Hotel,
  DoorOpen,
  Trees,
  BedDouble,
  Store,
  ImagePlus,
  Plus,
  Video,
  X,
  MapPin,
  LocateFixed,
  type LucideIcon,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { authService } from "@/lib/services/auth.service";
import { submitProperty } from "@/lib/services/post-property.service";
import { notificationsService } from "@/lib/services/notifications.service";
import { allCities } from "@/lib/data/cities";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { initialWizardState, type WizardState } from "@/types/wizard";
import type { Furnishing, ListingType, Property, PropertyType } from "@/types/property";
import type { AuthUser } from "@/types/user";

/* ------------------------------------------------------------------ *
 *  Entry point — logged-out visitors see the lead form, then the OTP
 *  doubles as sign-in; once there's a session the multi-step wizard
 *  takes over. A "looking for property" account (tenant / buyer) can
 *  browse but not post — it has to sign in with a lister account.
 * ------------------------------------------------------------------ */
export default function PostPropertyPage() {
  const { user } = useAuth();
  if (!user) return <PostPropertyLanding />;
  if (user.role === "tenant" || user.role === "buyer") return <ListerOnlyGate />;
  return <PostPropertyWizard key={user.id} user={user} />;
}

function ListerOnlyGate() {
  const router = useRouter();
  async function switchAccount() {
    await authService.logout();
    router.push("/login?next=/post-property");
  }
  return (
    <div className="container-rentlet flex min-h-[60vh] items-center justify-center py-12">
      <div className="max-w-md rounded-2xl border border-border bg-white p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy-light text-brand-navy">
          <Building2 className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-lg font-bold text-foreground">This account is for browsing</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You signed in as someone looking for a property, so you can explore listings but not
          post one. To list a property, sign in with an owner, agent or builder account.
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={switchAccount}
            className={cn(buttonVariants({ variant: "primary", size: "md" }))}
          >
            Sign in to list a property
          </button>
          <Link href="/properties" className={cn(buttonVariants({ variant: "outline", size: "md" }))}>
            Browse properties instead
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== *
 *  STEP 0 — "Sell or Rent your Property For Free" lead form + OTP
 * ================================================================== */

const PROPERTY_KINDS = ["Residential", "Commercial", "Land/Plot"] as const;
type PropertyKind = (typeof PROPERTY_KINDS)[number];

const AD_TYPES: Record<PropertyKind, string[]> = {
  Residential: ["Rent", "Resale", "PG/Hostel", "Flatmates"],
  Commercial: ["Rent", "Resale"],
  "Land/Plot": ["Resale"],
};

const BENEFITS: { icon: LucideIcon; label: string }[] = [
  { icon: BadgeIndianRupee, label: "Zero Brokerage" },
  { icon: Zap, label: "Faster Tenants" },
  { icon: Users2, label: "10 lac tenants/buyers connections" },
];

const LEAD_FIELD =
  "h-12 w-full rounded-lg border border-border bg-white px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-navy";

// Dial codes offered on the mobile-number field (same set as ScheduleVisitModal).
const COUNTRY_CODES = [
  { code: "+91", label: "🇮🇳 +91" },
  { code: "+1", label: "🇺🇸 +1" },
  { code: "+44", label: "🇬🇧 +44" },
  { code: "+971", label: "🇦🇪 +971" },
  { code: "+65", label: "🇸🇬 +65" },
  { code: "+61", label: "🇦🇺 +61" },
  { code: "+49", label: "🇩🇪 +49" },
  { code: "+92", label: "🇵🇰 +92" },
  { code: "+880", label: "🇧🇩 +880" },
  { code: "+94", label: "🇱🇰 +94" },
  { code: "+977", label: "🇳🇵 +977" },
];

/** Picks carried from the lead form into the wizard, stashed through OTP sign-in. */
type PostIntent = {
  name: string;
  email: string;
  phone: string;
  city: string;
  kind: PropertyKind;
  adType: string;
  whatsappUpdates: boolean;
};

function PostPropertyLanding() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dialCode, setDialCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [kind, setKind] = useState<PropertyKind>("Residential");
  const [adType, setAdType] = useState("Rent");

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // +91 keeps the strict 10-digit rule; other countries accept 6–14 digits.
  const phoneComplete = dialCode === "+91" ? phone.length === 10 : phone.length >= 6 && phone.length <= 14;
  const otpReady = otpSent && otp.length === 6;

  // +91 numbers are exactly 10 digits — cap the input there; other codes allow up to 14.
  const maxPhoneLen = dialCode === "+91" ? 10 : 14;

  function changePhone(value: string) {
    setPhone(value.replace(/\D/g, "").slice(0, maxPhoneLen));
    setOtpSent(false);
    setOtp("");
  }

  function changeDialCode(code: string) {
    setDialCode(code);
    setPhone((p) => p.slice(0, code === "+91" ? 10 : 14));
    setOtpSent(false);
    setOtp("");
  }

  function changeKind(k: PropertyKind) {
    setKind(k);
    if (!AD_TYPES[k].includes(adType)) setAdType(AD_TYPES[k][0]);
  }

  async function sendOtp() {
    if (!phoneComplete)
      return toast(
        dialCode === "+91"
          ? "Enter a valid 10-digit mobile number first."
          : "Enter a valid mobile number (6–14 digits) first.",
        "error"
      );
    setSendingOtp(true);
    try {
      await authService.sendOtp(`${dialCode}${phone}`);
      setOtpSent(true);
      toast(`OTP sent to ${dialCode} ${phone}.`, "info");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Couldn't send OTP. Try again.", "error");
    } finally {
      setSendingOtp(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast("Enter your name.", "error");
    if (!phoneComplete)
      return toast(
        dialCode === "+91" ? "Mobile number must be exactly 10 digits." : "Enter a valid mobile number (6–14 digits).",
        "error"
      );
    if (!city) return toast("Select a city.", "error");
    if (!otpSent) return toast("Tap Send OTP first.", "error");
    if (otp.length !== 6) return toast("Enter the 6-digit OTP sent to your phone.", "error");

    setSubmitting(true);
    try {
      await authService.verifyOtp(`${dialCode}${phone}`, otp, { name: name.trim(), role: "owner" });
    } catch (err) {
      toast(err instanceof Error ? err.message : "Couldn't verify OTP. Try again.", "error");
      setSubmitting(false);
      return;
    }

    // Carry the picks into the wizard (read once on mount to pre-fill / build the listing).
    const intent: PostIntent = {
      name: name.trim(),
      email: email.trim(),
      phone: `${dialCode} ${phone.trim()}`,
      city,
      kind,
      adType,
      whatsappUpdates,
    };
    try {
      sessionStorage.setItem("rentlet:post-intent", JSON.stringify(intent));
    } catch {
      /* private mode — wizard just starts empty */
    }
    // useAuth now reports a user, so PostPropertyPage swaps in the wizard.
  }

  return (
    <div className="container-rentlet py-8 pb-16">
      <div className="mb-6 flex items-start justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
          Sell or Rent your Property <span className="text-brand-orange">For Free</span>
        </h1>
        <Link
          href="/properties"
          className="mt-1 shrink-0 text-sm font-semibold text-brand-navy hover:underline"
        >
          Looking for a property? <span className="underline">Click Here</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 rounded-2xl border border-border bg-white p-5 sm:p-8 lg:grid-cols-[280px_1fr]">
        {/* Left — why post through us + testimonial */}
        <aside className="lg:border-r lg:border-border lg:pr-8">
          <h2 className="text-base font-extrabold text-foreground">Why Post through us?</h2>
          <ul className="mt-4 flex flex-col gap-4">
            {BENEFITS.map((b) => (
              <li key={b.label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-navy-light text-brand-navy">
                  <b.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-foreground">{b.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-border pt-6">
            <p className="text-lg font-extrabold text-foreground">30 Lac+ Home Owners Trust Us</p>
            <Quote className="mt-3 h-5 w-5 text-brand-orange" />
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              The service I got was very helpful. Comparing this site to others, Rentlet gets
              more tenants by using the right property advertisements. Friendly and productive
              service from the team — I got a good tenant in just 8 days for my place.
            </p>
            <p className="mt-3 text-sm font-bold text-foreground">
              Anil Kant <span className="font-medium text-muted-foreground">| Chennai</span>
            </p>
          </div>
        </aside>

        {/* Right — lead form */}
        <form onSubmit={submit} className="min-w-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className={LEAD_FIELD}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email like name@gmail.com"
              className={LEAD_FIELD}
            />

            <span className="flex items-stretch">
              <select
                aria-label="Country code"
                value={dialCode}
                onChange={(e) => changeDialCode(e.target.value)}
                className="rounded-l-lg border border-r-0 border-border bg-muted px-2 text-sm font-semibold text-muted-foreground outline-none focus:border-brand-navy"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={maxPhoneLen}
                value={phone}
                onChange={(e) => changePhone(e.target.value)}
                placeholder="Mobile Number"
                aria-invalid={phone.length > 0 && !phoneComplete}
                className={cn(LEAD_FIELD, "rounded-l-none")}
              />
            </span>

            <CityPicker
              value={city}
              onChange={setCity}
              triggerClassName={cn(LEAD_FIELD, "flex items-center gap-2")}
            />
          </div>

          <label className="mt-4 flex items-center gap-2.5 text-sm text-foreground">
            <input
              type="checkbox"
              checked={whatsappUpdates}
              onChange={(e) => setWhatsappUpdates(e.target.checked)}
              className="h-4 w-4 rounded border-border accent-emerald-600"
            />
            <span className="inline-flex items-center gap-1.5">
              Get updates on <MessageCircle className="h-4 w-4 text-emerald-600" /> WhatsApp
            </span>
          </label>

          {/* Property type */}
          <p className="mt-7 text-sm font-semibold text-foreground">Property type</p>
          <div className="mt-2 flex flex-wrap gap-2 border-b border-border">
            {PROPERTY_KINDS.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => changeKind(k)}
                className={cn(
                  "-mb-px inline-flex items-center gap-1.5 border-b-2 px-1 pb-2 text-sm font-bold transition-colors",
                  kind === k
                    ? "border-brand-navy text-brand-navy"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {k}
                {k === "Land/Plot" && (
                  <span className="rounded bg-brand-orange-light px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand-orange-dark">
                    New
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Ad type */}
          <p className="mt-5 text-sm font-semibold text-foreground">Select Property Ad Type</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {AD_TYPES[kind].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAdType(a)}
                className={cn(
                  "rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors",
                  adType === a
                    ? "border-brand-navy bg-brand-navy text-white"
                    : "border-border text-foreground hover:bg-muted"
                )}
              >
                {a}
              </button>
            ))}
          </div>

          {/* OTP */}
          <div className="mt-7 flex flex-col gap-3 rounded-xl bg-muted/40 p-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground/80">Verify your number</p>
              <button
                type="button"
                onClick={sendOtp}
                disabled={!phoneComplete || otpSent || sendingOtp}
                className="mt-1.5 rounded-lg border border-brand-navy px-4 py-2 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent"
              >
                {sendingOtp ? "Sending..." : otpSent ? "OTP sent" : "Send OTP"}
              </button>
            </div>
            {otpSent && (
              <label className="flex flex-1 flex-col gap-1.5">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Enter OTP
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="6-digit OTP"
                  className={cn(LEAD_FIELD, "h-10", otpReady && "border-emerald-500 focus:border-emerald-500")}
                />
              </label>
            )}
          </div>

          <button
            type="submit"
            disabled={!otpReady || submitting}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-6 w-full sm:w-auto")}
          >
            {submitting ? "Verifying..." : "Start posting for FREE"}
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-3 text-xs text-muted-foreground">
            Not getting the OTP?{" "}
            <Link href="/register?next=/post-property" className="font-semibold text-brand-navy hover:underline">
              Sign up with email or Google
            </Link>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Existing user?{" "}
            <Link href="/login?next=/post-property" className="font-semibold text-brand-navy hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

/* ================================================================== *
 *  POST-LOGIN — multi-step wizard
 * ================================================================== */

const PROPERTY_TYPES: { label: string; icon: LucideIcon; tint: string }[] = [
  { label: "Apartment", icon: Building2, tint: "bg-indigo-50 text-indigo-600" },
  { label: "Independent House", icon: Home, tint: "bg-emerald-50 text-emerald-600" },
  { label: "Duplex", icon: Building, tint: "bg-sky-50 text-sky-600" },
  { label: "Independent Floor", icon: Layers, tint: "bg-violet-50 text-violet-600" },
  { label: "Villa", icon: Castle, tint: "bg-amber-50 text-amber-600" },
  { label: "Penthouse", icon: Hotel, tint: "bg-rose-50 text-rose-600" },
  { label: "Studio", icon: DoorOpen, tint: "bg-cyan-50 text-cyan-600" },
  { label: "Farm House", icon: Trees, tint: "bg-green-50 text-green-600" },
  { label: "PG", icon: BedDouble, tint: "bg-fuchsia-50 text-fuchsia-600" },
  { label: "Commercial", icon: Store, tint: "bg-orange-50 text-orange-600" },
];

// Card label -> the PropertyType the rest of the app understands.
const CATEGORY_FROM_LABEL: Record<string, PropertyType> = {
  Apartment: "apartment",
  "Independent House": "independent_house",
  Duplex: "independent_house",
  "Independent Floor": "independent_house",
  Villa: "villa",
  Penthouse: "apartment",
  Studio: "apartment",
  "Farm House": "villa",
  PG: "pg",
  Commercial: "office",
};

const STEPS = ["Property Details", "Photos & Schedule", "Price Details"] as const;

const AMENITY_OPTIONS = [
  "Lift",
  "Air Conditioning",
  "Internet / Wi-Fi",
  "Children's Play Area",
  "Servant Room",
  "Gas Pipeline",
  "Rainwater Harvesting",
  "Housekeeping",
  "Visitor Parking",
  "Club House",
  "Swimming Pool",
  "Fire Safety",
  "Shopping Center",
  "Power Backup",
];
const DAY_OPTIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const VISIT_TIME_OPTIONS = ["Morning (9–12)", "Afternoon (12–4)", "Evening (4–8)"];
const MAX_PHOTOS = 12;

type MediaItem = { id: string; url: string; name: string };

// You can offer a property for Rent, Lease or Sale here — "Buy" is a seeker action, not a listing.
const LOOKING_TO = ["Rent", "Lease", "Sell"] as const;
type LookingTo = (typeof LOOKING_TO)[number];

const UNDERLINE_FIELD =
  "w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-navy";

type FormState = {
  lookingTo: LookingTo;
  name: string;
  city: string;
  propertyType: string | null;
  projectName: string;
  location: string;
  bhk: string;
  bathrooms: string;
  balconies: string;
  waterSupply: string;
  condition: string;
  floor: string;
  totalFloors: string;
  propertyAge: string;
  facing: string;
  builtUpArea: string;
  furnishing: string;
  parking: string;
  availableFrom: string;
  preferredTenants: string;
  petsAllowed: string;
  description: string;
  deposit: string;
  membersAllowed: string;
  expectedPrice: string;
  leaseYears: string;
  maintenance: string;
  negotiable: boolean;
  allInclusive: boolean;
  wantAgreement: boolean;
  agreeTerms: boolean;
  // Agent-only — whose property this is
  agentOwnerName: string;
  agentOwnerDial: string;
  agentOwnerPhone: string;
  agentLicense: string;
  // Builder-only — project-level details
  projectRera: string;
  possessionDate: string;
  totalUnits: string;
  photos: MediaItem[];
  video: MediaItem | null;
  amenities: string[];
  visitDays: string[];
  visitTime: string;
  mapLink: string;
};

/** Pull a lat,lng out of a pasted Google Maps URL (several link shapes). */
function parseLatLng(url: string): { lat: number; lng: number } | null {
  const patterns = [
    /@(-?\d+\.\d+),(-?\d+\.\d+)/,
    /[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/,
    /[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/,
    /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/,
    /(-?\d{1,3}\.\d{4,}),\s*(-?\d{1,3}\.\d{4,})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return { lat: parseFloat(m[1]), lng: parseFloat(m[2]) };
  }
  return null;
}

// Old / short / common alternate names → the canonical city in `allCities`. Lets a partial
// like "ban" or "bangalore" surface "Bengaluru".
const CITY_ALIASES: Record<string, string> = {
  bangalore: "Bengaluru",
  bengaluru: "Bengaluru",
  bombay: "Mumbai",
  madras: "Chennai",
  calcutta: "Kolkata",
  poona: "Pune",
  gurgaon: "Gurugram",
  vizag: "Visakhapatnam",
  vishakhapatnam: "Visakhapatnam",
  cochin: "Kochi",
  trivandrum: "Thiruvananthapuram",
  mysore: "Mysuru",
  mangalore: "Mangaluru",
  calicut: "Kozhikode",
  pondicherry: "Puducherry",
  baroda: "Vadodara",
  benares: "Varanasi",
  banaras: "Varanasi",
  allahabad: "Prayagraj",
  gauhati: "Guwahati",
  nasik: "Nashik",
  cawnpore: "Kanpur",
  simla: "Shimla",
  belgaum: "Belagavi",
  hubli: "Hubballi",
  gulbarga: "Kalaburagi",
  bellary: "Ballari",
  tuticorin: "Thoothukudi",
  trichy: "Tiruchirappalli",
  ooty: "Udhagamandalam",
  "delhi": "Delhi NCR",
  "new delhi": "Delhi NCR",
  ncr: "Delhi NCR",
};

/** Click-to-open city dropdown — shows the full list; typing just filters it. */
function CityPicker({
  value,
  onChange,
  triggerClassName,
}: {
  value: string;
  onChange: (city: string) => void;
  /** Override the trigger button styling (e.g. the boxed lead form vs. the underline wizard field). */
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const q = query.trim().toLowerCase();
  // Canonical names reachable from what's typed via an alias (e.g. "ban" → Bengaluru).
  const aliasHits = q
    ? Object.entries(CITY_ALIASES)
        .filter(([alias]) => alias.includes(q) || q.includes(alias))
        .map(([, canonical]) => canonical.toLowerCase())
    : [];
  const list = q
    ? allCities
        .filter((c) => {
          const n = c.name.toLowerCase();
          return n.includes(q) || c.state.toLowerCase().includes(q) || aliasHits.includes(n);
        })
        // Best matches first: name starts with what was typed, then name contains it,
        // then state-only matches — so a short "nage" surfaces Nagercoil/Nagaon quickly.
        .sort((a, b) => {
          const an = a.name.toLowerCase();
          const bn = b.name.toLowerCase();
          const rank = (n: string) => (n.startsWith(q) ? 0 : n.includes(q) ? 1 : 2);
          return rank(an) - rank(bn) || an.localeCompare(bn);
        })
    : allCities;
  // Let the owner type a city that isn't in the list.
  const typed = query.trim();
  const canAddTyped =
    typed.length >= 2 &&
    aliasHits.length === 0 &&
    !allCities.some((c) => c.name.toLowerCase() === typed.toLowerCase());

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={
          triggerClassName ??
          "flex w-full items-center gap-2 border-b border-border py-2 text-left outline-none focus:border-brand-navy"
        }
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <span className={cn("flex-1 text-left text-base", value ? "text-foreground" : "text-muted-foreground/70")}>
          {value || "Select City"}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
          <div className="flex items-center gap-2 border-b border-border px-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter cities..."
              className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground/70"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto py-1">
            {canAddTyped && (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onChange(typed);
                    setQuery("");
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-semibold text-brand-navy hover:bg-brand-navy-light/50"
                >
                  <Plus className="h-4 w-4 shrink-0" />
                  Use &ldquo;{typed}&rdquo; <span className="text-xs font-normal text-muted-foreground">— other city</span>
                </button>
              </li>
            )}
            {list.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(c.name);
                    setQuery("");
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-muted",
                    value === c.name && "font-semibold text-brand-navy"
                  )}
                >
                  <span>{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.state}</span>
                </button>
              </li>
            ))}
            {list.length === 0 && !canAddTyped && (
              <li className="px-4 py-3 text-sm text-muted-foreground">Type at least 2 letters to add a city.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// Popular localities per city — used to suggest as the owner types the Location.
// Keys must match a city name in allCities exactly. Cities without an entry here simply
// get no locality suggestions (the field stays free-text).
const CITY_LOCALITIES: Record<string, string[]> = {
  Bengaluru: [
    "Whitefield", "Electronic City", "Koramangala", "Indiranagar", "HSR Layout", "Marathahalli",
    "Sarjapur Road", "Jayanagar", "JP Nagar", "Hebbal", "Yelahanka", "Bellandur", "BTM Layout",
    "Banashankari", "Malleshwaram", "Rajajinagar", "KR Puram", "Bannerghatta Road",
  ],
  Mumbai: [
    "Andheri", "Bandra", "Powai", "Malad", "Goregaon", "Borivali", "Thane", "Chembur", "Dadar",
    "Juhu", "Vashi", "Kharghar", "Mulund", "Ghatkopar", "Worli", "Lower Parel",
  ],
  Chennai: [
    "Adyar", "Velachery", "T. Nagar", "Anna Nagar", "OMR", "Porur", "Tambaram", "Perungudi",
    "Sholinganallur", "Nungambakkam", "Guindy", "Mylapore", "Chromepet",
  ],
  Hyderabad: [
    "Gachibowli", "Madhapur", "HITEC City", "Kondapur", "Kukatpally", "Miyapur", "Banjara Hills",
    "Jubilee Hills", "Manikonda", "Begumpet", "Ameerpet", "LB Nagar", "Uppal",
  ],
  "Delhi NCR": [
    "Dwarka", "Rohini", "Saket", "Noida Sector 62", "Indirapuram", "Gurgaon Sector 56", "Vaishali",
    "Lajpat Nagar", "Janakpuri", "Greater Noida", "Faridabad", "Karol Bagh",
  ],
  Pune: [
    "Hinjewadi", "Wakad", "Baner", "Kothrud", "Viman Nagar", "Kharadi", "Hadapsar", "Aundh",
    "Magarpatta", "Wagholi", "Pimple Saudagar", "Katraj",
  ],
  Kolkata: [
    "Salt Lake", "New Town", "Ballygunge", "Rajarhat", "Behala", "Garia", "Dum Dum", "Howrah",
    "Tollygunge", "Park Street",
  ],
  Coimbatore: [
    "RS Puram", "Peelamedu", "Saibaba Colony", "Gandhipuram", "Race Course", "Singanallur",
    "Vadavalli", "Ganapathy",
  ],
  Ahmedabad: [
    "Satellite", "Bopal", "Vastrapur", "Prahlad Nagar", "Maninagar", "Chandkheda", "Navrangpura",
    "SG Highway", "Bodakdev", "Gota",
  ],
  Kochi: [
    "Kakkanad", "Edappally", "Vyttila", "Palarivattom", "Aluva", "Marine Drive",
    "Panampilly Nagar", "Kaloor", "Tripunithura",
  ],
};

/** Free-text locality input that suggests popular areas for the chosen city. */
function LocalityInput({
  city,
  value,
  onChange,
}: {
  city: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const all = CITY_LOCALITIES[city.trim()] ?? [];

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const q = value.trim().toLowerCase();
  const matches = all.filter((l) => l.toLowerCase().includes(q) && l.toLowerCase() !== q).slice(0, 8);

  return (
    <div ref={ref} className="relative">
      <span className="flex items-center gap-2 border-b border-border focus-within:border-brand-navy">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={
            all.length ? `Area in ${city.trim()} — e.g. ${all[0]}` : "Area, locality or landmark"
          }
          className="w-full border-0 bg-transparent py-2 text-base text-foreground outline-none placeholder:text-muted-foreground/70"
        />
      </span>
      {open && matches.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border border-border bg-white py-1 shadow-lg">
          {matches.map((l) => (
            <li key={l}>
              <button
                type="button"
                onClick={() => {
                  onChange(l);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm hover:bg-muted"
              >
                <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                {l}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const BHK_OPTIONS = ["1 RK", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"];
const FLOOR_OPTIONS = ["Basement", "Lower Ground", "Ground", ...Array.from({ length: 40 }, (_, i) => String(i + 1))];
const AGE_OPTIONS = ["Under construction", "0-1 years", "1-5 years", "5-10 years", "10+ years"];
const BATHROOM_OPTIONS = ["1", "2", "3", "4", "5+"];
const BALCONY_OPTIONS = ["0", "1", "2", "3", "4+"];
const WATER_SUPPLY_OPTIONS = ["Municipal", "Borewell", "Both"];
const CONDITION_OPTIONS = ["Ready to Move", "Newly Renovated", "Well Maintained", "Needs Renovation"];
const FURNISHING_OPTIONS = ["Unfurnished", "Semi Furnished", "Fully Furnished"];
const PARKING_OPTIONS = ["None", "Bike", "Car", "Bike & Car"];
const TENANT_OPTIONS = ["Anyone", "Family", "Bachelors", "Company"];

const FURNISHING_MAP: Record<string, Furnishing> = {
  Unfurnished: "unfurnished",
  "Semi Furnished": "semi_furnished",
  "Fully Furnished": "fully_furnished",
};
const FACING_OPTIONS = [
  "East",
  "West",
  "North",
  "South",
  "North-East",
  "North-West",
  "South-East",
  "South-West",
  "Don't Know",
];

const SELECT_CLASS =
  "w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-2 text-base text-foreground outline-none transition-colors focus:border-brand-navy";

/** Underline-styled native <select> — click shows the whole option list. */
function Select({
  value,
  onChange,
  options,
  placeholder = "Select",
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(SELECT_CLASS, !value && "text-muted-foreground/70")}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-foreground">
        {label}
        {required && <span className="text-brand-orange"> *</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

/** Row of single-select pill buttons. */
function PillGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
            value === o
              ? "border-brand-navy bg-brand-navy text-white"
              : "border-border text-muted-foreground hover:bg-muted"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/** ₹-prefixed numeric input on an underline. */
function MoneyInput({
  value,
  onChange,
  placeholder = "Enter amount",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <span className="flex items-center gap-2 border-b border-border focus-within:border-brand-navy">
      <span className="text-base font-semibold text-muted-foreground">₹</span>
      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
        placeholder={placeholder}
        className="w-full border-0 bg-transparent py-2 text-base text-foreground outline-none placeholder:text-muted-foreground/70"
      />
    </span>
  );
}

function readIntent(): Partial<PostIntent> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem("rentlet:post-intent");
    if (!raw) return {};
    window.sessionStorage.removeItem("rentlet:post-intent");
    return JSON.parse(raw) as Partial<PostIntent>;
  } catch {
    return {};
  }
}

function PostPropertyWizard({ user }: { user: AuthUser }) {
  const [intent] = useState<Partial<PostIntent>>(() => readIntent());
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(() => ({
    lookingTo: intent.adType === "Resale" ? "Sell" : "Rent",
    name: intent.name?.trim() ?? "",
    city: intent.city ?? "",
    propertyType: null,
    projectName: "",
    location: "",
    bhk: "",
    bathrooms: "",
    balconies: "",
    waterSupply: "",
    condition: "",
    floor: "",
    totalFloors: "",
    propertyAge: "",
    facing: "",
    builtUpArea: "",
    furnishing: "",
    parking: "",
    availableFrom: "",
    preferredTenants: "",
    petsAllowed: "",
    description: "",
    deposit: "",
    membersAllowed: "",
    expectedPrice: "",
    leaseYears: "",
    maintenance: "",
    negotiable: false,
    allInclusive: false,
    wantAgreement: false,
    agreeTerms: false,
    agentOwnerName: "",
    agentOwnerDial: "+91",
    agentOwnerPhone: "",
    agentLicense: "",
    projectRera: "",
    possessionDate: "",
    totalUnits: "",
    photos: [],
    video: null,
    amenities: [],
    visitDays: [],
    visitTime: "",
    mapLink: "",
  }));
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<Property | null>(null);
  const [customAmenity, setCustomAmenity] = useState("");

  // Owner / Agent / Builder — drives the intro banner + which extra fields show in step 1.
  const role = user.role;
  const roleIntro =
    role === "agent"
      ? { title: "Listing on behalf of an owner", hint: "Add the owner's details below — buyers still contact RENTLET, not the owner directly." }
      : role === "builder"
        ? { title: "Listing a new project / development", hint: "Give the project name, RERA ID and possession date so buyers see it's a fresh launch." }
        : { title: "Listing your own property", hint: "You're the owner — your contact stays private and verified." };

  function addCustomAmenity() {
    const v = customAmenity.trim();
    if (!v) return;
    setForm((prev) =>
      prev.amenities.some((a) => a.toLowerCase() === v.toLowerCase())
        ? prev
        : { ...prev, amenities: [...prev.amenities, v] }
    );
    setCustomAmenity("");
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // Rent and Lease share the same fields (monthly amount, deposit, availability, tenants).
  const rentLike = form.lookingTo === "Rent" || form.lookingTo === "Lease";

  function addPhotos(files: FileList | null) {
    if (!files?.length) return;
    const items: MediaItem[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        url: URL.createObjectURL(f),
        name: f.name,
      }));
    setForm((prev) => ({ ...prev, photos: [...prev.photos, ...items].slice(0, MAX_PHOTOS) }));
  }
  function removePhoto(id: string) {
    setForm((prev) => {
      const gone = prev.photos.find((p) => p.id === id);
      if (gone) URL.revokeObjectURL(gone.url);
      return { ...prev, photos: prev.photos.filter((p) => p.id !== id) };
    });
  }
  function chooseVideo(files: FileList | null) {
    const f = files?.[0];
    if (!f) return;
    setForm((prev) => {
      if (prev.video) URL.revokeObjectURL(prev.video.url);
      return {
        ...prev,
        video: { id: "video", url: URL.createObjectURL(f), name: f.name },
      };
    });
  }
  function clearVideo() {
    setForm((prev) => {
      if (prev.video) URL.revokeObjectURL(prev.video.url);
      return { ...prev, video: null };
    });
  }
  function toggleDay(d: string) {
    setForm((prev) => ({
      ...prev,
      visitDays: prev.visitDays.includes(d)
        ? prev.visitDays.filter((x) => x !== d)
        : [...prev.visitDays, d],
    }));
  }
  function toggleAmenity(a: string) {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(a)
        ? prev.amenities.filter((x) => x !== a)
        : [...prev.amenities, a],
    }));
  }
  function useCurrentLocation() {
    if (!navigator.geolocation) {
      toast("Location isn't available in this browser — paste a map link instead.", "error");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        set(
          "mapLink",
          `https://www.google.com/maps?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`
        );
        toast("Location captured.");
      },
      () => toast("Couldn't read your location. Paste a Google Maps link instead.", "error")
    );
  }

  const progress = submitted ? 100 : [5, 45, 75][step] ?? 5;

  // Fold the lead-form picks + the two wizard steps into a real WizardState so the
  // shared submitProperty() pipeline lands it in search, the owner dashboard and the
  // admin moderation queue.
  function buildWizardState(): WizardState {
    const listingType: ListingType = rentLike ? "rent" : "sale";
    const dealLabel = rentLike ? form.lookingTo : "Sale";
    const category: PropertyType =
      intent.kind === "Land/Plot"
        ? "plot"
        : intent.kind === "Commercial"
          ? "office"
          : CATEGORY_FROM_LABEL[form.propertyType ?? "Apartment"] ?? "apartment";
    const cityRow = allCities.find((c) => c.name === form.city.trim());
    const cityName = form.city.trim();
    const locality = form.location.trim() || form.projectName.trim() || cityName;
    const bedrooms = form.bhk === "1 RK" ? 0 : parseInt(form.bhk, 10) || null;
    const bhkLabel = form.bhk ? `${form.bhk} ` : "";
    const isRent = rentLike;

    const parkingAmenities =
      form.parking === "Bike"
        ? ["Bike Parking"]
        : form.parking === "Car"
          ? ["Car Parking"]
          : form.parking === "Bike & Car"
            ? ["Bike Parking", "Car Parking"]
            : [];

    // User's own copy leads; the structured picks are appended so nothing is lost.
    const autoParts = [
      `${bhkLabel}${form.propertyType} available for ${dealLabel.toLowerCase()} in ${locality}, ${cityName}.`,
    ];
    if (isRent && form.membersAllowed) autoParts.push(`Suitable for up to ${form.membersAllowed} members.`);
    if (form.lookingTo === "Lease" && form.leaseYears)
      autoParts.push(`Lease term: ${form.leaseYears} year${form.leaseYears === "1" ? "" : "s"}.`);
    if (form.lookingTo === "Lease" && form.deposit)
      autoParts.push(`Lease deposit: ₹${form.deposit}.`);
    if (form.furnishing) autoParts.push(`${form.furnishing}.`);
    if (form.condition) autoParts.push(`Condition: ${form.condition}.`);
    if (form.waterSupply) autoParts.push(`${form.waterSupply} water supply.`);
    if (form.parking && form.parking !== "None") autoParts.push(`${form.parking} parking.`);
    if (isRent && form.availableFrom) autoParts.push(`Available from ${form.availableFrom}.`);
    if (isRent && form.preferredTenants) autoParts.push(`Preferred tenants: ${form.preferredTenants}.`);
    if (isRent && form.petsAllowed) autoParts.push(`Pets ${form.petsAllowed === "Yes" ? "allowed" : "not allowed"}.`);
    if (form.visitDays.length)
      autoParts.push(
        `Visits: ${form.visitDays.join(", ")}${form.visitTime ? ` (${form.visitTime})` : ""}.`
      );
    // Role-specific notes
    if (role === "agent") {
      autoParts.push(
        `Listed by agent ${form.name.trim() || "RENTLET partner"}${form.agentLicense.trim() ? ` (ID: ${form.agentLicense.trim()})` : ""}.`
      );
    }
    if (role === "builder") {
      const parts = [];
      if (form.projectName.trim()) parts.push(`project "${form.projectName.trim()}"`);
      if (form.projectRera.trim()) parts.push(`RERA ${form.projectRera.trim()}`);
      if (form.possessionDate.trim()) parts.push(`possession ${form.possessionDate.trim()}`);
      if (form.totalUnits.trim()) parts.push(`${form.totalUnits.trim()} units`);
      autoParts.push(`New project by ${form.name.trim() || "the builder"}${parts.length ? ` — ${parts.join(", ")}` : ""}.`);
    }
    if (form.mapLink.trim()) autoParts.push(`Map: ${form.mapLink.trim()}`);
    const pin = parseLatLng(form.mapLink);
    const description = [
      form.description.trim(),
      ...autoParts,
      "Contact the owner for full details, photos and a site visit.",
    ]
      .filter(Boolean)
      .join(" ");

    return {
      ...initialWizardState,
      listingType,
      category,
      state: cityRow?.state ?? "",
      city: cityName,
      locality,
      bedrooms,
      bathrooms: parseInt(form.bathrooms, 10) || null,
      balconies: form.balconies === "" ? null : parseInt(form.balconies, 10) || 0,
      floor: form.floor,
      totalFloors: form.totalFloors,
      builtUpArea: form.builtUpArea,
      facing: form.facing || null,
      propertyAge: form.propertyAge || null,
      latitude: pin?.lat ?? initialWizardState.latitude,
      longitude: pin?.lng ?? initialWizardState.longitude,
      furnishing: FURNISHING_MAP[form.furnishing] ?? null,
      amenities: [...new Set([...parkingAmenities, ...form.amenities])],
      rent: listingType === "rent" ? form.expectedPrice : "",
      price: listingType === "sale" ? form.expectedPrice : "",
      deposit: isRent ? form.deposit : "",
      maintenance: form.maintenance,
      negotiable: form.negotiable,
      title: `${bhkLabel}${form.propertyType} for ${dealLabel} in ${form.projectName.trim() || cityName}`,
      description,
      // For an agent listing, the owner-facing name/phone is the actual owner, not the agent.
      ownerName: role === "agent" && form.agentOwnerName.trim() ? form.agentOwnerName.trim() : form.name.trim(),
      ownerPhone:
        role === "agent" && form.agentOwnerPhone.trim()
          ? `${form.agentOwnerDial} ${form.agentOwnerPhone.trim()}`
          : intent.phone
            ? intent.phone.trim().startsWith("+")
              ? intent.phone.trim()
              : `+91 ${intent.phone.trim()}`
            : user.phone ?? "",
      ownerEmail: intent.email ?? "",
    };
  }

  async function next() {
    if (step === 0) {
      if (!form.name.trim()) return toast("Enter your name to continue.", "error");
      if (!form.city.trim()) return toast("Search and pick a city to continue.", "error");
      if (!form.propertyType) return toast("Choose a property type to continue.", "error");
      if (!form.bhk) return toast("Choose a BHK type to continue.", "error");
      if (!form.builtUpArea.trim()) return toast("Enter the built-up area to continue.", "error");
      setStep(1);
      return;
    }
    if (step === 1) {
      setStep(2);
      return;
    }
    if (!form.expectedPrice.trim()) return toast("Enter an expected price to continue.", "error");
    if (form.lookingTo === "Lease" && !form.leaseYears.trim())
      return toast("Enter the lease duration in years to continue.", "error");
    if (!form.agreeTerms)
      return toast("Please accept the Terms & Conditions before submitting.", "error");

    setSubmitting(true);
    try {
      const wizardState = buildWizardState();
      const property = await submitProperty(wizardState, user);
      // Fire-and-forget confirmation emails (owner + admin). No-ops when SMTP isn't
      // configured on the server; never allowed to fail the submission.
      void fetch("/api/notify-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingTitle: property.title,
          city: property.city,
          listingType: property.listingType,
          ownerName: wizardState.ownerName || user.name,
          ownerEmail: wizardState.ownerEmail || user.email || "",
          ownerPhone: wizardState.ownerPhone || user.phone || "",
          propertyId: property.id,
          slug: property.slug,
        }),
      }).catch(() => {});
      // buildProperty() hard-codes availableFrom "Immediate"; honour the picked date if any.
      if (rentLike && form.availableFrom) property.availableFrom = form.availableFrom;
      // Mock submit doesn't upload media — splice in the local object URLs so the owner
      // sees their own photos on the listing for the rest of the session.
      if (form.photos.length) property.images = form.photos.map((p) => p.url);
      if (form.video) property.videos = [form.video.url];
      // Owner opted into RENTLET's rental agreement service — flag it for the team.
      if (rentLike && form.wantAgreement) {
        notificationsService.push(
          "NEW_LEAD",
          `${user.name} wants RENTLET to prepare the rental agreement for "${property.title}".`,
          "/admin/pipeline"
        );
      }
      setSubmitted(property);
      toast(
        rentLike && form.wantAgreement
          ? "Listing submitted — we'll handle the rental agreement too."
          : "Listing submitted for verification!"
      );
    } catch (err) {
      toast(err instanceof Error ? err.message : "Couldn't submit listing. Try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function railState(i: number): "done" | "active" | "pending" {
    if (submitted || i < step) return "done";
    if (i === step) return "active";
    return "pending";
  }

  return (
    <div className="container-rentlet py-6 pb-24">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        {/* Left rail */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Go back
          </Link>

          <h1 className="mt-4 text-2xl font-extrabold text-foreground">Post your property</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sell or rent your property</p>

          <div className="mt-4">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand-orange transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1 text-right text-xs font-semibold text-muted-foreground">{progress}%</p>
          </div>

          <ol className="mt-6 flex flex-col">
            {STEPS.map((label, i) => {
              const st = railState(i);
              const last = i === STEPS.length - 1;
              return (
                <li key={label} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => st === "done" && !submitted && setStep(i)}
                      disabled={st !== "done" || !!submitted}
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2",
                        st === "done" && "border-brand-navy bg-brand-navy text-white",
                        st === "active" && "border-brand-navy bg-brand-navy",
                        st === "pending" && "border-border bg-white"
                      )}
                    >
                      {st === "done" ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full",
                            st === "active" ? "bg-white" : "bg-border"
                          )}
                        />
                      )}
                    </button>
                    {!last && <span className="my-1 w-0.5 flex-1 bg-border" />}
                  </div>
                  <div className={cn("flex flex-col", !last && "pb-8")}>
                    <span
                      className={cn(
                        "text-sm font-bold",
                        st === "pending" ? "text-muted-foreground" : "text-foreground"
                      )}
                    >
                      {label}
                    </span>
                    <span
                      className={cn(
                        "mt-1 w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                        st === "done" && "bg-emerald-50 text-emerald-700",
                        st === "active" && "bg-brand-navy-light text-brand-navy",
                        st === "pending" && "bg-muted text-muted-foreground"
                      )}
                    >
                      {st === "done" ? "Done" : st === "active" ? "In progress" : "Pending"}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Main panel */}
        <div className="min-w-0 rounded-2xl border border-border bg-white p-5 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
              <h2 className="mt-4 text-xl font-extrabold text-foreground">
                Listing submitted for verification
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                &ldquo;{submitted.title}&rdquo; is now pending review. It gets a Verified badge and
                full visibility in search once our team approves it — usually within a few hours.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href={`/property/${submitted.slug}/${submitted.id}`}
                  className={cn(buttonVariants({ variant: "outline", size: "md" }))}
                >
                  View listing
                </Link>
                <Link
                  href="/owner/properties"
                  className={cn(buttonVariants({ variant: "primary", size: "md" }))}
                >
                  Go to dashboard
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Timer banner */}
              <div className="flex items-center gap-3 rounded-xl bg-brand-orange-light/50 px-4 py-3 text-sm text-foreground">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-brand-orange">
                  <Phone className="h-4 w-4" />
                </span>
                <p>
                  Timer&apos;s up! but you will <span className="font-bold">still get 3 free</span>{" "}
                  enquiries. <span className="font-bold">Just finish posting!</span>
                </p>
              </div>

              <div className="mt-6 flex items-start justify-between gap-4">
                <h2 className="text-2xl font-black tracking-tight text-foreground">
                  {["Add Property Details", "Add Photos & Schedule", "Add Price Details"][step]}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    notificationsService.push(
                      "NEW_LEAD",
                      `${user.name} asked for a callback while posting a property.`,
                      "/admin/pipeline"
                    );
                    toast("A RENTLET expert will call you shortly to help finish your listing.");
                  }}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-navy hover:underline"
                >
                  <span className="text-muted-foreground">Need help?</span>
                  <Phone className="h-4 w-4" /> Get a callback
                </button>
              </div>

              {/* Role banner — Owner / Agent / Builder each get a tailored intro */}
              <div
                className={cn(
                  "mt-4 flex items-start gap-3 rounded-xl border p-3.5 text-sm",
                  role === "agent"
                    ? "border-violet-200 bg-violet-50 text-violet-900"
                    : role === "builder"
                      ? "border-amber-200 bg-amber-50 text-amber-900"
                      : "border-brand-navy/15 bg-brand-navy-light/50 text-brand-navy"
                )}
              >
                <span className="mt-0.5 shrink-0 rounded-md bg-white/70 px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide">
                  {role === "agent" ? "Agent" : role === "builder" ? "Builder" : "Owner"}
                </span>
                <span>
                  <span className="block font-semibold">{roleIntro.title}</span>
                  <span className="block text-xs opacity-80">{roleIntro.hint}</span>
                </span>
              </div>

              {step === 0 ? (
                <div className="mt-6 max-w-2xl space-y-5">
                  {/* Looking to — Rent / Sell / Buy */}
                  <div>
                    <p className="text-sm font-semibold text-foreground">You&apos;re looking to</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {LOOKING_TO.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => set("lookingTo", opt)}
                          className={cn(
                            "rounded-full border px-6 py-2 text-sm font-semibold transition-colors",
                            form.lookingTo === opt
                              ? "border-brand-orange bg-brand-orange-light text-brand-orange-dark"
                              : "border-border text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Your Name */}
                  <label className="block">
                    <span className="text-sm font-semibold text-foreground">
                      {role === "agent" ? "Your Name (agent)" : role === "builder" ? "Your Name (builder rep)" : "Your Name"}
                    </span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Enter your name"
                      className={cn(UNDERLINE_FIELD, "mt-1")}
                    />
                  </label>

                  {/* Agent-only — the owner this listing belongs to */}
                  {role === "agent" && (
                    <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4">
                      <p className="text-sm font-bold text-violet-900">Owner you&apos;re listing for</p>
                      <div className="mt-3 space-y-4">
                        <label className="block">
                          <span className="text-xs font-semibold text-foreground">Owner&apos;s Name</span>
                          <input
                            type="text"
                            value={form.agentOwnerName}
                            onChange={(e) => set("agentOwnerName", e.target.value)}
                            placeholder="Full name of the property owner"
                            className={cn(UNDERLINE_FIELD, "mt-1")}
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs font-semibold text-foreground">Owner&apos;s Contact Number</span>
                          <span className="mt-1 flex items-center gap-2 border-b border-border focus-within:border-brand-navy">
                            <select
                              aria-label="Country code"
                              value={form.agentOwnerDial}
                              onChange={(e) => set("agentOwnerDial", e.target.value)}
                              className="shrink-0 bg-transparent py-2 text-sm font-semibold text-muted-foreground outline-none"
                            >
                              {COUNTRY_CODES.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.label}
                                </option>
                              ))}
                            </select>
                            <input
                              type="tel"
                              inputMode="numeric"
                              maxLength={form.agentOwnerDial === "+91" ? 10 : 14}
                              value={form.agentOwnerPhone}
                              onChange={(e) =>
                                set(
                                  "agentOwnerPhone",
                                  e.target.value.replace(/\D/g, "").slice(0, form.agentOwnerDial === "+91" ? 10 : 14)
                                )
                              }
                              placeholder="98765 43210"
                              className="w-full border-0 bg-transparent py-2 text-base text-foreground outline-none placeholder:text-muted-foreground/70"
                            />
                          </span>
                        </label>
                        <label className="block">
                          <span className="text-xs font-semibold text-foreground">Your Agent / RERA ID (optional)</span>
                          <input
                            type="text"
                            value={form.agentLicense}
                            onChange={(e) => set("agentLicense", e.target.value)}
                            placeholder="e.g. A52100001234"
                            className={cn(UNDERLINE_FIELD, "mt-1")}
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Builder-only — project-level details */}
                  {role === "builder" && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                      <p className="text-sm font-bold text-amber-900">Project details</p>
                      <div className="mt-3 space-y-4">
                        <label className="block">
                          <span className="text-xs font-semibold text-foreground">RERA Project ID (optional)</span>
                          <input
                            type="text"
                            value={form.projectRera}
                            onChange={(e) => set("projectRera", e.target.value)}
                            placeholder="e.g. PRM/KA/RERA/1251/446/PR/000123"
                            className={cn(UNDERLINE_FIELD, "mt-1")}
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs font-semibold text-foreground">Possession / Ready By</span>
                          <input
                            type="month"
                            value={form.possessionDate}
                            onChange={(e) => set("possessionDate", e.target.value)}
                            className={cn(UNDERLINE_FIELD, "mt-1")}
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs font-semibold text-foreground">Total Units in Project (optional)</span>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={form.totalUnits}
                            onChange={(e) => set("totalUnits", e.target.value.replace(/[^\d]/g, "").slice(0, 5))}
                            placeholder="e.g. 240"
                            className={cn(UNDERLINE_FIELD, "mt-1")}
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {/* City */}
                  <div className="block">
                    <span className="text-sm font-semibold text-foreground">City</span>
                    <div className="mt-1">
                      <CityPicker value={form.city} onChange={(c) => set("city", c)} />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <p className="text-sm font-semibold text-foreground">Property Type</p>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {PROPERTY_TYPES.map((t) => {
                        const active = form.propertyType === t.label;
                        return (
                          <button
                            key={t.label}
                            type="button"
                            onClick={() => set("propertyType", t.label)}
                            className={cn(
                              "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors",
                              active
                                ? "border-brand-navy bg-brand-navy-light/40 ring-1 ring-brand-navy"
                                : "border-border hover:border-brand-navy"
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                                t.tint
                              )}
                            >
                              <t.icon className="h-6 w-6" strokeWidth={1.75} />
                            </span>
                            <span className="text-xs font-semibold text-foreground">{t.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Project / society name */}
                  <Field label="Apartment / Project Name">
                    <input
                      type="text"
                      value={form.projectName}
                      onChange={(e) => set("projectName", e.target.value)}
                      placeholder="e.g. Venkateshappa Layout, 6th Cross"
                      className={UNDERLINE_FIELD}
                    />
                  </Field>

                  {/* Location / locality — suggests popular areas for the chosen city */}
                  <Field label="Location">
                    <LocalityInput
                      city={form.city}
                      value={form.location}
                      onChange={(v) => set("location", v)}
                    />
                  </Field>

                  {/* BHK */}
                  <Field label="BHK Type" required>
                    <Select
                      value={form.bhk}
                      onChange={(v) => set("bhk", v)}
                      options={BHK_OPTIONS}
                      placeholder="Select BHK"
                    />
                  </Field>

                  {/* Bathrooms + balconies */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Bathrooms">
                      <Select
                        value={form.bathrooms}
                        onChange={(v) => set("bathrooms", v)}
                        options={BATHROOM_OPTIONS}
                        placeholder="Select"
                      />
                    </Field>
                    <Field label="Balconies">
                      <Select
                        value={form.balconies}
                        onChange={(v) => set("balconies", v)}
                        options={BALCONY_OPTIONS}
                        placeholder="Select"
                      />
                    </Field>
                  </div>

                  {/* Floor + total floors */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Floor">
                      <Select
                        value={form.floor}
                        onChange={(v) => set("floor", v)}
                        options={FLOOR_OPTIONS}
                        placeholder="Select floor"
                      />
                    </Field>
                    <Field label="Total Floors">
                      <Select
                        value={form.totalFloors}
                        onChange={(v) => set("totalFloors", v)}
                        options={FLOOR_OPTIONS}
                        placeholder="Select total"
                      />
                    </Field>
                  </div>

                  {/* Age + facing */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Property Age">
                      <Select
                        value={form.propertyAge}
                        onChange={(v) => set("propertyAge", v)}
                        options={AGE_OPTIONS}
                        placeholder="Select age"
                      />
                    </Field>
                    <Field label="Facing">
                      <Select
                        value={form.facing}
                        onChange={(v) => set("facing", v)}
                        options={FACING_OPTIONS}
                        placeholder="Select facing"
                      />
                    </Field>
                  </div>

                  {/* Water supply + current condition */}
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Water Supply">
                      <Select
                        value={form.waterSupply}
                        onChange={(v) => set("waterSupply", v)}
                        options={WATER_SUPPLY_OPTIONS}
                        placeholder="Select source"
                      />
                    </Field>
                    <Field label="Current Property Condition">
                      <Select
                        value={form.condition}
                        onChange={(v) => set("condition", v)}
                        options={CONDITION_OPTIONS}
                        placeholder="Select condition"
                      />
                    </Field>
                  </div>

                  {/* Built-up area */}
                  <Field label="Built Up Area" required>
                    <span className="flex items-center gap-2 border-b border-border focus-within:border-brand-navy">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={form.builtUpArea}
                        onChange={(e) => set("builtUpArea", e.target.value.replace(/[^\d]/g, ""))}
                        placeholder="e.g. 1250"
                        className="w-full border-0 bg-transparent py-2 text-base text-foreground outline-none placeholder:text-muted-foreground/70"
                      />
                      <span className="shrink-0 text-sm font-semibold text-muted-foreground">sq.ft</span>
                    </span>
                  </Field>

                  {/* Members allowed — rentals only */}
                  {rentLike && (
                    <Field label="Members Allowed">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={form.membersAllowed}
                        onChange={(e) =>
                          set("membersAllowed", e.target.value.replace(/[^\d]/g, "").slice(0, 2))
                        }
                        placeholder="Max people who can stay, e.g. 4"
                        className={UNDERLINE_FIELD}
                      />
                    </Field>
                  )}

                  {/* Furnishing */}
                  <Field label="Furnishing">
                    <PillGroup
                      value={form.furnishing}
                      onChange={(v) => set("furnishing", v)}
                      options={FURNISHING_OPTIONS}
                    />
                  </Field>

                  {/* Parking */}
                  <Field label="Parking">
                    <PillGroup
                      value={form.parking}
                      onChange={(v) => set("parking", v)}
                      options={PARKING_OPTIONS}
                    />
                  </Field>

                  {/* Available from + preferred tenants — rentals only */}
                  {rentLike && (
                    <>
                      <Field label="Available From">
                        <input
                          type="date"
                          value={form.availableFrom}
                          onChange={(e) => set("availableFrom", e.target.value)}
                          className={SELECT_CLASS}
                        />
                      </Field>
                      <Field label="Preferred Tenants">
                        <PillGroup
                          value={form.preferredTenants}
                          onChange={(v) => set("preferredTenants", v)}
                          options={TENANT_OPTIONS}
                        />
                      </Field>
                      <Field label="Pets allowed?">
                        <PillGroup
                          value={form.petsAllowed}
                          onChange={(v) => set("petsAllowed", v)}
                          options={["Yes", "No"]}
                        />
                      </Field>
                    </>
                  )}

                  {/* Description */}
                  <Field label="Description">
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Describe your property — highlights, nearby landmarks, what makes it special."
                      className="w-full resize-y rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-navy"
                    />
                  </Field>
                </div>
              ) : step === 1 ? (
                <div className="mt-6 max-w-2xl space-y-5">
                  {/* Photos */}
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Photos <span className="font-normal text-muted-foreground/60">({form.photos.length}/{MAX_PHOTOS})</span>
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                      {form.photos.map((p) => (
                        <div key={p.id} className="group relative aspect-square overflow-hidden rounded-lg border border-border">
                          <div
                            className="h-full w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${p.url})` }}
                            role="img"
                            aria-label={p.name}
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(p.id)}
                            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            aria-label="Remove photo"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      {form.photos.length < MAX_PHOTOS && (
                        <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border text-muted-foreground hover:border-brand-navy hover:text-brand-navy">
                          <ImagePlus className="h-6 w-6" />
                          <span className="text-xs font-semibold">Add</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => {
                              addPhotos(e.target.files);
                              e.target.value = "";
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Video */}
                  <div>
                    <p className="text-sm font-semibold text-foreground">Video walkthrough</p>
                    {form.video ? (
                      <div className="mt-2 space-y-2">
                        {/* Preview the uploaded clip right here */}
                        <video
                          src={form.video.url}
                          controls
                          playsInline
                          className="max-h-64 w-full rounded-lg border border-border bg-black"
                        />
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="inline-flex min-w-0 items-center gap-2">
                            <Video className="h-4 w-4 shrink-0 text-brand-navy" />
                            <span className="truncate">{form.video.name}</span>
                          </span>
                          <button
                            type="button"
                            onClick={clearVideo}
                            className="shrink-0 text-xs font-semibold text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="mt-2 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2.5 text-sm font-semibold text-muted-foreground hover:border-brand-navy hover:text-brand-navy">
                        <Video className="h-4 w-4" /> Upload a video
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            chooseVideo(e.target.files);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    )}
                  </div>

                  {/* Amenities */}
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      Amenities{" "}
                      {form.amenities.length > 0 && (
                        <span className="font-normal text-muted-foreground/60">({form.amenities.length})</span>
                      )}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {AMENITY_OPTIONS.map((a) => {
                        const on = form.amenities.includes(a);
                        return (
                          <button
                            key={a}
                            type="button"
                            onClick={() => toggleAmenity(a)}
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors",
                              on
                                ? "border-brand-navy bg-brand-navy-light/40 text-brand-navy"
                                : "border-border text-muted-foreground hover:bg-muted"
                            )}
                          >
                            {on && <Check className="h-3.5 w-3.5" />}
                            {a}
                          </button>
                        );
                      })}

                      {/* Custom amenities the owner typed in */}
                      {form.amenities
                        .filter((a) => !AMENITY_OPTIONS.includes(a))
                        .map((a) => (
                          <button
                            key={a}
                            type="button"
                            onClick={() => toggleAmenity(a)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-brand-navy bg-brand-navy-light/40 px-3.5 py-1.5 text-sm font-semibold text-brand-navy"
                          >
                            {a}
                            <X className="h-3.5 w-3.5" />
                          </button>
                        ))}
                    </div>

                    {/* Add your own */}
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="text"
                        value={customAmenity}
                        onChange={(e) => setCustomAmenity(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addCustomAmenity();
                          }
                        }}
                        placeholder="Other facility — type and add"
                        className={cn(UNDERLINE_FIELD, "flex-1")}
                      />
                      <button
                        type="button"
                        onClick={addCustomAmenity}
                        disabled={!customAmenity.trim()}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "shrink-0"
                        )}
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Availability for visits */}
                  <div>
                    <p className="text-sm font-semibold text-foreground">Available days for visits</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {DAY_OPTIONS.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggleDay(d)}
                          className={cn(
                            "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                            form.visitDays.includes(d)
                              ? "border-brand-navy bg-brand-navy text-white"
                              : "border-border text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field label="Preferred visit time">
                    <PillGroup
                      value={form.visitTime}
                      onChange={(v) => set("visitTime", v)}
                      options={VISIT_TIME_OPTIONS}
                    />
                  </Field>

                  {/* Share location on map */}
                  <Field label="Share location on map">
                    <div className="space-y-2">
                      <span className="flex items-center gap-2 border-b border-border focus-within:border-brand-navy">
                        <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <input
                          type="url"
                          value={form.mapLink}
                          onChange={(e) => set("mapLink", e.target.value)}
                          placeholder="Paste a Google Maps link"
                          className="w-full border-0 bg-transparent py-2 text-base text-foreground outline-none placeholder:text-muted-foreground/70"
                        />
                      </span>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={useCurrentLocation}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy hover:underline"
                        >
                          <LocateFixed className="h-4 w-4" /> Use my current location
                        </button>
                        {form.mapLink.trim() && (
                          <span
                            className={cn(
                              "text-xs font-semibold",
                              parseLatLng(form.mapLink) ? "text-emerald-600" : "text-muted-foreground"
                            )}
                          >
                            {parseLatLng(form.mapLink)
                              ? "Pin detected — it'll show on the listing map."
                              : "Link saved (no coordinates found in it)."}
                          </span>
                        )}
                      </div>

                      {/* Map preview once we have coordinates */}
                      {(() => {
                        const pin = parseLatLng(form.mapLink);
                        if (!pin) return null;
                        return (
                          <iframe
                            title="Location preview"
                            src={`https://maps.google.com/maps?q=${pin.lat},${pin.lng}&z=15&output=embed`}
                            loading="lazy"
                            className="mt-1 h-56 w-full rounded-lg border border-border"
                          />
                        );
                      })()}
                    </div>
                  </Field>
                </div>
              ) : (
                <div className="mt-6 max-w-2xl space-y-5">
                  {/* Expected price / rent / lease amount */}
                  <Field
                    label={
                      form.lookingTo === "Lease"
                        ? "Expected Lease Amount"
                        : rentLike
                          ? "Expected Monthly Rent"
                          : "Expected Price"
                    }
                    required
                  >
                    <MoneyInput
                      value={form.expectedPrice}
                      onChange={(v) => set("expectedPrice", v)}
                    />
                  </Field>

                  {/* Lease duration — lease only */}
                  {form.lookingTo === "Lease" && (
                    <Field label="Lease Duration (Years)" required>
                      <span className="flex items-center gap-2 border-b border-border focus-within:border-brand-navy">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={form.leaseYears}
                          onChange={(e) =>
                            set("leaseYears", e.target.value.replace(/[^\d]/g, "").slice(0, 2))
                          }
                          placeholder="e.g. 2"
                          className="w-full border-0 bg-transparent py-2 text-base text-foreground outline-none placeholder:text-muted-foreground/70"
                        />
                        <span className="shrink-0 text-sm font-semibold text-muted-foreground">
                          {form.leaseYears === "1" ? "year" : "years"}
                        </span>
                      </span>
                    </Field>
                  )}

                  {/* Security deposit / lease deposit — rentals only */}
                  {rentLike && (
                    <Field label={form.lookingTo === "Lease" ? "Deposit Amount" : "Security Deposit"}>
                      <MoneyInput value={form.deposit} onChange={(v) => set("deposit", v)} />
                    </Field>
                  )}

                  {/* Rental agreement add-on — rentals only */}
                  {rentLike && (
                    <div className="rounded-2xl border border-brand-navy/15 bg-brand-navy-light/50 p-4">
                      <label className="flex items-start gap-2.5 text-sm text-foreground">
                        <input
                          type="checkbox"
                          checked={form.wantAgreement}
                          onChange={(e) => set("wantAgreement", e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-border accent-brand-navy"
                        />
                        <span>
                          <span className="font-semibold">Get the rental agreement done by RENTLET</span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            A lawyer-verified agreement, e-stamped and delivered. A manager calls you
                            once a tenant is finalised — nothing charged now.{" "}
                            <a
                              href="/rental-agreement"
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-brand-navy underline"
                            >
                              Learn more
                            </a>
                          </span>
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Maintenance */}
                  <Field label="Maintenance (monthly)">
                    <MoneyInput
                      value={form.maintenance}
                      onChange={(v) => set("maintenance", v)}
                      placeholder="Optional"
                    />
                  </Field>

                  <div className="space-y-3">
                    <label className="flex items-center gap-2.5 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={form.negotiable}
                        onChange={(e) => set("negotiable", e.target.checked)}
                        className="h-4 w-4 rounded border-border accent-brand-navy"
                      />
                      Price negotiable
                    </label>
                    <label className="flex items-center gap-2.5 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={form.allInclusive}
                        onChange={(e) => set("allInclusive", e.target.checked)}
                        className="h-4 w-4 rounded border-border accent-brand-navy"
                      />
                      All-inclusive price
                    </label>
                  </div>

                  {/* Final consent — must be ticked before the listing can be submitted */}
                  <label className="mt-2 flex items-start gap-2.5 rounded-xl border border-border bg-muted/40 p-3 text-sm text-foreground">
                    <input
                      type="checkbox"
                      checked={form.agreeTerms}
                      onChange={(e) => set("agreeTerms", e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-border accent-brand-navy"
                    />
                    <span>
                      I confirm the details above are accurate and I agree to RENTLET&apos;s{" "}
                      <a href="/terms" target="_blank" rel="noreferrer" className="font-semibold text-brand-navy underline">
                        Terms &amp; Conditions
                      </a>{" "}
                      and{" "}
                      <a href="/privacy-policy" target="_blank" rel="noreferrer" className="font-semibold text-brand-navy underline">
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                </div>
              )}

              {/* Nav */}
              <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-5">
                <button
                  type="button"
                  onClick={back}
                  disabled={submitting}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "md" }),
                    step === 0 && "invisible"
                  )}
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={submitting || (step === 2 && !form.agreeTerms)}
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
                >
                  {submitting ? "Submitting..." : step < 2 ? "Continue" : "Submit listing"}
                  {!submitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
