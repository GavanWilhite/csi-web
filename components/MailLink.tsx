"use client";

import { useEffect, useState } from "react";
import { decodeAddress } from "@/lib/contact";

/**
 * A mailto link whose address is assembled after hydration, so the raw string
 * never appears in the server-rendered HTML.
 *
 * This is the in-context ask — "GET IN TOUCH", "REQUEST THE PROSPECTUS" —
 * where the label is fixed and only the href needs assembling. For showing
 * the address itself, use components/EmailPanel.tsx instead; that is a
 * different affordance (selectable, copyable) and this component deliberately
 * no longer does it.
 *
 * Before hydration it renders as a <span>, never a dead <a>, and carries
 * data-mail-pending so call sites can drop link affordances for that frame.
 *
 * Screen readers get a normal anchor with normal link text once hydrated, so
 * this costs nothing in accessibility — unlike the CSS reversal and
 * pseudo-element tricks, which break selection and assistive tech.
 */
export function MailLink({
  subject,
  children,
  className,
}: {
  subject?: string;
  /** Required: the label is never the address. See EmailPanel for that. */
  children: React.ReactNode;
  className?: string;
}) {
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    // encodeURIComponent, not URLSearchParams: the latter form-encodes spaces
    // as "+", which mail clients paste into the subject line literally.
    const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
    setHref(`mailto:${decodeAddress()}${q}`);
  }, [subject]);

  if (!href) {
    // No <noscript> address fallback on purpose. "[at]/[dot]" is the most
    // widely recognised obfuscation pattern, so any harvester that normalises
    // it recovers the address from static HTML — and the clients that render
    // <noscript> skew heavily toward scrapers, since not executing JS is what
    // distinguishes them from real browsers. It would hand the address to the
    // wrong audience to serve ~1% of people. If a JS-off path is ever needed,
    // it should be a server-side form with a challenge, not a printed address.
    return (
      <span className={className} data-mail-pending="">
        {children}
      </span>
    );
  }
  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}
