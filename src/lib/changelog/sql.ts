import type { SyntaxKind } from '../ui/syntax';

// Colors the changelog's editor query (spec 0005, AC-8). The query is fixed copy
// from changelog.yaml, so a few SQL words cover it; anything else is plain text.

export type SqlToken = { readonly text: string; readonly kind: SyntaxKind | null };

const KEYWORDS: ReadonlySet<string> = new Set([
  'select',
  'from',
  'where',
  'and',
  'or',
  'not',
  'order',
  'by',
  'asc',
  'desc',
  'limit',
  'as',
  'is',
  'null',
]);

const CONSTANTS: ReadonlySet<string> = new Set(['true', 'false']);

const TOKEN = /\s+|'[^']*'?|\d+(?:\.\d+)?|[A-Za-z_][A-Za-z0-9_]*|./g;

const kindOf = (text: string): SyntaxKind | null => {
  if (/^\s/.test(text)) return null;
  if (text.startsWith("'")) return 'string';
  if (/^\d/.test(text)) return 'number';
  const word = text.toLowerCase();
  if (KEYWORDS.has(word)) return 'keyword';
  if (CONSTANTS.has(word)) return 'number';
  if (/^[A-Za-z_]/.test(text)) return 'ident';
  return 'punctuation';
};

export const sqlTokens = (line: string): readonly SqlToken[] =>
  (line.match(TOKEN) ?? []).map((text) => ({ text, kind: kindOf(text) }));
