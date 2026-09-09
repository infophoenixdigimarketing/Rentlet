"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X, ShieldCheck, MessageCircle } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/Button";
import { SeekerSearchPanel } from "@/components/post-property/SeekerSearchPanel";
import { authService } from "@/lib/services/auth.service";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const AUDIENCES = ["Owner", "Broker/Builder"] as const;
type Audience = (typeof AUDIENCES)[number];

const PROPERTY_TYPES = ["Residential", "Commercial"] as const;
type PType = (typeof PROPERTY_TYPES)[number];

const AD_TYPES: Record<PType, string[]> = {
  Residential: ["Rent", "Sell", "PG/Co-living"],
  Commercial: ["Rent", "Sell"],
};

const FIELD =
  "h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-navy";

export function PostPropertyLanding() {
  const router = useRouter();
  const [audience, setAudience] = useState<Audience>("Owner");
  const [mode, setMode] = useState<"post" | "import">("post");
  const [ptype, setPtype] = useState<PType>("Residential");
  const [adType, setAdType] = useState("Rent");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Any");
  const [showSearch, setShowSearch] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Male/Female/Any preference only applies to shared-living ad types.
  const showGender = adType === "PG/Co-living";

  const phoneComplete = phone.length === 10;
  const otpReady = otpSent && otp.length === 6;

  // Editing the number invalidates any OTP already sent — hide the field and drop the code.
  function changePhone(value: string) {
    setPhone(value.replace(/\D/g, "").slice(0, 10));
    setOtpSent(false);
    setOtp("");
  }

  // Actually asks the auth provider to send the code — the Firebase provider needs this call
  // to set up its confirmation result before verifyOtp() can run.
  async function sendOtp() {
    if (!phoneComplete) {
      toast("Enter a valid 10-digit mobile number first.", "error");
      return;
    }
    setSendingOtp(true);
    try {
      await authService.sendOtp(`+91${phone}`);
      setOtpSent(true);
      toast(`OTP sent to +91 ${phone}.`, "info");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Couldn't send OTP. Try again.", "error");
    } finally {
      setSendingOtp(false);
    }
  }

  function changePtype(p: PType) {
    setPtype(p);
    if (!AD_TYPES[p].includes(adType)) setAdType(AD_TYPES[p][0]);
  }

  async function start(e: React.FormEvent) {
    e.preventDefault();
    if (phone.length !== 10) {
      toast("Mobile number must be exactly 10 digits.", "error");
      return;
    }
    if (!otpSent) {
      toast("Tap Send OTP first.", "error");
      return;
    }
    if (otp.length !== 6) {
      toast("Enter the 6-digit OTP sent to your phone.", "error");
      return;
    }

    // The OTP doubles as sign-in — verify it, then go straight into the "Add Property
    // Details" wizard instead of bouncing through the login page.
    setSubmitting(true);
    try {
      await authService.verifyOtp(`+91${phone}`, otp, {
        name: "",
        role: audience === "Broker/Builder" ? "agent" : "owner",
      });
    } catch (err) {
      toast(err instanceof Error ? err.message : "Couldn't verify OTP. Try again.", "error");
      setSubmitting(false);
      return;
    }

    // Carry the picks into the wizard, which reads this on mount to pre-fill the intent/owner steps.
    try {
      sessionStorage.setItem(
        "rentlet:post-intent",
        JSON.stringify({
          phone: phone.trim(),
          listingType: adType === "Sell" ? "sale" : "rent",
          propertyType: ptype,
          adType,
          postedBy: audience === "Broker/Builder" ? "agent" : "owner",
          gender: showGender ? gender : undefined,
        })
      );
    } catch {
      /* private mode / storage disabled — the wizard just starts empty */
    }

    router.push("/post-property");
  }

  return (
    <div className="container-rentlet py-8 pb-16">
      <div className="mx-auto max-w-xl">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setShowSearch((v) => !v)}
            aria-expanded={showSearch}
            className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2 text-sm font-semibold text-brand-navy hover:bg-muted"
          >
            {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            {showSearch ? "Close search" : "Looking for a property? Click here"}
          </button>
        </div>

        {showSearch && (
          <div className="mt-5">
            <SeekerSearchPanel />

            <div className="mt-8 flex flex-col items-center gap-3 border-t border-border pt-8">
              <p className="text-lg font-extrabold text-foreground">Are you a Property Owner?</p>
              <p className="max-w-md text-center text-sm text-muted-foreground">
                List for free, reach verified tenants and buyers directly, and manage every lead, visit
                and chat from one owner dashboard.
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
                  setTimeout(
                    () => document.getElementById("post-lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" }),
                    0
                  );
                }}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-1")}
              >
                Post Free Property Ad <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Lead form */}
        <form
          id="post-lead-form"
          onSubmit={start}
          className="mt-6 scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-white"
        >
          {/* Owner / Broker-Builder audience tabs */}
          <div className="flex">
            {AUDIENCES.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAudience(a)}
                className={cn(
                  "flex-1 px-4 py-3 text-sm font-bold transition-colors",
                  audience === a
                    ? "bg-white text-brand-navy"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {a}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-7">
            <h2 className="text-lg font-extrabold text-foreground">
              New to Rentlet? Let&apos;s get you started
            </h2>

            {/* Post listing / Import listing sub-tabs */}
            <div className="mt-4 flex gap-6 border-b border-border">
              <button
                type="button"
                onClick={() => setMode("post")}
                className={cn(
                  "-mb-px border-b-2 pb-2 text-sm font-bold transition-colors",
                  mode === "post"
                    ? "border-brand-navy text-brand-navy"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                Post listing
              </button>
              <button
                type="button"
                onClick={() => setMode("import")}
                className={cn(
                  "-mb-px inline-flex items-center gap-1.5 border-b-2 pb-2 text-sm font-bold transition-colors",
                  mode === "import"
                    ? "border-brand-navy text-brand-navy"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                Import listing
                <span className="rounded bg-brand-orange-light px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand-orange-dark">
                  New
                </span>
              </button>
            </div>

            {mode === "import" ? (
              <p className="mt-6 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                Importing an existing listing from another portal is coming soon. For now, use{" "}
                <button
                  type="button"
                  onClick={() => setMode("post")}
                  className="font-semibold text-brand-navy hover:underline"
                >
                  Post listing
                </button>{" "}
                to add your property.
              </p>
            ) : (
              <>
                <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Property Type
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => changePtype(p)}
                      className={cn(
                        "rounded-lg border px-4 py-2 text-sm font-semibold transition-colors",
                        ptype === p
                          ? "border-brand-navy bg-brand-navy text-white"
                          : "border-border text-foreground hover:bg-muted"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  You&apos;re looking to...
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {AD_TYPES[ptype].map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAdType(a)}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                        adType === a
                          ? "border-brand-orange bg-brand-orange-light text-brand-orange-dark"
                          : "border-border text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {a}
                    </button>
                  ))}
                </div>

                {showGender && (
                  <>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Preferred gender
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Any", "Male", "Female"].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGender(g)}
                          className={cn(
                            "rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                            gender === g
                              ? "border-brand-orange bg-brand-orange-light text-brand-orange-dark"
                              : "border-border text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                <label className="mt-5 flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-foreground/80">Mobile number</span>
                  <span className="flex items-stretch gap-2">
                    <span className="flex flex-1 items-stretch">
                      <span className="inline-flex items-center rounded-l-xl border border-r-0 border-border bg-muted px-3 text-sm font-semibold text-muted-foreground">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => changePhone(e.target.value)}
                        placeholder="Enter phone no."
                        aria-invalid={phone.length > 0 && phone.length !== 10}
                        className={cn(
                          FIELD,
                          "rounded-l-none",
                          phone.length > 0 && phone.length !== 10 && "border-red-400 focus:border-red-500"
                        )}
                      />
                    </span>
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={!phoneComplete || otpSent || sendingOtp}
                      className="shrink-0 rounded-xl border border-brand-navy px-4 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent"
                    >
                      {sendingOtp ? "Sending..." : otpSent ? "OTP sent" : "Send OTP"}
                    </button>
                  </span>
                  {phone.length > 0 && phone.length !== 10 && (
                    <span className="text-xs font-medium text-red-600">
                      Enter exactly 10 digits ({phone.length}/10).
                    </span>
                  )}
                </label>

                {otpSent && (
                  <label className="mt-4 flex flex-col gap-1.5">
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
                      className={cn(FIELD, otpReady && "border-emerald-500 focus:border-emerald-500")}
                    />
                    <span className="text-xs text-muted-foreground">
                      Enter the 6-digit code sent to +91 {phone}.{" "}
                      <button type="button" onClick={sendOtp} className="font-semibold text-brand-navy hover:underline">
                        Resend
                      </button>
                    </span>
                  </label>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="mt-6 w-full"
                  disabled={!otpReady || submitting}
                >
                  {submitting ? "Verifying..." : "Continue"} <ArrowRight className="h-4 w-4" />
                </Button>

                <div className="mt-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-[11px] font-semibold text-muted-foreground">OR</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <Link
                  href="/register?next=/post-property"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-brand-navy px-4 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
                >
                  Sign up with Email or Google
                </Link>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Not getting the OTP? Use email / Google above — it lands you straight back here.
                </p>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Need another way?{" "}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent("Hi Rentlet, I'd like to post my property.")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-emerald-600 hover:underline"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> Post property via WhatsApp
                  </a>
                </p>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Existing user?{" "}
                  <Link
                    href="/login?next=/post-property"
                    className="font-semibold text-brand-navy hover:underline"
                  >
                    Login Here
                  </Link>
                </p>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
