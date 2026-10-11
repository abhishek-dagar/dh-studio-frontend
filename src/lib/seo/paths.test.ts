import { describe, expect, it } from 'vitest';
import { isIndexable, isListedPath } from './paths';

describe('isListedPath', () => {
  it('lists Home and leaves out the showcase, with or without the slash', () => {
    expect(isListedPath('/')).toBe(true);
    expect(isListedPath('/design-system/')).toBe(false);
    expect(isListedPath('/design-system')).toBe(false);
  });
});

describe('isIndexable', () => {
  it('allows only a listed page in a production build', () => {
    expect(isIndexable('/', 'production')).toBe(true);
    expect(isIndexable('/design-system/', 'production')).toBe(false);
  });

  it('blocks every page in preview, development and local builds', () => {
    expect(isIndexable('/', 'preview')).toBe(false);
    expect(isIndexable('/', 'development')).toBe(false);
    expect(isIndexable('/', undefined)).toBe(false);
  });
});
