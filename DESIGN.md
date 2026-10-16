# Design System Specification (DESIGN.md)
**Project**: South African Commercial & Estate LED Display Landing Page  
**Standard**: WCAG 2.2 Level AA Compliance & Core Web Vitals  
**Aesthetic**: Architectural Swiss-Grid Editorial

---

## 1. Core Visual Concept & Aesthetic Tone
The visual design language is rooted in **Architectural Swiss-Grid Editorial**:
- Crisp white and light-alabaster backgrounds giving an engineering and architectural feel.
- High-contrast charcoal typography for maximum legibility and gravitas.
- Confident, authoritative blue accents for primary actions.
- Structural hairline borders (`1px solid #E2E8F0`) outlining modular content cards.
- Tabular figures (`font-variant-numeric: tabular-nums`) for numbered steps and technical metrics.
- Substantive whitespace and editorial hierarchy over flashy, generic AI gradients or 3D blobs.

---

## 2. Color Palette & Contrast Tokens

All tokens are mathematically verified according to W3C relative luminance formulas:

| Token Name | Hex Value | Target Surface | Contrast Ratio | Compliance Level |
| :--- | :--- | :--- | :--- | :--- |
| `--color-bg-primary` | `#FFFFFF` | N/A (Main surface) | N/A | Base |
| `--color-bg-subtle` | `#F8FAFC` | Alternating section | N/A | Subtly tinted |
| `--color-bg-tint` | `#EFF6FF` | Card callout & active pill | N/A | Brand highlight |
| `--color-bg-inverse` | `#202A36` | Footer & high-contrast bar | N/A | Dark Charcoal |
| `--color-text-primary` | `#202A36` | `#FFFFFF` | **14.52:1** | WCAG AAA |
| `--color-text-secondary` | `#475569` | `#FFFFFF` | **7.58:1** | WCAG AAA |
| `--color-text-on-inverse` | `#FFFFFF` | `#202A36` | **14.52:1** | WCAG AAA |
| `--color-text-accent-inverse` | `#93C5FD` | `#202A36` | **7.85:1** | WCAG AAA |
| `--color-brand-primary` | `#2463B8` | `#FFFFFF` | **5.91:1** | WCAG AA / AAA Large |
| `--color-brand-hover` | `#1D4ED8` | `#FFFFFF` | **6.70:1** | WCAG AA / AAA Large |
| `--color-border-subtle` | `#E2E8F0` | `#FFFFFF` | Hairline boundary | Structural card border |
| `--color-border-input` | `#64748B` | `#FFFFFF` | **4.76:1** | Passes WCAG 3.0:1 UI |
| `--color-focus-ring` | `#2463B8` | Focused element | `2px solid` offset | Explicit Focus State |
| `--color-error` | `#B91C1C` | `#FFFFFF` | **6.47:1** | WCAG AAA |
| `--color-success` | `#15803D` | `#FFFFFF` | **5.02:1** | WCAG AA |

> [!WARNING]
> **Strict Contrast Prohibition**: `#2463B8` blue text or icons **must never** be placed directly onto `#202A36` charcoal surfaces (such as the footer). That pairing yields only a **2.46:1 contrast ratio**, which fails WCAG 2.2 Level AA. On `#202A36` backgrounds, interactive links and accent text must strictly use `#FFFFFF` or `#93C5FD` (7.85:1 AAA).

---

## 3. Typography Hierarchy

### Font Families
* **Primary Sans-Serif (`--font-sans`)**:  
  `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`
* **Monospace (`--font-mono`)**:  
  `'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`  
  *Used for section numbers (`01`–`04`), technical specifications, and step indicators.*

### Fluid Scale (CSS `clamp()`)
* **Display / `<h1>`**:  
  `font-size: clamp(2.125rem, 3.5vw + 1rem, 3.25rem);`  
  `line-height: 1.12; font-weight: 700; letter-spacing: -0.025em;`
* **Section Heading / `<h2>`**:  
  `font-size: clamp(1.625rem, 2.2vw + 0.8rem, 2.25rem);`  
  `line-height: 1.2; font-weight: 700; letter-spacing: -0.02em;`
* **Card Title / `<h3>`**:  
  `font-size: clamp(1.1875rem, 1.2vw + 0.8rem, 1.375rem);`  
  `line-height: 1.3; font-weight: 600;`
* **Body Text**:  
  `font-size: 1.0625rem;` (17px)  
  `line-height: 1.6; max-width: 65ch; color: var(--color-text-secondary);`
* **Form Controls (`input`, `select`, `textarea`)**:  
  `font-size: 1rem;` (16px minimum)  
  *Enforcing 16px eliminates automatic mobile iOS Safari viewport zooming on focus.*

---

## 4. Grid, Layout & Ergonomics

### Container & Responsive Grids
* **Max Width**: `1200px` centered.
* **Inline Padding**: `clamp(1.25rem, 4vw, 3rem)`.
* **Grid Systems**:
  * **Desktop ($\ge 1024\text{px}$)**: 12-column CSS Grid, 24px column gap.
  * **Tablet ($768\text{px} - 1023\text{px}$)**: 6-column CSS Grid.
  * **Mobile ($< 768\text{px}$)**: 1-column single-stack thumb-friendly layout.

### Touch Target Sizing (WCAG 2.2 SC 2.5.8 & SC 2.5.5)
* All buttons, links, radio pills, checkboxes, and FAQ summary headers must measure at least **$44 \times 44\text{ CSS px}$** for pointer reachability.

### Focus Management & Scroll Padding (WCAG 2.2 SC 2.4.11)
* Global `html` configuration:
  ```css
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 88px;
    scroll-padding-bottom: 80px;
  }
  ```
* All interactive elements display a clear `:focus-visible` ring:
  ```css
  :focus-visible {
    outline: 2px solid var(--color-brand-primary);
    outline-offset: 2px;
  }
  ```
* The mobile sticky CTA bar must be observed via `IntersectionObserver` to automatically hide whenever `#quote-form`, `#advertise`, or `#footer` are visible, preventing obscuration of form inputs.

---

## 5. Component Inventory (11 Core Sections)

1. **`SiteHeader`**: Brand wordmark, anchor links, primary desktop CTA *"Request a Site Assessment"*.
2. **`HeroSplit`**: Eyebrow badge, semantic `<h1>`, value subheadline, primary CTA (*"Request a Quote & Site Visit"*), secondary CTA (*"View George Estate Installation"*), 3 factual proof pills, and high-priority architectural photo.
3. **`UseCaseCards`**: 2 comparative architectural cards: **Residential Estates & HOAs** vs. **Shopping Centres & Commercial Precincts**.
4. **`VideoProofPlayer`**: Completed residential estate installation in George, Western Cape. Poster-led HTML5 `<video>` (`controls`, `preload="none"`, WebP poster, closed captions, transcript) + 3 structured proof cards.
5. **`SolutionMatrix`**: Outdoor Weatherproof ($5,500\text{–}10,000\text{ nits}$) vs. Indoor Fine-Pitch ($600\text{–}800\text{ nits}$) with viewing-distance-to-pixel-pitch explanation.
6. **`ProcessTimeline`**: 4-stage delivery timeline (Feasibility $\rightarrow$ Engineering Scope & Board Quote $\rightarrow$ Turnkey Installation $\rightarrow$ Handover & Training).
7. **`TrustSupportGrid`**: 3-layer system architecture + 3 operational reassurance blocks.
8. **`FaqAccordion`**: 6 native `<details>/<summary>` accordions resolving objections.
9. **`PropertyQuoteForm`**: Primary 2-column conversion section with 8 required fields, single-tap 4-pill selectors, SA phone format normalisation, and POPIA purpose disclosure.
10. **`AdvertisingEnquiryForm`**: Secondary 5-field media inquiry module with distinct charcoal border.
11. **`SiteFooter`**: Dark charcoal surface with accessible white/sky-blue links, POPIA/PAIA notice link, and corporate details.
12. **`MobileStickyCta`**: Bottom floating action bar on `< 768px` viewports with automatic scroll hide.

---

## 6. Motion & Visual Guardrails

### Motion Constraints
* Micro-interactions capped at `150ms ease` for background/border changes.
* Full support for user accessibility preferences:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

### Visual Anti-Patterns (Strictly Prohibited)
* ❌ No dark-mode neon glows, rainbow gradients, or glassmorphic blobs.
* ❌ No synthetic 3D AI illustrations or generic overseas billboard stock photos.
* ❌ No autoplay background videos that consume user bandwidth and hurt LCP.
* ❌ No fake review star ratings or fabricated client logo carousels.
* ❌ No floating bottom-right chat widgets that block keyboard focus or form fields.
