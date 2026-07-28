/**
 * Single source of truth for event facts and outbound URLs.
 * Copy is taken from the design export's conference page.
 */

export const event = {
  name: "Cognitive Security Conference 2026",
  shortName: "CSC 2026",
  dates: "August 6–7, 2026",
  venue: "Tuscany Suites & Casino",
  venueAddress: "255 E Flamingo Rd, Las Vegas, NV 89169",
  venueRooms: "Firenze · Tuscany · Siena",
  capacity: 300,
  /**
   * Early-bird pricing was advertised through July 16. Flip to false once that
   * has passed — it drives the hero flag and the registration paragraph.
   * Left true to match the design export; confirm with the client.
   */
  earlyBird: true,
  earlyBirdEnds: "July 16",
} as const;

export const links = {
  tickets: "https://www.zeffy.com/en-US/ticketing/cognitive-security-conference",
  roomBlock:
    "https://res.windsurfercrs.com/ibe/details.aspx?propertyid=16539&nights=1&checkin=8/5/2026&group=0826CSIRB&lang=en-us",
  institute: "https://www.cognitivesecurityinstitute.org",
  fullRoster:
    "https://www.cognitivesecurityinstitute.org/cognitive-security-conference-speakers",
  fullAgenda: "https://www.cognitivesecurityinstitute.org/csc26-agenda",
  donate: "https://www.cognitivesecurityinstitute.org/donate",
  contact: "https://www.cognitivesecurityinstitute.org/contact",
  disclaimer: "https://www.cognitivesecurityinstitute.org/disclaimer",
  sitemap: "https://www.cognitivesecurityinstitute.org/sitemap",
  prospectusMailto:
    "mailto:info@cognitivesecurityinstitute.org?subject=I'm%20interested%20in%20the%20CSC%202026%20Prospectus",
  travelBriefHumanRisk:
    "https://www.cognitivesecurityinstitute.org/_files/ugd/6aeb2e_f74dceb6e7b34bde996850ea4c557c7f.pdf",
  travelBriefCogWar:
    "https://www.cognitivesecurityinstitute.org/_files/ugd/6aeb2e_4adf13c2a99f4f82a239c897aa139774.pdf",
} as const;

export const navLinks = [
  { href: "#speakers", label: "SPEAKERS" },
  { href: "#agenda", label: "AGENDA" },
  { href: "#venue", label: "VENUE" },
  { href: "#sponsors", label: "SPONSORS" },
] as const;
