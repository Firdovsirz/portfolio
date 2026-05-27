import { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 lg:px-10 py-20 md:py-28">
      {(eyebrow || title) && (
        <header className="mb-12 md:mb-16">
          {eyebrow && (
            <p className="mono text-xs text-accent tracking-widest uppercase mb-4">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="serif text-3xl md:text-5xl tracking-tight max-w-3xl">
              {title}
            </h2>
          )}
        </header>
      )}
      {children}
    </section>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mx-auto max-w-6xl px-6 lg:px-10 pt-20 md:pt-28 pb-12">
      <p className="mono text-xs text-accent tracking-widest uppercase mb-5">
        {eyebrow}
      </p>
      <h1 className="serif text-4xl md:text-6xl tracking-tight max-w-4xl">
        {title}
      </h1>
      {intro && (
        <p className="text-muted text-lg md:text-xl mt-6 max-w-2xl leading-relaxed">
          {intro}
        </p>
      )}
    </header>
  );
}
