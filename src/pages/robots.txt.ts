import type { APIRoute } from 'astro';
import { VERCEL_ENV } from 'astro:env/server';
import { siteOrigin } from '../lib/seo/config';
import { robotsTxt } from '../lib/seo/robots';

// robots.txt (spec 0004, AC-9): open on production, closed on every other build.
export const GET: APIRoute = ({ site }) =>
  new Response(robotsTxt(siteOrigin(site), VERCEL_ENV), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
