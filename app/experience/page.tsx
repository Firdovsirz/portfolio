import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, Section } from "@/components/section";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, canonical } from "@/lib/site";
import { breadcrumbLd, graph } from "@/lib/schema";
import { companies, type Company, type Role } from "@/lib/experience";

export const metadata: Metadata = {
  alternates: canonical("/experience"),
  title: "Experience",
  description:
    "Professional experience of Firdovsi Rzaev — CTO at Buyology, and software developer at Azerbaijan Technical University and the Institute of Physics.",
};

/** Width of the logo tile, and therefore of the rail the timeline runs down. */
const RAIL = "3.5rem"; // 56px

/**
 * One segment of the vertical rule that joins a company's roles. Each grid cell
 * draws its own segment rather than one absolutely-positioned line spanning the
 * group, so the rule needs no magic offsets and ends exactly on the last node.
 */
function RailLine({ stopsOnNode = false }: { stopsOnNode?: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute left-1/2 -translate-x-1/2 w-px bg-[var(--border)] top-0 ${
        stopsOnNode ? "h-[1.125rem]" : "bottom-0"
      }`}
    />
  );
}

function RoleNode() {
  return (
    <span
      aria-hidden
      className="relative mt-[0.875rem] h-[7px] w-[7px] rounded-full bg-[var(--border-strong)] ring-4 ring-[var(--background)]"
    />
  );
}

function CompanyBlock({ company }: { company: Company }) {
  return (
    <article className="bg-background py-12 first:pt-0">
      {/* Header row: the logo occupies the rail, so the rule below descends
          from directly under the mark it belongs to. */}
      <div
        className="grid gap-x-5 md:gap-x-8"
        style={{ gridTemplateColumns: `${RAIL} minmax(0,1fr)` }}
      >
        <div className="relative flex justify-center">
          <span className="relative z-10 h-14 w-14 shrink-0 rounded-sm border hairline overflow-hidden logo-tile">
            <Image
              src={company.logo}
              alt={company.logoAlt}
              width={56}
              height={56}
              sizes="56px"
              className="h-full w-full object-contain p-1.5"
            />
          </span>
          <RailLine />
        </div>

        <header className="min-w-0">
          <h2 className="serif text-2xl md:text-3xl tracking-tight">
            {company.url ? (
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-accent transition-colors"
              >
                {company.shortName ?? company.name}
              </a>
            ) : (
              (company.shortName ?? company.name)
            )}
          </h2>
          {company.shortName && (
            <p className="text-muted text-sm mt-1">{company.name}</p>
          )}
          <p className="mono text-xs text-muted-2 uppercase tracking-widest mt-2">
            {company.span} · {company.duration}
            <span className="hidden sm:inline"> · {company.location}</span>
          </p>
          <p className="mono text-xs text-muted-2 uppercase tracking-widest mt-1 sm:hidden">
            {company.location}
          </p>
        </header>
      </div>

      {/* One row per role. More than one means a progression, and the rule
          running through the nodes is what says so. */}
      <ol className="mt-7">
        {company.roles.map((role, i) => {
          const isLast = i === company.roles.length - 1;
          return (
            <li
              key={`${role.title}-${role.period}`}
              className="grid gap-x-5 md:gap-x-8 pb-7 last:pb-0"
              style={{ gridTemplateColumns: `${RAIL} minmax(0,1fr)` }}
            >
              <div className="relative flex justify-center">
                <RailLine stopsOnNode={isLast} />
                <RoleNode />
              </div>
              <RoleBody role={role} />
            </li>
          );
        })}
      </ol>
    </article>
  );
}

function RoleBody({ role }: { role: Role }) {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="serif text-xl tracking-tight">{role.title}</h3>
        <span className="mono text-[10px] uppercase tracking-widest text-muted-2 border hairline rounded-sm px-2 py-0.5">
          {role.employment}
        </span>
      </div>

      <p className="mono text-xs text-muted mt-2">
        {role.period} · {role.duration}
      </p>

      {role.points && role.points.length > 0 && (
        <ul className="space-y-2.5 text-muted leading-relaxed mt-4">
          {role.points.map((p) => (
            <li key={p} className="flex gap-3">
              <span className="text-accent mono text-xs mt-2">▸</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}

      {role.stack && role.stack.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {role.stack.map((s) => (
            <span key={s} className="mono text-xs border hairline px-2.5 py-1 text-muted">
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExperiencePage() {
  const current = companies.filter((c) => c.span.endsWith("Present"));
  const roleCount = companies.reduce((n, c) => n + c.roles.length, 0);

  const structuredData = graph(
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Experience", path: "/experience" },
    ]),
    {
      "@type": "ItemList",
      "@id": `${absoluteUrl("/experience")}#roles`,
      name: "Professional experience of Firdovsi Rzaev",
      numberOfItems: roleCount,
      itemListElement: companies.flatMap((c, ci) =>
        c.roles.map((r, ri) => ({
          "@type": "ListItem",
          position: ci * 10 + ri + 1,
          item: {
            "@type": "OrganizationRole",
            roleName: r.title,
            startDate: r.period.split(" — ")[0],
            ...(r.period.endsWith("Present") ? {} : { endDate: r.period.split(" — ")[1] }),
            memberOf: {
              "@type": "Organization",
              name: c.name,
              ...(c.url ? { url: c.url } : {}),
            },
          },
        })),
      ),
    },
  );

  return (
    <>
      <JsonLd data={structuredData} />

      <PageHeader
        eyebrow="Experience"
        title="Engineering & leadership."
        intro={`${roleCount} roles across ${companies.length} organisations, ${current.length} of them running concurrently today. Where one company holds more than one role, the rule down the left joins them in the order they were held.`}
      />

      <Section>
        <div className="space-y-px bg-[var(--border)]">
          {companies.map((c) => (
            <CompanyBlock key={c.slug} company={c} />
          ))}
        </div>
      </Section>
    </>
  );
}
