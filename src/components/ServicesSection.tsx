"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

type ServiceCard = {
  label: string;
  icon: string;
  iconW: number; // rendered width in px; height is auto (preserves aspect ratio)
};

type RegisterRef = (index: number, el: HTMLDivElement | null) => void;

// iconW matches Figma's rendered icon size within the 48px container
const ROW1: ServiceCard[] = [
  { label: "AIX Strategy",                 icon: "/services/aix-strategy.svg",    iconW: 32 },
  { label: "Embedded Design Team",         icon: "/services/embedded-design.svg", iconW: 35 },
  { label: "The Hero Framework Workshop",  icon: "/services/hero-framework.svg",  iconW: 29 },
  { label: "Product BI and Analytics",     icon: "/services/product-bi.svg",      iconW: 40 },
];

const ROW2: ServiceCard[] = [
  { label: "Product Design",              icon: "/services/product-design.svg",  iconW: 36 },
  { label: "Fractional UX Direction",     icon: "/services/fractional-ux.svg",   iconW: 22 },
  { label: "Development",                 icon: "/services/development.svg",     iconW: 22 },
  { label: "Team Training",              icon: "/services/team-training.svg",   iconW: 28 },
];

function Card({ card, delay, isMobile, globalIndex, registerRef, isScrollActive }: {
  card: ServiceCard;
  delay: number;
  isMobile: boolean;
  globalIndex: number;
  registerRef: RegisterRef;
  isScrollActive: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerRef(globalIndex, ref.current);
    return () => { registerRef(globalIndex, null); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalIndex]);

  const effectiveHovered = hovered || (isMobile && isScrollActive);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // On mobile, gradient originates from card center; on desktop follows mouse
  const gradientPos = isMobile ? "50% 50%" : `${mouse.x}px ${mouse.y}px`;

  // Border is the 1px gap between outer (gradient) and inner (#0a0a0a) div
  const borderBg = effectiveHovered
    ? `radial-gradient(circle 240px at ${gradientPos}, #d90cb7 0%, rgba(56,56,56,0.62) 55%)`
    : "rgba(56,56,56,0.62)";

  // Inner spotlight glow follows mouse on desktop; centered on mobile
  const spotlightPos = isMobile ? "50% 50%" : `${mouse.x - 1}px ${mouse.y - 1}px`;
  const spotlightBg = `radial-gradient(circle 280px at ${spotlightPos}, rgba(217,12,183,0.15) 0%, transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        flex: "1 1 0",
        minWidth: 0,
        padding: 1,
        borderRadius: 13,
        background: borderBg,
        // Snap border on activation (same feel as desktop mouse-enter); fade on leave
        transition: effectiveHovered ? "none" : "background 0.4s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          padding: "32px 28px",
          borderRadius: 12,
          background: "#0a0a0a",
          backdropFilter: "blur(8.5px)",
          WebkitBackdropFilter: "blur(8.5px)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          overflow: "hidden",
          position: "relative",
          height: "100%",
        }}
      >
        {/* Inner spotlight glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: effectiveHovered ? 1 : 0,
            // Snap in on activation, fade out on leave — matches desktop hover feel
            transition: effectiveHovered ? "none" : "opacity 0.4s ease",
            background: spotlightBg,
          }}
        />

        {/* Icon: white base always visible; pink layer fades in on top */}
        <div style={{ width: 48, height: 48, flexShrink: 0, zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          {/* Base: white icon, always at full opacity */}
          <img
            src={card.icon}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              width: card.iconW,
              height: "auto",
            }}
          />
          {/* Pink layer: overlays white, fades in smoothly */}
          <img
            src={card.icon}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              width: card.iconW,
              height: "auto",
              filter: "brightness(0) saturate(100%) invert(18%) sepia(89%) saturate(6000%) hue-rotate(283deg) brightness(0.93) drop-shadow(0 0 8px #d90cb7)",
              opacity: effectiveHovered ? 1 : 0,
              transition: "opacity 0.4s ease",
              willChange: "opacity",
            }}
          />
        </div>

        {/* Label */}
        <p
          style={{
            flex: "1 0 0",
            margin: 0,
            fontFamily: "var(--font-urbanist), sans-serif",
            fontWeight: 600,
            fontSize: 18,
            lineHeight: "normal",
            color: "#ffffff",
            position: "relative",
            zIndex: 1,
          }}
        >
          {card.label}
        </p>
      </div>
    </motion.div>
  );
}

function Row({ cards, baseDelay, isMobile, startIndex, registerRef, mobileActiveIdx }: {
  cards: ServiceCard[];
  baseDelay: number;
  isMobile: boolean;
  startIndex: number;
  registerRef: RegisterRef;
  mobileActiveIdx: number | null;
}) {
  return (
    <div
      className="services-row"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 16,
        alignItems: "stretch",
      }}
    >
      {cards.map((card, i) => (
        <Card
          key={card.label}
          card={card}
          delay={baseDelay + i * 0.07}
          isMobile={isMobile}
          globalIndex={startIndex + i}
          registerRef={registerRef}
          isScrollActive={mobileActiveIdx === startIndex + i}
        />
      ))}
    </div>
  );
}

export default function ServicesSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mobileActiveIdx, setMobileActiveIdx] = useState<number | null>(null);
  const allCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const registerRef = useCallback<RegisterRef>((index, el) => {
    allCardRefs.current[index] = el;
  }, []);

  // On mobile: pick exactly the card whose center is closest to viewport center
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
      allCardRefs.current.forEach((el, i) => {
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
    <>
    <section id="services" style={{ padding: "200px 40px 120px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
          <span
            style={{
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "3.9px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              whiteSpace: "nowrap",
            }}
          >
            Our Services
          </span>
        </div>

        {/* 2-row grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Row cards={ROW1} baseDelay={0} isMobile={isMobile} startIndex={0} registerRef={registerRef} mobileActiveIdx={mobileActiveIdx} />
          <Row cards={ROW2} baseDelay={0.28} isMobile={isMobile} startIndex={4} registerRef={registerRef} mobileActiveIdx={mobileActiveIdx} />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          style={{ marginTop: 48, display: "flex", justifyContent: "center" }}
        >
          <a
            href="https://tidycal.com/sagishrieber/strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient-border"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "11px 26px",
              borderRadius: 52,
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              textDecoration: "none",
              fontFamily: "var(--font-urbanist), sans-serif",
              letterSpacing: "0.14px",
            }}
          >
            Book a call
            <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>

    <style jsx global>{`
      @media (max-width: 768px) {
        #services {
          padding: 48px 20px !important;
        }
        .services-row {
          flex-direction: column !important;
        }
        .services-row > div {
          flex: 1 1 auto !important;
          min-width: 0 !important;
        }
      }
    `}</style>
    </>
  );
}
