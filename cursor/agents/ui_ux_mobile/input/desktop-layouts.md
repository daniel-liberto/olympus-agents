# Desktop Layouts — Crypto Wallet Dashboard

**Agent:** Apollo (Desktop UI/UX)  
**Theme:** Dark, premium, layered (zinc neutrals + amber/orange CTAs, emerald success, red errors)  
**Stack:** shadcn/ui (Radix) + Lucide icons + Tailwind

---

## Design system (applied everywhere)

| Token role | Tailwind |
|------------|----------|
| Page background | `bg-zinc-950` |
| Cards / panels | `bg-zinc-900` |
| Borders | `border-zinc-800` |
| Dividers | `border-zinc-700` |
| Muted text | `text-zinc-600` |
| Secondary | `text-zinc-400` |
| Primary body | `text-zinc-200` |
| Headings | `text-zinc-100` |
| CTA / emphasis | amber/orange (`text-amber-400`, `bg-amber-500` etc. as implemented) |
| Success | emerald |
| Error / destructive | red |

**Rules:** Neutrals are **zinc only** (never `gray`). Surfaces stack as background → card → inset fields; subtle `shadow` with zinc-tinted elevation.

---

## Global shell

### 1. Sidebar (left, ~260px)

- **Width:** `w-[260px]` fixed; `border-r border-zinc-800`, `bg-zinc-900`, vertical flex column.
- **Top:** App mark + wordmark **“Crypto Dashboard”** (`text-zinc-100`, small subtitle optional `text-zinc-500`).
- **Nav groups** (Lucide + label, `text-zinc-400` default, `text-zinc-200` + `bg-zinc-800/50` active):
  - **Primary:** Home — `LayoutDashboard` → `/dashboard`
  - **Primary:** History — `Clock` → `/history`
  - **Primary:** Alerts — `Bell` → `/alerts`
  - **Primary:** Settings — `Settings` → `/settings`
- **Quick Actions** (section label `text-zinc-600` uppercase tracking-wide):
  - Convert — `ArrowLeftRight` → `/convert`
  - Withdraw — `ArrowUpFromLine` → `/withdraw`
  - Deposit — `ArrowDownToLine` → `/deposit`
- **Bottom — User area:** `Avatar` + display name (`text-zinc-200`) + email (`text-zinc-500` truncate). `DropdownMenu`: Profile (placeholder route or in-app focus), **Sign out** (destructive item styling). Sidebar scrolls internally only if viewport is short; user block stays at bottom (`mt-auto`).

### 2. Main column

- **Structure:** `flex-1 min-w-0 flex flex-col` beside sidebar; page background `zinc-950`.
- **Top bar:** Row with **page title** (`text-zinc-100`, `text-2xl` or `text-xl font-semibold`); optional **breadcrumbs** on nested/detail routes (see below); right side can hold contextual actions (screen-specific).
- **Content area:** `max-w-7xl mx-auto w-full px-6 pb-8 pt-6` (adjust `pt` if top bar is sticky).
- **Scroll:** **Main column** scrolls (`overflow-y-auto` on the shell’s main region); individual tables may use sticky headers inside the scroll area. Avoid nested full-height scroll unless a table is explicitly max-height.

### 3. Breadcrumbs

- **When:** Detail views and any nested context (e.g. transaction detail under History).
- **Pattern:** shadcn `Breadcrumb` + Lucide `ChevronRight` separators; links `text-zinc-400 hover:text-zinc-200`; current page `text-zinc-100`.
- **Examples:** `History` → `Transaction #123`; `Alerts` (no crumb on list); Settings sub-pages if added later.

### 4. Responsive note (desktop)

- Layout is **desktop-first**. Shell and grids hold from **`min-width: 1024px` (`lg`)** without collapsing the sidebar. Below `lg`, product may use a collapsed nav or drawer (out of scope for this doc; Artemis handles mobile).

---

## Per-screen layouts

---

### SCR-HOME — Dashboard

| Field | Value |
|-------|--------|
| **Route** | `/dashboard` |
| **Purpose** | Portfolio overview, searchable holdings, quick flows, and alert highlights. |

**ASCII layout**

```
+--SIDEBAR (~260px)----------+--MAIN (flex-1, scroll)--------------------------------+
| Logo: Crypto Dashboard     | Top bar: Title "Dashboard"  (no breadcrumbs)          |
| Nav: Home, History, ...    +--------------------------------------------------------+
| Quick: Convert, W, D       | max-w-7xl px-6                                         |
|                            | [ Stats row: 3 cards ]                                 |
|                            | [ Optional: chart / allocation strip ]                 |
|                            | [ Quick action buttons: Convert | Withdraw | Deposit ] |
|                            | [ Price alerts highlights ]                            |
|                            | [ Coin list card: search + table ]                     |
| User: Avatar, menu         |                                                        |
+----------------------------+--------------------------------------------------------+
```

**Regions**

- **Header (top bar):** Title only; optional last-updated subtitle `text-zinc-500`.
- **Body:**
  - **Stats row:** Three `Card`s (`bg-zinc-900`, `border-zinc-800`):
    1. **Total portfolio value** — large fiat (BRL), optional mini sparkline; **24h change** badge (emerald up / red down).
    2. **24h change** — aggregate % and fiat delta (duplicate summary OK if card 1 is value-only; or merge into one card with sub-metrics).
    3. **Number of assets** — count; link-styled “View all” to scroll to table.
  - **Chart / allocation strip (optional but recommended):** Single row `Card` — e.g. 7-day portfolio line or asset allocation bar (Recharts); axes labeled; empty if no data.
  - **Quick actions:** Row of `Button` variants — **Convert** (amber primary), **Withdraw** (outline), **Deposit** (outline); icons match sidebar.
  - **Price alert highlights:** `Card` with section title “Active price alerts”; list rows: coin, condition (e.g. “BTC above R$ …”), `Badge` for direction; “Manage” → `/alerts`. If none, compact empty copy + CTA.
  - **Coin list:** `Card` → toolbar with `Input` search (Lucide `Search`, placeholder “Search coins…”); `Table` with sortable headers where noted.

**Table columns (coin list)**

| Column | Content |
|--------|---------|
| Coin | Token icon + name + ticker (`text-zinc-400` ticker) |
| Balance | Crypto amount, mono-friendly |
| Value (BRL) | Fiat formatted |
| 24h Change (%) | `Badge` emerald/red + number |
| Actions | `DropdownMenu`: Convert, Withdraw, Deposit (per row) or icon buttons |

**Key components:** `Card`, `Button`, `Input`, `Table`, `Badge`, `Avatar` (icons in table), `DropdownMenu`, `Breadcrumb` (none here), charts optional.

**Empty state:** If portfolio empty, prefer dedicated **SCR-EMPTY** route or inline banner linking “Deposit” / “Add assets”; table shows empty state row with illustration zone + primary CTA.

**Loading:** Skeleton cards for stats; skeleton rows for table; chart area skeleton.

**Error:** `Alert` (destructive) at top of main with retry; table body shows inline error with retry.

**Responsive:** `min-width: 1024px`; stats `grid-cols-3`; table horizontal scroll if many columns on narrow desktop.

---

### SCR-CONVERT — Conversion

| Field | Value |
|-------|--------|
| **Route** | `/convert` |
| **Purpose** | Swap between two assets with rate preview and confirmation. |

**ASCII layout**

```
+--SIDEBAR--+--MAIN------------------------------------------------------------------+
| (global)  | Top bar: "Convert"                                                     |
|           +------------------------------------------------------------------------+
|           | [ Card: form ]                                                       |
|           |   Source coin | Dest coin                                            |
|           |   Amount | Max | Balance hint                                        |
|           |   Rate preview | fee | receive                                       |
|           |   [ Preview / Continue ] → confirmation panel or dialog               |
+-----------+------------------------------------------------------------------------+
```

**Regions**

- **Header:** Title “Convert”; short helper `text-zinc-500`.
- **Body:** Single primary `Card` (or two-column on wide: form left, summary sticky right).
  - **Source:** `Select` + coin row (icon, name, ticker); **Destination:** same.
  - **Amount:** `Input` + “Max” `Button`; show available balance (zinc-500).
  - **Rate preview:** Read-only rows — rate, spread/fee, you receive (dest asset + BRL ref if needed).
  - **Confirmation:** Either step 2 on same page (replace body) or `Dialog` — summary list, checkbox acknowledgment, **Confirm** (amber primary, loading on submit).

**Key components:** `Card`, `Select`, `Input`, `Button`, `Dialog` or inline stepper, `Separator`, `Badge` for rate freshness.

**Empty / edge:** If no balance in source, show `Alert` + CTA Deposit; disable convert.

**Loading:** Shimmer on rate; submit button `disabled` + spinner.

**Error:** Inline under amount; toast or `Alert` for quote failures; **Retry quote** secondary button.

**Responsive:** `lg`+ two-column optional; single column default.

---

### SCR-WITHDRAW — Withdrawal

| Field | Value |
|-------|--------|
| **Route** | `/withdraw` |
| **Purpose** | Withdraw crypto or fiat with method-specific destination and confirmation. |

**ASCII layout**

```
+--SIDEBAR--+--MAIN------------------------------------------------------------------+
|           | Top bar: "Withdraw"                                                   |
|           +------------------------------------------------------------------------+
|           | [ Card ]                                                             |
|           |   Coin | Amount | Network (if crypto)                                 |
|           |   Method: Crypto address | Bank (tabs or radio)                      |
|           |   Address / IBAN fields (dynamic)                                    |
|           |   Fee estimate | Receive net                                         |
|           |   [ Continue ] → Confirm Dialog                                       |
+-----------+------------------------------------------------------------------------+
```

**Regions**

- **Header:** Title + compliance hint (small print zinc-600).
- **Body:** `Tabs` or `RadioGroup`: **Crypto** vs **Fiat**.
  - **Shared:** Coin/asset `Select`, amount, balance.
  - **Crypto:** Network `Select`, address `Input` with paste icon, memo/tag if applicable.
  - **Fiat:** Bank fields (name, agency, account, PIX key, etc. — locale BRL-oriented).
  - **Review:** `Dialog` with full recap, **Confirm withdrawal** (destructive emphasis on address mismatch warning if any).

**Key components:** `Tabs`, `Input`, `Select`, `Button`, `Dialog`, `Alert` for warnings.

**Empty:** No eligible assets — empty state with Deposit CTA.

**Loading:** Fee/network loading spinners; submit loading.

**Error:** Validation (address format); network error with retry.

**Responsive:** Form stacks; wide uses 2-col grid for bank fields.

---

### SCR-DEPOSIT — Deposit

| Field | Value |
|-------|--------|
| **Route** | `/deposit` |
| **Purpose** | Show deposit instructions: asset, network, address, QR. |

**ASCII layout**

```
+--SIDEBAR--+--MAIN------------------------------------------------------------------+
|           | Top bar: "Deposit"                                                    |
|           +------------------------------------------------------------------------+
|           | [ Card row ]                                                          |
|           |   Col1: Coin + Network selects                                        |
|           |   Col2: QR (Card inset) + Address field + Copy button                 |
|           |   Warning: confirmations, min deposit                                |
+-----------+------------------------------------------------------------------------+
```

**Regions**

- **Header:** Title; breadcrumb none.
- **Body:** Two-column `lg:grid-cols-2`: left selects + warnings list; right `Card` with QR (fixed size, centered), monospace address with **Copy** (`Button` + toast), explorer link optional.

**Key components:** `Select`, `Card`, `Button`, QR component (or image slot), `Alert` for network caution (amber).

**Empty:** N/A — always show selectors; if API fails, error state.

**Loading:** Skeleton for QR/address fetch.

**Error:** Failed to load address — `Alert` + retry.

**Responsive:** Stacks below `lg`.

---

### SCR-HISTORY — Transaction History

| Field | Value |
|-------|--------|
| **Route** | `/history` |
| **Purpose** | Filterable list of all transactions. |

**ASCII layout**

```
+--SIDEBAR--+--MAIN------------------------------------------------------------------+
|           | Top bar: "History"                                                    |
|           +------------------------------------------------------------------------+
|           | Toolbar: Search | Type filter | Asset | Date range | Status           |
|           | [ Table: rows clickable → detail ]                                    |
|           | Pagination footer                                                      |
+-----------+------------------------------------------------------------------------+
```

**Regions**

- **Header:** Title; optional export secondary action.
- **Body:** Filters in `Card` or toolbar row; `Table` with columns: Date/time, Type (convert/withdraw/deposit), Asset(s), Amount, Status (`Badge`), Tx id truncated; row click → `/history/:txId`.

**Key components:** `Input`, `Select`, `Popover`+calendar for dates, `Table`, `Badge`, `Button`, pagination.

**Empty:** No transactions — empty state illustration + “Make your first deposit”.

**Loading:** Skeleton table.

**Error:** Banner + retry; table shows error row.

**Responsive:** Table scroll-x; filters wrap.

---

### SCR-TX-DETAIL — Transaction Detail

| Field | Value |
|-------|--------|
| **Route** | `/history/:txId` |
| **Purpose** | Full read-only transaction record. |

**ASCII layout**

```
+--SIDEBAR--+--MAIN------------------------------------------------------------------+
|           | Top bar: Breadcrumb History > Transaction #123 | [Back]                |
|           +------------------------------------------------------------------------+
|           | [ Card: summary header Status badge + amount ]                       |
|           | [ Card: details grid — labels zinc-500, values zinc-200 ]             |
|           | [ Card: timeline / steps if multi-stage ]                             |
|           | Secondary: View on explorer (external link)                           |
+-----------+------------------------------------------------------------------------+
```

**Regions**

- **Header:** **Breadcrumbs:** `History` (link) → `Transaction #123` (current); title can repeat tx id; **Back** `Button` ghost.
- **Body:** Status `Badge` (emerald completed, amber pending, red failed); key-value rows: type, assets, amounts, fees, addresses, tx hash, timestamps; `Separator` sections.

**Key components:** `Breadcrumb`, `Card`, `Badge`, `Button`, `Separator`.

**Empty:** Invalid id — redirect or **SCR-404** pattern.

**Loading:** Skeleton cards.

**Error:** Not found vs network error (404 card vs retry).

**Responsive:** Single column; wide can use 2-col grid for metadata.

---

### SCR-ALERTS — Alert Management

| Field | Value |
|-------|--------|
| **Route** | `/alerts` |
| **Purpose** | List, toggle, delete, and create price alerts. |

**ASCII layout**

```
+--SIDEBAR--+--MAIN------------------------------------------------------------------+
|           | Top bar: "Alerts" | [ Create alert ] (opens modal)                    |
|           +------------------------------------------------------------------------+
|           | [ Card: list ]                                                       |
|           |   Row: Coin | Condition | Toggle | Menu [...] Delete                  |
|           |   Or grouped by Active / Paused                                       |
+-----------+------------------------------------------------------------------------+
```

**Regions**

- **Header:** Title; primary **Create alert** `Button` (amber) opens **SCR-ALERT-CREATE** modal.
- **Body:** `Table` or list with `Switch` per row; `DropdownMenu` delete with `AlertDialog` confirm.

**Key components:** `Card`, `Table`, `Switch`, `DropdownMenu`, `AlertDialog`, `Dialog` (for create).

**Empty:** No alerts — empty state + **Create alert** CTA.

**Loading:** Skeleton list.

**Error:** Top `Alert` + retry.

**Responsive:** List stacks; toggles remain usable.

---

### SCR-ALERT-CREATE — Create Alert (modal on `/alerts`)

| Field | Value |
|-------|--------|
| **Route** | Modal overlay on `/alerts` (no separate path) |
| **Purpose** | Define coin, direction, and threshold percentage or price. |

**ASCII layout (modal)**

```
+---------------------------------------------------------------- Dialog ----------+
| Create price alert                                                          [X] |
|----------------------------------------------------------------------------------|
| Coin [ Select searchable ]                                                       |
| Direction [ Above / Below ] (Select or segmented)                                 |
| Threshold: [ Percentage Input ]  OR  [ Price in fiat ] (toggle or tabs)          |
| Optional: Expiry                                                                |
|----------------------------------------------------------------------------------|
| [ Cancel ]                                    [ Create alert ] (amber primary)   |
+----------------------------------------------------------------------------------+
```

**Regions**

- **Dialog** `lg` max width; form fields with labels; validation on percentage 0–100 or positive price.

**Key components:** `Dialog`, `Select`, `Input`, `Button`, `Label`.

**Empty:** N/A.

**Loading:** Submit button loading.

**Error:** Inline validation; API error toast.

**Responsive:** Full-width fields; modal fits mobile breakpoint if shared.

---

### SCR-SETTINGS — Settings

| Field | Value |
|-------|--------|
| **Route** | `/settings` |
| **Purpose** | Fiat currency, theme, notifications, account. |

**ASCII layout**

```
+--SIDEBAR--+--MAIN------------------------------------------------------------------+
|           | Top bar: "Settings"                                                   |
|           +------------------------------------------------------------------------+
|           | [ Card: Fiat currency ]  Select BRL / USD / ...                       |
|           | [ Card: Appearance ]   Theme: Light / Dark / System (Select)          |
|           | [ Card: Notifications ] Switches: email, push, price alerts             |
|           | [ Card: Account ]        Email read-only, change password, 2FA links    |
|           | [ Save changes ] sticky footer optional                                |
+-----------+------------------------------------------------------------------------+
```

**Regions**

- **Header:** Title; no breadcrumbs unless nested.
- **Body:** Stacked `Card`s with `Separator`; each section titled `text-zinc-100`.

**Key components:** `Card`, `Select`, `Switch`, `Button`, `Separator`, `Input` (password change in dialog).

**Empty:** N/A.

**Loading:** Section-level skeleton on fetch.

**Error:** Per-section error text + global toast.

**Responsive:** Single column `max-w-3xl` optional within `max-w-7xl`.

---

### SCR-404 — Not Found

| Field | Value |
|-------|--------|
| **Route** | Catch-all unknown routes (e.g. `*`) |
| **Purpose** | Clarify missing page and route home. |

**ASCII layout**

```
+--SIDEBAR--+--MAIN------------------------------------------------------------------+
|           | Centered content (flex center min-h)                                   |
|           |   404 - Page not found (zinc-100)                                      |
|           |   Short message (zinc-500)                                             |
|           |   [ Go to Dashboard ]                                                  |
+-----------+------------------------------------------------------------------------+
```

**Regions**

- **Main:** Centered column; optional small Lucide `SearchX` icon in amber/zinc; single primary **Go to Dashboard** → `/dashboard`.

**Key components:** `Button`, typography.

**Empty / loading / error:** N/A.

**Responsive:** Same centered pattern from `lg` up.

---

### SCR-EMPTY — Empty Dashboard (no coins yet)

| Field | Value |
|-------|--------|
| **Route** | `/dashboard` (state variant) or dedicated `/dashboard/welcome` — **implement as same `/dashboard` with empty state** |
| **Purpose** | Onboard user when portfolio has no assets. |

**ASCII layout**

```
+--SIDEBAR--+--MAIN------------------------------------------------------------------+
|           | Top bar: "Dashboard"                                                  |
|           +------------------------------------------------------------------------+
|           | [ Stats row: all zeros / placeholders ]                               |
|           | [ Hero empty Card: illustration + copy + Deposit primary ]            |
|           | [ Dismissible tips list ] optional                                      |
|           | Coin table: empty state (no fake rows)                                |
+-----------+------------------------------------------------------------------------+
```

**Regions**

- **Header:** Same as SCR-HOME.
- **Body:** Stats show “R$ 0,00” and emerald/red neutralized; prominent **Empty state** `Card` with message “Your portfolio is empty” and CTAs **Deposit** (amber), **Convert** (outline disabled or tooltip until funds); table uses shared empty state component.

**Key components:** `Card`, `Button`, empty illustration slot.

**Loading:** If checking balance, show SCR-HOME loading briefly first.

**Error:** Same as dashboard.

**Responsive:** Same as SCR-HOME.

---

## Screen coverage table

| Screen ID | Route | Layout Section | Status |
|-----------|-------|----------------|--------|
| SCR-HOME | `/dashboard` | Global shell + stats + chart strip + quick actions + alert highlights + coin table | Designed |
| SCR-CONVERT | `/convert` | Global shell + conversion form + confirmation | Designed |
| SCR-WITHDRAW | `/withdraw` | Global shell + method tabs + dynamic fields + confirm dialog | Designed |
| SCR-DEPOSIT | `/deposit` | Global shell + coin/network + QR + address + warnings | Designed |
| SCR-HISTORY | `/history` | Global shell + filters + transactions table | Designed |
| SCR-TX-DETAIL | `/history/:txId` | Global shell + breadcrumbs + detail cards | Designed |
| SCR-ALERTS | `/alerts` | Global shell + alert list + create entry point | Designed |
| SCR-ALERT-CREATE | Modal on `/alerts` | Dialog form (coin, direction, %) | Designed |
| SCR-SETTINGS | `/settings` | Global shell + stacked setting cards | Designed |
| SCR-404 | `*` (catch-all) | Global shell + centered 404 | Designed |
| SCR-EMPTY | `/dashboard` (empty state) | Global shell + empty hero + zero stats | Designed |

---

## Implementation notes

- **Active nav:** Sidebar item for current route uses subtle zinc background and left border or ring — not full amber fill (reserve amber for CTAs).
- **Focus:** Visible focus rings (`ring-2 ring-amber-500/50` or tokenized) for keyboard users.
- **Data density:** Tables use comfortable row height (`h-12`–`h-14`) and `text-sm` for cells, `text-zinc-200`.

This document is the single reference for desktop structure of the Crypto Wallet Dashboard through Hephaestus merge and Poseidon implementation.
