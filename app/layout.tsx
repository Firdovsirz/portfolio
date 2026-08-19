import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ThemeScript } from "@/components/theme-script";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { canonical, site } from "@/lib/site";
import { graph, localBusinessLd, personLd, profilePageLd, websiteLd } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s — Firdovsi Rzaev",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Firdovsi Rzaev",
    "Firdovsi",
    "Rzaev",
    "Firdovsi Rzayev",
    "Software Engineer",
    "Research Software Engineer",
    "Azerbaijan Technical University",
    "AzTU",
    "Dithari",
    "Buyology",
    "Machine Science journal",
    "Academic publishing platform",
    "Peer review system",
    "Distributed Systems",
    "Education Technology",
    "Research Infrastructure",
    "Software Developer Baku",
  ],
  // Every route sets its own canonical; this is the home-page default only.
  alternates: canonical("/"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: "/logo.png",
        width: 677,
        height: 369,
        alt: "Firdovsi Rzaev",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    creator: "@firdovsirz",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  // Search engine verification placeholders — fill in once you claim the site.
  verification: {
    // google: "",
    // yandex: "",
  },
};

const siteLd = graph(personLd, websiteLd, profilePageLd, localBusinessLd);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} h-full`}
    >
      <head>
        {/* next/font self-hosts the font files with the rest of the static
            assets, so the browser never contacts fonts.gstatic.com — a
            preconnect or dns-prefetch to it would only cost a wasted
            connection on every page load. */}
        <ThemeScript />
        <JsonLd data={siteLd} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
