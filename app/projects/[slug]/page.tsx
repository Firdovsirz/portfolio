import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/section";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <header className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 md:pt-28 pb-12">
        <Link href="/projects" className="mono text-xs text-muted hover:text-foreground link-underline">
          ← All projects
        </Link>
        <p className="mono text-xs text-accent tracking-widest uppercase mt-8 mb-5">
          {project.client} · {project.status}
        </p>
        <h1 className="serif text-4xl md:text-6xl tracking-tight max-w-4xl">
          {project.name}
        </h1>
        <p className="text-muted text-lg md:text-xl mt-6 max-w-3xl leading-relaxed">
          {project.summary}
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 mono text-xs text-muted-2 uppercase tracking-widest">
          <span>Role · <span className="text-muted">{project.role}</span></span>
          <span>Year · <span className="text-muted">{project.year}</span></span>
        </div>
      </header>

      <Section eyebrow="Overview">
        <div className="space-y-4 text-lg leading-relaxed text-muted max-w-3xl">
          {project.description.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
      </Section>

      {/* Architecture placeholder */}
      <Section eyebrow="Architecture">
        <div className="border hairline aspect-[16/9] flex items-center justify-center bg-[var(--surface)] rounded-sm">
          <p className="mono text-xs text-muted-2 uppercase tracking-widest">
            Architecture diagram — placeholder
          </p>
        </div>
        <p className="text-muted leading-relaxed mt-6 max-w-3xl">{project.systemDesign}</p>
      </Section>

      <Section eyebrow="Features">
        <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3 max-w-3xl">
          {project.features.map((f) => (
            <li key={f} className="flex gap-3 text-foreground">
              <span className="text-accent mono text-xs mt-2">▸</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Engineering challenges">
        <ul className="space-y-5 max-w-3xl">
          {project.challenges.map((c) => (
            <li key={c} className="border-l hairline pl-5 text-muted leading-relaxed">
              {c}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Stack">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="mono text-xs border hairline px-3 py-1.5 text-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </Section>

      <Section eyebrow="Screenshots">
        <div className="grid md:grid-cols-2 gap-5">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="border hairline aspect-[4/3] flex items-center justify-center bg-[var(--surface)] rounded-sm"
            >
              <p className="mono text-xs text-muted-2 uppercase tracking-widest">
                Screenshot {i} — placeholder
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
