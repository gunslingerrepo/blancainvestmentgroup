import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Photo from "@/components/Photo";
import ServicesIndex from "@/components/ServicesIndex";
import CtaBand from "@/components/CtaBand";
import ProjectCard from "@/components/ProjectCard";
import Partners from "@/components/Partners";
import { img, productGroups, projects, services, site, stats } from "@/content/site";
import { organizationJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Renewable Energy, Real Estate & Construction in Nigeria",
    description:
      "Blanca Investment Limited, Abuja: solar and renewable energy, real estate and property management, building construction, office supplies and procurement, and automation and ICT services across Nigeria.",
    path: "/",
  }),
  title: { absolute: `${site.name} | Building a Sustainable Future for Nigeria` },
};

const overviewPoints = [
  { title: "Quality standards", text: "Specified materials, inspected workmanship and documented handover." },
  { title: "Professional expertise", text: "Qualified engineers, technicians and property professionals on each brief." },
  { title: "Timely delivery", text: "Realistic programmes agreed up front and progress reported as work moves." },
  { title: "Sustainable practice", text: "Clean-energy options and efficient design considered on every project." },
];

const reasons = [
  { n: "01", title: "Proven delivery approach", text: "A structured process of survey, design, quotation, delivery and aftercare, so you always know what happens next and who is responsible." },
  { n: "02", title: "Expert team", text: "Engineers, installers, builders and property specialists who understand Nigerian sites, regulations and supply conditions." },
  { n: "03", title: "End-to-end solutions", text: "Power, buildings, supplies and security under one contract, with a single point of contact from first enquiry to maintenance." },
];

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />

      {/* ───────── HERO ───────── */}
      <section className="relative isolate flex min-h-[calc(100svh-76px)] flex-col overflow-hidden bg-ink text-white lg:min-h-[calc(100svh-124px)]">
        <div className="absolute inset-0 -z-10">
          <Photo src={img.solarAerial} alt="Aerial view of a large solar farm on a green hillside in an African landscape" fill priority sizes="100vw" className="hero-zoom object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" />
        </div>

        <div className="container-x flex flex-1 flex-col justify-center py-16 lg:py-20">
          <p className="eyebrow text-white/85">{site.name}</p>
          <h1 className="mt-6 max-w-[15ch] text-[2.9rem] font-semibold leading-[0.98] xs:text-[3.4rem] sm:text-7xl lg:text-[5.6rem]">
            Building a <span className="text-brand">Sustainable</span> Future for Nigeria
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Renewable energy, real estate, construction, procurement and automation &amp; ICT, delivered by one accountable Nigerian partner from our base in Abuja.
          </p>
          <div className="mt-10 flex flex-col gap-3 xs:flex-row">
            <Link href="/contact#quote" className="btn btn-red">Request a Quote <ArrowRight className="size-4" /></Link>
            <Link href="/services" className="btn btn-outline-light">Explore Services</Link>
          </div>
        </div>

        {/* Sector index strip */}
        <nav aria-label="Our sectors" className="relative border-t border-white/15 bg-ink/40 backdrop-blur-sm">
          <ul className="container-x flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] lg:grid lg:grid-cols-5 lg:overflow-visible">
            {services.map((s) => (
              <li key={s.slug} className="min-w-[62%] snap-start border-r border-white/10 first:border-l xs:min-w-[44%] sm:min-w-[32%] lg:min-w-0">
                <Link href={s.href} className="group flex h-full flex-col gap-3 px-5 py-6 transition-colors duration-[1200ms] hover:bg-brand">
                  <span className="flex items-center justify-between font-display text-xs tabular-nums text-white/55 group-hover:text-white">
                    {s.index}
                    <ArrowUpRight className="size-4 opacity-0 transition-opacity duration-[1200ms] group-hover:opacity-100" aria-hidden />
                  </span>
                  <span className="font-display text-[1.02rem] font-medium leading-snug">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* ───────── STATS ───────── */}
      <section aria-labelledby="stats-title" className="bg-ink text-white">
        <h2 id="stats-title" className="sr-only">Company at a glance</h2>
        <div className="container-x">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`flex flex-col-reverse justify-end border-white/10 py-10 lg:py-14 ${i % 2 === 1 ? "border-l pl-6 lg:pl-10" : "lg:pl-10"} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""} ${i === 0 ? "lg:pl-0" : ""}`}>
                <dt className="mt-3 text-sm text-white/60">{s.label}</dt>
                <dd className="font-display text-5xl font-semibold leading-none sm:text-6xl">
                  {s.verified ? (
                    <span>{s.value}</span>
                  ) : (
                    <span className="flex flex-col gap-3">
                      <span className="text-white/25" aria-hidden>TBC</span>
                      <span className="tag w-fit whitespace-nowrap border border-white/20 text-white/60">To be confirmed</span>
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────── INTRO ───────── */}
      <section className="py-20 sm:py-28 lg:py-36" aria-labelledby="intro-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-muted reveal">Who we are</p>
            <h2 id="intro-title" className="reveal mt-6 text-[2rem] font-medium leading-[1.12] sm:text-[2.7rem] lg:text-[3.2rem]">
              A diversified Nigerian company for the <span className="text-brand">power, buildings, supplies and systems</span> that homes and organizations depend on.
            </h2>
          </div>
          <div className="reveal reveal-delay-1 flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <p className="text-[1.02rem] leading-relaxed text-muted">
              Blanca Investment Limited brings renewable energy, real estate, building construction, office supplies and automation &amp; ICT together under one roof, so clients deal with one team, one plan and one point of accountability.
            </p>
            <Link href="/about" className="link-underline mt-6 inline-flex w-fit items-center gap-2 font-display font-medium text-ink hover:text-brand">
              More about Blanca <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
        <div className="container-x mt-16 grid grid-cols-12 gap-4 sm:gap-6 lg:mt-24">
          <div className="reveal relative col-span-12 aspect-[16/10] overflow-hidden bg-ink-3 sm:col-span-7 sm:aspect-[4/3]">
            <Photo src={img.solarTrackers} alt="Rows of solar panels on single-axis trackers in a grassy field" fill sizes="(min-width:640px) 58vw, 100vw" className="object-cover" />
          </div>
          <div className="reveal reveal-delay-2 col-span-12 flex flex-col gap-4 sm:col-span-5 sm:gap-6 sm:pt-24">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink-3">
              <Photo src={img.construction} alt="Glass-fronted commercial building under construction with a crane" fill sizes="(min-width:640px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── SERVICES ───────── */}
      <section className="bg-mist py-20 sm:py-28 lg:py-32" aria-labelledby="services-title">
        <div className="container-x">
          <div className="mb-14 flex flex-col justify-between gap-6 lg:mb-20 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow text-muted reveal">Core services</p>
              <h2 id="services-title" className="reveal mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[3.6rem]">Five sectors. One accountable partner.</h2>
            </div>
            <Link href="/services" className="btn btn-outline reveal w-fit">All services <ArrowRight className="size-4" /></Link>
          </div>
          <ServicesIndex />
        </div>
      </section>

      {/* ───────── FEATURED PROJECTS ───────── */}
      <section className="py-20 sm:py-28 lg:py-32" aria-labelledby="featured-title">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow text-muted reveal">Featured projects</p>
              <h2 id="featured-title" className="reveal mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[3.6rem]">Homes taking shape in Abuja</h2>
            </div>
            <Link href="/projects" className="btn btn-outline reveal w-fit">All projects <ArrowRight className="size-4" /></Link>
          </div>
          <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {projects.map((p, i) => (
              <li key={p.slug} className={`reveal reveal-delay-${i + 1}`}><ProjectCard project={p} /></li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── PRODUCTS ───────── */}
      <section className="noise-dark py-20 text-white sm:py-24" aria-labelledby="products-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-white/70 reveal">Products we supply</p>
            <h2 id="products-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">Quality equipment, sourced and installed</h2>
            <p className="reveal mt-5 max-w-sm text-[0.98rem] leading-relaxed text-white/65">From solar panels and batteries to CCTV, POS systems and servers, we supply the products behind our projects.</p>
            <Link href="/services#products" className="btn btn-red reveal mt-8">View all products <ArrowRight className="size-4" /></Link>
          </div>
          <div className="grid gap-px bg-white/10 sm:grid-cols-3 lg:col-span-8">
            {productGroups.map((g, i) => (
              <div key={g.id} className={`reveal reveal-delay-${i + 1} bg-ink p-7`}>
                <p className="font-display text-sm tabular-nums text-brand">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-xl font-medium">{g.title}</h3>
                <ul className="mt-5 flex flex-col gap-2.5 text-[0.92rem] text-white/70">
                  {g.items.map((it) => (
                    <li key={it.name} className="flex items-center gap-2.5"><span className="size-1 shrink-0 bg-brand" aria-hidden />{it.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── OVERVIEW ───────── */}
      <section className="py-20 sm:py-28 lg:py-36" aria-labelledby="overview-title">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="reveal relative lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink-3 sm:aspect-[5/4] lg:aspect-[4/5]">
              <Photo src={img.boardMeeting} alt="Business team in a board meeting around a conference table" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 right-4 max-w-[15rem] bg-brand p-6 text-white sm:-right-6 sm:bottom-10 lg:-right-10">
              <p className="font-display text-5xl font-semibold leading-none">05</p>
              <p className="mt-2 text-sm leading-snug text-white/90">core business sectors managed by one team</p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="eyebrow text-muted reveal">Company overview</p>
            <h2 id="overview-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">Trusted by Clients Across Nigeria</h2>
            <p className="reveal mt-6 text-[1.02rem] leading-relaxed text-muted">
              We combine local knowledge with recognised professional practice. Whether you are powering a home, developing an estate, fitting out an office or securing a facility, we plan the work around your budget and deliver it with care.
            </p>
            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {overviewPoints.map((p, i) => (
                <li key={p.title} className={`reveal reveal-delay-${(i % 3) + 1} border-t border-line pt-5`}>
                  <p className="flex items-center gap-2.5 font-display text-lg font-medium"><Check className="size-4 text-brand" aria-hidden />{p.title}</p>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn btn-black reveal mt-10">About Blanca <ArrowRight className="size-4" /></Link>
          </div>
        </div>
      </section>

      {/* ───────── WHY CHOOSE US ───────── */}
      <section className="noise-dark py-20 text-white sm:py-28 lg:py-32" aria-labelledby="why-title">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12">
            <p className="eyebrow text-white/70 reveal lg:col-span-3">Why choose us</p>
            <h2 id="why-title" className="reveal text-4xl font-semibold leading-[1.05] sm:text-5xl lg:col-span-8 lg:text-[3.6rem]">
              Clear plans, qualified people and one point of contact from first call to aftercare.
            </h2>
          </div>
          <ol className="mt-16 grid gap-px bg-white/10 md:grid-cols-3 lg:mt-24">
            {reasons.map((r, i) => (
              <li key={r.n} className={`reveal reveal-delay-${i + 1} bg-ink p-8 lg:p-10`}>
                <p className="font-display text-sm tabular-nums text-brand">{r.n}</p>
                <h3 className="mt-10 text-2xl font-medium lg:mt-16">{r.title}</h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-white/65">{r.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Partners />

      <CtaBand />
    </>
  );
}
