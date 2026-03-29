# Refined Design System — CryptoFolio (Hephaestus)

Unified specification merging Apollo (desktop) and Artemis (mobile). **Default theme: dark.** Zinc neutrals, amber primary, emerald success, red destructive. Consume tokens via `hsl(var(--token))` in Tailwind/shadcn patterns; **never** put alpha inside the variable value—use `/10`, `/20` etc. on the class side.

---

## 1. Color System

### 1.1 Dark theme (default)

Apply on `html` or root with class `.dark` (or `[data-theme="dark"]`).

```css
.dark {
  --background: 0 0% 4%;
  --foreground: 0 0% 98%;
  --card: 0 0% 7%;
  --card-foreground: 0 0% 98%;
  --muted: 0 0% 10%;
  --muted-foreground: 0 0% 45%;
  --border: 0 0% 15%;
  --input: 0 0% 12%;
  --ring: 36 100% 50%;
  --primary: 36 100% 50%;
  --primary-foreground: 0 0% 4%;
  --secondary: 0 0% 12%;
  --secondary-foreground: 0 0% 98%;
  --accent: 0 0% 12%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 98%;
  --success: 160 84% 39%;
  --success-foreground: 0 0% 98%;
  --warning: 45 93% 47%;
  --warning-foreground: 0 0% 4%;
  --popover: 0 0% 7%;
  --popover-foreground: 0 0% 98%;
  --sidebar: 0 0% 5%;
  --sidebar-foreground: 0 0% 60%;
  --sidebar-active: 0 0% 12%;
  --sidebar-active-foreground: 0 0% 98%;
  /* Charts (no alpha in vars) */
  --chart-1: 36 100% 50%;
  --chart-2: 160 84% 39%;
  --chart-3: 217 91% 60%;
  --chart-4: 280 65% 60%;
  --chart-5: 0 84% 60%;
}
```

### 1.2 Light theme

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
  --warning: 45 93% 47%;
  --warning-foreground: 0 0% 4%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 4%;
  --sidebar: 0 0% 98%;
  --sidebar-foreground: 0 0% 45%;
  --sidebar-active: 0 0% 96%;
  --sidebar-active-foreground: 0 0% 4%;
  --chart-1: 36 100% 45%;
  --chart-2: 160 84% 35%;
  --chart-3: 217 91% 55%;
  --chart-4: 280 65% 55%;
  --chart-5: 0 84% 55%;
}
```

### 1.3 Semantic usage

| Role | Tokens |
|------|--------|
| Page | `background` / `foreground` |
| Surfaces | `card`, `popover`, `muted` |
| Actions | `primary` + `primary-foreground` |
| Secondary actions | `secondary` + `secondary-foreground` |
| Hover/list highlights | `accent` + `accent-foreground` |
| Danger | `destructive` + `destructive-foreground` |
| Positive | `success` + `success-foreground` |
| Caution / pending | `warning` + `warning-foreground` |
| Nav chrome | `sidebar`, `sidebar-active`, matching foregrounds |

**Forbidden:** using bare `bg-white` / `text-black` for UI chrome. **Exception:** QR code container may use a literal white pad (`bg-white`) for scan contrast—scoped to the QR wrapper only, not global surfaces.

---

## 2. Typography

- **Family:** Inter, `ui-sans-serif`, system-ui, sans-serif (`--font-sans`).
- **Base:** `text-base` (16px), `leading-normal` on body.

| Scale | Classes | Weight | Line height |
|-------|---------|--------|-------------|
| h1 | `text-3xl` or `text-4xl` (hero/marketing) | `font-bold` | `leading-tight` |
| h2 | `text-2xl` | `font-semibold` | `leading-snug` |
| h3 | `text-xl` | `font-semibold` | `leading-snug` |
| h4 | `text-lg` | `font-medium` | `leading-normal` |
| Body | `text-sm`–`text-base` | `font-normal` | `leading-normal` |
| Label | `text-sm` | `font-medium` | `leading-none` |
| Small / caption | `text-xs` | `font-normal` | `leading-relaxed` |
| Mono (addresses, TX) | `font-mono text-sm` | `font-normal` | `leading-normal` |

Section labels (sidebar): `text-xs uppercase tracking-wider text-muted-foreground`.

---

## 3. Spacing & Layout

- **Base grid:** 4px; prefer Tailwind scale (`1` = 4px).
- **App shell (desktop):** sidebar `w-64` (256px), `h-screen`, `sticky top-0 left-0`. Main: `flex-1`, `overflow-y-auto`, inner content `max-w-7xl mx-auto p-6`.
- **Cards & key panels:** internal padding `p-6` unless nested compact rows.
- **Auth cards:** `p-8`, max width `max-w-[420px]`.
- **Mobile safe areas:** `pt-[env(safe-area-inset-top)]`, `pb-[env(safe-area-inset-bottom)]` on fixed chrome.
- **Settings hub (desktop):** sub-nav column `w-56`, content `flex-1 p-6` (align with global main padding).

---

## 4. Radii & Shadows

- **Radius token:** `--radius: 0.75rem` (12px); map to `rounded-lg` default for controls.
- **Cards / modals:** `rounded-xl` to `rounded-2xl` for primary surfaces.
- **Pills / chips:** `rounded-full`.
- **Shadows:** subtle only—`shadow-sm` on cards in light; dark theme often `border border-border` without heavy shadow. Modals/sheets: `shadow-lg` for elevation cue.

---

## 5. Component Patterns

### 5.1 Button variants (semantic tokens only)

| Variant | Implementation |
|---------|----------------|
| **Primary** | `bg-primary text-primary-foreground hover:opacity-90` (or slightly darker primary via overlay) |
| **Secondary** | `bg-secondary text-secondary-foreground hover:bg-accent` |
| **Outline** | `border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground` |
| **Ghost** | `text-foreground hover:bg-accent hover:text-accent-foreground` |
| **Destructive** | `bg-destructive text-destructive-foreground hover:opacity-90` |

**Do not** use `bg-white`, `bg-black`, or raw zinc Tailwind colors for these variants. Loading state: spinner + preserve variant colors; disable pointer events.

### 5.2 Card

- `bg-card text-card-foreground border border-border rounded-xl p-6`
- Optional header: `text-lg font-semibold` + actions row.

### 5.3 Input

- `bg-input border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground`
- Focus: `ring-2 ring-ring ring-offset-2 ring-offset-background`
- Error: `border-destructive` + `text-destructive text-sm mt-1` helper

### 5.4 Select

- Trigger matches Input surface; content uses `popover` colors; items use `accent` on highlight.
- Coin rows: icon + name + symbol + optional balance (muted).

### 5.5 Badge (status mapping)

| Status | Style |
|--------|--------|
| pending | `bg-warning/10 text-warning border border-warning/20` |
| processing | `bg-primary/10 text-primary border border-primary/20` (+ optional `animate-pulse`) |
| confirmed | `bg-success/10 text-success border border-success/20` |
| failed | `bg-destructive/10 text-destructive border border-destructive/20` |
| cancelled | `bg-muted text-muted-foreground border border-border` |

Neutral/informational labels: `variant="outline"` with `border-border text-muted-foreground`.

### 5.6 Table (dual pattern)

**Desktop (`lg+`):** `Table`, `TableHeader`, `TableRow` with `hover:bg-accent/20`, row height ~56px (`h-14`), `border-b border-border`.

**Mobile:** hide table; render **stacked cards** (`CMP-TransactionCard` pattern): two rows—(icon + title/subtitle | amount), (badge | date). Same data fields as table columns.

### 5.7 Form

- Labels above fields (`text-sm font-medium`); groups spaced `space-y-4` or `gap-4`.
- Submit full-width on mobile; desktop auth `w-full` inside card.
- Primary submit uses **primary** variant only.

### 5.8 Modal & overlay surfaces

**Desktop centered dialog:** Radix `Dialog` + `DialogContent` `max-w-md` (or `max-w-sm` for destructive confirm). Mount with **`createPortal`** to `document.body`. Focus trap and scroll lock per shadcn.

**Mobile:** same portal. **Prefer bottom sheet** (Vaul) for success, confirm, filter, alert create, transaction detail, bank add/edit—snap points 50–80% per pattern. **Rule:** one implementation strategy per feature: desktop Dialog vs mobile Sheet, toggled by breakpoint hook (`useMediaQuery('(min-width: 1024px)')`) or CSS visibility—both portals.

### 5.9 Sidebar

**Desktop:** `w-64 h-screen sticky top-0`, `bg-sidebar`, `border-r border-border`, vertical flex; nav `flex-1 overflow-y-auto`; footer user block fixed at bottom.

**Mobile:** no persistent sidebar. **Hamburger → `Sheet side="left"`** (`w-[280px] min-h-screen`), overlay `bg-black/50` (overlay opacity is fine—**not** stored in semantic color vars). Same links as desktop; close on route change, overlay tap, or swipe threshold.

**Bottom tab bar (mobile):** fixed `h-16` + safe area; tabs for primary app roots only—does not replace full nav drawer.

---

## 6. Cross-platform notes

| Concern | Shared | Adapted |
|---------|--------|---------|
| Tokens & semantics | All CSS variables, badge mapping, button variants | — |
| Typography scale | Same tokens; optional `text-3xl` → `text-2xl` on small headers | App bar title `text-lg` truncate |
| Spacing | 4px base | Bottom sheet padding `p-4 pb-6`; thumb-sized buttons `h-12` |
| Tables | Column spec identical | Card list replaces table `< lg` |
| Modals | Same copy and fields | Sheet + drag handle vs centered dialog |
| Charts | Recharts, same series colors | Height `h-48` mobile vs `300px` desktop |
| Inputs | Validation rules identical | `inputMode="decimal"`, larger hit targets |
| Sidebar | Information architecture | Sticky rail vs drawer + optional bottom tabs |

---

## 7. Toasts

Position `fixed bottom-4 right-4 z-50` (above bottom tab). Types: success / error / warning / info using `border-l-4` with `success`, `destructive`, `warning`, `primary` respectively; surface `bg-card border border-border`.

---

## 8. Icons

Lucide, consistent stroke width. Transaction types: Deposit (Download, success tint), Convert (ArrowLeftRight, primary tint), Withdraw (Upload, blue/chart-3 tint).
