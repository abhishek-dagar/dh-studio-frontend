# Analytics providers for a static Astro site on Vercel Hobby (researched 2026-10-11)

Requirements: page views + custom events with properties (download clicks: os, arch, format, placement), cookieless, no localStorage identifiers, free tier only.

1. Vercel Web Analytics
- Custom events: NOT on Hobby. Custom Events are "Included" on Pro and Enterprise only. Hobby column shows "-". https://vercel.com/docs/analytics/limits-and-pricing (last_updated 2026-08-25) and https://vercel.com/docs/analytics/custom-events ("Availability: Custom Events are available on Enterprise and Pro plans", last_updated 2026-06-26).
- Hobby limits: 50,000 events/month included, 1-month reporting window, unlimited projects, collection pauses when the cap is hit (3-day grace, then 7 days). https://vercel.com/docs/analytics/limits-and-pricing
- Pro: 2 properties per custom event; Web Analytics Plus: 8. Source: same pricing page.
- API for custom events: track() from @vercel/analytics >= 1.1.0; HTML uses window.va('event', {name, data}). https://vercel.com/docs/analytics/custom-events
- Cookieless: UNVERIFIED (not stated on fetched pages).
- Static site without adapter: the HTML snippet in the custom-events doc uses a script tag (`/<unique-path>/script.js`); the quickstart page with /_vercel/insights/script.js was NOT fetched. UNVERIFIED whether the script needs a Vercel adapter.
- Verdict: fails the custom-events requirement on Hobby.

2. Umami Cloud
- Hobby ($0): up to 100K events/month, 1 website, 6-month data retention, community support. https://umami.is/pricing (fetched 2026-10-11, via summarizing fetch; re-check the page itself).
- Custom events: attribute `data-umami-event="name"` plus `data-umami-event-*` props (string-only); `umami.track(name, data)` for richer data (numbers keep precision 4, strings up to 500 chars, up to 50 props). https://docs.umami.is/docs/track-events and https://docs.umami.is/docs/tracker-functions (the track-events docs also list a 50-char name limit).
- Cookies: "Umami does not use any cookies in the tracking code." localStorage use: UNVERIFIED. https://docs.umami.is/docs/faq
- First-party proxy: not documented on the FAQ page. Sidebar mentions "Bypass ad blockers" (not fetched). UNVERIFIED.
- Script size: UNVERIFIED.
- Verdict: best fit on paper (free, 100K/mo, custom events with props, cookieless). Verify the localStorage question and the 6-month retention before committing.

3. Plausible
- No free cloud tier. Free 30-day trial, no card. Cheapest paid: Starter $9/month for up to 10k pageviews. https://plausible.io/ (fetched 2026-10-11).
- Verdict: confirmed, not free.

4. Cloudflare Web Analytics
- Custom events: NO. FAQ says "Not yet, but we may add support for this in the future." https://developers.cloudflare.com/analytics/faq/web-analytics/
- Verdict: confirmed no custom events.

5. PostHog
- Free tier pricing: NOT verified (posthog.com/pricing not fetched). UNVERIFIED.
- Cookieless: option `cookieless_mode` with values `always` (no cookies, no session or local storage, server-side hashed identity) or `on_reject`. Must also be enabled in project settings or events are ignored. https://posthog.com/docs/libraries/js/config (fetched 2026-10-11)
- `persistence: 'memory'` exists; whether it avoids cookies and localStorage is NOT confirmed by that page (see persistence docs, not fetched).
- Script size: not stated. UNVERIFIED.
- Verdict: cookieless mode documented; free tier and size unverified.

Optional: GoatCounter free tier and event support: NOT checked (budget).

Budget used: 8 page fetches, 2 searches.

Shortlist: Umami Cloud (verify localStorage + proxy + size), PostHog cookieless (verify free tier, size, persistence). Vercel excluded on Hobby (custom events are Pro+). Plausible has no free tier. Cloudflare has no custom events.
