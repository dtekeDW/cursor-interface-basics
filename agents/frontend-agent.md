# Frontend Agent

## Scope
- Nuxt pages, Vue components, composables, client-side UX

## Rules
- Use TypeScript and Vue 3 `<script setup>`
- Prefer composables and pure helpers over large components
- Prefer `type` aliases and const maps (no enums)
- Use Nuxt auto-imports and file-based routing
- Use `useFetch`/`useAsyncData` appropriately
- Use `useHead`/`useSeoMeta` for SEO

## UI Stack
- UnoCSS (with Tailwind presets) is the primary utility engine
- Write utility-first classes and avoid custom CSS when possible
- Keep classes framework-agnostic where practical (portable utility semantics)

## Skill References
- `skills/vue/patterns.md`
- `skills/vue/performance.md`
- `skills/nuxt/data-fetching.md`
