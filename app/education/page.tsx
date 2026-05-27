import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Education of Firdovsi Rzaev — BSc Computer Science, Azerbaijan Technical University. Applying for funded MSc / MASc programmes in Canada and Europe for the 2027 intake.",
};

export default function EducationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Education"
        title="Academic background."
      />

      <Section>
        <div className="space-y-px bg-[var(--border)]">
          <article className="bg-background py-12 first:pt-0">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <p className="mono text-xs text-muted-2 uppercase tracking-widest mb-2">
                  Current · BSc
                </p>
                <h3 className="serif text-2xl tracking-tight">
                  Azerbaijan Technical University
                </h3>
                <p className="text-muted mt-1">Computer Science</p>
                <p className="mono text-xs text-muted-2 mt-2">Baku, Azerbaijan</p>
              </div>
              <div className="md:col-span-8 space-y-4 text-muted leading-relaxed">
                <p>
                  Undergraduate study in Computer Science with a focus on software systems,
                  databases, and applied engineering. Current cumulative GPA:{" "}
                  <span className="text-foreground">85.2 / 100</span>.
                </p>
                <p>
                  Concurrent professional roles at AzTU and Dithari Innovation Centre during the
                  programme — academic work has directly informed and been informed by production
                  institutional engineering.
                </p>
              </div>
            </div>
          </article>

          <article className="bg-background py-12">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <p className="mono text-xs text-accent uppercase tracking-widest mb-2">
                  Planned · 2027 intake
                </p>
                <h3 className="serif text-2xl tracking-tight">MSc / MASc</h3>
                <p className="text-muted mt-1">Canada or Europe</p>
                <p className="mono text-xs text-muted-2 mt-2">Funded programmes</p>
              </div>
              <div className="md:col-span-8 space-y-4 text-muted leading-relaxed">
                <p>
                  Targeting funded MSc or MASc programmes in research software engineering,
                  distributed systems, education technology, or research infrastructure.
                </p>
                <p>
                  Open to research assistantships and visiting research engineer arrangements
                  before the formal start.
                </p>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <Section eyebrow="Areas of interest" title="What I want to study and contribute to.">
        <ul className="grid md:grid-cols-2 gap-x-10 gap-y-3 max-w-3xl">
          {[
            "Research Software Engineering",
            "Distributed Systems",
            "Education Technology",
            "AI-assisted Educational Systems",
            "Data Systems",
            "Research Infrastructure",
          ].map((i) => (
            <li key={i} className="serif text-xl">
              {i}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
