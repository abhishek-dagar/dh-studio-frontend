import type { RawRelease } from '../../src/lib/release/schema';

// Today's 11 releases as GitHub lists them (copied 2026-10-13), trimmed to the
// fields selectHistory reads. Bodies are short stand ins; assets keep their count.

type Seed = { readonly tag_name: string; readonly published_at: string | null; readonly prerelease: boolean; readonly assetCount?: number };

export const release = ({ assetCount = 0, ...seed }: Seed & Partial<RawRelease>): RawRelease => ({
  name: null,
  html_url: `https://github.com/OnlyDev-India/data-hive-studio/releases/tag/${seed.tag_name}`,
  body: `**New**\n- Notes for ${seed.tag_name}`,
  draft: false,
  assets: Array.from({ length: assetCount }, (_, index) => ({
    name: `file-${index}`,
    browser_download_url: `https://github.com/OnlyDev-India/data-hive-studio/releases/download/${seed.tag_name}/file-${index}`,
    size: 1,
  })),
  ...seed,
});

export const todaysReleases: readonly RawRelease[] = [
  release({ tag_name: 'v0.5.5', published_at: '2026-10-04T10:28:23Z', prerelease: false, assetCount: 20 }),
  release({ tag_name: 'v0.5.4', published_at: '2026-09-28T14:56:02Z', prerelease: false, assetCount: 20 }),
  release({ tag_name: 'v0.5.3', published_at: '2026-09-19T07:47:21Z', prerelease: false, assetCount: 17 }),
  release({ tag_name: 'v0.5.2', published_at: '2026-09-15T07:57:32Z', prerelease: false, assetCount: 17 }),
  release({ tag_name: 'v0.5.1', published_at: '2026-09-12T08:12:43Z', prerelease: false, assetCount: 17 }),
  release({ tag_name: 'v0.5.0', published_at: '2026-09-12T06:43:23Z', prerelease: false, assetCount: 17 }),
  release({ tag_name: 'v0.4.0', published_at: '2026-09-08T23:01:42Z', prerelease: false, assetCount: 9 }),
  release({ tag_name: 'v0.3.0', published_at: '2026-09-06T07:22:26Z', prerelease: false, assetCount: 9 }),
  release({ tag_name: 'v0.2.0', published_at: '2026-09-05T09:49:10Z', prerelease: false, assetCount: 9 }),
  release({ tag_name: 'v0.1.0', published_at: '2026-09-04T06:48:47Z', prerelease: false, assetCount: 9 }),
  release({ tag_name: '0.1.0-alpha', published_at: '2024-12-28T07:16:28Z', prerelease: true, assetCount: 3 }),
];
