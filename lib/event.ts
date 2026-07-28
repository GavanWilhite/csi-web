/**
 * Single source of truth for event facts and outbound URLs.
 * Copy is taken from the design export's conference page.
 */

/**
 * The venue address in the split form schema.org's PostalAddress wants.
 * This is the SOURCE: the human-readable one-liner is derived from it below,
 * so there is only ever one address to edit.
 */
const venueAddressParts = {
  streetAddress: "255 E Flamingo Rd",
  addressLocality: "Las Vegas",
  addressRegion: "NV",
  postalCode: "89169",
  addressCountry: "US",
} as const;

export const event = {
  name: "Cognitive Security Conference 2026",
  shortName: "CSC 2026",
  dates: "August 6–7, 2026",
  venue: "Tuscany Suites & Casino",
  /** Derived. Edit venueAddressParts, not this. */
  venueAddress:
    `${venueAddressParts.streetAddress}, ${venueAddressParts.addressLocality}, ` +
    `${venueAddressParts.addressRegion} ${venueAddressParts.postalCode}`,
  venueRooms: "Firenze · Tuscany · Siena",
  capacity: 300,
  /**
   * ISO-8601, for schema.org. These and `dates` above are two renderings of
   * one fact, which is a drift risk that cannot be derived away — the display
   * string is a typographic choice ("August 6–7, 2026", en dash). So it is
   * asserted instead: scripts/check-content.mjs fails the build if they stop
   * agreeing.
   */
  startDate: "2026-08-06",
  endDate: "2026-08-07",
  venueAddressParts,
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
