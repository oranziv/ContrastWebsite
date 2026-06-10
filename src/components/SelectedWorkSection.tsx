"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/lib/useMediaQuery";

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

// Reveal-on-enter: container staggers its children as the panel scrolls in.
const reveal: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const revealItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } },
};

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

// ── Panel ───────────────────────────────────────────────────────────────────
// A normal full-screen block in document flow — stacked after the previous one,
// no sticky / scroll-jacking. On top of the entrance reveal, a gentle scroll
// parallax: the image drifts up and the text/button move at their own rate as
// the panel travels through the viewport. Both are neutral (offset 0) when the
// panel is centered, so the content sits still while you read it.
function Panel({
  project, num, total, isMobile,
}: {
  project: Project;
  num: string;
  total: number;
  isMobile: boolean;
}) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  // 0 → panel's top hits the viewport bottom; 1 → its bottom leaves the top.
  // Driven by Lenis (synced to Framer's frame loop) so it tracks the smoothed
  // scroll position.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const textY = useTransform(scrollYProgress, [0, 1], [160, -160]);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    router.push(project.href, { scroll: false });
  };

  // Mobile: static full-bleed image — scroll parallax is too heavy for mobile GPUs.
  const StaticImage = (
    <img
      src={project.image}
      alt={project.client}
      loading="lazy"
      decoding="async"
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "center",
        display: "block",
        ...(project.imageStyle ?? {}),
      }}
    />
  );

  // Desktop: oversized (top -26% / height 152%) so the ±120px parallax drift never
  // exposes an edge. Promoted to its own GPU layer for compositing.
  const ParallaxImage = (
    <motion.img
      src={project.image}
      alt={project.client}
      loading="lazy"
      decoding="async"
      style={{
        position: "absolute",
        top: "-26%", left: 0,
        width: "100%", height: "152%",
        objectFit: "cover", objectPosition: "center",
        display: "block",
        y: imageY,
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        ...(project.imageStyle ?? {}),
      }}
    />
  );

  // ── Mobile: static full-bleed image, text reveal on enter ──────────────────
  if (isMobile) {
    return (
      <div ref={ref} style={{ position: "relative", height: "100svh", minHeight: 560, overflow: "hidden" }}>
        {StaticImage}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.82) 32%, rgba(10,10,10,0.45) 56%, transparent 76%)",
          pointerEvents: "none",
        }} />

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{ position: "absolute", left: 24, right: 24, bottom: 36, zIndex: 5 }}
        >
          <motion.div variants={revealItem} style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
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
          <motion.h3 variants={revealItem} style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: "clamp(36px, 10vw, 60px)",
            fontWeight: 600, color: "#ffffff",
            lineHeight: 1.3, letterSpacing: "-0.03em", margin: "0 0 10px",
          }}>
            {project.client}
          </motion.h3>
          <motion.p variants={revealItem} style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: 15, fontWeight: 400,
            color: "rgba(255,255,255,0.75)",
            margin: "0 0 18px", lineHeight: 1.4,
          }}>
            {project.title}
          </motion.p>
          <motion.div variants={revealItem}>
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
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // ── Desktop: full-bleed image with scroll parallax, text revealed on the left ─
  return (
    <div ref={ref} style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
      {/* Full-bleed image — parallax drift, clickable */}
      <a
        href={project.href}
        onClick={handleNavigation}
        style={{ display: "block", position: "absolute", inset: 0, textDecoration: "none", cursor: "pointer", zIndex: 1 }}
        aria-label={`View ${project.client} case study`}
      >
        {ParallaxImage}
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "absolute", top: 48, right: 56, zIndex: 5,
          fontFamily: "var(--font-urbanist), sans-serif",
          fontSize: 13, fontWeight: 500, letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        {num} / 0{total}
      </motion.div>

      {/* Text block — vertically centered on the left, revealed + parallaxed */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center",
        paddingLeft: 64, zIndex: 5, pointerEvents: "none",
      }}>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{ maxWidth: 480, y: textY }}
        >
          {/* Highlight pills */}
          <motion.div variants={revealItem} style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 20 }}>
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

          {/* Client name */}
          <motion.h3 variants={revealItem} style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: "clamp(48px, 5.5vw, 88px)",
            fontWeight: 600, color: "#ffffff",
            lineHeight: 1.3, letterSpacing: "-0.03em", margin: "0 0 14px",
          }}>
            {project.client}
          </motion.h3>

          {/* Subtitle */}
          <motion.p variants={revealItem} style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: 18, fontWeight: 400,
            color: "rgba(255,255,255,0.70)",
            margin: "0 0 28px",
          }}>
            {project.title}
          </motion.p>

          {/* CTA */}
          <motion.div variants={revealItem} style={{ pointerEvents: "auto" }}>
            <ViewWorkButton href={project.href} onClick={handleNavigation} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SelectedWorkSection() {
  // Any touch device uses the static path — the full-bleed parallax is too heavy
  // for mobile GPUs and stutters. Gate on pointer type (not just width) so phones
  // in landscape (CSS width > 768px) and tablets also stay static, not just narrow
  // portrait phones.
  const isMobile = useMediaQuery("(max-width: 768px), (pointer: coarse)");

  const N = projects.length;

  return (
    <section id="work" style={{ background: "#0a0a0a", position: "relative" }}>
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

      {/* Projects — plain stacked full-screen blocks, one after another */}
      {projects.map((project, i) => (
        <Panel
          key={project.client}
          project={project}
          num={`0${i + 1}`}
          total={N}
          isMobile={isMobile}
        />
      ))}

      <div className="selected-work-spacer" style={{ height: 120 }} />

      <style jsx global>{`
        @media (max-width: 768px) {
          .selected-work-spacer { height: 40px !important; }
        }
        @media (max-width: 640px) {
          .selected-work-outer { padding: 48px 20px 32px !important; }
          #work { padding-left: 0 !important; padding-right: 0 !important; }
        }
      `}</style>
    </section>
  );
}
