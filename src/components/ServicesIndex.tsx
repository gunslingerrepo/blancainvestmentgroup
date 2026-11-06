"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ServicePhoto from "./ServicePhoto";
import { services } from "@/content/site";

/** Editorial numbered service list with an image panel that follows hover/focus. */
export default function ServicesIndex() {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <ol className="border-t border-line lg:col-span-7">
        {services.map((s, i) => (
          <li key={s.slug} className="border-b border-line">
            <Link
              href={s.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-4 py-7 sm:grid-cols-[3.5rem_1fr_auto] sm:py-8"
            >
              <span className={`pt-1.5 font-display text-sm tabular-nums transition-colors duration-[1200ms] ${active === i ? "text-brand" : "text-muted-light"}`}>{s.index}</span>
              <span>
                <span className={`block font-display text-2xl font-medium leading-tight transition-colors duration-[1200ms] sm:text-[2rem] ${active === i ? "text-ink" : "text-ink/55"} group-hover:text-brand`}>
                  {s.title}
                </span>
                <span className="mt-2 block max-w-lg text-[0.95rem] leading-relaxed text-muted">{s.summary}</span>
                {/* Mobile image */}
                <span className="relative mt-5 block aspect-[16/10] overflow-hidden bg-ink-3 lg:hidden">
                  <ServicePhoto service={s} sizes="(max-width: 1024px) 90vw, 1px" />
                </span>
              </span>
              <span className={`mt-1 grid size-11 place-items-center border transition-colors duration-[1200ms] ${active === i ? "border-brand bg-brand text-white" : "border-line text-ink"}`}>
                <ArrowUpRight className="size-5" aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-32 aspect-[4/5] overflow-hidden bg-ink-3">
          {services.map((s, i) => (
            <div key={s.slug} className={`absolute inset-0 transition-opacity duration-[1200ms] ${active === i ? "opacity-100" : "opacity-0"}`} aria-hidden={active !== i}>
              <ServicePhoto service={s} sizes="(min-width: 1024px) 40vw, 1px" className={`object-cover transition-transform duration-[1200ms] ${active === i ? "scale-100" : "scale-105"}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-white">
                <div>
                  <p className="font-display text-xs uppercase tracking-[0.2em] text-white/70">{s.index} / 05</p>
                  <p className="mt-2 font-display text-xl">{s.short}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
