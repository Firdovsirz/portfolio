# Portfolio website — structure & content map

The portfolio is a Next.js 16 (App Router) site, mono-dark editorial design,
deployed at **firdovsirzaev.online**.

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, current roles, selected work, approach, stack, FAQ, CTA. |
| `/about` | Long-form positioning, operating principles, focus areas. |
| `/projects` | List of all production and upcoming projects. |
| `/projects/[slug]` | Project detail — overview, architecture, features, challenges, stack, screenshots. |
| `/research` | Research interests and MSc / MASc direction. |
| `/experience` | Roles at Dithari, AzTU, Buyology. |
| `/education` | BSc at AzTU; planned MSc / MASc 2027. |
| `/publications` | Upcoming publications and research. |
| `/contact` | Contact form + obfuscated email, LinkedIn, GitHub. |
| `/blog`, `/blog/[slug]` | Engineering write-ups (MDX under `content/blog/`). |
| `/llms.txt` | Plain-text site map for LLMs and AI search engines. |

## File layout

```
app/
  layout.tsx               root layout, fonts, metadata, JSON-LD
  globals.css              tailwind v4 + design tokens
  page.tsx                 home
  about/page.tsx
  projects/
    page.tsx               project index
    [slug]/page.tsx        project detail
  research/page.tsx
  experience/page.tsx
  education/page.tsx
  publications/page.tsx
  contact/page.tsx
  blog/
    page.tsx               post index
    [slug]/page.tsx        post detail (MDX)
  llms.txt/route.ts        plain-text site map for LLMs
  sitemap.ts               MetadataRoute.Sitemap (incl. image sitemap)
  robots.ts                MetadataRoute.Robots
components/
  nav.tsx                  sticky header + mobile menu
  footer.tsx
  section.tsx              Section + PageHeader primitives
  project-card.tsx         card; fixed-height plate slot at the foot
  contact-form.tsx         design-only form (no API yet)
  faq.tsx                  Q&A block (also feeds FAQPage schema)
  json-ld.tsx              plain <script type="application/ld+json">
  email-link.tsx           address assembled client-side, never in the HTML
  analytics.tsx            Plausible / GA4, enabled by env var only
lib/
  site.ts                  site metadata, split email, canonical() helper
  projects.ts              project data (single source of truth)
  blog.ts                  MDX frontmatter loading
  faq.ts                   site-level Q&A content
  schema.ts                JSON-LD builders (Person, FAQPage, Breadcrumb, ...)
public/                    static assets (project screenshots under projects/<slug>/)
docs/                      this document, SEO.md, and templates
profile-README.md          GitHub profile README (copy to Firdovsirz/Firdovsirz)
```

## Design system

- **Background** `#0a0a0a` · **Surface** `#111` / `#161616`
- **Foreground** `#ededed` · **Muted** `#a1a1aa`, `#6b7280`
- **Accent** emerald `#34d399` — used sparingly (eyebrows, hover, focus, selection)
- **Typography** — Fraunces (serif headings), Inter (body), Geist Mono (eyebrows/meta)
- **Borders** hairline `#1f1f1f`; hover bumps to `#2a2a2a`
- **Layout** max-width `6xl` (1152px), generous `py-20/28` between sections

## SEO

- `metadataBase` set to `https://firdovsirzaev.online`
- Title template `"%s — Firdovsi Rzaev"` so every page contributes the name
- Keyword list seeded with name variants (Firdovsi, Rzaev, Firdovsi Rzaev) plus role/location
- `sitemap.ts` enumerates static routes + per-project pages
- `robots.ts` references the sitemap
- `Person` JSON-LD in the root layout (name, alternate names, jobTitle, sameAs to GitHub/LinkedIn, alumniOf, knowsAbout, address)
- Per-page `metadata` exports for `<title>`, description, canonical
- Open Graph + Twitter card defaults

### SEO checklist after deploy

1. Add the domain to Google Search Console; submit `firdovsirzaev.online/sitemap.xml`.
2. Same for Bing Webmaster Tools.
3. Verify the canonical URL on every page in DevTools.
4. Add backlinks from high-authority profiles you control: LinkedIn, GitHub profile README, AzTU staff page (if available), ORCID, Google Scholar, Scopus profile, Twitter/X bio.
5. Use exactly `Firdovsi Rzaev` as the display name everywhere — consistency drives entity resolution.
6. Add an `og-image.png` (1200×630) to `public/` and reference it from `openGraph.images` in the root layout.

## Project data flow

All project content lives in `lib/projects.ts`. To add a project:

1. Append a new entry to `projects` with a unique `slug`.
2. The `/projects` index and the `/projects/[slug]` detail page render automatically.
3. `sitemap.ts` picks it up on next build.

## Contact form

`components/contact-form.tsx` is intentionally design-only. To wire it up later:

- **Resend** — add an API route at `app/api/contact/route.ts`, POST from the form, store the API key in an env var, use a verified sender.
- **Web3Forms / Formspree** — change the form's `action` to the provider endpoint; no backend code needed.

## Local development

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint
```

## Project page sections

`app/projects/[slug]/page.tsx` renders a fixed order of sections, each of which
disappears when its data is absent. A small project supplies `summary`,
`description`, `features`, `stack`, `challenges` and `systemDesign` and gets a
plain page; a large one fills in the rest:

| Field | Section |
|---|---|
| `metrics` | scale strip under the hero — headline numbers |
| `facts` | "At a glance" definition list |
| `surfaces` | the client applications the project ships |
| `architecture` | layered diagram, rendered top-to-bottom as the request path |
| `featureGroups` | features grouped by domain — takes precedence over flat `features` |
| `gallery` | captioned screenshots |
| `faq` | Q&A block, also emitted as FAQPage structured data |

`architecture` tiers are ordered surface-inward: put the clients first and the
datastores and third parties last, so the diagram reads as the path a request
takes rather than as an unordered inventory.

## SEO conventions

Read `docs/SEO.md` before changing metadata. Two rules matter most:

1. **Every route must set `alternates: canonical("/its-path")`.** App Router
   metadata is inherited, so a page that omits it silently canonicalises itself
   to the home page.
2. **Titles stay under 60 characters and descriptions between 120 and 160.**
   Projects can override with `metaDescription`; blog posts with `seoTitle` /
   `seoDescription` frontmatter. `docs/SEO.md` has a one-liner that audits every
   built page.

Project screenshots live in `public/projects/<slug>/` with descriptive,
hyphenated filenames, are downscaled to 1920px on the long edge, and are
declared in `lib/projects.ts` with both a static import (`src`) and the stable
public path (`path`, used by the image sitemap).

## Project card anatomy

Every card ends in a fixed 96px **plate** — the colophon slot of a printed
catalogue entry:

- a project with a `thumbnail` shows a pre-cropped strip of its real interface
- every other project shows its full stack

Because the slot is the same height either way, an image adds **zero**
differential height and a card with one never stretches its grid row. Cards
measure identically at 1280px and 768px.

Two fields, deliberately separate:

| Field | Used by | What it is |
|---|---|---|
| `hero` | project page header | the full-page screenshot |
| `thumbnail` | card plate | a pre-cut strip, sized for the 96px slot |

Cropping a card plate (macOS `sips --cropOffset` is a delta from the *centred*
crop and clamps negatives, so it cannot take a region off the top — use a
canvas instead). Pick a region whose aspect matches the plate's widest form,
526x96 = 5.48:1, so it fits exactly on desktop and crops from the right on
narrower cards.

Screenshots of light UIs would glare on the dark background, so
`.project-plate` is damped in `globals.css` under `:root[data-theme="dark"]` —
**not** Tailwind's `dark:` variant, which tracks `prefers-color-scheme` and
would desync from this site's theme toggle.
