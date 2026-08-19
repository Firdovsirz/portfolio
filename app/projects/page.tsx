import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, canonical } from "@/lib/site";
import { breadcrumbLd, graph } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: canonical("/projects"),
  title: "Projects",
  description:
    "Production institutional systems by Firdovsi Rzaev — an open-access journal and peer-review platform, LMS, planning and reporting, e-grant, and e-commerce.",
};

export default function ProjectsPage() {
  const production = projects.filter((p) => p.status === "Production");
  const upcoming = projects.filter((p) => p.status !== "Production");

  const structuredData = graph(
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
    ]),
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl("/projects")}#projects`,
      name: "Projects by Firdovsi Rzaev",
      numberOfItems: projects.length,
      itemListElement: projects.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: p.name,
        url: absoluteUrl(`/projects/${p.slug}`),
      })),
    },
  );

  return (
    <>
      <JsonLd data={structuredData} />

      <PageHeader
        eyebrow="Projects"
        title="Selected work."
        intro="A mix of institutional platforms, an industry e-commerce system, and upcoming work. Each entry below has its own engineering write-up covering the architecture, the features, and the problems that were genuinely hard."
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
