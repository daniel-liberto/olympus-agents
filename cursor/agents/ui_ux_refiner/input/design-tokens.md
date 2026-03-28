# CryptoFolio — Design Tokens (Dark Theme)

**Product:** CryptoFolio (simplified crypto wallet)  
**Platform:** Web — React + Vite + TypeScript + TailwindCSS  
**Default theme:** Dark  
**Font:** Inter (system fallback: `ui-sans-serif, system-ui, sans-serif`)

This document is the single source of truth for **color**, **typography**, **spacing**, **radius**, **shadow**, **motion**, and **semantic mapping** for implementation (including Tailwind `theme.extend`).

---

## 1. Color primitives

### 1.1 Background & canvas

| Token | Hex | Usage |
|-------|-----|--------|
| `color-bg-base` | `#0A0A0F` | App root background, deepest layer |
| `color-bg-raised` | `#12121A` | Main content area behind cards |
| `color-bg-elevated` | `#1A1A2E` | Sticky headers, subtle sections |

### 1.2 Surfaces (cards, panels, inputs)

| Token | Hex | Usage |
|-------|-----|--------|
| `color-surface-default` | `#1E1E32` | Cards, modals, dropdown panels |
| `color-surface-muted` | `#25253D` | Inset areas, secondary panels, table stripes |

### 1.3 Accent / primary

| Token | Hex | Usage |
|-------|-----|--------|
| `color-accent-primary` | `#6C5CE7` | Primary buttons, key links, focus rings (with alpha) |
| `color-accent-primary-hover` | `#7B6CF0` | Hover state (slightly lighter) |
| `color-accent-primary-active` | `#5A4BD4` | Active/pressed |
| `color-accent-soft` | `#A29BFE` | Secondary highlights, charts, decorative emphasis |

### 1.4 Semantic

| Token | Hex | Usage |
|-------|-----|--------|
| `color-success` | `#00D68F` | Success toast, positive delta, completed steps |
| `color-error` | `#FF6B6B` | Errors, destructive emphasis, failed states |
| `color-warning` | `#FFD93D` | Warnings, pending, attention without failure |

### 1.5 Text

| Token | Hex | Usage |
|-------|-----|--------|
| `color-text-primary` | `#FFFFFF` | Headings, primary values |
| `color-text-secondary` | `#8B8BA3` | Subtitles, labels, helper text |
| `color-text-muted` | `#5A5A7A` | Placeholders, disabled text, meta |

### 1.6 Border & divider

| Token | Hex | Usage |
|-------|-----|--------|
| `color-border` | `#2A2A45` | Default borders, dividers, input outlines |

### 1.7 Alpha helpers (recommended)

| Token | Value | Usage |
|-------|--------|--------|
| `color-accent-primary/15` | `#6C5CE7` @ 15% | Focus ring fill, subtle fills |
| `color-overlay-scrim` | `rgba(10, 10, 15, 0.72)` | Modal backdrop |
| `color-glow-accent` | `rgba(108, 92, 231, 0.35)` | Outer glow for hovers (see shadows) |

---

## 2. Semantic color mapping (UI roles)

| Role | Light-on-dark mapping |
|------|------------------------|
| Page background | `color-bg-base` |
| Main column | `color-bg-raised` |
| Card / modal body | `color-surface-default` |
| Nested / inset | `color-surface-muted` |
| Primary action | `color-accent-primary` |
| Link | `color-accent-soft` (underline on hover optional) |
| Positive change | `color-success` |
| Negative change / error | `color-error` |
| Warning | `color-warning` |
| Border default | `color-border` |

---

## 3. Typography

### 3.1 Font family

```text
font-sans: "Inter", ui-sans-serif, system-ui, sans-serif
```

Load Inter via `@fontsource/inter` or Google Fonts; weights **400**, **500**, **600**, **700**.

### 3.2 Font sizes (px)

| Token | Size (px) | Typical use |
|-------|-----------|-------------|
| `text-xs` | 12 | Captions, meta, table headers |
| `text-sm` | 14 | Body secondary, form hints, nav |
| `text-base` | 16 | Default body |
| `text-lg` | 18 | Section titles, card titles |
| `text-xl` | 20 | Dialog titles |
| `text-2xl` | 24 | Page subtitles |
| `text-3xl` | 30 | Page titles |
| `text-4xl` | 36 | Hero balance (desktop) |
| `text-5xl` | 48 | Marketing / empty hero only — use sparingly |

**BalanceCard primary figure:** `text-4xl` (36px) or `text-5xl` (48px) at 1280px+ for emphasis.

### 3.3 Font weights

| Token | Weight | Use |
|-------|--------|-----|
| `font-normal` | 400 | Body |
| `font-medium` | 500 | Buttons, labels |
| `font-semibold` | 600 | Card titles, section headings |
| `font-bold` | 700 | Page titles, balance |

### 3.4 Line height & letter spacing

- **Body:** `leading-relaxed` (1.625) for long copy; **UI labels:** `leading-tight` or `leading-snug`.
- **Uppercase labels:** `tracking-wide`, `text-xs`, `text-muted`.

---

## 4. Spacing scale

**Base unit:** 4px. Use multiples only from this scale for padding, margin, and gap.

| Token | Value | px |
|-------|-------|-----|
| `space-1` | 1× | 4 |
| `space-2` | 2× | 8 |
| `space-3` | 3× | 12 |
| `space-4` | 4× | 16 |
| `space-5` | 5× | 20 |
| `space-6` | 6× | 24 |
| `space-8` | 8× | 32 |
| `space-10` | 10× | 40 |
| `space-12` | 12× | 48 |
| `space-16` | 16× | 64 |

**Guidance**

- **Component internal padding:** 16–24px (`space-4`–`space-6`).
- **Section gaps:** 32–40px (`space-8`–`space-10`).
- **Card grid gaps:** 16–24px (`space-4`–`space-6`).

---

## 5. Border radius

| Token | Value | Use |
|-------|--------|-----|
| `radius-sm` | 6px | Small chips, compact inputs |
| `radius-md` | 8px | Buttons, standard inputs |
| `radius-lg` | 12px | Cards, dropdowns |
| `radius-xl` | 16px | Modals, hero BalanceCard |
| `radius-full` | 9999px | Pills, avatars, circular FAB |

---

## 6. Shadows & elevation (dark theme)

Dark UI uses **subtle elevation** and **soft glow** instead of heavy black shadows.

### 6.1 Elevation levels

| Token | CSS (indicative) | Use |
|-------|------------------|-----|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.45)` | Resting cards |
| `shadow-md` | `0 4px 12px rgba(0,0,0,0.5)` | Dropdowns, popovers |
| `shadow-lg` | `0 12px 40px rgba(0,0,0,0.55)` | Modals |

### 6.2 Glow (accent)

| Token | CSS (indicative) | Use |
|-------|------------------|-----|
| `glow-accent-subtle` | `0 0 0 1px rgba(108,92,231,0.25), 0 0 24px rgba(108,92,231,0.15)` | Card hover (CoinCard) |
| `glow-accent-strong` | `0 0 32px rgba(162,155,254,0.2)` | Focus marketing elements only |

### 6.3 Inner shadow (inputs)

| Token | Use |
|-------|-----|
| `inset-highlight` | Optional `inset 0 1px 0 rgba(255,255,255,0.06)` on inputs for depth |

---

## 7. Borders & outlines

- **Default border:** 1px solid `color-border` (`#2A2A45`).
- **Focus ring:** 2px solid `color-accent-primary` at 40% opacity on ring offset 2px, or Tailwind: `ring-2 ring-[#6C5CE7]/40 ring-offset-2 ring-offset-[#0A0A0F]`.
- **Error ring:** `ring-2 ring-[#FF6B6B]/50`.

---

## 8. Motion & transitions

| Token | Value | Use |
|-------|--------|-----|
| `duration-fast` | 150ms | Hover color, border, opacity, button press |
| `duration-base` | 200ms | Dropdown open (optional) |
| `duration-slow` | 300ms | Modal enter/exit, backdrop |
| `easing-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard interactions |
| `easing-emphasized` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Modal panel |

**Rules**

- **Interactions (hover, focus, toggle):** **150ms** + `ease-default`.
- **Modals / large panels:** **300ms** + `ease-emphasized`.
- Respect **`prefers-reduced-motion: reduce`**: replace transitions with opacity-only or instant state change.

---

## 9. Z-index scale

| Layer | Value |
|-------|--------|
| Base | 0 |
| Sticky header | 10 |
| Sidebar | 20 |
| FAB | 30 |
| Modal backdrop | 40 |
| Modal | 50 |
| Toast | 60 |

---

## 10. Tailwind `theme.extend` (reference snippet)

Implement tokens once in `tailwind.config` / CSS variables:

```js
// Illustrative — align with your project structure
theme: {
  extend: {
    colors: {
      bg: { base: "#0A0A0F", raised: "#12121A", elevated: "#1A1A2E" },
      surface: { DEFAULT: "#1E1E32", muted: "#25253D" },
      accent: { DEFAULT: "#6C5CE7", soft: "#A29BFE" },
      success: "#00D68F",
      error: "#FF6B6B",
      warning: "#FFD93D",
      content: { primary: "#FFFFFF", secondary: "#8B8BA3", muted: "#5A5A7A" },
      border: "#2A2A45",
    },
    fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
    fontSize: {
      xs: ["12px", { lineHeight: "1rem" }],
      sm: ["14px", { lineHeight: "1.25rem" }],
      base: ["16px", { lineHeight: "1.5rem" }],
      // ... map remaining sizes
    },
    spacing: {
      // 4,8,12,16,20,24,32,40,48,64 already partly covered by Tailwind defaults;
      // ensure custom names if using token aliases
    },
    borderRadius: {
      sm: "6px",
      md: "8px",
      lg: "12px",
      xl: "16px",
    },
    boxShadow: {
      glow: "0 0 24px rgba(108, 92, 231, 0.15)",
      "glow-strong": "0 0 32px rgba(162, 155, 254, 0.2)",
    },
    transitionDuration: {
      fast: "150ms",
      slow: "300ms",
    },
  },
},
```

Prefer **CSS variables** at `:root` for runtime theming (future light mode):

```css
:root {
  --color-bg-base: #0a0a0f;
  --color-accent-primary: #6c5ce7;
  /* ... */
}
```

---

## 11. Iconography & imagery

- **Stroke width:** 1.5–2px for 20–24px icons; consistent set (e.g. Lucide).
- **Crypto icons:** Circular avatars **32–40px** in cards; **24px** in lists.
- **No token-specific imagery** required for MVP; use neutral geometric empty states.

---

## 12. Accessibility targets

- **Contrast:** Primary text on surfaces ≥ WCAG AA; `#8B8BA3` on `#1E1E32` — verify large text only or bump secondary to `#9B9BB5` if audit fails.
- **Interactive targets:** Minimum **40×40px** (sidebar, toggles, icon buttons).
- **Focus:** Always visible; never rely on color alone for errors (add icon + text).

---

## 13. Changelog

| Date | Notes |
|------|--------|
| 2026-03-28 | Initial dark-theme token set for CryptoFolio desktop |
