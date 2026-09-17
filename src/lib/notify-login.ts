/** "Welcome" email after a successful login/signup — the on-screen banner (WelcomeBanner.tsx)
 *  already covers the in-app greeting; this is the real email version. Never throws — a login
 *  must never be blocked or slowed down by this — but callers that have somewhere to show a
 *  failure (e.g. EmailVerifyGate) can `await` the returned promise and check it; fire-and-forget
 *  callers (GoogleButton, PhoneOtpForm) can keep ignoring it exactly as before. */
export async function notifyLogin(input: { email: string | null; name: string; isNewAccount?: boolean }): Promise<boolean> {
  if (!input.email) return false;
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
