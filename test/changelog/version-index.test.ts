import { describe, expect, it } from 'vitest';
import { indexItems, versionAnchor } from '../../src/lib/changelog/version-index';
import type { ReleaseResult } from '../../src/lib/release/types';

const entry = (version: string, prerelease = false) => ({ data: { version, prerelease } });

const page = [entry('0.5.5'), entry('0.5.4'), entry('0.1.0-alpha', true)];
const badges = { latest: 'Latest', prerelease: 'Prerelease' };

const live = { status: 'live', release: { version: '0.5.5' } } as ReleaseResult;
const fallback = { status: 'fallback' } as ReleaseResult;

describe('versionAnchor', () => {
  it('prefixes the version with v', () => {
    expect(versionAnchor('0.5.5')).toBe('v0.5.5');
    expect(versionAnchor('0.1.0-alpha')).toBe('v0.1.0-alpha');
  });
});

describe('indexItems', () => {
  it('gives one mono item per entry, in page order, with anchors and badges', () => {
    expect(indexItems(page, live, badges)).toEqual([
      { anchor: 'v0.5.5', label: '0.5.5', mono: true, badges: [{ label: 'Latest', variant: 'signal' }] },
      { anchor: 'v0.5.4', label: '0.5.4', mono: true, badges: [] },
      { anchor: 'v0.1.0-alpha', label: '0.1.0-alpha', mono: true, badges: [{ label: 'Prerelease', variant: 'outline' }] },
    ]);
  });

  it('keeps every item on a full page of 10', () => {
    const ten = Array.from({ length: 10 }, (_, index) => entry(`0.${index}.0`));
    expect(indexItems(ten, live, badges).map((item) => item.label)).toEqual(ten.map((item) => item.data.version));
  });

  it('marks no item Latest when the release is a fallback', () => {
    expect(indexItems(page, fallback, badges).some((item) => item.badges?.some((badge) => badge.variant === 'signal'))).toBe(false);
  });

  it('is empty for a page with one entry or none', () => {
    expect(indexItems([entry('0.1.0-alpha', true)], live, badges)).toEqual([]);
    expect(indexItems([], live, badges)).toEqual([]);
  });
});
