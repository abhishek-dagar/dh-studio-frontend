// Stale guides (spec 0009, AC-13). Pure: a guide is stale when the latest
// release is a newer minor or major than the version it was checked against.
// Patch releases don't count, and the build never fails over it.

export interface CheckedGuide {
  readonly file: string;
  readonly appVersion: string;
}

const majorMinor = (version: string): readonly [number, number] | undefined => {
  const match = /^v?(\d+)\.(\d+)\./.exec(version);
  return match === null ? undefined : [Number(match[1]), Number(match[2])];
};

/** True when `checked` has a lower major, or the same major and a lower minor, than `latest`. */
export const isStale = (checked: string, latest: string): boolean => {
  const a = majorMinor(checked);
  const b = majorMinor(latest);
  if (a === undefined || b === undefined) return false;
  return a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
};

export const staleGuides = (guides: readonly CheckedGuide[], latest: string): readonly CheckedGuide[] =>
  guides.filter((guide) => isStale(guide.appVersion, latest));

/** One warning listing every stale guide, or undefined when none is. */
export const staleWarning = (guides: readonly CheckedGuide[], latest: string): string | undefined => {
  const stale = staleGuides(guides, latest);
  if (stale.length === 0) return undefined;
  const lines = stale.map((guide) => `  ${guide.file} (checked against ${guide.appVersion})`);
  return [`[docs] ${stale.length} guides were checked against an older DH Studio than ${latest}. Recheck them:`, ...lines].join('\n');
};
