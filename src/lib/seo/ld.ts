import type { ReleaseResult } from '../release/types';
import { licenseUrl } from '../site';
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
  downloadUrl: release.status === 'live' ? release.release.pageUrl : release.releasesPageUrl,
  license: licenseUrl,
  isAccessibleForFree: true,
  ...(release.status === 'live' ? { softwareVersion: release.release.version } : {}),
});

export const websiteLd = (site: URL): JsonLdNode => ({
  '@type': 'WebSite',
  name: SITE_NAME,
  url: canonicalUrl('/', site),
});

/** One @graph, with every `<` escaped so no value can close the script tag. */
export const serializeLd = (nodes: readonly JsonLdNode[]): string =>
  JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
