import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const defaultImage = `${site.url}/logo.png`;
  const posts = await getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = site.nav.map((n) => ({
    url: `${site.url}${n.href === "/" ? "" : n.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: n.href === "/" ? 1 : 0.8,
    images: [defaultImage],
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    // Live systems with a full write-up outrank the ones still in design.
    priority: p.status === "Production" ? 0.7 : 0.5,
    // Point image discovery at the project's own screenshots where they exist.
    images: p.gallery?.length
      ? [
          ...(p.ogImage ? [`${site.url}${p.ogImage}`] : []),
          ...p.gallery.map((shot) => `${site.url}${shot.path}`),
        ]
      : [defaultImage],
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
    images: [p.cover ? `${site.url}${p.cover.src}` : defaultImage],
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
