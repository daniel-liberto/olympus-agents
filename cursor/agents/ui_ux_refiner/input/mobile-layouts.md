# CryptoFolio — Mobile Screen Layouts (320px–768px)

**Stack:** React + Vite + TypeScript + TailwindCSS (responsive web app).  
**Theme:** Dark mode by default; clean, modern surfaces with clear hierarchy.  
**Viewport:** Single-column layouts; max usable width capped at **768px** for tablet; phones use full width with horizontal padding.

---

## Global Layout Shell

### Bottom navigation (primary)

- **Four items:** Dashboard, Convert, Withdraw, Alerts — each with **icon + short label** (two lines max on narrow widths).
- **Not shown on Settings:** Settings is reached via **gear icon in the app header** on all primary routes.
- **Height:** Content area + bottom nav occupies the viewport; bottom nav sits **above** the system home indicator / safe area.
- **Safe area:** `padding-bottom: env(safe-area-inset-bottom)` on the nav container; minimum **8px** internal padding above the inset so labels never touch the home bar.
- **Touch:** Each nav item **min 44×44px** hit target (typically full cell height ~56px including safe padding).

### App header (stacked routes)

- **Left:** Optional back affordance when nested (e.g., alert detail); hidden on root tabs.
- **Center:** Screen title (truncate with ellipsis on 320px).
- **Right:** **Settings (gear)** — **44×44px** minimum; opens `/settings`.

### Content region

- Scrolls independently above bottom nav (except where a **fixed bottom action** is specified per screen).
- Horizontal padding: **16px** default; **12px** on 320px if needed to preserve readability.

---

## Breakpoints (reference)

| Breakpoint | Width | Notes |
|------------|-------|--------|
| Small phone | **320px** | Tightest layout; single-line titles; compact nav labels if needed (`text-xs`). |
| Standard | **375px** | Default design target; comfortable padding and typography. |
| Large phone | **428px** | Slightly larger tap targets feel natural; can show secondary line on cards. |
| Tablet | **768px** | Same routes; optional max-width container (e.g. `max-w-xl mx-auto`) for forms/lists so lines do not exceed ~65–75 characters. |

**Implementation hint (Tailwind):** Use `min-h-dvh`, `pb-[env(safe-area-inset-bottom)]`, and container queries or `sm:`/`md:` only where layout truly diverges; core structure remains single column through 768px.

---

## Safe areas & notches

- **Top:** `padding-top: env(safe-area-inset-top)` on fixed header or first scroll child so title and gear are not obscured by notch/Dynamic Island.
- **Bottom:** Bottom nav + any fixed CTAs respect `safe-area-inset-bottom`.
- **Left/right (landscape / curved edges):** `padding-inline: max(16px, env(safe-area-inset-left/right))` on root shell.
- **Visual:** Optional 1px hairline separator under header; bottom nav has subtle top border or elevation for separation from content.

---

## 1. Dashboard (`/`)

**Purpose:** At-a-glance balance, search/filter holdings, quick actions, scrollable coin list.

### Layout (top → bottom)

1. **App header** — Title “Portfolio” or “CryptoFolio”; gear → Settings.
2. **Balance card** — **Full width** within horizontal padding; **rounded-xl**, prominent total balance and optional 24h change.
3. **Search bar** — **Sticky** immediately below the balance card (or below header if balance scrolls away — **prefer:** balance scrolls with content, search sticks under header once user scrolls past balance). **Specification:** Sticky offset = `top: headerHeight` so search stays visible while browsing the coin list.
4. **Quick actions** — Row of **2–4** actions (e.g., Convert, Withdraw, Deposit, Alerts shortcut). **Either:**
   - **Floating row:** Horizontal scroll of pill buttons **or** 2×2 grid of equal-width buttons; **or**
   - **Inline:** Full-width primary + secondary in a row with **min 44px** height each.  
   **Recommendation:** On 320px, use **horizontal scroll** for pills to avoid crowding; on 375px+, 2×2 grid acceptable.
5. **Coin list** — **Vertical stack** of **full-width cards** (`CoinCard`), **8–12px** gap between cards. List extends behind bottom nav with **padding-bottom** so last card clears the nav + safe area.

### Scroll behavior

- Main column is **one scroll container** (natural momentum scrolling).
- Search remains usable without scrolling back to top once user has scrolled past balance (sticky behavior).

### Tablet (768px)

- Optional `max-w-lg mx-auto` for balance + list; bottom nav still full width.

---

## 2. Convert (`/convert`)

**Purpose:** Select source/target assets, enter amount, review preview, submit conversion.

### Layout

- **Full-screen form** in the content area (below header; bottom nav visible unless modal flow overrides — **keep nav** for consistency).

**Vertical stack (single column):**

1. **From** — Label + trigger opening **bottom sheet** (`CoinSelector`); shows selected coin + chevron.
2. **Swap control** — Centered circular “swap from/to” button (**min 44×44px**) between the two selectors.
3. **To** — Same as From.
4. **Amount** — Large `AmountInput` with currency suffix; shows available balance as helper text.
5. **Preview area** — Card or inset panel: rate, fee estimate, receive amount; updates on debounced input.
6. **Spacer** — Flexible gap so primary CTA can sit at bottom.

**Fixed bottom:**

- **Convert** button — **Full width** (within padding), **min-height 48px**, fixed to **bottom of viewport above bottom nav** **or** **above safe area only** if design chooses to hide bottom nav during convert ( **recommended:** **keep bottom nav**; pin CTA above nav with `pb-safe`).

### Keyboard

- Focus on amount opens **numeric** keyboard (`inputmode="decimal"`); layout does not jump unexpectedly — reserve space for preview.

### Tablet (768px)

- Form block centered with `max-w-md`; CTA still full width of that block.

---

## 3. Withdraw (`/withdraw`)

**Purpose:** Multi-step flow: destination, amount, confirmation.

### Layout — **full-screen stepper**

1. **Step indicator** — **Horizontal** at top of content (below header): **dots or labeled steps** (e.g., 1–2–3); current step emphasized.
2. **Step content** — **Form fields stacked** vertically; one primary action per step where possible.
3. **Fixed bottom:** **Next** or **Submit** — **Full width**, **min-height 48px**; on last step, label “Confirm withdraw”.

### Steps (example mapping)

- **Step 1:** Asset selector (bottom sheet), network if applicable, address field.
- **Step 2:** Amount + fee summary.
- **Step 3:** Review + confirmation (read-only summary).

### Navigation

- **Back** in header returns to previous step or exits flow with unsaved guard if needed.

### Tablet

- Stepper + form centered `max-w-lg`; fixed CTA aligned to same width.

---

## 4. Alerts (`/alerts`)

**Purpose:** List price/threshold alerts; create new alert.

### Layout — **full-screen list**

1. **Header** — Title “Alerts”; optional filter icon (**44×44px**) if product requires.
2. **Content** — **Vertical list** of **full-width** `AlertCard` components; **12px** gaps; empty state illustration + CTA when no alerts.
3. **FAB** — **Bottom-right**, **above bottom nav + safe area** (e.g., `bottom: calc(env(safe-area-inset-bottom) + 64px)` if nav ~56px). **Min 56×56px** touch target (exceeds 44px minimum), circular or squircle, “+” icon.

### Behaviors (layout-level)

- Cards are full bleed within horizontal padding; **swipe left** reveals delete (see gesture spec).

### Tablet

- List `max-w-xl mx-auto`; FAB position unchanged relative to content column (right edge of column or viewport — prefer aligned to column).

---

## 5. Settings (`/settings`)

**Purpose:** App preferences, security, notifications, about.

### Layout — **full-screen simple list**

1. **Header** — Back (if stack) + “Settings”; or gear hidden on this route, back returns to previous tab.
2. **Grouped list** — **Inset grouped style** (optional rounded groups) or flat rows with dividers:
   - Rows: label + value/chevron; toggles for booleans (**toggle hit area ≥ 44px** height).
3. **No bottom nav highlight** — User arrived via gear; **optional:** hide bottom nav on `/settings` for focus, **or** keep nav with no active tab — product choice; **spec recommendation:** **keep bottom nav** for orientation, no tab selected, Settings not in nav.

### Scroll

- Single column; long settings scroll naturally.

### Tablet

- Narrow column `max-w-md mx-auto` for readability.

---

## Z-index & layering summary

| Layer | Elements |
|--------|-----------|
| Base | Scroll content |
| Sticky | Search (Dashboard), optional subheaders |
| Fixed | Withdraw/Convert CTAs, bottom nav |
| Overlay | Bottom sheets, modals, toasts |
| FAB | Above list content, below global overlays except blocking modals |

---

## Thumb zone (design guidance)

- Primary actions (Convert, Next, FAB) sit in **lower half** of screen where possible; destructive actions require confirmation in **modal/bottom sheet**, not only swipe.

This document defines **mobile-specific structure** for CryptoFolio’s five routes with **touch-first** spacing, **safe areas**, and **bottom navigation** aligned to React + Vite + Tailwind delivery.
