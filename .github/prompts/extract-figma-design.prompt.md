---
name: 'extract-figma-design'
description: 'Extract approved assets and implementation-ready design metadata from a Figma file or node URL through the repository Figma agent.'
argument-hint: '<Figma URL or file key; selected nodes/page/file; output directory; asset formats/scales; extraction only or approved integration>'
agent: 'figma-remote-extractor'
---

Extract the requested Figma scope and its design metadata.

Require the Figma URL or file key, exact node/page/file scope, and a user-approved output directory before downloading. Treat the request as extraction only unless application integration is explicit. Follow the selected agent's credential contract: load the PAT only from repository-root `user.env` in the persistent terminal, never expose it, never send it to web or subagent tools, and clear credential state afterward. Return the manifest, metadata and asset results, verification evidence, exclusions, failures, and ambiguities required by the selected agent.
