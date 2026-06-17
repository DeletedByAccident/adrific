---
name: AdRific
description: A committed-green engineering-schematic brand surface — the site as a technical drawing
colors:
  paper: "oklch(0.985 0.006 155)"
  paper-2: "oklch(0.963 0.009 158)"
  paper-3: "oklch(0.940 0.012 158)"
  ink: "oklch(0.235 0.030 158)"
  ink-muted: "oklch(0.430 0.032 158)"
  green-900: "oklch(0.300 0.080 158)"
  green-700: "oklch(0.420 0.130 158)"
  green-500: "oklch(0.540 0.150 158)"
  green-300: "oklch(0.800 0.090 158)"
  green-wash: "oklch(0.952 0.022 158)"
  grid-line: "oklch(0.905 0.020 158)"
  signal: "oklch(0.605 0.205 28)"
  signal-deep: "oklch(0.515 0.190 28)"
  white: "oklch(1 0 0)"
typography:
  display:
    fontFamily: "Archivo, 'Archivo Fallback', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.6rem + 4.6vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.85rem, 1.3rem + 2.1vw, 2.9rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.05rem + 0.7vw, 1.5rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.62
  label:
    fontFamily: "Spline Sans Mono, ui-monospace, Consolas, monospace"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  sm: "2px"
  md: "3px"
  lg: "6px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "8": "3rem"
  "10": "4rem"
  "12": "6rem"
  "16": "9rem"
components:
  button-stamp:
    backgroundColor: "{colors.green-700}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0.85rem 1.5rem"
  button-stamp-hover:
    backgroundColor: "{colors.green-900}"
    textColor: "{colors.white}"
  button-ghost:
    textColor: "{colors.ink}"
    padding: "0.85rem 0.4rem"
  nav-cta:
    backgroundColor: "{colors.green-700}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0.5rem 1.05rem"
  plate:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "2rem"
  tag-live:
    backgroundColor: "{colors.green-700}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "0.15rem 0.5rem"
  tag-beta:
    backgroundColor: "{colors.paper-3}"
    textColor: "{colors.signal-deep}"
    rounded: "{rounded.sm}"
    padding: "0.15rem 0.5rem"
  rfp-stamp:
    textColor: "{colors.green-700}"
    rounded: "{rounded.lg}"
    padding: "1.5rem 3.25rem"
---

# Design System: AdRific

## 1. Overview

**Creative North Star: "The Drawing"**

AdRific builds things, and a building begins as a drawing. The whole site is rendered as one **engineering drawing sheet**: a drafting frame with corner ticks, margin rails carrying sheet number / coordinates / scale, dimension lines that measure the work, and a proper title-block footer. The brand is a studio of people who code, so the surface is *programming-native and exact* — intricate, annotated, measured, authored — never decorative-by-default. Every section is a "plate" on the sheet; the portfolio is literally a drawing index of shipped products.

The system commits hard to **one green**. Green is not a tint around the edges — it is the structural ink of the whole document: the grid, the linework, the rails, the section bands, the buttons, the title block, and the live generative hero are all drawn in it, so green carries 30–50% of any screen. A single **warm coral** is the "red pen" — the rare hot mark for the live pen-tip, the primary conversion stamp, and error/attention states. The ground is a crisp engineering-vellum off-white (a near-white tinted a whisper toward the brand's own green hue — never warm cream).

This system explicitly rejects (carried from PRODUCT.md): the **generic SaaS template** (dark-navy bodies, gradient text, gradient heroes, identical icon-heading-text card grids — the look this redesign replaced), the **cheap/discount agency** (clip-art clutter), **stuffy corporate** (stock photography, soulless), the **gimmicky startup** (emoji, pastels), and anything **traditional / normal / common**. If a visitor could mistake it for "a website," it has failed; the target reaction is "how was this made?"

**Key Characteristics:**
- One committed green ink; one coral signal accent; engineering-vellum ground. No second brand hue.
- The drawing metaphor is literal: drafting frame, margin rails, dimension lines, title-block footer, schematic plates.
- A live, code-drawn generative centerpiece (Canvas 2D) — the craft is the proof.
- Type is a technical grotesque (Archivo) + an earned drafting monospace (Spline Sans Mono) for all annotation.
- Borders and a faint graph grid carry structure; shadows are nearly absent (one "stamp" offset aside).
- WCAG 2.1 AA throughout; every motion has a reduced-motion path; the page is complete with no JS.

## 2. Colors

A restrained, committed-green palette on engineering vellum: one green ink ramp does the structural work, one warm coral is the rare signal, and the neutrals are tinted toward the brand's own green hue — never toward warm cream.

### Primary
- **Schematic Green** (`green-500`, `oklch(0.540 0.150 158)`): the structural ink — grid emphasis, linework, the drafting frame and rails, large chrome fills, the live hero lattice. The voice of the whole sheet.
- **Ink Green** (`green-700`, `oklch(0.420 0.130 158)`): green used wherever text or a text-bearing fill needs contrast — links, kickers, the primary buttons and the RFP stamp (with white text, ≥7:1), active borders, focus rings. Raw `green-500` is too light to carry small text; `green-700` is the text/line grade.
- **Deep Green** (`green-900`, `oklch(0.300 0.080 158)`): button/stamp hover and pressed states; the deepest green note.
- **Veil Green** (`green-300`, `oklch(0.800 0.090 158)`): hairline borders, light structural lines, the masthead underline.

### Secondary — the signal
- **Pen Coral** (`signal`, `oklch(0.605 0.205 28)`): the "red pen." The live hero pen-tip, the strongest single point of attention, error/attention states, and accents inside the schematic glyphs. **Pen Coral as text uses `signal-deep` (`oklch(0.515 0.190 28)`)** for contrast on the vellum.

### Neutral
- **Engineering Vellum** (`paper`, `oklch(0.985 0.006 155)`): the sheet ground. A near-white with a barely-perceptible green tint — the engineering-pad cast, never warm cream.
- **Sunken Vellum** (`paper-2` / `paper-3`, `oklch(0.963 0.009 158)` / `oklch(0.940 0.012 158)`): plate fills and recessed panels; sit fractionally below the ground.
- **Drawing Ink** (`ink`, `oklch(0.235 0.030 158)`): primary body text and heavy linework — a green-black, ~15:1 on vellum.
- **Annotation Ink** (`ink-muted`, `oklch(0.430 0.032 158)`): secondary text, ledes, and all dimension/annotation labels — still ≥7:1 on vellum, never a washed-out gray.
- **Graph Line** (`grid-line`, `oklch(0.905 0.020 158)`): the faint graph-paper grid on the body and inside the hero plate.
- **Wash Green** (`green-wash`, `oklch(0.952 0.022 158)`): tinted section bands (the studio band, the through-line callout).

### Named Rules
**The One-Green Rule.** There is exactly one brand hue (green, ~158°) and one signal (coral, ~28°). Never introduce a second brand color, a blue, or a gradient. Emphasis comes from green weight and the rare coral mark, not from new hues.

**The Fill-vs-Ink Rule.** `green-500` draws lines and large chrome; `green-700` is the text/line grade that carries small text and bears white text on a fill. Never set small text in `green-500`; never fill a text-bearing button with anything lighter than `green-700`.

**The Red-Pen Rule.** Coral is the pen pressing hardest — used on well under 10% of any screen (live pen-tip, the single hottest CTA, errors). If coral is ambient, it has lost its meaning.

**The No-Cream Rule.** The ground is tinted toward green at near-zero chroma. It is never warmed toward cream/sand/beige (the 2026 AI default). Warmth is not this brand; precision is.

## 3. Typography

**Display & Body Font:** Archivo (with `Archivo Fallback` → `system-ui`) — a technical grotesque carried in heavy weights for display and regular for body.
**Label / Annotation Font:** Spline Sans Mono (with `ui-monospace`, `Consolas`) — the drawing's lettering: every kicker, dimension label, coordinate, metadata row, and tag.

**Character:** One engineered sans does the talking; one true monospace does the *measuring*. The mono is not "developer costume" — on a technical drawing, annotations are literally monospaced lettering, so it is the native voice here. The pairing contrasts on the sans-vs-mono axis, never two similar sans.

### Hierarchy
- **Display** (Archivo 800, `clamp(2.6rem, 1.6rem + 4.6vw, 5.25rem)`, line-height 1.04, −0.035em): the hero and contact headlines only. One per view.
- **Headline** (Archivo 800, `clamp(1.85rem, 1.3rem + 2.1vw, 2.9rem)`, −0.025em): section titles ("The build log", "The studio").
- **Title** (Archivo 700, `clamp(1.2rem, 1.05rem + 0.7vw, 1.5rem)`, −0.02em): plate and capability names. The featured plate steps up one notch.
- **Body** (Archivo 400, `1.0625rem`/17px, line-height 1.62): all prose. Measure capped at ~60–68ch.
- **Lead** (Archivo 400, `clamp(1.06rem, 1rem + 0.5vw, 1.3rem)`, color Annotation Ink): section intros and the hero lede.
- **Label / Annotation** (Spline Sans Mono 500, `0.78rem`, letter-spacing 0.16em, UPPERCASE for kickers/tags; 0.04–0.12em elsewhere): kickers, section tags ("Sheet A — …"), dimension labels, coordinates, the title-block, plate metadata.

### Named Rules
**The Annotation Rule.** Anything that would be hand-lettered on a real drawing — labels, coordinates, dimensions, metadata, status tags, sheet numbers — is set in Spline Sans Mono, uppercase and tracked. Prose and headings are always Archivo. The two never swap roles.

**The Display Ceiling Rule.** The hero clamp tops out at 5.25rem and letter-spacing never tightens past −0.035em. The page is designed, not shouting.

## 4. Elevation

Borders and a faint graph grid carry structure; this is a **near-flat, drawn** system, not a shadowed one. Plates, panels, and the title block are defined by 1px green-veil borders and a fractionally-sunken vellum fill, not by floating. Depth is conveyed by tone (sunken `paper-2/3`) and by the engineering grid, exactly as ink on paper would. The single deliberate exception is the **printed-offset shadow** on the primary buttons and the RFP stamp — a hard, un-blurred offset that reads like a stamped impression, not a soft drop shadow.

### Shadow Vocabulary
- **Stamp offset** (`box-shadow: 3px 3px 0 0 var(--green-900)`): primary "stamp" buttons only. A hard offset in deep green; on hover it tightens to `2px 2px 0 0` as the button presses down `translate(1px, 1px)`. There is no blur.

### Named Rules
**The Drawn-Not-Floated Rule.** Separate two surfaces with a 1px border or a sunken vellum tone before you reach for a shadow. Soft, blurred drop shadows are forbidden; the only shadow in the system is the hard stamp offset, and only on the stamp/buttons. Decorative glassmorphism is forbidden.

## 5. Components

Every component is a piece of the drawing: bordered, annotated, exact. Interactive states are conveyed by green-weight shifts, extending dimension/tick details, and the focus ring — never by color-soup.

### Buttons
- **Shape:** squared, near-sharp corners (3px / `rounded.md`); engineered, not pill-soft.
- **Stamp (primary):** `green-700` fill, white label, the hard `3px 3px 0 0 green-900` stamp offset. Hover/focus deepens to `green-900` and presses (`translate(1px,1px)`, offset tightens to 2px).
- **Ghost (secondary):** transparent, ink label, near-zero horizontal padding; hover shifts the label to `green-700`. Often paired with a "↓" glyph.
- **Nav CTA:** a compact `green-700` pill with white label (specificity-guarded so it never falls back to ink-on-green); hover → `green-900`.
- **Focus:** a 2px `green-700` outline at 3px offset, uniform across all interactive elements.

### Tags (status)
- **Style:** tiny radius (2px), 0.15rem/0.5rem padding, mono caption, uppercase tracked.
- **Live:** `green-700` fill + white text (≥7:1).
- **Beta / Internal test:** `signal-deep` coral text on a faint coral-tinted vellum with a coral-tinted border — the "in-progress" mark.
- **Role:** status only (Live / Beta / Internal test). Never navigation.

### Cards / Containers — "Plates"
- **Corner Style:** 3px radius, 1px `green-300` border on a sunken `paper-2` fill.
- **Detail:** drawing **corner ticks** (small right-angle marks) fade in on hover/focus-within; the border firms to `green-500` and the fill lifts to vellum. No shadow.
- **Internal Padding:** `clamp(1.25rem, 2.5vw, 2rem)`.
- **Variants:** `plate--feature` (full-width, enlarged name + lede — the flagship), standard (2-up grid), and `plate--span` (full-width, standard size — a clean closer with no lonely odd cell). Each plate carries a hand-built schematic **glyph** (a small SVG diagram unique to the product), an index number, a status tag, and a mono metadata row.

### Navigation
- **Masthead:** sticky, a 1px `green-300` underline, faint vellum backdrop-blur. Brand mark (a drafting-triangle SVG) + links + a mono locator ("HEL · 60.22°N 24.93°E").
- **Links:** Archivo 600; a `green-700` underline wipes in left-to-right on hover/focus (`scaleX`).
- **Mobile:** a bordered hamburger toggles a full-width drop panel with hairline dividers; the CTA flattens to a green text link.

### Signature — the Drawing Sheet
- **Sheet frame + rails:** a fixed 1px `green-500` inset border with corner ticks, and two vertical mono **rails** (sheet no. / `ADRIFIC OY · HELSINKI` / scale / `60.22°N · 24.93°E` / revision). Decorative (`aria-hidden`); hidden below 1080px.
- **Live hero plate:** a Canvas 2D **generative isometric lattice** that draws itself in green ink (mouse-parallax, a traveling coral pen-tip, a "SPAN — 12U" dimension line), with a static SVG schematic fallback for no-JS / reduced-motion.
- **RFP stamp (contact):** a slightly rotated, double-stroked `green-700` rectangle — `REQUEST FOR PROPOSAL` / `Start a project` / `contact@adrific.fi` — that straightens and inverts to a green fill on hover, like a stamp pressed flat.
- **Title-block footer:** a real engineering title block — a bordered grid of mono cells (Project / Discipline / Scale / Sheet / Drawn by / Address / VAT / Contact / Date / Rev). The home for all company + legal detail.

## 6. Do's and Don'ts

### Do:
- **Do** keep to one green hue and one coral signal. Green is the structural ink (30–50% of the surface); coral is the rare red pen (well under 10%).
- **Do** set every annotation — labels, coordinates, dimensions, metadata, tags, sheet numbers — in Spline Sans Mono, uppercase and tracked. Prose and headings stay Archivo.
- **Do** define surfaces with 1px green borders and sunken vellum tone; reserve the single hard stamp-offset shadow for the buttons/stamp.
- **Do** verify body text ≥4.5:1 (it runs ≥7:1 here) and bear white text on `green-700`+ fills, coral text via `signal-deep`.
- **Do** ship every motion with a `prefers-reduced-motion` fallback, and keep the page complete and contactable with JS disabled (the static SVG schematic, the failsafe reveal).
- **Do** make new sections feel like plates on the sheet: bordered, annotated, measured, exact.

### Don't:
- **Don't** rebuild the **generic SaaS template**: no dark-navy body, no gradient text (`background-clip: text` is banned), no gradient heroes, no "hero metric" template, no identical icon-heading-text card grids. This is the look the redesign exists to replace.
- **Don't** warm the ground toward cream / sand / beige (the No-Cream Rule). The vellum is green-tinted at near-zero chroma; warmth is not this brand.
- **Don't** introduce a second brand hue, a blue, or any gradient. One green, one coral.
- **Don't** use soft/blurred drop shadows or decorative glassmorphism; the only shadow is the hard stamp offset.
- **Don't** use colored side-stripe borders (`border-left/right > 1px`) as accents; use full hairline borders, sunken tone, ticks, or the leading index number.
- **Don't** let coral go ambient, or set small text in `green-500`, or put dark text on a saturated green fill.
- **Don't** drift toward **cheap-agency** clutter, **stuffy-corporate** stock imagery, **gimmicky-startup** emoji/pastels, or anything that reads as a **traditional, common** business website. If it could be mistaken for "a website," it failed.
