import type { StaticImageData } from "next/image";

import msjHome from "@/public/projects/aztu-machine-science-journal/aztu-machine-science-journal-homepage.png";
import msjCard from "@/public/projects/aztu-machine-science-journal/aztu-machine-science-journal-card.png";

import boHome from "@/public/projects/buyology-ecommerce/buyology-ecommerce-storefront-homepage.png";
import boCard from "@/public/projects/buyology-ecommerce/buyology-ecommerce-card.png";
import boCatalogue from "@/public/projects/buyology-ecommerce/buyology-ecommerce-product-catalogue.png";
import boAiTools from "@/public/projects/buyology-ecommerce/buyology-ecommerce-ai-tools.png";
import boAssistant from "@/public/projects/buyology-ecommerce/buyology-ecommerce-buyobot-assistant.png";
import boVoiceSearch from "@/public/projects/buyology-ecommerce/buyology-ecommerce-voice-search.png";
import boSignup from "@/public/projects/buyology-ecommerce/buyology-ecommerce-account-signup.png";
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

/** A headline number for the scale strip near the top of a project page. */
export type ProjectMetric = { value: string; label: string };

/** One client application the project ships. */
export type ProjectSurface = { name: string; platform: string; detail: string };

/** One horizontal tier of the layered architecture diagram, top to bottom. */
export type ProjectTier = { label: string; note?: string; nodes: string[] };

/** Features grouped by domain, for projects with too many to read as one list. */
export type ProjectFeatureGroup = { title: string; items: string[] };

export type Project = {
  slug: string;
  name: string;
  client: string;
  role: string;
  status: "Production" | "In Development" | "Upcoming";
  year: string;
  summary: string;
  description: string[];
  /** Flat feature list. Use `featureGroups` instead when there are many. */
  features?: string[];
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
  /** Headline numbers rendered as a scale strip under the hero. */
  metrics?: ProjectMetric[];
  /** The client applications this project ships. */
  surfaces?: ProjectSurface[];
  /** Layered architecture diagram, rendered top-to-bottom. */
  architecture?: ProjectTier[];
  /** Features grouped by domain. Takes precedence over the flat `features`. */
  featureGroups?: ProjectFeatureGroup[];
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
    name: "Buyology E-Commerce Platform",
    client: "Buyology Trading FZ-LLC (UAE)",
    role: "Software Developer · Team Lead",
    status: "Production",
    year: "2024 — Present",
    liveUrl: "https://buyology.online",
    metaDescription:
      "Multi-surface commerce platform for the UAE — Next.js storefront, iOS and Android apps, admin dashboard, and a 39-context Spring Boot core with AI assistants.",
    summary:
      "Multi-surface commerce platform for the UAE — a Next.js storefront, iOS and Android apps, an operations dashboard, and a 39-context Spring Boot core.",
    description: [
      "Buyology is a consumer electronics marketplace operating out of the UAE, and the largest system I have worked on. I lead the engineering team building it. It is not one shop front but five applications over a single domain: a public storefront, native iOS and Android apps, an operations dashboard for staff, and a marketing surface — all reading one API.",
      "The commerce core is the part most people would expect: catalogue, variants and specifications, search, cart, checkout, payments, refunds, promotions, reviews and Q&A. What makes the system large is everything the business does that is not simply selling a boxed product. Customers can book a device repair, sell or trade in hardware they already own, rent equipment, order from a powerbank station network, request B2B quotes, or apply to become a supplier. Each of those is its own workflow with its own states, its own pricing, and its own operations screens.",
      "Three of those flows are answered by a language model. A storefront assistant answers product and order questions against the live catalogue; the repair flow estimates a price from photographs of the damage plus a description; the trade-in flow values used hardware the same way. All three run on Anthropic's Claude, and all three are grounded in the live database rather than in a static prompt, so a price change in the dashboard is reflected in what the model says next.",
      "Delivery is where the architecture stops being a single application. Orders leave the commerce core and enter a separate courier service — its own deployment, its own Keycloak-issued identities — which publishes assignment, status and GPS events onto a RabbitMQ topic exchange. The commerce core consumes them from a durable queue with a dead-letter path, and fans the interesting ones out to customers over WebSocket, which is how live courier tracking and customer-to-courier chat work.",
      "The platform serves seven markets. The UAE is the primary storefront; Saudi Arabia, Qatar, Oman, India, Bahrain and Azerbaijan each have their own regional host, with Cloudflare resolving the visitor's country at the edge and Nginx handing it to the application as a trusted header. Product data, currency and delivery pricing are all market-scoped.",
    ],
    metrics: [
      { value: "39", label: "Bounded contexts" },
      { value: "900+", label: "Backend source files" },
      { value: "128", label: "Domain entities" },
      { value: "5", label: "Client applications" },
      { value: "7", label: "Markets served" },
    ],
    surfaces: [
      {
        name: "Web storefront",
        platform: "Next.js · App Router",
        detail:
          "The primary shop. Server-rendered and region-aware, in English, Arabic and Azerbaijani, with Elasticsearch-backed search, a voice-driven command palette, and live order tracking over STOMP.",
      },
      {
        name: "iOS app",
        platform: "React Native · Expo · Swift project",
        detail:
          "A native Xcode target built and released through EAS. Sign in with Apple, Google and Facebook, push notifications, and Live Activities that keep a delivery on the lock screen while the courier is moving.",
      },
      {
        name: "Android app",
        platform: "React Native · Expo · Gradle project",
        detail:
          "The same codebase against a native Android project, released through EAS to Google Play, with an end-to-end Maestro suite that runs on a real emulator in CI on every change.",
      },
      {
        name: "Operations dashboard",
        platform: "React · Vite",
        detail:
          "What staff actually run the business on: catalogue and stock, order and refund handling, review moderation, courier dispatch, role assignment, and revenue reporting.",
      },
      {
        name: "Marketing site",
        platform: "Next.js",
        detail:
          "The public brand surface and the regional landing pages that visitors outside a served market are routed to.",
      },
    ],
    architecture: [
      {
        label: "Surfaces",
        note: "Five applications, one API contract",
        nodes: ["Web storefront", "iOS app", "Android app", "Ops dashboard", "Marketing site"],
      },
      {
        label: "Edge",
        note: "Country resolved before the request reaches the app",
        nodes: ["Cloudflare", "Nginx per-region hosts", "Rate limiting", "TLS / HSTS"],
      },
      {
        label: "Commerce core",
        note: "Spring Boot modular monolith · 39 bounded contexts",
        nodes: [
          "auth",
          "product",
          "cart",
          "order",
          "payment",
          "refund",
          "review",
          "b2b",
          "supplier",
          "membership",
          "repair",
          "sell",
          "promo",
          "payout",
          "revenue",
          "assistant",
        ],
      },
      {
        label: "Async & realtime",
        note: "How delivery reaches the customer's screen",
        nodes: [
          "RabbitMQ topic exchange",
          "Dead-letter queue",
          "STOMP over WebSocket",
          "Scheduled retry jobs",
        ],
      },
      {
        label: "Data",
        note: "One relational source of truth, one search index",
        nodes: ["PostgreSQL", "Flyway migrations", "Elasticsearch", "S3 object storage + CDN"],
      },
      {
        label: "Services & integrations",
        note: "Separate deployments and third parties",
        nodes: [
          "Courier service (Keycloak)",
          "Quiqup delivery",
          "Paymob payments",
          "ERPNext",
          "Anthropic Claude",
          "Twilio · SendGrid",
          "Firebase push",
          "n8n automation",
        ],
      },
    ],
    featureGroups: [
      {
        title: "Commerce core",
        items: [
          "Catalogue with variants, specifications, and per-market pricing",
          "Product data translated across English, Arabic, and Azerbaijani",
          "Elasticsearch product search with a voice-driven command palette",
          "Cart, checkout, and Paymob payment processing with webhooks",
          "Refunds, promo codes, and membership tiers",
          "Reviews, ratings, and product Q&A with moderation and content filtering",
        ],
      },
      {
        title: "Beyond retail",
        items: [
          "Device repair booking with AI price estimation from photos",
          "Sell and trade-in flows with AI valuation of used hardware",
          "Equipment rentals and DIY guides",
          "Powerbank station network",
          "B2B quote requests and product sourcing requests",
          "Supplier onboarding and payouts",
        ],
      },
      {
        title: "Fulfilment & delivery",
        items: [
          "Separate courier service integrated over RabbitMQ",
          "Quiqup third-party dispatch with webhooks and retry jobs",
          "Live courier GPS tracking pushed to customers over WebSocket",
          "Customer-to-courier chat",
          "Store pickup, quick delivery, and per-market delivery pricing",
        ],
      },
      {
        title: "AI",
        items: [
          "Buyobot storefront assistant grounded in the live catalogue",
          "Repair price estimation from damage photographs",
          "Trade-in valuation for used devices",
          "Retrieval before generation — one model call per message, not a tool loop",
          "Admin-visible transcripts of every assistant conversation",
        ],
      },
      {
        title: "Platform & operations",
        items: [
          "Three-layer RBAC: user type, assigned roles, per-user allow/deny overrides",
          "JWT access tokens with refresh rotated through HttpOnly cookies",
          "TOTP multi-factor authentication for staff",
          "Rate limiting, HTML sanitisation, and audit-friendly structured logging",
          "ERPNext product import and order synchronisation",
          "n8n workflows for bulk catalogue automation",
          "Prometheus metrics and health probes via Actuator",
        ],
      },
    ],
    stack: [
      "Next.js",
      "React Native",
      "Expo",
      "TypeScript",
      "Spring Boot",
      "Java 17",
      "PostgreSQL",
      "Elasticsearch",
      "RabbitMQ",
      "WebSocket",
      "Anthropic Claude",
      "Docker",
      "Nginx",
      "Cloudflare",
    ],
    challenges: [
      "Five client applications against one API. Every contract change has to land on a web app that ships continuously and two store-reviewed mobile apps that cannot — so the API only ever grows, and the mobile builds in the field keep working while the storefront moves ahead of them.",
      "Delivery events arrive from a service I do not control the uptime of. The courier backend publishes assignments, status changes, and GPS positions onto a topic exchange; the commerce core binds its own durable queue with a dead-letter path so a restart on either side loses nothing, and duplicated events settle to the same order state rather than double-charging or double-refunding it.",
      "Putting a language model in front of an anonymous, unauthenticated endpoint. The assistant retrieves candidate products server-side and then makes exactly one model call, instead of handing the model a search tool and letting it loop — a tool loop would triple the latency a customer feels and let an abuser run up the bill. Product scope for a market is decided by the server, never by the model.",
      "Seven markets from one catalogue. Currency, delivery pricing, product availability, and language all vary by country, and the country itself is resolved at the CDN edge and passed inward as a header — which means the origin has to be locked to the CDN, or a visitor could simply choose their own market and pricing.",
      "Money has to reconcile in three places at once: the payment provider, the ERP, and our own ledger. Payment state is driven by provider webhooks rather than by the browser returning from a redirect, because the browser is the one participant guaranteed to sometimes not come back.",
      "Leading the team through it. Thirty-nine bounded contexts only stay readable if the boundaries are enforced in review, so the package layout, the handoff documents that front-end and mobile build against, and the migration discipline are as much of the work as the code.",
    ],
    systemDesign:
      "A Spring Boot modular monolith holds the commerce domain: thirty-nine bounded contexts, each a package that owns its own controllers, domain, DTOs, repositories, and services, so a context can be reasoned about — and later extracted — without unpicking the rest. Delivery is already extracted: the courier service runs as its own deployment with Keycloak-issued identities, reached over REST for commands and integrated over a RabbitMQ topic exchange for events, with a dead-letter queue for anything unprocessable. Read-heavy product search is offloaded to Elasticsearch while PostgreSQL stays the single source of truth, with schema changes going through versioned Flyway migrations. Realtime reaches customers over STOMP, authenticated by the JWT carried in the CONNECT frame and verified by HMAC without a database round trip, which is what keeps courier GPS updates cheap enough to broadcast continuously.",
    facts: [
      { label: "Markets", value: "UAE · Saudi Arabia · Qatar · Oman · India · Bahrain · Azerbaijan" },
      { label: "Languages", value: "English · Arabic · Azerbaijani" },
      { label: "Backend", value: "Spring Boot 3.4.2 on Java 17" },
      { label: "Datastores", value: "PostgreSQL with 50 Flyway migrations · Elasticsearch" },
      { label: "Messaging", value: "RabbitMQ topic exchange with dead-letter queue · STOMP over WebSocket" },
      {
        label: "Authentication",
        value: "JWT access tokens with HttpOnly refresh cookies · Google, Apple and Facebook OAuth · TOTP MFA",
      },
      { label: "Mobile", value: "React Native on Expo — native iOS and Android projects, released via EAS" },
      { label: "AI", value: "Anthropic Claude — storefront assistant, repair estimation, trade-in valuation" },
      {
        label: "Delivery",
        value: "In-house courier service over RabbitMQ · Quiqup third-party dispatch",
      },
      { label: "CI/CD", value: "GitHub Actions — backend build and deploy, twelve mobile workflows including Maestro end-to-end runs" },
    ],
    faq: [
      {
        question: "What is the Buyology e-commerce platform?",
        answer:
          "Buyology is a consumer electronics marketplace operating from the UAE across seven markets. The platform is five client applications — a Next.js web storefront, native iOS and Android apps, an operations dashboard, and a marketing site — over a single Spring Boot API organised into thirty-nine bounded contexts.",
      },
      {
        question: "Is there a Buyology app for iOS and Android?",
        answer:
          "Yes. Both are built from one React Native codebase on Expo, with real native projects underneath — an Xcode project for iOS and a Gradle project for Android — and released through EAS to the App Store and Google Play. Both support Apple, Google and Facebook sign-in, push notifications, live order tracking on a map, and customer-to-courier chat; iOS additionally shows delivery progress as a Live Activity on the lock screen.",
      },
      {
        question: "How is the backend architected?",
        answer:
          "As a modular monolith with thirty-nine bounded contexts, each owning its own controllers, domain model, DTOs, repositories and services, plus a separately deployed courier service. The two communicate over REST for commands and a RabbitMQ topic exchange for events, with a durable consumer queue and a dead-letter path. PostgreSQL is the source of truth under versioned Flyway migrations; Elasticsearch serves product search; realtime updates reach clients over STOMP.",
      },
      {
        question: "Where is AI used in the platform?",
        answer:
          "In three places, all on Anthropic's Claude and all grounded in live database state rather than a static prompt: Buyobot, the storefront assistant that answers product and order questions; repair price estimation, which reads photographs of the damage alongside the customer's description; and trade-in valuation for used hardware. The assistant retrieves candidate products server-side and then makes a single model call per message, so latency and cost stay bounded on a public endpoint.",
      },
      {
        question: "How does live delivery tracking work?",
        answer:
          "The courier service publishes assignment, status and location events to a RabbitMQ topic exchange. The commerce core consumes them from its own durable queue and republishes the customer-facing ones over STOMP, where the web and mobile apps subscribe per order. Clients authenticate by sending their JWT in the WebSocket CONNECT frame, which is verified by HMAC without a database lookup.",
      },
      {
        question: "How does the platform handle multiple countries and currencies?",
        answer:
          "Each market has its own regional host. Cloudflare resolves the visitor's country at the edge and Nginx passes it inward as a trusted header, with the origin firewalled to CDN ranges so the header cannot be forged. Catalogue availability, currency, delivery fees and free-shipping thresholds are all scoped per market, and product content is translated across English, Arabic and Azerbaijani.",
      },
    ],
    ogImage: "/projects/buyology-ecommerce/buyology-ecommerce-og.png",
    hero: {
      src: boHome,
      path: "/projects/buyology-ecommerce/buyology-ecommerce-storefront-homepage.png",
      alt: "Buyology storefront homepage showing the search bar over a catalogue of 120,000 products, the category navigation for repair, sell, rent, powerbank stations and DIY, and a giveaway campaign banner",
      caption: "Public storefront — buyology.online",
    },
    thumbnail: {
      src: boCard,
      path: "/projects/buyology-ecommerce/buyology-ecommerce-card.png",
      alt: "Buyology storefront masthead — the promotional delivery bar above the Buyology logo, product search, and category navigation",
      caption: "buyology.online",
    },
    gallery: [
      {
        src: boCatalogue,
        path: "/projects/buyology-ecommerce/buyology-ecommerce-product-catalogue.png",
        alt: "Buyology catalogue page listing products with bestseller badges, category and price-range filters in the sidebar, and a sort control",
        caption: "Catalogue — faceted filtering over the search index",
      },
      {
        src: boVoiceSearch,
        path: "/projects/buyology-ecommerce/buyology-ecommerce-voice-search.png",
        alt: "Buyology search command palette open over the storefront, showing trending product searches and service shortcuts with keyboard navigation hints and a voice input button",
        caption: "Search — a command palette with text and voice input",
      },
      {
        src: boAiTools,
        path: "/projects/buyology-ecommerce/buyology-ecommerce-ai-tools.png",
        alt: "Buyology AI page presenting the assistant tools, including the Buyobot shopping assistant, cart recommender, budget optimizer, tech consultant, and accessory compatibility checker",
        caption: "Buyology AI — the assistant surfaces, grounded in live data",
      },
      {
        src: boAssistant,
        path: "/projects/buyology-ecommerce/buyology-ecommerce-buyobot-assistant.png",
        alt: "The Buyobot chat widget open on the Buyology announcements page, offering quick actions to track an order, handle returns and refunds, find a product, or hand over to a human agent",
        caption: "Buyobot — one Claude call per message, with human handover",
      },
      {
        src: boSignup,
        path: "/projects/buyology-ecommerce/buyology-ecommerce-account-signup.png",
        alt: "Buyology account creation page with a split layout, offering separate personal and business account types alongside an optional giveaway entry",
        caption: "Sign-up — personal and business account types",
      },
    ],
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
