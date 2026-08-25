---
name: a11y-component-review
description: 'Use when reviewing a web component or user experience for accessibility, WCAG 2.2, WAI-ARIA APG patterns, semantic HTML, ARIA names/roles/states, keyboard interaction, focus management, screen reader announcements, forms, contrast, zoom, reflow, reduced motion, pointer input, or accessibility tests.'
---

# Accessibility Component Review

Perform a behavior-first, standards-grounded accessibility review. Use the [W3C standards map](references/standards-map.md) to locate primary sources; do not use this skill as a substitute for opening the applicable source.

## 1. Establish Scope

- Identify the component, surrounding workflow, routes, states, breakpoints, themes, input methods, and supported browsers.
- Default the evaluation target to WCAG 2.2 Level AA when none is provided.
- Record whether the review covers a component, full page, or complete multi-page process. Only full pages and complete processes can support a WCAG conformance claim.
- Find existing interaction tests, accessibility tooling, design requirements, and known constraints.

## 2. Classify Rendered Behavior

Inspect source and, when possible, operate the rendered component before selecting a pattern.

1. List user-visible controls, content that changes, mutually exclusive states, overlays, selection behavior, and focus movement.
2. Identify the native HTML element or simplest semantic structure that supplies the required behavior.
3. Classify the actual interaction model: static content, button, link, disclosure, accordion, modal or non-modal dialog, tabs, menu button, menu or menubar, listbox, combobox, radio group, switch, slider, spinbutton, tooltip, tree, grid, treegrid, toolbar, carousel, feed, navigation, form, table, or live region.
4. Compare close lookalikes explicitly. Navigation links do not become an ARIA menu because they are visually grouped. Several static sections do not become an accordion without show/hide controls. A popup is not necessarily a modal dialog.
5. If evidence supports more than one pattern, state what observation would distinguish them and perform that check. If still uncertain, stop pattern-specific conclusions and mark classification `Unverified`.

## 3. Build the Standards Checklist

Open the canonical W3C page for the classified pattern, the APG keyboard-interface practice when focus is managed, and the relevant WCAG 2.2 criteria.

Extract a component-specific checklist covering:

- native element and implicit semantics
- role and semantic container structure
- accessible name and description computation
- required and optional ARIA states and properties
- ID references, ownership, controls, labeling, and described-by relationships
- state changes and synchronization between DOM, visuals, and accessibility APIs
- keyboard entry, activation, navigation, dismissal, and exit
- initial focus, focus visibility, internal focus movement, trapping, persistence, and restoration
- hidden, inert, disabled, expanded, selected, checked, pressed, current, busy, and invalid states as applicable
- live-region or status-message behavior

Label every item as one of:

- `WCAG`: a normative success criterion used for conformance evaluation
- `APG`: informative pattern or practice guidance
- `Best practice`: useful guidance that is not asserted as a WCAG requirement

Use the current canonical W3C page, not remembered prose or a third-party summary. If direct W3C retrieval is blocked, try the browser and the W3C-published GitHub source linked in the standards map. Report any source that remains unavailable.

## 4. Inspect Implementation

### Semantics and Content

- Prefer native elements over recreated controls. Check heading hierarchy, landmarks, lists, tables and header associations, page title, document and part language, link purpose, button versus link behavior, image alternatives, decorative images, icon names, and reading order.
- Inspect the computed accessible name and description, not only the presence of `aria-label` or visible text. Ensure visible labels are included in accessible names.
- Flag redundant, conflicting, invalid, or unsupported ARIA and roles that override useful native semantics.
- Verify generated IDs are unique and every ID reference resolves to the intended element.
- Check that CSS visual order does not create a conflicting DOM, reading, or focus order.

### Keyboard and Focus

- Complete the workflow with keyboard only. Test `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, arrow keys, `Home`, and `End` only where the classified pattern specifies them.
- Check that all functionality is reachable without positive `tabindex`, mouse-only handlers, dragging, path-based gestures, or undocumented shortcuts.
- Verify focus is always discernible, logical, unobscured, and retained after content opens, closes, updates, disables, or is removed.
- For composites, verify the exact APG focus strategy, such as roving `tabindex` or `aria-activedescendant`, including only one intended tab stop and synchronized pointer behavior.
- Distinguish focus from selection and confirm both states are visually and programmatically exposed.

### Visual, Responsive, and Input Access

- Check text and non-text contrast in every theme and state, including hover, focus, disabled, selected, error, and forced-colors or high-contrast modes where relevant.
- Verify information is not conveyed by color, position, shape, sound, or motion alone.
- Test text resize, browser zoom, text spacing overrides, narrow-width reflow, orientation changes, and content revealed on hover or focus.
- Check focus indicators, focus not obscured, pointer cancellation, target size, alternatives to dragging and multipoint/path gestures, and operation with touch and coarse pointers.
- Honor reduced-motion preferences; inspect flashing, auto-play, moving content, time limits, session expiry, and interruptions when applicable.

### Forms, Errors, and Dynamic Updates

- Verify persistent labels, instructions, required and invalid states, input purpose, grouped-control names, error identification, error association, suggestions, and recovery or confirmation for consequential actions.
- Check that validation does not rely on placeholder text, color, or focus movement alone.
- Verify loading, success, error, result-count, cart, save, and similar updates are announced without disruptive focus changes or duplicate announcements.
- Check dialogs and overlays for inert background behavior, meaningful initial focus, contained tab order when modal, keyboard dismissal, a visible close action, and logical focus restoration.

## 5. Validate With Multiple Methods

Use the repository's existing commands and tools first.

- Run focused unit or interaction tests for the component.
- Use available automated analyzers such as axe, Accessibility Insights, Lighthouse, or browser accessibility-tree inspection. Do not install or add dependencies during a read-only review.
- Manually inspect rendered DOM, computed styles, accessibility tree, keyboard behavior, state changes, responsive layouts, themes, and motion preferences.
- Test a named screen reader and browser combination only when available. Otherwise identify the exact assistive-technology check as `Unverified`.
- Treat zero automated violations as evidence only for the rules and state that the tool evaluated.

## 6. Report Findings

Order findings by user impact, not by file. Each finding must include observed evidence, affected users, expected behavior, primary W3C links, source type (`WCAG`, `APG`, or `Best practice`), a correction, and a focused regression test.

Also report:

- behavioral classification and rejected lookalike patterns
- states, viewports, themes, input methods, commands, browsers, and assistive technologies tested
- passed checks with evidence
- unavailable standards pages, tools, environments, and resulting unverified checks
- whether the decision applies to a component only or supports a broader claim

Never infer accessibility from filenames, ARIA attribute presence, automated scans, or unit tests alone.