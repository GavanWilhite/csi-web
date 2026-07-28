import { instituteLinks, publications } from "@/lib/institute";
import styles from "./Publications.module.css";

/**
 * Publications. The blog leads and the Journal sits under it as a quieter
 * footer block — the blog is what actually updates and what a visitor is
 * likelier to read, and it previously came second behind a journal masthead.
 *
 * Blog cards link out to the live Wix posts; the blog itself is not ported
 * (blocked on a client authoring decision), so these are outbound by design.
 */
export function Publications() {
  return (
    <section id="publications" className="section" aria-labelledby="pubs-h">
      <div className={styles.inner}>
        <h2 id="pubs-h" className={styles.heading}>
          Publications
        </h2>

        <ul className={styles.posts}>
          {publications.latestPosts.map((p) => (
            <li key={p.url}>
              <a className={styles.post} href={p.url}>
                <span className={styles.postMeta}>
                  {p.date} · {p.minutes} MIN READ
                </span>
                <span className={styles.postTitle}>{p.title}</span>
                {p.categories.length > 0 && (
                  <span className={styles.postCats}>
                    {p.categories.join(" · ")}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.journal}>
          <div className={styles.journalText}>
            <h3 className={styles.journalHead}>
              {publications.journal.heading}
            </h3>
            {publications.journal.body.map((p) => (
              <p key={p.slice(0, 32)} className={styles.journalBody}>
                {p}
              </p>
            ))}
          </div>
          <a
            className={styles.journalCta}
            href={instituteLinks.journalInterestForm}
          >
            {publications.journal.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
