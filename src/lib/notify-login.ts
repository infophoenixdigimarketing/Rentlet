function welcomeAlreadySentTo(email: string): boolean {
  try {
    const key = `rentlet_welcome_sent_${email.trim().toLowerCase()}`;
    if (window.localStorage.getItem(key)) return true;
    window.localStorage.setItem(key, "1");
    return false;
  } catch {
    return false; // storage unavailable (private mode etc.) — fine to just send
  }
}

/** "Welcome" email after a successful login/signup — the on-screen banner (WelcomeBanner.tsx)
 *  already covers the in-app greeting; this is the real email version. Never throws — a login
 *  must never be blocked or slowed down by this — but callers that have somewhere to show a
 *  failure (e.g. EmailVerifyGate) can `await` the returned promise and check it; fire-and-forget
 *  callers (GoogleButton, PhoneOtpForm) can keep ignoring it exactly as before.
 *
 *  Email-link verification (handleCodeInApp: true, see auth.service.ts) can complete in two
 *  places at once if the original "check your email" tab is still open when the link is
 *  clicked elsewhere — that tab's background poll and the tab that did the clicking would both
 *  independently notice the account is now verified and call this. The localStorage guard below
 *  only covers isNewAccount (the case that can actually double-fire this way) so a real repeat
 *  login still gets its own "welcome back" every time. */
export async function notifyLogin(input: { email: string | null; name: string; isNewAccount?: boolean }): Promise<boolean> {
  if (!input.email) return false;
  if (input.isNewAccount && typeof window !== "undefined" && welcomeAlreadySentTo(input.email)) return true;
  try {
    const res = await fetch("/api/auth/notify-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: input.email, name: input.name, isNewAccount: input.isNewAccount }),
    });
    if (!res.ok) return false;
    const data = (await res.json().catch(() => null)) as { ok?: boolean; skipped?: boolean } | null;
    return Boolean(data?.ok);
  } catch {
    return false;
  }
}
