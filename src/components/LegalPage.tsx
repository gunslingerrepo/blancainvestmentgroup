import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-x py-16 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-[0.8rem] text-white/60">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden><ChevronRight className="size-3.5" /></li>
              <li aria-current="page" className="text-white">{title}</li>
            </ol>
          </nav>
          <h1 className="text-5xl font-semibold sm:text-6xl">{title}</h1>
          <p className="mt-4 text-sm text-white/60">Last updated: {updated}</p>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl space-y-5 text-[1rem] leading-relaxed text-ink/80 [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_h2]:pt-6 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
