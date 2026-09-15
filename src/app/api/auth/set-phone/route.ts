import { NextResponse } from "next/server";
import { getAdminAuth, isFirebaseAdminConfigured } from "@/lib/firebase/admin";

// Sets an unverified phone number on an email/password account — the client SDK has no way to
// do this directly (phoneNumber is normally only set via actual phone-OTP verification), so this
// goes through the Admin SDK, which can set it as plain contact info without that verification
// step. Called right after email signup, when a phone is required so admin can call back a
// visitor whose account has no verified phone otherwise.
export async function POST(req: Request) {
  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const authHeader = req.headers.get("authorization") || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!idToken) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  let uid: string;
  try {
    uid = (await getAdminAuth().verifyIdToken(idToken)).uid;
  } catch {
    return NextResponse.json({ error: "Your session has expired — please log in again." }, { status: 401 });
  }

  let body: { phone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const phone = (body.phone || "").trim();
  if (!/^\+\d{8,15}$/.test(phone)) {
    return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
  }

  try {
    await getAdminAuth().updateUser(uid, { phoneNumber: phone });
  } catch (err) {
    const code = typeof err === "object" && err !== null && "code" in err ? String((err as { code: unknown }).code) : "";
    if (code === "auth/phone-number-already-exists") {
      return NextResponse.json({ error: "That phone number is already used by another account." }, { status: 409 });
    }
    console.error("set-phone failed:", err);
    return NextResponse.json({ error: "Couldn't save that phone number." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
