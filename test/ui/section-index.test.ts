import { describe, expect, it } from 'vitest';
import { activeAnchor } from '../../src/lib/ui/section-index';

describe('activeAnchor', () => {
  const tops = [
    { anchor: 'table-grid', top: -400 },
    { anchor: 'sql-editor', top: 60 },
    { anchor: 'schema-designer', top: 900 },
  ];

  it('is the last section at or above the line', () => {
    expect(activeAnchor(tops, 84, false)).toBe('sql-editor');
    expect(activeAnchor(tops, 60, false)).toBe('sql-editor');
    expect(activeAnchor(tops, 59, false)).toBe('table-grid');
  });

  it('is the first section when none has reached the line', () => {
    expect(activeAnchor([{ anchor: 'a', top: 300 }, { anchor: 'b', top: 900 }], 84, false)).toBe('a');
  });

  it('is the last section at the bottom of the page', () => {
    expect(activeAnchor(tops, 84, true)).toBe('schema-designer');
  });

  it('is undefined for an empty list', () => {
    expect(activeAnchor([], 84, false)).toBeUndefined();
    expect(activeAnchor([], 84, true)).toBeUndefined();
  });
});
