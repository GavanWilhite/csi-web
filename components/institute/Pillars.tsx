import { focus5 } from "@/lib/institute";
import styles from "./Pillars.module.css";

/**
 * The five pillars as a compact strip, no descriptions, sitting directly above
 * the channel. It was a five-card grid with blurbs, which gave a taxonomy list
 * the same visual weight as the page's real content. Names are enough here —
 * the detail lives in the research the pillars organise.
 */
export function Pillars() {
  return (
    <section aria-label="Research pillars" className={styles.strip}>
      <div className={styles.inner}>
        <span className={styles.label}>FIVE PILLARS</span>
        <ul className={styles.list}>
          {focus5.pillars.map((f, i) => (
            <li key={f.name} className={styles.item}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              {f.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
