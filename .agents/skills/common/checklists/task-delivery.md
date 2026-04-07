# Skill: Task Delivery Checklist (Handoff-Ready Changes)

## Goal
Close a task in `weather-app` (or repo-wide work) with changes that match requirements, stay within scope, and ship with a clear handoff: what changed, why, and how it was verified.

## When To Use
- Before marking a feature or fix complete.
- Before opening a PR or handing work to another person.
- After non-trivial refactors touching Nuxt server or client boundaries.

## Preconditions
- Requirements are understood (or gaps are explicitly documented).
- Scope is frozen enough to avoid endless churn (note follow-ups separately).

## Checklist

### 1) Product & behavior
- [ ] Implemented behavior matches the agreed acceptance criteria.
- [ ] Edge cases called out in the task are handled or explicitly deferred with a short note.
- [ ] User-visible errors and loading states are reasonable (no silent failures).

### 2) Code quality (repo conventions)
- [ ] TypeScript used; `type` preferred over `interface` where applicable.
- [ ] No unnecessary abstractions; duplication avoided without over-engineering.
- [ ] Naming matches existing patterns (composables `useXxx`, state `isLoading` / `hasError`, etc.).
- [ ] Nuxt boundaries respected: sensitive logic in `server/`, config via `useRuntimeConfig`.

### 3) Security & data
- [ ] No secrets in client bundles or public runtime config unless intentional.
- [ ] Server routes validate inputs; error responses do not leak internals.

### 4) Performance & UX
- [ ] Data fetching uses appropriate primitives (`useFetch` / `useAsyncData` / `$fetch` per data-fetching skill).
- [ ] No obvious CLS/LCP regressions (images, async shells, layout).

### 5) Verification
- [ ] `pnpm --dir weather-app dev` runs for manual checks when UI changed.
- [ ] `pnpm --dir weather-app build` passes when routes, server, or config changed.
- [ ] Tests run if the repo has a test script and the change touches covered code.

### 6) Handoff
- [ ] Summary lists **what** changed and **why** (not only file names).
- [ ] Changed files referenced with **absolute paths** (repo convention).
- [ ] Follow-ups and known limitations noted briefly.

## Outcome Contract
A task is “delivered” when another developer can:
1. Read the handoff and understand intent without replaying the whole chat.
2. Run the app/build and get a green path for the touched areas.
3. See where to continue if work is partial (explicit TODOs or tickets).

## Anti-Patterns
- “Done” without running dev or build when the change could break compile or SSR.
- Huge PRs mixing unrelated refactors with the feature.
- Handoff that only says “updated files” with no behavioral summary.
