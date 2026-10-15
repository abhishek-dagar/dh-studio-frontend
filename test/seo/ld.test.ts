import { describe, expect, it } from 'vitest';
import { breadcrumbLd, techArticleLd } from '../../src/lib/seo/ld';

const site = new URL('https://example.dev');

describe('techArticleLd', () => {
  it('describes a guide with its canonical URL and date', () => {
    expect(
      techArticleLd({ site, path: '/docs/install/macos', title: 'Install on macOS', description: 'd', updated: new Date('2026-10-15') }),
    ).toEqual({
      '@type': 'TechArticle',
      headline: 'Install on macOS',
      description: 'd',
      dateModified: '2026-10-15',
      url: 'https://example.dev/docs/install/macos/',
      isPartOf: { '@type': 'WebSite', name: 'DH Studio', url: 'https://example.dev/' },
    });
  });
});

describe('breadcrumbLd', () => {
  it('numbers each item from 1 with its canonical URL', () => {
    expect(
      breadcrumbLd(site, [
        { name: 'Docs', path: '/docs/' },
        { name: 'Install', path: '/docs/install/' },
      ]),
    ).toEqual({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Docs', item: 'https://example.dev/docs/' },
        { '@type': 'ListItem', position: 2, name: 'Install', item: 'https://example.dev/docs/install/' },
      ],
    });
  });
});
