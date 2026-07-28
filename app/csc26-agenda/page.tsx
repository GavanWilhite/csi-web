import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Agenda } from "@/components/Agenda";
import styles from "../csc-speakers/page.module.css";

/**
 * The agenda on its own page, so it has a pinnable URL.
 *
 * Reuses <Agenda standalone /> verbatim — the same component the conference page renders.
 * This exists to be linkable, not to be a second implementation.
 */
export const metadata: Metadata = {
  title: "Agenda — Cognitive Security Conference 2026",
  description:
    "The full two-day CSC 2026 agenda: 53 sessions across three tracks, August 6–7, 2026 in Las Vegas.",
};

export default function AgendaPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <div className={styles.head}>
          <Link className={styles.back} href="/">
            ← BACK TO THE CONFERENCE
          </Link>
          <h1 className={styles.title}>Agenda</h1>
        </div>
        <Agenda standalone />
      </main>
      <Footer />
    </>
  );
}
