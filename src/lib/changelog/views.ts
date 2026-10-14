import type { ReleaseResult } from '../release/types';

// The changelog's list views and paths (spec 0005, AC-1, AC-6, AC-7, AC-9).
// Entries arrive ordered newest first; nothing here reorders them.

export type ChangelogFilter = 'all' | 'stable' | 'prereleases';

export const FILTERS: readonly ChangelogFilter[] = ['all', 'stable', 'prereleases'];

export const PAGE_SIZE = 10;

export const CHANGELOG_PATH = '/changelog/';

/** Shaped like a `releases` collection entry, so pages pass entries straight in. */
type Listable = { readonly data: { readonly prerelease: boolean } };

export type ChangelogView<T> = {
  readonly filter: ChangelogFilter;
  readonly page: number;
  readonly pageCount: number;
  readonly entries: readonly T[];
  readonly path: string;
  readonly newerPath?: string;
  readonly olderPath?: string;
};

/** `/changelog/`, `/changelog/page/2/`, `/changelog/stable/`, `/changelog/stable/page/2/`. Page 1 never has `/page/1/`. */
export const viewPath = (filter: ChangelogFilter, page: number): string =>
  `${CHANGELOG_PATH}${filter === 'all' ? '' : `${filter}/`}${page > 1 ? `page/${page}/` : ''}`;

export const versionPath = (version: string): string => `${CHANGELOG_PATH}${version}/`;

/** The rest parameter a list route builds for a view: undefined for `/changelog/` itself. */
export const viewSlug = (path: string): string | undefined => path.slice(CHANGELOG_PATH.length).replace(/\/$/, '') || undefined;

const matches = (filter: ChangelogFilter, entry: Listable): boolean =>
  filter === 'all' || (filter === 'stable' ? !entry.data.prerelease : entry.data.prerelease);

export const entriesFor = <T extends Listable>(entries: readonly T[], filter: ChangelogFilter): readonly T[] =>
  entries.filter((entry) => matches(filter, entry));

/** Filters that hold at least one entry, in tab order. A filter with none gets no tab and no route. */
export const availableFilters = (entries: readonly Listable[]): readonly ChangelogFilter[] =>
  FILTERS.filter((filter) => entries.some((entry) => matches(filter, entry)));

const pagesOf = <T extends Listable>(filter: ChangelogFilter, entries: readonly T[], pageSize: number): readonly ChangelogView<T>[] => {
  const pageCount = Math.ceil(entries.length / pageSize);
  return Array.from({ length: pageCount }, (_, index) => {
    const page = index + 1;
    return {
      filter,
      page,
      pageCount,
      entries: entries.slice(index * pageSize, page * pageSize),
      path: viewPath(filter, page),
      ...(page > 1 ? { newerPath: viewPath(filter, page - 1) } : {}),
      ...(page < pageCount ? { olderPath: viewPath(filter, page + 1) } : {}),
    };
  });
};

/** Every page of every non empty view. */
export const changelogViews = <T extends Listable>(entries: readonly T[], pageSize: number = PAGE_SIZE): readonly ChangelogView<T>[] =>
  availableFilters(entries).flatMap((filter) => pagesOf(filter, entriesFor(entries, filter), pageSize));

export type Neighbors<T> = { readonly newer?: T; readonly older?: T };

/** The entries either side of one version in the All order. */
export const neighbors = <T extends { readonly id: string }>(entries: readonly T[], id: string): Neighbors<T> => {
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) return {};
  const newer = entries[index - 1];
  const older = entries[index + 1];
  return { ...(newer !== undefined ? { newer } : {}), ...(older !== undefined ? { older } : {}) };
};

/** The Latest badge agrees with the Home download: only a live release, only its version (AC-2). */
export const isLatest = (release: ReleaseResult, version: string): boolean =>
  release.status === 'live' && release.release.version === version;
