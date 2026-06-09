"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import React, { useState, useRef, useEffect, useLayoutEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/lib/useMediaQuery";
import Header from "@/components/Header";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import { markIntroPlayed } from "@/lib/introState";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WorkCaseData {
  // Hero
  heroTags: string[];
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  heroObjectPosition?: string;

  // Overview
  overviewHeading: string;
  overviewBody: string[]; // 2 paragraphs
  metaItems: { label: string; value: string; accent?: boolean }[]; // 6 items

  // Gallery (large, small-top, small-bottom)
  gallery: { src: string; alt: string; objectPosition?: string; pair?: boolean }[];

  // What We Did
  whatWeDidHeading: string;
  deliverables: { num: string; title: string; desc: string }[]; // 6 items

  // More Work (2 cards)
  moreWork: { client: string; title: string; tags: string[]; image: string; href: string }[];
}

// ─── Page-ready gate ─────────────────────────────────────────────────────────
// All entrance animations are blocked for 1 s after mount so the user has
// time to settle on the page before any section starts revealing.
const PageReady = createContext(false);
const usePageReady = () => useContext(PageReady);

// ─── Sub-components ───────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 500,
        color: "rgba(255,255,255,0.7)",
        padding: "4px 10px",
        borderRadius: 5,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.05)",
        fontFamily: "var(--font-urbanist), sans-serif",
        letterSpacing: "0.3px",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

// Eyebrow, per-character blur+fade reveal
function Eyebrow({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const ready = usePageReady();
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <p
      ref={ref}
      style={{
        fontFamily: "var(--font-urbanist), sans-serif",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: "#d90cb7",
        margin: "0 0 20px",
      }}
    >
      {children.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 6, filter: "blur(5px)" }}
          animate={isInView && ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.38, delay: i * 0.022, ease: [0.22, 1, 0.36, 1] }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </p>
  );
}

// Divider, draws in left → right
function Divider() {
  const ref = useRef<HTMLDivElement>(null);
  const ready = usePageReady();
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView && ready ? { scaleX: 1 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: 1, background: "rgba(56,56,56,0.7)", transformOrigin: "left" }}
    />
  );
}

// WordReveal, each word rises from a clip-path mask
function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const ready = usePageReady();
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <span
      ref={ref}
      style={{ display: "flex", flexWrap: "wrap", columnGap: "0.3em", rowGap: "0.05em" }}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView && ready ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.72, delay: delay + i * 0.055, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function CaseCard({
  client,
  title,
  tags,
  image,
  href,
  delay,
}: {
  client: string;
  title: string;
  tags: string[];
  image: string;
  href: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ready = usePageReady();
  const cardInView = useInView(cardRef, { once: true, amount: 0.2 });
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    router.push(href);
  };

  const borderBg = hovered
    ? `radial-gradient(circle 320px at ${mouse.x}px ${mouse.y}px, #d90cb7 0%, rgba(56,56,56,0.62) 55%)`
    : "rgba(56,56,56,0.62)";

  const spotlightBg = `radial-gradient(circle 360px at ${mouse.x - 1}px ${mouse.y - 1}px, rgba(217,12,183,0.12) 0%, transparent 70%)`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={cardInView && ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ flex: "1 1 0" }}
    >
      <a
        ref={ref}
        href={href}
        onClick={handleNavigate}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          padding: 1,
          borderRadius: 17,
          background: borderBg,
          transition: hovered ? "none" : "background 0.4s ease",
          cursor: "pointer",
          textDecoration: "none",
          display: "block",
        }}
      >
        <div
          style={{
            borderRadius: 16,
            background: "#0a0a0a",
            padding: 28,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
            overflow: "hidden",
            height: "100%",
          }}
        >
          {/* Spotlight */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: hovered ? 1 : 0,
              transition: hovered ? "none" : "opacity 0.4s ease",
              background: spotlightBg,
              zIndex: 0,
            }}
          />

          {/* Image */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: 180,
              borderRadius: 10,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={image}
              alt={client}
              loading="lazy"
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
                transition: "transform 0.5s ease",
                transform: hovered ? "scale(1.03)" : "scale(1)",
              }}
            />
          </div>

          {/* Text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.35)",
                margin: "0 0 8px",
                fontFamily: "var(--font-urbanist), sans-serif",
              }}
            >
              {client}
            </p>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#ffffff",
                lineHeight: 1.3,
                margin: "0 0 16px",
                fontFamily: "var(--font-urbanist), sans-serif",
              }}
            >
              {title}
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {tags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
              right: 28,
              zIndex: 1,
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(56,56,56,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "border-color 0.3s, background 0.3s",
              background: hovered ? "rgba(217,12,183,0.1)" : "transparent",
              borderColor: hovered ? "#d90cb7" : "rgba(56,56,56,0.9)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                stroke={hovered ? "#d90cb7" : "rgba(255,255,255,0.5)"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: "stroke 0.3s" }}
              />
            </svg>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

// ─── Page-ready-gated inline animation wrappers ──────────────────────────────

// Overview body paragraph
function PBodyReveal({ children, delay, style }: {
  children: React.ReactNode;
  delay: number;
  style: React.CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const ready = usePageReady();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    <motion.p
      ref={ref}
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={inView && ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.p>
  );
}

// Overview meta grid cell
function MetaCell({ item, i, total, cols }: {
  item: { label: string; value: string; accent?: boolean };
  i: number;
  total: number;
  cols: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const ready = usePageReady();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const hasRowBelow = Math.floor(i / cols) < Math.ceil(total / cols) - 1;
  const hasNeighbour = (i % cols !== cols - 1) && (i + 1 < total);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16, y: 12, scale: 0.92, filter: "blur(6px)" }}
      animate={inView && ready ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: Math.floor(i / cols) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: "28px 28px",
        borderBottom: hasRowBelow ? "1px solid rgba(56,56,56,0.7)" : "none",
        borderRight: hasNeighbour ? "1px solid rgba(56,56,56,0.7)" : "none",
      }}
    >
      <p style={{
        fontFamily: "var(--font-urbanist), sans-serif", fontSize: 11, fontWeight: 700,
        letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 8px",
      }}>
        {item.label}
      </p>
      <p style={{
        fontFamily: "var(--font-urbanist), sans-serif", fontSize: 16, fontWeight: 600,
        color: item.accent ? "#d90cb7" : "#ffffff", margin: 0,
      }}>
        {item.value}
      </p>
    </motion.div>
  );
}

// More Work, "View All Work" button slide-in
function ViewAllReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const ready = usePageReady();
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView && ready ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Full-size parallax screenshot ───────────────────────────────────────────
//
// Image displays at natural dimensions (width: 100%, height: auto — no crop).
// A scale: 1.06 grows the image ~6% in all directions, creating invisible
// overflow that the container clips. The ±30px parallax y-shift stays inside
// that buffer so no edge gaps are ever visible.

function ParallaxScreenshot({ src, alt }: {
  src: string;
  alt: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <div ref={ref} style={{ overflow: "hidden", borderRadius: 16 }}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          width:   "100%",
          height:  "auto",
          display: "block",
          scale:   1.06,
          y,
        }}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function WorkCasePage({ data }: { data: WorkCaseData }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const router = useRouter();

  // Ensure navigating from here to the homepage never re-triggers the intro
  useEffect(() => { markIntroPlayed(); }, []);

  // Gate all section animations for 1 s so the user has time to settle
  // on the hero before any content below starts revealing.
  const [pageReady, setPageReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPageReady(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const metaCols = data.metaItems.length === 3 ? 3 : 2;

  const navigateWithTransition = (href: string, e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    router.push(href);
  };

  // Track scroll progress while the hero section travels off the top of the viewport.
  // progress 0 = hero top at viewport top  (page load)
  // progress 1 = hero bottom at viewport top (fully scrolled away, 100vh scroll)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Text fades out first (done at ~50 % scroll = ~50 vh)
  const textOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  // Image lingers longer, fully gone at ~85 % scroll, well before overview is in view
  const imageOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);

  return (
    <PageReady.Provider value={pageReady}>
    <main style={{ background: "#0a0a0a", color: "#ffffff" }}>
      <Header />

      {/* ════════════════════════════════════════════════
          1. HERO, full-screen image that dissolves on scroll
      ════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        {/* ── Background image: starts invisible so view-transition captures a dark new page;
               animates to opacity:1 in 500ms — done well before ::view-transition-new starts
               fading in at 720ms, so the hero is fully visible when the page appears. ── */}
        <motion.div style={{ opacity: imageOpacity, position: "absolute", inset: 0 }}>
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              bottom: isMobile ? "50%" : 0,
            }}
          >
            <img
              src={data.heroImage}
              alt={data.heroImageAlt}
              fetchPriority="high"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: data.heroObjectPosition ?? "center center",
                display: "block",
              }}
            />
            {/* Gradient overlays */}
            {isMobile ? (
              <>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.1) 40%, #0a0a0a 100%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0) 18%)" }} />
              </>
            ) : (
              <>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.2) 25%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0.95) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, #0a0a0a 0%, rgba(10,10,10,0) 15%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, #0a0a0a 0%, rgba(10,10,10,0) 12%)" }} />
              </>
            )}
          </div>
        </motion.div>

        {/* ── Back button, top left, clears the fixed header ── */}
        <motion.a
          href="/#work"
          onClick={(e) => navigateWithTransition("/#work", e)}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="wcp-back-btn"
          style={{
            position: "absolute",
            top: 96,
            left: 56,
            zIndex: 10,
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 13,
            fontWeight: 500,
            color: "rgba(255,255,255,0.55)",
            textDecoration: "none",
            fontFamily: "var(--font-urbanist), sans-serif",
            letterSpacing: "0.5px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All Work
        </motion.a>

        {/* ── "CASE STUDY" eyebrow, fires immediately, letter by letter ── */}
        <div className="wcp-case-study-label" style={{
          position: "absolute", top: 96, right: 56, zIndex: 10,
          display: "flex", alignItems: "center", gap: 0,
        }}>
          {"CASE STUDY".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.32, delay: 0.18 + i * 0.028, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-urbanist), sans-serif",
                fontSize: 11, fontWeight: 700,
                letterSpacing: "3.5px", textTransform: "uppercase",
                color: "rgba(255,255,255,0.32)",
                display: "inline-block",
              }}
            >
              {char === " " ? "  " : char}
            </motion.span>
          ))}
        </div>

        {/* ── Bottom text block, entrance from below, then fades on scroll ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="wcp-hero-bottom"
          style={{ position: "absolute", bottom: 56, left: 56, right: 56, zIndex: 10 }}
        >
          <motion.div style={{ opacity: textOpacity }}>
            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {data.heroTags.map((t) => (
                <Tag key={t} label={t} />
              ))}
            </div>

            {/* Title, word-by-word reveal gated by pageReady */}
            <h1
              ref={titleRef}
              style={{
                fontFamily: "var(--font-urbanist), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(52px, 7.5vw, 112px)",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                margin: "0 0 24px",
                maxWidth: "14ch",
              }}
            >
              <WordReveal text={data.heroTitle} />
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={pageReady ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-geist), sans-serif",
                fontWeight: 300,
                fontSize: "clamp(14px, 1.2vw, 17px)",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.55)",
                margin: 0,
                maxWidth: 520,
              }}
            >
              {data.heroSubtitle}
            </motion.p>
          </motion.div>
        </motion.div>

        <style jsx global>{`
          @media (max-width: 768px) {
            .wcp-back-btn {
              top: 136px !important;
              left: 24px !important;
            }
            .wcp-hero-bottom {
              left: 24px !important;
              right: 24px !important;
              bottom: 40px !important;
            }
            .wcp-case-study-label {
              display: none !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          2. OVERVIEW
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div
            className="wcp-overview-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              paddingTop: 64,
              alignItems: "start",
            }}
          >
            {/* Left, description */}
            <div>
              <Eyebrow>Overview</Eyebrow>
              <h2
                style={{
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(28px, 3vw, 42px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  color: "#ffffff",
                  margin: "0 0 28px",
                }}
              >
                <WordReveal text={data.overviewHeading} />
              </h2>
              {data.overviewBody.map((para, i) => (
                <PBodyReveal
                  key={i}
                  delay={0.15 + i * 0.12}
                  style={{
                    fontFamily: "var(--font-geist), sans-serif",
                    fontWeight: 300,
                    fontSize: 16,
                    lineHeight: 1.75,
                    color: "rgba(255,255,255,0.6)",
                    margin: i < data.overviewBody.length - 1 ? "0 0 20px" : "0",
                  }}
                >
                  {para}
                </PBodyReveal>
              ))}
            </div>

            {/* Right, meta grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${metaCols}, 1fr)`,
                gap: 0,
                border: "1px solid rgba(56,56,56,0.7)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {data.metaItems.map((item, i) => (
                <MetaCell key={item.label} item={item} i={i} total={data.metaItems.length} cols={metaCols} />
              ))}
            </div>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 860px) {
            .wcp-overview-grid {
              grid-template-columns: 1fr !important;
              gap: 48px !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          3. SCREENSHOTS, full-screen stacked with parallax
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "0 40px 100px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <div style={{ paddingBottom: 48 }}>
            <Divider />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {data.gallery.map((item) => (
              <ParallaxScreenshot
                key={item.src}
                src={item.src}
                alt={item.alt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          5. MORE WORK
      ════════════════════════════════════════════════ */}
      <section style={{ padding: "100px 40px", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <Divider />
          <div style={{ paddingTop: 64 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                marginBottom: 40,
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div>
                <Eyebrow>More Work</Eyebrow>
                <h2
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(28px, 3vw, 42px)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.01em",
                    color: "#ffffff",
                    margin: 0,
                  }}
                >
                  <WordReveal text="More Case Studies" />
                </h2>
              </div>
              <ViewAllReveal>
                {/* Client-side nav (consistent App Router history → no blank page
                    on browser Back). href kept for accessibility / fallback. */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  onClick={(e) => navigateWithTransition("/#work", e)}
                  href="/#work"
                  className="btn-gradient-border"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "14px 32px",
                    borderRadius: 9999,
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#ffffff",
                    textDecoration: "none",
                    flexShrink: 0,
                    fontFamily: "var(--font-urbanist), sans-serif",
                  }}
                >
                  View All Work
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </ViewAllReveal>
            </div>

            <div
              className="wcp-more-grid"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
            >
              {data.moreWork.map((card, i) => (
                <CaseCard
                  key={card.href}
                  client={card.client}
                  title={card.title}
                  tags={card.tags}
                  image={card.image}
                  href={card.href}
                  delay={i * 0.1}
                />
              ))}
            </div>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 700px) {
            .wcp-more-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* ════════════════════════════════════════════════
          6. CTA BANNER + FOOTER
      ════════════════════════════════════════════════ */}
      <CtaBanner />
      <Footer />
    </main>
    </PageReady.Provider>
  );
}
