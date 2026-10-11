import { RELEASES_PAGE_URL } from '../release/config';
import type { ReleaseResult } from '../release/types';
import { SITE_URL } from './config';

// Shared test inputs for the SEO helpers (spec 0004, Critical test scenarios).

export const site = new URL(SITE_URL);

export const fallback: ReleaseResult = { status: 'fallback', releasesPageUrl: RELEASES_PAGE_URL, reason: 'network' };
