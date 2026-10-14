import type { Loader, LoaderContext } from 'astro/loaders';
import { RELEASE_HISTORY_URL } from './config';
import { fetchReleaseList, type FetchDeps } from './fetch';
import { selectHistory, type HistoryEntry } from './history';
import { finishNotesHtml, notesId, prepareNotes } from './notes';

// The `releases` collection loader (spec 0005, AC-1, AC-10 to AC-12). Astro runs
// it once per build: one GitHub request for up to 100 releases, each body made
// safe and rendered by Astro's own markdown pipeline.

export type ReleasesLoaderDeps = Omit<FetchDeps, 'url'> & {
  // Production builds fail rather than ship an empty changelog, so Vercel keeps the last good deploy.
  readonly strict: boolean;
};

/** The stored fields of one `releases` entry; the notes live in its `rendered` HTML. */
export type ReleaseEntryData = Omit<HistoryEntry, 'body'>;

type Rendered = Awaited<ReturnType<LoaderContext['renderMarkdown']>>;

/** The parts of Astro's loader context the sync uses, narrow so tests can pass a stand in. */
export type SyncContext = {
  readonly store: Pick<LoaderContext['store'], 'clear' | 'set'>;
  readonly logger: { readonly warn: (message: string) => void };
  readonly renderMarkdown: (content: string) => Promise<Rendered>;
  readonly parseData: LoaderContext['parseData'];
};

type HistoryFailure = 'network' | 'timeout' | 'http-error' | 'rate-limited' | 'invalid-response' | 'no-releases';

type HistoryResult =
  | { readonly ok: true; readonly entries: readonly HistoryEntry[] }
  | { readonly ok: false; readonly reason: HistoryFailure };

const loadHistory = async (deps: ReleasesLoaderDeps, warn: (message: string) => void): Promise<HistoryResult> => {
  const fetched = await fetchReleaseList({ ...deps, url: RELEASE_HISTORY_URL });
  if (!fetched.ok) return fetched;
  const selection = selectHistory(fetched.json);
  if (!selection.ok) return selection;
  selection.skipped.forEach(({ tag, reason }) => warn(`skipped ${tag}: ${reason}`));
  // GitHub always has at least one release, so none means something went wrong.
  return selection.entries.length > 0 ? { ok: true, entries: selection.entries } : { ok: false, reason: 'no-releases' };
};

const renderNotes = async (entry: HistoryEntry, ctx: SyncContext): Promise<Rendered> => {
  if (entry.body.trim() === '') return { html: '', metadata: { headings: [] } };
  const rendered = await ctx.renderMarkdown(prepareNotes(entry.body));
  return {
    html: finishNotesHtml(rendered.html, entry.version),
    metadata: {
      headings: (rendered.metadata?.headings ?? []).map((heading) => ({ ...heading, slug: notesId(entry.version, heading.slug) })),
    },
  };
};

/**
 * Clears and refills the store. A failure rejects in strict mode; otherwise it
 * leaves the store empty (the page shows its unavailable state) and warns once.
 */
export const syncReleases = async (deps: ReleasesLoaderDeps, ctx: SyncContext): Promise<void> => {
  ctx.store.clear();
  const history = await loadHistory(deps, (message) => ctx.logger.warn(message));
  if (!history.ok) {
    if (deps.strict) {
      throw new Error(
        `[changelog] GitHub release history unavailable (reason: ${history.reason}). ` +
          'Failing this production build so Vercel keeps serving the last good deploy.',
      );
    }
    ctx.logger.warn(`release history unavailable (reason: ${history.reason}), /changelog/ shows its unavailable state`);
    return;
  }
  const rendered = await Promise.all(history.entries.map((entry) => renderNotes(entry, ctx)));
  await Promise.all(
    history.entries.map(async ({ body: _body, ...fields }, index) => {
      const data = await ctx.parseData<ReleaseEntryData>({ id: fields.version, data: fields });
      ctx.store.set({ id: fields.version, data, rendered: rendered[index] });
    }),
  );
};

export const releasesLoader = (deps: ReleasesLoaderDeps): Loader => ({
  name: 'releases',
  load: (ctx) => syncReleases(deps, ctx),
});
