# DH Studio website

## Stack

- **Language / Runtime**: TypeScript (`strict`), Node >= 22.12
- **Framework**: Astro 7 (pinned `7.3.8`), `output: 'static'`, React 19 islands via `@astrojs/react`
- **Key dependencies**: Tailwind CSS v4 (Vite plugin, tokens in `@theme`), Base UI (`@base-ui/react`), `motion`, lucide, Astro content collections
- **Package manager**: Bun (`bun.lock` committed)
- **Hosting**: Vercel Git integration, static `dist/`, no adapter, no backend (spec 0001)

## Build approach

**Tracer Bullet**: prove one real, working thread end to end first, then thicken it one strand at a time.

## Commands

```bash
bun install         # install
bun run dev         # dev server (agents: use background mode, see Development)
bun run build       # production build to dist/
bun run typecheck   # astro check
bun run preview     # serve the build
# lint, format and test scripts arrive with /develop tooling (see Tooling)
```

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title.md`. The scope lives in `docs/scope/scope.md`.

## Rules

- Functional style: pure functions by default; side effects (fetch, DOM, storage) stay at the edges and explicit. No classes where a function works.
- Immutable data: `const` and `readonly`, no mutation in place, module level values are constants only.
- Expected failures (release fetch, missing data) return a result or a typed fallback, never a thrown exception.
- Islands rule: a `.tsx` island in `src/islands/` only for real interactivity (pointer, scroll, state). Static visuals, including the 3D layering, stay in `.astro` with CSS. Islands take serializable props only; prefer `client:visible` or `client:idle` over `client:load`.
- Folders follow spec 0001: `pages/`, `layouts/`, `components/` (.astro), `islands/` (.tsx), `content/`, `styles/`, `lib/` (plain TS helpers).
- Named exports only in `.ts` and `.tsx`; `.astro` components and pages are default by nature.
- WCAG AA on every UI piece: visible focus, full keyboard use, AA contrast in both themes, a `prefers-reduced-motion` fallback for every effect.
- Themes are token swaps under `[data-theme]`; the inline head script in `src/layouts/BaseLayout.astro` sets it before paint.
- Env vars are declared with a schema via `astro:env` and validated at build time.
- Conventional commit messages (`feat:`, `fix:`, `chore:`).

## Tooling

Chosen by /audit, installed by `/develop tooling`:
- Lint and format: ESLint flat config (typescript-eslint, eslint-plugin-astro, react hooks) plus Prettier (prettier-plugin-astro, prettier-plugin-tailwindcss), matching dh-studio.
- Pre-commit hook: ESLint and Prettier on staged files, plus `astro check`.
- Tests: Vitest unit tests for `src/lib/` helpers, kept in a `test/` folder that mirrors `src/lib/` (not next to the source); pages and islands are checked with `/check verify`.
- CI: none yet; Vercel's build is the only gate.

## Git

- integration: off

## Agent skills

- [frontend-design](.agents/skills/frontend-design/): source not recorded, visual direction and typography; use for the design system feature (#4), not the scaffold
- [react-flow-usage](.agents/skills/react-flow-usage/): xyflow team, React Flow patterns; not part of the site stack, load only if a flow diagram is ever built

Declined: Agent Skill and MCP discovery for the site stack (during /architect, spec 0001)

## Context files

<!-- Nested AGENTS.md files are listed here as they are created -->

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
