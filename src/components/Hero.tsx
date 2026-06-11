"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroBackground from "./HeroBackground";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven parallax via motion values — these update transforms off the
  // React render path, so the Hero does NOT re-render on every scroll frame
  // (the previous setState-on-scroll re-rendered the whole subtree page-wide).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Negative = moves up; faster values for foreground layers.
  const bgY        = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const headingY   = useTransform(scrollYProgress, [0, 1], [0, -900]);
  const subtitleY  = useTransform(scrollYProgress, [0, 1], [0, -1100]);
  const ctaY       = useTransform(scrollYProgress, [0, 1], [0, -1300]);
  const scrollIndY = useTransform(scrollYProgress, [0, 1], [0, -1500]);
  const fadeOut    = useTransform(scrollYProgress, [0, 0.2857], [1, 0]); // was 1 - p*3.5
  const indFade    = useTransform(scrollYProgress, [0, 0.2], [1, 0]);    // was 1 - p*5

  return (
    <>
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "0 24px",
        overflow: "hidden",
      }}
    >
      {/* Background with slowest parallax */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: bgY,
          willChange: "transform",
        }}
      >
        <HeroBackground />
      </motion.div>

      {/* Heading — scroll parallax on wrapper, entrance on inner */}
      <motion.div
        style={{
          position: "relative", zIndex: 1, width: "100%",
          display: "flex", justifyContent: "center",
          y: headingY, opacity: fadeOut, willChange: "transform, opacity",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 3.9, ease: "easeOut" }}
          className="hero-heading"
          style={{
            maxWidth: 900,
            textAlign: "center",
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "#ffffff",
            fontSize: "clamp(38px, 5.5vw, 78px)",
            margin: 0,
          }}
        >
          AI Can Generate a Design.{" "}
          <br className="title-br" />
          It Can&apos;t Tell You If It&apos;s the{" "}
          <br className="title-br" />
          Right One.
        </motion.h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        style={{
          position: "relative", zIndex: 1, width: "100%", marginTop: 36,
          display: "flex", justifyContent: "center",
          y: subtitleY, opacity: fadeOut, willChange: "transform, opacity",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 4.1, ease: "easeOut" }}
          className="hero-subtitle"
          style={{
            maxWidth: "35em",
            textAlign: "center",
            fontSize: "clamp(0.875rem, 1.25vw, 1.25rem)",
            lineHeight: "1.5em",
            fontWeight: 300,
            fontFamily: "var(--font-geist), sans-serif",
            color: "#ffffff",
            margin: 0,
          }}
        >
          Any team can use AI tools to create. The difference is knowing what to build,
          why it works, and how to turn it into outcomes.
          <br />
          That&apos;s not a tool. That&apos;s what we do.
        </motion.p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        style={{
          position: "relative", zIndex: 1, marginTop: 40,
          display: "flex", justifyContent: "center",
          y: ctaY, opacity: fadeOut, willChange: "transform, opacity",
        }}
      >
        <motion.a
          href="https://tidycal.com/sagishrieber/strategy-call"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            backgroundColor: "rgba(217, 12, 183, 0.12)",
            borderColor: "#d90cb7",
            boxShadow: "0px 6px 32px -8px rgba(217, 12, 183, 0.35)",
          }}
          transition={{
            duration: 0.9,
            delay: 4.3,
            ease: "easeOut",
            backgroundColor: { duration: 0.3, ease: "easeOut", delay: 0 },
            borderColor: { duration: 0.3, ease: "easeOut", delay: 0 },
            boxShadow: { duration: 0.3, ease: "easeOut", delay: 0 },
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            borderRadius: 9999,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "rgba(255, 255, 255, 0.24)",
            backgroundColor: "rgba(10, 10, 10, 0.01)",
            padding: "11px 26px",
            fontSize: 14,
            fontWeight: 600,
            color: "#ffffff",
            textDecoration: "none",
          }}
        >
          Book a call
          <svg
            width="15"
            height="15"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 40,
          left: 0, right: 0,
          display: "flex",
          justifyContent: "center",
          y: scrollIndY,
          opacity: indFade,
          willChange: "transform, opacity",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 4.5 }}
          className="hero-scroll-indicator"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase" as const,
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            Scroll down
          </span>
          <motion.svg
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 3V13M8 13L3 8M8 13L13 8"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>

    <style jsx global>{`
      .hero-heading { text-wrap: balance; }
      .hero-subtitle { text-wrap: balance; }

      @media (max-width: 768px) {
        .title-br { display: none; }
        .hero-scroll-indicator { bottom: 90px !important; }
        /* Fill the visible viewport on mobile so the marquee underneath stays
           below the fold until the user scrolls. svh accounts for the mobile
           address bar so the full hero content (incl. CTA) stays in view. */
        .hero-section { min-height: 100svh !important; }
      }
    `}</style>
    </>
  );
}
