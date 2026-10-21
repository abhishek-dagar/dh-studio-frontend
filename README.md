# DH Studio website

The public website for [DH Studio](https://github.com/OnlyDev-India/data-hive-studio), a fast native desktop client for SQLite, PostgreSQL, MongoDB, and Amazon DocumentDB.

Static Astro site with React islands, Tailwind CSS v4, deployed on Vercel. Specs and scope live outside this repo, in the workspace root's `frontend-docs/` folder: see `frontend-docs/specs/0001-site-stack-architecture.md` for the stack decision and `frontend-docs/scope/scope.md` for the plan.

## Develop

```sh
bun install
bun run dev        # local dev server
bun run typecheck  # astro check (TypeScript strict)
bun run test       # vitest unit tests
bun run build      # static output in dist/, then Pagefind search index
bun run preview    # serve the built site
```

Docs search uses [Pagefind](https://pagefind.app), which indexes the built site, so search only works after `bun run build` (use `bun run preview` to try it, not `bun run dev`).

## Pages

| Route | Source |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/features` | `src/pages/features.astro` |
| `/download` | `src/pages/download.astro` |
| `/changelog` | `src/pages/changelog/` |
| `/docs` | `src/pages/docs/` (install, connect and app guides) |
| `/privacy` | `src/pages/privacy.astro` |
