import { Kicker } from "../Kicker";
import { instituteLinks, join } from "@/lib/institute";
import styles from "./Join.module.css";

/**
 * Section 10 — membership, in APPLY framing. The source's /join promises
 * "free... no dues or gatekeeping" while its /apply flow is a reviewed
 * waitlist; per client direction this section describes the application
 * path and does not repeat the free/open copy.
 */
export function Join() {
  return (
    <section id="join" className="section" aria-labelledby="join-h">
      <div className={styles.inner}>
        <Kicker
          id="join-h"
          index="10"
          label="JOIN"
          icon="person_add"
          heading="Join the movement"
        />
        <p className={styles.deck}>{join.deck}</p>
        <div className={styles.body}>
          {join.body.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>

        <ul className={styles.benefits}>
          {join.benefits.map((b) => (
            <li key={b.name} className={styles.benefit}>
              <h3 className={styles.benefitName}>{b.name}</h3>
              <p className={styles.benefitBlurb}>{b.blurb}</p>
            </li>
          ))}
        </ul>

        <a className={styles.cta} href={instituteLinks.apply}>
          APPLY FOR MEMBERSHIP
        </a>
      </div>
    </section>
  );
}
