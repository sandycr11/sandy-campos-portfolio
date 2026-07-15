# sandy-campos-portfolio

A VS Code–inspired developer portfolio landing page for **Sandy Campos**, Senior .NET / Full Stack Software Engineer. Built as a fast, fully static single page with Vue 3 + Vite — meant to live *alongside* a traditional résumé, not replace it.

- Dark, editor-style theme (activity bar, sidebar explorer, file tabs, status bar)
- Syntax-highlighted "source code" content blocks
- Recruiter-friendly, readable sections: Profile, Tech Stack, Experience, AI Leverage, Projects, Contact
- Responsive (collapsible sidebar on mobile), subtle scroll-reveal + animated metrics
- No backend, no paid dependencies

---

## Tech

Vue 3 (`<script setup>`) · Vite · plain CSS with CSS variables · JetBrains Mono + Outfit (Google Fonts).

---

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → ./dist
npm run preview  # preview the production build locally
```

---

## Editing content

All content lives in plain data files under `src/data/` — no component edits needed:

| File | Controls |
|------|----------|
| `src/data/profile.js`   | Name, role, contact links, and the Tech Stack |
| `src/data/experience.js`| Work history entries |
| `src/data/aiLeverage.js`| AI section copy **and** the animated metric values |
| `src/data/projects.js`  | Project cards |

Theme colors and fonts live in `src/styles/variables.css`.

### Résumé file

The **Download Résumé** buttons point to `/Sandy_Campos_Resume.pdf`, served from
`public/Sandy_Campos_Resume.pdf`. To swap it, replace that file (keep the same
filename, or update `RESUME_URL` in `src/App.vue`).

---

## Deploying to GitHub Pages

### 1. Set the base path

GitHub Pages serves a *project* site from a sub-path
(`https://<username>.github.io/<repo>/`). Vite needs to know that sub-path.

Open **`vite.config.js`** and confirm the one marked line:

```js
const REPO_BASE = '/sandy-campos-portfolio/'   // ← must match your repo name
```

- **Project site** (most common): set this to `'/<your-repo-name>/'`.
  The default assumes the repo is named `sandy-campos-portfolio`.
- **User site** (repo named `<username>.github.io`): set it to `'/'`.

> The dev server always runs at `/`; the base path only applies to production builds.

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/sandycr11/sandy-campos-portfolio.git
git push -u origin main
```

### 3. Enable Pages → GitHub Actions

In the repo: **Settings → Pages → Build and deployment → Source → “GitHub Actions.”**

That's it. The included workflow at `.github/workflows/deploy.yml` builds the site and
deploys it automatically on every push to `main`. Your site goes live at:

```
https://sandycr11.github.io/sandy-campos-portfolio/
```

### Manual alternative (no Actions)

```bash
npm run build
npx gh-pages -d dist     # publishes ./dist to the gh-pages branch
```
Then set **Settings → Pages → Source → Deploy from a branch → `gh-pages` / root**.

---

## Project structure

```
public/
  Sandy_Campos_Resume.pdf   # the résumé served by the download buttons
  .nojekyll                 # tells Pages to serve files as-is
src/
  components/         # AppShell, Sidebar, EditorTabs, CodeBlock, SectionCard,
                      # SkillBadge, MetricCard, ProjectCard, Icon
  data/               # profile, experience, aiLeverage, projects  (edit here)
  styles/             # variables.css (theme), global.css
  App.vue             # page composition + scroll-spy + reveal observers
  main.js
.github/workflows/deploy.yml
vite.config.js        # base path for GitHub Pages
```
