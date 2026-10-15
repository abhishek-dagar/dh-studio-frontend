import { describe, expect, it } from 'vitest';
import { docsCrumbs, docsTree, flatGuides, groupHref, guideGroup, guideHref, guideSlug, neighbors } from '../../src/lib/docs/nav';

const groups = [
  { key: 'connect', label: 'Connect', description: 'c', order: 2 },
  { key: 'install', label: 'Install', description: 'i', order: 1 },
];
const guide = (id: string, order: number) => ({ id, title: id, description: id, sidebarLabel: id.split('/')[1] ?? id, order });
const guides = [guide('connect/postgresql', 2), guide('install/linux', 3), guide('install/macos', 1), guide('connect/sqlite', 1), guide('install/windows', 2)];
const tree = docsTree(groups, guides);

describe('ids and hrefs', () => {
  it('takes the group and slug from the id', () => {
    expect(guideGroup('install/macos')).toBe('install');
    expect(guideSlug('install/macos')).toBe('macos');
  });

  it('builds trailing slash URLs under /docs/', () => {
    expect(guideHref('install/macos')).toBe('/docs/install/macos/');
    expect(groupHref('connect')).toBe('/docs/connect/');
  });
});

describe('docsTree', () => {
  it('orders groups, then guides in each group, by order', () => {
    expect(tree.map((branch) => branch.group.key)).toEqual(['install', 'connect']);
    expect(flatGuides(tree).map((item) => item.id)).toEqual([
      'install/macos',
      'install/windows',
      'install/linux',
      'connect/sqlite',
      'connect/postgresql',
    ]);
  });

  it('leaves out guides in no known group', () => {
    expect(flatGuides(docsTree(groups, [guide('blog/post', 1)]))).toEqual([]);
  });
});

describe('neighbors', () => {
  it('crosses groups in sidebar order', () => {
    const around = neighbors(tree, 'install/linux');
    expect(around.previous?.id).toBe('install/windows');
    expect(around.next?.id).toBe('connect/sqlite');
  });

  it('has no previous on the first guide and no next on the last', () => {
    expect(neighbors(tree, 'install/macos').previous).toBeUndefined();
    expect(neighbors(tree, 'connect/postgresql').next).toBeUndefined();
  });

  it('is empty for an unknown id', () => {
    expect(neighbors(tree, 'nope/nope')).toEqual({});
  });
});

describe('docsCrumbs', () => {
  const install = groups[1]!;

  it('links Docs and names the group on a group page', () => {
    expect(docsCrumbs('Docs', install)).toEqual([{ label: 'Docs', href: '/docs/' }, { label: 'Install' }]);
  });

  it('links Docs and the group, then names the guide by its sidebar label', () => {
    expect(docsCrumbs('Docs', install, guide('install/macos', 1))).toEqual([
      { label: 'Docs', href: '/docs/' },
      { label: 'Install', href: '/docs/install/' },
      { label: 'macos' },
    ]);
  });
});
