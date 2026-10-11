import { describe, expect, it } from 'vitest';
import { v055Live } from '../release/v0.5.5.fixture';
import { canonicalUrl, headTags, ogImageUrl } from './head';
import { fallback, site } from './seo.fixture';

describe('canonicalUrl', () => {
  it('is absolute on the production origin and ends with a slash', () => {
    expect(canonicalUrl('/', site)).toBe('https://dh-studio-frontend.vercel.app/');
    expect(canonicalUrl('/design-system/', site)).toBe('https://dh-studio-frontend.vercel.app/design-system/');
  });

  it('adds the slash a dev server path leaves off', () => {
    expect(canonicalUrl('/design-system', site)).toBe('https://dh-studio-frontend.vercel.app/design-system/');
  });
});

describe('ogImageUrl', () => {
  it('carries the version when the release is live', () => {
    expect(ogImageUrl(site, v055Live)).toBe('https://dh-studio-frontend.vercel.app/og.png?v=0.5.5');
  });

  it('has no query on fallback', () => {
    expect(ogImageUrl(site, fallback)).toBe('https://dh-studio-frontend.vercel.app/og.png');
  });
});

describe('headTags', () => {
  const meta = { title: 'Home title', description: 'Home description' };
  const ctx = { site, path: '/', env: 'production', ogImageUrl: ogImageUrl(site, v055Live), imageAlt: 'Card alt' } as const;

  it('fills every Open Graph and Twitter value, og:url equal to the canonical', () => {
    const tags = headTags(meta, ctx);
    expect(tags.canonical).toBe('https://dh-studio-frontend.vercel.app/');
    expect(tags.og).toEqual({
      title: 'Home title',
      description: 'Home description',
      url: tags.canonical,
      image: 'https://dh-studio-frontend.vercel.app/og.png?v=0.5.5',
      imageAlt: 'Card alt',
      type: 'website',
      siteName: 'DH Studio',
      locale: 'en_US',
      width: 1200,
      height: 630,
      imageType: 'image/png',
    });
    expect(tags.twitterCard).toBe('summary_large_image');
    expect(tags.themeColors).toEqual({ dark: '#101214', light: '#f9fafc' });
  });

  it('has no robots tag on a listed page in production', () => {
    expect(headTags(meta, ctx).robots).toBeNull();
  });

  it('is noindex on an unlisted page in production', () => {
    expect(headTags(meta, { ...ctx, path: '/design-system/' }).robots).toBe('noindex');
  });

  it('is noindex on every page outside production', () => {
    expect(headTags(meta, { ...ctx, env: 'preview' }).robots).toBe('noindex');
    expect(headTags(meta, { ...ctx, env: undefined }).robots).toBe('noindex');
  });
});
