"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

const YT_ID = "nyS3mZk7K6k";

// ── VideoPlayer ───────────────────────────────────────────────────────────────
function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      style={{
        flex: 1,
        aspectRatio: "16/9",
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
        background: "#000",
        cursor: playing ? "default" : "pointer",
      }}
      onClick={() => !playing && setPlaying(true)}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0`}
          title="The Hero Breakdown"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      ) : (
        <>
          <img
            src={`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`}
            alt="The Hero Breakdown"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.35)" }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 60% 40%, rgba(118,12,217,0.25) 0%, rgba(217,12,183,0.12) 50%, transparent 80%)",
            filter: "blur(20px)",
          }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div
              style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "transform 0.2s, background 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.1)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.12)";
              }}
            >
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                <path d="M2 2L18 11L2 20V2Z" fill="white" fillOpacity={0.95} />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Shared text styles ─────────────────────────────────────────────────────────
const cardTitle: React.CSSProperties = {
  fontFamily: "var(--font-urbanist), sans-serif",
  fontWeight: 600,
  fontSize: 20,
  color: "#e8e8e8",
  margin: 0,
  lineHeight: "normal",
};
const cardDesc: React.CSSProperties = {
  fontFamily: "var(--font-geist), sans-serif",
  fontWeight: 400,
  fontSize: 16,
  color: "rgba(255,255,255,0.65)",
  margin: 0,
  lineHeight: "normal",
};

// ── Design Triggers Card ───────────────────────────────────────────────────────
function DesignTriggersCard({ delay, isMobile }: { delay: number; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, { amount: 0, margin: isMobile ? "-47.6% 0px" : "0px" });
  const effectiveHovered = hovered || (isMobile && inView);
  const active = effectiveHovered || expanded;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const gradientPos = isMobile ? "50% 50%" : `${mouse.x}px ${mouse.y}px`;
  const borderBg = active
    ? `radial-gradient(circle 360px at ${gradientPos}, #d90cb7 0%, rgba(56,56,56,0.62) 55%)`
    : "rgba(56,56,56,0.62)";
  const spotlightPos = isMobile ? "50% 50%" : `${mouse.x - 1}px ${mouse.y - 1}px`;
  const spotlightBg = `radial-gradient(circle 400px at ${spotlightPos}, rgba(217,12,183,0.12) 0%, transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => setExpanded(e => !e)}
      style={{
        padding: 1,
        borderRadius: 17,
        background: borderBg,
        transition: (active && !isMobile) ? "none" : "background 0.4s ease",
        cursor: "pointer",
      }}
    >
      <div style={{
        borderRadius: 16,
        background: "#0a0a0a",
        backdropFilter: "blur(8.5px)",
        WebkitBackdropFilter: "blur(8.5px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}>
        {/* Mouse-follow spotlight, always active on hover */}
        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: spotlightBg,
          opacity: effectiveHovered ? 1 : 0,
          transition: (effectiveHovered && !isMobile) ? "none" : "opacity 0.4s ease",
          zIndex: 1,
        }} />

        {/* Illustration area, 304px tall */}
        <div className="method-card-illus" style={{ height: 304, flexShrink: 0, position: "relative", zIndex: 2 }}>
          {/* Illustration, slides from right + large (default) → centered + small (hover) */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 552,
              height: 447,
              marginLeft: -276,
              marginTop: -223,
            }}
            animate={{
              opacity: expanded ? 0.1 : 1,
              x: effectiveHovered && !expanded ? 0 : 180,
              y: effectiveHovered && !expanded ? 0 : 71,
              scale: effectiveHovered && !expanded ? 0.4 : 1,
            }}
            transition={{
              opacity: { duration: 0.4, ease: "easeInOut" },
              x: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            {/* Default, tinted to #2E2E2E, fades out on hover */}
            <motion.img
              src="/method/design-triggers.svg"
              width={552} height={447}
              alt="" aria-hidden="true"
              animate={{ opacity: effectiveHovered && !expanded ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute", top: 0, left: 0, display: "block",
                filter: "brightness(0) invert(1) brightness(0.18)",
              }}
            />
            {/* Hover, pink accent with pulsing glow, fades in on hover */}
            <motion.img
              src="/method/design-triggers-hover.svg"
              width={552} height={447}
              alt="" aria-hidden="true"
              animate={{ opacity: effectiveHovered && !expanded ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className={effectiveHovered && !expanded ? "method-dt-glow" : ""}
              style={{ position: "absolute", top: 0, left: 0, display: "block" }}
            />
          </motion.div>
          {/* Expanded text, animates in/out when expanded */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                key="dt-text"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", inset: 0, padding: 32, pointerEvents: "none" }}
              >
                <p style={{ fontFamily: "var(--font-urbanist), sans-serif", fontSize: 18, lineHeight: "26px", color: "#ffffff", margin: 0 }}>
                  <span style={{ fontWeight: 300 }}>Understanding how users think is the foundation of great design. </span>
                  <span style={{ fontWeight: 700 }}>With Design Triggers, we apply behavioral psychology and cognitive principles </span>
                  <span style={{ fontWeight: 300 }}>to craft experiences that naturally guide users toward action. From micro-interactions to information hierarchy, every element is built to reduce friction and inspire engagement.</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text panel — fades out when expanded */}
        <motion.div
          animate={{ opacity: expanded ? 0 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ padding: 32, paddingRight: active && isMobile ? 80 : 32, display: "flex", flexDirection: "column", gap: 11, flexShrink: 0, width: "100%", boxSizing: "border-box", position: "relative", zIndex: 2, pointerEvents: expanded ? "none" : "auto", transition: "padding-right 0.3s ease" }}
        >
          <p style={cardTitle}>Design Triggers</p>
          <p style={cardDesc}>Leverages decision-making psychology to drive engagement.</p>
        </motion.div>

        {/* Plus / Close icon, visual affordance only; click handled by card wrapper */}
        <AnimatePresence>
          {active && (
            <motion.div
              key="toggle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              aria-hidden="true"
              style={{
                position: "absolute", bottom: 27, right: 27, zIndex: 8,
                width: 40, height: 40, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(10,10,10,0.4)",
                backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ transform: expanded ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
              >
                <path d="M7 1V13M1 7H13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Hero Framework Card ───────────────────────────────────────────────────────
function HeroFrameworkCard({ delay, isMobile }: { delay: number; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, { amount: 0, margin: isMobile ? "-47.6% 0px" : "0px" });
  const effectiveHovered = hovered || (isMobile && inView);
  const active = effectiveHovered || expanded;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const gradientPos = isMobile ? "50% 50%" : `${mouse.x}px ${mouse.y}px`;
  const borderBg = active
    ? `radial-gradient(circle 360px at ${gradientPos}, #d90cb7 0%, rgba(56,56,56,0.62) 55%)`
    : "rgba(56,56,56,0.62)";
  const spotlightPos = isMobile ? "50% 50%" : `${mouse.x - 1}px ${mouse.y - 1}px`;
  const spotlightBg = `radial-gradient(circle 400px at ${spotlightPos}, rgba(217,12,183,0.12) 0%, transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: delay, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => setExpanded(e => !e)}
      style={{
        padding: 1,
        borderRadius: 17,
        background: borderBg,
        transition: (active && !isMobile) ? "none" : "background 0.4s ease",
        cursor: "pointer",
      }}
    >
      <div style={{
        borderRadius: 16,
        background: "#0a0a0a",
        backdropFilter: "blur(8.5px)",
        WebkitBackdropFilter: "blur(8.5px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}>
        {/* Mouse-follow spotlight, always active on hover */}
        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: spotlightBg,
          opacity: effectiveHovered ? 1 : 0,
          transition: (effectiveHovered && !isMobile) ? "none" : "opacity 0.4s ease",
          zIndex: 1,
        }} />

        {/* Illustration area, 304px tall */}
        <div className="method-card-illus" style={{ height: 304, flexShrink: 0, position: "relative", zIndex: 2 }}>
          {/* Illustration, slides from right + large (default) → centered + small (hover) */}
          <motion.div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: 620,
              height: 620,
              marginLeft: -310,
              marginTop: -310,
            }}
            animate={{
              opacity: expanded ? 0.1 : 1,
              x: effectiveHovered && !expanded ? 0 : 180,
              y: effectiveHovered && !expanded ? 0 : 71,
              scale: effectiveHovered && !expanded ? 0.4 : 1,
            }}
            transition={{
              opacity: { duration: 0.4, ease: "easeInOut" },
              x: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
              scale: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            {/* Default, tinted to #2E2E2E, fades out on hover */}
            <motion.img
              src="/method/hero-framework.svg"
              width={620} height={620}
              alt="" aria-hidden="true"
              animate={{ opacity: effectiveHovered && !expanded ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute", top: 0, left: 0, display: "block",
                filter: "brightness(0) invert(1) brightness(0.18)",
              }}
            />
            {/* Hover, pink accent with pulsing glow, fades in on hover */}
            <motion.img
              src="/method/hero-framework-hover.svg"
              width={620} height={620}
              alt="" aria-hidden="true"
              animate={{ opacity: effectiveHovered && !expanded ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className={effectiveHovered && !expanded ? "method-dt-glow" : ""}
              style={{ position: "absolute", top: 0, left: 0, display: "block" }}
            />
          </motion.div>
          {/* Expanded text, animates in/out when expanded */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                key="hf-text"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", inset: 0, padding: 32, pointerEvents: "none" }}
              >
                <p style={{ fontFamily: "var(--font-urbanist), sans-serif", fontSize: 18, lineHeight: "26px", color: "#ffffff", margin: 0 }}>
                  <span style={{ fontWeight: 300 }}>The Hero Framework helps teams bridge the gap between business goals and human motivation. </span>
                  <span style={{ fontWeight: 700 }}>We collaborate with founders and product teams to uncover what truly drives their users </span>
                  <span style={{ fontWeight: 300 }}>and turn those insights into clear, story-driven product experiences.</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Text panel — fades out when expanded */}
        <motion.div
          animate={{ opacity: expanded ? 0 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ padding: 32, paddingRight: active && isMobile ? 80 : 32, display: "flex", flexDirection: "column", gap: 11, flexShrink: 0, width: "100%", boxSizing: "border-box", position: "relative", zIndex: 2, pointerEvents: expanded ? "none" : "auto", transition: "padding-right 0.3s ease" }}
        >
          <p style={cardTitle}>The Hero Framework</p>
          <p style={cardDesc}>Aligns product vision with user needs.</p>
        </motion.div>

        {/* Plus / Close icon, appears on hover or when expanded */}
        <AnimatePresence>
          {active && (
            <motion.div
              key="toggle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              aria-hidden="true"
              style={{
                position: "absolute", bottom: 27, right: 27, zIndex: 8,
                width: 40, height: 40, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(10,10,10,0.4)",
                backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ transform: expanded ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
              >
                <path d="M7 1V13M1 7H13" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function MethodSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section id="framework" className="method-section" style={{ padding: "120px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ marginBottom: 64, textAlign: "center" }}
        >
          <p style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "3.9px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 20,
            fontFamily: "var(--font-urbanist), sans-serif",
          }}>
            Our Method
          </p>
          <h2 style={{
            fontSize: "clamp(32px, 4.5vw, 64px)",
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            margin: "0 auto 20px",
          }}>
            The Method Behind Every Result
          </h2>
          <p style={{
            fontSize: "clamp(15px, 1.2vw, 18px)",
            color: "#b0b0b0",
            fontFamily: "var(--font-geist), sans-serif",
            fontWeight: 300,
            lineHeight: 1.6,
          }}>
            Behavioral Science + AI-Powered Design, working together.
          </p>
        </motion.div>

        {/* Video card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          style={{
            padding: 52,
            borderRadius: 16,
            border: "1px solid #383838",
            background: "#0a0a0a",
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
            gap: 40,
            position: "relative",
            overflow: "hidden",
          }}
          className="method-video-card"
        >
          {/* Left column, text top, button bottom */}
          <div className="method-video-col" style={{
            flex: "0 0 auto",
            width: 332,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}>
            {/* Text group */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                  fontFamily: "var(--font-urbanist), sans-serif",
                }}>
                  Video
                </p>
                <h3 style={{
                  fontSize: "clamp(32px, 3.5vw, 50px)",
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 1.06,
                  letterSpacing: "-0.5px",
                  margin: 0,
                  fontFamily: "var(--font-urbanist), sans-serif",
                }}>
                  The Hero Breakdown
                </h3>
              </div>
              <p style={{
                fontSize: 15,
                color: "#b0b0b0",
                lineHeight: 1.7,
                margin: 0,
                fontFamily: "var(--font-geist), sans-serif",
                fontWeight: 300,
                opacity: 0.85,
              }}>
                See how the Hero Framework transforms product metrics. Real results, real clients, real methodology.
              </p>
            </div>
          </div>

          <VideoPlayer />
        </motion.div>

        {/* Feature cards — Hero Framework left, Design Triggers right */}
        <div
          className="method-cards"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}
        >
          <HeroFrameworkCard delay={0} isMobile={isMobile} />
          <DesignTriggersCard delay={0.15} isMobile={isMobile} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes method-glow {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(217,12,183,0.5)); }
          50%       { filter: drop-shadow(0 0 20px rgba(217,12,183,0.95)) drop-shadow(0 0 36px rgba(118,12,217,0.45)); }
        }
        .method-dt-glow {
          animation: method-glow 1.8s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .method-section { padding: 80px 20px !important; }
          .method-cards { grid-template-columns: 1fr !important; }
          .method-card-illus { height: 220px !important; }
          .method-video-card {
            flex-direction: column !important;
            padding: 28px !important;
            gap: 24px !important;
          }
          .method-video-col {
            width: auto !important;
            flex: 1 1 auto !important;
          }
        }
      `}</style>
    </section>
  );
}
