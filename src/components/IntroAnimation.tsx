"use client";

import { useState, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { setDotOrigin, shouldSkipIntro, clearSoftNavFlag, markIntroPlayed } from "@/lib/introState";
import { getLenis } from "@/lib/smoothScroll";

// ── Logo vectors, identical to Logotype.tsx ──────────────────────────────────
const VECTORS = [
  { src: "/logo/letter-c.svg",  inset: "0% 89.91% 0% 0%"            },
  { src: "/logo/letter-o.svg",  inset: "0% 76.43% 0% 12.12%"        },
  { src: "/logo/letter-n.svg",  inset: "1.93% 63.63% 1.92% 26.57%"  },
  { src: "/logo/letter-t2.svg", inset: "1.93% 51.85% 1.92% 38.92%"  },
  { src: "/logo/letter-r.svg",  inset: "1.93% 39.8% 1.92% 50.71%"   },
  { src: "/logo/letter-a.svg",  inset: "1.93% 26.19% 1.92% 61.84%"  },
  { src: "/logo/letter-s2.svg", inset: "0% 15.71% 0% 75.39%"        },
  { src: "/logo/letter-t.svg",  inset: "1.93% 4.78% 1.92% 86%"      },
  { src: "/logo/dot.svg",       inset: "68.41% 0% 0.68% 96.64%"     },
] as const;

const DOT_INDEX = 8;

// ── Typing ────────────────────────────────────────────────────────────────────
const TYPING_TEXT = "We are ";   // trailing space becomes the gap before the logo
const CHAR_MS     = 95;          // ms per keystroke, feels natural, not too fast
const LOGO_STAGGER_MS = 85;      // ms per logo letter, slightly faster than text

// ── Timeline (all ms from page mount) ────────────────────────────────────────
//
//   350ms        cursor appears (blinks, no text yet)
//   400ms        "W" typed
//   495ms        "e" typed  ...etc
//   1055ms       space typed  (7 chars × 95ms = 665ms + 400ms start)
//   1055ms       100ms pause, cursor stays
//   1155ms       logo starts, cursor hides, "C" pops in
//   1155–1835ms  logo letters pop in (9 × 85ms)
//   1835–2500ms  hold (full phrase visible, ~665ms)
//   2500ms       dissolve begins (0.75s)
//   3200ms       unmount, scroll unlocked  ← matches Header delay of 3.8s
//
const INITIAL_DELAY  = 400;
const TEXT_DONE_MS   = INITIAL_DELAY + TYPING_TEXT.length * CHAR_MS; // ≈ 1055
const LOGO_START_MS  = TEXT_DONE_MS + 100;                           // ≈ 1155
const TRANSITION_MS  = 2500;
const DONE_MS        = 3200;

export default function IntroAnimation() {
  const [show,       setShow]       = useState(true);
  const [dissolving, setDissolving] = useState(false);
  const [typedCount, setTypedCount] = useState(0);  // 0 → TYPING_TEXT.length
  const [cursorOn,   setCursorOn]   = useState(false);
  const [logoCount,  setLogoCount]  = useState(0);  // 0 → VECTORS.length

  const dotRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (shouldSkipIntro()) {
      clearSoftNavFlag();
      setShow(false);
      return;
    }

    markIntroPlayed();
    document.body.style.overflow = "hidden";
    getLenis()?.stop(); // lock Lenis too — body overflow alone won't stop it

    const T: ReturnType<typeof setTimeout>[] = [];

    // Cursor blinks briefly before first keystroke
    T.push(setTimeout(() => setCursorOn(true), INITIAL_DELAY - 50));

    // Type each character
    for (let i = 0; i < TYPING_TEXT.length; i++) {
      T.push(setTimeout(() => setTypedCount(i + 1), INITIAL_DELAY + i * CHAR_MS));
    }

    // Cursor off → logo letters pop in
    T.push(setTimeout(() => setCursorOn(false), LOGO_START_MS));
    for (let j = 0; j < VECTORS.length; j++) {
      T.push(setTimeout(() => setLogoCount(j + 1), LOGO_START_MS + j * LOGO_STAGGER_MS));
    }

    // Capture dot position then dissolve
    T.push(setTimeout(() => {
      if (dotRef.current) {
        const r = dotRef.current.getBoundingClientRect();
        setDotOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }
      setDissolving(true);
    }, TRANSITION_MS));

    // Unmount + unlock scroll
    T.push(setTimeout(() => {
      document.body.style.overflow = "";
      getLenis()?.start();
      setShow(false);
    }, DONE_MS));

    // Clear dotOrigin well after sphere has started streaming from it
    T.push(setTimeout(() => setDotOrigin(null), DONE_MS + 2500));

    return () => {
      T.forEach(clearTimeout);
      // Intro now also plays on client-side navs to home; if the user navigates
      // away mid-intro, make sure scroll is never left locked.
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            animate={dissolving ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            style={{
              position:       "fixed",
              inset:          0,
              zIndex:         9999,
              background:     "#0a0a0a",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              pointerEvents:  "none",
            }}
          >
            {/*
              Single flex row:  "We are [cursor] [CONTRAST.]"
              Font-size on the wrapper controls logo height via em units.
            */}
            <div
              style={{
                display:    "flex",
                alignItems: "center",
                fontSize:   "clamp(18px, 3vw, 44px)",
                lineHeight: 1,
              }}
            >
              {/* ── "We are " typed text ── */}
              <span
                style={{
                  fontFamily:    "var(--font-urbanist), sans-serif",
                  fontWeight:    300,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color:         "rgba(255,255,255,0.42)",
                  whiteSpace:    "pre",  // preserves the trailing space
                }}
              >
                {TYPING_TEXT.slice(0, typedCount)}
              </span>

              {/* ── Blinking cursor, always in layout, opacity-only ── */}
              <span
                className={cursorOn ? "intro-cursor" : ""}
                style={{
                  display:    "inline-block",
                  width:      2,
                  height:     "0.85em",
                  background: "rgba(255,255,255,0.75)",
                  flexShrink: 0,
                  opacity:    cursorOn ? 1 : 0,
                  transition: "opacity 0.12s ease",
                }}
              />

              {/* ── CONTRAST. logo, letters pop in one by one ── */}
              <div
                style={{
                  position:    "relative",
                  height:      "0.82em",
                  aspectRatio: `${685} / ${73.385}`,
                  flexShrink:  0,
                  marginLeft:  "0.08em",
                }}
              >
                {VECTORS.map(({ src, inset }, i) => {
                  const isDot   = i === DOT_INDEX;
                  const visible = i < logoCount;
                  return (
                    <div
                      key={i}
                      ref={isDot ? dotRef : undefined}
                      style={{
                        position:   "absolute",
                        inset,
                        opacity:    visible ? 1 : 0,
                        transition: "opacity 0.07s ease",
                        // Pink glow appears with the dot
                        ...(isDot && visible && {
                          filter:
                            "drop-shadow(0 0 5px rgba(217,12,183,1))"     +
                            " drop-shadow(0 0 18px rgba(217,12,183,0.8))" +
                            " drop-shadow(0 0 44px rgba(118,12,217,0.5))",
                        }),
                      }}
                    >
                      <img
                        src={src}
                        alt=""
                        aria-hidden="true"
                        style={{ display: "block", width: "100%", height: "100%" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global keyframe for cursor blink */}
      <style>{`
        @keyframes introCursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .intro-cursor {
          animation: introCursorBlink 0.7s linear infinite;
        }
      `}</style>
    </>
  );
}
