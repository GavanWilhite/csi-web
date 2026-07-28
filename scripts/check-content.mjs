#!/usr/bin/env node
/**
 * Post-build consistency gate.
 *
 * The machine-readable surfaces (sitemap.xml, llms.txt, JSON-LD) are
 * generated from lib/, so content edits flow into them automatically. Two
 * things do NOT flow, and both are silent:
 *
 *   1. A NEW ROUTE. Adding app/foo/page.tsx does not add /foo to
 *      lib/sitemap.ts, so the page exists but nothing points at it.
 *   2. A FACT WITH TWO REPRESENTATIONS. event.dates vs startDate/endDate,
 *      speaker.name vs speaker.properName.
 *
 * Documenting that in AGENTS.md would not help: the failure is invisible, so
 * nobody thinks to look. This checks the BUILT ARTIFACTS instead — the real
 * sitemap.xml and llms.txt that got generated, not the source that should
 * have generated them — and exits non-zero, so `pnpm build` fails.
 *
 * Run automatically by the `build` script. No dependencies, by design.
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const failures = [];
const fail = (check, detail) => failures.push({ check, detail });

/* ---- 1. Every real page is in the sitemap and llms.txt ------------------- */

/**
 * Routes that legitimately do not belong in the sitemap. Anything not listed
 * here must appear, so a new page fails loudly until someone decides.
 */
const NOT_INDEXED = new Set([
  "/_not-found",
  "/_global-error",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/llms-full.txt",
]);

/** In the sitemap, but deliberately not surfaced in the llms.txt index. */
const NOT_IN_LLMS = new Set(["/csc-speakers/[slug]"]);

const manifest = JSON.parse(read(".next/app-path-routes-manifest.json"));
const routes = Object.values(manifest).filter((r) => !NOT_INDEXED.has(r));

const sitemapXml = read(".next/server/app/sitemap.xml.body");
const llmsTxt = read(".next/server/app/llms.txt.body");

for (const route of routes) {
  // Dynamic segments appear expanded, so check the prefix instead.
  const needle = route.replace(/\/\[.*$/, "");
  const inSitemap = sitemapXml.includes(`${needle}<`) ||
    sitemapXml.includes(`${needle}/`);
  if (!inSitemap) {
    fail("sitemap", `route ${route} is built but absent from sitemap.xml — add it to lib/sitemap.ts (or to NOT_INDEXED here if that is deliberate)`);
  }
  if (!NOT_IN_LLMS.has(route) && !llmsTxt.includes(`${needle})`)) {
    fail("llms.txt", `route ${route} is not linked from /llms.txt — add it to llmsIndex() in lib/llms.ts (or to NOT_IN_LLMS here)`);
  }
}

/* ---- 2. Facts stored twice must agree ----------------------------------- */

const eventSrc = read("lib/event.ts");
const grab = (key) =>
  eventSrc.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1] ?? null;

const dates = grab("dates");
const startDate = grab("startDate");
const endDate = grab("endDate");

if (!dates || !startDate || !endDate) {
  fail("event", "could not parse dates/startDate/endDate from lib/event.ts");
} else {
  // "August 6–7, 2026" must describe the same days as the ISO pair.
  const MONTHS = ["january","february","march","april","may","june","july","august","september","october","november","december"];
  const m = dates.match(/^([A-Za-z]+)\s+(\d+)[–-](\d+),\s*(\d{4})$/);
  if (!m) {
    fail("event", `event.dates ("${dates}") no longer matches the expected "Month D–D, YYYY" shape; update this check if the format changed on purpose`);
  } else {
    const [, monthName, d1, d2, year] = m;
    const mm = String(MONTHS.indexOf(monthName.toLowerCase()) + 1).padStart(2, "0");
    const expectStart = `${year}-${mm}-${String(d1).padStart(2, "0")}`;
    const expectEnd = `${year}-${mm}-${String(d2).padStart(2, "0")}`;
    if (startDate !== expectStart || endDate !== expectEnd) {
      fail("event", `event.dates says "${dates}" but startDate/endDate are ${startDate}/${endDate} (expected ${expectStart}/${expectEnd}) — schema.org would advertise the wrong days`);
    }
  }
}

/* ---- 3. Every speaker's properName matches their display name ------------ */

const speakersSrc = read("lib/speakers.ts");
const pairs = [
  ...speakersSrc.matchAll(/name: "([^"]+)",\s*\n\s*properName: "([^"]+)",/g),
];
const nameCount = (speakersSrc.match(/^    name: "/gm) ?? []).length;

if (pairs.length !== nameCount) {
  fail("speakers", `${nameCount} speakers but only ${pairs.length} name/properName pairs — a record is missing properName, or the two are no longer adjacent`);
}
// Compare letters only: "SMSGT BONNIE RUSHING" vs "SMSgt Bonnie Rushing"
// differ in case, and "(Ret)" in punctuation, but never in spelling.
const letters = (s) => s.toUpperCase().replace(/[^A-Z]/g, "");
for (const [, name, properName] of pairs) {
  if (letters(name) !== letters(properName)) {
    fail("speakers", `"${name}" vs properName "${properName}" are not the same name — one of them has a typo`);
  }
}

/* ---- 4. The contact address is in no machine-readable surface ------------ */

const ADDRESS_PATTERNS = [/info@cognitive/i, /\[\s*at\s*\]/i, /\[\s*dot\s*\]/i];
const SURFACES = [
  ".next/server/app/sitemap.xml.body",
  ".next/server/app/llms.txt.body",
  ".next/server/app/llms-full.txt.body",
  ".next/server/app/robots.txt.body",
];
for (const surface of SURFACES) {
  if (!existsSync(join(root, surface))) {
    fail("address", `expected built artifact ${surface} is missing — this check is not actually running`);
    continue;
  }
  const body = read(surface);
  for (const pattern of ADDRESS_PATTERNS) {
    if (pattern.test(body)) {
      fail("address", `${surface} contains the contact address (matched ${pattern}) — see lib/contact.ts; these files are the easiest thing on the site to scrape`);
    }
  }
}

/* ---- report -------------------------------------------------------------- */

if (failures.length) {
  console.error(`\n✗ content checks failed (${failures.length}):\n`);
  for (const { check, detail } of failures) {
    console.error(`  [${check}] ${detail}\n`);
  }
  process.exit(1);
}

console.log(
  `✓ content checks passed — ${routes.length} routes indexed, ${pairs.length} speaker names, no address in any machine surface`,
);
