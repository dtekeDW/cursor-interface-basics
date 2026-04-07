# Cursor — Interface & basics

## Meta

- **Version:** v0.1.1  
- **Updated:** 2026-04-07  
- **Format:** ~30 min talk + **10 min** Q&A  
- **Audience:** Developers with **basic → light/medium** AI tool experience  

## Doc index

- **LLM link index:** [cursor.com/llms.txt](https://cursor.com/llms.txt)  
- **Docs hub:** [cursor.com/docs](https://cursor.com/docs) · [docs.md](https://cursor.com/docs.md)  

## Agenda

| # | Block | Min | Materials |
| - | ----- | --- | --------- |
| 1 | Intro + framing + **shortcuts teaser** | ~4 | [presentation](output/sections/01/presentation.md) · [slides](output/sections/01/slides.md) |
| 2 | Interface + `@` + **context window** | ~6 | [presentation](output/sections/02/presentation.md) · [slides](output/sections/02/slides.md) |
| 3 | Modes (core) | ~9–10 | [presentation](output/sections/03/presentation.md) · [slides](output/sections/03/slides.md) |
| 4 | Rules + `AGENTS.md` | ~4–5 | [presentation](output/sections/04/presentation.md) · [slides](output/sections/04/slides.md) |
| 5 | Skills | ~2–3 | [presentation](output/sections/05/presentation.md) · [slides](output/sections/05/slides.md) |
| 6 | Workflows + close | ~2–4 | [presentation](output/sections/06/presentation.md) · [slides](output/sections/06/slides.md) |
| — | **Q&A** | **10** | Use parking lot below |

## Docs map by block (compact)

| Block | Primary docs |
| ----- | ------------ |
| **1** | [Quickstart](https://cursor.com/docs/get-started/quickstart.md), [Migrate from VS Code](https://cursor.com/help/getting-started/migrate-vscode.md), [Docs overview](https://cursor.com/docs.md) |
| **2** | [Agents window](https://cursor.com/docs/agent/agents-window.md), [Context](https://cursor.com/help/customization/context.md), [API keys](https://cursor.com/help/models-and-usage/api-keys.md), [Indexing](https://cursor.com/help/customization/indexing.md), [Ignore files](https://cursor.com/help/customization/ignore-files.md) |
| **3** | [Agent overview](https://cursor.com/docs/agent/overview.md), [Plan mode](https://cursor.com/docs/agent/plan-mode.md), [Debug mode](https://cursor.com/docs/agent/debug-mode.md) · Help: [Ask](https://cursor.com/help/ai-features/ask-mode.md), [Plan](https://cursor.com/help/ai-features/plan-mode.md), [Debug](https://cursor.com/help/ai-features/debug-mode.md) |
| **4** | [Rules](https://cursor.com/docs/rules.md), [Rules (Help)](https://cursor.com/help/customization/rules.md) |
| **5** | [Skills](https://cursor.com/docs/skills.md), [Skills (Help)](https://cursor.com/help/customization/skills.md) |
| **6** | [Browser tool](https://cursor.com/docs/agent/tools/browser.md), [MCP](https://cursor.com/docs/mcp.md), [Cloud agent](https://cursor.com/docs/cloud-agent.md), [Changelog](https://cursor.com/changelog.md) |

**Cheatsheet / Q&A only:** [Worktrees](https://cursor.com/docs/configuration/worktrees.md), [Search tool](https://cursor.com/docs/agent/tools/search.md), [Hooks](https://cursor.com/docs/hooks.md), [Plugins](https://cursor.com/docs/plugins.md), [CLI slash commands](https://cursor.com/docs/cli/reference/slash-commands.md), [Keyboard shortcuts](https://cursor.com/help/customization/keyboard-shortcuts.md).

## Speaking beats (compact)

### 1 — Intro (~4 min)

- Not every setting today—**when** Cursor helps day-to-day.  
- Cursor: **VS Code–compatible** + **AI-first** agent UI (not “just a wrapper”).  
- **Three takeaways:** find your way in **unfamiliar code** → **plan** bigger changes → **debug** more systematically.  
- **Shortcuts teaser:** show **Command Palette** (⌘⇧P / Ctrl+Shift+P) + **2–3** daily bindings (e.g. new chat, open agent panel, model picker)—full table on **[cheatsheet.md](cheatsheet.md)**.  

### 2 — Interface + `@` + context (~6 min)

- Agent / chat panel: **model** picker; optional **Bring-your-own-key** / providers → [API keys](https://cursor.com/help/models-and-usage/api-keys.md).  
- **One pass `@`:** files, folders, images, docs; optional `@Past Chats` / terminal if you demo.  
- **Enter** = queue next message; **⌘ Enter** / **Ctrl+Enter** = send now / interrupt-style urgency (UI labels vary—show live).  
- **Context window indicator** (usage **ring / circle** near the input): shows how much of the model **context budget** this chat is using. High fill → start a **fresh chat**, **commit** stable work, or trim `@` attachments—don’t rely on infinite thread memory.  
- **Compaction / summarization:** on long threads, the product may **compress** earlier turns to stay within limits—fine for continuity, risky if you needed **verbatim** earlier detail; mitigations = new chat + re-attach key files.  
- **Indexing** + **`.cursorignore`** (one sentence): smarter retrieval; exclude secrets/noise—[Indexing](https://cursor.com/help/customization/indexing.md), [Ignore files](https://cursor.com/help/customization/ignore-files.md).  

### 3 — Modes (~9–10 min)

- Mnemonic: **Ask** = understand · **Plan** = structure · **Agent** = do · **Debug** = find causes.  
- When **not** default Agent: questions-only → **Ask**; big change → **Plan** first.  
- Switcher + **Shift+Tab** (if enabled in your build)—verify live.  

### 4 — Rules + `AGENTS.md` (~4–5 min)

- **`@`** = one-off; **rules + `AGENTS.md`** = **defaults** every session.  
- **User / Team / Project** rules—follow current docs for precedence.  

### 5 — Skills (~2–3 min)

- Small reusable **playbooks** Cursor can load—[Skills](https://cursor.com/docs/skills.md).  
- Point to **cheatsheet** for `/` and discovery.  

### 6 — Workflows + close (~2–4 min)

- **A)** Foreign repo: Ask → Plan → Agent. **B)** UI/bug: image or browser context → Agent/Debug.  
- **~60 s MCP:** external tools/data—[MCP](https://cursor.com/docs/mcp.md).  
- **Cursor 3 (where to mention it):** end of talk, **Section 06** slides—one **teaser slide**: product moves in **generations** (Cursor 2 vs **Cursor 3**); **no feature list** unless you checked sources same week. Point to **[Changelog](https://cursor.com/changelog.md)** + official **cursor.com** posts; today’s UI may still be “2.x-style” for many teams.  
- **Handout:** [cheatsheet.md](cheatsheet.md) (shortcuts + modes).  

## Parking lot (Q&A)

- Deep Settings, hooks, full plugin matrix, spend limits, every model tier.  
- MCP server setup line-by-line.  
- Advanced worktrees / cloud agent setup.  
- Every variant of **slash** commands—send people to [CLI slash commands](https://cursor.com/docs/cli/reference/slash-commands.md) + in-app menu.  

## Iteration rules

1. Edit **this file** first.  
2. Update matching **`presentation.md` / `slides.md`**.  
3. Bump **version** + date here; note in **[output/changelog.md](output/changelog.md)**.  

## Nav — sections

- [Section 01](output/sections/01/presentation.md) · [02](output/sections/02/presentation.md) · [03](output/sections/03/presentation.md) · [04](output/sections/04/presentation.md) · [05](output/sections/05/presentation.md) · [06](output/sections/06/presentation.md)  
