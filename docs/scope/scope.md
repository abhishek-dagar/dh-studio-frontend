# Scope: DH Studio website

The public website for DH Studio, a fast native desktop client for SQLite, PostgreSQL, and MongoDB. It shows developers what the app does and gets them to download it. The look is **grounded spatial**: layered app windows floating in depth, soft light and gentle parallax, set on a crisp dark technical base with sharp type, dark first with a polished light theme.

**Build approach:** Tracer Bullet (prove one real, working thread end to end first, then thicken it one strand at a time).
**Workflow:** Alpha (after `/develop`, run `/check verify` on the real site). The project default level of rigor. `/architect` is the recommended first stop for a feature with a real decision, but skippable when you already know the build. Any feature can carry its own tag (e.g. `· Beta`) to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | Stack & architecture | Foundation | done |
| 2 | Coding standards & tooling | Foundation | planned |
| 3 | Release data model | Foundation | done |
| 4 | Design system & UI foundation | Foundation | done |
| 5 | Design system showcase page | Foundation | done |
| 6 | Home hero and live download | Slice 1 | done |
| 7 | Home feature story | Slice 2 | done |
| 8 | Home closing sections | Slice 3 | done |
| 9 | SEO and social cards | Slice 4 | done |
| 10 | Analytics and download tracking | Slice 5 | planned |
| 11 | Accessibility and performance pass | Slice 6 | done |
| 12 | Download page | Slice 7 | in-progress |
| 13 | Changelog page | Slice 8 | in-progress |
| 14 | Not found page | Slice 9 | in-progress |
| 15 | Privacy page | Slice 9 | in-progress |
| 16 | Features page | Slice 10 | in-progress |

## Foundations

### 1. Stack & architecture · done
Decide the site's stack, rendering model, and hosting, then scaffold a runnable project so every later slice builds on real structure. The previous site was removed, so this is a fresh decision.
**Done when:** the stack and hosting are recorded in a spec, and the empty scaffold boots locally and passes a production build.
- [x] Decide the stack (spec): `/architect stack & architecture`
- [x] Scaffold from the decision: `/develop stack & architecture`
- [ ] ~~Verify it: `/check verify stack & architecture`~~ skipped
Spec [0001](../specs/0001-site-stack-architecture.md) · code in `./` (`astro.config.mjs`, `src/`)

### 2. Coding standards & tooling
Capture conventions from the real scaffolded project, then install lint, format, and type checking.
**Done when:** root `AGENTS.md` reflects the real stack, and lint, format, and typecheck run clean.
- [ ] Capture conventions + tooling choices: `/audit`

### 3. Release data model · Beta · done
How the site reads DH Studio's GitHub releases: the shape of a release (version, date, notes, files per OS and architecture), when it is fetched, how it is cached, and what happens if the source is unreachable. Home uses it now; a later Download and Changelog page will reuse it.
**Done when:** the site can produce the latest version, its release date, and the right file for macOS, Windows, and Linux from live release data, with a safe fallback when the source fails. Also settles release freshness (how a new release reaches the deployed site) and the GitHub API rate limit at build time, both deferred here from spec 0001.
- [x] Design it (spec): `/architect release data model`
- [x] Build it: `/develop release data model`
  - [ ] ~~Thin thread: live version and date (or the fallback link) on a Vercel preview, AC-1, AC-6~~ skipped
  - [x] All platforms and safe selection: classify files, pick per OS, skip drafts, prereleases and incomplete releases, AC-2, AC-3, AC-4, AC-5, AC-12
  - [x] Failure handling and env: timeout, one retry, one request per build, optional token, strict production builds, AC-6, AC-7, AC-8, AC-9, AC-10
  - [ ] ~~Freshness: Vercel deploy hook called from dh-studio's release workflow, AC-11~~ skipped
- [ ] ~~Verify it: `/check verify release data model`~~ skipped
- [ ] ~~Test it: `/test release data model`~~ skipped
Spec [0002](../specs/0002-release-data-model.md) · code in `src/lib/release/`

### 4. Design system & UI foundation · done
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
- [x] Build it (revision 2026-10-10, editor language): `/develop design system & UI foundation`
  - [x] Editor language end to end: reveal token and `data-js`, EditorPane, code tokens, result grid styles, PopupCard, flat AppWindow (AC-9, AC-11 to AC-13, AC-20)
  - [x] Remove the stage: SpatialScene, GridBackdrop, ParallaxField, glow, grid and entrance tokens, `motion` if unused (AC-10, AC-24)
  - [ ] ~~Documented and proven: design.md and showcase updated, both themes, keyboard, reduced motion, forced colors, 360px (AC-1, AC-22)~~ skipped
- [ ] ~~Verify it: `/check verify design system & UI foundation`~~ skipped
Spec [0002](../specs/0002-design-system-ui-foundation/index.md) · code in `src/styles/`, `src/components/`, `src/islands/`, `src/lib/ui/`, `src/lib/contrast*.ts`, `design.md`

### 5. Design system showcase page · done
A `/design-system` page that renders every piece of the system in one place: typography scale, colors in both themes, buttons in every variant and state, cards and spatial surfaces, inputs, badges, code blocks, and motion samples. It doubles as a living reference while building the real pages.
**Done when:** every token and base component from `design.md` appears on the page, the theme toggle switches all of it live, and reduced motion calms every animated sample.
- [x] Build it: `/develop design system showcase page`
No spec (built from spec 0002 and the CSS) · code in `src/pages/design-system.astro`, `src/components/showcase/`, `src/lib/showcase.ts`

## Slice 1: Home hero and live download

### 6. Home hero and live download · done
The thinnest real thread: the Home hero as an editor session (the headline as a SQL comment, a query for downloads where the OS is yours, and a result grid whose highlighted row holds the right file), the live latest version in the status bar, and a clickable OS literal to switch systems, deployed for real. The Home spec decides the whole page, so later Home slices build on it.
**Done when:** a visitor on the deployed site sees the current release version and a result row that downloads the right file for their OS, can switch OS from the query, and sees every file with JavaScript off; the hero works in both themes, on a phone and with reduced motion.
- [x] Design it (spec): `/architect home page`
- [x] Build it: `/develop home hero and live download`
  - [ ] ~~Live download thread on a real deploy: release helpers, OS detection, content collections, editor hero with the `in (...)` built state, narrowed rows with the highlighted primary, status bar, fallback, header Download to `/#download` (AC-1 to AC-3, AC-5, AC-8, AC-9, AC-12 to AC-14, AC-16)~~ skipped
  - [x] The OS literal, the reveal and the tip: Base UI Select trigger, every system option, one reveal with height reserve and fallback, first launch tips (AC-4, AC-6, AC-7, AC-11)
  - [ ] ~~Phone, themes and access: stacked rows at 360px, both themes, keyboard, screen reader, no JavaScript, production deploy (AC-10, AC-11, AC-15, AC-16)~~ skipped
- [ ] ~~Verify it: `/check verify home hero and live download`~~ skipped
Spec [0003](../specs/0003-home-page.md) · code in `src/pages/index.astro`, `src/components/home/`, `src/islands/DownloadQuery.tsx`, `src/lib/home/`, `src/lib/platform/`, `src/content/home/`

## Slice 2: Home feature story

### 7. Home feature story · done
The sections that sell the app, in the editor language: an engines section (SQLite, PostgreSQL, MongoDB, Amazon DocumentDB) and a feature browser with vertical tabs (table grid, SQL editor, schema designer, query builder, split view, command palette, keychain passwords, and a team server teaser), each with a real screenshot and one app popup drawn in HTML floating over it.
**Done when:** each feature shows a real product screenshot, its popup card and a short benefit; tabs work by keyboard from `lg` and everything stacks on phones and without JavaScript; production refuses a missing screenshot.
- [x] Build it: `/develop home feature story`
  - [x] Engines result: static editor pane and result grid with the three engines (AC-17)
  - [x] Feature browser: features collection, stacked panels, tabs enhancement from `lg`, screenshot placeholder and production guard, seven popup cards, Features nav link (AC-18 to AC-20)
- [x] Redesign the engines section as a schema diagram, in the look of the app's schema designer (spec): `/architect home feature story`
  Done when: each engine reads as a table box in a relation diagram, the section still names every engine with its icon and sentence for screen readers and without JavaScript, and it stacks cleanly on a 360px phone in both themes. Revises AC-17 in spec 0003.
- [x] Build it (revision 2026-10-11, engines schema diagram): `/develop home feature story`
  - [x] Content and layout rule: `hub` and `fields` in the engines content, rows 1 to 8, `diagramLayout` with tests (AC-17, AC-24)
  - [ ] ~~Diagram end to end on a preview: canvas `EditorPane`, `DiagramTable`, hub in the center with engines alternating sides, anchor positioned lines with the no support fallback, checked in Chrome, Safari and Firefox (AC-17, AC-24)~~ skipped
  - [x] Phone and access: spine below `lg`, both themes, forced colors, screen reader list, 360px, 200% text, a temporary fifth engine; design.md and showcase updated (AC-25, AC-15)
- [ ] ~~Verify it: `/check verify home feature story`~~ skipped
Spec [0003](../specs/0003-home-page.md) · code in `src/components/home/Engines.astro`, `src/components/editor/DiagramTable.astro`, `src/lib/home/engines.ts`, `src/components/home/FeatureBrowser.astro`, `src/components/home/FeaturePanel.astro`, `src/components/home/cards/`, `src/content/features/`, `src/lib/home/features.ts`, `src/lib/home/tabs.ts`

## Slice 3: Home closing sections

### 8. Home closing sections · done
The end of the page: a questions table (free and open source, platforms, unsigned build first launch help, where passwords live), a closing download (`-- Ready when you are.` plus the compact download), and the footer with GitHub, license, and privacy links.
**Done when:** every answer is visible in a table that stacks on phones, the closing download reuses the live detection, and the footer links all resolve.
- [x] Build it: `/develop home closing sections`
  - [x] Questions table: faq collection, real table stacking below `md`, Questions nav link (AC-21)
  - [x] Closing download: compact download island with fallback, no JavaScript and phone paths; footer links checked (AC-22, AC-23)
- [ ] ~~Verify it: `/check verify home closing sections`~~ skipped
Spec [0003](../specs/0003-home-page.md) · code in `src/components/home/Questions.astro`, `src/components/home/Closing.astro`, `src/islands/DownloadQuery.tsx` (`compact` form), `src/content/faq/`, `src/lib/home/faq.ts`

## Slice 4: SEO and social cards

### 9. SEO and social cards · done
Make the site findable and shareable: page metadata, sitemap, robots rules, Open Graph and social card images, and structured data describing DH Studio as a software application with its current version.
**Done when:** Home and the showcase page have unique titles and descriptions, the sitemap lists public pages, a shared link renders a branded card, and structured data validates with the live version.
- [x] Design it (spec): `/architect seo and social cards`
- [x] Build it: `/develop seo and social cards`
  - [ ] ~~Thin thread to a real preview: `site`, canonical and OG head from `BaseLayout`, a first build time card at `/og.png` checked in a link preview inspector (AC-1, AC-2, AC-14)~~ skipped
  - [x] The real card: `card` block in home.yaml, editor look, live version and versioned image URL, fallback (AC-3, AC-4, AC-13)
  - [x] Indexing controls and structured data: unlisted paths, robots meta, robots.txt, sitemap, theme-color, SoftwareApplication and WebSite JSON-LD (AC-5 to AC-12)
  - [ ] ~~Proven on production: Rich Results Test, Schema.org validator, link preview, robots and sitemap live, noindex on a preview (AC-15)~~ skipped
- [ ] ~~Verify it: `/check verify seo and social cards`~~ skipped
Spec [0004](../specs/0004-seo-social-cards.md) · code in `src/lib/seo/`, `src/components/site/Seo.astro`, `src/layouts/BaseLayout.astro`, `src/pages/og.png.ts`, `src/pages/robots.txt.ts`, `astro.config.mjs`

## Slice 5: Analytics and download tracking

### 10. Analytics and download tracking · needs a decision
Measure visits and download clicks per OS, your main success signal, in a privacy respecting way, with a privacy notice and consent only if the chosen approach needs it.
**Done when:** page views and download clicks per OS show up in a dashboard, the privacy page (#15) covers it, and no tracking runs before consent if consent is required.
_Parked by you on 2026-10-13; pick it up again whenever you are ready._
- [ ] Design it (spec): `/architect analytics and download tracking`

## Slice 6: Accessibility and performance pass

### 11. Accessibility and performance pass · done
A final sweep across every page against WCAG AA and the performance budget, so the spatial depth and motion never cost speed or access.
**Done when:** every page passes an automated accessibility check with no serious issues, is fully usable by keyboard, and meets good Core Web Vitals on a mid range phone.
- [x] Build it: `/develop accessibility and performance pass`
No spec (an audit and fix pass against specs 0001 to 0003) · code in `src/layouts/BaseLayout.astro`, `src/islands/InstallCommand.tsx`, `src/components/home/FeaturePanel.astro`, `astro.config.mjs`, `public/`

## Slice 7: Download page

### 12. Download page · in-progress
A full `/download` page: every file for the latest release grouped by OS and architecture, one line install commands, checksums, and first launch help for unsigned builds. It reuses the release data from #3 and becomes the header Download target or a deeper link from the hero.
**Done when:** a visitor sees every file of the latest release with its size and checksum, the file for their OS is highlighted, install and first launch steps work by keyboard and without JavaScript, the page has its own title in the `<Page> · DH Studio` pattern, and the release fallback still shows a working link when the source fails.
- [x] Design it (spec): `/architect download page`
- [ ] Build it: `/develop download page`
  - [ ] Thin thread: live hashes from the asset digest on a preview `/download/`, header and footer point to it, AC-1, AC-17, AC-18, AC-20, AC-23, AC-24
  - [x] Interactive query: page form detection, picker, shared reveal CSS, Copy hash, phone layout, analytics placements, AC-2, AC-3, AC-4, AC-5, AC-12, AC-14, AC-15, AC-16
  - [x] Install and help: skip note, static first launch (with Linux), verify commands, links line, full fallback, AC-7, AC-8, AC-9, AC-10, AC-11, AC-13
  - [ ] Edges and Home: missing digest warning, Home status bar link, JSON-LD downloadUrl, then the full pass on production, AC-6, AC-19, AC-21, AC-22, AC-24
- [ ] Verify it: `/check verify download page`
Spec [0005](../specs/0005-download-page.md) · code in `src/pages/download.astro`, `src/components/download/`, `src/islands/DownloadQuery.tsx` (`page` form), `src/lib/release/digest.ts`, `src/lib/download/`, `src/content/download/`

## Slice 8: Changelog page

### 13. Changelog page · in-progress
A `/changelog` page listing past releases with their notes, built from the same release data, so visitors can see the app is alive and what changed.
**Done when:** each release shows its version, date and readable notes (rendered and trimmed safely), the newest is first, each version has a stable link, it reads well in both themes and on a phone, and it has its own title and social card decision recorded.
- [x] Design it (spec): `/architect changelog page`
- [x] Build it: `/develop changelog page`
  - [x] Thin thread to a preview: `releases` collection loader with the 100 release request, history selection, strict and lenient failure, a bare `/changelog/` (AC-1, AC-10, AC-11, AC-12)
  - [x] Safe notes: escaped raw HTML, safe links, bold labels and shifted headings with version prefixed ids, code blocks in the CodeBlock look (AC-3, AC-4, AC-5)
  - [x] Views, paging and version pages: All, Stable and Prereleases tabs as links, `/page/<n>/` paging, `/changelog/<version>/` with newer and older links, Latest and Prerelease badges (AC-2, AC-6, AC-7, AC-9)
  - [x] Editor look, copy and entry points, proven: editor header, `changelog.yaml`, titles, Atom link, footer and status bar links; both themes, keyboard, no JavaScript, forced colors, 360px (AC-8, AC-13 to AC-17)
  - [x] Version index: `On this page` sticky right column on desktop and a `<details>` list on phones, `#v<version>` anchors, smooth jump with reduced motion fallback, the `VersionIndex` island marking the release you are reading (AC-18 to AC-23)
- [ ] Verify it: `/check verify changelog page`
Spec [0005](../specs/0005-changelog-page.md) · code in `src/pages/changelog/`, `src/components/changelog/`, `src/lib/changelog/`, `src/islands/VersionIndex.tsx`, `src/lib/release/` (`history.ts`, `notes.ts`, `loader.ts`)

## Slice 9: Not found and Privacy pages

### 14. Not found page · in-progress
A branded 404 page in the editor language (for example a query that returns zero rows) with a way back home and to the download.
**Done when:** any unknown URL on the deployed site returns a real 404 status with this page, it links home and to the download, and it is excluded from the sitemap and search indexing.
- [x] Design it (spec): `/architect not found page`
- [x] Build it: `/develop not found page`
  - [x] Thin thread: `404.astro` in BaseLayout with headline, subline and buttons, `/404/` unlisted, real 404 with noindex and no sitemap entry (AC-1, AC-6)
  - [x] Copy and editor pane: `not-found.yaml` collection, the zero rows query, empty result grid and status bar, Download fallback (AC-2, AC-4, AC-6, AC-7)
  - [x] Live path and the run: the visitor's path written safely, the running sequence then the one reveal, reduced motion and no JavaScript end states (AC-3, AC-5)
  - [x] Proven: both themes, keyboard, 320px with a long path, forced colors; remove the throwaway `404-preview.astro` (AC-1, AC-8)
- [ ] Verify it: `/check verify not found page`
Spec [0006](../specs/0006-not-found-page.md) · code in `src/pages/404.astro`, `src/lib/not-found/`, `src/content/not-found/`

### 15. Privacy page · in-progress
A plain `/privacy` page that states what the site collects today (nothing beyond hosting logs) and that the app stores passwords in the system keychain, linked from the footer. It grows when analytics (#10) lands.
**Done when:** the footer Privacy link resolves to this page, the text matches what the site and app really do, and it has its own title and description.
- [x] Design it (spec): `/architect privacy page`
- [ ] Build it: `/develop privacy page`
  - [x] Thin thread: `privacy` collection and schema (real contact email required), `/privacy/` with `h1`, date and version line, head, footer link (AC-1 to AC-4)
  - [x] The notice: six sections from the checked app facts, `splitAtMarker` with its test, the on disk files grid (AC-5 to AC-11, AC-13)
  - [x] Home correction: every visible keychain claim reworded, ids unchanged (AC-12)
  - [ ] Proven: both themes, keyboard, 320px, forced colors, no JavaScript, data folder paths checked on each OS (AC-10, AC-12, AC-14)
- [ ] Verify it: `/check verify privacy page`
Spec [0007](../specs/0007-privacy-page.md) · code in `src/pages/privacy.astro`, `src/content/privacy/`, `src/lib/privacy/`, `src/lib/site.ts`, Home copy (`src/content/home/`, `src/content/features/06-keychain.md`, `src/content/faq/04-passwords.md`, `src/components/home/cards/KeychainCard.astro`)

## Slice 10: Features page

### 16. Features page · in-progress
A deeper `/features` tour of every capability beyond the Home feature browser: each feature with screenshots in both themes, what it does, and which engines support it.
**Done when:** every feature from the features collection has its own section with a real screenshot that follows the theme, the Home browser links into the matching section, everything works by keyboard and stacks on a phone, and the page has its own title and description.
- [x] Design it (spec): `/architect features page`
- [ ] Build it: `/develop features page`
  - [x] Thin thread to a preview: `features-page.yaml` collection, `/features/` with head, opener `h1` and plain sections, `featureSlug`, header and footer Features links (AC-1, AC-8, AC-11)
  - [x] Content model, Compare tables and the matrix: `engines`, `capabilities`, `pageCard` fields, `supportMatrix` and `supportProblem` with tests, draft seed, `05-compare-tables.md` and renumbering, matrix result grid with the one reveal, engine line (AC-2, AC-3, AC-4, AC-5, AC-9, AC-10)
  - [x] Full sections, index and Home links: page popup cards, capabilities list, `VersionIndex` generalized to `SectionIndex` with the changelog rechecked, Home `More about` links, closing download (AC-5, AC-6, AC-7, AC-8)
  - [x] Page only features: `home` flag (default false, 7 entries opt in), `homeFeatures` on Home, query console and aggregation builder entries with renumbering, SQL editor and query builder MongoDB cells, `pipelineStage` and `shellResult` cards (AC-9, AC-10, AC-14 to AC-18)
  - [ ] Proven on production: engine support and new capabilities confirmed against the app, re-exported compare tables and aggregation builder screenshots, both themes, keyboard, forced colors, 360px, no JavaScript, design.md updated (AC-12, AC-13)
- [ ] Verify it: `/check verify features page`
Spec [0008](../specs/0008-features-page.md) · code in `src/pages/features.astro`, `src/components/features/`, `src/lib/features/`, `src/content/features-page/`, `src/content/features/`, `src/islands/SectionIndex.tsx`, `src/components/ui/SectionIndexed.astro`

## Deferred
Out of scope for the current build pass, kept so the plan stays honest.
- **Team server page**: explains the optional self hosted team server (skipped for now on 2026-10-13) · needs a decision
- **Live demo**: try the app in the browser (read only demo) · needs a decision
- **Docs and blog**: guides and announcements · needs a decision
- **Daily rebuild safety net**: a scheduled GitHub Action that calls the Vercel deploy hook once a day, only if the release hook proves unreliable · from spec 0002
- **Complete SHA256SUMS.txt in the app repo**: add both `.dmg` files and the `.msi` to the release's checksum file so it matches the download page · from spec 0005
- **Features page click counts**: once analytics (#10) lands, count Home `More about` links and support matrix links to see which features draw interest · from spec 0008
- **Changelog notes trimming**: cut the repeated install and first launch help from changelog notes once the Download page (#12) owns it, only if full notes prove too long · from spec 0005

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
