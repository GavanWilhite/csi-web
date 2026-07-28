import { Kicker } from "../Kicker";
import { events } from "@/lib/institute";
import styles from "./InstituteEvents.module.css";

/** Section 07 — events, community, and the channel's video row. */
export function InstituteEvents() {
  return (
    <section id="events" className="section" aria-labelledby="events-h">
      <div className={styles.inner}>
        <Kicker
          id="events-h"
          index="08"
          label="EVENTS"
          icon="event"
          heading="Events and community"
        />
        <p className={styles.deck}>{events.deck}</p>

        <ul className={styles.grid}>
          {events.blocks.map((b) => (
            <li key={b.name} className={styles.card}>
              <h3 className={styles.cardHead}>{b.name}</h3>
              <p className={styles.cardSub}>{b.sub}</p>
              {b.body.map((p) => (
                <p key={p.slice(0, 32)} className={styles.cardBody}>
                  {p}
                </p>
              ))}
              {"ctaHref" in b && b.ctaHref && (
                <a className={styles.cardCta} href={b.ctaHref}>
                  {b.ctaLabel} →
                </a>
              )}
            </li>
          ))}
        </ul>

        <p className={styles.whereWeveBeen}>{events.whereWeveBeen}</p>
      </div>
    </section>
  );
}
