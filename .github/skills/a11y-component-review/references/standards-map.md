# W3C Accessibility Standards Map

Use these canonical W3C sources after classifying actual behavior. Component names and visual styling are not classifications.

## Foundations

- [WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/) - normative success criteria and conformance requirements
- [How to Meet WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/) - filterable informative techniques and failures
- [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/) - informative explanations for each criterion
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) - informative widget pattern guidance and examples
- [APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) - roles as behavioral promises, ARIA risks, and interoperability testing
- [Developing a Keyboard Interface](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/) - tab sequence, composites, focus, selection, and keyboard conventions
- [Accessible Name and Description Computation](https://www.w3.org/TR/accname-1.2/) - normative accessible name and description algorithm
- [ARIA in HTML](https://www.w3.org/TR/html-aria/) - normative role and attribute allowances for HTML
- [WAI Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/) - preliminary human evaluation guidance

If a W3C page rejects an automated web request, open the canonical page with the browser. W3C also publishes source for [ARIA Practices](https://github.com/w3c/aria-practices) and [WCAG](https://github.com/w3c/wcag). Source repositories are fallback evidence, not permission to skip trying the current canonical page.

## Behavior-to-Pattern Routes

| Observed behavior | Primary APG route |
| --- | --- |
| One control shows or hides one content region | [Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) |
| Stacked interactive headings show or hide associated sections | [Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) |
| Overlay makes outside content inert and contains focus | [Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) |
| Overlay window allows interaction outside it | [Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) plus the ARIA `dialog` specification; do not apply modal requirements blindly |
| Labeled tabs select one associated panel | [Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) |
| Button opens a set of actions or choices | [Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) and [Menu and Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) |
| Site navigation expands to reveal links | [Disclosure Navigation Example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) unless behavior truly fulfills menu semantics |
| Editable field controls a suggestion or choice popup | [Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) |
| User selects one or more options from a list | [Listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) |
| Hierarchical expandable choices | [Tree View](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |
| Two-dimensional interactive cells | [Grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) or [Treegrid](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/) |
| Grouped exclusive choices | [Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) |
| Binary on/off setting | [Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) |
| User sets a value in a range | [Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) or [Spinbutton](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) |
| Label-like popup describes an element on hover or focus | [Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) |
| Group of controls supports arrow-key navigation | [Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| Rotating set of content slides | [Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) |
| Dynamically loaded stream of articles | [Feed](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) |
| Current location in a hierarchy | [Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) |

Consult the [complete APG pattern index](https://www.w3.org/WAI/ARIA/apg/patterns/) when no route fits.

## Common WCAG 2.2 AA Routes

Select criteria based on observed content and behavior; this is a routing aid, not a substitute for evaluating the full standard.

- Semantics and relationships: 1.3.1, 1.3.2, 1.3.4; 2.4.6; 4.1.2
- Text and media alternatives: 1.1.1; applicable 1.2.x criteria
- Color and visual presentation: 1.4.1, 1.4.3, 1.4.10, 1.4.11, 1.4.12, 1.4.13
- Keyboard and focus: 2.1.1, 2.1.2, 2.1.4; 2.4.1, 2.4.3, 2.4.7, 2.4.11
- Pointer and touch: 2.5.1, 2.5.2, 2.5.3, 2.5.4, 2.5.7, 2.5.8
- Motion, flashing, and timing: 2.2.1, 2.2.2; 2.3.1; 2.3.3
- Navigation and predictability: 2.4.2, 2.4.4, 2.4.5; 3.2.1 through 3.2.4
- Language: 3.1.1, 3.1.2
- Forms and errors: 1.3.5; 3.3.1 through 3.3.4, 3.3.7, 3.3.8
- Dynamic updates: 4.1.2, 4.1.3

Do not call APG guidance normative WCAG. APG describes expected accessible widget behavior; WCAG success criteria and conformance requirements determine a WCAG claim.