// Shared language-switch logic for every place that offers it (the header LanguageMenu and
// the "Menu" dropdown). Translation itself is done by the Google widget mounted in
// GoogleTranslate.tsx — here we set the `googtrans` cookie it reads, flip its hidden <select>
// when possible, and reload.

export const LANGUAGES = [
  { code: "en", label: "English", en: "English" },
  { code: "hi", label: "हिन्दी", en: "Hindi" },
  { code: "kn", label: "ಕನ್ನಡ", en: "Kannada" },
  { code: "ta", label: "தமிழ்", en: "Tamil" },
  { code: "te", label: "తెలుగు", en: "Telugu" },
  { code: "ml", label: "മലയാളം", en: "Malayalam" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

const COOKIE = "googtrans";
const EXPIRED = "Thu, 01 Jan 1970 00:00:00 GMT";

/** Every host the `googtrans` cookie could have been written on (Google, our code, a CDN). */
function cookieDomains(): string[] {
  const host = window.location.hostname; // e.g. slateblue-porpoise-833249.hostingersite.com
  const parts = host.split(".");
  const base = parts.length > 2 ? parts.slice(-2).join(".") : host; // hostingersite.com
  return Array.from(new Set([host, `.${host}`, base, `.${base}`, ""]));
}

/** Wipe the translate cookie on every domain/path variant so English actually sticks. */
function clearCookie() {
  for (const d of cookieDomains()) {
    const dom = d ? `; domain=${d}` : "";
    document.cookie = `${COOKIE}=; expires=${EXPIRED}; path=/${dom}`;
    document.cookie = `${COOKIE}=; expires=${EXPIRED}; path=${dom}`;
  }
}

function setCookie(code: LangCode) {
  for (const d of cookieDomains()) {
    const dom = d ? `; domain=${d}` : "";
    document.cookie = `${COOKIE}=/en/${code}; path=/${dom}`;
  }
}

/** Active target language from the `googtrans` cookie ("/en/hi" -> "hi"). */
export function readActiveLang(): LangCode {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  const target = m ? decodeURIComponent(m[1]).split("/").filter(Boolean).pop() : "en";
  return (LANGUAGES.some((l) => l.code === target && l.code !== "en") ? target : "en") as LangCode;
}

/** Try to switch instantly through Google's own <select>. False if it isn't ready yet. */
function flipCombo(code: LangCode): boolean {
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (!combo) return false;
  combo.value = code === "en" ? "" : code;
  combo.dispatchEvent(new Event("change"));
  return true;
}

/** Is the page currently showing a Google translation, regardless of the cookie? */
function isTranslated(): boolean {
  if (typeof document === "undefined") return false;
  const html = document.documentElement;
  if (html.classList.contains("translated-ltr") || html.classList.contains("translated-rtl")) return true;
  const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
  if (combo && combo.value && combo.value !== "en") return true;
  return readActiveLang() !== "en";
}

/** Switch the whole site to `code`. English does a full, reliable reset back to the original. */
export function switchLanguage(code: LangCode) {
  if (code === "en") {
    // Always run — never trust "already English"; Google may still be showing a translation
    // even after the cookie is gone. Clear the cookie everywhere, drop Google's <html>
    // markers, revert the widget, then hard reload.
    clearCookie();
    document.documentElement.classList.remove("site-translated", "translated-ltr", "translated-rtl");
    flipCombo("en");
    window.location.reload();
    return;
  }

  if (code === readActiveLang() && !isTranslated()) return;

  clearCookie();
  setCookie(code);
  document.documentElement.classList.add("site-translated");
  if (!flipCombo(code)) window.location.reload();
}
