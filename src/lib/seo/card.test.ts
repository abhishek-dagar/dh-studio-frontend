import { describe, expect, it } from 'vitest';
import { v055Live } from '../release/v0.5.5.fixture';
import { cardModel, cardTree, sqlTokens, type CardNode } from './card';
import { fallback } from './seo.fixture';

const copy = { comment: 'Every database, on one quiet desk.', query: "select a from t where b = 'c';", row: 'one row', alt: 'Card' };

const texts = (node: CardNode): readonly string[] => {
  const { children } = node.props;
  if (children === undefined) return [];
  return typeof children === 'string' ? [children] : children.flatMap(texts);
};

describe('cardModel', () => {
  it('shows the prefixed version when live', () => {
    expect(cardModel(copy, 'Version', v055Live)).toEqual({
      comment: copy.comment,
      query: copy.query,
      row: copy.row,
      versionLabel: 'Version 0.5.5',
    });
  });

  it('has no version on fallback', () => {
    expect(cardModel(copy, 'Version', fallback).versionLabel).toBeNull();
  });
});

describe('cardTree', () => {
  it('draws the comment, the query, the row and the version', () => {
    const words = texts(cardTree(cardModel(copy, 'Version', v055Live))).join('');
    expect(words).toContain(copy.comment);
    expect(words).toContain(copy.query);
    expect(words).toContain(copy.row);
    expect(words).toContain('Version 0.5.5');
  });

  it('draws no version text on fallback', () => {
    expect(texts(cardTree(cardModel(copy, 'Version', fallback))).join('')).not.toContain('Version');
  });
});

describe('sqlTokens', () => {
  it('colors keywords, strings and punctuation and keeps the spacing', () => {
    const tokens = sqlTokens("select a from t where b = 'c';");
    expect(tokens.map((token) => token.text).join('')).toBe("select a from t where b = 'c';");
    expect(tokens.filter((token) => token.kind === 'keyword').map((token) => token.text.trim())).toEqual(['select', 'from', 'where']);
    expect(tokens.find((token) => token.kind === 'string')?.text).toBe("'c'");
  });
});
