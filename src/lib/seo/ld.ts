import type { ReleaseResult } from '../release/types';
import { downloadHref, licenseUrl } from '../site';
import { SITE_NAME } from './config';
import { canonicalUrl } from './head';

// Structured data for Home (spec 0004, AC-5 to AC-7, AC-12). Honest by design:
// no aggregateRating or review, so Google shows no stars.

export type JsonLdNode = Readonly<Record<string, unknown>>;

export type SoftwareAppInput = {
  readonly site: URL;
  readonly description: string;
  readonly release: ReleaseResult;
  readonly imageUrl: string;
};

export const softwareAppLd = ({ site, description, release, imageUrl }: SoftwareAppInput): JsonLdNode => ({
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  description,
  url: canonicalUrl('/', site),
  image: imageUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS, Windows, Linux',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  // The download page when live; GitHub's list when this build has no release data (spec 0005, AC-21).
  downloadUrl: release.status === 'live' ? canonicalUrl(downloadHref, site) : release.releasesPageUrl,
  license: licenseUrl,
  isAccessibleForFree: true,
  ...(release.status === 'live' ? { softwareVersion: release.release.version } : {}),
});

export const websiteLd = (site: URL): JsonLdNode => ({
  '@type': 'WebSite',
  name: SITE_NAME,
  url: canonicalUrl('/', site),
});

// Docs guides (spec 0009, AC-16).
export type TechArticleInput = {
  readonly site: URL;
  readonly path: string;
  readonly title: string;
  readonly description: string;
  readonly updated: Date;
};

export const techArticleLd = ({ site, path, title, description, updated }: TechArticleInput): JsonLdNode => ({
  '@type': 'TechArticle',
  headline: title,
  description,
  dateModified: updated.toISOString().slice(0, 10),
  url: canonicalUrl(path, site),
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: canonicalUrl('/', site) },
});

export type BreadcrumbItem = { readonly name: string; readonly path: string };

/** Every item carries its own page URL, the last one included, as Google asks. */
export const breadcrumbLd = (site: URL, items: readonly BreadcrumbItem[]): JsonLdNode => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: canonicalUrl(item.path, site),
  })),
});

/** One @graph, with every `<` escaped so no value can close the script tag. */
export const serializeLd = (nodes: readonly JsonLdNode[]): string =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
