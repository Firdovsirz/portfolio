import { Section } from "@/components/section";
import type { FaqEntry } from "@/lib/faq";

/**
 * Question-and-answer block. Rendered as real markup rather than a JS
 * accordion so every answer is present in the HTML for search engines,
 * generative engines, and readers without JavaScript.
 */
export function Faq({
  entries,
  eyebrow = "FAQ",
  title,
  id = "faq",
}: {
  entries: FaqEntry[];
  eyebrow?: string;
  title?: string;
  id?: string;
}) {
  if (entries.length === 0) return null;

  return (
    <Section id={id} eyebrow={eyebrow} title={title}>
      <dl className="space-y-px bg-[var(--border)]">
        {entries.map((entry) => (
          <div key={entry.question} className="bg-background py-8 first:pt-0">
            <dt className="serif text-xl md:text-2xl tracking-tight max-w-3xl">
              {entry.question}
            </dt>
            <dd className="text-muted mt-3 max-w-3xl leading-relaxed">{entry.answer}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
