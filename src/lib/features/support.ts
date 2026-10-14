import { featureSlug } from './slug';

// Engine support for the features page (spec 0008, AC-3, AC-10). Pure: the page
// reads the collections, builds the matrix here, and throws on a problem message.

export const SUPPORT_LEVELS = ['full', 'partial', 'none'] as const;

export type SupportLevel = (typeof SUPPORT_LEVELS)[number];

/** A note under a cell stays short enough to sit under the level word. */
export const NOTE_MAX = 32;

/** The icon each level draws next to its word (lucide names). The word always shows too. */
export const LEVEL_ICONS: Readonly<Record<SupportLevel, 'check' | 'contrast' | 'minus'>> = {
  full: 'check',
  partial: 'contrast',
  none: 'minus',
};

export interface EngineSupport {
  readonly level: SupportLevel;
  readonly note?: string | undefined;
}

/** Shaped like a `features` collection entry, so pages pass entries straight in. */
export interface SupportEntryLike {
  readonly id: string;
  readonly data: { readonly tab: string; readonly engines: Readonly<Record<string, EngineSupport>> };
}

/** Shaped like a `home.yaml` `engines.rows` entry. */
export interface EngineRowLike {
  readonly name: string;
  readonly icon: string;
}

export interface SupportCell {
  readonly key: string;
  readonly level: SupportLevel;
  readonly note?: string | undefined;
}

export interface SupportMatrix {
  readonly columns: readonly { readonly key: string; readonly name: string }[];
  readonly rows: readonly { readonly slug: string; readonly tab: string; readonly cells: readonly SupportCell[] }[];
}

/**
 * One row per entry (in the order given) and one column per engine row (in
 * `home.yaml` order). Run `supportProblem` first: a missing key here falls back
 * to `none`, which the problem check never lets reach a build.
 */
export const supportMatrix = (entries: readonly SupportEntryLike[], engines: readonly EngineRowLike[]): SupportMatrix => ({
  columns: engines.map(({ icon, name }) => ({ key: icon, name })),
  rows: entries.map((entry) => ({
    slug: featureSlug(entry.id),
    tab: entry.data.tab,
    cells: engines.map(({ icon }) => {
      const support = entry.data.engines[icon];
      return { key: icon, level: support?.level ?? 'none', note: support?.note };
    }),
  })),
});

/**
 * Why the matrix can't be built, or undefined when it can: an engine icon used
 * twice, or an entry whose `engines` keys are not exactly the engine icons. One
 * message names every entry and key, so a fifth engine shows all the gaps at once.
 */
export const supportProblem = (entries: readonly SupportEntryLike[], engines: readonly EngineRowLike[]): string | undefined => {
  const icons = engines.map((engine) => engine.icon);
  const repeated = icons.filter((icon, index) => icons.indexOf(icon) !== index);
  if (repeated.length > 0) {
    return `[features] Each engine in src/content/home/home.yaml needs its own icon. Used more than once: ${[...new Set(repeated)].join(', ')}.`;
  }

  const gaps = entries.flatMap((entry) => {
    const keys = Object.keys(entry.data.engines);
    const missing = icons.filter((icon) => !keys.includes(icon));
    const extra = keys.filter((key) => !icons.includes(key));
    return [
      ...(missing.length > 0 ? [`${entry.id} is missing engines.${missing.join(', engines.')}`] : []),
      ...(extra.length > 0 ? [`${entry.id} has unknown engines.${extra.join(', engines.')}`] : []),
    ];
  });
  if (gaps.length === 0) return undefined;
  return `[features] Every feature must state its support for each engine in home.yaml (${icons.join(', ')}). ${gaps.join('; ')}.`;
};
