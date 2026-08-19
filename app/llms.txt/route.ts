import { projects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";
import { siteFaq } from "@/lib/faq";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text map of the site for large language models and
 * AI search engines, following the llmstxt.org convention: a single H1, a
 * blockquote summary, then linked sections with one-line descriptions.
 */
export async function GET() {
  const posts = await getAllPosts();

  const production = projects.filter((p) => p.status === "Production");
  const upcoming = projects.filter((p) => p.status !== "Production");

  const projectLine = (p: (typeof projects)[number]) =>
    `- [${p.name}](${site.url}/projects/${p.slug}): ${p.summary} Built for ${p.client} (${p.year}). Stack: ${p.stack.join(", ")}.${p.liveUrl ? ` Live at ${p.liveUrl}.` : ""}`;

  const body = `# ${site.name}

> ${site.description} Based in ${site.location}. Software Developer at Azerbaijan Technical University and Software Developer Team Lead at Dithari.

Firdovsi Rzaev builds production institutional systems — academic publishing and peer review, academic planning and reporting, grant competitions and expert evaluation, researcher profile infrastructure, learning management, and multi-surface e-commerce. This file is a map of the site for language models and AI search engines. All content is in English.

## Pages

${site.nav
  .map((n) => `- [${n.label}](${n.href === "/" ? site.url : `${site.url}${n.href}`})`)
  .join("\n")}

## Projects in production

${production.map(projectLine).join("\n")}

## Upcoming projects

${upcoming.map(projectLine).join("\n")}

## Writing

${
  posts.length
    ? posts
        .map((p) => `- [${p.title}](${site.url}/blog/${p.slug}) (${p.date}): ${p.summary}`)
        .join("\n")
    : "- No posts published yet."
}

## Frequently asked questions

${siteFaq.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}

## Contact

- Contact form: ${site.url}/contact
- LinkedIn: ${site.social.linkedin}
- GitHub: ${site.social.github}
- CV: ${site.url}${site.cv.href}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
