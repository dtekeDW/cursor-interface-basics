# Skill: Vue 3 Patterns (Composition API, `<script setup>`)

## Goal
Build maintainable Vue 3 UI in `weather-app` using Composition API conventions that match this repo: TypeScript-first, small components, composables for shared logic, and explicit state naming.

## When To Use
- Creating or refactoring pages, layouts, and components under `weather-app/`.
- Extracting repeated logic into `composables/useXxx.ts`.
- Deciding where state should live (local vs composable vs Pinia—if introduced later).

## Source-of-Truth Patterns
- **`<script setup lang="ts">`** for all new components.
- **`defineProps` / `defineEmits`** with types; prefer `type` aliases for prop/emits shapes.
- **Composables** named `useSomething` in `composables/` for reusable state and side effects.
- **Presentational vs container**: keep dumb UI in leaf components; pass data and callbacks as props.

## Implementation Rules
1. Prefer **`type`** over `interface` for component props and local shapes (repo convention).
2. Avoid **classes and enums**; use composables, `const` maps, and literal unions.
3. Name async and boolean state clearly: `isLoading`, `hasError`, `canSubmit`, `pendingSave`.
4. Keep **templates declarative**—move branching and heavy formatting into `computed` or small functions.
5. **One main responsibility** per component; split when a file handles layout + data + formatting all at once.
6. Use **Nuxt auto-imports** for Vue APIs and project composables; avoid redundant manual imports unless ESLint requires clarity.
7. Prefer **keyed lists** (`v-for` with stable `:key`); avoid index keys when identity is known.

## Props & Events Template

```vue
<script setup lang="ts">
type Props = {
  title: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  submit: [value: string]
}>()
</script>
```

## Composable Template

```ts
// composables/useWeatherQuery.ts
export function useWeatherQuery(initialCity: string) {
  const city = ref(initialCity)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function refresh() {
    isLoading.value = true
    error.value = null
    try {
      // await $fetch or useFetch wrapper
    }
    catch (e) {
      error.value = e instanceof Error ? e : new Error('Unknown error')
    }
    finally {
      isLoading.value = false
    }
  }

  return { city, isLoading, error, refresh }
}
```

## Splitting Guidelines
| Situation | Action |
|-----------|--------|
| Same logic in 2+ components | Move to `composables/useXxx` |
| Large template | Extract subcomponents or slots |
| Complex derived UI values | `computed` |
| Imperative DOM (rare) | `ref` + careful lifecycle |

## Anti-Patterns
- Giant components with dozens of refs and no composable extraction.
- Mutating props or relying on implicit parent state without documenting the contract.
- Deep `watch` chains where a single `computed` or data fetch would suffice.

## Done Criteria
- `<script setup lang="ts">` with typed props/emits where applicable.
- Shared logic lives in composables; components stay readable.
- State names match repo conventions and are easy to grep.
