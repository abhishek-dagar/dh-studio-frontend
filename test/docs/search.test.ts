import { describe, expect, it } from 'vitest';
import { cleanExcerpt, countLabel, toHit } from '../../src/lib/docs/search';

describe('cleanExcerpt', () => {
  it('keeps mark and drops every other tag', () => {
    expect(cleanExcerpt('Set the <mark>SSL</mark> <b>mode</b><img src=x onerror=alert(1)>')).toBe('Set the <mark>SSL</mark> mode');
  });

  it('strips attributes from mark', () => {
    expect(cleanExcerpt('<mark class="x" onclick="y">a</MARK>')).toBe('<mark>a</mark>');
  });

  it('leaves escaped text alone', () => {
    expect(cleanExcerpt('a &lt;script&gt; b')).toBe('a &lt;script&gt; b');
  });
});

describe('toHit', () => {
  it('takes the title from meta and cleans the excerpt', () => {
    expect(toHit({ url: '/docs/app/data/', excerpt: '<em>x</em> <mark>y</mark>', meta: { title: 'Where your data lives' } })).toEqual({
      url: '/docs/app/data/',
      title: 'Where your data lives',
      excerpt: 'x <mark>y</mark>',
    });
  });

  it('falls back to the URL without a title', () => {
    expect(toHit({ url: '/docs/x/', excerpt: '' }).title).toBe('/docs/x/');
  });
});

describe('countLabel', () => {
  it('fills the count, or says none matched', () => {
    expect(countLabel(3, '{n} guides found', 'No guides match')).toBe('3 guides found');
    expect(countLabel(0, '{n} guides found', 'No guides match')).toBe('No guides match');
  });
});
