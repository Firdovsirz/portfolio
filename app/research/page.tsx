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
        title="The questions I'm working on."
        intro="My work sits at the intersection of distributed systems engineering and the platforms research and education actually run on."
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

      <Section eyebrow="Direction" title="Collaborations.">
        <div className="space-y-5 text-lg leading-relaxed text-muted max-w-3xl">
          <p>
            I&apos;m especially interested in work on research software, distributed data systems,
            and education or research infrastructure.
          </p>
          <p>
            If your team or lab is exploring related problems, I&apos;d like to talk.
          </p>
        </div>
      </Section>
    </>
  );
}
