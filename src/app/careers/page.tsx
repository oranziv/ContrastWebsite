"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Small team. Real impact.",
    desc: "No layers of management. You'll work closely with founders, product leaders, and clients, helping shape decisions from strategy through execution.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Building with what's next",
    desc: "AI isn't a side project here. We actively help clients identify opportunities, validate ideas, and bring AI-powered experiences into their products.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 2C9.33 6 8 9 8 12C8 15 9.33 18 12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 2C14.67 6 16 9 16 12C16 15 14.67 18 12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Remote by design",
    desc: "Work from wherever you're most productive. We focus on outcomes, not hours online or time spent in meetings.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Craft matters",
    desc: "We care about details, systems, usability, and thoughtful execution. Good enough is rarely good enough.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Room to grow",
    desc: "Whether it's learning a new skill, leading a workshop, improving a process, or mentoring others, growth is part of the job.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Solve meaningful problems",
    desc: "We partner with companies building real products with real business challenges. Your work influences outcomes, not just screens.",
  },
];

const roles = [
  {
    title: "AI Driven Freelance Product Designer (UX UI)",
    type: "Freelance",
    location: "Remote",
    tags: ["AI Workflow", "Product Design", "Figma"],
    about:
      "We are looking for an AI-driven freelance product designer who combines strong product thinking, advanced AI fluency, and high craft execution. You will take ownership of significant product areas, partnering closely with product and engineering to shape direction, define experiences, and deliver measurable outcomes. This role sits at the intersection of strategy, data, UX craft, and modern AI-enabled workflows — designing product experiences while also leveraging AI within your own design process to accelerate exploration, validation, and delivery.",
    requirements: [
      "5–10 years of experience designing complex B2B and B2C digital products",
      "Hands-on experience using AI for research synthesis, advanced prototyping, or design generation in production environments",
      "Experience integrating Figma MCP to Cursor, Claude Code, or similar as part of an AI-driven workflow",
      "Strong product thinking with the ability to translate data into clear experience decisions",
      "Proven experience running and analyzing real user testing sessions",
      "Clear personal systems and frameworks that consistently produce high-quality outcomes",
      "Strong portfolio demonstrating AI-driven workflow, structured thinking, and polished UI",
      "High proficiency in Figma, including building scalable systems",
      "Excellent written and spoken English",
      "Ability to operate independently in a freelance engagement with senior-level ownership",
    ],
    duties: [
      "Design UX and UI for complex product areas from problem framing to final delivery",
      "Leverage AI tools for research synthesis, ideation, rapid prototyping, and UI generation where they create real leverage",
      "Translate ambiguous product requirements into clear user journeys, flows, and scalable systems",
      "Collaborate closely with product managers and engineers to align experience with business goals",
      "Apply, evolve, and maintain robust design systems",
      "Plan and conduct real user testing and iterate based on qualitative insights",
      "Tell compelling product stories through data, user behavior, and measurable outcomes",
      "Clearly articulate how AI influences both the product experience and the design workflow",
    ],
    whyThisRole:
      "Flexible freelance engagement with the potential for long-term collaboration, working with a team that treats AI as infrastructure, not decoration. You'll get direct exposure to complex, high-impact product challenges and collaborate with senior product and design leadership. To apply, send your CV and portfolio — applications must include clear examples of AI-driven workflows.",
  },
  {
    title: "Freelance Presentation Designer",
    type: "Freelance",
    location: "Remote",
    tags: ["PowerPoint", "Google Slides", "Figma"],
    about:
      "We are looking for a freelance Presentation Designer to support one of our major clients across high-stakes business communication and storytelling. This is not a general design role — we need someone who specializes in turning complex information into compelling, executive-ready presentations, pitch decks, and data narratives. The right person has a sharp eye for layout, hierarchy, and visual communication, and knows how to make dense information feel effortless to absorb. You will work directly with client stakeholders, translating strategy, data, and messaging into presentation assets that land with clarity and confidence. This role requires active use of AI tools as part of your daily workflow — not as a shortcut, but as a way to work smarter and deliver higher quality faster.",
    requirements: [
      "3+ years of focused experience in presentation design, with a portfolio demonstrating executive-level, high-stakes work",
      "Expert proficiency in PowerPoint and Google Slides, including master slide creation, animation, and complex layout design",
      "Strong proficiency in Figma for visual asset production and template creation",
      "Proven ability to simplify complex information and data into clear, digestible, and visually engaging narratives",
      "Mandatory hands-on experience using AI tools as a core part of your creative workflow — visual asset generation, copy refinement, research synthesis, and template creation",
      "Exceptional typography, grid, and visual hierarchy skills with obsessive attention to detail and polish",
      "Strong written and verbal English, with comfort presenting design decisions to senior stakeholders",
      "Ability to manage your own time, work independently in a remote setup, and handle feedback across multiple stakeholders",
      "Experience working within established brand systems and maintaining strict visual consistency at scale",
      "Data visualization skills — chart design, infographics, and making numbers look as good as the words around them — are a strong plus",
    ],
    duties: [
      "Design polished, executive-level presentations for internal leadership, board meetings, client-facing proposals, and marketing events",
      "Translate complex data, strategy documents, and briefing notes into clear, visually compelling slide narratives",
      "Create and maintain a consistent presentation slide library — templates, master layouts, and reusable components",
      "Collaborate directly with senior stakeholders to understand messaging goals, audience expectations, and communication tone",
      "Iterate rapidly on feedback, managing multiple versions and priorities under tight deadlines without losing quality",
      "Use AI tools actively to accelerate content synthesis, layout ideation, copy sharpening, and template creation",
      "Ensure all presentation work is fully on-brand, pixel-perfect, and ready for high-stakes delivery",
      "Support ad hoc presentation needs across sales, product, marketing, and executive communications",
    ],
    whyThisRole:
      "A flexible freelance engagement embedded within a major client organization, with the stability of ongoing work and direct access to senior stakeholders. You'll own presentation design end to end, working in a fast-moving environment where design quality is taken seriously. You'll collaborate closely with the Contrast UX team — with guidance and support from experienced senior designers — and gain exposure to diverse projects through our broader client portfolio. To apply, send your CV and a portfolio with clear examples of executive presentation work. Applications without a presentation design portfolio will not be considered.",
  },
];

// ─── Hero stats ───────────────────────────────────────────────────────────────

const heroStats: { value: number; suffix: string; label: string }[] = [
  { value: 20, suffix: "+", label: "people on the team" },
  { value: 187, suffix: "", label: "products shipped" },
  { value: 100, suffix: "%", label: "remote-first" },
];

function HeroStatCard({ stat, startDelay }: { stat: typeof heroStats[0]; startDelay: number }) {
  const [count, setCount] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let raf = 0;
    const t = setTimeout(() => {
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * stat.value));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [stat.value, startDelay]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        padding: "32px 28px",
        borderRadius: 16,
        border: `1px solid ${hovered ? "rgba(217,12,183,0.5)" : "rgba(56,56,56,0.62)"}`,
        background: hovered ? "rgba(217,12,183,0.04)" : "rgba(255,255,255,0.02)",
        transition: "border-color 0.3s ease, background 0.3s ease",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Bottom accent line */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0, height: 1,
        background: hovered
          ? "linear-gradient(to right, transparent, rgba(217,12,183,0.55), transparent)"
          : "linear-gradient(to right, transparent, rgba(56,56,56,0.5), transparent)",
        transition: "background 0.3s ease",
      }} />

      {/* Hover glow */}
      <div style={{
        position: "absolute",
        bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", height: "50%",
        background: "radial-gradient(ellipse at 50% 100%, rgba(217,12,183,0.1) 0%, transparent 70%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }} />

      {/* Number */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
        <span style={{
          fontSize: "clamp(44px, 4.5vw, 64px)",
          fontWeight: 700,
          fontFamily: "var(--font-urbanist), sans-serif",
          color: "#ffffff",
          lineHeight: 1,
          letterSpacing: "-0.03em",
        }}>
          {count}
        </span>
        <span style={{
          fontSize: "clamp(32px, 3.2vw, 46px)",
          fontWeight: 700,
          fontFamily: "var(--font-urbanist), sans-serif",
          color: "#ffffff",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          paddingBottom: 3,
        }}>
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p style={{
        margin: 0,
        fontSize: 13,
        color: "#888888",
        fontFamily: "var(--font-geist), sans-serif",
        letterSpacing: "0.3px",
        lineHeight: 1.4,
      }}>
        {stat.label}
      </p>
    </div>
  );
}

// ─── Shared label style ───────────────────────────────────────────────────────
const sectionLabel: React.CSSProperties = {
  margin: "0 0 12px",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.84px",
  textTransform: "uppercase",
  color: "#888888",
  fontFamily: "var(--font-urbanist), sans-serif",
};

// ─── Bullet list used across multiple sections ────────────────────────────────
function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item) => (
        <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, lineHeight: 1.6, color: "#b0b0b0", fontFamily: "var(--font-geist), sans-serif" }}>
          <span style={{ marginTop: 6, width: 5, height: 5, borderRadius: "50%", background: "#d90cb7", flexShrink: 0 }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ─── Compact benefit pill used inside expanded card ───────────────────────────
function BenefitPill({ title }: { title: string }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "6px 14px", borderRadius: 9999,
      border: "1px solid rgba(56,56,56,0.7)",
      background: "rgba(255,255,255,0.03)",
      fontSize: 13, color: "#b0b0b0",
      fontFamily: "var(--font-urbanist), sans-serif",
      whiteSpace: "nowrap",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#d90cb7", flexShrink: 0 }} />
      {title}
    </span>
  );
}

// ─── Role Card ────────────────────────────────────────────────────────────────

function RoleCard({ role, i }: { role: typeof roles[0]; i: number }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
      style={{
        borderRadius: 16,
        border: `1px solid ${hovered || open ? "#d90cb7" : "rgba(56,56,56,0.62)"}`,
        background: open ? "rgba(217,12,183,0.04)" : "rgba(255,255,255,0.02)",
        transition: "border-color 0.3s ease, background 0.3s ease",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Collapsed header ── */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 32px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
            {role.tags.map((tag) => (
              <span key={tag} style={{ fontSize: 11, fontWeight: 500, fontFamily: "var(--font-urbanist), sans-serif", letterSpacing: "0.7px", textTransform: "uppercase", color: "#888888", background: "rgba(255,255,255,0.05)", borderRadius: 4, padding: "3px 8px" }}>
                {tag}
              </span>
            ))}
          </div>
          <h3 style={{ margin: 0, fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 600, fontFamily: "var(--font-urbanist), sans-serif", color: "#ffffff", lineHeight: 1.2 }}>
            {role.title}
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, color: "#888888", fontFamily: "var(--font-geist), sans-serif" }}>{role.type}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#383838", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#888888", fontFamily: "var(--font-geist), sans-serif" }}>{role.location}</span>
          </div>
        </div>

        {/* Expand / collapse icon */}
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          style={{
            flexShrink: 0, width: 40, height: 40, borderRadius: "50%",
            border: `1px solid ${open ? "rgba(217,12,183,0.4)" : "rgba(56,56,56,0.8)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: open ? "#d90cb7" : "#ffffff",
            transition: "color 0.25s ease, border-color 0.25s ease",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>

      {/* ── Expanded body ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ borderTop: "1px solid rgba(56,56,56,0.4)", padding: "32px 32px 36px", display: "flex", flexDirection: "column", gap: 32 }}>

              {/* 0, About Contrast UX */}
              <div style={{ padding: "24px 28px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(56,56,56,0.5)" }}>
                <p style={sectionLabel}>About Contrast UX</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#b0b0b0", fontFamily: "var(--font-geist), sans-serif", maxWidth: 740 }}>
                    Contrast UX is a design agency focused on creating exceptional digital products that are clear, effective, and grounded in real user and business needs. We blend strong design fundamentals with strategic thinking to deliver experiences that resonate with users and drive measurable impact.
                  </p>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#b0b0b0", fontFamily: "var(--font-geist), sans-serif", maxWidth: 740 }}>
                    We partner with a wide range of clients, from ambitious startups to established enterprises, working closely with product and engineering teams to turn complex ideas into scalable, well-crafted products. Collaboration is central to how we work — we operate as true partners, not vendors, embedding ourselves in teams to deeply understand context, constraints, and goals.
                  </p>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#b0b0b0", fontFamily: "var(--font-geist), sans-serif", maxWidth: 740 }}>
                    We actively push our practice forward by integrating AI into both how we design and what we design. For us, innovation is not about novelty — it is about using the right tools to think more clearly, move faster, and create smarter, more human-centered digital experiences that exceed expectations.
                  </p>
                </div>
              </div>

              {/* 1, About the Job */}
              <div>
                <p style={sectionLabel}>About the Job</p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#b0b0b0", fontFamily: "var(--font-geist), sans-serif", maxWidth: 740 }}>
                  {role.about}
                </p>
              </div>

              {/* 2, Requirements */}
              <div>
                <p style={sectionLabel}>Requirements</p>
                <BulletList items={role.requirements} />
              </div>

              {/* 3, Duties & Opportunities */}
              <div>
                <p style={sectionLabel}>Duties &amp; Opportunities</p>
                <BulletList items={role.duties} />
              </div>

              {/* 4, Why this role */}
              <div>
                <p style={sectionLabel}>Why This Role</p>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "#b0b0b0", fontFamily: "var(--font-geist), sans-serif", maxWidth: 740 }}>
                  {role.whyThisRole}
                </p>
              </div>

              {/* 5, Benefits */}
              <div>
                <p style={sectionLabel}>Benefits</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {benefits.map((b) => <BenefitPill key={b.title} title={b.title} />)}
                </div>
              </div>

              {/* Apply CTA */}
              <a
                href="https://wkf.ms/4gE1ydY"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient-border"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 26px", borderRadius: 9999, fontSize: 14, fontWeight: 600, fontFamily: "var(--font-urbanist), sans-serif", color: "#ffffff", textDecoration: "none", width: "fit-content" }}
              >
                Apply for this role
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  // Scroll handling is set to "manual" globally (ScrollToTop), so client-side
  // navigations don't auto-scroll. Reset to the top before paint — same as the
  // work case pages — so arriving here never lands mid-page.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main style={{ background: "#0a0a0a", color: "#ffffff", minHeight: "100vh" }}>
      <Header />

      {/* ── Hero ── */}
      <section className="careers-hero-section" style={{ padding: "130px 40px 0", background: "#0a0a0a" }}>

        {/* Text content */}
        <div className="careers-hero-inner" style={{ maxWidth: 1360, margin: "0 auto", marginBottom: 72 }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            style={{ marginBottom: 36 }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 9999, border: "1px solid rgba(217,12,183,0.35)", background: "rgba(217,12,183,0.06)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#d90cb7", display: "block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.84px", textTransform: "uppercase", color: "#d90cb7", fontFamily: "var(--font-urbanist), sans-serif" }}>
                We&apos;re hiring
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ margin: "0 0 40px", fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 600, fontFamily: "var(--font-urbanist), sans-serif", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#ffffff" }}
          >
            Where great design meets real impact.
          </motion.h1>

          {/* Description + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 32 }}
          >
            <p style={{ margin: 0, maxWidth: 580, fontSize: "clamp(15px, 1.3vw, 18px)", lineHeight: 1.75, color: "#b0b0b0", fontFamily: "var(--font-geist), sans-serif" }}>
              We&apos;re nearly 20 designers, strategists, and engineers who believe craft and results aren&apos;t a trade-off. Every project raises the bar, and we&apos;re looking for people who want to help raise it.
            </p>
            <a
              href="#open-roles"
              className="btn-gradient-border"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 26px", borderRadius: 9999, color: "#ffffff", textDecoration: "none", fontFamily: "var(--font-urbanist), sans-serif", fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}
            >
              See open roles
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
          </motion.div>

          {/* Stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="careers-stats-row"
            style={{ display: "flex", gap: 16, marginTop: 56 }}
          >
            {heroStats.map((stat, i) => (
              <HeroStatCard key={stat.label} stat={stat} startDelay={600 + i * 150} />
            ))}
          </motion.div>
        </div>

      </section>

      {/* ── Divider ── */}
      <div style={{ padding: "0 40px", marginTop: 80 }}>
        <div style={{ maxWidth: 1360, margin: "0 auto", height: 1, background: "#383838" }} />
      </div>

      {/* ── Why Contrast ── */}
      <section style={{ padding: "120px 40px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ marginBottom: 64 }}
          >
            <p style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 500, letterSpacing: "0.84px", textTransform: "uppercase", color: "#888888", fontFamily: "var(--font-urbanist), sans-serif" }}>
              Why Contrast
            </p>
            <h2 style={{ margin: 0, fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 600, fontFamily: "var(--font-urbanist), sans-serif", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#ffffff" }}>
              A place where craft thrives.
            </h2>
          </motion.div>

          <div className="careers-benefits-grid">
            {benefits.map((b, i) => (
              <BenefitCard key={b.title} benefit={b} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="open-roles" style={{ padding: "0 40px 120px" }}>
        <div style={{ maxWidth: 1360, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ marginBottom: 48 }}
          >
            <p
              style={{
                margin: "0 0 16px",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "0.84px",
                textTransform: "uppercase",
                color: "#888888",
                fontFamily: "var(--font-urbanist), sans-serif",
              }}
            >
              Open positions
            </p>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(32px, 4.5vw, 64px)",
                fontWeight: 600,
                fontFamily: "var(--font-urbanist), sans-serif",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "#ffffff",
              }}
            >
              We&apos;re looking for great people.
            </h2>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {roles.map((role, i) => (
              <RoleCard key={role.title} role={role} i={i} />
            ))}
          </div>

          {/* General application */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            style={{
              marginTop: 32,
              padding: "40px 40px",
              borderRadius: 16,
              border: "1px solid rgba(56,56,56,0.62)",
              background: "rgba(255,255,255,0.015)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 8px",
                  fontSize: 18,
                  fontWeight: 600,
                  fontFamily: "var(--font-urbanist), sans-serif",
                  color: "#ffffff",
                }}
              >
                Don&apos;t see the right role?
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "#888888",
                  fontFamily: "var(--font-geist), sans-serif",
                }}
              >
                We&apos;re always interested in hearing from exceptional people. Send us your work and tell us who you are.
              </p>
            </div>
            <a
              href="https://wkf.ms/4gE1ydY"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 26px",
                borderRadius: 9999,
                border: "1px solid rgba(56,56,56,0.8)",
                background: "transparent",
                color: "#ffffff",
                textDecoration: "none",
                fontFamily: "var(--font-urbanist), sans-serif",
                fontWeight: 600,
                fontSize: 14,
                whiteSpace: "nowrap",
                transition: "border-color 0.25s ease, color 0.25s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#d90cb7";
                e.currentTarget.style.color = "#d90cb7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(56,56,56,0.8)";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              Send us your work
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }

        @media (max-width: 768px) {
          .careers-stats-row {
            flex-direction: column !important;
            gap: 12px !important;
          }
        }

        @media (max-width: 640px) {
          .careers-hero-section {
            padding-top: 100px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .careers-hero-inner {
            margin-bottom: 40px !important;
          }
        }

        .careers-benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          border: 1px solid rgba(56, 56, 56, 0.62);
          border-radius: 16px;
          overflow: hidden;
        }

        .careers-apply-btn {
          align-self: flex-start;
        }

        @media (max-width: 900px) {
          .careers-benefits-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 600px) {
          .careers-benefits-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

// ─── Benefit Card ─────────────────────────────────────────────────────────────

function BenefitCard({ benefit, i }: { benefit: typeof benefits[0]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "36px 32px",
        background: hovered ? "rgba(217,12,183,0.04)" : "transparent",
        transition: "background 0.3s ease",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        borderRight: "1px solid rgba(56,56,56,0.62)",
        borderBottom: "1px solid rgba(56,56,56,0.62)",
        marginRight: -1,
        marginBottom: -1,
      }}
    >
      <div
        style={{
          color: hovered ? "#d90cb7" : "#888888",
          transition: "color 0.3s ease",
        }}
      >
        {benefit.icon}
      </div>
      <h3
        style={{
          margin: 0,
          fontSize: 17,
          fontWeight: 600,
          fontFamily: "var(--font-urbanist), sans-serif",
          color: "#ffffff",
          lineHeight: 1.3,
        }}
      >
        {benefit.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.7,
          color: "#888888",
          fontFamily: "var(--font-geist), sans-serif",
        }}
      >
        {benefit.desc}
      </p>
    </motion.div>
  );
}
