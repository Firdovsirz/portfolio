// Email is stored split so it never appears as a literal address in the
// server-rendered HTML. `components/email-link.tsx` reassembles it in the
// browser; nothing on the server should interpolate `emailAddress()` into JSX.
const EMAIL_USER = "firdovsirz";
const EMAIL_DOMAIN = "gmail.com";

export const site = {
  name: "Firdovsi Rzaev",
  shortName: "Firdovsi Rzaev",
  // Kept to 50–60 characters so search engines render it without truncation.
  title: "Firdovsi Rzaev — Research Software Engineer in Baku",
  // Kept to 120–160 characters for the same reason.
  description:
    "Firdovsi Rzaev is a software engineer in Baku building production institutional systems, research infrastructure, and education platforms.",
  url: "https://firdovsirzaev.online",
  emailUser: EMAIL_USER,
  emailDomain: EMAIL_DOMAIN,
  /** Human-readable, scraper-hostile rendering used as the no-JS fallback. */
  emailObfuscated: `${EMAIL_USER} [at] ${EMAIL_DOMAIN.replace(".", " [dot] ")}`,
  location: "Baku, Azerbaijan",
  locality: "Baku",
  country: "AZ",
  geo: { latitude: 40.3777, longitude: 49.892 },
  role: "Software Engineer · Research Software Engineer",
  social: {
    github: "https://github.com/Firdovsirz",
    linkedin: "https://www.linkedin.com/in/firdovsi-rzaev/",
  },
  cv: {
    href: "/cv_firdovsi_rzaev.pdf",
    downloadAs: "Firdovsi-Rzaev-CV.pdf",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/research", label: "Research" },
    { href: "/experience", label: "Experience" },
    { href: "/education", label: "Education" },
    { href: "/publications", label: "Publications" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export type Site = typeof site;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
  return path === "/" ? site.url : `${site.url}${path}`;
}

/**
 * Canonical + hreflang block for a route. Every page must set this: metadata
 * is inherited in the App Router, so a page that omits it would canonicalise
 * itself to the home page.
 */
export function canonical(path: string) {
  return { canonical: path, languages: { en: path, "x-default": path } };
}
