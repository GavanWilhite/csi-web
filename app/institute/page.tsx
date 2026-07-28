import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ConferenceBanner } from "@/components/institute/ConferenceBanner";
import { Mission } from "@/components/institute/Mission";
import { Focus5 } from "@/components/institute/Focus5";
import { Research } from "@/components/institute/Research";
import { Publications } from "@/components/institute/Publications";
import { Programmes } from "@/components/institute/Programmes";
import { InstituteEvents } from "@/components/institute/InstituteEvents";
import { Team } from "@/components/institute/Team";
import { Partners } from "@/components/institute/Partners";
import { Join } from "@/components/institute/Join";
import { Support } from "@/components/institute/Support";
import { instituteNavLinks, mission } from "@/lib/institute";
import { links } from "@/lib/event";

export const metadata: Metadata = {
  title: "Cognitive Security Institute",
  description: mission.deck,
  openGraph: {
    title: "Cognitive Security Institute",
    description: mission.deck,
    type: "website",
  },
};

/**
 * The institute, as a single-page scroller built the same way as the
 * conference page: one route, stacked full-width sections, sticky nav with
 * click-to-scroll anchors. Six of the eleven sections are in the menu; the
 * rest sit immediately after the item that covers them.
 */
export default function InstitutePage() {
  return (
    <>
      <a className="skipLink" href="#main">
        SKIP TO CONTENT
      </a>
      <ConferenceBanner />
      <Nav
        items={instituteNavLinks}
        cta={{
          href: links.donate,
          label: "DONATE",
          drawerLabel: "DONATE",
          icon: "volunteer_activism",
        }}
      />
      <main id="main">
        <Mission />
        <Focus5 />
        <Research />
        <Publications />
        <Programmes />
        <InstituteEvents />
        <Team />
        <Partners />
        <Join />
        <Support />
      </main>
      <Footer />
    </>
  );
}
