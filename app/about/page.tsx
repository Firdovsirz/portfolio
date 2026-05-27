import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Firdovsi Rzaev is a software engineer and team lead building production institutional systems, with research interests in distributed systems, education technology, and research infrastructure.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="I build the systems institutions actually run on."
        intro="Not demos. Not prototypes. The day-to-day systems used by faculty, students, reviewers, and operators — and the engineering team behind them."
      />

      <Section>
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8 space-y-6 text-lg leading-relaxed text-muted">
            <p>
              I&apos;m a Computer Science undergraduate at <span className="text-foreground">Azerbaijan Technical University</span>{" "}
              and Software Developer Team Lead at <span className="text-foreground">Dithari</span>.
              At AzTU I serve as a Software Developer on the platforms team. Together these roles
              put me at the intersection of <span className="text-foreground">institutional engineering</span> and{" "}
              <span className="text-foreground">team leadership</span>.
            </p>
            <p>
              My work spans production-grade systems that quietly run things: a yearly academic
              planning and reporting platform, an e-grant submission and review pipeline, a
              researcher portal that integrates with Scopus, Web of Science, and Google Scholar, a
              majors and curriculum portal, the university&apos;s public website, and a multi-surface
              e-commerce platform for a UAE trading group.
            </p>
            <p>
              I care about the parts most engineering portfolios skip — data models that survive
              organisational change, audit trails that hold up under review, integration layers
              that don&apos;t break when a third-party API drifts, and role-based systems that grow
              without permission sprawl.
            </p>
            <p>
              The direction I&apos;m moving toward is{" "}
              <span className="text-foreground">research software engineering</span> — designing
              the infrastructure that institutional systems and research labs depend on, not just
              the applications that sit on top.
            </p>
          </div>

          <aside className="md:col-span-4 space-y-8">
            <div>
              <p className="mono text-xs text-muted-2 uppercase tracking-widest mb-3">Based in</p>
              <p className="serif text-xl">Baku, Azerbaijan</p>
            </div>
            <div>
              <p className="mono text-xs text-muted-2 uppercase tracking-widest mb-3">Focus</p>
              <ul className="space-y-1.5 text-foreground">
                <li>Distributed systems</li>
                <li>Research infrastructure</li>
                <li>Education technology</li>
                <li>Data systems</li>
              </ul>
            </div>
            <div>
              <p className="mono text-xs text-muted-2 uppercase tracking-widest mb-3">Open to</p>
              <p className="text-muted leading-relaxed">
                Engineering work, research collaborations, and projects in research software
                engineering.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section eyebrow="How I work" title="Operating principles.">
        <div className="grid md:grid-cols-2 gap-px bg-[var(--border)]">
          {[
            {
              t: "Production over prototype.",
              d: "Systems that handle real users, real edge cases, real audit requirements. Demos are easy; the second year of running something is where engineering shows.",
            },
            {
              t: "Model the domain, not the screen.",
              d: "Faculties, cafedras, rubrics, plans, reviewers, syllabi — the data model is the product. UI follows.",
            },
            {
              t: "Boring tech, deliberate boundaries.",
              d: "PostgreSQL, Spring Boot, FastAPI, Next.js, Docker. The interesting decisions live in service boundaries, not framework choices.",
            },
            {
              t: "Lead by writing the hard parts.",
              d: "Leading a team means owning the schema, the contracts, and the failure modes — not just the standups.",
            },
          ].map((p) => (
            <div key={p.t} className="bg-background p-8">
              <h3 className="serif text-xl tracking-tight mb-3">{p.t}</h3>
              <p className="text-muted leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
