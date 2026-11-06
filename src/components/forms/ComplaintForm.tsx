"use client";

import { useRef, useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { validateComplaint, serviceOptions, type ServiceValue } from "@/lib/forms";
import { ConsentField, FieldShell, Honeypot, describedBy } from "./fields";
import { ErrorPanel, SuccessPanel } from "./FormResult";
import { useFormSubmit } from "./useSubmit";

type Data = { name: string; email: string; phone: string; service: ServiceValue | ""; subject: string; details: string; reference: string; consent: boolean; website: string };
const empty: Data = { name: "", email: "", phone: "", service: "", subject: "", details: "", reference: "", consent: false, website: "" };
const payload = (d: Data) => ({ ...d, service: d.service || undefined, consent: d.consent || undefined });

export default function ComplaintForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [d, setD] = useState<Data>(empty);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { errors, state, setState, submit, validateField } = useFormSubmit(validateComplaint, "/api/complaint", formRef, { success: "Complaint submitted" }, {
    id: process.env.NEXT_PUBLIC_FORMSPREE_COMPLAINT_ID || process.env.NEXT_PUBLIC_FORMSPREE_QUOTE_ID,
    kind: "C",
    subject: (f) => `Complaint: ${String(f.subject ?? "")}`,
  });

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    const next = { ...d, [k]: v };
    setD(next);
    if (touched[k as string] || errors[k as string]) validateField(payload(next), k as string);
  };
  const blur = (k: keyof Data) => { setTouched((t) => ({ ...t, [k]: true })); validateField(payload(d), k as string); };

  const text = (k: "name" | "email" | "phone" | "subject" | "reference", extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <input id={`c-${k}`} name={k} value={d[k]} onChange={(e) => set(k, e.target.value)} onBlur={() => blur(k)} aria-invalid={!!errors[k] || undefined} aria-describedby={describedBy(`c-${k}`, errors[k])} className="field" {...extra} />
  );

  if (state.status === "success") {
    return (
      <SuccessPanel
        title="Your complaint has been received."
        reference={state.reference}
        confirmationSent={state.confirmationSent}
        resetLabel="Submit another complaint"
        onReset={() => { setD(empty); setTouched({}); setState({ status: "idle" }); }}
      />
    );
  }
  const busy = state.status === "submitting";
  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} noValidate onSubmit={(e) => { e.preventDefault(); submit(payload(d)); }} className="relative">
      {state.status === "error" && <ErrorPanel message={state.message} />}
      {errorCount > 0 && state.status !== "error" && (
        <p role="alert" className="mb-6 border-l-4 border-brand bg-brand/5 p-4 text-sm">Please correct {errorCount} highlighted field{errorCount > 1 ? "s" : ""} below.</p>
      )}
      <p className="mb-6 text-xs text-muted">Fields marked <span className="text-brand">*</span> are required. Complaints are logged and reviewed by management.</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <FieldShell id="c-name" label="Full name" required error={errors.name} className="sm:col-span-2">{text("name", { autoComplete: "name" })}</FieldShell>
        <FieldShell id="c-email" label="Email address" required error={errors.email}>{text("email", { type: "email", autoComplete: "email", inputMode: "email" })}</FieldShell>
        <FieldShell id="c-phone" label="Telephone number" required error={errors.phone}>{text("phone", { type: "tel", autoComplete: "tel", inputMode: "tel" })}</FieldShell>
        <FieldShell id="c-service" label="Related service" required error={errors.service}>
          <select id="c-service" name="service" value={d.service} onChange={(e) => set("service", e.target.value as ServiceValue)} onBlur={() => blur("service")} aria-invalid={!!errors.service || undefined} aria-describedby={describedBy("c-service", errors.service)} className="field">
            <option value="">Select a service…</option>
            {serviceOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </FieldShell>
        <FieldShell id="c-reference" label="Project / invoice reference" error={errors.reference}>{text("reference", { placeholder: "If available" })}</FieldShell>
        <FieldShell id="c-subject" label="Subject" required error={errors.subject} className="sm:col-span-2">{text("subject", { placeholder: "Brief summary of the issue" })}</FieldShell>
        <FieldShell id="c-details" label="Complaint details" required error={errors.details} className="sm:col-span-2">
          <textarea id="c-details" name="details" rows={6} value={d.details} onChange={(e) => set("details", e.target.value)} onBlur={() => blur("details")} aria-invalid={!!errors.details || undefined} aria-describedby={describedBy("c-details", errors.details)} className="field" placeholder="What happened, when, and what outcome would you like?" maxLength={5000} />
        </FieldShell>
        <div className="sm:col-span-2"><ConsentField id="c-consent" checked={d.consent} onChange={(v) => set("consent", v)} error={errors.consent} /></div>
      </div>
      <Honeypot value={d.website} onChange={(v) => setD((p) => ({ ...p, website: v }))} />
      <button type="submit" disabled={busy} className="btn btn-black mt-8 w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto">
        {busy ? (<><LoaderCircle className="size-4 animate-spin" aria-hidden />Submitting…</>) : (<>Submit Complaint <Send className="size-4" /></>)}
      </button>
    </form>
  );
}
