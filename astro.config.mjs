// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SITE_URL } from './src/lib/seo/config.ts';
import { isListedPath } from './src/lib/seo/paths.ts';

// Static output (spec 0001). Vercel serves dist/ with no adapter.
export default defineConfig({
  output: 'static',
  // The production origin for canonical and absolute URLs (spec 0004). Change it in config.ts when a custom domain arrives.
  site: SITE_URL,
  // The sitemap lists every built page except the unlisted ones, with no lastmod (spec 0004, AC-8).
  integrations: [react(), sitemap({ filter: (page) => isListedPath(new URL(page).pathname) })],
  // The stylesheet is about 10 KB gzipped. Inlining it saves the render blocking
  // round trip that held back LCP on a throttled phone (feature 11).
  build: { inlineStylesheets: 'always' },
  // Markdown code (release notes, spec 0005) uses the theme CodeBlock uses, so it swaps with the site theme.
  markdown: { shikiConfig: { theme: 'css-variables' } },
  // Self hosted fonts (spec 0002). Downloaded at build time, served from our own origin.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Mona Sans',
      cssVariable: '--font-mona',
      weights: ['200 900'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      display: 'swap',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Geist Mono',
      cssVariable: '--font-geist',
      weights: ['100 900'],
      styles: ['normal'],
      subsets: ['latin'],
      display: 'swap',
      fallbacks: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
    },
  ],
  // Release data env (spec 0002), validated at build time.
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      VERCEL_ENV: envField.enum({
        context: 'server',
        access: 'public',
        values: ['production', 'preview', 'development'],
        optional: true,
      }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
    // Island dependencies are only found when the browser first asks for an
    // island, and the dev server's runtime re-optimize leaves them as stale
    // 504s, so islands never hydrate in dev. Bundling them at startup avoids
    // that path. Add a package here when an island starts importing it.
    optimizeDeps: {
      include: [
        '@base-ui/react/accordion',
        '@base-ui/react/select',
        '@base-ui/react/tooltip',
        'class-variance-authority',
        'clsx',
        'lucide-react',
      ],
    },
  },
});
