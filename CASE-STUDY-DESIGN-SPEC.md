# Contrast — Case Study Page Design Specification
# Version 1.0 | 2026-03-30

This document is the authoritative visual specification for all case study pages on the Contrast website. Every value below maps directly to the existing tech stack: Next.js 16.2, React 19, TypeScript, Framer Motion v12, inline styles primary, `<style jsx global>` for media queries.

---

## 1. Design Token Reference

All values below reference the tokens defined in `globals.css`. Never deviate from these.

```
Background:    #0a0a0a
Foreground:    #ffffff
Accent pink:   #d90cb7
Accent purple: rgba(118,12,217,*)   — glow/gradient only, never flat fills
Border:        rgba(56,56,56,0.6)   — cards, image frames, dividers
Border strong: rgba(56,56,56,0.9)   — tag pills, tight UI borders
Gray 300:      #b0b0b0              — secondary text
Gray 400:      #888888              — tertiary, label text
Font heading:  var(--font-urbanist), sans-serif
Font body:     var(--font-geist), sans-serif
Max width:     1360px
Side padding:  48px (desktop) / 24px (mobile)
Section vpad:  100px (desktop) / 60px (mobile)
```

---

## 2. Typography Hierarchy

Use these exact values everywhere. No exceptions.

```
// Section eyebrow (above every h2)
fontFamily:    var(--font-urbanist)
fontSize:      12
fontWeight:    700
letterSpacing: "3px"
textTransform: "uppercase"
color:         "#d90cb7"
margin:        "0 0 20px"

// H1 — hero title (client name / project name)
fontFamily:    var(--font-urbanist)
fontSize:      clamp(48px, 6vw, 96px)
fontWeight:    800
letterSpacing: "-0.04em"
lineHeight:    0.95
color:         "#ffffff"
margin:        "0 0 28px"

// H2 — section titles
fontFamily:    var(--font-urbanist)
fontSize:      clamp(28px, 3.2vw, 48px)
fontWeight:    600
letterSpacing: "-0.02em"
lineHeight:    1.12
color:         "#ffffff"
margin:        "0 0 28px"

// H3 — card titles, highlight block titles
fontFamily:    var(--font-urbanist)
fontSize:      clamp(18px, 1.8vw, 24px)
fontWeight:    600
letterSpacing: "-0.01em"
lineHeight:    1.25
color:         "#ffffff"
margin:        "0 0 12px"

// H4 — deliverable grid titles
fontFamily:    var(--font-urbanist)
fontSize:      15
fontWeight:    600
letterSpacing: "-0.005em"
lineHeight:    1.3
color:         "#ffffff"
margin:        "0 0 8px"

// Body — primary paragraphs
fontFamily:    var(--font-geist)
fontSize:      16
fontWeight:    300
lineHeight:    1.75
color:         "rgba(255,255,255,0.65)"

// Body small — card descriptions, deliverable copy
fontFamily:    var(--font-geist)
fontSize:      14
fontWeight:    300
lineHeight:    1.75
color:         "rgba(255,255,255,0.55)"

// Stat number — results section (see §6)
fontFamily:    var(--font-urbanist)
fontSize:      clamp(48px, 5vw, 80px)
fontWeight:    800
letterSpacing: "-0.04em"
lineHeight:    1.0
color:         "#d90cb7"

// Stat label — below stat numbers
fontFamily:    var(--font-urbanist)
fontSize:      13
fontWeight:    500
letterSpacing: "0.5px"
color:         "rgba(255,255,255,0.45)"

// Tag pill text
fontFamily:    var(--font-urbanist)
fontSize:      12
fontWeight:    500
color:         "rgba(255,255,255,0.55)"
letterSpacing: "0.2px"

// Numbered marker (problem cards, deliverables)
fontFamily:    var(--font-urbanist)
fontSize:      11
fontWeight:    700
letterSpacing: "1.5px"
color:         "#d90cb7"
```

---

## 3. Hero Section

### Layout
Two-column flex row. Left column: back link + tags + H1 + subtitle. Right column: case image that bleeds off the right edge.

```tsx
// Section wrapper
{
  paddingTop: 140,   // clears fixed header (80px) + breathing room
  paddingBottom: 80,
  overflow: "hidden",
}

// Flex container — NO right padding (image bleeds)
{
  display: "flex",
  alignItems: "center",
  gap: 80,
  paddingLeft: "max(40px, calc((100vw - 1360px) / 2 + 48px))",
  // paddingRight: 0 — intentional, image bleeds
}
```

### Left column

```tsx
{
  flex: "0 0 auto",
  maxWidth: 560,
}
```

**Back link:** `← All Work` positioned above tags.
```tsx
{
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 13,
  fontWeight: 500,
  color: "rgba(255,255,255,0.45)",
  textDecoration: "none",
  fontFamily: "var(--font-urbanist), sans-serif",
  letterSpacing: "0.3px",
  marginBottom: 40,
  transition: "color 0.2s",
}
// hover: color "#ffffff"
// Icon: left-pointing chevron SVG 16x16, stroke currentColor
```

**Tag pills row:**
```tsx
// Row wrapper
{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }

// Individual tag pill
{
  fontSize: 12,
  fontWeight: 500,
  color: "rgba(255,255,255,0.55)",
  padding: "5px 14px",
  borderRadius: 100,
  border: "1px solid rgba(56,56,56,0.9)",
  fontFamily: "var(--font-urbanist), sans-serif",
  whiteSpace: "nowrap",
  letterSpacing: "0.2px",
}
```

**H1 — client name:** See typography §2 H1 spec. No gradient on the title itself — the glow lives behind it.

**Glow behind H1:** Absolutely positioned, pointer-events none, behind text (z-index -1 relative to text container).
```tsx
// Position this inside the left column div, absolutely
{
  position: "absolute",
  top: "50%",
  left: -40,
  transform: "translateY(-50%)",
  width: 500,
  height: 300,
  borderRadius: "50%",
  background: "radial-gradient(ellipse, rgba(217,12,183,0.18) 0%, rgba(118,12,217,0.10) 45%, transparent 70%)",
  filter: "blur(60px)",
  pointerEvents: "none",
  zIndex: 0,
}
// The left column needs position: "relative" and the text needs zIndex: 1
```

**Subtitle paragraph:** See typography §2 body. `color: "rgba(255,255,255,0.6)"`, `maxWidth: 480`.

### Right column — bleeding image

```tsx
// Right column flex child
{ flex: 1, minWidth: 0 }

// Image container
{
  width: "143%",
  borderRadius: "20px 0 0 20px",
  overflow: "hidden",
  border: "1px solid rgba(56,56,56,0.6)",
  borderRight: "none",
  position: "relative",
}

// Image tag
{
  width: "100%",
  height: 640,           // desktop
  objectFit: "cover",
  objectPosition: "top left",
  display: "block",
}
```

**Subtle image overlay:** A left-to-right gradient fade from the background color to transparent so the left edge of the image blends into the page. This prevents a hard seam where the image meets the left column gap.
```tsx
// Positioned over the image, left ~120px, fade to transparent
{
  position: "absolute",
  top: 0,
  left: 0,
  width: 120,
  height: "100%",
  background: "linear-gradient(to right, #0a0a0a 0%, transparent 100%)",
  pointerEvents: "none",
  zIndex: 1,
}
```

### Entrance animations
```tsx
// Left column
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}

// Right column (slides in from right)
initial={{ opacity: 0, x: 60 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 1.0, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
```

### Mobile (max-width: 860px)
```css
.case-hero-flex {
  flex-direction: column !important;
  gap: 40px !important;
  padding-left: 24px !important;
  padding-right: 24px !important;
}
.case-hero-left {
  max-width: 100% !important;
}
.case-hero-right > div {
  width: calc(100% + 24px) !important;  /* bleeds off right edge on mobile too */
  border-radius: 16px 0 0 16px !important;
  border-right: none !important;
}
.case-hero-right img {
  height: 300px !important;
  object-position: top center !important;
}
```

---

## 4. Section Transitions

Sections flow into each other via a consistent 1px horizontal rule (`Divider`) followed by a 64px top padding before section content begins. No full-bleed color changes between sections — the #0a0a0a background is continuous.

**Between-section ambient glow:** On the Core Problem and Results sections only, add a centered ellipse glow that sits at y:50% of the section, behind all content. It should span ~80% of viewport width and ~50% of section height. This signals a "premium moment" without breaking the dark continuity.

```tsx
// Ambient glow — Core Problem and Results sections only
{
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  height: "50%",
  maxWidth: 1100,
  background: "radial-gradient(ellipse, rgba(118,12,217,0.10) 0%, rgba(217,12,183,0.06) 45%, transparent 70%)",
  filter: "blur(80px)",
  pointerEvents: "none",
  zIndex: 0,
}
// Parent section needs: position: "relative", overflow: "hidden"
// All section content needs: position: "relative", zIndex: 1
```

**Divider component — no changes to current implementation:**
```tsx
function Divider() {
  return <div style={{ height: 1, background: "rgba(56,56,56,0.7)" }} />;
}
```

---

## 5. Overview Section

Two-column grid: description left, metadata table right.

```tsx
// Section
{ padding: "100px 40px" }

// Inner grid
{
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 80,
  paddingTop: 64,
  alignItems: "start",
}

// Metadata grid (right column)
{
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 0,
  border: "1px solid rgba(56,56,56,0.7)",
  borderRadius: 16,
  overflow: "hidden",
}

// Individual metadata cell
{
  padding: "28px 28px",
  borderBottom: "1px solid rgba(56,56,56,0.7)",  // applied to i < 4
  borderRight: "1px solid rgba(56,56,56,0.7)",    // applied to i % 2 === 0
}

// Cell label
{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 8px", fontFamily: "var(--font-urbanist)" }

// Cell value
{ fontSize: 16, fontWeight: 600, color: "#ffffff", margin: 0, fontFamily: "var(--font-urbanist)" }
```

---

## 6. Results / Outcomes Section (NEW — highest priority)

This section does not exist in the current codebase. It must be added between the image gallery and the Core Problem section. It is the single most important credibility element on the page.

### Layout
A 3–4 column grid of stat cells, preceded by a short heading. Each cell shows one metric. Below the grid, an optional one-line outcome quote in italic.

```tsx
// Section wrapper
{
  padding: "100px 40px",
  position: "relative",
  overflow: "hidden",
}

// Ambient glow (see §4)
// ... same ellipse glow spec as Core Problem

// Inner container
{
  maxWidth: 1360,
  margin: "0 auto",
  position: "relative",
  zIndex: 1,
}

// Section header — above the stat grid
// Eyebrow: "Results"
// H2: e.g. "Numbers that justify the work"
// H2 maxWidth: 640

// Stat grid
{
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",  // 3 cols for 3 stats
  gap: 0,
  border: "1px solid rgba(56,56,56,0.6)",
  borderRadius: 20,
  overflow: "hidden",
  marginTop: 56,
}
```

### Individual stat cell

```tsx
// Stat cell
{
  padding: "52px 40px",
  borderRight: "1px solid rgba(56,56,56,0.6)",  // except last
  position: "relative",
  overflow: "hidden",
  // No background — the glow section background handles ambience
}

// Glow inside cell — bottom-left, specific to each cell (subtle variance)
{
  position: "absolute",
  bottom: -40,
  left: -20,
  width: 200,
  height: 200,
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(217,12,183,0.12) 0%, transparent 70%)",
  pointerEvents: "none",
}

// Number
{
  fontFamily: "var(--font-urbanist), sans-serif",
  fontSize: "clamp(48px, 5vw, 80px)",
  fontWeight: 800,
  letterSpacing: "-0.04em",
  lineHeight: 1.0,
  color: "#d90cb7",
  margin: "0 0 12px",
  display: "block",
}

// Label
{
  fontFamily: "var(--font-urbanist), sans-serif",
  fontSize: 13,
  fontWeight: 500,
  color: "rgba(255,255,255,0.45)",
  letterSpacing: "0.5px",
  lineHeight: 1.5,
}

// Optional sublabel (secondary context, e.g. "vs. previous design")
{
  fontFamily: "var(--font-geist), sans-serif",
  fontSize: 12,
  fontWeight: 300,
  color: "rgba(255,255,255,0.25)",
  marginTop: 4,
  lineHeight: 1.5,
}
```

### Entrance animation for stat numbers
Use a counter animation triggered by `useInView`. The number counts up from 0 to its target value over 1.8 seconds with an ease-out curve. Implement with `useRef` + `useInView` + `requestAnimationFrame` or a simple `useState`/`useEffect` driven by a spring.

```tsx
// Framer Motion variant for the stat cells — staggered
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.5 }}
transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
```

### Optional outcome quote — below stat grid
```tsx
// Quote container
{
  marginTop: 48,
  padding: "28px 40px",
  borderRadius: 14,
  border: "1px solid rgba(56,56,56,0.5)",
  background: "rgba(255,255,255,0.02)",
  display: "flex",
  alignItems: "center",
  gap: 20,
}

// Left accent bar
{
  width: 3,
  height: 48,
  borderRadius: 2,
  background: "linear-gradient(to bottom, #d90cb7, rgba(118,12,217,0.6))",
  flexShrink: 0,
}

// Quote text
{
  fontFamily: "var(--font-geist), sans-serif",
  fontSize: 15,
  fontStyle: "italic",
  fontWeight: 300,
  lineHeight: 1.6,
  color: "rgba(255,255,255,0.55)",
}
```

### Mobile (max-width: 860px)
```css
.results-grid {
  grid-template-columns: 1fr 1fr !important;
}
.results-grid > *:nth-child(even) {
  border-right: none !important;
}
.results-grid > *:nth-child(n+3) {
  border-top: 1px solid rgba(56,56,56,0.6) !important;
}
```

---

## 7. Process / Timeline Section (NEW)

Add this section after the Exploration section and before "What We Did". It visualises the engagement phases.

### Layout
Horizontal track with 3–5 phase nodes connected by a line. On mobile, the track becomes vertical.

```tsx
// Section — same padding as others
{ padding: "100px 40px" }

// Phase track container
{
  position: "relative",
  display: "flex",
  alignItems: "flex-start",
  gap: 0,
  marginTop: 64,
}

// Connecting line — absolutely positioned behind nodes
{
  position: "absolute",
  top: 20,             // vertically centred with the dot
  left: "calc(80px / 2)",   // offset to start at first dot center
  right: "calc(80px / 2)",  // offset to end at last dot center
  height: 1,
  background: "linear-gradient(to right, rgba(217,12,183,0.6) 0%, rgba(118,12,217,0.4) 50%, rgba(56,56,56,0.5) 100%)",
  zIndex: 0,
}
```

### Individual phase node

```tsx
// Phase wrapper
{
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 20,
  position: "relative",
  zIndex: 1,
}

// Dot — active phase uses accent, future phases use border color
// Active (current/completed):
{
  width: 40,
  height: 40,
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(217,12,183,0.3) 0%, rgba(118,12,217,0.15) 60%, transparent 100%)",
  border: "1px solid #d90cb7",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  boxShadow: "0 0 20px rgba(217,12,183,0.3)",
}

// Dot inner fill (completed phases only)
{
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: "#d90cb7",
}

// Inactive dot:
{
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "1px solid rgba(56,56,56,0.7)",
  background: "#0a0a0a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

// Phase label
{
  fontFamily: "var(--font-urbanist), sans-serif",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "#d90cb7",          // active
  // or "rgba(255,255,255,0.35)" for inactive
  textAlign: "center",
}

// Phase title
{
  fontFamily: "var(--font-urbanist), sans-serif",
  fontSize: 16,
  fontWeight: 600,
  color: "#ffffff",
  textAlign: "center",
  margin: "4px 0 8px",
}

// Phase description
{
  fontFamily: "var(--font-geist), sans-serif",
  fontSize: 13,
  fontWeight: 300,
  lineHeight: 1.65,
  color: "rgba(255,255,255,0.45)",
  textAlign: "center",
  maxWidth: 200,
}
```

### Entrance animation — nodes cascade left to right
```tsx
initial={{ opacity: 0, y: 16 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.4 }}
transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
```

### Mobile (max-width: 700px)
```css
.process-track {
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 0 !important;
}
.process-line {
  display: none !important;  /* hide horizontal line */
}
.process-node {
  flex-direction: row !important;
  align-items: flex-start !important;
  gap: 20px !important;
  padding-bottom: 40px !important;
}
.process-node-text {
  align-items: flex-start !important;
  text-align: left !important;
}
/* Vertical connector between mobile nodes */
.process-node:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 40px;
  left: 19px;
  width: 1px;
  height: calc(100% - 40px);
  background: linear-gradient(to bottom, rgba(217,12,183,0.4), rgba(56,56,56,0.3));
}
```

---

## 8. Problem Cards

Current cards use `MouseFollowCard` with a numbered label, title, and description. The improvements here focus on visual differentiation between cards and adding a more charged top-edge accent.

### Card shell — keep MouseFollowCard behavior, extend inner layout

The `MouseFollowCard` component remains unchanged. The inner content layout changes:

```tsx
// Inside MouseFollowCard children — new layout
<div style={{ position: "relative" }}>
  {/* Top accent bar — replaces bare number */}
  <div style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  }}>
    {/* Number badge */}
    <div style={{
      width: 32,
      height: 32,
      borderRadius: 8,
      background: "rgba(217,12,183,0.10)",
      border: "1px solid rgba(217,12,183,0.25)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: "var(--font-urbanist), sans-serif",
        fontSize: 12,
        fontWeight: 700,
        color: "#d90cb7",
        letterSpacing: "0.5px",
      }}>
        {item.number}
      </span>
    </div>
    {/* Short horizontal rule to the right of the badge */}
    <div style={{
      flex: 1,
      height: 1,
      background: "linear-gradient(to right, rgba(217,12,183,0.3), transparent)",
    }} />
  </div>

  {/* Title */}
  <h3 style={{
    fontFamily: "var(--font-urbanist), sans-serif",
    fontWeight: 600,
    fontSize: "clamp(18px, 1.8vw, 22px)",
    color: "#ffffff",
    margin: "0 0 14px",
    lineHeight: 1.25,
    letterSpacing: "-0.01em",
  }}>
    {item.title}
  </h3>

  {/* Description */}
  <p style={{
    fontFamily: "var(--font-geist), sans-serif",
    fontWeight: 300,
    fontSize: 14,
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.55)",
    margin: 0,
  }}>
    {item.desc}
  </p>
</div>
```

The MouseFollowCard `padding` prop: `"40px 36px"`.

---

## 9. Insight / Quote Cards (Exploration Section)

Current cards use `MouseFollowCard` with a `◎` bullet. Elevate the treatment.

```tsx
// Inside MouseFollowCard — padding: "22px 28px"
<div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
  {/* Left icon — more deliberate than ◎ */}
  <div style={{
    width: 20,
    height: 20,
    borderRadius: "50%",
    border: "1.5px solid rgba(217,12,183,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  }}>
    <div style={{
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "#d90cb7",
    }} />
  </div>

  {/* Text */}
  <p style={{
    fontFamily: "var(--font-geist), sans-serif",
    fontWeight: 300,
    fontSize: 14,
    lineHeight: 1.75,
    color: "rgba(255,255,255,0.70)",   // slightly brighter than body
    margin: 0,
  }}>
    {insight}
  </p>
</div>
```

**Key stat highlight within insight text:** If an insight contains a number (e.g. "78%"), wrap that token in:
```tsx
<span style={{
  color: "#ffffff",
  fontWeight: 500,
  fontFamily: "var(--font-urbanist), sans-serif",
}}>
  78%
</span>
```

---

## 10. Image Gallery

### Desktop — masonry-style 1.4:1 left + 2 stacked right

```tsx
// Grid container
{
  display: "grid",
  gridTemplateColumns: "1.4fr 1fr",
  gap: 16,
  paddingTop: 64,
}

// Left image — tall
{
  borderRadius: 16,
  overflow: "hidden",
  border: "1px solid rgba(56,56,56,0.6)",
}
// img: width 100%, height 480, objectFit cover

// Right column
{ display: "flex", flexDirection: "column", gap: 16 }

// Each right image cell
{
  borderRadius: 16,
  overflow: "hidden",
  border: "1px solid rgba(56,56,56,0.6)",
  flex: 1,
}
// img: width 100%, height 232, objectFit cover
```

**Image hover treatment:** On hover, the image scales to 1.03 and a very subtle pink vignette appears over the image.
```tsx
// Scale: applied to img tag via onMouseEnter/Leave state
transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
transform: hovered ? "scale(1.03)" : "scale(1)"

// Vignette overlay — absolutely positioned inside image container
{
  position: "absolute",
  inset: 0,
  background: "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(217,12,183,0.06) 100%)",
  opacity: hovered ? 1 : 0,
  transition: "opacity 0.4s ease",
  pointerEvents: "none",
  zIndex: 1,
}
```

### Mobile
```css
.case-img-grid { grid-template-columns: 1fr !important; }
.case-img-grid img { height: 260px !important; }
```

---

## 11. Highlight Rows

Current implementation: alternating `grid-template-columns: "1.3fr 1fr"` or `"1fr 1.3fr"` with a flat border card. These need stronger visual differentiation.

### Elevated card treatment

```tsx
// Row card — change background from flat rgba to a subtle gradient
{
  display: "grid",
  gridTemplateColumns: block.reverse ? "1fr 1.3fr" : "1.3fr 1fr",
  gap: 0,
  borderRadius: 20,
  border: "1px solid rgba(56,56,56,0.6)",
  overflow: "hidden",
  background: "rgba(255,255,255,0.018)",  // very slightly elevated
  minHeight: 400,
  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
}
// hover:
{
  borderColor: "rgba(56,56,56,0.9)",
  boxShadow: "0 0 60px rgba(217,12,183,0.06)",
}
```

### Text pane (the non-image half)

```tsx
{
  padding: "60px 56px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: 0,
}

// Number marker
{
  fontFamily: "var(--font-urbanist), sans-serif",
  fontSize: 11,
  fontWeight: 700,
  color: "#d90cb7",
  letterSpacing: "2px",
  textTransform: "uppercase",
  marginBottom: 20,
}

// Title — use H3 spec from §2
marginBottom: 16,

// Body — use body small spec from §2

// Bottom tag strip — NEW addition to each highlight row
// After the description, add a row of 1–2 small feature tags:
{
  marginTop: 28,
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
}
// Each feature tag:
{
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  padding: "4px 10px",
  borderRadius: 4,
  border: "1px solid rgba(56,56,56,0.8)",
  fontFamily: "var(--font-urbanist), sans-serif",
}
```

### Image pane

```tsx
// Image container
{
  overflow: "hidden",
  borderRight: block.reverse ? "none" : "1px solid rgba(56,56,56,0.6)",
  borderLeft: block.reverse ? "1px solid rgba(56,56,56,0.6)" : "none",
  position: "relative",   // needed for overlay
}

// Image
{
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: block.imagePos,
  display: "block",
  transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
  transform: hovered ? "scale(1.04)" : "scale(1)",
}

// Gradient overlay — direction varies with side
// For image on LEFT (normal):
background: "linear-gradient(to left, rgba(10,10,10,0.2) 0%, transparent 40%)"
// For image on RIGHT (reversed):
background: "linear-gradient(to right, rgba(10,10,10,0.2) 0%, transparent 40%)"
// Plus subtle vignette at top:
// additional layer: "linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, transparent 30%)"
// Combine with comma:
background: "linear-gradient(to left, rgba(10,10,10,0.2) 0%, transparent 40%), linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, transparent 30%)"
```

### Entrance animation — highlight rows
```tsx
// Each row triggers independently on scroll
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.15 }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
```

### Mobile
```css
.case-block-row { grid-template-columns: 1fr !important; }
.case-block-row-img { min-height: 260px !important; }
.case-block-row-text {
  padding: 36px 28px !important;
  border-left: none !important;
  border-right: none !important;
  border-top: 1px solid rgba(56,56,56,0.6) !important;
}
```

---

## 12. Deliverables Grid ("What We Did")

Current: `1fr 2fr` outer, `1fr 1fr` deliverable grid with flat borders. Improvement: tighten the inner cells.

```tsx
// Outer grid
{ gridTemplateColumns: "1fr 2fr", gap: 80 }

// Deliverable grid
{
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 0,
  border: "1px solid rgba(56,56,56,0.7)",
  borderRadius: 16,
  overflow: "hidden",
}

// Individual deliverable cell
{
  padding: "36px 32px",
  borderBottom: i < 4 ? "1px solid rgba(56,56,56,0.7)" : "none",
  borderRight: i % 2 === 0 ? "1px solid rgba(56,56,56,0.7)" : "none",
  transition: "background 0.3s ease",
  // hover: background: "rgba(217,12,183,0.03)"
}

// Number marker — see §2 typography
// Title — H4 spec
// Description — body small spec
```

---

## 13. Micro-Interactions

### Global rules
- All hover transitions: `transition: "all 0.25s ease"` minimum. Prefer property-specific transitions.
- Never animate layout properties (width, height, padding) on hover — only opacity, transform, color, box-shadow, border-color.
- Use `will-change: "transform"` only on elements that animate on every frame (MouseFollowCard spotlight). Remove it from static elements.

### Back link (hero)
```
color: rgba(255,255,255,0.45) → #ffffff
transition: color 0.2s ease
```

### Tag pills (hero)
No hover state — purely decorative.

### Section dividers
No interaction.

### Metadata cells (Overview)
```
background: transparent → rgba(255,255,255,0.02)
transition: background 0.2s ease
```

### Stat cells (Results)
```
background: transparent → rgba(217,12,183,0.03)
transition: background 0.3s ease
```
Stat number holds still — no transform on hover.

### Problem cards / Insight cards
`MouseFollowCard` handles all hover behavior — no additional states needed.

### Image gallery cells
```
img transform: scale(1) → scale(1.03)
transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)
vignette: opacity 0 → 1
transition: opacity 0.4s ease
```
The cell border does not change on hover.

### Highlight rows
```
border-color: rgba(56,56,56,0.6) → rgba(56,56,56,0.9)
box-shadow: none → 0 0 60px rgba(217,12,183,0.06)
transition: border-color 0.3s ease, box-shadow 0.3s ease
```
Image inside: `scale(1) → scale(1.04)` with `transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)`.

### Deliverable cells
```
background: transparent → rgba(217,12,183,0.03)
transition: background 0.3s ease
```

### More Case Studies cards
Existing `MouseFollowCard` behavior is correct. Keep as-is.

### "View All Work" button
Existing `btn-gradient-border` class. Keep as-is.

---

## 14. Scroll Entrance Animations

### Standard preset (all sections except hero)
```tsx
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});
```

### Stagger delays by section type

```
Eyebrow:              delay 0
H2:                   delay 0.05
Body paragraphs:      delay 0.10
First card/cell:      delay 0
Second card/cell:     delay 0.10
Third card/cell:      delay 0.18
Fourth card/cell:     delay 0.24
Stat cells:           delay i * 0.12
Process nodes:        delay i * 0.15
Highlight rows:       delay 0 (each row triggers its own viewport)
```

### Hero — page load (not scroll-triggered)
```tsx
// Left column
animate: { opacity: 1, y: 0 }
initial: { opacity: 0, y: 30 }
transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }

// Right column
animate: { opacity: 1, x: 0 }
initial: { opacity: 0, x: 60 }
transition: { duration: 1.0, delay: 0.25, ease: [0.22, 1, 0.36, 1] }

// Glow behind title (fades in softly)
animate: { opacity: 1 }
initial: { opacity: 0 }
transition: { duration: 1.4, delay: 0.4, ease: "easeOut" }
```

---

## 15. Image Treatment Summary

| Context | Border-radius | Border | Aspect / Height | Hover |
|---|---|---|---|---|
| Hero bleed image | 20px 0 0 20px | 1px solid border | h:640 desktop / h:300 mobile | none |
| Gallery large | 16px | 1px solid border | h:480 | scale 1.03 |
| Gallery small (x2) | 16px | 1px solid border | h:232 each | scale 1.03 |
| Highlight row | 0 (inside card) | internal divider only | 100% height of row | scale 1.04 |
| More Case Studies | 10px inner | none (card border handles) | h:180 | scale 1.03 |

All images: `objectFit: "cover"`, `display: "block"`. `objectPosition` varies per image — set per-use to show the most meaningful part of the screenshot.

---

## 16. Spacing Cheat Sheet

```
Page top padding (below header):  140px
Section vertical padding:          100px (desktop) / 60px (mobile)
Post-divider top space:            64px
H2 bottom margin:                  28px
Body paragraph bottom margin:      20px (between paragraphs) / 0 (last)
Grid gap — major sections:         80px
Grid gap — card grids:             16px
Grid gap — metadata/deliverables:  0 (border-divided)
Card padding — problem cards:      40px 36px
Card padding — insight cards:      22px 28px
Deliverable cell padding:          36px 32px
Highlight text pane padding:       60px 56px (desktop) / 36px 28px (mobile)
Stat cell padding:                 52px 40px
```

---

## 17. Full Section Order (Canonical)

```
1. Header (fixed)
2. Hero
3. Overview
4. Image Gallery
5. Results / Outcomes  ← NEW
6. Core Problem
7. Exploration / Research
8. Process / Timeline  ← NEW
9. What We Did / Deliverables
10. Highlights
11. More Case Studies
12. CTA Banner
13. Footer
```

---

## 18. Component Checklist for Developers

Before marking a case study page complete, verify:

- [ ] Hero image bleeds off the right edge on desktop, clips cleanly on mobile
- [ ] Glow behind hero H1 is visible but not overpowering (opacity check on real display)
- [ ] All `Eyebrow` labels are `#d90cb7`, uppercase, 3px letter-spacing
- [ ] Divider appears before every section's content block
- [ ] Results stat numbers use `#d90cb7` and the counter animation fires once on viewport entry
- [ ] Problem card number badges use the pill-with-rule layout (not bare text)
- [ ] Insight cards use the double-ring bullet (not bare `◎`)
- [ ] Highlight rows have hover border-glow
- [ ] Highlight image panes have gradient overlays pointing inward
- [ ] Process timeline dots align with the connecting line at vertical center
- [ ] All `MouseFollowCard` instances have their spotlight and border gradient working
- [ ] All text contrast ratios meet WCAG AA (4.5:1 normal, 3:1 large) — verify `rgba(255,255,255,0.55)` on `#0a0a0a` meets 3:1 at minimum for body small text
- [ ] Mobile breakpoint (860px) tested: hero stacks, grids collapse, image heights reduce
- [ ] No layout shift on page load (image dimensions declared or containers have min-height)
- [ ] `viewport={{ once: true }}` on all `whileInView` — animations do not re-trigger on scroll up
