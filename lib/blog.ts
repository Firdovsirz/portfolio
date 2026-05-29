import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { StaticImageData } from "next/image";

// Frontmatter every post declares in the `---` block of its index.mdx.
// `summary` is canonical; `description` is accepted as an alias.
export type PostFrontmatter = {
  title: string;
  date: string; // ISO: YYYY-MM-DD
  summary?: string;
  description?: string;
  tags?: string[];
  draft?: boolean;
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  draft: boolean;
  cover: StaticImageData | null; // ./cover.png in the post folder, if present
};

const BLOG_DIR = join(process.cwd(), "content", "blog");

// Each post is a folder: content/blog/<slug>/index.mdx (+ co-located images).
// A slug is any subdirectory that contains an index.mdx.
export function getPostSlugs(): string[] {
  return readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(join(BLOG_DIR, name, "index.mdx")));
}

// By convention the hero/cover image is `cover.png` in the post folder.
// Returned as next/image static data (with intrinsic width/height), or null.
export async function getCover(slug: string): Promise<StaticImageData | null> {
  try {
    const mod = await import(`@/content/blog/${slug}/cover.png`);
    return mod.default as StaticImageData;
  } catch {
    return null;
  }
}

// Pull a single post's frontmatter (+ cover) via its compiled module export.
export async function getPostMeta(slug: string): Promise<PostMeta | null> {
  try {
    const mod = await import(`@/content/blog/${slug}/index.mdx`);
    const fm = mod.frontmatter as PostFrontmatter | undefined;
    if (!fm) return null;
    return {
      slug,
      title: fm.title,
      date: fm.date,
      summary: fm.summary ?? fm.description ?? "",
      tags: fm.tags ?? [],
      draft: fm.draft ?? false,
      cover: await getCover(slug),
    };
  } catch {
    return null;
  }
}

// All published posts, newest first. Drafts are hidden in production only,
// so you can preview them with `next dev`.
export async function getAllPosts(): Promise<PostMeta[]> {
  const metas = await Promise.all(getPostSlugs().map(getPostMeta));
  return metas
    .filter((m): m is PostMeta => m !== null)
    .filter((m) => process.env.NODE_ENV === "development" || !m.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

// Stable, human date formatting used across list + detail.
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
