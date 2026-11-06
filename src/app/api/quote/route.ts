import { constructionTypes, labelOf, propertyInterests, validateQuote, serviceOptions, solarTypes } from "@/lib/forms";
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

  // Honeypot: silently accept bots without sending anything
  if (body && typeof body === "object" && "website" in body && (body as { website?: string }).website) {
    return json(200, { ok: true, reference: makeReference("Q"), confirmationSent: false });
  }

  if (rateLimited(clientIp(req))) {
    return json(429, { ok: false, code: "rate_limited", message: "Too many submissions. Please wait a few minutes and try again." });
  }

  const parsed = validateQuote(body);
  if (!parsed.success) {
    return json(422, { ok: false, code: "validation", message: "Please correct the highlighted fields.", errors: parsed.errors });
  }
  const d = parsed.data;
  const reference = makeReference("Q");
  const service = labelOf(serviceOptions, d.service);

  const specific: Row[] = [];
  if (d.service === "renewable-energy") {
    specific.push(["Requirement", labelOf(solarTypes, d.solarType)]);
    specific.push(["Proposed system size", d.systemSize ? `${d.systemSize} kW` : "Not specified"]);
    specific.push(["Appliances to power", [...(d.appliances || []), d.appliancesOther].filter(Boolean).join(", ")]);
  }
  if (d.service === "real-estate") {
    specific.push(["Interested in", labelOf(propertyInterests, d.propertyInterest)]);
    specific.push(["Property of interest", d.property]);
    specific.push(["Preferred location", d.propertyLocation]);
    specific.push(["Budget", d.budget]);
  }
  if (d.service === "construction") {
    specific.push(["Project type", labelOf(constructionTypes, d.constructionType)]);
    specific.push(["Project location", d.projectLocation]);
    specific.push(["Timeline", d.timeline]);
    specific.push(["Budget", d.budget]);
  }
  if (d.service === "office-supplies") {
    specific.push(["Items required", (d.supplyItems || []).join(", ")]);
    specific.push(["Quantities / specification", d.supplyQuantity]);
  }
  if (d.service === "automation-ict") {
    specific.push(["Requirements", (d.ictNeeds || []).join(", ")]);
    specific.push(["Premises type", d.premisesType]);
  }

  const rows: Row[] = [
    ["Reference", reference],
    ["Name", d.name],
    ["Email", d.email],
    ["Telephone", d.phone],
    ["Service", service],
    ...specific,
    ["Message", d.message],
    ["Submitted", new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos" }) + " (WAT)"],
  ];

  return deliver({
    kind: "quote",
    reference,
    name: d.name,
    email: d.email,
    phone: d.phone,
    subject: `Quote request: ${service} from ${d.name}`,
    rows,
    clientRows: [["Service", service], ...specific, ["Your message", d.message]],
  });
}
