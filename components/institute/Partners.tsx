import { Kicker } from "../Kicker";
import { partners } from "@/lib/institute";
import { links } from "@/lib/event";
import styles from "./Partners.module.css";

/**
 * Section 09 — kept deliberately lean. No logo wall and no
 * Partnerships/Supporters links until the client resolves the source's
 * systematic label/destination swap (see lib/institute.ts).
 */
export function Partners() {
  return (
    <section id="partners" className="section" aria-labelledby="partners-h">
      <div className={styles.inner}>
        <Kicker
          id="partners-h"
          index="09"
          label="PARTNERS"
          icon="handshake"
          heading="Partners and supporters"
        />
        <p className={styles.deck}>{partners.deck}</p>
        <div className={styles.columns}>
          <div className={styles.body}>
            {partners.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <a className={styles.cta} href={links.contact}>
              TALK TO US ABOUT PARTNERING →
            </a>
          </div>
          <div className={styles.ways}>
            <h3 className={styles.waysHead}>WAYS TO PARTNER</h3>
            <ul className={styles.waysList}>
              {partners.ways.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
