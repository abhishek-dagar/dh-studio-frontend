import { RELEASES_API_URL, REQUEST_TIMEOUT_MS } from './config';
import type { FallbackReason } from './types';

export type FetchFailure = Exclude<FallbackReason, 'no-complete-release'>;

export type FetchResult =
  | { readonly ok: true; readonly json: unknown }
  | { readonly ok: false; readonly reason: FetchFailure };

export type FetchDeps = {
  readonly fetch: typeof fetch;
  readonly token?: string | undefined;
  readonly timeoutMs?: number;
  /** The list to request; `latestRelease` uses the default, the changelog its own (spec 0005). */
  readonly url?: string;
};

type Attempt = FetchResult & { readonly retryable: boolean };

const fail = (reason: FetchFailure, retryable: boolean): Attempt => ({
  ok: false,
  reason,
  retryable,
});

const requestHeaders = (token: string | undefined): Readonly<Record<string, string>> => ({
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'dh-studio-website',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const isRateLimited = (response: Response): boolean =>
  (response.status === 403 || response.status === 429) &&
  response.headers.get('x-ratelimit-remaining') === '0';

const attempt = async (deps: FetchDeps): Promise<Attempt> => {
  try {
    const response = await deps.fetch(deps.url ?? RELEASES_API_URL, {
      headers: requestHeaders(deps.token),
      signal: AbortSignal.timeout(deps.timeoutMs ?? REQUEST_TIMEOUT_MS),
    });
    if (isRateLimited(response)) return fail('rate-limited', false);
    if (!response.ok) return fail('http-error', response.status >= 500);
    try {
      return { ok: true, json: await response.json(), retryable: false };
    } catch {
      return fail('invalid-response', false);
    }
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === 'TimeoutError';
    return fail(timedOut ? 'timeout' : 'network', true);
  }
};

const settle = ({ retryable: _retryable, ...result }: Attempt): FetchResult => result;

// One request, retried once on a network error, timeout or 5xx. A 4xx is final.
export const fetchReleaseList = async (deps: FetchDeps): Promise<FetchResult> => {
  const first = await attempt(deps);
  return settle(first.retryable ? await attempt(deps) : first);
};
