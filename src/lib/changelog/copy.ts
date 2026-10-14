import { SITE_NAME } from '../seo/config';
import type { ChangelogFilter } from './views';

// Changelog words and the strings built from them (spec 0005, AC-2, AC-13, AC-17).
// The copy lives in src/content/changelog/changelog.yaml; this is its shape.

type PerFilter = Readonly<Record<ChangelogFilter, string>>;

export type ChangelogCopy = {
  readonly heading: string;
  readonly titles: PerFilter & { readonly page: string; readonly version: string };
  readonly descriptions: PerFilter & { readonly page: string; readonly version: string };
  readonly editor: {
    readonly tab: string;
    readonly queries: Readonly<Record<ChangelogFilter, readonly string[]>>;
    readonly rowsWord: string;
  };
  readonly filter: PerFilter & { readonly label: string };
  readonly pages: { readonly label: string; readonly newer: string; readonly older: string; readonly position: string };
  readonly entry: {
    readonly latest: string;
    readonly prerelease: string;
    readonly github: string;
    readonly emptyNotes: string;
  };
  readonly index: { readonly label: string };
  readonly release: { readonly heading: string; readonly notesHeading: string; readonly allReleases: string };
  readonly subscribe: string;
  readonly everyRelease: string;
  readonly everyReleaseLink: string;
  readonly unavailable: string;
  readonly unavailableLink: string;
};

/** Replaces each `{name}` with its value; an unknown name stays as written. */
export const fill = (template: string, values: Readonly<Record<string, string | number>>): string =>
  template.replace(/\{(\w+)\}/g, (match, name: string) => (name in values ? String(values[name]) : match));

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

/** "4 Oct 2026", in UTC so the day matches GitHub wherever the build runs. */
export const formatReleaseDate = (iso: string): string => {
  const date = new Date(iso);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()] ?? ''} ${date.getUTCFullYear()}`;
};

export type PageSubject =
  | { readonly kind: 'list'; readonly filter: ChangelogFilter; readonly page: number; readonly pageCount: number }
  | { readonly kind: 'version'; readonly version: string; readonly publishedAt: string };

const withSite = (title: string): string => `${title} · ${SITE_NAME}`;

/** `Changelog · DH Studio`, `Changelog: stable releases, page 2 · DH Studio`, `0.5.5 release notes · DH Studio`. */
export const pageTitle = (subject: PageSubject, copy: ChangelogCopy): string => {
  if (subject.kind === 'version') return withSite(fill(copy.titles.version, { version: subject.version }));
  const title = copy.titles[subject.filter];
  return withSite(subject.page > 1 ? fill(copy.titles.page, { title, page: subject.page }) : title);
};

export const pageDescription = (subject: PageSubject, copy: ChangelogCopy): string => {
  if (subject.kind === 'version') {
    return fill(copy.descriptions.version, { version: subject.version, date: formatReleaseDate(subject.publishedAt) });
  }
  const description = copy.descriptions[subject.filter];
  return subject.page > 1 ? fill(copy.descriptions.page, { description, page: subject.page, count: subject.pageCount }) : description;
};
