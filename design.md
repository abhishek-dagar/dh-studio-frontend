---
name: App greys and Red
source: spec 0002 (docs/specs/0002-design-system-ui-foundation/index.md)
tokens: src/styles/tokens.css, src/styles/theme.css
character: the desktop app's own near neutral greys, one red accent, tight normal width headlines, hairline borders, pill buttons, a floating glass pill header, and the app's own vernacular (an editor pane, a result grid, small popup cards) drawn in HTML
---

# App greys and Red design system

This is the visual reference for the DH Studio website. Read it before you build any page or component. The CSS is the source of truth for values: `src/styles/tokens.css` holds every color, layout and motion duration value, and `src/styles/theme.css` maps them to Tailwind names and holds type, radius and easing. Every value below matches those files. If you change one, change the other in the same commit.

## Character

Clean and precise, and recognizably the product's own home. The site uses the desktop app's own greys (hue 265, almost no chroma) in both themes, so the screenshots sit in the page as if they belong there. One red accent marks the action that matters. Headlines are Mona Sans 600 at normal width with tight negative tracking. Edges are 1px hairlines, buttons are pills, and the header floats as a glass pill just below the top of the window.

The signature is the app's own vernacular rather than landing page decoration: an editor pane (tab strip, line numbers, syntax colored code, a status bar), a result grid like the app's result set, and small popup cards like the app's own menus, all drawn in HTML on theme tokens. Everything sits flat on the page. There is no tilt, glow, grid backdrop or parallax, and the only load time motion is one reveal.

## Build mandate

- Spend boldness in one place per page: an editor pane opener with a comment headline, or a big headline. Keep everything around it quiet.
- Use an editor pane for openers and data, where a query and its result really fit the content. Never force one onto every block; a page full of panes reads as a gimmick.
- Compose from the components below. Don't invent new colors, radii, shadows or durations in a page. If something is missing, add a token (see *Adding a token*).
- Every page ships with both themes, keyboard use, visible focus, reduced motion, reduced transparency and forced colors working. These aren't extras.
- Copy is plain and specific, in sentence case. No all caps labels and no numbered markers unless the content really is a sequence. An eyebrow, if a section needs one, is `text-caption` in Mona Sans 500, `--fg-muted`.

## The four rules

1. **Role tokens only.** Components use role tokens (`bg-surface`, `text-fg`, `border-line`). Primitives (`--gray-900`, `--red-400`) live outside `@theme`, so no utility exists for them. Tailwind's default palette, radii and easings are cleared too, so `bg-red-500` doesn't exist either.
2. **Accent rule.** Red appears only as the primary action (fill, hover, edge), the focus ring, text selection, the highlighted result row's leading marker (it marks the row holding the primary action), the Surface `accent` hairline, and in a schema diagram the relation lines with their arrowheads and the selected table's outline. Links are `--fg` with an underline. Eyebrows are `--fg-muted`. No red text, icons or badges anywhere else. Errors and warnings never use red as their signal: an invalid field shows an alert icon, message text in `--fg` and a heavier border, so a red button and an error can't be confused.
3. **Restrained depth.** Raised and floating levels appear only on `AppWindow`, `PopupCard`, the header pill and true overlays (the header menu, the tooltip, a select list). Glass appears only on the header pill. Cards, editor panes, buttons, inputs and text stay flat: ground or surface, a hairline border, a top highlight. The primary button may carry its soft red shadow; no other control has a shadow.
4. **Mono only for code.** Geist Mono is for literal code, commands, file names, token names and key names. Never for decorative labels.

## Color

Every value is the sRGB hex of an oklch color. The greys and the Red are copied once from the desktop app's `src/index.css` (`.dark` and `:root` neutrals, the `[data-accent="red"]` primary). The oklch source sits as a comment beside each primitive in `tokens.css`. If the app's palette changes, the site doesn't follow automatically.

### Primitives

Defined once on `:root` in `tokens.css`. Only the role layer may use them.

| Primitive | Value | oklch | Primitive | Value | oklch |
|---|---|---|---|---|---|
| `--gray-1000` | `#101214` | 0.18 0.005 265 | `--gray-100` | `#e1e3e6` | 0.915 0.005 265 |
| `--gray-950` | `#161719` | 0.205 0.005 265 | `--gray-50` | `#e9ebef` | 0.94 0.006 265 |
| `--gray-940` | `#191b1d` | 0.22 0.006 265 | `--gray-25` | `#f9fafc` | 0.985 0.003 265 |
| `--gray-925` | `#1a1c1f` | 0.225 0.006 265 | `--gray-0` | `#ffffff` | 1 0 0 |
| `--gray-900` | `#1f2023` | 0.245 0.006 265 | `--white-text` | `#fcfcfc` | 0.99 0 0 |
| `--gray-850` | `#2a2b2e` | 0.29 0.006 265 | `--red-300` | `#ff958d` | 0.78 0.13 25 |
| `--gray-750` | `#46484b` | 0.4 0.006 265 | `--red-400` | `#f97770` | 0.72 0.16 25 |
| `--gray-600` | `#616367` | 0.5 0.006 265 | `--red-600` | `#c9222b` | 0.54 0.2 25 |
| `--gray-550` | `#6a6c6f` | 0.53 0.006 265 | `--red-700` | `#b00a1d` | 0.48 0.19 25 |
| `--gray-500` | `#7e8084` | 0.6 0.006 265 | `--red-tint-dark` | `#642724` | 0.36 0.09 25 |
| `--gray-300` | `#a9abaf` | 0.74 0.006 265 | `--red-tint-light` | `#ffdedb` | 0.93 0.04 25 |
| `--gray-200` | `#c2c4c8` | 0.82 0.006 265 | `--green-300` | `#68d7a1` | 0.8 0.13 160 |
| | | | `--green-700` | `#0b7643` | 0.5 0.12 155 |
| | | | `--green-tint-dark` | `#132c20` | 0.27 0.04 160 |
| | | | `--green-tint-light` | `#daf7e3` | 0.95 0.04 155 |

Syntax primitives: `--syntax-keyword-dark` `#e8a3bc`, `--syntax-keyword-light` `#9b2f5a`, `--syntax-string-dark` `#a9d49a`, `--syntax-string-light` `#3d6b2c`, `--syntax-number-dark` `#d2b2f2`, `--syntax-number-light` `#6b3fa0`, `--syntax-function-dark` `#9cc6e6`, `--syntax-function-light` `#1f5f8b`. Comments and punctuation reuse the greys.

### Roles

Defined under `:root[data-theme='dark']` and `:root[data-theme='light']`. Every role exists in both blocks (the test checks this). The Tailwind name is the role with a `color` prefix, so `--surface` gives `bg-surface`, `text-surface` and `border-surface`.

| Role | Dark | Light | Use |
|---|---|---|---|
| `--ground` | `#101214` | `#f9fafc` | Page background |
| `--surface` | `#161719` | `#ffffff` | Flat UI: cards, code blocks, header pill fallback |
| `--raised` | `#1a1c1f` | `#ffffff` | AppWindow body |
| `--floating` | `#1f2023` | `#ffffff` | Popup cards, popover menu, tooltip |
| `--line` | `#2a2b2e` | `#e1e3e6` | Hairline borders and dividers |
| `--line-strong` | `#6a6c6f` | `#7e8084` | Control borders (inputs), secondary button hover |
| `--fg` | `#e9ebef` | `#191b1d` | Text, icons, links |
| `--fg-muted` | `#a9abaf` | `#616367` | Secondary text, captions, eyebrows, code comments |
| `--action` | `#f97770` | `#c9222b` | Primary button fill |
| `--action-hover` | `#ff958d` | `#b00a1d` | Primary button hover and press |
| `--action-fg` | `#101214` | `#fcfcfc` | Text on primary |
| `--action-edge` | `#f97770` | `#c9222b` | Primary button 1px border |
| `--focus` | `#f97770` | `#c9222b` | Focus ring |
| `--signal` | `#68d7a1` | `#0b7643` | "Latest", "live", "available" text and dot |
| `--signal-tint` | `#132c20` | `#daf7e3` | Signal badge background |
| `--selection` | `#642724` | `#ffdedb` | `::selection` background (text stays `--fg`) |

In light, `--surface`, `--raised` and `--floating` are all white on purpose. Light elevation reads from borders and shadows, not from a lighter fill (the same choice the app makes).

Two derived washes live in `theme.css`, mixed from roles so they swap with the theme:

| Utility name | Value | Use |
|---|---|---|
| `bg-control` | `color-mix(in oklab, var(--fg) 4%, var(--surface))` | Secondary button fill |
| `bg-wash` | `color-mix(in oklab, var(--fg) 6%, transparent)` | Ghost button and nav link hover, active nav link, neutral badge, the highlighted result row |

There are no danger or warning colors. A state that needs one needs a spec change first, with contrast pairs.

### Syntax roles

Used by `CodeBlock` and the editor pane, both on `--surface`. Mapped onto Shiki's `css-variables` theme in `base.css`, and onto Tailwind names in `theme.css` (`text-syntax-keyword` and so on) for code drawn in HTML.

| Role | Dark | Light | Shiki variable |
|---|---|---|---|
| `--syntax-fg` | `#e9ebef` | `#191b1d` | `--astro-code-foreground`, `--astro-code-token-parameter` |
| `--syntax-keyword` | `#e8a3bc` | `#9b2f5a` | `--astro-code-token-keyword` |
| `--syntax-string` | `#a9d49a` | `#3d6b2c` | `--astro-code-token-string`, `--astro-code-token-string-expression` |
| `--syntax-number` | `#d2b2f2` | `#6b3fa0` | `--astro-code-token-constant` |
| `--syntax-function` | `#9cc6e6` | `#1f5f8b` | `--astro-code-token-function`, `--astro-code-token-link` |
| `--syntax-comment` | `#a9abaf` | `#616367` | `--astro-code-token-comment` |
| `--syntax-punctuation` | `#c2c4c8` | `#46484b` | `--astro-code-token-punctuation` |

The pink keyword color sits near the red accent. It passes contrast, and it only ever appears inside code.

### Contrast pairs

`bun run test` parses `tokens.css` and checks every pair below in both themes (`src/lib/contrast.test.ts`, pairs in `src/lib/contrast-pairs.ts`). A token change that breaks a pair fails the test and names the pair.

| Pair | Minimum | Dark (measured) | Light (measured) |
|---|---|---|---|
| `--fg` on ground, surface, raised, floating | 4.5 | 13.65 or more | 16.54 or more |
| `--fg-muted` on the same four | 4.5 | 7.08 or more | 5.76 or more |
| `--action-fg` on `--action` and `--action-hover` | 4.5 | 7.06 or more | 5.46 or more |
| `--focus` on the four planes | 3 | 6.13 or more | 5.37 or more |
| `--line-strong` on the four planes | 3 | 3.09 or more | 3.79 or more |
| `--action-edge` on `--ground` (light only) | 3 | not tested | 5.37 |
| `--action` on `--ground` and `--surface` (diagram lines, selected table outline) | 3 | 6.13 or more | 5.37 or more |
| `--signal` on `--signal-tint` and on `--surface` | 4.5 | 8.39 or more | 4.99 or more |
| every `--syntax-*` on `--surface` | 4.5 | 7.80 or more | 6.02 or more |

Dark `--line-strong` clears 3:1 by a small margin (3.09 on `--floating`). A lighter `--floating` needs a lighter `--line-strong` in the same change.

## Type

Fonts load through the Astro Fonts API (`astro.config.mjs`, fontsource provider), self hosted from the site's own origin, with `font-display: swap` and a metric matched fallback. Only the Mona Sans latin face is preloaded. Geist Mono loads when code appears.

- `--font-sans`: Mona Sans (variable, weight 200 to 900, normal width only), then the generated fallback, then `ui-sans-serif, system-ui, sans-serif`. Utility `font-sans`.
- `--font-mono`: Geist Mono (variable, weight 100 to 900), then the generated fallback, then `ui-monospace, SFMono-Regular, Menlo, monospace`. Utility `font-mono`.

The root font size stays 16px, and body text is 16px. Numbers use `tabular-nums` (set on `body`). Everything renders at normal width (100%). Nothing uses `font-stretch`.

| Token and utility | Size | Line height | Weight, tracking | Use |
|---|---|---|---|---|
| `text-caption` | `0.8125rem` (13px) | `1.25rem` | 450, 0 | Captions, footer, badges, eyebrows (500) |
| `text-body` | `1rem` (16px) | 1.6 | 400, 0 | Body copy |
| `text-lead` | `1.125rem` (18px) | 1.55 | 400, 0 | Intro paragraphs |
| `text-h3` | `1.25rem` (20px) | 1.3 | 600, `-0.01em` | Card and subsection titles |
| `text-h2` | `clamp(1.9rem, 1.2rem + 2.4vw, 3rem)` (30.4 to 48px) | 1.05 | 600, `-0.035em` | Section titles |
| `text-h1` | `clamp(2.075rem, 1.6rem + 2vw, 2.75rem)` (33.2 to 44px) | 1.1 | 600, `-0.03em` | Page titles |
| `text-display` | `clamp(2.6rem, 1.5rem + 4.2vw, 4.75rem)` (41.6 to 76px) | 1.02 | 600, `-0.04em` | Hero headline only |
| `text-code` | `0.8125rem` | 1.7 | Geist Mono 400 | Code blocks (Kbd uses 0.75rem) |

`text-display` caps its measure at `14ch` and `text-h2` at `18ch`, and both use `text-wrap: balance` (in `theme.css`). The clamp bounds are fixed by the spec. Only the middle term may be tuned.

Headlines and labels are sentence case, never all caps. Long text sits at `--width-prose`. Pick the visual size with the utility and the level with the element, so an `h2` can look like `text-h3` when the outline needs it.

## Spacing, layout and radius

- Spacing is Tailwind's default 4px base (`--spacing: 0.25rem`). Breakpoints are the defaults: `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem.
- Widths: `--width-prose: 68ch`, `--width-content: 72rem` (1152px), `--width-bleed: 100rem` (full bleed content), `--width-nav: 60rem` (header pill). Use the first three through `Container`.
- Gutter: `--gutter: 1rem`, `2rem` from `md`.
- Section rhythm: `--space-section: clamp(4rem, 2.5rem + 5vw, 6rem)` block padding, through `Section`.
- Header: pill height `--header-h: 3.5rem`, `--header-offset: 0.75rem` from the top, `z-index: 40`. `Section` sets `scroll-margin-top` to offset plus height plus 1rem, so anchors land below the pill.
- `body` has `overflow-x: clip`, so nothing wide ever scrolls the page sideways.

Radius follows the role of the thing, not one value everywhere:

| Token and utility | Value | Use |
|---|---|---|
| `rounded-inset` | 5px | Kbd, inline code |
| `rounded-field` | 10px | Inputs, code blocks, tooltip, popup cards |
| `rounded-button` | 9999px | Every button, nav links |
| `rounded-surface` | 18px | Cards, the header menu |
| `rounded-panel` | 24px | Large call to action panels |
| `rounded-window` | 14px | AppWindow, editor pane |
| `rounded-pill` | 9999px | Badges, the header pill, window dots |

## Depth and the editor language

Depth lives in `src/styles/depth.css` (in the `components` layer, so a utility can still adjust a piece), and the result grid in `src/components/editor/result-grid.css`. Shadows are neutral (no warm tint), and every level above ground carries a 1px top highlight.

| Level | Background | Shadow | Top highlight |
|---|---|---|---|
| ground | `--ground` | none | none |
| surface | `--surface` | none, 1px `--line` border | `--highlight` |
| raised | `--raised` | `--shadow-raised` | `--highlight` |
| floating | `--floating` (or glass on the header) | `--shadow-floating` | `--highlight` |

| Token | Dark | Light |
|---|---|---|
| `--shadow-raised` | `0 40px 80px -30px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(255 255 255 / 0.03)` | `0 40px 80px -30px rgb(20 24 40 / 0.12), 0 0 0 1px rgb(20 24 40 / 0.03)` |
| `--shadow-floating` | `0 24px 60px -20px rgb(0 0 0 / 0.6), 0 8px 20px -10px rgb(0 0 0 / 0.4)` | `0 24px 60px -20px rgb(20 24 40 / 0.18), 0 8px 20px -10px rgb(20 24 40 / 0.1)` |
| `--shadow-header` | `0 8px 24px -12px rgb(0 0 0 / 0.5)` | `0 8px 24px -12px rgb(20 24 40 / 0.1)` |
| `--highlight` | `inset 0 1px 0 0 rgb(255 255 255 / 0.06)` | `inset 0 1px 0 0 rgb(255 255 255 / 0.9)` |
| `--hairline` | `color-mix(in oklab, var(--red-400) 60%, transparent)` | `color-mix(in oklab, var(--red-600) 60%, transparent)` |
| `--glass-bg` | `color-mix(in oklab, var(--surface) 72%, transparent)` | same formula |

- **Editor pane** (`.editor-pane`): flat `--surface`, 1px `--line` border, `rounded-window`. The tab strip, the line number gutter (3.25rem) and the status bar sit on `--ground`; inner dividers are `--line`. Code is Geist Mono at `text-code` in `--syntax-fg`. No shadow, tilt, mask, glass or glow. It reads the same in both themes because every part is a role token.
- **Result grid** (`.result-grid` on a real `<table>`): caption and header row on `--ground` in `--fg-muted`, 13px weight 500; body rows 14px with `--line` dividers; `mono` cells in Geist Mono. The highlighted row (`data-current`) gets `bg-wash` and `box-shadow: inset 3px 0 0 var(--action)` on its leading cell (mirrored in right to left text).
- **Status bar** (`.status-bar`): Geist Mono 12px, `--fg-muted` on `--ground`, a `--line` top border, items spread to both ends.
- **Canvas pane** (`.editor-canvas`, `EditorPane` with `canvas`): the pane's body as a drawing surface, like the app's schema designer: `--ground`, padded (1.5rem by 1rem, 2.5rem from `md`), no gutter and no line numbers. It scrolls sideways inside the pane rather than widening the page.
- **Diagram table** (`.diagram-table`): one schema table. A header on `--ground` (a 14px icon, the name in Geist Mono 13px weight 600), then rows of Geist Mono 12px: a 12px icon slot (`key-round` for a key, `link-2` for a link, empty for a field), the name in `--fg` and the type right aligned in `--fg-muted`. Body `--surface`, 1px `--line` border and dividers, `rounded-field`, flat. Selected adds a 1px `--action` outline over the border. Relation lines between tables are 1.5px `--action` step lines with a 6px arrowhead, attached with CSS anchor positioning (hidden where it is missing).
- **AppWindow** (`.window`): a raised frame for a real screenshot: `--raised`, `--shadow-raised`, `--highlight`, `rounded-window`, a title bar with three neutral dots. Flat on the page, no tilt, fade or glass. It is the positioned parent a popup card floats over.
- **Popup card** (`.popup-card`): `--floating`, 1px `--line` border, `rounded-field`, `--shadow-floating`, `--highlight`, always solid, never glass. Hidden below `md`.
- **Accent hairline** (`.surface-accent`): on a Surface with `accent`, a 1px line across the middle 60% of the top edge, `linear-gradient(90deg, transparent, var(--hairline), transparent)` at opacity 0.7.
- **Glass**: `background: var(--glass-bg); backdrop-filter: blur(16px) saturate(1.6)` on the header pill only. It falls back to solid `--surface` under `@supports not (backdrop-filter: blur(1px))` and `@media (prefers-reduced-transparency: reduce)`.
- **Compact**: below `md` the editor gutter hides and code wraps inside the pane, a `stack` result grid turns each row into a block, popup cards hide, and nothing scrolls sideways at 360px.
- **Forced colors**: the hairline and shadows are hidden; editor panes, windows, popup cards, diagram tables and the header pill get a 1px `CanvasText` border (2px on a selected diagram table), and diagram lines draw in `CanvasText`; the highlighted row keeps a 2px `CanvasText` border; focus stays a 2px `Highlight` outline.

## Motion

| Token | Value | Use |
|---|---|---|
| `--dur-fast` | 150ms | Hover, color, focus changes |
| `--dur-base` | 220ms | Popover, accordion, tooltip |
| `--dur-reveal` | 300ms | The one reveal (a result appearing as if the query just ran) |
| `--ease-out` (`ease-out`) | `cubic-bezier(0.2, 0.7, 0.2, 1)` | The reveal, opening |
| `--ease-in-out` (`ease-in-out`) | `cubic-bezier(0.6, 0, 0.3, 1)` | State changes |

Use durations as `duration-(--dur-fast)`.

- **Reveal** (`base.css`): an element marked `data-reveal` fades from opacity 0 to 1 over `--dur-reveal` with `--ease-out` when its owner sets `data-revealed`. The hidden start applies only under `html[data-js]`, which the head script sets, so without JavaScript the element is visible from the start. A page uses it at most once, for the thing the page is about.
- **Reduced motion**: nothing moves. The reveal is never hidden, so it shows its end state at once. No animations, no transform transitions; the remaining transitions are color and opacity only, at `--dur-fast`.
- **Theme switch**: the toggle sets `data-theme-switching` on `<html>` for two frames, which turns transitions off so colors swap at once.
- Only transforms and opacity animate, plus the accordion panel height. No tilt, parallax, scroll driven or decorative motion, and no fade and slide on sections.

## Themes

Themes are token swaps under `[data-theme]` on `<html>`. The inline head script in `BaseLayout.astro` sets it before paint from `localStorage['theme']`, else `prefers-color-scheme`, so the page never flashes the wrong theme. The same script sets `data-js` on `<html>` for the reveal. An inline head style paints the ground before the stylesheet loads, with the literal `--ground` hexes (`#101214` dark, `#f9fafc` light); keep them equal to `tokens.css`. `ThemeToggle` flips the theme and remembers the choice (storage failures are ignored).

## Components

Static components are `.astro` in `src/components/` (`ui/`, `editor/`, `site/`). Islands are `.tsx` in `src/islands/`, take serializable props only, and hydrate with `client:visible`, `client:idle` or `client:media`, never `client:load`. Shared looks live in `src/lib/ui/`: cva recipes (`button.ts`, `badge.ts`) and class names (`syntax.ts`, `result.ts`), so an Astro button and a React button match. Icons are `@lucide/astro` (per icon import, for example `@lucide/astro/icons/download`) in `.astro`, and `lucide-react` in islands. Decorative icons get `aria-hidden="true"`.

Every interactive element gets the same focus ring on keyboard focus only: 2px solid `--focus`, offset 2px (`base.css`), including inside the glass header and inside editor panes. Don't remove it or restyle it per component.

### Button

`ui/Button.astro`, recipe `lib/ui/button.ts`.

- Props: `variant` `'primary' | 'secondary' | 'ghost'` (default primary), `size` `'md' | 'lg'` (default md), `href?`, `type?`, `disabled?`, `iconOnly?` with a required `label`, `class?`.
- Renders `<a>` when given `href`, else `<button>`. A disabled link becomes `<a role="link" aria-disabled="true">` with no `href`.
- Every button is a pill (`rounded-button`). Sizes: md is 44px tall (`h-11`), lg is 52px (`h-13`) and semibold. Icon only is a circle.
- Primary: `--action` fill, `--action-fg` text, 1px `--action-edge` border, `--action-hover` on hover, a soft red shadow (`0 6px 18px -8px` of `--action` at 70%) and an inset top light. Secondary: `bg-control` (4% `--fg` mixed into `--surface`), 1px `--line` border, `--line-strong` border on hover. Ghost: transparent, `bg-wash` on hover.
- States: hover as above, focus ring, active presses 1px down, disabled at 50% opacity with no pointer events.
- Use one primary per view. Name the action plainly ("Download DH Studio", "Connect").

### Link

`ui/Link.astro`. Props: `href` plus any anchor attribute. `--fg` text with a 1px underline at 3px offset in `--line-strong`, which turns `--fg` on hover. Every link opens in the same tab. Never red.

### Surface

`ui/Surface.astro`. Props: `as?` (`div`, `section`, `article`, `aside`, `li`), `padding?` `'sm' | 'md' | 'lg'`, `accent?`. Flat `--surface`, 1px `--line` border, `rounded-surface`, `--highlight`. With `accent` it adds the red hairline along its top edge; use it on one card in a group at most. No elevation.

### Badge

`ui/Badge.astro`, recipe `lib/ui/badge.ts`. Props: `variant` `'neutral' | 'signal' | 'outline'`. Pill, caption size. Neutral is `--fg` on `bg-wash` with a `--line` border. Signal is `--signal` text on `--signal-tint` with a dot, and always has text, so meaning never rests on color. Outline is `--fg-muted` with a `--line-strong` border.

### Input

`ui/Input.astro`. Props: `id`, `label` (required and visible), `type?`, `name?`, `value?`, `placeholder?`, `hint?`, `error?`, `disabled?`.

- 44px tall, `--ground` fill, 1px `--line-strong` border (`--fg-muted` on hover), `rounded-field`, focus ring.
- Hint text is linked with `aria-describedby`.
- Invalid sets `aria-invalid`, links the message first in `aria-describedby`, and shows a 2px `--fg` border plus an alert icon and the message in `--fg`. Never red, never color alone.
- Disabled is 50% opacity with a not allowed cursor.

### Kbd

`ui/Kbd.astro`. Props: `keys: readonly string[]`. An outer `<kbd>` wraps one `<kbd>` per key, in Geist Mono at 0.75rem, on `--surface` with a 1px `--line` border and a 1px bottom edge, `rounded-inset`.

### CodeBlock and CopyButton

`ui/CodeBlock.astro`. Props: `code`, `lang`, `title?` (shown in mono, for a file name), `copy?` (default true).

- Highlighted at build time by Astro's `<Code theme="css-variables">`, so syntax colors swap with the theme. `rounded-field`, on `--surface` with a `--line` border.
- The code scrolls sideways inside itself and is keyboard focusable for scrolling. The page never scrolls sideways.
- `islands/CopyButton.tsx` (`client:visible`, prop `text`): a ghost icon button labeled "Copy code". A live region says "Copied", or "Copy failed, select the text to copy" when the clipboard is unavailable. It never throws.

### Container and Section

`ui/Container.astro`: `width` `'prose' | 'content' | 'bleed'` (default content), centered, `--gutter` side padding. `ui/Section.astro`: `id?`, `labelledby?` (the id of its heading), `as?`, with `--space-section` block padding and a `scroll-margin-top` that clears the header pill.

### Editor: EditorPane, EditorLine, Tok, result grid, PopupCard, AppWindow

- `editor/EditorPane.astro`: props `tabs?` (`readonly { label, current? }[]`), `label?` (makes the pane a named group, for when a line holds a real control), `canvas?` (the default slot becomes a `.editor-canvas` drawing surface instead of code), `class?`. Default slot is the code (`EditorLine` elements); named slots `result` (usually a result grid table) and `status` (wrapped in a `.status-bar`). Tabs are decorative text (`aria-hidden`), not controls. Renders complete with no JavaScript.
- `editor/DiagramTable.astro`: props `name`, `rows` (`readonly { name, type?, kind?: 'key' | 'link', anchor? }[]`), `selected?`, `headingLevel?` (2 to 4; without it the name is plain text), `class?`; slot `icon` for the header icon. The rows are decorative (`aria-hidden`), so put the meaning in the name and in text next to the box. A row's `anchor` sets its CSS `anchor-name`, so a relation line can attach to it. Use it inside a canvas pane, where a diagram really is the content (Home's engines section).
- `editor/EditorLine.astro`: props `size?` `'code' | 'h2' | 'display'` (default code), `indent?` (characters), `decorative?` (sets `aria-hidden`). One counted line. Its number is a CSS counter in the gutter, written as generated text with an empty alternative so assistive technology skips it. A `display` or `h2` line holds Mona Sans at that size (a comment headline) and its number sits on the line's first baseline; put the real heading element (`<h1>`, `<h2>`) inside it. Code lines keep their spaces and wrap inside the pane.
- `editor/Tok.astro`: prop `kind` `'keyword' | 'string' | 'number' | 'function' | 'comment' | 'punctuation' | 'ident'`. A `<span>` in the matching `--syntax-*` role. Islands use the same classes through `syntaxClass` in `lib/ui/syntax.ts`.
- Result grid: `resultGridClass({ stack })` and `resultClass` (`mono`, `action`, `statusBar`) in `lib/ui/result.ts`; styles in `editor/result-grid.css`. Use a real `<table>` with a `<caption>`, `<th scope="col">` headers and one `data-current` row at most. With `stack`, below `md` each row becomes a block with its cells two to a line, the `action` cell full width, and each cell's column name shown from its `data-label`. Because changing a table's display can drop its semantics in some browsers, a `stack` table carries explicit roles in its markup (`table`, `rowgroup`, `row`, `columnheader`, `cell`).
- `editor/PopupCard.astro`: props `position` (`{ x, y, width }`, percentages of the parent window), `class?`. Default slot is the card body. Decorative (`aria-hidden`), so never put a link or control inside it. At most one per `AppWindow`.
- `editor/AppWindow.astro`: props `image` (an imported screenshot), `alt`, `title`, `eager?` (load at once, for a window above the fold), `sizes?`, `class?`; default slot for one `PopupCard`. A title bar with three neutral dots and the title centered in `--fg-muted`, then the screenshot through Astro `<Picture>` as AVIF and WebP. The title bar is decorative; the `alt` carries the meaning.
- Screenshots are cropped to the app content (no macOS title bar or shadow margin), because AppWindow draws its own chrome. The screenshots on hand are dark only, so windows stay dark in the light theme until light screenshots exist.

### Site chrome: Logo, Header, Footer, ThemeToggle

- `site/Logo.astro`: the app icon (`src/assets/brand/logo.png`, the app's Tauri icon), 24px with a 6px radius, next to "DH Studio" in Mona Sans 600, 15px, `-0.01em`, at normal width. The mark is `aria-hidden`. `showWordmark?` (default true).
- `site/Header.astro`: prop `currentPath`. A floating glass pill: sticky `--header-offset` below the top, centered, at most `--width-nav` wide, 1px `--line` border, `--shadow-header`. The logo links home, then the nav links from `src/lib/site.ts` as 14px `--fg-muted` pills (`--fg` on `bg-wash` on hover and for `aria-current="page"`), the theme toggle, and a primary Download button. Below `md`, the links and the theme toggle move into a native `<nav popover>` (`--floating`, `rounded-surface`) opened by a ghost icon button named "Menu" (`popovertarget`); Logo, Menu and Download stay in the pill, and the Download icon hides below `sm` so all three fit at 360px. The browser handles Escape, outside clicks and returning focus to the button.
- `site/Footer.astro`: the footer links from `site.ts` in 13px `--fg-muted` (`--fg` on hover) and the line "Open source under the Apache 2.0 license", on `--ground` with a top `--line`.
- `islands/ThemeToggle.tsx` (`client:idle`): a ghost icon only button, Sun or Moon, labeled "Switch to light theme" or "Switch to dark theme". It follows `data-theme`, so the header and menu toggles always agree.
- `BaseLayout.astro` adds a "Skip to content" link (first in tab order) and wraps pages in `<main id="main">`. Pages don't add their own `<main>`.

### Accordion

`islands/Accordion.tsx` (`client:visible`). Props: `items: readonly { value, title, body }[]`, `multiple?` (default false). Built on Base UI. Enter or Space toggles an item. Up, Down, Home and End move between headers (added on top of Base UI, which leaves arrow keys out). The panel height animates over `--dur-base`, opacity only under reduced motion. `body` is plain text, and a blank line starts a new paragraph.

### Tooltip

`islands/Tooltip.tsx` (`client:visible`). Props: `label` (the trigger's own accessible name), `tip`, `icon?` `'info' | 'keyboard'`, `href?` (makes the trigger a link). Built on Base UI. The trigger is a ghost icon button. It opens on hover after 300ms and at once on keyboard focus, stays open while hovered, and closes on Escape. It renders on `--floating`, `rounded-field`. A tooltip only ever adds to a trigger that already has a name. Never put essential information only in a tooltip.

## Changelog

The `/changelog/` pages (spec 0005), in `src/components/changelog/` and `src/pages/changelog/`.

- **Opener** (`ChangelogHeader`): an editor pane with a `changelog.sql` tab. Line 1 is the page's one `h1` after a `--` comment marker, at `h2` line size; the next lines are the query, colored by `sqlTokens` (`lib/changelog/sql.ts`) through `Tok`. The status bar counts the view's rows.
- **Filter tabs and feed** (`ChangelogTabs`): plain links in a `nav`, styled like the header nav pills. The current tab carries `aria-current="page"`, `bg-wash` and an underline, so it still reads in forced colors. A `Subscribe` link with the `rss` icon sits at the other end.
- **Entry** (`ReleaseEntry`): a `Surface` `article`. The version is an `h2` at `text-h3` size, linking to its own page; then `ReleaseMeta` (the date in `text-caption` `--fg-muted`, a signal `Latest` badge, an outline `Prerelease` badge), the notes, and a `View on GitHub` link.
- **Notes** (`ReleaseNotes`, `.release-notes`): styled from markdown output, not utilities. Headings start at `h3` (`text-h3`); `h4` and below are body size, semibold. Lists use `--fg-muted` markers, links match `Link`, inline code is a quiet chip on `--ground` with `rounded-inset`. Fenced code matches `CodeBlock` (surface, `--line` border, `rounded-field`, `css-variables` colors, no copy button) and scrolls sideways inside itself.
- **Pager** (`ChangelogPager`): secondary pill buttons for Newer and Older with arrows, and `Page n of m` in `text-caption` between them. Each button is left out at its end.
- **Version page**: an `All releases` link and `Subscribe` on top, then an `h1` at `text-h1`, the meta row, a `Release notes` `h2` at `text-h3` in `--fg-muted`, and the pager to the neighboring versions. No editor pane: one bold move per page, and on this page it is the version.
- **Version index**: the shared section index (see *Section index* below) on list pages with 2 or more entries, the container widened to 64rem at `lg`. Versions show in `font-mono`, with the entry `Latest` and `Prerelease` badges. Each entry `article` carries `id="v<version>"` and the shared `scroll-margin-top`.

## Section index

`ui/SectionIndexed.astro` wraps long content with an `On this page` index (spec 0008, AC-6), used by the changelog lists and the features page. Props: `label`, `items` (`readonly { anchor, label, mono?, badges? }[]`, from `lib/ui/section-index.ts`), `from` (`lg` or `xl`). An optional `lead` slot sits above the content, and the index column spans it. With no items the content renders alone.

- From `lg` a sticky 14rem right column (at the header offset plus the pill plus 1rem) holds the `SectionIndex` island (`client:idle`): a `text-caption` label, then plain anchor links. The section you are reading (`activeAnchor`) gets a 2px `--fg` start border, `--fg` text and medium weight, never color alone (forced colors use `Highlight` for the border).
- Below `lg` the same links fold into `ui/SectionJump.astro`, a `<details>` on `bg-surface` with a `--line` border, `rounded-field` and a turning chevron. It never carries the reading mark.
- The index comes before the content in the DOM, so keyboard order is index then content at every width. Links jump with no JavaScript.
- **Motion**: the jump is smooth under `prefers-reduced-motion: no-preference` and instant under `reduce`, scoped with `:root:has([data-section-index])` so no other page changes.

## Features page

The `/features/` page (spec 0008), in `src/components/features/` and `src/pages/features.astro`. One `features` collection feeds it and Home, so both list the same entries in the same order; anchors come from `featureSlug` (`lib/features/slug.ts`).

- **Opener** (`FeaturesOpener`): an editor pane with a `features.sql` tab. Line 1 is the page's one `h1` after a `--` marker at `h2` line size, then a comment lead and the query naming the engine columns. Its result is the support matrix, a `stack` result grid (feature rows by `home.yaml` engine columns), each cell an icon (`check`, `contrast`, `minus` from `level-icons.ts`) plus the level word and an optional note. The matrix is the page's one reveal. The status bar reads `<n> rows · <m> engines` and the file name.
- **Section** (`FeatureSection`): a `text-caption` eyebrow (the tab name), an `h2` at `text-h2`, the benefit at `text-lead` in `--fg-muted`, the `EngineLine`, the screenshot (`home/FeatureShot.astro`, shared with Home) with one page popup card, then `What you can do` (`h3`) and the capabilities as `h4` plus a paragraph, two columns from `md`. Sections are split by a `--line` top border.
- **Engine line** (`EngineLine`): a `Works with` caption and a wrapped list of engine icons and names. A partial engine adds `(partly, <note>)`; an unsupported one is `--fg-muted` and says `(not supported, <note>)` in words.
- The page ends with Home's `Closing`. Home's feature panels link in with `More about <tab>`.
- Engine icons live in `editor/engine-icons.ts` and popup cards in `home/cards/index.ts` (`cardComponents`), shared by Home and this page.

## Docs

The `/docs/` section (spec 0009), in `src/pages/docs/`, `src/layouts/DocsLayout.astro`, `src/components/docs/` and `src/islands/DocsSearch.tsx`. Guides are Markdown in `src/content/docs/<group>/<slug>.md`; the group, URL and breadcrumb all come from that path.

- **Opener** (`/docs/`, `DocsOpener`): an editor pane with a `docs.sql` tab. Line 1 is the page's one `h1` after a `--` marker at `h2` line size, then a two line query. Its result is a `stack` result grid of the three getting started steps (`step`, `what`, `guides`), each step's guides as plain links. The grid is the page's one reveal. Below it sit the search box at prose width and every group: an `h2` at `text-h3` linking to its group page, the description in `--fg-muted`, then its `GuideList`. No sidebar on this page.
- **Layout** (`DocsLayout`, guide and group pages): from `lg` a sticky 14rem left column (at the header offset plus the pill plus 1rem, scrolling inside itself) holds the search, then the grouped sidebar. Below `lg` the search sits on top and the sidebar folds into a `Docs menu` `<details>` (closed, `bg-surface`, `--line` border, `rounded-field`, a turning chevron), the same look as `SectionJump`.
- **Sidebar** (`DocsSidebar`): each group label is a `text-caption` medium link to its group page; its guides follow as 14px `--fg-muted` links on a 2px `--line` start rule. The page you are on carries `aria-current="page"`, a 2px `--fg` start border, `--fg` text and medium weight, never color alone (`Highlight` border in forced colors). A group page marks its label with `--fg` and an underline.
- **Guide page**: `Breadcrumb` (`Docs › <group> › <guide>`, `text-caption`, the first two underlined links), the `h1` at `text-h1`, then the **stamp** (`GuideStamp`): `Checked against DH Studio <version> · Updated <date>` in `text-caption` `--fg-muted`. The body sits in `SectionIndexed` with `from="xl"`, the header passed as its `lead` slot so the `On this page` column starts level with the breadcrumb; the column opens at `xl` (below it the jump `<details>` shows), and only for guides with 2 or more `h2`s. `PrevNext` ends the page: two flat bordered links (`--line`, `rounded-field`, `bg-wash` on hover), each a caption with an arrow over the guide title, a side left out at its end.
- **Body** (`docs.css`): each run of Markdown sits in a `.docs-prose`, styled like `.release-notes` and `.privacy-body`. `h2` is at `text-h3` size (sections read as parts of the page title), `h3` body size semibold, prose capped at `--width-prose`, inline code in Kbd's quiet chip, fenced code and plain tables scrolling inside themselves. Blocks placed by marker lines sit between the prose runs, never inside them, so prose rules never reach a block.
- **Blocks**: `{downloads}` is a `stack` result grid (file, for, size, a Download link) in a `.docs-frame` (flat `--surface`, `--line` border, `rounded-surface`, scrolling sideways inside itself), then `All files and checksums`; a fallback build shows one muted line and the GitHub releases link. `{install-command}` is Home's `InstallCommandLine` with a secondary Copy button, plus Home's install note in `text-caption`. `{launch-tip}` is the Download page's launch card. `{requirements}` and `{data-files}` are plain result grids in a `.docs-frame`. `{shortcuts}` is one `stack` result grid per area, each key set in `Kbd`, and `can be changed` in `text-caption` under the action. `{screenshot}` is the guide's own cropped capture (a card or dialog, not a whole window) in a plain `.docs-shot` frame: a `--line` hairline and `rounded-surface`, no title bar, no shadow, no wider than the capture's pixels at 2x. The dark and light pair sits at `src/assets/screenshots/docs/<group>-<slug>.png`, named by the guide's id; take each from the shot list in spec 0010 (`frontend-docs/specs/0010-real-docs-screenshots/index.md`). Without the files, local and preview builds show a labeled 4:3 placeholder, and production refuses to build.
- **Group page**: breadcrumb, `h1`, the description at `text-lead` `--fg-muted`, then `GuideList`.
- **Guide list** (`GuideList`): a two column grid from `md` of flat `Surface` like links (`rounded-surface`, `--line` border, `--line-strong` on hover), the title at `text-h3` with a `--fg-muted` arrow, the description in `--fg-muted`.
- **Search** (`DocsSearch`, `client:idle`): renders nothing on the server, so without JavaScript no box shows; a `.docs-search-slot` reserves its height only under `html[data-js]`. A visible `text-caption` label and an `Input` look `type="search"` field with a search icon. It loads `/pagefind/pagefind.js` on first focus or input. States: idle (nothing but the field), loading (`Loading search…`), results (`<n> guides found`, then up to 8 links, each the title in medium `--fg` and Pagefind's excerpt in `text-caption`, with matches as semibold, underlined `--fg` text, never a color fill), empty (`No guides match`), unavailable (`Search works on the built site` in dev, `Search is unavailable right now` otherwise, final for the page view). The count line is a polite live region. Escape clears the query. No hotkey, no combobox role, no arrow keys. Only guide articles carry `data-pagefind-body`; the stamp, downloads, index and previous and next carry `data-pagefind-ignore`.

## Site links

`src/lib/site.ts` is the one place for site wide links: `repoUrl`, `featuresHref` (`/features/`, the header and footer Features link), `docsHref` (`/docs/`, the header Docs link between Features and Changelog, current anywhere under `/docs/`, and the footer Docs link after Features), `downloadHref` (`/#download`, the header Download, which jumps to the Home result grid; a fallback build links the GitHub releases page instead), `licenseUrl`, `licenseLine`, `navLinks`, `footerLinks`. Add in page anchors to `navLinks` only once their sections exist.

## Adding a token

1. Add the primitive (if new) to the `:root` block in `tokens.css`, with its oklch source as a comment.
2. Add the role to **both** theme blocks.
3. If components need a utility, map it in the `@theme inline` block of `theme.css`.
4. If the role is text, a border or focus on a background, add a pair to `src/lib/contrast-pairs.ts`.
5. Run `bun run test`, then update the tables in this file.

## Do and don't

- Do use `Container` and `Section` for layout, and the type utilities for size.
- Do keep one primary button per view, one reveal per page, and at most one popup card per window.
- Do give every image real `alt` text and every icon only control a label.
- Don't use raw colors, sizes, shadows or durations in components. Use a token, or add one.
- Don't put shadows, glass or raised backgrounds on cards, inputs or buttons (the primary button's red shadow is the one exception).
- Don't use red for text, icons, badges or any error or warning state, or mono for anything that isn't literal code.
- Don't use `font-stretch`; every word is normal width.
- Don't animate layout properties, and don't add entrance animations to sections.
- Don't bring back tilt, perspective, parallax, glow or a grid backdrop. The editor language carries the identity.
