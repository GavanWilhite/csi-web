/**
 * The site as markdown, for machine consumers.
 *
 * Two surfaces, per the llms.txt convention (llmstxt.org):
 *   /llms.txt      — an index: what this site is, and where to look.
 *   /llms-full.txt — the whole thing inline, so a model that wants the
 *                    content does not have to make 40 more requests.
 *
 * Both are generated from the same typed content the pages render, for the
 * same reason as lib/schema.ts: a machine surface that disagrees with the
 * human one is worse than not having it. Nothing here is hand-maintained.
 *
 * ⚠️ NEVER put the contact address in these files. They are plain text served
 * to anything that asks — the single easiest thing on the site to scrape.
 * Point at /contact instead; see lib/contact.ts.
 *
 * Honest about what this is worth: as of mid-2026, llms.txt is published by
 * roughly one site in ten and the major crawlers largely ignore it in favour
 * of fetching HTML. It costs a few kB and no maintenance, and the JSON-LD in
 * lib/schema.ts is the surface that actually gets consumed today. Ship both.
 */

import { event, links } from "./event";
import { speakers, speakerGroups } from "./speakers";
import { days } from "./agenda";
import {
  mission,
  focus5,
  projects,
  publications,
  events as instituteEvents,
  getInvolved,
} from "./institute";
import { disclaimer } from "./legal";
import { people, personGroups } from "./people";

const abs = (base: string, path: string) => new URL(path, base).toString();

/**
 * Sessions, not grid rows. A "cols" block is one row of the agenda table but
 * holds up to three concurrent talks, so counting blocks undercounts badly —
 * 30 rows against the 53 the site actually advertises.
 */
const sessionCount = days.reduce(
  (n, d) =>
    n +
    d.blocks.reduce(
      (m, b) => m + (b.kind === "cols" ? b.cells.flat().length : 1),
      0,
    ),
  0,
);

const SUMMARY =
  "The Cognitive Security Institute is a 501(c)(3) non-profit working on " +
  "cognitive security across human, artificial, and hybrid cognition. This " +
  "site covers the institute and its annual Cognitive Security Conference.";

/* ---- /llms.txt ------------------------------------------------------------ */

export function llmsIndex(base: string): string {
  const l = (path: string, title: string, note: string) =>
    `- [${title}](${abs(base, path)}): ${note}`;

  return [
    "# Cognitive Security Institute",
    "",
    `> ${SUMMARY}`,
    "",
    `${event.name} runs ${event.dates} at ${event.venue}, ${event.venueAddress}. ` +
      `Capacity ${event.capacity}. ${speakers.length} speakers, ` +
      `${sessionCount} agenda entries across three tracks.`,
    "",
    "## Conference",
    "",
    l("/", event.shortName, "Overview, tracks, venue, sponsors, travel briefs"),
    l("/csc-speakers", "Speakers", `All ${speakers.length}, grouped by track`),
    l("/csc26-agenda", "Agenda", "Full two-day schedule"),
    "",
    "## Institute",
    "",
    l("/institute", "The Institute", "Mission, focus areas, projects, publications, events, people"),
    l("/apply", "Membership application", "How to apply"),
    l("/contact", "Contact", "The address, plus a page per reason to write in"),
    "",
    "## Optional",
    "",
    l("/llms-full.txt", "Full site content", "Everything above inline, as markdown"),
    l("/disclaimer", "Disclaimer", "Legal notice"),
    l("/sitemap", "Sitemap", "Every page"),
    "",
  ].join("\n");
}

/* ---- /llms-full.txt ------------------------------------------------------- */

function speakersSection(base: string): string {
  const out: string[] = ["## Speakers", ""];
  for (const g of speakerGroups) {
    const group = speakers.filter((s) => s.track === g.id);
    if (!group.length) continue;
    out.push(`### ${g.label}`, "");
    for (const s of group) {
      out.push(`#### ${s.properName}`, "");
      out.push(s.tagline, "");
      if (s.credentials.length) out.push(`Credentials: ${s.credentials.join("; ")}`, "");
      for (const session of s.sessions) {
        out.push(
          `Session: "${session.title}" — ${session.dayLabel} ${session.start}–${session.end}, ${session.trackLabel}`,
          "",
        );
      }
      out.push(...s.bio.flatMap((p) => [p, ""]));
      out.push(`Profile: ${abs(base, `/csc-speakers/${s.slug}`)}`, "");
    }
  }
  return out.join("\n");
}

function agendaSection(): string {
  const out: string[] = ["## Agenda", ""];
  for (const day of days) {
    out.push(`### ${day.full}`, "");
    for (const b of day.blocks) {
      if (b.kind === "break") {
        out.push(`- ${b.time} — Break`);
      } else if (b.kind === "main") {
        out.push(`- ${b.time} — ${b.title}${b.who ? ` (${b.who})` : ""}`);
      } else {
        for (const cell of b.cells) {
          for (const s of cell) {
            out.push(
              `- ${s.at ?? b.time} — ${s.title}${s.who ? ` (${s.who})` : ""}`,
            );
          }
        }
      }
    }
    out.push("");
  }
  return out.join("\n");
}

function instituteSection(base: string): string {
  const out: string[] = ["## The Institute", "", mission.deck, ""];

  out.push("### Focus areas", "");
  for (const p of focus5.pillars) out.push(`- **${p.name}** — ${p.blurb}`);
  out.push("");

  out.push("### Projects", "");
  for (const p of projects) {
    out.push(`- **${p.heading}** — ${p.blurb}${p.href ? ` (${p.href})` : ""}`);
  }
  out.push("");

  out.push("### Publications", "");
  out.push(`**${publications.journal.heading}** — ${publications.journal.body.join(" ")}`, "");
  for (const post of publications.latestPosts) {
    out.push(`- ${post.title} (${post.date})`);
  }
  out.push("");

  out.push("### Events", "");
  for (const e of instituteEvents.blocks) out.push(`- **${e.name}** — ${e.body}`);
  out.push("");

  out.push("### People", "");
  for (const g of personGroups) {
    out.push(`**${g.label}**`, "");
    for (const p of people.filter((x) => x.group === g.id)) {
      out.push(`- ${p.name}${p.role ? ` — ${p.role}` : ""}`);
    }
    out.push("");
  }

  out.push("### Get involved", "", getInvolved.deck, "");
  for (const r of getInvolved.routes) {
    out.push(`- **${r.name}** — ${r.blurb}${r.href ? ` (${abs(base, r.href)})` : ""}`);
  }
  out.push("");

  return out.join("\n");
}

export function llmsFull(base: string): string {
  return [
    "# Cognitive Security Institute",
    "",
    `> ${SUMMARY}`,
    "",
    `Source: ${abs(base, "/")}`,
    "",
    "## Conference",
    "",
    `**${event.name}**`,
    "",
    `- Dates: ${event.dates}`,
    `- Venue: ${event.venue}, ${event.venueAddress}`,
    `- Rooms: ${event.venueRooms}`,
    `- Capacity: ${event.capacity}`,
    `- Tickets: ${links.tickets}`,
    "",
    agendaSection(),
    speakersSection(base),
    instituteSection(base),
    "## Disclaimer",
    "",
    disclaimer.body,
    "",
    "## Contact",
    "",
    `Contact options are listed at ${abs(base, "/contact")}.`,
    "",
  ].join("\n");
}
