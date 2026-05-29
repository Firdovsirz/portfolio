import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader, Section } from "@/components/section";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering write-ups by Firdovsi Rzaev on building production institutional systems — review-assignment engines, attendance, data reconciliation, and more.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes from the build."
        intro="Engineering write-ups on the systems I work on — the threat models, the trade-offs, and the things I'd do differently."
      />

      <Section>
        {posts.length === 0 ? (
          <p className="text-muted">No posts yet — check back soon.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-x-6 gap-y-12">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  {post.cover && (
                    <div className="relative aspect-[1200/630] overflow-hidden rounded-sm border hairline mb-5 bg-[var(--surface)]">
                      <Image
                        src={post.cover}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mono text-xs text-muted-2 uppercase tracking-widest">
                    <time>{formatDate(post.date)}</time>
                    {post.tags.length > 0 && (
                      <span className="hidden sm:inline">{post.tags.slice(0, 3).join(" / ")}</span>
                    )}
                  </div>
                  <h2 className="serif text-2xl md:text-3xl tracking-tight mt-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted leading-relaxed mt-3">{post.summary}</p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
