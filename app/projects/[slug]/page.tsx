import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/section";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { projects } from "@/lib/projects";
import { canonical, site } from "@/lib/site";
import { breadcrumbLd, faqLd, graph, projectLd } from "@/lib/schema";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const path = `/projects/${project.slug}`;
  const image = project.ogImage ?? "/logo.png";

  return {
    title: project.name,
    description: project.metaDescription ?? project.summary,
    keywords: [project.name, project.client, ...project.stack],
    alternates: canonical(path),
    openGraph: {
      type: "article",
      url: path,
      title: `${project.name} — ${project.client}`,
      description: project.summary,
      images: [{ url: image, alt: project.hero?.alt ?? project.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${project.client}`,
      description: project.summary,
      images: [image],
    },
  };
}

export default async function ProjectPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const path = `/projects/${project.slug}`;
  const structuredData = graph(
    projectLd(project),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: project.name, path },
    ]),
    ...(project.faq?.length ? [faqLd(project.faq, path)] : []),
  );

  return (
    <>
      <JsonLd data={structuredData} />

      <header className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 md:pt-28 pb-12">
        <nav aria-label="Breadcrumb">
          <Link href="/projects" className="mono text-xs text-muted hover:text-foreground link-underline">
            ← All projects
          </Link>
        </nav>
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
        {project.liveUrl && (
          <div className="mt-8">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border hairline px-5 py-2.5 text-sm hover:border-[var(--border-strong)] hover:text-accent transition-colors"
            >
              Visit {project.liveUrl.replace(/^https?:\/\//, "")} ↗
            </a>
          </div>
        )}
      </header>

      {project.hero && (
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <figure className="border hairline rounded-sm overflow-hidden bg-[var(--surface-2)]">
            <Image
              src={project.hero.src}
              alt={project.hero.alt}
              sizes="(min-width: 1024px) 1120px, 100vw"
              placeholder="blur"
              className="w-full h-auto"
            />
          </figure>
          <figcaption className="mono text-xs text-muted-2 uppercase tracking-widest mt-3">
            {project.hero.caption}
          </figcaption>
        </div>
      )}

      {project.metrics && project.metrics.length > 0 && (
        <div className="mx-auto max-w-6xl px-6 lg:px-10 mt-16 md:mt-20">
          <ul className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8">
            {project.metrics.map((metric) => (
              <li key={metric.label} className="border-t hairline pt-4">
                <p className="serif text-4xl md:text-5xl tracking-tight">{metric.value}</p>
                <p className="mono text-[10px] uppercase tracking-widest text-muted-2 mt-2">
                  {metric.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Section eyebrow="Overview">
        <div className="space-y-4 text-lg leading-relaxed text-muted max-w-3xl">
          {project.description.map((d, i) => (
            <p key={i}>{d}</p>
          ))}
        </div>
      </Section>

      {project.facts && project.facts.length > 0 && (
        <Section eyebrow="At a glance">
          <dl className="grid md:grid-cols-2 gap-x-10 gap-y-6 max-w-4xl">
            {project.facts.map((fact) => (
              <div key={fact.label} className="border-t hairline pt-4">
                <dt className="mono text-xs text-muted-2 uppercase tracking-widest mb-2">
                  {fact.label}
                </dt>
                <dd className="text-foreground leading-relaxed">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {project.surfaces && project.surfaces.length > 0 && (
        <Section eyebrow="Surfaces" title="One API, every screen it reaches.">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.surfaces.map((surface) => (
              <article key={surface.name} className="border hairline rounded-sm p-7">
                <p className="mono text-[10px] text-muted-2 uppercase tracking-widest mb-3">
                  {surface.platform}
                </p>
                <h3 className="serif text-2xl tracking-tight mb-3">{surface.name}</h3>
                <p className="text-muted leading-relaxed text-sm">{surface.detail}</p>
              </article>
            ))}
          </div>
        </Section>
      )}

      <Section eyebrow="Architecture" title={project.architecture ? "How it fits together." : undefined}>
        {project.architecture && project.architecture.length > 0 && (
          <div className="border hairline rounded-sm overflow-hidden mb-10">
            {project.architecture.map((tier, i) => (
              <div
                key={tier.label}
                className={`grid md:grid-cols-12 gap-y-4 md:gap-x-8 p-6 md:p-8 ${
                  i > 0 ? "border-t hairline" : ""
                }`}
              >
                <div className="md:col-span-3">
                  <p className="mono text-xs text-accent uppercase tracking-widest">{tier.label}</p>
                  {tier.note && (
                    <p className="text-muted-2 text-sm mt-2 leading-relaxed">{tier.note}</p>
                  )}
                </div>
                <div className="md:col-span-9 flex flex-wrap gap-2 content-start">
                  {tier.nodes.map((node) => (
                    <span
                      key={node}
                      className="mono text-xs border hairline px-3 py-1.5 text-muted bg-[var(--surface-2)] rounded-sm"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <p className="text-muted text-lg leading-relaxed max-w-3xl">{project.systemDesign}</p>
      </Section>

      {Boolean(project.featureGroups?.length || project.features?.length) && (
      <Section eyebrow="Features">
        {project.featureGroups && project.featureGroups.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            {project.featureGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mono text-xs text-accent uppercase tracking-widest mb-5 pb-3 border-b hairline">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-muted leading-relaxed">
                      <span className="text-accent mono text-xs mt-1.5">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3 max-w-3xl">
            {(project.features ?? []).map((f) => (
              <li key={f} className="flex gap-3 text-foreground">
                <span className="text-accent mono text-xs mt-2">▸</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>
      )}

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

      {project.gallery && project.gallery.length > 0 && (
        <Section eyebrow="Screenshots">
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-10">
            {project.gallery.map((shot) => (
              <figure key={shot.caption}>
                <div className="border hairline rounded-sm overflow-hidden bg-[var(--surface-2)]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    placeholder="blur"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="mono text-xs text-muted-2 uppercase tracking-widest mt-3">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      {project.faq && project.faq.length > 0 && (
        <Faq
          entries={project.faq}
          eyebrow="Questions"
          title={`About the ${project.name}.`}
          id="project-faq"
        />
      )}

      <Section eyebrow="Next">
        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="border hairline px-5 py-2.5 text-sm hover:border-[var(--border-strong)] hover:text-accent transition-colors"
          >
            ← All projects
          </Link>
          <Link
            href="/contact"
            className="border hairline px-5 py-2.5 text-sm hover:border-[var(--border-strong)] transition-colors"
          >
            Ask about this work
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-sm text-muted hover:text-foreground transition-colors"
            >
              Open the live system ↗
            </a>
          )}
        </div>
        <p className="sr-only">
          {project.name} was built by {site.name} for {project.client}.
        </p>
      </Section>
    </>
  );
}
