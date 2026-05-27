import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const ogImage = `${site.url}/logo.png`;

  const staticRoutes: MetadataRoute.Sitemap = site.nav.map((n) => ({
    url: `${site.url}${n.href === "/" ? "" : n.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: n.href === "/" ? 1 : 0.8,
    images: [ogImage],
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${site.url}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [ogImage],
  }));

  return [...staticRoutes, ...projectRoutes];
}
