// SEO and social card constants (spec 0004, Value sourcing). All build time values.

/** The production origin. astro.config.mjs sets `site` from this, so pages read it back as Astro.site. */
export const SITE_URL = 'https://dh-studio-frontend.vercel.app';

export const SITE_NAME = 'DH Studio';

export const OG_TYPE = 'website';
export const OG_LOCALE = 'en_US';

export const OG_IMAGE_PATH = '/og.png';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = 'image/png';

export const TWITTER_CARD = 'summary_large_image';

/** Equal to --ground in tokens.css and the pre paint style in BaseLayout (AC-11). */
export const THEME_COLORS = { dark: '#101214', light: '#f9fafc' } as const;

/** Vercel's deploy kind, or undefined for a local build. Only `production` may be indexed. */
export type BuildEnv = 'production' | 'preview' | 'development' | undefined;

/** Astro.site when set, else the production origin, so helpers always get an absolute base. */
export const siteOrigin = (site: URL | undefined): URL => site ?? new URL(SITE_URL);
