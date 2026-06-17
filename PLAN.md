# PLAN

## Homepage redesign — "The Drawing"  ·  DONE 2026-06-16

**Goal:** replace the generic dark-SaaS homepage with a brand surface that proves AdRific's craft (PRODUCT.md register: brand). Confirmed direction via `/impeccable craft`: **blueprint/engineering schematic**, **committed green**, full-page production.

**Approach:** the site as one engineering drawing sheet — drafting frame + rails, dimension annotations, title-block footer. Live Canvas 2D generative lattice hero (static SVG + reduced-motion/no-JS fallbacks). The five shipped products (VAREK, Parkkitori, RangeLogger, Drawfetti, forest tracker) form a "build log" — the portfolio is the proof. Vanilla HTML/CSS/JS, no dependencies. Type: Archivo + Spline Sans Mono. OKLCH committed-green tokens.

**Done:** built `index.html` / `styles/main.css` / `scripts/main.js` / `favicon.svg`; verified in headless Chrome across 390–1440 (no overflow, AA+ contrast, reduced-motion + no-JS, no console errors); fixed a canvas first-paint size race + a nav-CTA contrast bug. Full entry in `docs/HISTORY.md`.

**Next plan (when picked up):** capture DESIGN.md (`/impeccable document`); see TODO.md / ROADMAP.md for follow-ups.
