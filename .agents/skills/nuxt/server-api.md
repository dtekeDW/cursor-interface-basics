# Skill: Nuxt Server Layer (API, Config, Secrets)

## Goal
Keep sensitive logic and I/O on the server in `weather-app/server` (and Nitro conventions) so the client receives only safe, typed, predictable payloads.

## When To Use
- Adding or changing `server/api` routes, middleware, or server-only utilities.
- Reading API keys, OAuth secrets, or upstream base URLs that must not ship to the browser.
- Validating inbound requests before touching databases or third-party APIs.
- Sharing behavior between multiple endpoints (helpers in `server/utils` or similar).

## Relationship To Other Skills
- For **endpoint shape, caching, and JSON contracts**, see `api-endpoint-builder.md` in this folder.
- This skill covers **cross-cutting server concerns**: config, validation mindset, structure, and security defaults.

## Source-of-Truth Patterns
- **Routes**: `server/api/**/*.ts` with `defineEventHandler` (and `cachedEventHandler` when caching reads).
- **Secrets**: `useRuntimeConfig(event)` on the server; public values under `runtimeConfig.public` only when intentionally exposed.
- **Errors**: `createError({ statusCode, statusMessage })` for HTTP semantics; avoid leaking stack traces or internal keys in responses.

## Implementation Rules
1. **Never** read private env vars in Vue components; only in server routes, server middleware, or Nitro plugins.
2. **Validate early**: query, route params, and `readBody` payloads—reject with 400-level errors and clear messages.
3. **Normalize** inputs (trim strings, clamp numbers, default safe values) before calling upstream APIs.
4. **Return stable JSON** shapes so the client and tests do not depend on incidental ordering or optional fields appearing/disappearing.
5. **Log** on the server for debugging (without logging secrets); avoid `console.log` of tokens in shared code paths.
6. Extract repeated logic into **pure helpers** under `server/utils` or domain modules; keep handlers thin.

## Folder Conventions (Typical)

```
weather-app/server/
├── api/           # HTTP routes → defineEventHandler
├── middleware/    # Request guards, CORS, logging (as needed)
└── utils/         # Shared server-only helpers
```

## Templates

### 1) Minimal GET handler with validation

```ts
// server/api/example.get.ts
export default defineEventHandler((event) => {
  const q = getQuery(event)
  const id = String(q.id ?? '').trim()

  if (!id)
    throw createError({ statusCode: 400, statusMessage: 'id is required' })

  return { data: { id }, meta: { ok: true } }
})
```

### 2) Runtime config for upstream URL (private)

```ts
const config = useRuntimeConfig(event)
const base = config.weatherUpstreamBase
if (!base)
  throw createError({ statusCode: 500, statusMessage: 'Server misconfigured' })

return await $fetch(`${base}/path`, { query: { ... } })
```

### 3) Typed body for POST

```ts
type Body = { city?: string }

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)
  const city = String(body?.city ?? '').trim()
  if (!city)
    throw createError({ statusCode: 400, statusMessage: 'city is required' })
  return { data: { received: city } }
})
```

## Security Checklist
- [ ] No secrets in `runtimeConfig.public` unless they are truly public.
- [ ] Inputs validated; file uploads and large bodies bounded if applicable.
- [ ] Errors return safe messages; no internal paths or env values.

## Done Criteria
- Server-only data stays on the server.
- Handlers validate input and use consistent JSON shapes.
- Runtime config used correctly for environment-specific values.
- Helpers extracted when the same logic appears twice.
