import { mission } from "@/lib/institute";
import styles from "./Mission.module.css";

/**
 * The page's hero. Deliberately spare: one statement, one lede, and the
 * conference hero's dot field and washes doing the visual work.
 *
 * The definition moved out to the Foundations band below, where it sits
 * beside the five pillars. The three-up metric strip stays gone.
 */
export function Mission() {
  return (
    <section id="mission" className={styles.hero} aria-labelledby="mission-h">
      <div className={styles.dots} aria-hidden="true" />
      <div className={styles.wash} aria-hidden="true" />

      <div className={styles.inner}>
        {/* No terminal periods: display type, and one period present with the
            other absent read worse than none. The line break does the work
            the full stop would. */}
        <h1 id="mission-h" className={styles.title}>
          Cybersecurity isn&rsquo;t enough,
          <br />
          we need{" "}
          <span className={styles.titleAccent}>cognitive security</span>
        </h1>
        <p className={styles.lede}>{mission.deck}</p>
      </div>
    </section>
  );
}
