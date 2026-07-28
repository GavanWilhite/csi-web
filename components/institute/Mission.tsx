import { Kicker } from "../Kicker";
import { definition, mission } from "@/lib/institute";
import styles from "./Mission.module.css";

/**
 * Sections 01 (mission) and 02 (definition). The definition reads as part
 * of the mission and shares the band; it keeps its own anchor.
 */
export function Mission() {
  return (
    <section id="mission" className="section" aria-labelledby="mission-h">
      <div className={styles.inner}>
        <Kicker
          id="mission-h"
          index="01"
          label="MISSION"
          icon="psychology"
          heading="A human-centered approach to security"
        />

        <div className={styles.lead}>
          <p className={styles.deck}>{mission.deck}</p>
          <div className={styles.body}>
            {mission.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>

        <div className={styles.approach}>
          <div id="definition" className={styles.definition}>
            {/* Keeps the section-numbering device continuous (01 → 02 → 03)
                even though the definition shares the mission's band. */}
            <div className={styles.definitionKicker}>02 / DEFINITION</div>
            <h3 className={styles.definitionHead}>{definition.heading}</h3>
            {definition.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
