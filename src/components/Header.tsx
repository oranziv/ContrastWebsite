"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Logotype from "./Logotype";
import { setLogoOrigin, shouldSkipIntro } from "@/lib/introState";

const navLinks = [
  { label: "The Hero Framework", href: "/#framework" },
  { label: "Selected Work", href: "/#work" },
  { label: "Our services", href: "/#services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Careers", href: "/careers" },
];

export function handleNavClick(
  href: string,
  e: React.MouseEvent,
  router: ReturnType<typeof useRouter>,
) {
  // Let the browser handle modifier-clicks (open in new tab, etc.)
  if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

  const hash = href.startsWith("/#") ? href.slice(2) : href.startsWith("#") ? href.slice(1) : null;

  // Same-page section link → smooth scroll, no navigation.
  if (hash) {
    const el = document.getElementById(hash);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
  }

  // Internal route / cross-page section link → client-side navigation so the App
  // Router keeps its history consistent (a hard window.location nav here left a
  // blank page on browser Back). The homepage's intro animation plays on arrival
  // and masks its load — so we intentionally do NOT skip it here.
  e.preventDefault();
  router.push(href);
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const introDelay =
    pathname === "/" && typeof window !== "undefined" && !shouldSkipIntro()
      ? 3.8
      : 0;

  const logoRef = useRef<HTMLAnchorElement>(null);

  // Prefetch nav destinations so client-side transitions (e.g. logo → home)
  // feel instant in production. No-op for the route you're already on.
  useEffect(() => {
    const routes = new Set(navLinks.map((l) => (l.href.startsWith("/#") ? "/" : l.href)));
    routes.forEach((r) => router.prefetch(r));
  }, [router]);

  useEffect(() => {
    const measure = () => {
      if (!logoRef.current) return;
      const r = logoRef.current.getBoundingClientRect();
      setLogoOrigin({ cx: r.left + r.width / 2, cy: r.top + r.height / 2, width: r.width });
    };
    const id = requestAnimationFrame(measure);
    return () => {
      cancelAnimationFrame(id);
      setLogoOrigin(null);
    };
  }, []);

  return (
    <>
    <div
      className="header-outer"
      style={{
        position:       "fixed",
        top:            20,
        left:           0,
        right:          0,
        zIndex:         50,
        display:        "flex",
        justifyContent: "center",
        padding:        "0 40px",
        boxSizing:      "border-box",
        pointerEvents:  "none",
      }}
    >
      {/* position:relative so the dropdown is anchored to this container */}
      <div style={{ width: "100%", maxWidth: 1360, pointerEvents: "auto", position: "relative" }}>

        {/* Pill — always pill-shaped, never changes form */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: introDelay, ease: "easeOut" }}
          style={{
            width:                "100%",
            borderRadius:         9999,
            background:           "rgba(10, 10, 10, 0.55)",
            backdropFilter:       "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border:               "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow:            "0 8px 32px rgba(0, 0, 0, 0.4)",
            overflow:             "hidden",
          }}
        >
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              padding:        "0 13px 0 28px",
              height:         68,
            }}
          >
            {/* Client-side nav (keeps App Router history consistent → no blank
                page on browser Back). href kept for accessibility / fallback. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              ref={logoRef}
              href="/"
              onClick={(e) => handleNavClick("/", e, router)}
              aria-label="Contrast home"
              style={{ display: "block", textDecoration: "none" }}
            >
              <Logotype width={110} />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex" style={{ alignItems: "center", gap: 36 }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e, router)}
                  style={{
                    fontSize:       14,
                    fontWeight:     400,
                    color:          "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    transition:     "color 0.2s",
                    whiteSpace:     "nowrap",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <a
              href="https://tidycal.com/sagishrieber/strategy-call"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient-border hidden lg:flex"
              style={{
                alignItems:     "center",
                gap:            6,
                borderRadius:   9999,
                padding:        "11px 26px",
                fontSize:       14,
                fontWeight:     600,
                color:          "#ffffff",
                textDecoration: "none",
                whiteSpace:     "nowrap",
              }}
            >
              Book a call
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Mobile burger / close */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex lg:hidden"
              style={{
                alignItems: "center", justifyContent: "center",
                width: 36, height: 36,
                background: "none", border: "none", cursor: "pointer", padding: 0,
                outline: "none", WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation", flexShrink: 0,
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.svg
                    key="close"
                    width="20" height="20" viewBox="0 0 20 20" fill="none"
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.75 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <path d="M4 4L16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M16 4L4 16" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    width="22" height="14" viewBox="0 0 22 14" fill="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <rect x="0" y="0"    width="22" height="1.5" rx="0.75" fill="white"/>
                    <rect x="0" y="6.25" width="22" height="1.5" rx="0.75" fill="white"/>
                    <rect x="0" y="12.5" width="22" height="1.5" rx="0.75" fill="white"/>
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.header>

        {/* Mobile dropdown — separate panel below the pill, no shape morph */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              key="mobile-nav"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.97,
                transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
              }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              style={{
                position:             "absolute",
                top:                  "calc(100% + 8px)",
                left:                 0,
                right:                0,
                borderRadius:         20,
                background:           "rgba(10, 10, 10, 0.82)",
                backdropFilter:       "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border:               "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow:            "0 8px 32px rgba(0, 0, 0, 0.5)",
                overflow:             "hidden",
              }}
            >
              <div
                style={{
                  display:       "flex",
                  flexDirection: "column",
                  alignItems:    "center",
                  gap:           20,
                  padding:       "24px 28px 28px",
                }}
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { setMobileOpen(false); handleNavClick(link.href, e, router); }}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      y: -4,
                      transition: { duration: 0.12, ease: "easeIn", delay: (navLinks.length - i) * 0.02 },
                    }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.18, ease: "easeOut" }}
                    style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", textDecoration: "none" }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="https://tidycal.com/sagishrieber/strategy-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gradient-border"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: -4,
                    transition: { duration: 0.12, ease: "easeIn", delay: 0 },
                  }}
                  transition={{ delay: 0.04 + navLinks.length * 0.04, duration: 0.18, ease: "easeOut" }}
                  style={{
                    display:        "flex",
                    alignItems:     "center",
                    gap:            6,
                    borderRadius:   9999,
                    padding:        "11px 26px",
                    fontSize:       14,
                    fontWeight:     600,
                    color:          "#ffffff",
                    textDecoration: "none",
                    marginTop:      4,
                  }}
                >
                  Book a call
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

      </div>
    </div>

    <style jsx global>{`
      @media (max-width: 640px) {
        .header-outer {
          padding: 0 20px !important;
        }
      }
    `}</style>
    </>
  );
}
