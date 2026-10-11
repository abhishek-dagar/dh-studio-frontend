import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { ENGINE_ICONS } from './lib/home/engines';
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
    features: z.object({ heading: z.string() }),
    questions: z.object({ heading: z.string() }),
    closing: z.object({ comment: z.string() }),
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
] as const;

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
      cards: z
        .array(z.object({ kind: z.enum(CARD_KINDS), x: z.string(), y: z.string(), width: z.string() }))
        .max(3)
        .optional(),
    }),
});

// The questions table (spec 0003, AC-21). One Markdown file per question; the
// body is the answer as plain text, a blank line between paragraphs.
const faq = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/faq' }),
  schema: z.object({
    order: z.number().int(),
    question: z.string(),
  }),
});

export const collections = { home, launchTips, features, faq };
