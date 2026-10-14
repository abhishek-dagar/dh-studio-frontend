import { RELEASES_PAGE_URL } from './config';
import { missingDigests } from './digest';
import { fetchReleaseList, type FetchDeps } from './fetch';
import { selectLatest } from './select';
import type { ReleaseResult } from './types';

export type LoadDeps = FetchDeps & {
  // Production builds fail on a fallback so Vercel keeps the last good deploy.
  readonly strict: boolean;
  readonly warn: (message: string) => void;
};

const toResult = async (deps: LoadDeps): Promise<ReleaseResult> => {
  const fetched = await fetchReleaseList(deps);
  if (!fetched.ok) {
    return { status: 'fallback', releasesPageUrl: RELEASES_PAGE_URL, reason: fetched.reason };
  }
  const { result, skipped } = selectLatest(fetched.json);
  skipped.forEach(({ tag, missing }) =>
    deps.warn(`[release] skipped ${tag}: missing ${missing.join(', ')}`),
  );
  return result;
};

// Fetch, select and apply the strict or lenient failure rule. Rejects only in
// strict mode on a fallback; every other path resolves to a ReleaseResult.
export const loadRelease = async (deps: LoadDeps): Promise<ReleaseResult> => {
  const result = await toResult(deps);
  if (result.status === 'live') {
    // A missing checksum is supporting evidence gone, never a reason to fail (spec 0005, AC-6).
    const unhashed = missingDigests(result.release);
    if (unhashed.length > 0) deps.warn(`[release] no sha256 digest for: ${unhashed.join(', ')}`);
    return result;
  }

  if (deps.strict) {
    throw new Error(
      `[release] GitHub release data unavailable (reason: ${result.reason}). ` +
        'Failing this production build so Vercel keeps serving the last good deploy.',
    );
  }
  deps.warn(
    `[release] using fallback (reason: ${result.reason}), download links point at ${result.releasesPageUrl}`,
  );
  return result;
};
