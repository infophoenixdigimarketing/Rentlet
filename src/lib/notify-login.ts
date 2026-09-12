/** Fire-and-forget "welcome" email after a successful login/signup — the on-screen banner
 *  (WelcomeBanner.tsx) already covers the in-app greeting; this is the real email version.
 *  Silently does nothing if it fails (SMTP not configured, network hiccup, etc.) — a login must
 *  never be blocked or slowed down by this. */
export function notifyLogin(input: { email: string | null; name: string; isNewAccount?: boolean }) {
  if (!input.email) return;
  fetch("/api/auth/notify-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: input.email, name: input.name, isNewAccount: input.isNewAccount }),
  }).catch(() => {});
}
