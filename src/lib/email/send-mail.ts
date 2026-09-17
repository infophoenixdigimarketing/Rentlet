import nodemailer from "nodemailer";

// Shared transactional-mail sender for every auth email (OTP codes, welcome). Tries transports
// in order — Brevo, then Resend, then Gmail SMTP — using whichever's API key is actually set, so
// nothing breaks while you're mid-setup. Brevo (brevo.com, formerly Sendinblue) and Resend are
// both dedicated transactional providers with none of a personal Gmail account's daily/burst
// sending limits or disposable-domain flagging.
//
// To switch on Brevo: sign up free at brevo.com -> Settings -> SMTP & API -> API Keys -> Create
// a new API key, then set:
//   BREVO_API_KEY=xkeysib-...
//   BREVO_FROM_EMAIL=you@yourdomain.com   (must be a "Sender" you've verified in Brevo)
//   BREVO_FROM_NAME=Rentlet                (optional, defaults to "Rentlet")
export interface SendMailInput {
  to: string;
  subject: string;
  html: string;
}

export async function sendMail(input: SendMailInput): Promise<boolean> {
  const brevoKey = process.env.BREVO_API_KEY;
  if (brevoKey) return sendViaBrevo(brevoKey, input);

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) return sendViaResend(resendKey, input);

  return sendViaSmtp(input);
}

async function sendViaBrevo(apiKey: string, input: SendMailInput): Promise<boolean> {
  const fromEmail = process.env.BREVO_FROM_EMAIL;
  const fromName = process.env.BREVO_FROM_NAME || "Rentlet";
  if (!fromEmail) {
    console.error("sendMail (Brevo) failed: BREVO_FROM_EMAIL is not set (must be a verified Brevo sender).");
    return false;
  }
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: fromEmail, name: fromName },
        to: [{ email: input.to }],
        subject: input.subject,
        htmlContent: input.html,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("sendMail (Brevo) failed:", res.status, body);
      return false;
    }
    return true;
  } catch (err) {
    console.error("sendMail (Brevo) failed:", err);
    return false;
  }
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

/** True once any transport is actually configured — lets a route return a clean 503 instead
 *  of attempting a send that can only fail. */
export function isMailConfigured(): boolean {
  return (
    Boolean(process.env.BREVO_API_KEY && process.env.BREVO_FROM_EMAIL) ||
    Boolean(process.env.RESEND_API_KEY) ||
    Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  );
}
