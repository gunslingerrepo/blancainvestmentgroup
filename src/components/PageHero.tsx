import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Photo from "./Photo";

export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  crumb,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  image: string;
  imageAlt: string;
  crumb: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 -z-10">
        <Photo src={image} alt={imageAlt} fill priority sizes="100vw" className="hero-zoom object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/25" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/70 to-transparent" />
      </div>
      <div className="container-x pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
        <nav aria-label="Breadcrumb" className="mb-10 text-[0.8rem] text-white/60">
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li aria-current="page" className="text-white">{crumb}</li>
          </ol>
        </nav>
        <p className="eyebrow text-white/80">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl lg:text-[4.6rem]">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{intro}</p>}
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
