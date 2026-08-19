import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/json-ld";
import { getAllPosts, getPostMeta, formatDate } from "@/lib/blog";
import { canonical } from "@/lib/site";
import { blogPostingLd, breadcrumbLd, graph } from "@/lib/schema";

// Only prerender published posts; an unknown/draft slug 404s in production.
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getPostMeta(slug);
  if (!meta) return {};
  const path = `/blog/${slug}`;
  return {
    title: meta.seoTitle,
    description: meta.seoDescription,
    keywords: meta.tags,
    alternates: canonical(path),
    openGraph: {
      type: "article",
      url: path,
      title: meta.seoTitle,
      description: meta.seoDescription,
      publishedTime: meta.date,
      authors: ["Firdovsi Rzaev"],
      tags: meta.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = await getPostMeta(slug);
  if (!meta) notFound();

  const { default: Post } = await import(`@/content/blog/${slug}/index.mdx`);

  const structuredData = graph(
    blogPostingLd(meta),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: meta.title, path: `/blog/${slug}` },
    ]),
  );

  return (
    <>
      <JsonLd data={structuredData} />

      <header className="mx-auto max-w-3xl px-6 lg:px-10 pt-20 md:pt-28 pb-10">
        <Link
          href="/blog"
          className="mono text-xs text-muted hover:text-foreground link-underline"
        >
          ← All posts
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 mono text-xs text-accent tracking-widest uppercase">
          <time>{formatDate(meta.date)}</time>
          {meta.tags?.map((tag) => (
            <span key={tag} className="text-muted-2">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="serif text-4xl md:text-5xl tracking-tight mt-5">
          {meta.title}
        </h1>
        <p className="text-muted text-lg md:text-xl mt-6 leading-relaxed">
          {meta.summary}
        </p>
      </header>

      {meta.cover && (
        <div className="mx-auto max-w-3xl px-6 lg:px-10 mb-12 md:mb-16">
          <div className="relative h-48 sm:h-60 md:h-72 overflow-hidden rounded-sm border hairline bg-[var(--surface)]">
            <Image
              src={meta.cover}
              alt={meta.title}
              fill
              preload
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <article className="mx-auto max-w-3xl px-6 lg:px-10 pb-24 md:pb-32">
        <Post />
      </article>
    </>
  );
}
