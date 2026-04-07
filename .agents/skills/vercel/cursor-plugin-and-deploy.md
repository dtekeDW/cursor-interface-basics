# Skill: Vercel Cursor-Plugin und Deploy-Workflow (weather-app)

## Goal
Install the official **Vercel** open-plugin for Cursor (skills, slash commands, agents), keep **ESLint** correct for Vue + TypeScript SFCs, and run a repeatable **lint → typecheck → build → deploy** path for the Nuxt app in `weather-app/`.

## When To Use
- User asks to add or refresh the **Vercel Cursor plugin** / `vercel/vercel-plugin`.
- Automating or documenting **pre-deploy checks** (`pnpm lint`, typecheck, production build).
- **ESLint** reports parse errors on `.vue` files (`import type`, `defineProps<…>()`) in this repo.
- Deploying **weather-app** to Vercel.

## Install Vercel Cursor plugin

From the **repository root** (or any cwd; adjust paths):

```bash
npx plugins add vercel/vercel-plugin --target cursor --scope project -y
```

**Why `--target cursor`:** In environments where the `cursor` binary is not on `PATH`, auto-detection fails with “No supported targets detected”. Explicit target avoids that.

**Scopes:** `project` installs for this repo; `user` installs for the current user (CLI default). After install, **restart Cursor** or reload agent tools so skills and commands load.

**Note:** Plugin metadata may live under Cursor’s config (e.g. marketplace registration); not all files are guaranteed to appear as committed repo files.

## Checks before deploy (this repo)

| Command | Runs |
|--------|------|
| `pnpm lint` | `eslint .` in `weather-app/` |
| `pnpm typecheck` | `nuxi typecheck` in `weather-app/` |
| `pnpm build` | `nuxt build` in `weather-app/` |

Root `package.json` forwards these into `weather-app/` via `pnpm --dir weather-app …`.

## ESLint + TypeScript in Vue SFCs

`@antfu/eslint-config` enables the TypeScript parser for Vue when TypeScript support is on. If `typescript` is not listed as a direct dependency, auto-detection can stay off and **`.vue` scripts parse as JS**, causing errors on `import type` and generics.

**Fix used in this repo:** `weather-app/eslint.config.js` sets `typescript: true` in `antfu({ … })`, and `typescript` / `vue-tsc` are devDependencies for `nuxi typecheck`.

## Deploy to Vercel

From `weather-app/` with Vercel CLI logged in:

```bash
npx vercel deploy --prod
```

First link creates `.vercel/` (ignored in `weather-app/.gitignore`). On Vercel’s builders, Nuxt typically uses the **vercel** Nitro preset; local default may still be **node-server**—both can succeed; align `nuxt.config` / `NITRO_PRESET` if you need identical output.

## Optional: i18n / sitemap warnings

`nuxt-i18n` and `@nuxtjs/sitemap` may warn until `defaultLocale` / `locales` are configured. They do not block lint, typecheck, or build by default.
