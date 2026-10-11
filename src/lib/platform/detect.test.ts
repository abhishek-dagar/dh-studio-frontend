import { describe, expect, it } from 'vitest';
import { detectPlatform, type PlatformHints } from './detect';

// Real user agent strings, one per case the spec names.
const UA = {
  macSafari:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
  macChrome:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
  windowsChrome:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
  windowsFirefox: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0',
  linuxFirefox: 'Mozilla/5.0 (X11; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0',
  ubuntuFirefox: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:143.0) Gecko/20100101 Firefox/143.0',
  iphone:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  ipadDesktopMode:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
  android:
    'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36',
  chromebook:
    'Mozilla/5.0 (X11; CrOS x86_64 16093.68.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
  unknown: 'SomeBot/1.0',
} as const;

const hints = (userAgent: string, rest: Partial<PlatformHints> = {}): PlatformHints => ({
  userAgent,
  maxTouchPoints: 0,
  ...rest,
});

describe('detectPlatform', () => {
  it.each([
    ['Safari on a Mac', hints(UA.macSafari), { kind: 'desktop', os: 'macos', arch: undefined }],
    ['Firefox on Windows', hints(UA.windowsFirefox), { kind: 'desktop', os: 'windows' }],
    ['Firefox on Linux', hints(UA.linuxFirefox), { kind: 'desktop', os: 'linux' }],
    ['Firefox on Ubuntu', hints(UA.ubuntuFirefox), { kind: 'desktop', os: 'linux' }],
    ['an iPhone', hints(UA.iphone, { maxTouchPoints: 5 }), { kind: 'other' }],
    ['an iPad in desktop mode', hints(UA.ipadDesktopMode, { maxTouchPoints: 5 }), { kind: 'other' }],
    ['an Android phone', hints(UA.android, { maxTouchPoints: 5 }), { kind: 'other' }],
    ['a Chromebook without client hints', hints(UA.chromebook), { kind: 'other' }],
    ['an unknown agent', hints(UA.unknown), { kind: 'other' }],
  ] as const)('reads %s from the user agent', (_name, input, expected) => {
    expect(detectPlatform(input)).toEqual(expected);
  });

  it.each([
    ['macOS', UA.macChrome, { kind: 'desktop', os: 'macos', arch: undefined }],
    ['Windows', UA.windowsChrome, { kind: 'desktop', os: 'windows' }],
    ['Linux', UA.linuxFirefox, { kind: 'desktop', os: 'linux' }],
    ['Android', UA.android, { kind: 'other' }],
    ['Chrome OS', UA.chromebook, { kind: 'other' }],
    ['iOS', UA.iphone, { kind: 'other' }],
  ] as const)('maps the client hint platform %s first', (uaPlatform, userAgent, expected) => {
    expect(detectPlatform(hints(userAgent, { uaPlatform }))).toEqual(expected);
  });

  it('trusts the client hint over the user agent', () => {
    expect(detectPlatform(hints(UA.windowsChrome, { uaPlatform: 'macOS' }))).toEqual({
      kind: 'desktop',
      os: 'macos',
      arch: undefined,
    });
  });

  it('ignores an empty client hint platform and reads the user agent', () => {
    expect(detectPlatform(hints(UA.windowsChrome, { uaPlatform: '' }))).toEqual({ kind: 'desktop', os: 'windows' });
  });

  it.each([
    ['arm', 'arm64'],
    ['x86', 'x64'],
    ['', undefined],
    ['risc-v', undefined],
  ] as const)('reads the Mac architecture hint %j', (architecture, arch) => {
    expect(detectPlatform(hints(UA.macChrome, { uaPlatform: 'macOS', architecture }))).toEqual({
      kind: 'desktop',
      os: 'macos',
      arch,
    });
  });

  it('applies the architecture hint to macOS only', () => {
    expect(detectPlatform(hints(UA.windowsChrome, { uaPlatform: 'Windows', architecture: 'arm' }))).toEqual({
      kind: 'desktop',
      os: 'windows',
    });
  });
});
