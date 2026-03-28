# Crypto Wallet Dashboard — Mobile Layouts

**Artemis · Mobile UI/UX**  
Mobile-first layouts for the crypto wallet. **Stack:** shadcn/ui, **Vaul** (drawers/sheets), **Lucide** icons. **Theme:** dark default.

---

## Design System (mobile)

| Layer | Tokens |
|--------|--------|
| **Background** | `zinc-950` |
| **Surfaces / cards** | `zinc-900` (elevated), `zinc-800` borders / inputs |
| **Primary / CTAs** | Amber–orange (`amber-500` primary actions) |
| **Success** | `emerald-500` (confirmed, gains, positive Δ) |
| **Errors / destructive** | `red-500` (failures, losses, negative Δ) |
| **Text** | High: `zinc-50`–`zinc-100`; muted: `zinc-400`–`zinc-500` |

**Coins supported:** BTC, ETH, BNB, SOL, ADA, USDT, USDC. **Fiat display:** BRL.

---

## App Shell

### 1. Bottom Tab Bar (4 tabs)

| Tab | Label | Lucide |
|-----|--------|--------|
| 1 | Home | `LayoutDashboard` |
| 2 | Histórico | `Clock` |
| 3 | Alertas | `Bell` |
| 4 | Configurações | `Settings` |

- **Height:** ~56px + safe-area inset bottom (`env(safe-area-inset-bottom)`).
- **Behavior:** Hidden while the soft keyboard is open (resize/or `Keyboard` API) so inputs are not obscured.
- **Style:** `zinc-900` bar, `zinc-800` top hairline; active tab amber accent, inactive `zinc-500`.

### 2. FAB (Floating Action Button)

- **Position:** Bottom-right, above the tab bar + safe area (clear ~72–80px from bottom edge of screen content area).
- **Icon:** `Plus` (Lucide).
- **Interaction:** Tap opens **speed-dial** with 3 actions: **Convert** (`ArrowLeftRight`), **Withdraw** (`ArrowUpFromLine`), **Deposit** (`ArrowDownToLine`). Each action navigates to the corresponding stack route (`/convert`, `/withdraw`, `/deposit`).
- **Scroll:** Hide on scroll **down**, show on scroll **up** (same scroll container as current screen body where applicable).

### 3. Navigation

- **Stack:** Standard push for detail and action screens (convert, withdraw, deposit, transaction detail).
- **Modal stack:** Quick-create flows that can overlay without losing tab context (e.g. alert creation as sheet).

### 4. Top App Bar

- **Root tabs:** Large title (iOS-style large header optional); **collapses** to compact bar on scroll.
- **Inner stack:** Title centered or start-aligned; **back** on left when `history.length > 1`.
- **Actions:** Optional right cluster — e.g. `Search`, `Filter` (context-dependent).
- **Elevation:** Subtle bottom border `zinc-800` or blur scrim on scroll.

### 5. User Profile (Home)

- **Home tab only:** Avatar **top-right** in app bar. **Tap →** navigates to **Settings** tab (or `/settings` with tab selected), not a separate profile screen in this scope.

---

## Screens (all 11)

---

### 1. SCR-HOME — `/dashboard`

| Field | Value |
|--------|--------|
| **Screen ID** | SCR-HOME |
| **Route** | `/dashboard` |
| **Navigation** | **Tab root** (Home) |

**App bar**

- **Title:** Large “Carteira” / “Resumo” (product name as needed); collapsible on scroll.
- **Actions:** Avatar **right** → Settings. Optional **search** icon if global search is promoted; otherwise search lives in body only.

**Body** (vertical **scroll** container, full height above tab bar)

1. **Quick search** — Text input at top (`zinc-800` field), filters coin list client-side; `Search` icon optional inside field.
2. **Horizontal stat strip** — Scroll-snap horizontal row of **stat cards**: (a) total portfolio value BRL, (b) 24h change (emerald/red), (c) asset count. Snap: `snap-x snap-mandatory`, cards `snap-start`.
3. **Vertical coin list** — **Coin cards** (`zinc-900`): coin icon + name, balance, value in **BRL**, **24h change badge** (emerald/red).

**Bottom**

| Element | Visible? |
|---------|----------|
| Tab bar | **Yes** |
| FAB | **Yes** (hide/show with scroll) |
| Sticky footer | **No** |

**Sheets vs full screen**

- Coin detail (if added later): stack; not required on this screen.

**Gestures / refresh**

- **Pull-to-refresh** on main scroll: refetch balances and quotes.

---

### 2. SCR-CONVERT — `/convert`

| Field | Value |
|--------|--------|
| **Screen ID** | SCR-CONVERT |
| **Route** | `/convert` |
| **Navigation** | **Stack push** (from FAB speed-dial or deep link) |

**App bar**

- **Title:** “Converter”
- **Actions:** **Back** (left implied). No search.

**Body** (scroll; keyboard-aware padding)

1. **Source coin** — Row / card; tap opens **bottom sheet** (Vaul) with searchable coin list (BTC, ETH, BNB, SOL, ADA, USDT, USDC).
2. **Amount** — Numeric input (`inputMode="decimal"`), BRL helper text optional.
3. **Swap** — Centered circular button (`ArrowDownUp` or swap icon) swaps source/dest selection.
4. **Destination coin** — Same pattern; **bottom sheet** selector.
5. **Rate preview** — Read-only row: rate, spread, countdown if applicable.
6. **Fee** — Row: network / platform fee in BRL or crypto.

**Bottom**

| Element | Visible? |
|---------|----------|
| Tab bar | **No** (stack covers tabs) |
| FAB | **No** |
| Sticky footer | **Yes** — primary **“Converter”** (`amber`) full-width |

**Sheets vs full screen**

- Selectors: **bottom sheets**.
- **Confirm:** Summary **bottom sheet** (Vaul) after tapping “Converter”: amounts, rate, fee, **Confirm** / Cancel.

---

### 3. SCR-WITHDRAW — `/withdraw`

| Field | Value |
|--------|--------|
| **Screen ID** | SCR-WITHDRAW |
| **Route** | `/withdraw` |
| **Navigation** | **Stack push** |

**App bar**

- **Title:** “Sacar”
- **Back** + optional **help** icon right.

**Body** (scroll)

1. **Coin selector** — Sheet or inline list; same 7 coins + stablecoins.
2. **Method toggle** — **Crypto** | **Fiat** (segmented control).
3. **Amount** — Numeric; max available chip.
4. **Destination fields** — Crypto: address, memo/tag if needed. Fiat: bank fields (PIX/agency per product).
5. **Network selector** — When crypto; **bottom sheet** for chain list.
6. **Fee** — Display estimated fee and time.

**Bottom**

| Element | Visible? |
|---------|----------|
| Tab bar | **No** |
| FAB | **No** |
| Sticky footer | **Yes** — **“Sacar”** |

**Sheets**

- **Confirmation bottom sheet** before submit: address/bank summary, amount, fee, **Confirmar**.

---

### 4. SCR-DEPOSIT — `/deposit`

| Field | Value |
|--------|--------|
| **Screen ID** | SCR-DEPOSIT |
| **Route** | `/deposit` |
| **Navigation** | **Stack push** |

**App bar**

- **Title:** “Depositar”
- **Back**

**Body** (scroll)

1. **Coin selector** — Tap → **bottom sheet** (7 coins).
2. **Network selector** — **Bottom sheet** (chains per coin).
3. **Deposit address** — Monospace, truncated with copy; **QR code** centered (`zinc-900` card).
4. **Copy** — Primary outline or ghost **“Copiar endereço”**; toast on success (emerald).
5. **Warning banner** — Amber border: min confirmations, only send on selected network, contract warnings for USDT/USDC.

**Bottom**

| Element | Visible? |
|---------|----------|
| Tab bar | **No** |
| FAB | **No** |
| Sticky footer | **Optional** — “Compartilhar QR” secondary; not required if copy suffices |

**Sheets**

- Coin and network: **bottom sheets** only.

---

### 5. SCR-HISTORY — `/history`

| Field | Value |
|--------|--------|
| **Screen ID** | SCR-HISTORY |
| **Route** | `/history` |
| **Navigation** | **Tab root** (Histórico) |

**App bar**

- **Large title:** “Histórico”; collapses on scroll.
- **Actions:** **Filter** (`SlidersHorizontal` or `Filter`) opens filter context; **Search** optional for tx hash.

**Body** (scroll)

1. **Filter chips** — Horizontal scroll: **type** (all, deposit, withdraw, convert, …), **period**, **coin**. Tap chip opens **bottom sheet** with granular options + **Aplicar**.
2. **Transaction list** — **Cards**: type icon (Lucide per type), coin ticker, signed amount, date/time, **status badge** (pending amber / confirmed emerald / failed red).

**Bottom**

| Element | Visible? |
|---------|----------|
| Tab bar | **Yes** |
| FAB | **No** on this tab (speed-dial lives on Home; optional parity: hide FAB globally here or keep — **spec: FAB only on Home tab** for clarity) |
| Sticky footer | **No** |

**Note:** If FAB is global shell, show same scroll behavior; product may restrict FAB to Home only — **default:** FAB **hidden** on Histórico/Alertas/Settings for less clutter, **or** show on all tabs — **recommendation:** **Home only** for primary actions.

**Gestures**

- **Pull-to-refresh** transaction list.
- Tap row → **SCR-TX-DETAIL**.

---

### 6. SCR-TX-DETAIL — `/history/:txId`

| Field | Value |
|--------|--------|
| **Screen ID** | SCR-TX-DETAIL |
| **Route** | `/history/:txId` |
| **Navigation** | **Stack push** from history list |

**App bar**

- **Title:** “Detalhes” or tx short id
- **Back** prominent

**Body** (scroll)

- **Single detail card** (`zinc-900`): amount, coin, fiat value BRL, type, date, **status badge large**, network, txid with copy, explorer link (if crypto), fee line, memo.

**Bottom**

| Element | Visible? |
|---------|----------|
| Tab bar | **No** |
| FAB | **No** |
| Sticky footer | **No** (optional **“Ver no explorer”** sticky on crypto) |

**Sheets**

- None required; **share** via system sheet if needed.

---

### 7. SCR-ALERTS — `/alerts`

| Field | Value |
|--------|--------|
| **Screen ID** | SCR-ALERTS |
| **Route** | `/alerts` |
| **Navigation** | **Tab root** (Alertas) |

**App bar**

- **Large title:** “Alertas”
- **Actions:** **“+”** or rely on **FAB** from shell — **spec:** **“+”** in app bar **or** FAB visible (same as Home). **Recommendation:** **App bar `+`** for create to avoid duplicate with speed-dial; **alternative:** only **FAB** with speed-dial including “Novo alerta” — **chosen:** **App bar `Plus`** opens **SCR-ALERT-CREATE** sheet **and** FAB on Home remains for convert/withdraw/deposit.

**Body** (scroll)

- **Alert cards:** coin, condition (e.g. “BTC > X”), direction, enabled toggle; **swipe-to-delete** (red background, `Trash2`).

**Bottom**

| Element | Visible? |
|---------|----------|
| Tab bar | **Yes** |
| FAB | **Optional** — if shown, `Plus` could open alert sheet; **prefer** app bar + for Alert tab to distinguish from wallet actions |

**Gestures**

- **Pull-to-refresh** alert list.
- **Swipe left** delete with undo snackbar optional.

---

### 8. SCR-ALERT-CREATE — (modal / sheet route)

| Field | Value |
|--------|--------|
| **Screen ID** | SCR-ALERT-CREATE |
| **Route** | e.g. `/alerts/new` or state-only overlay (implementation: **presented as sheet**) |
| **Navigation** | **Bottom sheet (Vaul)** — **~60% height**, **snap points** (e.g. 60% / 90%) |

**App bar**

- Sheet **drag handle** + title **“Novo alerta”** in sheet header (no full app bar).

**Body** (inside sheet, scroll if needed)

1. **Coin selector** — Opens nested **bottom sheet** or inline list.
2. **Direction toggle** — Acima de / Abaixo de (or Above/Below price).
3. **Percentage or target** — Numeric **%** or price input.
4. **Save** — Primary at bottom of sheet or sticky in sheet footer.

**Bottom (shell)**

| Element | Visible? |
|---------|----------|
| Tab bar | **Visible behind** dimmed backdrop (typical) or sheet covers full width |
| FAB | Obscured by sheet |
| Sticky footer | **Inside sheet:** **“Salvar alerta”** |

**Dismiss**

- Swipe down or tap scrim to close; validate unsaved changes.

---

### 9. SCR-SETTINGS — `/settings`

| Field | Value |
|--------|--------|
| **Screen ID** | SCR-SETTINGS |
| **Route** | `/settings` |
| **Navigation** | **Tab root** (Configurações) |

**App bar**

- **Large title:** “Configurações”
- **Avatar** not duplicated if this is settings-only; optional **edit** icon.

**Body** (scroll, grouped **list**)

1. **Display currency** — Row: BRL; tap → sheet or sub-page to change (if multi-fiat later).
2. **Theme** — Toggle: **Escuro** default (dark); light optional — **toggle** row.
3. **Notifications** — Row → push/email toggles sub-screen or inline switches.
4. **Account info** — Email, KYC status, logout destructive at bottom (`red` text).

**Bottom**

| Element | Visible? |
|---------|----------|
| Tab bar | **Yes** |
| FAB | **No** |

---

### 10. SCR-404 — `*` (catch-all)

| Field | Value |
|--------|--------|
| **Screen ID** | SCR-404 |
| **Route** | `*` / unknown |
| **Navigation** | **Full screen** (replaces content; no tabs or minimal chrome) |

**App bar**

- **None** or minimal logo-only header.

**Body**

- **Illustration** (empty / lost wallet motif, `zinc-700` strokes).
- **Title:** “Página não encontrada”
- **Message:** Short copy.
- **CTA:** **“Ir para Home”** → `replace` to `/dashboard`.

**Bottom**

| Element | Visible? |
|---------|----------|
| Tab bar | **No** |
| FAB | **No** |
| Sticky footer | **No** — CTA in body |

---

### 11. SCR-EMPTY — `/dashboard` (empty state)

| Field | Value |
|--------|--------|
| **Screen ID** | SCR-EMPTY |
| **Route** | `/dashboard` (same as SCR-HOME) |
| **Navigation** | **Tab root** — conditional empty state |

**App bar**

- Same as SCR-HOME (large title + avatar).

**Body**

- **No** coin list; **centered block:**
  - Illustration
  - **“Você ainda não tem moedas”**
  - Primary **“Fazer depósito”** → navigates to **SCR-DEPOSIT** (`/deposit` stack push).

**Optional:** Dismissible tip card (amber) for first run.

**Bottom**

| Element | Visible? |
|---------|----------|
| Tab bar | **Yes** |
| FAB | **Yes** (speed-dial still useful for deposit) |
| Sticky footer | **No** |

**Pull-to-refresh**

- Still applicable; refreshes and may transition to SCR-HOME when first deposit arrives.

---

## Screen Coverage Table

| Screen ID | Route | Mobile Pattern | Gesture Notes | Parity with Apollo |
|-----------|--------|----------------|---------------|-------------------|
| SCR-HOME | `/dashboard` | Tab + scroll + horizontal snap stats | Pull-to-refresh; FAB scroll hide/show | Same portfolio data, BRL, 7 coins; layout adapts from tables to cards |
| SCR-CONVERT | `/convert` | Full-screen stack + sticky CTA | Sheets for selectors; confirm sheet | Same conversion flow and fields as desktop |
| SCR-WITHDRAW | `/withdraw` | Full-screen stack + sticky CTA | Confirm sheet | Same withdraw logic; mobile-first keyboard |
| SCR-DEPOSIT | `/deposit` | Full-screen stack | Copy + QR; warning banner | Same address/QR content as desktop deposit |
| SCR-HISTORY | `/history` | Tab + filters | Pull-to-refresh; chips → filter sheet | Same tx list fields; chips replace sidebar filters |
| SCR-TX-DETAIL | `/history/:txId` | Stack detail | — | Same detail rows as desktop drawer/modal |
| SCR-ALERTS | `/alerts` | Tab list | Pull-to-refresh; swipe-to-delete | Same alert entities as desktop |
| SCR-ALERT-CREATE | `/alerts/new` (sheet) | Vaul ~60% snap | Drag to dismiss | Same fields as desktop create alert |
| SCR-SETTINGS | `/settings` | Tab grouped list | — | Same settings groups; theme/currency/notifications |
| SCR-404 | `*` | Full-screen error | — | Same messaging; desktop has equivalent empty/error route |
| SCR-EMPTY | `/dashboard` | Tab empty state | CTA to deposit | Same as desktop empty portfolio state |

---

*End of mobile layouts — Crypto Wallet Dashboard (Artemis).*
