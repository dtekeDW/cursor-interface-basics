# Skill: Nuxt API Endpoint Builder (GET/POST with Cache)

## Goal
Implement production-ready Nuxt server endpoints in `weather-app/server/api` that follow Nuxt/Nitro docs and include sensible caching for read-heavy routes.

## When To Use
- Adding a new endpoint (`GET`, `POST`, etc.)
- Wrapping third-party APIs behind your Nuxt server
- Introducing cache for expensive or rate-limited reads (for weather: 15 minutes)

## Source-of-Truth Patterns
- Nuxt server routes: `defineEventHandler` in `server/api/*`
- Nitro cache: `cachedEventHandler` for route-level response caching
- Route rules alternative: `routeRules` with `cache` or `swr` when broad path-level caching is needed

## Implementation Rules
1. Place endpoint files in `weather-app/server/api` with method suffix naming:
   - `weather.get.ts`
   - `weather.post.ts`
2. For cacheable GET endpoints, use `cachedEventHandler` and set:
   - `maxAge: 60 * 15`
   - `swr: true`
3. Read secrets/API keys only from `useRuntimeConfig(event)`.
4. Validate and normalize inputs (`city`, `lat`, `lon`, etc.).
5. Return stable JSON response shape.
6. Throw proper HTTP errors using `createError`.

## Output Contract
Return this shape for success:

```json
{
  "data": {},
  "meta": {
    "cached": true,
    "maxAge": 900,
    "source": "open-meteo"
  }
}
```

Return this shape for errors:

```json
{
  "error": {
    "code": "BAD_REQUEST",
    "message": "city is required"
  }
}
```

## Templates

### 1) Cached GET endpoint (15 min)

```ts
// weather-app/server/api/weather.get.ts
export default cachedEventHandler(async (event) => {
  const query = getQuery(event)
  const city = String(query.city || '').trim()

  if (!city)
    throw createError({ statusCode: 400, statusMessage: 'city is required' })

  const config = useRuntimeConfig(event)
  const baseUrl = config.public.weatherApiBase || 'https://api.open-meteo.com/v1'

  const result = await $fetch(`${baseUrl}/forecast`, {
    query: {
      // map city -> coordinates in your own resolver if needed
      latitude: 52.52,
      longitude: 13.41,
      current: 'temperature_2m,wind_speed_10m',
    },
  })

  return {
    data: result,
    meta: {
      cached: true,
      maxAge: 60 * 15,
      source: 'open-meteo',
    },
  }
}, {
  maxAge: 60 * 15,
  swr: true,
})
```

### 2) POST endpoint (no response cache by default)

```ts
// weather-app/server/api/preferences.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody<{ city?: string; unit?: 'c' | 'f' }>(event)

  if (!body?.city)
    throw createError({ statusCode: 400, statusMessage: 'city is required' })

  // Persist using your storage/db layer
  return {
    data: {
      saved: true,
      city: body.city,
      unit: body.unit ?? 'c',
    },
    meta: {
      cached: false,
    },
  }
})
```

## Optional: Path-level caching in `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  routeRules: {
    '/api/weather/**': {
      cache: { maxAge: 60 * 15 },
    },
  },
})
```

## Frontend Consumption
Use `useFetch('/api/weather', { query: { city: 'Berlin' } })` in pages/components.
Use `$fetch` for event-driven calls.

## Done Criteria
- Endpoint created in `server/api`
- Input validated
- Runtime config used for secrets/base URLs
- GET caching configured (15 minutes for weather)
- JSON response shape is stable
