// The shared `On this page` index (spec 0008, AC-6; spec 0005 changelog, AC-18
// to AC-22): what an item holds, and which one marks the section you are reading.

export interface SectionIndexBadge {
  readonly label: string;
  readonly variant: 'signal' | 'outline';
}

export interface SectionIndexItem {
  /** The id of the section the link jumps to, without `#`. */
  readonly anchor: string;
  readonly label: string;
  /** Set the label in Geist Mono, for literal values such as versions. */
  readonly mono?: boolean;
  readonly badges?: readonly SectionIndexBadge[];
}

export type AnchorTop = { readonly anchor: string; readonly top: number };

/**
 * The section you are reading: the last one whose top is at or above the reading
 * line, the first when none has reached it, and the last once the page is at its bottom.
 */
export const activeAnchor = (tops: readonly AnchorTop[], line: number, atBottom: boolean): string | undefined => {
  if (atBottom) return tops.at(-1)?.anchor;
  const reached = tops.filter((item) => item.top <= line);
  return (reached.at(-1) ?? tops[0])?.anchor;
};
