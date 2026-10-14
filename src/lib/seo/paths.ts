import type { BuildEnv } from './config';

// Indexing rule (spec 0004): only a production build of a listed page may be
// indexed. The robots meta and the sitemap filter both read UNLISTED_PATHS, so
// they can never disagree.

/** Built pages kept out of search and the sitemap, each with a trailing slash. */
export const UNLISTED_PATHS: readonly string[] = ['/design-system/', '/404/'];

/** `/design-system` and `/design-system/` name the same page. */
export const withTrailingSlash = (path: string): string => (path.endsWith('/') ? path : `${path}/`);

export const isListedPath = (path: string): boolean => !UNLISTED_PATHS.includes(withTrailingSlash(path));

export const isIndexable = (path: string, env: BuildEnv): boolean => env === 'production' && isListedPath(path);
