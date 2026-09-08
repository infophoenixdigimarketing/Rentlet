"use client";

import { Modal } from "@/components/ui/Modal";
import { formatINR } from "@/lib/utils";
import type { Property } from "@/types/property";

// A plain-language rental/sale agreement summary shown from the property page. This is an
// indicative draft only — the binding agreement is the one the two parties sign offline.
export function AgreementModal({
  open,
  onClose,
  property,
}: {
  open: boolean;
  onClose: () => void;
  property: Property;
}) {
  const isSale = property.listingType === "sale";
  const amount = isSale
    ? property.price != null
      ? formatINR(property.price, true)
      : "Price on request"
    : property.rent != null
      ? `${formatINR(property.rent)} / month`
      : "Rent on request";

  return (
    <Modal open={open} onClose={onClose} title={isSale ? "Sale Agreement — Terms" : "Rental Agreement — Terms"}>
      <p className="text-xs text-muted-foreground">{property.title}</p>

      <div className="mt-4 space-y-4 text-sm text-foreground/90">
        <p>
          This is an indicative summary of the terms for <strong>{property.title}</strong>
          {property.locality ? `, ${property.locality}` : ""}, {property.city}. It is not a binding
          contract — the final agreement is the one signed by the owner and the{" "}
          {isSale ? "buyer" : "tenant"}.
        </p>

        <div>
          <h3 className="font-semibold text-foreground">1. Parties</h3>
          <p className="mt-1">
            Owner: the registered owner of this property (name and details shared by your RENTLET
            manager before signing). {isSale ? "Buyer" : "Tenant"}: the person entering into this
            agreement through Rentlet.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground">2. {isSale ? "Consideration" : "Rent & deposit"}</h3>
          {isSale ? (
            <p className="mt-1">
              Agreed price: {amount}, payable as per the schedule mutually agreed in writing.
            </p>
          ) : (
            <p className="mt-1">
              Monthly rent: {amount}
              {property.deposit != null ? `, security deposit: ${formatINR(property.deposit)}` : ""}
              {property.maintenance != null
                ? `, maintenance: ${formatINR(property.maintenance)} / month`
                : ""}
              . Rent is due on or before the 5th of each month.
            </p>
          )}
        </div>

        {!isSale && (
          <div>
            <h3 className="font-semibold text-foreground">3. Term & renewal</h3>
            <p className="mt-1">
              11 months from the date of possession, renewable by mutual consent. Either party may end
              the agreement with one month&apos;s written notice.
            </p>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-foreground">{isSale ? "3" : "4"}. Condition & handover</h3>
          <p className="mt-1">
            The property is handed over in its current condition. The {isSale ? "buyer" : "tenant"} shall
            keep it in good repair and return it in the same state, normal wear and tear excepted.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground">{isSale ? "4" : "5"}. Charges & taxes</h3>
          <p className="mt-1">
            Electricity, water and usage-based charges are borne by the occupant. Property tax and
            structural repairs remain the owner&apos;s responsibility.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground">{isSale ? "5" : "6"}. Rentlet&apos;s role</h3>
          <p className="mt-1">
            Rentlet is a listings marketplace and is not a party to this agreement. Verify every detail
            directly with the owner before signing. See our full{" "}
            <a href="/terms" className="font-semibold text-brand-navy underline" target="_blank" rel="noreferrer">
              Terms &amp; Conditions
            </a>
            .
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-5 w-full rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-dark"
      >
        Close
      </button>
    </Modal>
  );
}
