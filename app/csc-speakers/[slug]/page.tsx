import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SpeakerProfile } from "@/components/SpeakerProfile";
import { speakerBySlug, speakers } from "@/lib/speakers";

/**
 * Per-speaker pages at the same URL shape as the source site
 * (/csc-speakers/<slug>), so links people have already shared keep
 * resolving. All 35 prerender statically; unknown slugs 404.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return speakers.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const speaker = speakerBySlug(slug);
  if (!speaker) return {};

  const description = `${speaker.tagline} — ${speaker.trackLabel}, Cognitive Security Conference 2026. August 6–7 · Las Vegas.`;
  return {
    title: `${speaker.name} — CSC 2026`,
    description,
    openGraph: {
      title: `${speaker.name} — CSC 2026`,
      description,
      type: "profile",
      /*
        OG image only where the headshot clears the size floor: 16 of the 35
        exist at 190×190, under the 200×200 minimum scrapers accept — for
        those, no image beats a broken card.
      */
      ...(speaker.headshotLowRes
        ? {}
        : {
            images: [
              {
                url: speaker.headshot,
                width: speaker.headshotWidth,
                height: speaker.headshotHeight,
                alt: speaker.name,
              },
            ],
          }),
    },
  };
}

export default async function SpeakerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const speaker = speakerBySlug(slug);
  if (!speaker) notFound();

  return (
    <>
      <a className="skipLink" href="#main">
        SKIP TO CONTENT
      </a>
      <Nav />
      <main id="main">
        <SpeakerProfile speaker={speaker} />
      </main>
      <Footer />
    </>
  );
}
