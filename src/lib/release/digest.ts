import type { Release } from './types';

// Checksums for the download page (spec 0005). They come from the `digest`
// GitHub returns on every asset, so a hash always belongs to its own file.

const DIGEST_PATTERN = /^sha256:([0-9a-f]{64})$/i;

/** `sha256:<64 hex>` gives the lowercase hex; anything else means not published. */
export const parseDigest = (digest: string | null | undefined): string | undefined => {
  const match = digest == null ? null : DIGEST_PATTERN.exec(digest);
  return match?.[1]?.toLowerCase();
};

/** The file names of a release's downloads that carry no usable checksum. */
export const missingDigests = (release: Release): readonly string[] =>
  release.downloads.filter((download) => download.sha256 === undefined).map((download) => download.fileName);
