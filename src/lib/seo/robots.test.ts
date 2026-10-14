import { describe, expect, it } from 'vitest';
import { robotsTxt } from './robots';
import { site } from './seo.fixture';

describe('robotsTxt', () => {
  it('allows all and names the sitemap in production', () => {
    expect(robotsTxt(site, 'production')).toBe(
      'User-agent: *\nAllow: /\n\nSitemap: https://dh-studio-frontend.vercel.app/sitemap-index.xml\n',
    );
  });

  it('disallows all with no sitemap in any other build', () => {
    for (const env of ['preview', 'development', undefined] as const) {
      expect(robotsTxt(site, env)).toBe('User-agent: *\nDisallow: /\n');
    }
  });
});
