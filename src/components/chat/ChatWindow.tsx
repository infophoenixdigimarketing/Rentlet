"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Image as ImageIcon,
  CalendarClock,
  MoreVertical,
  Ban,
  Flag,
  Check,
  CheckCheck,
  MapPin,
} from "lucide-react";
import { PropertyImage } from "@/components/ui/PropertyImage";
import { ScheduleVisitModal } from "@/components/property/ScheduleVisitModal";
import { ReportUserModal } from "@/components/chat/ReportUserModal";
import { useChatMessages } from "@/lib/chat";
import { chatService } from "@/lib/services/chat.service";
import { propertyRepository } from "@/lib/services/properties.service";
import { cn, priceLabel } from "@/lib/utils";
import { toast } from "@/lib/toast";
import type { ChatRoom, ChatMessage } from "@/types/chat";
import type { Property } from "@/types/property";

export function ChatWindow({ room, onBack }: { room: ChatRoom; onBack?: () => void }) {
  const { messages, typing } = useChatMessages(room.id);
  const [text, setText] = useState("");
  const [visitOpen, setVisitOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [linkedProperty, setLinkedProperty] = useState<Property | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatService.markRead(room.id);
  }, [room.id]);

  useEffect(() => {
    // Scroll only the message list itself — never scrollIntoView() here, which walks every
    // scrollable ancestor (including the page) and was dragging the whole page down on send.
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    // ChatWindow is remounted per room (rendered with key={room.id}), so `linkedProperty`
    // already starts at its null default for property-less rooms — nothing to reset here.
    if (!room.propertyId) return;
    let cancelled = false;
    propertyRepository.getById(room.propertyId).then((p) => {
      if (!cancelled) setLinkedProperty(p);
    });
    return () => {
      cancelled = true;
    };
  }, [room.propertyId]);

  function sendText() {
    if (!text.trim()) return;
    chatService.send(room.id, { type: "text", text: text.trim() });
    setText("");
  }

  function sendImage() {
    chatService.send(room.id, { type: "image" });
  }

  function shareProperty() {
    if (!room.propertyId) return;
    chatService.send(room.id, { type: "property_card", propertyId: room.propertyId });
  }

  const initials = room.otherPartyName.split(" ").map((n) => n[0]).join("").slice(0, 2);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        {onBack && (
          <button type="button" onClick={onBack} aria-label="Back to conversations" className="rounded-full p-1.5 hover:bg-muted lg:hidden">
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}
        <span className="relative shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy-light text-xs font-bold text-brand-navy">{initials}</span>
          {room.otherPartyOnline && <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{room.otherPartyName}</p>
          <p className="text-xs text-muted-foreground">
            {typing ? <span className="text-brand-orange">typing...</span> : room.otherPartyOnline ? "Online" : "Offline"}
          </p>
        </div>

        <div className="relative">
          <button type="button" aria-label="Conversation options" onClick={() => setMenuOpen((v) => !v)} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted">
            <MoreVertical className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl border border-border bg-white shadow-xl">
              <button
                type="button"
                onClick={() => {
                  chatService.toggleBlock(room.id);
                  toast(room.blocked ? "User unblocked" : "User blocked");
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-sm text-foreground hover:bg-muted"
              >
                <Ban className="h-3.5 w-3.5" /> {room.blocked ? "Unblock" : "Block"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setReportOpen(true);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
              >
                <Flag className="h-3.5 w-3.5" /> Report
              </button>
            </div>
          )}
        </div>
      </div>

      {room.propertyTitle && (
        <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" /> <span className="truncate">Re: {room.propertyTitle}</span>
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <Bubble key={m.id} message={m} />
          ))}
          {typing && (
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2.5 w-fit">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          )}
        </div>
      </div>

      {room.blocked ? (
        <div className="flex items-center justify-between gap-3 border-t border-border bg-red-50 px-4 py-3">
          <p className="text-xs text-red-600">You&apos;ve blocked {room.otherPartyName}.</p>
          <button type="button" onClick={() => chatService.toggleBlock(room.id)} className="text-xs font-semibold text-red-700 hover:underline">
            Unblock
          </button>
        </div>
      ) : (
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2">
            {room.propertyId && (
              <button type="button" aria-label="Share property" onClick={shareProperty} className="shrink-0 rounded-full p-2 text-muted-foreground hover:bg-muted">
                <MapPin className="h-4 w-4" />
              </button>
            )}
            <button type="button" aria-label="Send photo" onClick={sendImage} className="shrink-0 rounded-full p-2 text-muted-foreground hover:bg-muted">
              <ImageIcon className="h-4 w-4" />
            </button>
            <button type="button" aria-label="Schedule visit" onClick={() => setVisitOpen(true)} className="shrink-0 rounded-full p-2 text-muted-foreground hover:bg-muted">
              <CalendarClock className="h-4 w-4" />
            </button>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendText()}
              placeholder="Type a message..."
              className="h-10 flex-1 rounded-full border border-border px-4 text-sm outline-none focus:border-brand-navy"
            />
            <button
              type="button"
              aria-label="Send message"
              onClick={sendText}
              disabled={!text.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-orange text-white disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {linkedProperty && (
        <ScheduleVisitModal
          open={visitOpen}
          onClose={() => setVisitOpen(false)}
          propertyId={linkedProperty.id}
          propertyTitle={linkedProperty.title}
          ownerId={linkedProperty.ownerId}
          onSubmit={({ date, slot }) => chatService.send(room.id, { type: "visit_request", visitInfo: { date, slot } })}
        />
      )}
      <ReportUserModal open={reportOpen} onClose={() => setReportOpen(false)} userName={room.otherPartyName} />
    </div>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  const mine = message.sender === "me";
  const time = new Date(message.createdAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });

  if (message.type === "property_card" && message.propertyId) {
    return (
      <BubbleShell mine={mine} time={time} read={message.read}>
        <PropertyCardChip propertyId={message.propertyId} />
      </BubbleShell>
    );
  }

  if (message.type === "visit_request" && message.visitInfo) {
    return (
      <BubbleShell mine={mine} time={time} read={message.read}>
        <div className={cn("flex items-center gap-2 rounded-xl px-3 py-2", mine ? "bg-white/15" : "bg-white")}>
          <CalendarClock className="h-4 w-4 shrink-0" />
          <div>
            <p className="text-xs font-bold">Visit Requested</p>
            <p className="text-xs opacity-90">{message.visitInfo.date}, {message.visitInfo.slot}</p>
          </div>
        </div>
      </BubbleShell>
    );
  }

  if (message.type === "image") {
    return (
      <BubbleShell mine={mine} time={time} read={message.read} tight>
        <div className="flex h-32 w-44 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-brand-navy-dark text-white/70">
          <ImageIcon className="h-6 w-6" />
        </div>
      </BubbleShell>
    );
  }

  return (
    <BubbleShell mine={mine} time={time} read={message.read}>
      <p className="text-sm">{message.text}</p>
    </BubbleShell>
  );
}

function BubbleShell({ mine, time, read, tight, children }: { mine: boolean; time: string; read: boolean; tight?: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col", mine ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl text-sm",
          tight ? "p-1" : "px-3.5 py-2.5",
          mine ? "rounded-br-sm bg-brand-orange text-white" : "rounded-bl-sm bg-muted text-foreground"
        )}
      >
        {children}
      </div>
      <span className="mt-1 flex items-center gap-1 px-1 text-[10px] text-muted-foreground">
        {time}
        {mine && (read ? <CheckCheck className="h-3 w-3 text-brand-orange" /> : <Check className="h-3 w-3" />)}
      </span>
    </div>
  );
}

function PropertyCardChip({ propertyId }: { propertyId: string }) {
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    let cancelled = false;
    propertyRepository.getById(propertyId).then((p) => {
      if (!cancelled) setProperty(p);
    });
    return () => {
      cancelled = true;
    };
  }, [propertyId]);

  if (!property) return null;

  return (
    <Link href={`/property/${property.slug}/${property.id}`} className="flex w-56 items-center gap-2.5 rounded-xl bg-white p-2 text-foreground">
      <PropertyImage id={property.id} propertyType={property.propertyType} className="h-12 w-12 shrink-0 rounded-lg" />
      <div className="min-w-0">
        <p className="line-clamp-1 text-xs font-semibold">{property.title}</p>
        <p className="text-xs font-bold text-brand-navy">{priceLabel(property)}</p>
      </div>
    </Link>
  );
}
