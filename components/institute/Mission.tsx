import { mission } from "@/lib/institute";
import styles from "./Mission.module.css";

/**
 * The page's hero. Deliberately spare: one statement, one lede, and the
 * conference hero's dot field and washes doing the visual work.
 *
 * Previously carried a bracketed "what is cognitive security?" plate and a
 * three-up metric strip. Both are gone at the client's direction — the
 * definition restated the headline, and the metrics measured nothing anyone
 * came here for.
 */
export function Mission() {
  return (
    <section id="mission" className={styles.hero} aria-labelledby="mission-h">
      <div className={styles.dots} aria-hidden="true" />
      <div className={styles.wash} aria-hidden="true" />

      <div className={styles.inner}>
        <h1 id="mission-h" className={styles.title}>
          We need{" "}
          <span className={styles.titleAccent}>cognitive security.</span>
        </h1>
        <p className={styles.lede}>{mission.deck}</p>
      </div>
    </section>
  );
}
