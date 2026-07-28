import Image from "next/image";
import { Kicker } from "../Kicker";
import { instituteLinks, research } from "@/lib/institute";
import styles from "./Research.module.css";

/**
 * Section 03 — active projects, as two matched blocks. CAT previously
 * dominated as a lead card with Evil Digital Twin demoted beneath it in a
 * different typeface and a different link style; they are peers now — same
 * heading, same button, same weight. EDT ships no artwork, so it gets a
 * dot-field plate rather than leaving the pair lopsided.
 *
 * The Research Library is deliberately absent — its source button has no
 * destination.
 */
export function Research() {
  return (
    <section id="research" className="section" aria-labelledby="research-h">
      <div className={styles.inner}>
        <Kicker
          id="research-h"
          index="05"
          label="RESEARCH"
          icon="science"
          heading="Active projects"
        />

        <ul className={styles.grid}>
          <li className={styles.card}>
            <div className={styles.art}>
              {/* Decorative abstract, not a product shot — the heading
                  carries the meaning, so it stays out of the a11y tree. */}
              <Image
                src={research.cat.image}
                alt=""
                width={research.cat.imageWidth}
                height={research.cat.imageHeight}
                sizes="(max-width: 860px) 90vw, 480px"
              />
            </div>
            <div className={styles.body}>
              <h3 className={styles.head}>{research.cat.heading}</h3>
              {research.cat.body.map((p) => (
                <p key={p.slice(0, 32)} className={styles.blurb}>
                  {p}
                </p>
              ))}
              <a className={styles.cta} href={instituteLinks.cat}>
                {research.cat.ctaLabel}
              </a>
            </div>
          </li>

          <li className={styles.card}>
            <div className={`${styles.art} ${styles.artPlate}`} aria-hidden="true">
              <span className={styles.plateDots} />
            </div>
            <div className={styles.body}>
              <h3 className={styles.head}>{research.evilDigitalTwin.heading}</h3>
              <p className={styles.blurb}>{research.evilDigitalTwin.blurb}</p>
              <a className={styles.cta} href={instituteLinks.evilDigitalTwin}>
                {research.evilDigitalTwin.ctaLabel}
              </a>
            </div>
          </li>

          <li className={styles.card}>
            <div className={`${styles.art} ${styles.artPlate}`} aria-hidden="true">
              <span className={styles.plateDots} />
            </div>
            <div className={styles.body}>
              <h3 className={styles.head}>{research.phishGolf.heading}</h3>
              <p className={styles.blurb}>{research.phishGolf.blurb}</p>
              <a className={styles.cta} href={instituteLinks.phishGolf}>
                {research.phishGolf.ctaLabel}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
