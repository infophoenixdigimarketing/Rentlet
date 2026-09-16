import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Sends a real "welcome back" email after login, alongside the existing on-screen banner (see
// WelcomeBanner.tsx). Fully optional, same as notify-listing: with no SMTP env vars it returns
// {skipped:true} and the caller ignores it, so a missing mail config never blocks a login.
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

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  const heading = body.isNewAccount ? `Welcome to Rentlet, ${name}!` : `Welcome back, ${name}!`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rentlet.in";

  try {
    await transporter.sendMail({
      from: `Rentlet <${user}>`,
      to: email,
      subject: heading,
      html: body.isNewAccount
        ? `
          <p>Hi ${name},</p>
          <p>Your Rentlet account is ready. Browse verified homes, apartments, villas and more — or post your own property for free.</p>
          <p style="margin:24px 0;">
            <a href="${siteUrl}/properties" style="background:#FF5A00;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;">Explore Rentlet</a>
          </p>
          <p>— Team Rentlet</p>
        `
        : `
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
