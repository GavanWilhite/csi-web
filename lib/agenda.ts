/**
 * CSC 2026 agenda, ported verbatim from the design export, plus the 8 break
 * rows the export dropped (restored from the source agenda — 53 rows total:
 * 45 sessions/plenaries + 8 breaks).
 *
 * `cells` is positional and aligned to the `tracks` array in ./content —
 * index 0 = Defending Humans, 1 = Critical Cognitive Infrastructure,
 * 2 = Applied Training. A track with nothing scheduled in a slot gets an
 * empty array.
 */

export interface Session {
  title: string;
  who?: string;
  /** Start time when a slot holds two back-to-back talks. */
  at?: string;
}

export interface MainBlock {
  kind: "main";
  time: string;
  title: string;
  who?: string;
  /** Keynotes: emphasised row with a tinted background. */
  feature?: boolean;
}

export interface ColsBlock {
  kind: "cols";
  time: string;
  cells: Session[][];
}

/**
 * Breaks between sessions. Rendered deliberately subordinate to sessions —
 * they are orientation (find the hallway track, plan a call), not content.
 */
export interface BreakBlock {
  kind: "break";
  time: string;
}

export type Block = MainBlock | ColsBlock | BreakBlock;

export type DayId = "thu" | "fri";

export interface Day {
  id: DayId;
  label: string;
  full: string;
  blocks: Block[];
}

const main = (
  time: string,
  title: string,
  who?: string,
  feature = false,
): MainBlock => ({ kind: "main", time, title, who, feature });

const cols = (
  time: string,
  dh: Session[],
  cci: Session[],
  at: Session[],
): ColsBlock => ({ kind: "cols", time, cells: [dh, cci, at] });

const brk = (time: string): BreakBlock => ({ kind: "break", time });

const thursday: Block[] = [
  main("8:00–9:00", "Check-in"),
  main("9:00–9:30", "Opening remarks", "JAMES MCQUIGGAN"),
  main(
    "9:30–10:10",
    "KEYNOTE: The Decision Environment, an Operational Theory of Cognitive Conflict",
    "DR. RAND WALTZMAN",
    true,
  ),
  brk("10:10–10:45"),
  cols(
    "10:45–11:30",
    [
      {
        title: "From Educator to Enabler: The New Mandate for Human Risk Practitioners",
        who: "DR. SANNY LIAO",
      },
    ],
    [{ title: "Understanding the Pathway to Violence", who: "BEN VOCE-GARDNER" }],
    [
      {
        title: "Engineering for Human Cognition and Creativity",
        who: "LUCAS PRALLE",
      },
    ],
  ),
  cols(
    "11:30–12:15",
    [{ title: "Building Security Cultures that Last", who: "DR. JESSICA BARKER" }],
    [
      {
        title: "Cognitive Jailbreak: I wasn’t hacked. I volunteered.",
        who: "LEN NOE",
      },
    ],
    [
      {
        title:
          "Practical Skills for Sustaining Performance, Recovery & Team Effectiveness",
        who: "DR. SARA RABINOVITCH",
      },
    ],
  ),
  main("12:15–1:15", "Lunch"),
  cols(
    "1:15–2:00",
    [
      {
        title:
          "Gaining Physical Access: Techniques, Disguises, and Social Engineering Tactics",
        who: "FC (FREAKY CLOWN)",
      },
    ],
    [
      {
        title:
          "Neurosecurity: State of the Art and Critical Gaps in Defense for Neurotechnology",
        who: "DR. BRYCE-ALLEN BAGLEY",
      },
    ],
    [{ title: "Autopilot Off. Awareness On.", who: "SUMONA BANERJI" }],
  ),
  brk("2:00–2:15"),
  cols(
    "2:15–3:00",
    [
      {
        title:
          "Synthetic Certainty: How Misidentification Turns Weak Signals into Believed Truth",
        who: "JEFF JOCKISCH",
      },
    ],
    [
      {
        title: "From Clinic to Consumer: Neurosecurity Risks in Everyday Life",
        who: "DR. STEPHEN DAMIANOS",
        at: "2:15",
      },
      {
        title: "Pathogenic Vectors: An Emerging Threat to Neurosecurity",
        who: "DR. GREGORY CARPENTER",
        at: "2:40",
      },
    ],
    [{ title: "From Zero to (Tabletop) Hero, Part I", who: "CHLOE TUCKER" }],
  ),
  brk("3:00–3:20"),
  cols(
    "3:20–4:00",
    [
      {
        title: "AI Education Without Effort: What Do Students Lose?",
        who: "CLIFFORD STOLL",
      },
    ],
    [
      {
        title:
          "“Truth” Machines: When Market Authority Becomes Systemic Vulnerability",
        who: "WEB BEGOLE",
        // Ends 20 min before its slot-mates and is alone in the cell, so the
        // column heading (3:20–4:00) would otherwise overstate it. The other
        // three short sessions share a cell with a follow-on talk, which
        // already carries its own marker.
        at: "3:20–3:40",
      },
    ],
    [{ title: "From Zero to (Tabletop) Hero, Part II", who: "CHLOE TUCKER" }],
  ),
  brk("4:00–4:30"),
  main(
    "4:30–5:15",
    "KEYNOTE: The Battle for Decision Autonomy, a New Front in Strategic Competition",
    "DAVE PITTS",
    true,
  ),
  main("5:15–5:30", "Closing remarks", "JAMES MCQUIGGAN"),
];

const friday: Block[] = [
  main("8:00–9:30", "Check-in"),
  main("9:30–9:40", "Opening remarks", "SUMONA BANERJI"),
  main("9:40–10:20", "KEYNOTE: Before the Decision", "BRIG. GEN. TERRI BORRAS (RET)", true),
  brk("10:20–10:45"),
  cols(
    "10:45–11:30",
    [
      {
        title: "Build the Con. Break the Con: The Science of Deception, Live",
        who: "PERRY CARPENTER",
      },
    ],
    [
      {
        title: "Measuring the Unmeasurable: Quantifying Cognitive Warfare and Security",
        who: "SMSGT BONNIE RUSHING",
      },
    ],
    [{ title: "Session TBA" }],
  ),
  cols(
    "11:30–12:15",
    [
      {
        title: "Operationalizing Cognitive Security in Human-AI Systems",
        who: "PEGGY YIN",
        at: "11:30",
      },
      {
        title:
          "ScamBench: Measuring Real-World Risk of AI-Generated Social Engineering",
        who: "DR. FRED HEIDING",
        at: "11:50",
      },
    ],
    [
      {
        title: "Narrative War: The Philosophy of Social Conflict",
        who: "DR. BRIAN L. STEED",
      },
    ],
    [
      {
        title: "Knowledge Mapping as an Analytical Capability for Cognitive Security",
        who: "SARA RUSSO",
      },
    ],
  ),
  main("12:15–1:15", "Lunch"),
  cols(
    "1:15–2:00",
    [{ title: "Raptor v. Raven: How’s Your Oversight?", who: "TOMM LARSON" }],
    [
      {
        title:
          "Polycrisis and Cognitive Warfare: Competing Narratives in an Age of Wicked Problems",
        who: "DR. TAMARA SCHWARTZ",
      },
    ],
    [
      {
        title:
          "What Five Minutes Under Pressure Teach Us About Decision Ecosystems",
        who: "DR. DUSTIN SACHS",
      },
    ],
  ),
  brk("2:00–2:15"),
  cols(
    "2:15–3:00",
    [
      {
        title: "Critical Ignoring: TMI & Cognitive Pearl Harbors",
        who: "WINN SCHWARTAU",
      },
    ],
    [
      {
        title:
          "The “Interesting Times” Have Arrived: Existential Vulnerability & “Conventional Wisdom”",
        who: "CONSTANTINE",
      },
    ],
    [
      {
        title:
          "Practical Skills for Sustaining Performance, Recovery & Team Effectiveness",
        who: "DR. SARA RABINOVITCH",
      },
    ],
  ),
  brk("3:00–3:20"),
  cols(
    "3:20–4:00",
    [{ title: "AI and Trust", who: "BRUCE SCHNEIER" }],
    [
      {
        title:
          "Cognitive War in Space: Human Perception and Infrastructure in a Contested Domain",
        who: "MARIAH MAURY",
        at: "3:20",
      },
      {
        title: "Mind Shifts: The Challenge of Cognitive Security",
        who: "DAVE ACOSTA",
        at: "3:40",
      },
    ],
    [
      {
        title: "The Solution to the Scampocalypse Is More Scams",
        who: "BRIAN BRUSHWOOD",
      },
    ],
  ),
  brk("4:00–4:30"),
  main(
    "4:30–5:20",
    "KEYNOTE: Start With the Why, a Decision Model for AI-Native Human Risk Management",
    "ASHLEY ROSE",
    true,
  ),
  main("5:20–5:30", "Closing remarks", "SUMONA BANERJI"),
];

export const days: Day[] = [
  { id: "thu", label: "AUG 6 · THU", full: "Thursday, August 6", blocks: thursday },
  { id: "fri", label: "AUG 7 · FRI", full: "Friday, August 7", blocks: friday },
];
