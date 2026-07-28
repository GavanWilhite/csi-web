"use client";

import { useEffect, useState } from "react";
import { ADDRESS_PENDING, decodeAddress } from "@/lib/contact";

/**
 * A mailto link whose address is assembled after hydration, so the raw string
 * never appears in the server-rendered HTML.
 *
 * Two shapes:
 *   - With children ("GET IN TOUCH"), the label is fixed and only the href
 *     needs assembling. This is the common case.
 *   - Without children, the label IS the address — used where a visible,
 *     copyable address is the point (/apply). Nothing address-like ships in
 *     the HTML; the placeholder is swapped for the real thing on hydration.
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
  children?: React.ReactNode;
  className?: string;
}) {
  const [mail, setMail] = useState<{ href: string; address: string } | null>(
    null,
  );

  useEffect(() => {
    const address = decodeAddress();
    // encodeURIComponent, not URLSearchParams: the latter form-encodes spaces
    // as "+", which mail clients paste into the subject line literally.
    const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
    setMail({ href: `mailto:${address}${q}`, address });
  }, [subject]);

  const href = mail?.href ?? null;
  // With no children the link text IS the address, which cannot exist until
  // after hydration — so the served HTML carries a placeholder that reveals
  // nothing. See ADDRESS_PENDING for why it is not an obfuscated address.
  const label = children ?? mail?.address ?? ADDRESS_PENDING;

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
        {label}
      </span>
    );
  }
  return (
    <a className={className} href={href}>
      {label}
    </a>
  );
}
