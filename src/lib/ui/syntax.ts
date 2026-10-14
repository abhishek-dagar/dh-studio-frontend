// Code token colors for code drawn in HTML (spec 0002, editor language). Tok.astro
// and the islands share these classes, so a keyword looks the same in both.
// Each maps to a --syntax-* role, which swaps with the theme.

export type SyntaxKind = 'keyword' | 'string' | 'number' | 'function' | 'comment' | 'punctuation' | 'ident';

const SYNTAX_CLASS: Readonly<Record<SyntaxKind, string>> = {
  keyword: 'text-syntax-keyword',
  string: 'text-syntax-string',
  number: 'text-syntax-number',
  function: 'text-syntax-function',
  comment: 'text-syntax-comment',
  punctuation: 'text-syntax-punctuation',
  ident: 'text-syntax-fg',
};

export const syntaxClass = (kind: SyntaxKind): string => SYNTAX_CLASS[kind];
