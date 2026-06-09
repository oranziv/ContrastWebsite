"use client";

import { useRouter } from "next/navigation";
import Logotype from "./Logotype";
import { handleNavClick } from "./Header";

// Arrow icon used in "Book a Call" button
function ArrowIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 8.5L8.5 1.5M8.5 1.5H2.5M8.5 1.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Social icons, Instagram, LinkedIn, YouTube, 30×27.273px, gap 8px
function SocialIcons() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* Instagram, 30×27.273px */}
      <a href="https://www.instagram.com/contrast_ux" aria-label="Instagram" target="_blank" rel="noopener noreferrer"
        style={{ display: "block", width: 30, height: 27.273, position: "relative", flexShrink: 0, opacity: 0.85, transition: "opacity 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
      >
        <img src="/social/instagram.svg" alt="Instagram" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </a>
      {/* LinkedIn, 30×27.273px */}
      <a href="https://www.linkedin.com/company/contrastux" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"
        style={{ display: "block", width: 30, height: 27.273, position: "relative", flexShrink: 0, opacity: 0.85, transition: "opacity 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
      >
        <img src="/social/linkedin.svg" alt="LinkedIn" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      </a>
      {/* YouTube, 30×27.273px */}
      <a href="https://www.youtube.com/@contrastux" aria-label="YouTube" target="_blank" rel="noopener noreferrer"
        style={{ display: "block", width: 30, height: 27.273, position: "relative", flexShrink: 0, opacity: 0.85, transition: "opacity 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
      >
        <img src="/social/youtube.svg" alt="YouTube"
          style={{ position: "absolute", width: 22, height: 22, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      </a>
    </div>
  );
}

export default function Footer() {
  const router = useRouter();
  return (
    <footer
      style={{
        background: "#0a0a0a",
        padding: "64px 40px 48px",
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {/* ── Top container: logo+social / nav+cta ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Row 1: Logo (left) + Social icons (right) */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Logo, CONTRAST. wordmark — client-side nav (consistent App Router
                history → no blank page on browser Back). */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/" onClick={(e) => handleNavClick("/", e, router)} aria-label="Contrast home" style={{ display: "block", textDecoration: "none" }}>
              <Logotype width={156} />
            </a>

            {/* Social icons */}
            <SocialIcons />
          </div>

          {/* Row 2: Nav links (left) + Book a Call button (right) */}
          <div className="footer-nav-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Nav */}
            <nav className="footer-nav" style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {[
                { label: "The Hero Framework", href: "/#framework" },
                { label: "Selected Work", href: "/#work" },
                { label: "Our services", href: "/#services" },
                { label: "Testimonials", href: "/#testimonials" },
                { label: "Careers", href: "/careers" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => handleNavClick(href, e, router)}
                  style={{
                    fontFamily: "var(--font-urbanist), sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: "0.28px",
                    color: "#ffffff",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "opacity 0.2s",
                    opacity: 0.8,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.8")}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* "Book a Call", white pill button */}
            <a
              href="https://tidycal.com/sagishrieber/strategy-call"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 26px",
                borderRadius: 52,
                background: "#ffffff",
                border: "1px solid rgba(10,10,10,0.01)",
                textDecoration: "none",
                fontFamily: "var(--font-urbanist), sans-serif",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.14px",
                color: "#000000",
                whiteSpace: "nowrap",
              }}
            >
              Book a Call
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "#383838" }} />

        {/* ── Legal row ── */}
        <div className="footer-legal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
              fontWeight: 500,
              fontSize: 15,
              lineHeight: 1.02,
              letterSpacing: "0.15px",
              textTransform: "uppercase",
              color: "#e8e8e8",
              width: 244,
            }}
          >
            © {new Date().getFullYear()} CONTRAST
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-urbanist), sans-serif",
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: "0.14px",
              color: "#ffffff",
              whiteSpace: "pre",
            }}
          >
            {`Terms of use  •  Privacy policy`}
          </p>
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          .footer-nav-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .footer-nav {
            flex-wrap: wrap !important;
            gap: 12px 20px !important;
          }
          .footer-legal {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .footer-legal p {
            width: auto !important;
          }
        }
      `}</style>
    </footer>
  );
}
