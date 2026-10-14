import { describe, expect, it } from 'vitest';
import { loadRelease } from '../../src/lib/release/load';

// One stable release with every installer; `hashed` picks which files carry a digest.
const BASE = 'https://github.com/OnlyDev-India/data-hive-studio/releases/download/v0.5.5';
const FILES = [
  'DH.Studio_0.5.5_aarch64.dmg',
  'DH.Studio_0.5.5_x64.dmg',
  'DH.Studio_0.5.5_x64-setup.exe',
  'DH.Studio_0.5.5_x64_en-US.msi',
  'DH.Studio_0.5.5_amd64.AppImage',
];
const HASH = 'a0c15d78ee4cd7638f5ae99f54adbe1ed6ca1fb9449c191c406f04f5453bdbb9';

const rawRelease = (digestFor: (name: string) => string | null | undefined) => ({
  tag_name: 'v0.5.5',
  name: 'DH Studio 0.5.5',
  published_at: '2026-10-04T10:28:23Z',
  html_url: 'https://github.com/OnlyDev-India/data-hive-studio/releases/tag/v0.5.5',
  body: '',
  draft: false,
  prerelease: false,
  assets: FILES.map((name) => {
    const digest = digestFor(name);
    return { name, browser_download_url: `${BASE}/${name}`, size: 1000, ...(digest === undefined ? {} : { digest }) };
  }),
});

const run = async (digestFor: (name: string) => string | null | undefined, strict = false) => {
  const warnings: string[] = [];
  const json = [rawRelease(digestFor)];
  const result = await loadRelease({
    fetch: (async () => new Response(JSON.stringify(json), { status: 200 })) as typeof fetch,
    strict,
    warn: (message) => warnings.push(message),
  });
  return { result, warnings };
};

describe('loadRelease checksums', () => {
  it('warns about nothing when every file has a digest', async () => {
    const { result, warnings } = await run(() => `sha256:${HASH}`);
    expect(result.status).toBe('live');
    expect(warnings).toEqual([]);
  });

  it('warns once, naming every file without a usable digest, and stays live in strict mode', async () => {
    const { result, warnings } = await run(
      (name) => (name.endsWith('.msi') ? undefined : name.endsWith('.exe') ? null : name.endsWith('x64.dmg') ? 'md5:abc' : `sha256:${HASH}`),
      true,
    );
    expect(result.status).toBe('live');
    expect(warnings).toEqual([
      '[release] no sha256 digest for: DH.Studio_0.5.5_x64.dmg, DH.Studio_0.5.5_x64-setup.exe, DH.Studio_0.5.5_x64_en-US.msi',
    ]);
  });
});
