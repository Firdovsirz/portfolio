import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected production institutional systems by Firdovsi Rzaev — LMS, planning/reporting, e-grant, researcher portal, and a multi-surface e-commerce platform.",
};

export default function ProjectsPage() {
  const production = projects.filter((p) => p.status === "Production");
  const upcoming = projects.filter((p) => p.status !== "Production");

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Selected work."
        intro="A mix of institutional platforms, an industry e-commerce system, and upcoming work. Each entry below has its own engineering write-up."
      />

      <Section eyebrow="In production">
        <div className="grid md:grid-cols-2 gap-5">
          {production.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {upcoming.length > 0 && (
        <Section eyebrow="Upcoming / in design">
          <div className="grid md:grid-cols-2 gap-5">
            {upcoming.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
