import { Icon } from "../Icon";
import { support } from "@/lib/institute";
import { links } from "@/lib/event";
import styles from "./Support.module.css";

/**
 * Section 11 — the closing donation ask. Links straight to the Zeffy form
 * (the source /donate page is only a redirect to it). Not in the menu: the
 * nav's DONATE button is this section's CTA.
 */
export function Support() {
  return (
    <section id="support" className={styles.section} aria-labelledby="support-h">
      <div className={styles.inner}>
        <div className={styles.kicker}>
          <Icon name="volunteer_activism" size={18} color="var(--cyan)" />
          11 / SUPPORT
        </div>
        <h2 id="support-h" className={styles.heading}>
          {support.heading}
        </h2>
        {support.body.map((p) => (
          <p key={p.slice(0, 32)} className={styles.copy}>
            {p}
          </p>
        ))}
        <a className={styles.cta} href={links.donate}>
          DONATE
        </a>
        <div className={styles.note}>
          501(C)(3) · EIN 92-3238363 · 100% OF DONATIONS FUND THE MISSION
        </div>
      </div>
    </section>
  );
}
