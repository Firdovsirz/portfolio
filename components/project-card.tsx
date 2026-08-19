import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/projects";

/**
 * Every card ends in a fixed-height "plate" — the colophon slot of a printed
 * catalogue entry. On a project with a screenshot the plate holds a crop of the
 * real interface; on the rest it holds the stack. Because the slot is the same
 * height either way, an image contributes exactly zero extra height, so a card
 * with one never stretches its grid row past the card beside it.
 *
 * The crop is a pre-cut asset (see `thumbnail` in lib/projects.ts), not a CSS
 * crop of the full screenshot: the layout is fixed, only the crop coordinates
 * are content, so they belong in the data.
 */
export function ProjectCard({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const plate = project.thumbnail;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex flex-col border hairline rounded-sm overflow-hidden hover:border-[var(--border-strong)] transition-colors ${className}`}
    >
      <div className="flex flex-col flex-1 p-8">
        <p className="mono text-xs text-muted-2 uppercase tracking-widest mb-2">
          {project.client}
        </p>
        <h3 className="serif text-2xl md:text-3xl tracking-tight group-hover:text-accent transition-colors mb-6">
          {project.name}
        </h3>

        <p className="text-muted leading-relaxed mb-6 flex-1">{project.summary}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs mono text-muted-2">
          <span className="uppercase tracking-widest text-[10px]">{project.status}</span>
          <span>·</span>
          <span>{project.role}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>
      </div>

      <div className="relative h-24 shrink-0 border-t hairline bg-[var(--surface-2)] overflow-hidden">
        {plate ? (
          <Image
            src={plate.src}
            alt={plate.alt}
            fill
            sizes="(min-width: 1024px) 526px, (min-width: 768px) 50vw, 100vw"
            placeholder="blur"
            className="project-plate object-cover object-left"
          />
        ) : (
          <p className="absolute inset-0 flex items-center px-8 mono text-[10px] uppercase tracking-widest text-muted-2 leading-relaxed">
            {project.stack.join("  ·  ")}
          </p>
        )}
      </div>
    </Link>
  );
}
