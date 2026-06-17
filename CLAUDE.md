# CLAUDE.md — AdRific Website Development Instructions

> Conventions adapted from the VAREK/takuuVahti project (a **separate** project; its reference files were kept here under `md-examples/` during setup and have since been removed — backed up elsewhere). This is the **AdRific marketing website**.

## Project Instructions

### Project files
- **PRODUCT.md** — design-strategy context: register (**brand**), users (Finnish SMBs & growth cos), product purpose, brand personality (bold, intricate, code-native), anti-references, design principles, WCAG 2.1 AA target. **Read before any UI/design work.**
- **DESIGN.md** — the visual design system (Stitch format): OKLCH committed-green tokens, Archivo + Spline Sans Mono type, named rules (One-Green, Fill-vs-Ink, Red-Pen, No-Cream, Annotation, Drawn-Not-Floated), the "plate" + drawing-sheet component vocabulary. Captures "The Drawing" system shipped 2026-06-16. Sidecar at `.impeccable/design.json` (tonal ramps, shadow/motion/breakpoint tokens, drop-in component snippets for the live panel). `/impeccable` commands consume PRODUCT.md + DESIGN.md.
- **CLAUDE.md** (this file) — how to work, current status snapshot, architecture cheat-sheet, gotchas.
- **AGENTS.md** — cross-tool dev contract for any coding agent.
- **ROADMAP.md** — feature ideas and future work, prioritized by impact.
- **TODO.md** — current active tasks; update as you complete or discover them.
- **PLAN.md** — write a brief plan here before any non-trivial change (create it when needed).
- **docs/HISTORY.md** — dated shipped-changelog. **Append new shipped entries there, newest first.**

### How to work
When you finish a task, check `TODO.md` and pick the next highest-impact item. If `TODO.md` is empty or blocked, work through in order: (1) bugs, (2) feature/design work from `ROADMAP.md`, (3) accessibility, (4) performance, (5) code quality, (6) docs.

When you notice something worth building or fixing, add it to `ROADMAP.md` (or `TODO.md` if it's small) automatically — don't wait to be asked.

### Rules
- **Design work goes through PRODUCT.md and the `/impeccable` skill.** This is a brand surface; the bar is "could not have been made by a template." Match the design principles, honor the anti-references.
- Write a brief plan in `PLAN.md` before any non-trivial change.
- Prefer small, focused commits (Conventional Commits style) over large sweeping ones.
- This is a static site with **no build/test step** — verify by opening the page in a browser (the `/impeccable` browser tools, or `npx serve public`) and checking it renders, is responsive, and is keyboard-accessible before considering work done.
- Keep the site **dependency-light and fast.** No framework or bundler unless a redesign genuinely needs one (decide deliberately, not by reflex).
- **Push only when asked**, or per any standing instruction the maintainer gives. Pushing to `main` triggers a live Cloudflare Pages deploy.
- Never touch deploy workflows, domain config, or secrets without explicit instruction.
- **At the end of every shipped change:** append the entry to `docs/HISTORY.md` (newest first), check off `TODO.md`, refresh the "Current status" snapshot below, and add follow-ups to `ROADMAP.md`. Keep this file LEAN.

---

## Current status (snapshot, last updated 2026-06-17)

Single-page static marketing site, deployed to Cloudflare Pages (project `adrific`; domains `adrific.fi` / `www.adrific.fi`). Company details current (AdRific Oy, Postiljooninkatu 13 A 19, 00240 Helsinki, VAT FI28112047, contact@adrific.fi).

**Repo restructured 2026-06-17:** the deployed site now lives in **`public/`** (`deploy.yml directory: public`); everything else — project docs, `scripts/add-domain.js`, workflows — is version-controlled in the (private) repo but **not** served. The docs are no longer `.gitignore`d (they were, back when the whole root deployed); `md-examples/` was deleted (VAREK reference, backed up elsewhere). Only `.claude/` / `impeccable/` / `.impeccable/` / `.github/skills/` / logs stay ignored.

**Redesign LIVE on adrific.fi (deployed 2026-06-16): "The Drawing".** The generic dark-SaaS template is gone — replaced with a committed-green **engineering-schematic** brand surface (register: brand). Sections, as plates on one drawing sheet: drafting frame + margin rails → hero (a live Canvas 2D generative lattice that draws itself, static-SVG fallback) → **build log** (six real products, all linking out: VAREK · Parkkitori · RangeLogger · AdNeutralizer · Drawfetti _(beta)_ · Forest tracker _(internal test; codename Metsäni)_) → capabilities (software / ads / growth) → studio (north-arrow compass) → RFP-stamp contact → title-block footer. Type: **Archivo** + **Spline Sans Mono** (Outfit is gone). Verified in headless Chrome across 6 widths: no overflow, AA+ contrast everywhere, reduced-motion + no-JS fallbacks, no console errors. See `docs/HISTORY.md` for the full entry.

**DESIGN.md captured** (2026-06-16) from the shipped system, with the `.impeccable/design.json` sidecar.

**Shipped 2026-06-16 (LIVE on adrific.fi, commit `aeeb9ff`):** (1) **Dark mode "Carbon"** — masthead theme toggle, system-aware + persisted, `--on-accent` / `--stamp-offset` tokens, AA both themes; (2) **FI/EN switch** — EN authored + Finnish JS overlay, auto-detect + persist, masthead EN|FI control, `<html lang>` synced; (3) **Healthcare "Client work"** panel; (4) **Repositioned as a reference/portfolio site** — removed the "What we build for you" services pitch, moved the healthcare block into Work as "Client work", reframed the hero (See the work / Get in touch) + contact (Get in touch) + studio. Nav: Work / Studio / Contact; (5) **3D hero** — the lattice is now a perspective wireframe with auto-spin + drag-to-rotate (mouse) + depth shading + a roaming coral marker. (At the time, the `.gitignore` scoped the Pages publish to site files only; superseded 2026-06-17 by the `public/` restructure — see the status note above.)

**Next:** native proof of the Finnish copy (machine-authored — see TODO); a real public name for the forest app (codename Metsäni); optional product logos; SEO/OG image; refresh DESIGN.md + sidecar for the dark theme + 3D hero.

---

## Architecture cheat-sheet

- **No build.** The site lives in **`public/`** — edit `public/index.html` / `public/styles/main.css` / `public/scripts/main.js` directly; only `public/` ships (`directory: public`). `scripts/add-domain.js` stays at the repo **root** (outside `public/`) — it's a deploy helper, not a site asset.
- **CSS:** one stylesheet (`public/styles/main.css`). OKLCH design tokens in `:root` — committed-green system (`--paper`, `--ink`, `--ink-muted`, `--green-700/500/300`, `--green-wash`, `--grid-line`, `--signal` coral accent) plus the dark "Carbon" overrides under `:root[data-theme="dark"]` (`--on-accent` / `--stamp-offset` flip tokens), 4pt spacing scale, fluid `clamp()` type steps, semantic z-index scale. Full system in DESIGN.md.
- **JS:** vanilla (`public/scripts/main.js`), progressive enhancement only — the page reads and converts with JS off/slow. Sets an inline `html.js` class in `<head>` (no-flash); the live hero canvas only swaps in via `html.canvas-live` after it boots, so JS failure leaves the static SVG. Reveals have a load failsafe so nothing ships blank.
- **Fonts:** Archivo + Spline Sans Mono from Google Fonts CDN in `public/index.html` `<head>` (`display=swap`, metric-matched Archivo fallback). Self-hosting is a ROADMAP perf item.
- **CI/CD:** push to `main` → GitHub Actions `deploy.yml` → `cloudflare/pages-action` publishes **`public/`** to Pages project `adrific`. `configure-domain.yml` is a manual (`workflow_dispatch`) job that calls `scripts/add-domain.js` (repo root) to attach `adrific.fi` + `www.adrific.fi`.

### Key env/infra IDs
- Cloudflare Pages project: `adrific`
- GitHub Actions secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- Contact: contact@adrific.fi · Company: AdRific Oy, VAT FI28112047

---

## Gotchas

- **Only `public/` ships.** `deploy.yml` publishes `public/` (`directory: public`); anything you put there is served at adrific.fi. Keep docs, notes, and secrets **outside** `public/`. The flip side: a new site asset must go *into* `public/` or it won't deploy.
- **Gradient text + the generic-SaaS look are bugs, not style** here — PRODUCT.md names them as the primary anti-reference. Don't reintroduce them.
- **Cache-bust CSS/JS on every change.** Cloudflare Pages serves static assets with `Cache-Control: public, max-age=14400` and **`_headers` does NOT override it** (confirmed: forced-MISS origin still returns 14400 — a Pages limitation with the current `cloudflare/pages-action@v1`). So returning visitors can pair fresh HTML with 4h-stale CSS/JS. The fix in use: **versioned asset URLs** in `public/index.html` (`styles/main.css?v=N`, `scripts/main.js?v=N`) — **bump `N` whenever `main.css` or `main.js` changes** (currently `v=2`). `public/_headers` still works for non-cache headers (e.g. security headers).

---

## Design context

Register: **brand** (the design IS the product). Strategic principles from PRODUCT.md that guide all work here:

1. **The site is the portfolio** — show, don't tell; demonstrate craft instead of claiming it.
2. **Out of the box, on purpose** — target reaction is "how was this made?", not "which kit is this?"
3. **Bold, but earned** — impact from real engineering/computational craft, never gimmicks.
4. **Built by people who code** — programming-native, intricate, exact; authored, not assembled.
5. **Convince, then convert** — the path to "let's talk" is always one obvious action away.

Anti-references: generic SaaS template (the current look), cheap/discount agency, stuffy corporate, gimmicky startup, traditional/normal/common.
