import { pickFrom } from '../release/pick';
import type { Arch, Format, Os, ReleaseResult, Role } from '../release/types';
import { forLabel, formatReleaseDate, formatSize } from './format';

// The DownloadQuery island's data (spec 0003, Data model sketch). Built from the
// release at build time, serializable, and never carrying the release notes.

/** The three systems, in the order the query and the result list them. */
export const OS_ORDER: readonly Os[] = ['macos', 'windows', 'linux'];

export type DownloadEntry = {
  readonly os: Os;
  readonly arch: Arch;
  readonly format: Format;
  readonly role: Role;
  readonly fileName: string;
  readonly forLabel: string;
  readonly sizeLabel: string;
  readonly url: string;
};

export type DownloadData =
  | {
      readonly status: 'live';
      readonly version: string;
      readonly publishedAt: string;
      readonly dateLabel: string;
      readonly pageUrl: string;
      readonly downloads: readonly DownloadEntry[];
    }
  | { readonly status: 'fallback'; readonly releasesPageUrl: string };

export type QueryState =
  | { readonly kind: 'all' }
  | { readonly kind: 'os'; readonly os: Os; readonly arch?: Arch | undefined; readonly detected: boolean };

/** Copy the island shows, from the `home` entry's `query` and `download` blocks. */
export type QueryCopy = {
  readonly otherComment: string;
  readonly yourSystemComment: string;
  readonly everySystem: string;
  readonly triggerLabel: string;
};

/** Copy for the one line install, from the `home` entry's `install` block. */
export type InstallCopy = {
  readonly heading: string;
  readonly note: string;
  readonly unixLabel: string;
  readonly windowsLabel: string;
  readonly linuxNote: string;
  readonly copy: string;
  readonly copied: string;
  readonly copyFailed: string;
};

export type DownloadCopy = {
  readonly fallback: string;
  readonly allSystems: string;
  readonly fallbackRow: string;
  readonly seeReleases: string;
  readonly hideTip: string;
  readonly rowLink: string;
  readonly rowsWord: string;
  readonly versionPrefix: string;
  readonly releasedWord: string;
};

/** A first launch tip from the `launchTips` collection. */
export type LaunchTip = {
  readonly title: string;
  readonly steps: readonly string[];
  /** A terminal command to run after the steps, shown as code. */
  readonly command?: string;
};

export type LaunchTips = Partial<Readonly<Record<Os, LaunchTip>>>;

export type Rows = {
  readonly rows: readonly DownloadEntry[];
  readonly primary?: DownloadEntry;
};

const rowsForOs = (downloads: readonly DownloadEntry[], os: Os, arch?: Arch): Rows => {
  const { primary, alternates } = pickFrom(downloads, os, arch);
  return { rows: [primary, ...alternates], primary };
};

/** The rows a query state returns, in display order, and which one is highlighted. */
export const rowsFor = (downloads: readonly DownloadEntry[], state: QueryState): Rows =>
  state.kind === 'all'
    ? { rows: OS_ORDER.flatMap((os) => rowsForOs(downloads, os).rows) }
    : rowsForOs(downloads, state.os, state.arch);

export const toDownloadData = (result: ReleaseResult): DownloadData => {
  if (result.status === 'fallback') return { status: 'fallback', releasesPageUrl: result.releasesPageUrl };

  const { release } = result;
  const entries: readonly DownloadEntry[] = release.downloads.map((download) => ({
    os: download.os,
    arch: download.arch,
    format: download.format,
    role: download.role,
    fileName: download.fileName,
    forLabel: forLabel(download),
    sizeLabel: formatSize(download.sizeBytes),
    url: download.url,
  }));

  return {
    status: 'live',
    version: release.version,
    publishedAt: release.publishedAt,
    dateLabel: formatReleaseDate(release.publishedAt),
    pageUrl: release.pageUrl,
    // Stored in the built `in (...)` order, so the island and the static HTML agree.
    downloads: rowsFor(entries, { kind: 'all' }).rows,
  };
};
