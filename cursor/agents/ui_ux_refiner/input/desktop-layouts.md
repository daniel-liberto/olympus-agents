# CryptoFolio — Desktop Layouts (Apollo)

**Viewport focus:** 1024px–1440px+ (small desktop through large desktop)  
**Shell:** Persistent left **NavigationSidebar** + scrollable **main** region  
**Tech alignment:** React + Vite + TypeScript + TailwindCSS  
**Theme:** Dark by default; clean, modern, high-contrast accents

---

## Global shell (all screens)

### Structure

| Region | Role | Behavior |
|--------|------|----------|
| **Sidebar** | Primary nav, brand, user context | Fixed width; vertically scrolls if needed; never overlays content at ≥1024px |
| **Main** | Route content | `min-h-screen`; vertical scroll; horizontal padding scales with breakpoint |
| **Optional top bar** | Page title + secondary actions (per screen) | Sticky within main; height ~56–64px; subtle bottom border using token `border` |

### Grid & spacing (shell)

- **Sidebar width:** 256px at 1024px; 272px at 1280px+ (optional); cap at 280px for 1440px+ if content needs air.
- **Main content max width:** Inner content uses a **12-column CSS grid** with **gutter 24px** (1024), **28px** (1280), **32px** (1440+).
- **Horizontal padding (main):** `24px` (1024) → `32px` (1280) → `40px` (1440+).
- **Vertical rhythm:** First block below sticky header uses **24px** top padding; section gaps **32–40px** between major blocks.

### Breakpoint behavior

| Breakpoint | Width | Layout notes |
|------------|-------|----------------|
| **Small desktop** | 1024px | Sidebar 256px; main uses full remaining width; coin grid **3 columns** default |
| **Medium desktop** | 1280px | Slightly wider gutters; coin grid **3–4 columns** (prefer 4 when cards fit ≥280px) |
| **Large desktop** | 1440px+ | Optional increase of max content width (e.g. `max-w-[1280px]` or `max-w-[1360px]`) centered in main so ultra-wide monitors do not stretch forms/lists awkwardly |

---

## Screen: Dashboard (`/`)

### Purpose

At-a-glance portfolio value, quick actions, searchable holdings as cards.

### Layout grid

- **Shell:** Sidebar (left) + main (right).
- **Main inner:** Single column stack with optional **two-column** split only below the fold if analytics are added later; v1 stays single column for clarity.

**Vertical order (top → bottom):**

1. **Page header row** (optional if balance card carries title): “Portfolio” / subtitle — left; optional “Last updated” — right (`text-secondary`, small).
2. **BalanceCard** — **full width** of main inner (100% of content column).
3. **Spacing:** `24px` after BalanceCard.
4. **Quick actions row** — horizontal group of **Button** components (primary + secondary); wrap on narrow small-desktop if needed; gap `12–16px`.
5. **Spacing:** `32px` before search section label.
6. **Section:** “Your assets” (or similar) — `text-lg` / semibold; margin-bottom `12px`.
7. **SearchBar** — full width; max width may match grid but typically full width for affordance.
8. **Spacing:** `16px` below SearchBar.
9. **Coin list:** Responsive **card grid**
   - 1024px: **3 columns**, gap `16px` row/column
   - 1280px: **4 columns** if card min width allows; else 3
   - 1440px+: **4 columns**, gap `20–24px`
10. **Empty state:** When no coins match filter, replace grid with **EmptyState** centered in grid area (min-height ~320px).

### Component placement

| Zone | Components |
|------|------------|
| Sidebar | `NavigationSidebar` — Dashboard active |
| Main top | `BalanceCard` |
| Below balance | `Button` × N (Quick actions: Convert, Withdraw, Add funds, etc.) |
| Mid | `SearchBar` |
| Primary content | `CoinCard` grid |
| Edge cases | `Skeleton` grid while loading; `EmptyState` when empty |

### Spacing summary

- Section gaps: **32–40px**
- Balance → actions: **24px**
- Actions → “Your assets”: **32px**
- Title → SearchBar: **12px**
- SearchBar → grid: **16px**

---

## Screen: Convert (`/convert`)

### Purpose

Swap between two assets with clear preview and explicit commit.

### Layout grid

- **Shell:** Sidebar + main.
- **Main:** Vertically and horizontally **centered** content block (flex or grid place-items center) with **min-height** filling viewport minus header.
- **Form container:** Single **card** (`max-w-lg` / `32rem` / 512px), **full width** below max on smaller main areas with horizontal padding from shell.

**Card internal layout (top → bottom):**

1. **Title:** “Convert” + short helper text (`text-secondary`, `text-sm`).
2. **Spacing:** `24px`.
3. **From row:** Label + **CoinSelector** (from) + optional “max” link/button aligned right on same row or below on tight width.
4. **Spacing:** `16px`.
5. **To row:** Label + **CoinSelector** (to) + swap control (icon **Button** secondary) placed between rows or top-right of card — consistent hit target 40×40px minimum.
6. **Spacing:** `24px`.
7. **AmountInput** — full width within card; show fiat hint line if applicable (`text-muted`, `text-xs`).
8. **Spacing:** `16px`.
9. **ConversionPreview** — bordered surface, stacked rows (rate, fee, receive amount); highlight receive in accent or primary text.
10. **Spacing:** `24px`.
11. **Primary Button** — “Convert” — full width; optional secondary “Clear” as text button below for error recovery.

### Alignment & spacing

- Card padding: **24px** (inner).
- Form field vertical rhythm: **16px** between related controls; **24px** before preview and primary CTA.
- Preview area: min-height ~120px so layout does not jump when rates load.

### Breakpoints

- **1024px:** Card `max-w-lg`, centered; side padding prevents edge bleed.
- **1280px+:** Same; optional subtle background pattern or gradient only in main (behind card) — keep contrast AA for text.

---

## Screen: Withdraw (`/withdraw`)

### Purpose

Guided flow: destination → amount/confirmation → success or follow-up.

### Layout grid

- **Shell:** Sidebar + main.
- **Main:** **StepIndicator** at **top** of content column (full width of inner max), then **step content** centered below.

**Vertical structure:**

1. **Page title** + one-line description (`text-secondary`).
2. **StepIndicator** — horizontal steps (1–3), labels under or beside circles per design system; sticky optional at 1280px+ if steps are many lines (v1: non-sticky).
3. **Spacing:** `32px` below stepper.
4. **Step panel:** Centered column, **max-w-xl** (576px) or **max-w-2xl** (672px) depending on form density — spec: **centered form**, comfortable line length.
5. **Step 1 (example):** Network / address / label fields — stack with `16px` gaps.
6. **Step 2:** AmountInput + fee summary + ConversionPreview-like summary for outbound.
7. **Step 3:** Review + legal checkbox + primary “Confirm withdrawal”.

**Navigation between steps:** Footer row inside panel: **Secondary** “Back” left, **Primary** “Continue” right; on step 3, “Back” + “Confirm”.

### Spacing summary

- Step content padding: **24–32px** inside card/panel.
- Step indicator margin-bottom: **32px**.
- Between fields: **16px**; between groups: **24px**.

### Breakpoints

- **1024px:** Step labels may truncate to short titles; tooltips for full names.
- **1280px+:** Full step labels visible; optional side illustration column **not** in v1 — keep single column for focus.

---

## Screen: Alerts (`/alerts`)

### Purpose

Manage price / threshold alerts per asset; create new alert quickly.

### Layout grid

- **Shell:** Sidebar + main.
- **Main:** Header row + **scrollable list** of cards + **FAB**.

**Vertical order:**

1. **Header row:** Title “Alerts” left; optional filter/sort (segmented control or `select`) right — height aligns with single-line title.
2. **Spacing:** `24px`.
3. **Alert list:** **Card stack** or **responsive grid**:
   - Prefer **single column list** for scanability on desktop (max-w-3xl centered); **or** 2 columns at 1440px+ if card density is low.
   - v1 recommendation: **one column**, `max-w-3xl` centered, gap `12–16px` between **AlertCard**s.
4. **FAB:** Fixed **bottom-right** of main viewport (not over sidebar): `24px` from bottom, `24px` from right of main; z-index above content; **Button** circular icon + “New alert” on hover expansion optional v2.

### AlertCard content zones

- **Left:** Coin icon + symbol + alert type (e.g. “Price above”).
- **Center:** Threshold value, currency, optional sparkline placeholder.
- **Right:** **Toggle** (enable/disable) + icon **Button** (delete) with confirm **Modal**.

### Empty / loading

- Loading: **Skeleton** list (6–8 rows).
- Empty: **EmptyState** with CTA pointing to FAB action.

### Breakpoints

- **1024–1280px:** Single column list.
- **1440px+:** Optional 2-column grid only if cards are compact; default single column for consistency.

---

## Screen: Settings (`/settings`)

### Purpose

App preferences, security, notifications — simple scannable list.

### Layout grid

- **Shell:** Sidebar + main.
- **Main:** Narrow readable column **max-w-2xl** (672px) **left-aligned** within main inner (not centered) to match sidebar mental model — or centered if product prefers focus; **spec: left-aligned** with same horizontal padding as other pages.

**Structure:**

1. **Title:** “Settings”.
2. **Spacing:** `8px` then subtitle (`text-secondary`).
3. **Spacing:** `32px`.
4. **Grouped list:** Sections with **section headers** (`text-xs`, uppercase, `text-muted`, `mb-8` spacing before first item).
5. **Each row:** Full-width row, **min-height 56px**, padding horizontal `16–20px`, border-bottom `border` token; chevron right for drill-in; inline **Toggle** for boolean settings on the right.

### Spacing summary

- Between sections: **32–40px**.
- Row internal: **16px** vertical padding.

### Breakpoints

- **1024px+:** Same structure; no change to pattern — scales horizontally only by max-width constraint.

---

## Z-index & layering (desktop)

| Layer | Z-index | Notes |
|-------|---------|--------|
| Sidebar | 20 | Below modal |
| Sticky page header | 10 | Within main |
| FAB | 30 | Below modal |
| Modal backdrop | 40 | |
| Modal | 50 | |
| Toast region | 60 | Above modal optional — prefer toast below modal or same level with portal order documented in implementation |

---

## Implementation notes (Tailwind-oriented)

- Use **`lg:`** as minimum for fixed sidebar + side-by-side shell (align with 1024px project breakpoint).
- **Main content:** `flex-1 min-w-0` to prevent overflow from grids.
- **Grids:** `grid-cols-3` at `lg`, `xl:grid-cols-4` for Dashboard coin cards when width allows.
- **Convert card:** `w-full max-w-lg mx-auto` inside padded main.

---

## Quality checklist

- [ ] All five routes use the same shell; only main inner changes.
- [ ] Touch targets ≥ 40×40px for icon buttons and FAB.
- [ ] No horizontal scroll at 1024px for default content; tables (if added later) scroll inside containers.
- [ ] Focus order: sidebar → main landmark → interactive controls top-to-bottom, left-to-right.
