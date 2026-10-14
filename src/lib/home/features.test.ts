import { describe, expect, it } from 'vitest';
import { duplicateOrders, featureListProblem, missingScreenshots, orderFeatures } from './features';

const entry = (id: string, order: number, image?: string) => ({ id, data: { order, image } });

const complete = [entry('grid', 1, 'grid.png'), entry('editor', 2, 'editor.png'), entry('team', 3, 'team.png')];

describe('orderFeatures', () => {
  it('sorts by order without changing the input', () => {
    const input = [entry('b', 2), entry('c', 3), entry('a', 1)];
    expect(orderFeatures(input).map((e) => e.id)).toEqual(['a', 'b', 'c']);
    expect(input.map((e) => e.id)).toEqual(['b', 'c', 'a']);
  });
});

describe('duplicateOrders', () => {
  it('names every entry that shares an order', () => {
    expect(duplicateOrders([entry('a', 1), entry('b', 1), entry('c', 2)])).toEqual(['a', 'b']);
  });

  it('is empty for unique orders', () => {
    expect(duplicateOrders(complete)).toEqual([]);
  });
});

describe('missingScreenshots', () => {
  it('names entries with no image', () => {
    expect(missingScreenshots([entry('a', 1, 'a.png'), entry('b', 2)])).toEqual(['b']);
  });
});

describe('featureListProblem', () => {
  const missing = [entry('grid', 1, 'grid.png'), entry('palette', 2)];

  it('passes a complete list in production', () => {
    expect(featureListProblem(complete, { production: true })).toBeUndefined();
  });

  it('allows a missing screenshot outside production', () => {
    expect(featureListProblem(missing, { production: false })).toBeUndefined();
  });

  it('names the entry missing a screenshot in production', () => {
    expect(featureListProblem(missing, { production: true })).toContain('palette');
  });

  it('refuses a shared order in any build', () => {
    expect(featureListProblem([entry('a', 1, 'a.png'), entry('b', 1, 'b.png')], { production: false })).toContain('a, b');
  });
});
