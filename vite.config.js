import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// ┌─────────────────────────────────────────────────────────────────────────┐
// │  GITHUB PAGES BASE PATH                                                    │
// │                                                                            │
// │  For a PROJECT site (https://<user>.github.io/<repo>/) set this to         │
// │  '/<repo>/'. The current default assumes the repo is named                 │
// │  "sandy-campos-portfolio".                                                 │
// │                                                                            │
// │  For a USER site (https://<user>.github.io/) set this to '/'.              │
// │                                                                            │
// │  --> CHANGE THIS ONE LINE IF YOUR REPO NAME IS DIFFERENT <--               │
// └─────────────────────────────────────────────────────────────────────────┘
const REPO_BASE = '/sandy-campos-portfolio/'

export default defineConfig({
  // Use the project base only for production builds; dev server stays at '/'.
  base: process.env.NODE_ENV === 'production' ? REPO_BASE : '/',
  plugins: [vue()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
