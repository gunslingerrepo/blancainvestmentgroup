import { validateComplaint, labelOf, serviceOptions } from "@/lib/forms";
import { clientIp, deliver, json, makeReference, rateLimited } from "@/lib/submit";
import type { Row } from "@/lib/email-templates";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { ok: false, code: "bad_request", message: "Invalid request." });
  }

  if (body && typeof body === "object" && "website" in body && (body as { website?: string }).website) {
    return json(200, { ok: true, reference: makeReference("C"), confirmationSent: false });
  }

  if (rateLimited(clientIp(req))) {
    return json(429, { ok: false, code: "rate_limited", message: "Too many submissions. Please wait a few minutes and try again." });
  }

  const parsed = validateComplaint(body);
  if (!parsed.success) {
    return json(422, { ok: false, code: "validation", message: "Please correct the highlighted fields.", errors: parsed.errors });
  }
  const d = parsed.data;
  const reference = makeReference("C");
  const service = labelOf(serviceOptions, d.service);

  const rows: Row[] = [
    ["Reference", reference],
    ["Name", d.name],
    ["Email", d.email],
    ["Telephone", d.phone],
    ["Related service", service],
    ["Project / invoice reference", d.reference],
    ["Subject", d.subject],
    ["Complaint details", d.details],
    ["Submitted", new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" }) + " (WAT)"],
  ];

  return deliver({
    kind: "complaint",
    reference,
    name: d.name,
    email: d.email,
    phone: d.phone,
    subject: `Complaint: ${d.subject}`,
    rows,
    clientRows: [["Related service", service], ["Subject", d.subject], ["Details", d.details]],
  });
}
