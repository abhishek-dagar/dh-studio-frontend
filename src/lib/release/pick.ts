import type { Arch, Download, Os, Release } from './types';

/** The fields picking needs, so display entries built on a Download pick the same way. */
type Pickable = Pick<Download, 'os' | 'arch' | 'role'>;

export type PickedFrom<T extends Pickable> = {
  readonly primary: T;
  readonly alternates: readonly T[];
};

export type Picked = PickedFrom<Download>;

export const DEFAULT_ARCH: Readonly<Record<Os, Arch>> = {
  macos: 'arm64',
  windows: 'x64',
  linux: 'x64',
};

const findPrimary = <T extends Pickable>(downloads: readonly T[], arch: Arch): T | undefined =>
  downloads.find((download) => download.role === 'primary' && download.arch === arch);

// The download for one OS plus everything else for that OS: the other arch
// primaries first, then the alternates (spec 0003). Unknown arch falls back to
// the OS default.
export const pickFrom = <T extends Pickable>(downloads: readonly T[], os: Os, arch?: Arch): PickedFrom<T> => {
  const forOs = downloads.filter((download) => download.os === os);
  // A live Release always carries the default arch primary for every OS
  // (parseRelease rejects releases without it), so this never ends undefined.
  const primary = (findPrimary(forOs, arch ?? DEFAULT_ARCH[os]) ?? findPrimary(forOs, DEFAULT_ARCH[os])) as T;
  const others = forOs.filter((download) => download !== primary);

  return {
    primary,
    alternates: [
      ...others.filter((download) => download.role === 'primary'),
      ...others.filter((download) => download.role === 'alternate'),
    ],
  };
};

export const pickDownloads = (release: Release, os: Os, arch?: Arch): Picked => pickFrom(release.downloads, os, arch);
