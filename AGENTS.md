# AGENTS.md — Antigravity 2.0 Workspace Guidelines & Context

## Project Identity & Directives
* **Company**: Vanguard Architectural Displays (`Vanguard Display Systems (Pty) Ltd`)
* **Regional Hub**: George, Garden Route, Western Cape, South Africa
* **Domain**: Bespoke, turnkey LED display infrastructure for luxury residential golf/eco-estates, commercial/retail atriums, and roadside DOOH advertising monoliths.
* **STRICT WHITE-LABEL MANDATE**:
  - **Zero Mentions of Supplier/OEM Names**: Under no circumstances should "Hikvision" or foreign OEM manufacturer logos/names appear anywhere in code, markdown, client-facing text, metadata, or comments.
  - All hardware capabilities (die-cast aluminium IP65 chassis, up to 10,000 nits, P2.5–P8.0 outdoor, P0.9–P2.5 indoor Micro-COB/SMD, 16:9 golden ratio cabinets, 16-bit processing, dual magnetic service) are represented strictly as Vanguard's proprietary architectural product line.

---

## Technical Stack & Architecture
* **Framework**: Astro 5 (Hybrid SSR + Pre-rendered static pages)
* **Server Adapter**: `@astrojs/node` standalone mode
* **Styling**: Tailwind CSS + custom architectural tokens defined in `DESIGN.md`
* **Lead Ingestion**: `/api/enquiry` endpoint appending to `data/leads.jsonl` (POPIA Act 4 compliant; `.jsonl` files are git-ignored)
* **Lead Inspection**: `npm run leads` (`scripts/view-leads.mjs`)
* **Production Commands**:
  - `npm run build`: Type-checks with `astro check` and produces production bundle in `dist/`.
  - `npm run serve`: Launches standalone Node server on `0.0.0.0:4321`.
  - `npm run dev`: Local development server with HMR.

---

## Design System & Responsive Rules
* **Aesthetic**: Architectural Engineering Minimalism. Crisp 1px hairline dividers (`#E5E7EB`), obsidian chassis backgrounds (`#0B0F17`), warm alabaster alternates (`#F7F7F5`). No rounded SaaS cards or heavy drop shadows.
* **Mobile Responsiveness (< 768px)**:
  - Flex containers containing main content MUST enforce `min-width: 0;` to prevent min-content zoom-out bugs.
  - Wide comparison tables are hidden on mobile in favor of `.mobile-matrix-list` stacked parameter cards.
  - Touch targets must adhere to WCAG 2.2 Level AA ($\ge 44 \times 44\text{ px}$).
  - All images and canvas elements must use `max-width: 100%` and `box-sizing: border-box`.

---

## Scrollytelling & Motion Engine
* **Asset Generation**:
  - **Nano Banana**: High-resolution photorealistic architectural stills and exploded hardware views.
  - **Mai 2.6 / External Video**: 4-second cinematic camera moves (villa push-in, cabinet orbit).
* **Frame Scrub Pattern**:
  - Do not use raw `<video.currentTime>` scrubbing (causes mobile frame drops and battery drain).
  - Use HTML5 `<canvas>` frame sequence preloading with linear interpolation (`lerp`) at 60fps.
  - Automated frame extraction: `scripts/extract-frames.sh` using local `ffmpeg`.

---

## Customizations & Skills Mounted
This project bundles project-specific skills in `.agents/skills/`:
- `image-prompt-craft`: Production visual briefs and prompt engineering.
- `imagegen-frontend-web`: Frontend web image art direction.
- `design-taste-frontend`: Anti-slop frontend UI principles.
- `napkin-memory`: Session-bound context scratchpads and atomic handovers.
- `gh-cli`: GitHub CLI operations.
- `antigravity_guide`: Antigravity IDE and CLI reference.
- `agy-customizations`: Loading priority and customization mechanisms.
