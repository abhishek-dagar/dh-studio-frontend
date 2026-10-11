import { clsx } from 'clsx';

// Class names for the result grid (spec 0002, AC-11). The styles live in
// components/editor/result-grid.css and work on any real <table>, from
// .astro or an island. Mark the highlighted row with `data-current`.
export const resultClass = {
  /** Mono cell: literal values such as file names, versions and sizes. */
  mono: 'mono',
  /** The cell holding the row's action. Full width when the grid stacks. */
  action: 'action',
  /** A Geist Mono 12px bar on the ground, under a grid or an editor pane. */
  statusBar: 'status-bar',
} as const;

/** The table's class. `stack` turns each row into a block below md. */
export const resultGridClass = ({ stack = false }: { readonly stack?: boolean } = {}): string =>
  clsx('result-grid', stack && 'stack');
