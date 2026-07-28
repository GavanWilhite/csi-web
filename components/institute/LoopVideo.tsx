"use client";

import { useEffect, useRef } from "react";

/**
 * Decorative autoplaying loop.
 *
 * Not a plain <video autoPlay muted loop>: React does not reliably surface
 * `muted` as a DOM *property* on a server-rendered element, and Chrome's
 * autoplay policy checks the property, not the attribute — so the element
 * loads nothing and sits at readyState 0. Setting it via a ref before calling
 * play() makes the behaviour deterministic.
 *
 * Reduced motion is honoured in JS rather than by hiding the element in CSS:
 * a hidden-but-playing video still downloads and decodes, which is exactly
 * what someone asking for less motion is trying to avoid. Here the poster
 * simply stays.
 */
export function LoopVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.muted = true;
    el.defaultMuted = true;
    // Autoplay can still be refused (data saver, battery saver, policy).
    // The poster is the fallback, so a rejection needs no handling.
    void el.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
