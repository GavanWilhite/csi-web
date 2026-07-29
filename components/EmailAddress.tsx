"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { ADDRESS_PENDING, decodeAddress } from "@/lib/contact";
import styles from "./EmailAddress.module.css";

/**
 * The contact address as a mailto link, with a copy button beside it — the
 * ordinary "copy field" pattern.
 *
 * The address is assembled after hydration so it never appears in the served
 * HTML (see lib/contact.ts), and it lives in ONE TEXT NODE. Splitting it
 * across elements as extra obfuscation is tempting and wrong on both counts:
 *
 *   - It buys nothing. The address is already absent from the HTML, so the
 *     only scrapers left run JavaScript — and they read `textContent`, which
 *     concatenates the pieces straight back together.
 *   - It costs correctness. Block children put newlines in the clipboard;
 *     inline children with whitespace between tags put in stray spaces. The
 *     address then looks right on screen and pastes broken, which is the one
 *     failure nobody notices until a message bounces.
 */
export function EmailAddress({ subject }: { subject?: string }) {
  const [address, setAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setAddress(decodeAddress()), []);

  // Don't leave a timer running against an unmounted component.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const flash = () => {
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  async function copy() {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      flash();
    } catch {
      // The Clipboard API needs a secure context and can be refused outright.
      // Select the address so ⌘C still works, rather than being a button that
      // silently does nothing.
      const node = document.getElementById("contact-address");
      if (!node) return;
      const range = document.createRange();
      range.selectNodeContents(node);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }

  const href = address
    ? `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`
    : undefined;

  return (
    <p className={styles.row}>
      {href ? (
        <a id="contact-address" className={styles.address} href={href}>
          {address}
        </a>
      ) : (
        /* Pre-hydration: a span, never a dead link. The placeholder reveals
           nothing — never an [at]/[dot] rendering, which is the pattern
           harvesters normalise first. */
        <span id="contact-address" className={styles.address} data-pending="">
          {ADDRESS_PENDING}
        </span>
      )}

      <button
        type="button"
        className={styles.copy}
        onClick={copy}
        disabled={!address}
        aria-label={copied ? "Address copied" : "Copy email address"}
        title={copied ? "Copied" : "Copy email address"}
      >
        <Icon name={copied ? "check" : "content_copy"} size={18} />
      </button>

      {/* Screen readers get no visual cue from the icon swap.
          .srOnly is the global utility in globals.css. */}
      <span role="status" aria-live="polite" className="srOnly">
        {copied ? "Address copied to clipboard" : ""}
      </span>
    </p>
  );
}
