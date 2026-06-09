"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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

    type Star = {
      x: number; y: number; vx: number; vy: number;
      size: number; baseOpacity: number; phase: number;
      twinkleSpeed: number; driftX: number; driftY: number;
    };

    const make = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.09,
      vy: (Math.random() - 0.5) * 0.07,
      size: Math.random() * 1.3 + 0.2,
      baseOpacity: Math.random() * 0.55 + 0.06,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.006 + 0.002,
      driftX: Math.random() * 0.011 + 0.003,
      driftY: Math.random() * 0.008 + 0.002,
    });

    const stars: Star[] = Array.from({ length: 180 }, make);
    let frame = 0;
    let animId: number;

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      frame++;
      for (const s of stars) {
        s.x += s.vx + Math.sin(frame * s.driftX + s.phase) * 0.05;
        s.y += s.vy + Math.cos(frame * s.driftY + s.phase * 1.3) * 0.04;
        if (s.x < -2) s.x = W + 2;
        if (s.x > W + 2) s.x = -2;
        if (s.y < -2) s.y = H + 2;
        if (s.y > H + 2) s.y = -2;
        const twinkle = 0.5 + 0.5 * Math.sin(frame * s.twinkleSpeed + s.phase);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(s.baseOpacity * twinkle).toFixed(3)})`;
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
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    />
  );
}

// ── Glitch slice type ─────────────────────────────────────────────────────────
type GlitchSlice = { y: number; h: number; x: number; pink: boolean };

// ── Page ─────────────────────────────────────────────────────────────────────
export default function NotFound() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [glitching, setGlitching] = useState(false);
  const [slices, setSlices] = useState<GlitchSlice[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  };

  // Trigger a glitch burst
  const triggerGlitch = () => {
    const newSlices: GlitchSlice[] = Array.from(
      { length: 4 + Math.floor(Math.random() * 5) },
      () => ({
        y: Math.random() * 100,
        h: 0.6 + Math.random() * 8,
        x: (Math.random() - 0.5) * 38,
        pink: Math.random() > 0.45,
      })
    );
    setSlices(newSlices);
    setGlitching(true);
  };

  const endGlitch = () => {
    setGlitching(false);
    setSlices([]);
  };

  // Auto glitch on random interval
  useEffect(() => {
    const schedule = () => {
      const delay = 2800 + Math.random() * 3600;
      timerRef.current = setTimeout(() => {
        triggerGlitch();
        setTimeout(() => {
          endGlitch();
          schedule();
        }, 120 + Math.random() * 280);
      }, delay);
    };
    schedule();
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // Hover glitch: short burst on mouse-enter of the 404
  const handleHoverGlitch = () => {
    if (glitching) return;
    triggerGlitch();
    setTimeout(endGlitch, 180);
  };

  const mx = mouse.x - 0.5;
  const my = mouse.y - 0.5;

  const FONT_SIZE = "clamp(130px, 18vw, 260px)";
  const FONT_STYLE: React.CSSProperties = {
    fontFamily: "var(--font-urbanist), sans-serif",
    fontSize: FONT_SIZE,
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 1,
    margin: 0,
    display: "block",
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ minHeight: "100vh", background: "#0a0a0a", overflow: "hidden", position: "relative" }}
    >
      <SparkleField />

      {/* Mouse-following glow */}
      <div
        style={{
          position: "fixed",
          left: `${mouse.x * 100}%`,
          top: `${mouse.y * 100}%`,
          transform: "translate(-50%, -50%)",
          width: 800, height: 560,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(217,12,183,0.16) 0%, rgba(118,12,217,0.09) 45%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          transition: "left 0.3s ease-out, top 0.3s ease-out",
          zIndex: 0,
        }}
      />

      <main
        style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          minHeight: "100vh", padding: "0 40px",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: 11, fontWeight: 700, letterSpacing: "4px",
            textTransform: "uppercase", color: "#d90cb7",
            margin: "0 0 28px",
          }}
        >
          Error
        </motion.p>

        {/* ── 404 ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={handleHoverGlitch}
          style={{ position: "relative", marginBottom: 52, cursor: "default", userSelect: "none" }}
        >
          {/* Pink chromatic aberration */}
          <span
            aria-hidden
            style={{
              ...FONT_STYLE,
              position: "absolute", inset: 0,
              color: "#d90cb7",
              opacity: glitching ? 0.7 : 0.13,
              transform: `translate(${5 + mx * 48}px, ${-2 + my * 32}px)`,
              transition: glitching ? "none" : "opacity 0.5s ease, transform 0.14s ease-out",
              mixBlendMode: "screen",
              pointerEvents: "none",
            }}
          >
            404
          </span>

          {/* Purple chromatic aberration */}
          <span
            aria-hidden
            style={{
              ...FONT_STYLE,
              position: "absolute", inset: 0,
              color: "#7612d9",
              opacity: glitching ? 0.6 : 0.10,
              transform: `translate(${-5 + mx * -36}px, ${3 + my * -24}px)`,
              transition: glitching ? "none" : "opacity 0.5s ease, transform 0.14s ease-out",
              mixBlendMode: "screen",
              pointerEvents: "none",
            }}
          >
            404
          </span>

          {/* Glitch slices — clipped horizontal strips of the 404 shifted sideways */}
          {glitching && slices.map((s, i) => (
            <span
              key={i}
              aria-hidden
              style={{
                ...FONT_STYLE,
                position: "absolute", inset: 0,
                color: s.pink ? "#d90cb7" : "#ffffff",
                clipPath: `polygon(0 ${s.y}%, 100% ${s.y}%, 100% ${Math.min(s.y + s.h, 100)}%, 0 ${Math.min(s.y + s.h, 100)}%)`,
                transform: `translateX(${s.x}px)`,
                opacity: 0.85,
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            >
              404
            </span>
          ))}

          {/* Main 404 */}
          <span
            style={{
              ...FONT_STYLE,
              position: "relative",
              color: "#ffffff",
              transform: `translate(${mx * 18}px, ${my * 12}px)`,
              transition: "transform 0.14s ease-out",
              display: "block",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            margin: "0 0 16px",
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 600,
            color: "#ffffff", letterSpacing: "-0.02em", lineHeight: 1.2,
          }}
        >
          Page not found
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{
            margin: "0 0 44px",
            fontFamily: "var(--font-geist), sans-serif",
            fontSize: "clamp(14px, 1.1vw, 16px)", fontWeight: 400,
            lineHeight: 1.75, color: "#b0b0b0", maxWidth: 400,
          }}
        >
          This page got lost somewhere between wireframes and production.
          Happens to the best of us.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="/"
          className="btn-gradient-border"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "11px 26px", borderRadius: 9999,
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: 14, fontWeight: 600, color: "#ffffff",
            textDecoration: "none", whiteSpace: "nowrap",
          }}
        >
          Back to home
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.a>
      </main>
    </div>
  );
}
