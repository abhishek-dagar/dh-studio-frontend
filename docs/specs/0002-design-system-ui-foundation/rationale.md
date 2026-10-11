# 0002. Rationale: app greys and Red design system and UI foundation

The decision record behind [index.md](index.md). `/develop` builds from the index. This file explains why.

The first version below chose a warm graphite and honey identity. It was built, then revised on 2026-10-10 after you reviewed it. The original reasoning is kept as history; [Revision: app greys and Red](#revision-app-greys-and-red) at the end records what changed and why.

## Context

> ⚠️ Premise note: this feature takes in more than a token pass. It also builds the site header, footer, accordion, tooltip and code block, which the scope otherwise places in the home slices (#6, #8). They're included because every page needs the header and footer, and the accordion proves Base UI styling early, but the feature is larger as a result. The Tracer Bullet build plan keeps it shippable in steps: tokens and one button end to end first, the components last.

The DH Studio website exists to get developers to download a desktop database client. The scope sets the brief as "grounded spatial": layered app windows floating in depth, soft light and gentle parallax, a crisp dark technical base with sharp type, dark first with a polished light theme. Spec 0001 already fixed the tools (Astro static output, Tailwind v4 tokens in `@theme`, `[data-theme]` theme swaps, Base UI, `motion`, CSS 3D, lucide) and left font choice and loading to this spec. The scaffold has only placeholder tokens.

Several forces pull against each other. Depth, blur and motion are what make the brief distinctive, and they're also what most threatens the Core Web Vitals budget and WCAG AA. Every effect needs a reduced motion fallback, and every color pair must hold AA in two themes. Most developer tool sites use a dark base with a blue or violet accent, so a "dark technical" brief drifts toward looking like all of them unless the palette and type are chosen on purpose. The engineer explicitly ruled out blue.

The desktop app next door (`../dh-studio`) has a mature token system: oklch neutrals at hue 265, a "DH Blue" accent, IBM Plex, and radii by role. The site could inherit it, but the engineer chose a distinct marketing identity. That leaves the site to define its own palette and type, while still showing the app's real screenshots inside it.

One developer builds the site. Later slices (showcase, home hero, feature story, FAQ, SEO) all compose from whatever this feature produces. If the system is missing a token or component, each slice invents its own, and the look fragments within a few weeks. If nothing guards contrast, the first palette tweak can quietly break AA.

## Options considered

### Option 1: Custom "studio graphite" token system on Tailwind v4

A site specific system: primitives plus semantic roles in CSS, mapped into Tailwind with `@theme inline`; a warm graphite and honey palette with a concrete light theme; Mona Sans and Martian Mono; four elevation levels over a CSS ground plane; CSS first motion; Astro components with a few Base UI islands; a contrast test and a root `design.md`.

**Pros**:
- A distinct identity tuned to this brief (the grid floor echoes the app's data grid, and the honey lamp ties to the "Studio" name).
- The token layers make both themes a swap of one block, and keep primitives out of components by construction.
- Nearly all of it is static CSS, so depth costs little JavaScript.

**Cons**:
- Everything is designed and built from scratch, which is the largest up front effort of the options.
- A second visual language to maintain alongside the app's.

### Option 2: Extend the desktop app's design system

Copy the app's tokens (hue 265 neutrals, DH Blue, IBM Plex, radius roles) and add a spatial layer (elevation, glass, ground plane, motion) on top.

**Pros**:
- The site and app look like one product, and screenshots blend in seamlessly.
- The palette and its contrast tests already exist and are proven.

**Cons**:
- The engineer chose a distinct identity, and DH Blue is exactly the blue the brief wants to avoid.
- App tokens are tuned for dense 13px chrome, not 17px marketing reading and 80px headlines. The type scale would need replacing anyway.

### Option 3: A themed component kit

Adopt a copy in kit (shadcn style components ported to Astro, or a Tailwind plugin kit) and recolor it with the chosen palette.

**Pros**:
- Many components arrive at once, with tested keyboard behavior.
- The fastest path to a complete showcase page.

**Cons**:
- Kits carry their own look (uniform radius, soft grey card shadows), which is the templated feel the brief rejects.
- Most kits are React first, which pushes static pieces into islands against the islands rule. Base UI already covers the few interactive primitives the site needs.

### Option 4: Minimal tokens, design per page

Define only colors and fonts now, and let each page slice design its own surfaces and motion.

**Pros**:
- The least work today, and it defers decisions until real pages exist.

**Cons**:
- Depth, light and motion are the identity. Deferring them means the hero slice invents them under deadline, and later slices diverge.
- Nothing to verify against, so `/check verify` has no contract for "on brand".

## Decision

Option 1 (original). Revised on 2026-10-10 to Option 1 with the app's greys and a Red accent; see the revision below and [index.md](index.md) for the current system.

## Rationale

The brief's distinctive part is spatial: depth, light and a sense of the product standing somewhere. Option 1 is the only option that designs that layer as a system instead of leaving it to the first page that needs it (Option 4) or borrowing a look that fights it (Options 2 and 3). The engineer's choice of a distinct identity, plus the explicit "not blue", rules out inheriting the app's palette. Keeping the app's useful idea (radius by role, hierarchy instead of one radius everywhere) costs nothing.

**Palette.** Warm graphite with a honey lamp keeps the "dark technical base" while moving the warmth into light rather than a beige background, avoiding the cream and terracotta look common in generated pages. Honey is scarce on purpose (action, focus, selection, glow), so the download button is the one warm thing to press. Concrete was chosen for light because its surfaces get lighter as they rise, so elevation reads the same way in both themes. A near white base would rely on shadow alone. A single signal green covers the one status the site shows ("latest release"). A full status set would add four color pairs to keep at AA for forms that don't exist.

**Type.** Mona Sans has a width axis, so expanded headlines give "sharp type" from one variable family while body text stays at normal width. Martian Mono pairs with it for code and is restricted to literal code so it doesn't become decorative labeling. A 17px body with a 1.25 ratio suits reading on a marketing page. Fluid display steps avoid headlines jumping between fixed sizes. The Astro Fonts API was picked over hand written fontsource imports because it handles preload and metric matched fallbacks, which protects layout shift. The runner up, `@fontsource` imports as in the app, stays as the fallback if the provider misses the width axis.

**Depth.** The ground plane is the single memorable device. It makes "grounded" literal and echoes the app's spreadsheet grid, and it's pure CSS, so it's free to theme and costs no JavaScript. A fixed key light from the upper left makes shadows, highlights and glow agree everywhere, without an island per scene (the runner up, a pointer driven light, competes with the ground plane for attention). Restricting elevation and glass to product scenes means the effects land where they matter and the budget stays safe.

**Motion.** One entrance per scene plus pointer parallax follows the "spend boldness in one place" principle and avoids fade and slide on every section. CSS handles everything it can. `motion` runs only in the parallax island, where spring smoothing is worth it. `client:media` means touch and reduced motion visitors never download it. Reduced motion keeps depth, because depth is not motion. Flattening the scene would remove the identity without any access gain.

**Components and tooling.** cva recipes in `src/lib/ui/` let a Button look identical in `.astro` and in an island, matching the app's familiar pattern (the runner up, plain class maps, would hand roll compound variants). `tailwind-merge` is left out because recipes don't override each other; add it only if class overrides appear. `@lucide/astro` keeps icons static. A Vitest contrast test, as the app has, turns AA from a promise into a gate, and `culori` does the color math so the test stays a few lines. The header uses a native popover menu instead of a Base UI dialog island, because a nav menu doesn't need a focus trap and the native element gives Escape and outside click handling with no JavaScript.

**Small calls made here** (each with its runner up):
- `tailwind-merge`: not added (runner up: add it with the first real class override).
- Entrance trigger: one shared IntersectionObserver in a processed Astro script (runner up: CSS `animation-timeline: view()`, which ties the entrance to scroll position instead of playing once).
- Parallax hydration: `client:media` on fine pointer and no reduced motion (runner up: `client:visible` plus a runtime media check, which still downloads the island on phones).
- Footer copyright: a license line instead of a named copyright holder, since no holder name is recorded (runner up: ask and add the holder name).
- External links: same tab (runner up: new tab, which needs `rel` handling and an announced warning).
- Theme switch: transitions disabled for one frame (runner up: animated color swap, which flashes on large pages).
- Forced colors: supported with system color borders, and decorative layers hidden (runner up: ignore it, which leaves glass windows invisible in high contrast mode).

## Revision: app greys and Red

### Context

You reviewed the built graphite and honey system and rejected its colors. Then, over four preview rounds with fourteen palettes, you rejected the alternatives too. Asked directly, you named four problems at once: the colors themselves, the page design (it looked dated), the overall weight (too dark and heavy), and that it didn't feel like DH Studio. Your references were Linear, Raycast, Vercel, Supabase and visionOS. You wanted a mostly neutral palette with one accent.

The last of those problems pointed at the root cause. The original decision deliberately kept the site apart from the desktop app (no DH Blue, warm greys, IBM Plex replaced). Every reference you named does the opposite: the marketing site uses the product's own neutrals, so the screenshots and the page read as one thing. The desktop app already has that system: near neutral greys at hue 265 with chroma 0.006 or less, plus a set of accents (DH Blue, graphite, purple, pink, red, orange) in `../dh-studio/src/index.css`.

A preview built on the app's greys, with a new Linear and Vercel style layout, was the first one you liked. From eleven accents on those greys you chose Red. In the same session you also chose: adopt the preview's look as well as its colors, replace the grid floor scene with a tilted window and glow, keep following the OS theme on a first visit, and use Geist Mono.

The first version's code is mostly built (tokens, fonts, components, scene, showcase page), and spec 0003 (home page) builds on its scene. So this is a change to a feature in progress, not a fresh design.

### Options considered

**A. Fix in place: new palette and look on the existing system (chosen).** Keep the token layers, component list, contrast test and motion approach. Replace the values (app greys plus Red), type (normal width, Geist Mono), shapes (pill buttons, larger card radius), header (glass pill) and scene composition (tilted stage instead of grid floor).
- Pros: reuses everything that was right (token model, contrast gate, islands, accessibility rules); the contrast pair list doesn't change; the rework is values and a few components.
- Cons: real rework of built code (header, depth styles, scene, fonts, `design.md`, showcase); the look is less unusual than the original.

**B. Option 2 from the original record: adopt the app's design system wholesale.** Copy the app's tokens, IBM Plex fonts and radius presets, and add a spatial layer.
- Pros: the closest match to the app; least design work.
- Cons: the app's type scale is tuned for dense 13px UI chrome, not 76px headlines and 16px reading; IBM Plex reads as a product UI face, not a marketing one; it would replace a working token model and test with a second one.

**C. Recolor only.** Swap the palette to app greys plus Red and keep the wide headlines, solid header and grid floor.
- Pros: the smallest change; no component rework.
- Cons: fixes one of your four complaints. You named the page design and its weight as problems too, so the next review would reject it again.

### Rationale

Option A answers all four complaints with the least waste. Colors and "feels like my product" are answered by taking the app's greys; the design and weight complaints are answered by the preview's surface style (normal width tight headlines, hairlines, a glass pill header, a lighter charcoal dark theme), which you approved directly. Everything the first version got right stays: role tokens, the contrast test, restrained depth, CSS first motion and the accessibility rules. Option B throws away a working system to inherit type that was never meant for a marketing page. Option C repeats the pattern that failed for four rounds: changing hue without changing the design.

**Red as the accent** was your pick. Its known risk is that red reads as error or danger. The accent rule handles that structurally: red is allowed only on the primary action, focus, selection, glow and one hairline, and no state anywhere is signaled by red color. That keeps a red Download button from ever being confused with an error message. Both themes pass every contrast pair with margin: dark uses a light coral red with dark text, light uses a deep red with white text.

**Small calls made here** (each with its runner up):
- Hex primitives with the oklch source as a comment (runner up: oklch primitives, which would need the contrast test's parser extended first).
- Copy the app's values once (runner up: read `../dh-studio/src/index.css` at build time, which couples the site build to a sibling repo; left as a Follow-up).
- Light theme surfaces all white, elevation by border and shadow (runner up: tinted light surfaces, which the app doesn't use and the preview didn't show).
- Eyebrow labels in neutral `--fg-muted` Mona Sans (runner up: red eyebrows as in the preview, which would add accent text and a new contrast pair, and break the mono rule if set in Geist Mono).
- Body text at 16px (runner up: keep 17px; the approved preview used 16px).
- Inputs at a 10px radius while buttons are pills (runner up: pill inputs, which crowd long values and hints).
- Glass on the header pill, so two glass surfaces can be visible at once with one floating window (runner up: a solid header, which loses the visionOS touch you referenced).
- Keep `ParallaxField` unchanged and move only its consuming CSS (runner up: drop parallax, which removes the gentle depth the spatial brief still wants).

## Revision: editor language

**2026-10-10.** Made together with the spec 0003 home page revision.

### Context

You rejected the planned Home page because it looked like every AI built landing page. Asked which parts read that way, you named the centered hero template, the grid, glow and glass, and the usual section rhythm (feature cards, FAQ accordion, call to action band). You did not name the palette or the type. Most of those tells were set here, in the design system, on purpose: the first revision described the look as "in the style of Linear, Raycast, Vercel", and its signature was a tilted app window in red light over a faint grid with pointer parallax. A new Home page on that system would keep the tells.

### Options considered

**A. Replace the stage with the app's editor vernacular (chosen).** Keep tokens, palette, type, pill buttons, the glass pill header and the contrast test. Remove the stage (tilt, grid, glow, parallax, entrance) and add an editor pane, result grid styles and a popup card, all HTML on role tokens.
- Pros: the signature now comes from the subject (developers who live in SQL editors), which no template carries; less JavaScript and CSS; everything follows both themes.
- Cons: rework of just built code; an editor pane used where it doesn't fit reads as a gimmick, so its use needs judgment.

**B. Home page only, keep the system.** Give Home its own language as an exception.
- Pros: no design system rework.
- Cons: two looks on one site, and the stage components stay as dead weight or leak back into later pages.

**C. Keep the stage, restyle it.** Change the glow color, the grid, the tilt angle.
- Pros: the smallest change.
- Cons: the same structure under new paint; it answers none of the three tells you named.

### Rationale

Option A removes exactly the tells you named and keeps exactly what you didn't (palette, type, pills, glass header, which you chose to keep when asked). Three directions were previewed as rendered mockups (query to result, a schema canvas, the page as the app shell); you picked query to result, and its pieces (editor pane, result grid, popup card) are generic enough to be system components rather than Home only markup.

**Small calls made here** (each with its runner up):
- One reveal token, `--dur-reveal` 300ms, replacing `--dur-scene` and `--stagger` (runner up: keep the entrance tokens for later pages, which would invite section entrances back).
- The highlighted row's red leading marker joins the accent rule, because it marks the row holding the primary action (runner up: a neutral `--fg` marker, which separates the row less clearly from the wash).
- Popup cards are solid `--floating`, never glass, so glass stays a header only material (runner up: glass cards, which bring back the frosted look you named).
- Line numbers from CSS counters in an `aria-hidden` gutter (runner up: literal numbers in markup, which screen readers would read).
- `AppWindow` stays as a flat raised screenshot frame instead of being deleted, because the feature browser needs a frame for real screenshots (runner up: bare images with a border, which lose the app chrome).
