// Each docs guide's own capture (spec 0010). Pure: the edge globs the files in
// src/assets/screenshots/docs/ and passes what it found. A guide's picture is
// named by its id, so no two guides can share one (AC-4).

export const SHOT_DIR = 'src/assets/screenshots/docs';

export interface ShotSize {
  readonly width: number;
  readonly height: number;
}

export interface ShotGuide {
  /** `connect/postgresql`. */
  readonly id: string;
  /** The file to name in a problem. */
  readonly file: string;
  readonly screenshot: boolean;
}

/** The pair's base name: `connect/postgresql` → `connect-postgresql`. */
export const shotName = (id: string): string => id.replaceAll('/', '-');

/** The dark and light file names of a guide's pair, without the folder. */
export const shotFileNames = (id: string): { readonly dark: string; readonly light: string } => ({
  dark: `${shotName(id)}.png`,
  light: `${shotName(id)}-light.png`,
});

/** The glob's keys reduced to file names (`connect-postgresql.png`), each with its value. */
export const byFileName = <T>(glob: Readonly<Record<string, T>>): ReadonlyMap<string, T> =>
  new Map(Object.entries(glob).map(([path, value]) => [path.split('/').at(-1) ?? path, value]));

/**
 * Every problem with the guides' captures, empty when sound. A missing file
 * fails only a production build (AC-7); elsewhere the page shows a
 * placeholder. A pair whose two files differ in size fails every build (AC-8).
 */
export const shotProblems = (
  guides: readonly ShotGuide[],
  files: ReadonlyMap<string, ShotSize>,
  { production }: { readonly production: boolean },
): readonly string[] =>
  guides
    .filter((guide) => guide.screenshot)
    .flatMap((guide) => {
      const names = shotFileNames(guide.id);
      const dark = files.get(names.dark);
      const light = files.get(names.light);
      const missing = production
        ? [names.dark, names.light]
            .filter((name) => !files.has(name))
            .map((name) => `${guide.file} sets \`screenshot: true\`, but ${SHOT_DIR}/${name} is missing`)
        : [];
      const mismatch =
        dark !== undefined && light !== undefined && (dark.width !== light.width || dark.height !== light.height)
          ? [
              `${SHOT_DIR}/${names.dark} (${dark.width}×${dark.height}) and ${SHOT_DIR}/${names.light} (${light.width}×${light.height}) must be the same size`,
            ]
          : [];
      return [...missing, ...mismatch];
    });
