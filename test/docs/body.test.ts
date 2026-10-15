import { describe, expect, it } from 'vitest';
import { markerRulesFor, splitGuide } from '../../src/lib/docs/body';

const INSTALL = ['downloads', 'install-command', 'launch-tip', 'requirements'] as const;
const installBody = '<h2>A</h2><p>{downloads}</p><p>x</p><p>{install-command}</p><p>{launch-tip}</p><p>{requirements}</p><p>end</p>';

describe('markerRulesFor', () => {
  it('requires all four blocks on an install guide', () => {
    expect(markerRulesFor('install/macos', false)).toEqual({ allowed: INSTALL, required: INSTALL });
  });

  it('allows and requires {screenshot} on a connect guide only when screenshot is true', () => {
    expect(markerRulesFor('connect/sqlite', true)).toEqual({ allowed: ['screenshot'], required: ['screenshot'] });
    expect(markerRulesFor('connect/ssh-tunnel', false)).toEqual({ allowed: [], required: [] });
  });

  it('gives the data and shortcuts guides their one block, and others none', () => {
    expect(markerRulesFor('app/data', false).required).toEqual(['data-files']);
    expect(markerRulesFor('app/shortcuts', false).required).toEqual(['shortcuts']);
    expect(markerRulesFor('app/updating', false)).toEqual({ allowed: [], required: [] });
  });
});

describe('splitGuide', () => {
  it('splits the HTML around each block, in order', () => {
    const result = splitGuide(installBody, INSTALL, INSTALL);
    expect(result).toEqual({
      ok: true,
      value: [
        { kind: 'html', html: '<h2>A</h2>' },
        { kind: 'block', name: 'downloads' },
        { kind: 'html', html: '<p>x</p>' },
        { kind: 'block', name: 'install-command' },
        { kind: 'block', name: 'launch-tip' },
        { kind: 'block', name: 'requirements' },
        { kind: 'html', html: '<p>end</p>' },
      ],
    });
  });

  it('returns the whole body when there are no markers', () => {
    expect(splitGuide('<p>Hi</p>', [], [])).toEqual({ ok: true, value: [{ kind: 'html', html: '<p>Hi</p>' }] });
  });

  it('fails on a missing required marker, naming it', () => {
    const result = splitGuide(installBody.replace('<p>{launch-tip}</p>', ''), INSTALL, INSTALL);
    expect(result).toEqual({ ok: false, error: 'needs a line holding only {launch-tip}' });
  });

  it('fails on an unknown marker', () => {
    expect(splitGuide('<p>{video}</p>', [], [])).toEqual({ ok: false, error: 'has an unknown marker {video}' });
  });

  it('fails on a repeated marker', () => {
    expect(splitGuide('<p>{screenshot}</p><p>{screenshot}</p>', ['screenshot'], [])).toEqual({
      ok: false,
      error: 'has {screenshot} more than once',
    });
  });

  it('fails on a marker outside its group', () => {
    const result = splitGuide('<p>{downloads}</p>', ['screenshot'], []);
    expect(result).toEqual({ ok: false, error: expect.stringContaining('{downloads}, which is not allowed here') });
  });

  it('ignores a marker inside other text', () => {
    expect(splitGuide('<p>See {downloads} below</p>', [], [])).toEqual({
      ok: true,
      value: [{ kind: 'html', html: '<p>See {downloads} below</p>' }],
    });
  });
});
