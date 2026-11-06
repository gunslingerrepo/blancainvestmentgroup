"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { projects, projectStatusLabel, type ProjectStatus } from "@/content/site";

type Filter = "all" | ProjectStatus;

export default function ProjectsBrowser() {
  const statuses = (Object.keys(projectStatusLabel) as ProjectStatus[]).filter((s) => projects.some((p) => p.status === s));
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("status") as Filter | null;
    if (s && statuses.includes(s as ProjectStatus)) setFilter(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (f: Filter) => {
    setFilter(f);
    try {
      const url = new URL(window.location.href);
      if (f === "all") url.searchParams.delete("status");
      else url.searchParams.set("status", f);
      window.history.replaceState(null, "", url.toString());
    } catch {
      /* ignore */
    }
  };

  const list = filter === "all" ? projects : projects.filter((p) => p.status === filter);
  const options: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: "All projects", count: projects.length },
    ...statuses.map((s) => ({ value: s as Filter, label: projectStatusLabel[s], count: projects.filter((p) => p.status === s).length })),
  ];

  return (
    <div>
      <div role="group" aria-label="Filter projects by status" className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            aria-pressed={filter === o.value}
            onClick={() => choose(o.value)}
            className={`inline-flex items-center gap-3 border px-5 py-3 font-display text-sm font-medium transition-colors duration-500 ${filter === o.value ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`}
          >
            {o.label}
            <span className={`grid min-w-6 place-items-center px-1.5 text-xs tabular-nums ${filter === o.value ? "bg-brand text-white" : "bg-mist text-muted"}`}>{o.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{list.length} project{list.length === 1 ? "" : "s"} shown</p>
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
        {list.map((p, i) => (
          <li key={p.slug}><ProjectCard project={p} priority={i === 0} /></li>
        ))}
      </ul>
    </div>
  );
}
