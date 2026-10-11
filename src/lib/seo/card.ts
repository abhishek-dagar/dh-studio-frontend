import type { ReleaseResult } from '../release/types';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_NAME } from './config';

// The social card (spec 0004, AC-3, AC-4, AC-13): the Home editor look drawn as
// a plain object tree that satori renders. Kept in .ts, not .tsx, because .tsx
// is for islands. satori supports flexbox only, so every box is display flex.

/** Length caps the content schema enforces, so the card text always fits the frame. */
export const CARD_LIMITS = { comment: 56, query: 56, row: 40, alt: 160 } as const;

export type CardCopy = {
  readonly comment: string;
  readonly query: string;
  readonly row: string;
  readonly alt: string;
};

export type CardModel = {
  readonly comment: string;
  readonly query: string;
  readonly row: string;
  /** `Version 0.5.5` when the release is live, null on fallback. */
  readonly versionLabel: string | null;
};

export const cardModel = (copy: CardCopy, versionPrefix: string, release: ReleaseResult): CardModel => ({
  comment: copy.comment,
  query: copy.query,
  row: copy.row,
  versionLabel: release.status === 'live' ? `${versionPrefix} ${release.release.version}` : null,
});

// Dark theme values copied from src/styles/tokens.css (the [data-theme='dark']
// roles). A palette change there has to touch this table too.
export const CARD_COLORS = {
  ground: '#101214', // --ground
  surface: '#161719', // --surface
  raised: '#1a1c1f', // --raised
  line: '#2a2b2e', // --line
  fg: '#e9ebef', // --fg
  muted: '#a9abaf', // --fg-muted
  action: '#f97770', // --action, the red accent
  signal: '#68d7a1', // --signal
  keyword: '#e8a3bc', // --syntax-keyword
  string: '#a9d49a', // --syntax-string
  number: '#d2b2f2', // --syntax-number
  punctuation: '#c2c4c8', // --syntax-punctuation
} as const;

export const CARD_FONTS = { sans: 'Mona Sans', mono: 'Geist Mono' } as const;

// A small SQL highlighter for the one query line.

export type SqlTokenKind = 'keyword' | 'string' | 'number' | 'punctuation' | 'ident';

export type SqlToken = { readonly text: string; readonly kind: SqlTokenKind };

const SQL_KEYWORDS: ReadonlySet<string> = new Set([
  'select', 'from', 'where', 'and', 'or', 'not', 'in', 'is', 'null', 'as', 'on', 'join', 'left', 'inner',
  'order', 'group', 'by', 'limit', 'having', 'distinct', 'insert', 'into', 'values', 'update', 'set',
  'delete', 'create', 'table', 'with', 'true', 'false', 'asc', 'desc',
]);

// Each token keeps its trailing spaces, so the line renders with its spacing.
const SQL_TOKEN = /('[^']*'?|\d+(?:\.\d+)?|[A-Za-z_]\w*|[^\sA-Za-z_\d'])(\s*)/g;

const tokenKind = (text: string): SqlTokenKind => {
  if (text.startsWith("'")) return 'string';
  if (/^\d/.test(text)) return 'number';
  if (/^[A-Za-z_]/.test(text)) return SQL_KEYWORDS.has(text.toLowerCase()) ? 'keyword' : 'ident';
  return 'punctuation';
};

export const sqlTokens = (line: string): readonly SqlToken[] =>
  Array.from(line.trim().matchAll(SQL_TOKEN), ([, word = '', space = '']) => ({ text: word + space, kind: tokenKind(word) }));

// The element tree. Nodes carry `key: null` so they match React's element shape
// that satori accepts, without React itself.

export type CardStyle = Readonly<Record<string, string | number>>;

export type CardNode = {
  readonly type: 'div';
  readonly key: null;
  readonly props: { readonly style: CardStyle; readonly children?: string | readonly CardNode[] };
};

const box = (style: CardStyle, children?: string | readonly CardNode[]): CardNode => ({
  type: 'div',
  key: null,
  props: children === undefined ? { style: { display: 'flex', ...style } } : { style: { display: 'flex', ...style }, children },
});

const TOKEN_COLOR: Readonly<Record<SqlTokenKind, string>> = {
  keyword: CARD_COLORS.keyword,
  string: CARD_COLORS.string,
  number: CARD_COLORS.number,
  punctuation: CARD_COLORS.punctuation,
  ident: CARD_COLORS.fg,
};

const PAD = 44;
const ACCENT = 4;
const GUTTER = 56;
const mono = { fontFamily: CARD_FONTS.mono, fontWeight: 400 } as const;

/** One numbered editor line: the number in a fixed gutter, the content beside it. */
const editorLine = (n: number, content: CardNode, numberTop = 0): CardNode =>
  box({ alignItems: 'flex-start' }, [
    box({ ...mono, width: GUTTER, paddingTop: numberTop, fontSize: 22, color: CARD_COLORS.line, justifyContent: 'flex-end', paddingRight: 24 }, String(n)),
    content,
  ]);

const commentLine = (comment: string): CardNode =>
  box({ alignItems: 'flex-start', flex: 1, minWidth: 0 }, [
    box({ ...mono, fontSize: 52, lineHeight: 1.12, color: CARD_COLORS.muted, letterSpacing: -9, marginRight: 22 }, '--'),
    box({ fontFamily: CARD_FONTS.sans, fontWeight: 600, fontSize: 56, lineHeight: 1.08, letterSpacing: -1.5, color: CARD_COLORS.fg, flex: 1, minWidth: 0 }, comment),
  ]);

const queryLine = (query: string): CardNode =>
  box(
    { ...mono, fontSize: 28, whiteSpace: 'pre' },
    sqlTokens(query).map((token) => box({ color: TOKEN_COLOR[token.kind] }, token.text)),
  );

const resultRow = (row: string): CardNode =>
  box({ flexDirection: 'column', flex: 1, minWidth: 0 }, [
    box({ ...mono, fontSize: 18, color: CARD_COLORS.muted, paddingLeft: 24, paddingBottom: 10 }, '1 row'),
    box({ alignItems: 'center', backgroundColor: CARD_COLORS.raised, border: `1px solid ${CARD_COLORS.line}`, borderRadius: 10, height: 64, overflow: 'hidden' }, [
      box({ width: 4, height: 64, backgroundColor: CARD_COLORS.action }),
      box({ ...mono, fontWeight: 500, fontSize: 28, color: CARD_COLORS.fg, paddingLeft: 20 }, row),
    ]),
  ]);

const dot = (color: string): CardNode => box({ width: 14, height: 14, borderRadius: 7, backgroundColor: color });

const statusBar = (versionLabel: string | null): CardNode =>
  box(
    { alignItems: 'center', justifyContent: 'space-between', height: 60, padding: '0 28px', borderTop: `1px solid ${CARD_COLORS.line}` },
    [
      box({ fontFamily: CARD_FONTS.sans, fontWeight: 600, fontSize: 24, color: CARD_COLORS.fg }, SITE_NAME),
      ...(versionLabel === null
        ? []
        : [box({ alignItems: 'center', gap: 12 }, [dot(CARD_COLORS.signal), box({ ...mono, fontWeight: 500, fontSize: 22, color: CARD_COLORS.muted }, versionLabel)])]),
    ],
  );

export const cardTree = (model: CardModel): CardNode =>
  box(
    { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, padding: PAD, backgroundColor: CARD_COLORS.ground, borderTop: `${ACCENT}px solid ${CARD_COLORS.action}` },
    [
      // A fixed size window, so long content can never push it past the frame.
      box(
        {
          flexDirection: 'column',
          width: OG_IMAGE_WIDTH - 2 * PAD,
          height: OG_IMAGE_HEIGHT - 2 * PAD - ACCENT,
          backgroundColor: CARD_COLORS.surface, border: `1px solid ${CARD_COLORS.line}`, borderRadius: 18, overflow: 'hidden' },
        [
          box({ alignItems: 'center', gap: 10, height: 48, padding: '0 22px', borderBottom: `1px solid ${CARD_COLORS.line}` }, [
            dot(CARD_COLORS.line),
            dot(CARD_COLORS.line),
            dot(CARD_COLORS.line),
          ]),
          box({ flexDirection: 'column', flex: 1, minHeight: 0, justifyContent: 'center', gap: 26, padding: '24px 40px 24px 16px' }, [
            editorLine(1, commentLine(model.comment), 18),
            editorLine(2, queryLine(model.query), 4),
            editorLine(3, resultRow(model.row), 44),
          ]),
          statusBar(model.versionLabel),
        ],
      ),
    ],
  );
