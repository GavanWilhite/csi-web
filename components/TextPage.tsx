import Link from "next/link";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import styles from "./TextPage.module.css";

/**
 * Shell for the short utility pages that replace the old site's footer
 * routes — /disclaimer, /contact, /sitemap, /apply.
 *
 * These are narrow, text-first pages with none of the section machinery of
 * the two scrollers, so they share one shell rather than each rebuilding a
 * header. The nav is the conference nav by default, matching what the old
 * site did: its footer pages carried the conference menu.
 */
export function TextPage({
  title,
  deck,
  back = { href: "/", label: "← BACK TO THE CONFERENCE" },
  children,
}: {
  title: string;
  deck?: string;
  back?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    /* Column layout so a short page (the disclaimer is two sentences) still
       pushes the footer to the bottom of the viewport instead of leaving it
       stranded mid-screen. */
    <div className={styles.page}>
      <Nav />
      <main id="main" className={styles.main}>
        <div className={styles.inner}>
          <Link className={styles.back} href={back.href}>
            {back.label}
          </Link>
          <h1 className={styles.title}>{title}</h1>
          {deck && <p className={styles.deck}>{deck}</p>}
          <div className={styles.body}>{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
