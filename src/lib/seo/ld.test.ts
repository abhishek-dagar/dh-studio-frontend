import { describe, expect, it } from 'vitest';
import { v055Live } from '../release/v0.5.5.fixture';
import { ogImageUrl } from './head';
import { serializeLd, softwareAppLd, websiteLd } from './ld';
import { fallback, site } from './seo.fixture';

const input = (release: typeof v055Live) => ({ site, description: 'A free desktop app.', release, imageUrl: ogImageUrl(site, release) });

describe('softwareAppLd', () => {
  it('describes a free developer app with the live version and its release page', () => {
    expect(softwareAppLd(input(v055Live))).toEqual({
      '@type': 'SoftwareApplication',
      name: 'DH Studio',
      description: 'A free desktop app.',
      url: 'https://dh-studio-frontend.vercel.app/',
      image: 'https://dh-studio-frontend.vercel.app/og.png?v=0.5.5',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Windows, Linux',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      downloadUrl: 'https://github.com/OnlyDev-India/data-hive-studio/releases/tag/v0.5.5',
      license: 'https://github.com/OnlyDev-India/data-hive-studio/blob/HEAD/LICENSE',
      isAccessibleForFree: true,
      softwareVersion: '0.5.5',
    });
  });

  it('leaves out the version and points at the releases page on fallback', () => {
    const node = softwareAppLd(input(fallback));
    expect(node).not.toHaveProperty('softwareVersion');
    expect(node['downloadUrl']).toBe('https://github.com/OnlyDev-India/data-hive-studio/releases');
    expect(node['image']).toBe('https://dh-studio-frontend.vercel.app/og.png');
  });

  it('never carries ratings or reviews', () => {
    const node = softwareAppLd(input(v055Live));
    expect(node).not.toHaveProperty('aggregateRating');
    expect(node).not.toHaveProperty('review');
  });
});

describe('serializeLd', () => {
  it('wraps the nodes in one @graph', () => {
    expect(JSON.parse(serializeLd([websiteLd(site)]))).toEqual({
      '@context': 'https://schema.org',
      '@graph': [{ '@type': 'WebSite', name: 'DH Studio', url: 'https://dh-studio-frontend.vercel.app/' }],
    });
  });

  it('escapes < so a value cannot close the script tag', () => {
    const json = serializeLd([{ '@type': 'Thing', description: 'a </script><b>' }]);
    expect(json).not.toContain('<');
    expect(json).toContain('\\u003c/script>');
    expect(JSON.parse(json)['@graph'][0].description).toBe('a </script><b>');
  });
});
