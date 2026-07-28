import Image from "next/image";
import { Kicker } from "../Kicker";
import { team } from "@/lib/institute";
import { people, personGroups } from "@/lib/people";
import styles from "./Team.module.css";

/**
 * Section 08 — staff, board, and the Strategic Advisory Council. Each card
 * is a native <details> disclosure: all 22 bios are server-rendered and
 * indexable, keyboard-toggleable for free, and nobody gets 22 routes for
 * bios that average 170 words.
 */
export function Team() {
  return (
    <section id="team" className="section" aria-labelledby="team-h">
      <div className={styles.inner}>
        <Kicker
          id="team-h"
          index="09"
          label="TEAM"
          icon="groups"
          heading="The people"
        />
        <p className={styles.deck}>{team.deck}</p>

        {personGroups.map((g) => (
          <div key={g.id} className={styles.group}>
            <h3 className={styles.groupHead}>{g.label}</h3>

            {g.id === "council" && (
              <div className={styles.sacIntro}>
                {team.sacIntro.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            )}

            <ul className={styles.grid}>
              {people
                .filter((p) => p.group === g.id)
                .map((p) => (
                  <li key={p.slug} className={styles.cell}>
                    <details className={styles.card}>
                      <summary className={styles.summary}>
                        <span className={styles.portraitWrap}>
                          <Image
                            className={styles.portrait}
                            src={p.portrait}
                            alt={`Portrait of ${p.name}`}
                            fill
                            sizes="(max-width: 560px) 45vw, 180px"
                          />
                        </span>
                        <span className={styles.summaryMeta}>
                          <span className={styles.name}>{p.name}</span>
                          <span className={styles.role}>{p.role}</span>
                          <span className={styles.toggleHint} aria-hidden="true">
                            BIO +
                          </span>
                        </span>
                      </summary>
                      <div className={styles.bio}>
                        {p.bio.map((para) => (
                          <p key={para.slice(0, 32)}>{para}</p>
                        ))}
                        <p className={styles.links}>
                          {p.linkedin && <a href={p.linkedin}>LINKEDIN →</a>}
                          {p.website && <a href={p.website}>WEBSITE →</a>}
                        </p>
                      </div>
                    </details>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
