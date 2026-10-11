import { GITHUB_TOKEN, VERCEL_ENV } from 'astro:env/server';
import { loadRelease } from './load';
import type { ReleaseResult } from './types';

// Evaluated once per build process, so every page shares one GitHub request.
// Pages `await` this; nothing else calls fetchReleaseList.
export const latestRelease: Promise<ReleaseResult> = loadRelease({
  fetch: globalThis.fetch,
  token: GITHUB_TOKEN,
  strict: VERCEL_ENV === 'production',
  warn: (message) => console.warn(message),
});

export { pickDownloads, type Picked } from './pick';
export type { Arch, Download, FallbackReason, Os, Release, ReleaseResult } from './types';
