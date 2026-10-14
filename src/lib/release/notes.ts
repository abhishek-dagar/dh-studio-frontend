// Release notes made safe and fitted to the changelog outline (spec 0005, AC-4, AC-5).
// prepareNotes runs on the markdown before Astro renders it, finishNotesHtml on
// the HTML after. Both work on strings: the HTML comes from Astro's own
// renderer, which always quotes attributes with double quotes.

type Line = { readonly text: string; readonly code: boolean };

type Fence = { readonly char: string; readonly length: number };

const FENCE_OPEN = /^ {0,3}(`{3,}|~{3,})/;
const ATX_HEADING = /^( {0,3})(#{1,6})(?=[ \t]|$)/;
const BOLD_ONLY = /^ {0,3}(\*\*|__)(?=\S)((?:(?!\1).)+?)(?<=\S)\1[ \t]*$/;
const SETEXT_UNDERLINE = /^ {0,3}(=+|-+)[ \t]*$/;
const THEMATIC_BREAK = /^ {0,3}([-*_])(?:[ \t]*\1){2,}[ \t]*$/;
const BLOCK_START = /^ {0,3}(?:[-*+][ \t]|\d{1,9}[.)][ \t]|#{1,6}(?:[ \t]|$)|>|`{3,}|~{3,})/;
/** Autolinks the AC keeps: `<https://…>`, `<http://…>`, `<mailto:…>`. */
const AUTOLINK = /^<(?:https?|mailto):[^\s<>]*>/i;

const isBlank = (text: string | undefined): boolean => text === undefined || text.trim() === '';

/** A line that can belong to a plain paragraph (so it may sit above a setext underline). */
const isParagraphText = (text: string): boolean =>
  !isBlank(text) && !BLOCK_START.test(text) && !THEMATIC_BREAK.test(text) && !/^ {4}/.test(text);

/** A line after which a new paragraph must start: blank, a rule, or a heading. */
const closesParagraph = (line: Line | undefined): boolean =>
  line === undefined || line.code || isBlank(line.text) || THEMATIC_BREAK.test(line.text) || ATX_HEADING.test(line.text);

/** Marks every line inside a fenced code block, fences included, so no transform touches code. */
const markCode = (lines: readonly string[]): readonly Line[] =>
  lines.reduce<{ readonly out: readonly Line[]; readonly open: Fence | null }>(
    ({ out, open }, text) => {
      if (open !== null) {
        const closes = new RegExp(`^ {0,3}${open.char === '`' ? '`' : '~'}{${open.length},}[ \\t]*$`).test(text);
        return { out: [...out, { text, code: true }], open: closes ? null : open };
      }
      const fence = FENCE_OPEN.exec(text)?.[1];
      // A backtick fence's info string may not hold a backtick.
      const opens = fence !== undefined && !(fence.startsWith('`') && text.slice(text.indexOf(fence) + fence.length).includes('`'));
      return opens
        ? { out: [...out, { text, code: true }], open: { char: fence[0] ?? '`', length: fence.length } }
        : { out: [...out, { text, code: false }], open: null };
    },
    { out: [], open: null },
  ).out;

const shiftedHashes = (count: number): string => '#'.repeat(Math.min(6, count + 2));

/**
 * `Title` over `===` becomes `# Title`, over `---` becomes `## Title`, when it is
 * a whole paragraph, so the ATX pass below shifts it like any other heading.
 */
const foldSetext = (lines: readonly Line[]): readonly Line[] =>
  lines.reduce<readonly Line[]>((out, line) => {
    const underline = line.code ? null : SETEXT_UNDERLINE.exec(line.text);
    if (underline === null) return [...out, line];
    const runStart = out.findLastIndex((prev) => prev.code || !isParagraphText(prev.text)) + 1;
    const run = out.slice(runStart);
    // Only a whole paragraph turns into a heading; under a list item the text is a lazy continuation.
    const wholeParagraph = run.length > 0 && closesParagraph(out[runStart - 1]);
    if (!wholeParagraph) return [...out, line];
    const level = underline[1]?.startsWith('=') ? 1 : 2;
    const text = run.map((prev) => prev.text.trim()).join(' ');
    return [...out.slice(0, runStart), { text: `${'#'.repeat(level)} ${text}`, code: false }];
  }, []);

/** Shifts ATX headings down two levels and turns a bold only paragraph into a level 3 heading. */
const restructure = (lines: readonly Line[]): readonly Line[] =>
  lines.map((line, index) => {
    if (line.code) return line;
    const atx = ATX_HEADING.exec(line.text);
    if (atx !== null) {
      const [whole, indent = '', hashes = ''] = atx;
      return { ...line, text: `${indent}${shiftedHashes(hashes.length)}${line.text.slice(whole.length)}` };
    }
    const bold = BOLD_ONLY.exec(line.text);
    if (bold === null) return line;
    const prev = lines[index - 1];
    const next = lines[index + 1];
    const startsParagraph = closesParagraph(prev);
    const endsParagraph = next === undefined || next.code || isBlank(next.text) || BLOCK_START.test(next.text);
    return startsParagraph && endsParagraph ? { ...line, text: `### ${bold[2] ?? ''}` } : line;
  });

/**
 * Astro's renderer reads a leading `---` or `+++` block as frontmatter and
 * would drop it, so a body that opens that way keeps its first line as text
 * (a `---` rule becomes the equal `***` rule).
 */
const guardFrontmatter = (lines: readonly Line[]): readonly Line[] => {
  const first = lines.findIndex((line) => !isBlank(line.text));
  const line = lines[first];
  if (line === undefined || line.code || !/^\s*(?:---|\+\+\+)/.test(line.text)) return lines;
  const text = /^\s*-{3,}\s*$/.test(line.text) ? '***' : `\\${line.text.trimStart()}`;
  return lines.map((other, index) => (index === first ? { ...other, text } : other));
};

const escapeText = (text: string): string =>
  text.replace(/</g, (match, offset: number) => (AUTOLINK.test(text.slice(offset)) ? match : '&lt;'));

/** Escapes `<` outside code spans. Tokens alternate between text and backtick runs. */
const escapeTokens = (tokens: readonly string[]): string => {
  const [head, ...rest] = tokens;
  if (head === undefined) return '';
  if (!head.startsWith('`')) return escapeText(head) + escapeTokens(rest);
  // A code span closes at the next run of the same length; an unmatched run is literal text.
  const close = rest.indexOf(head);
  return close === -1
    ? head + escapeTokens(rest)
    : head + rest.slice(0, close).join('') + head + escapeTokens(rest.slice(close + 1));
};

/** Code spans never cross a blank line, so each paragraph is escaped on its own. */
const escapeRawHtml = (markdown: string): string =>
  markdown
    .split(/(\n[ \t]*\n)/)
    .map((part) => escapeTokens(part.split(/(`+)/).filter((token) => token !== '')))
    .join('');

/** Joins lines back, escaping raw HTML only in the runs outside fenced code. */
const joinLines = (lines: readonly Line[]): string =>
  lines
    .reduce<readonly Line[][]>((runs, line) => {
      const last = runs.at(-1);
      return last !== undefined && last[0]?.code === line.code
        ? [...runs.slice(0, -1), [...last, line]]
        : [...runs, [line]];
    }, [])
    .map((run) => {
      const text = run.map((line) => line.text).join('\n');
      return run[0]?.code === true ? text : escapeRawHtml(text);
    })
    .join('\n');

/**
 * Release body markdown made safe and fitted: raw HTML outside code shows as
 * text (autolinks stay links), headings shift down two levels (capped at 6),
 * and a paragraph that is only bold text becomes a level 3 heading.
 */
export const prepareNotes = (body: string): string =>
  joinLines(guardFrontmatter(restructure(foldSetext(markCode(body.replace(/\r\n?/g, '\n').split('\n'))))));

const ALLOWED_SCHEMES: readonly string[] = ['http', 'https', 'mailto'];

/** An out of range code point decodes to nothing rather than throwing. */
const fromCode = (code: number): string => (code <= 0x10ffff ? String.fromCodePoint(code) : '');

const decodeEntities = (value: string): string =>
  value
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex: string) => fromCode(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);?/g, (_, dec: string) => fromCode(Number.parseInt(dec, 10)))
    .replace(/&colon;/gi, ':')
    .replace(/&(?:tab|newline);/gi, '')
    .replace(/&amp;/gi, '&');

/** True for http, https and mailto links, a `#` fragment, or a relative path. */
export const isSafeHref = (href: string): boolean => {
  // Browsers drop control characters and spaces before reading a scheme, so a check must too.
  const value = decodeEntities(href).replace(/[\u0000- \u007f]/g, '');
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(value)?.[1];
  return scheme === undefined || ALLOWED_SCHEMES.includes(scheme.toLowerCase());
};

/** Prefixes a notes heading id with its version, so ten entries on one page never share an id. */
export const notesId = (version: string, slug: string): string => `${version}-${slug}`;

/** Rendered notes HTML with version prefixed heading ids and no unsafe link targets. */
export const finishNotesHtml = (html: string, version: string): string =>
  html
    .replace(/<h[1-6]\b[^>]*>/g, (tag) => tag.replace(/\sid="([^"]*)"/, (_, id: string) => ` id="${notesId(version, id)}"`))
    .replace(/<a\b[^>]*>/g, (tag) => tag.replace(/\shref="([^"]*)"/, (attr, href: string) => (isSafeHref(href) ? attr : '')));
