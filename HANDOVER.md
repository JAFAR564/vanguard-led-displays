# Handover — Vanguard Architectural Displays

**Project:** marketing site for a turnkey architectural LED display installer.
**Hub:** George, Western Cape, South Africa.
**Domain:** `https://leddisplays.co.za`.
**Branch of record:** `arena/b5766503-vanguard-led-displays`.

## 1. What this build is

An Astro 5 site with eight homepage sections, an About page, a custom 404, and one on-demand
API route for enquiries. Most pages are prerendered; the form endpoint and the 404 render on
demand so the standalone Node adapter can serve them correctly.

The build replaces the previous cinematic/scrollytelling site. The frame sequences, canvas scrub
engine, duplicate raw images and extraction scripts were removed. Historical plans are kept in
[`docs/archive`](docs/archive) for reference only.

## 2. Stack

- Astro 5, TypeScript strict, static output.
- `@astrojs/node` standalone for self-hosting; `@astrojs/vercel` when `VERCEL` is set.
- `@astrojs/sitemap` for `sitemap-index.xml` / `sitemap-0.xml`.
- Self-hosted variable fonts: Inter Tight (display), Inter (body), IBM Plex Mono (data).
- `astro:assets` with sharp for AVIF/WebP/JPEG derivatives; no passthrough image service.
- ESLint 10 with `typescript-eslint` and `eslint-plugin-astro`; Prettier with the Astro plugin.

## 3. Quickstart

```bash
npm ci
npm run dev       # local dev
npm run check     # astro check
npm run build     # check + production build
npm run serve     # standalone server on 0.0.0.0:4321
npm run lint
npm run format:check
```

Node 22 is required.

## 4. Page and content map

| Route          | Source                     | Notes                                        |
| -------------- | -------------------------- | -------------------------------------------- |
| `/`            | `src/pages/index.astro`    | 8 sections, FAQ / Service / Video JSON-LD    |
| `/about`       | `src/pages/about.astro`    | Breadcrumb JSON-LD, practice, coverage, plates |
| `/404`         | `src/pages/404.astro`      | `noindex`, on-demand render                  |
| `/api/enquiry` | `src/pages/api/enquiry.ts` | POST only; every other method returns 405    |

Homepage order: Hero → Applications → Case study (night) → Method + Compliance (stone) →
Specifications → Commercial models → FAQ → Commission form.

Applications folds the "problem" argument into its header rather than giving it a section; the
four-stage method and the compliance register share one section.

All brand, contact, coverage, application, case-study, method, specification, FAQ and form
option content is in [`src/config/site.ts`](src/config/site.ts). Do not hard-code copy in
components when it belongs in that file.

## 5. Forms and lead delivery

Both forms post `multipart/form-data` to `/api/enquiry` with `Accept: application/json`.

- `installation_quote`: full name, role, property name, town/city, property type, environment,
  phone, email, notes, consent.
- `advertising_enquiry`: full name, company, phone, email, notes, consent.

Shared validation lives in [`src/lib/validation.ts`](src/lib/validation.ts) and runs in the
browser and on the server. Phone numbers are normalised to South African E.164 (`+27…`).
Submissions include a honeypot, a render timestamp (sub-two-second submissions are treated as
bots), a source path and a form-type discriminator.

Every valid lead is appended to `data/leads.jsonl` **before** delivery. The ledger is
git-ignored. Use `npm run leads` to inspect it locally.

### Delivery transports

Configure one:

```bash
# Webhook / CRM / automation
LEAD_WEBHOOK_URL=https://...
LEAD_WEBHOOK_SECRET=...

# Or transactional email (Resend)
RESEND_API_KEY=re_...
LEAD_TO_EMAIL=quotes@leddisplays.co.za
LEAD_FROM_EMAIL=website@leddisplays.co.za
```

If `NODE_ENV=production` and nothing is configured, the endpoint returns
`503 DELIVERY_UNAVAILABLE` rather than silently accepting a lead. `REQUIRE_LEAD_DELIVERY=false`
overrides this only when the backup ledger is durable and monitored. `LEAD_STORE_DIR` relocates
the ledger. On Vercel it defaults to `/tmp` (ephemeral), which is why a transport is mandatory
there.

Rate limiting is in-process: 6 submissions per client per 10 minutes, with `Retry-After` on
429. Origin checks compare the request `Origin` host against the request host and any hosts in
`ALLOWED_ORIGINS`. Astro's built-in check is disabled because the Node adapter rewrites
`request.url` to `http://localhost`; do not re-enable it without configuring
`security.allowedDomains`.

Responses are shaped `{ success, reference, delivered, message }`. References look like
`VGD-E5LJFJXQQ` (advertising leads add `-ADV-`). The browser prints the reference into the
confirmation panel and into the pre-filled WhatsApp link.

## 6. Deployment

### Vercel

No Vercel-specific build command is needed. Vercel sets `VERCEL=1`, which switches the adapter
from `@astrojs/node` to `@astrojs/vercel`; the build then emits the Build Output API tree in
`.vercel/output` (static assets, one `_render` function on `nodejs22.x`, and a route table that
sends `/api/enquiry`, `/404` and unmatched paths to the function). `package.json` pins
`engines.node` to `22.x`.

**Import path (recommended):** project → *Add New* → *Project* → import
`JAFAR564/vanguard-led-displays` → leave Framework Preset as **Astro**, root directory `./`,
build command `npm run build`, output directory default. Then add the environment variables
below under *Settings → Environment Variables* for **Production** (and Preview if wanted) and
redeploy.

**CLI path:** `npx vercel link`, `npx vercel env pull`, `npx vercel --prod`.

#### Deployment protection

Branch preview URLs (`<project>-git-<branch>-<team>.vercel.app`) sit behind **Vercel
Authentication** under the default *Standard Protection*. Opening one in a browser that is not
signed in to Vercel returns the login page, which is expected — the deployment itself is fine.
Under Standard Protection only the production domain is public.

To open a preview without signing in, pick one:

1. **Promote the deployment** — *Deployments* → the build → ⋯ → *Promote to Production*. It then
   serves on the production domain, which Standard Protection does not gate.
2. **Turn the gate off** — *Settings* → *Deployment Protection* → *Vercel Authentication*. On
   Hobby this can be limited; if the option is greyed out, use (1) or (3).
3. **Bypass link** — *Settings* → *Deployment Protection* → *Protection Bypass for Automation* →
   create a secret, then share
   `https://<preview-url>?x-vercel-protection-bypass=<secret>&x-vercel-set-bypass-cookie=samesitenone`.
   Treat the URL as a credential: anyone holding it bypasses the gate.

Note that `master` still carries the previous build; until this branch is merged, the production
domain serves the old site and only the protected preview carries the redesign.

Environment variables required before the site can accept enquiries:

| Variable | Required | Notes |
| --- | --- | --- |
| `LEAD_WEBHOOK_URL` | one of these two | CRM / automation endpoint |
| `LEAD_WEBHOOK_SECRET` | optional | sent as `X-Vanguard-Secret` |
| `RESEND_API_KEY` | one of these two | plus the two addresses below |
| `LEAD_TO_EMAIL` / `LEAD_FROM_EMAIL` | with Resend | must be a verified sending domain |
| `ALLOWED_ORIGINS` | optional | extra origin hosts, comma separated |
| `REQUIRE_LEAD_DELIVERY` | optional | leave unset (`true`) unless the ledger is durable |
| `LEAD_STORE_DIR` | optional | defaults to `/tmp` on Vercel, which is **ephemeral** |

Until a transport is configured, `NODE_ENV=production` makes `/api/enquiry` return
`503 DELIVERY_UNAVAILABLE` for every submission — by design. The site renders normally; only the
forms fail closed.

`vercel.json` supplies `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, a
permissions policy, COOP, HSTS, and immutable cache headers for `/_astro/*`. Verify after the
first deploy, because header routes are applied by the platform and are not part of the
generated `.vercel/output/config.json`:

```bash
curl -sI https://<domain>/ | grep -iE 'strict-transport|x-frame|referrer|x-content-type'
curl -sI https://<domain>/_astro/<any-asset>.css | grep -i cache-control
curl -s -o /dev/null -w '%{http_code}\n' https://<domain>/api/enquiry      # expect 405
curl -s -o /dev/null -w '%{http_code}\n' https://<domain>/does-not-exist    # expect 404
```

`.vercelignore` keeps `data/`, `docs/` and `.agents/` out of CLI source uploads so a local lead
ledger can never be bundled into the deployment.

### Node host

```bash
npm ci
npm run build
NODE_ENV=production HOST=0.0.0.0 PORT=4321 node ./dist/server/entry.mjs
```

Serve the built server rather than only `dist/client`, so the API and the on-demand 404 work.
Terminate TLS and add the equivalent security headers at the reverse proxy.

## 7. Assets

- Editorial images live in `src/assets` and are imported into components; `astro:assets`
  emits AVIF/WebP/JPEG derivatives at the widths each layout needs.
- `application-commercial.jpg` was cropped from 1600×1064 to **1212×1064** to remove the
  black object at the right edge. Both application plates render inside a locked 4:3 frame
  with `object-fit: cover`, so the near-square source does not change the row height.
- `public/` is **8.7 MB**: the case-study MP4 (8.6 MB) and the Open Graph image.
- The case-study video was re-encoded from 1920×1080 / 4.7 Mbps (35 MB) to 1280×720 /
  CRF 28 (8.6 MB, PSNR 31.6 dB against a 720p reference). It is `preload="none"`, so it only
  downloads when a visitor presses play; the server answers range requests.
- `public/sitemap.xml` is a stable alias for the generated sitemap; `robots.txt` points at
  `sitemap-index.xml`.

## 8. Verification performed

- `npm run check` — 28 files, 0 errors, 0 warnings, 0 hints.
- `npm run build` — passes; sitemap and image derivatives generated. `dist/client` ≈ 15 MB.
- `npm run lint` and `npm run format:check` — pass.
- Route smoke: `/` 200, `/about` 200, unknown path 404, `/sitemap.xml`, `/sitemap-index.xml`,
  `/sitemap-0.xml`, `/robots.txt` 200; video 200 with `206` range support.
- API smoke: 200 valid (installation and advertising), 400 invalid with per-field errors,
  403 hostile origin, 405 GET, 429 after six submissions with `Retry-After: 600`,
  503 production without a transport (no ledger write), preview host/origin 200,
  `ALLOWED_ORIGINS` host 503 (allowed origin, no transport) rather than 403.
- Ledger and `npm run leads` checked against the new schema.

No browser was available in the build environment, so the visual checks listed in §9 remain
outstanding.

## 9. Before launch

1. Configure a delivery transport and send a real test enquiry from the deployed domain.
2. Confirm the receiving inbox or webhook is monitored.
3. Repeat visual QA in a real browser at 360, 768, 1024 and 1440px — specifically: the two
   application plates (locked 4:3), the sticky method register clearing the fixed header, and
   the form confirmation state.
4. Confirm the privacy notice contact and Information Officer details with the client.
5. Confirm the case-study year, the stage durations in §Method (currently Week 1 / 2–3 / 4–6 /
   6 onward) and that the photography is approved for publication.
6. Re-check the six FAQ answers and the hardware table against the client's latest product
   sheet; they are carried from the previous site and were not re-verified during the rebuild.

## 10. Known constraints

- Rate limiting is per process. Serverless deployments get one window per instance; pair with
  the platform's WAF or a shared store if abuse becomes a problem.
- The 404 is rendered on demand because the Node adapter cannot re-fetch a prerendered error
  page without an internal origin.
- The site is deliberately JavaScript-light: the drawer, tabs, privacy dialog, sticky CTA and
  form submission are the only client behaviours. Core content and navigation work without JS.
