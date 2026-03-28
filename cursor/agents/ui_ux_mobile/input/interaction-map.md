# Interaction Map — Crypto Wallet Dashboard

**Product**: Crypto Wallet Dashboard for non-technical users  
**Stack**: React + Vite + TypeScript + TailwindCSS  
**Theme**: Dark default; clean, modern; responsive (mobile + desktop)  
**Supported coins**: BTC, ETH, BNB, SOL, ADA, USDT, USDC  
**Default display fiat**: BRL (Settings may offer USD/EUR)

**Flow reference**: Flow IDs below align with `cursor/agents/product_strategist/input/user-flows.md` (no separate `detailed-flows.md` present in repo).

---

## Global Navigation Components

### Desktop — `AppSidebar` (left, fixed)

| Element | Behavior | States & Events |
|--------|----------|-----------------|
| **BrandLogo** | Click navigates to `/dashboard`. Optional: opens marketing home if product adds it later; MVP → `/dashboard`. | Hover: subtle highlight. Focus: visible ring (a11y). |
| **NavLink(Dashboard)** | Route `/dashboard`. Icon + label "Início" or "Dashboard". | **Active**: distinct bg/border/indicator. **Inactive**: muted. **Click**: `navigate('/dashboard')`. **Keyboard**: Enter/Space activates. |
| **NavLink(History)** | Route `/history`. Icon + label "Histórico". | Same as above for active/inactive/keyboard. |
| **NavLink(Alerts)** | Route `/alerts`. Icon + label "Alertas". | Same. **Badge**: optional count of unread/triggered alerts (see F-ALERT-001-TRIGGER). |
| **NavLink(Settings)** | Route `/settings`. Icon + label "Configurações". | Same. |
| **SidebarSectionLabel** | Static "Ações rápidas" (or similar). | N/A |
| **QuickActionButton(Convert)** | Navigates to `/convert`. | Disabled: never on sidebar (always available). **Click** → `/convert`. |
| **QuickActionButton(Withdraw)** | Navigates to `/withdraw`. | Same. |
| **QuickActionButton(Deposit)** | Navigates to `/deposit`. | Same. |
| **SidebarCollapseToggle** (optional) | Collapses to icon-only rail. | Persists preference (localStorage). **Expanded**: full labels. **Collapsed**: tooltips on icons. |

**Mobile notes (desktop-only regions)**: Sidebar hidden below `lg` (or project breakpoint); see Mobile Bottom Nav.

---

### Mobile — `MobileBottomNav` + `QuickActionsFab`

**`MobileBottomNav`** — fixed bottom, 4 items:

| Item | Route | Icon | Behavior |
|------|-------|------|----------|
| **BottomNavItem(Home)** | `/dashboard` | Home | Active when path is `/dashboard` (including empty state same route). |
| **BottomNavItem(History)** | `/history` | Clock/history | Active on `/history` and `/history/:txId` (detail is child of history flow). |
| **BottomNavItem(Alerts)** | `/alerts` | Bell | Active on `/alerts`. Badge when alerts fired (F-ALERT-001-TRIGGER). |
| **BottomNavItem(Settings)** | `/settings` | Gear | Active on `/settings`. |

**`QuickActionsFab`** — primary circular FAB, bottom-end above nav bar:

- **Tap**: toggles **`FabActionSheet`** (or speed-dial menu) with three actions:
  - **FabMenuItem(Convert)** → `/convert`
  - **FabMenuItem(Withdraw)** → `/withdraw`
  - **FabMenuItem(Deposit)** → `/deposit`
- **Open state**: backdrop dim; **tap outside** or **Escape** closes sheet.
- **Animation**: sheet slides up (bottom sheet pattern) — **Artemis divergence**: use native-feeling sheet, not a centered modal, for the three actions.
- **a11y**: FAB has `aria-expanded`, menu items are focus-trapped when open.

**Conflict rule**: When FAB sheet is open, bottom nav remains visible but backdrop blocks interaction with list content until dismissed.

---

### Breadcrumbs & back — `PageHeader` variants

| Context | Component | Behavior |
|---------|-----------|----------|
| **SCR-TX-DETAIL** | **BackButton** + optional **Breadcrumb**(Histórico → Detalhe) | **Back**: `navigate(-1)` preferred; fallback `navigate('/history')` if no history. **Breadcrumb "Histórico"**: link to `/history`. |
| **SCR-CONVERT / SCR-WITHDRAW / SCR-DEPOSIT** | Optional **Breadcrumb** or **BackButton** only | Mobile: back returns to previous screen (often `/dashboard`). Desktop: user may rely on sidebar; back still available in header for consistency. |
| **SCR-404** | Link "Voltar ao início" | Primary navigation to `/dashboard`. |

---

## SCR-HOME — Dashboard

**Route**: `/dashboard`  
**Screen ID**: SCR-HOME

### Purpose

Give the user an at-a-glance view of total portfolio value in BRL and per-coin balances, with search and one-tap access to convert, withdraw, and deposit.

### Content Blocks

| Block | Role | Specific content |
|-------|------|------------------|
| **Header** | Title + context | Screen title "Painel" or "Minha carteira"; optional subtitle with last update time for prices (mock). |
| **Toolbar** | Search + global affordances | **SearchInput** filtering the coin list; optional **PortfolioRefreshButton** (mock refresh). |
| **Filters** | N/A as tabs | Search acts as filter; no separate filter chips unless product adds "hide zero balances" later. |
| **Main area** | Primary content | **PortfolioSummaryCard** (total BRL, day change if available); **MoversSection** (coins with significant 24h move); **CoinList** (scrollable). |
| **Side panels** | Desktop only | None by default; layout is single column + optional right rail **QuickActionsCard** duplicate of sidebar actions for F-pattern scanning (optional duplicate of Convert/Withdraw/Deposit). |

### Components (exhaustive)

| Component | Behaviors | States | Events |
|-----------|-----------|--------|--------|
| **PortfolioSummaryCard** | Shows total fiat (BRL), optional % change aggregate. | Loading: skeleton lines. Error: inline error + retry. Success: formatted currency. Partial: total without movers. | Click: optional expand/collapse; MVP: static. |
| **MoversSection** / **MoverChip** | Lists 1–3 coins with notable 24h % moves (from mock). | Empty: section hidden. | Chip click: could pre-fill `/convert?from=BTC` (optional deep link). |
| **SearchInput** | Filters **CoinListItem** by name/ticker (BTC, Bitcoin). | Empty query: full list. Typing: debounced filter. | onChange, clear button when non-empty. |
| **CoinList** | Virtualized or simple scroll list of wallets. | Empty: **not** used when SCR-EMPTY applies (separate view). Loading: skeleton rows. | Scroll. |
| **CoinListItem** | Per coin: icon, name, ticker, balance, fiat value, 24h change % with color. | Success per row. Error: row-level rare; global error preferred. | Click: optional navigation to convert with `?coin=BTC` or open **CoinQuickMenu**(Convert/Alert). Secondary **IconButton(More)** on row. |
| **QuickActionButton** (×3) | Mirror sidebar: Convert, Withdraw, Deposit. | Disabled: **never** for navigation. | onClick → routes. |
| **AlertBanner** (conditional) | Shown when a price alert fired (F-ALERT-001-TRIGGER): e.g. "BTC subiu 5.2% nas últimas 24h". | Visible/hismissed session flag in localStorage. | CTA "Ver" → `/dashboard` scroll to coin or `/alerts`. Dismiss → hide. |
| **NavigationBadge(Alerts)** | In shell, not only home — listed here for cross-trigger. | Badge count when triggers pending. | — |

### States

| State | UI |
|-------|-----|
| **Empty** | Handled by **SCR-EMPTY** on same route (`/dashboard` with no coins) — see dedicated section. |
| **Loading** | Full-page or in-place **Skeleton**: header, summary skeleton, 5–7 **CoinListItemSkeleton** rows. |
| **Error** | **ErrorStateCard**: message "Não foi possível carregar seus dados", **Button(Retry)** primary. |
| **Success** | Full data: summary + list + movers. |
| **Partial** | Summary loads, list delayed: show summary + list skeleton; or list loads without movers: show list, hide movers section. |

### Actions

| Type | Control | Disabled when |
|------|---------|---------------|
| **Primary** | **Retry** (error state) | Never disabled once shown. |
| **Secondary** | **SearchInput** clear, **Refresh** (if present) | Refresh disabled during in-flight load. |
| **Destructive** | None on dashboard. | — |

### Modals / Dialogs

- None required for core SCR-HOME. Optional **Modal(Education)** for first visit — out of MVP unless scope adds.

### Toasts / Banners

| Kind | Example | Trigger |
|------|---------|---------|
| **Success** | "Dados atualizados" | After manual refresh success. |
| **Warning** | "Cotações podem estar atrasadas" | If mock simulates stale data. |
| **Error** | "Falha ao atualizar. Tente novamente." | Refresh fails. |
| **Info banner** | Alert triggered copy | F-ALERT-001-TRIGGER. |

### URL & Entry

| Entry | Behavior |
|-------|----------|
| **Direct** `/dashboard` | Loads dashboard; if app root `/` redirects here per sitemap. |
| **Query** `?coin=BTC` | Optional: scroll/highlight BTC row or open convert — product choice; document as **optional**: highlight row + toast "Pronto para converter BTC?". |
| **Query** `?action=deposit` | Optional deep link → could navigate to `/deposit`. |

### Linked Flows

- **F-DASH-001** (happy path)
- **F-DASH-001-ERR** (error + empty via SCR-EMPTY)
- **F-ALERT-001-TRIGGER** (banner/badge)
- **F-NAV-001**
- **EC-003**, **EC-005**, **EC-006** (loading, long list, toast over nav)

### Mobile Notes (Artemis)

- **Bottom nav** visible; **FAB** for Convert/Withdraw/Deposit.
- **Search**: full width below header; consider **sticky** subheader when scrolling coin list.
- **CoinListItem**: larger touch targets (min 44px); row actions in **BottomSheet** if "More" used.
- **MoversSection**: horizontal scroll chips on narrow screens.

---

## SCR-EMPTY — Empty Dashboard State

**Route**: `/dashboard` (same as SCR-HOME, conditional rendering)  
**Screen ID**: SCR-EMPTY

### Purpose

Orient first-time or zero-balance users to make a first deposit without exposing an empty confusing grid.

### Content Blocks

| Block | Content |
|-------|---------|
| **Header** | Same app shell; title "Painel" or "Bem-vindo". |
| **Toolbar** | **SearchInput** disabled or hidden (no coins to filter). |
| **Main area** | **EmptyStateIllustration**, headline, body copy, **Primary CTA** "Fazer primeiro depósito", **Secondary** "Saiba mais" (optional collapsible FAQ). |
| **Side panels** | None. |

### Components

| Component | Behaviors | States | Events |
|-----------|-----------|--------|--------|
| **EmptyStateIllustration** | Decorative SVG/illustration (wallet empty). | Static. | None. |
| **EmptyStateTitle** | e.g. "Você ainda não tem moedas" | — | — |
| **EmptyStateDescription** | Short reassurance + what deposit does. | — | — |
| **PrimaryButton(FirstDeposit)** | Navigates to `/deposit`. | Default, hover, focus, active. | onClick → `/deposit`. |
| **SecondaryButton(Learn)** | Optional: expands **Accordion** or `/settings` help. | — | — |
| **InlineLink(History)** | "Ver histórico" → `/history` if empty history messaging needed. | — | — |

### States

| State | UI |
|-------|-----|
| **Empty** | This screen is the empty state. |
| **Loading** | Brief skeleton before determining zero balances → then transition to empty or home. |
| **Error** | If eligibility for empty vs error fails, show **ErrorStateCard** with retry (same as SCR-HOME). |
| **Success** | N/A (no portfolio data). |
| **Partial** | N/A. |

### Actions

| Type | Control | Disabled when |
|------|---------|---------------|
| **Primary** | First deposit | Never. |
| **Secondary** | Learn link | Optional external — if no URL, hide. |

### Modals / Dialogs

- None mandatory.

### Toasts / Banners

- Optional welcome toast once: "Comece depositando criptomoedas com segurança." (session-scoped dismiss).

### URL & Entry

- Same as `/dashboard`. Client/router decides SCR-EMPTY vs SCR-HOME based on mock `wallets.length === 0` or aggregate balance zero (product rule).

### Linked Flows

- **F-DASH-001-ERR** (empty branch)
- **EC-001**
- **F-DEP-001** (exit toward deposit)

### Mobile Notes

- CTA full-width; illustration scales down; maintain single-column focus.

---

## SCR-CONVERT — Conversion

**Route**: `/convert`  
**Screen ID**: SCR-CONVERT

### Purpose

Allow the user to exchange an amount from one supported asset to another with live preview, fees, and explicit confirmation before execution.

### Content Blocks

| Block | Content |
|-------|---------|
| **Header** | Title "Converter"; **BackButton** on mobile. |
| **Toolbar** | Optional **RateStaleIndicator** ("Atualizado há X min"). |
| **Filters** | N/A. |
| **Main area** | **ConvertForm**: source **CoinSelect**, **AmountInput**, **SwapButton**, target **CoinSelect**, **ConversionPreview**, **FeeAndRatePanel**, **SubmitButton(Converter)**. |
| **Side panels** | Desktop: optional **HelpCard** (fee explanation). |

### Components

| Component | Behaviors | States | Events |
|-----------|-----------|--------|--------|
| **CoinSelect(Source)** | Searchable dropdown; coins BTC…USDC; shows balance. | Open/closed; loading balances; disabled if single option (edge). | onSelect, onSearch. |
| **CoinSelect(Target)** | Same list; excludes same-as-source validation message. | Open/closed. | onSelect. |
| **AmountInput** | Numeric; respects decimals per coin; max = balance. | Empty, partial, invalid, error (insufficient). | onChange, onBlur validation. |
| **SwapButton** | Swaps source/target coins; recalculates preview. | Disabled if only one coin with balance (optional). | onClick. |
| **ConversionPreview** | "Você recebe aproximadamente X ETH" in real time. | Loading spinner while recomputing; stale flag. | — |
| **FeeAndRatePanel** | Shows rate 1 BTC = x ETH, fee %, network/mock fee. | Collapsed/expanded on mobile. | — |
| **SubmitButton(Converter)** | Opens **Modal(ConfirmConversion)**. | **Disabled**: empty amount, invalid, insufficient balance, same coin, in-flight, below minimum. | onClick. |
| **Modal(ConfirmConversion)** | See Modals section. | Open/closed. | Confirm/Cancel. |

### States

| State | UI |
|-------|-----|
| **Empty** | Amount field empty; preview shows placeholder "--" or zeros muted. |
| **Loading** | Skeleton on preview/rates; submit disabled. |
| **Error** | **InlineAlert** or field errors; **ErrorStateCard** if page-level fetch fails. |
| **Success** | After confirm: toast + optional redirect; form reset or keep values per UX choice. |
| **Partial** | Balances loaded but rate pending: disable submit or show "Calculando…". |

### Actions

| Type | Control | Disabled when |
|------|---------|---------------|
| **Primary** | **Converter** → modal confirm | Invalid form, same coin, insufficient funds, loading. |
| **Secondary** | **Cancel** (in modal), **Back** | — |
| **Destructive** | None | — |

### Modals / Dialogs

**Modal(ConfirmConversion)**

| Element | Content |
|---------|---------|
| **Title** | "Confirmar conversão" |
| **Body** | From: amount + ticker; To: approximate amount + ticker; Rate; Fee; Total debited/credited summary. |
| **Primary** | "Confirmar" — triggers mock API, then closes on success. |
| **Secondary** | "Cancelar" — closes without action. |
| **Close** | X button and backdrop click = Cancel. **Escape** = Cancel. |
| **Loading** | Primary shows spinner and "Processando…" disabled duplicate click. |

### Toasts / Banners

| Kind | Message |
|------|---------|
| **Success** | "Conversão realizada com sucesso!" |
| **Error** | "Erro ao converter. Tente novamente." |
| **Warning** | "Taxa alterada — confira os valores." (if mock simulates slippage) |

### URL & Entry

| Entry | Behavior |
|-------|----------|
| `/convert` | Fresh form. |
| `/convert?from=BTC&to=ETH` | Pre-fill selectors and maybe amount empty. |
| `/convert?from=BTC` | Source only. |

Invalid query coins → ignore with silent fallback or toast "Moeda não disponível".

### Linked Flows

- **F-CONV-001**, **F-CONV-001-ERR**
- **F-NAV-001**
- **EC-004** (zero balance)

### Mobile Notes

- **SwapButton** centered between two compact coin rows (common mobile pattern).
- **CoinSelect**: open as **BottomSheet** picker instead of dropdown.
- **Modal(ConfirmConversion)**: full-screen sheet on small viewports optional.

---

## SCR-WITHDRAW — Withdrawal

**Route**: `/withdraw`  
**Screen ID**: SCR-WITHDRAW

### Purpose

Let the user withdraw a chosen amount via crypto address (with network) or fiat bank details, with validation, fee disclosure, and confirmation.

### Content Blocks

| Block | Content |
|-------|---------|
| **Header** | "Sacar"; **BackButton** mobile. |
| **Toolbar** | Optional disclaimer strip. |
| **Filters** | **MethodSegmentedControl**: Crypto \| Fiat. |
| **Main area** | **CoinSelect**, **AvailableBalance**, **AmountInput**, conditional **CryptoWithdrawFields** OR **FiatWithdrawFields**, **FeeSummary**, **SubmitButton(Sacar)**. |
| **Side panels** | **SecurityTipCard** (verify address once). |

### Components

| Component | Behaviors | States | Events |
|-----------|-----------|--------|--------|
| **MethodSegmentedControl** | Switches between crypto and fiat field sets; clears incompatible fields with confirm optional. | Crypto \| Fiat selected. | onChange. |
| **CoinSelect** | Same supported list; shows balance. | — | onSelect. |
| **AvailableBalance** | Read-only: "Disponível: X BTC (~R$ …)". | Loading/error. | **Link(Max)** sets amount to max minus fee if applicable. |
| **AmountInput** | Validated vs balance and minimum. | Error states for min, insufficient, empty. | onChange. |
| **CryptoWithdrawFields** | **NetworkSelect**, **AddressInput** with paste button, **AddressChecksumHint** (mock). | Network list per coin. | Paste → validate format mock. |
| **FiatWithdrawFields** | **BankSelect** or text, **AgencyInput**, **AccountInput**, **AccountTypeSelect**(CC/Poupança), **HolderNameInput**. | Per-field validation. | onChange. |
| **FeeSummary** | Estimated fee, net receive. | Loading. | — |
| **SubmitButton(Sacar)** | Opens **Modal(ConfirmWithdrawal)**. | Disabled until form valid, loading. | onClick. |
| **Modal(ConfirmWithdrawal)** | Full summary by method. | Open/loading/success close. | Confirm/Cancel. |

### States

| State | UI |
|-------|-----|
| **Empty** | Required fields empty; submit disabled. |
| **Loading** | Balances/networks loading; skeleton. |
| **Error** | Page-level error + retry; field-level for address. |
| **Success** | Toast + navigate to `/dashboard` or `/history`. |
| **Partial** | Crypto path ready but fee still loading → disable submit. |

### Actions

| Type | Control | Disabled when |
|------|---------|---------------|
| **Primary** | **Sacar** / **Confirmar** (modal) | Invalid form; loading. |
| **Secondary** | **Cancelar**, **Back** | — |
| **Destructive** | None on this screen | — |

### Modals / Dialogs

**Modal(ConfirmWithdrawal)**

| Element | Content |
|---------|---------|
| **Title** | "Confirmar saque" |
| **Body** | Coin, amount, method, destination (masked IBAN last 4 or truncated address), network (if crypto), fees, net. |
| **Primary** | "Confirmar" |
| **Secondary** | "Cancelar" |
| **Close** | X, backdrop, Escape → dismiss without withdraw. |

### Toasts / Banners

| Kind | Message |
|------|---------|
| **Success** | "Saque solicitado com sucesso!" |
| **Error** | "Erro ao processar saque. Tente novamente." |
| **Warning** | "Confira o endereço. Operações irreversíveis." |

### URL & Entry

| `/withdraw` | Default empty. |
| `/withdraw?coin=ETH` | Pre-select coin. |
| `/withdraw?method=crypto` | Pre-select method tab. |

### Linked Flows

- **F-SAQUE-001**, **F-SAQUE-001-ERR**
- **F-NAV-001**
- **EC-004**

### Mobile Notes

- **MethodSegmentedControl** full width.
- Long forms: single column; **sticky** fee summary at bottom above primary button.
- **AddressInput**: **paste** icon prominent; optional QR scan placeholder (out of scope if no camera).

---

## SCR-DEPOSIT — Deposit

**Route**: `/deposit`  
**Screen ID**: SCR-DEPOSIT

### Purpose

Show a deposit address and QR code for the selected asset and network so the user can transfer crypto in safely.

### Content Blocks

| Block | Content |
|-------|---------|
| **Header** | "Depositar"; **BackButton**. |
| **Toolbar** | None. |
| **Filters** | **CoinSelect** + **NetworkSelect** (dependent). |
| **Main area** | **DepositAddressCard** (truncated full address), **QRCodeDisplay**, **CopyButton**, **ConfirmationsInfo**, **RiskWarningBanner**. |
| **Side panels** | **FaqMini** "Por quanto tempo é válido?" |

### Components

| Component | Behaviors | States | Events |
|-----------|-----------|--------|--------|
| **CoinSelect** | Supported list. | Required before address shown. | onSelect. |
| **NetworkSelect** | Options per coin (e.g. USDT: ERC20/TRC20 mock). | Disabled until coin selected. | onSelect. |
| **DepositAddressCard** | Read-only monospace address; expand to show full. | Empty until selection; loading generating; error. | — |
| **QRCodeDisplay** | Renders QR for address string. | Hidden if no address. | Tap to enlarge **Modal(QRZoom)** optional. |
| **CopyButton** | Copies address; triggers toast "Copiado!" | Disabled if no address. | onClick. |
| **ConfirmationsInfo** | "N confirmações necessárias" (mock). | — | — |
| **RiskWarningBanner** | "Envie apenas {ASSET} nesta rede…" | Always visible when address shown. | Dismiss optional per session. |

### States

| State | UI |
|-------|-----|
| **Empty** | Prompt "Selecione moeda e rede" with disabled QR/address. |
| **Loading** | Skeleton QR + lines; Copy disabled. |
| **Error** | "Não foi possível gerar o endereço" + **Retry**. |
| **Success** | Address + QR + warnings visible. |
| **Partial** | Address text loaded, QR slow → skeleton QR area. |

### Actions

| Type | Control | Disabled when |
|------|---------|---------------|
| **Primary** | **Retry** (error), **Copy** | Copy when no address. |
| **Secondary** | **Share** (Web Share API mobile optional) | If unsupported, hide. |
| **Destructive** | None | — |

### Modals / Dialogs

- **Modal(QRFullscreen)** (optional): larger QR + address + Copy.

### Toasts / Banners

| Kind | Message |
|------|---------|
| **Success** | "Endereço copiado!" |
| **Error** | "Falha ao copiar" (clipboard denied) |
| **Warning** | Risk banner (persistent). |

### URL & Entry

| `/deposit` | No preselect. |
| `/deposit?coin=BTC` | Pre-fill coin. |
| `/deposit?coin=USDT&network=ERC20` | Pre-fill both when valid. |

### Linked Flows

- **F-DEP-001**, **F-DEP-001-ERR**
- **F-NAV-001**

### Mobile Notes

- **QRCodeDisplay** large touch target; **Copy** sticky near thumb zone.
- **NetworkSelect**: use **BottomSheet** for network list.

---

## SCR-HISTORY — Transaction History

**Route**: `/history`  
**Screen ID**: SCR-HISTORY

### Purpose

Let the user browse past conversions, withdrawals, and deposits with filters and navigate to transaction detail.

### Content Blocks

| Block | Content |
|-------|---------|
| **Header** | "Histórico". |
| **Toolbar** | **FilterBar**: type, period, coin; **ClearFiltersButton** (visible when any filter active). |
| **Filters** | **Select(TransactionType)**: Todos / Conversão / Saque / Depósito; **DateRangeSelect** or presets; **CoinFilter**. |
| **Main area** | **TransactionList** of **TransactionListItem** rows. |
| **Side panels** | Desktop: **FilterSummaryChips** optional. |

### Components

| Component | Behaviors | States | Events |
|-----------|-----------|--------|--------|
| **FilterBar** | Houses all filters; sticky on scroll optional. | Collapsed on mobile → **FilterBottomSheet**. | onChange per control. |
| **TransactionTypeSelect** | Filters list client-side/mock. | — | onChange. |
| **DateRangeSelect** | Presets: 7d, 30d, 90d, Todo o período. | — | onChange. |
| **CoinFilter** | All coins + "Todas". | — | onChange. |
| **ClearFiltersButton** | Resets to defaults. | Hidden if default. | onClick. |
| **TransactionList** | Virtualized list by date sections "Hoje", "Ontem", … | Loading skeleton; empty; error. | Scroll. |
| **TransactionListItem** | Icon by type, title, subtitle (amounts), **StatusBadge**, chevron. | Per-row | Click → `navigate(/history/${txId})`. |
| **StatusBadge** | Cores: Pendente, Confirmada, Falhou. | — | — |

### States

| State | UI |
|-------|-----|
| **Empty** | No transactions ever: **EmptyState** + CTA para `/deposit` or `/convert`. |
| **Loading** | Skeleton list. |
| **Error** | **ErrorStateCard** + Retry. |
| **Success** | Populated list. |
| **Partial** | Filter returns zero rows: **NoResultsFilterState** + "Limpar filtros". |

### Actions

| Type | Control | Disabled when |
|------|---------|---------------|
| **Primary** | **Limpar filtros** (contextual) | No active filters. |
| **Secondary** | Row navigation | — |
| **Destructive** | None | — |

### Modals / Dialogs

- **Modal(FilterAdvanced)** optional if simple filters insufficient — MVP likely not needed.

### Toasts / Banners

- Optional: "Filtros aplicados" — avoid noise; prefer silent update.

### URL & Entry

| `/history` | Default filters. |
| `/history?type=conversion&coin=BTC` | Pre-applied filters; sync when user changes filters (optional query sync). |

### Linked Flows

- **F-HIST-001**, **F-HIST-001-ERR**
- **F-NAV-001**

### Mobile Notes

- **FilterBar** compresses to **IconButton(Filtros)** opening **BottomSheet** with same controls.
- **TransactionListItem**: full row tap; increase vertical padding.

---

## SCR-TX-DETAIL — Transaction Detail

**Route**: `/history/:txId`  
**Screen ID**: SCR-TX-DETAIL

### Purpose

Show full information for a single transaction including status, amounts, fees, and identifiers for support or chain verification.

### Content Blocks

| Block | Content |
|-------|---------|
| **Header** | **BackButton** + title "Detalhe da transação" or dynamic type label. |
| **Toolbar** | Optional **StatusBadge** duplicate. |
| **Filters** | N/A. |
| **Main area** | **TxDetailHero** (type icon, primary amount), **TxDetailRow** list (date, from/to, network, address, txid, fee). |
| **Side panels** | **SupportCard** "Precisa de ajuda?" |

### Components

| Component | Behaviors | States | Events |
|-----------|-----------|--------|--------|
| **BackButton** | history.back or link to `/history`. | — | onClick. |
| **TxDetailHero** | Large amount + fiat + status. | Loading skeleton. | — |
| **TxDetailRow** | Label + value rows; **CopyIcon** on txid/address. | — | Copy toast. |
| **ExplorerLink** (optional) | External link mock disabled or "#". | — | onClick. |
| **StatusTimeline** (optional) | Steps for pending → confirmed. | Pending vs final. | — |

### States

| State | UI |
|-------|-----|
| **Empty** | N/A. |
| **Loading** | Skeleton hero + rows. |
| **Error** | Unknown `txId`: **NotFoundInline** "Transação não encontrada" + link `/history`. |
| **Success** | Full detail. |
| **Partial** | Known tx but missing optional fields: show "—" with tooltip. |

### Actions

| Type | Control | Disabled when |
|------|---------|---------------|
| **Primary** | **Voltar ao histórico** | Never. |
| **Secondary** | **Copiar** per field | Disabled if value empty. |
| **Destructive** | None | — |

### Modals / Dialogs

- None required.

### Toasts / Banners

| Kind | Message |
|------|---------|
| **Success** | "ID copiado!" |
| **Error** | "Não foi possível copiar" |

### URL & Entry

| `/history/:txId` | Direct load; bookmarkable. Invalid ID → error state. |
| Back/forward | Browser history works. |

### Linked Flows

- **F-HIST-002**
- **F-NAV-001**

### Mobile Notes

- **Sticky** bottom **Button(Voltar)** optional duplication of header back.
- Long txid: monospace with horizontal scroll.

---

## SCR-ALERTS — Alerts Management

**Route**: `/alerts`  
**Screen ID**: SCR-ALERTS

### Purpose

List configured price alerts, toggle them on/off, delete them, and open creation UI (modal) for new alerts.

### Content Blocks

| Block | Content |
|-------|---------|
| **Header** | "Alertas"; optional badge for triggered count. |
| **Toolbar** | **PrimaryButton(Criar alerta)** opening SCR-ALERT-CREATE. |
| **Filters** | Optional **Search** by coin ticker. |
| **Main area** | **AlertList** of **AlertListItem** rows. |
| **Side panels** | **ExplainerCard** how alerts work (mock). |

### Components

| Component | Behaviors | States | Events |
|-----------|-----------|--------|--------|
| **PrimaryButton(Criar alerta)** | Opens **Modal(CreateAlert)** or routes hash `#create` — MVP: modal. | Disabled never. | onClick → open modal. |
| **AlertList** | Vertical list. | Empty, loading, error. | — |
| **AlertListItem** | Shows coin, direction, threshold %, **Toggle(enabled)**, **IconButton(Delete)**. | Per-row loading on toggle/delete. | Toggle, Delete. |
| **Toggle** | Enables/disables alert locally/mock. | Animating, error revert. | onChange. |
| **IconButton(Delete)** | Opens **Dialog(ConfirmDeleteAlert)** optional or immediate delete with undo toast. | — | onClick. |
| **EmptyState** | No alerts yet + CTA create. | — | — |

### States

| State | UI |
|-------|-----|
| **Empty** | Empty state + CTA. |
| **Loading** | Skeleton rows. |
| **Error** | Error + Retry. |
| **Success** | List populated. |
| **Partial** | Offline: show cached with banner. |

### Actions

| Type | Control | Disabled when |
|------|---------|---------------|
| **Primary** | **Criar alerta** | — |
| **Secondary** | **Edit** (if added later) | — |
| **Destructive** | **Excluir** | Confirm in dialog; disabled while pending delete. |

### Modals / Dialogs

**Dialog(ConfirmDeleteAlert)** — optional quick pattern:

| Element | Content |
|---------|---------|
| **Title** | "Excluir alerta?" |
| **Body** | Coin + rule summary. |
| **Destructive** | "Excluir" |
| **Secondary** | "Cancelar" |

### Toasts / Banners

| Kind | Message |
|------|---------|
| **Success** | "Alerta removido" / "Alerta desativado" |
| **Error** | "Não foi possível salvar" |

### URL & Entry

| `/alerts` | List view. |
| `/alerts?create=1` | Auto-open create modal when landing. |

### Linked Flows

- **F-ALERT-001**, **F-ALERT-001-ERR**
- **F-ALERT-001-TRIGGER** (badge)
- **F-NAV-001**

### Mobile Notes

- **Criar alerta**: primary CTA fixed bottom or in header overflow menu.
- **Toggle**: ensure thumb-sized switch.

---

## SCR-ALERT-CREATE — Create Alert (modal within `/alerts`)

**Route**: `/alerts` (modal overlay; not a separate path)  
**Screen ID**: SCR-ALERT-CREATE

### Purpose

Configure a new percentage-based price movement alert for a chosen coin with direction and threshold, then save to the list.

### Content Blocks (inside modal)

| Block | Content |
|-------|---------|
| **Header** | **ModalTitle** "Novo alerta"; **CloseButton**. |
| **Toolbar** | N/A. |
| **Main area** | **CoinSelect**, **DirectionSegmented** ("Subiu mais de" / "Caiu mais de"), **PercentInput**, optional **AlertPreview** text. |
| **Footer** | **Button(Cancelar)**, **Button(Salvar)** primary. |

### Components

| Component | Behaviors | States | Events |
|-----------|-----------|--------|--------|
| **Modal(CreateAlert)** | Focus trap; scroll lock body. | Open/closed. | onClose by X, backdrop, Escape. |
| **CoinSelect** | Same supported coins. | Error if duplicate rule. | onSelect. |
| **DirectionSegmented** | Two options. | — | onChange. |
| **PercentInput** | Integer or decimal > 0; max cap e.g. 100. | Invalid, empty. | onChange. |
| **InlineError** | Duplicate alert, invalid %. | Visible on submit or blur. | — |
| **Button(Salvar)** | Validates; calls mock persist; toast; closes modal. | Disabled: invalid, submitting, no coin. | onClick. |
| **Button(Cancelar)** | Closes without save; discards dirty state with **Dialog(Unsaved)** optional if form dirty. | — | onClick. |

### States

| State | UI |
|-------|-----|
| **Empty** | Fresh form defaults (e.g. BTC, subiu, 5%). |
| **Loading** | Submit: primary loading. |
| **Error** | API/mock failure: inline + toast. |
| **Success** | Modal closes; parent list refreshes. |
| **Partial** | — |

### Actions

| Type | Control | Disabled when |
|------|---------|---------------|
| **Primary** | **Salvar** | Invalid %, no coin, duplicate, submitting. |
| **Secondary** | **Cancelar** | Submitting disables both. |
| **Destructive** | None | — |

### Modals / Dialogs

- Self is modal. Optional **Dialog(UnsavedChanges)** on close when dirty.

### Toasts / Banners

| Kind | Message |
|------|---------|
| **Success** | "Alerta criado com sucesso!" |
| **Error** | "Não foi possível criar o alerta" |
| **Warning** | "Alerta similar já existe" |

### URL & Entry

| `/alerts` + modal open | From button; query `?create=1` opens on load. |
| Pre-fill from dashboard | `?create=1&coin=BTC` — preselect coin in modal. |

### Linked Flows

- **F-ALERT-001**, **F-ALERT-001-ERR**

### Mobile Notes

- Modal becomes **full-screen sheet** on small breakpoints.
- **PercentInput**: numeric keyboard `inputMode="decimal"`.

---

## SCR-SETTINGS — Settings

**Route**: `/settings`  
**Screen ID**: SCR-SETTINGS

### Purpose

Let the user adjust display currency, theme, notification preferences related to alerts, and view read-only account info.

### Content Blocks

| Block | Content |
|-------|---------|
| **Header** | "Configurações". |
| **Toolbar** | N/A. |
| **Filters** | N/A. |
| **Main area** | Grouped **SettingsSection**s: Display, Appearance, Notifications, Account. |
| **Side panels** | None. |

### Components

| Component | Behaviors | States | Events |
|-----------|-----------|--------|--------|
| **SettingsSection** | Visual grouping with title. | — | — |
| **FiatCurrencySelect** | Options BRL (default), USD, EUR. | Saving, error. | onChange → persist localStorage + toast. |
| **ThemeToggle** | Dark / Light; immediate apply. | — | onChange. |
| **NotificationToggle(Master)** | Enables price alert toasts/banners globally. | — | onChange. |
| **NotificationToggle(Email)** | Mock disabled or placeholder "Em breve". | Disabled read-only. | — |
| **AccountReadOnlyCard** | Name, email from mock user. | — | — |
| **Button(SignOut)** | Out of MVP / hidden — if present, disabled with tooltip. | — | — |

### States

| State | UI |
|-------|-----|
| **Empty** | N/A. |
| **Loading** | Skeleton sections. |
| **Error** | Failed load settings: retry. |
| **Success** | Interactive controls. |
| **Partial** | Account loads later: show placeholders. |

### Actions

| Type | Control | Disabled when |
|------|---------|---------------|
| **Primary** | Implicit saves on select/toggle | During save conflict (optional). |
| **Secondary** | — | — |
| **Destructive** | None in MVP | — |

### Modals / Dialogs

- Optional **Dialog(ResetSettings)** — not required for MVP.

### Toasts / Banners

| Kind | Message |
|------|---------|
| **Success** | "Preferências salvas" |
| **Error** | "Não foi possível salvar. Tente novamente." |

### URL & Entry

| `/settings` | Direct. |
| `/settings#notifications` | Optional scroll to section. |

### Linked Flows

- **F-SETTINGS-001**
- **F-NAV-001**

### Mobile Notes

- Native-like **list rows** with chevrons for navigation to sub-pages if added later; MVP single page scroll.

---

## SCR-404 — Not Found

**Route**: `/*` (catch-all)  
**Screen ID**: SCR-404

### Purpose

Recover users who hit an unknown URL by explaining the error and offering a clear path home.

### Content Blocks

| Block | Content |
|-------|---------|
| **Header** | Minimal or branded small header without full nav duplication optional. |
| **Toolbar** | None. |
| **Main area** | **ErrorIllustration404**, title "Página não encontrada", explanatory text, **Button(Voltar ao início)**. |
| **Side panels** | None. |

### Components

| Component | Behaviors | States | Events |
|-----------|-----------|--------|--------|
| **ErrorIllustration404** | Decorative. | — | — |
| **Headline** | "Página não encontrada" | — | — |
| **SupportText** | Suggest checking URL. | — | — |
| **Button(Voltar ao início)** | `navigate('/dashboard')`. | — | onClick. |
| **Link(Ver histórico)** | Optional secondary to `/history`. | — | — |

### States

| State | UI |
|-------|-----|
| **Empty/Loading/Partial** | N/A — static page. |
| **Error** | N/A |
| **Success** | Always static content. |

### Actions

| Type | Control | Disabled when |
|------|---------|---------------|
| **Primary** | **Voltar ao início** | Never |
| **Secondary** | Optional links | — |
| **Destructive** | None | — |

### Modals / Dialogs

- None.

### Toasts / Banners

- None on entry.

### URL & Entry

| Any unknown path | Shows 404; **no** query params required. |
| Deep link typo `/dashbord` | Lands here. |

### Linked Flows

- **EC-002**
- **F-NAV-001** (indirect — user uses button to enter app shell)

### Mobile Notes

- Full viewport centered content; **Button** full width; minimal chrome.

---

## Cross-Cutting: Shell, Toasts, and Edge Cases

| ID | Description | UI behavior |
|----|-------------|-------------|
| **EC-003** | Slow load | Skeletons per screen as documented. |
| **EC-004** | Zero balance operations | Disable Convert/Withdraw from coin row or show tooltip on FAB targets with message. |
| **EC-005** | Long coin/history lists | Virtualization or pagination "Carregar mais". |
| **EC-006** | Toast while navigating | Global **ToastRegion** top or bottom; does not block nav. |

---

## Traceability — Screens → Flows (quick index)

| Screen | Primary flows |
|--------|----------------|
| SCR-HOME | F-DASH-001, F-DASH-001-ERR, F-ALERT-001-TRIGGER, F-NAV-001, EC-003, EC-005, EC-006 |
| SCR-EMPTY | F-DASH-001-ERR, EC-001, F-DEP-001 |
| SCR-CONVERT | F-CONV-001, F-CONV-001-ERR, F-NAV-001, EC-004 |
| SCR-WITHDRAW | F-SAQUE-001, F-SAQUE-001-ERR, F-NAV-001, EC-004 |
| SCR-DEPOSIT | F-DEP-001, F-DEP-001-ERR, F-NAV-001 |
| SCR-HISTORY | F-HIST-001, F-HIST-001-ERR, F-NAV-001 |
| SCR-TX-DETAIL | F-HIST-002, F-NAV-001 |
| SCR-ALERTS | F-ALERT-001, F-ALERT-001-ERR, F-ALERT-001-TRIGGER, F-NAV-001 |
| SCR-ALERT-CREATE | F-ALERT-001, F-ALERT-001-ERR |
| SCR-SETTINGS | F-SETTINGS-001, F-NAV-001 |
| SCR-404 | EC-002 |

---

*End of interaction map — Athena (Product Strategist).*
