"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Building2, Home, Briefcase, HardHat, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { MethodTabs } from "@/components/auth/MethodTabs";
import { EmailRegisterForm } from "@/components/auth/EmailRegisterForm";
import { PhoneOtpForm } from "@/components/auth/PhoneOtpForm";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/user";

type Step = "intent" | "role" | "contact";

// Demo accounts wired to each intent so a tester sees seeker features under one email and
// owner features under the other. Set the moment the intent button is clicked; still editable.
const SEEKER_EMAIL = "demo.tenant@rentlet.in"; // favourites, saved searches, visits
const OWNER_EMAIL = "demo.owner@rentlet.in"; //  owner dashboard, leads, analytics

const LISTING_ROLES: { id: UserRole; label: string; description: string; icon: typeof Home }[] = [
  { id: "owner", label: "Owner", description: "I own the property I want to list", icon: Home },
  { id: "agent", label: "Agent", description: "I list properties on behalf of owners", icon: Briefcase },
  { id: "builder", label: "Builder", description: "I list new projects and developments", icon: HardHat },
];

export function RegisterWizard() {
  const [step, setStep] = useState<Step>("intent");
  const [role, setRole] = useState<UserRole | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  function chooseLooking() {
    setRole("tenant");
    setEmail(SEEKER_EMAIL);
    setAgreed(false);
    setStep("contact");
  }

  function chooseListing() {
    setEmail(OWNER_EMAIL);
    setAgreed(false);
    setStep("role");
  }

  if (step === "intent") {
    return (
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={chooseLooking}
          className="flex items-center gap-4 rounded-2xl border-2 border-border p-4 text-left transition-colors hover:border-brand-orange hover:bg-brand-orange-light/40"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange-light text-brand-orange">
            <Search className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-foreground">I am looking for property</span>
            <span className="block text-xs text-muted-foreground">Find a home, plot or commercial space to rent or buy</span>
          </span>
        </button>

        <button
          type="button"
          onClick={chooseListing}
          className="flex items-center gap-4 rounded-2xl border-2 border-border p-4 text-left transition-colors hover:border-brand-navy hover:bg-brand-navy-light/50"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy-light text-brand-navy">
            <Building2 className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-foreground">I want to list property</span>
            <span className="block text-xs text-muted-foreground">Post a property for rent or sale and manage leads</span>
          </span>
        </button>
      </div>
    );
  }

  if (step === "role") {
    return (
      <div className="flex flex-col gap-3">
        <BackButton onClick={() => setStep("intent")} />
        {LISTING_ROLES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => {
              setRole(r.id);
              setAgreed(false);
              setStep("contact");
            }}
            className={cn(
              "flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors hover:border-brand-navy hover:bg-brand-navy-light/50",
              role === r.id ? "border-brand-navy bg-brand-navy-light/50" : "border-border"
            )}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy-light text-brand-navy">
              <r.icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-bold text-foreground">{r.label}</span>
              <span className="block text-xs text-muted-foreground">{r.description}</span>
            </span>
          </button>
        ))}
      </div>
    );
  }

  // step === "contact"
  const backStep = role === "tenant" ? "intent" : "role";
  // Listers tick one agreement box (the per-role declarations live inside the Listing Terms it
  // links to). A "looking for property" account just gets a passive Terms/Privacy line.
  const isLister = role === "owner" || role === "agent" || role === "builder";
  const consentOk = !isLister || agreed;
  return (
    <div>
      <BackButton onClick={() => setStep(backStep)} />

      <Input
        label="Full Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="mb-3"
      />

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="mb-4"
      />

      {isLister ? (
        /* One agreement box — the role-specific declarations are inside the Listing Terms it links to */
        <label className="mb-4 flex items-start gap-2.5 rounded-xl border border-border bg-muted/40 p-3 text-xs text-foreground">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-brand-navy"
          />
          <span>
            I agree to the RENTLET{" "}
            <Link href="/terms" target="_blank" className="font-semibold text-brand-navy underline">
              Terms &amp; Conditions
            </Link>
            , the{" "}
            <Link href={`/listing-terms?role=${role}`} target="_blank" className="font-semibold text-brand-navy underline">
              {role === "owner" ? "Owner" : role === "agent" ? "Agent" : "Builder"} Listing Terms
            </Link>{" "}
            (including the {role === "owner" ? "Owner" : role === "agent" ? "Agent" : "Builder"} declarations) and the{" "}
            <Link href="/privacy-policy" target="_blank" className="font-semibold text-brand-navy underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
      ) : (
        <p className="mb-4 text-[11px] leading-relaxed text-muted-foreground">
          By continuing, you agree to RENTLET&apos;s{" "}
          <Link href="/terms" target="_blank" className="font-semibold text-brand-navy underline">
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" target="_blank" className="font-semibold text-brand-navy underline">
            Privacy Policy
          </Link>
          .
        </p>
      )}

      <MethodTabs
        tabs={[
          {
            id: "phone",
            label: "Mobile OTP",
            content:
              name.trim() && consentOk ? (
                <PhoneOtpForm newUser={{ name, role: role!, email }} />
              ) : (
                <p className="text-xs text-muted-foreground">
                  {!name.trim() ? "Enter your name above to continue." : "Accept the terms above to continue."}
                </p>
              ),
          },
          {
            id: "email",
            label: "Email",
            content:
              name.trim() && consentOk ? (
                <EmailRegisterForm role={role!} name={name} email={email} />
              ) : (
                <p className="text-xs text-muted-foreground">
                  {!name.trim() ? "Enter your name above to continue." : "Accept the terms above to continue."}
                </p>
              ),
          },
        ]}
      />

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      {consentOk ? (
        <GoogleButton role={role ?? undefined} />
      ) : (
        <p className="text-center text-xs text-muted-foreground">Accept the terms above to continue with Google.</p>
      )}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-brand-navy"
    >
      <ChevronLeft className="h-3.5 w-3.5" /> Back
    </button>
  );
}
