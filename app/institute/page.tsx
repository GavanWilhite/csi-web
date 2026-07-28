import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ConferenceBanner } from "@/components/institute/ConferenceBanner";
import { Mission } from "@/components/institute/Mission";
import { instituteLinks } from "@/lib/institute";
import { Pillars } from "@/components/institute/Pillars";
import { Projects } from "@/components/institute/Projects";
import { Publications } from "@/components/institute/Publications";
import { InstituteEvents } from "@/components/institute/InstituteEvents";
import { Team } from "@/components/institute/Team";
import { Watch } from "@/components/institute/Watch";
import { GetInvolved } from "@/components/institute/GetInvolved";
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
          href: instituteLinks.apply,
          label: "APPLY",
          drawerLabel: "APPLY FOR MEMBERSHIP",
          icon: "badge",
        }}
      />
      <main id="main">
        <Mission />
        {/* Live content sits high: the channel is the only thing on this page
            that changes on its own. */}
        {/* Pillars sit as a quiet strip immediately above the channel. */}
        <Pillars />
        <Watch />
        <Projects />
        <Publications />
        <InstituteEvents />
        <Team />
        <GetInvolved />
      </main>
      <Footer />
    </>
  );
}
