# Final Implementation Specs — CryptoFolio (Hephaestus)

Poseidon: use this as the single source for routes, trees, columns, fields, and states. **Data entities** are consistent across screens.

### Global entities (field names)

- **User:** `id`, `fullName`, `email`, `avatarUrl?`, `createdAt`
- **Asset (holding):** `coinId`, `symbol`, `name`, `iconUrl`, `quantity`, `priceBrl`, `valueBrl`, `change24hPct`
- **Transaction:** `id`, `type` (`deposit`|`convert`|`withdraw`), `status` (`pending`|`processing`|`confirmed`|`failed`|`cancelled`), `amount`, `amountBrl?`, `fromSymbol?`, `toSymbol?`, `fee?`, `netAmount?`, `destinationSummary?`, `txHash?`, `createdAt`, `updatedAt`
- **PriceAlert:** `id`, `coinId`, `direction` (`above`|`below`), `targetPriceBrl`, `createdAt`, `triggeredAt?`
- **BankAccount:** `id`, `bankCode`, `bankName`, `agency`, `accountNumber`, `accountType` (`checking`|`savings`), `pixKey`, `createdAt`
- **DepositAddress:** `coinId`, `network`, `address`, `qrCodeDataUrl?`

---

## 1. SCR-LANDING — Landing

| | |
|---|---|
| **Route** | `/` |
| **Auth** | Public |
| **Layout** | Full viewport, no app shell. Sticky header + stacked sections + footer. |
| **Regions** | Header · Hero · Features grid · How it works · Final CTA · Footer |

**Component tree**

- `LandingHeader` (logo, anchor links Recursos / Como funciona, `Button` outline Entrar, `Button` primary Criar conta)
- `Hero` (h1, lead paragraph, primary CTA → `/signup`)
- `FeatureGrid` (3 × icon + title + description)
- `Steps` (3 numbered steps)
- `ClosingCta`
- `LandingFooter` (Termos, Privacidade, Suporte, ©)

**Forms** | None.

**Tables** | None.

**States**

- **Loading:** N/A (static); optional lazy images skeleton
- **Empty:** N/A
- **Error:** N/A

**Desktop vs mobile**

- Desktop: `grid-cols-3` features; header links visible.
- Mobile: hamburger or collapsed links per implementation; stack sections full-width; touch-friendly CTAs.

---

## 2. SCR-AUTH-LOGIN — Login

| | |
|---|---|
| **Route** | `/login` |
| **Auth** | Public (redirect to `/app/dashboard` if session) |

**Layout:** `min-h-screen flex items-center justify-center bg-background p-4`

**Component tree**

- `Card` (`rounded-2xl`, `p-8`, `max-w-[420px] w-full`)
  - Logo
  - `h2` + subtitle
  - `Form`: `email`, `password` (with show/hide), `Link` Esqueceu a senha? → `/forgot-password`
  - `Button` primary Entrar (`type="submit"`)
  - Footer link → `/signup`

**Form fields & validation**

| Field | Name attr | Rules | Error messages |
|-------|-----------|--------|----------------|
| Email | `email` | required, email format | "Email inválido" |
| Password | `password` | required, min 1 | "Senha obrigatória" |

**Submit:** loading "Entrando..."; failure: generic "Email ou senha incorretos"; rate limit copy per detailed-flows.

**States**

- **Loading:** button spinner, disabled inputs
- **Empty:** default
- **Error:** inline auth error + optional toast on 500

**Desktop vs mobile** | Same card; full-width button always.

---

## 3. SCR-AUTH-SIGNUP — Signup

| | |
|---|---|
| **Route** | `/signup` |

**Component tree** | Same shell as login: `Card` with `fullName`, `email`, `password` + `PasswordStrengthBar`, `confirmPassword`, submit "Criar conta", link "Já tem conta? Entrar".

**Form fields & validation**

| Field | Name | Rules |
|-------|------|--------|
| fullName | `fullName` | required, min 2 — "Nome é obrigatório" / "Nome muito curto" |
| email | `email` | required, valid email |
| password | `password` | min 8, 1 uppercase, 1 number |
| confirmPassword | `confirmPassword` | must match password |

**States** | Loading "Criando conta..."; duplicate email inline; network toast.

**Desktop vs mobile** | Identical logic; strength bar full width.

---

## 4. SCR-AUTH-FORGOT — Forgot Password

| | |
|---|---|
| **Route** | `/forgot-password` |

**Component tree** | `Card`: `email`, submit "Enviar link", back link → `/login`. **Success state** replaces form: `CheckCircle` success color, title "Link enviado!", text, `Button` → `/login`.

**Form fields** | `email` — required, email format.

**States** | Loading on submit; success panel (always show generic security message option per DF-AUTH-003).

**Desktop vs mobile** | Same.

---

## 5. SCR-AUTH-RESET — Reset Password

| | |
|---|---|
| **Route** | `/reset-password/:token` |
| **Params** | `token` (string) |

**Component tree** | On valid token: `Card` with `newPassword`, `confirmNewPassword`, `PasswordStrengthBar`, submit "Redefinir senha". **Invalid/expired:** icon `AlertCircle` destructive, copy + `Button` → `/forgot-password`.

**Validation** | Same rules as signup password; confirm match.

**States** | Validating token (skeleton/spinner); error state; success → redirect `/login` + toast.

**Desktop vs mobile** | Same.

---

## 6. SCR-DASHBOARD — Dashboard

| | |
|---|---|
| **Route** | `/app/dashboard` |
| **Layout** | App shell: `Sidebar` + main `p-6 max-w-7xl mx-auto` |

**Component tree**

- `PageHeader` title "Dashboard"
- `PortfolioBalanceCard` — labels `totalValueBrl`, `change24hPct`
- `QuickActions` — Depositar → `/app/deposit`, Converter → `/app/convert`, Sacar → `/app/withdraw`
- `PortfolioChart` — periods `7d`|`30d`|`90d`, series keyed by date + `valueBrl`
- `SearchInput` — filters local asset list, debounce 300ms, placeholder "Buscar ativo..."
- `AssetTableOrCards` — rows navigate to `/app/wallet/:coinId`
- `RecentTransactions` — link "Ver todas" → `/app/history`

**Table — Asset list (desktop)**

| Column | Source field(s) |
|--------|-----------------|
| Ativo | `iconUrl`, `name`, `symbol` |
| Preço | `priceBrl` (formatted BRL) |
| Quantidade | `quantity` |
| Valor | `valueBrl` |
| 24h | `change24hPct` (color success/destructive) |

**Mobile:** card stack; same fields, two-line layout.

**Table — Recent transactions (desktop)**

| Column | Source |
|--------|--------|
| Tipo | `type` → icon + label |
| Descrição | derived from `type` + symbols |
| Valor | `amount` / `amountBrl` |
| Status | `status` → `StatusBadge` |
| Data | `createdAt` |

**States**

- **Loading:** skeleton balance, chart block, 3 table rows, 3 transaction rows
- **Empty portfolio:** balance `R$ 0,00`; chart hidden; asset `EmptyState` CTA Depositar; transactions empty copy
- **Error:** full-page error + retry fetching `GET /portfolio` (conceptual)

**Desktop vs mobile** | Table vs cards; chart height; optional bottom tab bar on mobile.

---

## 7. SCR-WALLET — Wallet

| | |
|---|---|
| **Route** | `/app/wallet` |

**Component tree**

- `PageHeader` "Carteira" + total `sum(valueBrl)` as subtitle
- `Toolbar`: `SearchInput` (`w-full` mobile / `w-64` desktop), `SortSelect`
- `AssetTableOrCards`

**Sort options (value)** | `value_desc` \| `value_asc` \| `name_asc` \| `change24h_desc`

**Table — desktop**

| Column | Fields |
|--------|--------|
| Ativo | `iconUrl`, `name`, `symbol` |
| Quantidade | `quantity` |
| Preço Atual | `priceBrl` |
| Valor Total | `valueBrl` |
| Variação 24h | `change24hPct` |

**States** | Loading skeleton rows; empty "Nenhum ativo na carteira"; filtered empty message with query; error + retry.

**Desktop vs mobile** | Table vs cards; row/tap → detail.

---

## 8. SCR-WALLET-DETAIL — Wallet Detail

| | |
|---|---|
| **Route** | `/app/wallet/:coinId` |

**Component tree**

- `Breadcrumb` Carteira > {name}
- `AssetHeaderCard` — `iconUrl`, `name`, `symbol`, `priceBrl`, `change24hPct` badge
- `Actions` — Depositar (preselect `coinId`), Converter (preselect from), Sacar (preselect)
- `BalanceCard` — `quantity`, `valueBrl`
- `PortfolioChart` — periods `7d`|`30d`|`90d`|`1y`
- `TransactionSection` — table/cards + "Mostrar mais"

**Table — transactions for coin**

| Column | Fields |
|--------|--------|
| Tipo | `type` |
| Valor | `amount` + symbol |
| Status | `status` |
| Data | `createdAt` |

**States** | Invalid `coinId` → SCR-404; loading skeletons; empty transaction state.

**Desktop vs mobile** | Table vs cards; breadcrumb collapses to back on mobile app bar.

---

## 9. SCR-DEPOSIT — Deposit

| | |
|---|---|
| **Route** | `/app/deposit` |
| **Query** | `?coinId=` optional preselect |

**Component tree**

- `PageHeader` "Depositar"
- `Card` `max-w-lg mx-auto`: `CoinSelector`, `QRCodeDisplay` (`address`, `network`, `coinId`), warning banner
- `DepositHistorySection`

**Form fields** | `CoinSelector` only on page (not a classic form submit).

**Table — Histórico de Depósitos**

| Column | Fields |
|--------|--------|
| Moeda | `symbol` / `name` |
| Valor | `amount` |
| Status | `status` |
| Data | `createdAt` |

**States** | Address loading skeleton; error generating address inline + retry; empty history.

**Desktop vs mobile** | QR smaller on mobile; copy full-width.

---

## 10. SCR-DEPOSIT-SUCCESS — Deposit success (modal / sheet)

| | |
|---|---|
| **Trigger** | After on-chain confirmation detected / mock success |
| **Portal** | `createPortal` — Dialog `lg+`, Sheet `<lg` |

**Component tree** | `SuccessModalBody`: animated check, title e.g. "Depósito de {amount} {symbol} confirmado!", details list (`label`/`value` rows), `Button` outline "Baixar Recibo", primary "Voltar ao Dashboard" → `/app/dashboard`.

**Details rows (typical)** | Moeda, Valor, Rede, Endereço (truncated), Data, Status.

**States** | Single success view; downloading state on receipt button.

**Desktop vs mobile** | Centered `max-w-md` vs bottom sheet 70% snap.

---

## 11. SCR-CONVERT — Convert

| | |
|---|---|
| **Route** | `/app/convert` |
| **Query** | `?from=` optional |

**Component tree**

- `PageHeader` "Converter"
- `Card` `max-w-lg mx-auto`:
  - From: `CoinSelector` (`fromCoinId`), balance text, `AmountInput` (`amountFrom`), "Usar máximo"
  - `SwapButton` swaps `fromCoinId` ↔ `toCoinId`
  - To: `CoinSelector` (`toCoinId`), read-only preview `amountToEstimate`
  - Rate panel: rate string, `feePct`, `feeBrlEstimate`
  - Submit "Converter" → opens **MDL-ConvertConfirm** (not a separate numbered screen)

**Form fields & validation**

| Field | Name | Rules |
|-------|------|--------|
| fromCoinId | `fromCoinId` | required |
| toCoinId | `toCoinId` | required, ≠ from |
| amountFrom | `amountFrom` | required, >0, ≤ available balance, ≥ min |

**Table — Histórico de Conversões**

| Column | Fields |
|--------|--------|
| De | `fromSymbol`, `amountFrom` |
| Para | `toSymbol`, `amountTo` |
| Taxa | `rate` or `feePct` display |
| Status | `status` |
| Data | `createdAt` |

**States** | Debounced preview 500ms; inline errors; loading history.

**Desktop vs mobile** | Same fields; bottom confirm sheet on mobile.

---

## 12. SCR-CONVERT-SUCCESS — Convert success (modal / sheet)

**Trigger** | After successful API on confirm.

**Content** | Title "Conversão realizada com sucesso!"; details: De, Para, Taxa, Fee, Timestamp; "Baixar Recibo"; "Nova conversão" closes + resets form.

**Desktop vs mobile** | Dialog vs sheet per §11 pattern.

---

## 13. SCR-WITHDRAW — Withdraw

| | |
|---|---|
| **Route** | `/app/withdraw` |
| **Query** | `?coinId=` |

**Component tree**

- `PageHeader` "Sacar"
- `Card` `max-w-lg mx-auto`:
  - `CoinSelector` (includes BRL)
  - If crypto: `destinationAddress` text input
  - If BRL: `BankAccountSelect` + link `/app/settings/bank-accounts`
  - `AmountInput` + max
  - `FeeSummaryCard` (network fee, net, ETA)
  - Submit "Sacar" → **MDL-WithdrawConfirm**

**Form fields & validation**

| Field | Rules |
|-------|--------|
| coinId | required |
| destinationAddress | required if crypto; validate format per coin |
| bankAccountId | required if BRL |
| amount | required, ≤ balance, ≥ min |

**Table — Histórico de Saques**

| Column | Fields |
|--------|--------|
| Moeda | `symbol` |
| Valor | `amount` |
| Destino | masked address or `bankName` |
| Status | `status` |
| Data | `createdAt` |

**States** | Same as convert for errors/loading/empty.

**Desktop vs mobile** | Full-width inputs mobile; confirm sheet mobile.

---

## 14. SCR-WITHDRAW-SUCCESS — Withdraw success (modal / sheet)

**Content** | Check icon; title; details: Moeda, Valor, Destino, Fee, Líquido, ETA; receipt + primary navigation (e.g. Dashboard).

---

## 15. SCR-ALERTS — Alerts

| | |
|---|---|
| **Route** | `/app/alerts` |

**Component tree**

- `PageHeader` "Alertas" + `Button` primary "+ Novo Alerta" → opens SCR-ALERT-CREATE
- `AlertGrid` (`PriceAlertCard` × n)
- `TriggeredAlertsTableSection`

**Table — Alertas disparados**

| Column | Fields |
|--------|--------|
| Moeda | `symbol` |
| Tipo | `direction` |
| Valor Alvo | `targetPriceBrl` |
| Preço no Disparo | `priceAtTrigger` |
| Data | `triggeredAt` |

**States** | Empty active alerts CTA; empty triggered table.

**Desktop vs mobile** | Grid 2 cols desktop, 1 col mobile; cards may use overflow menu on mobile.

---

## 16. SCR-ALERT-CREATE — Alert Create (modal / sheet)

**Fields**

| Field | Name | Rules |
|-------|------|--------|
| coinId | `coinId` | required |
| direction | `direction` | `above` \| `below` |
| targetPriceBrl | `targetPriceBrl` | required, >0, numeric |

**Footer** | Cancelar | Criar / Salvar (edit mode)

**Reference text** | "Preço atual: R$ …" (`currentPriceBrl` from API)

**Desktop vs mobile** | Dialog `max-w-md` vs sheet 70%.

---

## 17. SCR-HISTORY — History

| | |
|---|---|
| **Route** | `/app/history` |

**Component tree**

- `PageHeader` "Histórico" + `Button` outline "Exportar CSV"
- Filters: `typeTabs`, `coinFilter`, `periodFilter`, `statusFilter` — on mobile, chips open `FilterSheet` with identical options
- `TransactionTableOrCards`
- `LoadMoreButton`

**Table — desktop**

| Column | Fields |
|--------|--------|
| Tipo | `type` + icon |
| Ativo | primary symbol(s) |
| Valor | `amount` / `amountBrl` |
| Status | `status` |
| Data | `createdAt` |

Sort: default `createdAt desc`; optional `amount` sort.

**States** | Loading; empty; filtered empty + clear; export loading/error toast.

**Desktop vs mobile** | Table vs cards; filter UI differs, data same.

---

## 18. SCR-HISTORY-DETAIL — History Detail (modal / sheet)

**Content** | Title "Detalhes da transação"; top: type label + `StatusBadge`; details: Tipo, Moeda(s), Valor, Fee, Líquido, timeline (Iniciado → Processando → Confirmado), `createdAt`, optional `txHash` + copy.

**Footer** | "Baixar Recibo" outline, "Fechar" ghost.

**Desktop vs mobile** | `max-w-md` dialog vs 80% sheet.

---

## 19. SCR-SETTINGS — Settings hub

| | |
|---|---|
| **Route** | `/app/settings` |

**Component tree**

- `PageHeader` "Configurações"
- Desktop: `SettingsSideNav` (`w-56`) + empty state or welcome copy / redirect to first child (implementation choice—**prefer default redirect to profile**)
- Mobile: list `SettingsListItem` rows → routes below

**Nav targets** | `/app/settings/profile`, `/security`, `/notifications`, `/bank-accounts`, `/preferences`

**Tables / Forms** | None at hub.

**States** | N/A

**Desktop vs mobile** | Two-column vs single column list.

---

## 20. SCR-SET-PROFILE — Profile

| | |
|---|---|
| **Route** | `/app/settings/profile` |

**Layout** | Settings layout wrapper (nav + content).

**Component tree** | `h2` "Perfil", `AvatarUpload` (`avatarUrl`, `onUpload`), `Form`.

**Form fields**

| Field | Name | Rules |
|-------|------|--------|
| fullName | `fullName` | required, min 2 |
| email | — | read-only display `user.email` |

Submit "Salvar alterações" disabled until dirty + valid.

**States** | Loading user; save loading; toast success/error.

**Desktop vs mobile** | `max-w-md` form width.

---

## 21. SCR-SET-SECURITY — Security

| | |
|---|---|
| **Route** | `/app/settings/security` |

**Form fields**

| Field | Rules |
|-------|--------|
| currentPassword | required |
| newPassword | strength rules match signup |
| confirmNewPassword | match |

Submit "Alterar senha"; strength bar on new password.

**States** | Wrong current password inline; success toast + clear fields.

---

## 22. SCR-SET-NOTIF — Notifications

| | |
|---|---|
| **Route** | `/app/settings/notifications` |

**Component tree** | `h2` + list of `ToggleRow`:

| Setting key | Label |
|-------------|--------|
| `inAppPriceAlerts` | Alertas de preço (in-app) |
| `emailPriceAlerts` | Alertas de preço (email) |
| `emailTxConfirmations` | Confirmações de transação (email) |
| `newsletter` | Newsletter e novidades |

Persist per toggle change (optimistic + rollback).

**States** | Loading preferences skeleton; error toast.

---

## 23. SCR-SET-BANKS — Bank Accounts

| | |
|---|---|
| **Route** | `/app/settings/bank-accounts` |

**Component tree**

- `PageHeader` "Contas Bancárias" + `Button` "+ Adicionar conta" → **MDL-AddBankAccount** (portal)
- `BankAccountCard` list

**Table** | None; card list shows `bankName`, `agency`, masked `accountNumber`, `pixKey`.

**MDL-AddBankAccount form**

| Field | Name | Rules |
|-------|------|--------|
| Banco | `bankCode` | required (select) |
| Agência | `agency` | required, 4 digits |
| Conta | `accountNumber` | required |
| Tipo | `accountType` | `checking` \| `savings` |
| Chave PIX | `pixKey` | required |

**States** | Empty list CTA; delete confirm **MDL-DeleteConfirm**; swipe optional mobile.

---

## 24. SCR-SET-PREFS — Preferences

| | |
|---|---|
| **Route** | `/app/settings/preferences` |

**Controls**

| Key | UI | Values |
|-----|-----|--------|
| `theme` | Segmented / toggle | `dark` \| `light` |
| `defaultFiat` | Select | `BRL` \| `USD` |

**States** | Apply theme immediately; persist to API/local.

---

## 25. SCR-SUPPORT — Support

| | |
|---|---|
| **Route** | `/app/support` |

**Component tree**

- `PageHeader` "Central de Ajuda"
- `SearchInput` "Buscar na central de ajuda..." (filters accordion items client-side)
- `FAQAccordion` sections: Conta, Depósitos, Conversões, Saques, Alertas, Segurança
- `ContactCard` email + `Button` outline mailto

**Forms** | None.

**Tables** | None.

**States** | No results search message.

**Desktop vs mobile** | Full width accordion; min tap height 44px.

---

## 26. SCR-404 — Not Found

| | |
|---|---|
| **Route** | `/*` (catch-all) |

**Component tree** | Centered stack: large "404", h2 "Página não encontrada", explanation, `Button` primary "Voltar ao Dashboard" → `/app/dashboard` (or `/` if guest).

**States** | N/A

**Desktop vs mobile** | Same content.

---

## Overlay reference — Confirmations (within Convert / Withdraw)

### MDL-ConvertConfirm

- Title "Confirmar conversão"
- Body: from/to rows + Taxa + Fee + líquido
- Footer: Cancelar ghost, Confirmar primary → loading "Processando..."

### MDL-WithdrawConfirm

- Title "Confirmar saque"
- Destino summary + fee + líquido + ETA
- Warning destructive: "Esta ação não pode ser desfeita."
- Footer: Cancelar, Confirmar primary

### MDL-DeleteConfirm

- Title "Excluir {entity}?"
- Destructive confirm button
- Used for alerts + bank accounts

---

## App shell (authenticated pages)

**Component tree**

- `Sidebar` (desktop) / `Sheet` drawer (mobile trigger in `MobileAppBar`)
- `main` `flex-1` with `Outlet`
- Optional `BottomTabBar` (mobile): Dashboard, Carteira, Converter (per Artemis—keep consistent with IA)

**Navigation labels (PT-BR)** | Dashboard, Carteira, Depositar, Converter, Sacar, Alertas, Histórico, Configurações, Suporte.

---

_End of final specs — 26 screens + confirmation overlays documented._
