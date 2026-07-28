"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import type { Person } from "@/lib/people";
import styles from "./PersonModal.module.css";

/**
 * Bio lightbox. Replaces an inline <details> disclosure: bios run to a few
 * hundred words and reading them inside a 200px grid cell was the problem.
 *
 * Uses the native <dialog> element so the browser supplies the top layer, the
 * backdrop, modal focus containment and Escape-to-close rather than us
 * reimplementing them. Body scroll is locked while open, and focus returns to
 * whichever card opened it.
 */
export function PersonModal({
  person,
  onClose,
}: {
  person: Person | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (person && !el.open) {
      el.showModal();
      document.body.style.overflow = "hidden";
    } else if (!person && el.open) {
      el.close();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [person]);

  // Clicking the backdrop (the dialog's own box outside the panel) closes it.
  const onBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === ref.current) onClose();
    },
    [onClose],
  );

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      onClose={onClose}
      onClick={onBackdrop}
      aria-labelledby="person-modal-name"
    >
      {person && (
        <div className={styles.panel}>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>

          <div className={styles.head}>
            <div className={styles.portraitWrap}>
              <Image
                className={styles.portrait}
                src={person.portrait}
                alt={`Portrait of ${person.name}`}
                width={320}
                height={320}
                /* Immediately visible when the dialog opens, so lazy loading
                   would leave an empty plate for the first paint. */
                loading="eager"
              />
            </div>
            <div>
              <h2 id="person-modal-name" className={styles.name}>
                {person.name}
              </h2>
              <p className={styles.role}>{person.role}</p>
              {(person.linkedin || person.website) && (
                <p className={styles.links}>
                  {person.linkedin && <a href={person.linkedin}>LINKEDIN →</a>}
                  {person.website && <a href={person.website}>WEBSITE →</a>}
                </p>
              )}
            </div>
          </div>

          <div className={styles.bio}>
            {person.bio.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}
