import { Kicker } from "../Kicker";
import { instituteLinks, publications } from "@/lib/institute";
import styles from "./Publications.module.css";

/**
 * Section 05 — publications, the Journal, and a three-card "latest" list
 * linking out to the live blog. The blog itself is not ported (blocked on
 * a client authoring decision), so these cards are outbound by design.
 */
export function Publications() {
  return (
    <section id="publications" className="section" aria-labelledby="pubs-h">
      <div className={styles.inner}>
        <Kicker
          id="pubs-h"
          index="06"
          label="PUBLICATIONS"
          icon="menu_book"
          heading="Publications and the Journal"
        />
        <div className={styles.journal}>
          <div>
            <h3 className={styles.journalHead}>{publications.journal.heading}</h3>
            {publications.journal.body.map((p) => (
              <p key={p.slice(0, 32)} className={styles.journalBody}>
                {p}
              </p>
            ))}
            <a className={styles.journalCta} href={instituteLinks.journalInterestForm}>
              {publications.journal.ctaLabel} →
            </a>
          </div>
        </div>

        <h3 className={styles.latestHead}>LATEST FROM THE BLOG</h3>
        <ul className={styles.posts}>
          {publications.latestPosts.map((p) => (
            <li key={p.url}>
              <a className={styles.post} href={p.url}>
                <span className={styles.postMeta}>
                  {p.date} · {p.minutes} MIN READ
                </span>
                <span className={styles.postTitle}>{p.title}</span>
                {p.categories.length > 0 && (
                  <span className={styles.postCats}>{p.categories.join(" · ")}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
