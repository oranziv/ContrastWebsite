"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ── Per-letter blur+fade+y reveal (viewport-triggered) ───────────────────────
function RevealText({
  text,
  delay = 0,
  stagger = 0.032,
  style,
  className,
}: {
  text: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const chars = text.split("");

  return (
    <span ref={ref} style={{ display: "inline", ...style }} className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
          initial={{ opacity: 0, y: 28, filter: "blur(18px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.65,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

const PHRASES = ["Constant Learning", "Clear Thinking", "Intentional Design"];

// ── Sparkle field ─────────────────────────────────────────────────────────────
function SparkleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 200;

    type Star = {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      baseOpacity: number;
      phase: number;       // twinkle phase offset
      twinkleSpeed: number;
      driftX: number;      // per-star chaos frequency
      driftY: number;
    };

    const make = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.10,
      size: Math.random() * 1.4 + 0.25,
      baseOpacity: Math.random() * 0.65 + 0.08, // 0.08 → 0.73
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.007 + 0.002,
      driftX: Math.random() * 0.013 + 0.004,
      driftY: Math.random() * 0.009 + 0.003,
    });

    const stars: Star[] = Array.from({ length: COUNT }, make);
    let frame = 0;
    let animId: number;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      frame++;

      for (const s of stars) {
        // Chaotic slow drift: base velocity + per-star sinusoidal wobble
        s.x += s.vx + Math.sin(frame * s.driftX + s.phase) * 0.06;
        s.y += s.vy + Math.cos(frame * s.driftY + s.phase * 1.4) * 0.05;

        if (s.x < -2) s.x = W + 2;
        if (s.x > W + 2) s.x = -2;
        if (s.y < -2) s.y = H + 2;
        if (s.y > H + 2) s.y = -2;

        // Slow twinkle: opacity oscillates between ~40% and 100% of baseOpacity
        const twinkle = 0.55 + 0.45 * Math.sin(frame * s.twinkleSpeed + s.phase);
        const alpha = s.baseOpacity * twinkle;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// ── Cycling headline ─────────────────────────────────────────────────────────
function CyclingHeadline() {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setIndex(i => (i + 1) % PHRASES.length), 2400);
    return () => clearInterval(id);
  }, [inView]);

  const chars = PHRASES[index].split("");
  const STAGGER = 0.024;

  return (
    <div
      ref={ref}
      style={{
        position: "relative", zIndex: 2,
        margin: "48px 0 0",
        width: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <AnimatePresence mode="wait">
        <h2
          key={index}
          className="cta-headline"
          style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(64px, 8.5vw, 112px)",
            lineHeight: 1,
            letterSpacing: "-2.24px",
            color: "#ffffff",
            margin: 0,
            width: "100%",
            textAlign: "center",
          }}
        >
          {chars.map((char, i) => (
            <motion.span
              key={`${index}-${i}`}
              style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : undefined }}
              initial={{ opacity: 0, filter: "blur(22px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(22px)" }}
              transition={{
                duration: 0.47,
                delay: i * STAGGER,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h2>
      </AnimatePresence>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function CtaBanner() {
  return (
    <section
      className="cta-banner-section"
      style={{
        position: "relative",
        width: "100%",
        minHeight: 380,
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 100,
        paddingBottom: 140,
      }}
    >
      {/* ── Sparkle field ── */}
      <SparkleField />

      {/* ── Background gradient container ── */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {/* Blob 1, large violet→pink pill */}
        <div style={{
          position: "absolute", left: "50%", top: -387,
          transform: "translate(calc(-50% + 22.86px), 0) rotate(180deg)",
          width: 1279, height: 765, borderRadius: 1146,
          background: "linear-gradient(to bottom, rgba(118,12,217,0.75), rgba(217,12,183,0.75))",
          filter: "blur(92.75px)", opacity: 0.65,
        }} />
        {/* Blob 2, color-dodge brightening layer */}
        <div style={{
          position: "absolute", left: "50%", top: -335,
          transform: "translate(calc(-50% + 22.86px), 0) rotate(180deg)",
          width: 1386, height: 447, borderRadius: 1146,
          background: "linear-gradient(to bottom, rgba(118,12,217,0.75), rgba(217,12,183,0.75))",
          filter: "blur(69.65px)", mixBlendMode: "color-dodge",
        }} />
        {/* Arc glow */}
        <div style={{ position: "absolute", left: 12, top: -54, width: 1369, height: 411, mixBlendMode: "plus-lighter" }}>
          <img src="/cta-glow-arc.svg" alt="" style={{
            position: "absolute", top: "-19.05%", right: "-5.72%", bottom: "-19.05%", left: "-5.72%",
            width: "auto", height: "auto", display: "block",
          }} />
        </div>
        {/* Smooth fade to dark at bottom, eliminates hard gradient edge */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 220,
          background: "linear-gradient(to bottom, transparent, #0a0a0a)",
          pointerEvents: "none",
        }} />
      </div>

      {/* ── "WE BELIEVE IN" ── */}
      <p
        className="cta-label"
        style={{
          position: "relative", zIndex: 2,
          fontFamily: "var(--font-urbanist), sans-serif",
          fontWeight: 300, fontSize: 45, lineHeight: "43.931px",
          letterSpacing: "14.4px", textTransform: "uppercase",
          color: "#ffffff", textAlign: "center", margin: 0,
          width: "100%",
        }}
      >
        <RevealText text="We believe in" stagger={0.045} />
      </p>

      {/* ── Cycling headline ── */}
      <CyclingHeadline />

<style jsx global>{`
        @media (max-width: 768px) {
          .cta-banner-section {
            padding-top: 56px !important;
            padding-bottom: 72px !important;
          }
          .cta-label {
            font-size: 22px !important;
            letter-spacing: 7.2px !important;
            line-height: 1.3 !important;
          }
          .cta-headline {
            font-size: clamp(45px, 11.5vw, 78px) !important;
          }
        }
      `}</style>
    </section>
  );
}
