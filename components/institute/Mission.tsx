import { definition, mission } from "@/lib/institute";
import { people } from "@/lib/people";
import styles from "./Mission.module.css";

/**
 * Sections 01 (mission) and 02 (definition), built as the page's hero.
 *
 * It previously opened on the same kicker-and-two-columns pattern every other
 * section uses, so the page began flat and stayed flat. This borrows the
 * conference hero's grammar wholesale — masked dot field, dual washes,
 * asymmetric grid, bracketed plate, stat strip — so /institute and / read as
 * one site. No new copy: the headline is the mission's own two punch lines.
 *
 * The definition is the plate. This page has no square emblem to frame (the
 * CSI logo is a wide lockup), and the definition is the one block that earns
 * that emphasis.
 */
export function Mission() {
  return (
    <section id="mission" className={styles.hero} aria-labelledby="mission-h">
      <div className={styles.dots} aria-hidden="true" />
      <div className={styles.wash} aria-hidden="true" />

      <div className={styles.inner}>
        <div>
          <div className={styles.kicker}>01 / MISSION</div>
          <h1 id="mission-h" className={styles.title}>
            Traditional cybersecurity
            <br />
            isn&rsquo;t enough. We need{" "}
            <span className={styles.titleAccent}>cognitive security.</span>
          </h1>
          <p className={styles.lede}>{mission.deck}</p>
        </div>

        <div className={styles.plateWrap}>
          <div id="definition" className={styles.plate}>
            <div className={styles.plateDots} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.tl}`} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.tr}`} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.bl}`} aria-hidden="true" />
            <span className={`${styles.bracket} ${styles.br}`} aria-hidden="true" />
            <div className={styles.plateBody}>
              <div className={styles.plateKicker}>02 / DEFINITION</div>
              <h2 className={styles.plateHead}>{definition.heading}</h2>
              {definition.body.map((p) => (
                <p key={p.slice(0, 32)} className={styles.plateCopy}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statsInner}>
          <div className={styles.stat}>
            <div className={styles.statNum}>05</div>
            <div className={styles.statLabel}>RESEARCH PILLARS</div>
          </div>
          <div className={styles.stat}>
            {/* Derived, so it cannot drift from the roster below. */}
            <div className={styles.statNum}>{people.length}</div>
            <div className={styles.statLabel}>EXPERTS &amp; ADVISORS</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>501(c)(3)</div>
            <div className={styles.statLabel}>NONPROFIT</div>
          </div>
        </div>
      </div>
    </section>
  );
}
