# Design System Specification (DESIGN.md)
**Project**: South African Commercial & Estate LED Display Infrastructure  
**Standard**: Architectural Engineering Minimalism & WCAG 2.2 Level AA Compliance  
**Aesthetic**: Bespoke, High-Contrast Editorial (De-Carded, Hairline Divided, Typographically Led)

---

## 1. Core Visual Concept & Philosophy
The redesign eliminates the repetitive "AI-generated frontend" signature:
- **De-Carded Structure**: Zero rounded white cards, heavy drop shadows, or box-inside-a-box wrappers in 75%+ of sections. Content is structured using crisp 1px hairline dividers (`#E5E7EB`) and generous vertical whitespace.
- **Obsidian & Alabaster Contrast**: Shift away from generic SaaS royal blue (`#2563EB`) to deep **Architectural Obsidian (`#0B0F17`)** and warm **Alabaster (`#F7F7F5`)**.
- **Hardware Chassis Break**: The 3-Layer System Architecture sits on solid Obsidian (`#0B0F17`) to evoke the physical presence of industrial display engineering.
- **Editorial Typography**: Headings with tight letter-spacing (`-0.03em`), font-weight 500/600, and generous bottom margins (`mb-12`). Eliminates bloated introductory paragraphs beneath titles.
- **Crisp Density**: Either a 2-line description OR 3 four-word specs—never both.

---

## 2. Color Palette & Contrast Tokens

All pairings pass W3C relative luminance thresholds:

| Token Name | Hex Value | Target Surface | Contrast Ratio | Compliance Level |
| :--- | :--- | :--- | :--- | :--- |
| `--color-bg-primary` | `#FFFFFF` | Base surface | N/A | Pure White |
| `--color-bg-stone` | `#F7F7F5` | Alternating section | N/A | Warm Alabaster |
| `--color-bg-obsidian`| `#0B0F17` | Hardware chassis | N/A | Deep Obsidian |
| `--color-bg-dark-elev`| `#141A23` | Dark elevated element | N/A | Chassis secondary |
| `--color-text-primary`| `#0B0F17` | `#FFFFFF` / `#F7F7F5`| **17.5:1** | WCAG AAA |
| `--color-text-secondary`| `#525866`| `#FFFFFF` | **7.02:1** | WCAG AAA |
| `--color-text-muted` | `#8E95A3` | `#FFFFFF` | **3.85:1** | Secondary captions |
| `--color-text-on-dark`| `#FFFFFF` | `#0B0F17` | **17.5:1** | WCAG AAA |
| `--color-text-muted-dark`| `#94A3B8`| `#0B0F17` | **7.85:1** | WCAG AAA |
| `--color-accent-cyan`| `#38BDF8` | `#0B0F17` | **10.2:1** | Active Indicator AAA |
| `--color-border-hairline`| `#E5E7EB`| Light surfaces | 1px boundary | Hairline divider |
| `--color-border-dark`| `#1E2533` | Dark surfaces | 1px boundary | Dark divider |
| `--color-border-input`| `#64748B` | Input fields | **4.76:1** | WCAG 3.0:1 UI |
| `--color-focus-ring` | `#0B0F17` | Focused control | `2px offset` | High contrast |

---

## 3. Typography Hierarchy

### Font Families
* **Primary Sans-Serif (`--font-sans`)**:  
  `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
* **Technical Monospace (`--font-mono`)**:  
  `'JetBrains Mono', ui-monospace, SFMono-Regular, monospace`  
  *Used for subtle index numbers (`01 / APPLICATIONS`, `02 / PROCESS`), technical specifications, and tabular values.*

### Scale & Tracking
* **`h1` (Display)**: `font-size: clamp(2.5rem, 4.5vw + 1rem, 4.25rem); font-weight: 600; letter-spacing: -0.035em; line-height: 1.08;`
* **`h2` (Section)**: `font-size: clamp(1.75rem, 2.5vw + 0.8rem, 2.5rem); font-weight: 500; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: clamp(2.5rem, 5vw, 4rem);`
* **`h3` (Component)**: `font-size: clamp(1.25rem, 1.5vw + 0.6rem, 1.5rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.3;`
* **Body Text**: `font-size: 1.0625rem (17px); line-height: 1.6; max-width: 65ch;`
* **Form Inputs**: `font-size: 1rem (16px minimum);`

---

## 4. Layout, Spacing & Hairline System

### Vertical Whitespace
* Section spacing: `padding-block: clamp(5rem, 8vw, 8rem)` on desktop, `clamp(3.5rem, 6vw, 4.5rem)` on mobile.
* Instead of tightly boxed card padding, sections breathe with expansive whitespace.

### The Hairline Divider Rule
* 75%+ of elements are separated by simple 1px hairline rules:
  ```css
  .hairline-t { border-top: 1px solid var(--color-border-hairline); }
  .hairline-b { border-bottom: 1px solid var(--color-border-hairline); }
  ```

### Interactive Touch Targets (WCAG 2.2 SC 2.5.8)
* All buttons, toggles, segmented pills, and summary rows measure $\ge 44 \times 44\text{ CSS px}$.
