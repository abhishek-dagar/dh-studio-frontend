import { describe, expect, it } from 'vitest';
import {
  availableFilters,
  changelogViews,
  isLatest,
  neighbors,
  versionPath,
  viewPath,
  viewSlug,
} from '../../src/lib/changelog/views';
import type { ReleaseResult } from '../../src/lib/release/types';

const entry = (id: string, prerelease = false) => ({ id, data: { prerelease } });

const stable = ['0.5.5', '0.5.4', '0.5.3', '0.5.2', '0.5.1', '0.5.0', '0.4.0', '0.3.0', '0.2.0', '0.1.0'].map((id) => entry(id));
const today = [...stable, entry('0.1.0-alpha', true)];

const ids = (entries: readonly { readonly id: string }[]): readonly string[] => entries.map((item) => item.id);

describe('changelogViews', () => {
  it('pages today\'s releases: All in 10 and 1, Stable in 10, Prereleases in 1', () => {
    const views = changelogViews(today, 10);
    expect(views.map((view) => [view.path, view.page, view.pageCount, view.entries.length])).toEqual([
      ['/changelog/', 1, 2, 10],
      ['/changelog/page/2/', 2, 2, 1],
      ['/changelog/stable/', 1, 1, 10],
      ['/changelog/prereleases/', 1, 1, 1],
    ]);
    expect(ids(views[1]?.entries ?? [])).toEqual(['0.1.0-alpha']);
  });

  it('links newer and older pages, each left out at its end', () => {
    const [first, second] = changelogViews(today, 10);
    expect(first).toMatchObject({ olderPath: '/changelog/page/2/' });
    expect(first).not.toHaveProperty('newerPath');
    expect(second).toMatchObject({ newerPath: '/changelog/' });
    expect(second).not.toHaveProperty('olderPath');
  });

  it('builds no view for a filter with no releases', () => {
    expect(changelogViews(stable, 10).map((view) => view.filter)).toEqual(['all', 'stable']);
    expect(availableFilters(stable)).toEqual(['all', 'stable']);
  });

  it('never builds a /page/1/ path', () => {
    const many = Array.from({ length: 25 }, (_, index) => entry(`1.0.${index}`, index % 2 === 0));
    const paths = changelogViews(many, 10).map((view) => view.path);
    expect(paths.filter((path) => path.endsWith('/page/1/'))).toEqual([]);
    expect(paths).toContain('/changelog/stable/page/2/');
    expect(paths).toContain('/changelog/prereleases/page/2/');
    expect(paths).toContain('/changelog/page/3/');
  });
});

describe('paths', () => {
  it('names each view and version', () => {
    expect(viewPath('all', 1)).toBe('/changelog/');
    expect(viewPath('stable', 3)).toBe('/changelog/stable/page/3/');
    expect(versionPath('0.5.5')).toBe('/changelog/0.5.5/');
  });

  it('turns a path into the list route parameter', () => {
    expect(viewSlug('/changelog/')).toBeUndefined();
    expect(viewSlug('/changelog/page/2/')).toBe('page/2');
    expect(viewSlug('/changelog/prereleases/')).toBe('prereleases');
  });
});

describe('neighbors', () => {
  it('omits newer at the newest entry and older at the oldest', () => {
    expect(neighbors(today, '0.5.5')).toEqual({ older: today[1] });
    expect(neighbors(today, '0.1.0-alpha')).toEqual({ newer: today[9] });
    expect(neighbors(today, '0.5.4')).toEqual({ newer: today[0], older: today[2] });
  });
});

describe('isLatest', () => {
  const live = { status: 'live', release: { version: '0.5.5' } } as ReleaseResult;
  const fallback: ReleaseResult = { status: 'fallback', releasesPageUrl: 'https://github.com', reason: 'timeout' };

  it('is true only for the live release\'s version', () => {
    expect(isLatest(live, '0.5.5')).toBe(true);
    expect(isLatest(live, '0.5.4')).toBe(false);
    expect(isLatest(fallback, '0.5.5')).toBe(false);
  });
});
