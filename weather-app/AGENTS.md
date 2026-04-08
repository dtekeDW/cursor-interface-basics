# AGENTS.md (weather-app)

App-specific instructions for `weather-app`.

## Commands
- Install: `pnpm install`
- Dev: `pnpm dev`
- Build: `pnpm build`
- Generate: `pnpm generate`
- Preview: `pnpm preview`

## Tech Stack
- Nuxt 4 + Vue 3 + TypeScript
- UnoCSS with `presetWind4`
- Tailwind v4 reset via `@unocss/reset/tailwind-v4.css`
- Always use TSDOC whenever we add code in manner of logic that is longer than a couple lines of code

## Coding Conventions
- Use `<script setup lang="ts">`
- Keep page components thin and move logic into composables
- Prefer `type` aliases over `interface`
- Avoid Options API unless explicitly requested

## Styling Conventions
- Utility-first styling by default
- Prefer UnoCSS utility classes over handcrafted CSS rules
- Keep class usage as UnoCSS-agnostic as practical to stay portable
- Use normal CSS only when utility classes are insufficient

## Structure Guidance
- `app/`: app shell
- `pages/`: routes
- `components/`: presentational and container components
- `composables/`: reusable state/logic (`useXxx`)
- `server/api/`: server endpoints and sensitive operations
- `plugins/`: global plugin wiring

## Data Fetching
- `useFetch`: standard SSR-aware fetching
- `useAsyncData`: composed/advanced fetching
- `$fetch`: event-driven client calls

## Performance
- Use lazy component loading where helpful
- Use `NuxtImage` for optimized images
- Keep hydration cost low; avoid unnecessary client-only logic
