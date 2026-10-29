import { describe, expect, it } from 'vitest';
import { isStale, staleGuides, staleWarning } from '../../src/lib/docs/stale';

describe('isStale', () => {
  it('flags a lower minor or major', () => {
    expect(isStale('0.5.6', '0.6.0')).toBe(true);
    expect(isStale('0.9.9', '1.0.0')).toBe(true);
  });

  it('ignores patch releases, the same version and older releases', () => {
    expect(isStale('0.5.6', '0.5.9')).toBe(false);
    expect(isStale('0.5.6', '0.5.6')).toBe(false);
    expect(isStale('0.6.0', '0.5.9')).toBe(false);
  });

  it('accepts a v prefix and never flags an unreadable version', () => {
    expect(isStale('0.5.6', 'v0.6.0')).toBe(true);
    expect(isStale('0.5.6', 'nightly')).toBe(false);
  });
});

describe('staleWarning', () => {
  const guides = [
    { file: 'a.md', appVersion: '0.5.6' },
    { file: 'b.md', appVersion: '0.6.0' },
  ];

  it('lists each stale guide once, with its version', () => {
    expect(staleGuides(guides, '0.6.1')).toEqual([guides[0]]);
    const warning = staleWarning(guides, '0.6.1');
    expect(warning).toContain('a.md (checked against 0.5.6)');
    expect(warning).not.toContain('b.md');
  });

  it('says nothing when every guide is current', () => {
    expect(staleWarning(guides, '0.5.9')).toBeUndefined();
  });
});
