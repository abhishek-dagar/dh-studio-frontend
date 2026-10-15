import { guideGroup } from './nav';

// The guide body split (spec 0009, Markers). Pure: the page passes the rendered
// Markdown in and gets back HTML parts with the blocks between them. A line
// holding only `{name}` renders to `<p>{name}</p>`, as privacy's `{files}` does.

/** Every block a guide can place, one component each in components/docs/. */
export const MARKERS = [
  'downloads',
  'install-command',
  'launch-tip',
  'requirements',
  'screenshot',
  'data-files',
  'shortcuts',
] as const;

export type Marker = (typeof MARKERS)[number];

export type Part = { readonly kind: 'html'; readonly html: string } | { readonly kind: 'block'; readonly name: Marker };

export type Result<T> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: string };

export interface MarkerRules {
  readonly allowed: readonly Marker[];
  readonly required: readonly Marker[];
}

const INSTALL_MARKERS: readonly Marker[] = ['downloads', 'install-command', 'launch-tip', 'requirements'];

/** Which markers a guide may and must hold, from its id and its `screenshot` flag (spec 0009, Markers table). */
export const markerRulesFor = (id: string, screenshot: boolean): MarkerRules => {
  if (guideGroup(id) === 'install') return { allowed: INSTALL_MARKERS, required: INSTALL_MARKERS };
  if (guideGroup(id) === 'connect') return screenshot ? { allowed: ['screenshot'], required: ['screenshot'] } : { allowed: [], required: [] };
  if (id === 'app/data') return { allowed: ['data-files'], required: ['data-files'] };
  if (id === 'app/shortcuts') return { allowed: ['shortcuts'], required: ['shortcuts'] };
  return { allowed: [], required: [] };
};

const MARKER_LINE = /<p>\{([a-z][a-z0-9-]*)\}<\/p>/g;

const isMarker = (name: string): name is Marker => (MARKERS as readonly string[]).includes(name);

/**
 * Splits the body at its marker lines (AC-7, AC-12). An unknown, repeated or
 * not allowed marker, or a missing required one, is an error the page turns
 * into a build failure naming the file.
 */
export const splitGuide = (html: string, allowed: readonly Marker[], required: readonly Marker[]): Result<readonly Part[]> => {
  const found = [...html.matchAll(MARKER_LINE)];
  const names = found.map((match) => match[1] ?? '');

  const unknown = names.find((name) => !isMarker(name));
  if (unknown !== undefined) return { ok: false, error: `has an unknown marker {${unknown}}` };

  const repeated = names.find((name, index) => names.indexOf(name) !== index);
  if (repeated !== undefined) return { ok: false, error: `has {${repeated}} more than once` };

  const outside = names.find((name) => !(allowed as readonly string[]).includes(name));
  if (outside !== undefined) {
    const may = allowed.length === 0 ? 'no markers' : allowed.map((name) => `{${name}}`).join(', ');
    return { ok: false, error: `has {${outside}}, which is not allowed here (this guide may hold ${may})` };
  }

  const missing = required.find((name) => !names.includes(name));
  if (missing !== undefined) return { ok: false, error: `needs a line holding only {${missing}}` };

  // The HTML before each marker, then after the last one; blank chunks are dropped.
  const blocks = found.map((match) => ({
    start: match.index ?? 0,
    end: (match.index ?? 0) + match[0].length,
    name: match[1] as Marker,
  }));
  const starts = [0, ...blocks.map((block) => block.end)];
  const parts = starts.flatMap((from, index): Part[] => {
    const block = blocks[index];
    const chunk = html.slice(from, block?.start ?? html.length);
    return [
      ...(chunk.trim() === '' ? [] : [{ kind: 'html' as const, html: chunk }]),
      ...(block === undefined ? [] : [{ kind: 'block' as const, name: block.name }]),
    ];
  });
  return { ok: true, value: parts };
};
