import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./icons";

export default function CtaBand({
  title = "Ready to Start Your Project?",
  text = "Tell us what you need, whether it's a solar system, a building, a property brief, a supply order or a security installation, and we will come back to you with clear next steps.",
  primary = { href: "/contact#quote", label: "Request a Quote" },
  whatsappMessage,
}: {
  title?: string;
  text?: string;
  primary?: { href: string; label: string };
  whatsappMessage?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand text-white" aria-labelledby="cta-title">
      <svg aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[140%] opacity-[0.12]" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="190" stroke="white" strokeWidth="2" />
        <circle cx="200" cy="200" r="140" stroke="white" strokeWidth="2" />
        <circle cx="200" cy="200" r="90" stroke="white" strokeWidth="2" />
      </svg>
      <div className="container-x relative grid items-end gap-10 py-16 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-white/80 [&]:before:bg-white">Let&apos;s talk</p>
          <h2 id="cta-title" className="mt-5 text-[2.3rem] font-semibold leading-[1.02] sm:text-5xl lg:text-[3.6rem]">{title}</h2>
          <p className="mt-5 max-w-xl text-white/85 sm:text-lg">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <Link href={primary.href} className="btn btn-black">{primary.label} <ArrowRight className="size-4" /></Link>
          <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-white !text-ink hover:!text-white">
            <WhatsAppIcon className="size-4" /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
