import Link from "next/link";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { TrustedBy } from "@/components/trusted-by";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function HomePage() {
  const featured = projects.filter((p) => p.status === "Production").slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 lg:px-10 pt-24 md:pt-36 pb-24 md:pb-32">
        <p className="mono text-xs text-accent tracking-widest uppercase mb-6">
          Software Engineer · Research Software Engineer
        </p>
        <h1 className="serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-5xl">
          Building production systems for institutions —{" "}
          <span className="text-muted">and the research infrastructure behind them.</span>
        </h1>

        <div className="mt-12 grid md:grid-cols-2 gap-10 md:gap-16 max-w-4xl">
          <p className="text-muted text-lg leading-relaxed">
            I&apos;m Firdovsi Rzaev — Software Developer at Azerbaijan Technical University and
            Software Developer Team Lead at Dithari, where I lead the team building the Buyology
            e-commerce platform. I architect institutional systems used daily across faculties,
            departments, and commerce surfaces.
          </p>
          <p className="text-muted text-lg leading-relaxed">
            My work spans distributed systems, education technology, and research infrastructure —
            the kind of platforms institutions quietly rely on every day.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="border hairline px-5 py-2.5 text-sm hover:border-[var(--border-strong)] hover:text-accent transition-colors"
          >
            View projects →
          </Link>
          <Link
            href="/research"
            className="border hairline px-5 py-2.5 text-sm hover:border-[var(--border-strong)] transition-colors"
          >
            Research interests
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      <TrustedBy />

      {/* Current */}
      <Section eyebrow="Current" title="Where I'm working right now.">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              org: "Dithari",
              role: "Software Developer Team Lead",
              detail:
                "Leading the team building the Buyology e-commerce platform — web storefront, mobile app, and operations dashboard.",
            },
            {
              org: "Azerbaijan Technical University",
              role: "Software Developer",
              detail:
                "Designing and shipping institutional platforms: Plan-Report, E-Grant, Researchers Portal, Majors Portal, the AzTU website.",
            },
          ].map((r) => (
            <div key={r.org} className="border hairline p-8 rounded-sm">
              <p className="mono text-xs text-muted-2 uppercase tracking-widest mb-3">
                {r.role}
              </p>
              <h3 className="serif text-2xl tracking-tight mb-3">{r.org}</h3>
              <p className="text-muted leading-relaxed">{r.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Selected work */}
      <Section eyebrow="Selected work" title="Production institutional systems.">
        <div className="grid md:grid-cols-2 gap-5">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-10">
          <Link href="/projects" className="mono text-sm text-muted hover:text-foreground link-underline">
            All projects →
          </Link>
        </div>
      </Section>

      {/* Stack */}
      <Section eyebrow="Stack" title="What I build with.">
        <div className="grid md:grid-cols-3 gap-10 border-t hairline pt-10">
          {[
            { label: "Frontend", items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"] },
            { label: "Backend", items: ["Spring Boot", "FastAPI", "Django", "REST", "WebSocket"] },
            {
              label: "Platform",
              items: ["PostgreSQL", "MySQL", "Docker", "Nginx", "Linux", "GitHub Actions"],
            },
          ].map((g) => (
            <div key={g.label}>
              <p className="mono text-xs text-muted-2 uppercase tracking-widest mb-5">
                {g.label}
              </p>
              <ul className="space-y-2 text-foreground">
                {g.items.map((i) => (
                  <li key={i} className="serif text-xl">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section eyebrow="Next" title="Open to engineering work and research collaborations.">
        <p className="text-muted text-lg max-w-2xl leading-relaxed mb-8">
          If you&apos;re working on distributed systems, research software, education technology,
          or data infrastructure — I&apos;d like to hear from you.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href={site.social.email}
            className="border hairline px-5 py-2.5 text-sm hover:border-[var(--border-strong)] hover:text-accent transition-colors"
          >
            {site.email}
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border hairline px-5 py-2.5 text-sm hover:border-[var(--border-strong)] transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href={site.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border hairline px-5 py-2.5 text-sm hover:border-[var(--border-strong)] transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </Section>
    </>
  );
}
