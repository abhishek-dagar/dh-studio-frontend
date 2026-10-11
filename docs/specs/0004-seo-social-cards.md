# 0004. Build time SEO head, sitemap and a generated social card

**Date**: 2026-10-11
**Status**: In Progress

## Summary

This spec makes the DH Studio site easy to find and good looking when shared. Every page gets a proper title, description and canonical link (the one official address of a page), plus Open Graph tags (the tags chat apps and social sites read to draw a link preview). The build draws one branded card image in the Home editor look, showing the live version. Home also gets structured data (a machine readable description of DH Studio as a free app). A sitemap and robots.txt tell search engines what to read, and preview deploys stay out of search. Everything is made at build time, so the site stays static with no server.

## Context

The site exists to get developers to download a desktop app, and most of them will arrive from a search result or a link pasted into Slack, Discord, X or a README. Today the head carries only a title and a description. A shared link shows a bare URL, search engines get no canonical address, no sitemap and no robots rules, and nothing tells them DH Studio is free software for macOS, Windows and Linux.

The site is static (spec 0001): pages are prebuilt HTML on Vercel with no adapter and no backend. So anything that is generated (an image, a sitemap, a robots file) has to be produced during the build. The live release version already reaches the build through `latestRelease` (spec 0002), and a Vercel deploy hook rebuilds the site on every stable release. Production builds already fail when release data is missing; previews and local builds use a typed fallback.

There are two kinds of deploys that matter here. Production lives at `https://dh-studio-frontend.vercel.app` (a custom domain may come later). Every pull request gets a preview deploy with its own URL, and those must never compete with production in search. The `/design-system` page is a working reference for building, not a page for visitors from search.

Social sites (X, LinkedIn, Slack, Discord) cache a card image by its URL for days. A card that shows a version goes stale in those caches unless its URL changes. Google only shows the rich software result when a page carries ratings or reviews, and this product has none it could honestly claim.

## Requirements

**User stories**:
- As a developer searching for a database client, I want DH Studio's result to show a clear title and description so that I know what it is before I click.
- As someone sharing the site in a chat or a post, I want the link to unfold into a branded card so that people recognize the product and click.
- As the site owner, I want preview deploys and the showcase page kept out of search so that only the real Home page ranks.
- As the site owner, I want the card and structured data to follow each release on their own so that I never update them by hand.

**Acceptance criteria**:
- **AC-1**: Every page renders exactly one `<title>`, one `<meta name="description">` and one `<link rel="canonical">`. Home uses `home.yaml` `meta.title` and `meta.description`. `/design-system` uses `Design system · DH Studio` and its own description. The canonical URL is absolute on `https://dh-studio-frontend.vercel.app` and ends with a slash (`https://dh-studio-frontend.vercel.app/`, `https://dh-studio-frontend.vercel.app/design-system/`).
- **AC-2**: Every page renders `og:title`, `og:description`, `og:url` (equal to the canonical URL), `og:type` `website`, `og:site_name` `DH Studio`, `og:locale` `en_US`, `og:image` (absolute), `og:image:width` `1200`, `og:image:height` `630`, `og:image:type` `image/png`, `og:image:alt`, and `twitter:card` `summary_large_image`. No `twitter:site` tag is rendered.
- **AC-3**: The build writes `dist/og.png`, a 1200 by 630 PNG in the dark theme and the Home editor look: the `card.comment` line as a SQL comment, the `card.query` line, and a one row result with `card.row`, set in Mona Sans and Geist Mono with the site's dark tokens.
- **AC-4**: When `latestRelease` is `live`, the card shows `Version <version>` (for example `Version 0.5.5`, using `home.yaml` `download.versionPrefix`), and `og:image` is `https://dh-studio-frontend.vercel.app/og.png?v=0.5.5`. When it is `fallback`, the card has no version text and `og:image` is `https://dh-studio-frontend.vercel.app/og.png` with no query.
- **AC-5**: Home renders exactly one `<script type="application/ld+json">` holding an `@graph` with a `SoftwareApplication` node (name, description, url, image, applicationCategory `DeveloperApplication`, operatingSystem `macOS, Windows, Linux`, offers with price `0` and priceCurrency `USD`, downloadUrl, license, isAccessibleForFree `true`, and softwareVersion when live) and a `WebSite` node (name `DH Studio`, url). It passes the Schema.org validator with no errors, and Google's Rich Results Test with no errors (a warning about missing ratings is expected and accepted). `/design-system` renders no JSON-LD.
- **AC-6**: When the release is `live`, `softwareVersion` is the release version and `downloadUrl` is that release's GitHub page (`release.pageUrl`). When it is `fallback`, `softwareVersion` is left out and `downloadUrl` is the GitHub releases page (`releasesPageUrl`).
- **AC-7**: No page carries `aggregateRating` or `review` data.
- **AC-8**: A production build writes `sitemap-index.xml` and its child sitemap, listing every built page except the unlisted paths. Today that is Home only, and `/design-system/` is absent. The sitemap carries no `lastmod`.
- **AC-9**: When `VERCEL_ENV` is `production`, `/robots.txt` reads `User-agent: *`, `Allow: /` and `Sitemap: https://dh-studio-frontend.vercel.app/sitemap-index.xml`. In any other build (preview, development, or unset) it reads `User-agent: *` and `Disallow: /`, with no Sitemap line.
- **AC-10**: In a production build, Home has no robots meta tag, and `/design-system` has `<meta name="robots" content="noindex">`. In any non production build, every page has `<meta name="robots" content="noindex">`.
- **AC-11**: Every page renders two `theme-color` tags: `#101214` for `(prefers-color-scheme: dark)` and `#f9fafc` for `(prefers-color-scheme: light)`, the same values as `--ground` in `tokens.css` and the pre paint style in `BaseLayout`.
- **AC-12**: Any `<` in JSON-LD output is written as `<`, so no content value can close the script tag.
- **AC-13**: The card's words live only in a `card` block in `home.yaml` (`comment`, `query`, `row`, `alt`). The content schema rejects a missing field and any field over its length cap (`comment` 56, `query` 56, `row` 40, `alt` 160 characters), so the build fails with a content error naming the field.
- **AC-14**: If a card font file is missing or rendering throws, the build fails with an error naming the cause. No page ships without its card.
- **AC-15**: The production Home URL, pasted into a link preview inspector (opengraph.xyz or LinkedIn Post Inspector), shows the branded card with the correct title, description and image.

## Options considered

The main decision is how the social card image gets made. The head tags, sitemap and robots follow from it and from the static stack.

### Option 1: Generate the card at build time with satori and resvg

A small template in `src/lib/seo/` describes the card as a tree of boxes and text. satori (a library that turns that tree into SVG, using real font files) draws it, and resvg (a fast SVG to PNG renderer) turns it into a PNG. A static endpoint `src/pages/og.png.ts` writes `dist/og.png` during the build.

**Pros**:
- Uses the real fonts and color values, so the card matches the site.
- Shows the live version and redraws itself on every release build with no manual step.
- Stays fully static, with no server and no adapter, which fits spec 0001.

**Cons**:
- Two new build dependencies, one with a native binary (resvg), plus two font packages.
- satori supports a subset of CSS (flexbox, no grid), so the template is written apart from the site's components and can drift from them.
- Adds a little build time per deploy.

### Option 2: A static PNG you design and commit

Design the card in a design tool, export it, and commit it to `public/og.png`.

**Pros**:
- No code, no dependencies, and complete design freedom.
- Nothing can fail at build time.

**Cons**:
- It cannot show the live version, which you asked for.
- Every visual change to the site needs a manual redraw, and it is easy to forget.

### Option 3: Screenshot a hidden card page at build time

Render an HTML card page with the real components, then capture it with Playwright (a headless browser) during the build.

**Pros**:
- Pixel exact to the site, since it uses the same components and CSS.

**Cons**:
- Needs a headless browser in Vercel's build image, which is slow, large and fragile across image updates.
- Adds a second render pipeline to debug when the build breaks.

### Option 4: Draw the card on request with a Vercel function

Use Vercel's OG image function (`@vercel/og`) to draw the card when a social site asks for it.

**Pros**:
- Can make a card per page or per query with no build cost.

**Cons**:
- Needs a server runtime, which breaks the static, no adapter decision in spec 0001.
- Every crawler hit costs a function run, and the card depends on the function being up.

## Decision

**Chosen option**: Option 1: Generate the card at build time with satori and resvg.

Make every SEO and sharing artifact at build time: pure helpers in `src/lib/seo/` compute the head tags, JSON-LD and robots text; a `Seo.astro` component renders them from `BaseLayout`; `@astrojs/sitemap` writes the sitemap; and static endpoints write `/og.png` and `/robots.txt`.

## Rationale

The card has to show the live version and look like the Home editor, and the site has to stay static. Option 1 is the only one that meets all three. A committed PNG cannot show a version. A screenshot pipeline pulls a browser into a build that today needs nothing but Node. A function brings back the server that spec 0001 removed. satori and resvg are small, widely used, and run in plain Node during `astro build`. The cost is a template that lives apart from the components, and that is acceptable for one card.

The version only matters if social caches pick it up, so the image URL carries the version as a query (`?v=0.5.5`). Vercel serves the same file for any query, while X, Slack and LinkedIn treat each release as a new image. The deploy hook from spec 0002 already rebuilds on every release, so the card stays fresh with no extra machinery.

Indexing control is decided by one rule: only a production build of a listed page may be indexed. Vercel already sends a noindex header on preview URLs, but the site enforces it too (meta tag and robots.txt) so a change on Vercel's side, or a preview reached through an alias, never leaks into search. The unlisted pages live in one constant read by both the layout and the sitemap filter, so the two can never disagree. Structured data stays honest: no ratings, so Google will not show stars, but the page is still clearly described as a free developer app with a version and platforms.

**Calls made while writing** (each with the runner up):
- **Card template as a plain object tree in a `.ts` file**, not JSX. It keeps `.tsx` for islands as AGENTS.md requires. Runner up: a `.tsx` template under `src/lib/`, which reads nicer but blurs that rule.
- **Unlisted paths derived in `BaseLayout`** from one constant (`UNLISTED_PATHS`), not passed by each page. It refines the confirmed `indexable` field into a derived value, so a page cannot forget it. Runner up: an `indexable` prop on each page.
- **Canonical URLs always end with a slash**, matching what `@astrojs/sitemap` writes for Astro's default directory build format. Runner up: setting `trailingSlash: 'always'` in the config, which also changes dev routing.
- **Length caps in the content schema** keep the card text inside the frame, so the template never measures text. Runner up: satori line clamping, which hides overflow instead of preventing it.
- **No robots meta on indexable pages**, since a missing tag means index and follow. Runner up: an explicit `index, follow`, which adds a tag with no effect.
- **Font files from Fontsource WOFF** at fixed paths (`files/<family>-latin-<weight>-normal.woff`), read with `node:fs` from `node_modules`. Runner up: committed TTF files.
- **resvg over sharp** for the PNG step, since resvg renders SVG text exactly as satori laid it out and needs no image library. Runner up: sharp, which is heavier and adds nothing here.

## Feature design

**Data model sketch** (values computed at build time, no storage):

| Value | Fields | Notes |
|---|---|---|
| `PageMeta` (props to `BaseLayout`) | `title: string` required · `description: string` required (the default is removed) · `jsonLd?: readonly JsonLdNode[]` | One per page. `indexable` is derived, not passed |
| `HeadTags` (from `headTags()`) | `title` · `description` · `canonical: string` · `robots: 'noindex' \| null` · `og: { title, description, url, image, imageAlt, type, siteName, locale, width, height, imageType }` · `twitterCard` · `themeColors: { dark, light }` | One per page, derived from `PageMeta`, path, site, env and card |
| `CardCopy` (`home.yaml` `card`) | `comment: string` max 56 · `query: string` max 56 · `row: string` max 40 · `alt: string` max 160, all required | Single entry, validated by the content schema |
| `CardModel` (from `cardModel()`) | `comment` · `query` · `row` · `versionLabel: string \| null` | `versionLabel` is `null` on fallback |
| `SoftwareApplication` node | `@type`, `name` `DH Studio`, `description`, `url`, `image`, `applicationCategory` `DeveloperApplication`, `operatingSystem` `macOS, Windows, Linux`, `offers { @type Offer, price '0', priceCurrency 'USD' }`, `downloadUrl`, `license`, `isAccessibleForFree true`, `softwareVersion?` | Home only |
| `WebSite` node | `@type`, `name` `DH Studio`, `url` | Home only |

Relationships: each page has one `PageMeta` and one `HeadTags`. The site has one `CardCopy`, one `CardModel` and one `/og.png`, shared by every page. Only Home carries JSON-LD, as one `@graph` of the two nodes.

**State transitions**: none. The only branch is release `live` or `fallback`, and env `production` or not.

**API surface** (static routes and the pure helpers they use):

| Endpoint / function | Method | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| `/og.png` (`src/pages/og.png.ts`) | GET, prerendered | `latestRelease`, `card` and `download.versionPrefix` from `home.yaml`, font files | 1200x630 PNG, `Content-Type: image/png` | public | missing font or render error fails the build (AC-14) |
| `/robots.txt` (`src/pages/robots.txt.ts`) | GET, prerendered | `context.site`, `VERCEL_ENV` | plain text | public | none |
| `/sitemap-index.xml`, `/sitemap-0.xml` | `@astrojs/sitemap` | built routes, `filter` reading `UNLISTED_PATHS` | XML | public | needs `site` set, or the integration warns and writes nothing |
| `headTags(meta, ctx)` | function | `PageMeta`, `{ site: URL, path: string, env, ogImageUrl: string }` | `HeadTags` | n/a | none (pure) |
| `canonicalUrl(path, site)` | function | path, site | absolute URL with a trailing slash | n/a | none |
| `isIndexable(path, env)` | function | path, env | boolean | n/a | none |
| `robotsTxt(site, env)` | function | site, env | string | n/a | none |
| `ogImageUrl(site, release)` | function | site, `ReleaseResult` | absolute URL, `?v=` only when live | n/a | none |
| `cardModel(copy, versionPrefix, release)` | function | `CardCopy`, prefix, `ReleaseResult` | `CardModel` | n/a | none |
| `cardTree(model)` | function | `CardModel` | satori element tree | n/a | none |
| `renderCard(tree, fonts)` | edge function | tree, font buffers | PNG `Uint8Array` | n/a | throws on render failure (deliberate, AC-14) |
| `softwareAppLd(input)`, `websiteLd(site)` | function | site, description, `ReleaseResult`, card URL | JSON-LD nodes | n/a | none |
| `serializeLd(nodes)` | function | nodes | JSON string with `<` escaped | n/a | none |
| `Seo.astro` (`src/components/site/`) | component | `HeadTags`, optional JSON-LD | head tags | n/a | none |

**Value sourcing**:

| Action | Value produced / displayed | Source |
|---|---|---|
| Head | site origin | `site` in `astro.config.mjs` (`https://dh-studio-frontend.vercel.app`), read as `Astro.site` / `context.site` |
| Head | Home title and description | `home.yaml` `meta` (spec 0003) |
| Head | showcase title and description | literals in `src/pages/design-system.astro` (already present) |
| Head | canonical and `og:url` | `canonicalUrl(Astro.url.pathname, Astro.site)` |
| Head | robots noindex | `isIndexable(path, VERCEL_ENV)`: false when `VERCEL_ENV` is not `production` or the path is in `UNLISTED_PATHS` (`src/lib/seo/paths.ts`, today `['/design-system/']`) |
| Head | `og:image` | `ogImageUrl(site, await latestRelease)` |
| Head | `og:image:alt` | `home.yaml` `card.alt` |
| Head | `og:site_name`, `og:locale`, `og:type`, image size and type, `twitter:card` | constants in `src/lib/seo/config.ts` |
| Head | theme colors | constants in `src/lib/seo/config.ts`, equal to `--ground` in `tokens.css` (dark `#101214`, light `#f9fafc`) |
| Card | comment, query, row | `home.yaml` `card` |
| Card | version text | `download.versionPrefix` plus `release.version` when `live`, else none |
| Card | fonts | `@fontsource/mona-sans` (weights 400, 600) and `@fontsource/geist-mono` (weights 400, 500) WOFF files |
| Card | colors | constants in `src/lib/seo/card.ts` copied from the dark tokens (ground, surface, text, muted, red accent, code token colors), with a comment naming `tokens.css` as the source |
| JSON-LD | name, url | constants and `site` |
| JSON-LD | description | `home.yaml` `meta.description` |
| JSON-LD | softwareVersion | `release.version` when `live`, absent on fallback |
| JSON-LD | downloadUrl | `release.pageUrl` when `live`, `releasesPageUrl` on fallback (spec 0002) |
| JSON-LD | license | `licenseUrl` from `src/lib/site.ts` |
| JSON-LD | image | the same `ogImageUrl` |
| robots.txt | allow or disallow, sitemap URL | `VERCEL_ENV` and `new URL('/sitemap-index.xml', site)` |
| Sitemap | listed pages | built routes minus `UNLISTED_PATHS` |

**Key invariants**:
- Exactly one canonical, one description, one `og:image` per page.
- `og:url` always equals the canonical URL.
- A page is indexable only in a production build and only when its path is not in `UNLISTED_PATHS`. The sitemap and the robots meta read the same constant.
- The `og:image` URL carries `?v=` if and only if the release is `live`, and its value equals the version on the card.
- No ratings or reviews are ever emitted.
- All helpers in `src/lib/seo/` are pure, except `renderCard` and the font loading in the endpoint, which are the edges.

**Security model**: everything is public, read only output with no user input at runtime. The one injection risk is JSON-LD inside a script tag, closed by escaping `<` (AC-12). Content values come from repo files and the GitHub release, which are trusted at build time. No personal data, no compliance scope.

**Configuration required**: no new env vars or secrets. `site` is a fixed value in `astro.config.mjs`. `VERCEL_ENV` is already declared (spec 0002). New packages: `@astrojs/sitemap` (dependency), and `satori`, `@resvg/resvg-js`, `@fontsource/mona-sans`, `@fontsource/geist-mono` (dev dependencies, which Vercel installs for builds).

**Critical test scenarios**:
- Happy path: a production build with a live release gives Home a canonical, full OG tags, an `og:image` with `?v=<version>`, a card showing that version, and valid JSON-LD with `softwareVersion`, verifies **AC-1**, **AC-2**, **AC-3**, **AC-4**, **AC-5**, **AC-6**.
- Failure case: a preview build with a fallback release gives a card with no version, `og:image` with no query, JSON-LD without `softwareVersion` and pointing to the releases page, noindex on every page, and a robots.txt that disallows all, verifies **AC-4**, **AC-6**, **AC-9**, **AC-10**.
- Failure case: a `card.comment` over 56 characters, or a missing font file, fails the build with a message naming the cause, verifies **AC-13**, **AC-14**.
- Exclusion: `/design-system` is noindex even in production and is absent from the sitemap, verifies **AC-8**, **AC-10**.
- Injection: a description containing `</script>` serializes as `</script>`, verifies **AC-12**.
- Unit tests (Vitest) cover `canonicalUrl`, `isIndexable`, `robotsTxt`, `ogImageUrl`, `cardModel`, `headTags`, `softwareAppLd` and `serializeLd`, for both release states and both env states.

## Build plan

Tracer Bullet: first one real card reaching a real link preview, then thicken.

1. **Thin thread to a real preview.** Set `site` in `astro.config.mjs`. Add `src/lib/seo/` with `config.ts`, `canonicalUrl`, `ogImageUrl` and a first `headTags`, with Vitest tests. Add `Seo.astro` and render it from `BaseLayout`, making `description` required. Add `src/pages/og.png.ts` with satori, resvg and the Fontsource fonts, drawing a plain dark card with the hero headline. Deploy a preview and check the card in a link preview inspector. Satisfies **AC-1**, **AC-2**, **AC-14**.
2. **The real card.** Add the `card` block to `home.yaml` and its schema with length caps. Build `cardModel` and `cardTree` in the editor look (comment, query, result row, version), with the versioned `og:image` URL and the fallback path, with tests. Satisfies **AC-3**, **AC-4**, **AC-13**.
3. **Indexing controls.** Add `paths.ts` with `UNLISTED_PATHS` and `isIndexable`, the robots meta in `Seo.astro`, `src/pages/robots.txt.ts` with `robotsTxt`, `@astrojs/sitemap` with the filter and no `lastmod`, and the two `theme-color` tags, with tests. Satisfies **AC-8**, **AC-9**, **AC-10**, **AC-11**.
4. **Structured data.** Add `softwareAppLd`, `websiteLd` and `serializeLd` with tests for both release states and the escape case. Render the `@graph` on Home only. Satisfies **AC-5**, **AC-6**, **AC-7**, **AC-12**.
5. **Proven on production.** Deploy to production, then check Home in the Rich Results Test, the Schema.org validator and a link preview inspector. Confirm robots.txt and the sitemap on the production URL, and noindex on a preview URL. Satisfies **AC-15**, with **AC-5**, **AC-8**, **AC-9**, **AC-10** checked live.

## Consequences

**Positive**:
- Shared links unfold into a recognizable card that tracks each release with no manual step.
- Search engines get a canonical address, a sitemap and honest structured data, and previews stay out of search.
- All logic is pure and unit tested, and the site stays static.

**Negative / tradeoffs**:
- Four new dev dependencies and one integration. resvg ships a native binary, so a Vercel build image change could break it (the build fails loudly, and Vercel keeps the last good deploy).
- The card template duplicates a few dark token values and the editor look outside the site's components. A palette change has to touch `card.ts` too.
- `theme-color` follows the system theme, not the manual toggle, so mobile browser chrome can mismatch a user who flipped the theme.
- Local `bun run build` without `VERCEL_ENV` is treated as non production, so `bun run preview` shows noindex and a blocking robots.txt. That is intended, but it can surprise you during `/check verify`.
- No star ratings in Google results, by design.
- The canonical and every absolute URL point at the `vercel.app` address until a custom domain arrives, and then `site` must change in one place.

**Neutral**:
- `BaseLayout` loses its default description, so every new page must pass one.
- `og.png` is rebuilt on every deploy. Social sites only refetch when the version query changes or their cache expires.

## Follow-up

- [ ] When a custom domain is added, change `site` in `astro.config.mjs`, add the domain in Vercel, and redirect the `vercel.app` address to it, so the canonical URLs move with it.
- [ ] Add `twitter:site` to `src/lib/seo/config.ts` if an X account is created.
- [ ] After the first production deploy, verify the site in Google Search Console (DNS or HTML file, no code) and submit `sitemap-index.xml`.
- [ ] When the Download or Changelog pages arrive (Deferred), decide whether they get their own card, and add their titles in the `<Page> · DH Studio` pattern.
- [ ] Record in AGENTS.md `## Agent skills` that Agent Skill and MCP discovery was declined for satori, resvg, `@astrojs/sitemap` and Fontsource (for `/sync`).
- [ ] Add `@resvg/resvg-js` to `vite.optimizeDeps.exclude` (or `ssr.external`) if Vite tries to bundle its native binary during the build.
