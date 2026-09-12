import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getAdminAuth, getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

// Sends a 6-digit email verification code, mirroring the phone-OTP experience (spec request:
// "give this like a phone number, do the email also"). Firebase Auth's own email verification is
// link-only — there's no client-SDK way to turn that into a typed code — so this is a small,
// genuinely custom OTP system backed by the Firebase Admin SDK (see lib/firebase/admin.ts),
// which is the only thing allowed to mark an address verified outside of Firebase's own link flow.
const CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const RESEND_COOLDOWN_MS = 60 * 1000; // matches PhoneOtpForm's 60s resend timer

export async function POST(req: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Email verification isn't configured on this server yet." }, { status: 503 });
  }

  const authHeader = req.headers.get("authorization") || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!idToken) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  let uid: string;
  let email: string | undefined;
  try {
    const decoded = await getAdminAuth().verifyIdToken(idToken);
    uid = decoded.uid;
    email = decoded.email;
  } catch {
    return NextResponse.json({ error: "Your session has expired — please log in again." }, { status: 401 });
  }
  if (!email) return NextResponse.json({ error: "This account has no email to verify." }, { status: 400 });

  const db = getAdminDb();
  const ref = db.collection("email_otps").doc(uid);
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

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    // Mirrors notify-listing's "skip cleanly if unset" — but here the user is actively waiting
    // for a code, so this must be a hard error rather than a silent no-op.
    return NextResponse.json({ error: "Email sending isn't configured on this server yet." }, { status: 503 });
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
      subject: `${code} is your Rentlet verification code`,
      html: `
        <p>Hi,</p>
        <p>Your Rentlet verification code is:</p>
        <p style="font-size:28px;font-weight:bold;letter-spacing:4px;">${code}</p>
        <p>This code expires in 10 minutes. If you didn't request this, you can ignore this email.</p>
        <p>— Team Rentlet</p>
      `,
    });
  } catch (err) {
    console.error("send-email-otp mail failed:", err);
    return NextResponse.json({ error: "Couldn't send the code. Try again in a moment." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
