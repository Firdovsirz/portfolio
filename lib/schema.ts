import { site, absoluteUrl } from "@/lib/site";
import type { Project } from "@/lib/projects";

const PERSON_ID = `${site.url}/#person`;
const WEBSITE_ID = `${site.url}/#website`;
const BUSINESS_ID = `${site.url}/#practice`;

/** JSON-LD is embedded as a plain script tag, so `<` must be escaped. */
export function serializeLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const personLd = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Firdovsi Rzaev",
  alternateName: ["Firdovsi", "Rzaev", "Firdovsi Rzayev"],
  givenName: "Firdovsi",
  familyName: "Rzaev",
  url: site.url,
  image: `${site.url}/logo.png`,
  jobTitle: "Software Engineer",
  description: site.description,
  worksFor: [
    { "@type": "Organization", name: "Azerbaijan Technical University", url: "https://aztu.edu.az" },
    { "@type": "Organization", name: "Dithari", url: "https://dithari.com" },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Azerbaijan Technical University",
    url: "https://aztu.edu.az",
  },
  sameAs: [site.social.github, site.social.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressCountry: site.country,
  },
  // The address itself is deliberately not published in machine-readable form —
  // the contact page is the durable, scraper-resistant contact point.
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Professional enquiries",
    url: absoluteUrl("/contact"),
    availableLanguage: ["English", "Azerbaijani"],
  },
  knowsAbout: [
    "Software Engineering",
    "Distributed Systems",
    "Education Technology",
    "Research Software Engineering",
    "Research Infrastructure",
    "Academic Publishing Systems",
    "Data Systems",
  ],
};

export const websiteLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
};

export const profilePageLd = {
  "@type": "ProfilePage",
  "@id": `${site.url}/#profilepage`,
  url: site.url,
  name: site.title,
  isPartOf: { "@id": WEBSITE_ID },
  mainEntity: { "@id": PERSON_ID },
};

/**
 * Local-business schema for the engineering practice. Only details that are
 * genuinely public are declared — no street address and no phone number.
 */
export const localBusinessLd = {
  "@type": "ProfessionalService",
  "@id": BUSINESS_ID,
  name: "Firdovsi Rzaev — Software Engineering",
  url: site.url,
  image: `${site.url}/logo.png`,
  description:
    "Software engineering and research software engineering practice in Baku, Azerbaijan — production institutional platforms, research infrastructure, and education technology.",
  founder: { "@id": PERSON_ID },
  areaServed: [
    { "@type": "Country", name: "Azerbaijan" },
    { "@type": "Place", name: "Remote / worldwide" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.locality,
    addressRegion: "Baku",
    addressCountry: site.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  knowsLanguage: ["en", "az"],
  sameAs: [site.social.github, site.social.linkedin],
  serviceType: [
    "Software engineering",
    "Research software engineering",
    "Institutional platform development",
    "Education technology development",
  ],
};

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqLd(entries: { question: string; answer: string }[], path: string) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: { "@type": "Answer", text: entry.answer },
    })),
  };
}

export function projectLd(project: Project) {
  const path = `/projects/${project.slug}`;
  return {
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl(path)}#software`,
    name: project.name,
    url: absoluteUrl(path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web browser",
    description: project.summary,
    ...(project.ogImage ? { image: `${site.url}${project.ogImage}` } : {}),
    ...(project.liveUrl ? { sameAs: [project.liveUrl] } : {}),
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
    provider: { "@type": "Organization", name: project.client },
    isPartOf: { "@id": WEBSITE_ID },
    keywords: project.stack.join(", "),
    featureList: project.features,
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "AZN",
      availability: "https://schema.org/InStock",
    },
  };
}

export function blogPostingLd(post: {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
}) {
  const path = `/blog/${post.slug}`;
  return {
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#post`,
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    url: absoluteUrl(path),
    inLanguage: "en",
    keywords: post.tags.join(", "),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: absoluteUrl(path),
  };
}

/** Wraps one or more node objects into a single `@graph` document. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
