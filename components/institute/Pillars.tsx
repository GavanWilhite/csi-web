import Image from "next/image";
import { Icon } from "../Icon";
import { focus5 } from "@/lib/institute";
import styles from "./Pillars.module.css";

/**
 * The five pillars: small images restored, icons added, short descriptions
 * kept. Card grid rather than the full-width ledger strip it briefly was —
 * that read as a system bar and there are already other bands on the page.
 * The definition that shared this band is gone at the client's direction.
 */
export function Pillars() {
  return (
    <section id="pillars" className="section" aria-labelledby="pillars-h">
      <div className={styles.inner}>
        <h2 id="pillars-h" className={styles.heading}>
          <Icon name="hub" size={22} color="var(--cyan)" />
          Five pillars
        </h2>

        <ul className={styles.grid}>
          {focus5.pillars.map((f, i) => (
            <li key={f.name} className={styles.card}>
              <div className={styles.art}>
                <Image
                  src={f.image}
                  alt=""
                  fill
                  sizes="(max-width: 560px) 45vw, 200px"
                />
              </div>
              <div className={styles.body}>
                <div className={styles.topRow}>
                  <span className={styles.num}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon name={f.icon} size={17} color="var(--indigo-deep)" />
                </div>
                <h3 className={styles.name}>{f.name}</h3>
                <p className={styles.blurb}>{f.blurb}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
