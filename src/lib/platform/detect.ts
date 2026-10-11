import type { Arch, Os } from '../release/types';

// Platform detection (spec 0003, Detection). Pure: the island reads the hints
// from navigator and passes them in, so every rule is testable.

export type PlatformHints = {
  readonly userAgent: string;
  /** navigator.userAgentData?.platform, when the browser has it. */
  readonly uaPlatform?: string | undefined;
  readonly maxTouchPoints: number;
  /** From getHighEntropyValues(['architecture']), when it answered. */
  readonly architecture?: string | undefined;
};

export type Detected =
  | { readonly kind: 'desktop'; readonly os: Os; readonly arch?: Arch | undefined }
  | { readonly kind: 'other' };

const OTHER: Detected = { kind: 'other' };

const UA_PLATFORM_OS: Readonly<Record<string, Os>> = {
  macOS: 'macos',
  Windows: 'windows',
  Linux: 'linux',
};

const fromUaPlatform = (uaPlatform: string): Os | undefined => UA_PLATFORM_OS[uaPlatform];

// First match wins. iPadOS reports a Mac user agent, so a touch Mac is not a desktop.
const fromUserAgent = (userAgent: string, maxTouchPoints: number): Os | undefined => {
  if (/iPhone|iPad|iPod|Android|CrOS/.test(userAgent)) return undefined;
  if (/Macintosh/.test(userAgent)) return maxTouchPoints > 1 ? undefined : 'macos';
  if (/Windows/.test(userAgent)) return 'windows';
  if (/Linux|X11/.test(userAgent)) return 'linux';
  return undefined;
};

// Architecture only refines macOS: arm or x86, anything else stays unknown.
const macArch = (architecture: string | undefined): Arch | undefined => {
  if (architecture === 'arm') return 'arm64';
  if (architecture === 'x86') return 'x64';
  return undefined;
};

export const detectPlatform = (hints: PlatformHints): Detected => {
  const os =
    hints.uaPlatform !== undefined && hints.uaPlatform !== ''
      ? fromUaPlatform(hints.uaPlatform)
      : fromUserAgent(hints.userAgent, hints.maxTouchPoints);

  if (os === undefined) return OTHER;
  return os === 'macos' ? { kind: 'desktop', os, arch: macArch(hints.architecture) } : { kind: 'desktop', os };
};
