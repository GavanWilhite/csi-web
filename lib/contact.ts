/**
 * Contact address and the contact paths.
 *
 * ---- The address ----------------------------------------------------------
 *
 * Stored ROT13'd so the literal string appears neither in the server-rendered
 * HTML nor as a plain token in the JS bundle, and assembled at runtime by
 * components/EmailAddress.tsx.
 *
 * Honest about the ceiling: this defeats the crude harvesters that regex HTML
 * for `mailto:` and `@`, which is the bulk of scraping. A scraper that executes
 * JavaScript can still recover it. Beating *that* needs a server-side form with
 * a challenge (Turnstile/honeypot), which this static site has nowhere to run.
 *
 * Deliberately NOT used: CSS `direction: rtl` reversal (breaks copy/paste and
 * screen readers), `::after { content }` (not selectable, invisible to some
 * assistive tech), or splitting the address across elements (buys nothing once
 * JS has run, and injects whitespace into the clipboard — see EmailAddress).
 *
 * ---- The paths -----------------------------------------------------------
 *
 * Each reason to get in touch is its own route under /contact. They are real
 * endpoints, not anchors, because each one is intended to BECOME A FORM: when
 * a hosted form exists for sponsorship, `/contact/sponsorship` stops being an
 * address and starts being that form, and every link to it keeps working.
 * That is why in-context CTAs across the site link to these paths rather than
 * carrying their own `mailto:`.
 *
 * The first seven are the exact options the old Wix contact form offered in
 * its "What does your message relate to?" dropdown, in source order — the
 * wording is CSI's own and is what they sort inbound mail by. The last three
 * are asks the site makes that the form did not cover.
 */

const rot13 = (s: string) =>
  s.replace(/[a-z]/gi, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });

/** ROT13 of the public address. rot13 is its own inverse. */
const ENCODED = "vasb@pbtavgvirfrphevglvafgvghgr.bet";

export const decodeAddress = () => rot13(ENCODED);

/**
 * What stands in for the address before hydration.
 *
 * Deliberately NOT an obfuscated rendering of it: an "info [at] domain [dot]
 * org" string sitting in the static HTML is the most widely recognised
 * obfuscation pattern there is, so every harvester that normalises it
 * recovers the address without executing a line of JavaScript — which would
 * defeat the entire point of this module. What ships in the HTML says nothing.
 */
export const ADDRESS_PENDING = "Loading address…";

export interface ContactPath {
  slug: string;
  /** Short label, for lists and link text. */
  label: string;
  /** Page H1. */
  title: string;
  /** One line under the title. */
  deck: string;
  /** Mail subject, until this path becomes a form. */
  subject: string;
  /** What to put in the message. Optional — some paths need no prompting. */
  asks?: string[];
}

export const contactPaths: ContactPath[] = [
  {
    slug: "general",
    label: "General inquiry",
    title: "General inquiry",
    deck: "A question about the institute or its work.",
    subject: "General Inquiry",
  },
  {
    slug: "supporter",
    label: "Becoming a supporter",
    title: "Becoming a supporter",
    deck: "Backing the institute as an organisation.",
    subject: "Becoming a Supporter",
    asks: [
      "Your organisation, and what it does.",
      "What kind of support you have in mind.",
    ],
  },
  {
    slug: "partnership",
    label: "Partnership proposal",
    title: "Partnership proposal",
    deck: "We work with companies, institutions, and non-profits who share our belief that cognitive security is critical infrastructure.",
    subject: "Partnership Proposal",
    asks: [
      "Your organisation, and who you are within it.",
      "What you are proposing, and what you would want from us.",
    ],
  },
  {
    slug: "deck",
    label: "Deck request",
    title: "Deck request",
    deck: "Our overview deck.",
    subject: "Deck Request",
    asks: ["Who you are, and what you need the deck for."],
  },
  {
    slug: "collaboration",
    label: "Collaboration opportunity",
    title: "Collaboration opportunity",
    deck: "Research, projects, or joint work.",
    subject: "Collaboration Opportunity",
    asks: [
      "What you are working on.",
      "Where you think the overlap with our work is.",
    ],
  },
  {
    slug: "volunteering",
    label: "Volunteering",
    title: "Volunteering",
    deck: "Giving time to the mission.",
    subject: "Volunteering",
    asks: [
      "What you would like to help with.",
      "Roughly how much time you have, and any relevant background.",
    ],
  },
  {
    slug: "events",
    label: "Event or programme proposal",
    title: "Event or programme proposal",
    deck: "Proposing an event, a village, or a programme.",
    subject: "Events or Program Proposal",
    asks: [
      "What you are proposing, and who it is for.",
      "Dates and location, if you have them.",
    ],
  },
  {
    slug: "sponsorship",
    label: "Sponsoring CSC 2026",
    title: "Sponsor the conference",
    deck: "Request the CSC 2026 sponsorship prospectus.",
    subject: "CSC 2026 Sponsorship Prospectus",
    asks: ["Your organisation, and who to send the prospectus to."],
  },
  {
    slug: "shield",
    label: "SHIELD",
    title: "SHIELD",
    deck: "A free global community connecting academia and industry around a science-first approach to human risk.",
    subject: "SHIELD",
    asks: ["Who you are, and what draws you to SHIELD."],
  },
  {
    slug: "ctx",
    label: "Cyber Talent eXchange",
    title: "Cyber Talent eXchange",
    deck: "Connecting cyber professionals looking for work with organisations struggling to fill the roles that protect infrastructure, data, and trust.",
    subject: "Cyber Talent eXchange",
    asks: [
      "Whether you are looking for a role or looking to fill one.",
      "Your background, or the roles you need.",
    ],
  },
];

export const contactPathBySlug = (slug: string) =>
  contactPaths.find((p) => p.slug === slug);

/** Path helper, so no call site hardcodes the URL shape. */
export const contactHref = (slug: string) => `/contact/${slug}`;

/** Not a contact path — /apply is its own page, with its own copy. */
export const MEMBERSHIP_SUBJECT = "Membership Application";
