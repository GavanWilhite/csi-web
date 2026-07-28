import { Kicker } from "./Kicker";
import { links } from "@/lib/event";
import styles from "./About.module.css";

export function About() {
  return (
    <section className="section" aria-labelledby="about-h">
      <div className={styles.inner}>
        <Kicker
          id="about-h"
          index="01"
          label="ABOUT"
          icon="psychology"
          heading="The conference"
        />
        <div>
          <p className={styles.body}>
            Cognitive security sits at the convergence of cybersecurity,
            neuroscience, and information warfare. This is its annual meeting
            point. Hosted by the{" "}
            <a href={links.institute}>Cognitive Security Institute</a>, the
            conference puts practitioners, researchers, neuroscientists,
            mentalists, psychologists, policymakers, and reformed con artists in
            the same rooms for two days: the people who study cognitive hacking,
            next to the people who&rsquo;ve done it.
          </p>
          {/* Verbatim from the source site — an attributed quotation must not
              be edited for rhythm. */}
          <blockquote className={styles.quote}>
            <p>
              &ldquo;You can find two people who come together who would not
              normally meet, and they are going to go create a paper or a
              project from the connections made here. That is the most
              important thing as everything becomes more robotic and the human
              element goes away.&rdquo;
            </p>
            <footer className={styles.attribution}>
              WEB BEGOLE, CO-FOUNDER &amp; CTO, MARKETREADER
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
