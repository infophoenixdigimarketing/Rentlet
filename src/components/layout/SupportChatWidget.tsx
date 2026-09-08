"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Headset } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMsg = { from: "bot" | "user"; text: string };

const GREETING: ChatMsg = {
  from: "bot",
  text: "Hi 👋 I'm the Rentlet assistant. Ask me anything about posting a property or finding a home.",
};

const QUICK_LINKS = [
  { label: "Post a property", href: "/post-property" },
  { label: "Browse properties", href: "/properties" },
  { label: "Help centre", href: "/help" },
  { label: "Contact us", href: "/contact" },
];

export function SupportChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<ChatMsg[]>([GREETING]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open, sending]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    setDraft("");
    const nextMsgs: ChatMsg[] = [...msgs, { from: "user", text }];
    setMsgs(nextMsgs);
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMsgs }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMsgs((m) => [
        ...m,
        { from: "bot", text: data.reply || data.error || "Sorry, something went wrong. Please try again." },
      ]);
    } catch {
      setMsgs((m) => [
        ...m,
        { from: "bot", text: "I couldn't reach the assistant. Check your connection and try again." },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with us"}
        className={cn(
          "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-xl shadow-black/20 transition-transform hover:scale-105",
          open && "scale-0"
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed bottom-5 right-5 z-40 flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-black/25 transition-all",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
        style={{ maxHeight: "min(32rem, calc(100vh - 2.5rem))" }}
        role="dialog"
        aria-label="Support chat"
      >
        <div className="flex items-center gap-3 bg-brand-navy px-4 py-3 text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
            <Headset className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">Rentlet Support</p>
            <p className="text-[11px] text-white/70">Typically replies in a few minutes</p>
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1 hover:bg-white/10">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto bg-muted/40 px-3.5 py-4">
          {msgs.map((m, i) => (
            <div key={i} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
              <p
                className={cn(
                  "max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm",
                  m.from === "user"
                    ? "rounded-br-sm bg-brand-navy text-white"
                    : "rounded-bl-sm border border-border bg-white text-foreground"
                )}
              >
                {m.text}
              </p>
            </div>
          ))}

          {sending && (
            <div className="flex justify-start">
              <p className="rounded-2xl rounded-bl-sm border border-border bg-white px-3.5 py-2 text-sm text-muted-foreground">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" />
                </span>
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 pt-1">
            {QUICK_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-full border border-border bg-white px-3 py-1 text-xs font-semibold text-brand-navy hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-2.5">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type your message…"
            disabled={sending}
            className="h-10 flex-1 rounded-xl border border-border bg-white px-3 text-sm outline-none focus:border-brand-navy disabled:opacity-60"
          />
          <button
            type="submit"
            aria-label="Send"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-white hover:bg-brand-orange-dark disabled:opacity-50"
            disabled={!draft.trim() || sending}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
