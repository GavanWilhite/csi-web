import Link from "next/link";
import { event } from "@/lib/event";
import styles from "./ConferenceBanner.module.css";

/**
 * Slim band above the institute nav pointing back at the conference page.
 * Dates and venue come from lib/event.ts so this can never drift from the
 * conference page itself.
 */
export function ConferenceBanner() {
  return (
    <Link className={styles.banner} href="/">
      <span className={styles.label}>
        {event.shortName} · {event.dates.toUpperCase()} · LAS VEGAS
      </span>
      <span className={styles.cta}>THE CONFERENCE →</span>
    </Link>
  );
}
