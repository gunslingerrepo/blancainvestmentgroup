import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { services, site, whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./icons";

const quick = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/services#products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/property-management", label: "Property Management" },
  { href: "/renewable-energy", label: "Renewable Energy" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="noise-dark text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container-x grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-4">
          <Logo variant="light" className="h-12" />
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-white/65">{site.footerBlurb}</p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light mt-8 !py-3">
            <WhatsAppIcon className="size-4" /> Chat on WhatsApp
          </a>
        </div>

        <nav aria-label="Quick links" className="lg:col-span-2">
          <h3 className="font-display text-xs font-medium uppercase tracking-[0.2em] text-white/45">Company</h3>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {quick.map((l) => (
              <li key={l.href}><Link href={l.href} className="link-underline text-white/80 hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services" className="lg:col-span-3">
          <h3 className="font-display text-xs font-medium uppercase tracking-[0.2em] text-white/45">Services</h3>
          <ul className="mt-5 space-y-3 text-[0.95rem]">
            {services.map((s) => (
              <li key={s.slug}><Link href={s.href} className="link-underline text-white/80 hover:text-white">{s.title}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="font-display text-xs font-medium uppercase tracking-[0.2em] text-white/45">Contact</h3>
          <address className="mt-5 space-y-4 text-[0.95rem] not-italic text-white/80">
            <p className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />{site.address.full}</p>
            <p><a href={site.phone.href} className="flex gap-3 hover:text-white"><Phone className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden /><span className="link-underline">{site.phone.display}</span></a></p>
            <p><a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-white"><Mail className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden /><span className="link-underline">{site.email}</span></a></p>
            <p className="flex gap-3"><Clock className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />{site.hours.display}</p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-[0.8rem] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.name} ({site.groupName}). All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link href="/privacy-policy" className="link-underline hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="link-underline hover:text-white">Terms of Service</Link></li>
            <li><Link href="/contact#complaint" className="link-underline hover:text-white">Submit a Complaint</Link></li>
            <li><a href="#top" className="inline-flex items-center gap-1 hover:text-white">Back to top <ArrowUpRight className="size-3 -rotate-45" aria-hidden /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
