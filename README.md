# RainFocus UI Challenge

A responsive React implementation of the RainFocus event setup guide UI challenge.

## Stack

- React 19
- TypeScript
- Vite
- Sass

## Run locally

```bash
npm install
npm run dev
```

Vite starts the app at `http://localhost:5173` by default.

## View the prebuilt app

Open `build/index.html` in a browser. The build uses relative asset paths, so no install, server, or rebuild is required.

## Other commands

```bash
npm run build
npm run lint
npm test
npm run preview
```

The production build is written to `build/`.

## Design system

Shared foundations live in `src/styles/`:

- `_tokens.scss` defines semantic Sass aliases for color, typography, spacing, radius, layout, motion, focus, elevation, and layers.
- Theme and density values use CSS custom properties because they change at runtime. Component-local geometry stays with the component that owns it.
- `_mixins.scss` contains only repeated layout, focus, breakpoint, and visually-hidden patterns.
- Component SCSS consumes semantic tokens and keeps state styling beside the component.

The settings dialog persists theme and density preferences in `localStorage`. `src/preferences.ts` validates and applies those values before React mounts, while the dialog updates the same shared contract.

## Responsive architecture

The layout uses one 768px viewport breakpoint to switch the sidebar between a mobile disclosure and a persistent desktop rail. Content adapts intrinsically with flex wrapping, `clamp()`, `auto-fit`, and `minmax()`. The workflow grid uses a local container query because its card count depends on available content width rather than the viewport.

Density changes the shared spacing scale rather than selecting separate component layouts. Stable controls and brand assets retain explicit dimensions to prevent layout shift.

## Accessibility

The page includes a skip link, semantic landmarks and headings, visible focus treatment, labelled disclosures, and a polite toast live region. Settings use a native `<dialog>` and fieldsets with radio controls; closing the dialog restores focus to its trigger. Decorative icons are hidden from assistive technology, and reduced-motion preferences shorten transitions and animations.

## Validation

`npm run build` performs the strict TypeScript build and production bundle. `npm run lint` runs Oxlint. `npm test` covers persisted appearance preferences, dialog focus restoration, and navigation expansion contracts.

## Structure

```text
src/
  assets/       Images and icons
  components/   Page header, sidebar, setup guide, and toast UI
  data/         Navigation and setup-guide content
  styles/       Shared tokens, mixins, reset, and global styles
```
