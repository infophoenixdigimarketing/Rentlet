import { NextResponse } from "next/server";
import { getAdminAuth, getAdminDb, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

const MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Password reset isn't configured on this server yet." }, { status: 503 });
  }

  let body: { email?: string; code?: string; newPassword?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const email = (body.email || "").trim().toLowerCase();
  const submitted = (body.code || "").trim();
  const newPassword = body.newPassword || "";
  if (!/^\d{6}$/.test(submitted)) {
    return NextResponse.json({ error: "Enter the 6-digit code from your email." }, { status: 400 });
  }
  if (newPassword.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
  }

  let uid: string;
  try {
    uid = (await getAdminAuth().getUserByEmail(email)).uid;
  } catch {
    // Same account-not-found path as an incorrect code — never confirm which emails exist.
    return NextResponse.json({ error: "Incorrect code. Try again." }, { status: 400 });
  }

  const db = getAdminDb();
  const ref = db.collection("password_resets").doc(uid);
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

  await getAdminAuth().updateUser(uid, { password: newPassword });
  await ref.delete();

  return NextResponse.json({ ok: true });
}
