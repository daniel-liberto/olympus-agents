# CryptoFolio — Mobile Component Specifications

**Project:** CryptoFolio (simplified crypto wallet).  
**Platform:** Responsive web (React + Vite + TypeScript + TailwindCSS).  
**Default theme:** Dark mode — clean, modern, high contrast for text/icons on charcoal/near-black surfaces.

**Global rule:** Interactive targets **≥ 44×44px** (Apple HIG / WCAG 2.5.5 alignment). Where a control is visually smaller, expand the hit region with invisible padding (`min-h-11 min-w-11` etc.).

This document mirrors the **desktop component set** with **mobile-first behavior**, **touch ergonomics**, and **adaptations** from desktop patterns.

---

## 1. BalanceCard

**Desktop behavior (reference):** Often part of a multi-column dashboard; may sit beside charts or side panels.

### Mobile-specific behavior

- **Width:** **100%** of content column (within horizontal padding); no side-by-side columns.
- **Typography:** **Larger** primary balance (e.g. `text-3xl`–`text-4xl` on 375px+) for quick reading at arm’s length; secondary metrics `text-sm`–`text-base` with relaxed line-height.
- **Touch:** Entire card can be **tap** to open detail/breakdown if product includes it; min height for tappable row areas **≥ 44px** if multiple tap targets inside (e.g., “Hide balance” eye icon **44×44px**).
- **Spacing:** Internal padding **16–20px**; rounded corners **12–16px** consistent with coin cards.

### Adaptations from desktop

- Remove reliance on hover tooltips; use **tap** for info or inline **“i”** with sheet.
- Optional **pull-to-refresh** on parent screen does not replace in-card refresh unless specified.

---

## 2. CoinCard

**Desktop behavior (reference):** Row or compact list; hover states; possibly inline expand.

### Mobile-specific behavior

- **Layout:** **Full-width** card; **vertical** rhythm: icon + symbol + name on left; price and 24h change on right **or** stacked on 320px if needed.
- **Tap:** **Tap** toggles **expand/collapse** for holdings detail (avg cost, allocation) — **accordion** pattern; second tap collapses.
- **Touch targets:** Chevron or expand control **≥ 44×44px**; row tap can map to same action for larger hit area.
- **Spacing:** Min **padding-y** per row **12px**+ so lists feel touch-friendly.

### Adaptations from desktop

- No hover; use **pressed** state (`active:scale-[0.99]`) for feedback.
- **Long-press** for quick actions (see gesture spec) — desktop equivalent might be right-click; not used on mobile web.

---

## 3. SearchBar

**Desktop behavior (reference):** Inline in header or toolbar; may share row with filters.

### Mobile-specific behavior

- **Position:** **Sticky** below `BalanceCard` (and below app header offset) on Dashboard — remains visible while scrolling the coin list.
- **Width:** **100%**; height **min 44px** (often **48px** input).
- **Input:** `type="search"`, `enterkeyhint="search"`, clear button **≥ 44px** touch area.
- **Focus:** On focus, optional **scroll-into-view** so keyboard does not obscure the bar (iOS/Android web).

### Adaptations from desktop

- Filters that were a **dropdown** beside search become **icon** opening **bottom sheet** or full-screen filter sheet.

---

## 4. CoinSelector

**Desktop behavior (reference):** Dropdown / combobox with typeahead.

### Mobile-specific behavior

- **Pattern:** **Bottom sheet** (e.g., Vaul Drawer) instead of floating dropdown.
- **Sheet contents:** Search at top of sheet; **virtualized** list if many assets; each row **min-height 48px**.
- **Selection:** Tap row selects and **dismisses** sheet; optional “Cancel” as text button or swipe-down (see gesture spec).
- **Accessibility:** Focus trap in sheet; return focus to trigger on close.

### Adaptations from desktop

- Replace **hover highlight** with **active** row background.
- **Keyboard:** When sheet opens from amount field, maintain logical focus order.

---

## 5. AmountInput

**Desktop behavior (reference):** Standard input with optional steppers.

### Mobile-specific behavior

- **Touch target:** Input field **min-height 48px**; full width in forms.
- **Keyboard:** `inputmode="decimal"` (or `numeric` per locale rules) to trigger **numeric** keyboard; `pattern` and `autocomplete="off"` as appropriate.
- **Affordances:** Large **+ / −** optional **≥ 44×44px** if product includes quick increment; otherwise avoid clutter on 320px.
- **Labels/errors:** Error text below; **don’t** rely on hover for error tooltips.

### Adaptations from desktop

- Desktop **spinbuttons** become **optional**; prefer **MAX** chip button with **44px** height next to field when used.

---

## 6. StepIndicator

**Desktop behavior (reference):** Horizontal steps with labels, may fit in wide header.

### Mobile-specific behavior

- **Placement:** **Horizontal** row at **top** of withdraw flow content (below app header).
- **Style:** **Dots** or **compact numbered circles** with **short** labels (`text-xs`); current step **filled** / **bold**.
- **Touch:** If steps are tappable (discouraged for strict wizards), each hit **≥ 44px**; prefer **non-interactive** indicator on mobile to avoid mis-taps.
- **Spacing:** Horizontal **scroll** if more than 3–4 steps on 320px.

### Adaptations from desktop

- Long step names **truncated**; full titles only in step body.

---

## 7. AlertCard

**Desktop behavior (reference):** Row with toggle; delete via button or context menu.

### Mobile-specific behavior

- **Layout:** **Full width**; primary info (pair, threshold) left; **toggle** right.
- **Toggle:** **Min height 44px** for interactive row; switch track **≥ 44×24** with extended touch padding **vertically** to meet **44px** row height.
- **Delete:** **Swipe left** reveals **Delete**; reveal width **≥ 72px**; button **min-height 44px** full row.
- **Tap:** Tap card (non-toggle area) opens **edit** if applicable.

### Adaptations from desktop

- **Context menu** / right-click **replaced** by swipe and/or overflow **⋯** menu (**44×44px**).

---

## 8. Modal

**Desktop behavior (reference):** Centered dialog for confirmations and forms.

### Mobile-specific behavior

- **Default:** **Bottom sheet** for most **non-destructive** forms and pickers — **rounded top** (`rounded-t-2xl`), **drag handle** visible.
- **Destructive / critical:** **Centered modal** still allowed (narrow width, `max-w-sm`, padding safe areas).
- **Actions:** Primary/secondary **stacked** or **side-by-side** if both **≥ 44px** height; primary **full width** on narrow screens.
- **Backdrop:** Tap to dismiss only if non-destructive; else require explicit cancel.

### Adaptations from desktop

- **Large desktop dialogs** become **scrollable sheet body** with **sticky** footer for actions.

---

## 9. Toast

**Desktop behavior (reference):** Corner notification, sometimes narrow.

### Mobile-specific behavior

- **Position:** **Top** of screen **below** status bar / notch: `top: env(safe-area-inset-top)` + **8px**.
- **Width:** **Full width** minus **16px** horizontal margin (or edge-to-edge with inner padding).
- **Duration:** Auto-dismiss **3–5s**; **swipe up** optional dismiss.
- **Stacking:** New toasts push down or replace; avoid covering fixed CTAs — prefer **below header** or map to **non-blocking** banner above content.

### Adaptations from desktop

- **No reliance** on hover to expand; action button in toast **min 44px** height.

---

## 10. Button

**Desktop behavior (reference):** Varied sizes; inline buttons in tables.

### Mobile-specific behavior

- **Min-height:** **48px** for primary/secondary in forms and fixed footers.
- **Width:** **Full width** for **primary** actions on **Convert**, **Withdraw**, and auth-style flows; secondary as outline full width below or **inline** only if both meet **44px** min height.
- **States:** `active:` feedback; `disabled:` clear contrast in dark theme.

### Adaptations from desktop

- **Icon-only** buttons in toolbars must still be **44×44px**.

---

## 11. Toggle (Switch)

**Desktop behavior (reference):** Compact switch in settings rows.

### Mobile-specific behavior

- **Visual track:** **≥ 44×24px**; **hit slop** expands to **≥ 44×44px** vertically within row.
- **Row height:** Settings rows **min 48–52px** so label + switch align comfortably.

### Adaptations from desktop

- Clicking **label** toggles switch (native `<label>` for); same on mobile.

---

## 12. BottomNavBar

**Desktop behavior (reference):** Sidebar or top nav — not used on mobile.

### Mobile-specific behavior

- **Items:** **4** — **Dashboard**, **Convert**, **Withdraw**, **Alerts** — **icon + label** (labels may wrap or truncate on 320px).
- **Active state:** Filled icon + **high-contrast** color; inactive muted but **WCAG-compliant** against background.
- **Height:** ~**56px** content + **safe-area** padding.
- **Touch:** Each tab **flex-1** with **centered** hit target **full cell** (ensures **≥ 44px**).
- **Settings:** **Not** in nav — access via **header gear** only.

### Adaptations from desktop

- **Route highlighting** maps to tab; `/settings` shows **no** active tab or optional neutral state.

---

## Cross-component notes

| Topic | Mobile rule |
|--------|-------------|
| **Focus** | Visible focus rings for keyboard/Switch Control users |
| **Motion** | Prefer reduced-motion respect (`prefers-reduced-motion`) |
| **Haptics** | Web has limited haptics; use visual feedback instead |
| **Icons** | Lucide at **24px** default in nav; **20–24px** in rows |

---

## Summary: Desktop → Mobile mapping

| Component | Desktop | Mobile |
|-----------|---------|--------|
| Selectors | Dropdown / popover | Bottom sheet |
| Modals | Center dialog | Sheet first; centered for critical |
| Navigation | Sidebar / top | Bottom nav (4) + Settings in header |
| Tables | Wide grids | Cards + full-width rows |
| Hover | Tooltips, menus | Tap, long-press, swipe |

All listed components satisfy **minimum 44px** touch targets on CryptoFolio mobile.
