import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: "en_NG",
      type: "website",
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: ["/twitter-image.jpg"] },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand/logo.png`,
    image: `${site.url}/opengraph-image.jpg`,
    description: site.description,
    email: site.email,
    telephone: site.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: `${site.address.district}, ${site.address.city}`,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    areaServed: { "@type": "Country", name: "Nigeria" },
    knowsAbout: ["Renewable energy", "Solar power", "Real estate", "Property management", "Building construction", "Office supplies", "Procurement", "CCTV", "Networking"],
  };
}
