# 🌟 Little Learners — Kids Interactive Learning App

An interactive, offline-capable Progressive Web App (PWA) built for young children (ages 3–8) covering Math, Language, Science, Art, Geography, and Life Skills across **25 learning modules** with **100 activity tabs**.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Modules](#modules)
- [Core Architecture](#core-architecture)
- [PWA & Offline Support](#pwa--offline-support)
- [Contributing Guidelines](#contributing-guidelines)

---

## Overview

Little Learners is designed as a **limited-use, family-facing app** — typically deployed for a single child or a small group. It runs entirely in the browser with no backend, no accounts, and no network dependency after first load. All progress is persisted to `localStorage`.

**Key features:**
- 25 learning modules, each with 3–4 activity tabs
- Text-to-speech narration (Web Speech API) in English and Hindi
- Sound effects and piano audio (Web Audio API)
- Star-based reward system with 10 unlockable badges
- Parent Dashboard with activity log, progress charts, and data export
- Installable as a PWA on desktop, Android, and iOS
- Fully offline after first visit via Service Worker caching

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 12 |
| State management | Zustand 5 |
| Charts (Dashboard) | Recharts 3 |
| Icons | Lucide React |
| Audio | Web Audio API (singleton) |
| Speech | Web Speech API |
| Offline | Service Worker + Cache API |
| Font | Nunito (Google Fonts) |

---

## Project Structure

```
littlelearners/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── manifest.json          # PWA manifest
│   └── service-worker.js      # Offline caching
├── src/
│   ├── App.jsx                # Root — lazy-loads all modules
│   ├── main.jsx               # Entry point + SW registration
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx         # Sticky header, star counter, sound toggle
│   │   │   ├── BadgeDisplay.jsx   # Badge strip under header
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── BackButton.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ModuleCard.jsx
│   │   │   ├── ModuleHeader.jsx
│   │   │   └── InstallPWA.jsx
│   │   ├── home/
│   │   │   ├── HomeScreen.jsx     # Module grid
│   │   │   └── Mascot.jsx
│   │   ├── dashboard/
│   │   │   └── ParentDashboard.jsx
│   │   └── modules/           # 25 learning modules (see Modules section)
│   ├── store/
│   │   └── useStore.js        # Zustand store — all global state
│   ├── hooks/
│   │   ├── useSpeechCleanup.js
│   │   ├── useTabs.js
│   │   └── index.js
│   ├── utils/
│   │   ├── audioUtils.js      # Web Audio singleton, sound effects
│   │   ├── speechUtils.js     # Web Speech API (EN + HI)
│   │   ├── animationUtils.js  # Framer Motion variant library
│   │   ├── gameHelpers.js     # Shuffle, scoring, formatting helpers
│   │   └── serviceWorkerRegistration.js
│   └── data/                  # Static data files per module (27 files)
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install and run

```bash
# Clone or unzip the project
cd littlelearners

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Modules

Each module lives at `src/components/modules/<name>/` and is **lazy-loaded** via `React.lazy()` in `App.jsx` so the initial bundle stays small.

| # | Module | Tabs |
|---|--------|------|
| 1 | **Maths** | Numbers, Counting, Addition, Subtraction |
| 2 | **English** | Alphabet, Words, Phonics, Spelling |
| 3 | **Hindi** | Varnmala, Shikshak, Matras, Shabd Khel |
| 4 | **EVS** | Animals, Plants, Seasons, Habits |
| 5 | **Art** | Colors, Shapes, Drawing, Patterns |
| 6 | **Brain Games** | Logic, Memory, Puzzle, Sequence |
| 7 | **Rhyme Time** | Rhyming Words, Word Families, Rhyme Game, Poems |
| 8 | **Spelling Bee** | Word List, Practice, Scramble, Spelling Test |
| 9 | **Opposites** | Learn, Quiz, Matching, Flip Card |
| 10 | **Clock & Time** | Learn Time, Practice Time, Quiz Time, Daily Schedule |
| 11 | **Odd One Out** | Find Different, Category Challenge, Speed Round, Create Own |
| 12 | **Mini Piano** | Free Play, Learn Notes, Play Songs, Record Music |
| 13 | **Story Builder** | Pick Elements, Build Story, Read Story, Saved Stories |
| 14 | **Body Explorer** | Body Parts, Five Senses, Body Quiz, Healthy Habits |
| 15 | **World Flags** | Learn Flags, Explore World, Flag Quiz, Match Flags |
| 16 | **Money Math** | Count Money, Make Change, Save & Earn, Shopping Game |
| 17 | **Shadow Match** | Match Shadow, Shadow Quiz, Quick Match |
| 18 | **Weather Station** | Season Explorer, Dress Up, Temperature Game, Rain Cycle |
| 19 | **Plant Life Cycle** | Learn Stages, Plant Types, Grow Garden, Harvest Game |
| 20 | **Continents Explorer** | Learn Continents, Interactive Map, Quiz Game, Sticker Collection |
| 21 | **Mystery Letters** | Learn Cipher, Decode Message, Create Message, Badges |
| 22 | **Emotion Mirror** | Identify Emotion, Feeling Scenarios, Coping Strategies, Calm Down |
| 23 | **Food Groups** | Learn Groups, Sort Foods, Build Meal, Nutrition Quiz |
| 24 | **Then & Now** | Timeline, Flip Cards, Compare Items, History Quiz |
| 25 | **Calendar & Seasons** | Calendar, Month Order, Season Match, Birthday |

---

## Core Architecture

### State — `src/store/useStore.js`

Single Zustand store. All state lives here. Key slices:

| Slice | Purpose |
|---|---|
| `currentScreen` | Active module/screen name |
| `totalStars` | Cumulative star count |
| `mathCorrect`, `hindiCorrect`, `spellingCorrect`, `evsCorrect`, `storiesRead`, `artDrawn` | Per-subject progress counters |
| `unlockedBadges` | Array of earned badge IDs |
| `lastUnlockedBadge` | Triggers badge unlock modal |
| `activityLog` | Capped at 100 entries in memory and in localStorage |
| `soundEnabled` | Global mute flag — respected by all audio and speech calls |

**Persistence:** `hydrate()` loads from `localStorage` on app mount. `persist()` writes on every meaningful state change. `resetProgress()` wipes both Zustand state and `localStorage`.

### Audio — `src/utils/audioUtils.js`

Uses a **single shared `AudioContext` singleton** (`getSharedAudioContext()`). All sound effects (`playCorrect`, `playWrong`, `playStar`, `playSuccess`, `playClick`) go through `playTone()`, which checks `soundEnabled` before playing anything.

The Mini Piano tabs use `getSharedAudioContext()` directly to avoid creating multiple `AudioContext` instances (browsers cap concurrent contexts, particularly on iOS Safari).

### Speech — `src/utils/speechUtils.js`

Wraps the Web Speech API. Provides `speakEnglish()`, `speakHindi()`, and `speak()`. All three check `soundEnabled` at call time and return early silently if the app is muted.

Voices are loaded once and cached. Prefers `en-IN` and `hi-IN` voices where available.

### Speech Cleanup — `src/hooks/useSpeechCleanup.js`

Custom hook used in every module. Registers a cleanup function that calls `cancelSpeech()` from `speechUtils` when the component unmounts — preventing speech from continuing after the child navigates away.

```js
// Usage in any module or tab component
useSpeechCleanup([activeTab]); // also cancels on tab change
```

### Animations — `src/utils/animationUtils.js`

Centralised Framer Motion variant library. Key exports:

| Export | Use |
|---|---|
| `screenVariants` | Page transitions |
| `getStarFlyVariants()` | Star celebration (call as a function — returns fresh random `x` per call) |
| `confettiVariants` | Confetti particles |
| `cardHoverVariants` | Module card hover |
| `badgeModalVariants` | Badge unlock modal |
| `fadeIn`, `slideIn`, `scaleIn` | Common entry animations |
| `correctAnswer`, `wrongAnswer` | Quiz feedback animations |

> **Note:** Always use `getStarFlyVariants()` (function call) rather than the static `starFlyVariants` export when rendering multiple star particles — each call returns a new random horizontal direction.

### Routing

Navigation is screen-based (not URL-based). `currentScreen` in the store drives which module renders. All module navigation calls `useStore.getState().setScreen('moduleName')`, which also cancels active speech before switching.

---

## PWA & Offline Support

- **Service Worker** (`public/service-worker.js`) uses a cache-first strategy. Critical app shell URLs are pre-cached on install. All other network responses are cached at runtime.
- **Web App Manifest** (`public/manifest.json`) enables "Add to Home Screen" on Android/iOS and install prompts on desktop Chrome/Edge.
- **`InstallPWA` component** shows a native install prompt banner when the `beforeinstallprompt` browser event fires.
- Cache versioning: update `CACHE_NAME` in `service-worker.js` on each production deployment to invalidate stale caches.

---

## Contributing Guidelines

1. **All audio must go through `audioUtils`** — never create a new `AudioContext` in a component. Use `getSharedAudioContext()` for raw Web Audio access or `playSound('click' | 'correct' | 'wrong' | 'star' | 'success')` for effects.

2. **All speech must go through `speechUtils`** — use `speakEnglish()`, `speakHindi()`, or `speak()`. Never call `window.speechSynthesis` directly in a component.

3. **All activity logging uses the 3-arg signature** — `logActivity(module, action, description)` where `module` matches the module's display name (e.g. `'maths'`, `'hindi'`, `'Mini Piano'`).

4. **Cancel speech on unmount** — every module or tab that triggers speech must call `useSpeechCleanup()` from `src/hooks/useSpeechCleanup.js`.

5. **Star animations** — use `getStarFlyVariants()` (function call), not the static `starFlyVariants` export, when rendering multiple animated star particles.

6. **State changes that should survive reload** — call `get().persist()` after any `set()` that changes user-visible state (the store does this automatically for stars, badges, progress counters, sound, and activity log).

7. **No new `useEffect` with empty deps and stale closures** — if a `useEffect` callback references mutable values, include them in the dependency array or use `useStore.getState()` for synchronous reads.

---

*Little Learners v1.1.0 — June 2026*
