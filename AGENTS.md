# AGENTS.md

This is the primary entrypoint for agent behavior in this repository.

## Scope
- Root: `/Users/dteke/Developer/TechTalk/cursor-interface-basics`
- App override: `weather-app/AGENTS.md`

## Project Context
- Workshop workspace with one active Nuxt app under `weather-app/`
- Main stack: Nuxt 4, Vue 3, TypeScript, UnoCSS, Tailwind-style utilities
- Goal: practical, readable, maintainable examples

## Folder Strategy
- `agents/`: role-specific agent instructions
- `skills/`: reusable implementation skills and checklists
- `skills/external/`: imported third-party skills (local project copy)

## Required Reading Order
1. `AGENTS.md`
2. `agents/frontend-agent.md` (default)
3. `weather-app/AGENTS.md` when working inside app code
4. Relevant files from `skills/**`

## Core Rules
- Use TypeScript throughout
- Prefer `type` aliases over `interface`
- Avoid classes and enums; use composables, const maps, and pure helpers
- Use Vue Composition API and `<script setup lang="ts">`
- Keep code modular, DRY, and explicit
- Use descriptive state names like `isLoading`, `hasError`, `canSubmit`

## Nuxt Rules
- Follow Nuxt structure (`pages/`, `components/`, `composables/`, `server/`)
- Use Nuxt auto-imports
- Use `useFetch` for standard SSR-aware data
- Use `useAsyncData` for composed/advanced data flows
- Use `$fetch` in event handlers/client-only flows
- Use `useHead` and `useSeoMeta` for SEO
- Keep sensitive logic in `server/api`
- Use `useRuntimeConfig` for runtime/env settings

## Styling Rules
- UnoCSS with Tailwind presets is in use (see `weather-app/uno.config.ts`)
- Prefer utility-first styling in templates
- Prefer UnoCSS-agnostic utility class patterns instead of custom CSS
- Avoid writing normal CSS unless utilities cannot express the requirement
- Mobile-first responsive classes by default

## UI and Performance
- Prefer Nuxt UI + utility classes for fast composition
- Use Shadcn Vue / Radix Vue when low-level primitives are needed
- Use `NuxtImage`/`NuxtPicture` and Nuxt Icons where relevant
- Optimize for Web Vitals (LCP, CLS, INP)

## Verification
- Run relevant checks before handoff:
  - `pnpm --dir weather-app dev`
  - `pnpm --dir weather-app build` (when needed)

## Handoff
- Summarize what changed and why
- Include verification performed
- Reference changed files with absolute paths
