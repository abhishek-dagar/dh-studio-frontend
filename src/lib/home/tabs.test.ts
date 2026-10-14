import { describe, expect, it } from 'vitest';
import { initialTabIndex, nextTabIndex } from './tabs';

describe('nextTabIndex', () => {
  it.each([
    ['ArrowDown', 0, 1],
    ['ArrowDown', 7, 0],
    ['ArrowUp', 3, 2],
    ['ArrowUp', 0, 7],
    ['Home', 5, 0],
    ['End', 2, 7],
  ])('%s from %i goes to %i of 8', (key, current, expected) => {
    expect(nextTabIndex(key, current, 8)).toBe(expected);
  });

  it('ignores other keys', () => {
    expect(nextTabIndex('ArrowRight', 2, 8)).toBeUndefined();
    expect(nextTabIndex('a', 2, 8)).toBeUndefined();
  });

  it('ignores an empty list', () => {
    expect(nextTabIndex('ArrowDown', 0, 0)).toBeUndefined();
  });
});

describe('initialTabIndex', () => {
  const ids = ['feature-grid', 'feature-editor', 'feature-palette'];

  it('selects the panel the hash names', () => {
    expect(initialTabIndex(ids, '#feature-palette')).toBe(2);
  });

  it('falls back to the first tab', () => {
    expect(initialTabIndex(ids, '')).toBe(0);
    expect(initialTabIndex(ids, '#features')).toBe(0);
  });
});
