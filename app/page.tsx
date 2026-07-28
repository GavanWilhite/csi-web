import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Keynotes } from "@/components/Keynotes";
import { Tracks } from "@/components/Tracks";
import { Agenda } from "@/components/Agenda";
import { Sponsors } from "@/components/Sponsors";
import { Venue } from "@/components/Venue";
import { TravelBriefs } from "@/components/TravelBriefs";
import { TicketsCta } from "@/components/TicketsCta";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { eventSchema, organizationSchema, graph } from "@/lib/schema";
import { resolveSiteUrl } from "@/lib/site";

export default function ConferencePage() {
  const base = resolveSiteUrl();
  return (
    <>
      {/* Event + organiser, so the conference is machine-readable without
          anyone having to parse the agenda out of the markup. */}
      <JsonLd data={graph(base, [eventSchema(base), organizationSchema(base)])} />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Keynotes />
        <Tracks />
        <Agenda />
        <Sponsors />
        <Venue />
        <TravelBriefs />
        <TicketsCta />
      </main>
      <Footer />
    </>
  );
}
