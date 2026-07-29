"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { ADDRESS_PENDING, decodeAddress } from "@/lib/contact";
import styles from "./EmailPanel.module.css";

/**
 * The contact address, shown in full and made easy to take away.
 *
 * ONE TEXT NODE, deliberately. It is tempting to split the address across
 * several elements as extra obfuscation, but that is the wrong tool here:
 *
 *   - It buys nothing. The address is already absent from the served HTML,
 *     so the only scrapers left are the ones running JavaScript — and they
 *     read `textContent`, which concatenates the pieces back together.
 *   - It costs correctness. Block-level children put newlines into the
 *     clipboard, and inline children with whitespace between the tags copy
 *     with stray spaces. Both produce an address that looks right on screen
 *     and pastes broken, which is the one failure nobody notices until a
 *     message bounces.
 *
 * So: assembled after hydration into a single node that selects and copies
 * cleanly, with a copy button so most people never need to drag-select at
 * all. Same reasoning as MailLink, one step further — see lib/contact.ts.
 */
export function EmailPanel({ subject }: { subject?: string }) {
  const [address, setAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setAddress(decodeAddress()), []);

  // Don't leave a timer running against an unmounted component.
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard API needs a secure context and can be refused outright.
      // Select the address instead so ⌘C still works — better than a button
      // that silently does nothing.
      const node = document.getElementById("contact-address");
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }

  const href = address
    ? `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`
    : undefined;

  return (
    <div className={styles.panel}>
      <span className={styles.label}>EMAIL</span>

      <span
        id="contact-address"
        className={styles.address}
        data-pending={address ? undefined : ""}
      >
        {/* Placeholder reveals nothing — never an [at]/[dot] rendering,
            which is the pattern harvesters normalise first. */}
        {address ?? ADDRESS_PENDING}
      </span>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.button}
          onClick={copy}
          disabled={!address}
        >
          <Icon name={copied ? "check" : "content_copy"} size={17} />
          {copied ? "COPIED" : "COPY"}
        </button>

        {href ? (
          <a className={styles.buttonPrimary} href={href}>
            <Icon name="mail" size={17} />
            OPEN IN MAIL APP
          </a>
        ) : (
          <span className={styles.buttonPending}>
            <Icon name="mail" size={17} />
            OPEN IN MAIL APP
          </span>
        )}
      </div>

      {/* Announce the copy to screen readers, which get no visual cue.
          .srOnly is the global utility in globals.css. */}
      <span role="status" aria-live="polite" className="srOnly">
        {copied ? "Address copied to clipboard" : ""}
      </span>
    </div>
  );
}
