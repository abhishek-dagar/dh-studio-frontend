import type { ReleaseResult } from '../release/types';
import type { SectionIndexItem } from '../ui/section-index';
import { isLatest } from './views';

// The changelog's `On this page` items (spec 0005, AC-18): which links a list
// page shows in the shared section index, each with its Latest and Prerelease badges.

/** A list page needs this many entries before it gets an index. */
export const INDEX_MIN_ENTRIES = 2;

/** The id on a list entry's `<article>`: `v0.5.5`. It starts with a letter, so selectors need no escaping. */
export const versionAnchor = (version: string): string => `v${version}`;

/** Shaped like a `releases` collection entry, so pages pass entries straight in. */
type Indexable = { readonly data: { readonly version: string; readonly prerelease: boolean } };

/** One item per entry, in page order, under AC-2's badge rules. Empty under INDEX_MIN_ENTRIES entries. */
export const indexItems = (
  entries: readonly Indexable[],
  release: ReleaseResult,
  badges: { readonly latest: string; readonly prerelease: string },
): readonly SectionIndexItem[] =>
  entries.length < INDEX_MIN_ENTRIES
    ? []
    : entries.map(({ data: { version, prerelease } }) => ({
        anchor: versionAnchor(version),
        label: version,
        mono: true,
        badges: [
          ...(isLatest(release, version) ? [{ label: badges.latest, variant: 'signal' as const }] : []),
          ...(prerelease ? [{ label: badges.prerelease, variant: 'outline' as const }] : []),
        ],
      }));
