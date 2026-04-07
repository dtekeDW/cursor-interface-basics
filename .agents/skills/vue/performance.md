# Skill: Vue & Nuxt Performance (LCP, CLS, INP)

## Goal
Keep `weather-app` fast for real users: smaller reactive graphs, fewer wasted renders, stable layout, and media that does not block the critical path.

## When To Use
- Auditing a page or component for Web Vitals regressions.
- Adding images, charts, maps, or heavy third-party scripts.
- Refactoring hot paths (large lists, frequent updates, expensive computeds).

## Source-of-Truth Patterns
- **Nuxt**: route-level code splitting by default; prefer `NuxtImage` / `NuxtPicture` for raster assets.
- **Vue 3**: reactivity is proxy-based—large reactive objects and deep trees cost more than small, flat state.
- **INP**: keep event handlers light; defer heavy work with `requestIdleCallback` / `queueMicrotask` / splitting work only when measured necessary.

## Implementation Rules
1. **Shrink reactive surface**: store only what the UI needs; derive the rest with `computed`.
2. **Prefer `computed`** over repeated work in templates (formatting, filtering, sorting).
3. **Lazy-load** heavy components with `defineAsyncComponent` or Nuxt’s route/component lazy patterns when bundles are large.
4. **Images**: use width/height or aspect containers to avoid **CLS**; prefer modern formats via Nuxt Image where configured.
5. **Lists**: virtualize only when profiling shows list size is the bottleneck (avoid premature abstraction).
6. **Keys**: stable `key` on `v-for` to help diffing; avoid unnecessary full list re-renders.
7. **Third-party scripts**: load non-critical scripts after interaction or idle when using `@nuxt/scripts` or similar—follow project config.

## Quick Audit Checklist
- [ ] Largest image on the route is optimized and sized (LCP candidate).
- [ ] No layout jump when fonts/images/async blocks appear (CLS).
- [ ] Click/input handlers do minimal synchronous work (INP).
- [ ] No accidental deep reactivity on huge JSON blobs unless needed.

## Patterns

### 1) Computed instead of template work

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const items = ref<Item[]>([])
const filter = ref('')

const visibleItems = computed(() =>
  items.value.filter(i => i.name.toLowerCase().includes(filter.value.toLowerCase())),
)
</script>
```

### 2) Async component for heavy UI

```ts
import { defineAsyncComponent } from 'vue'

const HeavyChart = defineAsyncComponent(() => import('~/components/HeavyChart.vue'))
```

### 3) Reserve space for async content (CLS)

```vue
<!-- Parent provides min-height or aspect ratio so late content does not jump -->
<div class="min-h-48 md:min-h-64">
  <ClientOnly>
    <LazyWidget />
  </ClientOnly>
</div>
```

*(Adjust utilities to match UnoCSS/Tailwind classes in the project.)*

## Anti-Patterns
- Storing entire API responses in reactive state when only two fields are displayed.
- Running expensive regex or JSON parsing on every render via the template.
- Loading large client-only bundles on the critical path without measurement.

## Done Criteria
- Measured or reasoned improvement tied to user-visible metrics (LCP/CLS/INP).
- Reactive state is minimal; computeds document derived data.
- Media and async regions do not destabilize layout without a documented tradeoff.
