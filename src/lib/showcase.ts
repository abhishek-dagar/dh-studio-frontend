import { checkPairs, parseTokens, resolveRole, type TokenSet } from './contrast';
import { CONTRAST_PAIRS, type ContrastPair, type Theme } from './contrast-pairs';

// Pure readers behind the design system showcase page (scope feature #5).
// They take the token CSS as text, so every value the page prints comes from
// the real stylesheets and can never drift from them.

export type Declarations = Readonly<Record<string, string>>;

export interface RoleRow {
  readonly role: string;
  readonly use: string;
  readonly dark: string;
  readonly light: string;
}

export interface TokenRow {
  readonly name: string;
  readonly value: string;
}

export interface ContrastRow {
  readonly pair: ContrastPair;
  readonly dark: number | null;
  readonly light: number | null;
  readonly passes: boolean;
}

export interface ShowcaseTokens {
  readonly tokens: TokenSet;
  readonly theme: Declarations;
}

const MISSING = 'not set';

const stripComments = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, '');

/** Every custom property declared in a CSS file. A later declaration wins. */
export const readDeclarations = (css: string): Declarations =>
  Object.fromEntries(
    [...stripComments(css).matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)].map(([, name, value]) => [name, value.trim()]),
  );

/** Reads tokens.css (primitives and both role blocks) and theme.css (type, radius, easing). */
export const readShowcaseTokens = (tokensCss: string, themeCss: string): ShowcaseTokens => ({
  tokens: parseTokens(tokensCss),
  theme: readDeclarations(themeCss),
});

export const valueOf = (declarations: Declarations, name: string): string => declarations[name] ?? MISSING;

const resolved = (tokens: TokenSet, theme: Theme, role: string): string => {
  const result = resolveRole(tokens, theme, role);
  return result.ok ? result.value : MISSING;
};

/** A role's literal value in each theme, following its primitive reference. */
export const roleRows = (
  tokens: TokenSet,
  roles: readonly { readonly role: string; readonly use: string }[],
): readonly RoleRow[] =>
  roles.map(({ role, use }) => ({
    role,
    use,
    dark: resolved(tokens, 'dark', role),
    light: resolved(tokens, 'light', role),
  }));

/** Primitives that share a scale prefix, in the order tokens.css declares them. */
export const primitiveScale = (tokens: TokenSet, prefix: string): readonly TokenRow[] =>
  Object.entries(tokens.primitives)
    .filter(([name]) => name.startsWith(`--${prefix}-`))
    .map(([name, value]) => ({ name, value }));

/** Every contrast pair the test asserts, measured in each theme it applies to. */
export const contrastRows = (tokens: TokenSet): readonly ContrastRow[] =>
  CONTRAST_PAIRS.map((pair) => {
    const results = checkPairs(tokens, [pair]);
    const ratioIn = (theme: Theme): number | null => results.find((result) => result.theme === theme)?.ratio ?? null;
    return {
      pair,
      dark: ratioIn('dark'),
      light: ratioIn('light'),
      passes: results.every((result) => result.ratio !== null && result.ratio >= pair.min),
    };
  });

export const formatRatio = (ratio: number | null): string => (ratio === null ? 'n/a' : `${ratio.toFixed(2)}:1`);
