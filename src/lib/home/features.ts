// The feature browser's list checks (spec 0003, AC-18 and AC-20). Pure: the
// page reads the collection and decides what to do with the result.

export interface FeatureEntryLike {
  readonly id: string;
  readonly data: { readonly order: number; readonly image?: unknown; readonly home?: boolean };
}

/** The entries Home's browser shows (spec 0008, AC-14): only `home: true`, in the order given. */
export const homeFeatures = <T extends FeatureEntryLike>(entries: readonly T[]): readonly T[] =>
  entries.filter((entry) => entry.data.home === true);

/** Why Home's browser can't be built, or undefined: it needs at least one `home: true` entry (spec 0008, AC-10). */
export const homeListProblem = (entries: readonly FeatureEntryLike[]): string | undefined =>
  homeFeatures(entries).length > 0
    ? undefined
    : '[features] Home needs at least one feature with `home: true` in src/content/features/, or its feature browser renders empty.';

/** The entries in sidebar order, as a new array. */
export const orderFeatures = <T extends FeatureEntryLike>(entries: readonly T[]): readonly T[] =>
  [...entries].sort((a, b) => a.data.order - b.data.order);

/** Ids of entries that share an `order` with another entry. */
export const duplicateOrders = (entries: readonly FeatureEntryLike[]): readonly string[] =>
  entries
    .filter((entry) => entries.some((other) => other !== entry && other.data.order === entry.data.order))
    .map((entry) => entry.id);

/** Ids of entries with no screenshot yet. */
export const missingScreenshots = (entries: readonly FeatureEntryLike[]): readonly string[] =>
  entries.filter((entry) => entry.data.image === undefined).map((entry) => entry.id);

/**
 * Why this list can't be built, or undefined when it can. A shared order is
 * always a problem; a missing screenshot only in production, where the page
 * must show the real app (preview and local builds show a placeholder).
 */
export const featureListProblem = (
  entries: readonly FeatureEntryLike[],
  { production }: { readonly production: boolean },
): string | undefined => {
  const shared = duplicateOrders(entries);
  if (shared.length > 0) return `[features] These entries share an order: ${shared.join(', ')}.`;
  const missing = production ? missingScreenshots(entries) : [];
  if (missing.length > 0) {
    return `[features] A production build needs a screenshot for every feature. Missing: ${missing.join(', ')}. Add an image in src/content/features/.`;
  }
  return undefined;
};
