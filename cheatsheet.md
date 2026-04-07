# Cursor basics — cheatsheet

*Verify shortcuts and slash commands in **your** Cursor build (macOS vs Windows).*

## Modes (mnemonic)

| Mode | Use for |
| ---- | ------- |
| **Ask** | Understand, explore, **read-heavy** |
| **Plan** | Big tasks: clarify → **plan** before edits |
| **Agent** | Implement with tools (files, terminal, …) |
| **Debug** | Hypothesis-driven **bug** hunting |

Docs: [Agent overview](https://cursor.com/docs/agent/overview.md) · [Plan](https://cursor.com/docs/agent/plan-mode.md) · [Debug](https://cursor.com/docs/agent/debug-mode.md)

## `@` mentions (one-off context)

| Mention | Purpose |
| ------- | ------- |
| Files / folders | Pin concrete scope |
| Images | UI screenshots, mocks |
| Docs | Curated doc sets |
| Past chats | Continue a thread’s context |
| Terminal | Paste recent output without retyping |

Docs: [Context](https://cursor.com/help/customization/context.md)

## Context window — ring / circle + compaction

- The **usage indicator** (often a **ring** near the chat input) shows how much of the model **context budget** the current conversation uses.  
- **High usage:** start a **new chat**, drop stale `@` items, **commit** stable work.  
- **Compaction / summarization:** long chats may be **compressed** to fit the window—don’t assume every old detail is still verbatim; re-attach critical files or open a new thread.

## Queue vs send-now

- **Enter:** queue the next message (runs after the current step).  
- **⌘ Enter** (mac) / **Ctrl+Enter** (Win/Linux): send **now** / urgent correction (exact behavior follows UI).

## Models

- Open model picker from the chat UI (shortcut varies—check Command Palette).  
- **Auto** / default vs pinned models—see [Available models](https://cursor.com/help/models-and-usage/available-models.md).  
- **API keys:** [API keys](https://cursor.com/help/models-and-usage/api-keys.md)

## Rules + `AGENTS.md`

- **Project / Team / User rules** — persistent instructions.  
- **`AGENTS.md`** — repo-level agent guidance (with Rules in docs).  
- Doc: [Rules](https://cursor.com/docs/rules.md)

## Skills

- Packaged workflows the agent can load.  
- Doc: [Skills](https://cursor.com/docs/skills.md)

## Where code runs (high level)

- **Local** default; **worktrees** for parallel branches; **cloud** agents when enabled—see [Worktrees](https://cursor.com/docs/configuration/worktrees.md), [Cloud agent](https://cursor.com/docs/cloud-agent.md).

## Slash commands / CLI

- In-app `/` menu and **CLI** differ. Starting point: [CLI slash commands](https://cursor.com/docs/cli/reference/slash-commands.md) — confirm names in-app.

## Indexing & ignore

- [Indexing](https://cursor.com/help/customization/indexing.md) · [Ignore files](https://cursor.com/help/customization/ignore-files.md)

## Doc index

- [cursor.com/llms.txt](https://cursor.com/llms.txt) · [cursor.com/docs](https://cursor.com/docs)
