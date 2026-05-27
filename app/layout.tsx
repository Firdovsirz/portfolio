import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ThemeScript } from "@/components/theme-script";
import { site } from "@/lib/site";

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
    "Distributed Systems",
    "Education Technology",
    "Research Infrastructure",
    "Software Developer Baku",
  ],
  alternates: {
    canonical: site.url,
  },
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
    // other: { me: ["mailto:firdovsirz@gmail.com", site.social.linkedin] },
  },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: "Firdovsi Rzaev",
  alternateName: ["Firdovsi", "Rzaev", "Firdovsi Rzayev"],
  givenName: "Firdovsi",
  familyName: "Rzaev",
  url: site.url,
  image: `${site.url}/logo.png`,
  email: site.email,
  jobTitle: "Software Engineer",
  description: site.description,
  worksFor: [
    {
      "@type": "Organization",
      name: "Azerbaijan Technical University",
      url: "https://aztu.edu.az",
    },
    {
      "@type": "Organization",
      name: "Dithari",
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Azerbaijan Technical University",
    url: "https://aztu.edu.az",
  },
  sameAs: [site.social.github, site.social.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Baku",
    addressCountry: "AZ",
  },
  knowsAbout: [
    "Software Engineering",
    "Distributed Systems",
    "Education Technology",
    "Research Software Engineering",
    "Research Infrastructure",
    "Data Systems",
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": `${site.url}/#person` },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/#profilepage`,
  url: site.url,
  mainEntity: { "@id": `${site.url}/#person` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} h-full`}
    >
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Script
          id="ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <Script
          id="ld-profile"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
