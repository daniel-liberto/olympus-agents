# Design Tokens — CryptoFolio (Desktop)

## Color Palette (CSS Variables — HSL, NO alpha)

### Dark Theme (default)

```css
:root {
  --radius: 0.75rem;
}

.dark {
  /* Backgrounds */
  --background: 0 0% 4%;            /* zinc-950 — page bg */
  --foreground: 0 0% 98%;           /* zinc-50 — primary text */

  /* Cards & Surfaces */
  --card: 0 0% 7%;                  /* zinc-900 — card bg */
  --card-foreground: 0 0% 98%;      /* zinc-50 */

  /* Muted / Subtle */
  --muted: 0 0% 10%;               /* zinc-800 */
  --muted-foreground: 0 0% 45%;    /* zinc-500 — helper text */

  /* Borders & Inputs */
  --border: 0 0% 15%;              /* zinc-800 — default borders */
  --input: 0 0% 12%;               /* zinc-850 — input bg */
  --ring: 36 100% 50%;             /* amber-500 — focus ring */

  /* Primary (Amber/Orange) */
  --primary: 36 100% 50%;          /* amber-500 */
  --primary-foreground: 0 0% 4%;   /* dark text on amber */

  /* Secondary */
  --secondary: 0 0% 12%;           /* zinc-850 */
  --secondary-foreground: 0 0% 98%;

  /* Accent */
  --accent: 0 0% 12%;              /* zinc-850 */
  --accent-foreground: 0 0% 98%;

  /* Destructive */
  --destructive: 0 84% 60%;        /* red-500 */
  --destructive-foreground: 0 0% 98%;

  /* Success */
  --success: 160 84% 39%;          /* emerald-600 */
  --success-foreground: 0 0% 98%;

  /* Warning */
  --warning: 45 93% 47%;           /* amber-500 */
  --warning-foreground: 0 0% 4%;

  /* Popover */
  --popover: 0 0% 7%;
  --popover-foreground: 0 0% 98%;

  /* Sidebar specific */
  --sidebar: 0 0% 5%;              /* slightly darker than cards */
  --sidebar-foreground: 0 0% 60%;  /* muted for inactive items */
  --sidebar-active: 0 0% 12%;     /* bg for active nav item */
  --sidebar-active-foreground: 0 0% 98%;

  /* Chart colors */
  --chart-1: 36 100% 50%;          /* amber — primary line */
  --chart-2: 160 84% 39%;          /* emerald — secondary */
  --chart-3: 217 91% 60%;          /* blue — tertiary */
  --chart-4: 280 65% 60%;          /* purple — quaternary */
  --chart-5: 0 84% 60%;            /* red — negative */
}
```

### Light Theme (optional)

```css
.light {
  --background: 0 0% 100%;
  --foreground: 0 0% 4%;
  --card: 0 0% 98%;
  --card-foreground: 0 0% 4%;
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 45%;
  --border: 0 0% 90%;
  --input: 0 0% 96%;
  --ring: 36 100% 50%;
  --primary: 36 100% 50%;
  --primary-foreground: 0 0% 100%;
  --secondary: 0 0% 96%;
  --secondary-foreground: 0 0% 10%;
  --accent: 0 0% 96%;
  --accent-foreground: 0 0% 10%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --success: 160 84% 39%;
  --success-foreground: 0 0% 100%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 4%;
}
```

### Zinc Mapping Reference

| Token | Dark Value | Zinc Step |
|-------|-----------|-----------|
| `--background` | 0 0% 4% | zinc-950 |
| `--card` | 0 0% 7% | zinc-900 |
| `--muted` | 0 0% 10% | zinc-800 |
| `--border` | 0 0% 15% | zinc-800 |
| `--input` | 0 0% 12% | ~zinc-850 |
| `--muted-foreground` | 0 0% 45% | zinc-500 |
| `--foreground` | 0 0% 98% | zinc-50 |

---

## Typography

### Font Stack

```css
--font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
```

### Type Scale

| Level | Tailwind | Size | Weight | Line Height | Use |
|-------|----------|------|--------|-------------|-----|
| h1 | `text-3xl font-bold` | 30px | 700 | 1.2 | Page titles |
| h2 | `text-2xl font-semibold` | 24px | 600 | 1.3 | Section titles |
| h3 | `text-xl font-semibold` | 20px | 600 | 1.4 | Card titles |
| h4 | `text-lg font-medium` | 18px | 500 | 1.4 | Sub-section |
| body | `text-sm` | 14px | 400 | 1.5 | Default text |
| small | `text-xs` | 12px | 400 | 1.5 | Captions, badges |
| mono | `text-sm font-mono` | 14px | 400 | 1.5 | Addresses, hashes |

### Text Colors

| Use | Class | Token |
|-----|-------|-------|
| Headings / emphasis | `text-foreground` | zinc-50 |
| Body text | `text-foreground` | zinc-50 |
| Secondary text | `text-zinc-400` | zinc-400 |
| Muted / helper | `text-muted-foreground` | zinc-500 |
| Disabled | `text-zinc-600` | zinc-600 (only on light backgrounds!) |
| Links / primary | `text-primary` | amber-500 |

---

## Spacing

### Scale (Tailwind)

| Token | Value | Use |
|-------|-------|-----|
| `p-1` | 4px | Icon padding |
| `p-2` | 8px | Badge padding, tight gaps |
| `p-3` | 12px | Input padding, small card padding |
| `p-4` | 16px | Card padding, section gaps |
| `p-6` | 24px | Main content padding, large gaps |
| `p-8` | 32px | Page section spacing |
| `gap-2` | 8px | Inline element gaps |
| `gap-3` | 12px | Form field gaps |
| `gap-4` | 16px | Card gaps, button groups |
| `gap-6` | 24px | Section gaps |
| `gap-8` | 32px | Major section spacing |

### Layout Spacing

| Area | Value |
|------|-------|
| Sidebar width | `w-64` (256px) |
| Main content padding | `p-6` (24px) |
| Main content max-width | `max-w-7xl` (1280px) |
| Card internal padding | `p-6` |
| Page header bottom margin | `mb-6` |
| Section gap | `gap-6` |

---

## Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius` | 0.75rem (12px) | Default for cards, modals |
| `rounded-lg` | 0.5rem (8px) | Inputs, buttons |
| `rounded-xl` | 0.75rem (12px) | Cards |
| `rounded-2xl` | 1rem (16px) | Modals, large cards |
| `rounded-full` | 9999px | Avatars, badges, pill buttons |

---

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.1);
```

Use sparingly on dark theme — prefer border separation over shadow.

---

## Focus & Motion

### Focus Ring

```css
focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
```

### Transitions

| Type | Duration | Use |
|------|----------|-----|
| Hover | `duration-150` | Buttons, links |
| Color change | `duration-200` | Background, border |
| Transform | `duration-200` | Scale, translate |
| Modal | `duration-300` | Open/close |
| Sidebar (mobile) | `duration-300` | Slide in/out |

---

## Status Badge Colors

| Status | Badge Variant | Colors |
|--------|--------------|--------|
| Pending | `bg-warning/10 text-warning border-warning/20` | Amber |
| Processing | `bg-primary/10 text-primary border-primary/20` | Amber (animated pulse) |
| Confirmed / Success | `bg-success/10 text-success border-success/20` | Emerald |
| Failed / Error | `bg-destructive/10 text-destructive border-destructive/20` | Red |
| Cancelled | `bg-muted text-muted-foreground border-border` | Zinc |

---

## Icon Sizes

| Context | Size | Tailwind |
|---------|------|----------|
| Sidebar nav | 20px | `w-5 h-5` |
| Button icon | 16px | `w-4 h-4` |
| Card header icon | 24px | `w-6 h-6` |
| Empty state icon | 48-64px | `w-12 h-12` to `w-16 h-16` |
| Coin icon (table) | 32px | `w-8 h-8 rounded-full` |
| Coin icon (header) | 40px | `w-10 h-10 rounded-full` |
| Avatar | 32-40px | `w-8 h-8` to `w-10 h-10 rounded-full` |
