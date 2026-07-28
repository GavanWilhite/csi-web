import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { MailLink } from "@/components/MailLink";
import { Icon } from "@/components/Icon";
import { apply } from "@/lib/apply";
import { subjects } from "@/lib/contact";
import styles from "./page.module.css";

/**
 * Replaces the old site's /apply, at the same path.
 *
 * The original was a Wix Form and this site is static, so there is nothing
 * to post to. Applications come in by mail: the address is assembled after
 * hydration (see components/MailLink.tsx) and shown in full, so it can be
 * copied as well as clicked.
 */
export const metadata: Metadata = {
  title: "Membership application — Cognitive Security Institute",
  description: apply.deck,
};

export default function ApplyPage() {
  return (
    <TextPage
      title="Membership application"
      deck={apply.deck}
      back={{ href: "/institute", label: "← BACK TO THE INSTITUTE" }}
    >
      <p>{apply.intro}</p>

      <p className={styles.addressLine}>
        <Icon name="mail" size={20} color="var(--indigo-deep)" />
        {/* No children: the link text is the address itself. */}
        <MailLink className={styles.address} subject={subjects.membership} />
      </p>

      <h2>Please include</h2>
      <ul>
        {apply.asks.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>

      <h2>References</h2>
      <p>{apply.references.note}</p>
      <p>{apply.references.ask}</p>
    </TextPage>
  );
}
