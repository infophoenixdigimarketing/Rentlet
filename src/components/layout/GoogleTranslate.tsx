"use client";

import { useEffect } from "react";

// Whole-site translation via Google's website widget. Our LanguageMenu drives it: it sets
// the `googtrans` cookie AND (when the widget is already on the page) flips Google's hidden
// <select.goog-te-combo> so the switch is instant. On a fresh load with the cookie present,
// this component also re-applies the choice once the combo appears — Google's own
// auto-translate-from-cookie is unreliable on localhost.

export const TRANSLATE_LANGS = "en,hi,kn,ta,te,ml";
const COOKIE = "googtrans";
const VALID = new Set(["hi", "kn", "ta", "te", "ml"]);

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (opts: Record<string, unknown>, el: string) => void;
      };
    };
  }
}

function cookieLang(): string {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!m) return "en";
  const parts = decodeURIComponent(m[1]).split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "en";
  return VALID.has(last) ? last : "en"; // anything unexpected → treat as English
}

/** Clear a stale / corrupted googtrans cookie on every domain/path variant. */
function clearStaleCookie() {
  const host = window.location.hostname;
  const p = host.split(".");
  const base = p.length > 2 ? p.slice(-2).join(".") : host;
  for (const d of [host, `.${host}`, base, `.${base}`, ""]) {
    const dom = d ? `; domain=${d}` : "";
    document.cookie = `${COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${dom}`;
  }
}

export function GoogleTranslate() {
  useEffect(() => {
    const SCRIPT_ID = "google-translate-script";

    // If the googtrans cookie is set but not one of our supported languages, it's stale /
    // corrupted — wipe it so the site doesn't get stuck showing a broken translation.
    const raw = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
    if (raw && cookieLang() === "en") clearStaleCookie();

    // Our own "is a non-English translation active" flag on <html>. CSS uses it (see
    // globals.css) to compact the header for the longer Indic scripts — more reliable
    // than depending on Google's `translated-ltr` class.
    document.documentElement.classList.toggle("site-translated", cookieLang() !== "en");

    if (!document.getElementById(SCRIPT_ID)) {
      window.googleTranslateElementInit = () => {
        const ctor = window.google?.translate?.TranslateElement;
        if (!ctor) return;
        new ctor(
          { pageLanguage: "en", includedLanguages: TRANSLATE_LANGS, autoDisplay: false },
          "google_translate_element"
        );
      };
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Once the widget's <select> exists, make sure it matches the cookie (covers a
    // reload where Google didn't auto-apply). Poll for up to ~12s.
    const want = cookieLang();
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo && want !== "en" && combo.value !== want) {
        combo.value = want;
        combo.dispatchEvent(new Event("change"));
      }
      if (tries > 48 || (combo && (want === "en" || combo.value === want))) {
        window.clearInterval(timer);
      }
    }, 250);

    // Google injects a grey "Translated into…" banner (<iframe class="skiptranslate">) and
    // pushes <body> down to fit it. Hide the banner and keep <body> pinned to the top.
    // Every write below is guarded so once things settle `tidy` is a no-op — otherwise the
    // observer would keep re-firing on its own DOM writes (that loop was the earlier bug).
    const tidy = () => {
      const banner = document.querySelector<HTMLElement>(
        "iframe.skiptranslate, .goog-te-banner-frame"
      );
      if (banner && banner.style.display !== "none") banner.style.display = "none";

      const top = document.body.style.top;
      if (top !== "" && top !== "0px") document.body.style.top = "0px";
    };
    tidy();
    const observer = new MutationObserver(tidy);
    observer.observe(document.body, {
      childList: true,
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  // Mounted (not display:none — see globals.css) so Google can attach its engine here.
  return <div id="google_translate_element" aria-hidden />;
}
