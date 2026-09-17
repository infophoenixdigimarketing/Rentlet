import { NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email/welcome-email";
import { sendMail, isMailConfigured } from "@/lib/email/send-mail";

// Sends a real "welcome back" email after login, alongside the existing on-screen banner (see
// WelcomeBanner.tsx). Fully optional: with no mail transport configured it returns
// {skipped:true} and the caller ignores it, so a missing mail config never blocks a login.
// Only used by Google/Phone sign-in now (client-triggered, right after Firebase's client SDK
// completes the sign-in) — the email/password + OTP path calls sendWelcomeEmail() directly from
// api/auth/verify-email-otp/route.ts instead, server-side, right where verification succeeds.
type Payload = { email?: string; name?: string; isNewAccount?: boolean };

export async function POST(req: Request) {
  if (!isMailConfigured()) {
    return NextResponse.json({ skipped: true, reason: "Mail sending not configured" });
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email || "").trim();
  const name = (body.name || "there").trim();
  if (!email) return NextResponse.json({ error: "No email provided." }, { status: 400 });

  const sent = body.isNewAccount
    ? await sendWelcomeEmail(email, name)
    : await sendMail({
        to: email,
        subject: `Welcome back, ${name}!`,
        html: `
          <p>Hi ${name},</p>
          <p>Good to see you again on Rentlet.</p>
          <p>— Team Rentlet</p>
        `,
      });

  return sent ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Mail send failed." }, { status: 502 });
}
