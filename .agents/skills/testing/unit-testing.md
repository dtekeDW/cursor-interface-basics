# Skill: Unit Testing (Vitest, Vue Test Utils) — Nuxt-Friendly

## Goal
Write fast, deterministic unit tests for composables, pure helpers, and focused component behavior—aligned with Vue 3 and Nuxt 4 patterns used in `weather-app`, ready for when the project wires Vitest (or an existing runner).

## When To Use
- Testing **pure functions** and **composables** (highest ROI).
- Verifying **component contracts**: props in → DOM or emitted events out.
- Guarding **regression-prone** formatting, validation, and mapping logic.

## Source-of-Truth Patterns
- **Vitest** as the default unit runner for Vite/Nuxt ecosystems (add `@vue/test-utils` for components).
- **Mock at boundaries**: `$fetch`, `useFetch`, clocks, `localStorage`, and external modules—not Vue’s reactivity.
- **Arrange–Act–Assert** with readable names: `it('disables submit while pending', ...)`.

## Implementation Rules
1. Prefer testing **behavior** (user-visible outcomes) over implementation details (internal ref names).
2. **One logical behavior** per test; avoid giant integration-style tests in the unit layer.
3. **Stable selectors**: prefer roles/labels (`getByRole`) when using testing-library style helpers; if using VTU alone, use `data-testid` sparingly for stable hooks.
4. **Time**: use fake timers when testing debounce/throttle or polling.
5. **Async**: always `await` flush promises / `nextTick` where the component schedules updates.
6. **Snapshots**: only for stable, low-churn output (e.g. serialized config); avoid huge DOM snapshots.

## Folder Conventions (Suggested)

```
weather-app/
├── composables/__tests__/useWeatherQuery.spec.ts
├── utils/__tests__/formatters.spec.ts
└── components/__tests__/WeatherCard.spec.ts
```

Adjust to match the repo once `vitest` and `test` script exist in `package.json`.

## Templates

### 1) Pure function test (Vitest)

```ts
import { describe, expect, it } from 'vitest'
import { normalizeCity } from '../normalizeCity'

describe('normalizeCity', () => {
  it('trims and lowercases input', () => {
    expect(normalizeCity('  Berlin  ')).toBe('berlin')
  })
})
```

### 2) Composable test (Vue test utils + reactive root)

```ts
import { describe, expect, it } from 'vitest'
import { useWeatherQuery } from '../useWeatherQuery'

describe('useWeatherQuery', () => {
  it('starts with loading false', () => {
    const { isLoading } = useWeatherQuery('Berlin')
    expect(isLoading.value).toBe(false)
  })
})
```

### 3) Component smoke + interaction (sketch)

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MyButton from '../MyButton.vue'

describe('MyButton', () => {
  it('emits click', async () => {
    const wrapper = mount(MyButton, { props: { label: 'Go' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
```

## Mocking `$fetch` / network
- In composable tests, prefer **injecting** a fetch function or wrapping `$fetch` behind a small module you can mock.
- Avoid global mocks unless the test file owns the lifecycle (`vi.restoreAllMocks()` in `afterEach`).

## What Not To Do In Unit Tests
- Full Nuxt app boot for every test (use higher-level tests or targeted harnesses instead).
- Asserting on CSS class strings unless they encode behavior contracts.
- Coupling tests to component **internal** private refs when a public prop/emit/assertable DOM would do.

## Done Criteria
- Tests are deterministic (no real network, no real clock without fakes).
- Failures point to a single behavior change.
- Mocks are scoped and cleaned up; composables and pure logic have coverage where risk is highest.
