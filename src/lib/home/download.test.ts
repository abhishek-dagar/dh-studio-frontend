import { describe, expect, it } from 'vitest';
import { v055Live } from '../release/v0.5.5.fixture';
import { rowsFor, toDownloadData, type DownloadData, type DownloadEntry } from './download';

const live = (data: DownloadData): Extract<DownloadData, { status: 'live' }> => {
  if (data.status !== 'live') throw new Error('expected live data');
  return data;
};

const data = live(toDownloadData(v055Live));
const files = (rows: readonly DownloadEntry[]): readonly string[] => rows.map((row) => row.fileName);

describe('toDownloadData', () => {
  it('carries the version, the UTC date label and the release page', () => {
    expect(data).toMatchObject({
      status: 'live',
      version: '0.5.5',
      publishedAt: '2026-10-04T10:28:23Z',
      dateLabel: 'October 4, 2026',
      pageUrl: 'https://github.com/OnlyDev-India/data-hive-studio/releases/tag/v0.5.5',
    });
  });

  it('lists all seven files macOS, Windows, Linux, each in pick order', () => {
    expect(files(data.downloads)).toEqual([
      'DH.Studio_0.5.5_aarch64.dmg',
      'DH.Studio_0.5.5_x64.dmg',
      'DH.Studio_0.5.5_x64-setup.exe',
      'DH.Studio_0.5.5_x64_en-US.msi',
      'DH.Studio_0.5.5_amd64.AppImage',
      'DH.Studio-0.5.5-1.x86_64.rpm',
      'DH.Studio_0.5.5_amd64.deb',
    ]);
  });

  it('turns each file into display strings', () => {
    expect(data.downloads[0]).toEqual({
      os: 'macos',
      arch: 'arm64',
      format: 'dmg',
      role: 'primary',
      fileName: 'DH.Studio_0.5.5_aarch64.dmg',
      forLabel: 'Mac with Apple silicon',
      sizeLabel: '17.6 MB',
      url: 'https://github.com/OnlyDev-India/data-hive-studio/releases/download/v0.5.5/DH.Studio_0.5.5_aarch64.dmg',
    });
  });

  it('never carries the release notes', () => {
    expect(JSON.stringify(data)).not.toContain('Release notes');
  });

  it('passes a fallback through with only the releases page', () => {
    expect(
      toDownloadData({
        status: 'fallback',
        releasesPageUrl: 'https://github.com/OnlyDev-India/data-hive-studio/releases',
        reason: 'network',
      }),
    ).toEqual({ status: 'fallback', releasesPageUrl: 'https://github.com/OnlyDev-India/data-hive-studio/releases' });
  });
});

describe('rowsFor', () => {
  it('returns every file and no primary for the all state', () => {
    const result = rowsFor(data.downloads, { kind: 'all' });
    expect(files(result.rows)).toEqual(files(data.downloads));
    expect(result.primary).toBeUndefined();
  });

  it.each([
    ['macos', 2, 'DH.Studio_0.5.5_aarch64.dmg'],
    ['windows', 2, 'DH.Studio_0.5.5_x64-setup.exe'],
    ['linux', 3, 'DH.Studio_0.5.5_amd64.AppImage'],
  ] as const)('narrows to %s with its primary first', (os, count, primary) => {
    const result = rowsFor(data.downloads, { kind: 'os', os, detected: true });
    expect(result.rows).toHaveLength(count);
    expect(result.rows[0]?.fileName).toBe(primary);
    expect(result.primary?.fileName).toBe(primary);
    expect(result.rows.every((row) => row.os === os)).toBe(true);
  });

  it('moves the Intel dmg to the top for an x64 Mac', () => {
    const result = rowsFor(data.downloads, { kind: 'os', os: 'macos', arch: 'x64', detected: true });
    expect(files(result.rows)).toEqual(['DH.Studio_0.5.5_x64.dmg', 'DH.Studio_0.5.5_aarch64.dmg']);
    expect(result.primary?.arch).toBe('x64');
  });
});
