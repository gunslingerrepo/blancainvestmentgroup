import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

export class MailNotConfiguredError extends Error {
  constructor() {
    super("Email delivery is not configured. Set RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS.");
  }
}

export type MailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export const mailConfig = () => ({
  from: process.env.MAIL_FROM || "Blanca Investment Website <no-reply@blancainvestmentltd.co>",
  quoteTo: process.env.CONTACT_TO_EMAIL || "info@blancainvestmentltd.co",
  complaintTo: process.env.COMPLAINTS_TO_EMAIL || process.env.CONTACT_TO_EMAIL || "info@blancainvestmentltd.co",
  sendConfirmation: process.env.SEND_CONFIRMATION_EMAIL !== "false",
});

export function mailProvider(): "resend" | "smtp" | null {
  if (process.env.RESEND_API_KEY) return "resend";
  if (process.env.SMTP_HOST) return "smtp";
  return null;
}

let transporter: Transporter | null = null;
function smtp() {
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT || 587);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });
  }
  return transporter;
}

export async function sendMail(msg: MailMessage) {
  const provider = mailProvider();
  const { from } = mailConfig();
  if (provider === "resend") {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [msg.to], subject: msg.subject, html: msg.html, text: msg.text, reply_to: msg.replyTo }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
    return;
  }
  if (provider === "smtp") {
    await smtp().sendMail({ from, to: msg.to, subject: msg.subject, html: msg.html, text: msg.text, replyTo: msg.replyTo });
    return;
  }
  throw new MailNotConfiguredError();
}
