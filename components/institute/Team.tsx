"use client";

import { useState } from "react";
import Image from "next/image";
import { people, personGroups, type Person } from "@/lib/people";
import { PersonModal } from "./PersonModal";
import styles from "./Team.module.css";

/**
 * Staff, board and the Strategic Advisory Council.
 *
 * Cards open a lightbox rather than expanding in place: bios run to a few
 * hundred words and reading them inside a grid cell was the problem. All bios
 * still ship in the initial HTML (the modal renders from the same data, and
 * the cards are server-rendered), so nothing is hidden from crawlers.
 *
 * Column counts are computed per group so rows come out even, instead of a
 * straight wrap leaving one person stranded on a final row.
 */

/**
 * One column count for every group, so a three-person board renders the same
 * card size as a ten-person council rather than three huge ones. Rows still
 * come out near-even: 9 -> 5+4, 10 -> 5+5, 3 -> one row of three.
 */
const COLUMNS = 5;

export function Team() {
  const [open, setOpen] = useState<Person | null>(null);

  return (
    <section id="team" className="section" aria-labelledby="team-h">
      <div className={styles.inner}>
        <h2 id="team-h" className={styles.heading}>
          The people
        </h2>

        {personGroups.map((g) => {
          const members = people.filter((p) => p.group === g.id);
          return (
            <div key={g.id} className={styles.group}>
              <h3 className={styles.groupHead}>{g.label}</h3>
              <ul
                className={styles.grid}
                style={
                  { "--cols": COLUMNS } as React.CSSProperties
                }
              >
                {members.map((p) => (
                  <li key={p.slug} className={styles.cell}>
                    <button
                      type="button"
                      className={styles.card}
                      onClick={() => setOpen(p)}
                      aria-haspopup="dialog"
                    >
                      <span className={styles.portraitWrap}>
                        <Image
                          className={styles.portrait}
                          src={p.portrait}
                          alt={`Portrait of ${p.name}`}
                          fill
                          sizes="(max-width: 640px) 45vw, 240px"
                        />
                      </span>
                      <span className={styles.meta}>
                        <span className={styles.name}>{p.name}</span>
                        <span className={styles.role}>{p.role}</span>
                        <span className={styles.hint} aria-hidden="true">
                          BIO +
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <PersonModal person={open} onClose={() => setOpen(null)} />
    </section>
  );
}
