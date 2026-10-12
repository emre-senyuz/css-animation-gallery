# css-animation-gallery

A responsive gallery of exactly 12 handwritten CSS effects, built with vanilla HTML, CSS, minimal JavaScript, and Vite. No animation libraries, external APIs, fonts, or runtime dependencies.

## Setup

Use Node.js 20.19+ or 22.12+ (Node 24 is supported).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Production:

```sh
npm run build
npm run preview
```

The generated `dist/` folder can be served by a static host. Use the Vite server during development; opening `index.html` directly does not process CSS imports.

## Feature index

| # | Effect | Interaction |
|---|---|---|
| 01 | Pulse | Expanding halo; play/pause |
| 02 | Bounce | Ball and synchronized shadow; play/pause |
| 03 | Spin | Rotating open ring; play/pause |
| 04 | Shimmer skeleton | Traveling highlight; play/pause |
| 05 | Floating card | Gentle drift and rotation; play/pause |
| 06 | Gradient shift | Moving color field; play/pause |
| 07 | Typewriter | Stepped character reveal; play/pause |
| 08 | Reveal on scroll | Replays on viewport entry; play/pause |
| 09 | Staggered cards | Three delayed cards; play/pause |
| 10 | Hover lift | Hover or keyboard focus |
| 11 | Orbiting dots | Two dots around a fixed center; play/pause |
| 12 | Animated underline | Hover or keyboard focus |

Every card provides Copy CSS. Snippets are extracted from the actual `effects.css` source using unique demo markers and include a reduced-motion media query. Use the corresponding class names and markup from the `effects` array in `script.js`. The reveal effect needs `.is-visible` on `.preview-reveal`; the included IntersectionObserver manages it without animating in JavaScript. Shared preview layout is in `styles.css`.

## Controls and accessibility

- Reduced Motion defaults to the system preference. Changing the visible switch saves an explicit preference locally; clearing site storage restores the system default. Reduced mode disables loops and transitions, presents readable still states, and disables individual play controls.
- Light/dark mode follows the system until changed and remembers the selection when storage is available.
- Individual pause buttons freeze the current animation frame. Reveal replays when you scroll out and back in; its pause control freezes an active entrance.
- Hover demos also respond to keyboard focus. Buttons have visible focus rings and descriptive accessible labels.
- Clipboard copying works on localhost and secure origins. A selectable-code dialog provides a fallback when clipboard access fails.
- Motion uses modest durations and low-contrast changes, without flashing.

## Files

- `index.html`: page shell and accessible controls.
- `styles.css`: responsive grid, themes, shared layout, motion overrides.
- `effects.css`: twelve commented, independently mapped CSS effects.
- `script.js`: demo markup, preferences, copy/pause controls, viewport observation.
- `package.json` and `package-lock.json`: Vite scripts and reproducible dependency resolution.

No test framework or extra tooling is included. `npm run build` validates the production bundle.
