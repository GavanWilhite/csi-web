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
 * What stands in for the address before hydration, in components/EmailPanel.tsx.
 *
 * Deliberately NOT an obfuscated rendering of it: an "info [at] domain [dot]
 * org" string sitting in the static HTML is the most widely recognised
 * obfuscation pattern there is, so every harvester that normalises it
 * recovers the address without executing a line of JavaScript — which would
 * defeat the entire point of this module. What ships in the HTML says nothing.
 */
export const ADDRESS_PENDING = "Loading address…";

/**
 * Subject lines for the pre-addressed asks that appear in context — the
 * sponsors section, the get-involved routes, the SHIELD and CTX cards, the
 * membership page. Each of these is offered where the reader is already
 * thinking about that thing.
 *
 * Wording matters: "General Inquiry" and "Partnership Proposal" are the old
 * Wix form's own option labels, and CSI sorts inbound mail by them.
 *
 * Only what is used. The source form offered seven options; /contact used to
 * reproduce all seven and no longer does (see app/contact/page.tsx), so the
 * unused four are gone rather than kept "just in case" — the full list is in
 * docs/source-content/contact.md if a real form is ever built.
 */
export const subjects = {
  general: "General Inquiry",
  partnership: "Partnership Proposal",
  prospectus: "CSC 2026 Sponsorship Prospectus",
  membership: "Membership Application",
} as const;
