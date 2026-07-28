import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { sitemapGroups } from "@/lib/sitemap";
import styles from "./page.module.css";

/**
 * Replaces the old site's /sitemap, at the same path, so the footer link
 * that has always been there keeps working.
 *
 * Not a copy of the old page: that one indexed about twenty Wix pages, most
 * of which have no equivalent here — reproducing it verbatim would ship a
 * page of dead links. This indexes what actually exists.
 */
export const metadata: Metadata = {
  title: "Sitemap — Cognitive Security Institute",
  description: "Every page on cognitivesecurityinstitute.org.",
};

export default function SitemapPage() {
  return (
    <TextPage title="Sitemap">
      <div className={styles.groups}>
        {sitemapGroups.map((g) => (
          <section key={g.heading}>
            <h2 className={styles.heading}>
              {g.href ? <a href={g.href}>{g.heading}</a> : g.heading}
            </h2>
            <ul className={styles.list}>
              {g.entries.map((e) => (
                <li key={e.href + e.label}>
                  <a href={e.href}>{e.label}</a>
                  {e.external && (
                    <span className={styles.ext} aria-label="external site">
                      {" ↗"}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </TextPage>
  );
}
