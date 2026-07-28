import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Roster } from "@/components/Roster";
import styles from "./page.module.css";

/**
 * The full 35-speaker roster on its own page.
 *
 * Reuses <Roster /> verbatim — the same component the conference page used to
 * render inline. Nothing is duplicated; the roster simply lives here now, and
 * the conference page links to it.
 */
export const metadata: Metadata = {
  title: "Speakers — Cognitive Security Conference 2026",
  description:
    "The full CSC 2026 speaker roster: 35 speakers across keynotes, Defending Humans, Critical Cognitive Infrastructure, Applied Training and the Master of Ceremonies.",
};

export default function SpeakersPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <div className={styles.head}>
          <Link className={styles.back} href="/">
            ← BACK TO THE CONFERENCE
          </Link>
          <h1 className={styles.title}>Speakers</h1>
        </div>
        <Roster />
      </main>
      <Footer />
    </>
  );
}
