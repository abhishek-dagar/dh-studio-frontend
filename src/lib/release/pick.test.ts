import { describe, expect, it } from 'vitest';
import { pickDownloads, pickFrom } from './pick';
import { v055Downloads, v055Live } from './v0.5.5.fixture';

const names = (downloads: readonly { readonly fileName: string }[]): readonly string[] =>
  downloads.map((download) => download.fileName);

describe('pickFrom', () => {
  it('picks the Apple silicon dmg on a Mac by default, Intel next', () => {
    const picked = pickFrom(v055Downloads, 'macos');
    expect(picked.primary.fileName).toBe('DH.Studio_0.5.5_aarch64.dmg');
    expect(names(picked.alternates)).toEqual(['DH.Studio_0.5.5_x64.dmg']);
  });

  it('puts the Intel dmg first for an x64 Mac', () => {
    const picked = pickFrom(v055Downloads, 'macos', 'x64');
    expect(picked.primary.fileName).toBe('DH.Studio_0.5.5_x64.dmg');
    expect(names(picked.alternates)).toEqual(['DH.Studio_0.5.5_aarch64.dmg']);
  });

  it('picks the installer on Windows, then the MSI', () => {
    const picked = pickFrom(v055Downloads, 'windows');
    expect(picked.primary.format).toBe('exe');
    expect(picked.alternates.map((download) => download.format)).toEqual(['msi']);
  });

  it('picks the AppImage on Linux, then the alternates in API order', () => {
    const picked = pickFrom(v055Downloads, 'linux');
    expect(picked.primary.format).toBe('appimage');
    expect(picked.alternates.map((download) => download.format)).toEqual(['rpm', 'deb']);
  });

  it('falls back to the OS default when the arch has no primary', () => {
    expect(pickFrom(v055Downloads, 'windows', 'arm64').primary.format).toBe('exe');
  });
});

describe('pickDownloads', () => {
  it('delegates to pickFrom over the release downloads', () => {
    if (v055Live.status !== 'live') throw new Error('fixture must be live');
    expect(pickDownloads(v055Live.release, 'macos', 'x64')).toEqual(pickFrom(v055Downloads, 'macos', 'x64'));
  });
});
