"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

const ACCENT = "#d90cb7";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ═══════════════════════════════════════════
   ILLUSTRATION, Card 1 (Established Tech)
═══════════════════════════════════════════ */
function IllustrationCubes({ hovered, hideGradient = false }: { hovered: boolean; hideGradient?: boolean }) {
  const S  = 56.965;
  const Sw = S * 0.866025;
  const GRAY = "#4e4e4e";
  const px = 148, py = 0;
  const TALL = 360;

  const GRAY_CUBES = [
    { x: px - 2*Sw, y: py + S,     op: 1.0 },
    { x: px,        y: py + 2*S,   op: 0.9 },
    { x: px + 2*Sw, y: py + S,     op: 1.0 },
    { x: px - 2*Sw, y: py + 3*S,   op: 0.65 },
    { x: px,        y: py + 4*S,   op: 0.55 },
    { x: px + 2*Sw, y: py + 3*S,   op: 0.65 },
  ];

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 296, margin: "0 auto" }}>
      <svg viewBox="-5 -5 310 380" style={{ width: "100%", height: "auto" }} fill="none" overflow="visible">
        <defs>
          <linearGradient id="c1-top" x1="1" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="c1-left" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="c1-right" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {GRAY_CUBES.map(({ x, y, op }, i) => (
          <motion.g
            key={i}
            animate={{ opacity: hovered ? 0 : op, y: hovered ? 500 : 0 }}
            transition={{ opacity: { duration: 0.39, ease: "easeIn" }, y: { duration: 0.715, ease: EASE } }}
          >
            <rect width={S} height={S} transform={`matrix(0.866025 0.5 -0.866025 0.5 ${x} ${y})`}      fill="none" stroke={GRAY} strokeWidth={0.8} />
            <rect width={S} height={S} transform={`matrix(0.866025 0.5 0 1 ${x - Sw} ${y + S * 0.5})`}  fill="none" stroke={GRAY} strokeWidth={0.8} />
            <rect width={S} height={S} transform={`matrix(0.866025 -0.5 0 1 ${x} ${y + S})`}            fill="none" stroke={GRAY} strokeWidth={0.8} />
          </motion.g>
        ))}

        <rect width={S} height={S} transform={`matrix(0.866025 0.5 -0.866025 0.5 ${px} ${py})`}
          fill="url(#c1-top)" stroke={ACCENT} strokeWidth={0.8} />
        <motion.rect width={S} initial={{ height: S }}
          animate={{ height: hovered ? TALL : S }}
          transform={`matrix(0.866025 0.5 0 1 ${px - Sw} ${py + S * 0.5})`}
          fill="url(#c1-left)" stroke={ACCENT} strokeWidth={0.8}
          transition={{ duration: 0.715, ease: EASE }} />
        <motion.rect width={S} initial={{ height: S }}
          animate={{ height: hovered ? TALL - 6 : S }}
          transform={`matrix(0.866025 -0.5 0 1 ${px} ${py + S})`}
          fill="url(#c1-right)" stroke={ACCENT} strokeWidth={0.8}
          transition={{ duration: 0.715, ease: EASE }} />
      </svg>

      {!hideGradient && (
        <div style={{
          position: "absolute", bottom: 0, left: "-20%",
          width: "140%", height: "calc(55% + 80px)",
          background: "linear-gradient(to top, #0a0a0a 45%, transparent)",
          pointerEvents: "none", zIndex: 1,
        }} />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   ILLUSTRATION, Card 3 (Scaling SaaS)
═══════════════════════════════════════════ */
function IllustrationNested({ hovered }: { hovered: boolean }) {
  const RECTS = [
    { d: { x: 124.92, y:  97.88, w:  88.891, h:  88.891 }, h: { x: 111.75, y:  93.5, w: 115, h:  96 }, rx: 16.5, dOp: 0.9, hOp: 0.8 },
    { d: { x: 103.83, y:  76.79, w: 129.75,  h: 129.75  }, h: { x:  84.5,  y:  71.5, w: 168, h: 140 }, rx: 12.5, dOp: 0.8, hOp: 0.7 },
    { d: { x:  83.84, y:  56.80, w: 170.609, h: 170.609 }, h: { x:  57.5,  y:  49.5, w: 222, h: 184 }, rx:  6.5, dOp: 0.6, hOp: 0.5 },
    { d: { x:  59.40, y:  32.37, w: 219.641, h: 219.641 }, h: { x:  26.5,  y:  23.5, w: 285, h: 237 }, rx:  5.5, dOp: 0.4, hOp: 0.3 },
    { d: { x:  39.42, y:  11.27, w: 260.5,   h: 260.5   }, h: { x:   0.5,  y:   0.5, w: 338, h: 281 }, rx:    0, dOp: 0.2, hOp: 0.1 },
  ];
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <svg viewBox="0 0 339 282" style={{ width: "100%", maxWidth: 360, height: "auto" }} fill="none">
      {RECTS.map((s, i) => (
        <motion.rect key={i} rx={s.rx}
          initial={{ x: s.d.x, y: s.d.y, width: s.d.w, height: s.d.h, opacity: s.dOp, stroke: "#4e4e4e" }}
          animate={{
            x: hovered ? s.h.x : s.d.x, y: hovered ? s.h.y : s.d.y,
            width: hovered ? s.h.w : s.d.w, height: hovered ? s.h.h : s.d.h,
            opacity: hovered ? s.hOp : s.dOp, stroke: hovered ? ACCENT : "#4e4e4e",
          }}
          transition={{ duration: 0.5, ease }} fill="none" strokeWidth={1.1} />
      ))}
      <motion.circle cx="169.279" cy="142.24"
        initial={{ r: 19.9297, stroke: "#4e4e4e", fill: "none" }}
        animate={{ r: hovered ? 21.5291 : 19.9297, stroke: hovered ? ACCENT : "#4e4e4e", fill: "none" }}
        strokeWidth={1.1} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   ILLUSTRATION, Card 2 (Startups)
═══════════════════════════════════════════ */
function IllustrationGrid({ hovered }: { hovered: boolean }) {
  const S  = 48.054;
  const Sw = S * 0.866025;

  const CUBES = [
    { x: 97.5312, y: 123.469, hx: 84.0977, hy:  96.6055 },
    { x: 97.5312, y:  61.984, hx: 84.0977, hy:  48.5508 },
    { x: 97.5312, y:   0.5,   hx: 84.0977, hy:   0.5    },
    { x: 42.4824, y:  37.953, hx: 42.4824, hy:  24.5234 },
    { x: 42.4824, y:  99.445, hx: 42.4824, hy:  72.5781 },
    { x: 152.58,  y:  37.953, hx: 125.715, hy:  24.5234 },
    { x: 152.58,  y:  99.438, hx: 125.715, hy:  72.5703 },
  ];

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const fillT = "fill-opacity 0.4s ease, stroke 0.4s ease, stroke-dasharray 0.4s ease";
  const CC = 13.432;

  const stagger = CUBES.map(({ x, y, hx, hy }) => {
    const dist = Math.hypot((hx + CC) - x, (hy + CC) - y);
    return Math.round((dist / 40) * 30);
  });

  return (
    <svg viewBox="0 0 196 221" style={{ width: "100%", maxWidth: 230, height: "auto" }} fill="none" overflow="visible">
      <defs>
        <linearGradient id="gt-top"  x1="1" y1="0.5" x2="0" y2="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="gt-side" x1="0.5" y1="0" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="gt-ln-r" x1="154.552" y1="37.518"  x2="194.442" y2="60.128"  gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gt-ln-l" x1="0.747"   y1="61.155"  x2="35.521"  y2="40.818"  gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gt-ln-b" x1="33.247"  y1="191.359" x2="7.790"   y2="177.368" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={ACCENT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
        </linearGradient>
      </defs>

      <motion.g animate={{ opacity: hovered ? 0 : 1 }} transition={{ duration: 0.25 }}>
        <line x1="193.801" y1="61.259" x2="153.911" y2="38.649" stroke="url(#gt-ln-r)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="36.177"  y1="41.941" x2="1.403"   y2="62.277" stroke="url(#gt-ln-l)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="8.417"   y1="176.229" x2="33.873"  y2="190.22" stroke="url(#gt-ln-b)" strokeWidth="1.6" strokeLinecap="round" />
      </motion.g>

      {CUBES.map(({ x, y, hx, hy }, i) => (
        <motion.g key={i}
          animate={{ x: hovered ? (hx - x) + CC : 0, y: hovered ? (hy - y) + CC : 0 }}
          transition={{ duration: 0.55, ease, delay: stagger[i] / 1000 }}
        >
          <rect width={S} height={S} transform={`matrix(0.866025 0.5 -0.866025 0.5 ${x} ${y})`}
            fill="url(#gt-top)"  fillOpacity={hovered ? 1 : 0}
            stroke={hovered ? ACCENT : "#4e4e4e"} strokeDasharray={hovered ? undefined : "2 2"}
            style={{ transition: fillT }} />
          <rect width={S} height={S} transform={`matrix(0.866025 0.5 0 1 ${x - Sw} ${y + S * 0.5})`}
            fill="url(#gt-side)" fillOpacity={hovered ? 1 : 0}
            stroke={hovered ? ACCENT : "#4e4e4e"} strokeDasharray={hovered ? undefined : "2 2"}
            style={{ transition: fillT }} />
          <rect width={S} height={S} transform={`matrix(0.866025 -0.5 0 1 ${x} ${y + S})`}
            fill="url(#gt-side)" fillOpacity={hovered ? 1 : 0}
            stroke={hovered ? ACCENT : "#4e4e4e"} strokeDasharray={hovered ? undefined : "2 2"}
            style={{ transition: fillT }} />
        </motion.g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Data
═══════════════════════════════════════════ */
const CARDS = [
  {
    title:         "Established Tech Companies",
    blurb:         "Your product has proven itself. Now it's time to make it exceptional.",
    expandedTitle: "Trusted by the world's most innovative companies",
    description:   "We collaborate with leading technology companies that have established products and teams, helping them refine, scale, and modernize their user experience. Whether optimizing complex SaaS platforms or refreshing enterprise ecosystems, we bring clarity, consistency, and creative direction that accelerate growth and innovation.",
    services:      ["Design Systems", "UX Strategy", "Product Redesign", "UX Audit", "Conversion Optim.", "Component Libraries", "Design Operations"],
    type: "cubes" as const,
  },
  {
    title:         "Startups Building MVPs",
    blurb:         "Ship fast and ship smart. Those aren't opposites.",
    expandedTitle: "Ship fast and ship smart. Build something users love from day one.",
    description:   "Speed matters at the MVP stage, but so does building the right thing. We help startups define their core UX, validate with real users quickly, and ship a product that's both functional and beautiful from the very first release.\n\nOur lean design process means you move quickly without cutting corners on the things that matter most to early adopters.",
    services:      ["Product Strategy", "UI / UX Design", "Rapid Prototyping", "User Research", "MVP Validation", "Design Sprints", "Brand Identity"],
    type: "grid" as const,
  },
  {
    title:         "Scaling SaaS Companies",
    blurb:         "Growth is the goal. Great UX is how you accelerate it.",
    expandedTitle: "Scale your SaaS with design that drives growth.",
    description:   "At the scaling stage, UX becomes your competitive moat. We help SaaS companies improve onboarding, reduce churn, and increase feature adoption through intentional, data-informed design decisions.\n\nEvery design choice we make is tied to your key metrics, activation, retention, and expansion revenue.",
    services:      ["Onboarding Optim.", "Retention Design", "Feature Adoption", "Churn Reduction", "Analytics Review", "A/B Testing", "Growth Design"],
    type: "nested" as const,
  },
] as const;

type CardData = typeof CARDS[number];

const CARD_H   = 640;
const NARROW_W = 80;

/* ═══════════════════════════════════════════
   Collapsed card (normal 3-column state)
═══════════════════════════════════════════ */
function CollapsedCard({ card, hovered }: { card: CardData; hovered: boolean }) {
  return (
    <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* Hover blur bg */}
      <div style={{
        position: "absolute", width: "120%", height: 357, left: "-10%", top: 450,
        background: "#0A0A0A", filter: "blur(60px)", pointerEvents: "none", zIndex: 3,
        opacity: hovered ? 1 : 0, transition: "opacity 0.52s ease",
      }} />

      {/* Hover glow ellipse */}
      <div style={{
        position: "absolute", width: 508, height: 518, left: -39, top: 529,
        borderRadius: "50%", background: "rgba(217,12,183,0.56)", filter: "blur(119px)",
        pointerEvents: "none", zIndex: 4,
        opacity: hovered ? 1 : 0, transition: "opacity 0.65s ease",
      }} />

      {/* Text block */}
      <div className="who-card-text" style={{ padding: "32px 28px 0", position: "relative", zIndex: 2 }}>
        <h3 style={{
          fontSize: 20, fontWeight: 600, color: "#e8e8e8",
          margin: "0 0 4px", lineHeight: 1.3,
          fontFamily: "var(--font-urbanist), sans-serif",
        }}>
          {card.title}
        </h3>
        <p style={{
          fontSize: 14, color: "#b0b0b0", margin: 0, lineHeight: 1.6,
          fontFamily: "var(--font-geist), sans-serif",
        }}>
          {card.blurb}
        </p>
      </div>

      {/* Sphere, grid card only */}
      {card.type === "grid" && (
        <>
          <div style={{
            position: "absolute", width: 659, height: 514,
            left: "calc(50% + 2px)", top: 486, transform: "translateX(-50%)",
            pointerEvents: "none", zIndex: 1,
          }}>
            <img src="/who-we-serve-sphere.svg" alt="" style={{ width: "100%", height: "100%", display: "block" }} />
          </div>
          <div style={{
            position: "absolute", width: 532, height: 97, left: -75, top: 598,
            background: "#0a0a0a", filter: "blur(25px)", pointerEvents: "none", zIndex: 2,
          }} />
        </>
      )}

      {/* Illustration */}
      <div
        className={card.type === "grid" ? "grid-illus-wrap" : undefined}
        style={card.type === "grid" ? {
          position: "absolute", left: "calc(50% + 0.16px)", top: "calc(50% - 38px)",
          transform: "translate(-50%, -50%)", width: 222, zIndex: 3,
        } : {
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "32px 28px 32px", position: "relative", zIndex: 1,
        }}
      >
        {card.type === "cubes"  && <IllustrationCubes  hovered={hovered} />}
        {card.type === "grid"   && <IllustrationGrid   hovered={hovered} />}
        {card.type === "nested" && <IllustrationNested hovered={hovered} />}
      </div>

    </div>
  );
}

/* ═══════════════════════════════════════════
   Narrow card (sibling of expanded card)
═══════════════════════════════════════════ */
function NarrowCard({ card }: { card: CardData }) {
  return (
    <div style={{
      height: "100%", display: "flex",
      alignItems: "center", justifyContent: "center",
    }}>
      <span style={{
        writingMode: "vertical-rl",
        transform: "rotate(180deg)",
        color: "#888888",
        fontSize: 13, fontWeight: 500,
        fontFamily: "var(--font-urbanist), sans-serif",
        whiteSpace: "nowrap", letterSpacing: "0.3px",
      }}>
        {card.title}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Expanded card
═══════════════════════════════════════════ */
function ExpandedCard({ card, onClose }: { card: CardData; onClose: () => void }) {
  return (
    <div className="who-expanded-layout" style={{ display: "flex", height: "100%", position: "relative" }}>

      {/* Glow lives at root level so it bleeds freely across the left/right split.
          The card's own overflow:hidden clips it at the card boundary. */}
      <div style={{
        position: "absolute", width: 560, height: 560,
        right: "8%", top: "50%",
        transform: "translateY(-50%)",
        borderRadius: "50%",
        background: "rgba(217,12,183,0.28)",
        filter: "blur(130px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Close button — hidden on mobile (who-toggle-btn handles it there) */}
      <button
        className="who-close-btn"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        style={{
          position: "absolute", top: 24, right: 24, zIndex: 10,
          width: 40, height: 40, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(10,10,10,0.5)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M13 1L1 13" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* ── Left: text content ── */}
      <div className="who-expanded-text" style={{
        width: "46%", flexShrink: 0,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "56px 48px 56px 44px", gap: 20,
        position: "relative", zIndex: 1,
      }}>
        <h3 style={{
          fontSize: "clamp(20px, 1.8vw, 28px)", fontWeight: 600,
          color: "#e8e8e8", margin: 0, lineHeight: 1.25, letterSpacing: "-0.28px",
          fontFamily: "var(--font-urbanist), sans-serif",
        }}>
          {card.expandedTitle}
        </h3>

        <p style={{
          fontSize: 15, color: "#b2b2b2", margin: 0, lineHeight: 1.65,
          fontFamily: "var(--font-geist), sans-serif",
          whiteSpace: "pre-line",
        }}>
          {card.description}
        </p>
      </div>

      {/* ── Right: illustration ── */}
      <div className="who-expanded-illus" style={{
        flex: 1, position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1,
      }}>
        <div style={{
          position: "relative", zIndex: 2,
          width: card.type === "cubes" ? "82%" : undefined,
          marginTop: card.type === "cubes" ? 280 : 0,
        }}>
          {card.type === "cubes"  && <IllustrationCubes  hovered={true} hideGradient={true} />}
          {card.type === "grid"   && <IllustrationGrid   hovered={true} />}
          {card.type === "nested" && <IllustrationNested hovered={true} />}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Single card — owns its own in-view ref so
   mobile can mirror the desktop hover state
   when the card scrolls into view.
═══════════════════════════════════════════ */
function CardItem({ card, i, expanded, setExpanded, hoveredIdx, setHoveredIdx, isMobile, isScrollActive, registerRef }: {
  card: CardData;
  i: number;
  expanded: number | null;
  setExpanded: (v: number | null) => void;
  hoveredIdx: number | null;
  setHoveredIdx: (v: number | null) => void;
  isMobile: boolean;
  isScrollActive: boolean;
  registerRef: (el: HTMLDivElement | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerRef(cardRef.current);
    return () => { registerRef(null); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActive  = expanded === i;
  const isNarrow  = !isMobile && expanded !== null && !isActive;
  const isHovered = hoveredIdx === i && !isActive;
  const effectiveHovered = isHovered || (isMobile && isScrollActive && !isActive);

  return (
    <motion.div
      ref={cardRef}
      className={isActive ? "who-expanded" : undefined}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
      onClick={() => !isActive && setExpanded(i)}
      onMouseEnter={() => !isActive && setHoveredIdx(i)}
      onMouseLeave={() => setHoveredIdx(null)}
      style={{
        flexGrow:   isActive ? 5 : isNarrow ? 0 : 1,
        flexShrink: 0,
        flexBasis:  isNarrow ? `${NARROW_W}px` : "0px",
        transition: [
          "flex-grow 0.55s cubic-bezier(0.4,0,0.2,1)",
          "flex-basis 0.55s cubic-bezier(0.4,0,0.2,1)",
          "border-color 0.3s ease",
          "box-shadow 0.3s ease",
        ].join(", "),
        minWidth: 0,
        height: CARD_H,
        borderRadius: 16,
        border: `1px solid ${isActive ? ACCENT : effectiveHovered ? ACCENT : "#383838"}`,
        boxShadow: effectiveHovered && !isActive
          ? "0 0 48px rgba(217,12,183,0.1), inset 0 1px 0 rgba(217,12,183,0.15)"
          : "none",
        background: "#0a0a0a",
        overflow: "hidden",
        position: "relative",
        cursor: isActive ? "default" : "pointer",
      }}
    >
      <AnimatePresence mode="wait">
        {isNarrow ? (
          <motion.div key="narrow"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <NarrowCard card={card} />
          </motion.div>

        ) : isActive ? (
          <motion.div key="expanded"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28, delay: 0.18 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <ExpandedCard card={card} onClose={() => { setExpanded(null); setHoveredIdx(null); }} />
          </motion.div>

        ) : (
          <motion.div key="collapsed"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <CollapsedCard card={card} hovered={effectiveHovered} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unified toggle button: + rotates to × when expanded. On desktop it's hidden
          when expanded (ExpandedCard's own close btn handles that). On mobile it's
          always the only toggle at bottom-right — same position, just rotates. */}
      <AnimatePresence>
        {(effectiveHovered || isActive) && !isNarrow && (
          <motion.button
            key="toggle"
            className="who-toggle-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => {
              e.stopPropagation();
              if (isActive) { setExpanded(null); setHoveredIdx(null); }
              else { setExpanded(i); }
            }}
            aria-label={isActive ? "Close" : "Expand"}
            style={{
              position: "absolute", bottom: 27, right: 27, zIndex: 10,
              width: 40, height: 40, borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(10,10,10,0.4)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg
              width="14" height="14" viewBox="0 0 14 14" fill="none"
              style={{ transform: isActive ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
            >
              <path d="M7 1V13M1 7H13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Section
═══════════════════════════════════════════ */
export default function WhoWeServe() {
  const [expanded,        setExpanded]        = useState<number | null>(null);
  const [hoveredIdx,      setHoveredIdx]      = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const [mobileActiveIdx, setMobileActiveIdx] = useState<number | null>(null);
  const cardDomRefs = useRef<(HTMLDivElement | null)[]>([]);

  // On mobile: track which card's center is closest to viewport center — guarantees
  // exactly one active card, unlike IntersectionObserver which can fire on multiple.
  useEffect(() => {
    if (!isMobile) {
      // Correct use of an effect: clear the mobile-only active card when leaving
      // the mobile breakpoint (no-op on desktop, already null).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMobileActiveIdx(null);
      return;
    }
    const handleScroll = () => {
      const vcY = window.innerHeight / 2;
      let bestIdx: number | null = null;
      let bestDist = window.innerHeight * 0.6;
      cardDomRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - vcY);
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      });
      setMobileActiveIdx(bestIdx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section className="who-we-serve-section" style={{ padding: "120px 40px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 600,
            color: "#ffffff", textAlign: "center",
            letterSpacing: "-0.025em", lineHeight: 1.05,
            margin: "0 0 64px",
            fontFamily: "var(--font-urbanist), sans-serif",
          }}
        >
          Built for Teams Ready to Grow
        </motion.h2>

        {/* ── Horizontal accordion ── */}
        <div className="who-row" style={{ display: "flex", gap: 16 }}>
          {CARDS.map((card, i) => (
            <CardItem
              key={i}
              card={card}
              i={i}
              expanded={expanded}
              setExpanded={setExpanded}
              hoveredIdx={hoveredIdx}
              setHoveredIdx={setHoveredIdx}
              isMobile={isMobile}
              isScrollActive={mobileActiveIdx === i}
              registerRef={(el) => { cardDomRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .who-we-serve-section {
            padding: 80px 20px 40px !important;
          }
          .who-row {
            flex-direction: column !important;
          }
          .who-row > div {
            flex-grow: 0 !important;
            flex-shrink: 0 !important;
            flex-basis: auto !important;
            width: 100% !important;
            height: 480px !important;
          }
          .who-row > div.who-expanded {
            height: 480px !important;
          }
          .who-expanded-layout {
            flex-direction: column !important;
          }
          .who-expanded-text {
            width: 100% !important;
            padding: 60px 28px 24px !important;
            justify-content: flex-start !important;
            overflow-y: auto;
          }
          .who-expanded-illus {
            display: none !important;
          }
          .grid-illus-wrap {
            top: calc(50% + 42px) !important;
          }
          /* Mobile: unified toggle btn handles open/close — hide desktop close btn */
          .who-close-btn {
            display: none !important;
          }
          /* Give the text block enough right clearance so blurb wraps before the toggle btn */
          .who-card-text {
            padding-right: 76px !important;
          }
        }
        /* Desktop: toggle btn hidden when expanded — ExpandedCard's close btn takes over */
        @media (min-width: 901px) {
          .who-expanded .who-toggle-btn {
            display: none !important;
          }
        }
        button { outline: none; appearance: none; -webkit-appearance: none; }
      `}</style>
    </section>
  );
}
