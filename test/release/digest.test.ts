import { describe, expect, it } from 'vitest';
import { classifyAsset } from '../../src/lib/release/classify';
import { missingDigests, parseDigest } from '../../src/lib/release/digest';
import { v055Live } from '../../src/lib/release/v0.5.5.fixture';
import type { Release } from '../../src/lib/release/types';

const EXE_HASH = 'a0c15d78ee4cd7638f5ae99f54adbe1ed6ca1fb9449c191c406f04f5453bdbb9';

const release = (v055Live as { readonly release: Release }).release;

describe('parseDigest', () => {
  it('takes the hex out of a sha256 digest', () => {
    expect(parseDigest(`sha256:${EXE_HASH}`)).toBe(EXE_HASH);
  });

  it('lowercases an uppercase digest', () => {
    expect(parseDigest(`sha256:${EXE_HASH.toUpperCase()}`)).toBe(EXE_HASH);
    expect(parseDigest(`SHA256:${EXE_HASH}`)).toBe(EXE_HASH);
  });

  it('treats any other value as not published', () => {
    expect(parseDigest(`sha512:${EXE_HASH}`)).toBeUndefined();
    expect(parseDigest(`sha256:${EXE_HASH.slice(1)}`)).toBeUndefined();
    expect(parseDigest(`sha256:${EXE_HASH}0`)).toBeUndefined();
    expect(parseDigest(`sha256:${EXE_HASH.slice(1)}g`)).toBeUndefined();
    expect(parseDigest(EXE_HASH)).toBeUndefined();
    expect(parseDigest('')).toBeUndefined();
    expect(parseDigest(null)).toBeUndefined();
    expect(parseDigest(undefined)).toBeUndefined();
  });
});

describe('classifyAsset', () => {
  const asset = {
    name: 'DH.Studio_0.5.5_x64-setup.exe',
    browser_download_url: 'https://github.com/OnlyDev-India/data-hive-studio/releases/download/v0.5.5/DH.Studio_0.5.5_x64-setup.exe',
    size: 12030637,
  };

  it('carries the sha256 from the digest', () => {
    expect(classifyAsset({ ...asset, digest: `sha256:${EXE_HASH}` })?.sha256).toBe(EXE_HASH);
  });

  it('still classifies a file with no usable digest', () => {
    expect(classifyAsset(asset)).toMatchObject({ format: 'exe', sha256: undefined });
    expect(classifyAsset({ ...asset, digest: null })).toMatchObject({ format: 'exe', sha256: undefined });
    expect(classifyAsset({ ...asset, digest: 'md5:abc' })).toMatchObject({ format: 'exe', sha256: undefined });
  });
});

describe('missingDigests', () => {
  it('is empty when every file has a checksum', () => {
    expect(missingDigests(release)).toEqual([]);
  });

  it('names every file without a checksum, in release order', () => {
    const downloads = release.downloads.map((download) =>
      download.format === 'msi' || download.format === 'rpm' ? { ...download, sha256: undefined } : download,
    );
    expect(missingDigests({ ...release, downloads })).toEqual(['DH.Studio-0.5.5-1.x86_64.rpm', 'DH.Studio_0.5.5_x64_en-US.msi']);
  });
});
