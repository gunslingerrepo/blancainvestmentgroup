"use client";

import { CircleAlert, CircleCheck, Mail, Phone } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "../icons";

export function SuccessPanel({ title, reference, confirmationSent, onReset, resetLabel }: { title: string; reference: string; confirmationSent: boolean; onReset: () => void; resetLabel: string }) {
  return (
    <div role="status" tabIndex={-1} className="border border-line bg-white p-8 sm:p-10" ref={(el) => el?.focus()}>
      <CircleCheck className="size-10 text-[#1da851]" aria-hidden />
      <h3 className="mt-6 text-3xl font-semibold">{title}</h3>
      <p className="mt-4 text-muted">
        Your reference number is <strong className="font-display text-ink">{reference}</strong>.{" "}
        {confirmationSent ? "We've emailed you a confirmation with a copy of your submission." : "Please keep this reference for your records."}
      </p>
      <p className="mt-3 text-muted">Our team responds during business hours ({site.hours.short}).</p>
      <button type="button" onClick={onReset} className="btn btn-outline mt-8">{resetLabel}</button>
    </div>
  );
}

export function ErrorPanel({ message }: { message: string }) {
  return (
    <div role="alert" className="mb-8 border-l-4 border-brand bg-brand/5 p-5">
      <p className="flex items-center gap-2 font-display font-medium text-brand"><CircleAlert className="size-4" aria-hidden />Your submission was not sent</p>
      <p className="mt-2 text-sm text-ink/80">{message}</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
        <a href={site.phone.href} className="inline-flex items-center gap-2 hover:text-brand"><Phone className="size-4 text-brand" />{site.phone.display}</a>
        <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-brand"><Mail className="size-4 text-brand" />{site.email}</a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-brand"><WhatsAppIcon className="size-4 text-[#1da851]" />WhatsApp</a>
      </div>
    </div>
  );
}
