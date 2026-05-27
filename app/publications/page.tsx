import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Publications and upcoming research by Firdovsi Rzaev in research software engineering, distributed systems, and education technology.",
};

export default function PublicationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Upcoming publications & research."
        intro="A formal publication record is in progress. This page will be updated as work is submitted and accepted."
      />

      <Section eyebrow="In preparation">
        <div className="space-y-px bg-[var(--border)]">
          {[
            {
              title:
                "Reconciliation strategies for researcher publication data across heterogeneous academic indices",
              note: "Working notes — drawing on the Researchers Portal integration with Scopus, Web of Science, and Google Scholar.",
            },
            {
              title:
                "Designing audit-grade workflows for institutional grant review",
              note: "Working notes — event-sourced design behind the AzTU E-Grant Portal.",
            },
          ].map((p) => (
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
