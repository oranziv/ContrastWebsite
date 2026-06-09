"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, useInView, type MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ACCENT = "#d90cb7";

type Project = {
  client: string;
  title: string;
  highlights: string[];
  tags: string[];
  image: string;
  href: string;
  imageStyle?: React.CSSProperties;
};

const projects: Project[] = [
  {
    client: "DAZN",
    title: "Premium Sports Platform Redesign",
    highlights: ["Global Sports Streaming", "20M+ Subscribers"],
    tags: ["Web Design & Development", "App Design", "TV App", "Brand Design"],
    image: "/work/dazn.png",
    href: "/work/dazn",
    imageStyle: { objectFit: "cover" as const, objectPosition: "center center" },
  },
  {
    client: "Designrr",
    title: "Engagement & Retention Overhaul",
    highlights: ["#1 Ebook Creator", "320K+ Users"],
    tags: ["Web Design & Development"],
    image: "/work/designrr.png",
    href: "/work/designrr",
  },
  {
    client: "ToeicPal",
    title: "Speaking with Confidence",
    highlights: ["AI Speaking Coach", "TOEIC Platform"],
    tags: ["App Design", "Product Design"],
    image: "/work/speakingpal.png",
    href: "/work/atoeic",
  },
  {
    client: "Spear",
    title: "AI-Powered B2B Outreach Platform",
    highlights: ["Revenue Intelligence", "B2B SaaS"],
    tags: ["Product Design", "AI Platform"],
    image: "/work/spear.png",
    href: "/work/spear",
  },
];

// ── View Work button ──────────────────────────────────────────────────────────
function ViewWorkButton({ href, onClick }: { href: string; onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "11px 26px", borderRadius: 9999,
        fontFamily: "var(--font-urbanist), sans-serif",
        fontSize: 14, fontWeight: 600, letterSpacing: "0.04em",
        color: "#ffffff", textDecoration: "none",
        border: `1px solid ${hovered ? ACCENT : "rgba(255,255,255,0.22)"}`,
        background: hovered ? "rgba(217,12,183,0.12)" : "rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        transition: "border-color 0.3s ease, background 0.3s ease",
      }}
    >
      View Work
      <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
        <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

// ── Panel layer ───────────────────────────────────────────────────────────────
function PanelLayer({
  project, num, index, total, sp, isMobile,
}: {
  project: Project;
  num: string;
  index: number;
  total: number;
  sp: MotionValue<number>;
  isMobile: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isLast = index === total - 1;
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    router.push(project.href, { scroll: false });
  };

  const panelStart = index / total;
  const panelEnd   = (index + 1) / total;
  const lsp = useTransform(sp, [panelStart, panelEnd], [0, 1]);

  // Cross-fade between panels
  const XFADE = 0.04;
  useMotionValueEvent(sp, "change", (latest) => {
    const el = wrapperRef.current;
    if (!el) return;
    let o: number;
    if (index === 0) {
      const out = (latest - (panelEnd - XFADE)) / (2 * XFADE);
      o = 1 - Math.max(0, Math.min(1, out));
    } else if (isLast) {
      const inn = (latest - (panelStart - XFADE)) / (2 * XFADE);
      o = Math.max(0, Math.min(1, inn));
    } else {
      const inn = (latest - (panelStart - XFADE)) / (2 * XFADE);
      const out = (latest - (panelEnd   - XFADE)) / (2 * XFADE);
      o = Math.max(0, Math.min(1, inn)) * (1 - Math.max(0, Math.min(1, out)));
    }
    el.style.opacity = String(o);
    el.style.pointerEvents = o > 0.3 ? "auto" : "none";
  });

  // Counter
  const numOpacity = useTransform(
    lsp,
    index === 0 ? [0, 0.08, 0.80, 0.92, 1] : [0, 0.04, 0.16, 0.80, 0.92, 1],
    index === 0 ? [0, 1,    1,    0,    0] : [0, 0,    1,    1,    0,    0],
  );

  // Staggered line-reveal animation: each row independently slides up from
  // behind an overflow:hidden clip boundary — no per-character loops.
  const REVEAL_START = index === 0 ? 0 : 0.06;
  const REVEAL_DUR   = 0.16;
  const EXIT_START   = 0.82;
  const EXIT_DUR     = 0.08;
  const k0 = Math.max(0.001, REVEAL_START);

  const titleY  = useTransform(lsp, [0, k0, k0 + REVEAL_DUR, EXIT_START, 1], [68, 68, 0, 0, -24]);
  const titleOp = useTransform(lsp, [0, k0, k0 + REVEAL_DUR, EXIT_START, EXIT_START + EXIT_DUR, 1], [0, 0, 1, 1, 0, 0]);

  const k0s = Math.max(0.001, REVEAL_START + 0.05);
  const subY  = useTransform(lsp, [0, k0s, k0s + REVEAL_DUR, EXIT_START, 1], [44, 44, 0, 0, -16]);
  const subOp = useTransform(lsp, [0, k0s, k0s + REVEAL_DUR, EXIT_START, EXIT_START + EXIT_DUR, 1], [0, 0, 1, 1, 0, 0]);

  const k0p = Math.max(0.001, REVEAL_START + 0.09);
  const pillsY  = useTransform(lsp, [0, k0p, k0p + REVEAL_DUR, EXIT_START, 1], [32, 32, 0, 0, -12]);
  const pillsOp = useTransform(lsp, [0, k0p, k0p + REVEAL_DUR, EXIT_START, EXIT_START + EXIT_DUR, 1], [0, 0, 1, 1, 0, 0]);

  const k0c = Math.max(0.001, REVEAL_START + 0.13);
  const ctaY  = useTransform(lsp, [0, k0c, k0c + REVEAL_DUR, EXIT_START, 1], [20, 20, 0, 0, -8]);
  const ctaOp = useTransform(lsp, [0, k0c, k0c + REVEAL_DUR, EXIT_START, EXIT_START + EXIT_DUR, 1], [0, 0, 1, 1, 0, 0]);

  // ── Mobile: cross-fade only; image is static ─────────────────────────────────
  if (isMobile) {
    return (
      <div
        ref={wrapperRef}
        style={{
          position: "absolute", inset: 0,
          opacity: index === 0 ? 1 : 0,
          pointerEvents: index === 0 ? "auto" : "none",
          willChange: "opacity",
          overflow: "hidden",
        }}
      >
        <img
          src={project.image}
          alt={project.client}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            display: "block",
            ...(project.imageStyle ?? {}),
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.82) 32%, rgba(10,10,10,0.45) 56%, transparent 76%)",
          pointerEvents: "none",
        }} />

        {/* Text block — plain HTML, zero per-frame work */}
        <div style={{ position: "absolute", left: 24, right: 24, bottom: 36, zIndex: 5 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
            {project.highlights.map((h) => (
              <span key={h} style={{
                fontSize: 11, fontWeight: 500,
                color: "rgba(255,255,255,0.7)",
                padding: "4px 10px", borderRadius: 5,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.05)",
                fontFamily: "var(--font-urbanist), sans-serif",
                letterSpacing: "0.3px",
                whiteSpace: "nowrap" as const,
              }}>
                {h}
              </span>
            ))}
          </div>
          <h3 style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: "clamp(36px, 10vw, 60px)",
            fontWeight: 600, color: "#ffffff",
            lineHeight: 1.3, letterSpacing: "-0.03em", margin: "0 0 10px",
          }}>
            {project.client}
          </h3>
          <p style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: 15, fontWeight: 400,
            color: "rgba(255,255,255,0.75)",
            margin: "0 0 18px", lineHeight: 1.4,
          }}>
            {project.title}
          </p>
          <a
            href={project.href}
            onClick={handleNavigation}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "11px 26px", borderRadius: 9999,
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: 14, fontWeight: 600, letterSpacing: "0.04em",
              color: "#ffffff", textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.28)",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            View Work
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  // ── Desktop: full-bleed + left overlay ───────────────────────────────────────
  return (
    <div
      ref={wrapperRef}
      style={{ position: "absolute", inset: 0, opacity: index === 0 ? 1 : 0, pointerEvents: index === 0 ? "auto" : "none" }}
    >
      {/* Full-bleed image — static */}
      <a
        href={project.href}
        onClick={handleNavigation}
        style={{ display: "block", position: "absolute", inset: 0, textDecoration: "none", cursor: "pointer", zIndex: 1 }}
        aria-label={`View ${project.client} case study`}
      >
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img
            src={project.image}
            alt={project.client}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              display: "block",
              ...(project.imageStyle ?? {}),
            }}
          />
        </div>
      </a>

      {/* Gradient: dark-left → transparent ~65% across */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
        background: "linear-gradient(90deg, rgba(10,10,10,0.93) 0%, rgba(10,10,10,0.72) 26%, rgba(10,10,10,0.20) 50%, transparent 66%)",
      }} />
      {/* Bottom vignette */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "28%",
        pointerEvents: "none", zIndex: 2,
        background: "linear-gradient(to top, rgba(10,10,10,0.38) 0%, transparent 100%)",
      }} />

      {/* Counter — top right */}
      <motion.div style={{
        position: "absolute", top: 48, right: 56, zIndex: 5,
        fontFamily: "var(--font-urbanist), sans-serif",
        fontSize: 13, fontWeight: 500, letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.4)",
        opacity: numOpacity,
      }}>
        {num} / 0{total}
      </motion.div>

      {/* Text block — vertically centered on the left */}
      <div style={{
        position: "absolute",
        left: 64, top: "50%",
        transform: "translateY(-50%)",
        maxWidth: 480,
        zIndex: 5,
        pointerEvents: "none",
      }}>
        {/* Highlight pills — above the title */}
        <motion.div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 20, y: pillsY, opacity: pillsOp }}>
          {project.highlights.map((h) => (
            <span key={h} style={{
              fontSize: 11, fontWeight: 500,
              color: "rgba(255,255,255,0.7)",
              padding: "4px 10px", borderRadius: 5,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.05)",
              fontFamily: "var(--font-urbanist), sans-serif",
              letterSpacing: "0.3px",
              whiteSpace: "nowrap" as const,
            }}>
              {h}
            </span>
          ))}
        </motion.div>

        {/* Client name — line reveal */}
        <div style={{ overflow: "hidden", marginBottom: 14 }}>
          <motion.h3 style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: "clamp(48px, 5.5vw, 88px)",
            fontWeight: 600, color: "#ffffff",
            lineHeight: 1.3, letterSpacing: "-0.03em", margin: 0,
            y: titleY, opacity: titleOp,
          }}>
            {project.client}
          </motion.h3>
        </div>

        {/* Subtitle — line reveal with slight delay */}
        <div style={{ overflow: "hidden", marginBottom: 28 }}>
          <motion.p style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: 18, fontWeight: 400,
            color: "rgba(255,255,255,0.70)",
            margin: 0,
            y: subY, opacity: subOp,
          }}>
            {project.title}
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div style={{ y: ctaY, opacity: ctaOp, pointerEvents: "auto" }}>
          <ViewWorkButton href={project.href} onClick={handleNavigation} />
        </motion.div>
      </div>
    </div>
  );
}

// ── Sticky container ──────────────────────────────────────────────────────────
function StickyPanels({ projects, N, sp, isMobile }: { projects: Project[]; N: number; sp: MotionValue<number>; isMobile: boolean }) {
  const stickyRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stickyRef, { once: true, amount: 0.01 });

  return (
    <div
      ref={stickyRef}
      style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        transform: "translateZ(0)",
        opacity: isMobile ? 1 : (inView ? 1 : 0),
        transition: isMobile ? undefined : "opacity 0.8s ease",
      }}
    >
      {projects.map((project, i) => (
        <PanelLayer
          key={project.client}
          project={project}
          num={`0${i + 1}`}
          index={i}
          total={N}
          sp={sp}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}

export default function SelectedWorkSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const { scrollYProgress: sp } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const N = projects.length;

  return (
    <section id="work" style={{ background: "#0a0a0a" }}>
      {/* Header */}
      <div className="selected-work-outer" style={{ padding: "120px 56px 72px", maxWidth: 1440, margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          style={{ textAlign: "center" }}
        >
          <h2 style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 600,
            color: "#ffffff", lineHeight: 1.05, letterSpacing: "-0.025em",
            margin: 0,
          }}>
            Selected Work
          </h2>
        </motion.div>
      </div>

      {/* Scroll container — shorter on mobile so panels flip faster */}
      <div ref={scrollRef} style={{ height: `${N * (isMobile ? 160 : 220)}vh`, position: "relative" }}>
        <StickyPanels projects={projects} N={N} sp={sp} isMobile={isMobile} />
      </div>

      <div className="selected-work-spacer" style={{ height: 120 }} />

      <style jsx global>{`
        @media (max-width: 768px) {
          .selected-work-header { flex-direction: column !important; align-items: flex-start !important; }
          .selected-work-spacer { height: 60px !important; }
        }
        @media (max-width: 640px) {
          .selected-work-outer { padding: 60px 20px 40px !important; }
          #work { padding-left: 0 !important; padding-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}
