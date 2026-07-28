import Image from "next/image";
import { Kicker } from "../Kicker";
import { instituteLinks, research } from "@/lib/institute";
import styles from "./Research.module.css";

/**
 * Section 04 — research and active projects. The CAT is the lead card (the
 * one active project with a live public destination); Evil Digital Twin is
 * a compact secondary link. The Research Library is deliberately absent —
 * its source button has no destination.
 */
export function Research() {
  return (
    <section id="research" className="section" aria-labelledby="research-h">
      <div className={styles.inner}>
        <Kicker
          id="research-h"
          index="04"
          label="RESEARCH"
          icon="science"
          heading="Research and active projects"
        />
        <p className={styles.deck}>{research.deck}</p>
        <div className={styles.intro}>
          {research.intro.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
          <p>{research.activeProjectsIntro}</p>
        </div>

        <div className={styles.cat}>
          <div className={styles.catArt}>
            {/* Decorative abstract, not a product shot — the heading carries
                the meaning, so the image stays out of the a11y tree. */}
            <Image
              src={research.cat.image}
              alt=""
              width={research.cat.imageWidth}
              height={research.cat.imageHeight}
              sizes="(max-width: 860px) 90vw, 380px"
            />
          </div>
          <div className={styles.catBody}>
            <h3 className={styles.catHead}>{research.cat.heading}</h3>
            {research.cat.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <a className={styles.catCta} href={instituteLinks.cat}>
              {research.cat.ctaLabel}
            </a>

            <div className={styles.edt}>
              <h4 className={styles.edtHead}>{research.evilDigitalTwin.heading}</h4>
              <p className={styles.edtBlurb}>{research.evilDigitalTwin.blurb}</p>
              <a className={styles.edtCta} href={instituteLinks.evilDigitalTwin}>
                {research.evilDigitalTwin.ctaLabel} →
              </a>
            </div>
          </div>
        </div>

        <p className={styles.closing}>{research.closing}</p>
      </div>
    </section>
  );
}
