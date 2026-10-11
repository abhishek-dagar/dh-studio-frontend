import { z } from 'astro/zod';

// Only the GitHub fields the site uses. Unknown fields are ignored; a missing
// or wrong typed field here makes the whole response `invalid-response`.

const rawAssetSchema = z.object({
  name: z.string(),
  browser_download_url: z.url(),
  size: z.number().int().nonnegative(),
});

const rawReleaseSchema = z.object({
  tag_name: z.string(),
  name: z.string().nullable(),
  // GitHub leaves this null on drafts, which are dropped before parsing.
  published_at: z.iso.datetime().nullable(),
  html_url: z.url(),
  body: z.string().nullable(),
  draft: z.boolean(),
  prerelease: z.boolean(),
  assets: z.array(rawAssetSchema),
});

export const rawReleaseListSchema = z.array(rawReleaseSchema);

export type RawAsset = z.infer<typeof rawAssetSchema>;
export type RawRelease = z.infer<typeof rawReleaseSchema>;
