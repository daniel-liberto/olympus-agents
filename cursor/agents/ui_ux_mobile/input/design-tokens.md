# Crypto Wallet Dashboard — Design Tokens (Desktop)

**Apollo · Desktop UI/UX**  
Dark-first, premium crypto dashboard. **Neutrals:** zinc only (no `gray`). **Primary / CTAs:** amber–orange. **Success:** emerald. **Destructive / errors:** red.

Values use **HSL components** (no `hsl()` wrapper) so they work with `hsl(var(--token) / <alpha>)` in Tailwind/CSS.

---

## 1. Colors (HSL CSS Variables)

### Zinc scale reference (Tailwind-aligned)

| Step | HSL components | Typical use |
|------|----------------|-------------|
| zinc-50 | `0 0% 98%` | Light theme surfaces |
| zinc-100 | `240 4.8% 95.9%` | Light borders, muted bg |
| zinc-200 | `240 5.9% 90%` | Light dividers |
| zinc-300 | `240 4.9% 83.9%` | Light inputs |
| zinc-400 | `240 5% 64.9%` | Muted text (dark theme) |
| zinc-500 | `240 4.8% 45.9%` | Placeholder, tertiary |
| zinc-600 | `240 5.2% 33.9%` | Icons secondary (light) |
| zinc-700 | `240 5.3% 26.1%` | Borders (light) |
| zinc-800 | `240 3.7% 15.9%` | Cards, borders, inputs (dark) |
| zinc-900 | `240 5.9% 10%` | Elevated surfaces (dark) |
| zinc-950 | `240 10% 3.9%` | App background (dark) |

### Accent / semantic (Tailwind-aligned)

| Token | HSL components | Notes |
|-------|----------------|--------|
| amber-500 (primary) | `38 92% 50%` | CTAs, focus ring, warnings |
| emerald-500 (success) | `160 84% 39%` | Gains, confirmed, success |
| red-500 (destructive) | `0 84% 60%` | Losses, errors, failed |

### Dark theme (default)

```css
:root {
  /* Dark theme (default) — zinc neutrals only */
  --background: 240 10% 3.9%;              /* zinc-950 */
  --foreground: 240 4.8% 95.9%;           /* zinc-100 */

  --card: 240 5.9% 10%;                   /* zinc-900 */
  --card-foreground: 240 4.8% 95.9%;      /* zinc-100 */

  --popover: 240 5.9% 10%;                /* zinc-900 */
  --popover-foreground: 240 4.8% 95.9%;  /* zinc-100 */

  --primary: 38 92% 50%;                  /* amber-500 */
  --primary-foreground: 240 10% 3.9%;   /* zinc-950 — readable on amber */

  --secondary: 240 3.7% 15.9%;            /* zinc-800 */
  --secondary-foreground: 240 4.8% 95.9%; /* zinc-100 */

  --muted: 240 3.7% 15.9%;                 /* zinc-800 */
  --muted-foreground: 240 5% 64.9%;       /* zinc-400 */

  --accent: 240 3.7% 15.9%;                /* zinc-800 — subtle hover surface */
  --accent-foreground: 240 4.8% 95.9%;    /* zinc-100 */

  --destructive: 0 84% 60%;               /* red-500 */
  --destructive-foreground: 0 0% 100%;     /* white */

  --success: 160 84% 39%;                 /* emerald-500 */
  --success-foreground: 0 0% 100%;      /* white */

  --warning: 38 92% 50%;                  /* amber-500 */
  --warning-foreground: 240 10% 3.9%;    /* zinc-950 */

  --border: 240 3.7% 15.9%;               /* zinc-800 */
  --input: 240 3.7% 15.9%;                /* zinc-800 */
  --ring: 38 92% 50%;                     /* amber-500 */

  /* Domain — wallet / markets */
  --price-up: 160 84% 39%;                /* emerald-500 — positive Δ */
  --price-down: 0 84% 60%;                /* red-500 — negative Δ */
  --badge-pending: 38 92% 50%;            /* amber-500 */
  --badge-confirmed: 160 84% 39%;         /* emerald-500 */
  --badge-failed: 0 84% 60%;              /* red-500 */
}
```

**Semantic → zinc mapping (dark)**

| CSS variable | Zinc step | Role |
|--------------|-----------|------|
| `--background` | zinc-950 | Page canvas |
| `--foreground` | zinc-100 | Primary text |
| `--card`, `--popover` | zinc-900 | Panels, dropdowns |
| `--secondary`, `--muted`, `--accent`, `--border`, `--input` | zinc-800 | Chrome, fields, hairlines |
| `--muted-foreground` | zinc-400 | Secondary labels, hints |
| `--primary-foreground` | zinc-950 | Text on solid primary |

### Light theme overrides

Apply on `html.light`, `[data-theme="light"]`, or `.light` — match your app’s theme switch.

```css
:root.light,
[data-theme="light"],
.light {
  --background: 0 0% 98%;                 /* zinc-50 */
  --foreground: 240 10% 3.9%;             /* zinc-950 */

  --card: 0 0% 100%;                      /* white — or use zinc-50 */
  --card-foreground: 240 10% 3.9%;        /* zinc-950 */

  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;

  --primary: 38 92% 50%;                  /* amber-500 — unchanged */
  --primary-foreground: 240 10% 3.9%;     /* zinc-950 */

  --secondary: 240 4.8% 95.9%;            /* zinc-100 */
  --secondary-foreground: 240 10% 3.9%;  /* zinc-950 */

  --muted: 240 4.8% 95.9%;                /* zinc-100 */
  --muted-foreground: 240 5.2% 33.9%;     /* zinc-600 */

  --accent: 240 4.8% 95.9%;                /* zinc-100 */
  --accent-foreground: 240 10% 3.9%;      /* zinc-950 */

  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;

  --success: 160 84% 39%;
  --success-foreground: 0 0% 100%;

  --warning: 38 92% 50%;
  --warning-foreground: 240 10% 3.9%;

  --border: 240 5.9% 90%;                  /* zinc-200 */
  --input: 240 5.9% 90%;                   /* zinc-200 */
  --ring: 38 92% 50%;

  --price-up: 160 84% 39%;
  --price-down: 0 84% 60%;
  --badge-pending: 38 92% 50%;
  --badge-confirmed: 160 84% 39%;
  --badge-failed: 0 84% 60%;
}
```

### Tailwind `theme.extend.colors` (optional)

```js
// tailwind.config.js — map to CSS variables
colors: {
  background: 'hsl(var(--background) / <alpha-value>)',
  foreground: 'hsl(var(--foreground) / <alpha-value>)',
  card: { DEFAULT: 'hsl(var(--card) / <alpha-value>)', foreground: 'hsl(var(--card-foreground) / <alpha-value>)' },
  popover: { DEFAULT: 'hsl(var(--popover) / <alpha-value>)', foreground: 'hsl(var(--popover-foreground) / <alpha-value>)' },
  primary: { DEFAULT: 'hsl(var(--primary) / <alpha-value>)', foreground: 'hsl(var(--primary-foreground) / <alpha-value>)' },
  secondary: { DEFAULT: 'hsl(var(--secondary) / <alpha-value>)', foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)' },
  muted: { DEFAULT: 'hsl(var(--muted) / <alpha-value>)', foreground: 'hsl(var(--muted-foreground) / <alpha-value>)' },
  accent: { DEFAULT: 'hsl(var(--accent) / <alpha-value>)', foreground: 'hsl(var(--accent-foreground) / <alpha-value>)' },
  destructive: { DEFAULT: 'hsl(var(--destructive) / <alpha-value>)', foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)' },
  success: { DEFAULT: 'hsl(var(--success) / <alpha-value>)', foreground: 'hsl(var(--success-foreground) / <alpha-value>)' },
  warning: { DEFAULT: 'hsl(var(--warning) / <alpha-value>)', foreground: 'hsl(var(--warning-foreground) / <alpha-value>)' },
  border: 'hsl(var(--border) / <alpha-value>)',
  input: 'hsl(var(--input) / <alpha-value>)',
  ring: 'hsl(var(--ring) / <alpha-value>)',
  price: { up: 'hsl(var(--price-up) / <alpha-value>)', down: 'hsl(var(--price-down) / <alpha-value>)' },
  badge: {
    pending: 'hsl(var(--badge-pending) / <alpha-value>)',
    confirmed: 'hsl(var(--badge-confirmed) / <alpha-value>)',
    failed: 'hsl(var(--badge-failed) / <alpha-value>)',
  },
},
```

---

## 2. Typography

### Font stacks

```css
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
```

Load **Inter** and **JetBrains Mono** via `@font-face` or a font CDN; `font-feature-settings` for tabular numbers on balances is recommended: `font-variant-numeric: tabular-nums` on numeric UI.

### Type scale

| Role | Size | Weight | Line height | Letter spacing |
|------|------|--------|-------------|----------------|
| **h1** | `2.25rem` (36px) | 700 (bold) | 1.2 | `-0.02em` |
| **h2** | `1.875rem` (30px) | 600 (semibold) | 1.25 | `-0.02em` |
| **h3** | `1.5rem` (24px) | 600 (semibold) | 1.3 | `-0.015em` |
| **h4** | `1.25rem` (20px) | 500 (medium) | 1.4 | `-0.01em` |
| **body** | `1rem` (16px) | 400 (normal) | 1.5 | `0` |
| **small** | `0.875rem` (14px) | 400 | 1.5 | `0` |
| **xs** | `0.75rem` (12px) | 400 | 1.5 | `0.01em` (slight positive for readability) |
| **mono** | inherit or `0.875rem` for dense rows | 400–500 | 1.45 | `0` |

**Usage:** headings for page/section titles; **mono** for wallet addresses, tx hashes, raw amounts, and seed-phrase slots (never for long prose).

---

## 3. Spacing

- **Base unit:** `4px` → `0.25rem` → Tailwind `1`
- **Scale** (Tailwind spacing keys → rem):  
  `0` → 0 · `0.5` → 0.125rem · `1` → 0.25rem · `1.5` → 0.375rem · `2` → 0.5rem · `2.5` → 0.625rem · `3` → 0.75rem · `4` → 1rem · `5` → 1.25rem · `6` → 1.5rem · `8` → 2rem · `10` → 2.5rem · `12` → 3rem · `16` → 4rem · `20` → 5rem · `24` → 6rem

**Standard layout**

| Pattern | Token / class | Value |
|---------|----------------|-------|
| Card padding | `p-6` | 1.5rem (24px) |
| Section vertical rhythm | `space-y-6` | 1.5rem between blocks |
| Desktop sidebar width | `w-64` | 16rem (256px) |
| Main content max width | `max-w-7xl` | 80rem (1280px) |

---

## 4. Border Radius

```css
:root {
  --radius-sm: 0.375rem;   /* 6px — Tailwind rounded-md */
  --radius-md: 0.5rem;     /* 8px — rounded-lg */
  --radius-lg: 0.75rem;    /* 12px — rounded-xl */
  --radius-full: 9999px;   /* pills, avatars, circular badges */
}
```

| Component | Variable / convention |
|-----------|------------------------|
| Cards, panels | `--radius-lg` (0.75rem) |
| Buttons, inputs | `--radius-md` (0.5rem) |
| Inline chips, small controls | `--radius-sm` (0.375rem) |
| Badges, status pills | `--radius-full` or `rounded-full` |
| Avatars | `--radius-full` |

Tailwind: `rounded-lg` for cards; `rounded-md` for buttons/inputs; `rounded-full` for badges/avatars.

---

## 5. Shadows

Zinc-tinted, **no pure black** — use `zinc-950` hue with low alpha.

```css
:root {
  /* Based on zinc-950: 240 10% 3.9% */
  --shadow-sm: 0 1px 2px hsl(240 10% 3.9% / 0.1);
  --shadow-md: 0 4px 6px -1px hsl(240 10% 3.9% / 0.15), 0 2px 4px -2px hsl(240 10% 3.9% / 0.1);
  --shadow-lg: 0 10px 15px -3px hsl(240 10% 3.9% / 0.2), 0 4px 6px -4px hsl(240 10% 3.9% / 0.1);
}
```

| Level | Use |
|-------|-----|
| sm | Subtle lift: list rows, small cards |
| md | Default cards, dropdowns |
| lg | Modals, command palette, prominent panels |

Light theme: same structure; optionally reduce alpha slightly if surfaces read too heavy.

---

## 6. Focus & Motion

### Focus

- **Ring width:** 2px (`ring-2`)
- **Ring color:** `hsl(var(--ring))` → amber-500
- **Offset:** `ring-offset-2`; offset background = `hsl(var(--background))` so rings stay visible on zinc surfaces
- **Outline:** prefer `focus-visible` for keyboard users; avoid double focus on mouse click where possible

Example (Tailwind-style):

`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`

### Transitions

| Context | Duration | Easing |
|---------|----------|--------|
| Hover / focus (buttons, links, rows) | 150ms | `ease` or `cubic-bezier(0.4, 0, 0.2, 1)` |
| Modals, sheets, drawers | 200ms | `ease-out` enter, `ease-in` exit |
| Page / route transitions | 300ms | `ease-in-out` |

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Respect **prefers-reduced-motion**: shorten or disable transitions/animations; never rely on motion alone for critical information.

---

## 7. Breakpoints

| Name | Min width | Layout notes |
|------|-----------|----------------|
| **sm** | 640px | Narrow tablet / large phone landscape |
| **md** | 768px | Tablet |
| **lg** | 1024px | **Sidebar visible** (persistent app chrome) |
| **xl** | 1280px | Comfortable multi-column dashboard |
| **2xl** | 1536px | Wide dashboards, optional extra columns |

**Rule:** **Sidebar at `lg` and up**; **bottom navigation below `lg`** (`max-lg:`). Align container padding with spacing scale (`px-4` sm, `px-6` lg+ typical).

---

## 8. Z-Index Scale

| Token / layer | Value | Notes |
|---------------|-------|--------|
| Base content | `0` | Default stacking |
| **z-header** | `30` | Top app bar |
| **z-sidebar** | `40` | Fixed sidebar above page content (below overlays) |
| **z-dropdown** | `50` | Menus, popovers, selects |
| **z-modal** | `50` | Dialogs (same tier as dropdown; use DOM order or sub-scale if both open) |
| **z-toast** | `60` | Toasts above modals |
| **z-tooltip** | `70` | Always on top for hints |

If modal + dropdown conflict at the same z-index, raise modal backdrop/content as a group or use `z-[55]` for modal content only — document one approach in the codebase and stay consistent.

---

## Quick implementation checklist

1. Define `:root` dark tokens + `.light` overrides in global CSS.
2. Extend Tailwind `colors`, `borderRadius`, `boxShadow`, `fontFamily`, `zIndex` from variables where useful.
3. Apply `tabular-nums` to portfolio and price columns.
4. Use **zinc** utility names only for raw ramps; ship UI through **semantic** tokens (`background`, `card`, `primary`, etc.).
5. Test focus rings on zinc-900/950 and amber primary buttons for WCAG contrast.

---

*End of design tokens — Crypto Wallet Dashboard (Desktop).*
