# Gesture Specifications — Crypto Wallet Dashboard (Mobile)

**Product:** Crypto Wallet Dashboard (mobile)  
**Audience:** Engineering, QA  
**Purpose:** Single source of truth for gesture behavior with measurable thresholds for automated and manual testing.

All distances are in **logical px** (CSS/device-independent unless noted). Times are **ms**. Percentages are **of the referenced container** unless stated otherwise.

---

## 1. Pull-to-Refresh

| Attribute | Value |
|-----------|--------|
| **Screens** | `SCR-HOME`, `SCR-HISTORY`, `SCR-ALERTS` |
| **Trigger distance** | **60px** pull-down from rest position |
| **Threshold behavior** | Release **at or after** 60px → refresh runs; release **before** 60px → cancel (see below) |
| **Loading indicator** | Circular spinner, **horizontally centered**, **vertically aligned to top of scrollable content** (below safe area / below nav as applicable) |
| **Cancel** | Release finger **before** 60px threshold → content returns to rest; **no** network/mock refresh |
| **Feedback at threshold** | **Light** haptic (impact style: light) when pull distance **first reaches** 60px |
| **Minimum refresh duration** | **800ms** (mock/API layer must not complete UI “refresh” state faster than this) |
| **Re-trigger** | Allowed only after previous refresh cycle completes (indicator dismissed) |

**QA checks**

- Pull **59px** and release → no refresh, no 800ms lock.
- Pull **60px** and release → refresh starts, spinner visible ≥ **800ms**.
- Haptic fires **once** per gesture when crossing 60px (not on every frame).

---

## 2. Horizontal Swipe on List Items

**Applies to**

- `SCR-ALERTS`: alert cards (rows)
- `SCR-HISTORY`: transaction cards (rows)

Assume **row width** = full content width inside horizontal padding (measure at runtime; tests may use a fixed device width).

### 2.1 Swipe left (destructive)

| Attribute | Value |
|-----------|--------|
| **Direction** | Finger moves **left** (content reveals from **right**) |
| **Reveal** | Red **“Excluir”** action |
| **Partial swipe threshold** | **40%** of **row width** — crossing commits to “revealed” state showing button |
| **Full swipe** | Gesture continues past reveal; on **release**, if displacement ≥ **40%** row width → treat as **full intent** → open **confirm bottom sheet** (destructive confirm) |
| **Spring-back (under threshold)** | If release with displacement **under 40%** row width → row animates back to rest in **200ms**, **ease-out** |
| **Haptic** | **Light** impact when displacement **first crosses** 40% row width (threshold crossing) |

### 2.2 Swipe right (secondary) — `SCR-ALERTS` only

| Attribute | Value |
|-----------|--------|
| **Direction** | Finger moves **right** |
| **Reveal** | **Amber** toggle action (on/off) |
| **Threshold** | **30%** of **row width** |
| **Behavior** | **Under 30%** on release → **200ms** ease-out spring-back; **30% or more** → toggle action **armed** / applied per product rule (state change + optional haptic at crossing) |

### 2.3 Undo (after destructive)

| Attribute | Value |
|-----------|--------|
| **Toast** | Shown after destructive completes (post-confirm) |
| **Undo label** | **“Desfazer”** |
| **Duration** | Toast visible **4000ms** (4s) |
| **Action** | Tap “Desfazer” within 4s reverts last destructive action |

---

## 3. Long-Press

| Attribute | Value |
|-----------|--------|
| **Screens** | `SCR-HOME` (coin cards), `SCR-HISTORY` (transaction items) |
| **Hold duration** | **500ms** continuous press on hit target |
| **Visual feedback** | Scale card/row to **0.97** (transform scale 0.97) |
| **Haptic** | **Light** impact at **500ms** recognition |
| **Menu** | Native-style **context menu** / popover anchored to element |

### 3.1 Coin card (`SCR-HOME`)

Menu entries (order top → bottom):

1. **Converter**
2. **Sacar**
3. **Criar Alerta**

### 3.2 Transaction item (`SCR-HISTORY`)

Menu entries:

1. **Ver Detalhes**
2. **Copiar ID**

**QA:** Release before 500ms → no menu; at 500ms → scale + haptic + menu; moving finger **> 10px** before 500ms cancels long-press (standard touch slop).

---

## 4. Bottom Sheet Drag (Vaul Drawer)

**Applies to:** All bottom sheets (Vaul drawer pattern).

| Attribute | Value |
|-----------|--------|
| **Drag handle** | Visible, **horizontally centered** |
| **Handle size** | **32px** wide × **4px** tall |
| **Handle color** | **zinc-600** |
| **Backdrop** | **zinc-950** at **60%** opacity (`zinc-950/60`) |
| **Backdrop dismiss** | Tap backdrop → sheet dismisses |

### 4.1 Snap sets

| Sheet class | Examples | Snap points (height % of screen) | Dismiss |
|-------------|----------|-----------------------------------|---------|
| **Small** | Confirm, filters | **40%** → drag down to **dismiss** | Below **40%** snap or velocity dismiss (see 4.2) |
| **Medium** | Coin selector, create alert | **60%** → **40%** → **dismiss** | From lowest engaged snap, drag past dismiss rules |
| **Large** | Detailed filters | **90%** → **60%** → **dismiss** | Same |

Percentages are **of viewport height**.

### 4.2 Dismiss via drag

| Rule | Value |
|------|--------|
| **Dismiss** | User drags sheet **below** the **lowest** active snap point |
| **Velocity bypass** | If downward velocity **> 500px/s**, **skip** snap-at-rest and **dismiss** (fast fling) |

### 4.3 Scroll handoff

| State | Behavior |
|-------|----------|
| Sheet at **max** snap for its class | **Internal content** scrolls |
| Content scroll **at top** (offset 0) | Further drag on content **moves sheet** |
| Content not at top | Drag **scrolls content** until top, then sheet drag applies |

---

## 5. Edge Swipe Back (Navigation)

| Attribute | Value |
|-----------|--------|
| **Applies to** | All **stack-pushed** screens: `SCR-CONVERT`, `SCR-WITHDRAW`, `SCR-DEPOSIT`, `SCR-TX-DETAIL` |
| **Gesture zone** | Horizontal touch must start within **0–20px** from **left** physical edge of screen |
| **Completion threshold** | Finger displacement **≥ 40%** of **screen width** → commit **pop** (back) on release |
| **Under threshold** | **Under 40%** on release → **spring** current screen to full width (cancel back) |
| **Animation** | **Parallax**: current screen translates **right**; previous screen visible from left, moves at **0.3×** the current screen’s translation speed (peek) |
| **Disabled** | **None** for listed screens (no global disable) |
| **Conflict** | No horizontal carousels on these flows — **no** gesture conflict in MVP |

---

## 6. Scroll Behaviors

### 6.1 FAB hide/show

| Attribute | Value |
|-----------|--------|
| **Hide** | On scroll **down**: user content delta **> 10px** (cumulative per direction change) → FAB **hidden** |
| **Show** | On scroll **up**: delta **> 10px** → FAB **visible** |
| **Transition** | **200ms** (opacity/transform as implemented; duration fixed at 200ms) |

### 6.2 Top app bar (root tabs)

| Scope | `SCR-HOME`, `SCR-HISTORY`, `SCR-ALERTS` (root tab destinations) |
|--------|------------------------------------------------------------------|
| **Behavior** | Large title **collapses** to standard top bar when user scrolls content **down** |
| **Transition** | **150ms** |

### 6.3 Infinite scroll

| Attribute | Value |
|-----------|--------|
| **Used** | **No** — all lists finite (mock data) for MVP |

### 6.4 Scroll position preservation

| Attribute | Value |
|-----------|--------|
| **Behavior** | When navigating **push**: History list → detail → **back**, list restores **prior scroll offset** (pixel-for-pixel within same session) |

---

## 7. FAB Speed-Dial

| Attribute | Value |
|-----------|--------|
| **Trigger** | **Tap** main FAB (**Plus** icon) |
| **Expand animation** | **200ms**, **spring** curve (same spec as implementation spring) |
| **Mini-FABs** | **3** items, **fan upward** with labels |
| **Backdrop** | **zinc-950** at **40%** opacity (`zinc-950/40`) |
| **Close actions** | Tap backdrop; tap a mini action; **tap main FAB again** (icon **rotates** to **X** while open) |
| **Position** | **Bottom-right**; **16px** from **right** edge; **8px** above **tab bar** safe area (bottom inset + tab bar height + 8px) |

---

## 8. Tap Feedback

| Element type | Scale | Duration | Additional |
|--------------|-------|----------|--------------|
| **Buttons / interactive controls** | **0.98** | **100ms** | Background flash **zinc-800** |
| **Cards** | **0.99** | **100ms** | **Subtle** shadow elevation increase on press |
| **Links / text buttons** | — | **100ms** (press state) | **Opacity 0.7** while pressed |

**QA:** Use slow-motion recording; scale and duration apply on **touch down** / press state; cards use **0.99** not **0.98**.

---

## Screen ID Reference (Gesture-Relevant)

| ID | Notes |
|----|--------|
| `SCR-HOME` | Pull-to-refresh, long-press coin cards, FAB, bar collapse |
| `SCR-HISTORY` | Pull-to-refresh, swipe rows, long-press, preservation |
| `SCR-ALERTS` | Pull-to-refresh, swipe L/R on rows |
| `SCR-CONVERT`, `SCR-WITHDRAW`, `SCR-DEPOSIT`, `SCR-TX-DETAIL` | Edge swipe back |

---

*Document version: aligned with Crypto Wallet Dashboard mobile MVP. Update when new carousels or sheets are added.*
