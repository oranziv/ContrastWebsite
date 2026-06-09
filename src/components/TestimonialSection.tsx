"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Contrast’s strategic approach paired with their pixel-perfect designs are an inseparable part of the Post.news launch and results.",
    name: "Noam Bardin",
    title: "Founder Post.news · Former CEO of Waze",
    photo: "/testimonials/noam-bardin.jpg",
  },
  {
    quote:
      "Contrast’s outstanding strategy & design work set the stage, and is directly linked, to the rapid success & eventual acquisition of our startup.",
    name: "Kieran O’Brien",
    title: "Founder Mediakits · Acquired by Viral Nation",
    photo: "/testimonials/kieran-obrien.png",
  },
];

const AUTO_INTERVAL = 6000;

// ── Avatar, shows photo if it loads, initials otherwise ──────────────────────
// Reset-on-src is handled by remounting via `key={src}` at the call site, so no
// effect is needed here.
function Avatar({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(" ")
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();

  if (failed) {
    return (
      <div
        className="testimonial-photo"
        style={{
          width: 131, height: 126, borderRadius: 16,
          border: "1px solid #242323",
          background: "rgba(217,12,183,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          fontFamily: "var(--font-urbanist), sans-serif",
          fontWeight: 600, fontSize: 36,
          color: "#d90cb7",
          letterSpacing: "-0.02em",
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="testimonial-photo"
      onError={() => setFailed(true)}
      style={{
        width: 131, height: 126,
        borderRadius: 16,
        border: "1px solid #242323",
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
  );
}

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      {direction === "left"
        ? <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      }
    </svg>
  );
}

function NavButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 44, height: 44,
        borderRadius: "50%",
        border: `1px solid ${hovered ? "#d90cb7" : "rgba(255,255,255,0.18)"}`,
        background: hovered ? "rgba(217,12,183,0.08)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        color: hovered ? "#d90cb7" : "rgba(255,255,255,0.6)",
        transition: "border-color 0.25s ease, background 0.25s ease, color 0.25s ease",
        flexShrink: 0,
      }}
    >
      <Arrow direction={direction} />
    </button>
  );
}

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-play, restarts whenever the user manually navigates
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(i => (i + 1) % TESTIMONIALS.length);
    }, AUTO_INTERVAL);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const goTo = (index: number) => {
    setCurrent(index);
    startTimer();
  };
  const goPrev = () => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => goTo((current + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[current];

  const quoteBase: React.CSSProperties = {
    margin: 0,
    fontFamily: "var(--font-urbanist), sans-serif",
    fontWeight: 500,
    fontSize: "clamp(28px, 3.5vw, 50px)",
    lineHeight: 1.176,
    letterSpacing: "-0.01em",
  };

  return (
    <section id="testimonials" className="testimonial-section" style={{ padding: "120px 40px", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", display: "flex", flexDirection: "column", gap: 96 }}>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ ...quoteBase, color: "#ffffff" }}
          >
            {t.quote}
          </motion.p>
        </AnimatePresence>

        {/* Author row */}
        <div className="testimonial-author-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>

          {/* Author */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="testimonial-author"
              style={{ display: "flex", alignItems: "center", gap: 52 }}
            >
              <Avatar key={t.photo} src={t.photo} name={t.name} />
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <p className="testimonial-name" style={{
                  margin: 0,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontWeight: 400, fontSize: 29,
                  color: "#ffffff", lineHeight: "43.931px",
                }}>
                  {t.name}
                </p>
                <p className="testimonial-title" style={{
                  margin: 0,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  fontWeight: 400, fontSize: 29,
                  color: "#888888", lineHeight: "43.931px",
                }}>
                  {t.title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="testimonial-controls" style={{ display: "flex", gap: 16, alignItems: "center", flexShrink: 0 }}>
            <NavButton direction="left" onClick={goPrev} />

            <div className="testimonial-dots" style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {TESTIMONIALS.map((_, i) => (
                <div
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    height: 4,
                    width: i === current ? 76 : 8,
                    borderRadius: 45,
                    background: "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "width 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                    flexShrink: 0,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {i === current && (
                    <motion.div
                      key={current}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_INTERVAL / 1000, ease: "linear" }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "#ffffff",
                        borderRadius: 45,
                        transformOrigin: "left center",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <NavButton direction="right" onClick={goNext} />
          </div>

        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          .testimonial-section { padding-top: 60px !important; padding-bottom: 60px !important; }
          .testimonial-author-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 28px !important;
          }
          .testimonial-author {
            gap: 20px !important;
          }
          .testimonial-photo {
            width: 72px !important;
            height: 68px !important;
          }
          .testimonial-name,
          .testimonial-title {
            font-size: 18px !important;
            line-height: 1.4 !important;
          }
          .testimonial-controls {
            width: 100% !important;
            justify-content: space-between !important;
            flex-shrink: 0 !important;
          }
          .testimonial-dots {
            flex: 1 !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
