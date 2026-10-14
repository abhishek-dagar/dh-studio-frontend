import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import { latestRelease } from '../lib/release';
import { cardModel, cardTree } from '../lib/seo/card';
import { loadCardFonts, renderCard } from '../lib/seo/render';

// The social card (spec 0004, AC-3, AC-4, AC-14), drawn once per build to dist/og.png.
export const GET: APIRoute = async () => {
  const [release, home, fonts] = await Promise.all([latestRelease, getEntry('home', 'home'), loadCardFonts()]);
  if (home === undefined) throw new Error('[og] No "home" entry in src/content/home/home.yaml, so the card has no words.');

  const png = await renderCard(cardTree(cardModel(home.data.card, home.data.download.versionPrefix, release)), fonts);
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
