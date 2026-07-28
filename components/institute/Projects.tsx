import Image from "next/image";
import { projects } from "@/lib/institute";
import styles from "./Projects.module.css";

/**
 * Active projects: CAT, Evil Digital Twin, Phish Golf, SHIELD and CTX in one
 * list. SHIELD and CTX used to have their own "Programmes" section, which gave
 * two community programmes the same weight as the whole research effort.
 *
 * Card art is each project's own mark, fetched from its own site. Evil Digital
 * Twin ships an animated loop as well as the still; the still doubles as the
 * poster and as the reduced-motion fallback.
 */
export function Projects() {
  return (
    <section id="research" className="section" aria-labelledby="projects-h">
      <div className={styles.inner}>
        <h2 id="projects-h" className={styles.heading}>
          Active projects
        </h2>

        <ul className={styles.grid}>
          {projects.map((pr) => (
            <li key={pr.id} className={styles.card} data-wide={!!pr.detail}>
              {pr.image && (
                <div
                  className={styles.art}
                  data-fit={pr.fit ?? "cover"}
                  data-light={pr.lightPlate ? "true" : "false"}
                >
                  <Image
                    src={pr.image}
                    alt=""
                    width={pr.imageWidth}
                    height={pr.imageHeight}
                    sizes="(max-width: 900px) 90vw, 380px"
                    className={pr.video ? styles.poster : undefined}
                  />
                  {pr.video && (
                    <video
                      className={styles.video}
                      src={pr.video}
                      poster={pr.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-hidden="true"
                    />
                  )}
                </div>
              )}

              <div className={styles.body}>
                <h3 className={styles.head}>{pr.heading}</h3>
                <p className={styles.blurb}>{pr.blurb}</p>

                {pr.detail && (
                  <ul className={styles.detail}>
                    {pr.detail.map((d) => (
                      <li key={d.name}>
                        <span className={styles.detailName}>{d.name}</span>
                        <span className={styles.detailBlurb}>{d.blurb}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <a className={styles.cta} href={pr.href}>
                  {pr.ctaLabel}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
