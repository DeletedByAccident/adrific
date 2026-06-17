# History — AdRific Website

Dated shipped-changelog, newest first. Append a short entry for every shipped change. Active tasks live in `TODO.md`; future work in `ROADMAP.md`.

---

## 2026-06-17 — Repo restructured: site → `public/`, docs now tracked in the private repo

The deployed site was moved into a **`public/`** folder so the project's working docs can be version-controlled without ever being served. Before this, Cloudflare Pages published the whole repo root (`directory: .`), so the only thing keeping PRODUCT.md / CLAUDE.md / DESIGN.md / etc. off the public web was `.gitignore` — which also meant they weren't backed up in git at all. Now:

- **`public/` is the only thing that ships.** Moved `index.html`, `styles/`, `scripts/main.js`, `favicon.svg`, `_headers` → `public/` (`git mv`, history preserved). `scripts/add-domain.js` stays at the repo **root** (it's the deploy helper run by `configure-domain.yml`, not a site asset). `deploy.yml` `directory: .` → `directory: public`.
- **Docs are now tracked.** `.gitignore` rewritten: the management/design docs (PRODUCT.md, DESIGN.md, CLAUDE.md, AGENTS.md, README.md, ROADMAP.md, TODO.md, PLAN.md, `docs/`) are version-controlled in the **private** repo. Still ignored: `.claude/` / `impeccable/` / `.impeccable/` / `.github/skills/` (regenerable tooling) and logs / `node_modules`.
- **`md-examples/` deleted** — VAREK's reference files (and the live-session animation source already folded into the shipped hero), backed up elsewhere per the maintainer; out of this repo for good.
- In-file asset refs are relative (`styles/main.css?v=2`, `scripts/main.js?v=2`, `favicon.svg`), so they resolve unchanged with `public/` as the publish root — no edits inside `index.html`. README / AGENTS / CLAUDE updated to the new layout; `.impeccable/live/config.json` retargeted to `public/index.html`.

## 2026-06-16/17 — Coordinate fix, cache-busting, security headers (commits `b259a86`, `9c3e6e8`, `72e6a97`)

- **Fixed fabricated coordinates** → real **60.22°N 24.93°E** (masthead locator, drawing-sheet rail, studio compass; DESIGN.md too).
- **Cache fix (the real bug behind "the 3D/dark didn't push"):** returning visitors were pairing fresh HTML with 4h-stale `main.css`/`main.js`. Root cause: Cloudflare Pages serves static assets `max-age=14400` and **`_headers` cannot override asset Cache-Control** (verified: forced-MISS origin still returned 14400, even with correct blank-line format). Fix in use: **versioned asset URLs** `?v=2` in `index.html` — bump `N` on every CSS/JS change (recorded in CLAUDE.md gotchas). Nothing was wrong with the deploy; it was browser cache.
- **`_headers` repurposed for security headers** (it *does* apply non-cache headers): `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: SAMEORIGIN`, `Permissions-Policy: camera=()/microphone=()/geolocation=()/browsing-topics=()`. Verified live.

## 2026-06-16 — Shipped to adrific.fi: dark mode + FI/EN + reposition + 3D hero (commit `aeeb9ff`)

Committed and deployed the session's work (only the three site files `index.html` / `styles/main.css` / `scripts/main.js` — `.gitignore` keeps docs/tooling/md-examples out of the `directory: .` publish). Also in this commit: the **hero animation upgraded to a 3D perspective wireframe** — continuous auto-spin + **drag-to-rotate with inertia** (mouse/pen; touch left free for scroll), depth shading (near edges bold, far edges fade), and a **coral marker that roams node-to-node** across the lattice with a fading trail (replacing the two-point bounce). Reduced-motion / no-JS fallbacks preserved; canvas re-resolves colors on theme flip.

Live-verified after deploy: new content present (See the work / Get in touch, lang-switch, theme-toggle, Client work), services pitch gone, **the live-mode `localhost:8400` inject is NOT served in production** (stripped before commit — resolves the automated security finding), and gitignored files (PRODUCT.md, md-examples, etc.) are not reachable (homepage fallback only).

## 2026-06-16 — Repositioned as a reference / portfolio site (local; pending deploy)

Per the maintainer: stop marketing product-creation/services; make it a **company reference site that displays the work**. Changes:
- **Removed the "What we build for you" services section** (Custom software / Ad management capabilities + the strategy through-line) — the whole services-for-hire pitch is gone.
- **Relocated the healthcare block into the Work section** as **"Client work · Healthcare"** (kept as portfolio proof, not a service offering).
- **Hero reframed** to lead into the work: subhead now *"A small studio in Helsinki. Below is what we've designed, built, and put in the world."*; CTAs are **See the work ↓** (→ work, primary) + **Get in touch** (→ contact, secondary).
- **Contact softened** from RFP / "Start a project" to **"Get in touch."** (kicker "Say hello"); **studio** pitch line ("…we know how to build yours") removed.
- Nav is now **Work / Studio / Contact**. PRODUCT.md purpose + principle 5 updated (reference, not lead-gen). EN meta + the Finnish overlay updated to match; dead services CSS removed.
- Verified EN/FI × light/dark: 4 sections, no horizontal overflow at 390, no console errors.

## 2026-06-16 — Dark mode, FI/EN switch, healthcare delivery (local; not yet deployed)

Three features added after the first deploy, verified locally in headless Chrome (not yet committed/pushed):

- **Dark mode — "Carbon".** Three dark palettes were prototyped (Deep Blueprint / Forest Drench / Carbon); the maintainer chose **Carbon** (true neutral near-black, green strictly as accent). Wired as `:root[data-theme="dark"]` (alias `dark-carbon`). New flip-able tokens `--on-accent` (text on green fills) + `--stamp-offset` (the hard stamp shadow) so buttons/tags/stamp stay legible in both themes. A masthead **theme toggle** (moon/sun) persists the choice (`localStorage adrific-theme`); the inline `<head>` script sets the theme pre-paint from saved choice or `prefers-color-scheme` (no flash); the hero canvas re-resolves its colors on theme change via a MutationObserver. **Both themes pass AA** (dark ≥6.58:1, light unchanged).
- **FI/EN language switch.** EN is authored in the HTML; **Finnish is a JS overlay** (capture EN from the DOM, swap to FI from a dictionary in `main.js`). Auto-detects Finnish browsers (overridable, persisted in `localStorage adrific-lang`); `<html lang>` set pre-paint. A masthead **EN|FI** segmented control swaps every visible string (nav, hero, sections, all 6 plates, capabilities, the delivery block, studio, contact, title-block, `<title>` + meta/OG). Product names, domains, and decorative drafting rails stay as-is. Verified: switch + persist + revert work, **zero overflow at 390 in Finnish** (both themes), no console errors. **⚠ Finnish copy is polished-but-machine-authored — needs a native proof before public reliance (see TODO).**
- **Healthcare delivery.** New "Selected delivery" panel in Services (B4): *"Remote care, built so we never hold a patient record."* — three remote-appointment platforms for a doctor going online, secure by design, audited third-party data handling, zero patient records on our servers, with a shield-check schematic glyph. AA both themes, no overflow.

Files: `index.html`, `styles/main.css`, `scripts/main.js`. (Live mode was used briefly to pick the dark direction, then closed; no inject remains.)

## 2026-06-16 — DESIGN.md captured (`/impeccable document`)

Generated **DESIGN.md** (Google Stitch format) from the shipped "The Drawing" system, plus the **`.impeccable/design.json`** sidecar. OKLCH committed-green tokens in the frontmatter (OKLCH-only doctrine), Archivo + Spline Sans Mono typography, and six named rules — One-Green, Fill-vs-Ink, Red-Pen, No-Cream, Annotation, Drawn-Not-Floated. Six-section body (Overview → Colors → Typography → Elevation → Components → Do's & Don'ts); the Don'ts carry every PRODUCT.md anti-reference by name. Sidecar adds tonal ramps, the single stamp-offset shadow, motion + breakpoint tokens, and seven drop-in component snippets (stamp button, ghost, nav CTA, section tag, status tags, plate, RFP stamp) for the live panel. Future on-brand work now reads PRODUCT.md + DESIGN.md.

## 2026-06-16 — Portfolio expanded to six products + facts verified

Build log grew from five to **six** products after the maintainer supplied real domains (plus a sixth product, AdNeutralizer). A research workflow fetched + adversarially verified all six live sites; copy is grounded in each page (with maker-confirmed additions). All six plates link out (varek.fi, parkkitori.fi, rangelogger.com, adneutralizer.com, drawfetti.com, woods.sivu.cc); statuses corrected (Drawfetti = Beta, forest app = Internal test); AdNeutralizer added with a notification-block glyph; forest app titled "Forest asset tracker" (codename Metsäni is dev-only). Layout: VAREK feature + 2×2 core + full-width forest-tracker closer. Re-verified: 6 plates, real links, no overflow at 390px, beta-tag contrast 5.46:1.

## 2026-06-16 — Homepage redesign: "The Drawing" (`/impeccable craft`)

Ground-up replacement of the generic dark-SaaS homepage with a committed-green **engineering-schematic** brand surface — the site presented as the technical drawing that precedes building. Register: brand.

- **Concept:** every section is a plate on one drawing sheet — drafting frame + margin rails (sheet no. / Helsinki coordinates / scale), dimension lines, a title-block footer housing the company details. Anti-reflex on two axes: not generic-SaaS (the old look) and not blueprint-blue / terminal-green.
- **Hero:** a live generative isometric lattice that draws itself in green ink on Canvas 2D (mouse parallax, a traveling coral "pen tip"), with a static SVG schematic fallback for no-JS / reduced-motion / crawlers.
- **The portfolio is the proof:** a new "build log" section showcases **six real products**, each a labeled schematic plate with a hand-built glyph, all linking out: VAREK (varek.fi, live), Parkkitori (parkkitori.fi, live), RangeLogger (rangelogger.com, live, iOS/Android), AdNeutralizer (adneutralizer.com, live — notification-spam blocker, Chrome/Android), Drawfetti (drawfetti.com, beta), and a Forest asset tracker (woods.sivu.cc, internal test — "Metsäni" is only a dev codename, per the maker). Composition: VAREK feature + 2×2 core + full-width forest-tracker closer.
- **Copy verified, not assumed:** a research workflow fetched all six live sites and adversarially verified each one-liner against the page. This caught real errors — AdNeutralizer blocks notification spam (it is not an ad-blocker), Drawfetti + the forest app are pre-public (waitlist / internal test), and RangeLogger's marketing site never mentions grip/stance coaching (the maker confirmed it is a real feature, so it was re-added on top of the verified shot-tracking / heat-maps / multiplayer copy).
- **Capabilities** (custom software + ad management + growth), a **studio** note with a drawn north-arrow/coordinate compass, and an **RFP "stamp"** CTA → contact@adrific.fi.
- **System:** OKLCH committed-green tokens; Archivo (display/body) + Spline Sans Mono (annotations); 4pt spacing; semantic z-scale; reveal-on-scroll with a load failsafe so content never ships blank; favicon added.
- **Verified in headless Chrome** at 390 / 768 / 834 / 1024 / 1280 / 1440: zero horizontal overflow, all text ≥4.5:1 (most ≥7:1), white-on-green CTAs 7.6:1, visible keyboard focus, reduced-motion + no-JS fallbacks, no console errors. Fixed a first-paint canvas-size race (1×1 upscale → solid block) with a ResizeObserver, and a nav-CTA contrast/specificity bug.
- Files: `index.html`, `styles/main.css`, `scripts/main.js`, `favicon.svg`. No new runtime dependencies (vanilla + Canvas 2D). Not yet committed/deployed.

**Pending:** capture DESIGN.md from the shipped system (`/impeccable document`); optional product logos; the forest app still needs a real public name (shipped as "Forest asset tracker", codename Metsäni).

## 2026-06-16 — Project management setup (`/impeccable init`)

Initialized the project's design + management scaffolding (conventions adapted from the VAREK reference in `md-examples/`):

- **PRODUCT.md** — register `brand`; users (Finnish SMBs & growth cos); purpose (agency site as proof of craft); brand personality (bold, intricate, code-native); anti-references (generic SaaS / cheap agency / stuffy corporate / gimmicky startup / traditional-common); five design principles; WCAG 2.1 AA.
- **`.impeccable/live/config.json`** — live-mode config targeting `index.html` (no CSP to patch).
- **CLAUDE.md, AGENTS.md, README.md, ROADMAP.md, TODO.md, docs/HISTORY.md** — management scaffolding.
- **DESIGN.md deferred** — the current visual design is the anti-reference, so DESIGN.md will be written from the *new* system after the redesign is shaped.

No changes to the live site this session. Next: shape + craft the homepage redesign.

## (before 2026-06-16) — pre-init baseline

Single-page static marketing site live on Cloudflare Pages (`adrific.fi` / `www.adrific.fi`). Header/nav, hero, three service cards, about, contact, footer. Recent commits: company info updated to AdRific Oy (address, VAT), Cloudflare Pages deploy + domain-config workflows added. Generic dark-SaaS visual design (the redesign target).
