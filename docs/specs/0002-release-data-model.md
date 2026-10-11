# 0002. Build time release data from GitHub with a typed fallback

**Date**: 2026-10-10
**Status**: In Progress

## Summary

The site reads DH Studio's GitHub releases once per build and turns the newest stable, fully uploaded release into a small typed object: the version, the date, the notes, and one download file per platform plus alternates. If GitHub fails, previews and local builds get a typed fallback that links to the GitHub releases page, while a production build stops so Vercel keeps serving the last good deploy. A new release reaches the live site through a Vercel deploy hook (a URL that starts a rebuild) called at the end of the app's release workflow. This closes the two items spec 0001 deferred: release freshness and the GitHub rate limit.

## Context

The site exists to get developers to download DH Studio, so the version, date and download links must be correct. Spec 0001 made the site fully static (`output: 'static'`, no adapter, no server), so release data can only be read at build time, and nothing reaches the live site without a rebuild.

The releases live on `OnlyDev-India/data-hive-studio` (latest `v0.5.5`, published 2026-10-04). Each release carries 20 assets: installers for macOS (`_aarch64.dmg`, `_x64.dmg`), Windows (`_x64-setup.exe`, `_x64_en-US.msi`) and Linux (`_amd64.AppImage`, `_amd64.deb`, `.x86_64.rpm`), plus `.sig` files, updater tarballs, `latest.json`, `SHA256SUMS.txt`, `install.sh` and `install.ps1`. File names embed the version, so there is no stable direct URL per platform.

The app's release workflow (`dh-studio/.github/workflows/release.yml`) publishes the release (`releaseDraft: false`) before its four platform jobs finish uploading, with `fail-fast: false`. So the newest release can be missing files for minutes, or forever if one platform job fails. A version with a `-` suffix is published as a prerelease.

GitHub's REST API allows 60 unauthenticated requests an hour per IP, and Vercel build machines share IPs. Project rules require expected failures to return a typed result rather than throw, env vars to go through `astro:env`, and plain TS helpers in `src/lib/`. Home (#6) needs this now; a later Download page and Changelog will reuse it.

## Requirements

**User stories**:
- As a visitor, I want to see the current DH Studio version and its release date so that I know the site is up to date.
- As a visitor, I want a download link for my OS that always points at a real file so that I never land on a broken or missing build.
- As the maintainer, I want a new app release to show up on the site without touching this repo so that releasing stays one step.
- As the maintainer, I want a GitHub outage to never replace the live site with broken or empty data.

**Acceptance criteria** (the contract, each criterion is IDed and independently checkable):
- **AC-1**: A build with GitHub reachable produces `{ status: 'live', release }` whose `version`, `tag`, `name`, `publishedAt`, `pageUrl` and `notes` come from the newest release that is not a draft, not a prerelease, and complete (AC-4). Against today's data: `version` is `0.5.5`, `publishedAt` is `2026-10-04T10:28:23Z`.
- **AC-2**: The live release exposes exactly one `primary` download for each of macOS arm64 (`.dmg`), macOS x64 (`.dmg`), Windows x64 (`setup.exe`) and Linux x64 (`.AppImage`), each with `fileName`, `url` and `sizeBytes`, plus `alternate` downloads for `.msi`, `.deb` and `.rpm` when present. `.sig`, `.tar.gz`, `latest.json`, `SHA256SUMS.txt`, `install.sh` and `install.ps1` never appear.
- **AC-3**: `pickDownloads(release, os, arch?)` returns `{ primary, alternates }` for that OS. On macOS with no arch it returns the arm64 `.dmg` as primary and the x64 `.dmg` among the alternates. On Windows and Linux with no arch it returns the x64 primary.
- **AC-4**: A release counts as complete only when all four primaries in AC-2 are present. If the newest stable release is incomplete, the newest complete stable release among the 10 most recent is used, and the build log names each skipped tag and its missing primaries. If none of the 10 is complete, the result is a fallback with reason `no-complete-release`.
- **AC-5**: A prerelease or draft is never chosen, even when it is the newest release.
- **AC-6**: When GitHub fails (network error, timeout, non 2xx, rate limit, response that fails validation, or no complete release), a non production build (Vercel preview, local `astro build`, dev server) succeeds with `{ status: 'fallback', releasesPageUrl, reason }`, where `releasesPageUrl` is `https://github.com/OnlyDev-India/data-hive-studio/releases`, and logs one warning naming the reason.
- **AC-7**: When `VERCEL_ENV` is `production`, a fallback result fails the build with an error message that names the reason, so Vercel keeps serving the previous deploy.
- **AC-8**: Each GitHub request times out after 10 seconds and is retried once on a network error, timeout or 5xx. A 4xx (including 403 and 429 rate limit) is not retried.
- **AC-9**: When `GITHUB_TOKEN` is set it is sent as a bearer token; when unset the build still works unauthenticated. The token value never appears in `dist/`.
- **AC-10**: A build makes one GitHub API request (plus at most one retry), no matter how many pages read the release.
- **AC-11**: When a stable release's platform builds succeed in dh-studio's release workflow, the workflow triggers a production deploy of this site. A prerelease does not trigger it.
- **AC-12**: `notes` holds the release body as raw Markdown (empty string when the body is null). Nothing renders it in this feature.

## Options considered

### Option 1: Plain `src/lib/release/` helpers, list endpoint with walk back, deploy hook

Pure functions validate, classify and pick; one fetch at the edge reads `GET /repos/{owner}/{repo}/releases?per_page=10`, memoized for the whole build. Freshness comes from a deploy hook called by the app's release workflow.

**Pros**:
- Pure core is trivial to unit test against a recorded release, and the tagged union fits a plain function return
- The list endpoint lets the walk back pick the newest complete release in the same single request
- New releases go live within minutes, with no change to this repo per release

**Cons**:
- Touches a second repo (the app's release workflow) and needs a secret there
- Memoizing across pages relies on Vite evaluating the module once per build

### Option 2: Astro content layer loader

A custom loader in `src/content.config.ts` fills a `release` collection, read with `getEntry`.

**Pros**:
- Idiomatic Astro for remote data, with a schema and a data store between builds

**Cons**:
- The `live | fallback` union and the walk back fit awkwardly in a collection entry schema
- The data store cache between builds adds a staleness path to reason about

### Option 3: `/releases/latest` endpoint with gaps linking to the release page

Read GitHub's `latest` release and send any platform without a file to the release page.

**Pros**:
- Simplest call, always the freshest version number

**Cons**:
- During upload, or after a failed platform job, some visitors get no direct download
- Cannot fall back to an older complete release

### Option 4: Fetch in the browser from an island

**Pros**:
- Always fresh with no rebuild

**Cons**:
- Adds JS and a loading state to the most important button, and the 60 an hour unauthenticated limit applies per visitor IP
- Contradicts spec 0001's static, build time model and hurts SEO for the version

## Decision

**Chosen option**: Option 1: Plain `src/lib/release/` helpers, list endpoint with walk back, deploy hook

Read the 10 most recent releases once per build, choose the newest stable complete one, expose it as a validated `ReleaseResult` union, fail only production builds on fallback, and trigger rebuilds from the app's release workflow through a Vercel deploy hook.

## Rationale

Correct links are the whole job of this data, and the release workflow publishes before uploads finish. The walk back over the list endpoint is the one design that keeps every button pointing at a real file in that window and when a platform job fails, at the cost of no extra requests. Failing only production builds turns Vercel's "keep the last good deploy" into the safety net, while previews and offline local builds keep working through the typed fallback, which honors the project's no throw rule everywhere except that one deliberate edge.

The deploy hook is the smallest freshness mechanism for a static site with no adapter: the release workflow already knows exactly when a release is done. A scheduled rebuild would lag by up to a day; browser fetching throws away spec 0001's performance and SEO reasons for going static. The optional token handles shared build IPs without making local builds need a secret, and one request per build keeps usage far under even the unauthenticated limit.

Plain helpers beat a content loader here because the result is a union with a failure branch and a selection rule, not a collection of entries. Zod comes from `astro/zod`, already bundled, so no dependency is added.

## Feature design

**Data model sketch** (TypeScript types in `src/lib/release/types.ts`, all `readonly`):

| Type | Field | Type | Required | Notes |
|---|---|---|---|---|
| `Release` | `version` | `string` | yes | `tag` without the leading `v`, must match `^\d+\.\d+\.\d+$` |
| | `tag` | `string` | yes | e.g. `v0.5.5` |
| | `name` | `string` | yes | GitHub `name`; falls back to `DH Studio ${version}` when null or empty |
| | `publishedAt` | `string` (ISO 8601) | yes | GitHub `published_at` |
| | `pageUrl` | `string` (URL) | yes | GitHub `html_url` |
| | `notes` | `string` | yes | GitHub `body`, raw Markdown, `''` when null |
| | `downloads` | `readonly Download[]` | yes | 1:N, only classified installers, at least the four primaries |
| `Download` | `os` | `'macos' \| 'windows' \| 'linux'` | yes | |
| | `arch` | `'arm64' \| 'x64'` | yes | |
| | `format` | `'dmg' \| 'exe' \| 'msi' \| 'appimage' \| 'deb' \| 'rpm'` | yes | |
| | `role` | `'primary' \| 'alternate'` | yes | from the rule table |
| | `fileName` | `string` | yes | asset `name` |
| | `url` | `string` (URL) | yes | asset `browser_download_url` |
| | `sizeBytes` | `number` | yes | asset `size` |
| `ReleaseResult` | `status` | `'live'` | | with `release: Release` |
| | `status` | `'fallback'` | | with `releasesPageUrl: string`, `reason: FallbackReason` |
| `FallbackReason` | | `'network' \| 'timeout' \| 'http-error' \| 'rate-limited' \| 'invalid-response' \| 'no-complete-release'` | | `rate-limited` = 403 or 429 with `x-ratelimit-remaining: 0`; other non 2xx = `http-error` |

Classification rules (`src/lib/release/classify.ts`), matched against the asset file name, first match wins, unmatched assets are dropped:

| Pattern (end of file name) | os | arch | format | role |
|---|---|---|---|---|
| `_aarch64.dmg` | macos | arm64 | dmg | primary |
| `_x64.dmg` | macos | x64 | dmg | primary |
| `_x64-setup.exe` | windows | x64 | exe | primary |
| `_x64_<locale>.msi` (e.g. `_x64_en-US.msi`) | windows | x64 | msi | alternate |
| `_amd64.AppImage` | linux | x64 | appimage | primary |
| `_amd64.deb` | linux | x64 | deb | alternate |
| `.x86_64.rpm` | linux | x64 | rpm | alternate |

**State transitions**: none. Selection over the fetched list is: drop drafts and prereleases → keep GitHub's order (newest first) → validate and classify each → first one with all four primaries is chosen.

**API surface** (module functions, no HTTP endpoints; all public at build time):

| Function | Kind | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| `classifyAsset(asset)` | pure | `{ name, browser_download_url, size }` | `Download \| null` | n/a | unmatched → `null` |
| `parseRelease(raw)` | pure | one validated GitHub release object | `{ ok: true, release } \| { ok: false, missing: readonly string[] }` | n/a | incomplete → `missing` lists absent primaries |
| `selectLatest(rawList)` | pure | `unknown` (the API JSON) | `{ result: ReleaseResult, skipped: readonly { tag, missing }[] }` | n/a | schema failure → fallback `invalid-response`; none complete → `no-complete-release` |
| `pickDownloads(release, os, arch?)` | pure | `Release`, `os`, optional `arch` | `{ primary: Download, alternates: readonly Download[] }` | n/a | none (completeness guarantees a primary) |
| `fetchReleaseList(deps)` | edge (fetch) | `token?`, `fetch`, `timeoutMs = 10000` | `{ ok: true, json } \| { ok: false, reason }` | optional bearer | network, timeout, 4xx, 5xx after one retry |
| `latestRelease` | edge (module const) | env via `astro:env/server` | `Promise<ReleaseResult>` | n/a | production + fallback → rejects with a message naming the reason (AC-7) |

Request: `GET https://api.github.com/repos/OnlyDev-India/data-hive-studio/releases?per_page=10` with headers `Accept: application/vnd.github+json`, `X-GitHub-Api-Version: 2022-11-28`, `User-Agent: dh-studio-website`, and `Authorization: Bearer <GITHUB_TOKEN>` only when set.

**Value sourcing**:

| Action | Value produced / displayed | Source |
|---|---|---|
| `selectLatest` | which release is "latest" | derived: first item of the API list with `draft: false`, `prerelease: false`, and all four primaries |
| `parseRelease` | `version` | derived from `tag_name` minus leading `v` |
| `parseRelease` | `tag`, `name`, `publishedAt`, `pageUrl`, `notes` | API fields `tag_name`, `name`, `published_at`, `html_url`, `body` |
| `classifyAsset` | `os`, `arch`, `format`, `role` | the classification rule table above, matched on asset `name` |
| `classifyAsset` | `fileName`, `url`, `sizeBytes` | asset `name`, `browser_download_url`, `size` |
| `pickDownloads` | arch when not given | decided here: macOS → `arm64`, Windows and Linux → `x64` |
| `pickDownloads` | `alternates` | every other `Download` with the same `os` (other arch and alternate formats), primaries first |
| fallback | `releasesPageUrl` | derived from the repo constant: `https://github.com/${GITHUB_REPO}/releases` |
| fallback | `reason` | the failed step (fetch, validation, or selection) |
| `latestRelease` | strict or lenient | `VERCEL_ENV` via `astro:env` (`production` = strict, anything else or unset = lenient) |
| `fetchReleaseList` | owner and repo | `GITHUB_REPO = 'OnlyDev-India/data-hive-studio'` exported from `src/lib/release/config.ts` |
| `fetchReleaseList` | token | `GITHUB_TOKEN` via `astro:env/server` (optional secret) |
| `fetchReleaseList` | walk back depth | constant `RELEASE_SCAN_DEPTH = 10` in `config.ts` |
| build log | skipped tags, fallback reason | `selectLatest`'s `skipped` list and the result `reason` |

**Key invariants**:
- A `live` release always has exactly one primary per (macOS arm64, macOS x64, Windows x64, Linux x64), so `pickDownloads` never returns an empty primary.
- At most one `Download` per (`os`, `arch`, `format`); on a duplicate, the first in API order wins.
- A prerelease or draft is never `live`.
- The GitHub response is validated with a Zod schema (`astro/zod`) that names only the fields used; unknown fields are ignored, missing or wrong typed used fields mean `invalid-response`.
- `latestRelease` is a module level constant promise in `src/lib/release/index.ts`, so the fetch runs once per build process (AC-10). Pages `await` it; nothing else calls `fetchReleaseList`.
- Throwing is allowed in exactly one place: `latestRelease` in strict mode on a fallback. Every other function returns a result.

**Security model**: All data is public. `GITHUB_TOKEN` is a fine grained token with no repository permissions (public read only), declared `context: 'server', access: 'secret'`, used only inside `fetchReleaseList` at build time and never passed to an island or rendered. The Vercel deploy hook URL is a secret stored only in the dh-studio repo's Actions secrets; anyone holding it can trigger a rebuild, nothing more. No PII, no compliance scope.

**Configuration required**:
- `GITHUB_TOKEN` (this repo, Vercel project env, optional): raises the build's GitHub rate limit; declared in `astro.config.mjs` `env.schema` as `envField.string({ context: 'server', access: 'secret', optional: true })`.
- `VERCEL_ENV` (set by Vercel automatically): declared as `envField.enum({ context: 'server', access: 'public', values: ['production', 'preview', 'development'], optional: true })`.
- `VERCEL_DEPLOY_HOOK_URL` (dh-studio repo, Actions secret): prerequisite, create a deploy hook in the website's Vercel project for its production branch, then store the URL in the app repo.

**Critical test scenarios** (each maps to an acceptance criterion in ## Requirements):
- Happy path: a recorded `v0.5.5` list response yields `live`, version `0.5.5`, four primaries, three alternates, no `.sig` or tarballs, verifies **AC-1**, **AC-2**, **AC-12**
- Picker: macOS without arch returns the `_aarch64.dmg` primary with the `_x64.dmg` in alternates; Linux returns the `.AppImage` with `.deb` and `.rpm`, verifies **AC-3**
- Walk back: a list whose newest stable release lacks the Windows `setup.exe` selects the next release and reports the skipped tag; a list with no complete release yields `no-complete-release`, verifies **AC-4**
- Prerelease newer than stable is ignored, verifies **AC-5**
- Failure: a fetch stub that times out twice yields fallback `timeout` in lenient mode and a rejected `latestRelease` naming `timeout` in strict mode, verifies **AC-6**, **AC-7**, **AC-8**
- Retry rules: a 503 then 200 succeeds on the retry; a 403 with `x-ratelimit-remaining: 0` yields `rate-limited` with no retry, verifies **AC-8**
- Auth: the token appears only in the request header stub, and a `grep` of `dist/` for its value finds nothing, verifies **AC-9**
- One request: two pages awaiting `latestRelease` in one build trigger a single fetch, verifies **AC-10**

## Build plan

Tracer Bullet: first prove one real thread (GitHub to a version on the deployed page), then thicken with platforms, safety and freshness.

1. **Thin thread.** Add `src/lib/release/` with `config.ts` (repo constant, scan depth), `types.ts`, the Zod schema, `fetchReleaseList` (no retry or token yet), `selectLatest` with a minimal `parseRelease`, and `latestRelease`. Show the live version and date (or the fallback link) on the scaffold `src/pages/index.astro` as a temporary proof, and confirm it on a Vercel preview, satisfies **AC-1**, **AC-6**
2. **All platforms.** Add `classifyAsset` with the full rule table, completeness in `parseRelease`, and `pickDownloads`, satisfies **AC-2**, **AC-3**, **AC-12**
3. **Selection safety.** Drop drafts and prereleases, walk back over the 10 releases, log skipped tags and missing primaries, satisfies **AC-4**, **AC-5**
4. **Failure handling.** Add the 10 second timeout with `AbortSignal.timeout`, one retry on network, timeout and 5xx, the rate limit reason, the warning log, and module level memoization, satisfies **AC-6**, **AC-8**, **AC-10**
5. **Env and strict mode.** Declare `GITHUB_TOKEN` and `VERCEL_ENV` in the `astro:env` schema, send the bearer token when set, fail the build on fallback when `VERCEL_ENV` is `production`; add the token in Vercel project settings, satisfies **AC-7**, **AC-9**
6. **Freshness.** Create the Vercel deploy hook for the production branch, store it as `VERCEL_DEPLOY_HOOK_URL` in dh-studio, and add a final `deploy-website` job to `dh-studio/.github/workflows/release.yml` with `needs: [check-version, build, install-scripts]`, `if: needs.build.result == 'success' && needs.check-version.outputs.prerelease == 'false'`, running `curl -fsS -X POST "$VERCEL_DEPLOY_HOOK_URL"`, satisfies **AC-11**
7. **Tidy the proof.** Keep the temporary version line on the scaffold page until Home (#6) replaces it; Home consumes `latestRelease` and `pickDownloads` from here, satisfies **AC-1**

## Consequences

**Positive**:
- Every download link on the live site points at a real file, even while a release uploads or after a failed platform job
- A GitHub outage never downgrades the live site; previews and offline local work still build
- New releases go live minutes after the release workflow finishes, with no commit to this repo
- One request per build, far under any rate limit

**Negative / tradeoffs**:
- If one platform job fails, the whole site stays on the previous version (fresher Mac users wait for the fix release)
- A GitHub outage blocks unrelated production deploys of this site until it recovers (retry the deploy later)
- File names are matched by pattern, so a naming change in the app's Tauri build silently drops a file and makes releases incomplete; the walk back then pins the site to an old version until the rules are updated
- Freshness depends on a secret in another repo; if the hook is deleted or the job fails, the site lags until the next push here
- The dev server holds the fetched release until it restarts

**Neutral**:
- `notes` includes the "Full commit history" tail of the release body; trimming is the Changelog's call
- Showing size as `17 MB`, OS detection in the browser, and the button UI belong to Home (#6)
- Vitest arrives with the tooling feature (#2); the pure functions are written to be tested from a recorded `v0.5.5` response

## Follow-up

- [ ] When the Download page or Changelog is designed, decide checksums (`SHA256SUMS.txt`) and notes rendering and trimming; this spec carries neither
- [ ] Spec 0001's two follow ups (release freshness, GitHub rate limit) are decided here; tick them when this feature ships
- [ ] If the app ever ships a Linux arm64 or Windows arm64 build, extend the rule table and the completeness set together
- [ ] Optional safety net if the hook ever proves unreliable: a daily scheduled GitHub Action in this repo that calls the same hook
