import Image from "next/image";
import { Icon } from "./Icon";
import { event, links } from "@/lib/event";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.dots} aria-hidden="true" />
      <div className={styles.wash} aria-hidden="true" />

      <div className={styles.inner}>
        <div>
          <h1 id="hero-title" className={styles.title}>
            Defend
            <br />
            the <span className={styles.titleAccent}>mind.</span>
          </h1>

          <p className={styles.lede}>
            The Cognitive Security Conference: two days on human risk, AI
            security, and cognitive warfare with the people defining the field.
            Minus the lines, badges, and noise of Hacker Summer Camp.
          </p>

          <div className={styles.facts}>
            <div className={styles.fact}>
              <Icon name="calendar_month" size={21} color="var(--indigo-deep)" />
              {event.dates}
            </div>
            <div className={styles.fact}>
              <Icon name="location_on" size={21} color="var(--indigo-deep)" />
              {event.venue}, Las Vegas
            </div>
            <div className={styles.fact}>
              <Icon name="groups" size={21} color="var(--indigo-deep)" />
              Limited to {event.capacity} attendees
            </div>
          </div>

          <div className={styles.actions}>
            <a className={styles.primary} href={links.tickets}>
              GET TICKETS
            </a>
            <a className={styles.secondary} href="#agenda">
              VIEW AGENDA
            </a>
            {event.earlyBird && (
              <span className={styles.earlyBird}>
                ▲ EARLY-BIRD PRICING ENDS {event.earlyBirdEnds.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className={styles.plateWrap}>
          <div className={styles.plate}>
            <div className={styles.plateDots} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.tl}`} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.tr}`} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.bl}`} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.br}`} aria-hidden="true" />
            <Image
              className={styles.emblem}
              src="/assets/csc26-logo-ravens.png"
              alt="Cognitive Security Conference 2026 raven emblem"
              width={3783}
              height={3145}
              priority
              sizes="(max-width: 900px) 340px, 33vw"
            />
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statsInner}>
          <div className={styles.stat}>
            <div className={styles.statNum}>02</div>
            <div className={styles.statLabel}>DAYS</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>03</div>
            <div className={styles.statLabel}>TRACKS</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>35</div>
            <div className={styles.statLabel}>SPEAKERS</div>
          </div>
        </div>
      </div>
    </section>
  );
}
