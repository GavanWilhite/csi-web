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
 *   diverse, global community") and is repaired minimally.
 * - The about page's third "definition" paragraph (academic register, and
 *   grammatically broken: "The ability to project force ... are giving
 *   rise") is cut rather than reproduced. CLIENT TO CONFIRM the rewrite.
 * - The membership section uses the application framing from /apply, not
 *   /join's "free / no dues / no gatekeeping" copy — the two source pages
 *   tell opposite stories and the client directed apply-framing.
 * - The mission one-liner exists in three conflicting versions on the
 *   source ("define and defend" / "defends" / "maps, defends, and
 *   advances"). The /about deck version ships; CLIENT TO CONFIRM.
 */

/** Menu for the institute scroller: 6 anchors + the DONATE button. */
export const instituteNavLinks = [
  { href: "#mission", label: "MISSION" },
  { href: "#research", label: "RESEARCH" },
  { href: "#programmes", label: "PROGRAMMES" },
  { href: "#events", label: "EVENTS" },
  { href: "#team", label: "TEAM" },
  { href: "#join", label: "JOIN" },
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
    "The Cognitive Security Institute maps, defends, and advances understanding of cognitive attack surfaces, across human, artificial, and hybrid cognitive systems.",
    "In the digital age, our thoughts, beliefs, and decisions are under constant attack. Sophisticated adversaries use cognitive warfare to erode trust, manipulate perceptions, and destabilize societies. These threats target past our systems, to our very minds.",
    "Traditional cybersecurity alone isn't enough.",
    "We need cognitive security.",
  ],
  approachHeading: "A Human-Centered Approach to Security",
  approach: [
    "We bridge the gap between traditional cybersecurity and a growing spectrum of cognitive attack surfaces — human, artificial, and hybrid.",
    "We're building a special community where talent, taxonomy, and telemetry converge to outpace emerging threats and reclaim our agency in an increasingly manipulated world.",
    "By combining rigorous research, open publication, and professional collaboration, CSI empowers people and organizations to build resilience, counter manipulation, and lead innovation in the AI era.",
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
  intro: [
    "At the Cognitive Security Institute, our strategy is a living framework rather than a fixed roadmap. Each initiative is designed to move the field of cognitive security forward by aligning with our Focus 5: five interwoven domains that guide everything we build, research, and share.",
    "These five domains are symbiotic focus areas which inform every initiative, course, partnership, and publication we launch. Together, they collectively define what it means to defend cognition across human, artificial, and hybrid systems.",
  ],
  pillars: [
    {
      name: "AI Security & Threat Analysis",
      blurb:
        "Understanding and mitigating the use of synthetic media and automated systems in attacks of all complexities and actors.",
      image: "/assets/institute/focus5-ai-security.webp",
    },
    {
      name: "Cognitive Resilience",
      blurb:
        "Developing strategies to strengthen cognitive resilience and accurate sensemaking under adversarial conditions.",
      image: "/assets/institute/focus5-cognitive-resilience.webp",
    },
    {
      name: "Cognitive Systems Security",
      blurb:
        "Integrating psychology, behavioral science, and systems engineering into security practices that address cognitive attack surfaces across human, artificial, and hybrid systems.",
      image: "/assets/institute/focus5-cognitive-systems.webp",
    },
    {
      name: "Neurosecurity",
      blurb:
        "Exploring how BCIs, neural data, and bio-digital convergence challenge traditional concepts of privacy, security, and identity.",
      image: "/assets/institute/focus5-neurosecurity.webp",
    },
    {
      name: "Cognitive Warfare & Tradecraft",
      blurb:
        "Tracking, modeling, and preparing for adversarial manipulation techniques targeting beliefs, behaviors, and decisions.",
      image: "/assets/institute/focus5-cognitive-warfare.webp",
    },
  ],
} as const;

/* ---- 04 / RESEARCH ------------------------------------------------------------ */

export const research = {
  deck: "From Theory to Tactical Cognitive Standards",
  intro: [
    "Our research incubator bridges the gap between academic insight and real-world application. By unifying open standards, shared data, and interdisciplinary expertise, we're shaping the field of cognitive security one breakthrough at a time.",
  ],
  activeProjectsIntro:
    "Our active research projects push boundaries and produce actionable tools for practitioners, policymakers, and educators.",
  cat: {
    heading: "Cognitive Attack Taxonomy (CAT)",
    body: [
      "The CAT is a shared reference framework designed to classify and understand cognitive threats across domains.",
      "It considers cognitive vulnerabilities, exploits, tactics/techniques, tools, and procedures, relative to cognitive processing in the broadest possible sense within biological (humans and animals) and artificial (embodied and virtual) cognitive systems at all levels. Cognition from this perspective refers to information processing systems, which may, or may not, include awareness, consciousness, or sentience.",
    ],
    ctaLabel: "VIEW THE CAT",
    /** Re-encoded from the source's 4 MB PNG to ~106 KB WebP at 800×968. */
    image: "/assets/institute/cat.webp",
    imageWidth: 800,
    imageHeight: 968,
  },
  /** Names deliberately omitted — see module header. */
  evilDigitalTwin: {
    heading: "Evil Digital Twin",
    blurb:
      "An ongoing talk series equipping the cybersecurity practitioner community to understand the cognitive security implications of human digital twins, agentic systems, and digital cognitive agents — bridging current research with real-world practitioner concerns at the intersection of cognitive security, AI capability, and adversarial system design.",
    ctaLabel: "EVILDIGITALTWIN.AI",
  },
  /*
   * The third Active Project on the source — the Cognitive Security
   * Research Library — is deliberately NOT here: its button is a dead
   * <button type="button"> with no destination. Add it when it exists.
   */
  closing:
    "Our incubator thrives on partnerships. If you're a researcher, academic, practitioner, investor, or innovator in the space, we'd love to hear from you.",
} as const;

/* ---- 05 / PUBLICATIONS --------------------------------------------------------- */

export const publications = {
  deck: "Insight that moves the field of cognitive security forward.",
  body: [
    "We publish frameworks, workshop reports, essays, and field guides that explore the evolving landscape of cognitive security—from frontline challenges to strategic, long-range thinking.",
    "Whether it's co-developed with national institutions, emerging from live events, or authored by members of our global community, each publication reflects our commitment to principled, actionable insight.",
  ],
  journal: {
    heading: "Cognitive Security JOURNAL",
    sub: "The Official Journal of the Cognitive Security Institute",
    body: [
      "Articles published in Cognitive Security are open-access peer-reviewed scientific papers, case studies, and editorials. It is currently under the leadership of Robert H. Thomson.",
      "The objective of the journal is to promote critical awareness of issues in Cognitive Security by providing a venue for scholarly debate around ideas and problems in understanding cognitive attack surfaces across human, artificial, and hybrid cognitive systems. Our mission is to support Cognitive Security education by providing scientific and pedagogical information to its readership, to facilitate interdisciplinary communication among researchers, and to offer a prestige publication supportive of interdisciplinary investigation across the full scope of cognitive security.",
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
    "We are a free global community for professionals, researchers, and enthusiasts passionate about human risk, behavioural security, and cognitive resilience.",
    "We connect academia and industry to explore a science-first, evidence-based approach to understanding and managing human risk in an increasingly complex digital world.",
    "Through collaboration, research, expert discussions, and shared insight, SHIELD creates a space where security, psychology, behavioural science, risk, and technology intersect - helping organisations move beyond awareness alone toward measurable human resilience.",
  ],
  activities: [
    { name: "Monthly Meetings", blurb: "We meet virtually every month and record the sessions." },
    {
      name: "Upskilling Sessions",
      blurb:
        "Every 3rd session is more practical where you'll learn new skills or polish existing ones.",
    },
    {
      name: "Private Community",
      blurb:
        "We have an active LinkedIn community sharing news, resources and insight between sessions.",
    },
    {
      name: "Special Projects",
      blurb:
        "We are tackling some of the biggest challenges in our field specifically, phishing simulations and AI cognitive resilience.",
    },
  ],
} as const;

export const ctx = {
  heading: "Cyber Talent eXchange (CTX)",
  body: [
    "CTX is a powerful new initiative designed to bridge the growing disconnect between talented cyber professionals looking for work and organizations struggling to fill the roles that protect infrastructure, data, and trust.",
    "We believe the issue is a connection problem rather than a pipeline problem.",
    "The Cyber Talent eXchange intends to close that gap, aligning real-world skills with open roles faster and smarter.",
    "We're not starting from scratch. We're starting from community momentum and a wave of skilled cybersecurity professionals looking for their next mission. What we need now are the connectors—recruiters, headhunters, employers, funders—to bring this exchange to life.",
  ],
  seeking: [
    {
      name: "Recruiters & Talent Partners",
      blurb:
        "Are you a recruiter, hiring manager, or talent scout looking to place top-tier talent? Let us connect you with a motivated, pre-qualified pool of job seekers, from apprentices to seasoned pros.",
    },
    {
      name: "Employers & Workforce Partners",
      blurb:
        "We're building an initiative that makes it easier for orgs of all sizes to hire faster, tap into diverse talent pools, and unlock internship funding. Early-stage partners will help shape the tools, pipelines, and support systems we develop.",
    },
    {
      name: "Funders & Sponsors",
      blurb:
        "Philanthropy and public-private partnerships are the engine behind CTX, helping to: Build a no-cost program for talented job seekers. Expand outreach to underserved talent pools. Activate apprenticeships, contracts, and full-time placements.",
    },
  ],
  closing:
    "Together we can reduce time-to-hire, increase economic mobility, and strengthen the cybersecurity workforce at scale.",
} as const;

export const phishGolf = {
  heading: "Phishing Golf Tournament",
  blurb:
    "Instead of swinging clubs, cyber pros craft nine phishing emails across nine \"holes,\" each targeting fictional personas with unique objectives and difficulty levels.",
  ctaLabel: "PHISH.GOLF",
} as const;

/* ---- 07 / EVENTS ------------------------------------------------------------------ */

export const events = {
  deck: "From community calls to expert-led workshops, our events bring people together to learn, connect, and shape the future of cognitive security.",
  blocks: [
    {
      name: "CognectCon",
      sub: "Cognitive Security Workshop",
      body: [
        "CognectCon is where the cognitive security community comes together to tackle the biggest problems we face.",
        "Each workshop focuses on a high-impact theme, gathering experts, creatives, and practitioners to collaboratively design actionable solutions. This is not your typical conference! CognectCon is a high-signal, low-fluff working summit built around innovation, cross-disciplinary insight, and momentum.",
      ],
      ctaLabel: "COGNECTCON.COM",
      ctaHref: "https://www.cognectcon.com/",
    },
    {
      name: "CogSec Village",
      sub: "Hands-On Immersive Experience",
      body: [
        "The Cognitive Security Village is our hands-on exploration space at major conferences and meetups—part demo lab, part tactical playground. Designed for hackers, researchers, and curious minds alike, the village showcases just how easy it is to hack the human brain.",
        "Each village event is different, tailored to the space, audience, and moment. But one thing's always true: the most dangerous exploit is the one inside your mind.",
      ],
    },
    {
      name: "Workshops & Meetups",
      sub: "Virtual, On-Demand, and In-Person",
      body: [
        "Whether it's a tailored workshop for your team or a pop-up CSI meetup in your area, our events are designed to move the needle. We offer immersive learning and networking experiences that explore the frontiers of cognitive security.",
      ],
    },
    {
      name: "Private Community Meetings",
      sub: "Reflect, Connect, and Grow Together",
      body: [
        "In addition to public-facing workshops and events, CSI hosts a rhythm of curated, members-only gatherings designed for deeper dialogue and trust-based collaboration.",
        "These sessions are gated, high-signal, and intentionally low-profile to preserve their value and integrity.",
      ],
    },
  ],
  whereWeveBeen:
    "CSI ran Cognitive Security Villages across Hacker Summer Camp 2025 (BSides Las Vegas, Black Hat USA, DEF CON 33) and at National Cyber Summit 2025.",
} as const;

/* ---- 08 / TEAM (prose — people data lives in lib/people.ts) ------------------------ */

export const team = {
  deck: "A council of trusted experts guiding our mission at the intersection of technology, psychology, and human resilience.",
  sacIntro: [
    "The CSI Strategic Advisory Council (SAC) brings together trusted voices from across cybersecurity, psychology, defense, technology, education, and ethics. These individuals serve as critical thought partners, challenging us to think bigger (and smarter) and ensuring our work remains both visionary and grounded in real-world impact.",
    "The SAC exists not to oversee, but to amplify. To pressure-test ideas, share insights from lived experience, and offer strategic guidance as we build the future of cognitive security.",
    "The Council is non-governing and nonpartisan. Each member participates in a personal capacity, contributing their expertise in service of our shared mission.",
  ],
} as const;

/* ---- 09 / PARTNERS ------------------------------------------------------------------ */

/**
 * Kept deliberately lean. The source's /partners and /supporters pages link
 * to each other with systematically swapped labels (every navigational
 * reference contradicts the destination page's own H1), 3 of the 19 logo
 * files are missing from the crawl, and trademark permission to reproduce
 * the walls is unconfirmed. Until the client resolves which programme is
 * which, this section carries the shared prose and a contact CTA — no logo
 * wall, no Partnerships/Supporters links.
 */
export const partners = {
  deck: "Securing the Future of Human Thought, Together",
  body: [
    "We work with companies, institutions, and fellow non-profits who share our belief that cognitive security is critical infrastructure. Let's build something great together.",
    "Cognitive security is a multidisciplinary, global challenge. Regardless of your vertical, your partnership with CSI has the potential to accelerate innovative solutions at the intersection of technology, cybersecurity, psychology, and human resilience.",
    "In a world where everything can be faked, trust becomes the rarest asset. Join us in working to protect it.",
  ],
  ways: [
    "Research Projects",
    "Event Sponsorships",
    "Educational Integration",
    "Resource & Knowledge Sharing",
    "Mission Support",
  ],
} as const;

/* ---- 10 / JOIN ------------------------------------------------------------------------ */

export const join = {
  deck: "Become part of a global community advancing cognitive security across human, artificial, and hybrid systems.",
  body: [
    "Join us to defend cognitive systems against the threats that target how we think, decide, and act.",
    "We're cultivating a thriving network of professionals, researchers, educators, and emerging leaders who see cognitive security as a collective mission rather than a competitive game.",
    "Our members come from every sector, discipline, and part of the world. What unites us is a shared belief: we must build the defenses that cognitive security demands, together.",
    // Apply-framing (matches the /apply flow), not /join's "free membership"
    // copy — the two source pages contradict each other.
    "Membership starts with a short application. Applications are reviewed, and you'll hear from us when there's an opening in the community.",
  ],
  benefits: [
    {
      name: "Access to Exclusive Gatherings",
      blurb:
        "Private AMAs, off-the-record discussions, roundtables, and members-only forums designed for deeper, safer conversations.",
    },
    {
      name: "Cognitive Resilience",
      blurb:
        "Peer support spaces and practitioner resources designed for those on the cognitive front lines.",
    },
    {
      name: "Early Access to Resources & Recordings",
      blurb:
        "Watch expert presentations and access resources before they're released publicly.",
    },
    {
      name: "Direct Access to an Expert Community",
      blurb:
        "Connect with like-minded professionals across security, psychology, governance, academia, and more.",
    },
    {
      name: "Invitations to Cohorts & Program Pilots",
      blurb:
        "Get first dibs on joining workshops, research cohorts, and early-stage projects in cognitive security.",
    },
    {
      name: "Open Pathways to Contribution",
      blurb:
        "Whether you're a creator, researcher, strategist, or storyteller, we'll help you find your place in the field.",
    },
  ],
} as const;

/* ---- 11 / SUPPORT ------------------------------------------------------------------------ */

export const support = {
  heading: "Support our mission",
  body: [
    "The Cognitive Security Institute is a registered 501(c)(3) non-profit. We fundraise with Zeffy, so 100% of your donation goes to the mission — building resilience and proactive defenses against cognitive attacks on human, artificial, and hybrid intelligence systems.",
  ],
} as const;
