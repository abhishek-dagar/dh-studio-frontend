import { afterEach, describe, expect, it, vi } from 'vitest';
import { fill, formatReleaseDate, pageDescription, pageTitle, type ChangelogCopy } from '../../src/lib/changelog/copy';
import { sqlTokens } from '../../src/lib/changelog/sql';

const copy = {
  titles: {
    all: 'Changelog',
    stable: 'Changelog: stable releases',
    prereleases: 'Changelog: prereleases',
    page: '{title}, page {page}',
    version: '{version} release notes',
  },
  descriptions: {
    all: 'All.',
    stable: 'Stable.',
    prereleases: 'Pre.',
    page: '{description} Page {page} of {count}.',
    version: 'What changed in DH Studio {version}, released {date}.',
  },
} as ChangelogCopy;

describe('formatReleaseDate', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('writes the UTC day, whatever the build machine\'s timezone', () => {
    vi.stubEnv('TZ', 'America/Los_Angeles');
    expect(formatReleaseDate('2026-10-04T23:30:00Z')).toBe('4 Oct 2026');
    expect(formatReleaseDate('2026-09-04T06:48:47Z')).toBe('4 Sep 2026');
  });
});

describe('pageTitle', () => {
  it('gives every changelog title', () => {
    const list = (filter: 'all' | 'stable' | 'prereleases', page: number) =>
      pageTitle({ kind: 'list', filter, page, pageCount: 2 }, copy);
    expect(list('all', 1)).toBe('Changelog · DH Studio');
    expect(list('all', 2)).toBe('Changelog, page 2 · DH Studio');
    expect(list('stable', 1)).toBe('Changelog: stable releases · DH Studio');
    expect(list('stable', 2)).toBe('Changelog: stable releases, page 2 · DH Studio');
    expect(list('prereleases', 1)).toBe('Changelog: prereleases · DH Studio');
    expect(pageTitle({ kind: 'version', version: '0.5.5', publishedAt: '2026-10-04T10:28:23Z' }, copy)).toBe(
      '0.5.5 release notes · DH Studio',
    );
  });
});

describe('pageDescription', () => {
  it('gives each page its own description', () => {
    expect(pageDescription({ kind: 'list', filter: 'all', page: 1, pageCount: 2 }, copy)).toBe('All.');
    expect(pageDescription({ kind: 'list', filter: 'all', page: 2, pageCount: 2 }, copy)).toBe('All. Page 2 of 2.');
    expect(pageDescription({ kind: 'version', version: '0.5.5', publishedAt: '2026-10-04T10:28:23Z' }, copy)).toBe(
      'What changed in DH Studio 0.5.5, released 4 Oct 2026.',
    );
  });
});

describe('fill', () => {
  it('leaves an unknown name as written', () => {
    expect(fill('{a} and {b}', { a: 1 })).toBe('1 and {b}');
  });
});

describe('sqlTokens', () => {
  it('colors keywords, names, constants and punctuation', () => {
    expect(sqlTokens('where prerelease = false;')).toEqual([
      { text: 'where', kind: 'keyword' },
      { text: ' ', kind: null },
      { text: 'prerelease', kind: 'ident' },
      { text: ' ', kind: null },
      { text: '=', kind: 'punctuation' },
      { text: ' ', kind: null },
      { text: 'false', kind: 'number' },
      { text: ';', kind: 'punctuation' },
    ]);
  });

  it('keeps every character', () => {
    const line = "select version, published_at from releases where tag = 'v1' limit 10;";
    expect(sqlTokens(line).map((token) => token.text).join('')).toBe(line);
  });
});
