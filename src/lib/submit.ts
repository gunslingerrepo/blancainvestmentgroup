import "server-only";
import { NextResponse } from "next/server";
import { MailNotConfiguredError, mailConfig, mailProvider, sendMail } from "./mailer";
import { clientEmail, staffEmail, type Row } from "./email-templates";

/* ── Basic in-memory rate limit (per server instance) ── */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = Number(process.env.FORM_RATE_LIMIT || 5);

export function rateLimited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > MAX_PER_WINDOW;
}

export const clientIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";

export function makeReference(prefix: "Q" | "C") {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BIL-${prefix}-${ymd}-${rand}`;
}

export const json = (status: number, body: Record<string, unknown>) => NextResponse.json(body, { status });

export async function deliver(opts: {
  kind: "quote" | "complaint";
  reference: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  rows: Row[];
  clientRows: Row[];
}) {
  if (!mailProvider()) {
    console.error("[forms] Email not configured, submission NOT delivered", opts.reference);
    return json(503, {
      ok: false,
      code: "not_configured",
      message: "Our online form is temporarily unavailable. Please call, email or WhatsApp us directly. We're happy to help.",
    });
  }

  const cfg = mailConfig();
  const staffLabel = opts.kind === "quote" ? "Quote request" : "Complaint";
  const staff = staffEmail({
    kind: staffLabel,
    reference: opts.reference,
    clientName: opts.name,
    clientEmail: opts.email,
    clientPhone: opts.phone,
    rows: opts.rows,
    replySubject: `Re: ${opts.subject} [${opts.reference}]`,
  });

  try {
    await sendMail({
      to: opts.kind === "quote" ? cfg.quoteTo : cfg.complaintTo,
      subject: `[${opts.reference}] ${opts.subject}`,
      html: staff.html,
      text: staff.text,
      replyTo: `${opts.name.replace(/[<>"]/g, "")} <${opts.email}>`,
    });
  } catch (err) {
    console.error("[forms] Failed to send staff notification", opts.reference, err instanceof MailNotConfiguredError ? err.message : err);
    return json(502, {
      ok: false,
      code: "send_failed",
      message: "We couldn't send your submission just now. Please try again in a moment, or contact us by phone, email or WhatsApp.",
    });
  }

  let confirmationSent = false;
  if (cfg.sendConfirmation) {
    try {
      const c = clientEmail({ kind: opts.kind === "quote" ? "quote request" : "complaint", reference: opts.reference, name: opts.name, rows: opts.clientRows });
      await sendMail({
        to: opts.email,
        subject: opts.kind === "quote" ? `We've received your quote request [${opts.reference}]` : `We've received your complaint [${opts.reference}]`,
        html: c.html,
        text: c.text,
        replyTo: opts.kind === "quote" ? cfg.quoteTo : cfg.complaintTo,
      });
      confirmationSent = true;
    } catch (err) {
      // The company has the submission; a failed confirmation should not fail the request.
      console.warn("[forms] Confirmation email failed", opts.reference, err);
    }
  }

  return json(200, { ok: true, reference: opts.reference, confirmationSent });
}
