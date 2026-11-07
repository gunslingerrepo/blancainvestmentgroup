import Link from "next/link";
import { ArrowRight, Check, FileDown, MapPin } from "lucide-react";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import ProjectsBrowser from "@/components/ProjectsBrowser";
import ProjectGallery from "@/components/ProjectGallery";
import FloorPlan from "@/components/FloorPlan";
import { StatusTags } from "@/components/ProjectCard";
import { WhatsAppIcon } from "@/components/icons";
import { projects, whatsappLink, type Project } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Residential developments by Blanca Investment Limited in Abuja: three-bedroom flats with BQ and a gated residential estate at Apo, both under construction and now selling.",
  path: "/projects",
});

const enquireHref = (p: Project) =>
  `/contact?service=real-estate&interest=buying&property=${encodeURIComponent(p.shortName)}#quote`;

function ProjectDetail({ project: p, index }: { project: Project; index: number }) {
  const alt = index % 2 === 1;
  return (
    <section id={p.slug} className={`scroll-mt-28 py-20 sm:py-28 ${alt ? "bg-mist" : "bg-white"}`} aria-labelledby={`${p.slug}-title`}>
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-10 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <span className="font-display text-sm tabular-nums text-brand">{String(index + 1).padStart(2, "0")}</span>
              <StatusTags project={p} />
            </div>
            <h2 id={`${p.slug}-title`} className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-5xl">{p.name}</h2>
            <p className="mt-4 flex items-center gap-2 text-muted"><MapPin className="size-4 text-brand" aria-hidden />{p.location}</p>
          </div>
          <p className="eyebrow text-muted">{p.type}</p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-7">
            <ProjectGallery images={p.gallery} title={p.name} />
          </div>
          <div className="min-w-0 lg:col-span-5">
            {p.description.map((d) => (
              <p key={d.slice(0, 20)} className="mb-4 text-[1.02rem] leading-relaxed text-muted">{d}</p>
            ))}
            <dl className="mt-8 border-t border-line">
              {p.facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[9.5rem_1fr] gap-4 border-b border-line py-3.5 text-[0.95rem]">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <Link href={enquireHref(p)} className="btn btn-red">Enquire about this project <ArrowRight className="size-4" /></Link>
              <a href={whatsappLink(`Hello Blanca Investment, I'm interested in the ${p.shortName} project.`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <WhatsAppIcon className="size-4" /> WhatsApp
              </a>
            </div>
            {p.brochure && (
              <a href={p.brochure.href} download className="link-underline mt-6 inline-flex items-center gap-2 font-display text-sm font-medium hover:text-brand">
                <FileDown className="size-4 text-brand" aria-hidden /> {p.brochure.label} <span className="font-normal text-muted">({p.brochure.size})</span>
              </a>
            )}
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className={`min-w-0 ${p.pricing ? "lg:col-span-5" : "lg:col-span-12"}`}>
            <h3 className="font-display text-xl font-medium">{p.floorPlan ? "What each apartment offers" : "Estate features"}</h3>
            <ul className={`mt-6 grid gap-x-8 gap-y-3 ${p.pricing ? "" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[0.95rem] leading-relaxed"><Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden />{f}</li>
              ))}
            </ul>
          </div>
          {p.pricing && (
            <div className="min-w-0 lg:col-span-7">
              <h3 className="font-display text-xl font-medium">Prices and payment plans</h3>
              <div className="mt-6 overflow-x-auto border border-line bg-white">
                <table className="w-full min-w-[520px] text-left text-[0.95rem]">
                  <caption className="sr-only">Apartment prices by floor and payment plan</caption>
                  <thead className="bg-ink text-white">
                    <tr>
                      <th scope="col" className="px-5 py-4 font-display text-sm font-medium">Floor</th>
                      <th scope="col" className="px-5 py-4 font-display text-sm font-medium">Outright</th>
                      <th scope="col" className="px-5 py-4 font-display text-sm font-medium">6-month plan</th>
                      <th scope="col" className="px-5 py-4 font-display text-sm font-medium">12-month plan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.pricing.rows.map((r) => (
                      <tr key={r.floor} className="border-t border-line">
                        <th scope="row" className="px-5 py-4 font-display font-medium">{r.floor}</th>
                        <td className="px-5 py-4 font-semibold text-brand tabular-nums">{r.outright}</td>
                        <td className="px-5 py-4 tabular-nums">{r.sixMonths}</td>
                        <td className="px-5 py-4 tabular-nums">{r.twelveMonths}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm text-muted">{p.pricing.note}</p>
            </div>
          )}
        </div>

        {p.floorPlan && (
          <div className="mt-16">
            <h3 className="mb-6 font-display text-xl font-medium">Floor plan</h3>
            <FloorPlan plan={p.floorPlan} />
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumb="Projects"
        eyebrow="Portfolio"
        title={<>Homes we are <span className="text-brand">building</span> in Abuja</>}
        intro="Residential developments by Blanca Investment Limited, from three-bedroom flats to a gated residential estate at Apo, both now selling."
        image="/images/projects/estate-blocks.jpg"
        imageAlt="Three-storey apartment blocks in white render and grey brick along an estate road"
      >
        <Link href="#projects-list" className="btn btn-red">View projects <ArrowRight className="size-4" /></Link>
        <Link href="/contact?service=real-estate&interest=buying#quote" className="btn btn-outline-light">Make an enquiry</Link>
      </PageHero>

      <section id="projects-list" className="scroll-mt-24 bg-mist py-20 sm:py-24" aria-labelledby="projects-list-title">
        <div className="container-x">
          <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-muted reveal">All projects</p>
              <h2 id="projects-list-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">Current and upcoming developments</h2>
            </div>
            <p className="reveal text-[0.95rem] leading-relaxed text-muted lg:col-span-5">Filter by status, then open a project to see images, key details and, where available, floor plans and prices.</p>
          </div>
          <ProjectsBrowser />
        </div>
      </section>

      {projects.map((p, i) => (
        <ProjectDetail key={p.slug} project={p} index={i} />
      ))}

      <CtaBand
        title="Interested in one of our projects?"
        text="Ask about availability, payment plans or a site visit. Our property team will get back to you with clear next steps."
        primary={{ href: "/contact?service=real-estate&interest=buying#quote", label: "Make a Property Enquiry" }}
        whatsappMessage="Hello Blanca Investment, I'd like to know more about your projects."
      />
    </>
  );
}
