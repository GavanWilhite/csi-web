/**
 * Contact address, kept out of the HTML source.
 *
 * The address is stored ROT13'd so the literal string appears neither in the
 * server-rendered HTML nor as a plain token in the JS bundle, and is assembled
 * at runtime by components/MailLink.tsx.
 *
 * Honest about the ceiling: this defeats the crude harvesters that regex HTML
 * for `mailto:` and `@`, which is the bulk of scraping. A scraper that executes
 * JavaScript can still recover it. Beating *that* needs a server-side form with
 * a challenge (Turnstile/honeypot), which this static site has nowhere to run —
 * and the source site's own Wix form dies with the site, so it is not an option
 * to inherit either. Revisit if a backend ever exists.
 *
 * Deliberately NOT used: CSS `direction: rtl` reversal (breaks copy/paste and
 * screen readers) or `::after { content }` (not selectable, invisible to some
 * assistive tech).
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
 * Pre-hydration label for call sites that show the address as their own link
 * text. Deliberately NOT an obfuscated rendering of the address: an
 * "info [at] domain [dot] org" string sitting in the static HTML is the most
 * widely recognised obfuscation pattern there is, so every harvester that
 * normalises it recovers the address without executing a line of JavaScript
 * — which would defeat the entire point of this module. The address must
 * appear only after hydration, so what ships in the HTML says nothing.
 */
export const ADDRESS_PENDING = "Loading address…";

/**
 * The first seven are the exact options the old site's Wix contact form
 * offered in its "What does your message relate to?" dropdown, in source
 * order. That form dies with the site; /contact reproduces the same choices
 * as pre-addressed mail. Keep the wording — people who wrote in before will
 * recognise it, and it is what CSI sorts inbound mail by.
 */
export const subjects = {
  general: "General Inquiry",
  supporter: "Becoming a Supporter",
  partnership: "Partnership Proposal",
  deck: "Deck Request",
  collaboration: "Collaboration Opportunity",
  volunteering: "Volunteering",
  events: "Events or Program Proposal",
  /** Not from the dropdown — the sponsors section's own ask. */
  prospectus: "CSC 2026 Sponsorship Prospectus",
  /** Not from the dropdown — see app/apply/page.tsx. */
  membership: "Membership Application",
} as const;

/** The dropdown options, in the order the source form listed them. */
export const contactReasons = [
  { subject: subjects.general, blurb: "A question about CSI or its work." },
  {
    subject: subjects.supporter,
    blurb: "Backing the institute as an organisation.",
  },
  {
    subject: subjects.partnership,
    blurb: "Working together as an institution or company.",
  },
  { subject: subjects.deck, blurb: "Our overview deck." },
  {
    subject: subjects.collaboration,
    blurb: "Research, projects, or joint work.",
  },
  { subject: subjects.volunteering, blurb: "Giving time to the mission." },
  {
    subject: subjects.events,
    blurb: "Proposing an event, village, or programme.",
  },
] as const;
