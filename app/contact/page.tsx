import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { EmailPanel } from "@/components/EmailPanel";
import { instituteLinks } from "@/lib/institute";
import { links } from "@/lib/event";

/**
 * Replaces the old site's /contact, at the same path.
 *
 * The original was a Wix Form posting to Wix; this site is static and has
 * nothing to accept a POST, so contact is an email address.
 *
 * It used to reproduce that form's seven-item "what does your message relate
 * to?" dropdown as seven mail links. That was the wrong shape: the site
 * already asks in context — the sponsors section asks for the prospectus,
 * get-involved asks about partnership, the programme cards ask about SHIELD
 * and CTX — so a second, decontextualised list of the same asks just made
 * the reader choose twice. This page is now the fallback for everything
 * those in-context asks do not cover: the address, and what to say.
 *
 * The full original option list is preserved in
 * docs/source-content/contact.md if a real form is ever built.
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
      <EmailPanel />

      <h2>What to include</h2>
      <p>
        Tell us who you are and what the message is about — a partnership,
        sponsorship, a collaboration or research proposal, volunteering, an
        event or programme idea, or a general question. Naming it in the
        subject line gets it to the right person faster.
      </p>

      <h2>Some things have their own route</h2>
      <ul>
        <li>
          <Link href={instituteLinks.apply}>Applying for membership</Link> — what
          to send is listed there.
        </li>
        <li>
          <Link href="/#sponsors">Sponsoring CSC 2026</Link> — ask for the
          prospectus.
        </li>
        <li>
          <a href={links.donate}>Donating</a> — goes straight through Zeffy, no
          need to email.
        </li>
      </ul>
    </TextPage>
  );
}
