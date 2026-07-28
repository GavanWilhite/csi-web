import { Kicker } from "../Kicker";
import { ctx, instituteLinks, phishGolf, shield } from "@/lib/institute";
import styles from "./Programmes.module.css";

/**
 * Section 06 — SHIELD and CTX, plus the Phishing Golf Tournament (the one
 * Active Initiative with a live destination). SHIELD keeps its British
 * spelling; see lib/institute.ts.
 */
export function Programmes() {
  return (
    <section id="programmes" className="section" aria-labelledby="programmes-h">
      <div className={styles.inner}>
        <Kicker
          id="programmes-h"
          index="06"
          label="PROGRAMMES"
          icon="diversity_3"
          heading="SHIELD and CTX"
        />

        <div className={styles.grid}>
          <article className={styles.card} style={{ "--accent": "var(--cyan)" } as React.CSSProperties}>
            <h3 className={styles.cardHead}>{shield.heading}</h3>
            <p className={styles.expansion}>{shield.expansion}</p>
            <p className={styles.lead}>{shield.lead}</p>
            <p className={styles.tagline}>{shield.tagline}</p>
            {shield.body.map((p) => (
              <p key={p.slice(0, 32)} className={styles.body}>
                {p}
              </p>
            ))}
            <ul className={styles.list}>
              {shield.activities.map((a) => (
                <li key={a.name}>
                  <span className={styles.listName}>{a.name}</span>
                  <span className={styles.listBlurb}>{a.blurb}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={styles.card} style={{ "--accent": "var(--amber)" } as React.CSSProperties}>
            <h3 className={styles.cardHead}>{ctx.heading}</h3>
            {ctx.body.map((p) => (
              <p key={p.slice(0, 32)} className={styles.body}>
                {p}
              </p>
            ))}
            <ul className={styles.list}>
              {ctx.seeking.map((g) => (
                <li key={g.name}>
                  <span className={styles.listName}>{g.name}</span>
                  <span className={styles.listBlurb}>{g.blurb}</span>
                </li>
              ))}
            </ul>
            <p className={styles.closing}>{ctx.closing}</p>
          </article>
        </div>

        <div className={styles.golf}>
          <div>
            <h3 className={styles.golfHead}>{phishGolf.heading}</h3>
            <p className={styles.golfBlurb}>{phishGolf.blurb}</p>
          </div>
          <a className={styles.golfCta} href={instituteLinks.phishGolf}>
            {phishGolf.ctaLabel} →
          </a>
        </div>
      </div>
    </section>
  );
}
