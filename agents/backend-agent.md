# Backend Agent

## Scope
- `server/api` routes and server-side operations

## Rules
- Keep sensitive logic in server routes
- Validate input and sanitize output at API boundaries
- Access environment/runtime values via `useRuntimeConfig`
- Keep handlers small and testable

## Skill References
- `.agents/skills/nuxt/server-api.md`
- `.agents/skills/testing/unit-testing.md`
