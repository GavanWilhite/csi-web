"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icon";
import { Kicker } from "./Kicker";
import { days, type DayId } from "@/lib/agenda";
import { tracks } from "@/lib/content";
import Link from "next/link";
import styles from "./Agenda.module.css";

export function Agenda({ standalone = false }: { standalone?: boolean } = {}) {
  const [day, setDay] = useState<DayId>("thu");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow-key roving focus, per the tabs pattern.
  function onTabKey(e: React.KeyboardEvent, i: number) {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + days.length) % days.length;
    setDay(days[next].id);
    tabRefs.current[next]?.focus();
  }

  return (
    <section id="agenda" className="section" aria-labelledby="agenda-h">
      <div className={styles.inner}>
        <div className={styles.head}>
          <Kicker
            id="agenda-h"
            index="04"
            label="AGENDA"
            icon="calendar_view_day"
            heading="Agenda"
          />
          <div className={styles.tabs} role="tablist" aria-label="Conference day">
            {days.map((d, i) => (
              <button
                key={d.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${d.id}`}
                aria-selected={d.id === day}
                aria-controls={`panel-${d.id}`}
                tabIndex={d.id === day ? 0 : -1}
                className={styles.tab}
                onClick={() => setDay(d.id)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/*
          Both days are rendered server-side and the inactive one carries the
          `hidden` attribute, rather than swapping the panel on state. That
          keeps all 53 agenda rows (45 sessions + 8 breaks) in the prerendered
          HTML so they are indexable. (Switching still needs JS — without it
          the second day stays hidden, which is why the full-agenda link below
          is not decorative.)
        */}
        {days.map((d) => (
          <div
            key={d.id}
            id={`panel-${d.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${d.id}`}
            tabIndex={0}
            className={styles.table}
            hidden={d.id !== day}
          >
            <h3 className="srOnly">{d.full}</h3>
            <div className={styles.colHeads} aria-hidden="true">
              <div className={styles.colHead}>TIME</div>
              {tracks.map((t) => (
                <div key={t.id} className={styles.colHead}>
                  <Icon name={t.icon} size={18} color={`var(${t.accentVar})`} />
                  {t.short}
                </div>
              ))}
            </div>

            {d.blocks.map((b, i) =>
              b.kind === "main" ? (
                <div
                  key={`${d.id}-m-${i}`}
                  className={styles.mainRow}
                  data-feature={b.feature ? "true" : "false"}
                >
                  <div className={styles.time}>{b.time}</div>
                  <div className={styles.mainTitle}>
                    <span className={styles.dot} aria-hidden="true" />
                    {b.title}
                  </div>
                  <div className={styles.who}>{b.who ?? ""}</div>
                </div>
              ) : b.kind === "break" ? (
                // Breaks are orientation, not content — visibly subordinate
                // to session rows.
                <div key={`${d.id}-b-${i}`} className={styles.breakRow}>
                  <div className={styles.time}>{b.time}</div>
                  <div className={styles.breakLabel}>BREAK</div>
                </div>
              ) : (
                <div key={`${d.id}-c-${i}`} className={styles.colsRow}>
                  <div className={styles.colsTime}>{b.time}</div>
                  {b.cells.map((sessions, ti) => (
                    <div
                      key={tracks[ti].id}
                      className={styles.cell}
                      data-empty={sessions.length === 0 ? "true" : "false"}
                      style={
                        {
                          "--accent": `var(${tracks[ti].accentVar})`,
                        } as React.CSSProperties
                      }
                    >
                      <span className={styles.trackLabel}>
                        {tracks[ti].short}
                      </span>
                      {sessions.map((s) => (
                        <div key={s.title}>
                          <div className={styles.sessionTitle}>{s.title}</div>
                          {(s.who || s.at) && (
                            <div className={styles.sessionWho}>
                              {s.who}
                              {s.at ? ` · ${s.at}` : ""}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ),
            )}
          </div>
        ))}

        {/* Pinnable full-page version. The old outbound link pointed at the
            Wix agenda, which this replaces. Suppressed on that page itself. */}
        {!standalone && (
          <p className={styles.footnote}>
            <Link href="/csc26-agenda">OPEN THE FULL AGENDA →</Link>
          </p>
        )}
      </div>
    </section>
  );
}
