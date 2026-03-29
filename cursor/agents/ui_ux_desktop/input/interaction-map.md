# Interaction Map — CryptoFolio

## Conventions

- Every screen from sitemap is documented — no omissions
- Components listed with specific behaviors, states, and events
- Flow references link to `detailed-flows.md`

---

## S-LANDING: Landing Page

**Route**: `/`
**Purpose**: Apresentar o CryptoFolio e converter visitantes em usuários.

### Content Blocks

- **Header**: Logo CryptoFolio (left), nav links "Recursos" "Como funciona" (center), "Entrar" (ghost button) + "Criar conta" (primary button) (right)
- **Hero Section**: Background gradient dark, headline (h1 `text-4xl font-bold text-foreground`), sub-headline (`text-xl text-muted-foreground`), CTA button (primary, large)
- **Features Section**: 3 cards in grid, each: icon (`w-12 h-12 text-primary`), title (`text-lg font-semibold`), description (`text-muted-foreground`)
- **How it Works**: 3 numbered steps with icons/illustrations
- **Final CTA**: centered section, headline + CTA button
- **Footer**: links in `text-muted-foreground`, divider, copyright

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `NavButton("Entrar")` | Navigate to S-AUTH-LOGIN | default, hover | click |
| `NavButton("Criar conta")` | Navigate to S-AUTH-SIGNUP | default, hover | click |
| `HeroCTA("Criar conta grátis")` | Navigate to S-AUTH-SIGNUP | default, hover | click |
| `FeatureCard` x3 | Display only | — | — |
| `FooterLink("Termos")` | Open terms (new tab or page) | default, hover | click |
| `FooterLink("Privacidade")` | Open privacy (new tab or page) | default, hover | click |

### Linked Flows: DF-LANDING-001

---

## S-AUTH-LOGIN: Login

**Route**: `/login`
**Purpose**: Autenticar usuário existente.

### Content Blocks

- **Card** centered: logo, title "Entrar na sua conta", form, links
- **Background**: dark, maybe subtle gradient

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `EmailInput` | Email field | empty, filled, error ("Email ou senha incorretos") | change, blur |
| `PasswordInput` | Password field with show/hide toggle | empty, filled, error | change, blur |
| `ShowPasswordToggle` | Toggle password visibility | visible (eye), hidden (eye-off) | click |
| `SubmitButton("Entrar")` | Submit login | default, loading (spinner + "Entrando..."), disabled | click |
| `ForgotPasswordLink` | Navigate to S-AUTH-FORGOT | default, hover | click |
| `SignupLink("Criar conta")` | Navigate to S-AUTH-SIGNUP | default, hover | click |

### States

- **Default**: empty form
- **Loading**: button spinner, inputs disabled
- **Error (credentials)**: inline error below form "Email ou senha incorretos"
- **Error (rate limit)**: message with countdown timer

### Linked Flows: DF-AUTH-002

---

## S-AUTH-SIGNUP: Cadastro

**Route**: `/signup`
**Purpose**: Criar nova conta.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `NameInput` | Text, min 2 chars | empty, filled, error | change, blur |
| `EmailInput` | Email format | empty, filled, error ("Email já cadastrado") | change, blur |
| `PasswordInput` | Min 8 chars, 1 upper, 1 number | empty, filled, weak, strong, error | change, blur |
| `PasswordStrengthBar` | Visual indicator | red, yellow, green | — |
| `ConfirmPasswordInput` | Must match password | empty, filled, error ("Senhas não coincidem") | change, blur |
| `SubmitButton("Criar conta")` | Submit registration | default, disabled (incomplete), loading | click |
| `LoginLink("Já tenho conta")` | Navigate to S-AUTH-LOGIN | default, hover | click |

### Linked Flows: DF-AUTH-001

---

## S-AUTH-FORGOT: Recuperar Senha

**Route**: `/forgot-password`
**Purpose**: Solicitar link de recuperação de senha.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `EmailInput` | Email field | empty, filled | change, blur |
| `SubmitButton("Enviar link")` | Request reset | default, loading, disabled | click |
| `BackToLoginLink` | Navigate to S-AUTH-LOGIN | default, hover | click |
| `SuccessMessage` | Shown after submit | hidden, visible | — |

### Linked Flows: DF-AUTH-003

---

## S-AUTH-RESET: Nova Senha

**Route**: `/reset-password/:token`
**Purpose**: Definir nova senha via token.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `NewPasswordInput` | Same rules as signup | empty, filled, error | change, blur |
| `ConfirmPasswordInput` | Must match | empty, filled, error | change, blur |
| `SubmitButton("Redefinir senha")` | Submit new password | default, loading, disabled | click |
| `TokenExpiredMessage` | Shown if token invalid | hidden, visible | — |
| `RequestNewLinkButton` | Navigate to S-AUTH-FORGOT | default, hover | click |

### Linked Flows: DF-AUTH-004

---

## S-DASH: Dashboard / Home

**Route**: `/app/dashboard`
**Purpose**: Visão rápida do portfólio, saldos, e acesso às ações principais.

### Content Blocks

- **Portfolio Balance Card**: total em BRL, variação 24h
- **Quick Actions Row**: 3 action buttons
- **Portfolio Chart**: line chart with period selector
- **Search Bar**: filtrar ativos
- **Asset List**: tabela/cards de ativos
- **Recent Transactions**: mini-lista

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `PortfolioBalanceCard` | Shows total BRL value + 24h change | loading (skeleton), empty (R$ 0,00), data | — |
| `ChangeIndicator` | +X.X% or -X.X% | positive (green), negative (red), zero (gray) | — |
| `QuickActionButton("Depositar")` | Navigate to S-DEP | default, hover | click |
| `QuickActionButton("Converter")` | Navigate to S-CONV | default, hover | click |
| `QuickActionButton("Sacar")` | Navigate to S-SAQUE | default, hover | click |
| `PortfolioChart` | Line chart 7d/30d/90d | loading (skeleton), data, empty (hidden) | period change |
| `PeriodSelector` | Tab buttons | 7d (default), 30d, 90d — active highlighted | click |
| `AssetSearchInput` | Filter asset list | empty (placeholder), typing, no-results | change (debounce 300ms) |
| `AssetListTable` (desktop) | Table of assets | loading (skeleton rows), data, empty state | row click → S-WALL-DETAIL |
| `AssetListCards` (mobile) | Cards of assets | loading (skeleton), data, empty state | tap → S-WALL-DETAIL |
| `AssetRow/Card` | Single asset | hover (bg-accent/20) | click |
| `RecentTransactionsList` | Mini-table of 5 recent | loading, data, empty | row click → S-HIST-DETAIL |
| `ViewAllTransactionsLink` | Navigate to S-HIST | default, hover | click |

### Empty State (no assets)

- Icon: Wallet outline (64px, `text-muted-foreground`)
- Title: "Seu portfólio está vazio"
- Description: "Deposite sua primeira criptomoeda para começar a acompanhar."
- CTA: "Fazer primeiro depósito" → S-DEP

### Linked Flows: DF-DASH-001

---

## S-WALL: Carteira

**Route**: `/app/wallet`
**Purpose**: Ver todos os ativos do portfólio com detalhes.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `TotalBalanceDisplay` | Shows total portfolio value | loading, data | — |
| `SortDropdown` | Sort assets | options: Maior valor, Menor valor, Nome A-Z, Maior variação | change |
| `SearchInput` | Filter by name/symbol | empty, typing, no-results | change (debounce) |
| `AssetTable` (desktop) | Full asset table | loading (6 skeleton rows), data, empty | sort, row click |
| `AssetCards` (mobile) | Asset cards | loading (skeletons), data, empty | tap |
| Table columns | Ativo (icon+name+symbol), Quantidade, Preço Atual, Valor Total, Variação 24h, → | sortable: Valor, Variação | — |

### Empty State

- Icon: Coins outline
- Title: "Nenhum ativo na carteira"
- Description: "Faça seu primeiro depósito para começar."
- CTA: "Depositar" → S-DEP

### Linked Flows: DF-WALL-001

---

## S-WALL-DETAIL: Detalhe do Ativo

**Route**: `/app/wallet/:coinId`
**Purpose**: Ver detalhes e histórico de uma moeda específica.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `CoinHeader` | Icon + name + symbol + price + 24h change | loading, data | — |
| `UserBalanceCard` | "Seu saldo: X.XX COIN ≈ R$ X,XX" | loading, data | — |
| `ActionButton("Depositar")` | → S-DEP (pre-select coin) | default, hover | click |
| `ActionButton("Converter")` | → S-CONV (pre-select from) | default, hover | click |
| `ActionButton("Sacar")` | → S-SAQUE (pre-select coin) | default, hover | click |
| `PriceChart` | Line chart with period tabs | loading, data | period change |
| `PeriodTabs` | 7d / 30d / 90d / 1y | active state | click |
| `TransactionTable` (desktop) | Coin-specific transactions | loading, data, empty | row click |
| `TransactionCards` (mobile) | Same data as cards | loading, data, empty | tap |
| `LoadMoreButton` | Load next 10 transactions | default, loading, hidden (no more) | click |

### Empty State (no transactions for this coin)

- "Nenhuma transação com {coinName}"
- CTA: "Depositar {coinSymbol}" → S-DEP

### Linked Flows: DF-WALL-002

---

## S-DEP: Depósito

**Route**: `/app/deposit`
**Purpose**: Receber criptomoeda via endereço de carteira.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `CoinSelector` | Dropdown with coin icons | pre-selected or empty, open, closed | change |
| `QRCodeDisplay` | QR code of deposit address | loading (skeleton), generated, error | — |
| `AddressDisplay` | Monospace address text | loading, visible, copied | — |
| `CopyButton("Copiar endereço")` | Copy to clipboard | default, copied ("Copiado!") → revert after 3s | click |
| `WarningBanner` | "Envie apenas {coin}..." | always visible when coin selected | — |
| `DepositHistoryTable` (desktop) | Deposit history | loading, data, empty | row click |
| `DepositHistoryCards` (mobile) | Same | loading, data, empty | tap |
| `StatusBadge` | pending (yellow), confirmed (green), failed (red) | — | — |

### Modals

- **S-DEP-SUCCESS**: Green check, "Depósito de X.XX {COIN} confirmado!", summary, "Voltar ao Dashboard" (primary)

### Empty State (no deposits)

- "Nenhum depósito realizado"
- "Envie criptomoedas para o endereço acima para começar"

### Linked Flows: DF-DEP-001

---

## S-CONV: Conversão

**Route**: `/app/convert`
**Purpose**: Converter uma moeda por outra.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `FromCoinSelector` | Dropdown + balance display | pre-selected or empty | change |
| `FromAmountInput` | Large font number input | empty, filled, error (insufficient) | change (debounce 500ms) |
| `AvailableBalanceText` | "Saldo disponível: X.XX" | — | — |
| `UseMaxLink` | Fill amount with max balance | default, hover | click |
| `SwapButton` | Swap from/to coins | default, hover, animating | click |
| `ToCoinSelector` | Dropdown | pre-selected or empty | change |
| `PreviewAmount` | Calculated result (read-only) | loading (calculating...), value | — |
| `RateInfo` | "1 BTC = XX ETH" + fee | loading, visible | — |
| `SubmitButton("Converter")` | Open confirmation modal | default, disabled (validation), loading | click |
| `ConversionHistoryTable` (desktop) | History | loading, data, empty | — |
| `ConversionHistoryCards` (mobile) | Same | loading, data, empty | — |

### Modals

- **Confirmation Modal**: "Confirmar conversão", summary card, "Cancelar" (ghost) + "Confirmar conversão" (primary)
- **S-CONV-SUCCESS**: Green check, "Conversão realizada!", summary, "Baixar Recibo" (outline) + "Nova conversão" (primary)

### Validation Messages

- "Saldo insuficiente. Disponível: X.XX {COIN}" — `text-destructive`
- "Valor mínimo: X.XX {COIN}" — `text-destructive`
- "Selecione moedas diferentes" — `text-destructive`

### Empty State (no conversions)

- "Nenhuma conversão realizada"
- "Converta entre criptomoedas ou para Real"

### Linked Flows: DF-CONV-001

---

## S-SAQUE: Saque

**Route**: `/app/withdraw`
**Purpose**: Enviar cripto para wallet externa ou fiat para conta bancária.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `CoinSelector` | Dropdown (includes BRL) | pre-selected or empty | change |
| `DestinationInput` (crypto) | Wallet address text input | empty, filled, error (invalid) | change, blur |
| `BankAccountSelector` (fiat) | Dropdown of saved accounts | accounts loaded, no accounts | change |
| `NoBankAccountMessage` | "Cadastre uma conta" + link to S-SET-BANKS | visible when no accounts | click |
| `AmountInput` | Large font, "R$" prefix for BRL | empty, filled, error | change |
| `AvailableBalanceText` | "Saldo disponível: X.XX" | — | — |
| `UseMaxLink` | Fill max | default, hover | click |
| `FeeInfo` | Fee de rede + valor líquido | loading, visible | — |
| `EstimatedTimeText` | "10-30 min" or "Instantâneo" | — | — |
| `SubmitButton("Sacar")` | Open confirmation | default, disabled, loading | click |
| `WithdrawalHistoryTable` (desktop) | History | loading, data, empty | — |
| `WithdrawalHistoryCards` (mobile) | Same | loading, data, empty | — |

### Modals

- **Confirmation Modal**: "Confirmar saque", summary, warning "irreversível", "Cancelar" + "Confirmar saque"
- **S-SAQUE-SUCCESS**: Green check, "Saque iniciado!", summary, "Baixar Recibo" + "Voltar ao Dashboard"

### Empty State

- "Nenhum saque realizado"

### Linked Flows: DF-SAQUE-001

---

## S-ALERT: Alertas de Preço

**Route**: `/app/alerts`
**Purpose**: Gerenciar alertas de variação de preço.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `NewAlertButton` | Open create modal | default, hover | click |
| `ActiveAlertsList` | List of active alerts | loading, data, empty | — |
| `AlertCard` | Coin icon + type + target + current price | active | — |
| `EditAlertButton` | Open edit modal | default, hover | click |
| `DeleteAlertButton` | Open delete confirmation | default, hover | click |
| `TriggeredAlertsSection` | Historical triggered alerts | data, empty | — |

### Modals

- **Create/Edit Modal** (S-ALERT-CREATE): CoinSelector, TypeRadio (above/below), ValueInput, current price ref, "Cancelar" + "Criar/Salvar"
- **Delete Confirmation**: "Excluir alerta?", description, "Cancelar" + "Excluir" (destructive)

### Empty State

- Icon: Bell outline
- "Nenhum alerta configurado"
- "Crie alertas para ser notificado quando uma moeda atingir seu preço alvo."
- CTA: "Novo Alerta"

### Linked Flows: DF-ALERT-001

---

## S-HIST: Histórico

**Route**: `/app/history`
**Purpose**: Ver e filtrar todas as transações.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `TypeFilter` | Pill tabs: Todos, Depósitos, Conversões, Saques | active state | click |
| `CoinFilter` | Dropdown | all coins + "Todas" | change |
| `PeriodFilter` | Pills: 7d, 30d, 90d, Custom | active, date picker for custom | click |
| `StatusFilter` | Dropdown: Todos, Pendente, Confirmado, Falho | — | change |
| `ExportCSVButton` | Download filtered data | default, loading | click |
| `TransactionTable` (desktop) | Full history | loading, data, empty, filtered-empty | sort, row click |
| `TransactionCards` (mobile) | Same data | loading, data, empty | tap |
| `LoadMoreButton` | Pagination | default, loading, hidden | click |
| Table columns | Tipo (icon+label), Ativo (icon+name), Valor, Status (badge), Data | sortable: Data, Valor | — |

### Modals

- **S-HIST-DETAIL**: Transaction detail modal — type, full details card, status timeline, TX hash (if applicable), "Baixar Recibo", "Fechar"

### Empty States

- No transactions: "Nenhuma transação", "Suas transações aparecerão aqui."
- No results (filtered): "Nenhuma transação encontrada para os filtros selecionados.", "Limpar filtros" link

### Linked Flows: DF-HIST-001

---

## S-SET: Configurações (Hub)

**Route**: `/app/settings`
**Purpose**: Hub de navegação para sub-páginas de configuração.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `SettingsNavList` | List of settings categories | — | click → sub-page |
| `SettingsNavItem("Perfil")` | → S-SET-PROFILE | default, hover, active | click |
| `SettingsNavItem("Segurança")` | → S-SET-SECURITY | default, hover, active | click |
| `SettingsNavItem("Notificações")` | → S-SET-NOTIF | default, hover, active | click |
| `SettingsNavItem("Contas Bancárias")` | → S-SET-BANKS | default, hover, active | click |
| `SettingsNavItem("Preferências")` | → S-SET-PREFS | default, hover, active | click |

### Layout

- Desktop: sidebar nav (left) + content area (right) within the settings page
- Mobile: list of links, each navigates to full-page sub-setting

---

## S-SET-PROFILE: Perfil

**Route**: `/app/settings/profile`
**Purpose**: Editar nome e avatar.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `AvatarUpload` | Click to upload image | current avatar, uploading, new avatar | click, file select |
| `NameInput` | Pre-filled, editable | default, changed, error | change, blur |
| `EmailDisplay` | Read-only text | — | — |
| `SubmitButton("Salvar alterações")` | Save changes | default, disabled (no changes), loading | click |

### Linked Flows: DF-SET-001

---

## S-SET-SECURITY: Segurança

**Route**: `/app/settings/security`
**Purpose**: Alterar senha.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `CurrentPasswordInput` | Required | empty, filled, error ("incorreta") | change, blur |
| `NewPasswordInput` | Min 8, 1 upper, 1 num | empty, filled, error | change, blur |
| `PasswordStrengthBar` | Visual | red, yellow, green | — |
| `ConfirmNewPasswordInput` | Must match | empty, filled, error | change, blur |
| `SubmitButton("Alterar senha")` | Submit | default, disabled, loading | click |

### Linked Flows: DF-SET-002

---

## S-SET-NOTIF: Notificações

**Route**: `/app/settings/notifications`
**Purpose**: Configurar preferências de notificação.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `Toggle("Alertas in-app")` | Toggle + auto-save | on (default), off | change |
| `Toggle("Alertas email")` | Toggle + auto-save | off (default), on | change |
| `Toggle("Confirmações email")` | Toggle + auto-save | on (default), off | change |
| `Toggle("Newsletter")` | Toggle + auto-save | off (default), on | change |

### Linked Flows: DF-SET-005

---

## S-SET-BANKS: Contas Bancárias

**Route**: `/app/settings/bank-accounts`
**Purpose**: Gerenciar contas bancárias para saque em BRL.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `AddAccountButton` | Open add modal | default, hover | click |
| `AccountList` | List of saved accounts | loading, data, empty | — |
| `AccountCard` | Bank info + edit/delete | — | — |
| `EditButton` | Open edit modal | default, hover | click |
| `DeleteButton` | Open confirmation | default, hover | click |

### Modals

- **Add/Edit Modal**: BankDropdown, AgencyInput, AccountInput, AccountTypeRadio (Corrente/Poupança), PIXKeyInput, "Cancelar" + "Salvar"
- **Delete Confirmation**: "Excluir conta?", description, "Cancelar" + "Excluir" (destructive)

### Empty State

- Icon: Bank outline
- "Nenhuma conta bancária cadastrada"
- "Adicione uma conta para realizar saques em BRL"
- CTA: "Adicionar conta"

### Linked Flows: DF-SET-003

---

## S-SET-PREFS: Preferências

**Route**: `/app/settings/preferences`
**Purpose**: Tema e moeda padrão.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `ThemeToggle` | Dark/Light switch | dark (default), light | change → auto-save |
| `CurrencySelect` | BRL/USD dropdown | BRL (default), USD | change → auto-save |

### Linked Flows: DF-SET-004

---

## S-SUPP: Suporte / FAQ

**Route**: `/app/support`
**Purpose**: Buscar ajuda e contato.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `SearchInput` | Filter FAQ items | empty, typing, no-results | change (debounce) |
| `FAQAccordion` | Expandable sections | collapsed (default), expanded | click |
| `FAQSection` | Group of related questions | — | — |
| `FAQItem` | Question + answer | collapsed, expanded | click |
| `ContactSection` | Email link + info | — | click (mailto) |

### Empty Search

- "Nenhum resultado para '{query}'"
- "Entre em contato pelo email: suporte@cryptofolio.com.br"

### Linked Flows: DF-SUPP-001

---

## S-404: Página Não Encontrada

**Route**: `/*`
**Purpose**: Redirecionar usuário perdido.

### Components

| Component | Behavior | States | Events |
|-----------|----------|--------|--------|
| `ErrorIllustration` | Themed 404 graphic | — | — |
| `ErrorTitle` | "Página não encontrada" | — | — |
| `ErrorDescription` | "A página que você procura não existe..." | — | — |
| `BackButton("Voltar ao Dashboard")` | Navigate to S-DASH (auth) or S-LANDING (guest) | default, hover | click |

---

## Layout Shell (Shared)

### Desktop Sidebar

**Sticky, h-screen, left-0, w-64**

| Section | Items |
|---------|-------|
| **Header** | Logo CryptoFolio |
| **Principal** | Dashboard, Carteira |
| **Transações** | Depositar, Converter, Sacar |
| **Outros** | Alertas, Histórico, Configurações |
| **Footer** | Suporte, User profile (name + avatar + logout dropdown) |

### Mobile Sidebar (Drawer)

- Triggered by hamburger icon in header
- Overlay: `fixed inset-0 bg-black/50 z-40`
- Drawer: `fixed left-0 top-0 w-64 h-screen z-50`, slide-in animation
- Same content as desktop sidebar
- Tap overlay or X button → close

### Header (Mobile)

- Hamburger icon (left), "CryptoFolio" (center), notification bell (right)
- Bell shows badge dot when alert triggered

### Toasts (Global)

| Type | Style | Duration |
|------|-------|----------|
| Success | Green left border, check icon | 5s auto-dismiss |
| Error | Red left border, X icon | 8s auto-dismiss or manual |
| Warning | Yellow left border, alert icon | 5s auto-dismiss |
| Info | Blue left border, info icon | 5s auto-dismiss |
