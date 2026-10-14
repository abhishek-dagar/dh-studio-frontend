import { describe, expect, it } from 'vitest';
import { featureHref, featureSlug } from '../../src/lib/features/slug';

describe('featureSlug', () => {
  it('drops the order prefix', () => {
    expect(featureSlug('05-compare-tables')).toBe('compare-tables');
    expect(featureSlug('01-table-grid')).toBe('table-grid');
  });

  it('keeps an id with no prefix as it is', () => {
    expect(featureSlug('keychain')).toBe('keychain');
  });
});

describe('featureHref', () => {
  it('points at the section on the features page', () => {
    expect(featureHref('07-keychain')).toBe('/features/#keychain');
  });
});
