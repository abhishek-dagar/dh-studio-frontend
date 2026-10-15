import { describe, expect, it } from 'vitest';
import { docsPages, docsProblems, type GuideFacts } from '../../src/lib/docs/rules';

const GROUPS = ['install', 'connect', 'app'];

const facts = (id: string, extra: Partial<GuideFacts> = {}): GuideFacts => ({
  id,
  file: `src/content/docs/${id}.md`,
  order: 1,
  screenshot: false,
  ...extra,
});

const install = (id: string, os: 'macos' | 'windows' | 'linux', order: number) =>
  facts(id, { os, order, requirements: [{ label: 'System', value: 'x' }] });

const sound = [
  install('install/macos', 'macos', 1),
  install('install/windows', 'windows', 2),
  install('install/linux', 'linux', 3),
  facts('connect/sqlite', { screenshot: true, screenshotAlt: 'The form' }),
  facts('connect/ssh-tunnel', { order: 2 }),
  facts('app/data'),
];

describe('docsProblems', () => {
  it('passes a sound set', () => {
    expect(docsProblems(sound, GROUPS, ['/docs/install/macos/', '/docs/connect/'])).toEqual([]);
  });

  it('names a guide in an unknown folder', () => {
    expect(docsProblems([...sound, facts('blog/news')], GROUPS, [])).toContainEqual(expect.stringContaining('src/content/docs/blog/news.md is in the folder "blog"'));
  });

  it('names a guide nested too deep', () => {
    expect(docsProblems([...sound, facts('app/more/deep', { order: 5 })], GROUPS, [])).toContainEqual(
      expect.stringContaining('must sit one folder deep'),
    );
  });

  it('names two guides sharing an order in a group', () => {
    expect(docsProblems([...sound, facts('app/updating')], GROUPS, [])).toContainEqual(
      'src/content/docs/app/updating.md and src/content/docs/app/data.md share order 1 in "app"',
    );
  });

  it('needs os and requirements on install guides', () => {
    const problems = docsProblems([...sound.slice(1), facts('install/macos')], GROUPS, []);
    expect(problems).toContainEqual('src/content/docs/install/macos.md is an install guide, so it needs `os`');
    expect(problems).toContainEqual('src/content/docs/install/macos.md is an install guide, so it needs `requirements`');
    expect(problems).toContainEqual(expect.stringContaining('No install guide sets os: macos'));
  });

  it('refuses two install guides for one system', () => {
    expect(docsProblems([...sound, install('install/bsd', 'linux', 4)], GROUPS, [])).toContainEqual(
      'src/content/docs/install/bsd.md and src/content/docs/install/linux.md are both install guides for os: linux',
    );
  });

  it('refuses os, requirements or screenshot outside their groups', () => {
    const problems = docsProblems([...sound, facts('app/updating', { order: 3, os: 'macos', requirements: [], screenshot: true })], GROUPS, []);
    expect(problems).toContainEqual(expect.stringContaining('sets `os`'));
    expect(problems).toContainEqual(expect.stringContaining('sets `requirements`'));
    expect(problems).toContainEqual(expect.stringContaining('sets `screenshot`'));
  });

  it('needs screenshotAlt on a connect guide with a screenshot', () => {
    expect(docsProblems([...sound, facts('connect/mongodb', { order: 3, screenshot: true })], GROUPS, [])).toContainEqual(
      'src/content/docs/connect/mongodb.md sets `screenshot: true`, so it needs `screenshotAlt`',
    );
  });

  it('names a /docs/ link to a page that is not built', () => {
    expect(docsProblems(sound, GROUPS, ['/docs/app/shortcuts/'])).toEqual([
      'src/content/docs-index/docs-index.yaml links to /docs/app/shortcuts/, which is not a docs page',
    ]);
  });
});

describe('docsPages', () => {
  it('lists /docs/, each group page and each guide page', () => {
    expect([...docsPages(['install'], [{ id: 'install/macos' }])]).toEqual(['/docs/', '/docs/install/', '/docs/install/macos/']);
  });
});
