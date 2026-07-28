"use client";

import { useEffect, useState } from "react";
import { ADDRESS_FALLBACK, decodeAddress } from "@/lib/contact";

/**
 * A mailto link whose address is assembled after hydration, so the raw string
 * never appears in the server-rendered HTML.
 *
 * Before hydration it renders as a <span> carrying the human-readable
 * "info [at] domain [dot] org" form. That matters twice over: it is the no-JS
 * fallback, and it means the pre-hydration paint is never a dead link.
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
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    const q = subject ? `?subject=${encodeURIComponent(subject)}` : "";
    setHref(`mailto:${decodeAddress()}${q}`);
  }, [subject]);

  const label = children ?? ADDRESS_FALLBACK;

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
