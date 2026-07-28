"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { links, navLinks } from "@/lib/event";
import styles from "./Nav.module.css";

export function Nav() {
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
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
          <a className={styles.cta} href={links.tickets}>
            <Icon name="confirmation_number" size={17} />
            TICKETS
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
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={styles.drawerLink}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <a className={styles.drawerCta} href={links.tickets}>
          <Icon name="confirmation_number" size={18} />
          GET TICKETS
        </a>
      </nav>
    </header>
  );
}
