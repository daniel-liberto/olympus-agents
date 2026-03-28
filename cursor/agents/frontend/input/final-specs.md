# Crypto Wallet Dashboard — Final Implementation Specs (Poseidon)

**Audience:** Frontend implementer (Poseidon)  
**Product:** Crypto Wallet Dashboard (dark-first)  
**Stack:** React · Vite · TypeScript · Tailwind CSS · shadcn/ui · Lucide React  

**Theme (non-negotiable):**

- **Canvas:** `bg-zinc-950`, primary text `text-zinc-200` / headings toward `text-zinc-50` where emphasis is needed.
- **CTAs / primary actions:** Amber (`amber-500` fills, `text-zinc-950` on solid buttons via shadcn `default` mapped to primary).
- **Success:** Emerald (`emerald-500`, muted surfaces `emerald-500/10`).
- **Errors:** Red (`red-500`, muted `red-500/10`).

**Neutrals:** Use **zinc** only (never `gray`), per design system.

---

## 0. Conventions

### 0.1 Pattern IDs

All layout and repeat UI is defined **once** below as **PAT-***. Screens **reference patterns by ID** instead of duplicating class strings in prose.

### 0.2 Responsive breakpoints

- **Mobile:** `< lg` (default Tailwind `lg:` = 1024px).
- **Desktop:** `lg` and up — **PAT-SIDEBAR** visible; **PAT-BOTTOMNAV** hidden.
- **Mobile:** **PAT-BOTTOMNAV** visible; sidebar hidden (drawer optional later; v1: bottom nav only).

### 0.3 Currency & formatting

- **Display currency** comes from **SCR-SETTINGS** (`localStorage`); default **BRL**.
- Amounts: locale string with symbol (e.g. `R$ 1.234,56`). Percentages: `+0,00%` / `-0,00%` with sign-colored badge on dashboard.
- **Coin amounts:** show sensible precision (e.g. 8 decimals max, trim trailing zeros) — implementation detail; always pair with ticker.

### 0.4 Routing (React Router v6 assumed)

| Route | Screen ID |
|-------|-----------|
| `/dashboard` | SCR-HOME / SCR-EMPTY |
| `/convert` | SCR-CONVERT |
| `/withdraw` | SCR-WITHDRAW |
| `/deposit` | SCR-DEPOSIT |
| `/history` | SCR-HISTORY |
| `/history/:txId` | SCR-TX-DETAIL |
| `/alerts` | SCR-ALERTS |
| `/settings` | SCR-SETTINGS |
| `*` (fallback) | SCR-404 |

**Note:** SCR-ALERT-CREATE is **not** a route — it is a **Dialog** (desktop) / **Sheet** (mobile) triggered from SCR-ALERTS.

### 0.5 shadcn components to use

`Button`, `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `Input`, `Label`, `Select`, `DropdownMenu`, `Dialog`, `Sheet`, `Skeleton`, `Switch`, `Tabs` or custom toggle for method, `Table`, `Badge`, `Separator`, `Toast` (sonner or shadcn toast), `Avatar`, `Breadcrumb`, `ScrollArea` (optional for long lists).

---

## 1. Global Patterns (define once)

### PAT-SHELL — App shell

**Root wrapper (all authenticated routes + 404):**

- `min-h-screen bg-zinc-950 text-zinc-200 flex`

**Desktop (`lg+`):**

- **Sidebar column:** apply **PAT-SIDEBAR**.
- **Main:** `flex-1 flex flex-col min-w-0` → inner scroll: `flex-1 overflow-auto`.
- **Content container:** `max-w-7xl mx-auto w-full p-6 space-y-6`.

**Mobile (`<lg`):**

- No sidebar column.
- **Main:** `flex-1 overflow-auto`.
- **Content:** `p-4 space-y-4 pb-20` (bottom padding reserves **PAT-BOTTOMNAV** height).

**Z-index:** Bottom nav `z-40`; dialogs/sheets/toasts per shadcn defaults (ensure toasts above nav).

---

### PAT-SIDEBAR — Sidebar (desktop ≥ `lg`)

**Container:** `hidden lg:flex w-64 shrink-0 bg-zinc-900 border-r border-zinc-800 flex-col`

**Header — brand**

- Padding: `p-6`
- Row: icon (e.g. `Wallet` or `LayoutDashboard`) + wordmark **"Crypto Dashboard"**
- Classes: `flex items-center gap-2 text-zinc-100 font-semibold text-lg`

**Nav — primary (4 items)**

Use `react-router-dom` `NavLink` or `Link` + active styles.

| Label | Lucide | `to` |
|-------|--------|------|
| Dashboard | `LayoutDashboard` | `/dashboard` |
| Histórico | `Clock` | `/history` |
| Alertas | `Bell` | `/alerts` |
| Configurações | `Settings` | `/settings` |

- **Item base:** `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-r-md transition-colors`
- **Active:** `bg-zinc-800/50 text-zinc-100 border-l-2 border-amber-500`
- **Inactive:** `text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/30 border-l-2 border-transparent`

**Section — "Ações rápidas"**

- Label: `px-4 pt-6 pb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500`
- Three compact buttons or links (same amber hover as nav if desired):

| Label | Icon | Action |
|-------|------|--------|
| Converter | `ArrowLeftRight` | `navigate('/convert')` |
| Sacar | `ArrowUpFromLine` | `navigate('/withdraw')` |
| Depositar | `ArrowDownToLine` | `navigate('/deposit')` |

- Suggested: `Button variant="ghost"` or styled links, `w-full justify-start gap-2`, icons `size-4`.

**Footer — user**

- `mt-auto border-t border-zinc-800 p-4`
- Row: `Avatar` + column (name `text-sm font-medium text-zinc-100`, email `text-xs text-zinc-500 truncate`)
- **DropdownMenu** trigger: chevron or "⋯" on the row
  - Items: **Perfil** → `/settings` (or future profile route), **Sair** → logout handler

---

### PAT-BOTTOMNAV — Bottom navigation (mobile `<lg`)

**Container:** `lg:hidden fixed bottom-0 left-0 right-0 z-40 h-14 bg-zinc-900 border-t border-zinc-800 flex items-center justify-around safe-area-pb` (add iOS safe area if using env padding)

**Four items** — icon + short label stack:

| # | Label | Icon | `to` |
|---|--------|------|------|
| 1 | Início | `LayoutDashboard` | `/dashboard` |
| 2 | Histórico | `Clock` | `/history` |
| 3 | Alertas | `Bell` | `/alerts` |
| 4 | Ajustes | `Settings` | `/settings` |

- **Active route:** `text-amber-500` (icon + label)
- **Inactive:** `text-zinc-500`
- Touch target: min ~44px height via padding on each link.

---

### PAT-CARD — Card pattern

Apply to shadcn `Card`:

- **Root:** `bg-zinc-900 border-zinc-800 rounded-xl shadow-sm`

**CardHeader**

- Desktop: `p-6`
- Mobile: `p-4`

**CardContent**

- Desktop: `px-6 pb-6` (if no footer; if header already has title, omit duplicate top padding via `pt-0` on content)
- Mobile: `px-4 pb-4`

**Titles:** `text-zinc-100`; descriptions `text-zinc-400 text-sm`.

---

### PAT-TABLE — Table pattern

**Desktop (`lg+`):** `<Table>` inside `Card` or bare `overflow-hidden rounded-xl border border-zinc-800`.

- **Header row:** `bg-zinc-900/50 text-zinc-400 text-sm font-medium`
- **Body row:** `border-b border-zinc-800 last:border-0 hover:bg-zinc-800/30 transition-colors`
- **Cell:** `py-3 px-4 align-middle text-sm text-zinc-200`

**Mobile (`<lg`):** **Do not** render `<Table>`. Render a **vertical card list** (stack of **PAT-CARD** mini rows or `div` with `border-b border-zinc-800`).

---

### PAT-FORM — Form pattern

- **Label:** `text-sm font-medium text-zinc-200`
- **Input / Select trigger:** `bg-zinc-900 border-zinc-800 text-zinc-200 rounded-lg focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-0 focus-visible:border-amber-500`
- **Helper / error:** Error line `text-red-500 text-sm mt-1`; success helper can use `text-emerald-500 text-sm mt-1` if needed
- **Primary submit:** `Button` with default (amber) variant
- **Mobile long forms:** sticky footer bar `fixed bottom-14 left-0 right-0 p-4 bg-zinc-950/95 border-t border-zinc-800 backdrop-blur lg:static lg:border-0 lg:bg-transparent lg:p-0` — submit full width; **account for PAT-BOTTOMNAV** (`bottom-14` or use padding composition)

---

### PAT-BADGE — Badge variants

Map to shadcn `Badge` + classes:

| Variant | Classes |
|---------|---------|
| Default | `bg-zinc-800 text-zinc-300 hover:bg-zinc-800` |
| Success | `bg-emerald-500/10 text-emerald-500 border-0` |
| Warning | `bg-amber-500/10 text-amber-500 border-0` |
| Destructive | `bg-red-500/10 text-red-500 border-0` |

---

### PAT-DIALOG — Dialog / Sheet

- **Desktop (`lg+`):** `Dialog`, `DialogContent` `max-w-md` or `max-w-lg` depending on form complexity; `bg-zinc-900 border-zinc-800 text-zinc-200`
- **Mobile (`<lg`):** `Sheet` side `bottom` (Vaul), full width, rounded top `rounded-t-xl`, drag handle optional

---

### PAT-TOAST — Toasts

Configure toast system (e.g. sonner):

| Kind | Icon (Lucide) | Duration | Behavior |
|------|----------------|----------|----------|
| Success | `CheckCircle2` (emerald) | 4s | auto dismiss |
| Error | `XCircle` or `AlertCircle` (red) | **persistent** until user dismisses | |
| Warning | `AlertTriangle` (amber) | 6s | auto dismiss |

**Styling:** dark surface consistent with `bg-zinc-900 border border-zinc-800 text-zinc-200`.

---

## 2. Shared components (implementation contract)

### 2.1 CoinSelector

- **Props:** `value: CoinId | null`, `onChange`, `coins: { id, name, ticker, iconUrl }[]`, `disabled?`, `label?`
- **UI:** Popover + command list or Select; show **icon** (fallback: circle with ticker initials) + **name** + **ticker** in row.
- **Empty coins:** disabled with helper text.

### 2.2 AmountInput

- **Props:** `value: string` (controlled), `onChange`, `symbol?`, `max?` (for MAX), `error?: string`
- **Right adornment:** **MAX** `Button variant="ghost" size="sm"` — sets amount to available balance.
- **Validation messaging:** PAT-FORM error line.

### 2.3 FeeDisplay / RatePreview

- Read-only rows: label left, value right `text-zinc-100 font-medium`.
- Fee: show in display currency + optional crypto equivalent.

### 2.4 MethodToggle (Crypto / Fiat)

- Two segments: `Tabs` or `ToggleGroup` — labels **Crypto** | **Fiat** (or Portuguese copy if product uses PT everywhere: **Cripto** | **Fiat**).
- Drives visibility of address vs bank fields on SCR-WITHDRAW.

### 2.5 FilterBar (desktop) / FilterChips (mobile)

- **Desktop:** horizontal row in **PAT-CARD** header: `Select` for type, period, coin + optional "Aplicar".
- **Mobile:** scrollable row of `Badge` or toggle chips for quick filters.

### 2.6 StatusBadge (transaction)

| Status | PAT-BADGE |
|--------|-----------|
| Concluída / Confirmada | Success |
| Pendente | Warning |
| Falhou | Destructive |

Use Portuguese labels consistent with API.

### 2.7 Skeleton presets

- **Stat card:** `Skeleton` rectangle `h-24` full width inside **PAT-CARD**.
- **Table row:** 5 columns of `Skeleton` `h-4` in a row `py-3`.

---

## 3. Per-screen specs (all 11)

---

### SCR-HOME — Dashboard (`/dashboard`)

**Layout:** **PAT-SHELL** + **PAT-SIDEBAR** / **PAT-BOTTOMNAV**.

**Sections (top → bottom):**

1. **Page title row**  
   - `h1` "Painel" or "Dashboard" — `text-2xl font-semibold text-zinc-100`  
   - Optional subtitle `text-zinc-400 text-sm`

2. **Stats row** — responsive grid: `grid gap-4 md:grid-cols-3`

   | Card | Content | Notes |
   |------|---------|--------|
   | A | **Total Portfolio** | Value in **BRL** (or selected display currency) — large `text-2xl font-bold text-zinc-50` |
   | B | **Variação 24h** | Percent **PAT-BADGE** Success/Destructive + sign |
   | C | **Total de ativos** | Integer count |

   Each stat wrapped in **PAT-CARD**; label `text-zinc-400 text-sm`, value prominent.

3. **Search**  
   - `relative` wrapper; `Search` icon `absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 size-4`  
   - `Input pl-9` placeholder **"Buscar moeda..."**  
   - Filters coin list client-side by name/ticker.

4. **Coin list**

   - **Desktop:** **PAT-TABLE** inside **PAT-CARD**  
   - **Columns:**

     | Column | Content |
     |--------|---------|
     | Moeda | Icon + name + ticker (`text-zinc-100`, ticker `text-zinc-500 text-xs`) |
     | Saldo | Crypto amount |
     | Valor | Fiat value (display currency) |
     | 24h | **PAT-BADGE** Success (positive) / Destructive (negative) |
     | Ações | **DropdownMenu**: Converter → `/convert?from=TICKER`, Sacar → `/withdraw?coin=TICKER`, Criar alerta → open **SCR-ALERT-CREATE** with coin prefilled |

   - **Mobile:** card list — each row is **PAT-CARD** or inset `div` with same fields stacked; actions **DropdownMenu** `align="end"`.

5. **Quick actions**

   - **Desktop:** row of three `Button variant="default"` (amber): **Converter**, **Sacar**, **Depositar** — navigate to `/convert`, `/withdraw`, `/deposit`.
   - **Mobile:** **FAB** `fixed bottom-20 right-4 z-30 lg:hidden` — primary **Depositar** or menu FAB opening three actions (product choice: single FAB opens **DropdownMenu** with three actions).

**State: Loading**

- 3 **Skeleton** stat cards + search bar skeleton + **5 skeleton table rows** (desktop) / 5 card skeletons (mobile).

**State: Empty (no coins)**

- Render **SCR-EMPTY** content in place of table (see §3.11). Do not duplicate conflicting messages — **SCR-EMPTY** is the canonical empty dashboard.

**State: Error**

- **PAT-CARD** with `AlertTriangle` `text-red-500`, message "Não foi possível carregar o portfólio.", `Button` **Tentar novamente** (refetch).

**State: Success**

- Default populated UI.

---

### SCR-CONVERT — (`/convert`)

**Layout:** **PAT-SHELL** + sidebar/bottom nav.

**Form (PAT-FORM + PAT-CARD):**

1. **Origem:** `CoinSelector` (source)
2. **Valor:** `AmountInput` + MAX
3. **Swap** button (circular icon `ArrowDownUp` or vertical arrows) — swaps source/destination coins **without** submitting
4. **Destino:** `CoinSelector` (dest)
5. **RatePreview** — "Cotação: 1 SOURCE = X DEST" + timestamp "Atualizado há …"
6. **FeeDisplay** — tax + rede se aplicável

**Primary CTA:** `Converter` — `Button variant="default"` disabled when:
- amount ≤ 0
- source === dest (same coin)
- insufficient balance
- loading quote

**Validation (inline):**

- **Insufficient balance:** red text under amount: "Saldo insuficiente."
- **Same coin:** `PAT-TOAST` Warning or inline amber: "Selecione moedas diferentes." + disable submit
- **Zero amount:** submit disabled

**Confirm — PAT-DIALOG**

- **Desktop:** `Dialog`  
- **Mobile:** `Sheet` bottom  

**Summary rows:** De / Para / Cotação / Taxa / Total a receber (aprox.)

- Buttons: **Confirmar** (primary), **Cancelar** (outline)

**Success**

- **PAT-TOAST** Success: **"Conversão realizada com sucesso!"**  
- `navigate('/dashboard')` after short delay (~400ms) or immediately after toast.

**Error**

- **PAT-TOAST** Error: **"Erro ao converter"**  
- Stay on `/convert`, preserve form state where safe.

**Loading**

- Skeleton form or disable inputs + spinner on CTA during quote/submit.

---

### SCR-WITHDRAW — (`/withdraw`)

**Layout:** **PAT-SHELL**.

**Form fields:**

1. `CoinSelector`
2. **MethodToggle:** Crypto | Fiat
3. `AmountInput` + MAX
4. **If Crypto:** `NetworkSelector` (e.g. ERC-20, TRC-20), `AddressInput` (mono `font-mono text-sm`), validate checksum/format by family
5. **If Fiat:** `BankFields` — at minimum: bank name, agency, account, account type (Select), PIX key optional (Brazil-first product assumption)
6. **FeeDisplay**

**Confirm PAT-DIALOG:** coin, amount, method, destination (masked address / bank), fee, ETA text if any.

**Success:** Toast **"Saque solicitado!"** → `navigate('/dashboard')`

**Validation**

- Insufficient balance — red text + disable
- Invalid address — field-level red
- Minimum amount — field-level or toast Warning

---

### SCR-DEPOSIT — (`/deposit`)

**Layout:** **PAT-SHELL**.

**Flow:**

1. `CoinSelector`
2. `NetworkSelector` — filters compatible networks per coin
3. After selection: **Warning banner** — `bg-amber-500/10 border border-amber-500/30 text-amber-200 rounded-lg p-4 flex gap-3`  
   - Copy: **"Envie apenas [COIN] nesta rede"** (COIN = ticker)
4. **AddressDisplay** — `font-mono text-sm break-all`
5. **QRCode** — centered `mx-auto`, max width `max-w-[200px]`
6. **CopyButton** — `Button variant="outline"` with `Copy`; on success: **PAT-TOAST** Success **"Copiado!"** (short duration ok)

**Loading:** skeleton for address/QR  
**Error:** PAT-CARD error + retry fetch deposit instructions

---

### SCR-HISTORY — (`/history`)

**Layout:** **PAT-SHELL**.

**Filters**

- **Type:** All | Convert | Withdraw | Deposit (map to API enums)
- **Period:** e.g. 7d, 30d, 90d, All
- **Coin:** all or specific
- **Desktop:** **FilterBar** in header toolbar
- **Mobile:** **FilterChips** horizontal scroll

**Table / list columns**

| Field | Desktop | Mobile card |
|-------|---------|-------------|
| Tipo | Icon + label | Same prominent |
| Moeda(s) | Tickers / pair | Subtitle |
| Valor | Amount + fiat | Bold |
| Data | `dd/MM/yyyy HH:mm` | `text-zinc-400 text-xs` |
| Status | **StatusBadge** | Badge top-right |

- **Row click:** `navigate(`/history/${tx.id}`)`  
- **Empty:** centered text **"Nenhuma transação encontrada"** + `Button` **"Fazer um depósito"** → `/deposit` or **"Ver painel"** → `/dashboard`  
- **Mobile:** pull-to-refresh — use touch hooks or library; show subtle refresh indicator at top  
- **Loading:** skeleton rows  
- **Error:** message + **Tentar novamente**

---

### SCR-TX-DETAIL — (`/history/:txId`)

**Layout:** **PAT-SHELL**.

**Breadcrumb:** `Breadcrumb` — **Histórico** (`/history`) > **Transação #[id]** (current, not link)

**Back:** `Button variant="ghost" size="sm"` + `ArrowLeft` → `navigate(-1)` or `/history`

**Detail card (PAT-CARD):**

- **Tipo** (text + icon)
- **Data/hora** full
- **Moeda(s)** / pares
- **Valor(es)** source/destination if convert
- **Taxa**
- **Status** — StatusBadge large
- **ID da transação** — `font-mono text-xs bg-zinc-800/50 px-2 py-1 rounded` + **Copy** button
- **Endereço** (if withdraw crypto) — monospace + copy

**States:** Loading skeleton; Error **"Transação não encontrada"** + link to `/history`

---

### SCR-ALERTS — (`/alerts`)

**Layout:** **PAT-SHELL**.

**Header:** title "Alertas" + **mobile/desktop:** `Button` icon `Plus` **"+"** opens **SCR-ALERT-CREATE**

**List:** stack of **PAT-CARD** items:

- Left: coin icon + name  
- Direction: `TrendingUp` green (subiu) / `TrendingDown` red (caiu) — or amber/neutral per direction enum  
- **Percent** — e.g. "5%"  
- **Switch** — enable/disable alert (optimistic UI + rollback on error)  
- **Delete** — `Button variant="ghost" size="icon"` `Trash2` → confirm Dialog on desktop, or immediate with toast on mobile per UX choice (v1: confirm **Dialog** PAT-DIALOG)

**Empty:** **"Nenhum alerta configurado"** + `Button` **"Criar alerta"** → opens **SCR-ALERT-CREATE**

**Mobile:** swipe-to-delete optional (framer-motion or native overflow); if not in scope, use delete button only.

**Loading / Error:** standard.

---

### SCR-ALERT-CREATE — (modal / sheet, not a route)

**Trigger:** From SCR-ALERTS **"+"** or from dashboard action **"Criar alerta"**.

**PAT-DIALOG:** Desktop `Dialog`, mobile `Sheet` bottom.

**Fields:**

1. `CoinSelector` — required
2. **Direction** — `Select`: **"Subiu"** (up) / **"Caiu"** (down)
3. **Percentage** — `Input type="number"` suffix `%`, `min > 0`, step `0.1`

**Actions:** **Salvar** (primary), **Cancelar** (ghost) — cancel closes dialog.

**Validation**

- Coin required — inline  
- Percentage > 0 — inline  
- On success: toast Success + close + refresh list

---

### SCR-SETTINGS — (`/settings`)

**Layout:** **PAT-SHELL**.

**Sections** (each **PAT-CARD**):

1. **Moeda de exibição** — `Select`: BRL | USD | EUR — on change persist `localStorage` key e.g. `displayCurrency`, dispatch custom event or context update so SCR-HOME refreshes formatting.
2. **Tema** — `Switch` dark/light (if light implemented; else hide or disable with "Em breve") — persist `theme` in `localStorage`.
3. **Notificações** — grouped `Switch`es: e-mail, push, alertas de preço (labels PT).
4. **Conta** — read-only `Input` name, email — `bg-zinc-950/50` read-only styling.

**Auto-save:** debounce 300ms on change → persist → **PAT-TOAST** Success **"Preferências salvas"** (avoid spam: show at most once per 30s or only when blur).

---

### SCR-404 — (`*`)

**Layout:** can use minimal shell without nav **or** full **PAT-SHELL** — v1: **full PAT-SHELL** so user can navigate.

**Content:** `flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-4`

- `AlertTriangle` `size-12 text-amber-500`
- **"Página não encontrada"** — `text-xl font-semibold text-zinc-100`
- `Button variant="default"` **"Voltar ao Dashboard"** → `/dashboard`

---

### SCR-EMPTY — (state of `/dashboard` with no coins)

**When:** Portfolio API returns zero assets (not loading error).

**Layout:** Replace stats + table region with centered block inside content area:

- `flex flex-col items-center justify-center py-16 px-4 text-center space-y-4`
- `Wallet` icon `size-16 text-zinc-600`
- **"Bem-vindo ao Crypto Dashboard"** — `text-xl font-semibold text-zinc-100`
- **"Você ainda não tem moedas"** — `text-zinc-400`
- `Button variant="default"` **"Fazer primeiro depósito"** → `/deposit`

**Note:** This is the same messaging family as the **empty** bullet under SCR-HOME; **SCR-EMPTY** is the full-page centered variant.

---

## 4. Implementation checklist (Poseidon)

- [ ] **PAT-SHELL** applied to all main routes; responsive padding and bottom offset for mobile.
- [ ] **PAT-SIDEBAR** + **PAT-BOTTOMNAV** — mutual exclusivity by `lg` breakpoint.
- [ ] **PAT-TOAST** durations and error persistence.
- [ ] **PAT-FORM** focus rings amber; errors red.
- [ ] All **11** screen behaviors: loading / empty / error / success matrices implemented.
- [ ] `localStorage` keys documented in code (`displayCurrency`, `theme`, notification prefs).
- [ ] Accessibility: focus trap in dialogs/sheets, `aria-label` on icon-only buttons, table headers `scope="col"`.

---

**Document status:** Implementation-ready for Crypto Wallet Dashboard v1.  
**Owner:** Hephaestus (UI/UX Refiner) · **Consumer:** Poseidon (Frontend)
