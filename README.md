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

## Implementation notes

- Shared Sass tokens and mixins live in `src/styles/`.
- The sidebar switches between a mobile disclosure and a persistent desktop rail at 768px.
- Workflow grids use container queries to adapt to their available content width.
- Theme and density preferences are validated, stored in `localStorage`, and applied before React mounts.

## Accessibility

The page includes semantic landmarks, keyboard focus treatment, expandable controls, and focus restoration for the settings dialog.

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
