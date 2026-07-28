import { Icon } from "./Icon";
import { Kicker } from "./Kicker";
import { tracks } from "@/lib/content";
import styles from "./Tracks.module.css";

export function Tracks() {
  return (
    <section className={styles.section} aria-labelledby="tracks-h">
      <div className={styles.inner}>
        <Kicker
          id="tracks-h"
          index="03"
          label="TRACKS"
          icon="alt_route"
          heading="Three tracks"
        />
        <ul className={styles.grid}>
          {tracks.map((t) => (
            <li key={t.id} className={styles.card}>
              <div className={styles.markRow}>
                <Icon name={t.icon} size={26} color={`var(${t.accentVar})`} />
                <span
                  className={styles.bar}
                  style={{ background: `var(${t.accentVar})` }}
                  aria-hidden="true"
                />
              </div>
              <h3 className={styles.name}>{t.name}</h3>
              <p className={styles.blurb}>{t.blurb}</p>
              <div className={styles.meta}>
                TRACK {t.letter} · {t.sessionCount} SESSIONS
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
