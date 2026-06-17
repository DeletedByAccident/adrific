# TODO — AdRific Website

Short, actionable tasks. Pick the top P0/P1 item from the first non-empty section and go.
Larger scopes live in `ROADMAP.md`. **Shipped work lives in `docs/HISTORY.md` — do NOT keep done items here.**

Legend: `P0` = ship-blocking, `P1` = should do soon, `P2` = polish.

---

## Open work

- [ ] **P1 — Native proof of the Finnish copy.** The FI translation (full page incl. hero, build log, capabilities, the healthcare delivery, studio, contact, footer, meta) is polished-but-machine-authored. Have a native Finnish speaker proof it before relying on it publicly. Strings live in the `i18n()` module in `scripts/main.js`. A couple to eyeball first: the hero "Emme lupaile. Me toimitamme.", "Rakennusloki" (build log), the contact title "Rakennetaan teidän tuotteenne."
- [ ] **P1 — Real public name for the forest app.** Ships as "Forest asset tracker / Internal test" (codename **Metsäni** is dev-only). Swap in the real name once chosen. (ROADMAP §2)
- [ ] **P2 — Refresh DESIGN.md + `.impeccable/design.json`** for the dark "Carbon" theme + `--on-accent`/`--stamp-offset` tokens, the theme/lang controls, and the 3D perspective hero (currently document the light system + flat-iso hero only).
- [ ] **P2 — Optional product logos** for the plates (currently each uses a hand-built schematic glyph, which works well as-is). (ROADMAP §2)
- [ ] **P2 — SEO / social meta + OG image.** Add a real `og:image` (a rendered schematic crop), favicon PNG fallback, and Organization structured data. (ROADMAP §3)
- [ ] **P2 — Self-host the fonts.** Archivo + Spline Sans Mono load from Google CDN; self-host for performance + privacy. (ROADMAP §3)

## Decisions pending (maintainer)

- [ ] **Contact flow:** keep the `mailto:` RFP stamp, or add a real form (Cloudflare Pages Functions / form service)? (ROADMAP §2)
- [ ] **Case studies:** want real results/screenshots behind any portfolio plate (e.g. a VAREK detail), or keep the index lean? (ROADMAP §2)

---

**Last updated:** 2026-06-16 (LIVE on adrific.fi: redesign + dark mode "Carbon" + FI/EN switch + reference-site reposition + 3D hero, all deployed, commit `aeeb9ff`. See `docs/HISTORY.md`.)
