# Design system — Survey Plate × Field Record

The site is built as a documentary record of an engineering practice: numbered plates,
hairline rules, measured claims, and Swiss architectural typography. Nothing floats, nothing
glows, nothing animates for its own sake.

The implementation lives in [`src/styles/tokens.css`](src/styles/tokens.css). Component-specific
rules are scoped inside each `.astro` file.

## 1. Non-negotiables

- **No glassmorphism, no blur panels, no shadows.** Depth is expressed with rules and space.
- **No fake telemetry.** No invented uptime counters, live-status dots or scrolling data.
- **No scroll-jacking.** The page scrolls natively; only the header, tabs and dialogs are fixed.
- **Radius 0–2px.** `--radius: 2px` is the only radius token.
- **1px hairlines.** Every divider, table row and register line is exactly 1px.
- **One dark section.** The case study is the only high-contrast dark band on the homepage.
- **Captioned plates.** Every photograph is a `figure` with a mono caption naming the record.

## 2. Palette

| Token       | Hex       | Role                              |
| ----------- | --------- | --------------------------------- |
| `--surface` | `#FFFFFF` | Inputs, dialogs, inset panels     |
| `--paper`   | `#F7F7F5` | Page background                   |
| `--paper-2` | `#EEEEEC` | Stone sections (method, coverage) |
| `--night`   | `#0B0D10` | Case study only                   |
| `--ink`     | `#0F1115` | Headings, body, primary button    |
| `--text-2`  | `#3F424A` | Secondary prose                   |
| `--text-3`  | `#636770` | Captions, mono labels, hints      |
| `--accent`  | `#C83E2B` | Rules, badges, large marks        |
| `--accent-text` | `#A8301F` | Small text and links on light surfaces |
| `--ok`      | `#155E42` | Verified compliance badges        |

Measured contrast (WCAG 2.1 relative luminance):

| Pair                              | Ratio     | Use                          |
| --------------------------------- | --------- | ---------------------------- |
| `--ink` on `--paper`              | **17.62** | Body and headings            |
| `--text-2` on `--paper`           | **9.37**  | Secondary prose              |
| `--text-3` on `--paper`           | **5.28**  | Captions ≥ 4.5              |
| `--text-3` on `--paper-2`         | **4.88**  | Captions on stone            |
| `--accent` on `--paper-2`         | **4.32**  | Rules and badges only — not text |
| `--accent-text` on `--paper-2`    | **5.82**  | Small text on stone          |
| `--accent-text` on `--paper`      | **6.30**  | Links and field errors       |
| `--ok` on `--paper`               | **7.22**  | Compliance badges            |
| `--on-night` on `--night`         | **17.35** | Case study text              |
| `--on-night-2` on `--night`       | **9.88**  | Case study prose             |

The split between `--accent` and `--accent-text` exists because the vermilion drops to 4.32:1 on
the stone surface. The bright tone is kept for marks that are not read as text; anything set in
small type uses the darker tone.

## 3. Typography

Self-hosted through Fontsource, no network font requests at runtime:

- **Display** — `Inter Tight Variable`, weight 500/600, tracking `-0.03em`, line-height ~1.0.
- **Body** — `Inter Variable`, 400/500, line-height 1.6.
- **Data** — `IBM Plex Mono` 400, uppercase, `0.14em` tracking at 10–11px for labels and records.

The scale is fluid (`clamp`) and capped: `--step--1` (13px) through `--step-5` (80px). Monospace
is used only for labels, references, measurements and the specification register — never for body
copy.

## 4. Layout

A 12-column grid with asymmetric splits at ≥1024px, collapsing to one column below:

| Section            | Split            |
| ------------------ | ---------------- |
| Hero               | 5 / 7            |
| Applications head  | 4 / 8            |
| Application plates | 6 / 6            |
| Case study head    | 4 / 8            |
| Case study body    | 5 / 7 (media / notes) |
| Method             | 4 / 8 (sticky register) |
| Specifications     | 4 / 8 head, 6 / 6 groups |
| Commercial models  | 4 / 8 head, 6 / 6 models |
| FAQ                | 4 / 8 (sticky heading) |
| Commission         | 4 / 8 (sticky contact) |

`.sticky` uses `top: calc(var(--header-h) + 24px)`; the header is 68px (60px on mobile) plus a
1px rule, so a stuck element never touches it. A sticky child needs a stretched grid item, which
is what `.sticky-host` provides.

Sections are separated by a 1px `--rule` top border and `--section-y` vertical padding. Cards,
shadows and rounded containers are not used.

## 5. Components

- **Buttons** — 44px minimum height, 2px radius, ink fill; hover switches to vermilion.
- **Plates** — `figure` + `.plate__frame` + mono `figcaption`. Fixed `aspect-ratio` on every
  frame with `object-fit: cover`; image dimensions never dictate layout.
- **Registers** — `dl` rows with mono labels and a 1px bottom rule.
- **Badges** — 10px mono, 1px border; `--ok` for verified compliance.
- **Tabs** — mono labels, vermilion 2px indicator, arrow-key navigation.
- **Accordion** — native `details`/`summary`, first item open, exclusive via `name="faq"`.
- **Header** — fixed, solid paper (no blur), hairline bottom; drawer below 1100px.
- **Sticky mobile CTA** — two 56px actions; hides while the commission form is in view.

## 6. Motion and accessibility

- Transitions are 140–220ms, opacity/transform/colour only.
- `prefers-reduced-motion` disables smooth scrolling and long transitions.
- Focus is always a 2px ink outline with offset; every interactive target is ≥44px.
- The skip link is the first focusable element; sections use labelled headings.
- Content, navigation and the FAQ work without JavaScript. Forms require it, so a `<noscript>`
  block offers the phone, WhatsApp and email routes.
- Dialogs use native `<dialog>` with focus return.

## 7. Content rules

- Every claim is attributable: standards are cited by number, not adjective.
- No supplier or OEM names. Hardware is specified under the practice's own name.
- No invented metrics (uptime, "10 000+ installations", fake counters).
- Location copy always reads George, Western Cape. No second town appears anywhere.
- Photography is captioned as a record, not as decoration.
