"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import QuoteForm from "./QuoteForm";
import ComplaintForm from "./ComplaintForm";

const tabs = [
  { id: "quote", label: "Request a Quote" },
  { id: "complaint", label: "Submit a Complaint" },
] as const;
type Tab = (typeof tabs)[number]["id"];

export default function ContactTabs() {
  const [tab, setTab] = useState<Tab>("quote");
  const refs = useRef<Record<Tab, HTMLButtonElement | null>>({ quote: null, complaint: null });

  // Sync with #quote / #complaint so footer and CTA links open the right form
  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace("#", "");
      if (h === "complaint" || h === "quote") setTab(h);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const choose = (t: Tab) => {
    setTab(t);
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${t}`);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next: Tab = tab === "quote" ? "complaint" : "quote";
    choose(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <span id="quote" className="block" aria-hidden />
      <span id="complaint" className="block" aria-hidden />
      <div role="tablist" aria-label="Contact forms" className="grid grid-cols-2 border-b border-line" onKeyDown={onKey}>
        {tabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              ref={(el) => { refs.current[t.id] = el; }}
              role="tab"
              type="button"
              id={`tab-${t.id}`}
              aria-selected={on}
              aria-controls={`panel-${t.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => choose(t.id)}
              className={`relative px-2 pb-4 pt-1 text-left font-display text-lg font-medium transition-colors duration-[1200ms] sm:text-2xl ${on ? "text-ink" : "text-ink/40 hover:text-ink/70"}`}
            >
              {t.label}
              <span className={`absolute inset-x-0 -bottom-px h-[3px] origin-left bg-brand transition-transform duration-700 ${on ? "scale-x-100" : "scale-x-0"}`} aria-hidden />
            </button>
          );
        })}
      </div>
      <div className="pt-10">
        <div role="tabpanel" id="panel-quote" aria-labelledby="tab-quote" hidden={tab !== "quote"}>
          <Suspense fallback={null}><QuoteForm /></Suspense>
        </div>
        <div role="tabpanel" id="panel-complaint" aria-labelledby="tab-complaint" hidden={tab !== "complaint"}>
          <ComplaintForm />
        </div>
      </div>
    </div>
  );
}
