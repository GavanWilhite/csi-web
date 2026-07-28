import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/site";
import { internalRoutes } from "@/lib/sitemap";
import { speakers } from "@/lib/speakers";

/**
 * /sitemap.xml, for crawlers. The human-readable index is app/sitemap/.
 *
 * Both read lib/sitemap.ts, so a new route cannot appear in one and not the
 * other — except the 35 speaker pages, which are added here only. They
 * belong in the XML (they are real, indexable pages that the old site had
 * at the same paths) but would swamp the human page.
 *
 * No lastModified: this is a static export with no per-page change record,
 * and a build timestamp on every URL would tell crawlers the whole site
 * changed whenever anything did — worse than saying nothing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = resolveSiteUrl();
  const paths = [
    ...internalRoutes,
    ...speakers.map((s) => `/csc-speakers/${s.slug}`),
  ];

  return paths.map((path) => ({
    url: new URL(path, base).toString(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.5 : 0.8,
  }));
}
