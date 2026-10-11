# 0002. App greys and Red design system and UI foundation

**Date**: 2026-10-10
**Revised**: 2026-10-10 (palette and look replaced: the desktop app's greys with a Red accent, a modern Linear and Vercel style surface, see [rationale.md](rationale.md#revision-app-greys-and-red))
**Revised**: 2026-10-10 (editor language: the tilted hero stage, grid backdrop, red glow and pointer parallax are removed, and an editor pane, result grid and popup card take their place; see [rationale.md](rationale.md#revision-editor-language))
**Status**: In Progress

## Summary

This spec sets the website's visual language and base components. The site uses the desktop app's own near neutral greys with one Red accent, tight Mona Sans headlines at normal width, hairline borders, pill shaped buttons and a floating glass pill header. Its signature is the app's own vernacular rather than landing page decoration: an editor pane (tab strip, line numbers, syntax colored code, a status bar), a result grid, and small popup cards like the app's own menus, all drawn in HTML on theme tokens. The tilted stage, faint grid, red glow and pointer parallax are gone, so the only motion left is one reveal and the usual hover and open states. The contrast test still holds every color pair at WCAG AA, and the root `design.md` documents it all.

## Requirements

**User stories**:
- As a developer visiting the site, I want a clean, modern page that looks like the app I'm about to download, so I trust what I see.
- As a keyboard or assistive technology user, I want every control to show focus clearly and work without a mouse, so I can use the whole site.
- As a visitor sensitive to motion, I want the site to stay still when I ask for reduced motion, without losing its look.
- As the developer building later pages, I want named tokens, documented components and a `design.md`, so every slice composes from the same parts instead of inventing styles.

**Acceptance criteria** (the contract):
- **AC-1**: A root `design.md` documents every token (color primitives, color roles for both themes, type, spacing, layout widths, radius, elevation, glass, light, motion) and every component (variants, states, keyboard behavior, usage rules). Every value in it matches the CSS.
- **AC-2**: The color roles use exactly the values in *Color tokens* below, in both themes. Components reference role tokens only. No Tailwind utility exists for a primitive (there is no `bg-red-500`), so primitives can't leak into components.
- **AC-3**: `bun run test` runs a Vitest contrast test that reads `src/styles/tokens.css` and asserts every pair in *Contrast pairs* in both themes (4.5:1 for text, 3:1 for focus, control borders and the light theme primary edge). Changing a token so that a pair fails makes the test fail.
- **AC-4**: Mona Sans and Geist Mono load through the Astro Fonts API and are self hosted from the site's own origin, with no third party font request at runtime. Text renders immediately in a metric matched fallback (`font-display: swap`). Every heading renders at normal width (100%) and weight 600 with the negative tracking in *Type tokens*. Nothing uses `font-stretch: 125%`.
- **AC-5**: Body text is 16px. Caption, body, lead and h3 are fixed sizes. Display, h1 and h2 scale fluidly between their min (at a 360px viewport) and max (at a 1440px viewport) per *Type tokens*.
- **AC-6**: Every role token swaps between themes under `[data-theme]`. A first visit follows the OS setting, the toggle flips light and dark and remembers the choice, the page never flashes the wrong theme, and the toggle is a labeled button operable by keyboard.
- **AC-7**: Button supports variants primary, secondary and ghost; sizes md and lg; and an icon only form with an accessible label. It renders `<a>` when given `href`, else `<button>`. Every button is pill shaped (`--radius-button`). Every variant has distinct hover, `:focus-visible`, active and disabled states. Primary carries a 1px `--action-edge` border in both themes.
- **AC-8**: Every interactive element shows a 2px `--focus` outline with a 2px offset on keyboard focus only (`:focus-visible`), in both themes, including inside the glass header and on glass window chrome.
- **AC-9**: `EditorPane` renders, with no JavaScript, a flat `--surface` pane with a 1px `--line` border and `--radius-window`: an optional tab strip on `--ground` (tabs in Geist Mono 13px, the active tab on `--surface`), a code area whose lines are numbered in an `aria-hidden` gutter (CSS counters, `--fg-muted`, Geist Mono), and optional `result` and `status` slots below the code, separated by `--line`. A line may hold display or h2 sized Mona Sans text (a comment headline) and its gutter number aligns to that line's first baseline. Code tokens use the syntax roles. Below `md` the gutter is hidden and code wraps inside the pane. The pane carries no shadow, tilt, glow or glass.
- **AC-10**: Glass (backdrop blur) appears only on the header pill. It falls back to solid `--surface` when `backdrop-filter` is unsupported or `prefers-reduced-transparency: reduce` is set.
- **AC-11**: The result grid styles (`.result-grid` on a real `<table>`) give a `--ground` caption and header row in `--fg-muted` 13px weight 500, body rows at 14px with `--line` dividers, mono cells via a `mono` cell class, a highlighted row (`data-current`) with a `bg-wash` fill and a 3px `--action` marker on its leading edge (an inset shadow, so it shows in both themes and is hidden in forced colors in favor of a 2px `CanvasText` border), and a status bar (`.status-bar`) in Geist Mono 12px `--fg-muted` on `--ground`. With a `stack` modifier below `md`, each row becomes a block (cells stacked, the action cell full width) while staying a table for assistive technology.
- **AC-12**: With `prefers-reduced-motion: reduce`, nothing moves: the reveal shows its end state at once, and state changes use opacity or color transitions of 150ms or less (no animated transforms). Without it, the only load time motion in the system is the reveal: an opacity fade over `--dur-reveal` (300ms) with `--ease-out`, applied once to an element marked `data-reveal`.
- **AC-13**: `PopupCard` renders a small floating card like the app's own menus and popovers: `--floating`, 1px `--line` border, `--radius-field`, `--shadow-floating`, `--highlight`, no glass. It is placed absolutely over its positioned parent by a `position` prop (`{ x, y, width }` percentages), is `aria-hidden` (decorative), and is hidden below `md`. No page scrolls horizontally at a 360px viewport.
- **AC-14**: The header is a floating pill: sticky 12px below the top of the viewport, centered, at most 60rem wide, on glass with a 1px `--line` border and a soft shadow. It shows the logo mark and wordmark (linking home), the nav links from `src/lib/site.ts`, the theme toggle, and a primary Download button linking to `downloadHref` (`/#download`, spec 0003). Below `md`, the links move into a native HTML popover menu that opens from a labeled button by keyboard, closes on Escape or an outside click, and returns focus to the button. Logo, Menu and Download stay in the pill.
- **AC-15**: The footer renders the links from `src/lib/site.ts` (GitHub, Releases, License), each resolving to a live URL, plus the line "Open source under the Apache 2.0 license".
- **AC-16**: The Accordion (a Base UI island) opens and closes each item with Enter or Space, moves between item headers with the arrow keys, and exposes the correct `aria-expanded` state.
- **AC-17**: The Tooltip (a Base UI island) shows on hover and on keyboard focus, stays open while hovered, closes on Escape, and only ever supplements a trigger that already has its own accessible name. Kbd renders key names in Geist Mono on an inset surface.
- **AC-18**: CodeBlock highlights code at build time with Shiki's `css-variables` theme mapped to the syntax tokens. Syntax colors swap with the theme and every syntax color meets 4.5:1 on its code background. The copy button copies the code, says "Copied", and if the clipboard is unavailable it says "Copy failed, select the text to copy" instead of throwing.
- **AC-19**: Link, Surface, Badge, Input, Container and Section exist with the variants and states in *Component surface*. Surface carries the inset top highlight and, with `accent`, a red hairline along its top edge. An invalid Input is marked by an icon, message text and a heavier border, never by red alone.
- **AC-20**: In forced colors mode (Windows High Contrast), surfaces, the header pill, editor panes, popup cards and windows keep a visible system color border, the highlighted result row keeps a visible border, focus stays visible, and the accent hairline and shadows are hidden.
- **AC-21**: The logo mark is the app icon copied from `../dh-studio/public/favicon.svg`, next to a "DH Studio" wordmark in Mona Sans 600 at normal width. The site favicon (`favicon.svg` and `favicon.ico`) is replaced with the app icon.
- **AC-22**: The `/design-system` showcase page renders at least one instance of every component (including an `EditorPane` with a result grid and status bar, a `PopupCard`, and an `AppWindow` with a real screenshot), correctly in both themes, and no longer shows the stage, grid, glow or parallax. `bun run build`, `bun run typecheck` and `bun run test` pass.
- **AC-23**: Red appears only where the accent rule in *Color tokens* allows. No red text, icons or badges anywhere else, and no error or warning state is shown by red color.
- **AC-24**: `SpatialScene`, `GridBackdrop`, `ParallaxField`, the stage, tilt, glow and entrance CSS, and the `--glow`, `--grid-line`, `--dur-scene` and `--stagger` tokens no longer exist in `src/`, `design.md` or the showcase. The `motion` dependency is removed if nothing else imports it.

## Decision

**Chosen option**: Option 1, revised twice: keep the site's own token system, components and contrast test on Tailwind v4, the app's near neutral greys (hue 265) with a Red accent, and the precise surface style; replace the spatial stage with the app's own editor vernacular.

Build the site's visual system from the app's greys and one Red accent in both themes, Mona Sans at normal width plus Geist Mono, pill buttons and a floating glass pill header, hairline bordered surfaces, and an editor language (editor pane, result grid, popup card) drawn in HTML on theme tokens. Keep restrained depth and CSS first motion (one reveal), documented in a root `design.md` and guarded by a contrast test.

**Implementation skills**: `frontend-design` (`.agents/skills/frontend-design/`, source not recorded): visual direction and typography; consult it when building the editor pane, the result grid and the type treatment.

## Feature design

### Token model (the "data model" of this feature)

No persistence. The system is three layers, each a pure mapping:

| Layer | Where | What it holds | Who may use it |
|---|---|---|---|
| Primitives | `src/styles/tokens.css`, plain `:root` vars (not in `@theme`) | Raw scales: `--gray-*`, `--red-*`, `--green-*`, `--syntax-*` | Only the role layer |
| Roles | `src/styles/tokens.css`, under `:root[data-theme='dark']` and `:root[data-theme='light']` | Semantic tokens (`--ground`, `--fg`, `--action`, `--shadow-raised`...) as `var(--primitive)` or literal shadow/alpha values | Components and the theme layer |
| Theme | `src/styles/theme.css`, `@theme inline` | Tailwind names mapped to roles (`--color-ground: var(--ground)`), plus type, radius, spacing, motion tokens | Utilities in components |

`src/styles/global.css` imports `tailwindcss`, then `tokens.css`, `theme.css`, `base.css` (body, focus, selection, forced colors, reduced motion) and `depth.css` (elevation, glass, the editor pane, result grid and popup card).

### Color tokens

Every value is the sRGB hex of an oklch color. The greys and the Red copy the desktop app's `src/index.css` (neutrals at hue 265, chroma 0.006 or less, and its `red` accent), so screenshots and site share one palette. Primitives stay hex because the contrast test parses hex.

Primitives (hex, defined once; the oklch source in brackets, written as a comment in `tokens.css`):

| Primitive | Value | Primitive | Value |
|---|---|---|---|
| `--gray-1000` | `#101214` (0.18 0.005 265) | `--gray-0` | `#FFFFFF` (1 0 0) |
| `--gray-950` | `#161719` (0.205 0.005 265) | `--gray-25` | `#F9FAFC` (0.985 0.003 265) |
| `--gray-925` | `#1A1C1F` (0.225 0.006 265) | `--gray-100` | `#E1E3E6` (0.915 0.005 265) |
| `--gray-900` | `#1F2023` (0.245 0.006 265) | `--gray-500` | `#7E8084` (0.6 0.006 265) |
| `--gray-850` | `#2A2B2E` (0.29 0.006 265) | `--gray-600` | `#616367` (0.5 0.006 265) |
| `--gray-550` | `#6A6C6F` (0.53 0.006 265) | `--gray-750` | `#46484B` (0.4 0.006 265) |
| `--gray-300` | `#A9ABAF` (0.74 0.006 265) | `--gray-940` | `#191B1D` (0.22 0.006 265) |
| `--gray-200` | `#C2C4C8` (0.82 0.006 265) | `--red-300` | `#FF958D` (0.78 0.13 25) |
| `--gray-50` | `#E9EBEF` (0.94 0.006 265) | `--red-400` | `#F97770` (0.72 0.16 25) |
| `--green-300` | `#68D7A1` (0.8 0.13 160) | `--red-600` | `#C9222B` (0.54 0.2 25) |
| `--green-700` | `#0B7643` (0.5 0.12 155) | `--red-700` | `#B00A1D` (0.48 0.19 25) |
| `--green-tint-dark` | `#132C20` (0.27 0.04 160) | `--red-tint-dark` | `#642724` (0.36 0.09 25) |
| `--green-tint-light` | `#DAF7E3` (0.95 0.04 155) | `--red-tint-light` | `#FFDEDB` (0.93 0.04 25) |
| | | `--white-text` | `#FCFCFC` (0.99 0 0) |

Roles:

| Role | Dark | Light | Use |
|---|---|---|---|
| `--ground` | `#101214` | `#F9FAFC` | Page background |
| `--surface` | `#161719` | `#FFFFFF` | Flat UI: cards, inputs, code blocks, header pill fallback |
| `--raised` | `#1A1C1F` | `#FFFFFF` | Main window body in scenes |
| `--floating` | `#1F2023` | `#FFFFFF` | Floating windows, popover menu, tooltip |
| `--line` | `#2A2B2E` | `#E1E3E6` | Hairline borders and dividers |
| `--line-strong` | `#6A6C6F` | `#7E8084` | Control borders (inputs, focusable outlines) |
| `--fg` | `#E9EBEF` | `#191B1D` | Text, icons, links |
| `--fg-muted` | `#A9ABAF` | `#616367` | Secondary text, captions, eyebrows, code comments |
| `--action` | `#F97770` | `#C9222B` | Primary button fill |
| `--action-hover` | `#FF958D` | `#B00A1D` | Primary button hover |
| `--action-fg` | `#101214` | `#FCFCFC` | Text on primary |
| `--action-edge` | `#F97770` | `#C9222B` | Primary button 1px border |
| `--focus` | `#F97770` | `#C9222B` | Focus ring |
| `--signal` | `#68D7A1` | `#0B7643` | "Latest / live / available" badge text and dot |
| `--signal-tint` | `#132C20` | `#DAF7E3` | Signal badge background |
| `--selection` | `#642724` | `#FFDEDB` | `::selection` background (text stays `--fg`) |

In light, `--surface`, `--raised` and `--floating` are all white on purpose. Light elevation reads from borders and shadows, not from a lighter fill (the same choice the app makes).

Syntax roles (CodeBlock background is `--surface`):

| Role | Dark | Light |
|---|---|---|
| `--syntax-fg` | `#E9EBEF` | `#191B1D` |
| `--syntax-keyword` | `#E8A3BC` | `#9B2F5A` |
| `--syntax-string` | `#A9D49A` | `#3D6B2C` |
| `--syntax-number` | `#D2B2F2` | `#6B3FA0` |
| `--syntax-function` | `#9CC6E6` | `#1F5F8B` |
| `--syntax-comment` | `#A9ABAF` | `#616367` |
| `--syntax-punctuation` | `#C2C4C8` | `#46484B` |

These map onto Astro's Shiki variables (`--astro-code-foreground`, `--astro-code-background`, `--astro-code-token-keyword`, `--astro-code-token-string`, `--astro-code-token-constant`, `--astro-code-token-function`, `--astro-code-token-comment`, `--astro-code-token-punctuation`, and the rest map to the nearest role).

**Accent rule** (replaces the honey rule): Red appears only as the primary action (fill, hover, edge), the focus ring, selection, the highlighted result row's leading marker (it marks the row holding the primary action), and the Surface `accent` hairline. Links are `--fg` with an underline. Eyebrow labels are `--fg-muted`. No red text, icons or badges anywhere else. Errors and warnings never use red color as their signal: an invalid field shows an alert icon, message text in `--fg` and a heavier border, so a red button and an error can't be confused.

**Contrast pairs** (asserted by the test, both themes; measured minimums at the time of writing; the pair list in `src/lib/contrast-pairs.ts` does not change):

| Pair | Minimum | Dark | Light |
|---|---|---|---|
| `--fg` on each of ground, surface, raised, floating | 4.5 | 13.6 or more | 16.5 or more |
| `--fg-muted` on each of the four | 4.5 | 7.1 or more | 5.8 or more |
| `--action-fg` on `--action` and on `--action-hover` | 4.5 | 7.1 or more | 5.5 or more |
| `--focus` on each of the four | 3 | 6.1 or more | 5.4 or more |
| `--line-strong` on each of the four | 3 | 3.1 or more | 3.8 or more |
| `--action-edge` on `--ground` (light only) | 3 | not tested | 5.4 |
| `--signal` on `--signal-tint` and on `--surface` | 4.5 | 8.4 or more | 5.0 or more |
| every `--syntax-*` on `--surface` | 4.5 | 7.8 or more | 6.0 or more |

Dark `--line-strong` clears 3:1 by a small margin (3.09 on `--floating`). Any lighter `--floating` needs a lighter `--line-strong` in the same change.

### Type tokens

Fonts: `--font-sans`: "Mona Sans", then the generated metric matched fallback, then `ui-sans-serif, system-ui, sans-serif`. `--font-mono`: "Geist Mono", then fallback, then `ui-monospace, SFMono-Regular, Menlo, monospace`. Preload only the Mona Sans latin variable face. Geist Mono loads on demand. The Mona Sans width axis is no longer needed, so the Fonts API config drops its width range.

Root font size stays 16px (1rem). Body is 16px.

| Token | Size | Line height | Weight / tracking | Use |
|---|---|---|---|---|
| `--text-caption` | 0.8125rem (13px) | 1.25rem | 450 / 0 | Captions, footer, badges, eyebrows |
| `--text-body` | 1rem (16px) | 1.6 | 400 / 0 | Body copy |
| `--text-lead` | 1.125rem (18px) | 1.55 | 400 / 0 | Intro paragraphs |
| `--text-h3` | 1.25rem (20px) | 1.3 | 600 / -0.01em | Card and subsection titles |
| `--text-h2` | `clamp(1.9rem, 1.2rem + 2.4vw, 3rem)` (30.4 to 48px) | 1.05 | 600 / -0.035em | Section titles |
| `--text-h1` | `clamp(2.075rem, 1.6rem + 2vw, 2.75rem)` (33.2 to 44px) | 1.1 | 600 / -0.03em | Page titles |
| `--text-display` | `clamp(2.6rem, 1.5rem + 4.2vw, 4.75rem)` (41.6 to 76px) | 1.02 | 600 / -0.04em | Hero headline only |
| `--text-code` | 0.8125rem | 1.7 | Geist Mono 400 | Code blocks, Kbd (0.75rem) |

All widths are 100%. /develop may tune each clamp's middle (slope) term, but the min and max bounds are fixed. Display and h2 cap their measure at `14ch` and `18ch` and use `text-wrap: balance`. Numbers in UI copy use `font-variant-numeric: tabular-nums`. **Mono rule**: Geist Mono only for literal code, commands and key names, never for decorative labels (eyebrows use `--text-caption` in Mona Sans, weight 500). Headlines and labels are sentence case, never all caps. Prose max width is `--width-prose`.

### Spacing, layout and radius

- Spacing: Tailwind's default 4px base (`--spacing: 0.25rem`) and default breakpoints (`sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem).
- Widths: `--width-prose: 68ch`, `--width-content: 72rem` (1152px), `--width-bleed: 100rem` (1600px, for full bleed content), `--width-nav: 60rem` (header pill).
- Gutter: `--gutter: 1rem`, `2rem` from `md`.
- Section rhythm: `--space-section: clamp(4rem, 2.5rem + 5vw, 6rem)` block padding.
- Radius by role: `--radius-inset: 5px` (Kbd, inline code), `--radius-field: 10px` (inputs, code blocks), `--radius-button: 9999px` (every button), `--radius-surface: 18px` (cards, menu), `--radius-panel: 24px` (large call to action panels), `--radius-window: 14px` (AppWindow), `--radius-pill: 9999px` (badges, header pill).
- Header: pill height 3.5rem, offset `--header-offset: 0.75rem` from the top, `z-index: 40`. Page anchors use `scroll-margin-top` of offset plus height plus 1rem.

### Depth: elevation, glass, and the editor language

| Level | Background | Shadow | Top highlight |
|---|---|---|---|
| ground | `--ground` | none | none |
| surface | `--surface` | none, 1px `--line` border | `--highlight` |
| raised | `--raised` | `--shadow-raised` | `--highlight` |
| floating | `--floating` (or glass) | `--shadow-floating` | `--highlight` |

| Token | Dark | Light |
|---|---|---|
| `--shadow-raised` | `0 40px 80px -30px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(255 255 255 / 0.03)` | `0 40px 80px -30px rgb(20 24 40 / 0.12), 0 0 0 1px rgb(20 24 40 / 0.03)` |
| `--shadow-floating` | `0 24px 60px -20px rgb(0 0 0 / 0.6), 0 8px 20px -10px rgb(0 0 0 / 0.4)` | `0 24px 60px -20px rgb(20 24 40 / 0.18), 0 8px 20px -10px rgb(20 24 40 / 0.10)` |
| `--shadow-header` | `0 8px 24px -12px rgb(0 0 0 / 0.5)` | `0 8px 24px -12px rgb(20 24 40 / 0.10)` |
| `--highlight` | `inset 0 1px 0 0 rgb(255 255 255 / 0.06)` | `inset 0 1px 0 0 rgb(255 255 255 / 0.9)` |
| `--hairline` | `color-mix(in oklab, var(--red-400) 60%, transparent)` | `color-mix(in oklab, var(--red-600) 60%, transparent)` |
| `--glass-bg` | `color-mix(in oklab, var(--surface) 72%, transparent)` | same formula |

- **Editor pane**: flat `--surface` with a 1px `--line` border and `--radius-window`; the tab strip, gutter and status bar sit on `--ground`; inner dividers are `--line`. No shadow, tilt, mask or glow. It is the system's signature surface, used for heroes and section openers, and it reads correctly in both themes because every part is a role token.
- **Result grid**: see AC-11. The highlighted row uses `bg-wash` plus `box-shadow: inset 3px 0 0 var(--action)`.
- **AppWindow**: a raised frame for a real screenshot (`--raised`, `--shadow-raised`, `--highlight`, `--radius-window`, title bar with three neutral dots). Flat on the page, no tilt, no fade mask, no glass. It is the positioned parent a `PopupCard` floats over.
- **Popup card**: `--floating`, `--shadow-floating`, `--highlight`, `--radius-field`, solid (never glass).
- **Accent hairline**: on a Surface with `accent`, a 1px line across the middle 60% of the top edge, `linear-gradient(90deg, transparent, var(--hairline), transparent)`, opacity 0.7.
- **Glass**: `background: var(--glass-bg); backdrop-filter: blur(16px) saturate(1.6)` on the header pill only. Falls back to solid `--surface` under `@supports not (backdrop-filter: blur(1px))` and `@media (prefers-reduced-transparency: reduce)`.
- **Restrained rule**: raised and floating levels appear only on `AppWindow`, `PopupCard`, the header pill and true overlays (popover menu, tooltip, select list); glass only on the header pill. Cards, editor panes, buttons, inputs and text stay flat (ground or surface, hairline border, top highlight). The primary button may carry a soft colored shadow (`0 6px 18px -8px` of `--action` at 70%); no other control has a shadow.

### Motion

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 150ms | Hover, color, focus changes |
| `--dur-base` | 220ms | Popover, accordion, tooltip |
| `--dur-reveal` | 300ms | The one reveal (a result appearing as if the query just ran) |
| `--ease-out` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | The reveal, opening |
| `--ease-in-out` | `cubic-bezier(0.6, 0, 0.3, 1)` | State changes |

- **Reveal** (CSS): an element marked `data-reveal` fades from opacity 0 to 1 over `--dur-reveal` with `--ease-out` when its owner sets `data-revealed`. The hidden start applies only under `html[data-js]` (set by the head script), so with no JavaScript the element is visible from the start. A page uses it at most once, for the thing the page is about.
- **Reduced motion**: under `prefers-reduced-motion: reduce`, the reveal shows its end state at once, no transform transitions run, and the remaining transitions are opacity or color only, at `--dur-fast` or less.
- **Theme switch**: no color transitions while the theme swaps (the toggle adds a `data-theme-switching` attribute for one frame that disables transitions).
- No other scroll triggered or decorative motion. No fade and slide on sections.

### Component surface

Static components live in `src/components/` (`ui/`, `spatial/`, `site/`). Islands live in `src/islands/`. Variant recipes are cva pure functions in `src/lib/ui/` (`button.ts`, `badge.ts`), imported by `.astro` and `.tsx` alike, so a button looks the same in both. Classes are combined with `clsx` (Astro `class:list` in `.astro`). Icons: `@lucide/astro` in `.astro`, `lucide-react` in islands.

| Component | File | Kind | Props (all serializable for islands) | States and keyboard |
|---|---|---|---|---|
| Button | `ui/Button.astro` + `lib/ui/button.ts` | static | `variant: 'primary' \| 'secondary' \| 'ghost'` (default primary), `size: 'md' \| 'lg'` (md), `href?: string`, `type?`, `disabled?`, `iconOnly?: boolean` with required `label` when icon only | pill shape; primary: `--action` fill, `--action-edge` border, soft colored shadow, inset top light; secondary: `--surface` with 4% `--fg` mixed in, `--line` border, `--line-strong` on hover; ghost: transparent, 6% `--fg` on hover; `:focus-visible`, active (pressed 1px down), disabled (`aria-disabled` on links, 50% opacity, no pointer); renders `<a>` with `href`, else `<button>` |
| Link | `ui/Link.astro` | static | `href: string` | `--fg`, 1px underline at 3px offset in `--line-strong`, `--fg` on hover; same tab for all links |
| Surface | `ui/Surface.astro` | static | `as?: string`, `padding?: 'sm' \| 'md' \| 'lg'`, `accent?: boolean` | flat `--surface`, 1px `--line` border, `--radius-surface`, `--highlight`; `accent` adds the red hairline |
| Badge | `ui/Badge.astro` + `lib/ui/badge.ts` | static | `variant: 'neutral' \| 'signal' \| 'outline'` | pill; signal shows a dot plus text in `--signal` on `--signal-tint`; text always present (no color only meaning) |
| Input | `ui/Input.astro` | static | `id`, `label` (required, visible), `type?`, `hint?`, `error?: string`, `disabled?` | `--ground` fill, `--line-strong` border, `--radius-field`; `:focus-visible` ring; invalid sets `aria-invalid`, `aria-describedby` to the message, a 2px border and an alert icon plus the message in `--fg` |
| Kbd | `ui/Kbd.astro` | static | `keys: readonly string[]` | `<kbd>` per key, Geist Mono, `--surface`, 1px `--line` border with a 1px bottom shadow, `--radius-inset` |
| CodeBlock | `ui/CodeBlock.astro` | static + island | `code: string`, `lang: string`, `title?: string`, `copy?: boolean` (default true) | Astro `<Code theme="css-variables">`; `--radius-field`; scrolls horizontally inside itself; copy via `CopyButton` island |
| CopyButton | `islands/CopyButton.tsx` | island, `client:visible` | `text: string` | labeled "Copy code"; live region announces "Copied" or "Copy failed, select the text to copy" |
| Container | `ui/Container.astro` | static | `width: 'prose' \| 'content' \| 'bleed'` | centered, `--gutter` padding |
| Section | `ui/Section.astro` | static | `id?`, `labelledby?`, `as?` | `--space-section` block padding, `scroll-margin-top` clears the header |
| EditorPane | `editor/EditorPane.astro` | static | `tabs?: readonly { label: string; current?: boolean }[]`, `label?: string` (group label when the code carries a control), `class?`; default slot = lines (each an `editor/EditorLine.astro`), named slots `result`, `status` | see AC-9; tabs are decorative text (`aria-hidden`), not controls |
| EditorLine | `editor/EditorLine.astro` | static | `size?: 'code' \| 'h2' \| 'display'` (default code), `decorative?: boolean` (sets `aria-hidden`) | one counted line; `display` and `h2` lines align the gutter number to the first baseline |
| Code tokens | `editor/Tok.astro` | static | `kind: 'keyword' \| 'string' \| 'number' \| 'function' \| 'comment' \| 'punctuation' \| 'ident'` | a `<span>` colored by the matching `--syntax-*` role; islands use the same classes from `lib/ui/syntax.ts` |
| Result grid | `editor/result-grid.css` (imported by `depth.css`) + `lib/ui/result.ts` class names | styles | classes `result-grid`, `stack`, `mono`, `data-current` on a row, `status-bar` | see AC-11; works on any real `<table>` in `.astro` or an island |
| PopupCard | `editor/PopupCard.astro` | static | `position: { x: string; y: string; width: string }`, `class?`; default slot = card body | see AC-13 |
| AppWindow | `spatial/AppWindow.astro` (moves to `editor/AppWindow.astro`) | static | `image: ImageMetadata`, `alt: string`, `title: string`; default slot for `PopupCard`s | raised only; title bar with three neutral dots and the centered title in `--fg-muted`; image via Astro `<Picture>` (AVIF and WebP, `sizes` set, lazy unless `eager`); `level`, `position`, `order` and glass are removed |
| ThemeToggle | `islands/ThemeToggle.tsx` | island, `client:idle` | none | ghost icon only Button look, lucide `Sun`/`Moon`, `aria-label` "Switch to light theme" or "Switch to dark theme", `aria-pressed` not used |
| Logo | `site/Logo.astro` | static | `showWordmark?: boolean` (default true) | mark `aria-hidden`, 24px with 6px radius, wordmark "DH Studio" in Mona Sans 600, 15px, -0.01em |
| Header | `site/Header.astro` | static (contains ThemeToggle island) | `currentPath: string` | floating glass pill per AC-14; nav links as 14px `--fg-muted` text, `--fg` plus 6% `--fg` background on hover and for `aria-current="page"`; ThemeToggle; Download (primary md); below `md` a ghost "Menu" button with `popovertarget="site-menu"` and `aria-controls` opens `<nav id="site-menu" popover>` at `--floating`, `--radius-surface`, with the same links |
| Footer | `site/Footer.astro` | static | none (reads `site.ts`) | link list plus license line, 13px `--fg-muted`, links `--fg` on hover, top `--line` |
| Accordion | `islands/Accordion.tsx` | island, `client:visible` | `items: readonly { value: string; title: string; body: string }[]`, `multiple?: boolean` (default false) | Base UI Accordion; Enter/Space toggle, Up/Down/Home/End move between headers; panel height animates with `--dur-base` (opacity only under reduced motion); `body` is plain text, paragraphs split on blank lines |
| Tooltip | `islands/Tooltip.tsx` | island, `client:visible` | `label: string` (trigger's accessible name), `tip: string`, `icon?: 'info' \| 'keyboard'`, `href?: string` | Base UI Tooltip; trigger is a ghost icon Button (or link when `href`); opens on hover after 300ms and on focus at once, hoverable, Escape closes; renders at `--floating` |

Base UI islands are styled with the same role tokens and recipes. No island receives a function or a component as a prop.

### Value sourcing

| Action | Value produced / displayed | Source |
|---|---|---|
| Header Download | Button href | `site.ts`: `downloadHref = '/#download'` (spec 0003; replaces `releasesLatestUrl`) |
| Header Download | Button label | Fixed copy "Download" |
| Header, Footer | GitHub repo URL | `site.ts`: `repoUrl = 'https://github.com/OnlyDev-India/data-hive-studio'` (from the app repo's `origin` remote) |
| Footer | License link | `site.ts`: `${repoUrl}/blob/HEAD/LICENSE` (GitHub resolves `HEAD` to the default branch) |
| Footer | License line | Fixed copy "Open source under the Apache 2.0 license" (the app's LICENSE is Apache 2.0) |
| Header | Nav links | `site.ts`: `navLinks`, initially only `{ label: 'GitHub', href: repoUrl }`; features #7 and #8 append in page anchors when their sections exist |
| Footer | Footer links | `site.ts`: `footerLinks` = GitHub (`repoUrl`), Releases (`${repoUrl}/releases`), License; feature #10 adds Privacy |
| Header | Active link | `currentPath` prop from `Astro.url.pathname` in the page or layout |
| Logo | Mark | `src/assets/brand/logo.svg`, copied from `../dh-studio/public/favicon.svg` |
| Favicon | Icon files | `public/favicon.svg` from the same SVG; `public/favicon.ico` copied from `../dh-studio/src-tauri/icons/icon.ico` |
| AppWindow (proving page) | Screenshots | `src/assets/screenshots/home.png` and `connection-page.png`, copied from `../dh-studio/screenshots/` (2448×1836) |
| AppWindow | Title text | `title` prop: "DH Studio" for the main window, "New connection" for the floating one on the proving page |
| Palette | Grey and Red values | The desktop app's `../dh-studio/src/index.css` (`.dark` and `:root` neutrals, `[data-accent="red"]` primary), converted from oklch to hex once and written into `tokens.css` |
| ThemeToggle | Current theme | `document.documentElement.dataset.theme`, set by the existing head script from `localStorage['theme']`, else `prefers-color-scheme` |
| Head script | Pre paint background | Literal `--ground` hexes (`#101214` dark, `#F9FAFC` light), kept equal to `tokens.css` |
| EditorPane | Line numbers | CSS counter over `EditorLine` elements, rendered in the `aria-hidden` gutter |
| Reveal | Whether JavaScript runs | `data-js` on `<html>`, set by the head script in `BaseLayout.astro` |
| Reveal | When to show | `data-revealed`, set by the element's owner (the `DownloadQuery` island in spec 0003) |
| PopupCard | Position | `position` prop, percentages of the parent `AppWindow` |
| CodeBlock | Highlighted HTML | Shiki at build time from `code` and `lang` props |
| CopyButton | Copied text | `text` prop (the same string passed to CodeBlock) |
| Contrast test | Token values | Parsed from `src/styles/tokens.css`; `var(--primitive)` references resolved one level against the primitives block |
| Contrast test | Required pairs and minimums | `src/lib/contrast-pairs.ts`, a typed constant mirroring *Contrast pairs* (unchanged by this revision) |

### Key invariants

- Components use role tokens only. Primitives live outside `@theme`, so no primitive utility exists.
- Every role is defined in both theme blocks, and the test fails if a role is missing from either.
- Red appears only where the accent rule allows, and no state is signaled by red alone.
- Elevation above surface appears only on `AppWindow`, `PopupCard`, the header pill or overlays (menu, tooltip, select list). Glass appears only on the header pill.
- At most one `PopupCard` per `AppWindow`, and at most one reveal per page.
- No tilt, perspective, parallax, glow, grid backdrop, scroll driven motion or section entrance anywhere.
- Every effect has a reduced motion fallback, and every element renders in its final state without JavaScript.
- Only transforms and opacity animate. No layout properties animate.
- Every island takes serializable props and hydrates with `client:visible`, `client:idle` or `client:media`, never `client:load`.
- Mono only for literal code, commands and keys.
- Expected failures (clipboard denied, storage blocked, font fetch failed) degrade to a typed result or fallback, never a thrown error.

### Security model

A static public site with no user data, accounts or forms that submit anywhere. The only stored value is `localStorage['theme']` (`'light' | 'dark'`), read in a try/catch. No user supplied content is rendered. Accordion and Tooltip text comes from the site's own source, rendered as text (no HTML injection). CopyButton uses `navigator.clipboard.writeText`, which needs a secure context (HTTPS on Vercel, localhost in dev). External links open in the same tab, so there's no `target="_blank"` handling to get wrong.

**Configuration required**: none. No env vars or credentials. The Fonts API's fontsource provider downloads Mona Sans and Geist Mono at build time (a build time network dependency, see Consequences).

**Critical test scenarios**:
- Happy path: on the showcase page in dark, then light, every component renders with the documented tokens, including an editor pane with a comment headline, syntax colored lines, a result grid with one highlighted row and a status bar, and a screenshot window with a popup card. Verifies **AC-2**, **AC-6**, **AC-9**, **AC-11**, **AC-13**, **AC-22**.
- Removal: searching `src/` and `design.md` finds no `SpatialScene`, `GridBackdrop`, `ParallaxField`, `--glow`, `--grid-line`, `--dur-scene` or `--stagger`. Verifies **AC-24**.
- Contrast guard: change `--fg-muted` (light) to `#8A8C90` and `bun run test` fails naming that pair. Verifies **AC-3**.
- Keyboard: Tab through the header pill, every component and the footer. Each shows the red ring (visible on glass too), the menu popover opens and closes by keyboard and returns focus, and the accordion and tooltip respond to their keys. Verifies **AC-7**, **AC-8**, **AC-14**, **AC-16**, **AC-17**.
- Accent audit: search components for `--action`, `--focus`, `--hairline` and `--selection` uses (including the highlighted result row marker); each sits only where the accent rule allows, and the invalid Input shows icon and text with no red. Verifies **AC-19**, **AC-23**.
- Reduced motion: with reduced motion emulated, a `data-reveal` sample appears at once with no fade. Verifies **AC-12**.
- Fallbacks: with `backdrop-filter` disabled and with `prefers-reduced-transparency` emulated, the header pill is solid `--surface`. With forced colors emulated, borders, the highlighted row border and focus remain and hairline and shadows vanish. Verifies **AC-10**, **AC-20**.
- Phone: at 360px with touch emulation, the header pill shows logo, Menu and Download, the editor pane hides its gutter and wraps, a `stack` result grid stacks its rows, popup cards are hidden, and there's no horizontal scroll. Verifies **AC-9**, **AC-11**, **AC-13**, **AC-14**.
- Clipboard denied: CopyButton with clipboard permission denied shows the failure message and logs nothing uncaught. Verifies **AC-18**.

## Build plan

Most of the first version is already built (tokens, fonts, components, scene, showcase page). This plan reworks it as tracer bullets: recolor the whole site end to end first, so every page is on the new palette within one step, then thicken type, shapes, header and stage one strand at a time. Each milestone leaves `build`, `typecheck` and `test` green.

**Milestone 1: New palette end to end**
1. Rewrite the primitives and both role blocks in `src/styles/tokens.css` per *Color tokens* (gray, red, green, syntax), with the oklch source as a comment per primitive. Replace the shadow, highlight, glow and grid roles per *Depth*, and add `--hairline` and `--shadow-header` to both theme blocks. Update the head script's pre paint background literals in `BaseLayout.astro`. Satisfies **AC-2**, **AC-6**.
2. Run `bun run test` (the pair list is unchanged) and update the measured minimums in `design.md`. Check the showcase page in both themes. Satisfies **AC-3**.

**Milestone 2: Type and fonts**
3. In `astro.config.mjs`, replace Martian Mono with Geist Mono (fontsource provider, `--font-geist` variable) and drop the Mona Sans width range. Point `--font-mono` at it in `theme.css`. Satisfies **AC-4**, **AC-17**.
4. Replace the type tokens in `theme.css` per *Type tokens*, remove every `font-stretch: 125%` rule (`theme.css`, `Logo.astro`), and add `max-width` and `text-wrap: balance` for display and h2. Satisfies **AC-4**, **AC-5**, **AC-21**.

**Milestone 3: Shapes, surfaces and header**
5. Replace the radius tokens and widths in `theme.css` and `tokens.css`. Update `lib/ui/button.ts` (pill, new variant fills, colored primary shadow), `lib/ui/badge.ts`, Surface (`highlight`, `accent` hairline), Input (`--radius-field`), Kbd and CodeBlock. Satisfies **AC-7**, **AC-17**, **AC-18**, **AC-19**, **AC-23**.
6. Rebuild `Header.astro` as the floating glass pill (sticky offset, max width, glass with both fallbacks, header shadow, nav link styles, popover menu at `--radius-surface`) and add `scroll-margin-top` to Section. Satisfies **AC-8**, **AC-10**, **AC-14**.

**Milestone 4: The hero stage**
7. Rewrite `depth.css`: remove the ground plane and contact shadow rules; add GridBackdrop, the stage perspective, main window tilt and mask, floating glass windows, glow, hairline, compact rules and forced colors. Replace `GroundPlane.astro` with `GridBackdrop.astro`. Satisfies **AC-9**, **AC-10**, **AC-13**, **AC-20**.
8. Update `AppWindow.astro` (floating always glass, `position` for floating only, centered title) and `SpatialScene.astro` (one raised plus up to two floating, `grid` prop, new entrance keyframes). Keep `ParallaxField.tsx`, and change only the CSS that consumes `--px` and `--py`. Satisfies **AC-9**, **AC-11**, **AC-12**, **AC-13**.

**Milestone 5: Documented and proven**
9. Update root `design.md`: every token table, the accent rule (replacing the honey rule), the restrained and mono rules, the new radius roles, GridBackdrop and stage, and every changed component. Update the showcase sections that describe the old system (`ColorSection`, `TypeSection`, `DepthSection`, `ContrastSection`). Satisfies **AC-1**.
10. Update the proving content on the scaffold index (one scene with both screenshots, one instance of every component). Run `build`, `typecheck` and `test`, and walk both themes, keyboard only, reduced motion, reduced transparency, forced colors and 360px. Satisfies **AC-22** and checks **AC-1** to **AC-23**.

**Revision 2026-10-10, editor language** (milestones 1 to 5 are built; these three follow, each leaving `build`, `typecheck` and `test` green):

**Milestone 6: The editor language, end to end**
11. Add `--dur-reveal` to `theme.css`, the `data-js` flag to the head script, and the reveal rule (hidden only under `html[data-js]`, reduced motion end state) to `base.css`. Add `editor/EditorPane.astro`, `EditorLine.astro`, `Tok.astro` and `lib/ui/syntax.ts`, then `editor/result-grid.css` and `lib/ui/result.ts` (highlighted row, status bar, `stack` below `md`, forced colors border). Show one pane with a comment headline, a query and a result grid on the showcase page. Satisfies **AC-9**, **AC-11**, **AC-12**, **AC-20**.
12. Add `editor/PopupCard.astro`, move `AppWindow` to `editor/`, drop its `level`, `position`, `order` and glass, and give it a default slot for one card. Show a screenshot window with a card on the showcase page. Satisfies **AC-13**, **AC-20**.

**Milestone 7: Remove the stage**
13. Delete `SpatialScene.astro`, `GridBackdrop.astro`, `ParallaxField.tsx` and the stage, tilt, mask, glow, grid, entrance and floating glass rules in `depth.css`; delete `--glow`, `--grid-line`, `--dur-scene` and `--stagger`; keep glass for the header pill only. Remove `motion` from `package.json` if nothing else imports it. Satisfies **AC-10**, **AC-24**.

**Milestone 8: Documented and proven**
14. Update root `design.md` (character line, build mandate, accent rule, depth, motion, the editor components, removal of the stage and its "in the style of Linear, Raycast, Vercel" framing) and the showcase sections that showed the stage (`DepthSection`, `MotionSection`). Walk both themes, keyboard only, reduced motion, reduced transparency, forced colors and 360px. Satisfies **AC-1**, **AC-22**, and checks **AC-9** to **AC-14**, **AC-20**, **AC-23**, **AC-24**.

## Consequences

**Revision 2026-10-10, editor language**:
- Positive: the identity now comes from the product's own vernacular (editor, result set, popups), which no generic developer tool template carries, while the palette, type and header you liked stay.
- Positive: less JavaScript and less CSS: the parallax island, its `motion` dependency and the heaviest depth rules go away.
- Negative: every page now needs a reason to use an editor pane; a page that forces one where it doesn't fit will read as a gimmick. Use it for openers and data, not for every block.
- Negative: rework again (depth, motion, `AppWindow`, showcase, `design.md`) after the stage was just built.
- Negative: the stage gave the hero visual weight for free; the editor hero depends on good copy and spacing instead.

**Positive**:
- The site and the app now share one palette, so the screenshots sit naturally in the page and the site reads as the product's own home.
- The look is clean and precise, which visitors already read as modern and trustworthy.
- Contrast is still enforced by a test, and the pair list didn't change, so the rework can't quietly break AA.
- Dropping the grid floor and contact shadows removes the heaviest scene markup, and the stage is simpler to compose on later pages.

**Negative / tradeoffs**:
- Red is the color most people read as "error" or "danger". The accent rule bans red for any state, so errors must always use an icon and text. Any future warning or error color needs its own spec change with contrast pairs.
- The look is closer to many current developer tool sites. The distinct identity now comes from the product screenshots and the red, not from an unusual palette or a grid floor.
- Rework cost: tokens, fonts, header, depth styles, scene components, `design.md` and four showcase sections all change, after the first version was built.
- A glass sticky header blurs on every scroll frame. One small element is cheap on most devices, but low end phones may scroll less smoothly. The reduced transparency fallback is the only escape hatch.
- The syntax keyword color (pink) sits near the red accent in code blocks. It passes contrast but makes code a little warmer.
- The screenshots on hand are dark only, so in the light theme the windows stay dark until light screenshots exist.
- The Fonts API with fontsource fetches fonts at build time. A fontsource outage fails or degrades a Vercel build (the local provider fallback removes this).
- (Resolved by the editor language revision: the parallax island and its `client:media` cost are removed.)

**Neutral**:
- `design.md` at the repo root stays the reference later `/architect` and `/develop` runs read for any UI work.
- The token model, component list, contrast test and motion approach are unchanged. Only values, shapes and the scene's composition change.
- If the desktop app's greys or red change later, the site doesn't follow automatically. The values are copied once (see Follow-up).

## Follow-up

- [x] Spec 0003 (home page) updated to the editor language (2026-10-10); it now drives the header Download target (`/#download`).
- [ ] Features #7 and #8 append their in page anchors (`/#features`, `/#questions`) to `navLinks`. Feature #10 adds Privacy to `footerLinks`.
- [ ] Feature #7: capture light theme app screenshots so windows match the light theme, and decide screenshot cropping per scene.
- [ ] Feature #8: decide whether FAQ answers need links or rich text beyond the Accordion's plain text `body`.
- [ ] Feature #2 (`/audit` tooling): adopt the Vitest config and `test` script from this feature instead of adding another.
- [ ] Confirm during build that the fontsource provider serves Geist Mono for Astro 7.3.8's Fonts API. If not, use the local provider with `@fontsource/geist-mono` files.
- [ ] Decide whether the site should track the app's palette automatically (a shared tokens package or a build step reading `../dh-studio/src/index.css`), or keep the copied values. Copying is fine until the app's palette changes.
- [ ] For `/sync` to record in root `AGENTS.md`: a pointer to root `design.md`; the rules "role tokens only", "accent rule" (replacing "honey rule"), "restrained depth" and "mono only for code"; the corrected path for `frontend-design` (`.agents/skills/frontend-design/`, spec 0001 says `.claude/skills/`); and on the `Declined:` line, Agent Skill and MCP discovery for cva, `@lucide/astro`, Vitest, `culori` and the Astro Fonts API (declined during /architect, spec 0002). Also update the scope header's "crisp dark technical base" wording, which now reads as light and dark equally.

## Rationale

Reasoning, options weighed and the context behind them: see [rationale.md](rationale.md).
