---
name: figma-remote-extraction
description: 'Extract assets and implementation-ready design metadata directly from the Figma REST API without bundled scripts. Use for Figma file or node URLs, remote asset downloads, colors, typography, sizing, layout, effects, components, variants, interactions, visibility, and extraction manifests.'
argument-hint: '<Figma URL or file key, scope, output directory, and format preferences>'
user-invocable: true
disable-model-invocation: false
---

# Figma Remote Extraction

Use direct terminal-native HTTP and JSON operations to extract a requested Figma scope. Do not create helper scripts, generated executables, or new runtime dependencies for this workflow.

## Prerequisites

- Obtain a Figma file or node URL and the intended extraction scope.
- Use the repository-root `user.env` file as the credential source.
- `user.env` must define `FIGMA_ACCESS_TOKEN=<PAT>` and remain ignored by source control.
- Load the PAT inside the terminal process without displaying the file or token. Never ask for a PAT in chat.
- Use the `X-Figma-Token` request header. Do not expose headers through verbose output or error reporting.

## Safe Windows Execution

Use one persistent PowerShell session for all authenticated operations. The command text may contain variable names, but must never contain the PAT value. Disable tracing and transcripts, assign HTTP responses to variables or files so raw responses are not printed, and do not use `Get-Content`, `type`, `cat`, editor reads, searches, or subagents on `user.env`.

Load the single supported assignment without emitting it:

```powershell
Set-PSDebug -Trace 0
$VerbosePreference = 'SilentlyContinue'
$DebugPreference = 'SilentlyContinue'
$repoRoot = (git rev-parse --show-toplevel).Trim()
$envPath = Join-Path $repoRoot 'user.env'
if (-not (Test-Path -LiteralPath $envPath)) { throw 'Repository-root user.env is missing.' }
$tokenLine = [System.IO.File]::ReadLines($envPath) |
  Where-Object { $_ -match '^\s*FIGMA_ACCESS_TOKEN\s*=' } |
  Select-Object -First 1
if (-not $tokenLine) { throw 'FIGMA_ACCESS_TOKEN is missing from user.env.' }
$env:FIGMA_ACCESS_TOKEN = $tokenLine.Substring($tokenLine.IndexOf('=') + 1).Trim()
Remove-Variable tokenLine
if ([string]::IsNullOrWhiteSpace($env:FIGMA_ACCESS_TOKEN)) { throw 'FIGMA_ACCESS_TOKEN is empty.' }
$figmaHeaders = @{ 'X-Figma-Token' = $env:FIGMA_ACCESS_TOKEN }
```

Use `Invoke-RestMethod` with `$figmaHeaders` and assign its result rather than allowing it to flow to terminal output. Keep signed asset URLs only in memory until each download completes. On completion or failure, clear credential state:

```powershell
Remove-Variable figmaHeaders -ErrorAction SilentlyContinue
Remove-Item Env:FIGMA_ACCESS_TOKEN -ErrorAction SilentlyContinue
```

Do not use the unauthenticated web-fetch tool for Figma API calls. On non-Windows systems, apply the same properties with native tools: no command tracing, no token in command arguments, no raw credential-file output, no verbose HTTP logging, and explicit credential cleanup.

## 1. Resolve Scope

Parse:

- file key from Figma share, design, FigJam, prototype, or REST URLs
- `node-id` query values, converting URL forms such as `123-456` to API forms such as `123:456`
- additional user-approved node IDs

Prefer `GET /v1/files/:key/nodes?ids=<ids>` for selected scopes. Use `GET /v1/files/:key` only for page/file extraction or when ancestor discovery requires it.

Before downloading, state whether the scope is selected nodes, a page, or the complete file. For large scopes, inventory first and confirm the projected output size.

## 2. Gather Metadata

Walk every returned node recursively and preserve hidden nodes in metadata. For each node calculate both:

- `visible`: whether the node itself is not `visible: false`
- `effectiveVisible`: whether the node and every ancestor are visible

Capture exact values for:

- identity and hierarchy: IDs, names, types, parent IDs, paths, depth
- geometry: bounding boxes, render bounds, dimensions, transforms, rotation, constraints
- layout: auto layout, sizing, wrapping, alignment, gaps, padding, grids, clipping, overflow
- appearance: fills, gradients, strokes, opacity, blend modes, radii, effects, shadows, blurs
- typography: content, family, postscript name, weight, size, line height, spacing, alignment, case, decoration
- systems: components, component sets, properties, variants, overrides, shared styles, variables and modes
- behavior: interactions, reactions, transitions, destinations, flow starts
- export data: export settings and visible image-fill references

Do not infer responsive breakpoints, hover states, errors, or component variants without explicit metadata, naming, or prototype evidence.

## 3. Plan Assets

Build a deduplicated asset inventory from the approved scope:

- nodes with Figma export settings
- visible nodes containing image fills
- approved vector, component, component-set, icon, logo, illustration, and image roots

Exclude effectively hidden nodes by default and record excluded subtree roots. Include them only when explicitly requested. Avoid redundant parent-and-child exports unless each is independently meaningful.

Choose format in this order:

1. user override
2. Figma export setting
3. PNG for bitmap/image-fill content
4. SVG for vector and component artwork

Honor configured suffixes and scale constraints. Default raster scale to 2 when no setting is provided. Keep scale within Figma's accepted range.

## 4. Render And Download

- Batch node IDs for `GET /v1/images/:key` requests by format and scale.
- Resolve image-fill URLs with `GET /v1/files/:key/images` when needed.
- Download signed URLs immediately, but never persist the URLs themselves.
- Treat null render URLs as per-node failures.
- Use stable lowercase kebab-case filenames and append a normalized node-ID suffix for collisions.
- Skip existing files unless overwrite was explicitly approved.
- Do not let one failed asset prevent other downloads.

## 5. Write Outputs

Create only data and asset outputs, not workflow scripts:

```text
<output>/
  design-metadata.json
  design-summary.md
  assets.manifest.json
  assets/
    <exported files>
```

`design-metadata.json` is the exact machine-readable record. `design-summary.md` highlights hierarchy, reusable colors, typography, spacing/sizing patterns, components, variants, interactions, hidden states, and ambiguities.

The manifest must include every planned asset with source node ID, full path, filename, format, scale, dimensions, status, and sanitized error. Never include credentials, request headers, API response headers, or signed URLs.

These files are extraction artifacts, not automatic application changes. Keep them in the approved output directory; only copy selected assets into `src/assets/icons` or `src/assets/images` when the user explicitly requests integration and confirms replacements or naming.

## 6. Verify

- Reconcile planned, downloaded, skipped, and failed counts.
- Verify each downloaded file exists and has nonzero size.
- Inspect SVG markup and representative raster/PDF assets.
- Confirm dimensions, transparency, cropping, names, and selected variants.
- Search generated metadata and manifests for accidental credentials, authorization headers, and signed URL parameters without printing any detected secret value.
- Report unavailable visual checks rather than silently passing them.

## Failure Handling

- `401` or `403`: report missing/invalid PAT, scope, or file permission without showing headers.
- `404`: verify file key and node IDs.
- `429`: respect retry timing and reduce broad full-file requests.
- Null image URL: record a node-specific render failure.
- Missing image reference: retain metadata and report the unavailable asset.

## Completion Report

Report scope, output paths, metadata and asset counts, hidden nodes excluded, formats/scales used, failed nodes, verification evidence, and unresolved design ambiguity. Keep confirmed API facts separate from implementation recommendations.
