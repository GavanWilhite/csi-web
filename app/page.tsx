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

export default function ConferencePage() {
  return (
    <>
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
