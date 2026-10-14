// Vertical tabs keyboard model (spec 0003, AC-18; WAI-ARIA tabs pattern with
// automatic activation). Pure, so the feature browser script stays thin.

/** The tab index a key moves to, or undefined when the key is not a tabs key. Wraps at both ends. */
export const nextTabIndex = (key: string, current: number, count: number): number | undefined => {
  if (count <= 0) return undefined;
  switch (key) {
    case 'ArrowDown':
      return (current + 1) % count;
    case 'ArrowUp':
      return (current - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return undefined;
  }
};

/** The tab to select first: the one the URL hash names, else the first. */
export const initialTabIndex = (panelIds: readonly string[], hash: string): number => {
  const index = panelIds.indexOf(hash.replace(/^#/, ''));
  return index === -1 ? 0 : index;
};
