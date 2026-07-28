import { Icon } from "../Icon";
import { events } from "@/lib/institute";
import styles from "./InstituteEvents.module.css";

/**
 * Section 08 — events, on the inverse band.
 *
 * This is the institute's structural twin of the conference sponsor strip, so
 * it takes the same treatment: --inv-bg ground and a single-1px hairline
 * lattice (cells draw right + bottom, the container draws top + left, so no
 * border doubles). It also lands the page's one dark break at roughly 70% of
 * the scroll, matching where the conference page breaks.
 *
 * whereWeveBeen is promoted out of a muted footnote into a full-width field
 * record at the foot of the lattice — it is the page's strongest credibility
 * line.
 */
export function InstituteEvents() {
  return (
    <section id="events" className={styles.section} aria-labelledby="events-h">
      <div className={styles.inner}>
        <div className={styles.head}>
          <div>
            <div className={styles.kicker}>
              <Icon name="event" size={18} color="var(--cyan)" />
              08 / EVENTS
            </div>
            <h2 id="events-h" className={styles.heading}>
              Events and community
            </h2>
          </div>
          <p className={styles.deck}>{events.deck}</p>
        </div>

        <div className={styles.lattice}>
          {events.blocks.map((b) => (
            <article key={b.name} className={styles.cell}>
              <h3 className={styles.cellHead}>{b.name}</h3>
              <p className={styles.cellSub}>{b.sub}</p>
              {b.body.map((p) => (
                <p key={p.slice(0, 32)} className={styles.cellBody}>
                  {p}
                </p>
              ))}
              {"ctaHref" in b && b.ctaHref && (
                <a className={styles.cellCta} href={b.ctaHref}>
                  {b.ctaLabel} →
                </a>
              )}
            </article>
          ))}

          <div className={styles.record}>
            <span className={styles.recordLabel}>FIELD RECORD</span>
            {events.whereWeveBeen}
          </div>
        </div>
      </div>
    </section>
  );
}
