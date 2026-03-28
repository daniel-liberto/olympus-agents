# Detailed Flows — Crypto Wallet Dashboard

**Product**: Crypto Wallet Dashboard for non-technical users  
**Theme**: Dark, clean, modern  
**Platforms**: Responsive web (mobile + desktop)  
**Data**: Fully mocked; no real authentication or blockchain integration  
**Supported coins**: BTC, ETH, BNB, SOL, ADA, USDT, USDC  
**Default fiat**: BRL (user can change in Settings)

**Conventions used in this document**

- **Screen IDs**: `SCR-*` as listed in the product brief.
- **Route examples**: Illustrative; implementation may use hash routing or different path strings—behavior must match.
- **“Toast”**: Non-blocking transient message (bottom or top per design system).
- **“Modal”**: Blocking overlay until dismissed or confirmed.
- **Navigation stack**: Browser history `back` returns to previous in-app route unless noted otherwise.

---

## Global form and validation rules (applies across flows)

**Numeric amount fields (crypto/fiat)**

- Accept decimal input with locale-appropriate separator; normalize internally to `.` for parsing.
- Max precision: crypto **8** decimal places (truncate or round per design: recommend **round half-up** for display, store mock values as strings or decimals consistently).
- Min value: **> 0** for any “submit” that moves value; `0` or empty blocks primary submit.
- Max value: cannot exceed **available balance** for that coin on operations that debit balance (Convert source, Withdraw).
- Invalid characters: reject or strip; show inline error if paste contains invalid content.

**Addresses (crypto)**

- Non-empty string required when method is crypto.
- Basic format validation: length **≥ 26** and **≤ 90** (generic mock rule); alphanumeric base58/bech32 style—implementation may use a single regex for “looks like an address” without chain verification.

**Bank fields (fiat withdraw)**

- Bank name: required, **2–80** chars.
- Agency: required, **4–5** digits (mock).
- Account: required, **5–12** digits (mock; may include hyphen for digit).

---

# 1. F-DASH — Dashboard flows

## Screen inventory (SCR-HOME)

| Region | Elements |
|--------|----------|
| Header | App title/logo, total balance (fiat), optional refresh |
| Search | Quick search input (filters coin list) |
| Coin list | Rows: icon, symbol, balance, fiat value, 24h change |
| Quick actions | Buttons: Convert, Withdraw, Deposit (labels per locale) |
| Navigation entry points | Sidebar (desktop), bottom nav (mobile), optional FAB (if specified in UI spec) |

---

### F-DASH-001 — Initial dashboard load (success)

**ID**: F-DASH-001  
**Actor**: End user  
**Preconditions**: App opened at root or `/dashboard`; mock user session implied (no login).  
**Postconditions**: Dashboard shows non-empty mock balances OR empty state per mock dataset; loading finished.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HOME | (entry) | Land on dashboard route | Route resolves to SCR-HOME | Dashboard shell visible (layout, placeholders) |
| 2 | SCR-HOME | Full page | (automatic) | Show **loading skeleton** on balance + list regions | Loading state |
| 3 | SCR-HOME | — | (automatic) | Fetch mock portfolio (coins, balances, rates vs BRL) | Request in flight |
| 4a | SCR-HOME | Balance + list | (automatic) | Render data: total in **BRL**, list sorted by default (e.g. fiat value desc) | Ready state with data |
| 4b | SCR-HOME | Error banner / inline | (automatic) | If mock fails: show error with **Retry** | Error state (see F-ERROR-001) |

---

### F-DASH-002 — Dashboard load (empty portfolio)

**ID**: F-DASH-002  
**Actor**: End user  
**Preconditions**: Mock flag or dataset returns **zero coins** or **all zero balances**.  
**Postconditions**: SCR-EMPTY embedded or full-screen empty state; user can navigate to Deposit.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HOME | — | Load completes | Detect empty portfolio | SCR-EMPTY content shown (see F-EMPTY-001) |
| 2 | SCR-EMPTY | Primary CTA (e.g. “Fazer primeiro depósito” / “Deposit”) | Tap / click | Navigate to SCR-DEPOSIT | SCR-DEPOSIT |

---

### F-DASH-003 — Search / filter coin list

**ID**: F-DASH-003  
**Actor**: End user  
**Preconditions**: Dashboard in ready state with ≥1 coin.  
**Postconditions**: List filtered in real time; clearing search restores full list.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HOME | Quick search field | Focus | Optional: show clear (×) if field non-empty | Focused |
| 2 | SCR-HOME | Quick search field | Type query | Filter rows where **symbol or name** matches substring, case-insensitive | Filtered list |
| 3a | SCR-HOME | Quick search field | Continue typing until no matches | Show **no results** inline in list area (not full 404): “Nenhuma moeda encontrada” + hint | Empty search result |
| 3b | SCR-HOME | Clear (×) or delete text | Clear | Restore full list | Full list |
| 4 | SCR-HOME | Browser back | Press back | If search was only client state, leaving screen clears search (implementation choice: clear on blur of route—document **clear on navigate away**) | Prior route |

---

### F-DASH-004 — Quick actions (Convert, Withdraw, Deposit)

**ID**: F-DASH-004  
**Actor**: End user  
**Preconditions**: SCR-HOME visible.  
**Postconditions**: User on target screen; optional **prefill** if specified below.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1a | SCR-HOME | “Convert” quick action | Click | Navigate to **SCR-CONVERT** (`/convert`) | SCR-CONVERT, default pair from mock |
| 1b | SCR-HOME | “Withdraw” quick action | Click | Navigate to **SCR-WITHDRAW** (`/withdraw`) | SCR-WITHDRAW, default coin from mock |
| 1c | SCR-HOME | “Deposit” quick action | Click | Navigate to **SCR-DEPOSIT** (`/deposit`) | SCR-DEPOSIT |

**Data changes**: None on dashboard until user completes flows on destination screens.

---

### F-DASH-005 — Pull to refresh / refresh control (if implemented)

**ID**: F-DASH-005  
**Actor**: End user  
**Preconditions**: Pull-to-refresh or header refresh icon present.  
**Postconditions**: Balances and list refresh; timestamps updated.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HOME | Refresh control | Trigger refresh | Show subtle loading; re-fetch mock data | Updated numbers (mock may return same data) |
| 2a | SCR-HOME | — | Success | Dismiss loading | Ready |
| 2b | SCR-HOME | — | Failure | Toast error + offer Retry | Ready with stale data |

---

### F-DASH-006 — Navigate away and back

**ID**: F-DASH-006  
**Actor**: End user  
**Preconditions**: User on SCR-HOME.  
**Postconditions**: Return preserves scroll position **if** SPA implements scroll restoration (recommended).

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HOME | Sidebar / nav: e.g. History | Navigate | Route change | Other screen |
| 2 | — | Browser or app back | Back | History pop | SCR-HOME restored |

---

### F-DASH-007 — Coin row interaction (read-only detail)

**ID**: F-DASH-007  
**Actor**: End user  
**Preconditions**: List visible.  
**Postconditions**: Either no navigation (purely informational) **or** optional navigation to a coin detail (if product adds later). **Current scope**: row is **read-only** unless product adds “coin detail”—default: **no navigation**.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HOME | Coin row | Tap | Optional highlight only | No route change (unless spec adds detail) |

*If implementation adds coin detail later, document new SCR and flows.*

---

# 2. F-CONV — Conversion flows (SCR-CONVERT)

## Form: SCR-CONVERT

| Field | Order | Required | Validation | Submit behavior |
|-------|-------|----------|------------|-----------------|
| Source coin | 1 | Yes | One of {BTC, ETH, BNB, SOL, ADA, USDT, USDC} | Sets available max = mock balance |
| Source amount | 2 | Yes | > 0, ≤ source balance, precision | Drives conversion preview |
| Destination coin | 3 | Yes | Same set; must ≠ source | Updates preview |
| Swap button | — | N/A | Swaps source/dest labels and balances context | Updates preview |
| Primary: “Convert” | — | Enabled only when valid | Opens confirmation modal | On confirm: mock debit/credit, toast, optional navigate |

**Preview line**: Shows **rate**, **estimated receive**, **fee %** (mock), all updating on debounce (e.g. 300ms) after amount change.

---

### F-CONV-001 — Happy path: convert with confirmation

**ID**: F-CONV-001  
**Actor**: End user  
**Preconditions**: User has positive balance in source coin; navigated to SCR-CONVERT.  
**Postconditions**: Balances updated in mock store; success toast; user remains on SCR-CONVERT or navigates to dashboard per UX choice (**recommend**: stay on convert with cleared amount).

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-CONVERT | Source coin selector | Open and choose (e.g. BTC) | Load max balance for BTC | Amount field max hint shows BTC balance |
| 2 | SCR-CONVERT | Source amount | Enter valid amount ≤ balance | Debounced preview: rate, receive in dest, fee | Preview populated |
| 3 | SCR-CONVERT | Dest coin selector | Choose (e.g. ETH) | Preview updates | Valid pair |
| 4 | SCR-CONVERT | Primary “Convert” | Click | Validate; open **confirmation modal** | Modal open |
| 5 | Modal | “Confirm” | Click | Apply mock conversion: subtract source, add dest at mocked rate; write mock **transaction** (type `convert`) | Modal closed |
| 6 | SCR-CONVERT | — | — | Success **toast**; reset amount field to empty or 0 | Ready for new conversion |

---

### F-CONV-002 — Swap source and destination

**ID**: F-CONV-002  
**Actor**: End user  
**Preconditions**: Both coins selected; amount may be filled.  
**Postconditions**: Source/dest swapped; amount interpreted in **new** source coin; validation re-run.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-CONVERT | Swap icon button | Click | Exchange source ↔ dest; move numeric amount to new source field if ≤ new balance | If amount > new source balance: inline error, disable submit |

---

### F-CONV-003 — Validation: insufficient balance

**ID**: F-CONV-003  
**Actor**: End user  
**Preconditions**: Source coin selected.  
**Postconditions**: Submit disabled; user must lower amount.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-CONVERT | Amount | Enter value > available | Inline error: “Saldo insuficiente”; **Convert** disabled | Error state |
| 2 | SCR-CONVERT | Amount | Reduce to ≤ balance | Clear error; enable **Convert** if other checks pass | Valid |

---

### F-CONV-004 — Validation: same source and destination

**ID**: F-CONV-004  
**Actor**: End user  
**Preconditions**: —  
**Postconditions**: Cannot submit.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-CONVERT | Dest coin | Select same as source | Inline message: “Selecione moedas diferentes”; **Convert** disabled | Blocked |

---

### F-CONV-005 — Validation: zero or empty amount

**ID**: F-CONV-005  
**Actor**: End user  
**Preconditions**: Coins selected and different.  
**Postconditions**: Submit disabled.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-CONVERT | Amount | Leave empty or `0` | **Convert** disabled; optional helper text | Blocked |

---

### F-CONV-006 — Validation: invalid characters

**ID**: F-CONV-006  
**Actor**: End user  
**Preconditions**: Amount field focused.  
**Postconditions**: Invalid input rejected or sanitized.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-CONVERT | Amount | Type letters | Reject or strip; show “Valor inválido” if paste | No submit |

---

### F-CONV-007 — Cancel confirmation modal

**ID**: F-CONV-007  
**Actor**: End user  
**Preconditions**: Modal open from **Convert**.  
**Postconditions**: No balance change.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | Modal | “Cancel” / X | Click | Close modal | SCR-CONVERT unchanged |
| 2 | Modal | Overlay click | Click outside | Same as cancel if UX allows dismiss | SCR-CONVERT unchanged |

---

### F-CONV-008 — Mock failure on confirm

**ID**: F-CONV-008  
**Actor**: End user  
**Preconditions**: Valid form; mock layer can simulate failure (e.g. dev flag).  
**Postconditions**: Error toast; balances unchanged.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | Modal | Confirm | Click | Mock throws | Modal closes or stays open per UX (**recommend**: close + error toast) |
| 2 | SCR-CONVERT | — | — | Toast: “Não foi possível converter. Tente novamente.” | No balance change |

---

### F-CONV-009 — Loading state during preview

**ID**: F-CONV-009  
**Actor**: End user  
**Preconditions**: Debounced rate fetch simulated with delay.  
**Postconditions**: Preview shows spinner or skeleton briefly.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-CONVERT | Preview area | After amount change | Short **loading** on preview line | Then updated numbers |

---

### F-CONV-010 — Back navigation

**ID**: F-CONV-010  
**Actor**: End user  
**Preconditions**: On SCR-CONVERT with unsaved **typed** amount.  
**Postconditions**: Navigate away; draft discarded unless implementing draft persistence (optional).

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1a | SCR-CONVERT | Back arrow / browser back | Activate | Leave screen; no persistence required in MVP | Previous screen |
| 1b | SCR-CONVERT | Back with modal open | Back | **Close modal first** (recommended) or close modal + then back | UX must be consistent |

---

# 3. F-SAQUE — Withdrawal flows (SCR-WITHDRAW)

## Form: SCR-WITHDRAW (shared)

| Field | Order | Required | Validation | Notes |
|-------|-------|----------|------------|-------|
| Coin | 1 | Yes | One of supported coins | Shows available balance |
| Amount | 2 | Yes | > 0, ≤ balance, precision | “Max” button sets to full balance (optional) |
| Method | 3 | Yes | `crypto` \| `fiat` | Toggles downstream fields |
| **If crypto** | | | | |
| Network | 4 | Yes | Mock enum e.g. ERC-20, BEP-20, SOL, native BTC | Must match coin (mapping table in code) |
| Address | 5 | Yes | Format rules (global) | |
| **If fiat** | | | | |
| Bank name | 4 | Yes | 2–80 chars | |
| Agency | 5 | Yes | 4–5 digits | |
| Account | 6 | Yes | 5–12 digits | |
| Primary “Withdraw” | — | Enabled when all valid | Opens **confirmation modal** | |

**Fee**: Show estimated fee (mock); deduct from amount or add on top per mock rules (**document in code**: e.g. user receives **amount − fee** in crypto).

---

### F-SAQUE-001 — Happy path: crypto withdraw

**ID**: F-SAQUE-001  
**Actor**: End user  
**Preconditions**: Positive balance in selected coin.  
**Postconditions**: Balance reduced; mock `withdraw` transaction recorded; success toast.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-WITHDRAW | Method | Select **Crypto** | Show network + address fields | Crypto path visible |
| 2 | SCR-WITHDRAW | Coin | Select coin | Show balance + compatible networks | Network dropdown filtered |
| 3 | SCR-WITHDRAW | Network | Select valid network for coin | — | Valid |
| 4 | SCR-WITHDRAW | Amount | Enter ≤ balance | Validate | Valid |
| 5 | SCR-WITHDRAW | Address | Enter valid address string | Validate format | Valid |
| 6 | SCR-WITHDRAW | Withdraw | Click | Open confirmation modal with summary | Modal |
| 7 | Modal | Confirm | Click | Debit balance; append transaction | Success toast |
| 8 | SCR-WITHDRAW | — | — | Optional: clear form or show receipt link to history | Done |

---

### F-SAQUE-002 — Happy path: fiat withdraw

**ID**: F-SAQUE-002  
**Actor**: End user  
**Preconditions**: User has balance (mock allows fiat off-ramp for any coin or only stablecoins—**implement**: allow for **USDT/USDC** only; else show message when method fiat selected—see branch).

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-WITHDRAW | Method | Select **Fiat** | Show bank fields | Fiat path |
| 2a | SCR-WITHDRAW | Coin | Select USDT | Allowed | Bank fields enabled |
| 2b | SCR-WITHDRAW | Coin | Select BTC | If product restricts: inline info “Saques em fiat disponíveis para USDT/USDC” + disable submit | Blocked |
| 3 | SCR-WITHDRAW | Amount + bank fields | Fill valid data | Validate | Valid |
| 4 | SCR-WITHDRAW | Withdraw → Confirm | Complete flow | Mock debit; transaction type `withdraw_fiat` | Success |

*Adjust 2b if product allows all coins—then remove restriction.*

---

### F-SAQUE-003 — Validation errors (amount / address / bank)

**ID**: F-SAQUE-003  
**Actor**: End user  
**Preconditions**: SCR-WITHDRAW.  
**Postconditions**: Submit disabled or error on attempt.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-WITHDRAW | Amount | > balance | Error “Saldo insuficiente” | Disabled submit |
| 2 | SCR-WITHDRAW | Address | Too short / invalid | Error “Endereço inválido” | Disabled submit |
| 3 | SCR-WITHDRAW | Agency | Non-numeric | Error | Disabled submit |
| 4 | SCR-WITHDRAW | Withdraw | Click with invalid fields | Scroll to first error + message | No modal |

---

### F-SAQUE-004 — Network incompatible with coin

**ID**: F-SAQUE-004  
**Actor**: End user  
**Preconditions**: Crypto path.  
**Postconditions**: Error when pairing impossible.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-WITHDRAW | Change coin after network chosen | Select coin B | Reset network to default compatible option or clear | If network invalid: auto-fix + toast “Rede ajustada para X” |

---

### F-SAQUE-005 — Cancel confirmation and back

**ID**: F-SAQUE-005  
**Actor**: End user  
**Preconditions**: Modal or filled form.  
**Postconditions**: No transaction.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | Modal | Cancel | Click | Close | Form data retained |
| 2 | SCR-WITHDRAW | Back | Click | Navigate away | Unsaved data discarded (MVP) |

---

### F-SAQUE-006 — Loading and mock failure

**ID**: F-SAQUE-006  
**Actor**: End user  
**Preconditions**: Confirm clicked.  
**Postconditions**: Spinner on modal button; failure leaves balances unchanged.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | Modal | Confirm | Click | **Disable** buttons; show spinner | Loading |
| 2a | — | — | Success | Close; toast | Updated balances |
| 2b | — | — | Failure | Re-enable buttons; error message | No change |

---

# 4. F-DEP — Deposit flows (SCR-DEPOSIT)

## Form: SCR-DEPOSIT

| Field | Order | Required | Validation |
|-------|-------|----------|------------|
| Coin | 1 | Yes | Supported list |
| Network | 2 | Yes | Compatible with coin |
| Deposit address | (output) | — | Generated mock address per (coin, network) |
| QR code | (output) | — | Encodes same address string |
| Copy | Button | — | Copies address to clipboard |

---

### F-DEP-001 — Happy path: select coin and network

**ID**: F-DEP-001  
**Actor**: End user  
**Preconditions**: Navigate to SCR-DEPOSIT.  
**Postconditions**: Address + QR visible; copy works.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-DEPOSIT | Coin selector | Choose BTC | Load default network (e.g. Native) | Network selected |
| 2 | SCR-DEPOSIT | Network selector | Change if needed | Regenerate mock address | New address + QR |
| 3 | SCR-DEPOSIT | Address text | Display | Read-only string | Shown |
| 4 | SCR-DEPOSIT | Copy | Click | `navigator.clipboard.writeText`; toast “Copiado!” | Clipboard set |
| 5 | SCR-DEPOSIT | QR | (visual) | User can scan externally | — |

---

### F-DEP-002 — Copy failure (permissions)

**ID**: F-DEP-002  
**Actor**: End user  
**Preconditions**: Clipboard API denied.  
**Postconditions**: Fallback message.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-DEPOSIT | Copy | Click | Catch error; toast “Não foi possível copiar. Selecione o endereço manualmente.” | — |

---

### F-DEP-003 — Network change regenerates address

**ID**: F-DEP-003  
**Actor**: End user  
**Preconditions**: Coin fixed.  
**Postconditions**: New mock address; user warned if needed.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-DEPOSIT | Network | Change ERC-20 → BEP-20 | New address; optional banner “Endereço alterado para a rede selecionada” | Updated |

---

### F-DEP-004 — Information only / no submit

**ID**: F-DEP-004  
**Actor**: End user  
**Preconditions**: —  
**Postconditions**: No “deposit submit” in MVP (mock); optional CTA “Ver histórico” → SCR-HISTORY.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-DEPOSIT | Link to history | Click | Navigate to SCR-HISTORY | SCR-HISTORY |

---

### F-DEP-005 — Back navigation

**ID**: F-DEP-005  
**Actor**: End user  
**Preconditions**: —  
**Postconditions**: Return to previous route.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-DEPOSIT | Back | Click | `history.back()` or route to dashboard | Previous screen |

---

# 5. F-ALERT — Price alert flows (SCR-ALERTS, SCR-ALERT-CREATE)

## SCR-ALERTS (list)

| Element | Action | Behavior |
|---------|--------|----------|
| Alert row | Toggle | Updates `enabled` in mock store; instant UI |
| Delete / trash | Click | Confirm dialog optional; remove from list |
| “Create” / FAB | Navigate | SCR-ALERT-CREATE |
| Empty | CTA | Navigate to create |

## SCR-ALERT-CREATE (form)

| Field | Order | Required | Validation |
|-------|-------|----------|------------|
| Coin | 1 | Yes | Supported coins |
| Direction | 2 | Yes | `above` \| `below` (vs current price) |
| Percentage | 3 | Yes | e.g. 0.1–100; **or** absolute target—**spec**: **percentage** from current mock price |
| Save / Create | — | Enabled when valid | Creates alert; navigates back to list |

---

### F-ALERT-001 — Create alert (happy path)

**ID**: F-ALERT-001  
**Actor**: End user  
**Preconditions**: Mock prices available.  
**Postconditions**: New alert in list; visible on SCR-ALERTS.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-ALERTS | Create | Click | Navigate | SCR-ALERT-CREATE |
| 2 | SCR-ALERT-CREATE | Coin | Select ETH | Show current mock price reference | — |
| 3 | SCR-ALERT-CREATE | Direction | Choose “Above” | — | — |
| 4 | SCR-ALERT-CREATE | Percentage | Enter `5` | Compute target = price × 1.05 (mock) | Preview line optional |
| 5 | SCR-ALERT-CREATE | Save | Click | Validate; add to store; navigate back | SCR-ALERTS with new row |

---

### F-ALERT-002 — Toggle alert on/off

**ID**: F-ALERT-002  
**Actor**: End user  
**Preconditions**: ≥1 alert.  
**Postconditions**: `enabled` flag updated.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-ALERTS | Toggle on row | Click | Flip boolean; no navigation | Updated switch |

---

### F-ALERT-003 — Delete alert

**ID**: F-ALERT-003  
**Actor**: End user  
**Preconditions**: ≥1 alert.  
**Postconditions**: Row removed.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1a | SCR-ALERTS | Delete | Click | Optional **confirm modal** | On confirm: remove |
| 1b | SCR-ALERTS | Delete | Long-press menu (mobile) | Same | Remove |

---

### F-ALERT-004 — Trigger notification (mock)

**ID**: F-ALERT-004  
**Actor**: System (mock timer or price tick)  
**Preconditions**: Alert enabled; mock price crosses threshold.  
**Postconditions**: User sees in-app notification or toast (**no push** if no backend).

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | (any) | — | Mock price updates | Compare to alert target | Trigger |
| 2 | (any) | Toast / banner | Show | “Alerta ETH: preço acima de X BRL” | Toast visible |
| 3 | SCR-ALERTS | Row | Optional badge “Disparado” | Mark alert as triggered once (implementation choice) | Updated |

---

### F-ALERT-005 — Validation on create

**ID**: F-ALERT-005  
**Actor**: End user  
**Preconditions**: SCR-ALERT-CREATE.  
**Postconditions**: Cannot save invalid.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-ALERT-CREATE | Percentage | Enter `0` or negative | Error “Informe um percentual válido” | Submit disabled |
| 2 | SCR-ALERT-CREATE | Percentage | Enter `101` | Error or clamp per product (**recommend**: max 100) | Blocked |

---

### F-ALERT-006 — Cancel / back from create

**ID**: F-ALERT-006  
**Actor**: End user  
**Preconditions**: SCR-ALERT-CREATE with unsaved fields.  
**Postconditions**: Discard; return to list.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-ALERT-CREATE | Back | Click | Discard draft | SCR-ALERTS |

---

### F-ALERT-007 — Empty alerts list

**ID**: F-ALERT-007  
**Actor**: End user  
**Preconditions**: No alerts.  
**Postconditions**: Empty state with CTA.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-ALERTS | Empty illustration | View | Message + “Criar alerta” | User taps CTA → SCR-ALERT-CREATE |

---

# 6. F-HIST — Transaction history flows (SCR-HISTORY, SCR-TX-DETAIL)

## SCR-HISTORY

**Filters**

| Filter | Type | Behavior |
|--------|------|----------|
| Type | All, Deposit, Withdraw, Convert | Client-side filter on mock list |
| Period | 7d, 30d, 90d, All | Filter by `date >= now − period` |
| Coin | All or specific symbol | Filter |

**List row**: Short summary, amount, coin, status badge, timestamp → navigates to SCR-TX-DETAIL.

## SCR-TX-DETAIL

**Shows**: id, type, coin(s), amounts, fiat equivalent, status (`completed` | `pending` | `failed`), timestamp, optional tx hash (mock string), network (if relevant).

---

### F-HIST-001 — Load history (success)

**ID**: F-HIST-001  
**Actor**: End user  
**Preconditions**: Route `/history`.  
**Postconditions**: List rendered or empty.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HISTORY | — | Enter route | Loading skeleton | Loading |
| 2 | SCR-HISTORY | List | — | Load mock transactions, newest first | Ready |

---

### F-HIST-002 — Apply filters

**ID**: F-HIST-002  
**Actor**: End user  
**Preconditions**: ≥1 transaction.  
**Postconditions**: Filtered subset.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HISTORY | Type filter | Select Withdraw | Filter list | Subset |
| 2 | SCR-HISTORY | Period | Select 7d | Intersect date filter | Subset |
| 3 | SCR-HISTORY | Coin | Select BTC | Intersect | Subset |
| 4 | SCR-HISTORY | Reset filters | Tap “Limpar” | Clear all to defaults | Full list |

---

### F-HIST-003 — Filter produces no results

**ID**: F-HIST-003  
**Actor**: End user  
**Preconditions**: Filters exclude all.  
**Postconditions**: Inline empty message (not SCR-404).

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HISTORY | Filters | Combine to zero rows | Message “Nenhuma transação encontrada” + “Limpar filtros” | Empty filtered state |

---

### F-HIST-004 — Open transaction detail

**ID**: F-HIST-004  
**Actor**: End user  
**Preconditions**: Row visible.  
**Postconditions**: SCR-TX-DETAIL.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HISTORY | Row | Click | Navigate with **tx id** in route query or path | SCR-TX-DETAIL |
| 2 | SCR-TX-DETAIL | Content | View | Load mock detail by id | All fields shown |

---

### F-HIST-005 — Detail: pending / failed states

**ID**: F-HIST-005  
**Actor**: End user  
**Preconditions**: Transaction with status pending or failed exists in mock data.  
**Postconditions**: UI reflects status copy and color.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-TX-DETAIL | Status | View pending | Explain “Em processamento” | — |
| 2 | SCR-TX-DETAIL | Status | View failed | Show “Falhou” + optional mock reason | — |

---

### F-HIST-006 — Invalid tx id

**ID**: F-HIST-006  
**Actor**: End user  
**Preconditions**: Deep link `/tx/unknown-id`.  
**Postconditions**: Error or redirect.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-TX-DETAIL | — | Load | No record | Show inline “Transação não encontrada” + link to history |

---

### F-HIST-007 — Back from detail

**ID**: F-HIST-007  
**Actor**: End user  
**Preconditions**: SCR-TX-DETAIL.  
**Postconditions**: SCR-HISTORY with **filters preserved** (recommended).

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-TX-DETAIL | Back | Click | history.back() | SCR-HISTORY |

---

### F-HIST-008 — History empty (no transactions ever)

**ID**: F-HIST-008  
**Actor**: End user  
**Preconditions**: Mock store has zero transactions.  
**Postconditions**: Empty state component.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HISTORY | Empty | View | “Você ainda não tem transações” + CTA Deposit | Navigate to SCR-DEPOSIT on CTA |

---

# 7. F-SETTINGS — Settings flows (SCR-SETTINGS)

## Form sections

| Section | Fields | Persistence |
|---------|--------|-------------|
| Fiat currency | Select: BRL (default), USD, EUR, … (mock list) | `localStorage` mock user prefs |
| Theme | Dark (default), Light (if implemented) | Same |
| Notifications | Toggles: price alerts, transaction updates | Same |
| Account info | Display name, email (read-only mock strings); optional “Edit” opens non-functional modal or inline | Same |

**Note**: Changing fiat **recomputes** displayed fiat amounts across app using mock rates (no API).

---

### F-SETTINGS-001 — Change fiat currency

**ID**: F-SETTINGS-001  
**Actor**: End user  
**Preconditions**: SCR-SETTINGS.  
**Postconditions**: All screens show amounts in new fiat (via context).

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-SETTINGS | Fiat dropdown | Select USD | Save pref; recompute fiat labels | Toast “Moeda alterada” (optional) |
| 2 | SCR-HOME | Balance | Navigate | Total shown in USD | Consistent |

---

### F-SETTINGS-002 — Toggle theme

**ID**: F-SETTINGS-002  
**Actor**: End user  
**Preconditions**: Theme toggle available.  
**Postconditions**: Root class / CSS variables switch; preference saved.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-SETTINGS | Theme | Switch Light | Apply light theme | UI theme light |

*If only dark is in scope, hide control or show disabled “Em breve”.*

---

### F-SETTINGS-003 — Notification toggles

**ID**: F-SETTINGS-003  
**Actor**: End user  
**Preconditions**: —  
**Postconditions**: Flags saved; mock behavior respects flags (suppress toasts if “transaction updates” off).

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-SETTINGS | Transaction updates | Turn off | Save `notifyTx: false` | Subsequent mock tx toasts suppressed |
| 2 | SCR-SETTINGS | Price alerts | Turn off | Suppress F-ALERT-004 toasts | — |

---

### F-SETTINGS-004 — Account info (read-only)

**ID**: F-SETTINGS-004  
**Actor**: End user  
**Preconditions**: —  
**Postconditions**: No server update.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-SETTINGS | Email row | Tap | Optional: show “Conta demo” tooltip | — |

---

### F-SETTINGS-005 — Back navigation

**ID**: F-SETTINGS-005  
**Actor**: End user  
**Preconditions**: —  
**Postconditions**: Return to previous screen; settings persisted.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-SETTINGS | Back | Click | Navigate back | Prior route |

---

# 8. F-NAV — Navigation flows (sidebar, bottom nav, FAB)

**Assumptions**

- **Desktop**: Persistent **sidebar** with: Dashboard, Convert, Withdraw, Deposit, History, Alerts, Settings (order can match design).
- **Mobile**: **Bottom navigation** with primary destinations (typically 4–5 items); secondary items in “More” or overflow.
- **FAB** (optional): Quick action **Convert** or **Deposit**—behavior below assumes FAB → **Convert** (change in one place if design differs).

---

### F-NAV-001 — Sidebar: navigate between main screens (desktop)

**ID**: F-NAV-001  
**Actor**: End user  
**Preconditions**: Viewport ≥ desktop breakpoint.  
**Postconditions**: Route matches item; active state on sidebar.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | Any | Sidebar “Histórico” | Click | Navigate to `/history` | SCR-HISTORY; item active |
| 2 | Any | Sidebar “Alertas” | Click | Navigate to `/alerts` | SCR-ALERTS |

---

### F-NAV-002 — Bottom navigation (mobile)

**ID**: F-NAV-002  
**Actor**: End user  
**Preconditions**: Mobile viewport.  
**Postconditions**: Tab switches route.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HOME | Bottom tab “Configurações” | Tap | Navigate to settings | SCR-SETTINGS |
| 2 | SCR-SETTINGS | Bottom tab “Início” | Tap | Navigate to dashboard | SCR-HOME |

**Active tab**: Highlight current route; use `aria-current="page"` for a11y.

---

### F-NAV-003 — FAB (if present)

**ID**: F-NAV-003  
**Actor**: End user  
**Preconditions**: FAB visible on dashboard (and optionally other screens).  
**Postconditions**: Target screen opens.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HOME | FAB | Tap | Navigate to `/convert` | SCR-CONVERT |

---

### F-NAV-004 — Deep link / URL entry

**ID**: F-NAV-004  
**Actor**: End user  
**Preconditions**: User types `/alerts/create`.  
**Postconditions**: SCR-ALERT-CREATE renders.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | — | Address bar | Enter URL | Router resolves | SCR-ALERT-CREATE |

---

### F-NAV-005 — Back stack across nav styles

**ID**: F-NAV-005  
**Actor**: End user  
**Preconditions**: Mobile: opened Settings from bottom nav.  
**Postconditions**: Browser back returns to previous **logical** page.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HOME | Nav | Go History | SCR-HISTORY | Stack: Home → History |
| 2 | — | Back | System back | SCR-HOME | — |

---

# 9. F-ERROR — Global error handling flows

### F-ERROR-001 — Dashboard / section fetch failure

**ID**: F-ERROR-001  
**Actor**: End user  
**Preconditions**: Mock API rejects.  
**Postconditions**: User can retry.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HOME | Error panel | View | Message + **Retry** | Error |
| 2 | SCR-HOME | Retry | Click | Reload mock | Loading → success or error |

---

### F-ERROR-002 — Global offline (optional)

**ID**: F-ERROR-002  
**Actor**: End user  
**Preconditions**: `navigator.onLine === false`.  
**Postconditions**: Banner visible.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | Any | Top banner | Auto | “Sem conexão” | App still usable with cached mock (implementation choice) |

---

### F-ERROR-003 — Unhandled route → SCR-404

**ID**: F-ERROR-003  
**Actor**: End user  
**Preconditions**: Unknown path.  
**Postconditions**: SCR-404.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-404 | Link “Ir para início” | Click | Navigate `/dashboard` | SCR-HOME |

---

### F-ERROR-004 — Toast queue / duplicate errors

**ID**: F-ERROR-004  
**Actor**: End user  
**Preconditions**: Multiple failures.  
**Postconditions**: Max N visible toasts or single consolidated message (recommend **replace** last error toast).

---

# 10. F-EMPTY — Empty state flows per screen

| Screen | Empty scenario | Primary CTA | Target |
|--------|----------------|-------------|--------|
| SCR-HOME (SCR-EMPTY) | No balances / no coins | Deposit | SCR-DEPOSIT |
| SCR-CONVERT | N/A for list; if **zero balance everywhere**, block with message + CTA Deposit | Deposit | SCR-DEPOSIT |
| SCR-WITHDRAW | Zero balance selected coin | Deposit / change coin | — |
| SCR-DEPOSIT | N/A (always show address); optional **maintenance** empty | — | — |
| SCR-HISTORY | No transactions | Deposit | SCR-DEPOSIT |
| SCR-TX-DETAIL | Invalid id | Back to history | SCR-HISTORY |
| SCR-ALERTS | No alerts | Create alert | SCR-ALERT-CREATE |
| SCR-ALERT-CREATE | N/A | — | — |
| SCR-SETTINGS | N/A | — | — |

---

### F-EMPTY-001 — Dashboard empty (SCR-EMPTY)

**ID**: F-EMPTY-001  
**Actor**: End user  
**Preconditions**: Mock portfolio empty.  
**Postconditions**: User guided to deposit.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-HOME | SCR-EMPTY block | View | Illustration + copy | — |
| 2 | SCR-EMPTY | CTA | Click | Navigate | SCR-DEPOSIT |

---

### F-EMPTY-002 — History empty (global)

**ID**: F-EMPTY-002  
**Actor**: End user  
**Preconditions**: No tx in mock.  
**Postconditions**: Same as F-HIST-008.

---

### F-EMPTY-003 — Alerts empty

**ID**: F-EMPTY-003  
**Actor**: End user  
**Preconditions**: No alerts.  
**Postconditions**: Same as F-ALERT-007.

---

### F-EMPTY-004 — Filtered history empty (not global)

**ID**: F-EMPTY-004  
**Actor**: End user  
**Preconditions**: Transactions exist but filters hide all.  
**Postconditions**: Distinguish copy from “never had transactions” (see F-HIST-003).

---

### F-EMPTY-005 — Convert with no balance in any coin

**ID**: F-EMPTY-005  
**Actor**: End user  
**Preconditions**: All balances zero.  
**Postconditions**: Banner on SCR-CONVERT.

| Step | Screen | UI element | Action | System behavior | Resulting state |
|------|--------|------------|--------|-----------------|-----------------|
| 1 | SCR-CONVERT | Banner | View | “Você precisa de saldo para converter” + CTA Deposit | CTA → SCR-DEPOSIT |

---

### F-EMPTY-006 — Search on dashboard: no matches

**ID**: F-EMPTY-006  
**Actor**: End user  
**Preconditions**: F-DASH-003 3a.  
**Postconditions**: Inline empty search state (not SCR-404).

---

## Appendix A — Route map (illustrative)

| Route | Screen |
|-------|--------|
| `/` or `/dashboard` | SCR-HOME |
| `/convert` | SCR-CONVERT |
| `/withdraw` | SCR-WITHDRAW |
| `/deposit` | SCR-DEPOSIT |
| `/history` | SCR-HISTORY |
| `/tx/:id` | SCR-TX-DETAIL |
| `/alerts` | SCR-ALERTS |
| `/alerts/create` | SCR-ALERT-CREATE |
| `/settings` | SCR-SETTINGS |
| `*` | SCR-404 |

---

## Appendix B — Transaction types (mock store)

| type | Used in |
|------|---------|
| `deposit` | Optional mock credits |
| `withdraw` | F-SAQUE crypto |
| `withdraw_fiat` | F-SAQUE fiat |
| `convert` | F-CONV |

Each record: `id`, `type`, `timestamp`, `status`, amounts, `coin(s)`, `fiatAtTime`, optional `hash`, `network`.

---

## Appendix C — Notification matrix (mock)

| Event | Respect setting | Surface |
|-------|-----------------|--------|
| Price alert trigger | Price alerts ON | Toast |
| Mock tx completed | Transaction updates ON | Toast |
| Settings OFF | — | Suppress |

---

*End of detailed flows. This document is intended to be sufficient for implementation without further product clarification; engineering decisions explicitly left open (exact routes, theme light mode, FAB target) should be fixed once in a shared config and kept consistent with this behavior.*
