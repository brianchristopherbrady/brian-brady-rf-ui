---
name: customization-validation
description: 'Validate repository Copilot customizations. Use after creating, moving, or editing .agent.md files, SKILL.md files, instruction files, handoffs, shared scripts, or relative links; and before packaging workspace agents and skills.'
argument-hint: '[repository root]'
user-invocable: true
disable-model-invocation: false
---

# Customization Validation

Run the bundled validator after changing any workspace agent, skill, instruction, handoff, or customization resource.

```powershell
node .github/skills/customization-validation/scripts/validate-customizations.mjs
```

The validator checks:

- Frontmatter exists and includes a meaningful description.
- Every skill name matches its parent folder.
- Every agent name matches its `.agent.md` filename.
- Every prompt name matches its `.prompt.md` filename and targets an existing custom or supported built-in agent.
- Agent handoff targets resolve to existing `.agent.md` files.
- Agents do not request the `agent` tool while setting `agents: []`.
- Relative Markdown links resolve.
- JavaScript module files pass `node --check`.

After the script passes, inspect VS Code's Chat Customizations Diagnostics view. Runtime discovery and contributed-tool availability cannot be proven by static file validation alone.

Never inspect credential-file contents as part of customization validation.

See [validate-customizations.mjs](./scripts/validate-customizations.mjs) for the executable checks.