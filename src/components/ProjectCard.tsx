import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import Photo from "./Photo";
import { projectStatusLabel, type Project } from "@/content/site";

export function StatusTags({ project }: { project: Project }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      <span className={`tag ${project.status === "ongoing" ? "bg-brand text-white" : "bg-white text-ink"}`}>
        <span className={`size-1.5 rounded-full ${project.status === "ongoing" ? "bg-white" : "bg-brand"}`} aria-hidden />
        {projectStatusLabel[project.status]}
      </span>
      {project.badge && <span className="tag bg-ink text-white">{project.badge}</span>}
    </span>
  );
}

export default function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const cover = project.gallery[0];
  return (
    <article className="zoom-parent group flex h-full flex-col bg-white">
      <Link href={`/projects#${project.slug}`} className="flex h-full flex-col" aria-label={`${project.name}: view project details`}>
        <div className="relative aspect-[16/11] overflow-hidden bg-ink-3">
          <Photo src={cover.src} alt={cover.alt} fill priority={priority} sizes="(min-width:1024px) 45vw, 100vw" className="zoom-img object-cover" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/40 to-transparent" />
          <div className="absolute left-4 top-4"><StatusTags project={project} /></div>
        </div>
        <div className="flex flex-1 flex-col border border-t-0 border-line p-6 sm:p-8">
          <p className="eyebrow text-muted">{project.type}</p>
          <div className="mt-4 flex items-start justify-between gap-6">
            <h3 className="text-2xl font-medium leading-tight transition-colors duration-[1200ms] group-hover:text-brand sm:text-[1.7rem]">{project.name}</h3>
            <span className="grid size-11 shrink-0 place-items-center border border-line transition-colors duration-[1200ms] group-hover:border-brand group-hover:bg-brand group-hover:text-white">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted"><MapPin className="size-3.5 text-brand" aria-hidden />{project.location}</p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>
        </div>
      </Link>
    </article>
  );
}
