// The questions table (spec 0003, AC-21). Pure: the page reads the `faq`
// collection and renders what these return.

/** An answer's plain text as paragraphs: a blank line starts a new one. */
export const toParagraphs = (text: string): readonly string[] =>
  text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, ' ').trim())
    .filter((paragraph) => paragraph.length > 0);
