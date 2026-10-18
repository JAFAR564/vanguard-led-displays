# Master Project Handover — Vanguard Architectural Displays

**Project**: Vanguard Architectural Displays (`Vanguard Display Systems (Pty) Ltd`)  
**Workspace**: `/data/data/com.termux/files/home/LED`  
**Repository**: `https://github.com/JAFAR564/vanguard-led-displays.git`  
**Date**: 18 October 2026  
**Target Environment**: Antigravity 2.0 on PC

---

## 1. Project Background & Context

* **Industry**: Turnkey architectural LED display infrastructure for South African luxury residential golf/eco-estates (Garden Route, Western Cape, Paarl, Steyn City, Zimbali), corporate/commercial atriums, and roadside DOOH billboard totems.
* **Core Philosophy**: Physical engineering minimalism, architectural custody, true-black contrast, and direct on-site accountability.
* **Strict White-Label Mandate**:
  - **Zero supplier/OEM disclosures**: Under no circumstances should third-party hardware names (such as "Hikvision") or OEM logos appear anywhere in code, markdown, customer-facing copy, or metadata.
  - All hardware capabilities (die-cast aluminium IP65 chassis, up to 10,000 nits, P2.5 outdoor, P1.2 indoor Micro-COB, 16-bit processing, dual magnetic front/rear service) are presented strictly as Vanguard's proprietary architectural product line.

---

## 2. Quickstart on PC with Antigravity 2.0

### Step 1: Clone the Repository
```bash
git clone https://github.com/JAFAR564/vanguard-led-displays.git
cd vanguard-led-displays
```

### Step 2: Install Dependencies & Run
```bash
# Install dependencies
npm install

# Start local development server with Hot Module Reloading (HMR)
npm run dev

# Or build and test the standalone Node production server:
npm run build
npm run serve
# Server will be accessible at http://localhost:4321
```

### Step 3: Launch with Antigravity 2.0
Open the cloned directory in Antigravity 2.0. The workspace will immediately and automatically mount:
1. **`AGENTS.md`**: Project-specific coding rules, white-label compliance, and mobile responsive guidelines.
2. **`.agents/skills/`**: 7 specialized skills pre-bundled into the repo:
   - `image-prompt-craft`: Production-ready visual briefs for image generation.
   - `imagegen-frontend-web`: Frontend web image art direction.
   - `design-taste-frontend`: Anti-slop frontend design system guidelines.
   - `napkin-memory`: Session context tracking and atomic notes.
   - `gh-cli`: GitHub CLI workflows.
   - `antigravity_guide`: Antigravity IDE and CLI reference manual.
   - `agy-customizations`: Skill loading priority and customization mechanisms.

---

## 3. Current Project State & Architecture

### A. Architectural Frontend
* **Framework**: Astro 5 with `@astrojs/node` standalone adapter.
* **Design System (`DESIGN.md`)**: High-contrast Obsidian (`#0B0F17`) and Alabaster (`#F7F7F5`) palette, 1px hairline dividers (`#E5E7EB`), JetBrains Mono technical accents, de-carded layout.
* **Homepage (`src/pages/index.astro`)**:
  - `HeroSplit.astro`: Architectural hero with authentic estate photography and high-conversion dual CTAs.
  - `UseCaseCards.astro`: 3 core applications (Residential Estates, Commercial Atriums, DOOH Monoliths).
  - `VideoProofPlayer.astro`: Flagship case study in George with full HTML5 video player and technical brief.
  - `SolutionMatrix.astro`: Technical comparison matrix with dual display modes (desktop 3-column table + mobile stacked parameter cards).
  - `ProcessTimeline.astro`: 4-stage delivery methodology (Structural Feasibility $\to$ Rigging & Integration $\to$ Calibration $\to$ Custody SLA).
  - `TrustSupportGrid.astro`: Hardware chassis breakdown on dark obsidian surface.
  - `FaqAccordion.astro`: Body corporate governance, municipal approvals, and power consumption FAQs.
  - `PropertyQuoteForm.astro`: Segmented consultation and media inquiry form.
  - `MobileStickyCta.astro`: Mobile-only floating quick-contact bar with auto-hide behavior.
* **Dedicated About Page (`src/pages/about.astro`)**:
  - Physical Engineering Manifesto & George/Garden Route regional hub provenance.
  - Hardware engineering benchmarks (die-cast aluminium IP65, 10,000 nits, dual magnetic service).
  - Turnkey custody and 72-hour on-site Western Cape SLA.

### B. Lead Capture & POPIA Compliance
* **Endpoint**: `src/pages/api/enquiry.ts` validates submissions and logs them to `data/leads.jsonl`.
* **Lead Inspector CLI**: Run `npm run leads` to view all prospect inquiries formatted in your terminal.
* **Data Privacy**: `data/*.jsonl` is ignored by Git, ensuring private prospect data is never committed to GitHub.

### C. Mobile Responsiveness Fix (< 768px)
* Flex containers enforce `min-width: 0` to prevent mobile browser min-content horizontal zooming.
* The wide desktop table is hidden on mobile in favor of `.mobile-matrix-list` cards.
* Clean 360px viewport audit with zero horizontal margin or overflow bugs.

---

## 4. Key Documentation & Plans in Repository

All plans and brain artifacts have been preserved in the repository:
* **`docs/plans/plan_cinematic_motion_and_scroll_scrub.md`**: Detailed technical architecture for the Apple-style 60fps canvas scroll-scrub engine using Mai 2.6 video frames and Nano Banana stills.
* **`docs/plans/plan_mvp_branding_and_about.md`**: Vanguard white-label branding, vector monograms, and dedicated About page architecture.
* **`docs/plans/plan_minimalist_architectural_redesign.md`**: Architectural minimalist redesign principles and WCAG 2.2 Level AA compliance tokens.
* **`docs/plans/plan_design_and_scaffolding.md`**: Initial project scaffolding and component hierarchy.
* **`docs/walkthrough.md`**: Complete historical change log with visual evidence and test results.
* **`DESIGN.md`**: Color tokens, typography tracking, hairline spacing rules, and WCAG contrast tables.

---

## 5. Next Steps for PC Development (Sunday Discord Co-Working)

When you resume with Antigravity 2.0 on PC:

1. **Visual Generation**:
   - Generate **Image Prompts #1 & #2** in Nano Banana.
   - Generate **Video Prompt #1** in Mai 2.6 (or external video generator).
   *(Prompts are documented in `docs/plans/plan_cinematic_motion_and_scroll_scrub.md`).*
2. **Execute Canvas Scrollytelling**:
   - Run the frame extraction script to convert the video into WebP frames.
   - Build `ScrollScrubHero.astro` to enable the 60fps scroll-driven reveal.
3. **Domain & Client Review**:
   - Prepare client trade name mappings in `src/config/site.ts`.
   - Ready for Vercel, Cloudflare Pages, or Docker deployment.
