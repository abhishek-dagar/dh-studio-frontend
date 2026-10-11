import type { Download, ReleaseResult } from './types';

// The live v0.5.5 release as parseRelease returns it (asset names and sizes
// copied from GitHub on 2026-10-10). Test data only; the site never imports it.

const BASE = 'https://github.com/OnlyDev-India/data-hive-studio/releases/download/v0.5.5';

const file = (download: Omit<Download, 'url'>): Download => ({ ...download, url: `${BASE}/${download.fileName}` });

// GitHub's API order (alphabetical), not display order, so tests prove the sorting.
export const v055Downloads: readonly Download[] = [
  file({ os: 'linux', arch: 'x64', format: 'rpm', role: 'alternate', fileName: 'DH.Studio-0.5.5-1.x86_64.rpm', sizeBytes: 18408266 }),
  file({ os: 'macos', arch: 'arm64', format: 'dmg', role: 'primary', fileName: 'DH.Studio_0.5.5_aarch64.dmg', sizeBytes: 17599359 }),
  file({ os: 'linux', arch: 'x64', format: 'appimage', role: 'primary', fileName: 'DH.Studio_0.5.5_amd64.AppImage', sizeBytes: 95128056 }),
  file({ os: 'linux', arch: 'x64', format: 'deb', role: 'alternate', fileName: 'DH.Studio_0.5.5_amd64.deb', sizeBytes: 18407892 }),
  file({ os: 'windows', arch: 'x64', format: 'exe', role: 'primary', fileName: 'DH.Studio_0.5.5_x64-setup.exe', sizeBytes: 12030637 }),
  file({ os: 'macos', arch: 'x64', format: 'dmg', role: 'primary', fileName: 'DH.Studio_0.5.5_x64.dmg', sizeBytes: 18950535 }),
  file({ os: 'windows', arch: 'x64', format: 'msi', role: 'alternate', fileName: 'DH.Studio_0.5.5_x64_en-US.msi', sizeBytes: 16621568 }),
];

export const v055Live: ReleaseResult = {
  status: 'live',
  release: {
    version: '0.5.5',
    tag: 'v0.5.5',
    name: 'DH Studio 0.5.5',
    publishedAt: '2026-10-04T10:28:23Z',
    pageUrl: 'https://github.com/OnlyDev-India/data-hive-studio/releases/tag/v0.5.5',
    notes: 'Release notes that must never reach the island.',
    downloads: v055Downloads,
  },
};
