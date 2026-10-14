import type { Download, ReleaseResult } from './types';

// The live v0.5.5 release as parseRelease returns it (asset names and sizes
// copied from GitHub on 2026-10-10, sha256 from each asset's digest on
// 2026-10-13). Test data only; the site never imports it.

const BASE = 'https://github.com/OnlyDev-India/data-hive-studio/releases/download/v0.5.5';

const file = (download: Omit<Download, 'url'>): Download => ({ ...download, url: `${BASE}/${download.fileName}` });

// GitHub's API order (alphabetical), not display order, so tests prove the sorting.
export const v055Downloads: readonly Download[] = [
  file({ os: 'linux', arch: 'x64', format: 'rpm', role: 'alternate', fileName: 'DH.Studio-0.5.5-1.x86_64.rpm', sizeBytes: 18408266, sha256: 'a374923b7cb676ae8a89444e7578ee2599478205c920e09f949692857f556dc6' }),
  file({ os: 'macos', arch: 'arm64', format: 'dmg', role: 'primary', fileName: 'DH.Studio_0.5.5_aarch64.dmg', sizeBytes: 17599359, sha256: '2b65578d2aa11c8a9a3826fd84b5ce9afa8b50d75b347679317ce6e45cd0d93e' }),
  file({ os: 'linux', arch: 'x64', format: 'appimage', role: 'primary', fileName: 'DH.Studio_0.5.5_amd64.AppImage', sizeBytes: 95128056, sha256: '118f5023a310f72754908845f29744ecd24591bf1210625d6e502aa7be5f5a41' }),
  file({ os: 'linux', arch: 'x64', format: 'deb', role: 'alternate', fileName: 'DH.Studio_0.5.5_amd64.deb', sizeBytes: 18407892, sha256: 'a01fec7989c9f53237d0eafd0eb249a0e91e441e068000b11f62bff4e6748525' }),
  file({ os: 'windows', arch: 'x64', format: 'exe', role: 'primary', fileName: 'DH.Studio_0.5.5_x64-setup.exe', sizeBytes: 12030637, sha256: 'a0c15d78ee4cd7638f5ae99f54adbe1ed6ca1fb9449c191c406f04f5453bdbb9' }),
  file({ os: 'macos', arch: 'x64', format: 'dmg', role: 'primary', fileName: 'DH.Studio_0.5.5_x64.dmg', sizeBytes: 18950535, sha256: 'a8a448de9ce816f3b5d9761b40d725733d13270072a520ed0040ac8f3e38aa89' }),
  file({ os: 'windows', arch: 'x64', format: 'msi', role: 'alternate', fileName: 'DH.Studio_0.5.5_x64_en-US.msi', sizeBytes: 16621568, sha256: 'ebc53327993f394fce55e7265893824ec31ccd7fb6ee9675615675fab35b4120' }),
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
