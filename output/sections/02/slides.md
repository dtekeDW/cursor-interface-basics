---
marp: true
paginate: true
footer: 'Cursor basics — Section 02'
---

# Interface + context

Panel · model · `@` · **context ring** · [Agenda](../../../workshop.md)

---

# Panel & model

- **Model** picker in chat/agent UI.
- Optional **BYOK / providers** — [API keys](https://cursor.com/help/models-and-usage/api-keys.md)

---

# `@` (one pass)

| Use | Why |
| --- | --- |
| Files / folders | Scope |
| Docs / images | Specs & UI |

[Context](https://cursor.com/help/customization/context.md)

---

# Queue vs interrupt

- **Enter** → message **queues** after current work.
- **⌘ Enter / Ctrl+Enter** → **now** (urgent fix)—labels vary.

---

# Context ring + compaction

- **Ring / circle** = **context window** fill (this chat’s **token budget**).
- **High?** New chat · smaller `@` · **commit** stable work.
- **Compaction:** old turns may be **summarized**—critical facts → **re-attach** files or new thread.

---

# Indexing (one line)

- Codebase **index** powers smart search—control noise with **`.cursorignore`**.

[Indexing](https://cursor.com/help/customization/indexing.md) · [Ignore](https://cursor.com/help/customization/ignore-files.md)

→ **Section 03 — Modes**
