import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, canonical, site } from "@/lib/site";
import { breadcrumbLd, graph } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: canonical("/publications"),
  title: "Publications",
  description:
    "Publications and research in preparation by Firdovsi Rzaev on AI-driven curriculum management and academic planning systems at AzTU.",
};

const inPreparation = [
  {
    title:
      "AI-Driven Digital Transformation at Azerbaijan Technical University: Intelligent Solutions for Curriculum Management and Academic Planning Systems",
    note: "In preparation — on applying AI to curriculum management and academic planning at institutional scale, drawing on the Majors Portal (programme learning outcomes, student learning outcomes, syllabi) and the Plan-Report Information System that coordinates yearly planning across faculties and cafedras.",
  },
  {
    title:
      "Reconciliation strategies for researcher publication data across heterogeneous academic indices",
    note: "Working notes — drawing on the Researchers Portal integration with Scopus, Web of Science, and Google Scholar.",
  },
  {
    title: "Designing audit-grade workflows for institutional grant review",
    note: "Working notes — event-sourced design behind the AzTU E-Grant Portal.",
  },
];

export default function PublicationsPage() {
  const structuredData = graph(
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Publications", path: "/publications" },
    ]),
    ...inPreparation.map((paper) => ({
      "@type": "ScholarlyArticle",
      name: paper.title,
      headline: paper.title,
      abstract: paper.note,
      creativeWorkStatus: "In preparation",
      inLanguage: "en",
      author: { "@id": `${site.url}/#person` },
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntityOfPage: absoluteUrl("/publications"),
    })),
  );

  return (
    <>
      <JsonLd data={structuredData} />

      <PageHeader
        eyebrow="Publications"
        title="Upcoming publications & research."
        intro="A formal publication record is in progress. This page will be updated as work is submitted and accepted."
      />

      <Section eyebrow="In preparation">
        <div className="space-y-px bg-[var(--border)]">
          {inPreparation.map((p) => (
            <article key={p.title} className="bg-background py-8 first:pt-0">
              <h3 className="serif text-xl md:text-2xl tracking-tight max-w-3xl">
                {p.title}
              </h3>
              <p className="text-muted mt-3 max-w-3xl leading-relaxed">{p.note}</p>
              <p className="mono text-xs text-muted-2 uppercase tracking-widest mt-4">
                In preparation
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <p className="text-muted leading-relaxed max-w-2xl">
          Once peer-reviewed work is available, this page will list it with venue, DOI, and
          preprint links, organised reverse-chronologically.
        </p>
      </Section>
    </>
  );
}
