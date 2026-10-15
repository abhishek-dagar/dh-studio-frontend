import { defineCollection } from 'astro:content';
import { GITHUB_TOKEN, VERCEL_ENV } from 'astro:env/server';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { NOTE_MAX, SUPPORT_LEVELS } from './lib/features/support';
import { ENGINE_ICONS } from './lib/home/engines';
import { releasesLoader } from './lib/release/loader';
import { CARD_LIMITS } from './lib/seo/card';

// Home page content (spec 0003, Data model sketch). Validated at build time, so
// a missing or misspelled field fails the build instead of rendering blank.

const home = defineCollection({
  loader: file('src/content/home/home.yaml'),
  schema: z.object({
    meta: z.object({ title: z.string(), description: z.string() }),
    // The social card's words (spec 0004, AC-13). The caps keep the text inside the frame.
    card: z.object({
      comment: z.string().min(1).max(CARD_LIMITS.comment),
      query: z.string().min(1).max(CARD_LIMITS.query),
      row: z.string().min(1).max(CARD_LIMITS.row),
      alt: z.string().min(1).max(CARD_LIMITS.alt),
    }),
    hero: z.object({
      headline: z.string(),
      subline: z.string(),
      openSource: z.string(),
      viewSource: z.string(),
    }),
    query: z.object({
      otherComment: z.string(),
      yourSystemComment: z.string(),
      everySystem: z.string(),
      /** `{os}` is replaced by the system's name. */
      triggerLabel: z.string().includes('{os}'),
    }),
    download: z.object({
      fallback: z.string(),
      fallbackRow: z.string(),
      seeReleases: z.string(),
      allSystems: z.string(),
      hideTip: z.string(),
      rowLink: z.string(),
      rowsWord: z.string(),
      versionPrefix: z.string(),
      releasedWord: z.string(),
      // The download page's primary button, before the OS name (spec 0005, AC-2).
      detectedPrefix: z.string().min(1),
      // Home's status bar link to the download page (spec 0005, AC-19).
      pageLink: z.string().min(1),
    }),
    install: z.object({
      heading: z.string(),
      note: z.string(),
      unixLabel: z.string(),
      windowsLabel: z.string(),
      linuxNote: z.string(),
      copy: z.string(),
      copied: z.string(),
      copyFailed: z.string(),
    }),
    // The engines schema diagram (spec 0003, AC-17, AC-24). The caps keep every
    // diagram row on one line; one icon per engine names its hub row and anchors.
    engines: z.object({
      heading: z.string(),
      hub: z.string().min(1).max(16),
      rows: z
        .array(
          z.object({
            name: z.string(),
            icon: z.enum(ENGINE_ICONS),
            what: z.string(),
            fields: z
              .array(z.object({ name: z.string().min(1).max(16), type: z.string().min(1).max(12) }))
              .min(2)
              .max(3),
          }),
        )
        .min(1)
        .max(8)
        .refine((rows) => new Set(rows.map((row) => row.icon)).size === rows.length, {
          message: 'Each engine needs its own icon, because the icon key names its hub row.',
        }),
    }),
    // `moreLink` starts each panel's link to its features page section (spec 0008, AC-8).
    features: z.object({ heading: z.string(), moreLink: z.string().min(1) }),
    questions: z.object({ heading: z.string() }),
    closing: z.object({ comment: z.string() }),
  }),
});

// The download page (spec 0005, Data model sketch). One entry, id `download`.
// A missing or empty field fails the build and names it (AC-23).
const text = z.string().min(1);

const download = defineCollection({
  loader: file('src/content/download/download.yaml'),
  schema: z.object({
    meta: z.object({ title: text, description: text }),
    heading: text,
    skipNote: text,
    hashMissing: text,
    copyHash: text,
    /** `{file}` is replaced by the file name. */
    copyHashLabel: text.includes('{file}'),
    launch: z.object({ heading: text, note: text }),
    links: z.object({ releaseNotes: text, olderVersions: text }),
  }),
});

// The not found page (spec 0006, Data model sketch). One entry, id `notFound`.
// A missing or empty field fails the build and names it (AC-7).
const notFound = defineCollection({
  loader: file('src/content/not-found/not-found.yaml'),
  schema: z.object({
    meta: z.object({ title: text, description: text }),
    headline: text,
    subline: text,
    editor: z.object({
      tab: text,
      table: text,
      fallbackPath: text,
      columns: z.tuple([text, text]),
      empty: text,
      running: text,
      rows: text,
      code: text,
    }),
    buttons: z.object({ home: text, download: text }),
  }),
});

// The privacy notice (spec 0007, Data model sketch). One Markdown entry, id
// `privacy`: the body is the notice, the frontmatter holds the facts most likely
// to drift. A missing or invalid field fails the build and names it (AC-3).
const PLACEHOLDER_DOMAINS = ['example.com', 'example.org', 'example.net'];

const privacy = defineCollection({
  loader: glob({ pattern: 'privacy.md', base: './src/content/privacy' }),
  schema: z.object({
    meta: z.object({ title: text, description: text }),
    /** Set by hand when the meaning changes, not on every edit. */
    updated: z.coerce.date(),
    /** The app version the facts were checked against. */
    appVersion: z.string().regex(/^\d+\.\d+\.\d+$/, 'appVersion must look like 0.5.6'),
    operator: text,
    contact: z.email().refine((email) => !PLACEHOLDER_DOMAINS.includes(email.split('@')[1]?.toLowerCase() ?? ''), {
      message: 'contact is a placeholder address; set the real privacy contact',
    }),
    files: z.array(z.object({ name: text, holds: text, encrypted: z.boolean() })).min(1),
  }),
});

// The features page copy (spec 0008, AC-11). One entry, id `featuresPage`.
// A missing or empty field fails the build and names it.
const featuresPage = defineCollection({
  loader: file('src/content/features-page/features-page.yaml'),
  schema: z.object({
    title: text,
    description: text,
    tab: text,
    comment: text,
    lead: text,
    caption: text,
    levels: z.object({ full: text, partial: text, none: text }),
    worksWith: text,
    lineNotes: z.object({ partial: text, none: text }),
    capabilitiesHeading: text,
    indexLabel: text,
    statusRows: text,
    statusEngines: text,
  }),
});

const launchTips = defineCollection({
  loader: file('src/content/home/launch-tips.yaml'),
  schema: z.object({
    title: z.string(),
    steps: z.array(z.string()).min(1),
    command: z.string().optional(),
  }),
});

// The feature browser (spec 0003, AC-18 to AC-20). One Markdown file per
// feature; the body is the benefit text. A missing screenshot is allowed here
// and caught by the page, which fails a production build (AC-20).

/** The popup cards drawn over screenshots, one component each in components/home/cards/. */
export const CARD_KINDS = [
  'filter',
  'review',
  'rowMenu',
  'autocomplete',
  'queryResult',
  'column',
  'relation',
  'findTable',
  'join',
  'cardOutput',
  'shortcut',
  'compare',
  'connectionFields',
  'connectionTest',
  'keychain',
  'pipelineStage',
  'shellResult',
] as const;

const card = z.object({ kind: z.enum(CARD_KINDS), x: z.string(), y: z.string(), width: z.string() });

const features = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/features' }),
  schema: ({ image }) =>
    z.object({
      order: z.number().int(),
      title: z.string(),
      /** The short name in the sidebar. */
      tab: z.string(),
      image: image().optional(),
      /** The same capture in the app's light theme, shown when the site is light. */
      imageLight: image().optional(),
      alt: z.string(),
      /** Up to three cards; x, y and width are percentages of the screenshot, for example '54%'. */
      cards: z.array(card).max(3).optional(),
      // The features page (spec 0008, AC-5, AC-10). The exact engine key set is a
      // cross collection rule (home.yaml), so supportProblem checks it in the page.
      /** One cell per `home.yaml` engine icon. */
      engines: z.record(
        z.string(),
        z.object({ level: z.enum(SUPPORT_LEVELS), note: z.string().min(1).max(NOTE_MAX).optional() }),
      ),
      /** What you can do, 2 to 6 items. */
      capabilities: z.array(z.object({ title: z.string().min(1).max(40), text: z.string().min(1).max(140) })).min(2).max(6),
      /** The one card over the screenshot on the features page. */
      pageCard: card.optional(),
      /** Whether Home's feature browser lists it (spec 0008, AC-14). The features page lists every entry. */
      home: z.boolean().default(false),
    })
    // Home cards on a page only entry would never render (AC-10).
    .refine((entry) => entry.home || entry.cards === undefined, {
      message: '`cards` are Home cards, and this entry is not on Home (`home: true`). Use `pageCard` for the features page.',
      path: ['cards'],
    }),
});

// The questions table (spec 0003, AC-21). One Markdown file per question; the
// body is the answer as plain text, a blank line between paragraphs.
const faq = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/faq' }),
  schema: z.object({
    order: z.number().int(),
    question: z.string(),
    /** A site page that says more, shown after the answer (spec 0007, AC-12). */
    link: z.object({ label: text, href: z.string().startsWith('/') }).optional(),
  }),
});

// Every listed GitHub release (spec 0005, Data model sketch), refilled from
// GitHub on every build. The notes are each entry's rendered HTML.
const releases = defineCollection({
  loader: releasesLoader({ fetch: globalThis.fetch, token: GITHUB_TOKEN, strict: VERCEL_ENV === 'production' }),
  schema: z.object({
    version: z.string(),
    tag: z.string(),
    publishedAt: z.iso.datetime(),
    prerelease: z.boolean(),
    pageUrl: z.url(),
  }),
});

const perFilter = { all: z.string().min(1), stable: z.string().min(1), prereleases: z.string().min(1) };
const queryLines = z.array(z.string().min(1)).min(1);

// Changelog copy (spec 0005, AC-17). A missing field fails the build and names it.
const changelog = defineCollection({
  loader: file('src/content/changelog/changelog.yaml'),
  schema: z.object({
    heading: z.string().min(1),
    titles: z.object({ ...perFilter, page: z.string().includes('{page}'), version: z.string().includes('{version}') }),
    descriptions: z.object({
      ...perFilter,
      page: z.string().includes('{page}'),
      version: z.string().includes('{version}'),
    }),
    editor: z.object({
      tab: z.string().min(1),
      rowsWord: z.string().min(1),
      queries: z.object({ all: queryLines, stable: queryLines, prereleases: queryLines }),
    }),
    filter: z.object({ ...perFilter, label: z.string().min(1) }),
    pages: z.object({
      label: z.string().min(1),
      newer: z.string().min(1),
      older: z.string().min(1),
      position: z.string().includes('{page}'),
    }),
    entry: z.object({
      latest: z.string().min(1),
      prerelease: z.string().min(1),
      github: z.string().min(1),
      emptyNotes: z.string().min(1),
    }),
    index: z.object({ label: z.string().min(1) }),
    release: z.object({
      heading: z.string().includes('{version}'),
      notesHeading: z.string().min(1),
      allReleases: z.string().min(1),
    }),
    subscribe: z.string().min(1),
    everyRelease: z.string().min(1),
    everyReleaseLink: z.string().min(1),
    unavailable: z.string().min(1),
    unavailableLink: z.string().min(1),
  }),
});

// The docs guides (spec 0009, Data model sketch). One Markdown file per guide in
// `src/content/docs/<group>/<slug>.md`; the id is that path, so the group, the URL
// and the breadcrumb all come from it. Rules that span guides or collections
// (groups, order, one install guide per system, markers) live in lib/docs/rules.ts.
const semver = z.string().regex(/^\d+\.\d+\.\d+$/, 'appVersion must look like 0.5.6');

const docs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
  schema: z.object({
    /** The h1; the <title> adds ` · DH Studio`. */
    title: text,
    description: z.string().min(50).max(160),
    sidebarLabel: z.string().min(1).max(28),
    /** Position in its group, unique within it. */
    order: z.number().int(),
    /** The app version every fact was checked against (AC-10). */
    appVersion: semver,
    /** Set by hand when the meaning changes, not on every edit. */
    updated: z.coerce.date(),
    /** Install guides only, one per system. */
    os: z.enum(['macos', 'windows', 'linux']).optional(),
    /** Install guides only. */
    requirements: z.array(z.object({ label: text, value: text })).min(1).max(6).optional(),
    /** Connect guides only; needs a `{screenshot}` line. */
    screenshot: z.boolean().default(false),
    screenshotAlt: text.optional(),
  }),
});

const DOCS_GROUP_KEYS = ['install', 'connect', 'app'] as const;
const docsPath = z.string().startsWith('/docs/');

// The /docs/ page copy, the groups and the shared docs copy (spec 0009). One entry, id `docsIndex`.
const docsIndex = defineCollection({
  loader: file('src/content/docs-index/docs-index.yaml'),
  schema: z.object({
    meta: z.object({ title: text, description: text }),
    opener: z.object({ tab: text, comment: text, query: z.array(text).min(1) }),
    gettingStarted: z
      .array(z.object({ title: text, text, links: z.array(z.object({ label: text, href: docsPath })).min(1) }))
      .length(3),
    groups: z
      .array(z.object({ key: z.enum(DOCS_GROUP_KEYS), label: text, description: text, order: z.number().int() }))
      .min(1)
      .refine((groups) => new Set(groups.map((group) => group.key)).size === groups.length, {
        message: 'Each group key appears once.',
      }),
    search: z.object({
      label: text,
      placeholder: text,
      loading: text,
      /** `{n}` is replaced by the number of guides found. */
      found: text.includes('{n}'),
      empty: text,
      devUnavailable: text,
      unavailable: text,
    }),
    page: z.object({
      docsCrumb: text,
      onThisPage: text,
      previous: text,
      next: text,
      checkedAgainst: text,
      updated: text,
      menu: text,
      /** `{os}` is replaced by the system's name. */
      fullGuideFor: text.includes('{os}'),
      canChange: text,
    }),
  }),
});

// The keyboard shortcuts table (spec 0009, AC-9). One entry, id `shortcuts`.
const keys = z.array(text).min(1).max(4);

const shortcuts = defineCollection({
  loader: file('src/content/docs-data/shortcuts.yaml'),
  schema: z.object({
    appVersion: semver,
    rows: z
      .array(z.object({ area: text, action: text, mac: keys, other: keys, remappable: z.boolean() }))
      .min(1)
      .refine((rows) => new Set(rows.map((row) => row.action)).size === rows.length, {
        message: 'Each action appears once.',
      }),
  }),
});

export const collections = {
  home,
  download,
  notFound,
  privacy,
  launchTips,
  features,
  featuresPage,
  faq,
  releases,
  changelog,
  docs,
  docsIndex,
  shortcuts,
};
