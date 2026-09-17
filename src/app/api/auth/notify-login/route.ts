import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sendWelcomeEmail } from "@/lib/email/welcome-email";

// Sends a real "welcome back" email after login, alongside the existing on-screen banner (see
// WelcomeBanner.tsx). Fully optional, same as notify-listing: with no SMTP env vars it returns
// {skipped:true} and the caller ignores it, so a missing mail config never blocks a login.
// Only used by Google/Phone sign-in now (client-triggered, right after Firebase's client SDK
// completes the sign-in) — the email/password + OTP path calls sendWelcomeEmail() directly from
// api/auth/verify-email-otp/route.ts instead, server-side, right where verification succeeds.
type Payload = { email?: string; name?: string; isNewAccount?: boolean };

export async function POST(req: Request) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return NextResponse.json({ skipped: true, reason: "SMTP not configured" });
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

  if (body.isNewAccount) {
    const ok = await sendWelcomeEmail(email, name);
    return ok ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "Mail send failed." }, { status: 502 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `Rentlet <${user}>`,
      to: email,
      subject: `Welcome back, ${name}!`,
      html: `
        <p>Hi ${name},</p>
        <p>Good to see you again on Rentlet.</p>
        <p>— Team Rentlet</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("notify-login mail failed:", err);
    return NextResponse.json({ error: "Mail send failed." }, { status: 502 });
  }
}
