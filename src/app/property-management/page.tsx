import Link from "next/link";
import { ArrowRight, Building2, KeyRound, Ruler, ShieldCheck, Users, Wrench } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import CtaBand from "@/components/CtaBand";
import { img } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Property Management",
  description:
    "Property development, sales and leasing, facility management, valuation, estate security and tenant management for owners, tenants and investors from Blanca Investment Limited, Abuja.",
  path: "/property-management",
});

const propertyServices = [
  { icon: Building2, title: "Property Development", text: "From land and design through to construction and handover of residential and commercial developments." },
  { icon: KeyRound, title: "Sales & Leasing", text: "Marketing, viewings, tenant and buyer screening, documentation and handover." },
  { icon: Wrench, title: "Facility Management", text: "Planned and reactive maintenance, cleaning, utilities and service-contractor management." },
  { icon: Ruler, title: "Property Valuation", text: "Valuation support for sale, purchase, letting, financing and portfolio decisions." },
  { icon: ShieldCheck, title: "Estate Security", text: "Access control, CCTV and guarding arrangements that keep residents and assets safe." },
  { icon: Users, title: "Tenant Management", text: "Rent collection, renewals, enquiries and issue resolution handled promptly and fairly." },
];

const steps = [
  { title: "Property review", text: "We visit the property, check its condition and review documents, existing tenancies and outstanding maintenance." },
  { title: "Management plan", text: "We agree the scope of services, fees, reporting schedule and responsibilities with you in writing." },
  { title: "Day-to-day care", text: "Tenants, rent collection, maintenance, security and service contractors are handled by one dedicated team." },
  { title: "Regular reporting", text: "You receive clear statements and updates, so you always know how your property is performing." },
];

const audiences = [
  { title: "Property owners", text: "Protect your asset and income. We handle tenants, maintenance and reporting so you don't have to." },
  { title: "Tenants", text: "Responsive management, clear agreements and maintenance requests that are actually acted on." },
  { title: "Investors", text: "Development opportunities, valuations and managed portfolios with transparent reporting." },
];

export default function PropertyManagementPage() {
  return (
    <>
      <PageHero
        crumb="Property Management"
        eyebrow="Real estate & property"
        title={<>Your Property, <span className="text-brand">Our Priority</span></>}
        intro="Development, sales, leasing and day-to-day management for residential and commercial property, handled by a team that treats your building as if it were its own."
        image={img.estate}
        imageAlt="Aerial view of a landscaped residential estate with modern detached houses"
      >
        <Link href="/contact?service=real-estate#quote" className="btn btn-red">Get Started <ArrowRight className="size-4" /></Link>
        <a href="#how-it-works" className="btn btn-outline-light">How it works</a>
      </PageHero>

      {/* Services grid */}
      <section className="py-20 sm:py-28 lg:py-32" aria-labelledby="pm-services-title">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className="eyebrow text-muted reveal lg:col-span-4">Property services</p>
            <div className="lg:col-span-8">
              <h2 id="pm-services-title" className="reveal text-4xl font-semibold leading-[1.05] sm:text-5xl">Everything a property needs, under one management</h2>
              <p className="reveal mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-muted">Choose a single service or hand over the full management of a building or estate.</p>
            </div>
          </div>
          <ul className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {propertyServices.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className={`reveal reveal-delay-${(i % 3) + 1} group relative border-b border-r border-line p-8 transition-colors duration-[1200ms] hover:bg-mist lg:p-10`}>
                <span className="absolute right-6 top-6 font-display text-xs tabular-nums text-muted-light">{String(i + 1).padStart(2, "0")}</span>
                <Icon className="size-8 text-brand" aria-hidden />
                <h3 className="mt-10 text-2xl font-medium">{title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Audiences: split with image */}
      <section className="grid bg-ink text-white lg:grid-cols-2" aria-labelledby="audience-title">
        <div className="relative min-h-[320px] bg-ink-3 lg:min-h-full">
          <Photo src={img.interiorC} alt="Comfortable furnished apartment living area" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="px-4 py-20 sm:px-10 lg:px-16 lg:py-28">
          <p className="eyebrow text-white/70">Who we work with</p>
          <h2 id="audience-title" className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">For owners, tenants and investors</h2>
          <dl className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {audiences.map((a) => (
              <div key={a.title} className="grid gap-2 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-display text-lg font-medium text-brand">{a.title}</dt>
                <dd className="text-white/70">{a.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-mist py-20 sm:py-28" aria-labelledby="hiw-title">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-muted reveal">How it works</p>
              <h2 id="hiw-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">Handing over your property, step by step</h2>
            </div>
            <p className="reveal text-[1.02rem] leading-relaxed text-muted lg:col-span-5">
              Whether you own a single apartment or a full estate, every management brief starts the same way: a clear look at the property and a written plan you agree to before we take over.
            </p>
          </div>
          <ol className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((st, i) => (
              <li key={st.title} className={`reveal reveal-delay-${(i % 3) + 1} bg-mist p-8 lg:p-10`}>
                <span className="font-display text-5xl font-semibold leading-none text-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-8 text-2xl font-medium">{st.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{st.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link href="/contact?service=real-estate#quote" className="btn btn-red w-fit">Discuss your property <ArrowRight className="size-4" /></Link>
            <p className="text-sm text-muted">Free initial consultation. No obligation.</p>
          </div>
        </div>
      </section>

      <CtaBand
        title="Looking for Property?"
        text="Buying, leasing, short-let or full management? Tell us what you're looking for and we'll match you with suitable options."
        primary={{ href: "/contact?service=real-estate#quote", label: "Make a Property Enquiry" }}
        whatsappMessage="Hello Blanca Investment, I'm interested in your property services."
      />
    </>
  );
}
