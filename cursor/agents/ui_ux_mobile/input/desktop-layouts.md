# Desktop Layouts — CryptoFolio

## Global Shell (All Authenticated Screens)

### Root Layout

```
┌───────────────────────────────────────────────────────────────────┐
│ html, body, #root: h-full w-full bg-background                  │
│ ┌───────┬───────────────────────────────────────────────────────┐ │
│ │       │  Header (optional per page)                          │ │
│ │  Side │  ┌───────────────────────────────────────────────┐   │ │
│ │  bar  │  │                                               │   │ │
│ │       │  │  Main Content Area                            │   │ │
│ │  w-64 │  │  max-w-7xl mx-auto p-6                       │   │ │
│ │  h-   │  │  overflow-y-auto flex-1                       │   │ │
│ │  screen│  │                                               │   │ │
│ │  sticky│  │                                               │   │ │
│ │       │  └───────────────────────────────────────────────┘   │ │
│ └───────┴───────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

### Sidebar (w-64, h-screen, sticky left-0 top-0)

```
┌──────────────────────────────┐
│  ● CryptoFolio               │  Logo + Brand (h-16, flex items-center, px-4, border-b border-border)
│                              │
│  PRINCIPAL                   │  Section label (text-xs uppercase text-muted-foreground px-4 py-2)
│  ⊙ Dashboard     LayoutDashboard │  Nav item (h-10 px-3 rounded-lg flex items-center gap-3)
│  ⊙ Carteira      Wallet     │  Active: bg-sidebar-active text-sidebar-active-foreground
│                              │  Inactive: text-sidebar-foreground hover:bg-accent hover:text-accent-foreground
│  TRANSAÇÕES                  │
│  ⊙ Depositar     Download   │
│  ⊙ Converter     ArrowLeftRight │
│  ⊙ Sacar         Upload     │
│                              │
│  OUTROS                      │
│  ⊙ Alertas       Bell       │  (+ badge dot when triggered)
│  ⊙ Histórico     Clock      │
│  ⊙ Configurações Settings   │
│                              │
│  ─────────────────────────── │  Separator (border-t border-border)
│  ⊙ Suporte       HelpCircle │
│  ┌────────────────────────┐  │
│  │ [Avatar] João Silva    │  │  User area (px-4 py-3)
│  │          joao@email.com │  │  DropdownMenu trigger → Profile, Preferences, Logout
│  └────────────────────────┘  │
└──────────────────────────────┘
```

### Breadcrumbs Pattern

Used on: detail pages (S-WALL-DETAIL), nested settings (S-SET-*), support
Format: `text-sm text-muted-foreground` with `ChevronRight` separators

Examples:
- Carteira > Bitcoin
- Configurações > Perfil
- Configurações > Contas Bancárias

---

## SCR-LANDING: Landing Page

**Route**: `/`
**Purpose**: Apresentar CryptoFolio e converter visitantes.
**Layout**: Full-width, no sidebar (public page)

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER: Logo (left) | "Recursos" "Como funciona" | "Entrar" "Criar conta" (right)
│  bg-background/80 backdrop-blur sticky top-0 z-50 border-b border-border
├─────────────────────────────────────────────────────────────────┤
│  HERO (min-h-[80vh] flex items-center justify-center)          │
│  ┌──────────────────────────────────────────────────────┐      │
│  │  h1: "Suas criptomoedas, simplificadas."             │      │
│  │  p: "Acompanhe, converta e saque..."                 │      │
│  │  [Criar conta grátis] (primary, lg)                  │      │
│  └──────────────────────────────────────────────────────┘      │
├─────────────────────────────────────────────────────────────────┤
│  FEATURES (grid grid-cols-3 gap-8 max-w-5xl mx-auto p-16)     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
│  │ Eye icon │  │ Arrows   │  │ Bell     │                     │
│  │ Portfólio│  │ Conversão│  │ Alertas  │                     │
│  │ em tempo │  │ instant. │  │ inteli-  │                     │
│  │ real     │  │          │  │ gentes   │                     │
│  └──────────┘  └──────────┘  └──────────┘                     │
├─────────────────────────────────────────────────────────────────┤
│  HOW IT WORKS (3 numbered steps, flex justify-center gap-12)   │
├─────────────────────────────────────────────────────────────────┤
│  FINAL CTA (text-center, "Comece agora — é grátis")            │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER: Termos | Privacidade | Suporte | © 2026 CryptoFolio   │
└─────────────────────────────────────────────────────────────────┘
```

Min width: 1024px (responsive handled by Artemis)

---

## SCR-AUTH-LOGIN: Login

**Route**: `/login`
**Purpose**: Autenticar usuário existente.
**Layout**: Centered card, no sidebar

```
┌─────────────────────────────────────────────────────────────────┐
│  bg-background full-screen flex items-center justify-center     │
│  ┌─────────────────────────────────┐                            │
│  │  Card (w-[420px] bg-card p-8 rounded-2xl)                  │
│  │                                 │                            │
│  │  ● CryptoFolio (logo)          │                            │
│  │  h2: "Entrar na sua conta"      │                            │
│  │  p: "Acesse seu portfólio"      │                            │
│  │                                 │                            │
│  │  [Email]                        │  Input, label above       │
│  │  [Senha] (eye toggle)           │  Input, label above       │
│  │  "Esqueceu a senha?" link right │                            │
│  │                                 │                            │
│  │  [Entrar] (primary, full-width) │                            │
│  │                                 │                            │
│  │  "Não tem conta? Criar conta"   │  text-muted-foreground    │
│  └─────────────────────────────────┘                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## SCR-AUTH-SIGNUP: Cadastro

**Route**: `/signup`
**Purpose**: Criar nova conta.
**Layout**: Centered card, same as login

```
Card (w-[420px]):
  Logo
  h2: "Criar sua conta"
  p: "Comece a acompanhar suas criptomoedas"
  [Nome completo]
  [Email]
  [Senha] + PasswordStrengthBar
  [Confirmar senha]
  [Criar conta] (primary, full-width)
  "Já tem conta? Entrar"
```

---

## SCR-AUTH-FORGOT: Recuperar Senha

**Route**: `/forgot-password`
**Layout**: Centered card (w-[420px])

```
Card:
  Logo
  h2: "Recuperar senha"
  p: "Informe seu email para receber o link"
  [Email]
  [Enviar link] (primary, full-width)
  "Voltar ao login" link
  
  Success state (replaces form):
    CheckCircle icon (text-success, w-12 h-12)
    "Link enviado!"
    "Verifique sua caixa de entrada."
    "Voltar ao login" button
```

---

## SCR-AUTH-RESET: Nova Senha

**Route**: `/reset-password/:token`
**Layout**: Centered card (w-[420px])

```
Card:
  Logo
  h2: "Redefinir senha"
  [Nova senha] + PasswordStrengthBar
  [Confirmar nova senha]
  [Redefinir senha] (primary, full-width)
  
  Token expired state:
    AlertCircle icon (text-destructive)
    "Link expirado"
    "Solicite um novo link de recuperação."
    [Solicitar novo link] → /forgot-password
```

---

## SCR-DASHBOARD: Dashboard / Home

**Route**: `/app/dashboard`
**Purpose**: Visão rápida do portfólio, saldos, ações rápidas.
**Layout**: Shell + main content

```
┌────────────────────────────────────────────────────────────────────────┐
│ Sidebar │  Page Content (p-6, max-w-7xl)                              │
│ (active:│                                                              │
│  Dash.) │  h1: "Dashboard" (text-3xl font-bold text-foreground)       │
│         │                                                              │
│         │  ┌──────────────────────────────────────────────────────┐   │
│         │  │  PORTFOLIO BALANCE CARD (bg-card rounded-xl p-6)     │   │
│         │  │  "Saldo Total"  (text-sm text-muted-foreground)      │   │
│         │  │  "R$ 45.230,87" (text-4xl font-bold text-foreground) │   │
│         │  │  "+2.4% (24h)"  (Badge bg-success/10 text-success)   │   │
│         │  └──────────────────────────────────────────────────────┘   │
│         │                                                              │
│         │  QUICK ACTIONS (flex gap-3)                                  │
│         │  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│         │  │ ↓ Depos. │ │ ⇄ Conv. │ │ ↑ Sacar │                    │
│         │  │ bg-primary/10 text-primary rounded-xl p-4               │
│         │  └──────────┘ └──────────┘ └──────────┘                    │
│         │                                                              │
│         │  CHART (bg-card rounded-xl p-6)                             │
│         │  ┌──────────────────────────────────────────────────────┐   │
│         │  │  Tabs: [7d] [30d] [90d] — right aligned              │   │
│         │  │  Line chart — Recharts, area fill, amber line         │   │
│         │  │  X-axis: dates, Y-axis: BRL value                     │   │
│         │  └──────────────────────────────────────────────────────┘   │
│         │                                                              │
│         │  SEARCH (relative, above asset list)                        │
│         │  ┌──────────────────────────────────────────────────────┐   │
│         │  │  🔍 "Buscar ativo..." (bg-input border-border)       │   │
│         │  └──────────────────────────────────────────────────────┘   │
│         │                                                              │
│         │  ASSET LIST (bg-card rounded-xl overflow-hidden)            │
│         │  ┌──────────────────────────────────────────────────────┐   │
│         │  │  Table: Ativo | Preço | Quantidade | Valor | 24h     │   │
│         │  │  ─────────────────────────────────────────────────── │   │
│         │  │  [BTC icon] Bitcoin  $67,432  0.34  R$23,456  +2.1% │   │
│         │  │  [ETH icon] Ethereum $3,421   2.5   R$8,552   -0.8% │   │
│         │  │  [USDT icon] Tether  $1.00    5000  R$25,000  +0.0% │   │
│         │  │  ... click row → /app/wallet/:coinId                 │   │
│         │  └──────────────────────────────────────────────────────┘   │
│         │                                                              │
│         │  RECENT TRANSACTIONS (bg-card rounded-xl p-6)               │
│         │  ┌──────────────────────────────────────────────────────┐   │
│         │  │  h3: "Últimas Transações"  "Ver todas →" link right  │   │
│         │  │  ─────────────────────────────────────────────────── │   │
│         │  │  ↓ Depósito  0.5 BTC    Confirmado  28 Mar, 19:42  │   │
│         │  │  ⇄ Conversão ETH→BRL    Confirmado  27 Mar, 14:20  │   │
│         │  │  ↑ Saque     R$ 5.000   Processando 27 Mar, 10:15  │   │
│         │  └──────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

**Empty state** (no assets): Portfolio card shows R$ 0,00, chart hidden, asset list replaced with empty state CTA "Fazer primeiro depósito", recent transactions: "Nenhuma transação"

---

## SCR-WALLET: Carteira

**Route**: `/app/wallet`
**Purpose**: Lista completa de ativos.

```
Page Header:
  h1: "Carteira"
  Total: "R$ 45.230,87" (text-2xl font-semibold)

Controls Row (flex justify-between items-center gap-4):
  SearchInput (w-64, "Buscar ativo...")
  SortDropdown (Select: "Maior valor", "Menor valor", "Nome A-Z", "Maior variação")

Asset Table (bg-card rounded-xl overflow-hidden):
  Header: Ativo | Quantidade | Preço Atual | Valor Total | Variação 24h
  Rows: coin icon + name + symbol | quantity | price | total BRL | badge green/red
  Row: hover:bg-accent/20, cursor-pointer → /app/wallet/:coinId
  Empty state: "Nenhum ativo na carteira" + CTA "Depositar"
```

---

## SCR-WALLET-DETAIL: Detalhe do Ativo

**Route**: `/app/wallet/:coinId`
**Purpose**: Detalhes e histórico de uma moeda.

```
Breadcrumb: Carteira > Bitcoin

Header Card (bg-card rounded-xl p-6, flex justify-between):
  Left: [BTC icon w-10 h-10] Bitcoin (BTC) | R$ 367.432,00 | Badge +2.1%
  Right: Action buttons: [Depositar] [Converter] [Sacar]

Balance Card (bg-card rounded-xl p-6):
  "Seu saldo" text-muted-foreground
  "0.5423 BTC" text-2xl font-bold
  "≈ R$ 23.456,78" text-muted-foreground

Price Chart (bg-card rounded-xl p-6):
  Period tabs: [7d] [30d] [90d] [1y]
  Line chart

Transaction History (bg-card rounded-xl):
  h3: "Transações com Bitcoin"
  Table: Tipo | Valor | Status | Data
  LoadMoreButton at bottom
  Empty: "Nenhuma transação com Bitcoin"
```

---

## SCR-DEPOSIT: Depósito

**Route**: `/app/deposit`
**Purpose**: Receber criptomoeda.

```
Page Header: h1: "Depositar"

Deposit Card (bg-card rounded-xl p-6, max-w-lg mx-auto):
  CoinSelector (Select with coin icons)
  
  QR Code Section (flex flex-col items-center gap-4 py-6):
    QR Code image (w-48 h-48, bg-white p-3 rounded-xl)
    Address (font-mono text-sm truncate max-w-full)
    [Copiar endereço] button (outline, w-full)
  
  Warning Banner (bg-warning/10 border border-warning/20 rounded-lg p-4):
    "⚠️ Envie apenas {coin} para este endereço..."

Deposit History (bg-card rounded-xl mt-6):
  h3: "Histórico de Depósitos"
  Table: Moeda | Valor | Status | Data
  Empty: "Nenhum depósito realizado"
```

---

## SCR-CONVERT: Conversão

**Route**: `/app/convert`
**Purpose**: Converter uma moeda por outra.

```
Page Header: h1: "Converter"

Convert Card (bg-card rounded-xl p-6, max-w-lg mx-auto):
  FROM Section:
    Label: "De"
    CoinSelector + AvailableBalance ("Saldo: 0.5 BTC")
    AmountInput (text-3xl text-center, bg-input)
    "Usar máximo" link (text-primary text-sm)
  
  SwapButton (mx-auto, -my-2, z-10, bg-muted rounded-full p-2):
    ArrowUpDown icon
  
  TO Section:
    Label: "Para"
    CoinSelector
    PreviewAmount (text-3xl text-center, bg-muted read-only)
  
  Rate Info (text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg):
    "1 BTC = 18.23 ETH"
    "Taxa: 0.5%"
    "Fee estimado: R$ 12,50"
  
  [Converter] (primary, full-width, lg)

Conversion History (bg-card rounded-xl mt-6):
  h3: "Histórico de Conversões"
  Table: De | Para | Taxa | Status | Data
  Empty: "Nenhuma conversão realizada"
```

---

## SCR-WITHDRAW: Saque

**Route**: `/app/withdraw`
**Purpose**: Enviar cripto/fiat para destino externo.

```
Page Header: h1: "Sacar"

Withdraw Card (bg-card rounded-xl p-6, max-w-lg mx-auto):
  CoinSelector (includes BRL)
  
  [if crypto]:
    DestinationInput (label: "Endereço de destino", placeholder: "Cole o endereço da carteira")
  [if BRL]:
    BankAccountSelector (Select, with "Adicionar conta" link to /app/settings/bank-accounts)
  
  AmountInput (text-3xl, bg-input)
  AvailableBalance + "Usar máximo"
  
  Fee Card (bg-muted/50 rounded-lg p-3 text-sm):
    "Fee de rede: 0.0005 BTC (~R$ 18,00)"
    "Valor líquido: 0.4995 BTC"
    "Tempo estimado: 10-30 min"
  
  [Sacar] (primary, full-width, lg)

Withdrawal History (bg-card rounded-xl mt-6):
  h3: "Histórico de Saques"
  Table: Moeda | Valor | Destino | Status | Data
  Empty: "Nenhum saque realizado"
```

---

## SCR-ALERTS: Alertas de Preço

**Route**: `/app/alerts`
**Purpose**: Gerenciar alertas de preço.

```
Page Header: h1: "Alertas" | [+ Novo Alerta] button (primary)

Active Alerts (grid grid-cols-2 gap-4):
  AlertCard (bg-card rounded-xl p-4):
    Header: [BTC icon] Bitcoin | [Edit] [Delete] icons
    Body: "Acima de R$ 400.000" | Preço atual: R$ 367.432
    Footer: Criado em 25 Mar 2026

Empty state: Bell icon, "Nenhum alerta configurado", CTA

Triggered Alerts History (bg-card rounded-xl mt-8):
  h3: "Alertas Disparados"
  Table: Moeda | Tipo | Valor Alvo | Preço no Disparo | Data
  Empty: "Nenhum alerta disparado"
```

---

## SCR-HISTORY: Histórico

**Route**: `/app/history`
**Purpose**: Histórico unificado de transações.

```
Page Header: h1: "Histórico" | [Exportar CSV] button (outline)

Filter Bar (flex flex-wrap gap-3 mb-4):
  TypeTabs: [Todos] [Depósitos] [Conversões] [Saques] — pill style
  CoinFilter: Select "Todas as moedas"
  PeriodFilter: Select "30 dias" | Custom date range
  StatusFilter: Select "Todos os status"

Transaction Table (bg-card rounded-xl):
  Columns: Tipo (icon + label) | Ativo | Valor | Status (badge) | Data
  Sortable: Data (default desc), Valor
  Row click → transaction detail modal
  Pagination: "Carregar mais" button

Empty: "Nenhuma transação" 
Filtered empty: "Nenhuma transação para os filtros selecionados" + "Limpar filtros"
```

---

## SCR-SETTINGS: Configurações (Hub)

**Route**: `/app/settings`
**Purpose**: Hub de navegação para sub-settings.

```
Page Header: h1: "Configurações"

Desktop layout: Settings sidebar (left, w-56) + Content area (right, flex-1)

Settings Nav:
  SettingsNavItem: "Perfil" (User icon) — active highlight
  SettingsNavItem: "Segurança" (Shield icon)
  SettingsNavItem: "Notificações" (Bell icon)
  SettingsNavItem: "Contas Bancárias" (Building icon)
  SettingsNavItem: "Preferências" (Palette icon)
```

---

## SCR-SET-PROFILE: Perfil

**Route**: `/app/settings/profile`

```
Settings layout → Content area:
  h2: "Perfil"
  
  AvatarUpload (w-20 h-20 rounded-full, click to upload, hover overlay with Camera icon)
  
  Form (max-w-md):
    [Nome completo] — Input, pre-filled
    [Email] — read-only display (text-muted-foreground)
    [Salvar alterações] (primary) — disabled until changes
```

---

## SCR-SET-SECURITY: Segurança

**Route**: `/app/settings/security`

```
Content area:
  h2: "Segurança"
  
  Form (max-w-md):
    [Senha atual]
    [Nova senha] + StrengthBar
    [Confirmar nova senha]
    [Alterar senha] (primary)
```

---

## SCR-SET-NOTIF: Notificações

**Route**: `/app/settings/notifications`

```
Content area:
  h2: "Notificações"
  
  Toggle list (divide-y divide-border):
    "Alertas de preço (in-app)" — Toggle ON
    "Alertas de preço (email)" — Toggle OFF
    "Confirmações de transação (email)" — Toggle ON
    "Newsletter e novidades" — Toggle OFF
```

---

## SCR-SET-BANKS: Contas Bancárias

**Route**: `/app/settings/bank-accounts`

```
Content area:
  h2: "Contas Bancárias" | [+ Adicionar conta] button

  Account list (divide-y divide-border):
    AccountCard: [Bank icon] Banco do Brasil | Ag. 1234 | CC ****5678 | PIX: joao@email.com
      Actions: [Editar] [Excluir]
  
  Empty: "Nenhuma conta cadastrada" + CTA
```

---

## SCR-SET-PREFS: Preferências

**Route**: `/app/settings/preferences`

```
Content area:
  h2: "Preferências"
  
  ThemeToggle: "Tema" — [Dark ● ] [Light] toggle or segmented control
  CurrencySelect: "Moeda padrão" — Select [BRL | USD]
```

---

## SCR-SUPPORT: Suporte / FAQ

**Route**: `/app/support`
**Purpose**: Buscar ajuda.

```
Page Header: h1: "Central de Ajuda"

SearchInput ("Buscar na central de ajuda...", full-width, mb-6)

FAQ Sections (divide-y divide-border):
  Accordion: "Conta" — expandable items
  Accordion: "Depósitos" — expandable items
  Accordion: "Conversões"
  Accordion: "Saques"
  Accordion: "Alertas"
  Accordion: "Segurança"

Contact Section (bg-card rounded-xl p-6 mt-8):
  "Não encontrou sua resposta?"
  "Entre em contato: suporte@cryptofolio.com.br"
  [Enviar email] (outline button, mailto link)
```

---

## SCR-404: Página Não Encontrada

**Route**: `/*`

```
Full-screen centered:
  Illustration or large "404" text (text-8xl font-bold text-muted)
  h2: "Página não encontrada"
  p: "A página que você procura não existe ou foi movida."
  [Voltar ao Dashboard] (primary button)
```

---

## Screen Coverage Table

| Screen ID | Athena Ref | Layout Section | Status |
|-----------|-----------|----------------|--------|
| SCR-LANDING | S-LANDING | SCR-LANDING | Designed |
| SCR-AUTH-LOGIN | S-AUTH-LOGIN | SCR-AUTH-LOGIN | Designed |
| SCR-AUTH-SIGNUP | S-AUTH-SIGNUP | SCR-AUTH-SIGNUP | Designed |
| SCR-AUTH-FORGOT | S-AUTH-FORGOT | SCR-AUTH-FORGOT | Designed |
| SCR-AUTH-RESET | S-AUTH-RESET | SCR-AUTH-RESET | Designed |
| SCR-DASHBOARD | S-DASH | SCR-DASHBOARD | Designed |
| SCR-WALLET | S-WALL | SCR-WALLET | Designed |
| SCR-WALLET-DETAIL | S-WALL-DETAIL | SCR-WALLET-DETAIL | Designed |
| SCR-DEPOSIT | S-DEP | SCR-DEPOSIT | Designed |
| SCR-DEPOSIT-SUCCESS | S-DEP-SUCCESS | Modal (in SCR-DEPOSIT) | Designed |
| SCR-CONVERT | S-CONV | SCR-CONVERT | Designed |
| SCR-CONVERT-SUCCESS | S-CONV-SUCCESS | Modal (in SCR-CONVERT) | Designed |
| SCR-WITHDRAW | S-SAQUE | SCR-WITHDRAW | Designed |
| SCR-WITHDRAW-SUCCESS | S-SAQUE-SUCCESS | Modal (in SCR-WITHDRAW) | Designed |
| SCR-ALERTS | S-ALERT | SCR-ALERTS | Designed |
| SCR-ALERT-CREATE | S-ALERT-CREATE | Modal (in SCR-ALERTS) | Designed |
| SCR-HISTORY | S-HIST | SCR-HISTORY | Designed |
| SCR-HISTORY-DETAIL | S-HIST-DETAIL | Modal (in SCR-HISTORY) | Designed |
| SCR-SETTINGS | S-SET | SCR-SETTINGS | Designed |
| SCR-SET-PROFILE | S-SET-PROFILE | SCR-SET-PROFILE | Designed |
| SCR-SET-SECURITY | S-SET-SECURITY | SCR-SET-SECURITY | Designed |
| SCR-SET-NOTIF | S-SET-NOTIF | SCR-SET-NOTIF | Designed |
| SCR-SET-BANKS | S-SET-BANKS | SCR-SET-BANKS | Designed |
| SCR-SET-PREFS | S-SET-PREFS | SCR-SET-PREFS | Designed |
| SCR-SUPPORT | S-SUPP | SCR-SUPPORT | Designed |
| SCR-404 | S-404 | SCR-404 | Designed |
