// Release source settings (spec 0002). All values are build time constants.

export const GITHUB_REPO = 'OnlyDev-India/data-hive-studio';

// How many recent releases the walk back may scan for a complete one.
export const RELEASE_SCAN_DEPTH = 10;

export const REQUEST_TIMEOUT_MS = 10_000;

export const RELEASES_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases?per_page=${RELEASE_SCAN_DEPTH}`;

export const RELEASES_PAGE_URL = `https://github.com/${GITHUB_REPO}/releases`;

// The one line installers the app repo publishes with every release (its README, Download).
export const INSTALL_SH_URL = `https://github.com/${GITHUB_REPO}/releases/latest/download/install.sh`;

export const INSTALL_PS1_URL = `https://github.com/${GITHUB_REPO}/releases/latest/download/install.ps1`;
