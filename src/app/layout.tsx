import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealObserver from "@/components/RevealObserver";
import { ToastProvider } from "@/components/Toast";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Renewable Energy, Real Estate & Construction in Nigeria`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Blanca Investment Limited",
    "solar installation Abuja",
    "renewable energy Nigeria",
    "property management Abuja",
    "real estate Nigeria",
    "building construction Abuja",
    "office supplies procurement Nigeria",
    "CCTV installation Abuja",
    "networking ICT Abuja",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: site.name,
    url: site.url,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.tagline}`, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#151515",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top">
        <ToastProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <RevealObserver />
        </ToastProvider>
      </body>
    </html>
  );
}
