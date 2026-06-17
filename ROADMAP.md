# ROADMAP — AdRific Website

Features and larger efforts. Each item has an effort (XS / S / M / L / XL) and impact (low / medium / high / critical). Items move to `TODO.md` when broken down enough to pick up; small polish (<2 hr) lives directly in `TODO.md`.

Themes are ordered by overall priority; items within a theme by priority. Start at the top.

---

## 1. The redesign (SHIPPED — now capture + extend)

The generic-SaaS anti-reference is gone. The homepage is now "The Drawing": a committed-green engineering-schematic surface with a live self-drawing generative hero and a real shipped-product "build log". Remaining work is capturing the system and building on it.

| Item | Effort | Impact | Description | Dependencies |
|---|---|---|---|---|
| ~~**Homepage redesign — shape + craft**~~ | L | critical | **SHIPPED 2026-06-16** ("The Drawing"). Ground-up rewrite of `index.html` / `styles/main.css` / `scripts/main.js`; live Canvas 2D generative hero + static SVG fallback; portfolio build log; committed-green OKLCH system; Archivo + Spline Sans Mono. Verified across 6 widths (no overflow, AA+ contrast, reduced-motion/no-JS, no console errors). See `docs/HISTORY.md`. | — |
| ~~**Signature hero / generative centerpiece**~~ | M | high | **SHIPPED** as part of the redesign — the self-drawing isometric lattice (Canvas 2D, mouse-parallax, coral pen tip) with a static SVG schematic fallback. | — |
| ~~**Custom typeface direction**~~ | S | medium | **DONE** — Outfit replaced by Archivo (display/body) + Spline Sans Mono (annotation). Self-hosting still pending (→ §3). | — |
| ~~**DESIGN.md — capture the new system**~~ | S | high | **SHIPPED 2026-06-16** (`/impeccable document`). DESIGN.md (OKLCH committed-green tokens, Archivo + Spline Sans Mono, six named rules, "plate"/drawing-sheet vocabulary) + `.impeccable/design.json` sidecar (tonal ramps, shadow/motion/breakpoint tokens, drop-in component snippets). | — |
| **Generative hero v2 (optional)** | M | low | Deepen the centerpiece if desired — richer parametric structures, a subtle "blueprint reveals" intro, or letting the lattice respond to scroll. Guard performance + reduced-motion. | DESIGN.md |

## 2. Content & conversion

| Item | Effort | Impact | Description | Dependencies |
|---|---|---|---|---|
| **Portfolio plates — confirm facts + optional logos** | XS | medium | The "build log" ships with **6** products, all linking out, copy verified against each live site. Remaining: confirm the Metsäni name + RangeLogger framing + the two Beta statuses (see TODO), and optionally add real product logos in place of the schematic glyphs. | Maintainer to confirm |
| **Case-study depth (optional)** | M | medium | The build log is an index; consider a deeper detail (results, screenshots, a dedicated plate or page) for a flagship like VAREK, if you want concrete proof beyond the one-liner. | Client-supplied case material |
| ~~**Sharper services framing**~~ | S | medium | **DONE** — the three generic cards are gone; services now read as a capabilities spec (custom software · ad management · growth through-line). | — |
| **Contact / conversion flow** | S | high | The CTA is currently a `mailto:` RFP stamp. Consider a real contact form (Cloudflare Pages Functions or a form service) or a booking link to lower friction from "convinced" to "in touch." | Form backend choice |
| ~~**Bilingual fi/en**~~ | M | — | **DONE (local, pending deploy)** — EN authored + Finnish JS overlay, masthead EN|FI switch, auto-detect + persist. ⚠ Finnish copy needs a native proof (TODO). | — |
| ~~**Dark mode**~~ | M | — | **DONE (local, pending deploy)** — "Carbon" dark theme, masthead toggle, system-aware + persisted, AA both themes. | — |
| **Selected delivery → more client proof** | S | medium | The healthcare "Selected delivery" block (B4) is live-local. Consider a second delivery proof or a deeper case if useful. | Client-supplied material |

## 3. Quality & operations

| Item | Effort | Impact | Description | Dependencies |
|---|---|---|---|---|
| **SEO & social meta** | S | medium | Open Graph / Twitter cards, favicon set, `og:image`, structured data (Organization), sitemap. Currently only a basic `<title>` + description. | — |
| **Performance pass** | S | medium | Self-host or `font-display`-tune fonts, preload critical assets, audit any redesign-added JS/WebGL weight, target strong Core Web Vitals. | Redesign shipped |
| **Accessibility audit (WCAG 2.1 AA)** | S | medium | Full pass once the redesign lands: contrast, keyboard, focus order, reduced-motion, alt text, semantic landmarks. | Redesign shipped |
| **Analytics** | XS | low | Privacy-respecting analytics (e.g. Cloudflare Web Analytics) to measure inquiries/conversion. | — |
