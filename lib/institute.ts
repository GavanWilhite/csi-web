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
  { href: "#research", label: "RESEARCH" },
  { href: "#programmes", label: "PROGRAMMES" },
  { href: "#team", label: "TEAM" },
  { href: "#get-involved", label: "GET INVOLVED" },
] as const;

export const instituteLinks = {
  apply: "https://www.cognitivesecurityinstitute.org/apply",
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
  deck: "The Cognitive Security Institute defends cognitive security — across human, artificial, and hybrid cognitive systems.",
  body: [
    "Traditional cybersecurity alone isn't enough.",
    "We need cognitive security.",
  ],
} as const;

/* ---- 02 / DEFINITION -------------------------------------------------------- */

export const definition = {
  heading: "What is cognitive security?",
  body: [
    "Cognitive attacks manipulate human minds, artificial cognition, or the hybrid teams they form together. These threats combine psychological, technological, and geopolitical tactics.",
    "CSI exists to proactively defend against them.",
  ],
} as const;

/* ---- 03 / FOCUS 5 ------------------------------------------------------------ */

/**
 * Names and blurbs from /initiatives — the only version with definitions.
 * /research names two of the five differently; client to confirm.
 */
export const focus5 = {
  pillars: [
    {
      name: "AI Security & Threat Analysis",
      blurb: "Synthetic media and automated attacks.",
      image: "/assets/institute/focus5-ai-security.webp",
    },
    {
      name: "Cognitive Resilience",
      blurb: "Sensemaking under adversarial conditions.",
      image: "/assets/institute/focus5-cognitive-resilience.webp",
    },
    {
      name: "Cognitive Systems Security",
      blurb: "Psychology and engineering in security practice.",
      image: "/assets/institute/focus5-cognitive-systems.webp",
    },
    {
      name: "Neurosecurity",
      blurb: "BCIs, neural data, privacy and identity.",
      image: "/assets/institute/focus5-neurosecurity.webp",
    },
    {
      name: "Cognitive Warfare & Tradecraft",
      blurb: "Manipulation of beliefs, behaviors, decisions.",
      image: "/assets/institute/focus5-cognitive-warfare.webp",
    },
  ],
} as const;

/* ---- 04 / RESEARCH ------------------------------------------------------------ */

export const research = {
  cat: {
    heading: "Cognitive Attack Taxonomy (CAT)",
    body: [
      "A shared reference framework for classifying cognitive threats across biological and artificial systems.",
    ],
    ctaLabel: "VIEW THE CAT",
    /** Re-encoded from the source's 4 MB PNG to ~106 KB WebP at 800×968. */
    image: "/assets/institute/cat.webp",
    imageWidth: 800,
    imageHeight: 968,
  },
  /** Sits with CAT and EDT as a third active project, not under Programmes —
      it is a thing you can go and do, like the other two. */
  phishGolf: {
    heading: "Phishing Golf Tournament",
    blurb:
      "Cyber pros craft nine phishing emails across nine \"holes,\" each targeting a fictional persona.",
    ctaLabel: "PHISH.GOLF",
  },
  /** Names deliberately omitted — see module header. */
  evilDigitalTwin: {
    heading: "Evil Digital Twin",
    blurb:
      "A talk series on human digital twins, agentic systems, and digital cognitive agents.",
    ctaLabel: "EVILDIGITALTWIN.AI",
  },
  /*
   * The third Active Project on the source — the Cognitive Security
   * Research Library — is deliberately NOT here: its button is a dead
   * <button type="button"> with no destination. Add it when it exists.
   */
} as const;

/* ---- 05 / PUBLICATIONS --------------------------------------------------------- */

export const publications = {
  journal: {
    heading: "Cognitive Security JOURNAL",
    body: [
      "Open-access, peer-reviewed papers, case studies, and editorials, under the leadership of Robert H. Thomson.",
    ],
    ctaLabel: "SUBMIT YOUR INTEREST",
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

/* ---- 06 / PROGRAMMES ------------------------------------------------------------ */

/**
 * SHIELD keeps its British spelling ("behavioural", "Defence") — it is the
 * programme lead's own voice, against US spelling sitewide. Flagged, not
 * normalised. The source expands the acronym with both "Defence" and
 * "Defense" on different pages; "Defence" (its own page) is used.
 */
export const shield = {
  heading: "SHIELD",
  expansion: "Security & Human Insight for Educating Leaders on Defence",
  lead: "Lead: Holly-Jane Grayling",
  tagline: "People aren't the weakest link - they're security's greatest strength.",
  body: [
    "A free global community connecting academia and industry around a science-first approach to human risk.",
  ],
  activities: [
    { name: "Monthly Meetings", blurb: "Virtual, monthly, recorded." },
    {
      name: "Upskilling Sessions",
      blurb: "Every 3rd session is hands-on skills practice.",
    },
    {
      name: "Private Community",
      blurb: "An active LinkedIn community between sessions.",
    },
    {
      name: "Special Projects",
      blurb: "Tackling phishing simulations and AI cognitive resilience.",
    },
  ],
} as const;

export const ctx = {
  heading: "Cyber Talent eXchange (CTX)",
  body: [
    "CTX bridges the disconnect between cyber professionals looking for work and organizations struggling to fill the roles that protect infrastructure, data, and trust.",
  ],
  seeking: [
    {
      name: "Recruiters & Talent Partners",
      blurb:
        "A motivated, pre-qualified pool of job seekers, from apprentices to seasoned pros.",
    },
    {
      name: "Employers & Workforce Partners",
      blurb:
        "Hire faster, reach diverse talent pools, unlock internship funding.",
    },
    {
      name: "Funders & Sponsors",
      blurb:
        "Philanthropy and public-private partnerships fund a no-cost program for job seekers.",
    },
  ],
} as const;


/* ---- 07 / EVENTS ------------------------------------------------------------------ */

export const events = {
  deck: "Events that bring people together to learn, connect, and shape the future of cognitive security.",
  blocks: [
    {
      name: "CognectCon",
      sub: "Cognitive Security Workshop",
      body: [
        "Experts, creatives, and practitioners designing actionable solutions around one high-impact theme. A high-signal, low-fluff working summit.",
      ],
      ctaLabel: "COGNECTCON.COM",
      ctaHref: "https://www.cognectcon.com/",
    },
    {
      name: "CogSec Village",
      sub: "Hands-On Immersive Experience",
      body: [
        "Part demo lab, part tactical playground, showing how easy it is to hack the human brain. The most dangerous exploit is the one inside your mind.",
      ],
    },
    {
      name: "Workshops & Meetups",
      sub: "Virtual, On-Demand, and In-Person",
      body: [
        "Tailored workshops for your team and pop-up CSI meetups in your area.",
      ],
    },
    {
      name: "Private Community Meetings",
      sub: "Reflect, Connect, and Grow Together",
      body: [
        "Members-only gatherings for deeper dialogue — gated, high-signal, intentionally low-profile.",
      ],
    },
  ],
  whereWeveBeen:
    "CSI ran Cognitive Security Villages across Hacker Summer Camp 2025 (BSides Las Vegas, Black Hat USA, DEF CON 33) and at National Cyber Summit 2025.",
} as const;

/* ---- 08 / TEAM (prose — people data lives in lib/people.ts) ------------------------ */

export const team = {
  deck: "Trusted experts guiding our mission across technology, psychology, and human resilience.",
  sacIntro: [
    "A non-governing, nonpartisan council of trusted voices from cybersecurity, psychology, defense, technology, education, and ethics.",
  ],
} as const;

/* ---- 08 / GET INVOLVED -----------------------------------------------------
   Merges the source's separate Partners, Join and Support pages. They asked
   the reader for three different things across three near-identical walls of
   copy; here they are three routes out of one section. -------------------- */

export const getInvolved = {
  deck: "Cognitive security is a collective mission, not a competitive game.",
  routes: [
    {
      name: "Apply for membership",
      blurb:
        "Off-the-record calls with people who know what's actually going on, private channels to compare notes in, and events before they're announced. Membership is by application.",
      ctaLabel: "APPLY",
      href: "https://www.cognitivesecurityinstitute.org/apply",
      icon: "badge",
    },
    {
      name: "Suggest a partnership",
      blurb:
        "We work with companies, institutions, and non-profits who share our belief that cognitive security is critical infrastructure.",
      ctaLabel: "GET IN TOUCH",
      href: "https://www.cognitivesecurityinstitute.org/contact",
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
  note: "501(C)(3) · EIN 92-3238363 · 100% OF DONATIONS FUND THE MISSION",
} as const;
