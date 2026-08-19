import type { StaticImageData } from "next/image";

import msjHome from "@/public/projects/aztu-machine-science-journal/aztu-machine-science-journal-homepage.png";
import msjCard from "@/public/projects/aztu-machine-science-journal/aztu-machine-science-journal-card.png";
import msjCurrentIssue from "@/public/projects/aztu-machine-science-journal/aztu-machine-science-journal-current-issue.png";
import msjBoard from "@/public/projects/aztu-machine-science-journal/aztu-machine-science-journal-editorial-board.png";
import msjArchive from "@/public/projects/aztu-machine-science-journal/aztu-machine-science-journal-issue-archive.png";
import msjArticle from "@/public/projects/aztu-machine-science-journal/aztu-machine-science-journal-article-page.png";
import msjAbstract from "@/public/projects/aztu-machine-science-journal/aztu-machine-science-journal-article-abstract.png";

export type ProjectImage = {
  src: StaticImageData;
  /**
   * Stable public path for the same file. `src.src` is a content-hashed
   * /_next/static/media URL, which is fine for <img> but wrong for an image
   * sitemap — crawlers should see the readable, permanent /public URL.
   */
  path: string;
  /** Descriptive alt text — required, and indexed by image search. */
  alt: string;
  caption: string;
};

export type ProjectFact = { label: string; value: string };

export type ProjectFaq = { question: string; answer: string };

export type Project = {
  slug: string;
  name: string;
  client: string;
  role: string;
  status: "Production" | "In Development" | "Upcoming";
  year: string;
  summary: string;
  description: string[];
  features: string[];
  stack: string[];
  challenges: string[];
  systemDesign: string;
  links?: { label: string; href: string }[];
  /** Public URL of the live system, when there is one. */
  liveUrl?: string;
  /**
   * 120–160 character `<meta name="description">`. Set this when `summary`
   * falls outside that window; search engines truncate anything longer.
   */
  metaDescription?: string;
  /** Key/value facts rendered as a definition list on the project page. */
  facts?: ProjectFact[];
  /** Question-and-answer content — feeds the on-page FAQ and FAQPage schema. */
  faq?: ProjectFaq[];
  /**
   * Full-width screenshot at the top of the project page. Not used on the card
   * — a whole page shrunk to card size reads as noise.
   */
  hero?: ProjectImage;
  /**
   * The card plate: a pre-cropped strip of the real interface, sized for the
   * card's 96px plate slot. Pre-cropped rather than CSS-cropped so the grid
   * fetches ~0.5MB of masthead instead of the 1.7MB full-page screenshot.
   */
  thumbnail?: ProjectImage;
  /** Absolute-from-root path to a 1200x630 social card in /public. */
  ogImage?: string;
  gallery?: ProjectImage[];
};

export const projects: Project[] = [
  {
    slug: "aztu-machine-science-journal",
    metaDescription:
      "Open-access journal platform for Azerbaijan Technical University — manuscript submission, double-blind peer review, issue publishing, and DOI registration.",
    name: "Machine Science Journal Platform",
    client: "Azerbaijan Technical University",
    role: "Software Developer",
    status: "Production",
    year: "2025 — Present",
    liveUrl: "https://msj.aztu.edu.az",
    summary:
      "Open-access publishing platform for AzTU's Machine Science journal — manuscript submission, double-blind peer review, and DOI-registered articles.",
    description: [
      "Machine Science is Azerbaijan Technical University's international scientific and technical journal, published continuously since 2001 (as Mechanics — Mechanical Engineering until 2011). I built the platform it now runs on: a public open-access journal site at msj.aztu.edu.az and the editorial back office behind it.",
      "Researchers submit their manuscripts through the author portal instead of by email. Each submission enters an editorial pipeline where the editorial board routes it to subject-matter experts for double-blind peer review, collects reviewer decisions, and — once accepted — assigns the article to an issue, allocates page ranges, registers a DOI under the 10.61413 prefix, and publishes it open access.",
      "The public side is a full journal reading surface: current issue, year-grouped archive, per-article landing pages with abstracts, keywords, author affiliations, identifiers and article metrics, plus scope, editorial board, contact and author-guidance sections. Everything is free to read and free to publish — no submission, review, or article-processing charges at any stage.",
      "The platform replaced a workflow that lived in inboxes and shared folders. Its point is not just a website: it is the record-keeping layer that makes an academic journal citable, indexable, and auditable — stable article URLs, registered DOIs, machine-readable metadata for indexing services, and an editorial trail behind every published paper.",
    ],
    features: [
      "Author registration and online manuscript submission portal",
      "Editorial screening and expert (reviewer) assignment",
      "Double-blind peer review with confidential reviewer decisions",
      "Editorial decision workflow through to acceptance",
      "Issue composition — assigning accepted articles to a number, ordering, and page ranges",
      "DOI registration under the 10.61413 prefix on publication",
      "Per-article landing pages with abstract, keywords, authors, and affiliations",
      "Article metrics — views, downloads, and citations",
      "Year-grouped issue archive with full-issue and per-article PDFs",
      "Editorial board directory with editor-in-chief, honorary editor, and reviewers",
      "Full-text search across articles, authors, and keywords",
      "Author guidance surfaces — manuscript preparation, open-access policy, AI policy",
      "Light and dark reading themes across every public surface",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Spring Boot",
      "Spring Security",
      "PostgreSQL",
      "Docker",
      "Nginx",
      "Cloudflare",
    ],
    challenges: [
      "Keeping double-blind review genuinely blind — reviewer-facing views must strip author identity from both metadata and the manuscript files themselves, and the un-blinding has to happen at exactly one point in the pipeline.",
      "Modelling the journal's publication unit correctly: an article belongs to a number, a number belongs to a volume year, and page ranges are only fixed at issue composition — so article records have to survive being reordered and repaginated before they go public.",
      "DOIs are permanent. A DOI can be minted once and never re-pointed casually, so registration had to be an idempotent, replayable step that cannot fire twice or fire before an article has a stable public URL.",
      "Twenty-five years of back issues had to be represented alongside new submissions without forcing historical papers through a modern review workflow they never went through.",
      "Serving indexing services and reference managers means the same article has to be correct as an HTML page, as structured metadata, and as a PDF — three renderings of one record that must never drift apart.",
      "Cache invalidation across a statically rendered public site: publishing an issue has to make the homepage, the archive, the issue page, and every article page consistent within the same beat.",
    ],
    systemDesign:
      "The public journal and the editorial portal are separate Next.js App Router surfaces reading one Spring Boot API, so a reviewer-facing bug can never leak into the public reading experience. The public site is statically rendered with incremental revalidation — issue and article pages are prerendered and refreshed on a short stale-while-revalidate window, which is why reads stay fast under indexing crawlers while newly published work appears without a redeploy. Submission, review, decision, and publication are modelled as explicit states on a manuscript rather than boolean flags, so an article's history is reconstructable end to end. DOI registration and issue publication are separated from the editorial decision itself, making publication a deliberate, repeatable action instead of a side effect.",
    facts: [
      { label: "Journal", value: "Machine Science — International Scientific & Technical Journal" },
      { label: "Publisher", value: "Azerbaijan Technical University, Baku" },
      { label: "ISSN", value: "2227-6912 (print) · 2790-0479 (online)" },
      { label: "DOI prefix", value: "10.61413" },
      { label: "Published since", value: "2001" },
      { label: "Frequency", value: "At least two numbers per year" },
      { label: "Access", value: "Open access, CC BY 4.0 — free to read and to publish" },
      { label: "Review model", value: "Double-blind peer review, COPE-aligned ethics" },
      { label: "Indexing", value: "INSPEC since 2011 · listed by HAC Azerbaijan" },
      {
        label: "Scope",
        value:
          "Materials Science · Mechanics · Machine Design · Engineering Technology · Automation and ICT · Energy and Environment · Economics and Management",
      },
    ],
    faq: [
      {
        question: "What is the Machine Science journal platform?",
        answer:
          "It is the open-access publishing platform behind Machine Science, the international scientific and technical journal of Azerbaijan Technical University. It covers the whole lifecycle of a paper: an author submits a manuscript, the editorial board assigns expert reviewers, the paper goes through double-blind peer review, and accepted work is placed in an issue, given a DOI, and published free of charge at msj.aztu.edu.az.",
      },
      {
        question: "How do researchers submit an article to the journal?",
        answer:
          "Authors sign in to the author portal and submit the manuscript online with its metadata, author affiliations, and supporting files, rather than emailing an editor. The submission then enters the editorial pipeline, where it is screened and routed to subject-matter experts for review.",
      },
      {
        question: "How does the peer review workflow work?",
        answer:
          "Reviews are double-blind: reviewers do not see author identities and authors do not see reviewer identities. The editorial board assigns each submission to experts in its subject area, reviewers return confidential assessments against review deadlines, and the editor issues a decision. Accepted articles are then composed into an issue with page ranges before publication.",
      },
      {
        question: "How are DOIs assigned to published articles?",
        answer:
          "On publication each article is registered a DOI under the journal's 10.61413 prefix and gets a permanent article page carrying its abstract, keywords, author affiliations, identifiers, and downloadable PDF — so the paper stays citable and resolvable independently of the site's navigation.",
      },
      {
        question: "What technologies is the platform built with?",
        answer:
          "The public journal and the editorial back office are Next.js and TypeScript applications on the App Router, backed by a Spring Boot REST API secured with Spring Security and a PostgreSQL database. The public site is statically rendered with incremental revalidation and served behind Nginx and Cloudflare.",
      },
      {
        question: "Is the journal free to read and to publish in?",
        answer:
          "Yes. Machine Science is fully open access under CC BY 4.0 with authors keeping copyright, and there is no submission, review, or publication charge at any stage.",
      },
    ],
    ogImage: "/projects/aztu-machine-science-journal/aztu-machine-science-journal-og.png",
    hero: {
      src: msjHome,
      path: "/projects/aztu-machine-science-journal/aztu-machine-science-journal-homepage.png",
      alt: "Machine Science journal homepage built for Azerbaijan Technical University, showing the ISSN and open-access header, the journal masthead, and calls to read the current issue or submit a manuscript",
      caption: "Public journal homepage — msj.aztu.edu.az",
    },
    thumbnail: {
      src: msjCard,
      path: "/projects/aztu-machine-science-journal/aztu-machine-science-journal-card.png",
      alt: "Masthead of the Machine Science journal — the Azerbaijan Technical University eyebrow above the journal's wordmark, set over a photograph of machining equipment",
      caption: "msj.aztu.edu.az",
    },
    gallery: [
      {
        src: msjCurrentIssue,
        path: "/projects/aztu-machine-science-journal/aztu-machine-science-journal-current-issue.png",
        alt: "Current issue page of the AzTU Machine Science journal showing Machine Science 2025 Number I with the issue cover, issue record, and the list of peer-reviewed articles with authors and DOIs",
        caption: "Current issue — cover, issue record, and the articles it contains",
      },
      {
        src: msjBoard,
        path: "/projects/aztu-machine-science-journal/aztu-machine-science-journal-editorial-board.png",
        alt: "Editorial board page of the Machine Science journal listing the editor-in-chief, the honorary editor, and the twenty-two editors and peer reviewers with portraits and affiliations",
        caption: "Editorial board — editor-in-chief, honorary editor, and 22 reviewers",
      },
      {
        src: msjArchive,
        path: "/projects/aztu-machine-science-journal/aztu-machine-science-journal-issue-archive.png",
        alt: "Issue archive of the Machine Science journal grouping every published number from 2021 to 2025 by year, each with its cover thumbnail and issue link",
        caption: "Archive — every published number, grouped by year",
      },
      {
        src: msjArticle,
        path: "/projects/aztu-machine-science-journal/aztu-machine-science-journal-article-page.png",
        alt: "Machine Science article page showing the paper title, authors with the corresponding-author marker, issue number, year, page range, publication date, DOI, and PDF download actions",
        caption: "Article page — authorship, issue placement, DOI, and full text",
      },
      {
        src: msjAbstract,
        path: "/projects/aztu-machine-science-journal/aztu-machine-science-journal-article-abstract.png",
        alt: "Machine Science article page detail showing the peer-reviewed and open-access badges, the abstract, keyword tags, article metrics for views, downloads and citations, and the DOI identifiers panel",
        caption: "Article detail — abstract, keywords, metrics, and identifiers",
      },
    ],
  },
  {
    slug: "buyology-ecommerce",
    metaDescription:
      "Multi-surface e-commerce platform for Buyology Trading FZ-LLC — web storefront, React Native mobile app, and an operations dashboard on one service layer.",
    name: "Buyology E-Commerce Platform",
    client: "Buyology Trading FZ-LLC (UAE)",
    role: "Software Developer · Team Lead",
    status: "Production",
    year: "2024 — Present",
    summary:
      "Scalable multi-surface e-commerce platform spanning web storefront, mobile application, and administrative dashboard.",
    description: [
      "End-to-end commerce platform with separate consumer web, native mobile, and operations dashboard surfaces backed by a shared service layer.",
      "Owns product catalogue, ordering, fulfilment, B2B inquiry intake, newsletter, and gamified engagement features.",
    ],
    features: [
      "Product catalogue and inventory management",
      "Order lifecycle and fulfilment workflows",
      "B2B inquiry intake and routing",
      "Customer engagement (games, newsletter)",
      "Role-based administrative dashboard",
    ],
    stack: ["Next.js", "React Native", "TypeScript", "Spring Boot", "PostgreSQL", "Docker", "Nginx"],
    challenges: [
      "Coordinating three client surfaces against one evolving API contract.",
      "Designing the ordering pipeline to remain consistent across web, mobile, and admin actors.",
      "Leading a small engineering team through release cadence, code review, and architectural decisions.",
    ],
    systemDesign:
      "Modular monolith backend with clear bounded contexts for catalogue, orders, customers, and engagement. Shared TypeScript domain types across web and mobile clients to keep contracts coherent. Dockerised services behind Nginx with environment-segregated deployments.",
  },
  {
    slug: "dithari-lms",
    name: "Dithari Learning Management System",
    client: "Dithari",
    role: "Software Developer",
    status: "Production",
    year: "2024 — Present",
    summary:
      "Institutional LMS covering lessons, attendance, assignments, syllabus management, and an AI tutor for students and teachers.",
    description: [
      "Replaces ad-hoc spreadsheets and disconnected tools with a single source of truth for the centre's academic operations.",
      "Designed around the daily workflows of teachers, students, and academic coordinators rather than a generic course-platform abstraction.",
    ],
    features: [
      "Digital lesson management",
      "Attendance tracking with QR code check-in",
      "Assignment authoring, submission, and grading",
      "Syllabus and curriculum management",
      "AI tutor for student support",
      "Distinct student and teacher workflows",
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Docker", "WebSocket"],
    challenges: [
      "Designing an attendance flow resilient to spoofing, network drops, and timezone edge cases.",
      "Integrating an AI tutor without making it a thin chat wrapper — grounding answers in lesson context.",
      "Modelling role-based permissions across teachers, students, coordinators, and admins without permission sprawl.",
    ],
    systemDesign:
      "API-first backend with explicit roles and resource-scoped permissions. Realtime updates over WebSocket for attendance and submissions. AI tutor backed by a retrieval layer over syllabus and lesson materials to keep responses grounded.",
  },
  {
    slug: "aztu-plan-report",
    name: "Plan-Report Information System",
    client: "Azerbaijan Technical University",
    role: "Software Developer",
    status: "Production",
    year: "2024 — Present",
    summary:
      "Yearly academic planning and reporting platform that automates departmental workflows across faculties, cafedras, and duty assignments.",
    description: [
      "Coordinates the multi-stage plan/report cycle across faculties and departments — historically managed via Word documents and email.",
      "Provides structured data the university can analyse, instead of unstructured submitted files.",
    ],
    features: [
      "Yearly plan authoring and submission",
      "Multi-level review workflows (department → cafedra → faculty)",
      "Duty and activity tracking",
      "Automated reporting against submitted plans",
    ],
    stack: ["React", "TypeScript", "Spring Boot", "PostgreSQL", "Docker"],
    challenges: [
      "Modelling an organisational hierarchy (faculty → cafedra → department → duty) that varies across faculties.",
      "Preserving historical plan/report data while the underlying organisational structure changes year over year.",
      "Designing review states that map cleanly onto how academic staff actually approve documents.",
    ],
    systemDesign:
      "Hierarchical organisational model with versioned plan documents. Workflow engine tracking submission states and approvers. Read-optimised reporting views generated from the same plan data.",
  },
  {
    slug: "aztu-egrant",
    name: "E-Grant Portal",
    client: "Azerbaijan Technical University",
    role: "Software Developer",
    status: "Production",
    year: "2025",
    summary:
      "Grant competition platform handling candidate submission, project intake, and the expert review and evaluation pipeline.",
    description: [
      "Replaces a paper- and email-driven grant process with a structured, auditable submission and review pipeline.",
      "Supports multiple concurrent grant competitions with isolated reviewer pools.",
    ],
    features: [
      "Candidate and project submission",
      "Expert assignment and reviewer workflows",
      "Multi-criteria scoring and evaluation pipeline",
      "Audit trail for every state transition",
    ],
    stack: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Docker"],
    challenges: [
      "Preventing reviewer conflicts of interest at assignment time.",
      "Ensuring scoring rubrics are versioned per competition without breaking historical results.",
      "Building an immutable audit trail across submission, assignment, scoring, and decisions.",
    ],
    systemDesign:
      "Event-sourced review pipeline so every state transition (submission, assignment, score, decision) is replayable. Rubric and competition definitions versioned independently from submissions.",
  },
  {
    slug: "aztu-website",
    metaDescription:
      "Public institutional website for Azerbaijan Technical University, with faculty and cafedra microsites, multilingual news, and an admin content surface.",
    name: "AzTU Institutional Website",
    client: "Azerbaijan Technical University",
    role: "Software Developer",
    status: "Production",
    year: "2024 — Present",
    summary:
      "Public institutional website for the university with faculty, cafedra, news, and announcement subsystems.",
    description: [
      "Public-facing site serving the university's faculties, departments, news, and announcements.",
      "Backed by an internal admin surface that lets non-technical staff manage all content.",
    ],
    features: [
      "Faculty and cafedra microsites",
      "News and announcement publishing",
      "Multilingual content support",
      "Administrative content management surface",
    ],
    stack: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL", "Nginx"],
    challenges: [
      "Performance on a content-heavy multilingual site without giving up editorial flexibility.",
      "Designing a content model that handles the long tail of faculty/cafedra page variants.",
    ],
    systemDesign:
      "Statically rendered public site with incremental revalidation for editorial updates. Headless CMS-style admin surface backed by the same API as the public pages.",
  },
  {
    slug: "aztu-researchers",
    name: "Researchers Portal",
    client: "Azerbaijan Technical University",
    role: "Software Developer",
    status: "Production",
    year: "2025",
    summary:
      "Centralised research management system integrating Scopus, Web of Science, and Google Scholar to keep researcher profiles synchronised.",
    description: [
      "Single source of truth for researcher profiles, publications, and bibliometric indicators across the university.",
      "Removes manual publication entry by pulling and reconciling data from major academic indices.",
    ],
    features: [
      "Researcher profiles with affiliations and interests",
      "Scopus integration",
      "Web of Science integration",
      "Google Scholar integration",
      "Publication synchronisation and de-duplication",
      "Per-researcher metrics views",
    ],
    stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"],
    challenges: [
      "Reconciling the same publication appearing across three indices with inconsistent identifiers.",
      "Handling rate limits and partial outages from external academic APIs without dropping data.",
      "Designing an identifier resolution layer that survives author name changes and ORCID gaps.",
    ],
    systemDesign:
      "External index integrations run as scheduled ingestion jobs producing normalised publication records. A reconciliation layer merges records by DOI/identifier with fallback heuristics. Researcher-facing API reads from the reconciled store, never from the indices directly.",
  },
  {
    slug: "aztu-majors",
    metaDescription:
      "Majors and career exploration platform for Azerbaijan Technical University, covering programme learning outcomes, student outcomes, and syllabus browsing.",
    name: "Majors Portal",
    client: "Azerbaijan Technical University",
    role: "Software Developer",
    status: "Production",
    year: "2025",
    summary:
      "Majors and career exploration platform with PLO/SLO management, syllabus browsing, and student guidance.",
    description: [
      "Public guidance platform helping prospective and current students explore majors, learning outcomes, and syllabi.",
      "Doubles as a structured store for programme learning outcomes (PLOs) and student learning outcomes (SLOs).",
    ],
    features: [
      "Major and programme exploration",
      "PLO and SLO authoring and management",
      "Syllabus browsing per course",
      "Student guidance flows",
    ],
    stack: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL"],
    challenges: [
      "Modelling the relationship between programmes, courses, PLOs, and SLOs in a way curriculum staff can maintain.",
      "Surfacing syllabi consistently when programme structures change between intakes.",
    ],
    systemDesign:
      "Programme model with explicit PLO/SLO entities linked to courses and syllabi, versioned per academic year.",
  },
  {
    slug: "giveaway",
    metaDescription:
      "Lightweight giveaway and raffle application with verifiable, commit-reveal draw mechanics, entry validation, and an operator dashboard. In design for 2026.",
    name: "Giveaway Application",
    client: "Personal",
    role: "Software Engineer",
    status: "Upcoming",
    year: "2026",
    summary: "Lightweight giveaway and raffle application with verifiable draw mechanics.",
    description: [
      "In design — focused on transparent, auditable draw mechanics and abuse resistance.",
    ],
    features: ["Verifiable random draws", "Entry validation", "Operator dashboard"],
    stack: ["Next.js", "FastAPI", "PostgreSQL"],
    challenges: [
      "Designing a draw mechanism that is both transparent to participants and resistant to operator manipulation.",
    ],
    systemDesign:
      "Commit-reveal draw scheme with publicly verifiable seeds, server-side entry validation, and append-only draw log.",
  },
  {
    slug: "eduplatform",
    name: "EduPlatform",
    client: "Personal — Nationwide",
    role: "Founding Engineer",
    status: "Upcoming",
    year: "2026 — 2027",
    summary:
      "Nationwide education, course, and conference platform for Azerbaijan covering online and offline programmes for instructors and students.",
    description: [
      "A single platform for Azerbaijan's instructor and student ecosystem — covering online courses, in-person programmes, and conferences.",
      "Designed for cross-organisational use: independent instructors, training centres, and universities co-exist as first-class tenants.",
    ],
    features: [
      "Online and offline course delivery",
      "Conference and event management",
      "Instructor and student ecosystem",
      "Multi-tenant organisation model",
      "Payments and enrolment",
    ],
    stack: ["Next.js", "TypeScript", "Spring Boot", "FastAPI", "PostgreSQL", "Docker"],
    challenges: [
      "Multi-tenant data model that scales from a single instructor to a full institution.",
      "Unifying offline and online enrolment flows without forcing one model onto the other.",
    ],
    systemDesign:
      "Multi-tenant service-oriented backend with per-tenant data isolation, shared identity, and pluggable payment and delivery providers.",
  },
];
