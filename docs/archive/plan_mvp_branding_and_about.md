> **Archived planning document.** This describes an earlier iteration and is not current documentation. See the root `README.md`, `DESIGN.md` and `HANDOVER.md`.

# Implementation Plan: White-Label Branding, Bespoke Logo & Dedicated About Page

## Goal Description
Following new intelligence from the client via WhatsApp:
1. **White-Label Mandate**: Integrate technical hardware specifications from the outdoor and indoor display catalogs (up to 10,000 nits, die-cast aluminium IP65 cabinets, P2.5–P16 outdoor, P0.9–P2.5 indoor fine-pitch COB/SMD) with a **strict ban on supplier names or logos** (zero mentions of Hikvision anywhere).
2. **Branding & Logo**: Create a clean, bespoke architectural monogram logo (`brand-logo.svg`) and color scheme that can be immediately presented without waiting for client pre-approval.
3. **Dedicated "About" Page (`src/pages/about.astro`)**: Build a clean, high-impact About page showcasing engineering philosophy, regional footprint (George & Western Cape), turnkey delivery methodology, and hardware resilience.
4. **Relaxed Timeline Strategy**: Prepare an aligned schedule for Sunday's Discord co-working session and tonight's 10:00 PM sync.

---

## User Review Required

> [!IMPORTANT]
> **Strict Supplier White-Labeling**: No third-party supplier names (Hikvision) or foreign OEM logos will appear in customer-facing copy, metadata, or source code. All hardware will be presented as proprietary architectural-grade displays.

> [!NOTE]
> **Temporary Brand Identity**: Until the client confirms their legal trademark or domain, we propose using **"Vanguard Architectural Displays"** (or **"Apex Commercial LED"**), fully abstracted in `src/config/site.ts` for instant 1-second global replacement once the final domain is locked.

---

## Proposed Changes

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PROPOSED ARCHITECTURE                           │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   src/config/site.ts              Updated brand identity & specs       │
│         │                                                              │
│         ├──> public/assets/brand-logo.svg       Bespoke SVG monogram   │
│         │                                                              │
│         ├──> src/components/SiteHeader.astro    Added logo & nav link  │
│         │                                                              │
│         ├──> src/pages/about.astro              NEW dedicated page     │
│         │       ├── 01 / PHILOSOPHY (Physical engineering rigor)       │
│         │       ├── 02 / HARDWARE BENCHMARKS (Outdoor & Indoor)        │
│         │       ├── 03 / PROVENANCE & GEOGRAPHY (Garden Route & WC)    │
│         │       └── 04 / TURNKEY METHODOLOGY (From survey to SLA)      │
│         │                                                              │
│         └──> src/components/SolutionMatrix.astro  Refined specs table  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 1. Brand Identity & Bespoke Logo
#### [NEW] `public/assets/brand-logo.svg`
* A clean, minimalist architectural monogram featuring two interlocking precision bevels representing modular LED chassis panels, paired with crisp geometric sans typography (`VANGUARD` / `ARCHITECTURAL DISPLAYS`).
* Vector SVG rendered with high-contrast monochrome (`#0B0F17` / `#F7F7F5`) and electric cyan (`#38BDF8`) alignment points.

#### [MODIFY] `src/config/site.ts`
* Update `brand.name` and navigation links to include `/about`.
* Update indoor and outdoor display benchmark specs from the newly analyzed product catalogs.

---

### 2. Dedicated About Page
#### [NEW] `src/pages/about.astro`
A standalone, beautifully paced editorial page sharing `BaseLayout.astro`:
* **Section 01: Engineering Manifesto**:
  * Physical hardware durability vs. generic software dashboards.
  * Structural wind loading (SANS 10160), electrical CoC (SANS 10142-1), and coastal corrosion resistance.
* **Section 02: Hardware Architecture (Catalog-Derived Specs)**:
  * **Outdoor Chassis Architecture**: Die-cast aluminium enclosure, IP65 front/rear weather sealing, high-luminance up to 10,000 nits, auto-calibrating ambient lux sensors, convective fanless heat dissipation.
  * **Indoor Fine-Pitch Matrix**: Micro-COB (Chip-on-Board) and high-density SMD (P0.9–P2.5), 16:9 golden ratio cabinets, 16-bit grayscale depth, nanosecond refresh rate ($\ge 3840\text{Hz}$), front magnetic module serviceability.
* **Section 03: Regional Presence**:
  * Headquartered in George, Western Cape; turnkey installations across the Garden Route, Cape Town metro, and national property portfolios.
* **Section 04: The Team & Turnkey SLA**:
  * Complete turnkey custody: from initial sightline feasibility assessment and structural engineering diagrams to cloud CMS scheduler setup and proactive maintenance SLA.
* **Section 05: Direct Consultation CTA**:
  * Clear pathway back to the assessment consultation form.

---

### 3. Header & Navigation Updates
#### [MODIFY] `src/components/SiteHeader.astro`
* Replace text-only brand title with `brand-logo.svg`.
* Add an "About" link to both desktop navigation and the clean mobile drawer.
* Retain the minimal pill CTA *"Request Assessment"*.

#### [MODIFY] `src/components/SiteFooter.astro`
* Add direct navigation links to `/about` and `/` in the footer link columns.

---

### 4. Hardware Comparison Refinement
#### [MODIFY] `src/components/SolutionMatrix.astro`
* Align the technical row items with real catalog capabilities:
  * Brightness: $6,500\text{–}10,000\text{ nits}$ (Outdoor) vs $600\text{–}1,000\text{ nits}$ (Indoor).
  * Cabinet: Die-Cast Thermal-Conductive Aluminium (Fanless Convective Cooling).
  * Maintenance: Dual Front & Rear Magnetic Access.
  * Pixel Pitch Range: P2.5–P8.0 (Outdoor) vs P0.9–P2.5 (Indoor Fine-Pitch).

---

## Verification Plan

### Automated Tests
1. **Typecheck & Build**:
   ```bash
   npm run build
   ```
   Verify 0 TypeScript errors, 0 warnings, and successful compilation of both `/index.html` and `/about/index.html`.
2. **HTTP Verification**:
   ```bash
   curl -sI http://127.0.0.1:4321/about/
   curl -sI http://127.0.0.1:4321/assets/brand-logo.svg
   ```
   Confirm HTTP 200 OK for both routes.
3. **Strict White-Label Audit**:
   ```bash
   grep -ri "hikvision" src/ public/ dist/ || echo "AUDIT PASSED: ZERO OEM MENTIONS"
   ```
   Ensure 100% compliance with client directive.

### Manual Verification
* Navigate to `http://localhost:4321` and verify the new SVG logo in the top bar.
* Click the "About" link in the navbar and confirm smooth navigation to `/about`.
* Verify layout responsiveness on both mobile viewport and desktop.

---

## Strategic Recommendations for Tonight's 10:00 PM Sync

Here is a recommended briefing you can share directly with your friend tonight:
1. **Current Live State**:
   * The core landing page is already 100% functional, de-carded, and running live.
   * Real installation photography from today (George amphitheater, SuperSport Golf, NASCAR split-screen, technician rigging) is already live on the page.
   * Universal network preview is active on Wi-Fi at `http://192.168.0.5:4321`.
2. **Sunday Discord Availability**:
   * Propose Sunday time slots (e.g., Morning 09:30–12:30 SAST, Afternoon 14:00–17:00 SAST, Evening 19:00–21:00 SAST).
3. **Client Strategy**:
   * Since the Monday deadline was relaxed, Sunday can be used to review the new About page and brand mark together on Discord, leaving the upcoming week for iterative polish before final client review.
