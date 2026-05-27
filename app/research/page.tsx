import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research interests of Firdovsi Rzaev — research software engineering, distributed systems, education technology, AI-assisted educational systems, data systems, and research infrastructure.",
};

const interests = [
  {
    name: "Research Software Engineering",
    body: "Engineering practices, tooling, and infrastructure that make research reproducible, maintainable, and shareable across labs and institutions.",
  },
  {
    name: "Distributed Systems",
    body: "Consistency, coordination, and failure modes of systems that span multiple services, regions, or organisations.",
  },
  {
    name: "Education Technology",
    body: "Systems that map onto how teaching and learning actually happen — attendance, assessment, syllabi, curricula — at institutional scale.",
  },
  {
    name: "AI-assisted Educational Systems",
    body: "Grounded, retrieval-driven AI assistants for students and educators — not chat wrappers, but tools that understand a specific curriculum.",
  },
  {
    name: "Data Systems",
    body: "Storage, querying, and integration layers underneath research and educational platforms — including reconciliation across heterogeneous external sources.",
  },
  {
    name: "Research Infrastructure",
    body: "Platforms and pipelines that universities and research labs use to manage grants, publications, researcher profiles, and bibliometrics.",
  },
];

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Where I want to go next."
        intro="My current work is engineering-led. The research direction I&apos;m pursuing for MSc / MASc study sits at the intersection of distributed systems and the platforms research actually runs on."
      />

      <Section eyebrow="Interests">
        <div className="grid md:grid-cols-2 gap-px bg-[var(--border)]">
          {interests.map((i) => (
            <div key={i.name} className="bg-background p-8">
              <h3 className="serif text-2xl tracking-tight mb-3">{i.name}</h3>
              <p className="text-muted leading-relaxed">{i.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Direction" title="What I'm applying for.">
        <div className="space-y-5 text-lg leading-relaxed text-muted max-w-3xl">
          <p>
            I&apos;m targeting funded MSc and MASc programmes in <span className="text-foreground">Canada</span>{" "}
            and <span className="text-foreground">Europe</span> for the <span className="text-foreground">2027</span>{" "}
            intake, with a preference for labs working on research software, distributed data
            systems, and education or research infrastructure.
          </p>
          <p>
            I&apos;m open to research assistantships and visiting research engineer arrangements
            before the formal start. If your group is exploring related problems, I&apos;d like to
            talk.
          </p>
        </div>
      </Section>
    </>
  );
}
