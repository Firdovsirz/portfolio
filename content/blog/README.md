# Adding a blog post

Every post is a **self-contained folder** in `content/blog/`. The folder name
becomes the URL slug and the post appears automatically — no code changes, no
registration, no rebuild config. The loader ([`lib/blog.ts`](../../lib/blog.ts))
scans this directory at build time.

## Folder layout

```
content/blog/
  my-post-slug/            ← folder name = URL  → /blog/my-post-slug
    index.mdx              ← REQUIRED: the post itself
    cover.png              ← OPTIONAL: hero/cover image (see below)
    architecture.png       ← any other images, referenced from index.mdx
    chart.png
```

A folder is only treated as a post if it contains an `index.mdx`. Files like
this README are ignored.

## `index.mdx` frontmatter

```mdx
---
title: "Your Post Title"
date: "2026-05-30"          # ISO date; posts sort newest-first by this
summary: "One-or-two sentence blurb for the list card + SEO description."
tags: ["backend", "system-design"]
draft: false                # optional; true = visible in `npm run dev`, hidden in prod
---
```

- `summary` is canonical. `description:` is also accepted as an alias.
- `tags` and `draft` are optional.

## The cover image

Name it **`cover.png`** and drop it in the post folder. It is picked up by
convention and shown in **two** places automatically:

1. The card on the `/blog` index.
2. The hero at the top of the post page.

You do **not** import or reference the cover inside `index.mdx` — the page
renders it for you. Recommended ratio ~1200×630. If a post has no `cover.png`,
both surfaces simply render without an image.

## Other images (inside the body)

Import them and use the `<Image>` component (available globally in MDX, no
import needed for the component). Static imports give correct dimensions:

```mdx
import architecture from "./architecture.png";

<Image
  src={architecture}
  alt="Describe the diagram for accessibility"
  caption="Optional caption shown under the image"
/>
```

## Writing the body

Standard Markdown + GFM (tables, etc.). Element styling lives in
[`mdx-components.tsx`](../../mdx-components.tsx) and matches the site's
serif / mono / accent system. To put a literal `<` in a table cell, write
`&lt;` so MDX doesn't parse it as a tag.

## Preview

```bash
npm run dev     # drafts visible, hot-reload
npm run build   # what production ships (drafts excluded)
```
