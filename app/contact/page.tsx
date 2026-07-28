import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { MailLink } from "@/components/MailLink";
import { Icon } from "@/components/Icon";
import { contactReasons } from "@/lib/contact";
import styles from "./page.module.css";

/**
 * Replaces the old site's /contact, at the same path.
 *
 * The original was a Wix Form posting to Wix, so it cannot be carried over:
 * this site is fully static and has no server to accept a POST. Rather than
 * bolt on a third-party form service, each of the form's seven subject
 * options becomes a pre-addressed mail link — same routing, no backend, and
 * no new processor handling people's messages.
 *
 * The address itself is never written into the HTML; see lib/contact.ts.
 * If a real form is ever wanted, it needs somewhere to post and a spam
 * challenge — that is a backend decision, not a page-layout one.
 */
export const metadata: Metadata = {
  title: "Contact — Cognitive Security Institute",
  description:
    "Whether looking to collaborate, ask a question, or share your story, we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <TextPage
      title="Contact us"
      /* Deck is the source page's own subhead, verbatim. */
      deck="Whether looking to collaborate, ask a question, or share your story, we'd love to hear from you."
    >
      <p className={styles.lede}>
        Pick the line that fits and your mail client will open with the
        subject filled in — it helps us route your message to the right
        person.
      </p>

      <ul className={styles.list}>
        {contactReasons.map((r) => (
          <li key={r.subject}>
            <MailLink className={styles.item} subject={r.subject}>
              <Icon name="mail" size={22} color="var(--indigo-deep)" />
              <span className={styles.text}>
                <span className={styles.subject}>{r.subject}</span>
                <span className={styles.blurb}>{r.blurb}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">
                →
              </span>
            </MailLink>
          </li>
        ))}
      </ul>
    </TextPage>
  );
}
