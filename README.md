# Pomodoro Timer

Opinionated Pomodoro timer built with Vite + React. The app keeps your focus rhythm, persists progress locally, and automatically switches between focus blocks, short breaks, and long breaks.

## Features
- Auto-cycle focus → short breaks → long breaks after every 4th focus block
- Start/pause/reset controls with manual mode switching and skip
- Local storage persistence so reloads never lose your progress
- Responsive glassmorphic UI with live progress ring and status hints
- Ready-to-deploy Vite + Tailwind setup

## Getting started
```bash
npm install
npm run dev     # start local dev server
npm run build   # production build
npm run preview # preview the built app
```

## Project structure
- `src/constants/pomodoro.js` – timer presets and storage key
- `src/hooks/usePomodoro.js` – state machine for timing, persistence, and auto-cycling
- `src/components/*` – UI pieces for mode selection, stats, and timer display
- `src/App.jsx` – page layout and control wiring
- `index.html` – Vite entry (no CDN dependencies)

## Customization
- Adjust default durations in `src/constants/pomodoro.js` (`seconds` per mode).
- Tailwind tokens/utilities live in `src/index.css` and `tailwind.config.js` if you want to tweak the look and feel.

## Deployment
Any static host works. Run `npm run build` and deploy the contents of `dist/` to your provider of choice (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc).
