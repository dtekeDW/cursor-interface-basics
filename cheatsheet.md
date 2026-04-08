# Cursor Cheat Sheet (Extended)

Verify shortcuts and bindings in your Cursor build (macOS vs Windows/Linux).

---

## At-a-Glance Decision Flow

```text
Need to understand first? -> Ask
Need a structured approach? -> Plan
Need execution in files/terminal? -> Agent
Need to isolate a bug? -> Debug
```

Use this as your default mode chooser before each task.

---

## Keyboard Shortcuts (Core)

| Action | macOS | Windows / Linux |
|------|------|----------------|
| Command Palette | Cmd+Shift+P | Ctrl+Shift+P |
| Quick Open file | Cmd+P | Ctrl+P |
| New chat / tab | Cmd+T / Cmd+N | Ctrl+T / Ctrl+N |
| Open AI panel | Cmd+I / Cmd+L | Ctrl+I / Ctrl+L |
| Inline edit (important) | Cmd+K | Ctrl+K |
| Accept AI suggestion | Tab | Tab |
| Toggle sidebar | Cmd+B | Ctrl+B |
| Search in files | Cmd+Shift+F | Ctrl+Shift+F |
| Model picker | Cmd+Shift+/ | Ctrl+Shift+/ |
| Send immediately | Cmd+Enter | Ctrl+Enter |

Tip: Open Command Palette and search for `Cursor`, `Chat`, or `Agent` to discover additional bindings.

---

## High-Impact Shortcuts (Underrated)

| Action | Why it matters |
|------|--------------|
| Cmd+K (Inline Edit) | fastest way to refactor in place |
| Cmd+I (Agent) | jump straight into execution context |
| Tab | accept diff incrementally |
| Cmd+P | navigate repo faster than sidebar browsing |
| Cmd+Shift+P -> `Fix` | quick AI fixes without opening a full thread |

---

## Modes (Mental Model)

| Mode | Use for |
|------|--------|
| Ask | read, explain, explore |
| Plan | structure tasks before coding |
| Agent | execute changes (files, terminal) |
| Debug | isolate bugs with hypotheses |

Rule of thumb:
- unclear -> Ask
- complex -> Plan first
- implementation -> Agent

---

## @ Mentions (Context Control)

| Mention | Purpose |
|--------|--------|
| `@file` | pin exact file |
| `@folder` | scope a feature area |
| `@docs` | include external knowledge |
| `@image` | include UI/screenshot context |
| `@terminal` | include logs and command output |
| `@chat` | reuse previous context |

Best practice: pin files directly instead of describing them in prose.

---

## Context Window (Critical)

- Ring indicator shows context usage.
- High usage increases risk of losing earlier details.

### Failure signals
- instructions are ignored or partially followed
- hallucinated assumptions appear
- edits happen in unexpected files

### Recovery steps
- start a new chat
- re-attach key `@files`
- keep each thread tightly scoped

---

## Queue vs Send

| Action | Behavior |
|------|--------|
| Enter | queue next step |
| Cmd+Enter | interrupt and send immediately |

Use `Cmd+Enter` if the agent is drifting or you need to redirect immediately.

---

## Models

- `Auto` uses default model routing.
- Pin a model for consistency when comparing outputs.

| Task type | Recommended model profile |
|----------|----------------------------|
| planning and architecture | stronger reasoning model |
| bulk refactor and routine edits | faster model |

---

## Rules vs AGENTS.md vs Skills

| Mechanism | Scope | Best for |
|-----------|-------|----------|
| `.cursor/rules` | persistent behavior | coding style, architecture constraints, repeated patterns |
| `AGENTS.md` | project guidance | conventions, overview, onboarding context |
| Skills | reusable workflows | deploy flows, migrations, codegen templates, multi-step playbooks |

Trigger a skill with:
```text
/skill-name
```

Pro tip: `disable-model-invocation: true` can turn a skill into a manual slash command.

---

## Slash Commands (Practical)

| Command | Use |
|--------|----|
| `/create-rule` | generate a rule file |
| `/migrate-to-skills` | convert rules to skills |
| `/fix` | quick repair |
| `/explain` | understand code |
| `/refactor` | structured rewrite |

Always verify available commands through the Command Palette because names can vary by version.

---

## Indexing and Ignore

Cursor indexing quality directly affects answer quality.

Ignore noisy paths where possible:
- `node_modules`
- build outputs
- logs

---

## Agent Workflow (Best Practice)

### Simple task
```text
@file
"Refactor this function"
```

### Medium task
```text
Plan -> confirm -> Agent
```

### Complex task
```text
1) Ask (understand)
2) Plan (break down)
3) Agent (execute)
4) Debug (stabilize)
```

---

## Debug Strategy

Weak report:
> "This does not work."

High-signal report:
```text
@file
Bug:
Expected:
Actual:
Hypothesis:
```

Structured bug reports produce better fixes faster.

---

## Quick Diagnosis Table

| Symptom | Likely cause | Immediate fix |
|---------|--------------|---------------|
| vague or generic output | context too broad | narrow to 1-3 `@files` |
| wrong-file edits | missing scope anchors | pin exact file paths and restate target |
| inconsistent answers across retries | model/task mismatch | pin model and use Plan mode first |
| good start, bad later turns | long chat context drift | start new thread with concise recap |

---

## Where Code Runs

| Mode | Behavior |
|------|--------|
| Local | default execution |
| Worktrees | parallel branches |
| Cloud agents | remote execution |

---

## Power Tips (High Value)

- scope every substantial task with `@files`
- keep chats short-lived and purpose-specific
- use Plan before large edits
- prefer inline edit for surgical fixes
- convert repeated prompts into Rules or Skills
- commit frequently during long agent sessions

---

## Common Mistakes

- too much context lowers precision
- no file references increases hallucination risk
- skipping Plan creates messy diffs
- long threads degrade consistency

---

## Minimal Mental Model

```text
Context = everything
Scope = @files
Control = Plan
Execution = Agent
Stability = short chats
```

---

If you want, the next step can be a "Senior / Power User Cursor Setup" with:

- concrete `.cursor/rules` tuned to your repo
- 2-3 high-value skills (for example: refactor, deploy, debug)
- prompt patterns tuned to your stack (Nuxt + PHP + AI)