/** Speakers, tracks and sponsors, as rendered on the conference page. */

export type TrackId = "defending-humans" | "cognitive-infra" | "applied-training";

export interface Track {
  id: TrackId;
  /** Column heading — abbreviated to fit the desktop agenda grid. */
  short: string;
  /** Full name, used in the tracks section and the mobile agenda. */
  name: string;
  icon: string;
  /** CSS custom property holding this track's accent. */
  accentVar: string;
  blurb: string;
  letter: string;
  sessionCount: number;
}

export const tracks: Track[] = [
  {
    id: "defending-humans",
    short: "DEFENDING HUMANS",
    name: "Defending Humans",
    icon: "shield_person",
    accentVar: "--cyan",
    blurb:
      "Security culture, social engineering, and behavioral science. The exploit is rarely in the code; it's in the person running it.",
    letter: "A",
    // Counts verified against lib/agenda.ts and the source agenda (11/12/10).
    sessionCount: 11,
  },
  {
    id: "cognitive-infra",
    short: "CRITICAL COGNITIVE INFRA.",
    name: "Critical Cognitive Infrastructure",
    icon: "neurology",
    accentVar: "--magenta",
    blurb:
      "Cognitive warfare, neurosecurity, and narrative conflict. The decision systems societies run on are infrastructure, and they're under attack.",
    letter: "B",
    sessionCount: 12,
  },
  {
    id: "applied-training",
    short: "APPLIED TRAINING",
    name: "Applied Training",
    icon: "exercise",
    accentVar: "--amber",
    blurb:
      "Leave with skills, not just notes: tabletop exercises, performing under pressure, knowledge mapping, and deception you can take apart by hand.",
    letter: "C",
    sessionCount: 10,
  },
];

export interface Keynote {
  /** Roster slug — the card links to /csc-speakers/<slug>. */
  slug: string;
  name: string;
  epithet: string;
  image: string;
  linkedin: string;
}

/**
 * The four keynote highlight cards. Epithets are the canonical
 * roster/bio-page taglines — the source landing page's variants ("Cognitive
 * Warfare", "Human Risk Management", ...) are stale topic tags and are
 * deliberately not used (CONFERENCE-GAPS.md §1).
 */
export const keynotes: Keynote[] = [
  {
    slug: "rand-waltzman",
    name: "DR. RAND WALTZMAN",
    epithet: "THE GODFATHER OF COGNITIVE SECURITY",
    image: "/assets/speakers/rand-waltzman.avif",
    linkedin: "https://www.linkedin.com/in/randwaltzman/",
  },
  {
    slug: "terri-borras",
    name: "BRIG. GEN. TERRI BORRAS (RET)",
    epithet: "DEFENDING THE MOMENT BEFORE DECISION",
    image: "/assets/speakers/terri-borras.jpeg",
    linkedin: "https://www.linkedin.com/in/aidatborras/",
  },
  {
    slug: "ashley_rose",
    name: "ASHLEY ROSE",
    epithet: "THE PIONEER OF HUMAN RISK MANAGEMENT",
    image: "/assets/speakers/ashley_rose.avif",
    linkedin: "https://www.linkedin.com/in/ashley-m-rose/",
  },
  {
    slug: "dave-pitts",
    name: "DAVE PITTS",
    epithet: "THE BATTLE FOR DECISION AUTONOMY",
    image: "/assets/speakers/dave-pitts.jpeg",
    linkedin: "https://www.linkedin.com/in/1davepitts/",
  },
];

/** Named-drop chips under the keynote grid. */
export const speakerChips = [
  "BRUCE SCHNEIER",
  "CLIFFORD STOLL",
  "PERRY CARPENTER",
  "DR. JESSICA BARKER",
  "WINN SCHWARTAU",
  "FC (FREAKY CLOWN)",
  "BRIAN BRUSHWOOD",
] as const;

/** 35 on the roster − 4 keynotes shown − 7 chips. (Was 28, which implied a
    39-speaker roster.) */
export const moreSpeakersCount = 24;

export interface Sponsor {
  name: string;
  logo: string;
  /** Cap height in px — logos have wildly different aspect ratios. */
  maxHeight: number;
  /**
   * Sponsor site, where the source links the mark (4 of 7 — verified in the
   * crawled landing page). MindShield, ObscureIQ and DeepTrust are unlinked
   * on the source; left without a URL rather than guessed.
   */
  url?: string;
}

export const sponsors: Sponsor[] = [
  {
    name: "Living Security",
    logo: "/assets/sponsors/living-security.png",
    maxHeight: 34,
    url: "https://www.livingsecurity.com/",
  },
  {
    name: "Fable",
    logo: "/assets/sponsors/fable.png",
    maxHeight: 30,
    url: "https://fablesecurity.com/",
  },
  { name: "MindShield", logo: "/assets/sponsors/mindshield.png", maxHeight: 34 },
  { name: "ObscureIQ", logo: "/assets/sponsors/obscureiq.png", maxHeight: 32 },
  {
    name: "HRL Laboratories",
    logo: "/assets/sponsors/hrl-laboratories.png",
    maxHeight: 36,
    url: "https://www.hrl.com/",
  },
  { name: "DeepTrust", logo: "/assets/sponsors/deeptrust.png", maxHeight: 28 },
  {
    name: "Strategos International",
    logo: "/assets/sponsors/strategos-international.png",
    maxHeight: 34,
    url: "https://www.strategosintl.com/",
  },
];
