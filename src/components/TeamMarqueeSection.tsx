"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

type TeamMember = { src: string; name: string; role: string };

const TEAM_ROW_1: TeamMember[] = [
  { src: "/team/sagi-shrieber.png",        name: "Sagi Shrieber",        role: "Founder and CEO" },
  { src: "/team/tom-harnoy.png",           name: "Tom Harnoy",           role: "Brand and Web Designer" },
  { src: "/team/hila-yitzhak.png",         name: "Hila Yitzhak",         role: "Product Designer" },
  { src: "/team/omri-schul.png",           name: "Omri Schul",           role: "Operations Manager" },
  { src: "/team/oran-ziv.png",             name: "Oran Ziv",             role: "VP Design" },
  { src: "/team/yonatan-tize.png",         name: "Yonatan Tize",         role: "Full Stack Developer" },
  { src: "/team/sarit.png",                name: "Sarit",                role: "Product Designer" },
  { src: "/team/ibrahim.png",              name: "Ibrahim",              role: "Full Stack Developer" },
  { src: "/team/varant.png",               name: "Varant",               role: "Product Designer" },
  { src: "/team/nik.png",                  name: "Nik",                  role: "Front End Developer" },
  { src: "/team/aleksandar.png",           name: "Aleksandar",           role: "Product Designer" },
  { src: "/team/ana-baloban.png",          name: "Ana Baloban",          role: "Marketing Designer" },
];

const TEAM_ROW_2: TeamMember[] = [
  { src: "/team/anton-holii.png",          name: "Anton Holii",          role: "Product Designer" },
  { src: "/team/beka-k.png",               name: "Beka K",               role: "Product Designer" },
  { src: "/team/den-klenkov.png",          name: "Den Klenkov",          role: "Product Designer" },
  { src: "/team/giorgi-labadze.png",       name: "Giorgi Labadze",       role: "Product Designer" },
  { src: "/team/ivan-k.png",               name: "Ivan K",               role: "Product Designer" },
  { src: "/team/keso-tchumburidze.jpg",    name: "Keso Tchumburidze",    role: "Product Designer" },
  { src: "/team/monika-adeishvilli.png",   name: "Monika Adeishvilli",   role: "Product Designer" },
  { src: "/team/natali-klimiashvilli.png", name: "Natali Klimiashvilli", role: "Product Designer" },
  { src: "/team/nena-mercep.png",          name: "Nena Mercep",          role: "Product Designer" },
  { src: "/team/veronika-rovniahina.png",  name: "Veronika Rovniahina",  role: "Product Designer" },
  { src: "/team/alona-g.png",              name: "Alona G.",             role: "Design System Specialist" },
];

// ─── Photo card ───────────────────────────────────────────────────────────────

function PhotoCard({ src, name, role, height }: TeamMember & { height: number }) {
  const [hovered, setHovered] = useState(false);
  const [toggled, setToggled] = useState(false);
  const show = hovered || toggled;
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(true);
  };
  const handlePointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(false);
  };
  const handleClick = () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    setToggled(prev => {
      if (!prev) {
        // Auto-dismiss after 2 s on touch
        dismissTimer.current = setTimeout(() => setToggled(false), 2000);
        return true;
      }
      return false;
    });
  };

  return (
    <div
      className="team-photo-card"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      style={{
        position: "relative",
        flexShrink: 0,
        width: Math.round(height * 0.72),
        height,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid #1e1e1e",
        transform: hovered ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        cursor: "pointer",
      }}
    >
      <img
        src={src}
        alt={name}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "top center", display: "block",
          filter: "grayscale(100%)",
          transition: "filter 0.4s ease",
        }}
      />
      <div
        className="team-card-overlay"
        style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.1) 100%)",
          display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "14px 16px",
          opacity: show ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 600, color: "#ffffff", fontFamily: "var(--font-urbanist), sans-serif", letterSpacing: "0.1px", lineHeight: 1.3 }}>
          {name.split(" ")[0]}
        </span>
        <span style={{ fontSize: 11, fontWeight: 400, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-urbanist), sans-serif", letterSpacing: "0.3px", marginTop: 2 }}>
          {role}
        </span>
      </div>
    </div>
  );
}

// ─── Marquee row ──────────────────────────────────────────────────────────────

function MarqueeRow({ photos, direction, height, duration }: {
  photos: TeamMember[];
  direction: "left" | "right";
  height: number;
  duration: number;
}) {
  const [paused, setPaused] = useState(false);
  const doubled = [...photos, ...photos];
  const animName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      style={{ overflow: "hidden", width: "100%", paddingTop: 16, marginTop: -16 }}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setPaused(true); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setPaused(false); }}
    >
      <div style={{
        display: "flex",
        gap: 10,
        width: "max-content",
        animation: `${animName} ${duration}s linear infinite`,
        animationPlayState: paused ? "paused" : "running",
      }}>
        {doubled.map((p, i) => (
          <PhotoCard key={i} src={p.src} name={p.name} role={p.role} height={height} />
        ))}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function TeamMarqueeSection() {
  return (
    <>
      <section className="team-section" style={{ padding: "120px 0 100px", background: "#0a0a0a" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          style={{ maxWidth: 1360, margin: "0 auto", padding: "0 40px", marginBottom: 56, textAlign: "center" }}
        >
          <span style={{
            display: "block",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.84px",
            textTransform: "uppercase",
            color: "#888888",
            fontFamily: "var(--font-urbanist), sans-serif",
            marginBottom: 16,
          }}>
            Our Team
          </span>
          <h2 style={{
            margin: 0,
            fontFamily: "var(--font-urbanist), sans-serif",
            fontSize: "clamp(32px, 4.5vw, 64px)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#ffffff",
          }}>
            People who make great work happen.
          </h2>
        </motion.div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
          <div className="team-fade-left" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 160, background: "linear-gradient(to right, #0a0a0a 20%, transparent)", zIndex: 10, pointerEvents: "none" }} />
          <div className="team-fade-right" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 160, background: "linear-gradient(to left, #0a0a0a 20%, transparent)", zIndex: 10, pointerEvents: "none" }} />

          <div className="team-rows" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <MarqueeRow photos={TEAM_ROW_1} direction="left"  height={300} duration={55} />
            <MarqueeRow photos={TEAM_ROW_2} direction="right" height={300} duration={45} />
          </div>
        </motion.div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          .team-section { padding-top: 60px !important; }
          .team-photo-card {
            transform: none !important;
            transition: none !important;
            height: 160px !important;
            width: 116px !important;
          }
          .team-fade-left,
          .team-fade-right {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
