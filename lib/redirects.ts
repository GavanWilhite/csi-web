/**
 * Old-site URL shapes, mapped onto this site.
 *
 * The Wix site published ~50 top-level pages and is being retired; when this
 * site takes over the domain, every one of those URLs 404s unless it is
 * caught here. They are not hypothetical — they are in people's bookmarks,
 * in conference programmes, in slide decks, and in Google's index.
 *
 * Paths that already resolve are absent by design: /apply, /contact,
 * /disclaimer, /sitemap, /csc-speakers, /csc-speakers/<slug> and
 * /csc26-agenda were all built at the old paths precisely so no redirect is
 * needed.
 *
 * All permanent (308). The old pages are gone for good, so telling crawlers
 * anything softer would keep the dead URLs in the index.
 *
 * NOT COVERED: /post/<slug> — the 13 blog posts. There is nowhere to send
 * them yet; see sprint/backlog.md. They should NOT be swept into a catch-all
 * pointing at /institute, because a reader who followed a link to a specific
 * article is better served by a 404 than by being dumped somewhere that
 * silently isn't the thing they asked for.
 */

export interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

const map: Record<string, string> = {
  /* Conference — the old site kept these on separate pages; here they are
     sections of the one conference scroller. */
  "/cognitive-security-conference": "/",
  "/copy-of-csc": "/",
  "/cognitive-security-conference-speakers": "/csc-speakers",
  "/csc26-speakers": "/csc-speakers",
  "/csc26-venue": "/#venue",
  "/csc26-sponsors": "/#sponsors",
  "/csc26-tickets": "/#tickets",

  /* Institute. Eleven pages collapsed into one scroller, so these land on
     the section that absorbed each one. */
  "/about": "/institute#mission",
  "/initiatives": "/institute#projects",
  "/research": "/institute#projects",
  "/ctx": "/institute#projects",
  "/shield": "/institute#projects",
  "/publications": "/institute#publications",
  "/journal": "/institute#publications",
  "/events": "/institute#events",
  "/resources": "/institute#events",
  "/media": "/institute#watch",

  /* People. The two index pages are separate entries from the /staff/:slug
     pattern below — ":slug" does not match an empty segment. */
  "/meet-our-team": "/institute#team",
  "/board-of-directors": "/institute#team",
  "/strategic-advisory-council": "/institute#team",
  "/staff": "/institute#team",
  "/staff-1": "/institute#team",

  /* Membership and support. */
  "/join": "/institute#get-involved",
  "/partners": "/institute#get-involved",
  "/supporters": "/institute#get-involved",
  "/copy-of-application": "/apply",

  /* The old /donate was itself nothing but a hop to Zeffy. Keep the hop
     working rather than stranding a widely-shared URL. */
  "/donate": "https://www.zeffy.com/en-US/donation-form/support-our-mission-28",

  /* Blog index and its ten category pages. The posts themselves are
     deliberately not redirected (see the module note); the index has no
     equivalent, so it goes to the section that links out to writing. */
  "/blog": "/institute#publications",

  /* Retired: past events, a course that never launched, and the thank-you
     and questionnaire pages belonging to forms that no longer exist. Each
     goes to the nearest live thing rather than 404ing. */
  "/hsc2025": "/institute#events",
  "/ncs2025": "/institute#events",
  "/edu": "/institute#get-involved",
  "/course-waitlist-form": "/institute#get-involved",
  "/course-waitlist-survey-thank-you": "/institute",
  "/waitlistquestionnaire": "/institute#get-involved",
  "/thankyou": "/institute",
  "/thank-you-for-completing": "/institute",
};

const BLOG_CATEGORIES = [
  "ai-security",
  "announcements",
  "cognitive-resilience",
  "cognitive-warfare",
  "human-centered-cyber",
  "media",
  "neurosecurity",
  "research",
  "resources",
];

export const redirects: Redirect[] = [
  ...Object.entries(map).map(([source, destination]) => ({
    source,
    destination,
    permanent: true,
  })),
  ...BLOG_CATEGORIES.map((c) => ({
    source: `/blog/categories/${c}`,
    destination: "/institute#publications",
    permanent: true,
  })),
  /* Wix gave every person their own page under /staff, /staff-1 and
     /council. All 34 are now cards in the team section. */
  ...["staff", "staff-1", "council"].map((prefix) => ({
    source: `/${prefix}/:slug`,
    destination: "/institute#team",
    permanent: true,
  })),
];
