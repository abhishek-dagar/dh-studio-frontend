# 0003. Home page: a query that returns your download

**Date**: 2026-10-10
**Revised**: 2026-10-10 (the spatial hero and the usual landing page sections are replaced by an editor session: a query whose result is your download; see *Revision* at the end)
**Revised**: 2026-10-11 (the engines result grid becomes a schema diagram in the look of the app's schema designer: `dh_studio` in the center, one table per engine around it, joined by relation lines; see *Revision* at the end)
**Status**: In Progress

## Summary

This spec decides the whole Home page. Instead of a centered headline over a tilted screenshot, the page reads like one session in the app: the headline is the first comment line of a SQL editor, the query below it asks for downloads where the OS is yours, and the result grid holds your file as the highlighted row with the download button inside it. The OS value in the query is a clickable string that opens a small menu, so picking another system is part of the query. The rest of the page continues in the same voice: an engines schema diagram (a `dh_studio` table in the center, related to one table per engine, drawn like the app's schema designer), a feature browser with real screenshots and app popups drawn in HTML, a question and answer table, and a closing download. The OS detection, release data, first launch tips and fallback carried over from the first version of this spec; the design system (spec 0002 design system) is revised alongside it to drop the grid, glow, tilt and parallax.

## Context

> ⚠️ Premise note: the generic feel you named (the centered hero template, the grid, glow and glass, the usual section rhythm) does not live in this page alone. Spec 0002 design system set it on purpose ("in the style of Linear, Raycast, Vercel"), so a new Home on the old system would keep most of the tells. This revision therefore changes spec 0002 too (its *Revision: editor language*). Also, two specs still share the number 0002 (`0002-release-data-model.md` and `0002-design-system-ui-foundation/`); this spec calls them "spec 0002 release data" and "spec 0002 design system" (see Follow-up).

The site exists to get developers to download DH Studio, a native desktop client for SQLite, PostgreSQL and MongoDB. Home is the only real page for now, so it carries the whole job: show what the app is, prove the site is current, and hand each visitor the right file for their computer. Downloads per OS are the main success signal (scope #10 will measure them).

The first version of this page was planned on the design system's spatial hero: a centered or split headline, app windows tilted in red light over a faint grid, then a feature story, an FAQ accordion and a call to action band. You rejected that because it looks like every AI built landing page. The visitors are developers who live in SQL editors and table grids every day. That vernacular (a query, a result set, a status bar, a schema tree, an autocomplete popup) is something they recognize instantly and that no generic template carries.

The site is fully static (spec 0001). The built HTML can't know the visitor's OS. Detection can only happen in the browser after load, and the page must stay correct before that, or if it never happens. The release data (spec 0002 release data) is read once per build and is either `live` (version, date, files per OS) or `fallback` (only a link to the GitHub releases page). A live release has two Mac `.dmg` files (Apple Silicon and Intel, both `primary`), a Windows `.exe` (primary) and `.msi` (alternate), and a Linux AppImage (primary) plus `.deb` and `.rpm` (alternates): seven files.

The engines section first shipped as a small query result (one row per engine). It read as a second copy of the hero's result grid, so the section said nothing new in look. The app's own schema designer (table boxes with key and link icons, mono field names, muted types, and orthogonal relation lines in the accent color, the selected table outlined) is a picture of the product that no landing page template carries. The engine list also grows: Amazon DocumentDB was added after the first build, and more engines are likely, so the section must take a new engine from content with no layout work.

The builds are not code signed, so macOS Gatekeeper and Windows SmartScreen warn on first launch and many visitors give up there. Browsers can't reliably tell an Apple Silicon Mac from an Intel one (only Chromium answers if asked), and iPadOS reports itself as a Mac. The app's screenshots are dark only, and only two exist today. Project rules require WCAG AA in both themes, a reduced motion fallback for every effect, islands only for real interactivity with serializable props, pure helpers in `src/lib/`, and typed fallbacks instead of thrown errors.

## Requirements

**User stories**:
- As a developer landing on the site, I want to see at a glance that this is a database tool and get the right installer for my computer in one click.
- As a visitor on a Mac, Windows or Linux machine, I want the page to pick my system, and to switch to another system right inside the query, so a wrong guess never blocks me.
- As a visitor who just downloaded the app, I want to know how to get past the first launch warning.
- As a visitor on a phone, I want to see every file and know it is a desktop app, so I can install it later.
- As a keyboard, screen reader or reduced motion user, I want every part of the page to work and stay still when I ask.
- As the maintainer, I want copy, features and answers in content files and download links from live release data.

**Acceptance criteria** (the contract, each criterion is IDed and independently checkable):

*Slice 1, feature #6: the hero query and live download*

- **AC-1**: The built HTML of `/`, before any JavaScript runs, contains the design system header and footer and a hero `EditorPane` with: a tab strip showing `welcome.sql`; line 1, a SQL comment marker `--` (muted, mono) followed by the headline from the `home` entry as the page's only `h1` in display type; the query lines `select file, for, size` / `from downloads` / `where os in ('macos', 'windows', 'linux');` in mono with syntax token colors; a result grid (`id="download"`) listing all seven live files, ordered macOS, Windows, Linux and within an OS by the `pickFrom` order, each row showing the file name (mono), a plain "for" label (for example "Mac with Apple silicon"), the size, and a plain "Download" link to the file; and a status bar reading "{n} rows", "Version {version}", "released {Month D, YYYY}" (the version linking to the release page). Under the editor, aligned with the code column, sit the subline from content and the line "Free and open source under the Apache 2.0 license." with a "View source on GitHub" link.
- **AC-2**: After hydration on macOS, Windows or Linux, the where line becomes `where os = '{os}'` followed by the comment `-- your system`, and the result shows only that OS's files (macOS 2, Windows 2, Linux 3 rows). The first row is the detected primary (`pickFrom(downloads, os, arch).primary`): it is highlighted (a `bg-wash` fill and a 3px `--action` marker on its leading edge) and its action cell holds the page's primary button, "Download for macOS", "Download for Windows" or "Download for Linux", whose `href` is exactly that file's `url`. Other rows keep the plain "Download" link. The status bar count updates.
- **AC-3**: On a Mac the highlighted row is the Apple Silicon `.dmg` unless Chromium's architecture hint answers `x86`, in which case the Intel `.dmg` row moves to the top and takes the primary button. If the hint is missing, throws or never answers, Apple Silicon stays first. The swap happens at most once.
- **AC-4**: The OS value in the where line (`'macos'`) is a button that looks like any other string literal in the editor (same `--syntax-string` color and mono face, no box or chevron at rest). On hover and on keyboard focus it shows a dotted underline and the standard focus ring, and its accessible name is "Operating system: macOS, change". Activating it (click, Enter, Space, Down) opens a listbox on `--floating` with four options, each showing the literal in mono and a plain name: `'macos'` macOS, `'windows'` Windows, `'linux'` Linux, and "every system". Arrow keys move, Enter selects, Escape closes and focus returns to the trigger. Choosing an OS rewrites the where line and the rows (with that OS's primary highlighted, using the default arch for macOS); choosing "every system" returns to the `in (...)` form with all seven rows and no highlighted row, where the whole `('macos', 'windows', 'linux')` list is the trigger.
- **AC-5**: On iOS, iPadOS (a Mac user agent with more than one touch point), Android, ChromeOS or any OS not detected as macOS, Windows or Linux, the query stays on the `in (...)` form with all seven rows and no primary button, and an extra comment line appears under the where line: `-- DH Studio runs on your computer. Grab it there.` (text from content). The trigger from AC-4 is available on the list.
- **AC-6**: The result rows appear once. With JavaScript, an inline head script marks `<html>` with `data-js`; while the island has not finished detection, the result body is hidden (`visibility: hidden`) and holds the height of three rows, so nothing jumps when it narrows. When detection settles, the rows and status bar fade in over `--dur-reveal` (300ms, `--ease-out`). With `prefers-reduced-motion: reduce` they appear with no fade. If the island has not revealed the rows within 3 seconds (it failed to load), a CSS fallback shows the built seven rows anyway. Without JavaScript the rows are visible from the start. No other element on the page animates on load or on scroll.
- **AC-7**: Activating a macOS or Windows download anywhere in the hero or the closing section (the primary button or any row link) starts the download through a plain link (no `preventDefault`) and shows the first launch tip for that OS from the `launchTips` collection, directly under the result grid, styled as an editor notice (a `--surface` panel with a 1px `--line` border, the title in `--fg` weight 600, numbered steps because they are a sequence). It sits in a polite live region that is always present and has a "Hide tip" button. Linux shows no tip.
- **AC-8**: When the release data is `fallback`, the query stays on the static `in (...)` form with no trigger, the grid shows a single row reading "No release data in this build." with a "See releases on GitHub" link to the releases page, the status bar reads "0 rows", and the version and date are not rendered. The header Download and the closing section link to the releases page with the label "Download from GitHub".
- **AC-9**: With JavaScript disabled, the page is fully usable: all seven rows are visible with working links, the header Download jumps to `#download`, and no trigger, tip or reveal runs.
- **AC-10**: Below `md`, the editor keeps its look but the line number gutter is hidden, the query wraps inside the pane, and each result row becomes a block: file name, then "for" and size on one line, then its action at full width (the primary button at least 44px tall). The page has no horizontal scroll at 360px. Column headers are kept for assistive technology (the table stays a real `<table>`).
- **AC-11**: Screen readers get: the `h1` headline (the `--` marker is `aria-hidden`); the query exposed as a group labeled "Downloads for" containing only the OS trigger as an interactive item (the other query tokens are `aria-hidden`); and the result as a real table with a caption "Downloads", column headers, and one row per file. The line numbers are `aria-hidden`.
- **AC-12**: Every download anchor on the page carries `data-download-os`, `data-download-arch`, `data-download-format` and `data-download-placement` (`hero` for the highlighted primary, `hero-row` for other hero rows, `final` for the closing section), ready for analytics (#10).
- **AC-13**: The header Download button links to `/#download` on every page.
- **AC-14**: The page `<title>` and meta description come from the `home` content entry.
- **AC-15**: Every text and control meets WCAG AA contrast in both themes (the editor, grid, popup cards and status bar use role tokens and switch with the theme), every interactive element shows the design system focus ring, and a keyboard alone can reach and use every download path.
- **AC-16**: A Vercel production deploy shows the live version and date, and each OS gets its correct file.

*Slice 2, feature #7: engines and the feature browser*

- **AC-17** (revised 2026-10-11): An engines section (`id="engines"`) follows the hero: an `h2` from content, then an `EditorPane` in its `canvas` form (one decorative tab reading `Diagram`, no line gutter) holding a schema diagram drawn in HTML. In the diagram, a hub table named from content (`dh_studio`) has a key row `id` and one link row per engine, named by the engine's key (`sqlite`, `postgresql`, `mongodb`, `documentdb`), in content order. Each engine is a table box with a header (its monochrome icon in the current text color and its name), a key row `id`, then its 2 or 3 fields from content (field name in mono, type muted and right aligned), and its plain sentence from content directly under the box. Boxes use the app's look: `--surface` body, `--ground` header, 1px `--line` border, `rounded-field`, Geist Mono rows. The hub is outlined in `--action` like the app's selected table. No island and no JavaScript.
- **AC-24**: From `lg`, the hub sits in the center column, vertically centered, and the engines alternate sides in content order (1st left, 2nd right, 3rd left, and so on), each side stacked top to bottom. Each hub link row leaves the hub's edge on its engine's side, and a relation line in `--action` runs from that row to the engine's `id` row as a step line (a horizontal stub, a vertical lane, a horizontal stub ending in a small arrowhead at the engine), 1.5px wide. Lines are attached with CSS anchor positioning, so they stay on their rows whatever the sentences' wrapping, the font or the text size. Adding an engine is a content change only: a new row in `home.engines.rows` (plus its icon key) adds a link row to the hub, a box on the next side and its line, up to 8 engines. Where the browser lacks anchor positioning (`@supports not (anchor-name: --a)`), the lines are hidden and the boxes and hub still show in the same layout.
- **AC-25**: Below `lg`, the hub sits on top and the engine boxes stack under it in content order at full width, joined by a single vertical spine on the left edge running from the hub down to the last engine's `id` row, with a short branch into each box's `id` row (no anchor positioning needed). Nothing scrolls sideways at 360px. A screen reader gets the `h2`, then a list labeled "Engines" with one item per engine, each an `h3` (the engine name) and its sentence; the hub, the field rows, the icons and the lines are `aria-hidden`. In forced colors the boxes keep a 1px `CanvasText` border and the lines draw in `CanvasText`. Every text in the diagram meets AA contrast in both themes. Nothing in the section moves or reacts to the pointer.
- **AC-18**: A feature browser section (`id="features"`) shows an `h2`, then a sidebar labeled "Features" listing seven features in this order: table grid, SQL editor, schema designer, query builder, split view, command palette, keychain passwords, then "Team server" marked "coming later". From `lg`, it is a vertical tabs widget: one panel shown at a time, the sidebar items are tabs, Up and Down (and Home, End) move between tabs, Enter or Space or focus selects (automatic activation), and the panel is labeled by its tab. Below `lg`, and with JavaScript disabled at any width, every feature is shown stacked in order, and the sidebar items are in page anchor links to each feature.
- **AC-19**: Each feature panel shows an `h3` title, one or two sentences of benefit, and a real app screenshot in an `AppWindow` (raised level, no tilt), with alt text from content. Features with a popup (all except team server) show one `PopupCard` drawn in HTML floating over the screenshot at the feature's position: table grid, a filter popover (`status` `=` `'paid'`, Apply); SQL editor, an autocomplete list of three columns with types; schema designer, a column properties card (name, type, nullable, default); query builder, a join card (`orders` to `customers` on `customer_id`); split view, a context menu with "Open to the side" and its key; command palette, the palette itself (an input reading `orders` and three results, with ⌘ K); keychain passwords, a password field reading "Saved in your system keychain". Cards are decorative copies (`aria-hidden`); the panel text carries the meaning. Below `md` the card is hidden.
- **AC-20**: Screenshots load lazily as responsive AVIF and WebP. A feature entry with no screenshot renders a labeled placeholder frame of the same size in preview and local builds, and a production build (`VERCEL_ENV=production`) with any missing screenshot fails, naming the entry. `navLinks` gains "Features" pointing to `/#features`.

*Slice 3, feature #8: questions and the closing download*

- **AC-21**: A questions section (`id="questions"`) shows an `h2` and a real `<table>` with a "question" and an "answer" column header and one row per `faq` entry, in order: is it free and open source, which systems it runs on, why the system warns on first launch (and how to get past it), and where passwords are stored. Each question is a row header (`th scope="row"`), each answer plain text (a blank line starts a new paragraph). Below `md` each row stacks the question above its answer. `navLinks` gains "Questions" pointing to `/#questions`.
- **AC-22**: A closing section (`id="get"`) shows a short `EditorPane` with a single comment line in h2 size, `-- Ready when you are.` (text from content), and under it the same download island in its `compact` form: the detected primary button and plain links to that OS's other files, plus "All systems" linking to `#download`. With fallback data it shows the GitHub link (AC-8); without JavaScript it shows a neutral "Download DH Studio" link to `#download`; on a phone it shows only the "All systems" link with the desktop comment.
- **AC-23**: Every footer link resolves to a live page (no privacy link until #10).

## Options considered

### Option 1: Static editor in `.astro`, one download island, a script for tabs

The editor pane, engines and questions are static `.astro`. One React island, `DownloadQuery`, owns the part that truly changes: the where line, the OS trigger (Base UI `Select`), the result rows, the status bar and the tip. The feature browser renders every panel in `.astro` (so screenshots use Astro `<Picture>`) and a small processed `<script>` upgrades the sidebar to the ARIA tabs pattern from `lg`.

**Pros**:
- The headline, the full file list and every feature render at first paint and work with no JavaScript.
- One island holds all download state, so the trigger, the rows and the tip can't disagree.
- Feature screenshots stay Astro images, and the tabs need a few dozen lines of script, not a React tree.

**Cons**:
- Two kinds of interactivity on one page (an island and a processed script).
- The tabs keyboard logic is hand written, so it needs its own careful test.

### Option 2: Everything interactive as React islands, tabs with Base UI

`DownloadQuery` as above, plus a `FeatureBrowser` island on Base UI `Tabs`, with the screenshots passed in as Astro slots.

**Pros**:
- Base UI handles the tabs keyboard model and ARIA.
- One interactivity model on the page.

**Cons**:
- Seven screenshot panels and popup cards must cross into React as slots; Astro's slots for a variable list are awkward, and the panels then hydrate as React for what is mostly static content.
- The stacked no JavaScript layout must be rebuilt separately, because the island renders only the selected panel.

### Option 3: No islands, native elements plus scripts

A native `<select>` styled as the string literal, a processed script that swaps rows, and the tabs script.

**Pros**:
- The least JavaScript; a native select works on every device.

**Cons**:
- A native `<select>` can't be styled to blend into the code the way you asked (its open list is the browser's own), and on desktop it breaks the editor illusion.
- Row swapping, focus and the live region move into hand written DOM code outside the island and pure helper pattern.

## Decision

**Chosen option**: Option 1: Static editor in `.astro`, one download island, a script for tabs

Home is a static Astro page in the new editor language of the design system, with one `DownloadQuery` island (Base UI `Select` for the OS literal) that owns detection, the where line, the rows, the status bar and the tip, and a progressive enhancement script that turns the stacked feature list into vertical tabs from `lg`.

**Implementation skills**: `frontend-design` (`.agents/skills/frontend-design/`, source not recorded): copy and type treatment for the editor hero (no eyebrow labels, no middle dot meta strings, no arrow in button text, one memorable element).

## Rationale

The forces are a static site that can't know the OS ahead of time, a download that must work before and without JavaScript, and your brief: a design that doesn't read as a template. The query to result hero answers the brief from the subject itself. It speaks the visitor's daily language, and it makes the page's one job (the right file) the memorable element instead of decoration. The `in (...)` built state is the honest no JavaScript answer: the query that returns every file is exactly what the HTML can know at build time, and detection only narrows it.

Option 1 meets the technical forces by construction. The built HTML is complete; the island only upgrades the part that depends on the visitor. Base UI `Select` gives the listbox keyboard model and focus return without hand written code, and its trigger can be styled down to a bare string literal, which a native `<select>` can't do on desktop. Option 2 would hydrate seven static panels as React to save a short script. The runner up for the tabs is exactly that Base UI `Tabs` island, worth switching to if the hand written script proves fragile in `/check verify`.

**Engines diagram (revision 2026-10-11).** The forces are a section that should show the product rather than repeat the hero's grid, an engine list that will grow, a static site with an islands rule, and WCAG AA. A schema diagram meets the first from the product itself. Drawing it as HTML boxes (not an image, not an island) keeps it themed, readable by screen readers and free of JavaScript. The hub in the center with engines alternating sides is your call ("dh_studio in the center and engines around it, so we can add more"): alternating keeps the two sides balanced at any count, and it means two neighbouring hub rows always leave on opposite sides, so lines never bunch. The one hard part is keeping lines on their rows while sentences wrap; CSS anchor positioning ties each line to the two rows it joins, so no geometry is guessed. Options weighed:
- React Flow as an island (real pan, zoom, drag, like the app): rejected, a large bundle and an island for a decoration, against the islands rule.
- A cropped screenshot of the real schema designer: rejected, dark only, no per engine text, and it repeats the schema designer panel in the feature browser.
- One inline SVG over fixed geometry (exact in every browser): runner up for the lines. It needs every box at a known height, so the sentences would have to leave the boxes for a caption row, or sit in a fixed reserve that a font swap can overflow.
- A fixed four corner layout: rejected, it caps the count at four.

**Small calls made here** (each with its runner up):
- Section order hero, engines, features, questions, closing (you left it to me): "does it support my database" is the first question after "what is it", so engines comes straight after the hero (runner up: features first, with engines folded into the sidebar).
- macOS shows both `.dmg` rows rather than an `arch` filter line in the query: the query stays short and the Intel row is one glance away (runner up: an `and arch = 'apple silicon'` line, which would put the arch guess on screen as a claim).
- Hide the rows until detection, with a three row height reserve and a 3 second CSS fallback, instead of showing seven rows and narrowing (runner up: show all then narrow, which jumps the page once on every desktop visit).
- The "every system" option on the trigger, so anyone can get back to the full list without a separate link (runner up: a "Show all systems" button in the status bar).
- Questions as a two column table instead of the `Accordion`, so every answer is visible and the page keeps the result set voice (runner up: the `Accordion`, which hides the first launch help behind a click).
- The closing section reuses the island in a `compact` form rather than a second full query, so the page ends quietly (runner up: no closing download, relying on the header button).
- Remove the separate "All downloads" list from the first version; the hero's `in (...)` state is that list.
- Engines diagram: the hub's link row names come from each engine's `icon` key, so nothing is typed twice (runner up: a separate `key` field per row, worth adding only if two engines ever share an icon).
- Engines diagram: a `canvas` form of `EditorPane` (no gutter, no line counter) instead of putting the diagram in the `result` slot under an empty code area (runner up: a bare canvas with no pane, which breaks the editor session voice).
- Engines diagram: one shared `DiagramTable` box in `components/editor/`, used by the hub and the engines, so the diagram reads as one system and the showcase can show it (runner up: markup local to `Engines.astro`).
- Engines diagram: lane order on a side follows a pure rule (see *Engines diagram*), so lines on the same side don't cross at any count (runner up: every lane at the gutter midpoint, which merges overlapping lines into one trunk).
- Engines diagram: accent lines and the accent hub outline extend the Red's job list in `design.md` (it already covers selection; the hub is drawn as the selected table). Runner up: neutral `--line-strong` lines, quieter but less like the app.

## Feature design

### Page composition

Order inside `<main>` (header and footer from `BaseLayout`):

| # | Section | Component | id | Slice |
|---|---|---|---|---|
| 1 | Hero: editor, query, result, subline | `components/home/Hero.astro` with the `DownloadQuery` island | `download` on the result grid | #6 |
| 2 | Engines | `components/home/Engines.astro` | `engines` | #7 |
| 3 | Feature browser | `components/home/FeatureBrowser.astro` + `FeaturePanel.astro` + `components/home/cards/*.astro` | `features` | #7 |
| 4 | Questions | `components/home/Questions.astro` | `questions` | #8 |
| 5 | Closing download | `components/home/Closing.astro` with `DownloadQuery` in `compact` form | `get` | #8 |

**Layout.** Everything is left aligned inside `Container` (`content` width). Nothing is centered. Section headings are `h2` in `text-h2`, plain sentence case, no eyebrows. Sections are separated by `--space-section` only (no divider bands, no alternating backgrounds).

**Hero, top to bottom.** The `EditorPane` (design system, spec 0002 design system revision): tab strip (`welcome.sql`, active), then the code area with the gutter and lines, then the result grid and status bar inside the same pane. Line 1 is the headline row: the gutter number aligns to the headline's first baseline. Below the pane, indented to the code column from `md` (the gutter width), the subline in `text-lead` `--fg-muted` and the open source line. The first launch tip region sits between the result grid and the subline.

**Query lines by state** (tokens: keywords `--syntax-keyword`, strings `--syntax-string`, operators and punctuation `--syntax-punctuation`, comments `--syntax-comment`, identifiers `--syntax-fg`):

| State | Where line | Extra line | Rows |
|---|---|---|---|
| built, pending, `other`, "every system" | `where os in ('macos', 'windows', 'linux');` | `other` only: `-- DH Studio runs on your computer. Grab it there.` | all 7, no highlight |
| `desktop(os)` or picked OS | `where os = 'macos';   -- your system` (the comment only when the OS is the detected one) | none | that OS's files, primary highlighted |
| fallback | `where os in ('macos', 'windows', 'linux');` (no trigger) | none | one message row |

Lines 1 to 3 (`--` headline, `select file, for, size`, `from downloads`) never change.

**Closing section.** A short `EditorPane` with no tab strip text other than `get.sql`, one comment line in `text-h2` size, then the compact download block.

### Engines diagram (revision 2026-10-11)

**Boxes.** `DiagramTable` draws one table the way the app does: a header row on `--ground` (a 14px icon slot, then the name in Geist Mono 13px weight 600, as an `h3` for engines and plain text for the hub), then rows of Geist Mono 12px, each a leading 12px icon (lucide `key-round` for `id`, `link-2` for a hub link row, none for a field), the name in `--fg`, and the type right aligned in `--fg-muted`. Body on `--surface`, 1px `--line` border, `rounded-field`, `--line` dividers between rows. Box width 15rem from `lg`, full width below. `selected` adds a 1px `--action` outline (the hub). Field rows and icons are `aria-hidden`; the engine sentence is a `<p>` in `--fg-muted` 14px under the box, inside the same list item.

**Layout from `lg`.** One grid of five columns: left boxes, left gutter, hub, right gutter, right boxes (gutters at least 4rem). The `ul` (labeled "Engines") spans the row as a subgrid so its items land in the side columns while it keeps list semantics (never `display: contents` on the `ul`). Item `i` goes to `side` and grid row `sideIndex + 1` from `diagramLayout`; a side's items stack with a 2rem gap. The hub (`aria-hidden`) sits in the center column spanning every row, vertically centered. Its link rows follow content order, so neighbouring rows leave on opposite sides.

**Lines.** Each hub link row sets `anchor-name: --hub-{key}` and each engine's `id` row sets `anchor-name: --engine-{key}`. After the boxes in source order, the diagram holds three absolutely positioned, `aria-hidden` pieces per engine, all in `--action`, 1.5px: a hub stub (from the hub's edge to the lane, at the hub row's center), an engine stub (from the lane to the engine box's edge, at the `id` row's center, ending in a 6px arrowhead), and a lane (a vertical piece at the lane's x, from `min()` of the two rows' centers to the other, so it works whether the engine sits above or below its row). Lane x on a side = the gutter's middle, moved toward the boxes by `lane * 0.75rem`. Everything lives in `@supports (anchor-name: --a)`; without it the pieces are `display: none`.

**Lane rule** (in `diagramLayout`, unit tested). On a side with `m` engines, the engine at `sideIndex` `k` (from 0) gets `lane = k` when `k < ceil(m / 2)` and `lane = m - 1 - k` otherwise. Engines above the hub's middle step down to their rows and those below step up; this ordering keeps a stub from crossing a neighbour's lane. For 4 engines (2 per side) every lane is 0; for 8 (4 per side) lanes are 0, 1, 1, 0.

**Below `lg`.** The hub on top, then the list. Each item gets a 1px `--action` left border offset 1rem from the boxes, joined from item to item, which forms the spine; the last item's border stops at its `id` row's center. A 1rem branch from the spine meets each `id` row. Lines here are plain borders, so they show in every browser.

**Forced colors.** Boxes keep a 1px `CanvasText` border, the hub a 2px one; the lines, arrowheads and spine use `CanvasText`.

### Component inventory

| Piece | Kind | New or existing |
|---|---|---|
| `Header` (glass pill), `Footer`, `Logo`, `ThemeToggle` | design system | existing; Download target changes (`site.ts`) |
| `EditorPane`, `ResultGrid` styles, `PopupCard` | design system, `components/editor/` | new in spec 0002 design system revision (built in this feature's slice 1 if not already) |
| `AppWindow` | design system | existing, simplified to the raised screenshot frame (spec 0002 design system revision) |
| `Button` / `buttonClass` (pill), `Link`, `Kbd`, `Container`, `Section` | design system | existing |
| `Hero`, `Engines`, `FeatureBrowser`, `FeaturePanel`, `Questions`, `Closing` | `.astro` in `components/home/` | new |
| Seven card bodies: `FilterCard`, `AutocompleteCard`, `ColumnCard`, `JoinCard`, `ContextMenuCard`, `PaletteCard`, `KeychainCard` | `.astro` in `components/home/cards/`, each wraps `PopupCard` | new (#7) |
| `DownloadQuery` | island `src/islands/DownloadQuery.tsx`, `client:idle` | new (#6); Base UI `Select`, `buttonClass`, `lucide-react` |
| Feature tabs enhancement | processed `<script>` in `FeatureBrowser.astro` | new (#7) |
| `EditorPane` `canvas` prop | design system, `components/editor/EditorPane.astro` | changed (revision 2026-10-11): renders the default slot in `.editor-canvas` (on `--ground`, padded, no gutter, no line counter) |
| `DiagramTable` | design system, `components/editor/DiagramTable.astro` | new (revision 2026-10-11): a schema table box (header icon and name, rows with key or link icon, mono name, muted type), props `name`, `rows`, `selected?`, `headingLevel?`, slot `icon` |
| Engines diagram layout | pure, `src/lib/home/engines.ts` | new (revision 2026-10-11): `diagramLayout` |
| Engine icons | SVG `src/assets/icons/databases/{sqlite,postgresql,mongodb}.svg` (Simple Icons, CC0), Astro SVG components, `fill="currentColor"`, `aria-hidden` | new (#7) |
| `SpatialScene`, `GridBackdrop`, `ParallaxField`, `Accordion` | design system | not used on Home (the first three are removed by the spec 0002 design system revision; `Accordion` stays in the system) |

### Data model sketch

No persistence. Content collections (build time, validated) and the island's props (serializable, derived at build time).

**Content collections** (`src/content.config.ts`):

| Collection | Loader and path | Entries | Schema (all required unless noted) |
|---|---|---|---|
| `home` | `file('src/content/home/home.yaml')` | one, id `home` | `meta {title, description}`; `hero {headline, subline, openSource, viewSource}`; `query {otherComment, yourSystemComment, everySystem, triggerLabel}`; `download {detectedPrefix, neutral, fallback, fallbackRow, seeReleases, allSystems, hideTip, rowLink, rowsWord, versionPrefix, releasedWord}`; `engines {heading, hub, rows: [{name, icon: 'sqlite' \| 'postgresql' \| 'mongodb' \| 'documentdb', what, fields: [{name, type}]}]}` (rows 1 to 8, 4 today; `hub` at most 16 characters; `fields` 2 to 3 per row, `name` at most 16 and `type` at most 12 characters so a row never truncates; `icon` unique across rows; revised 2026-10-11); `features {heading}`; `questions {heading}`; `closing {comment}` |
| `launchTips` | `file('src/content/home/launch-tips.yaml')` | ids `macos`, `windows` | `title`, `steps: string[]` (at least 1) |
| `features` | `glob('src/content/features/*.md')` | 8 (#7) | frontmatter `order: number` (unique), `title`, `tab` (short sidebar name), `image: image().optional()`, `alt`, `card: 'filter' \| 'autocomplete' \| 'column' \| 'join' \| 'contextMenu' \| 'palette' \| 'keychain'` (optional, absent for team server), `cardPosition: {x, y, width}` (percent strings, required when `card` is set), `later: boolean` (optional, team server); body = benefit text |
| `faq` | `glob('src/content/faq/*.md')` | 4 (#8) | frontmatter `order: number` (unique), `question`; body = plain text answer |

**Island props** (`src/lib/home/download.ts`, built from `ReleaseResult` at build time):

```ts
export type DownloadEntry = {
  readonly os: Os; readonly arch: Arch; readonly format: Format; readonly role: Role;
  readonly fileName: string;   // shown in mono in the file column
  readonly forLabel: string;   // "Mac with Apple silicon", "Mac with Intel", "Windows installer", "Windows MSI package", "Linux AppImage", "Debian and Ubuntu", "Fedora and RHEL"
  readonly sizeLabel: string;  // "38.2 MB"
  readonly url: string;
};
export type DownloadData =
  | { readonly status: 'live'; readonly version: string; readonly publishedAt: string;
      readonly dateLabel: string; readonly pageUrl: string; readonly downloads: readonly DownloadEntry[] }
  | { readonly status: 'fallback'; readonly releasesPageUrl: string };

export type QueryState =
  | { readonly kind: 'all' }                                     // built, pending, other, "every system"
  | { readonly kind: 'os'; readonly os: Os; readonly arch?: Arch; readonly detected: boolean };

// Pure: the rows a state returns, in display order, and which one is highlighted.
export const rowsFor: (downloads: readonly DownloadEntry[], state: QueryState) =>
  { readonly rows: readonly DownloadEntry[]; readonly primary?: DownloadEntry };
```

Release notes never cross into the island.

**Detection** (`src/lib/platform/detect.ts`, pure, unchanged from the first version):

```ts
export type PlatformHints = {
  readonly userAgent: string;
  readonly uaPlatform?: string;    // navigator.userAgentData?.platform
  readonly maxTouchPoints: number;
  readonly architecture?: string;  // from getHighEntropyValues(['architecture']), when answered
};
export type Detected =
  | { readonly kind: 'desktop'; readonly os: Os; readonly arch?: Arch }
  | { readonly kind: 'other' };
export const detectPlatform: (hints: PlatformHints) => Detected;
```

Rules, first match wins: a `uaPlatform` of `macOS`, `Windows` or `Linux` maps directly, any other `uaPlatform` (`Android`, `Chrome OS`, `iOS`) is `other`. Without `uaPlatform`: `iPhone|iPad|iPod|Android|CrOS` in the user agent is `other`; `Macintosh` with `maxTouchPoints > 1` is `other` (iPadOS); `Macintosh` is `macos`; `Windows` is `windows`; `Linux` or `X11` is `linux`; anything else is `other`. Architecture applies to macOS only: `arm` gives `arm64`, `x86` gives `x64`, anything else leaves `arch` undefined.

### State transitions

`DownloadQuery` holds three pieces of client state:

- **Detection**: `pending` (built HTML, rows hidden under `data-js`) → `desktop(os, arch?)` or `other`, once, in an effect after hydration; then `revealed`. The architecture hint may move a Mac from `arm64` to `x64` once when it answers (before or after reveal); it never moves back.
- **Query**: starts as `all`; detection sets `os(detected os, detected: true)` for desktop and leaves `all` for `other`. The trigger moves between `all` and `os(any, detected: os === detected os)` freely.
- **Tip**: `hidden` → `shown(os)` on activating a macOS or Windows download; `shown` → `hidden` on "Hide tip"; a later download for the other OS replaces it.

Fallback data skips all three: the island renders the fallback row and never detects. The `compact` form shares the rules but has no trigger and no rows, only the primary and links.

### API surface

No HTTP endpoints. The interfaces are the island, the pure helpers and the changed shared pieces:

| Interface | Kind | Key inputs | Key outputs | Auth | Key errors / fallbacks |
|---|---|---|---|---|---|
| `DownloadQuery` | island, `client:idle` | `data: DownloadData`, `copy` (from `home.query` and `home.download`), `tips` (from `launchTips`), `form: 'hero' \| 'compact'` | where line, trigger, rows, status bar, tip region, `data-download-*` attributes | public | `fallback` renders the GitHub row; detection failure stays on `all` and reveals |
| `toDownloadData(result)` | pure, `src/lib/home/download.ts` | `ReleaseResult` | `DownloadData` | n/a | never throws |
| `rowsFor(downloads, state)` | pure, `src/lib/home/download.ts` | entries, `QueryState` | rows and optional primary | n/a | `all` returns every entry, no primary |
| `pickFrom(downloads, os, arch?)` | pure, `src/lib/release/pick.ts` | downloads, `Os`, optional `Arch` | `{ primary, alternates }` | n/a | unknown arch falls back to the OS default; `pickDownloads` delegates to it |
| `detectPlatform(hints)` | pure, `src/lib/platform/detect.ts` | `PlatformHints` | `Detected` | n/a | unknown input gives `other` |
| `formatReleaseDate(iso)`, `formatSize(bytes)`, `forLabel(d)`, `osName(os)` | pure, `src/lib/home/format.ts` | ISO string, bytes, `Download`, `Os` | display strings | n/a | none |
| Feature tabs script | processed `<script>` in `FeatureBrowser.astro` | the rendered list and panels | ARIA tabs from `lg` (`matchMedia('(min-width: 64rem)')`), stacked below and on change back | n/a | no script or an error leaves the stacked layout |
| `diagramLayout(rows)` | pure, `src/lib/home/engines.ts` | the `engines.rows` entries | per engine, in content order: `key` (the icon key), `side: 'left' \| 'right'` (index 0 left, then alternating), `sideIndex` (position within its side, from 0), `lane` (0 is nearest the hub, see *Engines diagram*), and the two anchor names `--hub-{key}` and `--engine-{key}`; plus `rowsPerSide` | n/a | never throws; an empty list gives no engines |
| `site.ts` | constants | n/a | `downloadHref = '/#download'` (replaces `releasesLatestUrl` in `Header`); `navLinks` gain Features (#7) and Questions (#8) | n/a | none |
| Head script in `BaseLayout.astro` | inline | none | sets `data-js` on `<html>` next to `data-theme` | n/a | none |

### Value sourcing

| Action | Value produced / displayed | Source |
|---|---|---|
| Hero line 1 | Headline | `home.hero.headline` ("Every database, on one quiet desk.") |
| Hero query | Fixed lines and the `in (...)` literals | constants in `Hero.astro` / `DownloadQuery` (the three OS literals come from `Os`, in macOS, Windows, Linux order) |
| Hero query | `-- your system`, the `other` comment | `home.query.yourSystemComment`, `home.query.otherComment` |
| OS trigger | Accessible name | `home.query.triggerLabel` with `{os}` replaced by `osName(os)` (`macOS`, `Windows`, `Linux`, constants in `format.ts`) |
| OS trigger | Options | the three `Os` values plus `home.query.everySystem` |
| Detected OS and arch | os, arch | `detectPlatform` over `navigator.userAgent`, `navigator.userAgentData?.platform`, `navigator.maxTouchPoints`, and on macOS `navigator.userAgentData.getHighEntropyValues(['architecture'])` (try/catch, ignored if it rejects) |
| Result rows | Which files, order, highlighted primary | `rowsFor(data.downloads, state)`, which uses `pickFrom` per OS (primary, then primaries of other arches, then alternates); `all` concatenates macOS, Windows, Linux |
| Result row | File name, for label, size | `DownloadEntry.fileName`, `forLabel(download)` (fixed map by `os`, `arch`, `format` in `format.ts`), `formatSize(sizeBytes)` (decimal MB, one decimal, `en-US`) |
| Primary button | Label, URL | `home.download.detectedPrefix` + `osName(os)`; `primary.url` |
| Row link | Label, URL | `home.download.rowLink` ("Download"); `entry.url` |
| Status bar | Row count | `rows.length` + `home.download.rowsWord` |
| Status bar | Version, date, link | `release.version`, `formatReleaseDate(release.publishedAt)` (`en-US`, `dateStyle: 'long'`, `timeZone: 'UTC'`, at build time), `release.pageUrl` |
| Fallback row | Text, URL | `home.download.fallbackRow`, `home.download.seeReleases`; `releasesPageUrl` (`RELEASES_PAGE_URL`) |
| First launch tip | Title, steps | `launchTips` entry whose id equals the activated download's `os` |
| Analytics attributes | os, arch, format, placement | the `DownloadEntry` fields plus placement `hero` / `hero-row` / `final` by control |
| Subline, open source line | Text, GitHub URL | `home.hero.subline`, `home.hero.openSource`, `home.hero.viewSource`; `repoUrl` in `site.ts` |
| Header Download | URL | `downloadHref` in `site.ts` |
| Pending reveal | Whether JS runs | `data-js` on `<html>`, set by the head script |
| Engines diagram | Engine names, icons, sentences, field rows | `home.engines.rows` (`name`, `icon`, `what`, `fields`); icon files in `src/assets/icons/databases/`, DocumentDB the lucide `database` icon |
| Engines diagram | Hub name | `home.engines.hub` (`dh_studio`) |
| Engines diagram | Hub link row names and order | each row's `icon` key, in content order (`diagramLayout`) |
| Engines diagram | The `id` key row in every box | constant in `Engines.astro` (`id` with the key icon, no type) |
| Engines diagram | Side, grid row, lane, anchor names per engine | `diagramLayout(home.engines.rows)` |
| Engines diagram | Tab label `Diagram` | constant in `Engines.astro` (decorative) |
| Engines diagram | Whether lines show | the browser's support for `anchor-name` (`@supports`) |
| Feature browser | Tab name, title, benefit, screenshot, alt, order, card, card position, later flag | `features` entry frontmatter and body; screenshots in `src/assets/screenshots/` |
| Popup card | Its sample text | fixed sample content inside each card component (the strings listed in AC-19) |
| Missing screenshot | Build failure in production | `VERCEL_ENV` (already declared via `astro:env` in spec 0002 release data) equals `production` and an entry has no `image` |
| Questions | Questions, answers | `faq` entries sorted by `order` |
| Closing | Comment line | `home.closing.comment` ("Ready when you are.") |
| Page title, description | Text | `home.meta`, passed to `BaseLayout` |

### Draft copy (goes into content, edit freely)

- Headline: "Every database, on one quiet desk."
- Subline: "DH Studio is a fast native desktop client for SQLite, PostgreSQL and MongoDB. Browse tables like a spreadsheet, write SQL with a real editor, and keep every password in your system keychain."
- Query copy: "your system", "DH Studio runs on your computer. Grab it there.", "every system", trigger label "Operating system: {os}, change"
- Download copy: "Download for", "Download DH Studio", "Download from GitHub", "No release data in this build.", "See releases on GitHub", "All systems", "Hide tip", "Download", "rows", "Version", "released"
- Engines heading "Works with the databases you already run"; SQLite "Open any .db file and see every table."; PostgreSQL "Local or remote, with the password in your keychain."; MongoDB "Collections as rows, nested fields you can expand."; Amazon DocumentDB "Your MongoDB compatible clusters on AWS, opened the same way."
- Engines diagram (revision 2026-10-11): hub `dh_studio`. Fields, `name` then `type`: SQLite `file` `.db`, `server` `none`; PostgreSQL `host` `any`, `password` `keychain`, `schemas` `all`; MongoDB `documents` `as rows`, `nested` `expandable`; Amazon DocumentDB `cluster` `aws`, `wire` `mongodb`. Check each against the app before shipping.
- Features heading "Everything you reach for, in one sidebar"; questions heading "Before you install"; closing "Ready when you are."
- Meta title "DH Studio, a fast desktop client for SQLite, PostgreSQL and MongoDB"; description "A free, open source desktop app to browse, query and design SQLite, PostgreSQL and MongoDB databases. For macOS, Windows and Linux."
- macOS tip "If macOS says DH Studio can't be opened": "Open System Settings, then Privacy and Security." · "Find the message about DH Studio and choose Open Anyway." · "Confirm with your password. You only do this once."
- Windows tip "If Windows protected your PC appears": "Choose More info." · "Choose Run anyway. You only do this once."
- FAQ: as in the first version (free and open source under Apache 2.0; macOS on Apple silicon and Intel, 64 bit Windows, 64 bit Linux as AppImage, `.deb` or `.rpm`; the builds aren't code signed yet, then the tip steps plus `chmod +x` for the AppImage; passwords in the operating system's credential store, never in plain files, wording confirmed against the app)

### Key invariants

- The built HTML is a complete page: all seven files are reachable with no JavaScript (AC-9).
- The primary button's `href` is always a real file from the live release (or the releases page in fallback), never a guess outside `data.downloads`.
- At most one primary (red) button is visible in the hero, and only in an `os` state.
- The result rows reveal once per page load; after that, trigger changes swap rows with no animation (only the tip region announces changes).
- No element animates on load or scroll except the reveal (AC-6). No parallax, tilt, glow or grid anywhere on the page.
- Popup cards are decorative and `aria-hidden`; nothing essential lives only in a card.
- The engines diagram's meaning lives in the list (name and sentence); the hub, field rows and lines are decoration. The layout reads only from `home.engines.rows`, so adding an engine never touches `Engines.astro`.
- Islands receive serializable props only; `DownloadQuery` never receives the release notes.
- Expected failures (no `userAgentData`, a rejected hint, fallback data, a missing preview screenshot, the island failing to load) take a defined path; nothing throws.

### Security model

A public static page with no accounts, forms or user data. Nothing is stored (the tip and the trigger choice are per visit). All text comes from the repo's content files and the build time release data, rendered as text, never as HTML. Download links point only at `github.com` release asset URLs from the GitHub API response (spec 0002 release data); no URL is built from user input. Links open in the same tab. The architecture hint reveals only the CPU family and stays on the visitor's machine.

**Configuration required**: none new (`GITHUB_TOKEN` and `VERCEL_ENV` are already declared by spec 0002 release data).

**Critical test scenarios** (each maps to an acceptance criterion):
- Happy path: on Windows Chrome, the deployed page narrows to `where os = 'windows';   -- your system`, two rows, the `.exe` row highlighted with "Download for Windows" linking to the live installer, and clicking it shows the SmartScreen tip. Verifies **AC-2**, **AC-7**, **AC-16**.
- Trigger: Tab to `'windows'`, press Enter, choose `'linux'`: three Linux rows, AppImage highlighted, no `-- your system` comment; choose "every system": seven rows, no highlight; Escape at any point returns focus. Verifies **AC-4**.
- Mac arch: Chromium with the hint reporting `x86` puts the Intel row first with the primary button; Safari keeps Apple silicon first. Verifies **AC-3**.
- Phone and iPad: an iPhone and an iPad (desktop mode) user agent keep seven rows, no primary button, and show the desktop comment. Verifies **AC-5**.
- No JavaScript: seven rows visible at once, every link works, no trigger. Verifies **AC-1**, **AC-9**.
- Reveal: with throttled JS, the result area keeps its height until detection, then fades in once; with reduced motion it appears with no fade; with the island blocked, the seven rows appear after 3 seconds. Verifies **AC-6**.
- Fallback: a local build with the network off shows "0 rows", the GitHub row and no version. Verifies **AC-8**.
- Phone layout: at 360px the gutter hides, rows stack with full width actions, no sideways scroll. Verifies **AC-10**.
- Screen reader: VoiceOver reads the headline, "Downloads for, Operating system: Windows, change", then the table with its caption and headers. Verifies **AC-11**.
- Engines diagram: at 1280px in Chrome and Safari, four boxes alternate left and right of `dh_studio` and each line meets its hub row and its engine's `id` row; at 200% text size the lines still meet their rows; with a fifth row added to content locally, a fifth box and line appear on the left with no code change; in a browser without anchor positioning the boxes show with no lines; at 360px the boxes stack under the hub on one spine with no sideways scroll; VoiceOver reads the heading and a list of four engines with their sentences. Verifies **AC-17**, **AC-24**, **AC-25**.
- Unit tests (Vitest) for `diagramLayout`: sides alternate from left; `sideIndex` counts per side; lanes for 1 to 8 engines follow the rule; anchor names are unique. Verifies **AC-24**.
- Feature tabs: at 1280px, arrow keys move between eight tabs and the panel follows; at 900px and with JS off, all features are stacked and the sidebar links jump. Verifies **AC-18**, **AC-19**.
- Missing screenshot: a preview build shows the placeholder; a build with `VERCEL_ENV=production` fails naming the entry. Verifies **AC-20**.
- Unit tests (Vitest): `detectPlatform` over a table of real user agents; `rowsFor` for `all`, each OS, and Mac arch `x64`; `pickFrom`, `toDownloadData`, `formatSize`, `formatReleaseDate`, `forLabel` against the v0.5.5 fixture. Verifies **AC-2**, **AC-3**, **AC-4**, **AC-5**, **AC-8**.

## Build plan

Tracer Bullet: first a thin real thread from live release data to a deployed, OS aware result row, then thicken the hero, then add each section. Precondition: the spec 0002 design system revision (editor language) is built first, or at least its milestone that delivers `EditorPane`, `ResultGrid` styles, `--dur-reveal` and the removal of the old stage, so Home composes from it.

**Milestone 1 (#6): Live download thread on a real deploy**
1. Add `pickFrom` to `src/lib/release/pick.ts` and make `pickDownloads` delegate to it. Write `src/lib/platform/detect.ts`, `src/lib/home/format.ts` and `src/lib/home/download.ts` (`toDownloadData`, `rowsFor`), each with Vitest tests. Satisfies **AC-2**, **AC-3**, **AC-5**, **AC-8**.
2. Create `src/content.config.ts` with the `home` and `launchTips` collections and their YAML files holding the draft copy. Satisfies **AC-1**, **AC-7**, **AC-14**.
3. Replace the scaffold `index.astro` with `Hero` in an `EditorPane` (headline line, fixed query lines) and `DownloadQuery` rendering the `all` state, detection, the `os` state with the highlighted primary, the status bar, fallback and analytics attributes. Add `data-js` to the head script. Set `downloadHref` in `site.ts` and use it in `Header`. Deploy a Vercel preview and check the version and per OS rows. Satisfies **AC-1**, **AC-2**, **AC-3**, **AC-5**, **AC-8**, **AC-9**, **AC-12**, **AC-13**, **AC-14**, **AC-16**.

**Milestone 2 (#6): The OS literal, the reveal and the tip**
4. Add the Base UI `Select` trigger styled as the string literal, the "every system" option and the `in (...)` trigger. Add the pending hide, three row reserve, reveal fade, reduced motion path and the 3 second CSS fallback. Add the tip region and "Hide tip". Satisfies **AC-4**, **AC-6**, **AC-7**, **AC-11**.
5. Phone layout (gutter hidden, wrapped query, stacked rows), both themes, keyboard only, screen reader pass, 360px, no JavaScript; deploy to production. Satisfies **AC-10**, **AC-11**, **AC-15**, **AC-16**, and rechecks **AC-1** to **AC-14**.

**Milestone 3 (#7): Engines and the feature browser**
6. Add the engine icons and `Engines` (static `EditorPane` and result grid). Satisfies **AC-17**.
7. Add the `features` collection (eight entries, screenshots as they are captured), `FeatureBrowser` and `FeaturePanel` stacked by default, the tabs enhancement script from `lg`, the placeholder frame and the production guard, and the seven card components on `PopupCard`. Add "Features" to `navLinks`. Satisfies **AC-18**, **AC-19**, **AC-20**.

**Milestone 3b (#7, revision 2026-10-11): Engines as a schema diagram**
10. Content and layout rule: extend the `home.engines` schema (`hub`, `fields`, rows 1 to 8, length caps, unique `icon`) and add the draft fields to `home.yaml`. Write `diagramLayout` in `src/lib/home/engines.ts` with Vitest tests. Satisfies **AC-17**, **AC-24**.
11. The diagram end to end on a preview: add the `canvas` prop to `EditorPane` and the `DiagramTable` box; rewrite `Engines.astro` as the `lg` layout (hub in the center, engines alternating sides from `diagramLayout`, the engine list as a real `ul`) with the anchor positioned step lines, arrowheads, lanes and the `@supports` fallback. Deploy a Vercel preview and check Chrome, Safari and Firefox. Satisfies **AC-17**, **AC-24**.
12. Below `lg` and access: the stacked spine layout, both themes, forced colors, screen reader list, 360px, 200% text; add a temporary fifth row to prove growth, then remove it. Add `DiagramTable` and the canvas pane to `design.md` (and the Red's job list) and to the showcase page. Satisfies **AC-25**, **AC-15**, and rechecks **AC-24**.

**Milestone 4 (#8): Questions and the closing download**
8. Add the `faq` collection and `Questions` as a real table that stacks below `md`. Add "Questions" to `navLinks`. Satisfies **AC-21**.
9. Add `Closing` with `DownloadQuery` in `compact` form (detected primary, other files, "All systems", fallback and no JS paths). Check every footer link. Satisfies **AC-22**, **AC-23**.

## Consequences

**Positive**:
- The page has one memorable idea that comes from the product's own world, not from a landing page kit, and that idea is the download itself.
- The no JavaScript state is honest and complete: the query that returns every file.
- Picking another OS lives in the query, so there is no extra popover, list section or "other platforms" link to maintain.
- The hero costs no image bytes and follows both themes, because it is HTML on role tokens.
- Analytics (#10) can count downloads per OS and placement from the `data-download-*` attributes.

**Negative / tradeoffs**:
- On a desktop with JavaScript, the result area is blank for the moment before detection (usually well under a second at `client:idle`), held at a fixed height. On a very slow device it can be up to 3 seconds before the fallback shows the rows.
- The SQL metaphor may read as cute to visitors who don't write SQL (MongoDB only users). The subline and the engines section carry the plain explanation.
- A string literal that is secretly a button is a discoverability risk: some visitors won't notice they can change the OS. The status bar count, the visible second row and the questions table ("which systems") soften it; `/check verify` should watch for it.
- Detection is a guess for Mac arch outside Chromium; Intel Mac users on Safari or Firefox see Apple silicon first, with the Intel row right below.
- The popup cards are drawings of the app and can drift from the real UI; keep them simple.
- Feature screenshots are dark only, so in the light theme light popup cards float over dark screenshots until light captures exist.
- Feature #7 can't ship to production until all seven screenshots exist (the production guard).
- The feature tabs keyboard logic is hand written in a processed script.

- Engines diagram (revision 2026-10-11): the lines depend on CSS anchor positioning. Browsers without it show the boxes with no lines, so the diagram there reads as five tables without relations. Check Firefox support at build time.
- Engines diagram: the hub with foreign keys to each engine is a metaphor, not a real schema; a reader who knows schemas may find it loose. It stays harmless because the list and sentences carry the meaning.
- Engines diagram: the section now echoes the schema designer panel in the feature browser; keep the two looking alike rather than drifting.
- Engines diagram: past about 8 engines the sides get tall; the content cap stops the build there, and more engines would need a new layout decision.
- Engines diagram: Red now also draws relation lines and the hub outline, a wider job for the accent than `design.md` listed.

**Neutral**:
- `Accordion` is no longer used on Home; it stays in the design system.
- Base UI `Select` is a new Base UI part in the bundle.
- The scaffold page's temporary release proof in `index.astro` is replaced entirely.

## Follow-up

- [ ] Build the spec 0002 design system revision (editor language) before or with Milestone 1 here; it removes `SpatialScene`, `GridBackdrop`, `ParallaxField` and the glow, and adds `EditorPane`, the result grid styles and `PopupCard`.
- [ ] Renumber one of the two 0002 specs (they collide), updating the scope links and code comments that cite "spec 0002" together.
- [ ] Capture screenshots for #7 in `src/assets/screenshots/`, one per feature: grid, SQL editor, schema designer, query builder, split view, command palette, keychain (the existing connection form can serve), team server. Same window size, at least 2400px wide, PNG, cropped to the app content with no system shadow. Rename the existing two to what they show (`home.png` is the connection form, `connection-page.png` is the grid). Leave room in each capture where the popup card will float.
- [ ] Confirm the FAQ password answer against the app (it uses the `keyring` crate with `linux-native`), so the Linux store is described correctly.
- [ ] Analytics (#10) reads the `data-download-*` attributes and adds the privacy link to `footerLinks`.
- [ ] Engines diagram: confirm CSS anchor positioning support in current Firefox before shipping; if it is still missing, accept the no lines fallback there or reopen the line technique (runner up: fixed geometry SVG with a caption row).
- [ ] Engines diagram: confirm each drafted field and type against the app (for example whether PostgreSQL really lists every schema).
- [ ] SEO (#9) adds Open Graph, structured data and the sitemap; this spec sets only the title and description. The OG card can reuse the query to result look.

## Revision

**2026-10-10, editor language.** You rejected the first version's look (centered hero template, grid, glow and glass, the usual section rhythm) as the default AI landing page. Three directions were previewed as rendered mockups (query to result, schema canvas, the page as the app shell); you picked query to result. You chose to keep the glass pill header, the pill buttons, the greys, the red and Mona Sans; to make the OS value a clickable literal that blends into the editor; one reveal of the result rows; vertical tabs for features; real screenshots with app popups recreated in HTML; removing the old stage pieces; the current headline; stacked rows on phones; the `in (...)` built state; keeping all rows plus a comment for phones; an empty result with a link for fallback builds; and an editor that follows the theme. Kept from the first version: OS detection, `pickFrom`, the release data shape, the first launch tips, analytics attributes, the header Download target and the security model. Removed: the spatial hero with three HTML windows, the database strip, the "Other platforms" popover, the separate all downloads list, the FAQ accordion and the alternating feature scenes.

**2026-10-11, engines schema diagram.** The engines result grid repeated the hero's look, so you asked for the section to look like the app's schema designer. You chose: update this spec in place; a `dh_studio` hub with one link row per engine; each engine box with a key row and 2 or 3 fields from content, its sentence under it; an `EditorPane` with a single `Diagram` tab; accent lines and an accent outlined hub; static, no hover; a list of engines for screen readers with the drawing hidden; drafted field copy in `home.yaml`; the hub in the center with engines around it, growing with content (alternating sides); CSS anchor positioning for the lines; and a vertical spine below `lg`. AC-17 is rewritten and AC-24 and AC-25 are added. The content now holds four engines (DocumentDB was added during the first build), and the schema allows 1 to 8.
