import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";
import { sendWelcomeEmail } from "@/lib/email/welcome-email";

const MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Email verification isn't configured on this server yet." }, { status: 503 });
  }

  const authHeader = req.headers.get("authorization") || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!idToken) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const submitted = (body.code || "").trim();
  if (!/^\d{6}$/.test(submitted)) {
    return NextResponse.json({ error: "Enter the 6-digit code from your email." }, { status: 400 });
  }

  let uid: string;
  try {
    uid = (await getAdminAuth().verifyIdToken(idToken)).uid;
  } catch {
    return NextResponse.json({ error: "Your session has expired — please log in again." }, { status: 401 });
  }

  const db = getAdminDb();
  const ref = db.collection("email_otps").doc(uid);
  const snap = await ref.get();
  if (!snap.exists) {
    return NextResponse.json({ error: "No code was requested. Send a new one." }, { status: 400 });
  }

  const data = snap.data() as { code: string; expiresAt: number; attempts: number };
  if (Date.now() > data.expiresAt) {
    await ref.delete();
    return NextResponse.json({ error: "That code expired. Send a new one." }, { status: 400 });
  }
  if (data.attempts >= MAX_ATTEMPTS) {
    await ref.delete();
    return NextResponse.json({ error: "Too many incorrect attempts. Send a new code." }, { status: 400 });
  }
  if (data.code !== submitted) {
    await ref.update({ attempts: data.attempts + 1 });
    return NextResponse.json({ error: "Incorrect code. Try again." }, { status: 400 });
  }

  await getAdminAuth().updateUser(uid, { emailVerified: true });
  await ref.delete();

  // Send the welcome email right here, server-side, atomically with verification succeeding —
  // not as a second client-triggered fetch afterward (that extra network hop, dependent on the
  // browser tab staying alive, is exactly what let this go silently missing before). Best-effort:
  // a mail hiccup must never turn a successful verification into an error response.
  try {
    const record = await getAdminAuth().getUser(uid);
    if (record.email) {
      const firstName = (record.displayName || "there").trim().split(" ")[0];
      const sent = await sendWelcomeEmail(record.email, firstName);
      return NextResponse.json({ ok: true, welcomeEmailSent: sent });
    }
  } catch (err) {
    console.error("verify-email-otp: welcome email failed", err);
  }

  return NextResponse.json({ ok: true, welcomeEmailSent: false });
}
