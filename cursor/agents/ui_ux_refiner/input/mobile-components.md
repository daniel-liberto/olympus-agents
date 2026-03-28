# Crypto Wallet Dashboard — Mobile Component Specs

**Artemis · Mobile UI/UX**  
**Stack:** shadcn/ui + **Vaul** (`Drawer`) + Lucide icons  
**Theme:** Dark-first. **Zinc** neutrals, **amber** CTAs / primary, **emerald** success, **red** destructive / errors.  
**Tokens:** Identical CSS variable names to Apollo’s `design-tokens.md` (`--background`, `--primary`, `--destructive`, `--success`, `--price-up`, `--price-down`, `--badge-*`, etc.).

---

## Apollo → Artemis ID mapping

| Apollo ID | Mobile Variant ID | Notes |
|-----------|------------------|-------|
| CMP-Sidebar | **CMP-BottomTabBar-Mobile** | Bottom tabs replace sidebar |
| CMP-PortfolioSummaryCard | **CMP-PortfolioStatCard-Mobile** | Horizontal scroll card |
| CMP-CoinListTable | **CMP-CoinCardList-Mobile** | Cards replace table rows |
| CMP-QuickSearchInput | **CMP-SearchBar-Mobile** | Top of coin list, collapsible |
| CMP-QuickActionCard | **CMP-FABSpeedDial-Mobile** | FAB with 3 actions |
| CMP-ConversionForm | **CMP-ConversionForm-Mobile** | Full screen; bottom sheet selectors |
| CMP-CoinSelector | **CMP-CoinSelectorSheet-Mobile** | Vaul bottom sheet + search |
| CMP-ConfirmConversionModal | **CMP-ConfirmConversionSheet-Mobile** | Bottom sheet confirm |
| CMP-WithdrawalForm | **CMP-WithdrawalForm-Mobile** | Full screen |
| CMP-ConfirmWithdrawalModal | **CMP-ConfirmWithdrawalSheet-Mobile** | Bottom sheet confirm |
| CMP-DepositView | **CMP-DepositView-Mobile** | Full screen |
| CMP-TransactionTable | **CMP-TransactionCardList-Mobile** | Card list |
| CMP-TransactionFilters | **CMP-FilterChips-Mobile** | Horizontal chips + sheet |
| CMP-TransactionDetail | **CMP-TransactionDetail-Mobile** | Stack push detail |
| CMP-AlertList | **CMP-AlertCardList-Mobile** | Swipeable cards |
| CMP-CreateAlertModal | **CMP-CreateAlertSheet-Mobile** | Bottom sheet |
| CMP-SettingsForm | **CMP-SettingsList-Mobile** | List groups |

**Mobile-only (flagged for Hephaestus):**  
`CMP-BottomTabBar-Mobile`, `CMP-FABSpeedDial-Mobile`, `CMP-SwipeRow-Mobile`, `CMP-PullToRefresh-Mobile`, `CMP-FilterChipBar-Mobile`, `CMP-KeyboardAwareFooter-Mobile` (and any sub-parts labeled **MOBILE-ONLY** below).

---

## Global patterns

### Bottom sheet (Vaul `Drawer`)

- **Drag handle:** `DrawerHandle` pattern — centered 36×4px pill, `bg-muted-foreground/40`, top inset 12px from sheet content.
- **Default snap:** `0.5` (~50% viewport) and `1` (full height) where content is tall; confirm-only sheets may use fixed **~40–45vh** min height + single snap `1`.
- **Scroll:** Long content uses `ScrollArea` or native overflow inside `DrawerContent`; **header + handle stay fixed**; body scrolls.
- **Backdrop:** `bg-background/80` with tap-outside to dismiss when `dismissible` (not on destructive confirm until user acts).
- **Safe area:** `pb-safe` / `padding-bottom: env(safe-area-inset-bottom)` on sheet footers and sticky actions.

### Touch

- **Tap:** Primary affordance; min touch target **44×44px** (use invisible hit slop on small icons).
- **Swipe:** Use `CMP-SwipeRow-Mobile` for list rows that need actions; destructive actions require **second-step confirm** (sheet or inline undo window).
- **Long-press:** Optional context preview (e.g. coin symbol copy); show `Tooltip`/`Toast` “Copiado” — keep rare to avoid discoverability issues.

### Forms (mobile)

- **Sticky submit:** `CMP-KeyboardAwareFooter-Mobile` wraps primary CTA; stays above keyboard / home indicator.
- **inputmode:** Amount fields `decimal`; OTP/pin if ever added `numeric`; phone `tel`; default text for names.
- **Autofocus:** First invalid field on error; otherwise first editable field on screen open (one focus per navigation).

---

## CMP-BottomTabBar-Mobile — **MOBILE-ONLY**

| | |
|--|--|
| **Component ID** | `CMP-BottomTabBar-Mobile` |
| **Screen IDs** | Global: visible on `SCR-HOME`, `SCR-HISTORY`, `SCR-ALERTS`, `SCR-SETTINGS` (hidden on full-screen flows `SCR-CONVERT`, `SCR-WITHDRAW`, `SCR-DEPOSIT`, `SCR-TX-DETAIL`, `SCR-ALERT-CREATE`, `SCR-404` unless product says always-on). |
| **shadcn / parts** | Custom bar using `Button` (ghost, `size="icon"` + label stack) or tabs primitive; Lucide: `Home`, `History`, `Bell`, `Settings`. **Badge** on Alerts tab. **Separator** optional top hairline. |

**States**

| State | Behavior |
|-------|----------|
| Default | Active tab: `text-primary` + small amber indicator or filled icon; inactive: `text-muted-foreground`. |
| Loading | N/A (chrome only); parent may dim with overlay. |
| Empty | N/A. |
| Error | Optional dot on tab if sync fails (product). |
| Disabled | Rare; entire bar disabled only if app offline shell. |

**Touch:** Tap switches route; double-tap Home optional scroll-to-top (nice-to-have).

**Safe area:** `padding-bottom: max(12px, env(safe-area-inset-bottom))`; background `bg-card/95` + `border-t border-border` backdrop blur optional.

---

## CMP-FABSpeedDial-Mobile — **MOBILE-ONLY**

| | |
|--|--|
| **Component ID** | `CMP-FABSpeedDial-Mobile` |
| **Screen IDs** | `SCR-HOME` (primary); may appear on other list screens if spec allows. |
| **shadcn / parts** | `Button` (primary, circular, `size="lg"`); Lucide main: `Plus` or `Zap`; actions: `ArrowLeftRight` (Convert), `Banknote`/`ArrowUpFromLine` (Withdraw), `ArrowDownToLine` (Deposit). **Backdrop:** fixed inset-0 `bg-background/60` when open. |

**States:** Default / open (expanded). Loading: spinner on FAB during navigation. Empty/Error/Disabled: hide or disable with tooltip when no network.

**Touch:** Tap main toggles expand; tap action navigates + closes; tap backdrop closes. **Long-press:** not required.

**Position:** Above tab bar + safe area; `bottom: calc(env(safe-area-inset-bottom) + 80px)` typical.

---

## CMP-PortfolioStatCard-Mobile

| | |
|--|--|
| **Component ID** | `CMP-PortfolioStatCard-Mobile` |
| **Screen IDs** | `SCR-HOME` |
| **shadcn / parts** | `Card` (compact), `Skeleton` for loading; optional `Badge` for “24h”; Lucide `TrendingUp`/`TrendingDown` tinted `text-emerald-500` / `text-red-500` via `--price-up` / `--price-down`. Horizontal scroll if multiple stat chips in carousel. |

**States**

| State | UI |
|-------|-----|
| Default | Large fiat total (BRL), secondary line “24h Δ” or last updated. |
| Loading | `Skeleton` h-8 + h-4; card height fixed to prevent jump. |
| Empty | Show “—” + CTA line to Deposit (links `SCR-DEPOSIT`). |
| Error | Inline `Alert` variant destructive + **Retry** `Button` outline. |
| Disabled | N/A (read-only). |

**Touch:** Tap card optional → expand breakdown sheet (if in scope); else no-op.

**Card row content:** Line 1: label “Saldo total”; Line 2: **amount** `tabular-nums`; trailing: refresh `Button` ghost.

---

## CMP-SearchBar-Mobile

| | |
|--|--|
| **Component ID** | `CMP-SearchBar-Mobile` |
| **Screen IDs** | `SCR-HOME` (above coin list) |
| **shadcn / parts** | `Input` + left `Search` icon; optional `Button` collapse to icon-only; `Badge` for filter count if combined with filters (usually N/A on home). |

**States:** Default; **Loading** N/A; **Empty** placeholder “Buscar moeda…”; **Error** inline if search API fails; **Disabled** when offline.

**Touch:** Tap focuses input (keyboard); clear `X` tap. **Long-press:** paste from clipboard (optional).

**Keyboard:** `inputmode="text"`, `autoComplete="off"`, `autoCorrect="false"`; collapse on scroll optional.

---

## CMP-CoinCardList-Mobile

| | |
|--|--|
| **Component ID** | `CMP-CoinCardList-Mobile` |
| **Screen IDs** | `SCR-HOME` |
| **shadcn / parts** | `Card` per coin; `Avatar`/icon; `Badge` for network tags if any; **Wrapped in** `CMP-PullToRefresh-Mobile` + optional `CMP-SwipeRow-Mobile` for quick actions if product adds them. |

**States**

| State | UI |
|-------|-----|
| Default | List of `CoinCard` rows. |
| Loading | **Skeleton** cards ×6–8. |
| Empty | Empty state illustration + “Depositar” CTA. |
| Error | `Alert` + Retry; list region only. |
| Disabled | Greyed with banner “Somente leitura”. |

**Touch:** Tap row → `SCR-CONVERT` with coin prefilled or detail (per product). **Swipe:** if enabled via `CMP-SwipeRow-Mobile`.

**Card row lines:** Line 1: **Symbol** + full name truncated; Line 2: balance crypto `tabular-nums`; Line 3: fiat value + **24h change** (emerald/red). **Trailing:** chevron `ChevronRight`. **Badge:** e.g. “ERC-20” only if shown in data.

---

## CMP-ConversionForm-Mobile

| | |
|--|--|
| **Component ID** | `CMP-ConversionForm-Mobile` |
| **Screen IDs** | `SCR-CONVERT` |
| **shadcn / parts** | `Card`, `Label`, `Input`, `Button`, `Separator`; coin pickers open `CMP-CoinSelectorSheet-Mobile`. Footer: `CMP-KeyboardAwareFooter-Mobile` with primary **Review** / **Convert**. |

**States:** Default; Loading skeleton on rates; Empty fields; Error inline + toast; Disabled when submitting (`Button` loading).

**Touch:** Tap field opens sheet selectors; no swipe on form body.

**Forms detail:** Amount `inputmode="decimal"`; **autofocus** amount after both coins selected; sticky submit **Review**; keyboard pushes footer via `CMP-KeyboardAwareFooter-Mobile` (visualViewport).

**Bottom sheets:** Selectors use `CMP-CoinSelectorSheet-Mobile` (below).

---

## CMP-CoinSelectorSheet-Mobile

| | |
|--|--|
| **Component ID** | `CMP-CoinSelectorSheet-Mobile` |
| **Screen IDs** | `SCR-CONVERT`, `SCR-WITHDRAW`, `SCR-DEPOSIT` (network/coin pickers) |
| **shadcn / parts** | Vaul `Drawer` (`DrawerContent`, `DrawerHeader`, `DrawerTitle`), `Input` search, `ScrollArea`, `Button` row per coin, Lucide check. |

**States:** Default list; Loading skeleton rows; Empty search “Nenhuma moeda”; Error banner; Disabled row if coin unavailable.

**Touch:** Tap row selects + closes; drag handle to dismiss.

**Bottom sheet:** Snaps `0.85` and `1`; height min **50vh**; scroll inside list; drag handle yes.

---

## CMP-ConfirmConversionSheet-Mobile

| | |
|--|--|
| **Component ID** | `CMP-ConfirmConversionSheet-Mobile` |
| **Screen IDs** | `SCR-CONVERT` (step 2) |
| **shadcn / parts** | `Drawer`, `Separator`, `Button` primary/destructive outline for Cancel; summary `Card` inside. |

**States:** Default summary; Loading on confirm; Error toast + sheet open; Disabled buttons while submitting.

**Touch:** Tap Confirm; backdrop tap = cancel if allowed.

**Bottom sheet:** Fixed **~45vh** or snap `0.4` + `0.75`; short content centered; handle + scroll if fees list long.

---

## CMP-WithdrawalForm-Mobile

| | |
|--|--|
| **Component ID** | `CMP-WithdrawalForm-Mobile` |
| **Screen IDs** | `SCR-WITHDRAW` |
| **shadcn / parts** | `Select`/`Drawer` for coin; `Input` amount/address/bank fields; `RadioGroup` method; `CMP-KeyboardAwareFooter-Mobile`. |

**States:** Same pattern as convert; field-level errors.

**Forms:** Amount `decimal`; bank digits `numeric`; address default text with `autocapitalize="none"`; **autofocus** first empty required.

**Bottom sheets:** Coin = `CMP-CoinSelectorSheet-Mobile`; network/method = smaller drawer snap `0.5`.

---

## CMP-ConfirmWithdrawalSheet-Mobile

| | |
|--|--|
| **Component ID** | `CMP-ConfirmWithdrawalSheet-Mobile` |
| **Screen IDs** | `SCR-WITHDRAW` |
| **shadcn / parts** | `Drawer` + summary rows + `Button` **Confirmar saque**. |

**States:** Default / loading / error / disabled as confirm conversion.

**Bottom sheet:** Same as `CMP-ConfirmConversionSheet-Mobile`; emphasize **destination** and **fee** lines.

---

## CMP-DepositView-Mobile

| | |
|--|--|
| **Component ID** | `CMP-DepositView-Mobile` |
| **Screen IDs** | `SCR-DEPOSIT` |
| **shadcn / parts** | `Card`, QR placeholder (or library), `Button` copy, `Tabs` if multi-network; selector `CMP-CoinSelectorSheet-Mobile`. |

**States:** Default; Loading address/QR; Empty coin; Error fetch; Disabled copy briefly after tap.

**Touch:** Tap copy; tap QR optional fullscreen zoom (nice-to-have).

**Forms:** Read-only address `Input` selectable; no keyboard submit.

---

## CMP-TransactionCardList-Mobile

| | |
|--|--|
| **Component ID** | `CMP-TransactionCardList-Mobile` |
| **Screen IDs** | `SCR-HISTORY` |
| **shadcn / parts** | `Card` rows; `Badge` status (`--badge-pending`, `--badge-confirmed`, `--badge-failed`); Lucide direction icons; `CMP-PullToRefresh-Mobile`; `CMP-FilterChips-Mobile` above. |

**States:** Default; Loading skeleton; Empty “Nenhuma transação”; Error + Retry; Disabled N/A.

**Touch:** Tap → `SCR-TX-DETAIL`. **Swipe:** optional archive (if product).

**Card lines:** Line 1: type + coin; Line 2: amount `tabular-nums` + fiat; Line 3: date/time relative. **Trailing:** status **Badge** + chevron.

---

## CMP-FilterChips-Mobile

| | |
|--|--|
| **Component ID** | `CMP-FilterChips-Mobile` |
| **Screen IDs** | `SCR-HISTORY` |
| **shadcn / parts** | Composes **`CMP-FilterChipBar-Mobile`**; additional Vaul `Drawer` for full filter panel: `Select`, `Calendar`/`Popover` date range, `Button` Apply/Reset. |

**States:** Default (chips reflect filters); Loading while applying; Empty filters “Todas”; Error toast; Disabled during fetch.

**Touch:** Chip tap toggles or opens sheet; **long-press** chip optional “clear this filter”.

**Bottom sheet (filters):** Snaps `0.75`/`1`; scroll form; handle; **Apply** sticky in `CMP-KeyboardAwareFooter-Mobile` if inputs focus.

---

## CMP-TransactionDetail-Mobile

| | |
|--|--|
| **Component ID** | `CMP-TransactionDetail-Mobile` |
| **Screen IDs** | `SCR-TX-DETAIL` |
| **shadcn / parts** | `Card` sections, `Separator`, `Badge`, `Button` (explorer link mock), **Back** in header (`Button` ghost + `ArrowLeft`). |

**States:** Default; Loading skeleton page; Empty invalid id → `SCR-404`; Error fetch; Disabled actions none.

**Touch:** Back navigates stack; **no bottom sheet** unless “raw JSON” debug.

**Navigation:** Stack push from History; preserve scroll on back.

---

## CMP-AlertCardList-Mobile

| | |
|--|--|
| **Component ID** | `CMP-AlertCardList-Mobile` |
| **Screen IDs** | `SCR-ALERTS` |
| **shadcn / parts** | Each row `CMP-SwipeRow-Mobile`; `Card` content; `Switch` for active; `Badge` coin. |

**States:** Default; Loading; Empty “Nenhum alerta” + CTA create; Error; Disabled global.

**Touch:** Toggle tap; swipe delete/toggle per `CMP-SwipeRow-Mobile`; tap body → edit if product.

**Card lines:** Line 1: coin + condition; Line 2: threshold; **Trailing:** `Switch` or chevron.

---

## CMP-CreateAlertSheet-Mobile

| | |
|--|--|
| **Component ID** | `CMP-CreateAlertSheet-Mobile` |
| **Screen IDs** | `SCR-ALERT-CREATE` or modal route over `SCR-ALERTS` |
| **shadcn / parts** | `Drawer`, `Label`, `Input`, `Select`, `Button`, `CMP-KeyboardAwareFooter-Mobile`. |

**States:** Default; Loading submit; validation Empty/Error; Disabled on submit.

**Touch:** Drag handle; fields standard.

**Bottom sheet:** Snap `0.9`/`1`; scroll form; sticky **Criar alerta**.

**Forms:** Price `decimal`; **autofocus** first field; keyboard footer.

---

## CMP-SettingsList-Mobile

| | |
|--|--|
| **Component ID** | `CMP-SettingsList-Mobile` |
| **Screen IDs** | `SCR-SETTINGS` |
| **shadcn / parts** | `Separator` section headers; rows as `Button` variant ghost justify-between; `Select` for fiat; `Switch` theme/notifications; Lucide `ChevronRight` on drill-ins. |

**States:** Default; Loading skeleton list; Empty N/A; Error banner top; Disabled while saving row.

**Touch:** Tap row; switch toggle; **long-press** row optional “reset default”.

**Forms:** Inline `Select` triggers native picker or sheet; no global keyboard unless text field.

---

## CMP-SwipeRow-Mobile — **MOBILE-ONLY**

| | |
|--|--|
| **Component ID** | `CMP-SwipeRow-Mobile` |
| **Screen IDs** | `SCR-ALERTS` (alert rows); optionally `SCR-HISTORY` if swipe actions enabled. |
| **shadcn / parts** | Pattern built with `@radix-ui/react-*` or custom motion; background layers: **left** red “Excluir”, **right** amber “Pausar/Ativar”; foreground `Card`. |

**Behavior:** **Left swipe** reveals **delete** (red, `destructive`); **right swipe** reveals **toggle** (amber, `primary` / warning). Destructive completes only after **confirm** `AlertDialog` or undo toast 5s.

**States:** Idle / dragging / revealed / confirming.

**Touch:** Swipe thresholds ~56px reveal; tap action or confirm.

---

## CMP-PullToRefresh-Mobile — **MOBILE-ONLY**

| | |
|--|--|
| **Component ID** | `CMP-PullToRefresh-Mobile` |
| **Screen IDs** | `SCR-HOME`, `SCR-HISTORY`, `SCR-ALERTS` |
| **shadcn / parts** | Container with scroll listener; `Loader2` Lucide spinner; optional `Progress` ring. |

**Behavior:** Pull **> 60px** threshold triggers refresh; releasing runs async; spinner until settle; error → toast.

**States:** Idle / pulling / refreshing / error (toast).

---

## CMP-FilterChipBar-Mobile — **MOBILE-ONLY**

| | |
|--|--|
| **Component ID** | `CMP-FilterChipBar-Mobile` |
| **Screen IDs** | `SCR-HISTORY` (child of `CMP-FilterChips-Mobile`) |
| **shadcn / parts** | `ScrollArea` horizontal; `Toggle` or `Badge` + `Button` size `sm` pill outline. |

**Touch:** Tap chip toggles quick filter; tap **“Filtros”** opens full sheet from parent.

**States:** Default; disabled while loading list.

---

## CMP-KeyboardAwareFooter-Mobile — **MOBILE-ONLY**

| | |
|--|--|
| **Component ID** | `CMP-KeyboardAwareFooter-Mobile` |
| **Screen IDs** | `SCR-CONVERT`, `SCR-WITHDRAW`, `SCR-ALERT-CREATE`, filter sheet with inputs |
| **shadcn / parts** | Fixed `div` with `border-t border-border bg-card/95`; contains primary/secondary `Button`s; listens `visualViewport` resize + `env(safe-area-inset-bottom)`. |

**Behavior:** On keyboard open, translateY up by `keyboardHeight - safeArea` (cap to reasonable max); on close, animate back. Submit bar stays **one column**, full width, min height 56px + safe area.

**States:** Default / keyboard-visible / submitting (`Button` loading).

---

## Coordination notes for Hephaestus

1. **Tokens:** Use Apollo token file names and CSS variables verbatim; no mobile-specific token aliases unless later approved—mobile-only components still read `--primary`, `--card`, `--border`, etc.
2. **MOBILE-ONLY:** Components marked **MOBILE-ONLY** must not block desktop bundles if code-split; export from a `mobile/` barrel or feature flag as needed.
3. **Parity:** Desktop **semantics** (labels, validation rules, status badges, route names) stay aligned with Apollo component specs; only **layout and interaction** differ (tabs vs sidebar, sheets vs modal dialogs).
4. **Vaul:** Use `Drawer` for all former “Modal” confirmations on mobile to match native expectations; keep **`modal={true}`** for true blockers (confirm withdraw) so focus trap is correct.
5. **Accessibility:** Sheets must expose **title** (`DrawerTitle`) to SR; FAB must have **`aria-expanded`**; swipe rows need **accessible names** for actions (not swipe-only).

---

*End of mobile component specs — Crypto Wallet Dashboard*
