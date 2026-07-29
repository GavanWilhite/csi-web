import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { EmailPanel } from "@/components/EmailPanel";
import { apply } from "@/lib/apply";
import { subjects } from "@/lib/contact";

/**
 * Replaces the old site's /apply, at the same path.
 *
 * The original was a Wix Form and this site is static, so there is nothing
 * to post to. Applications come in by mail, through the same panel /contact
 * uses — address in full, selectable, with a copy button — carrying a
 * prefilled subject so these land separately from general mail.
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

      <EmailPanel subject={subjects.membership} />

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
