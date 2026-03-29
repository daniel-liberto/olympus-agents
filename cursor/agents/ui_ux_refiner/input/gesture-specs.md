# Gesture Specs — CryptoFolio (Mobile)

## Pull-to-Refresh

| Screen | Enabled | Loading Indicator | Cancel |
|--------|---------|------------------|--------|
| SCR-DASHBOARD | Yes | Spinner at top of scroll container, below app bar | Release before threshold |
| SCR-WALLET | Yes | Spinner at top | Release before threshold |
| SCR-WALLET-DETAIL | Yes | Spinner at top | Release before threshold |
| SCR-HISTORY | Yes | Spinner at top | Release before threshold |
| SCR-ALERTS | Yes | Spinner at top | Release before threshold |
| SCR-DEPOSIT | No | — | — |
| SCR-CONVERT | No | — | — |
| SCR-WITHDRAW | No | — | — |
| SCR-SETTINGS (all) | No | — | — |

**Threshold**: Pull down 60px to trigger
**Indicator**: Circular spinner (`w-6 h-6 text-primary animate-spin`), appears at `-40px` from scroll top, snaps to `8px` during loading
**Duration**: Minimum 800ms display, then hides when data loads
**Haptic**: Light haptic feedback on threshold cross (if supported)

---

## Horizontal Swipe on List Rows

### Swipe-to-Delete (Bank Accounts)

**Screen**: SCR-SET-BANKS
**Direction**: Swipe left
**Threshold**: 30% of row width (triggers peek of delete button), 60% (auto-trigger confirmation)
**Visual**:
- 0-30%: Red background reveals progressively, Trash icon appears
- 30-60%: Delete button fully visible (`bg-destructive text-white p-4`)
- 60%+: Haptic feedback, auto-opens delete confirmation sheet
**Release behavior**:
- < 30%: spring back to closed
- 30-60%: stays open showing delete button, tap to confirm
- \> 60%: opens CMP-ConfirmSheet automatically
**Undo**: Not applicable (confirmation required)

### Swipe on Transaction Cards

**Screen**: SCR-HISTORY, SCR-WALLET-DETAIL
**Direction**: Swipe left
**Action**: Quick view (opens detail sheet)
**Threshold**: 25% of row width
**Visual**: Blue/primary background reveals, Eye icon
**Note**: Optional — tap also opens detail. Swipe is convenience shortcut.

---

## Long-Press

| Component | Screen | Action | Feedback |
|-----------|--------|--------|----------|
| Asset card | SCR-DASHBOARD, SCR-WALLET | Context menu: "Depositar", "Converter", "Sacar", "Ver detalhes" | Haptic (medium), scale down 0.98 during press |
| Transaction card | SCR-HISTORY | Context menu: "Ver detalhes", "Copiar ID" | Haptic (light) |
| Alert card | SCR-ALERTS | Context menu: "Editar", "Excluir" | Haptic (light) |
| Wallet address | SCR-DEPOSIT | Copy to clipboard + toast "Copiado!" | Haptic (light) |
| TX Hash | Transaction detail sheet | Copy to clipboard + toast "Hash copiado!" | Haptic (light) |

**Context menu style**: native-feeling popup (Radix ContextMenu or custom)
- `bg-popover border border-border rounded-xl shadow-lg`
- Items: `h-11 px-4 flex items-center gap-3 text-sm`
- Destructive items: `text-destructive`

**Long-press threshold**: 500ms

---

## Edge Swipe Back (iOS)

**Behavior**: Default iOS swipe-from-left-edge for back navigation
**Compatibility**: Enabled on all push-stack screens
**Conflicts**: None — no horizontal carousels or swipe-based content that would conflict
**Disabled on**: None (all screens support back gesture)

**Android back button**: Functions identically to iOS swipe-back (pop stack)

---

## Bottom Sheet Drag

### Drag-to-Dismiss

| Sheet Type | Dismiss Threshold | Scroll Handoff |
|-----------|-------------------|----------------|
| CMP-SuccessSheet (70%) | Drag below 30% → dismiss | Internal scroll first, then sheet moves |
| CMP-ConfirmSheet (50%) | Drag below 20% → dismiss | No internal scroll |
| CMP-AlertCreateSheet (70%) | Drag below 30% → dismiss | Internal scroll for form |
| CMP-TransactionDetailSheet (80%) | Drag below 40% → dismiss | Internal scroll for details |
| CMP-FilterSheet (50%) | Drag below 20% → dismiss | Internal scroll for options |
| CMP-BankAccountSheet (80%) | Drag below 40% → dismiss | Internal scroll for form |

**Drag handle**: `w-10 h-1 bg-muted rounded-full mx-auto mt-2 mb-4`
**Scroll handoff rule**: When sheet content is scrolled to top, further pull-down moves the sheet. When content is not at top, scroll takes priority.
**Backdrop**: `bg-black/50`, tap to dismiss (except during loading state)
**Animation**: `duration-300 ease-out` for open/close

---

## Tap Feedback

| Element | Feedback | Duration |
|---------|----------|----------|
| Button | `active:scale-[0.98] transition-transform` | 150ms |
| Card/Row | `active:bg-accent/10` | 150ms |
| Tab item | Immediate color change | 0ms (instant) |
| Icon button | `active:bg-accent/20 rounded-full` | 150ms |
| Link text | `active:opacity-70` | 150ms |

---

## Touch Targets

**Minimum size**: 44x44px for all interactive elements
**Spacing between targets**: minimum 8px gap

| Element | Minimum Size | Actual Size |
|---------|-------------|-------------|
| Button | 44x44px | h-12 (48px) standard |
| Tab bar item | 44x44px | 64px wide, 44px+ tall |
| Icon button | 44x44px | w-11 h-11 (44px) |
| List row | 44px height | h-16 (64px) typically |
| Toggle switch | 44x44px | Standard Switch component |
| Accordion item | 44px height | min-h-[44px] |
| Chip/pill | 32px height | h-8 (32px) — acceptable, grouped |

---

## Scroll Behavior

| Screen | Scroll Type | Notes |
|--------|------------|-------|
| SCR-DASHBOARD | Main scroll (full page) | App bar collapses on scroll (optional) |
| SCR-WALLET | Main scroll | — |
| SCR-WALLET-DETAIL | Main scroll | Chart fixed ratio, rest scrolls |
| SCR-CONVERT | Main scroll + keyboard-aware | Form scrolls to show focused input |
| SCR-WITHDRAW | Main scroll + keyboard-aware | Same as convert |
| SCR-HISTORY | Main scroll + filter bar sticky | Filter bar sticks below app bar on scroll |
| SCR-SETTINGS | Main scroll (short content) | — |
| Bottom sheets | Internal scroll | Handoff to sheet drag when at top |

**Momentum scrolling**: `-webkit-overflow-scrolling: touch` (default in modern browsers)
**Overscroll**: `overscroll-behavior: contain` to prevent page bounce when inside sheets
