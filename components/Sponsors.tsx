import { Icon } from "./Icon";
import { sponsors } from "@/lib/content";
import { links } from "@/lib/event";
import styles from "./Sponsors.module.css";

export function Sponsors() {
  return (
    <section id="sponsors" className={styles.section} aria-labelledby="sponsors-h">
      <div className={styles.inner}>
        <div className={styles.head}>
          <div>
            <div className={styles.kicker}>
              <Icon name="handshake" size={18} color="var(--cyan)" />
              05 / SPONSORS
            </div>
            <h2 id="sponsors-h" className={styles.heading}>
              Our sponsors
            </h2>
          </div>
          <a className={styles.prospectus} href={links.prospectusMailto}>
            REQUEST SPONSOR PROSPECTUS →
          </a>
        </div>

        <ul className={styles.grid}>
          {sponsors.map((s) => (
            <li key={s.name} className={styles.cell}>
              {/*
                Sponsor marks are supplied white-on-transparent and are only
                legible on the inverse band. Rendered as plain <img>: these are
                trademarks and must not be re-encoded or recoloured.
              */}
              <img
                className={styles.logo}
                src={s.logo}
                alt={s.name}
                style={{ maxHeight: s.maxHeight }}
                loading="lazy"
              />
            </li>
          ))}
          <li className={styles.cell}>
            <span className={styles.open}>YOUR LOGO HERE</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
