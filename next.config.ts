import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const oneYear = 60 * 60 * 24 * 365;

const nextConfig: NextConfig = {
  // Let `.mdx` files participate as pages/imports alongside the TS app.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: oneYear,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/:all*(svg|png|jpg|jpeg|webp|avif|ico|woff2)",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${oneYear}, immutable` },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: `public, max-age=${oneYear}, immutable` },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    // Plugin names are passed as strings so Turbopack (Next 16 default) can
    // resolve them in its Rust pipeline — function references aren't supported.
    remarkPlugins: [
      "remark-gfm",
      "remark-frontmatter",
      // Exposes the YAML frontmatter as a `frontmatter` named export.
      ["remark-mdx-frontmatter", { name: "frontmatter" }],
    ],
  },
});

export default withMDX(nextConfig);
