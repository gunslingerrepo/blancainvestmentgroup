"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { nav, site, whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./icons";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll, close on Escape, trap focus while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a,button"));
        const f = items[0], l = items[items.length - 1];
        if (e.shiftKey && document.activeElement === f) { e.preventDefault(); l.focus(); }
        else if (!e.shiftKey && document.activeElement === l) { e.preventDefault(); f.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
        Skip to main content
      </a>

      {/* Utility bar */}
      <div className="hidden bg-ink text-[0.78rem] text-white/75 lg:block">
        <div className="container-x flex h-10 items-center justify-between">
          <div className="flex items-center gap-7">
            <span className="flex items-center gap-2"><MapPin className="size-3.5 text-brand" aria-hidden />{site.address.full}</span>
            <span className="flex items-center gap-2"><Clock className="size-3.5 text-brand" aria-hidden />{site.hours.short}</span>
          </div>
          <div className="flex items-center gap-7">
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors duration-[1200ms] hover:text-white"><Mail className="size-3.5 text-brand" aria-hidden />{site.email}</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors duration-[1200ms] hover:text-white"><WhatsAppIcon className="size-3.5 text-brand" />WhatsApp</a>
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-[box-shadow,border-color] duration-500 ${scrolled ? "border-line shadow-[0_8px_30px_-18px_rgba(0,0,0,0.35)]" : "border-transparent"}`}>
        <div className="container-x flex h-[76px] items-center justify-between gap-6 lg:h-[84px]">
          <Logo className="h-10 sm:h-11 lg:h-12" priority />

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-0.5 2xl:gap-1">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`relative whitespace-nowrap px-3 py-2 font-display text-[0.92rem] transition-colors duration-[1200ms] after:absolute after:inset-x-3 after:-bottom-[2px] after:h-[2px] after:origin-left after:bg-brand after:transition-transform after:duration-[1200ms] ${active ? "text-ink after:scale-x-100 font-medium" : "text-ink/70 after:scale-x-0 hover:text-brand hover:after:scale-x-100"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a href={site.phone.href} className="hidden items-center gap-2.5 whitespace-nowrap font-display text-[0.92rem] font-medium md:flex xl:hidden 2xl:flex">
              <span className="grid size-9 place-items-center border border-line text-brand"><Phone className="size-4" aria-hidden /></span>
              <span className="link-underline">{site.phone.display}</span>
            </a>
            <Link href="/contact#quote" className="btn btn-red hidden !px-5 !py-3 sm:inline-flex">Get a Quote</Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center bg-ink text-white transition-colors duration-[1200ms] hover:bg-brand xl:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-[60] overflow-y-auto bg-ink text-white xl:hidden"
      >
        <div className="container-x flex h-[76px] items-center justify-between">
          <Logo variant="light" className="h-10" />
          <button type="button" onClick={() => { setOpen(false); toggleRef.current?.focus(); }} aria-label="Close menu" className="grid size-11 place-items-center bg-brand text-white">
            <X className="size-5" />
          </button>
        </div>
        <nav aria-label="Mobile" className="container-x pb-10 pt-6">
          <ol className="border-t border-white/10">
            {nav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-white/10">
                  <Link href={item.href} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={`flex items-baseline gap-5 py-4 font-display text-[1.65rem] leading-tight sm:text-3xl ${active ? "text-brand" : "text-white"}`}>
                    <span className="w-7 font-sans text-xs tabular-nums text-white/40">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link href="/contact#quote" className="btn btn-red w-full">Get a Quote <ArrowRight className="size-4" /></Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light w-full"><WhatsAppIcon className="size-4" /> Chat on WhatsApp</a>
          </div>
          <dl className="mt-10 grid gap-4 text-sm text-white/70">
            <div><dt className="sr-only">Telephone</dt><dd><a href={site.phone.href} className="flex items-center gap-3"><Phone className="size-4 text-brand" />{site.phone.display}</a></dd></div>
            <div><dt className="sr-only">Email</dt><dd><a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all"><Mail className="size-4 shrink-0 text-brand" />{site.email}</a></dd></div>
            <div><dt className="sr-only">Address</dt><dd className="flex items-center gap-3"><MapPin className="size-4 text-brand" />{site.address.full}</dd></div>
            <div><dt className="sr-only">Opening hours</dt><dd className="flex items-center gap-3"><Clock className="size-4 text-brand" />{site.hours.display}</dd></div>
          </dl>
        </nav>
      </div>
    </>
  );
}
