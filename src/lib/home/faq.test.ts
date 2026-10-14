import { describe, expect, it } from 'vitest';
import { toParagraphs } from './faq';

describe('toParagraphs', () => {
  it('keeps a single paragraph', () => {
    expect(toParagraphs('Yes, it is free.')).toEqual(['Yes, it is free.']);
  });

  it('splits on a blank line, even one holding spaces', () => {
    expect(toParagraphs('First.\n\nSecond.\n  \nThird.')).toEqual(['First.', 'Second.', 'Third.']);
  });

  it('joins soft line breaks inside a paragraph', () => {
    expect(toParagraphs('One line\nwraps here.')).toEqual(['One line wraps here.']);
  });

  it('drops leading, trailing and empty paragraphs', () => {
    expect(toParagraphs('\n\nOnly this.\n\n\n')).toEqual(['Only this.']);
    expect(toParagraphs('')).toEqual([]);
  });
});
