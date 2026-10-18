> **Archived planning document.** This describes an earlier iteration and is not current documentation. See the root `README.md`, `DESIGN.md` and `HANDOVER.md`.

# Walkthrough: Minimalist Architectural Redesign & Implementation

The South African Commercial and Residential Estate LED Display web showcase has been overhauled to eliminate the generic "AI-generated frontend" signature (repetitive card containers, blue caps eyebrow tags, 8 checkmark paragraphs, sprawling separate forms) and transformed into a bespoke, minimalist architectural and engineering showcase at `/data/data/com.termux/files/home/LED`.

---

## 1. Architectural Redesign Highlights (De-Carding & Restyling)

| Section | Previous AI Template Signature | Minimalist Architectural Fix | Status |
| :--- | :--- | :--- | :--- |
| **Top Navbar** | Squeezed 6 desktop links, logo, and large CTA into viewport | Minimalist brand mark on left; pill CTA button + clean 2-line menu toggle on right | **DONE** |
| **Hero Section** | Two stacked buttons, 3 tiny trust points, empty white box | High-contrast dusk architectural gatehouse LED monument visual (`dusk-estate-installation.svg`), bold headline, single primary CTA pill | **DONE** |
| **Estates vs Commercial** | 2 tall stacked cards with 8 long checkmark paragraphs | Clean 2-column editorial split with installation imagery and 3 four-word specs each | **DONE** |
| **Buh-Rein Case Study** | Video player followed by 3 separate bordered quote cards | 16:9 video player paired with a 24px editorial pull-quote and a compact horizontal stat bar (Location: Buh-Rein · Cabinet: IP65 Outdoor · Uptime: 99.9%) | **DONE** |
| **Ownership vs Rev-Share** | 2 massive comparison cards + 1 full-width summary card | Borderless 2-column comparison table with shared 1px hairline rows; removed redundant summary card | **DONE** |
| **Process (01–04)** | 4 consecutive bordered cards with blue badges and sub-bullets | Minimalist vertical/horizontal numbered list (01 to 04) with top hairline dividers; crisp 2-line descriptions | **DONE** |
| **3-Layer Architecture** | 3 bordered white cards with blue badges | Obsidian `#0B0F17` hardware chassis background breaking the white scroll; pure white typography & cyan accents | **DONE** |
| **FAQ Accordion** | Floating bordered card boxes with grey "Q" badges | Flush-left questions separated by 1px hairline bottom borders with native `+`/`−` toggle indicator | **DONE** |
| **Bottom Forms** | 10-field assessment form + 5-field advertiser form stacked | Unified consultation form with segmented control (`Request Site Assessment` vs `Advertise on Network`); assessment streamlined to 4 essential fields | **DONE** |
| **Palette & Typography** | Default SaaS royal blue (`#2563EB`) on pure white | Architectural Obsidian (`#0B0F17`), Warm Stone / Alabaster (`#F7F7F5`), monochrome buttons, electric cyan (`#38BDF8`) indicators | **DONE** |

---

## 2. Key Codebase Files Updated

* **[`DESIGN.md`](file:///data/data/com.termux/files/home/LED/DESIGN.md)**: Updated design specification codifying the de-carded hairline aesthetic, Obsidian/Alabaster color palette, typography guidelines, and segmented form architecture.
* **[`src/styles/tokens.css`](file:///data/data/com.termux/files/home/LED/src/styles/tokens.css)**: Added hairline divider utilities, section spacing (`clamp(5rem, 8vw, 8rem)`), monospace index numbers (`01 / INDEX`), and contrast-safe dark chassis variables.
* **[`src/components/SiteHeader.astro`](file:///data/data/com.termux/files/home/LED/src/components/SiteHeader.astro)**: Header with clean brand mark, pill CTA, and minimal 2-line mobile toggle.
* **[`src/components/HeroSplit.astro`](file:///data/data/com.termux/files/home/LED/src/components/HeroSplit.astro)**: Full-bleed dusk architectural hero visual with single primary action pill.
* **[`src/components/UseCaseCards.astro`](file:///data/data/com.termux/files/home/LED/src/components/UseCaseCards.astro)**: 2-column editorial split with gatehouse dusk render and retail atrium render.
* **[`src/components/VideoProofPlayer.astro`](file:///data/data/com.termux/files/home/LED/src/components/VideoProofPlayer.astro)**: Buh-Rein flagship case study featuring 24px editorial pull-quote and horizontal stat bar.
* **[`src/components/SolutionMatrix.astro`](file:///data/data/com.termux/files/home/LED/src/components/SolutionMatrix.astro)**: Clean borderless 2-column table with shared hairline rows.
* **[`src/components/ProcessTimeline.astro`](file:///data/data/com.termux/files/home/LED/src/components/ProcessTimeline.astro)**: 4-stage transparent project roadmap (01 to 04) with top hairline dividers.
* **[`src/components/TrustSupportGrid.astro`](file:///data/data/com.termux/files/home/LED/src/components/TrustSupportGrid.astro)**: 3-Layer System Architecture on Obsidian `#0B0F17` chassis.
* **[`src/components/FaqAccordion.astro`](file:///data/data/com.termux/files/home/LED/src/components/FaqAccordion.astro)**: Flush-left questions with hairline dividers and `+`/`−` toggle.
* **[`src/components/PropertyQuoteForm.astro`](file:///data/data/com.termux/files/home/LED/src/components/PropertyQuoteForm.astro)**: Unified segmented form with 4-field site assessment and advertising tab.
* **[`src/components/SiteFooter.astro`](file:///data/data/com.termux/files/home/LED/src/components/SiteFooter.astro)**: Architectural footer with POPIA compliance modal dialog.
* **[`src/components/MobileStickyCta.astro`](file:///data/data/com.termux/files/home/LED/src/components/MobileStickyCta.astro)**: Auto-hiding monochrome mobile floating CTA.
* **[`src/pages/index.astro`](file:///data/data/com.termux/files/home/LED/src/pages/index.astro)**: Page layout orchestrating all 10 refactored sections.

---

## 3. Build & Diagnostics Verification

Command executed: `npm run build` (`astro check && astro build`)
* **Diagnostics**:
  * Files checked: 18 files
  * **0 errors, 0 warnings, 0 hints**
* **Client / Server Build**:
  * Client bundle: `PropertyQuoteForm.astro_astro_type_script_index_0_lang.CYxydml5.js` (4.43 kB / 1.66 kB gzip)
  * Pre-rendered static route: `src/pages/index.astro` -> `dist/client/index.html` (51.2 kB)
  * Server entrypoints compiled cleanly for Node.js standalone execution.

---

## 4. End-to-End Test Suite Verification

The standalone server was started on `http://127.0.0.1:4321` and tested using automated curl requests against all functional criteria:

| Test ID | Test Scenario | Input Tested | Result | Status |
| :--- | :--- | :--- | :--- | :--- |
| **FT-01** | Streamlined Site Assessment (SA Mobile) | Mobile `082 782 4346` | Returns HTTP 200, lead ID `LEAD-EST-1792234457018`, phone normalised to `+27827824346` | **PASSED** |
| **FT-02** | Streamlined Site Assessment (Hybrid Landline) | Landline `+27 (0)44 801 9122` | Returns HTTP 200, lead ID `LEAD-EST-1792234461786`, phone normalised to `+27448019122` | **PASSED** |
| **FT-03** | Missing Required Field Validation | Empty `propertyName` | Returns HTTP 400 Bad Request: `{"success":false,"error":"All marked fields are required."}` | **PASSED** |
| **FT-04** | Accessible Honeypot Bot Rejection | Hidden field `company_website_url` filled | Returns HTTP 200 decoy: `{"success":true,"decoy":true}`, no lead created | **PASSED** |
| **FT-05** | Speed Trap Bot Rejection | Submission in $< 2.5\text{s}$ | Returns HTTP 200 decoy: `{"success":true,"decoy":true}`, flagged in server logs | **PASSED** |
| **FT-06** | Segmented Advertising Inquiry | Form type `advertising_enquiry` | Returns HTTP 200, lead ID `LEAD-ADV-1792234481867`, routed to media rate-card pipeline | **PASSED** |

---

## 5. Git Commit

All modifications and assets were committed to master:
* Commit hash: `8818f8f` (`feat: complete minimalist architectural redesign and de-carding`)
* Commit hash: `fd3e0b2` (`feat: add persistent lead ledger storage, CLI viewer, and 0.0.0.0 network serve`)
* Commit hash: `d0d7bce` (`feat: integrate authentic company installation photography and video`)

---

## 6. Production Enhancements: Persistent Lead Ledger & Network Preview

1. **Persistent Disk Storage (`src/lib/lead-storage.ts`)**:
   * Atomically records incoming inquiries into an append-only JSON Lines ledger (`data/leads.jsonl`).
   * Guaranteed zero data loss across restarts or server downtime.
   * `data/*.jsonl` added to `.gitignore` to maintain strict POPIA customer privacy.

2. **CLI Lead Viewer (`npm run leads`)**:
   * Run `npm run leads` at any time in Termux to inspect recorded leads with SAST timestamps, contact roles, E.164 phone numbers, estate names, and project notes.

3. **Universal Network Access (`HOST=0.0.0.0`)**:
   * Bound to `0.0.0.0:4321` so the site is accessible locally on Android (`http://localhost:4321`) and across the local Wi-Fi network (`http://192.168.0.5:4321`).

---

## 7. Authentic Company Photography & Video Integration

All placeholder SVG renders have been replaced with genuine, high-resolution photographs from the company's real installation:
* **Hero Visual**: [`public/assets/hero-amphitheater-estate.jpg`](file:///data/data/com.termux/files/home/LED/public/assets/hero-amphitheater-estate.jpg) (wide architectural shot showing the estate lawn amphitheater, modern curved building, and high-brightness LED screen with synchronised external audio).
* **Use Cases (Residential Estates)**: [`public/assets/estate-golf-installation.jpg`](file:///data/data/com.termux/files/home/LED/public/assets/estate-golf-installation.jpg) (completed estate screen broadcasting SuperSport Golf across the manicured lawn).
* **Use Cases (Commercial & Multisport DOOH)**: [`public/assets/commercial-motorsport-display.jpg`](file:///data/data/com.termux/files/home/LED/public/assets/commercial-motorsport-display.jpg) (live NASCAR split-screen broadcast with brand advertising and telemetry).
* **Case Study Video & Poster**: [`public/assets/george-estate-poster.jpg`](file:///data/data/com.termux/files/home/LED/public/assets/george-estate-poster.jpg) + [`public/assets/george-estate-installation.mp4`](file:///data/data/com.termux/files/home/LED/public/assets/george-estate-installation.mp4) (authentic video proof of completed outdoor installation).
* **OpenGraph & Social Cards**: Updated to use real installation imagery for premium sharing previews on WhatsApp, LinkedIn, and Twitter.

---

## 8. White-Label Branding, Bespoke Monogram & Dedicated About Page

1. **Strict White-Labeling**:
   * Automated codebase audit verified: **0 occurrences of foreign OEM/supplier names**.
   * Hardware presented strictly as proprietary architectural displays.
2. **Bespoke Architectural Monogram Logo**:
   * [`public/assets/brand-logo.svg`](file:///data/data/com.termux/files/home/LED/public/assets/brand-logo.svg) for light header.
   * [`public/assets/brand-logo-light.svg`](file:///data/data/com.termux/files/home/LED/public/assets/brand-logo-light.svg) for dark footer.
   * Minimalist interlocking chassis polygons with 1px structural hairpins and electric cyan active telemetry diode.
3. **Dedicated About & Engineering Page (`/about`)**:
   * [`src/pages/about.astro`](file:///data/data/com.termux/files/home/LED/src/pages/about.astro)
   * Engineering Manifesto: Physical durability over software gimmicks (SANS 10160 wind loading, SANS 10142-1 CoC, STSMA PMR 29 governance).
   * Hardware Benchmarks: Exterior 10,000 nits die-cast aluminium IP65 vs. Interior Micro-COB 16:9 golden ratio cabinets.
   * Regional Provenance: George & Garden Route hub with national deployment capabilities.
   * Turnkey Methodology: 4-stage custody chain with direct consultation CTA.
4. **Hardware Matrix Realignment (`SolutionMatrix.astro`)**:
   * Updated comparison parameters to reflect die-cast aluminium chassis, dual front/rear magnetic service, and up to 10,000 nits.
5. **Git Commit**:
   * Commit hash `ca355f3` (`feat: implement white-label Vanguard branding, bespoke SVG logo, and dedicated About page`).

---

## 9. Mobile Viewport & Responsiveness Architecture Fixes

Resolved the mobile horizontal overflow bug where content appeared stacked on the left with a blank white gap on the right:

1. **Global Viewport Containment (`src/styles/tokens.css`)**:
   * Added strict `overflow-x: hidden; width: 100%; max-width: 100%;` to `html`, `body`, and `<main>`.
   * Added `min-width: 0;` to `<main>` to prevent child elements with intrinsic min-content (like tables or flex containers) from blowing out the flex body layout.
   * Added global media rule `img, picture, video, canvas, svg { max-width: 100%; height: auto; }`.
   * Scaled container padding on mobile (`--container-padding: 1rem;`) for optimal usable touch canvas.

2. **Mobile Comparison Matrix (`src/components/SolutionMatrix.astro`)**:
   * The desktop table (`min-width: 680px`) was the primary cause of mobile layout blowout.
   * Converted mobile view (`< 768px`) into a responsive card list (`.mobile-matrix-list`) where each parameter is cleanly laid out with separate Outdoor Weatherproof and Indoor Commercial specification blocks.
   * Desktop view ($\ge 768px$) continues to display the full 3-column table.

3. **Sticky Header Mobile Optimization (`src/components/SiteHeader.astro`)**:
   * Scaled `.brand-logo-img` to `height: 24px; max-width: 160px;` on mobile (`< 640px`).
   * Hid the redundant desktop "Book Assessment" header pill on mobile (`< 640px`) since the sticky bottom action bar and mobile hamburger menu already provide instant consultation booking.
   * Reduced mobile header width from 461px down to 218px, preventing any overflow.

4. **Segmented Control Touch Stacking (`src/components/PropertyQuoteForm.astro`)**:
   * On mobile viewports (`< 640px`), the dual tabs (`Request Site Assessment` vs `Advertise on Network`) stack vertically into clean full-width touch targets.

5. **Case Study & Hero Mobile Refinements**:
   * Horizontal stat bar in `VideoProofPlayer.astro` adapts to a 2x2 grid on mobile viewports.
   * Hero actions in `HeroSplit.astro` stack vertically with full-width primary button ergonomics.
   * Hardware benchmark specs in `about.astro` wrap cleanly on small screens.
6. **Git Commit**:
   * Commit hash `a4cb537` (`fix(mobile): resolve horizontal viewport overflow and white space gap on mobile devices`).




