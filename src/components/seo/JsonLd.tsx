// Renders a schema.org JSON-LD <script>. Server component — the object is serialised at
// render time and emitted inline so crawlers see structured data on first byte.
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify already escapes quotes; `<` is escaped so the string can't break out of the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
