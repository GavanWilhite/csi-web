import { links } from "@/lib/event";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          {/* Fixed-height chrome logo — plain <img> is the right tool here. */}
          <img
            className={styles.logo}
            src="/assets/csi-logo-horizontal-white.png"
            alt="Cognitive Security Institute"
            width={2718}
            height={578}
          />
          <p className={styles.legal}>
            The Cognitive Security Institute is a registered 501(c)(3)
            organization. EIN: 92-3238363 · State of Oregon Registration #66753.
          </p>
          <p className={styles.copyright}>
            ©2026 Cognitive Security Institute. All rights reserved.
          </p>
        </div>
        <nav className={styles.nav} aria-label="Footer">
          <a className={styles.donate} href={links.donate}>
            DONATE
          </a>
          <a className={styles.link} href={links.contact}>
            CONTACT
          </a>
          <a className={styles.link} href={links.disclaimer}>
            DISCLAIMER
          </a>
          <a className={styles.link} href={links.sitemap}>
            SITEMAP
          </a>
        </nav>
      </div>
    </footer>
  );
}
