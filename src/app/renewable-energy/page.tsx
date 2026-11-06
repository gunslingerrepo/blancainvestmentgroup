import Link from "next/link";
import { ArrowRight, BatteryCharging, ClipboardCheck, Gauge, Leaf, PlugZap, Sun } from "lucide-react";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import CtaBand from "@/components/CtaBand";
import SolarEstimator from "@/components/SolarEstimator";
import { img } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Renewable Energy & Solar Installation",
  description:
    "Solar panel systems, battery storage, inverters, energy audits, maintenance and green consulting for homes and businesses in Abuja and across Nigeria. Get a free solar quote from Blanca Investment Limited.",
  path: "/renewable-energy",
});

const solutions = [
  { icon: Sun, title: "Solar Panel Systems", text: "Rooftop and ground-mounted arrays sized to your consumption and roof or land area." },
  { icon: BatteryCharging, title: "Battery Storage", text: "Lithium battery banks that keep essential loads running at night and during outages." },
  { icon: PlugZap, title: "Inverter Systems", text: "Hybrid and off-grid inverters that manage solar, battery, grid and generator together." },
  { icon: ClipboardCheck, title: "Energy Audits", text: "A measured look at how you use power, where it is wasted and what a system should be." },
  { icon: Gauge, title: "Maintenance & Monitoring", text: "Scheduled servicing, panel cleaning and performance monitoring after installation." },
  { icon: Leaf, title: "Green Consulting", text: "Advice for organizations planning to cut fuel use and adopt cleaner energy." },
];

const benefits = [
  { title: "Lower electricity spending", text: "Every kilowatt-hour your panels produce is one you don't buy from the grid or generate with fuel. Savings depend on your consumption, tariff and system size, and we'll estimate them for your site." },
  { title: "Less dependence on generators", text: "A properly sized solar and battery system can reduce generator running hours, fuel purchases, noise and fumes." },
  { title: "Improved property value", text: "Reliable power is an attractive feature for buyers and tenants in residential and commercial property." },
  { title: "Environmental sustainability", text: "Solar generation produces no emissions in operation, helping your home or organization reduce its carbon footprint." },
];

const flow = [
  { label: "Solar panels", note: "Capture sunlight" },
  { label: "Inverter", note: "Converts & manages power" },
  { label: "Battery", note: "Stores surplus energy" },
  { label: "Your property", note: "Powers appliances" },
];

export default function RenewableEnergyPage() {
  return (
    <>
      <PageHero
        crumb="Renewable Energy"
        eyebrow="Solar & renewable energy"
        title={<>Power Your World <span className="text-brand">with Solar</span></>}
        intro="Clean, dependable electricity for homes, businesses and institutions, designed around your load, your budget and Nigeria's sunshine."
        image={img.solarTrackers}
        imageAlt="Solar panels on tracking frames catching late-afternoon sunlight"
      >
        <Link href="/contact?service=renewable-energy#quote" className="btn btn-red">Get a Free Solar Quote <ArrowRight className="size-4" /></Link>
        <a href="#estimator" className="btn btn-outline-light">Estimate your system</a>
      </PageHero>

      {/* Intro */}
      <section className="py-20 sm:py-28 lg:py-32" aria-labelledby="re-intro-title">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow text-muted reveal">Why solar, why now</p>
            <h2 id="re-intro-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">Reliable power shouldn&apos;t depend on the grid or a generator</h2>
            <div className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-muted">
              <p className="reveal">For many Nigerian homes and businesses, unreliable grid supply means long generator hours, rising fuel costs and constant disruption. Solar power, paired with the right inverter and battery storage, offers a quieter, cleaner and more predictable alternative.</p>
              <p className="reveal">We start with an energy audit, size the system to what you actually need, and install quality equipment with clear documentation and aftercare.</p>
            </div>
          </div>
          <div className="reveal relative lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-ink-3 lg:aspect-[5/4]">
              <Photo src={img.installationTeam} alt="Two technicians beside a completed installation of three wall-mounted inverters and battery units" fill sizes="(min-width:1024px) 48vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>

        {/* System flow diagram */}
        <div className="container-x mt-20">
          <h3 className="font-display text-sm uppercase tracking-[0.2em] text-muted">How a solar system works</h3>
          <ol className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((f, i) => (
              <li key={f.label} className="reveal relative bg-white p-6">
                <span className="font-display text-sm tabular-nums text-brand">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-6 font-display text-xl font-medium">{f.label}</p>
                <p className="mt-1 text-sm text-muted">{f.note}</p>
                {i < flow.length - 1 && <ArrowRight className="absolute right-5 top-6 hidden size-5 text-brand lg:block" aria-hidden />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-mist py-20 sm:py-28" aria-labelledby="solutions-title">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12">
            <p className="eyebrow text-muted reveal lg:col-span-4">Energy solutions</p>
            <h2 id="solutions-title" className="reveal text-4xl font-semibold leading-[1.05] sm:text-5xl lg:col-span-8">From first audit to long-term monitoring</h2>
          </div>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className={`reveal reveal-delay-${(i % 3) + 1} group border-t-2 border-ink bg-white p-8 transition-colors duration-[1200ms] hover:border-brand`}>
                <Icon className="size-8 text-brand" aria-hidden />
                <h3 className="mt-8 text-xl font-medium">{title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="noise-dark py-20 text-white sm:py-28 lg:py-32" aria-labelledby="benefits-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-white/70 reveal">Benefits of solar</p>
            <h2 id="benefits-title" className="reveal mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl">What switching can mean for you</h2>
            <p className="reveal mt-6 text-sm leading-relaxed text-white/55">
              Savings, payback period and warranty terms vary with equipment, site conditions, consumption and tariffs. We provide project-specific figures and manufacturer warranty details in every quotation.
            </p>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {benefits.map((b, i) => (
              <li key={b.title} className={`reveal reveal-delay-${(i % 3) + 1} grid grid-cols-[3rem_1fr] gap-4 border-t border-white/10 py-8 last:border-b`}>
                <span className="font-display text-sm tabular-nums text-brand">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl font-medium">{b.title}</h3>
                  <p className="mt-2 text-white/65">{b.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Estimator */}
      <section id="estimator" className="py-20 sm:py-28" aria-labelledby="estimator-title">
        <div className="container-x">
          <div className="mb-12 grid gap-6 lg:grid-cols-12">
            <p className="eyebrow text-muted reveal lg:col-span-4">Solar sizing guide</p>
            <div className="lg:col-span-8">
              <h2 id="estimator-title" className="reveal text-4xl font-semibold leading-[1.05] sm:text-5xl">Estimate the system you might need</h2>
              <p className="reveal mt-5 max-w-2xl text-muted">Adjust the appliances you want to power. We&apos;ll carry your figures into the quote request so our engineers can start from your numbers.</p>
            </div>
          </div>
          <SolarEstimator />
        </div>
      </section>

      <CtaBand
        title="Switch to Solar Today"
        text="Book an energy audit or request a free, no-obligation solar quotation for your home or business."
        primary={{ href: "/contact?service=renewable-energy#quote", label: "Get a Free Solar Quote" }}
        whatsappMessage="Hello Blanca Investment, I'd like a quote for a solar installation."
      />
    </>
  );
}
