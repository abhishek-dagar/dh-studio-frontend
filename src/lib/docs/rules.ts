import { OS_ORDER } from '../home/download';
import type { Os } from '../release/types';
import { docsHref } from '../site';
import { groupHref, guideGroup, guideHref } from './nav';

// Rules across guides and collections (spec 0009, AC-12). The schema checks one
// guide at a time; these check the set: folders, order, one install guide per
// system, the install and screenshot fields, and the links on /docs/. Each
// problem names the file. Marker rules are checked per guide by splitGuide.

/** The groups whose guides may show a picture (spec 0010, AC-6). */
const SCREENSHOT_GROUPS: readonly string[] = ['connect', 'app'];

export interface GuideFacts {
  /** `install/macos`. */
  readonly id: string;
  /** The file to name in a problem, for example `src/content/docs/install/macos.md`. */
  readonly file: string;
  readonly order: number;
  readonly os?: Os | undefined;
  readonly requirements?: readonly unknown[] | undefined;
  readonly screenshot: boolean;
  readonly screenshotAlt?: string | undefined;
}

const guideProblems = (guide: GuideFacts, groupKeys: readonly string[]): readonly string[] => {
  const group = guideGroup(guide.id);
  const install = group === 'install';
  return [
    ...(guide.id.split('/').length !== 2
      ? [`${guide.file} must sit one folder deep, in src/content/docs/<group>/<guide>.md`]
      : []),
    ...(groupKeys.includes(group)
      ? []
      : [`${guide.file} is in the folder "${group}", which is not a docsIndex group (${groupKeys.join(', ')})`]),
    ...(install && guide.os === undefined ? [`${guide.file} is an install guide, so it needs \`os\``] : []),
    ...(install && guide.requirements === undefined ? [`${guide.file} is an install guide, so it needs \`requirements\``] : []),
    ...(!install && guide.os !== undefined ? [`${guide.file} sets \`os\`, which only install guides may set`] : []),
    ...(!install && guide.requirements !== undefined
      ? [`${guide.file} sets \`requirements\`, which only install guides may set`]
      : []),
    ...(guide.screenshot && !SCREENSHOT_GROUPS.includes(group)
      ? [`${guide.file} sets \`screenshot\`, which only connect and app guides may set`]
      : []),
    ...(guide.screenshot && guide.screenshotAlt === undefined
      ? [`${guide.file} sets \`screenshot: true\`, so it needs \`screenshotAlt\``]
      : []),
  ];
};

/** Each guide's picture is its own, so no two may share an alt (spec 0010, AC-6). */
const duplicateAlts = (guides: readonly GuideFacts[]): readonly string[] =>
  guides.flatMap((guide, index) => {
    const twin = guides.find(
      (other, otherIndex) => otherIndex < index && guide.screenshotAlt !== undefined && other.screenshotAlt === guide.screenshotAlt,
    );
    return twin === undefined ? [] : [`${guide.file} and ${twin.file} share the same \`screenshotAlt\``];
  });

const duplicateOrders = (guides: readonly GuideFacts[]): readonly string[] =>
  guides.flatMap((guide, index) => {
    const twin = guides.find(
      (other, otherIndex) => otherIndex < index && guideGroup(other.id) === guideGroup(guide.id) && other.order === guide.order,
    );
    return twin === undefined ? [] : [`${guide.file} and ${twin.file} share order ${guide.order} in "${guideGroup(guide.id)}"`];
  });

const systemProblems = (guides: readonly GuideFacts[]): readonly string[] => {
  const install = guides.filter((guide) => guideGroup(guide.id) === 'install' && guide.os !== undefined);
  const twins = install.flatMap((guide, index) => {
    const twin = install.find((other, otherIndex) => otherIndex < index && other.os === guide.os);
    return twin === undefined ? [] : [`${guide.file} and ${twin.file} are both install guides for os: ${guide.os}`];
  });
  const missing = OS_ORDER.filter((os) => !install.some((guide) => guide.os === os)).map(
    (os) => `No install guide sets os: ${os}; add src/content/docs/install/<name>.md for it`,
  );
  return [...twins, ...missing];
};

/** Every docs page the build emits (AC-1), so a link on /docs/ can be checked against it. */
export const docsPages = (groupKeys: readonly string[], guides: readonly Pick<GuideFacts, 'id'>[]): ReadonlySet<string> =>
  new Set([docsHref, ...groupKeys.map(groupHref), ...guides.map((guide) => guideHref(guide.id))]);

/** Every rule break across the guides, empty when the set is sound. */
export const docsProblems = (
  guides: readonly GuideFacts[],
  groupKeys: readonly string[],
  links: readonly string[],
): readonly string[] => {
  const pages = docsPages(groupKeys, guides);
  return [
    ...guides.flatMap((guide) => guideProblems(guide, groupKeys)),
    ...duplicateOrders(guides),
    ...duplicateAlts(guides),
    ...systemProblems(guides),
    ...links
      .filter((href) => !pages.has(href))
      .map((href) => `src/content/docs-index/docs-index.yaml links to ${href}, which is not a docs page`),
  ];
};
