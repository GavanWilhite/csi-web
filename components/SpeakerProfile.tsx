import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";
import { links } from "@/lib/event";
import { speakerGroups, type Speaker } from "@/lib/speakers";
import styles from "./SpeakerProfile.module.css";

/**
 * One speaker's page body. The prose block is the verbatim paragraph
 * sequence from the source bio page — talk abstract and biography run
 * together with no reliable boundary (see lib/speakers.ts), so it is
 * rendered as-is under a neutral heading rather than mislabelled "Bio".
 */
export function SpeakerProfile({ speaker }: { speaker: Speaker }) {
  const accentVar =
    speakerGroups.find((g) => g.id === speaker.track)?.accentVar ?? "--indigo";
  /*
    16 headshots exist only at 190×190. Rendering those at native size
    instead of upscaling keeps them sharp; larger sources get a larger plate.
  */
  const portraitSize = speaker.headshotLowRes ? 190 : 280;

  return (
    <section
      className={styles.page}
      style={{ "--accent": `var(${accentVar})` } as React.CSSProperties}
    >
      <div className={styles.inner}>
        <Link className={styles.back} href="/#roster">
          ← ALL SPEAKERS
        </Link>

        <div className={styles.header}>
          <div
            className={styles.portraitWrap}
            style={{ width: portraitSize, height: portraitSize }}
          >
            <Image
              className={styles.portrait}
              src={speaker.headshot}
              alt={speaker.name}
              fill
              sizes={`${portraitSize}px`}
              priority
            />
            <span className={styles.rule} aria-hidden="true" />
          </div>

          <div className={styles.headMeta}>
            <div className={styles.track}>{speaker.trackLabel}</div>
            <h1 className={styles.name}>{speaker.name}</h1>
            <p className={styles.tagline}>{speaker.tagline}</p>
            {speaker.linkedin && (
              <a className={styles.linkedin} href={speaker.linkedin}>
                <span className={styles.liMark} aria-hidden="true">
                  in
                </span>
                LINKEDIN
              </a>
            )}
          </div>
        </div>

        <div className={styles.sessions}>
          {speaker.sessions.map((x) => (
            <div key={`${x.dayLabel}-${x.start}`} className={styles.session}>
              <div className={styles.sessionWhen}>
                <Icon name="calendar_view_day" size={17} color="var(--accent)" />
                {x.dayLabel.toUpperCase()} · {x.start} – {x.end} ·{" "}
                {x.trackLabel.toUpperCase()}
              </div>
              <div className={styles.sessionTitle}>{x.title}</div>
            </div>
          ))}
        </div>

        <div className={styles.columns}>
          <div className={styles.prose}>
            {speaker.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <aside className={styles.aside} aria-label="Credentials">
            <h2 className={styles.asideHead}>CREDENTIALS</h2>
            <ul className={styles.credentials}>
              {speaker.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </aside>
        </div>

        <div className={styles.cta}>
          <a className={styles.ctaButton} href={links.tickets}>
            <Icon name="confirmation_number" size={18} />
            REGISTER FOR CSC 2026
          </a>
          <Link className={styles.ctaSecondary} href="/#agenda">
            FULL AGENDA →
          </Link>
        </div>
      </div>
    </section>
  );
}
