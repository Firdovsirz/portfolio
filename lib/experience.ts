import type { StaticImageData } from "next/image";

import aztuLogo from "@/public/logos/aztu-tile.png";
import buyologyLogo from "@/public/logos/buyology-tile.png";
import dithariLogo from "@/public/logos/dithari-tile.png";
import physicsLogo from "@/public/logos/physics-tile.png";
import personalLogo from "@/public/logos/freelance-tile.png";

export type Employment = "Full-time" | "Contract" | "Freelance";

export type Role = {
  title: string;
  employment: Employment;
  /** Display period, e.g. "Jul 2026 — Present". */
  period: string;
  /** Duration, precomputed rather than derived — no clock in the render path. */
  duration: string;
  /**
   * Responsibilities. Deliberately empty for now: the page ships before these
   * are written, and each role absorbs them later without a layout change.
   */
  points?: string[];
  stack?: string[];
};

export type Company = {
  /** Stable key for React and for anchors. */
  slug: string;
  name: string;
  /** Shorter label where the full legal name would wrap badly. */
  shortName?: string;
  logo: StaticImageData;
  logoAlt: string;
  location: string;
  url?: string;
  /** Span across every role held here, e.g. "Feb 2026 — Present". */
  span: string;
  duration: string;
  /** Newest role first. More than one entry is a progression within the company. */
  roles: Role[];
};

/**
 * Reverse-chronological by the most recent role at each employer. Four of these
 * run concurrently, so this is an ordering, not a sequence — the page says so
 * rather than implying one job followed another.
 *
 * Where two groups tie on their most recent start (AzTU and the Institute of
 * Physics both begin Mar 2025), the longer-running engagement comes first.
 */
export const companies: Company[] = [
  {
    slug: "buyology",
    name: "Buyology",
    logo: buyologyLogo,
    logoAlt: "Buyology logo",
    location: "United Arab Emirates",
    url: "https://buyology.online",
    span: "Feb 2026 — Present",
    duration: "7 mo",
    roles: [
      {
        title: "Chief Technology Officer",
        employment: "Full-time",
        period: "Jul 2026 — Present",
        duration: "2 mo",
      },
      {
        title: "Lead Software Developer",
        employment: "Full-time",
        period: "Feb 2026 — Jul 2026",
        duration: "5 mo",
      },
    ],
  },
  {
    slug: "dithari",
    name: "Dithari",
    logo: dithariLogo,
    logoAlt: "Dithari logo",
    location: "Baku, Azerbaijan",
    url: "https://dithari.com",
    span: "Nov 2025 — Feb 2026",
    duration: "3 mo",
    roles: [
      {
        title: "Robotics & Development Instructor",
        employment: "Full-time",
        period: "Nov 2025 — Feb 2026",
        duration: "3 mo",
      },
    ],
  },
  {
    slug: "aztu",
    name: "Azerbaijan Technical University",
    shortName: "AzTU",
    logo: aztuLogo,
    logoAlt: "Azerbaijan Technical University logo",
    location: "Baku, Azerbaijan",
    url: "https://aztu.edu.az",
    span: "Nov 2024 — Present",
    duration: "1 yr 10 mo",
    roles: [
      {
        title: "Software Developer",
        employment: "Contract",
        period: "Mar 2025 — Present",
        duration: "1 yr 6 mo",
      },
      {
        title: "Software Developer",
        employment: "Contract",
        period: "Nov 2024 — Mar 2025",
        duration: "4 mo",
      },
    ],
  },
  {
    slug: "institute-of-physics",
    name: "Institute of Physics, Azerbaijan National Academy of Sciences",
    shortName: "Institute of Physics, ANAS",
    logo: physicsLogo,
    logoAlt: "Institute of Physics, Azerbaijan National Academy of Sciences logo",
    location: "Baku, Azerbaijan",
    span: "Mar 2025 — Present",
    duration: "1 yr 6 mo",
    roles: [
      {
        title: "Software Developer",
        employment: "Contract",
        period: "Mar 2025 — Present",
        duration: "1 yr 6 mo",
      },
    ],
  },
  {
    slug: "freelance",
    name: "Freelance",
    logo: personalLogo,
    logoAlt: "Firdovsi Rzaev monogram",
    location: "Baku, Azerbaijan",
    span: "Nov 2023 — Present",
    duration: "2 yr 10 mo",
    roles: [
      {
        title: "Software Developer",
        employment: "Freelance",
        period: "Nov 2023 — Present",
        duration: "2 yr 10 mo",
      },
    ],
  },
];

/** Every role, flattened — used for structured data and counts. */
export const allRoles = companies.flatMap((c) =>
  c.roles.map((r) => ({ ...r, company: c })),
);
