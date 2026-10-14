import { describe, expect, it } from 'vitest';
import { v055Downloads } from '../release/v0.5.5.fixture';
import { forLabel, formatReleaseDate, formatSize, osName } from './format';

describe('formatReleaseDate', () => {
  it('writes the long en-US date in UTC', () => {
    expect(formatReleaseDate('2026-10-04T10:28:23Z')).toBe('October 4, 2026');
  });

  it('keeps the UTC day for a release published just before midnight', () => {
    expect(formatReleaseDate('2026-10-04T23:59:00Z')).toBe('October 4, 2026');
  });
});

describe('formatSize', () => {
  it.each([
    [17599359, '17.6 MB'],
    [95128056, '95.1 MB'],
    [12030637, '12.0 MB'],
    [1_234_567_890, '1,234.6 MB'],
  ])('formats %i bytes as %s', (bytes, expected) => {
    expect(formatSize(bytes)).toBe(expected);
  });
});

describe('forLabel', () => {
  it('names who each v0.5.5 file is for', () => {
    expect(Object.fromEntries(v055Downloads.map((download) => [download.format + download.arch, forLabel(download)]))).toEqual({
      dmgarm64: 'Mac with Apple silicon',
      dmgx64: 'Mac with Intel',
      exex64: 'Windows installer',
      msix64: 'Windows MSI package',
      appimagex64: 'Linux AppImage',
      debx64: 'Debian and Ubuntu',
      rpmx64: 'Fedora and RHEL',
    });
  });
});

describe('osName', () => {
  it('writes each system the way its maker does', () => {
    expect([osName('macos'), osName('windows'), osName('linux')]).toEqual(['macOS', 'Windows', 'Linux']);
  });
});
