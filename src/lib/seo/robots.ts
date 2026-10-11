import type { BuildEnv } from './config';

// robots.txt (spec 0004, AC-9): production allows all and names the sitemap;
// every other build blocks all, so a preview never competes with production.
export const robotsTxt = (site: URL, env: BuildEnv): string =>
  env === 'production'
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`
    : 'User-agent: *\nDisallow: /\n';
