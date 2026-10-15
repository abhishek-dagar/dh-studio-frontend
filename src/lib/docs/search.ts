// Search result shaping for the DocsSearch island (spec 0009, AC-14). Pure, so
// the island only handles loading and state.

/** Results shown at most; Pagefind's data() is loaded for these only. */
export const RESULT_LIMIT = 8;

export interface SearchHit {
  readonly url: string;
  readonly title: string;
  /** Text with `<mark>` around matches and nothing else. */
  readonly excerpt: string;
}

/** The fields DocsSearch reads from a Pagefind result's data(). */
export interface PagefindData {
  readonly url: string;
  readonly excerpt: string;
  readonly meta?: { readonly title?: string | undefined } | undefined;
}

const TAG = /<\/?([a-zA-Z][a-zA-Z0-9-]*)(?:\s[^>]*)?\/?>/g;

/** Strips every tag except a bare `<mark>` and `</mark>`, so the excerpt can go in as HTML. */
export const cleanExcerpt = (html: string): string =>
  html.replace(TAG, (tag, name: string) => {
    if (name.toLowerCase() !== 'mark') return '';
    return tag.startsWith('</') ? '</mark>' : '<mark>';
  });

export const toHit = (data: PagefindData): SearchHit => ({
  url: data.url,
  title: data.meta?.title?.trim() || data.url,
  excerpt: cleanExcerpt(data.excerpt),
});

/** The polite announcement: `found` with `{n}` filled, or `empty` when nothing matched. */
export const countLabel = (count: number, found: string, empty: string): string =>
  count === 0 ? empty : found.replaceAll('{n}', String(count));
