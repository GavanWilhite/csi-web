import { Icon } from "./Icon";
import { Kicker } from "./Kicker";
import { links } from "@/lib/event";
import styles from "./TravelBriefs.module.css";

const briefs = [
  {
    href: links.travelBriefHumanRisk,
    title: "Human Risk & Security Professionals",
    sub: "Cybersecurity, insider threat, behavioral risk, security awareness",
  },
  {
    href: links.travelBriefCogWar,
    title: "Info Ops & Cognitive Warfare Professionals",
    sub: "Information operations, PSYOP, strategic communications, influence",
  },
];

export function TravelBriefs() {
  return (
    <section id="travel" className="section" aria-labelledby="travel-h">
      <div className={styles.inner}>
        <div>
          <Kicker
            id="travel-h"
            index="07"
            label="TRAVEL BRIEFS"
            icon="flight_takeoff"
            heading="Travel briefs"
          />
          <p className={styles.blurb}>
            Conference travel needs a business case. We already wrote yours:
            download the brief that matches your role and hand it to your
            approver.
          </p>
        </div>

        <ul className={styles.list}>
          {briefs.map((b) => (
            <li key={b.href}>
              <a className={styles.item} href={b.href}>
                <Icon name="description" size={28} color="var(--indigo-deep)" />
                <span className={styles.itemText}>
                  <span className={styles.itemTitle}>{b.title}</span>
                  <span className={styles.itemSub}>{b.sub}</span>
                </span>
                <span className={styles.badge}>PDF ↓</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
