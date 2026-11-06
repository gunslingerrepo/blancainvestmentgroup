"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Photo from "./Photo";
import type { ProjectImage } from "@/content/site";

/** Main image, thumbnails and a full-screen viewer. */
export default function ProjectGallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const count = images.length;
  const go = useCallback((d: number) => setActive((a) => (a + d + count) % count), [count]);

  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open, go]);

  const img = images[active];
  return (
    <div>
      <button ref={openerRef} type="button" onClick={() => setOpen(true)} className="group relative block aspect-[16/10] w-full overflow-hidden bg-ink-3 text-left" aria-label={`Open full-screen view: ${img.caption}`}>
        <Photo src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]" />
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/80 to-transparent p-5 pt-16 text-white">
          <span>
            <span className="block font-display text-xs tabular-nums text-white/70">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
            <span className="mt-1 block font-display text-base font-medium">{img.caption}</span>
          </span>
          <span className="grid size-10 shrink-0 place-items-center bg-white text-ink transition-colors duration-500 group-hover:bg-brand group-hover:text-white"><Maximize2 className="size-4" aria-hidden /></span>
        </span>
      </button>

      {count > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2 sm:gap-3" aria-label={`${title} images`}>
          {images.map((im, i) => (
            <li key={im.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}: ${im.caption}`}
                aria-current={i === active}
                className={`relative block aspect-[4/3] w-full overflow-hidden bg-ink-3 outline-offset-2 transition-opacity duration-500 ${i === active ? "ring-2 ring-brand" : "opacity-60 hover:opacity-100"}`}
              >
                <Photo src={im.src} alt="" fill sizes="12vw" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <div role="dialog" aria-modal="true" aria-label={`${title}: ${img.caption}`} className="fixed inset-0 z-[80] flex flex-col bg-ink/95 text-white" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
            <p className="font-display text-sm"><span className="tabular-nums text-white/60">{active + 1} / {count}</span><span className="ml-4">{img.caption}</span></p>
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="grid size-11 place-items-center border border-white/30 hover:border-brand hover:bg-brand" aria-label="Close full-screen view"><X className="size-5" /></button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
            <Photo src={img.src} alt={img.alt} fill sizes="100vw" className="object-contain p-2 sm:p-8" />
            {count > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-white/10 hover:bg-brand sm:left-6" aria-label="Previous image"><ChevronLeft className="size-6" /></button>
                <button type="button" onClick={() => go(1)} className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-white/10 hover:bg-brand sm:right-6" aria-label="Next image"><ChevronRight className="size-6" /></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
