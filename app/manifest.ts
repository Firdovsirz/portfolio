import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Firdovsi Rzaev — Software Engineer",
    short_name: "Firdovsi Rzaev",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf7",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/logo.png", sizes: "any", type: "image/png", purpose: "any" },
    ],
  };
}
