"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { frame, cancelFrame } from "framer-motion";
import { setLenis } from "@/lib/smoothScroll";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Respect the user's OS setting — don't hijack scrolling if they want it reduced.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,        // lower = smoother/heavier, higher = snappier
      smoothWheel: true, // wheel/trackpad only; touch stays native
    });
    setLenis(lenis);

    // Drive Lenis from Framer Motion's frame loop (not a separate rAF) so the
    // scroll position and scroll-linked animations (e.g. the parallax) update on
    // the SAME frame. Running them on separate loops makes the parallax lag one
    // frame behind the page, which reads as flicker / "swimming".
    function update(data: { timestamp: number }) {
      lenis.raf(data.timestamp);
    }
    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
