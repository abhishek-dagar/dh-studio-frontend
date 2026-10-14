// The WCAG pairs every theme must pass (spec 0002, Contrast pairs).
// Add a pair here whenever a new color role is added to tokens.css.

export type Theme = 'dark' | 'light';

export interface ContrastPair {
  readonly fg: string;
  readonly bg: string;
  readonly min: number;
  readonly themes: readonly Theme[];
}

const BOTH: readonly Theme[] = ['dark', 'light'];
const PLANES = ['ground', 'surface', 'raised', 'floating'] as const;
const SYNTAX = ['fg', 'keyword', 'string', 'number', 'function', 'comment', 'punctuation'] as const;

const onEachPlane = (fg: string, min: number): readonly ContrastPair[] =>
  PLANES.map((bg) => ({ fg, bg, min, themes: BOTH }));

export const CONTRAST_PAIRS: readonly ContrastPair[] = [
  ...onEachPlane('fg', 4.5),
  ...onEachPlane('fg-muted', 4.5),
  { fg: 'action-fg', bg: 'action', min: 4.5, themes: BOTH },
  { fg: 'action-fg', bg: 'action-hover', min: 4.5, themes: BOTH },
  ...onEachPlane('focus', 3),
  ...onEachPlane('line-strong', 3),
  { fg: 'action-edge', bg: 'ground', min: 3, themes: ['light'] },
  // Relation lines and the selected table outline in a diagram (spec 0003, AC-25).
  { fg: 'action', bg: 'ground', min: 3, themes: BOTH },
  { fg: 'action', bg: 'surface', min: 3, themes: BOTH },
  { fg: 'signal', bg: 'signal-tint', min: 4.5, themes: BOTH },
  { fg: 'signal', bg: 'surface', min: 4.5, themes: BOTH },
  ...SYNTAX.map((name) => ({ fg: `syntax-${name}`, bg: 'surface', min: 4.5, themes: BOTH })),
];
