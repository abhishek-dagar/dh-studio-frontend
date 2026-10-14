import { wcagContrast } from 'culori';
import type { ContrastPair, Theme } from './contrast-pairs';

// Pure helpers behind the contrast test (spec 0002, AC-3). They read the
// token CSS as text, so no browser is needed.

export type TokenBlock = Readonly<Record<string, string>>;

export interface TokenSet {
  readonly primitives: TokenBlock;
  readonly themes: Readonly<Record<Theme, TokenBlock>>;
}

export type Resolved = { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string };

export interface PairResult {
  readonly theme: Theme;
  readonly pair: ContrastPair;
  readonly ratio: number | null;
  readonly error?: string;
}

const stripComments = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, '');

const blockBody = (css: string, selector: string): string => {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) return '';
  const open = css.indexOf('{', start);
  const close = css.indexOf('}', open);
  return css.slice(open + 1, close);
};

const declarations = (body: string): TokenBlock =>
  Object.fromEntries(
    [...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()]),
  );

/** Reads the primitive block (`:root`) and both role blocks from tokens.css. */
export const parseTokens = (css: string): TokenSet => {
  const clean = stripComments(css);
  return {
    primitives: declarations(blockBody(clean, ':root')),
    themes: {
      dark: declarations(blockBody(clean, ":root[data-theme='dark']")),
      light: declarations(blockBody(clean, ":root[data-theme='light']")),
    },
  };
};

/** Resolves a role to a literal color, following one `var(--primitive)` reference. */
export const resolveRole = (tokens: TokenSet, theme: Theme, role: string): Resolved => {
  const raw = tokens.themes[theme][`--${role}`];
  if (raw === undefined) return { ok: false, error: `--${role} is missing from the ${theme} theme` };
  const ref = /^var\((--[\w-]+)\)$/.exec(raw);
  if (ref === null) return { ok: true, value: raw };
  const primitive = tokens.primitives[ref[1]];
  return primitive === undefined
    ? { ok: false, error: `--${role} (${theme}) points at undefined ${ref[1]}` }
    : { ok: true, value: primitive };
};

export const contrastRatio = (fg: string, bg: string): number => wcagContrast(fg, bg);

/** Measures every pair in every theme it applies to. */
export const checkPairs = (tokens: TokenSet, pairs: readonly ContrastPair[]): readonly PairResult[] =>
  pairs.flatMap((pair) =>
    pair.themes.map((theme): PairResult => {
      const fg = resolveRole(tokens, theme, pair.fg);
      const bg = resolveRole(tokens, theme, pair.bg);
      if (!fg.ok) return { theme, pair, ratio: null, error: fg.error };
      if (!bg.ok) return { theme, pair, ratio: null, error: bg.error };
      return { theme, pair, ratio: contrastRatio(fg.value, bg.value) };
    }),
  );

export const isPassing = (result: PairResult): boolean => result.ratio !== null && result.ratio >= result.pair.min;

export const describe = (result: PairResult): string =>
  result.ratio === null
    ? `${result.theme}: --${result.pair.fg} on --${result.pair.bg}: ${result.error ?? 'unresolved'}`
    : `${result.theme}: --${result.pair.fg} on --${result.pair.bg} is ${result.ratio.toFixed(2)}, needs ${result.pair.min}`;

/** Roles defined in one theme block but not the other. */
export const missingRoles = (tokens: TokenSet): readonly string[] => {
  const dark = Object.keys(tokens.themes.dark);
  const light = Object.keys(tokens.themes.light);
  return [
    ...dark.filter((name) => !light.includes(name)).map((name) => `${name} is missing from light`),
    ...light.filter((name) => !dark.includes(name)).map((name) => `${name} is missing from dark`),
  ];
};
