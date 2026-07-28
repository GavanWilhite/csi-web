import type { Metadata, Viewport } from "next";
import { Orbitron, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  /**
   * Base for absolute OG/social URLs (the speaker pages set per-speaker OG
   * images). Set SITE_URL in the production environment — the fallback only
   * keeps local builds warning-free.
   */
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: "Cognitive Security Conference 2026",
  description:
    "Two days on human risk, AI security, and cognitive warfare with the people defining the field. August 6–7, 2026, Tuscany Suites & Casino, Las Vegas. Limited to 300 attendees.",
  openGraph: {
    title: "Cognitive Security Conference 2026",
    description:
      "Two days on human risk, AI security, and cognitive warfare. August 6–7, 2026 · Las Vegas · 300 seats.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0f18",
  // Ships dark-only, so declare it: the UA renders scrollbars and form
  // controls to match instead of assuming light.
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      // Next 16 stopped overriding scroll-behavior during navigation unless
      // this attribute is set. See guides/upgrading/version-16.
      data-scroll-behavior="smooth"
      className={`${orbitron.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/*
          Material Symbols is the design's icon set. `display=block` matters:
          without it the browser paints the raw ligature text
          ("calendar_month") until the font arrives. This is the only external
          font request — the three text faces are self-hosted via next/font.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,400,0,0&display=block"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
