# Case Study Page — UX Architecture Specification
**ArchitectUX Agent | Contrast Website**
**Date:** 2026-03-30
**Scope:** All case study pages under `/work/[slug]/`
**Audience:** UI Designer + LuxuryDeveloper implementing each page

---

## 1. Audit of the Current Structure

### What Is Working

**Hero — strong asymmetric composition.** The two-column layout (text left, image bleeding 30% off-screen right) immediately signals editorial confidence. The back-link, tag pills, large client name H1, and subtitle give readers everything they need to orient without scrolling. The bleed technique adds visual tension and makes the hero feel premium rather than templated.

**Overview — correct placement and good density.** Putting context immediately after the hero respects the reader's need to understand the "who and what" before committing attention. The 2-col metadata grid (client, industry, year, etc.) is scannable and saves body text from listing administrative facts.

**Core Problem section — narrative clarity.** Naming a section "Core Problem" and presenting numbered cards is a strong editorial decision. It signals that Contrast understood the client's situation before designing. The radial gradient blob gives this section visual distinction, which is appropriate since it carries the heaviest argumentative weight.

**Exploration / Research section — peer-level positioning.** Showing research as a peer section to delivery demonstrates process rigor. The insight cards with the `◎` icon give factual statistics real visual weight without making the section feel like a data table.

**What We Did — comprehensive without being a feature list.** The 1fr/2fr split that keeps the headline anchored while the deliverables grid fills the right side is a good visual hierarchy decision. Six deliverables in a 2-col grid is near the cognitive limit — any more would need grouping.

**Highlights — most effective section.** Alternating image/text blocks slow the reader down deliberately, creating a gallery-like pace. Each block is a complete micro-argument: number + headline + explanation + image. This is the section that converts "interesting" into "impressive."

**More Case Studies — correct close.** Ending with next-project cards before the global CTA banner keeps the reader on-site and demonstrates portfolio breadth. The mouse-follow card effect rewards desktop users.

---

### What Is Missing or Weak

**No results section.** This is the single most damaging omission. A prospective client reading a case study is evaluating whether to spend significant money. They need quantitative or qualitative evidence that Contrast's work produced real outcomes. Without this, the page reads as a well-documented creative process — not proof of value. Every elite agency case study (Pentagram, Ueno, Fantasy, Instrument) prioritizes outcomes.

**No visual process or phase structure.** The current flow jumps from "Core Problem" to "Exploration" to "What We Did" without revealing how the work was structured. Prospects and design peers both want to understand Contrast's method. A brief phase/process indicator — even three to four labeled stages — shows structured thinking and differentiates from agencies that just ship pixels.

**No testimonial or client voice.** A single attributed quote from a client stakeholder placed near the results section carries disproportionate credibility. It converts a self-reported case study into a validated one. Currently the page is entirely Contrast's voice, which limits trust.

**No challenge/solution pairing in the hero or overview.** The hero subtitle is well written but reads as product description rather than tension and resolution. The most compelling case study openers frame the stakes: what was failing, and what changed. The JUSTT subtitle gets close but does not land the outcome.

**The image gallery section is structurally inert.** The large-left / two-stacked-right layout after Overview is visually competent but narratively empty. There is no eyebrow label, no heading, no caption or context. It reads as decoration between the overview and the problem — this breaks reading flow because the reader does not know what these images represent.

**Section rhythm is uneven.** The gap between the image gallery (no label, no anchor) and Core Problem creates a discontinuity. The sequence: Overview > (unlabeled images) > Core Problem should be: Overview > Problem > (visual evidence of the problem state) > Exploration > Solution. Visual evidence should follow the problem, not precede it.

**No scroll anchor navigation.** Long-form case studies benefit from a persistent mini-nav or progress indicator, particularly for studies with 7+ sections. Without it, desktop readers lose their position and mobile readers cannot jump to outcomes.

---

## 2. Ideal Section Flow — Premium Design Agency Case Study

The reading journey follows a persuasion arc, not a process diary. Every section answers a question the reader is implicitly asking.

```
Reader question          Section              Implicit answer
─────────────────────────────────────────────────────────────────────
"What is this?"          01 Hero              Client + domain + one-line framing
"Who and when?"          02 Overview          Context, scope, metadata
"What was broken?"       03 The Problem       Challenge with concrete evidence
"How did you diagnose?"  04 Research          What you learned, not just what you did
"What did you build?"    05 Solution          Deliverables with visual proof
"Show me the details"    06 Highlights        3–4 key decisions, image + rationale
"Did it actually work?"  07 Results           Outcomes, metrics, client quote
"What's next?"           08 More Work         Related case cards
```

This arc mirrors how a client evaluates a vendor: trust the problem diagnosis, trust the solution, trust the outcome. The current structure reaches section 6 (Highlights) without ever providing outcomes, which means it stops the arc two beats before it should close.

---

## 3. Section-by-Section UX Specifications

---

### Section 01 — Hero

**Purpose:** Orient the reader, establish project identity, create desire to continue scrolling.

**Content required:**
- Back navigation link ("All Work" with chevron left)
- 2–4 taxonomy tag pills (discipline, industry, output type)
- Client name as H1 (large, typographic weight)
- One-line subtitle: problem + outcome framing (not a product description)
- Hero image: the most visually impressive screen, component, or moment from the project

**Layout recommendation:**
- Two-column flex: text left (max-width 540px), image right
- Image bleeds 20–30% off-screen right with no right border — asymmetric crop signals editorial intent
- Left column anchors at center-vertical alignment
- On mobile: stack vertically, image at full width with 280px height crop

**UX principle served:** Orientation + desire. The reader must understand what this is within 3 seconds and want to know more. The bleed image does the visual work while the subtitle sets the argumentative stakes.

**Improvement from current:** Rewrite subtitle pattern to always follow the structure: "[What was wrong] — so we [what Contrast changed] to [what outcome resulted]." This turns the subtitle from a product description into a value proposition.

**Example subtitle structure:**
> "Merchants were losing money to chargebacks and couldn't understand why — so we rebuilt the dashboard around recovery clarity, reducing churn-driven by trust deficit."

---

### Section 02 — Overview

**Purpose:** Provide project context and scope for readers who evaluate fit before reading depth.

**Content required:**
- Eyebrow label: "Overview"
- H2: The core narrative restatement (what Contrast did and why it mattered)
- 2 body paragraphs: client background + Contrast's engagement scope
- Metadata grid: Client, Industry, Year, Duration, Our Role, Type (6 cells, 2-col grid)

**Layout recommendation:**
- Two-column grid: 1fr (text) / 1fr (metadata grid)
- Metadata grid uses bordered cell pattern with dividing lines (current implementation is correct)
- Full-width divider above section
- 64px padding top from divider to content

**UX principle served:** Context and credibility. The metadata grid serves scanners who need to quickly evaluate whether this project is comparable to their own. The body text serves readers who want depth.

**No changes required to current pattern** — this section is structurally sound.

---

### Section 03 — The Problem

**Purpose:** Demonstrate that Contrast diagnosed the real problem, not just the stated one. This is the credibility-building section.

**Content required:**
- Eyebrow: "The Problem" (or "Core Problem" — either works)
- H2: A declarative problem statement that could stand as a headline on its own
- 3 problem cards: each with number, short title, and 2–3 sentence explanation
- Optional: a brief framing line above the cards ("The brief asked for X. The real issue was Y.")

**Layout recommendation:**
- Full-width section with centered radial gradient ambient glow (purple-to-pink, current implementation)
- Problem statement H2 at full-width or 900px max before the cards
- 3 cards in 1fr/1fr/1fr grid with 16px gap
- On mobile: single column stack

**UX principle served:** Problem-awareness + trust. A prospect evaluating Contrast wants to know they will be understood, not just served. Three well-named problems show diagnostic intelligence.

**Improvement from current:** Add a one-sentence "framing line" above the problem cards that distinguishes what the client thought the problem was from what it actually was. This shows strategic thinking rather than order-taking.

---

### Section 04 — Visual Evidence (formerly the inert image gallery)

**Purpose:** Show the "before" state or evidence of the problem. Give the problem section visual proof.

**Content required:**
- Eyebrow: "Before" or "The Starting Point" or "Where We Began"
- Optional short caption per image (1 sentence, below each image or as overlay)
- 2–3 images: existing interface, competitive landscape, or research artefacts

**Layout recommendation:**
- Large image left (1.4fr) / 2 stacked images right (1fr) — current layout is correct
- Add eyebrow above the grid
- Add caption text below each image frame (12px, rgba(255,255,255,0.45))
- Border and rounded corners maintained as current

**UX principle served:** Evidence. The reader has been told there was a problem. Now they can see it. This creates the emotional setup for the solution sections to deliver contrast (in both senses).

**This resolves the current gap** where the image gallery has no narrative role. Labeling it "Where We Began" and adding image captions transforms decoration into argument.

---

### Section 05 — Research + Insights

**Purpose:** Show methodology and demonstrate that design decisions were grounded in evidence, not intuition.

**Content required:**
- Eyebrow: "Exploration" or "Research"
- H2: What you were trying to understand
- 2 body paragraphs: who you talked to, what methods you used, what you were looking for
- 3–5 insight cards: specific, attributed, surprising findings (quotes, statistics, or behavioral observations)

**Layout recommendation:**
- Two-column: 1fr (methodology text) / 1fr (insight cards, stacked vertically)
- Insight cards use MouseFollowCard with `◎` accent icon
- Each insight should read as a complete sentence — not a label
- On mobile: single column, methodology text first, insights below

**UX principle served:** Process credibility. Agencies that show research show they solve the right problem. Insights presented as concrete data points (78% said X, fewer than 30% knew Y) are more persuasive than vague statements.

**No structural changes required** — this section works well. Consider adding a short "What this changed about our approach" paragraph after the insights to close the research loop before transitioning to the solution.

---

### Section 06 — What We Built

**Purpose:** Enumerate the deliverables and show scope of work clearly.

**Content required:**
- Eyebrow: "What We Did" or "The Solution"
- H2: A synthesis statement (what the work achieved, not what was delivered)
- 4–6 deliverable cells: number, short name, 2–3 sentence description of what it does and why it matters

**Layout recommendation:**
- 1fr / 2fr split: headline anchored left, deliverable grid right
- Deliverable grid: 2-col with border cells and dividing lines (current pattern is correct)
- Max 6 cells — if more than 6, group into phases or combine minor items
- On mobile: single column for both headline and cells

**UX principle served:** Scope comprehension. The client needs to understand that they are receiving a complete system, not a collection of screens.

**Improvement from current:** The deliverable descriptions currently focus on what the component is (e.g., "Rebuilt the home dashboard around three primary questions"). Add one sentence to each that states the outcome or rationale: "This eliminated the most-cited reason merchants cited for disengaging with the product." This makes each deliverable entry forward-looking rather than retrospective.

---

### Section 07 — Highlights

**Purpose:** Slow the reader down and make them feel the quality of specific decisions. This is the portfolio-building section that design-literate audiences (other designers, design-conscious founders) value most.

**Content required:**
- Eyebrow: "Highlights"
- H2: Thematic summary headline (what thread connects these moments)
- 3–4 alternating image/text blocks
- Each block: number label, short decisive headline, 2–3 sentences explaining the specific decision and why it was made
- Image: the specific screen or component being discussed (not a generic screenshot)

**Layout recommendation:**
- Full-width stacked blocks, alternating 1.3fr image / 1fr text, then 1fr text / 1.3fr image
- Each block: rounded 20px border, border `rgba(56,56,56,0.6)`, min-height 380px
- Text column: 56px padding, centered vertically
- Number label in accent pink, H3 headline, body paragraph
- On mobile: image on top, text below, full-width single column

**UX principle served:** Decision-level storytelling. This is where Contrast demonstrates design intelligence rather than design output. Each block should answer "why did you make this choice" not just "what did you make."

**Improvement from current:** The current blocks are well written but image-agnostic (all three use the same `/work/justt.png` source). When real images are available, each block should use the specific view being discussed. The text captions should call out a specific design decision ("We chose a percentage ring rather than a bar chart because...") rather than describing the feature.

---

### Section 08 — Results (MISSING — MUST ADD)

**Purpose:** Prove that the work produced real outcomes. This is the most important missing section. It converts a process showcase into a value demonstration.

**Content required:**
- Eyebrow: "Results" or "Impact" or "Outcomes"
- H2: The transformation in one sentence ("From opacity to clarity — in five months")
- 3–4 outcome stats: metric + value + brief label. These can be quantitative (e.g., "32% reduction in churn-risk cohort") or qualitative ("NPS moved from negative to +34 in first 90 days")
- If no quantitative data is available: qualitative milestones ("Product shipped to all enterprise clients within 60 days of handoff") or client-reported outcomes ("Engineering reported 40% faster component implementation versus the previous design system")
- 1 client testimonial: attributed quote (name, title, company), placed directly below or adjacent to the stats

**Layout recommendation:**
- Full-width section with distinct background treatment: `rgba(255,255,255,0.02)` or a faint gradient blob (purple/pink) to mark it as the emotional high point
- Stats row: 3–4 cells in a horizontal strip, each cell containing a large number (clamp 48px–72px, fontWeight 700) + unit + label below
- Stats animate on scroll entry: count-up using `useInView` pattern already established in the codebase
- Testimonial: full-width or 800px centered quote in a bordered card, client photo (48px avatar), name and title below
- On mobile: stats stack 2-per-row, testimonial full-width

**UX principle served:** Outcome validation. Every other section builds toward this. A prospect asks "will this actually work for me?" — the results section is the only honest answer. Without it, the case study is incomplete regardless of how good the rest is.

**Implementation note for developer:** If a client has not provided metrics approval, use qualitative results framed precisely: delivery timeline, adoption speed, stakeholder outcomes, design system coverage metrics. Never fabricate numbers. Never omit this section — it should appear as "Outcomes" with qualitative statements if no hard metrics are available.

---

### Section 09 — More Case Studies

**Purpose:** Retain the reader, demonstrate portfolio breadth, provide a natural next action.

**Content required:**
- Eyebrow: "More Work"
- H2: "More Case Studies"
- View All Work link (top right, aligned to H2 baseline)
- 2 case cards: different disciplines from the current project if possible

**Layout recommendation:**
- 2-col grid, 16px gap (current implementation is correct)
- Card: image top (180px height), client label, title H3, discipline tags, arrow button
- Mouse-follow border gradient on hover (current MouseFollowCard pattern)
- On mobile: single column

**UX principle served:** Continuity. A reader who finishes a case study is at peak interest — surfacing related work immediately captures that attention before they leave.

**No structural changes required.** Consider making the card selection dynamic based on related discipline tags rather than hardcoded client names.

---

## 4. Complete Recommended Section Order

```
01  Hero                      [KEEP — refine subtitle pattern]
02  Overview                  [KEEP — no changes]
03  The Problem               [KEEP — add framing line above cards]
04  Visual Evidence           [RENAME + ADD eyebrow + captions to existing gallery]
05  Research + Insights       [KEEP — minor copy enhancement]
06  What We Built             [KEEP — add outcome sentence to each deliverable]
07  Highlights                [KEEP — improve image specificity]
08  Results / Impact          [ADD — highest priority missing section]
09  More Case Studies         [KEEP — no changes]
    CtaBanner (global)
    Footer (global)
```

---

## 5. Scroll and Reading Flow

### The Four Reader Modes

Case study readers arrive with different intent. The page must serve all four without compromising any.

**The Scanner (15 seconds):** Reads hero title, overview metadata, glances at highlight images, looks for a results number. Give them: large H1, metadata grid, stat numbers in the Results section with high visual contrast. If the stat numbers are not immediately visible, this reader leaves without engaging.

**The Evaluator (2–3 minutes):** Reads the problem section, skims deliverable titles in "What We Built," reads one highlight block, reads the client quote. Give them: a concise problem statement H2, clear deliverable headings, and a specifically attributed testimonial.

**The Peer (5+ minutes):** Reads every section including research insights, examines image details, reads highlight rationale paragraphs, evaluates design decisions. Give them: insight specificity with concrete statistics, highlight blocks that explain the "why" of each decision, and image quality that rewards zooming.

**The Skeptic:** Jumps directly to results, reads numbers, looks for a client name in the testimonial. Give them: visible Results section (Section 08), quantified stats over qualitative statements where possible, full attribution on the quote.

### Scroll Pacing Strategy

The section sequence is designed to accelerate and decelerate reading rhythm deliberately.

**Sections 01–02 (Hero + Overview):** Fast. Dense information, clear visual hierarchy. The reader moves quickly.

**Section 03 (Problem):** Slows. Large headline at full width forces the reader to pause. Three cards require attention. This is intentional — the reader needs to care about the problem before the solution lands.

**Section 04 (Visual Evidence):** Fast. Image-heavy, low text. Provides a visual breath after the problem section.

**Section 05 (Research):** Medium pace. Two columns of equal weight. The insight cards have short text, which creates natural paragraph breaks.

**Section 06 (What We Built):** Medium. Grid scanning mode — readers move through the deliverable cells quickly.

**Section 07 (Highlights):** Slowest. Each alternating block is designed to stop scrolling. The horizontal image crop, the numbered label, and the explanatory paragraph reward attention. Framer Motion `whileInView` entrance here should trigger at `amount: 0.3` rather than `0.2` to delay the reveal slightly and increase anticipation.

**Section 08 (Results):** Fast but impactful. Large numbers animate in on scroll entry. Reader hits this at peak invested interest. The count-up animation for stats provides a brief delay that builds micro-anticipation.

**Section 09 (More Work):** Recovery pace. Lower cognitive load. Mouse-follow interactions reward those who linger.

---

## 6. Specific Recommendations for Hero, Overview, and Results

### Hero — Three Improvements

**Improvement 1: Subtitle as value proposition, not description.**
Current pattern: describes what the product does.
Required pattern: names what was broken + what Contrast changed + what resulted.
```
Current: "Redesigning a fintech SaaS platform so that merchants can finally understand,
          track, and win their chargeback disputes — without needing a lawyer to read
          the dashboard."

Target:   "JUSTT's merchants were losing recoverable revenue because the dashboard
          couldn't tell them why — so we rebuilt around three questions merchants
          actually ask, reducing trust-driven churn within a single product cycle."
```

**Improvement 2: Hero image should be the most decisive screen.**
The current implementation uses a single source image. When real project assets are available, the hero image must be the single most impressive or most indicative screen — typically the redesigned home dashboard or the most visually distinct component. Cropping to `top left` for a dashboard is correct since the primary KPIs live top-left.

**Improvement 3: Add a brief outcome hook in small text below the subtitle.**
Between the subtitle and the bottom of the hero content, add a single line in 13px, color `rgba(255,255,255,0.35)`:
```
"5 months · Dashboard redesign shipped to all enterprise clients"
```
This gives the Scanner reader an immediate result signal in the hero without disrupting the subtitle's argumentative structure.

---

### Overview — One Improvement

**Add a challenge/opportunity line to the H2.**
The current H2 ("Bringing transparency to one of e-commerce's most opaque problems") is strong but passive. Consider making it active and forward-facing:
```
Current: "Bringing transparency to one of e-commerce's most opaque problems"
Target:  "How we turned chargeback opacity into a competitive advantage for JUSTT's merchants"
```
This small change makes Overview feel like a story premise rather than a section label.

---

### Results — Full Specification (New Section)

This section must be implemented for all existing and future case studies.

**Visual structure:**
```
[Full-width section]
  [Eyebrow] "Results"
  [H2] The transformation in one sentence
  [Stats strip] 3–4 horizontal cells, large animated number + label
  [Testimonial card] Quote text + avatar + attribution
```

**Stats strip implementation:**
- Each stat cell: number (clamp(48px, 5vw, 72px), fontWeight 700, color `#ffffff`), unit inline, label below (13px, `rgba(255,255,255,0.45)`)
- Count-up animation triggered by `useInView` with `once: true`
- Cells separated by `1px solid rgba(56,56,56,0.5)` vertical dividers
- No cards or borders on cells — the numbers are the visual element

**Testimonial card implementation:**
- Container: `border: 1px solid rgba(56,56,56,0.6)`, `borderRadius: 16px`, padding `40px 48px`
- Large quotation mark: `"`, accent pink `#d90cb7`, `fontSize: 80px`, `lineHeight: 0.8`, `fontFamily: var(--font-urbanist)`, positioned as decorative element top-left of card
- Quote text: `fontFamily: var(--font-geist)`, `fontWeight: 300`, `fontSize: 18px`, `lineHeight: 1.75`, `color: rgba(255,255,255,0.8)`
- Attribution row: 48px × 48px avatar (`borderRadius: 50%`, `objectFit: cover`), name (`fontSize: 14px`, `fontWeight: 600`, `color: #ffffff`), title + company (`fontSize: 13px`, `color: rgba(255,255,255,0.45)`)
- Mouse-follow spotlight background using existing `MouseFollowCard` pattern

**Section background:**
- Add a subtle radial gradient behind this section: `radial-gradient(ellipse at 50% 0%, rgba(217,12,183,0.08) 0%, transparent 60%)` — this differentiates the Results section visually as the emotional high point without being garish.

---

## 7. Implementation Priority Order

When implementing these changes, follow this sequence:

1. **Add Results section (Section 08)** — highest business impact, currently completely absent
2. **Relabel and add eyebrow to image gallery (Section 04)** — low effort, high narrative improvement
3. **Add framing line to Problem section cards** — one-sentence addition per case study
4. **Refine hero subtitle pattern** — requires copywriting input from PM or client
5. **Add outcome sentence to each deliverable in "What We Built"** — medium effort
6. **Refine Highlights image specificity** — requires real project assets per case study

---

## 8. Cross-Case Consistency Standards

These specifications apply to all pages under `/work/[slug]/`. The following patterns must remain consistent across JUSTT, DAZN, Down, Cymbio, Designrr:

- Section eyebrow typography: `fontSize: 12, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#d90cb7"`
- Divider: `height: 1, background: "rgba(56,56,56,0.7)"` — full width, top of each section
- Section padding: `100px 40px` desktop, `64px 24px` mobile
- Container: `maxWidth: 1360, margin: "0 auto"`
- Scroll animation: `fadeUp` preset with `once: true, amount: 0.2`, stagger on grids via delay
- H2 font size: `clamp(28px, 3vw, 42px)` for overview/body sections, `clamp(32px, 4.5vw, 60px)` for statement sections (Problem, Results)
- Back navigation link in hero: consistent arrow + "All Work" linking to `/#work`
- Mobile breakpoint: 860px for all 2-col grids → 1 col

---

*ArchitectUX Agent — Contrast Website*
*Handoff to: LuxuryDeveloper for implementation*
*Design validation: Review against Figma file `AJ7Z2TodIPobvEsQJgElwU` before shipping*
