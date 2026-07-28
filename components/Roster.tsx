import Image from "next/image";
import Link from "next/link";
import { speakers, speakerGroups } from "@/lib/speakers";
import styles from "./Roster.module.css";

/** "Thursday" → "THU", for the compact session line on a card. */
function dayAbbrev(dayLabel: string): string {
  return dayLabel.slice(0, 3).toUpperCase();
}

/**
 * The full 35-speaker roster, grouped by the source's five tracks. Each card
 * links to the speaker's own page at /csc-speakers/<slug> — same URL shape
 * as the source site, so existing links keep resolving.
 */
export function Roster() {
  return (
    <div id="roster" className={styles.roster}>
      {speakerGroups.map((g) => {
        const members = speakers.filter((s) => s.track === g.id);
        return (
          <section
            key={g.id}
            className={styles.group}
            aria-labelledby={`roster-${g.id}`}
            style={{ "--accent": `var(${g.accentVar})` } as React.CSSProperties}
          >
            <h3 id={`roster-${g.id}`} className={styles.groupHead}>
              <span className={styles.groupBar} aria-hidden="true" />
              {g.label}
              <span className={styles.groupCount}>{members.length}</span>
            </h3>
            <ul className={styles.grid}>
              {members.map((s) => (
                <li key={s.slug} className={styles.cell}>
                  <Link className={styles.card} href={`/csc-speakers/${s.slug}`}>
                    <span className={styles.portraitWrap}>
                      <Image
                        className={styles.portrait}
                        src={s.headshot}
                        alt={s.name}
                        fill
                        /*
                          Several headshots exist only at 190×190 (see
                          lib/speakers.ts); the card renders well under that,
                          so nothing upscales.
                        */
                        sizes="(max-width: 560px) 45vw, (max-width: 900px) 30vw, 170px"
                      />
                    </span>
                    <span className={styles.meta}>
                      <span className={styles.name}>{s.name}</span>
                      <span className={styles.tagline}>{s.tagline}</span>
                      <span className={styles.sessions}>
                        {s.sessions.map((x) => (
                          <span key={`${x.dayLabel}-${x.start}`} className={styles.session}>
                            {dayAbbrev(x.dayLabel)} · {x.start}
                          </span>
                        ))}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
