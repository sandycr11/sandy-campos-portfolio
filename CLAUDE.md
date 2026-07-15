# CLAUDE.md

Project memory for **sandy-campos-portfolio**. This file gives context to Claude Code.

## What this is

A VS Code–inspired developer portfolio landing page for **Sandy Campos** (Senior .NET / Full Stack Software Engineer — C#-first narrative: C#, ASP.NET Core, Entity Framework, and SQL Server lead; the JavaScript stack complements). It is a creative, extra professional landing page to send to recruiters — it is **NOT** a replacement for the traditional résumé, it complements it.

- **Live site:** https://sandycr11.github.io/sandy-campos-portfolio/
- **Repo:** https://github.com/sandycr11/sandy-campos-portfolio
- **Local path:** `C:\Users\sandy\Documents\Resume - Work\sandy-campos-portfolio`

## Tech stack

- Vue 3 (`<script setup>` SFCs)
- Vite 6
- Plain CSS with CSS variables (no CSS framework, no Tailwind)
- Fonts: JetBrains Mono (code) + Outfit (UI prose), via Google Fonts in `index.html`
- No backend, fully static, deployed to GitHub Pages

## Commands

```bash
npm install      # install deps
npm run dev      # dev server at http://localhost:5173 (base path is '/')
npm run build    # production build → ./dist (base path is '/sandy-campos-portfolio/')
npm run preview  # preview the production build
```

## Deployment

- Auto-deploys to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`
  (build job + deploy job using the official Pages actions).
- GitHub Pages Source is set to **"GitHub Actions"** in repo Settings → Pages.
- **Base path** lives in `vite.config.js` as `const REPO_BASE = '/sandy-campos-portfolio/'`.
  It only applies to production builds; dev runs at `/`. If the repo is ever renamed,
  update this single line.

## Architecture / where things live

Content is **data-driven** — edit data files, not components, for content changes:

| File | Controls |
|------|----------|
| `src/data/profile.js`    | Name, role, contact links, AND the full Tech Stack (`techStack` + `stackCategoryMeta`) |
| `src/data/experience.js` | Work history (`experience[]`) |
| `src/data/aiLeverage.js` | AI section copy (`aiLeverage`) AND the animated metric values (`aiMetrics`) |
| `src/data/projects.js`   | Project cards (`projects[]`) |

Theme tokens (colors, fonts, spacing, radius) → `src/styles/variables.css`.
Global atoms (buttons `.btn`/`.btn--primary`, syntax token classes `.tok-*`, animations,
`.section` scaffolding) → `src/styles/global.css`.

Components (`src/components/`):
- `AppShell.vue` — editor chrome: activity bar, collapsible sidebar (mobile), tab slot, status bar
- `Sidebar.vue` — profile block, EXPLORER file-tree nav, quick stack, links
- `EditorTabs.vue` — VS Code file tabs with scroll-spy active state
- `CodeBlock.vue` — code pane with auto-numbered gutter; counts slotted `.cl` lines
- `SectionCard.vue` — editor "panel" wrapper with a file header
- `SkillBadge.vue` — quoted-string style tech pill
- `MetricCard.vue` — animated metric bar (fills on scroll into view; `max` defaults to 4;
  optional `display` string overrides the default `<value>x` text)
- `ProjectCard.vue` — project panel
- `Icon.vue` — single inline-SVG icon component; add new icons as `<template v-else-if="name === '...'">`

`src/App.vue` — composes the whole page (6 sections), defines the `tabs` array, and runs two
IntersectionObservers: one for scroll-spy (active tab) and one for reveal-on-scroll
(`[data-reveal]` elements). The scroll container is `.shell__editor`.

## Sections (in order)

1. Profile / Hero  (tab `profile.ts`)
2. Tech Stack      (tab `stack.ts`)
3. Experience      (tab `experience.ts`)
4. AI Leverage     (tab `ai-leverage.ts`)  ← intentionally the visual showpiece
5. Projects        (tab `projects.ts`)
6. Contact         (tab `contact.ts`)

## Conventions & gotchas

- Code-styled lines inside `CodeBlock` must be wrapped in `<span class="cl">…</span>` (one per line);
  the gutter auto-counts them. Indent with `<span class="indent" />` / `.indent-2` (inline-block widths),
  NOT literal whitespace (Vue condenses template whitespace).
- Syntax colors come from `.tok-key`, `.tok-str`, `.tok-prop`, `.tok-fn`, `.tok-com`, `.tok-punct`, etc.
- Keep it **recruiter-readable and professional** — premium/clean/technical, not a joke terminal.
- Respect `prefers-reduced-motion` (already handled in `global.css`).
- The résumé buttons point to `RESUME_URL` in `App.vue` → `${BASE_URL}Sandy_Campos_Resume.pdf`
  (the real CV at `public/Sandy_Campos_Resume.pdf` — the single source of truth for all site content).
- Content rules from the résumé: NO PHP/Laravel mentions, NO GitHub profile links (repos are
  private; keep LinkedIn, email, phone). The only metrics allowed on the site: team of 5
  developers, API response times cut by up to 90%, manual tasks cut from up to 10 minutes
  to seconds (plus the biographical "14+ years"). Do not add other numbers.

## TODO / open items

- [ ] (optional) Add a custom domain / OG preview image.

## Style preferences

- JavaScript (not TypeScript) for implementation — the *displayed* content reads as TS objects,
  but the code is plain JS to keep build/config simple.
- Minimal dependencies; no paid libraries.
