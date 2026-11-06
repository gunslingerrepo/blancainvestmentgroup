import Image from "next/image";
import { Handshake } from "lucide-react";
import { partners } from "@/content/site";

export default function Partners({ tone = "white" }: { tone?: "white" | "mist" }) {
  return (
    <section className={`${tone === "mist" ? "bg-mist" : "bg-white"} border-t border-line py-16 sm:py-20`} aria-labelledby="partners-title">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-muted reveal">Our partners</p>
          <h2 id="partners-title" className="reveal mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">Working alongside trusted partners</h2>
          <p className="reveal mt-4 max-w-md text-[0.98rem] leading-relaxed text-muted">We collaborate with established companies to deliver homes and infrastructure to a consistent standard.</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {partners.map((p) => (
            <li key={p.name} className="reveal flex flex-col border border-line bg-white">
              <div className="flex flex-1 items-center justify-center px-8 py-10">
                <Image src={p.logo} alt={`${p.name} logo`} width={p.width} height={p.height} className="h-auto w-full max-w-[260px]" />
              </div>
              <p className="flex items-center gap-2 border-t border-line px-5 py-3 font-display text-sm font-medium"><Handshake className="size-4 text-brand" aria-hidden />{p.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
