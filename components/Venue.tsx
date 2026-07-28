import { Icon } from "./Icon";
import { Kicker } from "./Kicker";
import { event, links } from "@/lib/event";
import styles from "./Venue.module.css";

export function Venue() {
  return (
    <section id="venue" className={styles.section} aria-labelledby="venue-h">
      <div className={styles.inner}>
        <Kicker
          id="venue-h"
          index="06"
          label="VENUE"
          icon="location_on"
          heading="Venue"
        />

        <div className={styles.panel}>
          <div className={styles.photo}>
            <div className={styles.photoDots} aria-hidden="true" />
            <p className={styles.photoLabel}>
              VENUE PHOTOGRAPH PENDING
              <br />
              TUSCANY SUITES &amp; CASINO
            </p>
          </div>

          <div className={styles.facts}>
            <div className={styles.fact}>
              <Icon name="hotel" size={26} color="var(--indigo-deep)" />
              <div>
                <div className={styles.factTitle}>{event.venue}</div>
                <div className={styles.factSub}>{event.venueAddress}</div>
              </div>
            </div>
            <div className={styles.fact}>
              <Icon name="meeting_room" size={26} color="var(--indigo-deep)" />
              <div>
                <div className={styles.factTitle}>{event.venueRooms}</div>
                <div className={styles.factSub}>
                  All sessions run in three adjacent rooms
                </div>
              </div>
            </div>
            <div className={styles.fact}>
              <Icon name="event_available" size={26} color="var(--indigo-deep)" />
              <div>
                <div className={styles.factTitle}>Right after BSides LV</div>
                <div className={styles.factSub}>
                  Plan one trip, catch two events
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <a className={styles.button} href={links.roomBlock}>
            <Icon name="bed" size={18} />
            ROOM BLOCK DETAILS
          </a>
        </div>
      </div>
    </section>
  );
}
