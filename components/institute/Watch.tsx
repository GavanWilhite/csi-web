import { Kicker } from "../Kicker";
import { VideoRow } from "./VideoRow";
import { instituteLinks } from "@/lib/institute";
import styles from "./Watch.module.css";

/**
 * Section 01b — the channel, lifted near the top of the page. This is the
 * only genuinely live content on the site: everything below it is static
 * prose that dates slowly, while this changes whenever CSI publishes. It
 * used to sit inside Events, most of a page-scroll down.
 */
export function Watch() {
  return (
    <section id="watch" className={styles.section} aria-labelledby="watch-h">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Kicker
            id="watch-h"
            index="03"
            label="WATCH"
            icon="play_circle"
            heading="From the channel"
          />
          <a className={styles.channelLink} href={instituteLinks.youtube}>
            ALL VIDEOS →
          </a>
        </div>
      </div>
      <VideoRow />
    </section>
  );
}
