import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Resvg } from '@resvg/resvg-js';
import satori from 'satori';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from './config';
import { CARD_FONTS, type CardNode } from './card';

// The card's edges (spec 0004, AC-14): font files from disk and the satori to
// resvg render. Both throw on purpose, so no page ships without its card.

type FontWeight = 400 | 500 | 600;

type CardFont = {
  readonly name: string;
  readonly data: Buffer;
  readonly weight: FontWeight;
  readonly style: 'normal';
};

const FONT_FILES: readonly { readonly name: string; readonly weight: FontWeight; readonly file: string }[] = [
  { name: CARD_FONTS.sans, weight: 400, file: '@fontsource/mona-sans/files/mona-sans-latin-400-normal.woff' },
  { name: CARD_FONTS.sans, weight: 600, file: '@fontsource/mona-sans/files/mona-sans-latin-600-normal.woff' },
  { name: CARD_FONTS.mono, weight: 400, file: '@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff' },
  { name: CARD_FONTS.mono, weight: 500, file: '@fontsource/geist-mono/files/geist-mono-latin-500-normal.woff' },
];

const loadFont = async ({ name, weight, file }: (typeof FONT_FILES)[number]): Promise<CardFont> => {
  const path = join(process.cwd(), 'node_modules', file);
  try {
    return { name, weight, style: 'normal', data: await readFile(path) };
  } catch (cause) {
    throw new Error(`[og] Card font missing: ${path}. Run \`bun install\` so the Fontsource packages are present.`, { cause });
  }
};

export const loadCardFonts = (): Promise<readonly CardFont[]> => Promise.all(FONT_FILES.map(loadFont));

export const renderCard = async (tree: CardNode, fonts: readonly CardFont[]): Promise<Uint8Array<ArrayBuffer>> => {
  try {
    const svg = await satori(tree, { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, fonts: [...fonts] });
    return new Uint8Array(new Resvg(svg, { fitTo: { mode: 'width', value: OG_IMAGE_WIDTH } }).render().asPng());
  } catch (cause) {
    throw new Error(`[og] Card render failed: ${cause instanceof Error ? cause.message : String(cause)}`, { cause });
  }
};
