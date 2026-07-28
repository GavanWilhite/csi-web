/**
 * The membership application.
 *
 * The old site collected this through a Wix Form — fourteen fields and two
 * reference blocks — and that form dies with the site. This is a static
 * site with nothing to POST to, so applications come in by mail instead.
 *
 * Kept deliberately short: the full field list is preserved in
 * docs/source-content/apply.md if a real intake form is ever stood up. Asking
 * for it back in an email would be worse than asking for the few things that
 * actually matter for vetting.
 *
 * Prose is the source page's own.
 */

export const apply = {
  deck: "Become part of a global community dedicated to protecting human agency in an AI-driven world.",
  intro:
    "Please email us to join the applicant waitlist. We will inform you when there is an opening for you in the CSI community.",
  /** What to put in the mail. */
  asks: [
    "Who you are, and where you work.",
    "A link to your LinkedIn profile or personal site.",
    "What brought you to the Cognitive Security Institute, and why you want to join.",
  ],
  references: {
    note: "References are not absolutely required, but can help us verify your identity. Using current CSI members in good standing is greatly preferred.",
    ask: "If you have them, include links to their profiles too, and say who is already a member.",
  },
} as const;
