# Portfolio website — structure & content map

The portfolio is a Next.js 16 (App Router) site, mono-dark editorial design,
deployed at **firdovsirzaev.online**.

## Pages

| Route | Purpose |
|---|---|
| `/` | Hero, current roles, selected work, stack, CTA. |
| `/about` | Long-form positioning, operating principles, focus areas. |
| `/projects` | List of all production and upcoming projects. |
| `/projects/[slug]` | Project detail — overview, architecture, features, challenges, stack, screenshots. |
| `/research` | Research interests and MSc / MASc direction. |
| `/experience` | Roles at Dithari, AzTU, Buyology. |
| `/education` | BSc at AzTU; planned MSc / MASc 2027. |
| `/publications` | Upcoming publications and research. |
| `/contact` | Contact form + email, LinkedIn, GitHub. |

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
  sitemap.ts               MetadataRoute.Sitemap
  robots.ts                MetadataRoute.Robots
components/
  nav.tsx                  sticky header + mobile menu
  footer.tsx
  section.tsx              Section + PageHeader primitives
  project-card.tsx
  contact-form.tsx         design-only form (no API yet)
lib/
  site.ts                  site metadata (name, url, social, nav)
  projects.ts              project data (single source of truth)
public/                    static assets
docs/                      this document + templates
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
