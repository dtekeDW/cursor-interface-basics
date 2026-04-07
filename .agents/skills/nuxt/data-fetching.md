# Skill: Nuxt Data Fetching (`useFetch` / `useAsyncData` / `$fetch`)

## Goal
Load data in Nuxt pages, layouts, and composables using the right primitive so requests are SSR-correct, deduplicated where appropriate, and easy to reason about in `weather-app` (or any Nuxt 4 app).

## When To Use
- Page or layout needs data that should render on the server **and** stay in sync on the client.
- Multiple composables or keys need to be composed into one async story.
- User actions (click, submit) should trigger fetches without tying them to route lifecycle.
- You need to skip SSR, delay loading, or refresh keyed data after navigation.

## Source-of-Truth Patterns
- **`useFetch`**: Same-key requests are deduplicated; fits URL-driven, resource-shaped data tied to a component’s lifecycle.
- **`useAsyncData`**: Use when the fetch is not a simple URL string, or you need full control over the async function and error handling while still using Nuxt’s async data layer.
- **`$fetch`**: Nuxt’s fetch client for imperative calls—typically in event handlers, plugins, or server code; on the client it does not automatically integrate with SSR payload unless you wire it yourself.

## Implementation Rules
1. Prefer **`useFetch`** when the primary input is a URL (and optional query) and you want SSR + hydration out of the box.
2. Prefer **`useAsyncData`** when you combine sources, map/transform heavily, or wrap non-HTTP async work that must participate in SSR.
3. Use **`$fetch`** in handlers (`onMounted` is not for SSR data—use `useFetch`/`useAsyncData` for initial page data).
4. Always choose a **stable string key** for `useAsyncData` (and meaningful keys for `useFetch` when using custom logic).
5. Surface loading/error with clear names: `pending`, `error`, `status` (or project conventions like `isLoading` / `hasError`).
6. For client-only data, set **`server: false`** explicitly and document why (e.g. browser-only APIs).
7. Use **`lazy: true`** when the UI should paint first and the block is non-critical (below the fold, secondary panels).

## Key Options (Cheat Sheet)

| Need | Direction |
|------|-----------|
| Initial SSR data for a route | `useFetch` or `useAsyncData` with default SSR behavior |
| No SSR for this request | `server: false` |
| Defer until after first paint | `lazy: true` |
| Refetch when route param changes | reactive URL or `watch` + `refresh` / reactive query |
| Imperative action (button) | `$fetch` + local state |

## Templates

### 1) `useFetch` for a JSON API route

```ts
// e.g. weather-app/pages/index.vue — inside setup
const city = ref('Berlin')

const { data, error, pending, refresh } = await useFetch('/api/weather', {
  query: { city },
  watch: [city],
})
```

### 2) `useAsyncData` for composed logic

```ts
const { data, pending, error, refresh } = await useAsyncData(
  'dashboard-weather',
  async () => {
    const a = await $fetch('/api/weather', { query: { city: 'Berlin' } })
    // const b = await ...
    return { a }
  },
)
```

### 3) Client-only fetch

```ts
const { data, pending } = await useFetch('/api/something', {
  server: false,
  lazy: true,
})
```

### 4) Event-driven `$fetch` (no automatic SSR)

```ts
async function onSave() {
  pendingSave.value = true
  try {
    await $fetch('/api/preferences', { method: 'POST', body: form.value })
  }
  finally {
    pendingSave.value = false
  }
}
```

## Anti-Patterns
- Using `onMounted` + raw `fetch` for data that should appear in first HTML response (hurts SEO and LCP).
- Creating duplicate keys for the same logical resource (breaks deduplication and cache expectations).
- Ignoring `error` and `pending` in the template (CLS and UX regressions).

## Done Criteria
- Correct primitive chosen (`useFetch` vs `useAsyncData` vs `$fetch`).
- SSR behavior matches intent (`server`, `lazy` documented if non-default).
- Loading and error states are handled in the UI.
- Keys are stable and unique per logical resource.
