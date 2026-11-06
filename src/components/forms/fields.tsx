"use client";

import { CircleAlert } from "lucide-react";

type Common = { id: string; label: string; error?: string; required?: boolean; hint?: string; className?: string };

export function FieldShell({ id, label, error, required, hint, className = "", children }: Common & { children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {required ? <span className="text-brand" aria-hidden>*</span> : <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="field-error">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden />{error}
        </p>
      )}
    </div>
  );
}

export const describedBy = (id: string, error?: string, hint?: string) =>
  [error ? `${id}-error` : null, hint && !error ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;

export function CheckboxGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  required,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined} aria-invalid={!!error || undefined} data-field={name}>
      <legend className="field-label">
        {legend} {required ? <span className="text-brand" aria-hidden>*</span> : <span className="font-normal text-muted">(optional)</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const on = value.includes(opt);
          return (
            <label key={opt} className={`cursor-pointer border px-3.5 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand ${on ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"}`}>
              <input type="checkbox" name={name} value={opt} checked={on} onChange={(e) => onChange(e.target.checked ? [...value, opt] : value.filter((v) => v !== opt))} className="sr-only" />
              {opt}
            </label>
          );
        })}
      </div>
      {error && <p id={`${name}-error`} className="field-error"><CircleAlert className="size-3.5" aria-hidden />{error}</p>}
    </fieldset>
  );
}

export function RadioGroup({
  name,
  legend,
  options,
  value,
  onChange,
  error,
  required,
}: {
  name: string;
  legend: string;
  options: readonly { value: string; label: string }[];
  value?: string;
  onChange: (v: string) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined} data-field={name} role="radiogroup" aria-required={required} aria-invalid={!!error || undefined}>
      <legend className="field-label">
        {legend} {required && <span className="text-brand" aria-hidden>*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.value;
          return (
            <label key={o.value} className={`cursor-pointer border px-3.5 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand ${on ? "border-brand bg-brand text-white" : "border-line bg-white hover:border-ink"}`}>
              <input type="radio" name={name} value={o.value} checked={on} onChange={() => onChange(o.value)} className="sr-only" />
              {o.label}
            </label>
          );
        })}
      </div>
      {error && <p id={`${name}-error`} className="field-error"><CircleAlert className="size-3.5" aria-hidden />{error}</p>}
    </fieldset>
  );
}

export function ConsentField({ id, checked, onChange, error }: { id: string; checked: boolean; onChange: (v: boolean) => void; error?: string }) {
  return (
    <div data-field="consent">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm text-muted">
        <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} aria-invalid={!!error || undefined} aria-describedby={error ? `${id}-error` : undefined} className="mt-0.5 size-4 shrink-0 accent-[#D9272E]" />
        <span>
          I agree that Blanca Investment Limited may use these details to respond to my enquiry, as described in the{" "}
          <a href="/privacy-policy" target="_blank" className="text-ink underline underline-offset-2 hover:text-brand">Privacy Policy</a>. <span className="text-brand" aria-hidden>*</span>
        </span>
      </label>
      {error && <p id={`${id}-error`} className="field-error"><CircleAlert className="size-3.5" aria-hidden />{error}</p>}
    </div>
  );
}

/** Off-screen honeypot field for bots. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
