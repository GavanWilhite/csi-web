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
  institute: "/institute",
  fullAgenda: "/csc26-agenda",
  /**
   * Straight to the Zeffy donation form. The institute's /donate page is
   * nothing but a redirect to this URL, so we skip the hop.
   */
  donate: "https://www.zeffy.com/en-US/donation-form/support-our-mission-28",
  contact: "/contact",
  disclaimer: "/disclaimer",
  sitemap: "/sitemap",
  /**
   * Self-hosted. These were served from the Wix site's own file store
   * (/_files/ugd/…), which dies with it; the PDFs are byte-identical copies
   * of what those URLs served, captured in the 2026-07-27 crawl.
   */
  travelBriefHumanRisk:
    "/assets/documents/CSC-2026-Human-Risk-Travel-Justification-Brief.pdf",
  travelBriefCogWar:
    "/assets/documents/CSC-2026-Cognitive-Warfare-Travel-Justification-Brief.pdf",
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
  { href: "/institute", label: "INSTITUTE" },
] as const;
