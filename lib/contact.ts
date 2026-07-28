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
 * Pre-hydration label for the rare usage that passes no children. Never
 * rendered inside <noscript>: see the note in components/MailLink.tsx — a
 * printed "[at]/[dot]" address in static HTML is trivially normalised by
 * harvesters, and <noscript> is read disproportionately by them.
 */
export const ADDRESS_FALLBACK = "info [at] cognitivesecurityinstitute [dot] org";

export const subjects = {
  general: "General Inquiry",
  partnership: "Partnership Proposal",
  prospectus: "CSC 2026 Sponsorship Prospectus",
} as const;
