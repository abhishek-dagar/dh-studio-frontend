import { describe, expect, it } from 'vitest';
import { queryPath } from '../../src/lib/not-found/path';

describe('queryPath', () => {
  it('keeps a plain path as it is', () => {
    expect(queryPath('/pricing')).toBe('/pricing');
  });

  it('decodes percent escapes', () => {
    expect(queryPath('/caf%C3%A9%20menu')).toBe('/café menu');
  });

  it('doubles every single quote', () => {
    expect(queryPath("/it's/o'clock")).toBe("/it''s/o''clock");
  });

  it('falls back to the raw path when decoding fails, and still escapes it', () => {
    expect(queryPath("/it's%E0%A4%A")).toBe("/it''s%E0%A4%A");
  });

  it('keeps a path of exactly 64 characters whole', () => {
    const path = `/${'a'.repeat(63)}`;
    expect(queryPath(path)).toBe(path);
  });

  it('cuts a longer path to 63 characters plus an ellipsis', () => {
    const result = queryPath(`/${'a'.repeat(199)}`);
    expect(result).toBe(`/${'a'.repeat(62)}…`);
    expect(Array.from(result)).toHaveLength(64);
  });

  it('caps before escaping, so a quote at the cut is never split', () => {
    const result = queryPath(`/${'a'.repeat(61)}'bbbb`);
    expect(result).toBe(`/${'a'.repeat(61)}''…`);
  });

  it('counts characters, not UTF-16 units, so an emoji is never cut in half', () => {
    const result = queryPath(`/${'😀'.repeat(80)}`);
    expect(result).toBe(`/${'😀'.repeat(62)}…`);
  });

  it('works on its own source, the way the page inlines it', () => {
    const inlined = new Function(`return (${queryPath.toString()})`)() as typeof queryPath;
    expect(inlined("/it's%20here")).toBe("/it''s here");
  });
});
