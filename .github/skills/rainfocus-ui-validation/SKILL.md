---
name: rainfocus-ui-validation
description: 'Validate RainFocus frontend changes across responsive viewports, themes, density modes, keyboard interactions, accessibility state, reduced motion, direct-file loading, and design fidelity. Use after changing React components, SCSS, navigation, dialogs, preferences, or visual assets, and during independent UI review.'
argument-hint: '<changed component, interaction, or design requirement>'
user-invocable: true
disable-model-invocation: false
---

# RainFocus UI Validation

Use this workflow after browser-visible or interaction changes. Automated tests and a successful build do not replace rendered-browser checks.

## Evidence

Before validating, identify:

- Changed components and styles.
- Intended user behavior and acceptance criteria.
- Relevant design requirements and visual references, if any.
- Affected themes, density modes, and responsive regions.

Treat design references as evidence, not a complete browser specification.

## Automated Checks

1. Run the narrowest relevant Vitest test.
2. Run `npm test` for shared behavior.
3. Run `npm run build` to validate TypeScript, Sass, and production bundling.
4. Run `npm run lint` to validate Sass token usage and TypeScript.

## Browser Matrix

Inspect the production build or development server at minimum at:

| View | Width | Primary checks |
| --- | --- | --- |
| Narrow mobile | 320px | Text containment, mobile disclosure, controls, horizontal overflow |
| Narrow/cozy edge | 359px and 360px | Cozy-density overflow fixes and narrow-only sizing |
| Mobile | 390px | Stacking, dialog fit, touch targets, toast placement |
| Breakpoint edges | 767px and 768px | Sidebar mode transition and content width |
| Desktop | 1440px | Persistent navigation, content cap, grid/container-query behavior |

For affected global styles, check `light`, `dark`, and `bad-nineties` themes with `cozy`, `default`, and `compact` density. Use a risk-based subset for local changes, but always include the most constrained combination: narrow viewport plus compact density.

## Interaction And Accessibility

- Navigate the changed workflow with keyboard only.
- Verify visible focus and logical focus restoration.
- Inspect `aria-expanded`, `aria-controls`, `hidden`, labels, live regions, and dialog state against rendered behavior.
- Confirm Escape, backdrop dismissal, and trigger-focus restoration for dialogs.
- Confirm reduced-motion CSS exists and animations do not remain functionally required.
- Check computed layout when visibility or flex/container behavior is involved; DOM attributes alone are insufficient.
- Verify text and controls do not overlap, clip, or resize surrounding fixed-format UI.

## Design Fidelity

When design evidence exists, compare hierarchy, dimensions, spacing, typography, colors, radii, effects, assets, variants, and explicit interactions. Separate confirmed mismatches from browser-specific implementation choices and unresolved design ambiguity.

## Direct-File Check

Open `build/index.html` through `file://`. Confirm the page is nonblank, scripts and styles load, local assets render, and key interactions work without a server.

## Result

Report:

- Commands and browser contexts checked.
- Pass/fail results for each affected behavior.
- Screenshot or computed-style evidence when available.
- Unavailable checks and why.
- Concrete findings with file references.
- Final pass, changes-required, or unverified decision.