import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import NextImage, { type ImageProps } from "next/image";
import type { ComponentPropsWithoutRef } from "react";

// Co-located post images: import them in the .mdx, then render with <Image />.
//   import diagram from "./diagram.png";
//   <Image src={diagram} alt="System diagram" caption="Optional caption" />
// Static imports give next/image the intrinsic width/height automatically.
function Figure({
  caption,
  alt,
  ...props
}: ImageProps & { caption?: string }) {
  return (
    <figure className="my-8">
      <NextImage
        alt={alt}
        sizes="(max-width: 768px) 100vw, 768px"
        className="rounded-sm border hairline w-full h-auto"
        {...props}
      />
      {caption && (
        <figcaption className="mono text-xs text-muted-2 uppercase tracking-widest mt-3 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Global element styling for all rendered MDX (blog posts).
// Maps native HTML tags to the portfolio's serif / mono / accent system.
const components: MDXComponents = {
  h1: (props) => (
    <h1
      className="serif text-3xl md:text-4xl tracking-tight mt-14 mb-5 first:mt-0"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="serif text-2xl md:text-3xl tracking-tight mt-12 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="serif text-xl md:text-2xl tracking-tight mt-10 mb-3" {...props} />
  ),
  p: (props) => (
    <p className="text-muted leading-relaxed my-5 text-[1.05rem]" {...props} />
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent link-underline"
          {...props}
        />
      );
    }
    return <Link href={href} className="text-accent link-underline" {...props} />;
  },
  ul: (props) => (
    <ul className="my-5 space-y-2 text-muted leading-relaxed list-none pl-0" {...props} />
  ),
  ol: (props) => (
    <ol className="my-5 space-y-2 text-muted leading-relaxed list-decimal pl-6" {...props} />
  ),
  li: (props) => (
    <li
      className="flex gap-3 [ol_&]:block"
      {...props}
    >
      <span aria-hidden className="text-accent mono text-xs mt-2 shrink-0 [ol_&]:hidden">
        ▸
      </span>
      <span className="[ol_&]:inline">{props.children}</span>
    </li>
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l hairline pl-5 my-6 text-muted italic"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-0 border-t hairline" />,
  code: (props) => (
    <code
      className="mono text-[0.85em] bg-[var(--surface-2)] border hairline rounded px-1.5 py-0.5"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mono text-sm bg-[var(--surface)] border hairline rounded-sm p-5 my-6 overflow-x-auto leading-relaxed [&_code]:bg-transparent [&_code]:border-0 [&_code]:p-0"
      {...props}
    />
  ),
  strong: (props) => <strong className="text-foreground font-semibold" {...props} />,
  // Available in MDX as <Image src={imported} alt="..." caption="..." />.
  Image: Figure,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-sm border hairline my-6 w-full" alt="" {...props} />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="mono text-xs uppercase tracking-widest text-muted-2 text-left border-b hairline py-2 pr-6"
      {...props}
    />
  ),
  td: (props) => (
    <td className="text-muted border-b hairline py-2 pr-6 align-top" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
