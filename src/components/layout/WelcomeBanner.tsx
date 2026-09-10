"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

// Auth flows write a greeting here just before redirecting; this banner shows it once on the
// next page. A sessionStorage handoff survives the navigation but not a new tab / reload.
export const WELCOME_KEY = "rentlet:welcome";

export function WelcomeBanner() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let text: string | null = null;
    try {
      text = window.sessionStorage.getItem(WELCOME_KEY);
      if (text) window.sessionStorage.removeItem(WELCOME_KEY);
    } catch {
      /* private mode / storage blocked */
    }
    if (!text) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot handoff read post-nav
    setMessage(text);
    const t = setTimeout(() => setMessage(null), 7000);
    return () => clearTimeout(t);
  }, []);

  if (!message) return null;

  return (
    <div className="border-b border-emerald-200 bg-emerald-50">
      <div className="container-rentlet flex items-center gap-3 py-2.5 text-sm text-emerald-800">
        <span aria-hidden>👋</span>
        <span className="min-w-0 flex-1 font-semibold">{message}</span>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setMessage(null)}
          className="shrink-0 rounded-lg p-1 text-emerald-700 hover:bg-emerald-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
