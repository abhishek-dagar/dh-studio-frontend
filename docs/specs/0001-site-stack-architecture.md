# 0001. Static Astro site with React islands on Vercel

**Date**: 2026-10-10
**Status**: In Progress

## Summary

The DH Studio website will be a static site built with Astro (a framework that ships plain HTML by default). Only the interactive bits, like the spatial parallax hero and the theme toggle, load as small React "islands" (components that hydrate on their own). Styling uses Tailwind CSS v4 with design tokens as CSS variables, interactive primitives come from Base UI, motion from the `motion` library, and the site deploys to Vercel on every push. This keeps the site fast and easy to find in search while you still write React, the same as in the desktop app.

## Context

The previous Next.js marketing site was deleted, so the repo starts empty. The site is public and exists to get developers to download a desktop app. That makes search visibility, social sharing and fast first paint the main forces. The scope sets WCAG AA and a Core Web Vitals budget from day one.

The visual direction is "grounded spatial": layered app windows in depth, soft light, pointer and scroll parallax, dark first with a light theme. Rich motion tends to fight a performance budget. Whatever renders the pages has to keep most of the page free of JavaScript and confine the motion to small, isolated pieces.

Content is mostly fixed copy plus release data (version, files per OS) from the GitHub Releases API, read at build time. How often the site picks up a new release is still open (see Follow-up).

The team is one developer who already works in React 19, TypeScript, Tailwind v4, Base UI, `motion`, lucide and Bun in the dh-studio app. Reusing that knowledge matters more than trying something new.

## Options considered

### Option 1: Astro static site with React islands, Tailwind v4, on Vercel

Pages are Astro components rendered to HTML at build time. Interactive pieces are React components hydrated per island.

**Pros**:
- Zero JS by default, so the performance budget is mostly met by construction (basis: islands architecture)
- First class Markdown and typed content collections for copy, FAQ and later changelog pages
- React islands reuse your existing React, `motion` and Base UI knowledge

**Cons**:
- Two component syntaxes (`.astro` and `.tsx`), with props crossing the island boundary that must be serializable
- State shared across islands needs a small extra mechanism (a nanostore or DOM events)

### Option 2: Next.js static export

Next.js 16 App Router with `output: 'export'`, React everywhere.

**Pros**:
- One component model, and it's what the old site used
- Huge ecosystem and docs

**Cons**:
- Ships the React runtime on every page, so hitting the performance budget with rich motion takes ongoing effort
- Static export disables server features (image optimization, ISR), which removes much of the reason to pick Next

### Option 3: Vite + React with prerendering

The same tooling as the desktop app's frontend, with a prerender plugin for static HTML.

**Pros**:
- Identical toolchain to dh-studio

**Cons**:
- Routing, head and SEO management, sitemap and content loading all have to be assembled by hand
- Full hydration of every page, same JS cost as Option 2

## Decision

**Chosen option**: Option 1: Astro static site with React islands, Tailwind v4, on Vercel

Build the site with Astro in static output mode, React only for interactive islands, Tailwind CSS v4 tokens for styling, Base UI for primitives, `motion` with CSS 3D for spatial effects, Bun for packages, deployed to Vercel through its Git integration.

**Implementation skills**: `frontend-design` (`.claude/skills/frontend-design/`, for the design system feature, not the scaffold)

## Rationale

The site's success depends on search, sharing and speed. A static, mostly JS free page satisfies all three without tuning. Islands keep the spatial motion in small pieces, so you can add depth without dragging the whole page's performance down. Next.js would work, but with static export you pay for the React runtime everywhere and lose the server features that justify it.

Every library choice except Astro itself (Tailwind v4, Base UI, `motion`, lucide, Bun) mirrors the dh-studio app. One developer moving between both repos keeps one mental model, and design ideas can move between the app and the site (basis: reuse what the team already runs). CSS 3D transforms plus `motion` give depth and parallax on the GPU without a WebGL scene. WebGL would be the biggest single threat to the performance budget and to phones.

Vercel was your pick over Cloudflare. It hosts static Astro output with no adapter, deploys each push automatically and gives preview URLs per branch. That costs nothing at this size.

## Proposed stack

| Layer | Choice | Reason |
|---|---|---|
| Architecture | Static multi page site, no backend | Content changes only on deploy, so a server would add cost and failure modes for nothing |
| Language | TypeScript, `strict` | Catches content schema and release data shape errors at build time |
| Framework | Astro, current stable major (pin the exact version at scaffold) | Zero JS by default, islands, content collections, built in sitemap and image tooling |
| Rendering | `output: 'static'`, prebuilt HTML | Best SEO and speed. Release data is read at build time |
| Interactive UI | React 19 islands via `@astrojs/react` | Hydrate only the spatial hero, theme toggle, accordion and similar. Prefer `client:visible` or `client:idle` over `client:load` |
| Styling | Tailwind CSS v4 through its Vite plugin, tokens as CSS variables in `@theme` | Same as the app. Dark and light themes are token swaps under `[data-theme]` |
| UI primitives | Base UI (`@base-ui/react`) | Same as the app, headless and accessible, styled with your tokens |
| Motion and depth | CSS 3D transforms and layered blur, plus `motion` inside islands | GPU friendly depth and parallax. Every effect has a `prefers-reduced-motion` fallback |
| Icons | lucide (`lucide-react` in islands, inline SVG in `.astro`) | Same set as the app, tree shaken |
| Theme switching | Inline blocking script in `<head>` sets `data-theme` from saved choice, else the system setting | No flash of the wrong theme on static HTML |
| Content | Astro content collections (Markdown and YAML with a schema) | Typed copy for features and FAQ, reused later by changelog and docs |
| Package manager | Bun, `bun.lock` committed | Same as dh-studio. Vercel detects it from the lockfile |
| Hosting | Vercel, Git integration, static output with no adapter | Auto deploy on push to `develop`/`main`, a preview URL per branch |
| Release freshness | Deferred (rebuild only on push to this repo for now) | Decided in the Release data model feature (#3) |
| CI | None yet beyond Vercel's build | Your call. Lint and typecheck gates can come later via `/audit` and tooling |

**Folder layout** (a recommendation `/develop` follows at scaffold):

```
src/
  pages/            routes (index.astro, design-system.astro)
  layouts/          BaseLayout.astro (head, theme script, fonts)
  components/       .astro components (static)
  islands/          .tsx React islands (hydrated)
  content/          collections (features, faq) + content.config.ts
  styles/           global.css (Tailwind import, @theme tokens, themes)
  lib/              plain TS helpers (release data, OS detection)
public/             favicons, static images, og images
```

**Islands rule**: an island is justified only by real interactivity (pointer, scroll, state). Static visuals, including the 3D layering itself, stay in `.astro` with CSS. Islands receive only serializable props.

## Consequences

**Positive**:
- Most pages ship near zero JS, which makes the Core Web Vitals and SEO goals cheap to hold
- Same libraries as the app, so there's little new to learn
- Preview deploy per branch for free

**Negative / tradeoffs**:
- Until release freshness is decided, the version and download links can lag a DH Studio release until the next push to this repo
- Two component formats (`.astro` and `.tsx`). State shared across islands needs a small store, so keep islands self contained
- Astro's major versions move quickly. Pin the version and plan upgrades on purpose
- No CI gate: a lint or type error only surfaces in the Vercel build or locally

**Neutral**:
- No backend, database, auth or observability layer is needed. Analytics and SEO get their own specs (features #9, #10)
- Font choice and loading are owned by the design system spec (#4)

## Follow-up

- [ ] Release freshness (ISR on Vercel, a deploy hook from dh-studio's release workflow, or a scheduled rebuild) is owed by the Release data model feature (#3)
- [ ] GitHub API rate limit for build time release fetches (an optional token as a Vercel env var) is owed by feature #3
- [ ] Record in root `AGENTS.md` (via `/audit`): the stack above, the islands rule, the folder layout, and the declined Agent Skill and MCP discovery for this stack
- [ ] Consider a CI workflow (lint, typecheck, build) once `/audit` captures the tooling

## References

**Project sources** (verifiable, in this repo):
- `docs/scope/scope.md`: the website intent, the grounded spatial direction, WCAG AA and the performance budget
- dh-studio `package.json`: React 19, Tailwind v4, Base UI, `motion`, lucide, Bun already in use

**Practices & standards**:
- Islands architecture (ship HTML, hydrate only interactive parts)
- Reuse what the team already runs
- `prefers-reduced-motion` for motion heavy UI (WCAG 2.2, animation from interactions)

**Links** (web verified):
- What's new in Astro, January 2026: https://astro.build/blog/whats-new-january-2026/
- Next.js static exports guide: https://nextjs.org/docs/app/guides/static-exports
