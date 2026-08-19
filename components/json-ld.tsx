import { serializeLd } from "@/lib/schema";

/**
 * Renders structured data as a plain `application/ld+json` tag. Deliberately
 * not `next/script` — JSON-LD is never executed, so routing it through the
 * script loader only adds client-side work.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeLd(data) }}
    />
  );
}
