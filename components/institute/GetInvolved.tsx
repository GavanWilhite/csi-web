import { Icon } from "../Icon";
import { Kicker } from "../Kicker";
import { getInvolved } from "@/lib/institute";
import styles from "./GetInvolved.module.css";

/**
 * Section 08 — the single ask. Replaces the source's three separate Partners,
 * Join and Support pages, which each opened with a wall of copy before
 * arriving at the same shape of request. Three routes, one line each, one
 * button each.
 */
export function GetInvolved() {
  return (
    <section id="get-involved" className={styles.section} aria-labelledby="gi-h">
      <div className={styles.inner}>
        <Kicker
          id="gi-h"
          index="10"
          label="GET INVOLVED"
          icon="group_add"
          heading="Get involved"
        />
        <p className={styles.deck}>{getInvolved.deck}</p>

        <ul className={styles.grid}>
          {getInvolved.routes.map((r) => (
            <li key={r.name} className={styles.card}>
              <Icon name={r.icon} size={26} color="var(--indigo-deep)" />
              <h3 className={styles.name}>{r.name}</h3>
              <p className={styles.blurb}>{r.blurb}</p>
              <a className={styles.cta} href={r.href}>
                {r.ctaLabel}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.note}>{getInvolved.note}</div>
      </div>
    </section>
  );
}
