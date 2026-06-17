# AGENTS.md — AdRific Website

Cross-tool instructions for any coding agent (Claude Code, Cursor, Aider, OpenAI Codex, Gemini CLI, Continue.dev, …). Status + architecture cheat-sheet live in [CLAUDE.md](./CLAUDE.md); design strategy in [PRODUCT.md](./PRODUCT.md); the dated changelog in [docs/HISTORY.md](./docs/HISTORY.md). **Read CLAUDE.md and PRODUCT.md before substantive work.**

## What this project is

The marketing website for **AdRific Oy**, a Helsinki digital agency (premium ad management + custom software development). A one-page **brand** surface aimed at Finnish SMBs and growth companies. The site is meant to *prove* AdRific's craft — bold, intricate, programming-native — not just describe it.

- Static site: vanilla **HTML + CSS + JS**, no build step, no framework, no package manager.
- **The site that ships lives in `public/`**: `public/index.html` · `public/styles/main.css` · `public/scripts/main.js` · `public/favicon.svg` · `public/_headers`. Cloudflare Pages publishes **only `public/`** (`directory: public`).
- **Everything outside `public/` is private** — project docs, `scripts/add-domain.js`, and `.github/` are version-controlled but never served. Don't put anything secret in `public/`.
- Host: Cloudflare Pages (project `adrific`); deploy on push to `main`.

## Workflow contract — read before touching code

1. **Plan first.** Write a brief plan in `PLAN.md` (root) before any non-trivial change. One active plan at a time; append a "Done" note when it ships.
2. **Pick the next task** from `TODO.md`, or the "Next" line in `CLAUDE.md`'s Current status.
3. **Design work goes through `PRODUCT.md` + the `/impeccable` skill.** Honor the register (brand), the five design principles, and the anti-references. The bar is "could not have been made by a template."
4. **Commit small + often.** Conventional Commits style.
5. **After shipping:** append the entry to `docs/HISTORY.md` (newest first), check off `TODO.md`, refresh the `CLAUDE.md` "Current status" snapshot, and add follow-ups to `ROADMAP.md`.

## Verification

There is **no build or test step.** Verify visually before claiming done:

- Open the page in a browser (`/impeccable` browser tools, or `npx serve public` / `cd public && python -m http.server`).
- Confirm it renders, is responsive across mobile/tablet/desktop, and the copy doesn't overflow at any breakpoint.
- Confirm keyboard operability and visible focus, and check contrast (WCAG 2.1 AA — see PRODUCT.md).
- Confirm motion has a `prefers-reduced-motion` fallback and that content is readable with JS disabled/slow (progressive enhancement).

## Conventions

- **Static, dependency-light, fast.** Don't add a framework or bundler by reflex; if a redesign needs one, decide deliberately and record why in `PLAN.md` / `CLAUDE.md`.
- **Custom properties for design tokens** in `public/styles/main.css` `:root`; the real token system is captured in `DESIGN.md`.
- **No design absolute-bans** (gradient text, side-stripe borders, decorative glassmorphism, identical card grids, hero-metric template, per-section uppercase eyebrows) — see the `/impeccable` skill. The current site violates several; the redesign fixes them.
- **Accessibility is not optional** even on a heavily art-directed surface (PRODUCT.md, WCAG 2.1 AA).

## Risky actions — confirm first

- **Pushing to `main`** triggers a live Cloudflare Pages deploy. Push only when asked or per a standing maintainer instruction.
- **Touching `.github/workflows/`, `scripts/add-domain.js`, or any secret/domain config** — explicit instruction only.
- **Adding files to `public/`** — remember everything there is served publicly at adrific.fi. Never put docs, notes, or secrets in `public/`.
- Deleting/renaming files you didn't create.
