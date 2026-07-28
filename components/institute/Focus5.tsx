import Image from "next/image";
import { Kicker } from "../Kicker";
import { focus5 } from "@/lib/institute";
import styles from "./Focus5.module.css";

/** Section 03 — the five focus domains. Scrolled past, not in the menu. */
export function Focus5() {
  return (
    <section id="focus-5" className="section" aria-labelledby="focus5-h">
      <div className={styles.inner}>
        <Kicker
          id="focus5-h"
          index="03"
          label="FOCUS 5"
          icon="hub"
          heading="The Focus 5 pillars"
        />
        <div className={styles.intro}>
          {focus5.intro.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>

        <ul className={styles.grid}>
          {focus5.pillars.map((f, i) => (
            <li key={f.name} className={styles.card}>
              <div className={styles.art}>
                <Image
                  src={f.image}
                  alt=""
                  fill
                  sizes="(max-width: 560px) 90vw, (max-width: 900px) 45vw, 220px"
                />
              </div>
              <div className={styles.meta}>
                <div className={styles.num}>0{i + 1}</div>
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
