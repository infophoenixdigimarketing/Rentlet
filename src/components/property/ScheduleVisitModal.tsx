"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { notificationsService } from "@/lib/services/notifications.service";
import { visitsService } from "@/lib/services/visits.service";
import { leadsService } from "@/lib/services/leads.service";
import { useAuth } from "@/lib/auth";

const SLOTS = ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "6:00 PM"];
const CUSTOM = "__custom__";

// Booking cutoff — a slot must be at least this many minutes away to be offered today.
const LEAD_MINUTES = 30;

// "2:00 PM" -> minutes since midnight
function slotToMinutes(s: string): number {
  const m = s.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!m) return 0;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return h * 60 + Number(m[2]);
}

function nextDays(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
}

export function ScheduleVisitModal({
  open,
  onClose,
  propertyId,
  propertyTitle,
  ownerId,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
  ownerId: string;
  /** e.g. ChatWindow uses this to drop a visit_request bubble into the conversation */
  onSubmit?: (info: { date: string; slot: string; visitors: number; message: string }) => void;
}) {
  const { user } = useAuth();
  const days = nextDays(7);
  const [dayIndex, setDayIndex] = useState(0);

  // Slots still bookable for the chosen day: everything for a future day, only
  // future-enough times when the chosen day is today.
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const slotsForDay = (index: number) =>
    index === 0 ? SLOTS.filter((s) => slotToMinutes(s) > nowMinutes + LEAD_MINUTES) : SLOTS;
  const availableSlots = slotsForDay(dayIndex);

  const [slot, setSlot] = useState(() => slotsForDay(0)[0] ?? CUSTOM);
  // Preferred-time picker parts (12-hour with an explicit AM/PM, since the native
  // <input type="time"> shows 24-hour on many setups).
  const [customHour, setCustomHour] = useState(10); // 1–12
  const [customMin, setCustomMin] = useState("00"); // "00","15","30","45"
  const [customMeridiem, setCustomMeridiem] = useState<"AM" | "PM">("AM");
  const customLabel = `${customHour}:${customMin} ${customMeridiem}`;
  const customMinutes = slotToMinutes(customLabel); // minutes since midnight

  function pickDay(index: number) {
    setDayIndex(index);
    const next = slotsForDay(index);
    // If the currently selected preset is no longer valid for this day, move to the
    // first one that is (or the custom-time option when none are left).
    if (slot !== CUSTOM && !next.includes(slot)) setSlot(next[0] ?? CUSTOM);
  }
  const [visitors, setVisitors] = useState(1);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // No separate contact-number field — the owner reaches the requester through their account
  // (phone if they have one on file, otherwise the in-app lead/chat).
  const contactPhone = user?.phone ?? null;
  // The time actually sent — a preset slot, or the user's own preferred time.
  const effectiveSlot = slot === CUSTOM ? customLabel : slot;

  function submit() {
    if (!user) {
      toast("Login to schedule a visit", "info");
      return;
    }
    if (!effectiveSlot) {
      toast("Pick a time slot or enter your preferred time.", "error");
      return;
    }
    if (dayIndex === 0 && slot === CUSTOM && customMinutes <= nowMinutes + LEAD_MINUTES) {
      toast("Pick a time later today, or choose another day.", "error");
      return;
    }
    setSubmitting(true);
    const dateLabel = days[dayIndex].toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    const contactLine = contactPhone ? `Contact: ${contactPhone}` : null;
    const fullMessage = [contactLine, message.trim() || null].filter(Boolean).join(" — ");
    setTimeout(() => {
      setSubmitting(false);
      onClose();
      visitsService.create({
        propertyId,
        propertyTitle,
        ownerId,
        requesterId: user.id,
        requesterName: user.name,
        date: dateLabel,
        slot: effectiveSlot,
        visitorCount: visitors,
        message: fullMessage,
      });
      // The visit is also a CRM touchpoint — raise a lead so it lands on the admin
      // pipeline with the requested date/time, ready for an agent to take.
      leadsService.create({
        propertyId,
        propertyTitle,
        ownerId,
        userName: user.name,
        userPhone: contactPhone ?? "Not shared",
        source: "visit",
      });
      onSubmit?.({ date: dateLabel, slot: effectiveSlot, visitors, message: fullMessage });
      notificationsService.push(
        "VISIT_REQUEST",
        `Visit booked for "${propertyTitle}" — ${dateLabel}, ${effectiveSlot} (${visitors} visitor${visitors > 1 ? "s" : ""}). Confirm it.`,
        "/admin/visits"
      );
      notificationsService.push("VISIT_REQUEST", `Visit requested for ${propertyTitle} — ${dateLabel}, ${effectiveSlot}.`, "/owner/visits");
      toast(`Visit request sent for ${dateLabel}, ${effectiveSlot}. A RENTLET manager will confirm.`);
    }, 500);
  }

  return (
    <Modal open={open} onClose={onClose} title="Schedule a Visit">
      <p className="text-xs text-muted-foreground">{propertyTitle}</p>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Select Date</p>
        <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1">
          {days.map((d, i) => (
            <button
              key={d.toISOString()}
              type="button"
              onClick={() => pickDay(i)}
              className={cn(
                "flex shrink-0 flex-col items-center rounded-xl border px-3.5 py-2 text-center",
                dayIndex === i ? "border-brand-orange bg-brand-orange-light text-brand-orange-dark" : "border-border text-foreground hover:bg-muted"
              )}
            >
              <span className="text-[10px] font-semibold uppercase">{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
              <span className="text-sm font-bold">{d.getDate()}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Select Time</p>
        {dayIndex === 0 && availableSlots.length < SLOTS.length && (
          <p className="mt-1 text-xs text-muted-foreground">
            {availableSlots.length === 0
              ? "All of today's slots have passed — pick another day or enter a preferred time."
              : "Past slots for today are hidden."}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-2">
          {availableSlots.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSlot(s)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm font-medium",
                slot === s ? "border-brand-navy bg-brand-navy text-white" : "border-border text-foreground hover:bg-muted"
              )}
            >
              {s}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSlot(CUSTOM)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium",
              slot === CUSTOM ? "border-brand-navy bg-brand-navy text-white" : "border-border text-foreground hover:bg-muted"
            )}
          >
            Other time
          </button>
        </div>
        {slot === CUSTOM && (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <select
                aria-label="Hour"
                value={customHour}
                onChange={(e) => setCustomHour(Number(e.target.value))}
                className="rounded-lg border border-border px-2.5 py-2 text-sm outline-none focus:border-brand-navy"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <span className="text-sm font-semibold text-muted-foreground">:</span>
              <select
                aria-label="Minute"
                value={customMin}
                onChange={(e) => setCustomMin(e.target.value)}
                className="rounded-lg border border-border px-2.5 py-2 text-sm outline-none focus:border-brand-navy"
              >
                {["00", "15", "30", "45"].map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <div className="flex overflow-hidden rounded-lg border border-border">
                {(["AM", "PM"] as const).map((mer) => (
                  <button
                    key={mer}
                    type="button"
                    onClick={() => setCustomMeridiem(mer)}
                    className={cn(
                      "px-3 py-2 text-sm font-semibold",
                      customMeridiem === mer ? "bg-brand-navy text-white" : "text-foreground hover:bg-muted"
                    )}
                  >
                    {mer}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Preferred visit time: <span className="font-semibold text-foreground">{customLabel}</span> — a
              RENTLET manager will confirm the exact slot.
            </p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Number of Visitors</p>
        <div className="mt-2 inline-flex items-center gap-3 rounded-lg border border-border px-3 py-1.5">
          <button
            type="button"
            aria-label="Decrease visitors"
            onClick={() => setVisitors((v) => Math.max(1, v - 1))}
            className="text-muted-foreground hover:text-foreground"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-4 text-center text-sm font-semibold">{visitors}</span>
          <button
            type="button"
            aria-label="Increase visitors"
            onClick={() => setVisitors((v) => Math.min(6, v + 1))}
            className="text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="visit-message" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Message (optional)
        </label>
        <textarea
          id="visit-message"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Anything the owner should know before your visit?"
          className="mt-2 w-full resize-none rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy"
        />
      </div>

      <Button className="mt-5 w-full" size="lg" onClick={submit} disabled={submitting || !effectiveSlot}>
        {submitting ? "Sending..." : "Submit Visit Request"}
      </Button>
    </Modal>
  );
}
