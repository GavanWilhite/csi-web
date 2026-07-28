/**
 * The site's own index, in the shape the old /sitemap page used: grouped
 * headings, internal pages under them, outbound projects alongside.
 *
 * Single source for both consumers — app/sitemap/page.tsx (the human page
 * the footer links to) and app/sitemap.ts (the XML search engines read). Add
 * a route here and both pick it up; add it to only one and they drift.
 *
 * Speaker detail pages are deliberately absent from `groups`: 35 rows would
 * bury everything else on the human page. They are generated into the XML
 * separately, from lib/speakers.ts.
 */

import { instituteLinks } from "./institute";
import { links } from "./event";

export interface SitemapEntry {
  href: string;
  label: string;
  /** Off-site: rendered with a marker, and left out of our XML sitemap. */
  external?: boolean;
}

export interface SitemapGroup {
  heading: string;
  href?: string;
  entries: SitemapEntry[];
}

export const sitemapGroups: SitemapGroup[] = [
  {
    heading: "Conference",
    href: "/",
    entries: [
      { href: "/csc-speakers", label: "Speakers" },
      { href: "/csc26-agenda", label: "Agenda" },
      { href: "/#venue", label: "Venue" },
      { href: "/#sponsors", label: "Sponsors" },
      { href: links.tickets, label: "Tickets", external: true },
    ],
  },
  {
    heading: "Institute",
    href: "/institute",
    entries: [
      { href: "/institute#mission", label: "Mission" },
      { href: "/institute#watch", label: "Watch" },
      { href: "/institute#projects", label: "Projects" },
      { href: "/institute#events", label: "Events" },
      { href: "/institute#team", label: "Team" },
      { href: "/institute#get-involved", label: "Get involved" },
    ],
  },
  {
    heading: "Projects",
    entries: [
      {
        href: instituteLinks.cat,
        label: "Cognitive Attack Taxonomy (CAT)",
        external: true,
      },
      {
        href: instituteLinks.evilDigitalTwin,
        label: "Evil Digital Twin",
        external: true,
      },
      {
        href: instituteLinks.phishGolf,
        label: "Phishing Golf Tournament",
        external: true,
      },
      {
        href: instituteLinks.youtube,
        label: "YouTube channel",
        external: true,
      },
      {
        href: instituteLinks.cognectcon,
        label: "CognectCon",
        external: true,
      },
    ],
  },
  {
    heading: "Membership",
    entries: [
      { href: instituteLinks.apply, label: "Membership application" },
      { href: "/institute#get-involved", label: "Partnerships and support" },
    ],
  },
  {
    heading: "About",
    entries: [
      { href: links.contact, label: "Contact" },
      { href: links.disclaimer, label: "Disclaimer" },
      { href: links.donate, label: "Donate", external: true },
      /* Self-referential, but it belongs in the XML and costs one row here. */
      { href: links.sitemap, label: "Sitemap" },
    ],
  },
];

/**
 * Distinct internal pages, for the XML sitemap. Fragments collapse to their
 * page — "/institute#team" is not a URL a crawler should index separately —
 * and off-site links are somebody else's sitemap to declare.
 */
export const internalRoutes: string[] = Array.from(
  new Set(
    ["/", ...sitemapGroups.flatMap((g) => [g.href, ...g.entries.map((e) => e.external ? undefined : e.href)])]
      .filter((h): h is string => typeof h === "string" && h.startsWith("/"))
      .map((h) => h.split("#")[0] || "/"),
  ),
);
