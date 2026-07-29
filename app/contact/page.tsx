import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { EmailAddress } from "@/components/EmailAddress";

/**
 * Replaces the old site's /contact, at the same path.
 *
 * Deliberately generic: the address, and one line about what to say. It does
 * NOT enumerate the reasons to get in touch. Those live at /contact/<path>
 * and are reached from the CTA that raised them — the sponsors section links
 * to /contact/sponsorship, get-involved to /contact/partnership, the
 * programme cards to /contact/shield and /contact/ctx. Listing them again
 * here would make the reader choose twice for no gain.
 *
 * The full set is indexed on /sitemap, which is the right place for an
 * exhaustive list.
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
      /* The source page's own subhead, verbatim. */
      deck="Whether looking to collaborate, ask a question, or share your story, we'd love to hear from you."
    >
      <EmailAddress />

      <p>
        Tell us who you are and what your message is about — naming it in the
        subject line gets it to the right person faster.
      </p>
    </TextPage>
  );
}
