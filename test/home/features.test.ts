import { describe, expect, it } from 'vitest';
import { homeFeatures, homeListProblem } from '../../src/lib/home/features';

const entry = (id: string, order: number, home?: boolean) => ({ id, data: { order, image: `${id}.png`, home } });

describe('homeFeatures', () => {
  it('keeps only home: true entries, in the order given', () => {
    const input = [entry('grid', 1, true), entry('console', 2), entry('editor', 3, true), entry('pipeline', 4, false)];
    expect(homeFeatures(input).map((e) => e.id)).toEqual(['grid', 'editor']);
  });

  it('does not change the input', () => {
    const input = [entry('grid', 1, true), entry('console', 2)];
    homeFeatures(input);
    expect(input.map((e) => e.id)).toEqual(['grid', 'console']);
  });
});

describe('homeListProblem', () => {
  it('passes when one entry is on Home', () => {
    expect(homeListProblem([entry('grid', 1, true), entry('console', 2)])).toBeUndefined();
  });

  it('refuses a list with no Home entry', () => {
    expect(homeListProblem([entry('grid', 1, false), entry('console', 2)])).toContain('home: true');
  });

  it('refuses an empty list', () => {
    expect(homeListProblem([])).toBeDefined();
  });
});
