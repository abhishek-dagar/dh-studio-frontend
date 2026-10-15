import { docsHref } from '../site';

// Docs navigation (spec 0009, Value sourcing). Pure: the pages pass the groups
// from `docsIndex` and the guides from the `docs` collection, and get back the
// sidebar tree, previous and next, and breadcrumbs. A guide's group, URL and
// breadcrumb all come from its id (`install/macos`), never from a field.

export interface DocsGroup {
  readonly key: string;
  readonly label: string;
  readonly description: string;
  readonly order: number;
}

export interface DocsGuide {
  /** The file path under `src/content/docs/` without `.md`, for example `install/macos`. */
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly sidebarLabel: string;
  readonly order: number;
}

export interface DocsBranch {
  readonly group: DocsGroup;
  readonly guides: readonly DocsGuide[];
}

export type DocsTree = readonly DocsBranch[];

export interface Crumb {
  readonly label: string;
  /** Absent on the last crumb, the page you are on. */
  readonly href?: string;
}

/** `install/macos` gives `install`. */
export const guideGroup = (id: string): string => id.split('/')[0] ?? '';

/** `install/macos` gives `macos`. */
export const guideSlug = (id: string): string => id.split('/').slice(1).join('/');

export const groupHref = (key: string): string => `${docsHref}${key}/`;

export const guideHref = (id: string): string => `${docsHref}${id}/`;

const byOrder = <T extends { readonly order: number }>(a: T, b: T): number => a.order - b.order;

/** Groups by `order`, each with its guides by `order` (AC-3). Guides in no known group are left out; rules.ts reports them. */
export const docsTree = (groups: readonly DocsGroup[], guides: readonly DocsGuide[]): DocsTree =>
  [...groups].sort(byOrder).map((group) => ({
    group,
    guides: guides.filter((guide) => guideGroup(guide.id) === group.key).sort(byOrder),
  }));

/** Every guide in sidebar order, across groups. */
export const flatGuides = (tree: DocsTree): readonly DocsGuide[] => tree.flatMap((branch) => branch.guides);

export const findBranch = (tree: DocsTree, key: string): DocsBranch | undefined =>
  tree.find((branch) => branch.group.key === key);

export interface Neighbors {
  readonly previous?: DocsGuide;
  readonly next?: DocsGuide;
}

/** The guides before and after this one in full sidebar order, across groups (AC-6). */
export const neighbors = (tree: DocsTree, id: string): Neighbors => {
  const guides = flatGuides(tree);
  const index = guides.findIndex((guide) => guide.id === id);
  if (index === -1) return {};
  const previous = guides[index - 1];
  const next = guides[index + 1];
  return { ...(previous === undefined ? {} : { previous }), ...(next === undefined ? {} : { next }) };
};

/** `Docs › <group>` on a group page, `Docs › <group> › <guide>` on a guide (AC-5, AC-6). */
export const docsCrumbs = (docsLabel: string, group: DocsGroup, guide?: DocsGuide): readonly Crumb[] =>
  guide === undefined
    ? [{ label: docsLabel, href: docsHref }, { label: group.label }]
    : [
        { label: docsLabel, href: docsHref },
        { label: group.label, href: groupHref(group.key) },
        { label: guide.sidebarLabel },
      ];
