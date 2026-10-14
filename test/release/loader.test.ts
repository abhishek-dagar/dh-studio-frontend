import { describe, expect, it } from 'vitest';
import { RELEASE_HISTORY_URL } from '../../src/lib/release/config';
import { syncReleases, type SyncContext } from '../../src/lib/release/loader';
import { release } from './history.fixture';

type Stored = Parameters<SyncContext['store']['set']>[0];

const fakeContext = (html = '<h3 id="new">New</h3><a href="javascript:x">x</a>') => {
  const stored: Stored[] = [];
  const warnings: string[] = [];
  const cleared: true[] = [];
  const ctx: SyncContext = {
    store: {
      clear: () => void cleared.push(true),
      set: (entry) => (stored.push(entry as Stored), true),
    },
    logger: { warn: (message) => void warnings.push(message) },
    renderMarkdown: async () => ({ html, metadata: { headings: [{ depth: 3, slug: 'new', text: 'New' }] } }),
    parseData: async ({ data }) => data,
  };
  return { ctx, stored, warnings, cleared };
};

const timeout = (): Promise<Response> => Promise.reject(new DOMException('timed out', 'TimeoutError'));

const respond = (json: unknown) => {
  const urls: string[] = [];
  const fetch = (async (url: string) => {
    urls.push(url);
    return new Response(JSON.stringify(json), { status: 200 });
  }) as typeof globalThis.fetch;
  return { fetch, urls };
};

describe('syncReleases', () => {
  it('requests up to 100 releases and stores each with safe, version prefixed notes', async () => {
    const { fetch, urls } = respond([
      release({ tag_name: 'v0.5.5', published_at: '2026-10-04T10:28:23Z', prerelease: false }),
      release({ tag_name: 'v0.5.4', published_at: '2026-09-28T14:56:02Z', prerelease: false, body: '' }),
    ]);
    const { ctx, stored, warnings, cleared } = fakeContext();
    await syncReleases({ fetch, strict: true }, ctx);

    expect(urls).toEqual([RELEASE_HISTORY_URL]);
    expect(RELEASE_HISTORY_URL).toContain('per_page=100');
    expect(cleared).toHaveLength(1);
    expect(warnings).toEqual([]);
    expect(stored.map((entry) => entry.id)).toEqual(['0.5.5', '0.5.4']);
    expect(stored[0]?.data).toEqual({
      version: '0.5.5',
      tag: 'v0.5.5',
      publishedAt: '2026-10-04T10:28:23Z',
      prerelease: false,
      pageUrl: 'https://github.com/OnlyDev-India/data-hive-studio/releases/tag/v0.5.5',
    });
    expect(stored[0]?.rendered).toEqual({
      html: '<h3 id="0.5.5-new">New</h3><a>x</a>',
      metadata: { headings: [{ depth: 3, slug: '0.5.5-new', text: 'New' }] },
    });
    expect(stored[1]?.rendered?.html).toBe('');
  });

  it('logs each skipped release by tag and reason', async () => {
    const { fetch } = respond([
      release({ tag_name: 'v1.0.0', published_at: '2026-10-01T00:00:00Z', prerelease: false }),
      release({ tag_name: 'nightly', published_at: '2026-10-02T00:00:00Z', prerelease: true }),
    ]);
    const { ctx, warnings } = fakeContext();
    await syncReleases({ fetch, strict: false }, ctx);
    expect(warnings).toEqual(['skipped nightly: not a semver tag']);
  });

  it('leaves the store empty and warns once when GitHub times out twice in a lenient build', async () => {
    const { ctx, stored, warnings } = fakeContext();
    await syncReleases({ fetch: timeout, strict: false, timeoutMs: 1 }, ctx);
    expect(stored).toEqual([]);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('timeout');
  });

  it('fails a strict build and names the reason', async () => {
    const { ctx, stored } = fakeContext();
    await expect(syncReleases({ fetch: timeout, strict: true, timeoutMs: 1 }, ctx)).rejects.toThrow(/reason: timeout/);
    expect(stored).toEqual([]);
  });

  it('treats an empty list as unavailable, so production never ships an empty changelog', async () => {
    const { fetch } = respond([]);
    const { ctx } = fakeContext();
    await expect(syncReleases({ fetch, strict: true }, ctx)).rejects.toThrow(/reason: no-releases/);
  });

  it('treats a response that is not a release list as unavailable', async () => {
    const { fetch } = respond({ message: 'Bad credentials' });
    const { ctx, warnings } = fakeContext();
    await syncReleases({ fetch, strict: false }, ctx);
    expect(warnings[0]).toContain('invalid-response');
  });
});
