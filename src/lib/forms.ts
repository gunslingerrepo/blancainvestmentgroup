import { z } from "zod";

/* ───────────── Option lists (shared by client form + server email) ───────────── */

export const serviceOptions = [
  { value: "renewable-energy", label: "Renewable Energy" },
  { value: "real-estate", label: "Real Estate & Property" },
  { value: "construction", label: "Building Construction" },
  { value: "office-supplies", label: "Office Supplies & Procurement" },
  { value: "automation-ict", label: "Automation & ICT" },
  { value: "other", label: "Other / General enquiry" },
] as const;
export type ServiceValue = (typeof serviceOptions)[number]["value"];
const serviceValues = serviceOptions.map((s) => s.value) as [ServiceValue, ...ServiceValue[]];

export const solarTypes = [
  { value: "installation", label: "Solar installation" },
  { value: "audit", label: "Energy audit" },
] as const;

export const applianceOptions = [
  "Lighting", "Fans", "Television", "Refrigerator / freezer", "Air conditioner", "Computers / laptops", "Water pump", "Office equipment", "Medical equipment", "Whole building",
] as const;

export const propertyInterests = [
  { value: "buying", label: "Buying" },
  { value: "leasing", label: "Leasing" },
  { value: "property-management", label: "Property management" },
  { value: "short-let", label: "Short-let accommodation" },
  { value: "hotel-reservation", label: "Hotel reservations" },
] as const;

export const constructionTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "renovation", label: "Renovation" },
  { value: "project-management", label: "Project management" },
] as const;

export const supplyItems = ["Office furniture", "IT equipment", "Stationery", "Bulk procurement"] as const;

export const ictNeeds = ["Smart locks", "CCTV", "Networking", "Remote monitoring", "Maintenance & support"] as const;

export const budgetRanges = ["Under ₦5m", "₦5m to ₦20m", "₦20m to ₦50m", "₦50m to ₦150m", "Above ₦150m", "Not sure yet"] as const;

export const labelOf = <T extends readonly { value: string; label: string }[]>(list: T, v?: string) =>
  list.find((x) => x.value === v)?.label ?? v ?? "";

/* ───────────── Schemas ───────────── */

const phoneRe = /^\+?[0-9\s\-().]{7,20}$/;

const base = {
  name: z.string({ error: "Please enter your full name." }).trim().min(2, "Please enter your full name.").max(100, "Name is too long."),
  email: z.string({ error: "Please enter your email address." }).trim().min(1, "Please enter your email address.").pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string({ error: "Please enter your telephone number." })
    .trim()
    .min(1, "Please enter your telephone number.")
    .regex(phoneRe, "Please enter a valid telephone number, e.g. 0911 444 2122.")
    .refine((v) => v.replace(/\D/g, "").length >= 7, "Please enter a valid telephone number."),
  consent: z.literal(true, { error: "Please confirm you agree to our Privacy Policy." }),
  website: z.string().max(0).optional(), // honeypot, must stay empty
};

const strArr = z.array(z.string().max(80)).max(20).optional();
const optStr = (max: number) => z.string().trim().max(max, `Please keep this under ${max} characters.`).optional();

export const quoteSchema = z
  .object({
    ...base,
    service: z.enum(serviceValues, { error: "Please choose a service." }),
    message: z.string({ error: "Please tell us about your requirements." }).trim().min(10, "Please tell us a little more (at least 10 characters).").max(3000, "Please keep your message under 3,000 characters."),
    // Renewable
    solarType: z.enum(["installation", "audit"]).optional(),
    systemSize: z
      .union([z.literal(""), z.coerce.number().min(0.1, "System size must be greater than 0.").max(100000, "Please enter a realistic size in kW.")])
      .optional(),
    appliances: strArr,
    appliancesOther: optStr(500),
    // Real estate
    propertyInterest: z.enum(["buying", "leasing", "property-management", "short-let", "hotel-reservation"]).optional(),
    propertyLocation: optStr(150),
    budget: optStr(40),
    property: optStr(120),
    // Construction
    constructionType: z.enum(["residential", "commercial", "industrial", "renovation", "project-management"]).optional(),
    projectLocation: optStr(150),
    timeline: optStr(80),
    // Office supplies
    supplyItems: strArr,
    supplyQuantity: optStr(500),
    // Automation & ICT
    ictNeeds: strArr,
    premisesType: optStr(80),
  });

export type QuoteInput = z.infer<typeof quoteSchema>;

/** Service-specific required fields. Runs even when other fields are invalid, so all errors show at once. */
function quoteConditionalErrors(raw: unknown): Record<string, string> {
  const d = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const has = (k: string) => (Array.isArray(d[k]) ? (d[k] as unknown[]).length > 0 : !!d[k]);
  const e: Record<string, string> = {};
  if (d.service === "renewable-energy" && !has("solarType")) e.solarType = "Please choose solar installation or energy audit.";
  if (d.service === "real-estate" && !has("propertyInterest")) e.propertyInterest = "Please tell us what you are interested in.";
  if (d.service === "construction" && !has("constructionType")) e.constructionType = "Please choose a project type.";
  if (d.service === "office-supplies" && !has("supplyItems")) e.supplyItems = "Please select at least one item.";
  if (d.service === "automation-ict" && !has("ictNeeds")) e.ictNeeds = "Please select at least one requirement.";
  return e;
}

export type Validation<T> = { success: true; data: T } | { success: false; errors: Record<string, string> };

export function validateQuote(raw: unknown): Validation<QuoteInput> {
  const r = quoteSchema.safeParse(raw);
  const errors = { ...quoteConditionalErrors(raw), ...(r.success ? {} : fieldErrors(r.error)) };
  return Object.keys(errors).length || !r.success ? { success: false, errors } : { success: true, data: r.data };
}

export const complaintSchema = z.object({
  ...base,
  service: z.enum(serviceValues, { error: "Please choose the related service." }),
  subject: z.string({ error: "Please enter a subject." }).trim().min(3, "Please enter a subject.").max(150, "Subject is too long."),
  details: z.string({ error: "Please describe the issue." }).trim().min(20, "Please describe the issue (at least 20 characters).").max(5000, "Please keep this under 5,000 characters."),
  reference: optStr(80),
});

export type ComplaintInput = z.infer<typeof complaintSchema>;

export function validateComplaint(raw: unknown): Validation<ComplaintInput> {
  const r = complaintSchema.safeParse(raw);
  return r.success ? { success: true, data: r.data } : { success: false, errors: fieldErrors(r.error) };
}

/** Flatten zod issues to { field: firstMessage } */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
