"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Stat = {
  client: string;
  metric: string;
  value: number;
  suffix: string;
  description: string;
};

const stats: Stat[] = [
  {
    client: "Fiverr",
    metric: "increase in feature adoption",
    value: 10,
    suffix: "%",
    description: "12% increase in feature adoption through targeted UX optimization.",
  },
  {
    client: "Viably",
    metric: "conversion rate boost",
    value: 5,
    suffix: "x",
    description: "5x conversion rate boost, from 4.2% to 20.4% in 90 days.",
  },
  {
    client: "Designrr",
    metric: "increase in engagement",
    value: 97,
    suffix: "%",
    description: "97% increase in engagement after Hero Framework implementation.",
  },
];

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animStarted = useRef(false);

  // Counter animation — observe the card root (reliable on iOS Safari,
  // avoids the "span inside transformed ancestor" IO bug)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animStarted.current) return;
        animStarted.current = true;
        observer.disconnect();

        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * stat.value));
          if (progress < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, [stat.value]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const borderBg = hovered
    ? `radial-gradient(circle 360px at ${mouse.x}px ${mouse.y}px, #d90cb7 0%, rgba(56,56,56,0.62) 55%)`
    : "rgba(56,56,56,0.62)";

  const spotlightBg = `radial-gradient(circle 400px at ${mouse.x - 1}px ${mouse.y - 1}px, rgba(217,12,183,0.12) 0%, transparent 70%)`;

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
      style={{
        padding: 1,
        borderRadius: 17,
        background: borderBg,
        transition: hovered ? "none" : "background 0.4s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          padding: "40px 36px",
          borderRadius: 16,
          background: "#0a0a0a",
          backdropFilter: "blur(26.7px)",
          WebkitBackdropFilter: "blur(26.7px)",
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {/* Mouse-follow spotlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: hovered ? 1 : 0,
            background: spotlightBg,
            transition: hovered ? "none" : "opacity 0.4s ease",
          }}
        />
        {/* Background gradient glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 110%, rgba(118,12,217,0.25) 0%, rgba(217,12,183,0.12) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Client logo */}
          <div style={{ marginBottom: 24, height: 28, display: "flex", alignItems: "center" }}>
            <img
              src={`/logos/${stat.client.toLowerCase()}.svg`}
              alt={stat.client}
              style={{ height: 22, width: "auto", objectFit: "contain", display: "block" }}
            />
          </div>

          {/* Counter */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 8 }}>
            <span
              style={{
                fontSize: "clamp(64px, 8vw, 96px)",
                fontWeight: 200,
                fontFamily: "var(--font-urbanist), sans-serif",
                color: "#ffffff",
                lineHeight: 1,
                letterSpacing: "2px",
              }}
            >
              {count}
            </span>
            <span
              style={{
                fontSize: "clamp(40px, 5vw, 60px)",
                fontWeight: 200,
                color: "#ffffff",
                lineHeight: 1.1,
                fontFamily: "var(--font-urbanist), sans-serif",
                letterSpacing: "1px",
              }}
            >
              {stat.suffix}
            </span>
          </div>

          {/* Metric label */}
          <p
            style={{
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: "0.84px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 20,
              fontFamily: "var(--font-geist), sans-serif",
            }}
          >
            {stat.metric}
          </p>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(56,56,56,0.62)", marginBottom: 20 }} />

          {/* Description */}
          <p
            style={{
              fontSize: 14,
              color: "#b0b0b0",
              lineHeight: 1.7,
              fontFamily: "var(--font-geist), sans-serif",
              fontWeight: 300,
            }}
          >
            {stat.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function SuccessStoriesSection() {
  return (
    <section className="success-section" style={{ padding: "120px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ marginBottom: 64, textAlign: "center" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-urbanist), sans-serif",
              fontSize: "clamp(32px, 4.5vw, 64px)",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: "0 auto",
              color: "#ffffff",
            }}
          >
            Success Stories: Real UX Wins
          </h2>
        </motion.div>

        {/* Stat cards */}
        <div
          className="stats-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.client} stat={stat} delay={i * 0.15} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
