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
   * Early-bird pricing was advertised through July 16, which has passed —
   * flipped to false so the site stops advertising an expired offer. It
   * drives the hero flag and the registration paragraph. CLIENT MUST CONFIRM
   * whether a new early-bird deadline exists; if so, update earlyBirdEnds
   * and flip this back.
   */
  earlyBird: false,
  earlyBirdEnds: "July 16",
} as const;

export const links = {
  tickets: "https://www.zeffy.com/en-US/ticketing/cognitive-security-conference",
  roomBlock:
    "https://res.windsurfercrs.com/ibe/details.aspx?propertyid=16539&nights=1&checkin=8/5/2026&group=0826CSIRB&lang=en-us",
  institute: "https://www.cognitivesecurityinstitute.org",
  fullAgenda: "https://www.cognitivesecurityinstitute.org/csc26-agenda",
  /**
   * Straight to the Zeffy donation form. The institute's /donate page is
   * nothing but a redirect to this URL, so we skip the hop.
   */
  donate: "https://www.zeffy.com/en-US/donation-form/support-our-mission-28",
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

/**
 * Conference-page nav. Hrefs carry the leading "/" so the same nav works
 * from the speaker pages and /institute — on the home page itself the
 * browser still treats "/#speakers" as an in-page fragment jump.
 */
export const navLinks = [
  { href: "/#speakers", label: "SPEAKERS" },
  { href: "/#agenda", label: "AGENDA" },
  { href: "/#venue", label: "VENUE" },
  { href: "/#sponsors", label: "SPONSORS" },
] as const;
