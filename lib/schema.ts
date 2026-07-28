/**
 * schema.org JSON-LD, generated from the same typed content the pages render.
 *
 * This is the part of "machine readable" that consumers actually use: search
 * engines parse it for rich results, and assistants that fetch a page get the
 * facts without having to infer them from markup. It is generated rather than
 * hand-written so it cannot drift from what a human sees — a structured-data
 * block that disagrees with the page is worse than none.
 *
 * ⚠️ NEVER put the contact address in here. JSON-LD is plain text in the
 * served HTML, so an `email` property would hand the address to every
 * harvester on the internet and undo lib/contact.ts entirely. There is no
 * schema.org field worth that.
 */

import { event, links } from "./event";
import { mission, instituteLinks } from "./institute";
import { speakers, type Speaker } from "./speakers";

const ORG_NAME = "Cognitive Security Institute";

const abs = (base: string, path: string) => new URL(path, base).toString();

/** The institute itself. Referenced by @id from the event graph. */
export function organizationSchema(base: string) {
  return {
    "@type": "NGO",
    "@id": abs(base, "/institute#organization"),
    name: ORG_NAME,
    alternateName: "CSI",
    url: abs(base, "/institute"),
    logo: abs(base, "/assets/csi-logo-horizontal-white.png"),
    description: mission.deck,
    /* Public registration facts, already printed in the site footer. */
    nonprofitStatus: "Nonprofit501c3",
    taxID: "92-3238363",
    sameAs: [
      instituteLinks.youtube,
      instituteLinks.cat,
      instituteLinks.evilDigitalTwin,
    ],
  };
}

function personSchema(base: string, s: Speaker) {
  return {
    "@type": "Person",
    "@id": abs(base, `/csc-speakers/${s.slug}#person`),
    name: s.properName,
    url: abs(base, `/csc-speakers/${s.slug}`),
    disambiguatingDescription: s.tagline,
    image: abs(base, s.headshot),
    ...(s.linkedin ? { sameAs: [s.linkedin] } : {}),
  };
}

/** The conference. Speakers are performers; the venue is a Place. */
export function eventSchema(base: string) {
  return {
    "@type": "Event",
    "@id": abs(base, "/#event"),
    name: event.name,
    url: abs(base, "/"),
    description:
      "Two days on human risk, AI security, and cognitive warfare with the people defining the field.",
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    maximumAttendeeCapacity: event.capacity,
    location: {
      "@type": "Place",
      name: event.venue,
      address: { "@type": "PostalAddress", ...event.venueAddressParts },
    },
    organizer: { "@id": abs(base, "/institute#organization") },
    /* Offer carries no price on purpose: pricing lives on Zeffy and would go
       stale here. A URL-only Offer is valid; it just cannot show a price in
       rich results, which is the correct trade. */
    offers: {
      "@type": "Offer",
      url: links.tickets,
      availability: "https://schema.org/InStock",
    },
    performer: speakers.map((s) => personSchema(base, s)),
  };
}

/** One @graph per page keeps the nodes cross-referenceable by @id. */
export const graph = (base: string, nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});

export function speakerPageSchema(base: string, s: Speaker) {
  return graph(base, [
    {
      ...personSchema(base, s),
      description: s.bio[0],
      ...(s.credentials.length ? { hasCredential: s.credentials } : {}),
      performerIn: { "@id": abs(base, "/#event") },
    },
    organizationSchema(base),
  ]);
}
