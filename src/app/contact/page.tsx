import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactTabs from "@/components/forms/ContactTabs";
import { WhatsAppIcon } from "@/components/icons";
import { img, site, whatsappLink } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us | Request a Quote",
  description:
    "Contact Blanca Investment Limited at 21 SS Lassa Crescent, Jahi, Abuja. Call 0911 444 2122, email info@blancainvestmentltd.co, chat on WhatsApp, request a quote or submit a complaint online.",
  path: "/contact",
});

const mapQuery = encodeURIComponent(`${site.address.full}, Nigeria`);

export default function ContactPage() {
  const items = [
    { icon: Phone, label: "Telephone", value: site.phone.display, href: site.phone.href },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Office address", value: site.address.full, href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`, external: true },
    { icon: Clock, label: "Opening hours", value: site.hours.display },
  ];
  return (
    <>
      <PageHero
        crumb="Contact Us"
        eyebrow="Get in touch"
        title={<>Let&apos;s talk about your <span className="text-brand">project</span></>}
        intro="Request a quotation, ask a question or tell us about a problem. Choose the form that fits, or reach us directly by phone, email or WhatsApp."
        image={img.meetingRoom}
        imageAlt="Office meeting room"
      />

      <section className="py-16 sm:py-20 lg:py-24" aria-label="Contact forms and details">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactTabs />
          </div>

          <aside className="lg:col-span-5" aria-labelledby="contact-details-title">
            <div className="noise-dark p-8 text-white sm:p-10 lg:sticky lg:top-32">
              <p className="eyebrow text-white/70">Contact information</p>
              <h2 id="contact-details-title" className="mt-5 text-3xl font-semibold">Blanca Investment Limited</h2>
              <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {items.map(({ icon: Icon, label, value, href, external }) => (
                  <div key={label} className="flex gap-4 py-5">
                    <span className="grid size-10 shrink-0 place-items-center bg-brand"><Icon className="size-4" aria-hidden /></span>
                    <div className="min-w-0">
                      <dt className="text-xs uppercase tracking-[0.16em] text-white/50">{label}</dt>
                      <dd className="mt-1 break-words font-display text-lg">
                        {href ? (
                          <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="link-underline hover:text-white">{value}</a>
                        ) : value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn mt-8 w-full bg-[#25D366] text-white hover:bg-white hover:text-ink">
                <WhatsAppIcon className="size-5" /> Chat on WhatsApp · {site.whatsapp.display}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section aria-label="Office location map" className="border-t border-line">
        <div className="relative h-[380px] bg-mist sm:h-[460px]">
          <iframe
            title={`Map showing ${site.address.full}`}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="absolute inset-0 h-full w-full grayscale-[60%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
