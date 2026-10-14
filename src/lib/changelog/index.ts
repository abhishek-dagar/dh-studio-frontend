import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { compareEntries } from '../release/history';
import type { ChangelogCopy } from './copy';

// The changelog pages' data edge (spec 0005): the `releases` collection in the
// All order, and the copy entry. Pages read only through these.

export type ReleaseEntry = CollectionEntry<'releases'>;

/** Every listed release, newest first. Empty means the history was unavailable in this build (AC-12). */
export const releaseEntries = async (): Promise<readonly ReleaseEntry[]> =>
  [...(await getCollection('releases'))].sort((a, b) => compareEntries(a.data, b.data));

export const changelogCopy = async (): Promise<ChangelogCopy> => {
  const entry = await getEntry('changelog', 'changelog');
  if (entry === undefined) {
    throw new Error('[changelog] No "changelog" entry. Check that src/content/changelog/changelog.yaml holds one entry with the id "changelog".');
  }
  return entry.data;
};

export { formatReleaseDate, pageDescription, pageTitle, fill, type ChangelogCopy } from './copy';
export * from './views';
export * from './version-index';
