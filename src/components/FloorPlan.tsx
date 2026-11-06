"use client";

import { useEffect, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";
import Photo from "./Photo";
import type { ProjectImage } from "@/content/site";

export default function FloorPlan({ plan }: { plan: ProjectImage }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <figure>
      <button type="button" onClick={() => setOpen(true)} className="group relative block aspect-[1756/833] w-full overflow-hidden border border-line bg-white" aria-label={`Enlarge floor plan: ${plan.caption}`}>
        <Photo src={plan.src} alt={plan.alt} fill sizes="(min-width:1024px) 80vw, 100vw" className="object-contain p-2" />
        <span className="absolute right-3 top-3 inline-flex items-center gap-2 bg-ink px-3 py-2 font-display text-xs text-white transition-colors duration-500 group-hover:bg-brand"><Maximize2 className="size-3.5" aria-hidden />Enlarge</span>
      </button>
      <figcaption className="mt-3 text-sm text-muted">{plan.caption}</figcaption>
      {open && (
        <div role="dialog" aria-modal="true" aria-label={plan.caption} className="fixed inset-0 z-[80] flex flex-col bg-white" >
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-8">
            <p className="font-display text-sm font-medium">{plan.caption}</p>
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} className="grid size-11 place-items-center border border-line hover:border-brand hover:bg-brand hover:text-white" aria-label="Close floor plan"><X className="size-5" /></button>
          </div>
          <div className="flex-1 overflow-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={plan.src} alt={plan.alt} className="mx-auto block h-auto min-w-[1100px] max-w-none p-4 lg:min-w-0 lg:max-w-full" />
          </div>
        </div>
      )}
    </figure>
  );
}
