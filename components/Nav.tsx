"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { links, navLinks } from "@/lib/event";
import styles from "./Nav.module.css";

export interface NavItem {
  href: string;
  label: string;
}

export interface NavCta {
  href: string;
  label: string;
  /** Longer label used in the mobile drawer's full-width button. */
  drawerLabel: string;
  icon: string;
}

const conferenceCta: NavCta = {
  href: links.tickets,
  label: "TICKETS",
  drawerLabel: "GET TICKETS",
  icon: "confirmation_number",
};

/**
 * Sticky site nav. Defaults render the conference menu; /institute passes
 * its own items and a DONATE CTA — same shell, same drawer behaviour.
 */
export function Nav({
  items = navLinks,
  cta = conferenceCta,
}: {
  items?: readonly NavItem[];
  cta?: NavCta;
}) {
  const [open, setOpen] = useState(false);

  // Close the drawer if the viewport grows past the breakpoint while it's open,
  // otherwise it stays mounted-but-hidden and traps nothing on resize back.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 861px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  // Escape closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <a href={links.institute} className={styles.logo}>
          {/*
            Fixed-height chrome logo with a known intrinsic size; a plain <img>
            avoids next/image's wrapper for no benefit here.
          */}
          <img
            src="/assets/csi-logo-horizontal-white.png"
            alt="Cognitive Security Institute"
            width={2718}
            height={578}
          />
        </a>

        <nav className={styles.links} aria-label="Main">
          {items.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
          <a className={styles.cta} href={cta.href}>
            <Icon name={cta.icon} size={17} />
            {cta.label}
          </a>
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={18} />
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={styles.drawer}
        data-open={open}
        aria-label="Main"
        hidden={!open}
      >
        {items.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={styles.drawerLink}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a className={styles.drawerCta} href={cta.href}>
          <Icon name={cta.icon} size={18} />
          {cta.drawerLabel}
        </a>
      </nav>
    </header>
  );
}
