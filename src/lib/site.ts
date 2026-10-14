import { GITHUB_REPO } from './release/config';

// Site wide links (spec 0002, Value sourcing). Header and Footer read only from here.

export interface SiteLink {
  readonly label: string;
  readonly href: string;
}

export const repoUrl = `https://github.com/${GITHUB_REPO}`;

// Every Download link on the site goes to the download page (spec 0005, AC-17).
export const downloadHref = '/download/';

export const licenseUrl = `${repoUrl}/blob/HEAD/LICENSE`;

export const licenseLine = 'Open source under the Apache 2.0 license';

export const changelogHref = '/changelog/';

export const featuresHref = '/features/';

// Header links. Features is the features page (spec 0008, AC-8); Download is the
// header's own button, so it is not repeated here.
export const navLinks: readonly SiteLink[] = [
  { label: 'Features', href: featuresHref },
  { label: 'Changelog', href: changelogHref },
  { label: 'GitHub', href: repoUrl },
];

// Features opens the list (spec 0008, AC-8); Privacy closes it, after License (spec 0007, AC-1).
export const footerLinks: readonly SiteLink[] = [
  { label: 'Features', href: featuresHref },
  { label: 'Download', href: downloadHref },
  { label: 'Changelog', href: changelogHref },
  { label: 'GitHub', href: repoUrl },
  { label: 'Releases', href: `${repoUrl}/releases` },
  { label: 'License', href: licenseUrl },
  { label: 'Privacy', href: '/privacy/' },
];
