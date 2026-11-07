import Link from "next/link";
import { ArrowRight, Award, Lightbulb, ShieldCheck, Target, Eye, Handshake } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import CtaBand from "@/components/CtaBand";
import Partners from "@/components/Partners";
import { img, services } from "@/content/site";
import OrgChart from "@/components/OrgChart";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about Blanca Investment Limited, a diversified Nigerian company based in Abuja working across renewable energy, real estate, construction, procurement and automation & ICT. Our mission, vision and values.",
  path: "/about",
});

const values = [
  { icon: Award, title: "Excellence", text: "We hold our work to a high standard and check it before we hand it over." },
  { icon: Lightbulb, title: "Innovation", text: "We look for better, cleaner and more efficient ways to solve each brief." },
  { icon: ShieldCheck, title: "Integrity", text: "Honest advice, transparent pricing and commitments we can keep." },
  { icon: Handshake, title: "Reliability", text: "We turn up, communicate clearly and see projects through to the end." },
];

const steps = [
  { n: "01", title: "Consult", text: "We listen, visit the site where needed and agree what success looks like." },
  { n: "02", title: "Plan", text: "Scope, design, programme and a clear written quotation." },
  { n: "03", title: "Deliver", text: "Supervised execution with regular progress updates." },
  { n: "04", title: "Support", text: "Handover documentation, maintenance and after-sales support." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="About Blanca Investment"
        title={<>Local expertise. <span className="text-brand">Professional</span> practice.</>}
        intro="A diversified Nigerian business bringing energy, property, construction, procurement and technology services together for clients who want one dependable partner."
        image={img.abujaStreet}
        imageAlt="City street lined with tall buildings in Abuja"
      />

      {/* Story */}
      <section className="py-20 sm:py-28 lg:py-32" aria-labelledby="story-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-muted reveal">Our story</p>
            <h2 id="story-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">One company, five disciplines</h2>
          </div>
          <div className="space-y-6 text-[1.05rem] leading-relaxed text-muted lg:col-span-7 lg:col-start-6">
            <p className="reveal font-display text-2xl leading-snug text-ink sm:text-[1.75rem]">
              Blanca Investment Limited was established to give Nigerian homes, businesses and institutions a single, accountable partner for the infrastructure they rely on.
            </p>
            <p className="reveal">
              From our head office in Jahi, Abuja, we work across renewable energy, real estate and property management, building construction, office supplies and procurement, and automation and ICT. Each discipline is led by people who know it well, and because they work as one team, clients avoid the cost and confusion of coordinating several contractors.
            </p>
            <p className="reveal">
              Our approach combines local expertise (an understanding of Nigerian sites, supply chains and regulations) with recognised professional practices in design, safety, quality assurance and project management.
            </p>
            <div className="reveal flex flex-wrap gap-2 pt-2">
              {services.map((s) => (
                <Link key={s.slug} href={s.href} className="tag border border-line text-ink transition-colors duration-[1200ms] hover:border-brand hover:bg-brand hover:text-white">{s.title}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section aria-label="Mission and vision" className="grid lg:grid-cols-2">
        <div className="relative isolate overflow-hidden bg-ink px-4 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
          <Target className="size-8 text-brand" aria-hidden />
          <h2 className="mt-8 font-display text-sm uppercase tracking-[0.22em] text-white/60">Our mission</h2>
          <p className="mt-5 max-w-xl font-display text-xl leading-snug sm:text-2xl lg:text-[1.7rem]">
            We are committed to transforming ideas into impactful solutions by delivering world-class construction, engineering, renewable energy and smart automation technologies, guided by innovation, professionalism and an unwavering commitment to excellence.
          </p>
        </div>
        <div className="relative isolate overflow-hidden bg-brand px-4 py-20 text-white sm:px-10 lg:px-16 lg:py-28">
          <Eye className="size-8 text-white" aria-hidden />
          <h2 className="mt-8 font-display text-sm uppercase tracking-[0.22em] text-white/75">Our vision</h2>
          <p className="mt-5 max-w-xl font-display text-xl leading-snug sm:text-2xl lg:text-[1.7rem]">
            To shape the future of infrastructure through innovative engineering, sustainable construction, renewable energy and intelligent automation, delivering world-class solutions that drive progress, empower communities and create lasting value for generations to come.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 lg:py-32" aria-labelledby="values-title">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className="eyebrow text-muted reveal lg:col-span-4">Core values</p>
            <h2 id="values-title" className="reveal text-4xl font-semibold leading-[1.05] sm:text-5xl lg:col-span-8">What guides every decision we make</h2>
          </div>
          <ul className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className={`reveal reveal-delay-${(i % 3) + 1} group border-b border-r border-line p-8 transition-colors duration-[1200ms] hover:bg-ink hover:text-white`}>
                <Icon className="size-7 text-brand" aria-hidden />
                <h3 className="mt-14 text-2xl font-medium">{title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted transition-colors duration-[1200ms] group-hover:text-white/70">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-mist py-20 sm:py-28" aria-labelledby="approach-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-muted reveal">How we work</p>
            <h2 id="approach-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">A simple process, followed every time</h2>
            <div className="reveal relative mt-10 aspect-[4/3] overflow-hidden bg-ink-3">
              <Photo src={img.installationTeam} alt="Two technicians beside a completed installation of three wall-mounted inverters and battery units" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {steps.map((s, i) => (
              <li key={s.n} className={`reveal reveal-delay-${(i % 3) + 1} grid grid-cols-[4rem_1fr] gap-4 border-t border-line py-8 last:border-b`}>
                <span className="font-display text-4xl font-semibold text-brand">{s.n}</span>
                <div>
                  <h3 className="text-2xl font-medium">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team / organization */}
      <section className="py-20 sm:py-28" aria-labelledby="team-title">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-muted reveal">Meet our team</p>
              <h2 id="team-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">How Blanca is organized</h2>
            </div>
            <p className="reveal text-[1.02rem] leading-relaxed text-muted lg:col-span-5">Seven divisions report to our General Manager Operations, each with a clear lead, so every client has a direct line to the people doing the work.</p>
          </div>
          <OrgChart />
          <Link href="/contact" className="btn btn-outline reveal mt-14">Work with us <ArrowRight className="size-4" /></Link>
        </div>
      </section>

      <Partners tone="mist" />

      <CtaBand />
    </>
  );
}
