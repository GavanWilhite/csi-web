import Link from "next/link";
import { Icon } from "../Icon";
import { events } from "@/lib/institute";
import styles from "./InstituteEvents.module.css";

/**
 * Events, on the inverse band. Two real events with somewhere to go, rather
 * than the previous four blocks that mixed events with descriptions of
 * formats.
 */
export function InstituteEvents() {
  return (
    <section id="events" className={styles.section} aria-labelledby="events-h">
      <div className={styles.inner}>
        <h2 id="events-h" className={styles.heading}>
          <Icon name="event" size={22} color="var(--cyan)" />
          Events
        </h2>

        <div className={styles.lattice}>
          {events.blocks.map((b) => {
            const internal = b.ctaHref.startsWith("/");
            return (
              <article key={b.name} className={styles.cell}>
                <h3 className={styles.cellHead}>
                  <Icon name={b.icon} size={19} color="var(--amber)" />
                  {b.name}
                </h3>
                <p className={styles.cellBody}>{b.body}</p>

                {internal ? (
                  <Link className={styles.cellCta} href={b.ctaHref}>
                    {b.ctaLabel} →
                  </Link>
                ) : (
                  <a className={styles.cellCta} href={b.ctaHref}>
                    {b.ctaLabel} →
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
