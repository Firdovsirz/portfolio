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
};

export const projects: Project[] = [
  {
    slug: "buyology-ecommerce",
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
