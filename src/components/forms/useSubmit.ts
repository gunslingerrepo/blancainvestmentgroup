"use client";

import { useState } from "react";
import type { Validation } from "@/lib/forms";
import { useToast } from "../Toast";

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference: string; confirmationSent: boolean }
  | { status: "error"; message: string };

const makeReference = (kind: "Q" | "C") => {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Array.from({ length: 4 }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");
  return `BIL-${kind}-${ymd}-${rand}`;
};

/** Formspree expects flat fields; arrays become comma-separated text and the honeypot maps to _gotcha. */
const toFormspree = (data: Record<string, unknown>, reference: string, subject: string) => {
  const out: Record<string, string> = { reference, _subject: `${subject} (${reference})` };
  for (const [k, v] of Object.entries(data)) {
    if (k === "website") { out._gotcha = String(v ?? ""); continue; }
    if (k === "consent") { out.consent = v ? "Agreed to Privacy Policy" : "No"; continue; }
    if (v === undefined || v === null || v === "") continue;
    out[k] = Array.isArray(v) ? v.join(", ") : String(v);
  }
  return out;
};

/**
 * Shared validate → POST → notify flow for both forms.
 * If a Formspree form ID is supplied (NEXT_PUBLIC_FORMSPREE_* env vars), submissions go to Formspree;
 * otherwise they go to the built-in API route, which sends email via Resend or SMTP.
 */
export function useFormSubmit<T>(
  validate: (raw: unknown) => Validation<T>,
  endpoint: string,
  formRef: React.RefObject<HTMLFormElement | null>,
  labels: { success: string },
  formspree?: { id?: string; kind: "Q" | "C"; subject: (data: Record<string, unknown>) => string },
) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<SubmitState>({ status: "idle" });
  const toast = useToast();

  const focusFirstError = (errs: Record<string, string>) => {
    requestAnimationFrame(() => {
      const form = formRef.current;
      if (!form) return;
      for (const key of Object.keys(errs)) {
        const el = form.querySelector<HTMLElement>(`[name="${key}"], [data-field="${key}"] input`);
        if (el) {
          el.focus();
          el.scrollIntoView({ block: "center", behavior: "smooth" });
          break;
        }
      }
    });
  };

  const validateField = (data: unknown, key: string) => {
    const r = validate(data);
    const msg = r.success ? undefined : r.errors[key];
    setErrors((e) => {
      const n = { ...e };
      if (msg) n[key] = msg;
      else delete n[key];
      return n;
    });
  };

  const submit = async (data: unknown) => {
    const r = validate(data);
    if (!r.success) {
      const errs = r.errors;
      setErrors(errs);
      setState({ status: "idle" });
      focusFirstError(errs);
      toast({ kind: "error", title: "Please check the form", message: `${Object.keys(errs).length} field(s) need your attention.` });
      return;
    }
    setErrors({});
    setState({ status: "submitting" });
    try {
      if (formspree?.id) {
        const reference = makeReference(formspree.kind);
        const fd = data as Record<string, unknown>;
        const res = await fetch(`https://formspree.io/f/${formspree.id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(toFormspree(fd, reference, formspree.subject(fd))),
        });
        const out = await res.json().catch(() => ({}));
        if (res.ok) {
          setState({ status: "success", reference, confirmationSent: false });
          toast({ kind: "success", title: labels.success, message: `Reference ${reference}` });
          return;
        }
        const message =
          (Array.isArray(out.errors) && out.errors.map((e: { message?: string }) => e.message).filter(Boolean).join(" ")) ||
          "Something went wrong. Please try again or contact us directly.";
        setState({ status: "error", message });
        toast({ kind: "error", title: "Submission not sent", message });
        return;
      }
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const out = await res.json().catch(() => ({}));
      if (res.ok && out.ok) {
        setState({ status: "success", reference: out.reference, confirmationSent: !!out.confirmationSent });
        toast({ kind: "success", title: labels.success, message: `Reference ${out.reference}` });
        return;
      }
      if (res.status === 422 && out.errors) {
        setErrors(out.errors);
        focusFirstError(out.errors);
      }
      const message = out.message || "Something went wrong. Please try again or contact us directly.";
      setState({ status: "error", message });
      toast({ kind: "error", title: "Submission not sent", message });
    } catch {
      const message = "We couldn't reach our server. Check your connection and try again, or contact us by phone, email or WhatsApp.";
      setState({ status: "error", message });
      toast({ kind: "error", title: "Connection problem", message });
    }
  };

  return { errors, setErrors, state, setState, submit, validateField };
}
