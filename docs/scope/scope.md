# Scope: DH Studio website

The public website for DH Studio, a fast native desktop client for SQLite, PostgreSQL, and MongoDB. It shows developers what the app does and gets them to download it. The look is **grounded spatial**: layered app windows floating in depth, soft light and gentle parallax, set on a crisp dark technical base with sharp type, dark first with a polished light theme.

**Build approach:** Tracer Bullet (prove one real, working thread end to end first, then thicken it one strand at a time).
**Workflow:** Alpha (after `/develop`, run `/check verify` on the real site). The project default level of rigor. `/architect` is the recommended first stop for a feature with a real decision, but skippable when you already know the build. Any feature can carry its own tag (e.g. `· Beta`) to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack & architecture | Foundation | in-progress |
| 2 | Coding standards & tooling | Foundation | planned |
| 3 | Release data model | Foundation | in-progress |
| 4 | Design system & UI foundation | Foundation | in-progress |
| 5 | Design system showcase page | Foundation | in-progress |
| 6 | Home hero and live download | Slice 1 | in-progress |
| 7 | Home feature story | Slice 2 | in-progress |
| 8 | Home closing sections | Slice 3 | in-progress |
| 9 | SEO and social cards | Slice 4 | in-progress |
| 10 | Analytics and download tracking | Slice 5 | planned |
| 11 | Accessibility and performance pass | Slice 6 | in-progress |

## Foundations

### 1. Stack & architecture · in-progress
Decide the site's stack, rendering model, and hosting, then scaffold a runnable project so every later slice builds on real structure. The previous site was removed, so this is a fresh decision.
**Done when:** the stack and hosting are recorded in a spec, and the empty scaffold boots locally and passes a production build.
- [x] Decide the stack (spec): `/architect stack & architecture`
- [x] Scaffold from the decision: `/develop stack & architecture`
- [ ] Verify it: `/check verify stack & architecture`
Spec [0001](../specs/0001-site-stack-architecture.md) · code in `./` (`astro.config.mjs`, `src/`)

### 2. Coding standards & tooling
Capture conventions from the real scaffolded project, then install lint, format, and type checking.
**Done when:** root `AGENTS.md` reflects the real stack, and lint, format, and typecheck run clean.
- [ ] Capture conventions + tooling choices: `/audit`

### 3. Release data model · Beta · in-progress
How the site reads DH Studio's GitHub releases: the shape of a release (version, date, notes, files per OS and architecture), when it is fetched, how it is cached, and what happens if the source is unreachable. Home uses it now; a later Download and Changelog page will reuse it.
**Done when:** the site can produce the latest version, its release date, and the right file for macOS, Windows, and Linux from live release data, with a safe fallback when the source fails. Also settles release freshness (how a new release reaches the deployed site) and the GitHub API rate limit at build time, both deferred here from spec 0001.
- [x] Design it (spec): `/architect release data model`
- [ ] Build it: `/develop release data model`
  - [ ] Thin thread: live version and date (or the fallback link) on a Vercel preview, AC-1, AC-6
  - [x] All platforms and safe selection: classify files, pick per OS, skip drafts, prereleases and incomplete releases, AC-2, AC-3, AC-4, AC-5, AC-12
  - [x] Failure handling and env: timeout, one retry, one request per build, optional token, strict production builds, AC-6, AC-7, AC-8, AC-9, AC-10
  - [ ] Freshness: Vercel deploy hook called from dh-studio's release workflow, AC-11
- [ ] Verify it: `/check verify release data model`
- [ ] Test it: `/test release data model`
Spec [0002](../specs/0002-release-data-model.md) · code in `src/lib/release/`

### 4. Design system & UI foundation · in-progress
The grounded spatial visual language: color tokens for dark and light, type scale, spacing, depth and elevation layers, glass and light surfaces, motion rules with a reduced motion fallback, and the base components. Use the `/frontend-design` skill during the spec.
**Done when:** `design.md` covers tokens, depth, motion, and components for both themes; base components handle focus and keyboard; contrast meets WCAG AA in both themes.
- [x] Design it (spec): `/architect design system & UI foundation`
- [x] Build it: `/develop design system & UI foundation`
  - [x] First themed thread end to end: tokens, fonts, Button, contrast test, design.md started (AC-1 to AC-8, AC-22)
  - [x] Spatial scene, static: ground plane, windows, light, glass and forced colors fallbacks (AC-9, AC-10, AC-13, AC-20)
  - [x] Motion: scene entrance, pointer parallax island, reduced motion and touch (AC-11, AC-12, AC-13)
  - [x] Components and site chrome: Link, Surface, Badge, Input, Kbd, CodeBlock, Header, Footer, Logo, Accordion, Tooltip (AC-6, AC-14 to AC-19, AC-21)
  - [x] Documented and proven: full design.md, proving page in both themes (AC-1, AC-22)
- [x] Build it (revision 2026-10-10, app greys and Red): `/develop design system & UI foundation`
  - [x] New palette end to end: app greys and Red in tokens.css, head script, contrast test green (AC-2, AC-3, AC-6)
  - [x] Type and fonts: Geist Mono, normal width headings, new type scale (AC-4, AC-5, AC-17, AC-21)
  - [x] Shapes, surfaces and header: radius roles, pill buttons, Surface highlight and accent hairline, glass pill header (AC-7, AC-8, AC-10, AC-14, AC-18, AC-19, AC-23)
  - [x] Hero stage: grid backdrop, tilted main window, floating glass windows, glow, forced colors (AC-9 to AC-13, AC-20)
  - [x] Documented and proven: design.md, showcase sections, proving page in both themes (AC-1, AC-22)
- [ ] Build it (revision 2026-10-10, editor language): `/develop design system & UI foundation`
  - [x] Editor language end to end: reveal token and `data-js`, EditorPane, code tokens, result grid styles, PopupCard, flat AppWindow (AC-9, AC-11 to AC-13, AC-20)
  - [x] Remove the stage: SpatialScene, GridBackdrop, ParallaxField, glow, grid and entrance tokens, `motion` if unused (AC-10, AC-24)
  - [ ] Documented and proven: design.md and showcase updated, both themes, keyboard, reduced motion, forced colors, 360px (AC-1, AC-22)
- [ ] Verify it: `/check verify design system & UI foundation`
Spec [0002](../specs/0002-design-system-ui-foundation/index.md) · code in `src/styles/`, `src/components/`, `src/islands/`, `src/lib/ui/`, `src/lib/contrast*.ts`, `design.md`

### 5. Design system showcase page · in-progress
A `/design-system` page that renders every piece of the system in one place: typography scale, colors in both themes, buttons in every variant and state, cards and spatial surfaces, inputs, badges, code blocks, and motion samples. It doubles as a living reference while building the real pages.
**Done when:** every token and base component from `design.md` appears on the page, the theme toggle switches all of it live, and reduced motion calms every animated sample.
- [x] Build it: `/develop design system showcase page`
No spec (built from spec 0002 and the CSS) · code in `src/pages/design-system.astro`, `src/components/showcase/`, `src/lib/showcase.ts`

## Slice 1: Home hero and live download

### 6. Home hero and live download · in-progress
The thinnest real thread: the Home hero as an editor session (the headline as a SQL comment, a query for downloads where the OS is yours, and a result grid whose highlighted row holds the right file), the live latest version in the status bar, and a clickable OS literal to switch systems, deployed for real. The Home spec decides the whole page, so later Home slices build on it.
**Done when:** a visitor on the deployed site sees the current release version and a result row that downloads the right file for their OS, can switch OS from the query, and sees every file with JavaScript off; the hero works in both themes, on a phone and with reduced motion.
- [x] Design it (spec): `/architect home page`
- [ ] Build it: `/develop home hero and live download`
  - [ ] Live download thread on a real deploy: release helpers, OS detection, content collections, editor hero with the `in (...)` built state, narrowed rows with the highlighted primary, status bar, fallback, header Download to `/#download` (AC-1 to AC-3, AC-5, AC-8, AC-9, AC-12 to AC-14, AC-16)
  - [x] The OS literal, the reveal and the tip: Base UI Select trigger, every system option, one reveal with height reserve and fallback, first launch tips (AC-4, AC-6, AC-7, AC-11)
  - [ ] Phone, themes and access: stacked rows at 360px, both themes, keyboard, screen reader, no JavaScript, production deploy (AC-10, AC-11, AC-15, AC-16)
- [ ] Verify it: `/check verify home hero and live download`
Spec [0003](../specs/0003-home-page.md) · code in `src/pages/index.astro`, `src/components/home/`, `src/islands/DownloadQuery.tsx`, `src/lib/home/`, `src/lib/platform/`, `src/content/home/`

## Slice 2: Home feature story

### 7. Home feature story · in-progress
The sections that sell the app, in the editor language: an engines section (SQLite, PostgreSQL, MongoDB, Amazon DocumentDB) and a feature browser with vertical tabs (table grid, SQL editor, schema designer, query builder, split view, command palette, keychain passwords, and a team server teaser), each with a real screenshot and one app popup drawn in HTML floating over it.
**Done when:** each feature shows a real product screenshot, its popup card and a short benefit; tabs work by keyboard from `lg` and everything stacks on phones and without JavaScript; production refuses a missing screenshot.
- [x] Build it: `/develop home feature story`
  - [x] Engines result: static editor pane and result grid with the three engines (AC-17)
  - [x] Feature browser: features collection, stacked panels, tabs enhancement from `lg`, screenshot placeholder and production guard, seven popup cards, Features nav link (AC-18 to AC-20)
- [x] Redesign the engines section as a schema diagram, in the look of the app's schema designer (spec): `/architect home feature story`
  Done when: each engine reads as a table box in a relation diagram, the section still names every engine with its icon and sentence for screen readers and without JavaScript, and it stacks cleanly on a 360px phone in both themes. Revises AC-17 in spec 0003.
- [ ] Build it (revision 2026-10-11, engines schema diagram): `/develop home feature story`
  - [x] Content and layout rule: `hub` and `fields` in the engines content, rows 1 to 8, `diagramLayout` with tests (AC-17, AC-24)
  - [ ] Diagram end to end on a preview: canvas `EditorPane`, `DiagramTable`, hub in the center with engines alternating sides, anchor positioned lines with the no support fallback, checked in Chrome, Safari and Firefox (AC-17, AC-24)
  - [x] Phone and access: spine below `lg`, both themes, forced colors, screen reader list, 360px, 200% text, a temporary fifth engine; design.md and showcase updated (AC-25, AC-15)
- [ ] Verify it: `/check verify home feature story`
Spec [0003](../specs/0003-home-page.md) · code in `src/components/home/Engines.astro`, `src/components/editor/DiagramTable.astro`, `src/lib/home/engines.ts`, `src/components/home/FeatureBrowser.astro`, `src/components/home/FeaturePanel.astro`, `src/components/home/cards/`, `src/content/features/`, `src/lib/home/features.ts`, `src/lib/home/tabs.ts`

## Slice 3: Home closing sections

### 8. Home closing sections · in-progress
The end of the page: a questions table (free and open source, platforms, unsigned build first launch help, where passwords live), a closing download (`-- Ready when you are.` plus the compact download), and the footer with GitHub, license, and privacy links.
**Done when:** every answer is visible in a table that stacks on phones, the closing download reuses the live detection, and the footer links all resolve.
- [x] Build it: `/develop home closing sections`
  - [x] Questions table: faq collection, real table stacking below `md`, Questions nav link (AC-21)
  - [x] Closing download: compact download island with fallback, no JavaScript and phone paths; footer links checked (AC-22, AC-23)
- [ ] Verify it: `/check verify home closing sections`
Spec [0003](../specs/0003-home-page.md) · code in `src/components/home/Questions.astro`, `src/components/home/Closing.astro`, `src/islands/DownloadQuery.tsx` (`compact` form), `src/content/faq/`, `src/lib/home/faq.ts`

## Slice 4: SEO and social cards

### 9. SEO and social cards · in-progress
Make the site findable and shareable: page metadata, sitemap, robots rules, Open Graph and social card images, and structured data describing DH Studio as a software application with its current version.
**Done when:** Home and the showcase page have unique titles and descriptions, the sitemap lists public pages, a shared link renders a branded card, and structured data validates with the live version.
- [x] Design it (spec): `/architect seo and social cards`
- [ ] Build it: `/develop seo and social cards`
  - [ ] Thin thread to a real preview: `site`, canonical and OG head from `BaseLayout`, a first build time card at `/og.png` checked in a link preview inspector (AC-1, AC-2, AC-14)
  - [x] The real card: `card` block in home.yaml, editor look, live version and versioned image URL, fallback (AC-3, AC-4, AC-13)
  - [x] Indexing controls and structured data: unlisted paths, robots meta, robots.txt, sitemap, theme-color, SoftwareApplication and WebSite JSON-LD (AC-5 to AC-12)
  - [ ] Proven on production: Rich Results Test, Schema.org validator, link preview, robots and sitemap live, noindex on a preview (AC-15)
- [ ] Verify it: `/check verify seo and social cards`
Spec [0004](../specs/0004-seo-social-cards.md) · code in `src/lib/seo/`, `src/components/site/Seo.astro`, `src/layouts/BaseLayout.astro`, `src/pages/og.png.ts`, `src/pages/robots.txt.ts`, `astro.config.mjs`

## Slice 5: Analytics and download tracking

### 10. Analytics and download tracking · needs a decision
Measure visits and download clicks per OS, your main success signal, in a privacy respecting way, with a privacy notice and consent only if the chosen approach needs it.
**Done when:** page views and download clicks per OS show up in a dashboard, a privacy notice page exists, and no tracking runs before consent if consent is required.
- [ ] Design it (spec): `/architect analytics and download tracking`

## Slice 6: Accessibility and performance pass

### 11. Accessibility and performance pass · in-progress
A final sweep across every page against WCAG AA and the performance budget, so the spatial depth and motion never cost speed or access.
**Done when:** every page passes an automated accessibility check with no serious issues, is fully usable by keyboard, and meets good Core Web Vitals on a mid range phone.
- [x] Build it: `/develop accessibility and performance pass`
No spec (an audit and fix pass against specs 0001 to 0003) · code in `src/layouts/BaseLayout.astro`, `src/islands/InstallCommand.tsx`, `src/components/home/FeaturePanel.astro`, `astro.config.mjs`, `public/`

## Deferred
Out of scope for the current build pass, kept so the plan stays honest.
- **Download page**: OS detection, one line install commands, all release files, first launch help · needs a decision
- **Features page**: a deeper tour of every capability · needs a decision
- **Team server page**: explains the optional self hosted team server · needs a decision
- **Changelog page**: release notes from live release data · needs a decision
- **Live demo**: try the app in the browser (read only demo) · needs a decision
- **Docs and blog**: guides and announcements · needs a decision
- **Daily rebuild safety net**: a scheduled GitHub Action that calls the Vercel deploy hook once a day, only if the release hook proves unreliable · from spec 0002

## Legend

**The decision box.** Every feature carries exactly one, the sub-task whose label ends with `(spec)`. Its wording varies (`Design it (spec)` normally, `Decide the stack (spec)` on Stack & architecture), so skills locate it by that `(spec)` suffix, never by an exact label. Every other box is an execution box and `/architect` never ticks one.

**Feature lifecycle**: the scope updates as a feature moves; each row is what it shows and who sets it:

| State | Set by | The feature shows |
|---|---|---|
| `planned` · needs a decision | `/scope` | one box: `Design it (spec): /architect <feature>` |
| `in-progress` (designed) | **`/architect` at spec capture** | `Design it` ticked; spec linked; `Build it: /develop <feature>` + **2 to 5 milestones**; the tier's closing boxes (`Verify it` Alpha+, `Test it` Beta+, `Review it` + `Document it` GA); any surfaced follow-up enrolled |
| `in-progress` (building) | `/develop` | milestone sub-boxes tick one by one; code pointer filled |
| `in-progress` (verified) | `/check verify` | `Build it` + milestones ticked; `Verify it` ticked |
| `done` | **you, when you decide it is** (any skill sets it when you say so); `/sync` reconciles | boxes you ran ticked, skipped ones marked skipped; the tier's last stage (`Prototype` → after `/develop`; `Alpha` → after `/check verify`; `Beta`/`GA` → after `/test`) is the suggested point to call it done; `/sync` captures conventions |

- **Next step** = the first unticked box (always a command or a tracked milestone).
- **needs a decision** = run `/architect` first; otherwise straight to `/develop` (or `/audit` for standards & tooling). The tag drops once the spec is captured.
- **Atomic build tasks live in the spec's `## Build plan`, not here**: the scope carries only the milestone rollup.
- **Status** `planned` → `in-progress` → `done`, plus `existing` (pre-workflow) and `dropped` (de-scoped, kept for history).
- **Approach tag** beside a heading (e.g. `· Facade`) overrides the project default for that feature; no tag = inherits it.
- **Workflow tier tag** beside a heading (e.g. `· Beta`, `· Prototype`) sets that one feature's rigor above or below the project default; no tag inherits the default. It decides the feature's check boxes and each skill's next suggestion.
- **Workflow** (header line) is the project default, what runs after `/develop`: **Prototype** = nothing (trust develop's own build time self check); **Alpha** = `/check verify`; **Beta** = `/check verify` then `/test`; **GA** = adds a fresh model `/check review` then `/document`. A feature built on an unratified decision (an `Assumed` spec) stays flagged, but that never blocks `done`.
- **Pointer line** (`spec <n> · code in <path>`): the spec link added by `/architect`, the code path by `/develop`.
