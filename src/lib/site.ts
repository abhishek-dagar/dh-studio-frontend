import { GITHUB_REPO } from './release/config';

// Site wide links (spec 0002, Value sourcing). Header and Footer read only from here.

export interface SiteLink {
  readonly label: string;
  readonly href: string;
}

export const repoUrl = `https://github.com/${GITHUB_REPO}`;

// The header Download jumps to the Home result grid, which holds the right file (spec 0003, AC-13).
export const downloadHref = '/#download';

export const licenseUrl = `${repoUrl}/blob/HEAD/LICENSE`;

export const licenseLine = 'Open source under the Apache 2.0 license';

// In page anchors for the Home sections (spec 0003).
export const navLinks: readonly SiteLink[] = [
  { label: 'Features', href: '/#features' },
  { label: 'Questions', href: '/#questions' },
  { label: 'GitHub', href: repoUrl },
];

// Feature #10 adds Privacy.
export const footerLinks: readonly SiteLink[] = [
  { label: 'GitHub', href: repoUrl },
  { label: 'Releases', href: `${repoUrl}/releases` },
  { label: 'License', href: licenseUrl },
];
