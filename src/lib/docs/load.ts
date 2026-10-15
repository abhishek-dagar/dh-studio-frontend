import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { docsTree, type DocsGuide, type DocsTree } from './nav';
import { docsProblems, type GuideFacts } from './rules';

// Loads the docs collections for the docs pages (spec 0009). The one edge of
// lib/docs: everything it calls is pure. A broken rule fails the build here,
// naming every file at once (AC-12), so a writer fixes them in one pass.

export type DocsEntry = CollectionEntry<'docs'>;
export type DocsIndex = CollectionEntry<'docsIndex'>['data'];

export interface DocsData {
  readonly index: DocsIndex;
  readonly entries: readonly DocsEntry[];
  readonly tree: DocsTree;
}

/** The file a problem names. */
export const guideFile = (entry: DocsEntry): string => entry.filePath ?? `src/content/docs/${entry.id}.md`;

export const toGuide = (entry: DocsEntry): DocsGuide => ({
  id: entry.id,
  title: entry.data.title,
  description: entry.data.description,
  sidebarLabel: entry.data.sidebarLabel,
  order: entry.data.order,
});

const toFacts = (entry: DocsEntry): GuideFacts => ({
  id: entry.id,
  file: guideFile(entry),
  order: entry.data.order,
  os: entry.data.os,
  requirements: entry.data.requirements,
  screenshot: entry.data.screenshot,
  screenshotAlt: entry.data.screenshotAlt,
});

export const loadDocs = async (): Promise<DocsData> => {
  const [index, entries] = await Promise.all([getEntry('docsIndex', 'docsIndex'), getCollection('docs')]);
  if (index === undefined) {
    throw new Error(
      '[docs] No "docsIndex" entry. Check that src/content/docs-index/docs-index.yaml holds one entry with the id "docsIndex". ' +
        'If src/content.config.ts was added while the dev server ran, restart it so the collection syncs.',
    );
  }

  const problems = docsProblems(
    entries.map(toFacts),
    index.data.groups.map((group) => group.key),
    index.data.gettingStarted.flatMap((step) => step.links.map((link) => link.href)),
  );
  if (problems.length > 0) {
    throw new Error(`[docs] The guides break ${problems.length} rules (spec 0009, AC-12):\n  ${problems.join('\n  ')}`);
  }

  return { index: index.data, entries, tree: docsTree(index.data.groups, entries.map(toGuide)) };
};
