import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience of Firdovsi Rzaev — Software Developer Team Lead at Dithari Innovation Centre and Software Developer at Azerbaijan Technical University.",
};

const roles = [
  {
    org: "Dithari Innovation and Training Centre",
    role: "Software Developer Team Lead",
    period: "2024 — Present",
    location: "Baku, Azerbaijan",
    points: [
      "Lead engineering on the centre's Learning Management System — lessons, attendance (incl. QR check-in), assignments, syllabus, AI tutor, separate teacher and student workflows.",
      "Own technical architecture decisions, code review, release cadence, and onboarding for the engineering team.",
      "Translate non-technical academic requirements into structured domain models and shipping features.",
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "WebSocket"],
  },
  {
    org: "Azerbaijan Technical University",
    role: "Software Developer",
    period: "2024 — Present",
    location: "Baku, Azerbaijan",
    points: [
      "Designed and shipped the Plan-Report Information System, E-Grant Portal, Researchers Portal (with Scopus / WoS / Google Scholar integrations), Majors Portal, and contribute to the public AzTU website.",
      "Modelled hierarchical organisational structures (faculty → cafedra → department) for academic workflows.",
      "Built integration and reconciliation layers across external academic indices with conflicting identifiers and rate limits.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Spring Boot", "FastAPI", "PostgreSQL"],
  },
  {
    org: "Buyology Trading FZ-LLC",
    role: "Software Developer · Team Lead (Project)",
    period: "2024 — Present",
    location: "UAE (Remote)",
    points: [
      "Lead engineering on a multi-surface e-commerce platform — web storefront, mobile app, and administrative dashboard.",
      "Coordinate three client surfaces against a shared API contract and run release planning for the team.",
      "Designed the ordering and B2B inquiry pipelines end-to-end.",
    ],
    stack: ["Next.js", "React Native", "TypeScript", "Spring Boot", "PostgreSQL", "Docker"],
  },
];

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Engineering & leadership."
        intro="Two concurrent roles plus an industry engagement — covering institutional platforms, an LMS, and a UAE-based e-commerce system."
      />

      <Section>
        <div className="space-y-px bg-[var(--border)]">
          {roles.map((r) => (
            <article key={r.org} className="bg-background py-12 first:pt-0">
              <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-4">
                  <p className="mono text-xs text-muted-2 uppercase tracking-widest mb-2">
                    {r.period}
                  </p>
                  <h3 className="serif text-2xl tracking-tight">{r.org}</h3>
                  <p className="text-muted mt-1">{r.role}</p>
                  <p className="mono text-xs text-muted-2 mt-2">{r.location}</p>
                </div>

                <div className="md:col-span-8">
                  <ul className="space-y-3 text-muted leading-relaxed">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="text-accent mono text-xs mt-2">▸</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-6">
                    {r.stack.map((s) => (
                      <span
                        key={s}
                        className="mono text-xs border hairline px-2.5 py-1 text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
