import type { RawAsset } from './schema';
import type { Arch, Download, Format, Os, Role } from './types';

type Rule = {
  readonly pattern: RegExp;
  readonly os: Os;
  readonly arch: Arch;
  readonly format: Format;
  readonly role: Role;
};

// Matched against the end of the asset file name, first match wins (spec 0002).
const RULES: readonly Rule[] = [
  { pattern: /_aarch64\.dmg$/, os: 'macos', arch: 'arm64', format: 'dmg', role: 'primary' },
  { pattern: /_x64\.dmg$/, os: 'macos', arch: 'x64', format: 'dmg', role: 'primary' },
  { pattern: /_x64-setup\.exe$/, os: 'windows', arch: 'x64', format: 'exe', role: 'primary' },
  { pattern: /_x64_[A-Za-z]{2,3}(?:-[A-Za-z0-9]+)*\.msi$/, os: 'windows', arch: 'x64', format: 'msi', role: 'alternate' },
  { pattern: /_amd64\.AppImage$/, os: 'linux', arch: 'x64', format: 'appimage', role: 'primary' },
  { pattern: /_amd64\.deb$/, os: 'linux', arch: 'x64', format: 'deb', role: 'alternate' },
  { pattern: /\.x86_64\.rpm$/, os: 'linux', arch: 'x64', format: 'rpm', role: 'alternate' },
];

// The four installers a release must carry to count as complete.
export const PRIMARY_SLOTS: readonly { readonly os: Os; readonly arch: Arch; readonly label: string }[] = [
  { os: 'macos', arch: 'arm64', label: 'macOS arm64 .dmg' },
  { os: 'macos', arch: 'x64', label: 'macOS x64 .dmg' },
  { os: 'windows', arch: 'x64', label: 'Windows x64 setup.exe' },
  { os: 'linux', arch: 'x64', label: 'Linux x64 .AppImage' },
];

export const classifyAsset = (asset: RawAsset): Download | null => {
  const rule = RULES.find((candidate) => candidate.pattern.test(asset.name));
  return rule
    ? {
        os: rule.os,
        arch: rule.arch,
        format: rule.format,
        role: rule.role,
        fileName: asset.name,
        url: asset.browser_download_url,
        sizeBytes: asset.size,
      }
    : null;
};
