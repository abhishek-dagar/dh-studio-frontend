// The privacy notice body (spec 0007). Pure: the page passes the rendered
// Markdown in and gets back the two halves around the files grid, with the
// operator and contact filled in from the frontmatter.

/** The paragraph a line holding only `{files}` renders to. The grid goes here (AC-13). */
export const FILES_MARKER = '<p>{files}</p>';

const OPERATOR = '{operator}';
const CONTACT = '{contact}';

export interface PrivacyBody {
  readonly before: string;
  readonly after: string;
}

export type BodyResult = { readonly ok: true; readonly value: PrivacyBody } | { readonly ok: false; readonly error: string };

const count = (text: string, part: string): number => text.split(part).length - 1;

const escapeHtml = (text: string): string =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const fill = (html: string, operator: string, contact: string): string => {
  const email = escapeHtml(contact);
  return html
    .replaceAll(OPERATOR, escapeHtml(operator))
    .replaceAll(CONTACT, `<a href="mailto:${email}">${email}</a>`);
};

/**
 * Splits the body at its one `{files}` paragraph and fills `{operator}` and
 * `{contact}` (AC-11, AC-13). A missing or repeated marker, or a body that never
 * names the operator or the contact, is an error the page turns into a build failure.
 */
export const privacyBody = (html: string, operator: string, contact: string): BodyResult => {
  const markers = count(html, FILES_MARKER);
  if (markers !== 1) {
    return {
      ok: false,
      error: `needs exactly one line holding only {files}, where the files grid goes, but has ${markers}`,
    };
  }
  if (!html.includes(OPERATOR)) return { ok: false, error: 'never names {operator}' };
  if (!html.includes(CONTACT)) return { ok: false, error: 'never gives {contact}' };
  const [before = '', after = ''] = html.split(FILES_MARKER);
  return { ok: true, value: { before: fill(before, operator, contact), after: fill(after, operator, contact) } };
};
