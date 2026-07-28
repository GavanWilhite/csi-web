import Image from "next/image";
import { Kicker } from "./Kicker";
import { keynotes, moreSpeakersCount, speakerChips } from "@/lib/content";
import { links } from "@/lib/event";
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
          <a className={styles.rosterLink} href={links.fullRoster}>
            FULL SPEAKER ROSTER →
          </a>
        </div>

        <ul className={styles.grid}>
          {keynotes.map((k) => (
            <li key={k.name} className={styles.card}>
              <div className={styles.portraitWrap}>
                <Image
                  className={styles.portrait}
                  src={k.image}
                  alt={k.name}
                  fill
                  sizes="(max-width: 900px) 50vw, 280px"
                />
                <span className={styles.rule} aria-hidden="true" />
              </div>
              <div className={styles.meta}>
                <div className={styles.nameRow}>
                  <div className={styles.name}>{k.name}</div>
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

        <div className={styles.chips}>
          {speakerChips.map((n) => (
            <span key={n} className={styles.chip}>
              + {n}
            </span>
          ))}
          <span className={styles.chip}>+ {moreSpeakersCount} MORE</span>
        </div>
      </div>
    </section>
  );
}
