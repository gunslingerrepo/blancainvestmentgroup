import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, FileDown, MessagesSquare, Truck, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";
import ServicePhoto from "@/components/ServicePhoto";
import ProductsCatalogue from "@/components/ProductsCatalogue";
import CtaBand from "@/components/CtaBand";
import { additionalServices, downloads, img, services } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Renewable energy solutions, real estate and property management, building construction, office supplies and procurement, and automation & ICT services from Blanca Investment Limited, Abuja.",
  path: "/services",
});

const extended: Record<string, { detail: string[]; learnMore: string; learnLabel: string }> = {
  "renewable-energy": {
    detail: ["Solar panels", "Inverters", "Battery storage", "Off-grid and hybrid systems", "Energy audits"],
    learnMore: "/renewable-energy",
    learnLabel: "Learn more about solar",
  },
  "real-estate": {
    detail: ["Property development and sales", "Facility management", "Tenant management", "Property valuation"],
    learnMore: "/property-management",
    learnLabel: "Learn more about property",
  },
  construction: {
    detail: ["Residential construction", "Commercial construction", "Industrial construction", "Renovations", "Project management"],
    learnMore: "/contact?service=construction#quote",
    learnLabel: "Discuss a building project",
  },
  "office-supplies": {
    detail: ["Office furniture", "IT equipment", "Stationery", "Bulk procurement"],
    learnMore: "/contact?service=office-supplies#quote",
    learnLabel: "Request a supply quote",
  },
  "automation-ict": {
    detail: ["Smart locks", "CCTV installation", "Remote monitoring", "Wired and wireless networking", "Maintenance", "Technical support"],
    learnMore: "/contact?service=automation-ict#quote",
    learnLabel: "Plan an installation",
  },
};

const extraIcons = [Wrench, ClipboardCheck, MessagesSquare, Truck];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="What we do"
        title={<>Services built around <span className="text-brand">real</span> infrastructure needs</>}
        intro="Five connected disciplines, each with its own specialists, coordinated by one team so your project runs smoothly from enquiry to aftercare."
        image={img.towerCrane}
        imageAlt="Tall building under construction with a tower crane"
      />

      {/* In-page navigation */}
      <nav aria-label="Service sections" className="sticky top-[76px] z-30 border-b border-line bg-white/95 backdrop-blur lg:top-[84px]">
        <ul className="container-x flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
          {services.map((s) => (
            <li key={s.slug} className="shrink-0">
              <a href={`#${s.slug}`} className="flex items-center gap-2 px-3 py-2 font-display text-sm text-ink/70 transition-colors duration-[1200ms] hover:bg-mist hover:text-brand">
                <span className="text-xs tabular-nums text-brand">{s.index}</span>{s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((s, i) => {
        const ext = extended[s.slug];
        const flip = i % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className={`py-20 sm:py-24 lg:py-32 ${flip ? "bg-mist" : ""}`}>
            <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <div className={`reveal relative lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
                <div className="zoom-parent relative aspect-[4/3] overflow-hidden bg-ink-3 lg:aspect-[5/6]">
                  <ServicePhoto
                    service={s}
                    src={s.slug === "renewable-energy" ? img.inverterInstall : undefined}
                    alt={s.slug === "renewable-energy" ? "Three wall-mounted hybrid inverters with battery units, surge protection and fire-suppression balls" : undefined}
                    sizes="(min-width:1024px) 48vw, 100vw"
                    className="zoom-img object-cover"
                  />
                </div>
                <span className={`absolute -top-5 font-display text-[5.5rem] font-semibold leading-none text-brand sm:text-[7rem] ${flip ? "right-4 lg:-right-6" : "left-4 lg:-left-6"}`} aria-hidden>
                  {s.index}
                </span>
              </div>
              <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                <p className="eyebrow text-muted reveal">{s.short}</p>
                <h2 id={`${s.slug}-title`} className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">
                  {s.slug === "renewable-energy" ? "Renewable Energy Solutions" : s.slug === "real-estate" ? "Real Estate & Property Management" : s.title}
                </h2>
                <p className="reveal mt-6 text-[1.02rem] leading-relaxed text-muted">{s.description}</p>
                <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="reveal flex items-start gap-3 bg-white p-4 text-[0.95rem]">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />{pt}
                    </li>
                  ))}
                </ul>
                <p className="reveal mt-6 text-sm text-muted">
                  <span className="font-medium text-ink">Includes: </span>{ext.detail.join(" · ")}
                </p>
                <div className="reveal mt-9 flex flex-wrap gap-3">
                  <Link href={ext.learnMore} className="btn btn-red">Learn More <ArrowRight className="size-4" /></Link>
                  <Link href={`/contact?service=${s.slug}#quote`} className="btn btn-outline">Get a quote</Link>
                </div>
                <span className="sr-only">{ext.learnLabel}</span>
              </div>
            </div>
          </section>
        );
      })}

      {/* Additional services */}
      <section className="noise-dark py-20 text-white sm:py-28" aria-labelledby="extra-title">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className="eyebrow text-white/70 reveal lg:col-span-4">Across every service</p>
            <h2 id="extra-title" className="reveal text-4xl font-semibold leading-[1.05] sm:text-5xl lg:col-span-8">Additional services that keep projects on track</h2>
          </div>
          <ul className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((a, i) => {
              const Icon = extraIcons[i];
              return (
                <li key={a.title} className={`reveal reveal-delay-${(i % 3) + 1} bg-ink p-8`}>
                  <Icon className="size-7 text-brand" aria-hidden />
                  <h3 className="mt-12 text-xl font-medium">{a.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65">{a.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="scroll-mt-28 border-t border-line py-20 sm:py-28" aria-labelledby="products-title">
        <div className="container-x">
          <div className="mb-14 grid gap-6 lg:mb-20 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-muted reveal">Products</p>
              <h2 id="products-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">Products we supply and install</h2>
            </div>
            <p className="reveal text-[1.02rem] leading-relaxed text-muted lg:col-span-5">Choose a product to request prices and availability. We can supply on its own or as part of a full installation.</p>
          </div>
          <ul className="mb-16 grid gap-4 md:grid-cols-2 lg:mb-20" aria-label="Downloads">
            {downloads.map((d) => (
              <li key={d.href} className="reveal">
                <a href={d.href} download className="group flex h-full items-start gap-5 border border-line bg-mist p-6 transition-colors duration-[1200ms] hover:border-ink hover:bg-ink hover:text-white sm:p-8">
                  <span className="grid size-14 shrink-0 place-items-center bg-brand text-white"><FileDown className="size-6" aria-hidden /></span>
                  <span className="flex flex-1 flex-col">
                    <span className="font-display text-xl font-medium">{d.title}</span>
                    <span className="mt-2 text-[0.92rem] leading-relaxed text-muted transition-colors duration-[1200ms] group-hover:text-white/70">{d.text}</span>
                    <span className="mt-4 inline-flex items-center gap-2 font-display text-sm font-medium text-brand group-hover:text-white">Download <span className="font-normal text-muted transition-colors duration-[1200ms] group-hover:text-white/60">{d.meta}</span></span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <ProductsCatalogue />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
