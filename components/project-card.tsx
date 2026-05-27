import Link from "next/link";
import { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block border hairline rounded-sm p-8 hover:border-[var(--border-strong)] transition-colors"
    >
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <p className="mono text-xs text-muted-2 uppercase tracking-widest mb-2">
            {project.client}
          </p>
          <h3 className="serif text-2xl md:text-3xl tracking-tight group-hover:text-accent transition-colors">
            {project.name}
          </h3>
        </div>
        <span className="mono text-[10px] uppercase tracking-widest text-muted-2 shrink-0 mt-2">
          {project.status}
        </span>
      </div>

      <p className="text-muted leading-relaxed mb-6">{project.summary}</p>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs mono text-muted-2">
        <span>{project.role}</span>
        <span>·</span>
        <span>{project.year}</span>
        <span>·</span>
        <span className="text-muted">{project.stack.slice(0, 4).join(" / ")}</span>
      </div>
    </Link>
  );
}
