import { Icon } from "./Icon";
import { event, links } from "@/lib/event";
import styles from "./TicketsCta.module.css";

export function TicketsCta() {
  return (
    <section id="tickets" className={styles.section} aria-labelledby="tickets-h">
      <div className={styles.dots} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.kicker}>
          <Icon name="confirmation_number" size={18} color="var(--cyan)" />
          08 / REGISTRATION
        </div>
        <h2 id="tickets-h" className={styles.heading}>
          {event.capacity} seats.
          <br />
          Then <span className={styles.soldOut}>sold out.</span>
        </h2>
        <p className={styles.copy}>
          The venue caps attendance at {event.capacity}. When they&rsquo;re gone,
          they&rsquo;re gone.
          {event.earlyBird
            ? ` Early-bird pricing runs through ${event.earlyBirdEnds}.`
            : ""}
        </p>
        <a className={styles.cta} href={links.tickets}>
          GET TICKETS
        </a>
        <div className={styles.note}>
          100% OF PROCEEDS SUPPORT THE 501(C)(3)
        </div>
      </div>
    </section>
  );
}
