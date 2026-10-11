// Release data model (spec 0002, Feature design).

export type Os = 'macos' | 'windows' | 'linux';
export type Arch = 'arm64' | 'x64';
export type Format = 'dmg' | 'exe' | 'msi' | 'appimage' | 'deb' | 'rpm';
export type Role = 'primary' | 'alternate';

export type Download = {
  readonly os: Os;
  readonly arch: Arch;
  readonly format: Format;
  readonly role: Role;
  readonly fileName: string;
  readonly url: string;
  readonly sizeBytes: number;
};

export type Release = {
  readonly version: string;
  readonly tag: string;
  readonly name: string;
  readonly publishedAt: string;
  readonly pageUrl: string;
  readonly notes: string;
  readonly downloads: readonly Download[];
};

export type FallbackReason =
  | 'network'
  | 'timeout'
  | 'http-error'
  | 'rate-limited'
  | 'invalid-response'
  | 'no-complete-release';

export type ReleaseResult =
  | { readonly status: 'live'; readonly release: Release }
  | {
      readonly status: 'fallback';
      readonly releasesPageUrl: string;
      readonly reason: FallbackReason;
    };

export type SkippedRelease = {
  readonly tag: string;
  readonly missing: readonly string[];
};
