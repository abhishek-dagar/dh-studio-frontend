import { describe, expect, it } from 'vitest';
import { selectHistory, type HistorySelection } from '../../src/lib/release/history';
import { release, todaysReleases } from './history.fixture';

const ok = (selection: HistorySelection): Extract<HistorySelection, { ok: true }> => {
  if (!selection.ok) throw new Error('expected a history');
  return selection;
};

describe('selectHistory', () => {
  it('lists all 11 of today\'s releases newest first, the 9 file releases and the prerelease included', () => {
    const { entries, skipped } = ok(selectHistory(todaysReleases));
    expect(entries.map((entry) => entry.version)).toEqual([
      '0.5.5',
      '0.5.4',
      '0.5.3',
      '0.5.2',
      '0.5.1',
      '0.5.0',
      '0.4.0',
      '0.3.0',
      '0.2.0',
      '0.1.0',
      '0.1.0-alpha',
    ]);
    expect(skipped).toEqual([]);
  });

  it('keeps the fields a page needs', () => {
    const [newest] = ok(selectHistory(todaysReleases)).entries;
    expect(newest).toEqual({
      version: '0.5.5',
      tag: 'v0.5.5',
      publishedAt: '2026-10-04T10:28:23Z',
      prerelease: false,
      pageUrl: 'https://github.com/OnlyDev-India/data-hive-studio/releases/tag/v0.5.5',
      body: '**New**\n- Notes for v0.5.5',
    });
  });

  it('drops drafts, skips bad tags and missing dates, and keeps the first of two tags for one version', () => {
    const { entries, skipped } = ok(
      selectHistory([
        release({ tag_name: 'v2.0.0', published_at: null, prerelease: false, draft: true }),
        release({ tag_name: 'v1.1.0', published_at: null, prerelease: false }),
        release({ tag_name: 'nightly', published_at: '2026-10-02T00:00:00Z', prerelease: true }),
        release({ tag_name: 'v1.0.0', published_at: '2026-10-01T00:00:00Z', prerelease: false }),
        release({ tag_name: '1.0.0', published_at: '2026-10-01T00:00:00Z', prerelease: false }),
      ]),
    );
    expect(entries.map((entry) => entry.tag)).toEqual(['v1.0.0']);
    expect(skipped).toEqual([
      { tag: 'v1.1.0', reason: 'no publish date' },
      { tag: 'nightly', reason: 'not a semver tag' },
      { tag: '1.0.0', reason: 'duplicate of v1.0.0' },
    ]);
  });

  it('orders by publish date, not by GitHub order, and breaks a tie by the higher version', () => {
    const { entries } = ok(
      selectHistory([
        release({ tag_name: 'v1.9.0', published_at: '2026-10-01T00:00:00Z', prerelease: false }),
        release({ tag_name: 'v1.10.0', published_at: '2026-10-01T00:00:00Z', prerelease: false }),
        release({ tag_name: 'v2.0.0', published_at: '2026-10-05T00:00:00Z', prerelease: false }),
      ]),
    );
    expect(entries.map((entry) => entry.version)).toEqual(['2.0.0', '1.10.0', '1.9.0']);
  });

  it('accepts a prerelease suffix and turns a null body into empty notes', () => {
    const { entries } = ok(
      selectHistory([release({ tag_name: 'v1.0.0-rc.1', published_at: '2026-10-01T00:00:00Z', prerelease: true, body: null })]),
    );
    expect(entries[0]).toMatchObject({ version: '1.0.0-rc.1', body: '' });
  });

  it('reports a response that is not a release list', () => {
    expect(selectHistory({ message: 'Not Found' })).toEqual({ ok: false, reason: 'invalid-response' });
  });
});
