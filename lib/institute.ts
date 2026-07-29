/**
 * Content for the /institute single-page scroller.
 *
 * All quoted prose is verbatim from the 2026-07-27 crawl of
 * cognitivesecurityinstitute.org (handoff/content/*.md), with these
 * deliberate, flagged exceptions:
 *
 * - The Evil Digital Twin blurb omits the presenters' names entirely: the
 *   source credits "Dr. Vindy Sawyer" while every other page says
 *   "Dr. Ben D. Sawyer" — unresolved, so no name ships (client decision).
 * - One SHIELD bullet is garbled at source ("Connect through our with a
 * diverse, global community") and is repaired minimally.
 * - The about page's third "definition" paragraph (academic register, and
 *   grammatically broken: "The ability to project force ... are giving
 * rise") is cut rather than reproduced. CLIENT TO CONFIRM the rewrite.
 * - The membership section uses the application framing from /apply, not
 *   /join's "free / no dues / no gatekeeping" copy — the two source pages
 *   tell opposite stories and the client directed apply-framing.
 * - The mission one-liner exists in three conflicting versions on the
 *   source ("define and defend" / "defends" / "maps, defends, and
 * advances"). The /about deck version ships; CLIENT TO CONFIRM.
 */

/** Menu for the institute scroller: 6 anchors + the DONATE button. */
export const instituteNavLinks = [
  { href: "#mission", label: "MISSION" },
  { href: "#watch", label: "WATCH" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#events", label: "EVENTS" },
  { href: "#team", label: "TEAM" },
  { href: "#get-involved", label: "GET INVOLVED" },
] as const;

export const instituteLinks = {
  /**
   * The membership funnel. Points at our own /apply page, which currently
   * hands the applicant a mail template.
   *
   * ⚠️ THIS IS AN INTERIM. The old site's /apply was a Wix Form with
   * fourteen fields and two reference blocks, and it dies with that site.
   * A static site cannot accept a POST, so there is nothing to port it to.
   * When CSI stands up a real intake form (Tally, Google Forms, Fillout —
   * anything with a URL), point this constant at it and delete
   * app/apply/. Nothing else needs to change: the nav CTA, the get-involved
   * card and the sitemap all read this one value.
   */
  apply: "/apply",
  /** Shared "get more info" destination for the programme cards. */
  cat: "https://cognitiveattacktaxonomy.org/",
  evilDigitalTwin: "https://www.evildigitaltwin.ai/",
  cognectcon: "https://www.cognectcon.com/",
  phishGolf: "https://phish.golf",
  youtube: "https://www.youtube.com/@cognitivesecurityinstitute",
  /** Source link carried ?usp=publish-editor — an editor-mode param that
      does not belong in a public link; stripped. */
  journalInterestForm:
    "https://docs.google.com/forms/d/e/1FAIpQLScsx84hWv3OL8WHUSKrdCeVhbk3DcZAojOP3hnXCA9_mOJm8Q/viewform",
} as const;

/* ---- 01 / MISSION ---------------------------------------------------------- */

export const mission = {
  deck: "The Cognitive Security Institute defends cognitive security across human, artificial, and hybrid cognitive systems.",
  body: [],
} as const;

/* ---- FIVE PILLARS ------------------------------------------------------------ */

/**
 * Names and blurbs from /initiatives — the only version with definitions.
 * /research names two of the five differently; client to confirm.
 */
export const focus5 = {
  pillars: [
    {
      name: "AI Security & Threat Analysis",
      icon: "smart_toy",
      blurb: "Synthetic media and automated attacks.",
      image: "/assets/institute/focus5-ai-security.webp",
    },
    {
      name: "Cognitive Resilience",
      icon: "health_and_safety",
      blurb: "Sensemaking under adversarial conditions.",
      image: "/assets/institute/focus5-cognitive-resilience.webp",
    },
    {
      name: "Cognitive Systems Security",
      icon: "engineering",
      blurb: "Psychology and engineering in security practice.",
      image: "/assets/institute/focus5-cognitive-systems.webp",
    },
    {
      name: "Neurosecurity",
      icon: "neurology",
      blurb: "BCIs, neural data, privacy and identity.",
      image: "/assets/institute/focus5-neurosecurity.webp",
    },
    {
      name: "Cognitive Warfare & Tradecraft",
      icon: "radar",
      blurb: "Manipulation of beliefs, behaviors, decisions.",
      image: "/assets/institute/focus5-cognitive-warfare.webp",
    },
  ],
} as const;

/* ---- RESEARCH / ACTIVE PROJECTS ---------------------------------------------

   Card art is each project's own mark, fetched from its own site on
   2026-07-27 (cognitiveattacktaxonomy.org, evildigitaltwin.ai, phish.golf)
   and re-encoded to WebP. These are the projects' marks, not ours — if a
   project rebrands, refetch rather than redraw. SHIELD and CTX are CSI's own
   programmes and have no separate mark, so they carry no art.
   -------------------------------------------------------------------------- */

export interface Project {
  id: string;
  /** Material Symbol shown beside the heading. */
  icon: string;
  heading: string;
  blurb: string;
  ctaLabel: string;
  href?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Logos want contain + padding; photographic art wants cover. */
  fit?: "contain" | "cover";
  /** Suppresses the art area entirely (no image, no placeholder). */
  noArt?: boolean;
  /** Animated mark, if the project has one. */
  video?: string;
  /** Art with a white ground gets a light plate rather than the dark default. */
  lightPlate?: boolean;
}

export const projects: Project[] = [
  {
    id: "cat",
    icon: "account_tree",
    heading: "Cognitive Attack Taxonomy (CAT)",
    blurb:
      "A shared reference framework for classifying cognitive threats across biological and artificial systems.",
    ctaLabel: "VIEW THE CAT",
    href: "https://cognitiveattacktaxonomy.org/",
    image: "/assets/institute/projects/cat.webp",
    imageWidth: 578,
    imageHeight: 720,
    fit: "contain",
  },
  {
    id: "edt",
    icon: "smart_toy",
    heading: "Evil Digital Twin",
    blurb:
      "A talk series on human digital twins, agentic systems, and digital cognitive agents.",
    ctaLabel: "EVILDIGITALTWIN.AI",
    href: "https://www.evildigitaltwin.ai/",
    image: "/assets/institute/projects/edt.webp",
    imageWidth: 720,
    imageHeight: 720,
    fit: "contain",
    /* The project's own animated mark, from its homepage. Plays muted and
       looping as an animated icon; the still above is the poster and the
       reduced-motion fallback. */
    video: "/assets/institute/projects/edt-loop.mp4",
    /* Art is on a white ground, so the plate is deliberately light — framed
       artwork rather than a stray bright square on a dark card. */
    lightPlate: true,
  },
  {
    id: "golf",
    icon: "golf_course",
    heading: "Phishing Golf Tournament",
    blurb:
      "Cyber pros craft nine phishing emails across nine \"holes,\" each targeting a fictional persona.",
    ctaLabel: "PHISH.GOLF",
    href: "https://phish.golf",
    image: "/assets/institute/projects/golf.webp",
    imageWidth: 720,
    imageHeight: 220,
    fit: "contain",
  },
  {
    id: "shield",
    icon: "shield_person",
    heading: "SHIELD",
    blurb:
      "Security & Human Insight for Educating Leaders on Defence. A free global community connecting academia and industry around a science-first approach to human risk. Lead: Holly-Jane Grayling.",
    ctaLabel: "LEARN MORE",
    href: "/contact/shield",
    /* No art: these are CSI's own programmes with no mark of their own, and a
       placeholder plate read as faked artwork. */
    noArt: true,
  },
  {
    id: "ctx",
    icon: "work",
    heading: "Cyber Talent eXchange (CTX)",
    blurb:
      "CTX bridges the disconnect between cyber professionals looking for work and organizations struggling to fill the roles that protect infrastructure, data, and trust.",
    ctaLabel: "LEARN MORE",
    href: "/contact/ctx",
    /* No art: these are CSI's own programmes with no mark of their own, and a
       placeholder plate read as faked artwork. */
    noArt: true,
  },
];

/* ---- 05 / PUBLICATIONS --------------------------------------------------------- */

export const publications = {
  journal: {
    heading: "Cognitive Security Journal",
    body: [
      "Open-access, peer-reviewed papers, case studies, and editorials, under the leadership of Robert H. Thomson.",
    ],
    ctaLabel: "GET INVOLVED",
  },
  /**
   * Three most recent posts, linking OUT to the live blog. The full blog
   * port is deliberately deferred (client decision on authoring pending);
   * these give the section a pulse without duplicating 13 posts. Bylines
   * are omitted: the source bylines are Wix account names, not authors.
   */
  latestPosts: [
    {
      title:
        "Developing a Neurosecurity Framework to Defend Against the Coming Neurowar",
      url: "https://www.cognitivesecurityinstitute.org/post/developing-a-neurosecurity-framework-to-defend-against-the-coming-neurowar",
      date: "Jan 2026",
      minutes: 7,
      categories: ["Neurosecurity", "Cognitive Warfare"],
    },
    {
      title: "Coupons as Cognitive Malware: Attacking Interconnected Systems",
      url: "https://www.cognitivesecurityinstitute.org/post/coupons-as-cognitive-malware-attacking-interconnected-systems",
      date: "Dec 2025",
      minutes: 9,
      categories: [],
    },
    {
      title: "What Can Cognitive Security Learn From The B-17 Flying Fortress?",
      url: "https://www.cognitivesecurityinstitute.org/post/what-can-cognitive-security-learn-from-the-b-17-flying-fortress",
      date: "Nov 2025",
      minutes: 3,
      categories: ["Cognitive Resilience", "Human-Centered Cyber"],
    },
  ],
} as const;

/* ---- EVENTS ------------------------------------------------------------------
   Reduced to the two events that actually exist and have somewhere to go. The
   previous four-block grid mixed real events with descriptions of formats.
   The villages line rides with CognectCon as its track record. ------------- */

export const events = {
  blocks: [
    {
      name: "Cognitive Security Conference",
      icon: "confirmation_number",
      body: "Two days on human risk, AI security, and cognitive warfare. August 6–7, 2026, Las Vegas.",
      ctaLabel: "CSC 2026",
      ctaHref: "/",
    },
    {
      name: "CognectCon",
      icon: "groups",
      body: "Experts, creatives, and practitioners designing actionable solutions around one high-impact theme. A high-signal, low-fluff working summit.",
      ctaLabel: "COGNECTCON.COM",
      ctaHref: "https://www.cognectcon.com/",
    },
  ],
} as const;

/* ---- 08 / GET INVOLVED -----------------------------------------------------
   Merges the source's separate Partners, Join and Support pages. They asked
   the reader for three different things across three near-identical walls of
   copy; here they are three routes out of one section. -------------------- */

export interface Route {
  name: string;
  blurb: string;
  ctaLabel: string;
  icon: string;
  href: string;
}

export const getInvolved: { deck: string; routes: Route[] } = {
  deck: "Cognitive security is a collective mission.",
  routes: [
    {
      name: "Apply for membership",
      blurb:
        "Off-the-record calls with people who know what's actually going on, private channels to compare notes in, and events before they're announced. Membership is by application.",
      ctaLabel: "APPLY",
      href: instituteLinks.apply,
      icon: "badge",
    },
    {
      name: "Suggest a partnership",
      blurb:
        "We work with companies, institutions, and non-profits who share our belief that cognitive security is critical infrastructure.",
      ctaLabel: "GET IN TOUCH",
      href: "/contact/partnership",
      icon: "handshake",
    },
    {
      name: "Support the mission",
      blurb:
        "The Cognitive Security Institute is a registered 501(c)(3) non-profit. We fundraise with Zeffy, so 100% of your donation goes to the mission.",
      ctaLabel: "DONATE",
      href: "https://www.zeffy.com/en-US/donation-form/support-our-mission-28",
      icon: "volunteer_activism",
    },
  ],
};
