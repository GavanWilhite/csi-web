/**
 * Renders a schema.org graph into the page.
 *
 * Server component, so the JSON is in the prerendered HTML where crawlers
 * that do not run JavaScript will see it — which is the entire point.
 *
 * The payload is our own build-time data, never user input, so
 * dangerouslySetInnerHTML is safe here; JSON.stringify is still escaped for
 * "<" so a stray sequence in a bio cannot close the script tag early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
