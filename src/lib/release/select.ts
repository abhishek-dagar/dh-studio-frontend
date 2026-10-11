import { classifyAsset, PRIMARY_SLOTS } from './classify';
import { RELEASES_PAGE_URL } from './config';
import { rawReleaseListSchema, type RawRelease } from './schema';
import type { Download, Release, ReleaseResult, SkippedRelease } from './types';

const VERSION_PATTERN = /^\d+\.\d+\.\d+$/;

export type ParseResult =
  | { readonly ok: true; readonly release: Release }
  | { readonly ok: false; readonly missing: readonly string[] };

export type Selection = {
  readonly result: ReleaseResult;
  readonly skipped: readonly SkippedRelease[];
};

const downloadKey = (download: Download): string =>
  `${download.os}/${download.arch}/${download.format}`;

// At most one Download per (os, arch, format); the first in API order wins.
const uniqueDownloads = (downloads: readonly Download[]): readonly Download[] =>
  downloads.filter(
    (download, index) =>
      downloads.findIndex((other) => downloadKey(other) === downloadKey(download)) === index,
  );

const missingPrimaries = (downloads: readonly Download[]): readonly string[] =>
  PRIMARY_SLOTS.filter(
    (slot) =>
      !downloads.some(
        (download) =>
          download.role === 'primary' && download.os === slot.os && download.arch === slot.arch,
      ),
  ).map((slot) => slot.label);

export const parseRelease = (raw: RawRelease): ParseResult => {
  const version = raw.tag_name.replace(/^v/, '');
  const downloads = uniqueDownloads(
    raw.assets.map(classifyAsset).filter((download): download is Download => download !== null),
  );
  const missing = [
    ...(VERSION_PATTERN.test(version) ? [] : ['a semver tag']),
    ...(raw.published_at === null ? ['a publish date'] : []),
    ...missingPrimaries(downloads),
  ];

  return missing.length > 0 || raw.published_at === null
    ? { ok: false, missing }
    : {
        ok: true,
        release: {
          version,
          tag: raw.tag_name,
          name: raw.name?.trim() ? raw.name : `DH Studio ${version}`,
          publishedAt: raw.published_at,
          pageUrl: raw.html_url,
          notes: raw.body ?? '',
          downloads,
        },
      };
};

const fallback = (reason: 'invalid-response' | 'no-complete-release'): ReleaseResult => ({
  status: 'fallback',
  releasesPageUrl: RELEASES_PAGE_URL,
  reason,
});

// Newest stable release (not a draft, not a prerelease) that carries all four primaries.
export const selectLatest = (rawList: unknown): Selection => {
  const parsed = rawReleaseListSchema.safeParse(rawList);
  if (!parsed.success) {
    return { result: fallback('invalid-response'), skipped: [] };
  }

  const candidates = parsed.data
    .filter((raw) => !raw.draft && !raw.prerelease)
    .map((raw) => ({ tag: raw.tag_name, parsed: parseRelease(raw) }));
  const chosen = candidates.find((candidate) => candidate.parsed.ok);
  const skipped = candidates
    .slice(0, chosen ? candidates.indexOf(chosen) : candidates.length)
    .flatMap((candidate) =>
      candidate.parsed.ok ? [] : [{ tag: candidate.tag, missing: candidate.parsed.missing }],
    );

  return chosen?.parsed.ok
    ? { result: { status: 'live', release: chosen.parsed.release }, skipped }
    : { result: fallback('no-complete-release'), skipped };
};
