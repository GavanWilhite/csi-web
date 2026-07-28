import Image from "next/image";
import Link from "next/link";
import { Kicker } from "./Kicker";
import { Roster } from "./Roster";
import { keynotes } from "@/lib/content";
import styles from "./Keynotes.module.css";

export function Keynotes() {
  return (
    <section id="speakers" className="section" aria-labelledby="speakers-h">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Kicker
            id="speakers-h"
            index="02"
            label="SPEAKERS"
            icon="record_voice_over"
            heading="Keynotes"
          />
          <a className={styles.rosterLink} href="#roster">
            FULL SPEAKER ROSTER ↓
          </a>
        </div>

        <ul className={styles.grid}>
          {keynotes.map((k) => (
            <li key={k.name} className={styles.card}>
              <Link
                className={styles.portraitLink}
                href={`/csc-speakers/${k.slug}`}
                aria-label={`${k.name} — speaker profile`}
              >
                <span className={styles.portraitWrap}>
                  <Image
                    className={styles.portrait}
                    src={k.image}
                    alt={k.name}
                    fill
                    sizes="(max-width: 900px) 50vw, 280px"
                  />
                  <span className={styles.rule} aria-hidden="true" />
                </span>
              </Link>
              <div className={styles.meta}>
                <div className={styles.nameRow}>
                  <div className={styles.name}>
                    <Link
                      className={styles.nameLink}
                      href={`/csc-speakers/${k.slug}`}
                    >
                      {k.name}
                    </Link>
                  </div>
                  <a
                    className={styles.li}
                    href={k.linkedin}
                    aria-label={`${k.name} on LinkedIn`}
                  >
                    in
                  </a>
                </div>
                <div className={styles.epithet}>{k.epithet}</div>
              </div>
            </li>
          ))}
        </ul>

        {/* The complete 35-speaker roster, grouped by track. Replaces the
            old name-drop chip row — every name is now a real destination. */}
        <Roster />
      </div>
    </section>
  );
}
