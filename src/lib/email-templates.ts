import "server-only";
import { site } from "@/content/site";

export const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export type Row = [label: string, value: string | undefined | null];

const shell = (title: string, body: string) => `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${esc(title)}</title></head>
<body style="margin:0;background:#f4f4f2;font-family:Arial,Helvetica,sans-serif;color:#151515">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f2;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff">
<tr><td style="background:#151515;padding:20px 28px;border-bottom:4px solid #D9272E">
<span style="color:#ffffff;font-size:18px;font-weight:bold;letter-spacing:.5px">BLANCA <span style="color:#D9272E">INVESTMENT</span> LTD</span></td></tr>
<tr><td style="padding:28px">${body}</td></tr>
<tr><td style="padding:18px 28px;background:#f4f4f2;color:#5c5c5a;font-size:12px;line-height:1.6">
${esc(site.name)} · ${esc(site.address.full)} · ${esc(site.phone.display)} · ${esc(site.email)}</td></tr>
</table></td></tr></table></body></html>`;

const table = (rows: Row[]) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">${rows
    .filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 12px;border:1px solid #e2e2dd;background:#f9f9f7;width:34%;vertical-align:top;font-weight:bold">${esc(k)}</td><td style="padding:10px 12px;border:1px solid #e2e2dd;white-space:pre-wrap">${esc(v)}</td></tr>`
    )
    .join("")}</table>`;

const button = (href: string, label: string, bg = "#D9272E") =>
  `<a href="${esc(href)}" style="display:inline-block;background:${bg};color:#ffffff;text-decoration:none;padding:12px 20px;font-weight:bold;font-size:14px;margin:0 8px 8px 0">${esc(label)}</a>`;

/** Notification sent to the company inbox. */
export function staffEmail(opts: { kind: "Quote request" | "Complaint"; reference: string; clientName: string; clientEmail: string; clientPhone: string; rows: Row[]; replySubject: string }) {
  const { kind, reference, clientName, clientEmail, clientPhone, rows, replySubject } = opts;
  const mailto = `mailto:${clientEmail}?subject=${encodeURIComponent(replySubject)}&body=${encodeURIComponent(`Dear ${clientName},\n\nThank you for contacting ${site.name}.\n\n`)}`;
  const tel = `tel:${clientPhone.replace(/[^\d+]/g, "")}`;
  const digits = clientPhone.replace(/\D/g, "");
  const wa = `https://wa.me/${digits.startsWith("0") ? "234" + digits.slice(1) : digits}`;
  const html = shell(
    `${kind} ${reference}`,
    `<p style="margin:0 0 4px;color:#D9272E;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase">New ${esc(kind.toLowerCase())} · ${esc(reference)}</p>
<h1 style="margin:0 0 18px;font-size:22px">${esc(kind)} from ${esc(clientName)}</h1>
<p style="margin:0 0 20px">${button(mailto, "Reply to Client")}${button(tel, "Call Client", "#151515")}${button(wa, "WhatsApp Client", "#1da851")}</p>
${table(rows)}
<p style="margin:20px 0 0;font-size:12px;color:#5c5c5a">Replying to this email will also reach the client directly (Reply-To is set to ${esc(clientEmail)}). Submitted via ${esc(site.url)}.</p>`
  );
  const text = `${kind} ${reference}\n\n${rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nReply to client: ${clientEmail}`;
  return { html, text };
}

/** Confirmation sent to the visitor. */
export function clientEmail(opts: { kind: "quote request" | "complaint"; reference: string; name: string; rows: Row[] }) {
  const { kind, reference, name, rows } = opts;
  const intro =
    kind === "complaint"
      ? "We're sorry you've had a problem. Your complaint has been received and logged, and a member of our team will review it and contact you."
      : "Thank you for your interest in our services. Your quote request has been received and a member of our team will review it and get back to you.";
  const html = shell(
    `We received your ${kind}`,
    `<h1 style="margin:0 0 14px;font-size:22px">Thank you, ${esc(name)}.</h1>
<p style="margin:0 0 14px;line-height:1.6">${esc(intro)}</p>
<p style="margin:0 0 20px;line-height:1.6">Your reference number is <strong>${esc(reference)}</strong>. Please quote it in any follow-up.</p>
${table(rows)}
<p style="margin:22px 0 0;line-height:1.6">Need to reach us sooner? Call <a href="${esc(site.phone.href)}" style="color:#D9272E">${esc(site.phone.display)}</a> (${esc(site.hours.short)}) or email <a href="mailto:${esc(site.email)}" style="color:#D9272E">${esc(site.email)}</a>.</p>
<p style="margin:14px 0 0;font-size:12px;color:#5c5c5a">You are receiving this because this email address was entered on the ${esc(site.name)} website. If this wasn't you, please ignore this message.</p>`
  );
  const text = `Thank you, ${name}.\n\n${intro}\n\nReference: ${reference}\n\n${rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${site.name} · ${site.phone.display} · ${site.email}`;
  return { html, text };
}
