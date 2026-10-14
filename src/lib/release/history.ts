import { rawReleaseListSchema, type RawRelease } from './schema';

// The changelog's release history (spec 0005, AC-1, AC-10). Every published
// release with a semver tag, stable and prerelease together, newest first.

/** A version is the tag without one leading `v`: `1.2.3`, or `1.2.3-alpha.1`. */
const HISTORY_VERSION_PATTERN = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;

export type HistoryEntry = {
  readonly version: string;
  readonly tag: string;
  readonly publishedAt: string;
  readonly prerelease: boolean;
  readonly pageUrl: string;
  readonly body: string;
};

export type HistorySkip = {
  readonly tag: string;
  readonly reason: string;
};

export type HistorySelection =
  | { readonly ok: true; readonly entries: readonly HistoryEntry[]; readonly skipped: readonly HistorySkip[] }
  | { readonly ok: false; readonly reason: 'invalid-response' };

type Checked = { readonly ok: true; readonly entry: HistoryEntry } | { readonly ok: false; readonly skip: HistorySkip };

export const versionOf = (tag: string): string => tag.replace(/^v/, '');

const check = (raw: RawRelease): Checked => {
  const version = versionOf(raw.tag_name);
  if (!HISTORY_VERSION_PATTERN.test(version)) {
    return { ok: false, skip: { tag: raw.tag_name, reason: 'not a semver tag' } };
  }
  if (raw.published_at === null) {
    return { ok: false, skip: { tag: raw.tag_name, reason: 'no publish date' } };
  }
  return {
    ok: true,
    entry: {
      version,
      tag: raw.tag_name,
      publishedAt: raw.published_at,
      prerelease: raw.prerelease,
      pageUrl: raw.html_url,
      body: raw.body ?? '',
    },
  };
};

type Ordered = Pick<HistoryEntry, 'publishedAt' | 'version'>;

const VERSION_ORDER = new Intl.Collator('en', { numeric: true });

/** Newest publish date first; on a tie, the higher version first. */
export const compareEntries = (a: Ordered, b: Ordered): number =>
  b.publishedAt.localeCompare(a.publishedAt) || VERSION_ORDER.compare(b.version, a.version);

export const selectHistory = (rawList: unknown): HistorySelection => {
  const parsed = rawReleaseListSchema.safeParse(rawList);
  if (!parsed.success) return { ok: false, reason: 'invalid-response' };

  const checked = parsed.data.filter((raw) => !raw.draft).map(check);
  const valid = checked.flatMap((result) => (result.ok ? [result.entry] : []));
  // Two tags for one version (`v1.0.0` and `1.0.0`): the first in GitHub's order wins.
  const entries = valid.filter((entry, index) => valid.findIndex((other) => other.version === entry.version) === index);
  const duplicates = valid
    .filter((entry) => !entries.includes(entry))
    .map((entry) => ({
      tag: entry.tag,
      reason: `duplicate of ${entries.find((kept) => kept.version === entry.version)?.tag ?? entry.version}`,
    }));

  return {
    ok: true,
    entries: [...entries].sort(compareEntries),
    skipped: [...checked.flatMap((result) => (result.ok ? [] : [result.skip])), ...duplicates],
  };
};
