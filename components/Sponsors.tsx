import { Icon } from "./Icon";
import { sponsors } from "@/lib/content";
import Link from "next/link";
import { contactHref } from "@/lib/contact";
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
          <Link className={styles.prospectus} href={contactHref("sponsorship")}>
            REQUEST SPONSOR PROSPECTUS →
          </Link>
        </div>

        <ul className={styles.grid}>
          {sponsors.map((s) => {
            // Sponsor marks are supplied white-on-transparent and are only
            // legible on the inverse band. Rendered as plain <img>: these are
            // trademarks and must not be re-encoded or recoloured. Marks link
            // out where the source site links them (4 of 7) — sponsors paid
            // for the click.
            const logo = (
              <img
                className={styles.logo}
                src={s.logo}
                alt={s.name}
                style={{ maxHeight: s.maxHeight }}
                loading="lazy"
              />
            );
            return (
              <li key={s.name} className={styles.cell}>
                {s.url ? (
                  <a className={styles.logoLink} href={s.url}>
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </li>
            );
          })}
          <li className={styles.cell}>
            <span className={styles.open}>YOUR LOGO HERE</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
