"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, LoaderCircle } from "lucide-react";
import {
  applianceOptions, budgetRanges, constructionTypes, ictNeeds, propertyInterests, validateQuote, serviceOptions, solarTypes, supplyItems,
  type ServiceValue,
} from "@/lib/forms";
import { CheckboxGroup, ConsentField, FieldShell, Honeypot, RadioGroup, describedBy } from "./fields";
import { ErrorPanel, SuccessPanel } from "./FormResult";
import { useFormSubmit } from "./useSubmit";

type Data = {
  name: string; email: string; phone: string; service: ServiceValue | ""; message: string; consent: boolean; website: string;
  solarType?: "installation" | "audit"; systemSize: string; appliances: string[]; appliancesOther: string;
  propertyInterest?: (typeof propertyInterests)[number]["value"]; propertyLocation: string; budget: string; property: string;
  constructionType?: (typeof constructionTypes)[number]["value"]; projectLocation: string; timeline: string;
  supplyItems: string[]; supplyQuantity: string; ictNeeds: string[]; premisesType: string;
};

const empty: Data = {
  name: "", email: "", phone: "", service: "", message: "", consent: false, website: "",
  systemSize: "", appliances: [], appliancesOther: "", propertyLocation: "", budget: "", property: "",
  projectLocation: "", timeline: "", supplyItems: [], supplyQuantity: "", ictNeeds: [], premisesType: "",
};

/** Only send fields relevant to the chosen service. */
function payload(d: Data) {
  const base = { name: d.name, email: d.email, phone: d.phone, service: d.service || undefined, message: d.message, consent: d.consent || undefined, website: d.website };
  switch (d.service) {
    case "renewable-energy": return { ...base, solarType: d.solarType, systemSize: d.systemSize, appliances: d.appliances, appliancesOther: d.appliancesOther };
    case "real-estate": return { ...base, propertyInterest: d.propertyInterest, propertyLocation: d.propertyLocation, budget: d.budget, property: d.property };
    case "construction": return { ...base, constructionType: d.constructionType, projectLocation: d.projectLocation, timeline: d.timeline, budget: d.budget };
    case "office-supplies": return { ...base, supplyItems: d.supplyItems, supplyQuantity: d.supplyQuantity };
    case "automation-ict": return { ...base, ictNeeds: d.ictNeeds, premisesType: d.premisesType };
    default: return base;
  }
}

export default function QuoteForm() {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [d, setD] = useState<Data>(empty);
  const { errors, state, setState, submit, validateField } = useFormSubmit(validateQuote, "/api/quote", formRef, { success: "Quote request sent" }, {
    id: process.env.NEXT_PUBLIC_FORMSPREE_QUOTE_ID,
    kind: "Q",
    subject: (f) => `Quote request: ${serviceOptions.find((o) => o.value === f.service)?.label ?? "General"} from ${String(f.name ?? "")}`,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Prefill from links such as /contact?service=renewable-energy&kw=3.5
  useEffect(() => {
    const svc = params.get("service") as ServiceValue | null;
    if (!svc || !serviceOptions.some((s) => s.value === svc)) return;
    setD((prev) => ({
      ...prev,
      service: svc,
      solarType: params.get("solarType") === "audit" ? "audit" : params.get("solarType") === "installation" ? "installation" : prev.solarType,
      systemSize: params.get("kw") && Number(params.get("kw")) > 0 ? String(params.get("kw")) : prev.systemSize,
      appliancesOther: params.get("appliances")?.slice(0, 500) || prev.appliancesOther,
      property: params.get("property")?.slice(0, 120) || prev.property,
      propertyInterest: (propertyInterests.find((x) => x.value === params.get("interest"))?.value ?? prev.propertyInterest) as Data["propertyInterest"],
      message: params.get("message")?.slice(0, 1000) || prev.message,
    }));
  }, [params]);

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    const next = { ...d, [k]: v };
    setD(next);
    if (touched[k as string] || errors[k as string]) validateField(payload(next), k as string);
  };
  const blur = (k: keyof Data) => {
    setTouched((t) => ({ ...t, [k]: true }));
    validateField(payload(d), k as string);
  };

  const input = (k: "name" | "email" | "phone" | "systemSize" | "propertyLocation" | "projectLocation" | "timeline" | "premisesType" | "appliancesOther" | "property", extra: React.InputHTMLAttributes<HTMLInputElement> = {}, hint?: string) => (
    <input
      id={`q-${k}`}
      name={k}
      value={d[k]}
      onChange={(e) => set(k, e.target.value)}
      onBlur={() => blur(k)}
      aria-invalid={!!errors[k] || undefined}
      aria-describedby={describedBy(`q-${k}`, errors[k], hint)}
      className="field"
      {...extra}
    />
  );

  if (state.status === "success") {
    return (
      <SuccessPanel
        title="Thank you. Your quote request has been sent."
        reference={state.reference}
        confirmationSent={state.confirmationSent}
        resetLabel="Send another request"
        onReset={() => { setD(empty); setTouched({}); setState({ status: "idle" }); }}
      />
    );
  }

  const busy = state.status === "submitting";
  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} noValidate onSubmit={(e) => { e.preventDefault(); submit(payload(d)); }} className="relative" aria-describedby="quote-required-note">
      {state.status === "error" && <ErrorPanel message={state.message} />}
      {errorCount > 0 && state.status !== "error" && (
        <p role="alert" className="mb-6 border-l-4 border-brand bg-brand/5 p-4 text-sm">Please correct {errorCount} highlighted field{errorCount > 1 ? "s" : ""} below.</p>
      )}
      <p id="quote-required-note" className="mb-6 text-xs text-muted">Fields marked <span className="text-brand">*</span> are required.</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldShell id="q-name" label="Full name" required error={errors.name} className="sm:col-span-2">{input("name", { autoComplete: "name", placeholder: "e.g. Amaka Okafor" })}</FieldShell>
        <FieldShell id="q-email" label="Email address" required error={errors.email}>{input("email", { type: "email", autoComplete: "email", inputMode: "email", placeholder: "you@example.com" })}</FieldShell>
        <FieldShell id="q-phone" label="Telephone number" required error={errors.phone}>{input("phone", { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "0911 444 2122" })}</FieldShell>

        <FieldShell id="q-service" label="Service category" required error={errors.service} className="sm:col-span-2">
          <select id="q-service" name="service" value={d.service} onChange={(e) => set("service", e.target.value as ServiceValue)} onBlur={() => blur("service")} aria-invalid={!!errors.service || undefined} aria-describedby={describedBy("q-service", errors.service)} className="field">
            <option value="">Select a service…</option>
            {serviceOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </FieldShell>
      </div>

      {/* ─── Service-specific fields ─── */}
      {d.service && d.service !== "other" && (
        <div className="mt-8 border-l-2 border-brand bg-mist p-5 sm:p-6" aria-live="polite">
          <p className="mb-5 font-display text-xs uppercase tracking-[0.18em] text-muted">{serviceOptions.find((s) => s.value === d.service)?.label} details</p>
          <div className="grid gap-6 sm:grid-cols-2">
            {d.service === "renewable-energy" && (
              <>
                <div className="sm:col-span-2"><RadioGroup name="solarType" legend="What do you need?" required options={solarTypes} value={d.solarType} onChange={(v) => set("solarType", v as Data["solarType"])} error={errors.solarType} /></div>
                <FieldShell id="q-systemSize" label="Proposed system size (kW)" error={errors.systemSize} hint="Leave blank if you're not sure and we'll advise.">{input("systemSize", { type: "number", min: 0, step: "0.1", inputMode: "decimal", placeholder: "e.g. 5" }, "Leave blank if you're not sure and we'll advise.")}</FieldShell>
                <div className="sm:col-span-2"><CheckboxGroup name="appliances" legend="Appliances you want to power" options={applianceOptions} value={d.appliances} onChange={(v) => set("appliances", v)} error={errors.appliances} /></div>
                <FieldShell id="q-appliancesOther" label="Other appliances or notes" error={errors.appliancesOther} className="sm:col-span-2">{input("appliancesOther", { placeholder: "e.g. 2 × 1.5 HP air conditioners, borehole pump" })}</FieldShell>
              </>
            )}
            {d.service === "real-estate" && (
              <>
                <div className="sm:col-span-2"><RadioGroup name="propertyInterest" legend="I'm interested in" required options={propertyInterests} value={d.propertyInterest} onChange={(v) => set("propertyInterest", v as Data["propertyInterest"])} error={errors.propertyInterest} /></div>
                {d.property && <FieldShell id="q-property" label="Property of interest" error={errors.property} className="sm:col-span-2">{input("property")}</FieldShell>}
                <FieldShell id="q-propertyLocation" label="Preferred location" error={errors.propertyLocation}>{input("propertyLocation", { placeholder: "e.g. Jahi, Abuja" })}</FieldShell>
                <FieldShell id="q-budget" label="Budget range" error={errors.budget}>
                  <select id="q-budget" name="budget" value={d.budget} onChange={(e) => set("budget", e.target.value)} className="field">
                    <option value="">Select…</option>{budgetRanges.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </FieldShell>
              </>
            )}
            {d.service === "construction" && (
              <>
                <div className="sm:col-span-2"><RadioGroup name="constructionType" legend="Project type" required options={constructionTypes} value={d.constructionType} onChange={(v) => set("constructionType", v as Data["constructionType"])} error={errors.constructionType} /></div>
                <FieldShell id="q-projectLocation" label="Project location" error={errors.projectLocation}>{input("projectLocation", { placeholder: "City / area" })}</FieldShell>
                <FieldShell id="q-timeline" label="Preferred start / timeline" error={errors.timeline}>{input("timeline", { placeholder: "e.g. Q1 2027" })}</FieldShell>
                <FieldShell id="q-budget" label="Budget range" error={errors.budget} className="sm:col-span-2">
                  <select id="q-budget" name="budget" value={d.budget} onChange={(e) => set("budget", e.target.value)} className="field">
                    <option value="">Select…</option>{budgetRanges.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </FieldShell>
              </>
            )}
            {d.service === "office-supplies" && (
              <>
                <div className="sm:col-span-2"><CheckboxGroup name="supplyItems" legend="Items required" required options={supplyItems} value={d.supplyItems} onChange={(v) => set("supplyItems", v)} error={errors.supplyItems} /></div>
                <FieldShell id="q-supplyQuantity" label="Quantities / specifications" error={errors.supplyQuantity} className="sm:col-span-2">
                  <textarea id="q-supplyQuantity" name="supplyQuantity" rows={3} value={d.supplyQuantity} onChange={(e) => set("supplyQuantity", e.target.value)} className="field" placeholder="e.g. 20 ergonomic chairs, 10 laptops (i5, 16 GB)" />
                </FieldShell>
              </>
            )}
            {d.service === "automation-ict" && (
              <>
                <div className="sm:col-span-2"><CheckboxGroup name="ictNeeds" legend="Requirements" required options={ictNeeds} value={d.ictNeeds} onChange={(v) => set("ictNeeds", v)} error={errors.ictNeeds} /></div>
                <FieldShell id="q-premisesType" label="Type of premises" error={errors.premisesType} className="sm:col-span-2">{input("premisesType", { placeholder: "e.g. Office, home, warehouse, estate" })}</FieldShell>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6">
        <FieldShell id="q-message" label="Message" required error={errors.message}>
          <textarea id="q-message" name="message" rows={5} value={d.message} onChange={(e) => set("message", e.target.value)} onBlur={() => blur("message")} aria-invalid={!!errors.message || undefined} aria-describedby={describedBy("q-message", errors.message)} className="field" placeholder="Tell us about your project, location and timing." maxLength={3000} />
        </FieldShell>
        <ConsentField id="q-consent" checked={d.consent} onChange={(v) => set("consent", v)} error={errors.consent} />
        <Honeypot value={d.website} onChange={(v) => setD((p) => ({ ...p, website: v }))} />
        <div>
          <button type="submit" disabled={busy} className="btn btn-red w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto">
            {busy ? (<><LoaderCircle className="size-4 animate-spin" aria-hidden />Sending…</>) : (<>Send Quote Request <ArrowRight className="size-4" /></>)}
          </button>
        </div>
      </div>
    </form>
  );
}
