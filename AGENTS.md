# AGENTS.md

Working rules for anyone (human or automated) changing this repository.

## Non-negotiables

- **One dark section.** The case study is the only `--night` band on the homepage.
- **Hairlines and space.** Radius stays at 0–2px. No shadows, no glass, no blur panels.
- **No fabricated content.** No uptime counters, invented metrics, OEM names or testimonials.
- **One location.** Copy says George, Western Cape. Do not introduce a second town.
- **Every rendered image goes through `astro:assets`.** No raw `<img src="/assets/…">` in
  components; import from `src/assets` and render with `<Image>`.
- **Every image sits in a fixed-ratio frame** with `object-fit: cover`.
- **Copy lives in `src/config/site.ts`.** Components render it; they do not invent it.
- **Do not re-enable `security.checkOrigin`.** The API performs its own host comparison.
- **The 404 stays on demand** (`export const prerender = false`).
- **No dependency proliferation.** Reach for native HTML and CSS before adding a package.

## Commands

```bash
npm ci
npm run dev
npm run check        # astro check — must be 0 errors, 0 warnings, 0 hints
npm run build        # check + build
npm run lint         # eslint
npm run format       # prettier --write .
npm run format:check
npm run serve        # standalone server on 0.0.0.0:4321
npm run leads        # print data/leads.jsonl
```

Acceptance for any change: `npm run check && npm run lint && npm run format:check && npm run build`.

## File map

```
src/
  assets/              imported photography (astro:assets)
  components/          one section or shell element per file
  config/site.ts       all published copy, contact, coverage, specs, FAQs
  layouts/BaseLayout   head, meta, JSON-LD, header/footer/mobile CTA
  lib/
    validation.ts      shared browser + server validation
    form-client.ts     submit, inline errors, confirmation state
    notify.ts          webhook / Resend delivery
    lead-storage.ts    JSONL ledger
    rate-limit.ts      in-process 6 / 10 min window
  pages/
    index.astro        8 sections
    about.astro        practice, coverage, plates, standards
    404.astro          prerender = false
    api/enquiry.ts     POST endpoint
  styles/tokens.css    the whole design system
public/
  assets/              case-study video + og image (nothing else)
docs/                  archived plans — historical, never cite as current
```

## Page order

Hero → Applications → Case study (night) → Method + Compliance (stone) → Specifications →
Commercial models → FAQ → Commission.

Splits at ≥1024px: hero 5/7; applications head 4/8; case study head 4/8 and body 5/7; method 4/8
with a sticky register; specifications and models 4/8 head plus 6/6 body; FAQ 4/8; commission 4/8.
Everything collapses to one column below 1024px.

## Forms contract

- Endpoint: `POST /api/enquiry`, `multipart/form-data`, `Accept: application/json`.
- Types: `installation_quote`, `advertising_enquiry`.
- Fields must keep their names: `fullName`, `buyerRole`, `propertyName`, `townCity`,
  `propertyType`, `environment`, `phone`, `email`, `notes`, `consent`, plus `company` for
  advertising.
- Anti-abuse: `company_website_url` honeypot and `formRenderTimestamp` (reject < 2s).
- Success: `{ success: true, reference, delivered, message }`. Failure: `{ success: false, error, errors? }`.
- Every valid lead is written to the ledger before delivery.
- Production without a transport returns 503 `DELIVERY_UNAVAILABLE`. Do not "fix" this by
  defaulting to success.

## Images

- Editorial photography: `src/assets`, imported, rendered with `<Image>` at explicit widths and
  `sizes`, `loading="lazy"` except the hero (`eager`, `fetchpriority="high"`).
- Large media only: `public/assets`. The video keeps `preload="none"` and a poster.
- Never delete a caption; a plate without a record caption is decoration.

## Verification notes

- No browser is available in this sandbox. Do not attempt headless screenshots or browser
  installs; verify through `astro check`, the build, `curl` and static inspection.
- The case-study video is 8.6 MB. If it is replaced, re-encode to 720p H.264 and check the
  PSNR against a scaled reference before committing.
- Prettier ignores `docs/`, `AGENTS.md`, `DESIGN.md` and `HANDOVER.md`; those are hand-written.
