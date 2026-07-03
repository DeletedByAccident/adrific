# TODO — AdRific Website

Short, actionable tasks. Pick the top P0/P1 item from the first non-empty section and go.
Larger scopes live in `ROADMAP.md`. **Shipped work lives in `docs/HISTORY.md` — do NOT keep done items here.**

Legend: `P0` = ship-blocking, `P1` = should do soon, `P2` = polish.

---

## Open work

- [ ] **P1 — Native proof of the Finnish copy.** The FI translation (full page incl. hero, work, healthcare delivery, studio, contact, meta) is machine-authored — rewritten 2026-07-02 with the organic-voice copy pass. Have a native Finnish speaker proof it before relying on it publicly. Strings live in the `i18n()` module in `public/scripts/main.js`. Eyeball first: hero "Tehty täällä. / Yhä käytössä.", work title "Mitä olemme tehneet", studio "pitävät meidät vireessä", contact "Vastaamme sähköposteihimme itse."
- [ ] **P1 — Real public name for the forest app.** Ships as "Forest asset tracker / Internal test" (codename **Metsäni** is dev-only). Swap in the real name once chosen. (ROADMAP §2)
- [ ] **P2 — Refresh DESIGN.md + `.impeccable/design.json`** for the dark "Carbon" theme + `--on-accent`/`--stamp-offset` tokens, the theme/lang controls, and the 3D perspective hero (currently document the light system + flat-iso hero only).
- [ ] **P2 — Optional product logos** for the plates (currently each uses a hand-built schematic glyph, which works well as-is). (ROADMAP §2)
- [ ] **P2 — SEO / social meta + OG image.** Add a real `og:image` (a rendered schematic crop), favicon PNG fallback, and Organization structured data. (ROADMAP §3)
- [ ] **P2 — Self-host the fonts.** Archivo + Spline Sans Mono load from Google CDN; self-host for performance + privacy. (ROADMAP §3)

## Decisions pending (maintainer)

- [ ] **Contact flow:** keep the `mailto:` RFP stamp, or add a real form (Cloudflare Pages Functions / form service)? (ROADMAP §2)
- [ ] **Case studies:** want real results/screenshots behind any portfolio plate (e.g. a VAREK detail), or keep the index lean? (ROADMAP §2)

---

**Last updated:** 2026-06-17 (Repo restructured: site now in `public/`, project docs tracked in the private repo, `md-examples/` deleted — commit `c4c84b9`, deploy verified live. Prior: LIVE redesign + dark "Carbon" + FI/EN + reposition + 3D hero, commit `aeeb9ff`. See `docs/HISTORY.md`.)
