"use client";

import { useMemo, useState } from "react";
import { Search, Check, X, Pause, Play, Star, Trash2, Eye, ShieldCheck } from "lucide-react";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { EmptyState } from "@/components/ui/EmptyState";
import { RejectReasonModal } from "@/components/admin/RejectReasonModal";
import { VerifyChecklistModal } from "@/components/admin/VerifyChecklistModal";
import { useAdminProperties } from "@/lib/admin-data";
import { adminPropertiesService } from "@/lib/services/admin.service";
import { getOwnerContact } from "@/lib/data/owner-contacts";
import { cn, priceLabel } from "@/lib/utils";
import { toast } from "@/lib/toast";
import type { Property, VerificationStatus } from "@/types/property";

const VERIFICATION_STYLE: Record<VerificationStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  under_review: "bg-brand-navy-light text-brand-navy",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

const PAGE_SIZE = 10;

export default function AdminPropertiesPage() {
  const properties = useAdminProperties();
  const [query, setQuery] = useState("");
  const [verificationFilter, setVerificationFilter] = useState<VerificationStatus | "all">("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [rejectTarget, setRejectTarget] = useState<Property | null>(null);
  const [verifyTarget, setVerifyTarget] = useState<Property | null>(null);

  // Opening the verification checklist puts the listing "under review" so its state
  // reflects that RENTLET is actively verifying it.
  function startVerify(property: Property) {
    if (property.verificationStatus === "pending") adminPropertiesService.setUnderReview(property.id);
    setVerifyTarget(property);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return properties
      .filter((p) => p.status !== "deleted")
      .filter((p) => (verificationFilter === "all" ? true : p.verificationStatus === verificationFilter))
      .filter((p) => (q ? p.title.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.locality.toLowerCase().includes(q) : true));
  }, [properties, query, verificationFilter]);

  const shown = filtered.slice(0, visible);

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-extrabold text-foreground">Properties</h1>
        <p className="text-sm text-muted-foreground">{filtered.length} of {properties.length} listings</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, city or locality..."
            className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-3 text-sm outline-none focus:border-brand-navy"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {(["all", "pending", "under_review", "approved", "rejected"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVerificationFilter(v)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize",
                verificationFilter === v ? "border-brand-navy bg-brand-navy text-white" : "border-border bg-white text-foreground hover:bg-muted"
              )}
            >
              {v.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState className="mt-6" icon={Search} title="No properties match" description="Try a different search or filter." />
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {shown.map((p) => (
            <Row
              key={p.id}
              property={p}
              onReject={() => setRejectTarget(p)}
              onVerify={() => startVerify(p)}
            />
          ))}
        </div>
      )}

      {visible < filtered.length && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Load More ({filtered.length - visible} more)
          </button>
        </div>
      )}

      {rejectTarget && (
        <RejectReasonModal
          open={Boolean(rejectTarget)}
          onClose={() => setRejectTarget(null)}
          propertyTitle={rejectTarget.title}
          onConfirm={(reason) => {
            adminPropertiesService.reject(rejectTarget.id, reason);
            toast("Listing rejected", "info");
          }}
        />
      )}

      {verifyTarget && (
        <VerifyChecklistModal
          key={verifyTarget.id}
          open={Boolean(verifyTarget)}
          onClose={() => setVerifyTarget(null)}
          propertyTitle={verifyTarget.title}
          onApprove={() => {
            adminPropertiesService.approve(verifyTarget.id);
            toast("Verified & approved — now live in search");
          }}
        />
      )}
    </div>
  );
}

function Row({
  property,
  onReject,
  onVerify,
}: {
  property: Property;
  onReject: () => void;
  onVerify: () => void;
}) {
  const isSuspended = property.status === "paused";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white p-3 sm:flex-row sm:items-center">
      <PropertyImage id={property.id} propertyType={property.propertyType} className="h-20 w-28 shrink-0 rounded-xl sm:h-16 sm:w-24" />

      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-sm font-semibold text-foreground">{property.title}</p>
        <p className="text-xs text-muted-foreground">{property.locality}, {property.city} · {priceLabel(property)}</p>
        {/* Admin sees the full location + owner contact — hidden from house-seekers on the public listing. */}
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          <span className="font-semibold text-foreground/70">Full address:</span> {property.address}
          {property.pincode ? ` — ${property.pincode}` : ""}
        </p>
        {(() => {
          const oc = getOwnerContact(property.ownerId);
          return (
            <p className="text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground/70">Owner:</span> {property.ownerName}
              {oc ? (
                <>
                  {" · "}
                  <span className="tabular-nums">{oc.phone}</span> · {oc.email}
                </>
              ) : null}
            </p>
          );
        })()}
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold capitalize", VERIFICATION_STYLE[property.verificationStatus])}>
            {property.verificationStatus.replace("_", " ")}
          </span>
          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold capitalize text-muted-foreground">{property.status}</span>
          {property.featured && <span className="rounded-full bg-brand-orange-light px-2 py-0.5 text-[10px] font-bold text-brand-orange-dark">FEATURED</span>}
        </div>
        {property.verificationStatus === "rejected" && property.rejectionReason && (
          <p className="mt-1 text-xs italic text-red-600">Reason: {property.rejectionReason}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {property.verificationStatus !== "approved" && (
          <IconButton label="Verify & approve" icon={ShieldCheck} onClick={onVerify} tone="emerald" />
        )}
        {property.verificationStatus !== "rejected" && <IconButton label="Reject" icon={X} onClick={onReject} tone="red" />}
        <IconButton
          label={isSuspended ? "Reactivate" : "Suspend"}
          icon={isSuspended ? Play : Pause}
          onClick={() => {
            if (isSuspended) adminPropertiesService.reactivate(property.id);
            else adminPropertiesService.suspend(property.id);
            toast(isSuspended ? "Listing reactivated" : "Listing suspended");
          }}
        />
        <IconButton
          label={property.featured ? "Unfeature" : "Feature"}
          icon={Star}
          active={property.featured}
          onClick={() => { adminPropertiesService.toggleFeatured(property.id); toast(property.featured ? "Removed from featured" : "Marked as featured"); }}
        />
        <a
          href={`/property/${property.slug}/${property.id}`}
          target="_blank"
          rel="noreferrer"
          title="View"
          aria-label="View"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted"
        >
          <Eye className="h-3.5 w-3.5" />
        </a>
        <IconButton
          label="Delete"
          icon={Trash2}
          tone="red"
          onClick={() => { adminPropertiesService.remove(property.id); toast("Listing deleted", "info"); }}
        />
      </div>
    </div>
  );
}

function IconButton({
  label,
  icon: Icon,
  onClick,
  tone,
  active,
}: {
  label: string;
  icon: typeof Check;
  onClick: () => void;
  tone?: "emerald" | "red";
  active?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg border text-foreground hover:bg-muted",
        active ? "border-brand-orange bg-brand-orange-light text-brand-orange-dark" : "border-border",
        tone === "emerald" && "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300",
        tone === "red" && "hover:bg-red-50 hover:text-red-600 hover:border-red-300"
      )}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}
