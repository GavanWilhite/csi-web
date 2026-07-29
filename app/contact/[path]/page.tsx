import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TextPage } from "@/components/TextPage";
import { EmailAddress } from "@/components/EmailAddress";
import { contactPathBySlug, contactPaths } from "@/lib/contact";

/**
 * One page per contact path.
 *
 * These are endpoints on purpose. Each is intended to BECOME A FORM: when a
 * hosted form exists for, say, sponsorship, this page stops showing an
 * address and starts showing that form, and every link to
 * /contact/sponsorship across the site keeps working untouched. That is why
 * the in-context CTAs link here rather than carrying their own mailto.
 *
 * All prerender statically from lib/contact.ts; unknown slugs 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return contactPaths.map(({ slug }) => ({ path: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string }>;
}): Promise<Metadata> {
  const { path } = await params;
  const p = contactPathBySlug(path);
  if (!p) return {};
  return {
    title: `${p.title} — Cognitive Security Institute`,
    description: p.deck,
  };
}

export default async function ContactPathPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;
  const p = contactPathBySlug(path);
  if (!p) notFound();

  return (
    <TextPage
      title={p.title}
      deck={p.deck}
      back={{ href: "/contact", label: "← ALL WAYS TO GET IN TOUCH" }}
    >
      <p>
        Email us and we will come back to you. Please put{" "}
        <strong>{p.subject}</strong> in the subject line — the link below fills
        it in for you.
      </p>

      <EmailAddress subject={p.subject} />

      {p.asks && (
        <>
          <h2>Please include</h2>
          <ul>
            {p.asks.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </>
      )}
    </TextPage>
  );
}
