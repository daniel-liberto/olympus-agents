# CryptoFolio — Touch & Gesture Specifications (Mobile Web)

**App:** CryptoFolio — simplified crypto wallet (React + Vite + TypeScript + TailwindCSS).  
**Environment:** Mobile browsers (iOS Safari, Chrome Android). **Not** a native app; gestures are implemented with touch events / pointer events + CSS, with **graceful degradation** where OS/browser does not expose APIs.

**Principle:** **Touch-first** — every critical action must be reachable **without** relying on gestures; gestures **accelerate** experienced users.

---

## 1. AlertCard — Swipe left to reveal delete

### Behavior

- **Horizontal swipe left** on a card reveals a **Delete** action anchored to the **trailing** edge.
- **Swipe right** (optional) or **tap outside** / **collapse** returns to default state.
- **Tap Delete** confirms per flow: either **immediate** with **undo toast**, or **confirm bottom sheet** for destructive safety (product choice).

### Parameters

| Parameter | Suggested value |
|-----------|-----------------|
| Reveal threshold | ~**25–30%** of card width or **≥ 60px** offset |
| Delete button width | **72–88px**; **min-height 44px** |
| Velocity | Fast flick can **snap** open |

### Accessibility

- **Non-gesture path:** **⋯** overflow menu with **Delete** (same confirmation).
- **Screen readers:** Actions exposed in **rotor** / focus order; swipe is enhancement.

---

## 2. Dashboard — Pull-to-refresh

### Behavior

- **Pull down** when scroll position is **at top** (`scrollTop === 0`) initiates refresh of **coin data** / portfolio summary.
- **Visual:** Subtle spinner or branded indicator; **release** past threshold triggers fetch.
- **Threshold:** ~**64–80px** pull distance.

### Edge cases

- If **search** is focused, **disable** pull-to-refresh or require **scroll** to top first to avoid conflict.
- **Rate limit:** Cooldown or ignore repeat pulls within **N** seconds.

### Fallback

- **Explicit** refresh **icon** in header (**44×44px**) performs same action.

---

## 3. CoinCard — Tap-and-hold (long press) for quick actions

### Behavior

- **Long press** (~**500ms**–**600ms**) on `CoinCard` opens **quick actions**: e.g. **Convert this coin** (pre-fill From), **Set alert** (opens alert creation with asset selected).
- **Feedback:** **Haptic** not guaranteed on web — use **light scale** + **short** `navigator.vibrate` pattern optional where supported.

### Menu presentation

- **Bottom sheet** or **context menu** anchored near card; **min 48px** row height; **destructive** actions at bottom with separator.

### Accessibility

- **Long press** has **alternative:** **⋯** on card or detail screen entry.

---

## 4. Bottom navigation — Swipe between tabs (optional)

### Behavior (optional / skipped for simplicity)

- **Horizontal swipe** on **main content** could switch **adjacent** tabs (e.g., Dashboard ↔ Convert).  
**Recommendation for CryptoFolio:** **Skip** by default to avoid conflict with **AlertCard** swipe, **carousel** patterns, and **browser back** gestures.

### If enabled later

- **Edge swipe** from screen **left/right** with **narrow** activation zone; **never** steal vertical scroll.
- **Conflict resolution:** Disable when horizontal scroll containers are present.

---

## 5. Scroll — Natural momentum and rubber-band

### Behavior

- Use **native overflow scrolling** (`-webkit-overflow-scrolling: touch` where relevant); **momentum** scrolling enabled by default on iOS.
- **Overscroll (“rubber-band”):** Allow default **unless** it breaks nested scroll; avoid global `overscroll-behavior: none` except on modals/sheets.

### Nested scroll

- **Bottom sheets:** Inner scroll for long lists; **drag handle** does not fight list scroll — use **distinct** handle area or **threshold** for drag-to-close vs scroll.

---

## 6. Bottom sheet — Drag handle, snap points, dismiss

### Behavior

- **Drag handle** centered at top of sheet (**32–40px** wide, **4px** tall) — **decorative + draggable**.
- **Snap points:** e.g. **half** (~**50%** viewport) and **full** (~**90%** viewport) for `CoinSelector` and long content; **initial** height per use case (selector: **half**; forms: **full**).
- **Dismiss:** **Swipe down** past threshold; **tap backdrop**; **Cancel** button.
- **Physics:** Spring-like animation; respect **`prefers-reduced-motion`**.

### Focus

- On open, focus moves to **first focusable** or **search**; on dismiss, returns to **trigger**.

---

## 7. Keyboard — Auto-dismiss on scroll; numeric for amounts

### Auto-dismiss on scroll

- When user **scrolls** the main scroll container (or a defined scroll region), **blur** focused inputs to dismiss keyboard — **except** when scroll is **inside** the same focused field’s container if it would cause data loss (rare).

### Numeric keyboard for amounts

- **Amount** fields: `inputmode="decimal"` (or `numeric` if integer-only).
- **Labels** clearly associate currency; **locale** for decimal separator.

### Keyboard overlap

- On **focus**, scroll focused field into view (`scrollIntoView` with **care** on iOS); fixed CTAs stay **above** keyboard where possible (`visualViewport` resize handling).

---

## 8. Additional touch patterns (supporting)

| Pattern | Spec |
|---------|------|
| **Tap** | Primary selection; mitigate **300ms** delay with `touch-action: manipulation` where needed |
| **Double-tap** | **Avoid** for critical actions (zoom risk); not used in core flows |
| **Pinch zoom** | **No** custom pinch for core UI; allow browser zoom for accessibility unless product blocks globally |
| **FAB** | **Tap** creates alert; **position** avoids thumb conflict with nav |

---

## 9. Gesture vs. pointer summary

| Gesture | Screen / component | Primary action | Fallback |
|---------|-------------------|----------------|----------|
| Swipe left | AlertCard | Reveal delete | Menu |
| Pull down | Dashboard (top) | Refresh | Header button |
| Long press | CoinCard | Quick actions | ⋯ menu |
| Swipe down | Bottom sheet | Dismiss | Backdrop / Cancel |
| Scroll | Global | Navigate content | — |

---

## 10. Testing checklist (manual)

- [ ] All interactive targets **≥ 44×44px** on 320 / 375 / 428.
- [ ] Safe areas: header, nav, FAB, toasts, fixed CTAs.
- [ ] Keyboard does not obscure **Convert** amount or **Withdraw** fields.
- [ ] Pull-to-refresh only at **scroll top**.
- [ ] Sheet drag vs list scroll **no** accidental closes.
- [ ] **Reduced motion** reduces sheet travel animation.

This specification defines **touch and gesture** behavior for CryptoFolio’s mobile web experience, aligned with **bottom sheets**, **sticky search**, and **full-width** touch-first components.
