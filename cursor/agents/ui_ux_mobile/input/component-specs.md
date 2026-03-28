# Component Specifications — Crypto Wallet Dashboard (Desktop)

**Product**: Crypto Wallet Dashboard  
**Stack**: React + shadcn/ui (Radix primitives) + Lucide icons + Tailwind CSS  
**Theme**: **Dark default** — `bg-zinc-950`, cards `bg-zinc-900`, borders `border-zinc-800`, text hierarchy on zinc scale  
**Palette**: Zinc neutrals only; **CTA / primary actions**: amber–orange (`amber-500` / `orange-500` accents); **success**: emerald; **errors**: red  
**Supported coins**: BTC, ETH, BNB, SOL, ADA, USDT, USDC  
**Default display fiat**: BRL (USD/EUR in Settings)

**Screen ID index**: `SCR-HOME`, `SCR-EMPTY`, `SCR-CONVERT`, `SCR-WITHDRAW`, `SCR-DEPOSIT`, `SCR-HISTORY`, `SCR-TX-DETAIL`, `SCR-ALERTS`, `SCR-ALERT-CREATE`, `SCR-SETTINGS`, `SCR-404`  
**Shell**: Navigation components mount on all authenticated routes (collectively **SCR-APP-SHELL**).

---

## Conventions (all CMPs)

| State | Visual / behavior |
|-------|-------------------|
| **Default** | Rest styles per token; focus ring `ring-2 ring-zinc-500` (or amber for primary controls). |
| **Hover** | Slight bg lift (`zinc-800` on interactive zinc-900 surfaces), cursor pointer where applicable. |
| **Active / pressed** | Darker fill or scale `0.98` on buttons. |
| **Disabled** | `opacity-50`, `pointer-events-none`, no focus ring. |
| **Loading** | `Skeleton`, `aria-busy`, spinners on primary actions where specified. |
| **Error** | Inline `text-red-400` + icon; form fields use `aria-invalid`. |

**Events**: `onClick`, `onChange`, `onSubmit`, `onOpenChange` (Radix), `onValueChange`, `onDismiss` as applicable.

---

## Navigation Components

### CMP-Sidebar

**Purpose**: Persistent primary navigation for desktop; routes to dashboard, history, alerts, settings; surfaces quick actions (Convert, Withdraw, Deposit).

**shadcn building blocks**: Custom layout using `ScrollArea` (optional long menus), `Tooltip` (collapsed mode), `Button` (ghost for nav links, outline/secondary for quick actions), `Separator`, `Sheet` not used — sidebar is inline.

**Structure**

| Region | Content |
|--------|---------|
| Brand | Logo / app name; click → `/dashboard` |
| Main nav | Items below with Lucide icons |
| Section label | e.g. "Ações rápidas" |
| Quick actions | Three compact buttons: Convert, Withdraw, Deposit |

**Nav items** (icons Lucide)

| Route | Label (pt) | Icon |
|-------|------------|------|
| `/dashboard` | Painel / Início | `LayoutDashboard` or `Home` |
| `/history` | Histórico | `History` |
| `/alerts` | Alertas | `Bell` (optional **Badge** count for triggered alerts) |
| `/settings` | Configurações | `Settings` |

**Active state**: `bg-zinc-800` + `text-zinc-50` + left `border-l-2 border-amber-500` (or `bg-zinc-800/80` + amber dot); inactive: `text-zinc-400`, hover `text-zinc-200` + `bg-zinc-800/50`.

**Collapse behavior**: Toggle reduces width to icon-only rail (~64px); labels hidden; **Tooltip** on each icon with delay; quick actions collapse to icon buttons; preference `localStorage` key e.g. `sidebar-collapsed`.

**Props / variants**

| Prop | Type | Description |
|------|------|-------------|
| `collapsed` | `boolean` | Controlled collapsed state |
| `defaultCollapsed` | `boolean` | Uncontrolled initial |
| `onCollapsedChange` | `(v: boolean) => void` | Persist preference |

**Events**: `onNavigate(path)`, item click; brand logo click; collapse toggle click.

**Screen IDs**: **SCR-APP-SHELL** (all authenticated screens).

---

### CMP-UserMenu

**Purpose**: Show signed-in identity and account actions (Profile, Settings, Sign out).

**shadcn building blocks**: `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `Avatar`, `AvatarImage`, `AvatarFallback`.

**Structure**

| Element | Spec |
|---------|------|
| **Trigger** | `Avatar` (sm/md) + user display name truncated + `ChevronDown` |
| **Avatar** | Image URL or initials fallback on `zinc-700` bg |
| **Menu items** | Profile → `/settings` (profile section anchor) or profile route; Settings → `/settings`; Sign out → destructive styling `text-red-400 focus:bg-red-950` |

**Props**

| Prop | Type |
|------|------|
| `user` | `{ name: string; email?: string; avatarUrl?: string }` |
| `onSignOut` | `() => void` |
| `onProfileClick` | `() => void` optional |
| `onSettingsClick` | `() => void` optional |

**States**: Default; hover on trigger (subtle ring); open (menu); disabled N/A for trigger unless session loading — then Avatar **Skeleton**.

**Events**: `onOpenChange`, item select, `onSignOut`.

**Screen IDs**: **SCR-APP-SHELL** (header on all authenticated routes).

---

### CMP-Breadcrumbs

**Purpose**: Show hierarchy and enable jump to parent; reduces disorientation on nested views (e.g. transaction detail).

**shadcn building blocks**: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`.

**Pattern**: `[Home or Histórico] > [Current page]`; last segment is **non-link** (`BreadcrumbPage`).

**Separator**: `ChevronRight` Lucide, `text-zinc-600`, `aria-hidden`.

**Linked items**: Prior segments use `BreadcrumbLink` + `asChild` with `Link` from router; `text-zinc-400` hover `text-zinc-200`.

**Props**

| Prop | Type |
|------|------|
| `items` | `{ label: string; href?: string }[]` — last item omit `href` |
| `className` | `string` |

**States**: Link hover/focus; current page no hover.

**Events**: Navigation via router on link click.

**Screen IDs**: **SCR-TX-DETAIL**, optionally **SCR-CONVERT**, **SCR-WITHDRAW**, **SCR-DEPOSIT** (if product shows trail); **CMP-PageHeader** may embed this.

---

## Dashboard Components

### CMP-PortfolioSummaryCard

**Purpose**: Hero metric — total portfolio value in **BRL** and **24h** change (percent + absolute), with trend cue.

**shadcn building blocks**: `Card`, `CardHeader`, `CardTitle`, `CardContent`, `Skeleton`.

**Content**

| Field | Spec |
|-------|------|
| Total value | BRL formatted e.g. `R$ 125.430,88` — `text-2xl`/`text-3xl` semibold |
| 24h change | `%` + absolute BRL delta, e.g. `+2,4% (R$ 3.012,00)` |
| Trend icon | `TrendingUp` emerald if ≥ 0; `TrendingDown` red if negative; neutral `Minus` if exactly 0 |

**Props**

| Prop | Type |
|------|------|
| `totalBrl` | `number` |
| `changePercent24h` | `number` |
| `changeAbsolute24hBrl` | `number` |
| `isLoading` | `boolean` |
| `error` | `Error \| null` — inline retry |

**States**: Loading (skeleton lines for title + value); error (CMP-ErrorState inline variant); success; empty portfolio may hide card or show zeros — align with **SCR-EMPTY**.

**Events**: Optional `onRetry` when error; optional `onClick` (MVP static).

**Screen IDs**: **SCR-HOME**; optionally **SCR-EMPTY** if showing zero summary.

---

### CMP-CoinListTable

**Purpose**: Tabular view of holdings with sort, search, row actions.

**shadcn building blocks**: `Table`, `TableHeader`, `TableRow`, `TableHead`, `TableBody`, `TableCell`, `DropdownMenu` (row actions), `Button`, `Input` (search — may delegate to **CMP-QuickSearchInput**), `Skeleton`.

**Columns**

| Column | Content |
|--------|---------|
| Ativo | Coin icon + full name + ticker (e.g. Bitcoin BTC) |
| Saldo | Crypto amount, sensible decimals |
| Valor (BRL) | Fiat value |
| 24h | Change % (color + **CMP-Badge** or plain text) |
| Ações | **DropdownMenu**: e.g. Converter, Criar alerta |

**Sortable**: `TableHead` with click + `ArrowUpDown`; tri-state: none / asc / desc for Saldo, Valor, 24h.

**Search/filter**: Filter rows by name/ticker via **CMP-QuickSearchInput** in toolbar; optional "Ocultar saldos zero" chip (future).

**Empty state**: **CMP-EmptyState** variant "no coins" or redirect to **SCR-EMPTY** per product.

**Loading skeleton**: **CMP-LoadingSkeleton** table variant (5–8 rows).

**Props**

| Prop | Type |
|------|------|
| `coins` | `CoinRow[]` (see CMP-CoinListItem) |
| `isLoading` | `boolean` |
| `sort` | `{ column; direction }` |
| `onSort` | `(column) => void` |
| `searchQuery` | `string` |
| `onSearchQueryChange` | `(q: string) => void` |

**Events**: Sort change, search change, row action select.

**Screen IDs**: **SCR-HOME**.

---

### CMP-CoinListItem

**Purpose**: Single row representation (used inside table or list).

**shadcn building blocks**: `TableRow` + `TableCell`, or flex row; `DropdownMenu`; coin icon via `Avatar` or `<img>`.

**Structure**: Icon 32px, name `text-zinc-100`, ticker `text-zinc-500` uppercase; balance right-aligned monospace-friendly; BRL value; 24h cell with semantic color.

**Hover state**: `hover:bg-zinc-800/50`, `cursor-pointer` if row navigates.

**Click action**: Primary: `navigate('/convert?from=BTC')` or open quick menu; secondary: actions dropdown stops propagation.

**Props**

| Prop | Type |
|------|------|
| `coin` | `{ id; name; ticker; icon; balance; valueBrl; change24hPct }` |
| `onRowClick` | `() => void` |
| `onAction` | `(action: 'convert' \| 'alert') => void` |

**States**: Default, hover, focus-within (keyboard row focus).

**Events**: `onClick`, `onKeyDown` (Enter/Space on row if interactive).

**Screen IDs**: **SCR-HOME** (inside **CMP-CoinListTable**).

---

### CMP-QuickSearchInput

**Purpose**: Fast filter of coin list with debounced input and clear.

**shadcn building blocks**: `Input`, `Button` (icon ghost for clear).

**Spec**: Leading `Search` Lucide `text-zinc-500`; placeholder **"Buscar moeda..."**; trailing clear `X` when `value.length > 0`.

**Debounce**: 300ms recommended before emitting filter.

**Props**

| Prop | Type |
|------|------|
| `value` | `string` |
| `defaultValue` | `string` |
| `onValueChange` | `(value: string) => void` — debounced upstream or internal |
| `debounceMs` | `number` default 300 |

**States**: Default, focus (ring), disabled.

**Events**: `onChange`, clear button `onClick`.

**Screen IDs**: **SCR-HOME** (toolbar).

---

### CMP-QuickActionCard

**Purpose**: Large tappable card for Convert / Withdraw / Deposit with icon + label; supports F-pattern duplicate of sidebar.

**shadcn building blocks**: `Card`, `CardContent`, hover styles; or `Button` variant ghost stretched.

**Icons**: `ArrowLeftRight` (Convert), `ArrowUpFromLine` (Withdraw), `ArrowDownToLine` (Deposit) — Lucide.

**Hover effect**: `border-zinc-700` → `border-amber-500/50`, `bg-zinc-900` → `bg-zinc-800`, subtle shadow.

**Props**

| Prop | Type |
|------|------|
| `icon` | `LucideIcon` |
| `label` | `string` |
| `href` or `onClick` | navigation |
| `variant` | `'convert' \| 'withdraw' \| 'deposit'` optional accent hint |

**States**: Hover, active, focus-visible.

**Events**: `onClick`, keyboard activation.

**Screen IDs**: **SCR-HOME** (optional right rail / grid below summary).

---

### CMP-PriceAlertBanner

**Purpose**: Prominent highlight when a price alert has triggered; shows coin, move %, dismiss; CTA to alerts or coin.

**shadcn building blocks**: `Alert` (shadcn) with custom amber border, or `Card` with `amber-500/20` bg border; `Button` ghost/secondary; coin icon.

**Content**: Coin icon + headline e.g. "BTC atingiu seu alerta (+5,2% em 24h)"; **Dismiss** (X); optional **Ver alertas** → `/alerts`.

**Props**

| Prop | Type |
|------|------|
| `coin` | `{ ticker; icon; changePct }` |
| `message` | `string` |
| `dismissible` | `boolean` |
| `onDismiss` | `() => void` |
| `onCta` | `() => void` optional |

**States**: Visible; dismissed (unmount, session storage).

**Events**: Dismiss, CTA click.

**Screen IDs**: **SCR-HOME** (conditional); ties to **CMP-AlertNotification** for global toast variant.

---

## Conversion Components

### CMP-ConversionForm

**Purpose**: Full flow UI for swapping source → destination asset with rate and fee visibility.

**shadcn building blocks**: `Card`, `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`, `Button` (primary amber CTA **Confirmar conversão** opening modal).

**Layout**: **CMP-CoinSelector** (from) → **CMP-AmountInput** → central **swap** icon button (swap from/to) → **CMP-CoinSelector** (to) → **CMP-RatePreview** → fee line → submit.

**Props**

| Prop | Type |
|------|------|
| `fromCoin`, `toCoin` | `CoinId` |
| `amount` | `string` |
| `onSubmit` | opens **CMP-ConfirmConversionModal** |

**States**: Idle, validating, submitting, error inline.

**Events**: `onSubmit`, `onSwapCoins` (swap button).

**Screen IDs**: **SCR-CONVERT**.

---

### CMP-CoinSelector

**Purpose**: Choose coin with search, icon, name, ticker, and balance.

**shadcn building blocks**: `Popover` + `Command`, `CommandInput`, `CommandList`, `CommandItem`, `CommandEmpty`, `Button` (trigger showing selected coin).

**Trigger**: Selected coin icon + name + ticker + chevron; balance as subtitle `Saldo: 0,0521 BTC`.

**Dropdown**: Search filters **BTC, ETH, BNB, SOL, ADA, USDT, USDC**; each row: icon, name, ticker, balance.

**Props**

| Prop | Type |
|------|------|
| `value` | `CoinId` |
| `onValueChange` | `(id: CoinId) => void` |
| `balances` | `Record<CoinId, string>` |
| `excludeCoin` | `CoinId` optional (prevent same as other side) |

**States**: Closed, open, searching, empty search.

**Events**: `onValueChange`, combobox keyboard nav.

**Screen IDs**: **SCR-CONVERT**, **CMP-CreateAlertModal**, **CMP-WithdrawalForm**, **CMP-DepositView**.

---

### CMP-AmountInput

**Purpose**: Numeric entry for crypto amount with MAX and validation.

**shadcn building blocks**: `Input` (type text with numeric sanitization or `type="number"` with step), `Button` size sm **Máx.** linking to wallet balance.

**Validation**: Insufficient balance → `FormMessage` red; zero/empty → disable submit; max decimals per coin.

**Props**

| Prop | Type |
|------|------|
| `value` | `string` |
| `onChange` | `(v: string) => void` |
| `maxBalance` | `string` number |
| `coin` | `CoinId` |
| `error` | `string \| null` |

**States**: Default, error, disabled (loading).

**Events**: `onChange`, MAX click.

**Screen IDs**: **SCR-CONVERT**, **SCR-WITHDRAW**.

---

### CMP-RatePreview

**Purpose**: Show live (mock) conversion rate and estimated output.

**shadcn building blocks**: `Card` minimal or inset `div`, `Skeleton` when loading.

**Display**: `1 BTC ≈ 48,2 ETH` (example) + **Você recebe ~** `X,XXXX ETH`.

**Props**

| Prop | Type |
|------|------|
| `fromCoin`, `toCoin` | `CoinId` |
| `rate` | `number` |
| `estimatedOutput` | `string` |
| `isLoading` | `boolean` |
| `error` | `boolean` |

**States**: Loading, success, error (show **CMP-ErrorState** inline mini).

**Events**: None or refresh icon `onRefresh`.

**Screen IDs**: **SCR-CONVERT**.

---

### CMP-ConfirmConversionModal

**Purpose**: Confirm conversion before execution; summary of from/to/rate/fee.

**shadcn building blocks**: `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogFooter`, `DialogDescription`, `Button` (outline cancel, primary confirm).

**Summary rows**: De / Para / Taxa / Taxa de rede (fee) / Total estimado.

**Props**

| Prop | Type |
|------|------|
| `open` | `boolean` |
| `onOpenChange` | `(o: boolean) => void` |
| `summary` | `{ from; to; amountIn; amountOut; rate; fee }` |
| `onConfirm` | `() => Promise<void>` |
| `isSubmitting` | `boolean` |

**States**: Open, confirming (loading on primary), error toast on failure.

**Events**: Confirm, Cancel, overlay/Escape.

**Screen IDs**: **SCR-CONVERT** (modal overlay).

---

## Withdrawal Components

### CMP-WithdrawalForm

**Purpose**: Withdraw crypto or fiat per method toggle; collect amount, destination, network when crypto.

**shadcn building blocks**: `Form`, `Tabs` or custom **CMP-MethodToggle**, `Card`, `Button`.

**Fields**: **CMP-CoinSelector**, **CMP-AmountInput**, **CMP-MethodToggle**, conditional **CMP-AddressInput** + **CMP-NetworkSelector** (crypto) or **CMP-BankFields** (fiat), fee display, submit → **CMP-ConfirmWithdrawalModal**.

**Props**

| Prop | Type |
|------|------|
| `method` | `'crypto' \| 'fiat'` |
| `onMethodChange` | `(m) => void` |
| `onSubmit` | `() => void` |

**States**: Validating per field, global error.

**Events**: `onSubmit`, field changes.

**Screen IDs**: **SCR-WITHDRAW**.

---

### CMP-MethodToggle

**Purpose**: Switch between **Crypto** and **Fiat** withdrawal.

**shadcn building blocks**: `ToggleGroup` (`type="single"`) styled as segmented control, or two `Button`s in a `div` with shared border.

**Labels**: "Cripto" | "Fiat" (or "Transferência bancária").

**Props**: `value`, `onValueChange`, `disabled`.

**States**: One segment active (amber bg), inactive zinc.

**Events**: `onValueChange`.

**Screen IDs**: **SCR-WITHDRAW**.

---

### CMP-AddressInput

**Purpose**: Paste-friendly blockchain address with validation.

**shadcn building blocks**: `Input`, `Button` icon `ClipboardPaste`, `FormMessage`.

**Paste button**: Reads clipboard, trims, sets value; `aria-label="Colar endereço"`.

**Validation**: Non-empty, basic length/checksum per network (product-dependent); error message red.

**Props**

| Prop | Type |
|------|------|
| `value` | `string` |
| `onChange` | `(v: string) => void` |
| `network` | `string` optional hint |
| `error` | `string \| null` |

**States**: Default, error, disabled.

**Events**: `onPaste` from button, input `onChange`.

**Screen IDs**: **SCR-WITHDRAW** (crypto path).

---

### CMP-BankFields

**Purpose**: Brazilian bank withdrawal fields (fiat).

**shadcn building blocks**: `FormField`, `Input`, `Label`, `Select` (bank list if mocked).

**Fields**: Banco (name or select), Agência, Conta (com dígito); optional PIX key field if scope adds.

**Props**: grouped `values` + `onChange` per field; `errors` map.

**States**: Per-field error.

**Events**: `onChange`, `onBlur` validation.

**Screen IDs**: **SCR-WITHDRAW** (fiat path).

---

### CMP-NetworkSelector

**Purpose**: Pick blockchain network (e.g. ERC-20, BEP-20) for crypto withdrawal.

**shadcn building blocks**: `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`.

**Props**

| Prop | Type |
|------|------|
| `value` | `string` |
| `networks` | `{ id; label; feeHint }[]` |
| `onValueChange` | `(id: string) => void` |

**States**: Default, disabled until coin selected.

**Events**: `onValueChange`.

**Screen IDs**: **SCR-WITHDRAW**, **CMP-DepositView**.

---

### CMP-ConfirmWithdrawalModal

**Purpose**: Final confirmation for withdrawal.

**shadcn building blocks**: Same pattern as **CMP-ConfirmConversionModal** (`Dialog`).

**Summary**: Coin, amount, method, destination (masked address or bank), fee, ETA text (mock).

**Props**: `open`, `onOpenChange`, `summary`, `onConfirm`, `isSubmitting`.

**Events**: Confirm, Cancel.

**Screen IDs**: **SCR-WITHDRAW**.

---

## Deposit Components

### CMP-DepositView

**Purpose**: Show deposit instructions: coin, network, address, QR, warnings.

**shadcn building blocks**: `Card`, `Alert` (warning **CMP** inline), `Select` for coin/network.

**Flow**: **CMP-CoinSelector** (deposit-enabled networks) → **CMP-NetworkSelector** → **CMP-QRCodeDisplay** → **CMP-CopyAddressButton** → warning banner "Envie apenas BTC pela rede Bitcoin…".

**Props**

| Prop | Type |
|------|------|
| `coin` | `CoinId` |
| `network` | `string` |
| `address` | `string` |
| `onCoinChange`, `onNetworkChange` | handlers |

**States**: Loading address; error fetch.

**Events**: Selectors change, copy.

**Screen IDs**: **SCR-DEPOSIT**.

---

### CMP-QRCodeDisplay

**Purpose**: Visual QR for address scanning.

**shadcn building blocks**: `Card` wrapper; QR via `qrcode.react` or image — design spec: centered, min 160px, `bg-white` padding for contrast on dark page.

**Below QR**: Truncated monospace address with middle ellipsis.

**Props**

| Prop | Type |
|------|------|
| `address` | `string` |
| `size` | `number` |

**States**: Loading placeholder **Skeleton** square.

**Events**: None (non-interactive).

**Screen IDs**: **SCR-DEPOSIT**.

---

### CMP-CopyAddressButton

**Purpose**: One-click copy deposit address; feedback via toast.

**shadcn building blocks**: `Button` variant outline, `Copy` icon; triggers **CMP-Toast** success.

**Copy**: `navigator.clipboard.writeText`; toast **"Copiado!"** emerald variant, 2–3s.

**Props**

| Prop | Type |
|------|------|
| `address` | `string` |
| `onCopy` | `() => void` optional analytics |

**States**: Idle; brief success (can rely on toast only).

**Events**: `onClick` → copy.

**Screen IDs**: **SCR-DEPOSIT**.

---

## History Components

### CMP-TransactionTable

**Purpose**: Sortable/filterable list of transactions.

**shadcn building blocks**: `Table`, `DropdownMenu` or **CMP-TransactionFilters** above, `Skeleton`.

**Columns**

| Column | Content |
|--------|---------|
| Tipo | **CMP-Badge** + icon (Convert / Withdraw / Deposit) |
| Moeda(s) | Icon + ticker or pair |
| Valor | Amount + BRL |
| Data | Locale `pt-BR` datetime |
| Status | **CMP-Badge** success/pending/error |

**Sortable**: Data, Valor, Tipo (optional).

**Filterable**: Via **CMP-TransactionFilters**.

**Props**

| Prop | Type |
|------|------|
| `transactions` | `TxRow[]` |
| `isLoading` | `boolean` |
| `sort`, `onSort` | same pattern as coin table |
| `filters` | from parent |

**Events**: Row click → detail.

**Screen IDs**: **SCR-HISTORY**.

---

### CMP-TransactionFilters

**Purpose**: Narrow history by type, period, coin.

**shadcn building blocks**: `Select` ×3 or `Popover` + `Calendar` for period, `ToggleGroup` for type.

**Type filter**: All | Convert | Withdraw | Deposit.

**Period**: e.g. 7d, 30d, 90d, Custom (date range).

**Coin**: All | BTC | ETH | … (supported list).

**Props**

| Prop | Type |
|------|------|
| `type` | `string` |
| `period` | `string` |
| `coin` | `CoinId \| 'all'` |
| `onChange` | `(filters) => void` |

**States**: Default; calendar open.

**Events**: Each filter `onValueChange`.

**Screen IDs**: **SCR-HISTORY**.

---

### CMP-TransactionRow

**Purpose**: One transaction row; navigates to detail.

**shadcn building blocks**: `TableRow`, icons, **CMP-Badge**.

**Click**: `navigate('/history/:txId')`.

**Props**

| Prop | Type |
|------|------|
| `tx` | `{ id; type; coin; amount; date; status }` |
| `onClick` | `() => void` |

**States**: Hover `bg-zinc-800/50`.

**Events**: Row click, keyboard Enter.

**Screen IDs**: **SCR-HISTORY** (inside table).

---

### CMP-TransactionDetail

**Purpose**: Full transaction record; all fields; back navigation.

**shadcn building blocks**: `Card`, `Button` (ghost + `ArrowLeft` **Voltar**), `Separator`, definition list layout.

**Fields**: Type, ID, coins, amounts BRL/crypto, fees, status, timestamps, tx hash (crypto), explorer link (mock).

**Props**

| Prop | Type |
|------|------|
| `transaction` | detailed object |
| `onBack` | `() => void` |

**States**: Loading **Skeleton**; error **CMP-ErrorState**; success.

**Events**: Back button, explorer link.

**Screen IDs**: **SCR-TX-DETAIL**.

---

## Alert Components

### CMP-AlertList

**Purpose**: Manage list of price alerts with toggles and delete.

**shadcn building blocks**: `ScrollArea`, stack of **CMP-AlertItem**, empty **CMP-EmptyState**.

**Props**

| Prop | Type |
|------|------|
| `alerts` | `AlertDef[]` |
| `onToggle` | `(id, active) => void` |
| `onDelete` | `(id) => void` |

**Screen IDs**: **SCR-ALERTS**.

---

### CMP-AlertItem

**Purpose**: Single alert row — coin, direction, threshold %, enable switch, delete.

**shadcn building blocks**: `Card` row or `div` flex; `Switch`; `Button` ghost destructive (Trash2).

**Display**: Coin icon + name; "Acima de +5%" or "Abaixo de -3%" with **CMP-Badge** info/warning.

**Props**

| Prop | Type |
|------|------|
| `alert` | `{ id; coinId; direction: 'up' \| 'down'; percent; enabled }` |
| `onToggle` | `(enabled: boolean) => void` |
| `onDelete` | `() => void` |

**States**: Switch on/off; deleting loading.

**Events**: Toggle, delete confirm (optional **AlertDialog**).

**Screen IDs**: **SCR-ALERTS**.

---

### CMP-CreateAlertModal

**Purpose**: Create new alert — coin, direction, percentage.

**shadcn building blocks**: `Dialog`, `Form`, `Select` or **CMP-CoinSelector** (simplified), radio **ToggleGroup** Up/Down, `Input` number for %, **Salvar** / **Cancelar**.

**Props**

| Prop | Type |
|------|------|
| `open` | `boolean` |
| `onOpenChange` | `(o: boolean) => void` |
| `onSave` | `(data) => Promise<void>` |

**States**: Submitting, validation error.

**Events**: Save, cancel.

**Screen IDs**: **SCR-ALERT-CREATE** (modal on `/alerts`).

---

### CMP-AlertNotification

**Purpose**: Ephemeral feedback when market hits alert — toast or top **Alert** banner.

**shadcn building blocks**: **CMP-Toast** (amber/warning) or `Alert` full width.

**Content**: Coin icon + "BTC subiu 5% — alerta disparado".

**Props**

| Prop | Type |
|------|------|
| `title` | `string` |
| `description` | `string` |
| `onAction` | `() => void` |
| `onDismiss` | `() => void` |

**Screen IDs**: **SCR-HOME**, **SCR-ALERTS**, global (**SCR-APP-SHELL**).

---

## Settings Components

### CMP-SettingsForm

**Purpose**: Group settings: currency, theme, notifications, account.

**shadcn building blocks**: `Card` × sections, `Separator`, `Form`, `FormDescription`.

**Sections**

1. **Moeda de exibição** — **CMP-CurrencySelector**
2. **Aparência** — **CMP-ThemeToggle**
3. **Notificações** — **CMP-NotificationToggles**
4. **Conta** — email read-only, optional change password (out of scope placeholder)

**Props**: aggregated values + `onChange` per section; `onSave` if using explicit save (or auto-save per control).

**Events**: Per-field change.

**Screen IDs**: **SCR-SETTINGS**.

---

### CMP-CurrencySelector

**Purpose**: Display fiat for portfolio — **BRL** (default), **USD**, **EUR**.

**shadcn building blocks**: `Select`, `SelectItem` for each code.

**Props**

| Prop | Type |
|------|------|
| `value` | `'BRL' \| 'USD' \| 'EUR'` |
| `onValueChange` | `(v) => void` |

**States**: Disabled during global load.

**Events**: `onValueChange`.

**Screen IDs**: **SCR-SETTINGS**; may affect labels **SCR-HOME** portfolio formatting when changed.

---

### CMP-ThemeToggle

**Purpose**: Switch **Dark** / **Light** (product default dark; light optional for accessibility).

**shadcn building blocks**: `Switch` + labels, or `ToggleGroup`.

**Labels**: "Escuro" | "Claro".

**Props**

| Prop | Type |
|------|------|
| `theme` | `'dark' \| 'light'` |
| `onThemeChange` | `(t) => void` |

**Note**: This spec targets **dark** zinc-950; light theme tokens should be defined separately if enabled.

**Screen IDs**: **SCR-SETTINGS**.

---

### CMP-NotificationToggles

**Purpose**: Enable/disable email/push/in-app per category.

**shadcn building blocks**: `Switch` + `Label` rows.

**Types** (example): Alertas de preço, Transações, Marketing (optional).

**Props**

| Prop | Type |
|------|------|
| `settings` | `Record<NotificationKey, boolean>` |
| `onChange` | `(key, value) => void` |

**Events**: Each `onCheckedChange`.

**Screen IDs**: **SCR-SETTINGS**.

---

## Shared Components

### CMP-Badge

**Purpose**: Compact status and delta indicators.

**shadcn building blocks**: `Badge` + `badgeVariants` (custom extended).

**Variants**

| Variant | Use | Classes (indicative) |
|---------|-----|----------------------|
| `default` | Neutral meta | `bg-zinc-800 text-zinc-300` |
| `success` | Positive change, completed | `bg-emerald-950 text-emerald-400 border-emerald-800` |
| `error` | Negative change, failed | `bg-red-950 text-red-400 border-red-900` |
| `warning` | Pending, caution | `bg-amber-950 text-amber-400 border-amber-800` |
| `info` | Informational | `bg-zinc-800 text-zinc-200 border-zinc-700` |

**Props**: `variant`, `children`, `className`.

**States**: N/A (static).

**Events**: None unless wrapped as button.

**Screen IDs**: All data screens (tables, lists, alerts).

---

### CMP-Toast

**Purpose**: Global ephemeral notifications.

**shadcn building blocks**: `Toaster` + `toast()` from `sonner` **or** shadcn `Toast`, `ToastTitle`, `ToastDescription`, `ToastAction`.

**Variants**

| Type | Style |
|------|--------|
| Success | Emerald accent |
| Error | Red |
| Warning | Amber |
| Info | Zinc/blue-gray |

**Behavior**: Auto-dismiss **4s**; close button; stack multiple.

**Props**: Via toast API — `title`, `description`, `duration` default 4000.

**Events**: Dismiss, action click.

**Screen IDs**: **SCR-APP-SHELL** (portal); triggered from copy, form success/error, etc.

---

### CMP-EmptyState

**Purpose**: Friendly empty views per feature.

**shadcn building blocks**: `Card` or centered block, `Button` CTA.

**Variants**

| Variant | Screen | Content hint |
|---------|--------|--------------|
| `no-coins` | **SCR-EMPTY** | "Nenhuma moeda ainda" + CTA Depositar |
| `no-transactions` | **SCR-HISTORY** | "Nenhuma movimentação" |
| `no-alerts` | **SCR-ALERTS** | "Crie seu primeiro alerta" |

**Props**

| Prop | Type |
|------|------|
| `icon` | Lucide |
| `title` | `string` |
| `description` | `string` |
| `actionLabel` | `string` |
| `onAction` | `() => void` |

**Screen IDs**: **SCR-EMPTY**, **SCR-HISTORY**, **SCR-ALERTS**.

---

### CMP-LoadingSkeleton

**Purpose**: Perceived performance for lists and cards.

**shadcn building blocks**: `Skeleton`.

**Variants**

| Variant | Use |
|---------|-----|
| `table-rows` | **CMP-CoinListTable**, **CMP-TransactionTable** — 6–8 rows of rectangle cells |
| `dashboard-cards` | **CMP-PortfolioSummaryCard** + 3 **CMP-QuickActionCard** placeholders |

**Props**: `variant`, `rowCount`.

**Screen IDs**: Any screen with async data.

---

### CMP-ErrorState

**Purpose**: Recoverable error with retry.

**shadcn building blocks**: `Card`, `Button` primary amber, `AlertCircle` Lucide.

**Content**: Icon + message + **"Tentar novamente"**.

**Props**

| Prop | Type |
|------|------|
| `title` | `string` |
| `message` | `string` |
| `onRetry` | `() => void` |
| `retryLabel` | default **"Tentar novamente"** |

**States**: Loading retry (button loading).

**Events**: Retry click.

**Screen IDs**: **SCR-HOME**, **SCR-HISTORY**, **SCR-ALERTS**, **SCR-SETTINGS**, **SCR-CONVERT**, **SCR-WITHDRAW**, **SCR-DEPOSIT**, **SCR-TX-DETAIL**.

---

### CMP-PageHeader

**Purpose**: Consistent page title area with optional breadcrumbs and actions.

**shadcn building blocks**: `h1`/`Typography`, flex row, **CMP-Breadcrumbs**, `Button` group.

**Props**

| Prop | Type |
|------|------|
| `title` | `string` |
| `description` | `string` optional |
| `breadcrumbs` | `BreadcrumbItem[]` optional — delegates to **CMP-Breadcrumbs** |
| `actions` | `ReactNode` — primary/secondary buttons |

**States**: Static.

**Events**: Action button clicks.

**Screen IDs**: **SCR-HOME**, **SCR-CONVERT**, **SCR-WITHDRAW**, **SCR-DEPOSIT**, **SCR-HISTORY**, **SCR-TX-DETAIL**, **SCR-ALERTS**, **SCR-SETTINGS**, **SCR-404**.

---

## Component → Screen matrix (quick reference)

| Component | Screen IDs |
|-----------|------------|
| CMP-Sidebar, CMP-UserMenu | SCR-APP-SHELL |
| CMP-Breadcrumbs | SCR-TX-DETAIL, optional flow screens, via CMP-PageHeader |
| CMP-PortfolioSummaryCard, CMP-CoinListTable, CMP-CoinListItem, CMP-QuickSearchInput, CMP-QuickActionCard, CMP-PriceAlertBanner | SCR-HOME, SCR-EMPTY (partial) |
| CMP-ConversionForm, CMP-CoinSelector, CMP-AmountInput, CMP-RatePreview, CMP-ConfirmConversionModal | SCR-CONVERT |
| CMP-WithdrawalForm, CMP-MethodToggle, CMP-AddressInput, CMP-BankFields, CMP-NetworkSelector, CMP-ConfirmWithdrawalModal | SCR-WITHDRAW |
| CMP-DepositView, CMP-QRCodeDisplay, CMP-CopyAddressButton | SCR-DEPOSIT |
| CMP-TransactionTable, CMP-TransactionFilters, CMP-TransactionRow | SCR-HISTORY |
| CMP-TransactionDetail | SCR-TX-DETAIL |
| CMP-AlertList, CMP-AlertItem | SCR-ALERTS |
| CMP-CreateAlertModal | SCR-ALERT-CREATE |
| CMP-AlertNotification | SCR-HOME, SCR-ALERTS, SCR-APP-SHELL |
| CMP-SettingsForm, CMP-CurrencySelector, CMP-ThemeToggle, CMP-NotificationToggles | SCR-SETTINGS |
| CMP-Badge, CMP-Toast, CMP-EmptyState, CMP-LoadingSkeleton, CMP-ErrorState, CMP-PageHeader | Cross-cutting (see sections) |

---

*End of component specifications — Apollo (Desktop UI/UX), Crypto Wallet Dashboard.*
