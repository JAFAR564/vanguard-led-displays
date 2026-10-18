# Vanguard Architectural Displays

Marketing site for a turnkey architectural LED display installer serving residential estates,
body corporates and commercial precincts in the Western Cape. Hub: George, Western Cape.
Domain: `https://leddisplays.co.za`.

Astro 5 (static output, two on-demand routes), self-hosted variable fonts, and a small
server-side enquiry endpoint. No UI framework, no CSS framework, no animation library.

## Quickstart

```bash
npm ci            # Node 22
npm run dev       # local dev server
npm run check     # astro check (types + templates)
npm run build     # check, then production build to dist/
npm run preview   # preview the build
npm run serve     # standalone node server on 0.0.0.0:4321
npm run lint
npm run format:check
npm run leads     # inspect the local lead ledger
```

`npm run build && npm run serve` is the complete self-hosted path; serve the built server
rather than `dist/client` alone so `/api/enquiry` and the on-demand 404 work.

## Enquiry endpoint

`POST /api/enquiry` accepts `multipart/form-data` (or urlencoded) for two form types:
`installation_quote` and `advertising_enquiry`. Every valid lead is appended to
`data/leads.jsonl` before delivery is attempted. Configure exactly one transport in
production — `LEAD_WEBHOOK_URL`/`LEAD_WEBHOOK_SECRET`, or `RESEND_API_KEY` with
`LEAD_TO_EMAIL` and `LEAD_FROM_EMAIL`. See [`.env.example`](.env.example).

With `NODE_ENV=production` and no transport the endpoint returns `503 DELIVERY_UNAVAILABLE`
instead of accepting a lead it cannot deliver. `ALLOWED_ORIGINS` (comma-separated origin
hosts) extends the same-origin check; the request host is always allowed.

## Documentation

| Document                     | Covers                                                   |
| ---------------------------- | -------------------------------------------------------- |
| [`DESIGN.md`](DESIGN.md)     | Design system: palette, contrast, typography, layout     |
| [`HANDOVER.md`](HANDOVER.md) | Architecture, routes, lead flow, deployment, launch list |
| [`AGENTS.md`](AGENTS.md)     | Working rules and file map for automated contributors    |
| [`docs/`](docs/README.md)    | Archived planning from earlier iterations (historical)   |

Content, contact details and engineering claims live in
[`src/config/site.ts`](src/config/site.ts). Editorial photography lives in `src/assets` and is
processed by `astro:assets`; the case-study video and social image live in `public/assets`.
