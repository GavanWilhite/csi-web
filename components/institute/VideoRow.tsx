import { channel, videos } from "@/lib/videos";
import styles from "./VideoRow.module.css";

function publishedLabel(iso: string): string {
  const d = new Date(iso);
  return d
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toUpperCase();
}

/**
 * Horizontal scroller of the channel's latest videos. Native scroll-snap,
 * no JS: the region is focusable so keyboard users can scroll it, every
 * card is a plain link, and the track scrolls inside its own overflow
 * container so the page never overflows horizontally.
 *
 * Data is a point-in-time snapshot — see lib/videos.ts.
 */
export function VideoRow() {
  return (
    <div className={styles.wrap}>
      <div className={styles.scrollerWrap}>
      <div
        className={styles.scroller}
        role="region"
        aria-label={`Latest videos from ${channel.title} on YouTube`}
        tabIndex={0}
      >
        <ul className={styles.track}>
          {videos.map((v) => (
            <li key={v.videoId} className={styles.item}>
              <a className={styles.card} href={v.watchUrl}>
                <span className={styles.thumbWrap}>
                  {/*
                    Thumbnails come from YouTube's CDN, URL carried verbatim
                    from the capture (maxresdefault does not exist for every
                    video — the livestream's 404s, so it carries hqdefault).
                    Plain <img>: remote host, lazy, fixed box.
                  */}
                  <img
                    className={styles.thumb}
                    src={v.thumbnail}
                    alt=""
                    loading="lazy"
                    width={480}
                    height={270}
                  />
                  {/* No badge at all for the livestream (null duration) —
                      never an empty chip. */}
                  {v.durationLabel && (
                    <span className={styles.duration}>{v.durationLabel}</span>
                  )}
                </span>
                <span className={styles.meta}>
                  <span className={styles.date}>
                    {publishedLabel(v.publishedAt)}
                  </span>
                  <span className={styles.title}>{v.title}</span>
                  {v.description && (
                    <span className={styles.desc}>{v.description}</span>
                  )}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
      </div>
  );
}
