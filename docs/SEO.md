# SEO & GEO — audit response

Reference: WebiMax SEO audit for `firdovsirzaev.online` (overall grade **B**, 13
recommendations). This file records what was fixed in the codebase, and what can
only be done outside it — DNS, hosting, and off-site work.

---

## 1. Fixed in this repository

### Title tag — was 63 characters (target 50–60)

`lib/site.ts` → `site.title` is now **"Firdovsi Rzaev — Research Software Engineer in Baku"** (51 characters).
It keeps the name, the exact phrase *Research Software Engineer*, and adds the
location for local relevance.

Sub-pages render as `%s — Firdovsi Rzaev`, so every page title stays under 60.
Two blog headlines were too long once the suffix was added; they now carry a
`seoTitle` in their MDX frontmatter, used for `<title>` only — the on-page
headline is unchanged.

### Meta description — was 224 characters (target 120–160)

`site.description` is now 138 characters. **Every** route was re-checked and
tuned into the 120–160 window:

- static pages: edited in place
- projects: new optional `metaDescription` field on `Project` (`lib/projects.ts`),
  used for `<meta name="description">` while the longer `summary` keeps working
  as on-page and card copy
- blog posts: new optional `seoDescription` frontmatter field

Re-run the check after editing copy:

```bash
npm run build
node -e '
const fs=require("fs"),path=require("path");
function walk(d,o=[]){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);e.isDirectory()?walk(p,o):e.name.endsWith(".html")&&o.push(p)}return o}
for(const f of walk(".next/server/app").sort()){const h=fs.readFileSync(f,"utf8");
const t=(h.match(/<title>([^<]*)<\/title>/)||[])[1],d=(h.match(/<meta name="description" content="([^"]*)"/)||[])[1];
if(t||d)console.log(String((t||"").length).padStart(3),String((d||"").length).padStart(3),f)}'
```

### Canonical tags pointed every page at the home page

This was the most damaging issue found, and it was not in the audit's list.
`alternates.canonical` was set once in the root layout. App Router metadata is
inherited, so `/projects`, `/blog`, every project page and every post declared
`<link rel="canonical" href="https://firdovsirzaev.online">` — telling search
engines that every page on the site was a duplicate of the home page.

Fixed with the `canonical()` helper in `lib/site.ts`, applied per route. **Any
new page must set `alternates: canonical("/its-path")`** or it will inherit the
home-page canonical again.

This is also what makes the audit's SERP snippet preview correct: each URL now
maps to itself, with its own title and its own description.

### Hreflang — was absent

`canonical()` also emits self-referencing `en` and `x-default` alternates. The
site is English-only; if Azerbaijani pages are ever added, extend that helper
rather than each page.

### Page text content — home page was 376 words ("thin content")

Home page is now ~1,080 words, without changing the design language:

- a second hero paragraph naming the concrete systems
- a new **Approach** section (three substantive columns)
- an eight-question **FAQ** section

The Machine Science project page carries ~1,270 words on its own.

### FAQ / Q&A content (GEO "Answer Alignment" — was failing)

- `lib/faq.ts` — eight site-level questions and answers, rendered on the home page
- `Project.faq` — per-project Q&A; the Machine Science page has six
- Both render as real `<dl>` markup (no JS accordion) **and** emit `FAQPage`
  structured data, so answers are quotable by generative engines

Answers are written to stand alone, because a generative engine will quote one
without the page around it.

### llms.txt — was missing

`app/llms.txt/route.ts` serves `/llms.txt` as a statically generated plain-text
map following the llmstxt.org convention: summary, page list, every project with
its stack and live URL, blog posts, the full FAQ, and contact routes. It is
generated from the same data as the site, so it cannot drift.

### Analytics — none detected

`components/analytics.tsx` supports Plausible and GA4, both switched on purely by
environment variable, so nothing ships unless configured. **This is the one item
that still needs an action from you** — set one of these and redeploy:

```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=firdovsirzaev.online   # privacy-friendly, no cookie banner
# or
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

See `.env.example`. Both load with `afterInteractive`, so neither blocks paint.

### Local business schema — was missing

`lib/schema.ts` → `localBusinessLd`, a `ProfessionalService` (a `LocalBusiness`
subtype) with locality, region, country, geo coordinates, area served, service
types, and `founder` linked to the `Person` node. No street address and no phone
number are published, because neither is public information.

### Clear-text email addresses

`components/email-link.tsx` renders `firdovsirz [at] gmail [dot] com` in the
served HTML and assembles the real `mailto:` link in the browser after
hydration. The address is never a literal string in any built file — the two
halves live apart in `lib/site.ts` and are joined at runtime.

Replaced in the footer, the home CTA, the contact page, and the contact form.
The address was also removed from the `Person` JSON-LD (a `contactPoint`
pointing at `/contact` replaces it), and the form's sample-address placeholder
was replaced with plain text.

Verify after any change:

```bash
grep -rhoE '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}' .next/server/app --include="*.html" | sort -u
grep -rho 'mailto:[^"]*' .next/server/app --include="*.html" | sort -u
# both should print nothing
```

### Inline styles

The theme bootstrap script and the theme toggle used to write
`document.documentElement.style.colorScheme`, which put an inline `style`
attribute on `<html>`. `globals.css` already declares `color-scheme` per
`[data-theme]`, so both writes were removed and only the attribute is set.

Remaining inline styles come from `next/image`, which emits
`style="color:transparent"` on optimised images. That is framework-generated and
not removable without giving up image optimisation, which would cost far more
than the check is worth.

### Site load speed (partial — the rest is server-side, see §2)

- The three JSON-LD blocks were being injected through `next/script` with
  `strategy="beforeInteractive"`, routing inert data through the client script
  loader. They are now plain `<script type="application/ld+json">` tags (the
  approach Next.js documents), merged into a single `@graph`.
- Removed a `preconnect` and a `dns-prefetch` to `fonts.gstatic.com`.
  `next/font/google` self-hosts font files with the rest of the static assets and
  the browser never contacts Google, so those two hints only bought a wasted DNS
  lookup and TLS handshake on every page load.
- Project screenshots were downscaled to 1920px on the long edge before being
  committed, and are served through `next/image` as AVIF/WebP with blur
  placeholders and explicit `sizes`.

### Structured data added along the way

| Page | Nodes |
|---|---|
| every page | `Person`, `WebSite`, `ProfilePage`, `ProfessionalService` |
| home | + `FAQPage` |
| /projects | + `BreadcrumbList`, `ItemList` |
| /projects/[slug] | + `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| /blog/[slug] | + `BlogPosting`, `BreadcrumbList` |
| /publications | + `BreadcrumbList`, `ScholarlyArticle` per paper |

Validate with the [Rich Results Test](https://search.google.com/test/rich-results)
and the [Schema Markup Validator](https://validator.schema.org/) once deployed.

---

## 2. Server / DNS — outside this repository

### SPF record (audit: missing)

The domain publishes a valid DMARC record (`p=quarantine`, reporting to
`onsecureserver.net`) but no SPF record, so receiving servers have no way to
confirm which hosts may send as `@firdovsirzaev.online`.

Add **one** `TXT` record at the root of the zone (Cloudflare DNS — the
nameservers are `ashley/west.ns.cloudflare.com`):

| Type | Name | Value |
|---|---|---|
| TXT | `@` | `v=spf1 include:secureserver.net -all` |

The `include:` must match whoever actually sends your mail — the DMARC reporting
address points at Secureserver (GoDaddy), so that is the likely value; confirm
with your mail provider before publishing. If the domain sends **no** mail at
all, publish `v=spf1 -all` instead.

Only ever publish one SPF record; two records make SPF fail outright.

### Redirect chain (audit: "Avoid multiple page redirects", 0.63s mobile / 0.19s desktop)

The origin is nginx 1.24.0 behind Cloudflare. A request currently takes more than
one hop before it reaches the final URL. Collapse it so any entry point lands in
a **single** 301:

```nginx
# One server block for every non-canonical entry point.
server {
    listen 80;
    listen 443 ssl;
    server_name www.firdovsirzaev.online firdovsirzaev.online;

    # http -> https AND www -> apex in one hop, preserving the path.
    if ($scheme = http) { return 301 https://firdovsirzaev.online$request_uri; }
    if ($host = www.firdovsirzaev.online) { return 301 https://firdovsirzaev.online$request_uri; }
    ...
}
```

Also check Cloudflare: an "Always Use HTTPS" rule plus an origin-side redirect
produces exactly the double hop the audit measured. Keep the redirect in one
place, not both. Verify with:

```bash
curl -sIL http://firdovsirzaev.online/projects | grep -E '^HTTP|^location'
# should show at most one 301 before the 200
```

### Server response time (0.688s)

All 29 routes are prerendered as static HTML, so nothing in the application is
doing per-request work. A 0.688s TTFB is origin/proxy latency: check nginx
`gzip`/`brotli` on the static output, and consider letting Cloudflare cache the
prerendered HTML at the edge rather than proxying every hit to Baku.

### Image compression (audit: "Images 3% compressed of 0.05MB")

Images are served from `/_next/image` as AVIF/WebP, which are already compressed
formats — the audit measures transfer compression (gzip/brotli) and reports a low
figure because re-compressing them would be pointless. Do **not** add
`gzip_types image/*` to nginx; it costs CPU and saves nothing.

---

## 3. Off-site — the actual grade ceiling

### Link building (audit: F on Links, high priority)

Domain Strength 1/100, 23 backlinks from 21 referring domains, **all nofollow**,
20 of them from a single country. That is the one factor holding the overall
grade at B, and no code change can move it. Realistic, non-spammy sources for
this profile:

1. **Institutional pages** — ask AzTU to credit the developer on the Machine
   Science journal, Researchers Portal, and E-Grant pages with a followed link.
   `.edu.az` links carry real authority and are entirely legitimate here.
2. **The journal itself** — a "platform developed by" line in the journal's
   colophon or About page.
3. **GitHub** — a link in the profile README and in each project repo's About
   field.
4. **ORCID, Google Scholar, LinkedIn** — once the AI-driven digital
   transformation paper is published, these profiles link back and are trusted.
5. **Conference and meetup listings** — speaker bios normally carry a followed
   link.
6. **Write-ups** — the blog posts are strong enough to submit to newsletters and
   aggregators in the research-software and edtech space.

Aim for a handful of relevant followed links rather than volume.

### Google Business Profile (audit: missing)

Create a profile at [business.google.com](https://business.google.com) for the
engineering practice in Baku and link it to `firdovsirzaev.online`. The
`ProfessionalService` schema in §1 is the on-site half of this; the profile is
the off-site half, and the audit's three Local SEO checks all depend on it.

### Core Web Vitals

Google reports "insufficient real-world speed data". This resolves itself as
traffic arrives — lab scores are already 98 mobile / 100 desktop. Claim the site
in Google Search Console and Bing Webmaster Tools, submit
`https://firdovsirzaev.online/sitemap.xml`, then fill in
`metadata.verification` in `app/layout.tsx` with the verification tokens.
