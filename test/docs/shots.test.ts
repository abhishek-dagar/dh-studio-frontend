import { describe, expect, it } from 'vitest';
import { byFileName, shotFileNames, shotName, shotProblems, type ShotGuide, type ShotSize } from '../../src/lib/docs/shots';

const guide = (id: string, screenshot = true): ShotGuide => ({ id, file: `src/content/docs/${id}.md`, screenshot });

const files = (entries: Record<string, ShotSize>): ReadonlyMap<string, ShotSize> => new Map(Object.entries(entries));

const SIZE = { width: 1400, height: 1000 };

describe('shotName', () => {
  it('turns the guide id into the pair name', () => {
    expect(shotName('connect/postgresql')).toBe('connect-postgresql');
    expect(shotName('app/ssh-tunnel')).toBe('app-ssh-tunnel');
  });
});

describe('shotFileNames', () => {
  it('names the dark and light files', () => {
    expect(shotFileNames('app/data')).toEqual({ dark: 'app-data.png', light: 'app-data-light.png' });
  });
});

describe('byFileName', () => {
  it('keys the glob by file name', () => {
    expect([...byFileName({ '../../assets/screenshots/docs/app-data.png': 1 })]).toEqual([['app-data.png', 1]]);
  });
});

describe('shotProblems', () => {
  const both = files({ 'connect-postgresql.png': SIZE, 'connect-postgresql-light.png': SIZE });

  it('passes a guide with both files the same size', () => {
    expect(shotProblems([guide('connect/postgresql')], both, { production: true })).toEqual([]);
  });

  it('ignores guides without a screenshot', () => {
    expect(shotProblems([guide('connect/sqlite', false)], files({}), { production: true })).toEqual([]);
  });

  it('fails production on a missing file, naming the guide and the path', () => {
    expect(shotProblems([guide('app/updating')], files({ 'app-updating.png': SIZE }), { production: true })).toEqual([
      'src/content/docs/app/updating.md sets `screenshot: true`, but src/assets/screenshots/docs/app-updating-light.png is missing',
    ]);
  });

  it('lets a missing file through outside production, for the placeholder', () => {
    expect(shotProblems([guide('app/updating')], files({}), { production: false })).toEqual([]);
  });

  it('fails every build on a size mismatch, naming both files', () => {
    const mismatched = files({ 'app-data.png': SIZE, 'app-data-light.png': { width: 1400, height: 1002 } });
    for (const production of [true, false]) {
      expect(shotProblems([guide('app/data')], mismatched, { production })).toEqual([
        'src/assets/screenshots/docs/app-data.png (1400×1000) and src/assets/screenshots/docs/app-data-light.png (1400×1002) must be the same size',
      ]);
    }
  });
});
