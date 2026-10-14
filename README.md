# DH Studio website

The public website for [DH Studio](https://github.com/OnlyDev-India/data-hive-studio), a fast native desktop client for SQLite, PostgreSQL, MongoDB, and Amazon DocumentDB.

Static Astro site with React islands, Tailwind CSS v4, deployed on Vercel. See `docs/specs/0001-site-stack-architecture.md` for the stack decision and `docs/scope/scope.md` for the plan.

## Develop

```sh
bun install
bun run dev        # local dev server
bun run typecheck  # astro check (TypeScript strict)
bun run build      # static output in dist/
bun run preview    # serve the built site
```
