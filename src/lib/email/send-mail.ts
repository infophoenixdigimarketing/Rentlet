import nodemailer from "nodemailer";

// Shared transactional-mail sender for every auth email (OTP codes, welcome). Prefers Resend
// (RESEND_API_KEY) — a dedicated transactional provider with none of a personal Gmail account's
// daily/burst sending limits or disposable-domain flagging — and falls back to the existing
// Gmail SMTP setup when no Resend key is configured, so nothing breaks before that key is added.
//
// To switch on Resend: sign up free at resend.com, verify a sending domain (or use their
// onboarding@resend.dev sandbox address to start), grab an API key, and set:
//   RESEND_API_KEY=re_...
//   RESEND_FROM=Rentlet <onboarding@resend.dev>   (or your verified address, once you have one)
export interface SendMailInput {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail(input: SendMailInput): Promise<boolean> {
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) return sendViaResend(resendKey, input);
  return sendViaSmtp(input);
}

async function sendViaResend(apiKey: string, input: SendMailInput): Promise<boolean> {
  const from = process.env.RESEND_FROM || "Rentlet <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [input.to],
        subject: input.subject,
        html: input.html,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("sendMail (Resend) failed:", res.status, body);
      return false;
    }
    return true;
  } catch (err) {
    console.error("sendMail (Resend) failed:", err);
    return false;
  }
}

async function sendViaSmtp(input: SendMailInput): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return false;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `Rentlet <${user}>`,
      to: input.to,
      subject: input.subject,
      html: input.html,
    });
    return true;
  } catch (err) {
    console.error("sendMail (SMTP) failed:", err);
    return false;
  }
}

/** True once either transport is actually configured — lets a route return a clean 503 instead
 *  of attempting a send that can only fail. */
export function isMailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY) || Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}
