import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { sendMail, isMailConfigured } from "@/lib/email/send-mail";

// Custom 6-digit forgot-password flow, mirroring send-email-otp/verify-email-otp — replaces
// Firebase Auth's native (link-only) password reset email so this also routes through
// lib/email/send-mail.ts (Brevo / Resend / Gmail SMTP), not Firebase's own mailer.
const CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const RESEND_COOLDOWN_MS = 60 * 1000;

export async function POST(req: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Password reset isn't configured on this server yet." }, { status: 503 });
  }

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const email = (body.email || "").trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "Enter your email." }, { status: 400 });

  // Never reveal whether an account exists for this email — on a miss, respond exactly like a
  // successful send. Only the "does the code work" step below actually confirms anything.
  let uid: string;
  try {
    uid = (await getAdminAuth().getUserByEmail(email)).uid;
  } catch {
    return NextResponse.json({ ok: true });
  }

  const db = getAdminDb();
  const ref = db.collection("password_resets").doc(uid);
  const existing = await ref.get();
  const now = Date.now();
  if (existing.exists) {
    const lastSentAt = existing.data()?.lastSentAt as number | undefined;
    if (lastSentAt && now - lastSentAt < RESEND_COOLDOWN_MS) {
      return NextResponse.json(
        { error: "Please wait a bit before requesting another code.", retryInMs: RESEND_COOLDOWN_MS - (now - lastSentAt) },
        { status: 429 }
      );
    }
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  await ref.set({ code, email, attempts: 0, lastSentAt: now, expiresAt: now + CODE_TTL_MS });

  if (!isMailConfigured()) {
    return NextResponse.json({ error: "Email sending isn't configured on this server yet." }, { status: 503 });
  }

  const sent = await sendMail({
    to: email,
    subject: `${code} is your Rentlet password reset code`,
    html: `
      <p>Hi,</p>
      <p>Use this code to reset your Rentlet password:</p>
      <p style="font-size:28px;font-weight:bold;letter-spacing:4px;">${code}</p>
      <p>This code expires in 10 minutes. If you didn't request this, you can ignore this email — your password will stay the same.</p>
      <p>— Team Rentlet</p>
    `,
  });
  if (!sent) {
    return NextResponse.json({ error: "Couldn't send the code. Try again in a moment." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
