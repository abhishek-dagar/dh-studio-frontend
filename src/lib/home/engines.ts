// The engines schema diagram layout (spec 0003, AC-24, Lane rule). Pure, so
// Engines.astro only maps the result to grid placement and anchor names, and
// adding an engine to the content never touches the component.

/** The icon keys an engine row may name; each one has an icon in Engines.astro. */
export const ENGINE_ICONS = ['sqlite', 'postgresql', 'mongodb', 'documentdb'] as const;

export type EngineIcon = (typeof ENGINE_ICONS)[number];

export type DiagramSide = 'left' | 'right';

export interface EnginePlacement {
  /** The engine's icon key, also its hub link row name and its anchor suffix. */
  readonly key: string;
  /** Index 0 goes left, then the sides alternate. */
  readonly side: DiagramSide;
  /** Position within its side, from 0, top to bottom. */
  readonly sideIndex: number;
  /** The lane's step away from the gutter's middle toward the boxes; 0 is nearest the middle. */
  readonly lane: number;
  readonly hubAnchor: string;
  readonly engineAnchor: string;
}

export interface DiagramLayout {
  readonly engines: readonly EnginePlacement[];
  /** Grid rows the taller side needs. */
  readonly rowsPerSide: number;
}

/**
 * The lane for the engine at `sideIndex` on a side holding `count` engines.
 * Engines in the top half step down to their rows and those in the bottom half
 * step up, so a stub never crosses a neighbour's lane.
 */
export const laneFor = (sideIndex: number, count: number): number =>
  sideIndex < Math.ceil(count / 2) ? sideIndex : count - 1 - sideIndex;

export const diagramLayout = (rows: readonly { readonly icon: string }[]): DiagramLayout => {
  const leftCount = Math.ceil(rows.length / 2);
  const rightCount = Math.floor(rows.length / 2);

  const engines = rows.map(({ icon }, index): EnginePlacement => {
    const side: DiagramSide = index % 2 === 0 ? 'left' : 'right';
    const sideIndex = Math.floor(index / 2);
    return {
      key: icon,
      side,
      sideIndex,
      lane: laneFor(sideIndex, side === 'left' ? leftCount : rightCount),
      hubAnchor: `--hub-${icon}`,
      engineAnchor: `--engine-${icon}`,
    };
  });

  return { engines, rowsPerSide: leftCount };
};
