import type { ReleaseResult } from '../release/types';
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_TYPE,
  OG_IMAGE_WIDTH,
  OG_LOCALE,
  OG_TYPE,
  SITE_NAME,
  THEME_COLORS,
  TWITTER_CARD,
  type BuildEnv,
} from './config';
import { isIndexable, withTrailingSlash } from './paths';

// Head tags for every page (spec 0004, AC-1, AC-2, AC-4, AC-10, AC-11).

export type PageMeta = {
  readonly title: string;
  readonly description: string;
};

export type HeadContext = {
  readonly site: URL;
  readonly path: string;
  readonly env: BuildEnv;
  readonly ogImageUrl: string;
  readonly imageAlt: string;
};

export type HeadTags = {
  readonly title: string;
  readonly description: string;
  readonly canonical: string;
  readonly robots: 'noindex' | null;
  readonly og: {
    readonly title: string;
    readonly description: string;
    readonly url: string;
    readonly image: string;
    readonly imageAlt: string;
    readonly type: typeof OG_TYPE;
    readonly siteName: typeof SITE_NAME;
    readonly locale: typeof OG_LOCALE;
    readonly width: typeof OG_IMAGE_WIDTH;
    readonly height: typeof OG_IMAGE_HEIGHT;
    readonly imageType: typeof OG_IMAGE_TYPE;
  };
  readonly twitterCard: typeof TWITTER_CARD;
  readonly themeColors: typeof THEME_COLORS;
};

/** The one official address of a page: absolute, always ending with a slash. */
export const canonicalUrl = (path: string, site: URL): string => new URL(withTrailingSlash(path), site).href;

/** The card URL carries the version only when live, so social caches refetch on each release. */
export const ogImageUrl = (site: URL, release: ReleaseResult): string => {
  const url = new URL(OG_IMAGE_PATH, site);
  return release.status === 'live' ? `${url.href}?v=${encodeURIComponent(release.release.version)}` : url.href;
};

export const headTags = (meta: PageMeta, ctx: HeadContext): HeadTags => {
  const canonical = canonicalUrl(ctx.path, ctx.site);
  return {
    title: meta.title,
    description: meta.description,
    canonical,
    robots: isIndexable(ctx.path, ctx.env) ? null : 'noindex',
    og: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      image: ctx.ogImageUrl,
      imageAlt: ctx.imageAlt,
      type: OG_TYPE,
      siteName: SITE_NAME,
      locale: OG_LOCALE,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      imageType: OG_IMAGE_TYPE,
    },
    twitterCard: TWITTER_CARD,
    themeColors: THEME_COLORS,
  };
};
