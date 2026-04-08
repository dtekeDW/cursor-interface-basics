# Skills Directory

Project skills live under `.agents/skills/` so Cursor can auto-discover them (same scope as `.cursor/skills/`; see [Skills](https://cursor.com/docs/skills)).

Reusable capability docs grouped by domain:
- `.agents/skills/vue/*`
- `.agents/skills/nuxt/*`
- `.agents/skills/testing/*`
- `.agents/skills/vercel/*`
- `.agents/skills/common/*`
- `.agents/skills/doc/*`
- `.agents/skills/playwright/*`
- `.agents/skills/screenshot/*`
- `.agents/skills/slides/*`
- `.agents/skills/frontend-skill/*`

Agents reference these files as their execution toolbox. Folders that include a `SKILL.md` with YAML frontmatter match Cursor’s first-class skill format; other `.md` files remain valid playbooks referenced from `AGENTS.md` and `agents/*.md`.

| Playbook | Focus |
|----------|--------|
| `nuxt/api-endpoint-builder.md` | Cached GET/POST endpoints, JSON contracts |
| `nuxt/data-fetching.md` | `useFetch` / `useAsyncData` / `$fetch` |
| `nuxt/server-api.md` | Server layer, config, validation, security |
| `vue/patterns.md` | Composition API, composables, structure |
| `vue/performance.md` | LCP, CLS, INP-oriented patterns |
| `testing/unit-testing.md` | Vitest-style unit tests for composables and UI |
| `common/checklists/task-delivery.md` | Pre-handoff checklist |
| `common/templates/task-brief.md` | Scope template before coding |
