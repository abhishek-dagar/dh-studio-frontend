import type { Download, Os } from '../release/types';

// Display strings for the Home download (spec 0003, Value sourcing). Pure, en-US.

const OS_NAME: Readonly<Record<Os, string>> = {
  macos: 'macOS',
  windows: 'Windows',
  linux: 'Linux',
};

export const osName = (os: Os): string => OS_NAME[os];

/** "October 4, 2026". UTC, so the day matches the release page wherever the build runs. */
export const formatReleaseDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' });

const SIZE_FORMAT = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Decimal megabytes with one decimal: 17599359 gives "17.6 MB". */
export const formatSize = (bytes: number): string => `${SIZE_FORMAT.format(bytes / 1_000_000)} MB`;

/** Who a file is for, in plain words: "Mac with Apple silicon", "Debian and Ubuntu". */
export const forLabel = (download: Pick<Download, 'arch' | 'format'>): string => {
  switch (download.format) {
    case 'dmg':
      return download.arch === 'arm64' ? 'Mac with Apple silicon' : 'Mac with Intel';
    case 'exe':
      return 'Windows installer';
    case 'msi':
      return 'Windows MSI package';
    case 'appimage':
      return 'Linux AppImage';
    case 'deb':
      return 'Debian and Ubuntu';
    case 'rpm':
      return 'Fedora and RHEL';
  }
};
