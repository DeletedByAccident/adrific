# AdRific — Website

Marketing site for **AdRific Oy**, a Helsinki-based digital agency offering premium ad management and custom software development. One-page brand surface; the site itself is meant to be the proof of capability.

## Stack

- **Static site** — vanilla HTML + CSS + JS. No build step, no framework, no package manager.
- **The deployed site lives in `public/`** — only this folder ships to Cloudflare Pages:
  - `public/index.html` — markup
  - `public/styles/main.css` — styles
  - `public/scripts/main.js` — progressive-enhancement JS (theme, FI/EN, reveal-on-scroll, 3D hero canvas)
  - `public/favicon.svg`, `public/_headers` (security headers)
- **Everything outside `public/` stays private** — project docs (this file, CLAUDE.md, PRODUCT.md, etc.), `scripts/add-domain.js`, and the workflows are version-controlled but **not** served.
- **Fonts:** Google Fonts CDN
- **Host:** Cloudflare Pages (project `adrific`), deployed on push to `main`
- **Domains:** `adrific.fi`, `www.adrific.fi`

## Local dev

No tooling required. Open `public/index.html` directly, or serve the folder:

```bash
npx serve public        # or: cd public && python -m http.server 8000
```

## Deploy

Push to `main` → GitHub Actions (`.github/workflows/deploy.yml`) publishes **`public/`** (`directory: public`) to Cloudflare Pages. Custom domains are (re)configured by the manual **Configure Custom Domain** workflow (`configure-domain.yml`, `workflow_dispatch`), which runs `scripts/add-domain.js` (kept at the repo root, *outside* `public/`) and needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets.

## Working on this project

See [CLAUDE.md](./CLAUDE.md) for status, conventions, and gotchas; [AGENTS.md](./AGENTS.md) for the cross-tool dev contract. Design strategy lives in [PRODUCT.md](./PRODUCT.md). The `/impeccable` skill consumes PRODUCT.md (and DESIGN.md once it exists) for all design work.
