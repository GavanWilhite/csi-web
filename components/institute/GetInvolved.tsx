import { Icon } from "../Icon";
import { getInvolved } from "@/lib/institute";
import styles from "./GetInvolved.module.css";

/**
 * Section 10 — the page's one ask, closing the way the conference page does:
 * a full-bleed masked dot field with the manifesto line set large.
 *
 * The deck carries the heading, so there is no separate "Get involved" title —
 * the nav anchor label does that job. Donate is the single filled primary and
 * the other two routes are outlined: three identical buttons was part of the
 * monotony, and for a nonprofit the donation is the primary ask (it is
 * already the nav CTA).
 */
export function GetInvolved() {
  return (
    <section id="get-involved" className={styles.section} aria-labelledby="gi-h">
      <div className={styles.dots} aria-hidden="true" />
      <div className={styles.inner}>
        <h2 id="gi-h" className={styles.heading}>
          Cognitive security is a{" "}
          <span className={styles.accent}>collective mission.</span>
        </h2>

        <ul className={styles.grid}>
          {getInvolved.routes.map((r, i) => (
            <li key={r.name} className={styles.card}>
              <Icon name={r.icon} size={24} color="var(--indigo-deep)" />
              <h3 className={styles.name}>{r.name}</h3>
              <p className={styles.blurb}>{r.blurb}</p>
              <a
                className={i === 2 ? styles.ctaPrimary : styles.ctaSecondary}
                href={r.href}
              >
                {r.ctaLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
