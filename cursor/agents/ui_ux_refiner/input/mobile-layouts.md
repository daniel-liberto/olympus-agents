# Mobile Layouts — CryptoFolio

## App Shell (All Authenticated Screens)

### Bottom Tab Bar

```
┌─────────────────────────────────────────┐
│  ⊙ Home    ⊙ Carteira    ⊙ Converter   │
│  LayoutDash  Wallet      ArrowLeftRight │
│                                         │
│  h-16 (64px) + safe-area-bottom         │
│  bg-background border-t border-border   │
│  fixed bottom-0 w-full z-30            │
└─────────────────────────────────────────┘
```

**Tabs**: 3 main destinations
| Tab | Icon (Lucide) | Label | Route |
|-----|--------------|-------|-------|
| Home | LayoutDashboard | Home | /app/dashboard |
| Carteira | Wallet | Carteira | /app/wallet |
| Converter | ArrowLeftRight | Converter | /app/convert |

**Active state**: `text-primary` icon + label, subtle `bg-primary/10` pill behind icon
**Inactive state**: `text-muted-foreground`
**Badge**: dot on tab icon when notification (alerts triggered)
**Keyboard behavior**: hide bottom tab bar when virtual keyboard is open

### Top App Bar

```
┌─────────────────────────────────────────┐
│  [☰]  CryptoFolio           [🔔] [👤]  │
│  h-14 (56px) + safe-area-top            │
│  bg-background/80 backdrop-blur         │
│  sticky top-0 z-40                      │
└─────────────────────────────────────────┘
```

**Left**: Hamburger menu (Menu icon) → opens sidebar drawer
**Center**: Page title or "CryptoFolio" on home
**Right**: Notifications bell (Bell icon, badge dot when alerts) + Avatar (→ profile)

### Sidebar Drawer (Off-Canvas)

```
Overlay: fixed inset-0 bg-black/50 z-40
Drawer: fixed left-0 top-0 w-[280px] h-screen z-50 bg-background border-r border-border
        transform transition-transform duration-300
        closed: -translate-x-full
        open: translate-x-0

Content (same structure as desktop sidebar):
  Logo header
  Nav sections: Principal, Transações, Outros
  Footer: Suporte, User area
```

**Close**: tap overlay, tap X button, or swipe left on drawer

### Stack Navigation

- **Push** for: Wallet detail, Settings sub-pages, Support
- **Modal stack** (bottom sheet): Alert create/edit, Transaction detail, Confirmations
- **Back**: top-left ChevronLeft icon + iOS swipe-back gesture (enabled by default)

### Safe Areas

- Top: `pt-[env(safe-area-inset-top)]` or min 44px
- Bottom: `pb-[env(safe-area-inset-bottom)]` + tab bar height (64px)
- Content area: `pb-24` to account for tab bar + safe area

---

## SCR-LANDING: Landing Page (Mobile)

**Route**: `/`
**App bar**: Hidden (custom header)

```
┌─────────────────────────────────────┐
│ [Logo]              [Entrar] [Menu] │  ← sticky header
├─────────────────────────────────────┤
│                                     │
│  "Suas criptomoedas,               │
│   simplificadas."                   │  ← h1 text-2xl font-bold
│                                     │
│  "Acompanhe, converta e saque..."   │  ← text-base text-muted-foreground
│                                     │
│  [Criar conta grátis]               │  ← primary button, w-full
│                                     │
├─────────────────────────────────────┤
│  FEATURES (stack, gap-4)            │
│  ┌────────────────────────────────┐ │
│  │ 👁 Portfólio em tempo real     │ │  ← card, p-4
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │ ⇄ Conversão instantânea       │ │
│  └────────────────────────────────┘ │
│  ┌────────────────────────────────┐ │
│  │ 🔔 Alertas inteligentes       │ │
│  └────────────────────────────────┘ │
├─────────────────────────────────────┤
│  HOW IT WORKS (vertical steps)      │
├─────────────────────────────────────┤
│  FINAL CTA (w-full button)          │
├─────────────────────────────────────┤
│  Footer links (stacked)             │
└─────────────────────────────────────┘
```

---

## SCR-AUTH-LOGIN: Login (Mobile)

**Route**: `/login`
**Layout**: Full-screen, no tab bar, no app bar

```
┌─────────────────────────────────────┐
│  (safe area top)                    │
│                                     │
│  ● CryptoFolio (logo, centered)    │
│                                     │
│  "Entrar na sua conta"              │  ← text-xl font-semibold
│                                     │
│  [Email]      inputmode="email"     │
│  [Senha]      type="password"       │
│  "Esqueceu a senha?"  ← right link │
│                                     │
│  [Entrar]     ← primary, w-full    │
│                                     │
│  "Não tem conta? Criar conta"       │
│                                     │
│  (safe area bottom)                 │
└─────────────────────────────────────┘
```

**Auto-focus**: EmailInput on load
**Keyboard**: Form scrolls up when keyboard opens, submit button stays visible

---

## SCR-AUTH-SIGNUP: Cadastro (Mobile)

Same pattern as login, vertical stack:
Logo → title → Name → Email → Password + StrengthBar → Confirm Password → Submit → Login link
**Keyboard-aware**: scroll to focused field

---

## SCR-AUTH-FORGOT / SCR-AUTH-RESET

Same centered card pattern, single column, full-width buttons.

---

## SCR-DASHBOARD: Dashboard / Home (Mobile)

**Route**: `/app/dashboard`
**Tab**: Home (active)
**App bar**: "CryptoFolio" | [Bell] [Avatar]

```
┌─────────────────────────────────────┐
│ [☰] CryptoFolio        [🔔] [👤]  │
├─────────────────────────────────────┤
│  PORTFOLIO BALANCE (p-4)            │
│  "Saldo Total" ← text-sm muted     │
│  "R$ 45.230,87" ← text-3xl bold    │
│  "+2.4% (24h)" ← Badge success     │
├─────────────────────────────────────┤
│  QUICK ACTIONS (flex gap-3, px-4)   │
│  ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ ↓    │ │ ⇄    │ │ ↑    │       │
│  │Depos.│ │Conv. │ │Sacar │       │
│  └──────┘ └──────┘ └──────┘       │
│  (equal width, bg-primary/10)       │
├─────────────────────────────────────┤
│  CHART (p-4)                        │
│  Period: [7d] [30d] [90d] ← pills  │
│  Area chart (h-48)                  │
├─────────────────────────────────────┤
│  SEARCH (px-4)                      │
│  🔍 "Buscar ativo..."              │
├─────────────────────────────────────┤
│  ASSET LIST (mobile cards)          │
│  ┌─────────────────────────────────┐│
│  │ [BTC] Bitcoin     R$ 23.456  ↑ ││  ← card row, h-16
│  │       0.34 BTC     +2.1%      ││
│  ├─────────────────────────────────┤│
│  │ [ETH] Ethereum    R$ 8.552   ↓ ││
│  │       2.5 ETH      -0.8%      ││
│  └─────────────────────────────────┘│
│  Tap row → /app/wallet/:coinId      │
├─────────────────────────────────────┤
│  RECENT TRANSACTIONS                │
│  "Últimas Transações" "Ver todas →" │
│  ┌─────────────────────────────────┐│
│  │ ↓ Depósito  0.5 BTC  Confirm. ││
│  │ ⇄ Conversão ETH→BRL  Confirm. ││
│  │ ↑ Saque     R$ 5.000 Process. ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│  [Home●]  [Carteira]  [Converter]   │  ← Bottom tab bar
└─────────────────────────────────────┘
```

**Pull-to-refresh**: enabled, refreshes portfolio data
**Empty state**: "Seu portfólio está vazio" + CTA "Depositar"

---

## SCR-WALLET: Carteira (Mobile)

**Route**: `/app/wallet`
**Tab**: Carteira (active)
**App bar**: "Carteira" | total balance subtitle

```
App bar: "Carteira"
Subtitle: "R$ 45.230,87"

Search: 🔍 "Buscar ativo..."
Sort: Dropdown button (right of search)

Asset Cards (divide-y):
  Each card (p-4, h-16, flex items-center justify-between):
    Left: [coin icon w-10 h-10] + Name/Symbol stack
    Right: Value (BRL) + Variation badge
    Tap → /app/wallet/:coinId
    
Empty: "Nenhum ativo" + CTA "Depositar"
```

**Pull-to-refresh**: enabled

---

## SCR-WALLET-DETAIL: Detalhe do Ativo (Mobile)

**Route**: `/app/wallet/:coinId`
**Navigation**: Push from wallet list
**App bar**: "← Bitcoin" (back + coin name)

```
App bar: [←] Bitcoin (BTC)

Header Card (p-4, bg-card rounded-xl mx-4):
  [BTC icon w-12 h-12]
  Price: R$ 367.432,00
  Change: +2.1% badge

Balance Section (p-4):
  "Seu saldo"
  "0.5423 BTC"
  "≈ R$ 23.456,78"

Action Buttons (flex gap-3, px-4):
  [Depositar] [Converter] [Sacar] (equal width, outline)

Price Chart (p-4, h-48):
  Period pills: [7d] [30d] [90d] [1y]

Transaction History (mobile cards):
  Section title: "Transações"
  Card list (same as dashboard recent tx pattern)
  Load more button
  Empty: "Nenhuma transação com Bitcoin"
```

---

## SCR-DEPOSIT: Depósito (Mobile)

**Route**: `/app/deposit`
**Navigation**: Push from sidebar/dashboard
**App bar**: "← Depositar"

```
App bar: [←] Depositar

Content (px-4, scrollable):
  CoinSelector (full-width Select)
  
  QR Code Card (bg-card rounded-xl p-6, text-center):
    QR image (w-40 h-40, centered, bg-white rounded-xl p-2)
    Address (font-mono text-xs, break-all, max-2-lines + expand)
    [Copiar endereço] (primary, w-full)
  
  Warning Banner (bg-warning/10, p-3, rounded-lg):
    "⚠️ Envie apenas {coin}..."

  History Section:
    "Histórico de Depósitos"
    Mobile card list (type + amount + status badge + date)
    Empty: "Nenhum depósito"
```

---

## SCR-CONVERT: Conversão (Mobile)

**Route**: `/app/convert`
**Tab**: Converter (active)

```
App bar: "Converter"

Content (px-4):
  FROM Section:
    "De" label
    CoinSelector (full-width) + "Saldo: 0.5 BTC"
    AmountInput (text-2xl, centered, full-width, inputmode="decimal")
    "Usar máximo" link

  SwapButton (centered, -my-2, z-10)

  TO Section:
    "Para" label
    CoinSelector (full-width)
    Preview (text-2xl, centered, read-only, bg-muted)

  Rate Card (bg-muted/50, rounded-lg, p-3, text-sm):
    "1 BTC = 18.23 ETH"
    "Taxa: 0.5%"
    "Fee: R$ 12,50"

  Sticky Footer (fixed bottom, above tab bar):
    [Converter] (primary, w-full, h-12)

History Section:
  "Histórico de Conversões"
  Mobile card list
  Empty: "Nenhuma conversão"
```

**Keyboard**: AmountInput focused → sticky footer moves above keyboard

---

## SCR-WITHDRAW: Saque (Mobile)

**Route**: `/app/withdraw`
**App bar**: "← Sacar"

```
Content (px-4):
  CoinSelector (full-width)
  
  [if crypto]:
    DestinationInput (full-width, inputmode="text", paste button)
  [if BRL]:
    BankAccountSelector (full-width Select)
    "Adicionar conta" link if empty
  
  AmountInput (text-2xl, inputmode="decimal")
  Balance + "Usar máximo"
  
  Fee Card (bg-muted/50):
    Fee, valor líquido, tempo estimado

  Sticky Footer:
    [Sacar] (primary, w-full, h-12)

History:
  Mobile card list
  Empty: "Nenhum saque"
```

---

## SCR-ALERTS: Alertas (Mobile)

**Route**: `/app/alerts`
**App bar**: "← Alertas" | [+] button (right)

```
Active Alerts (vertical list, gap-3, px-4):
  AlertCard (bg-card rounded-xl p-4):
    Top row: [BTC icon] Bitcoin | [⋮] overflow menu (edit, delete)
    Middle: "Acima de R$ 400.000" (text-lg font-bold)
    Bottom: "Atual: R$ 367.432" (text-sm muted)

Empty: Bell icon, "Nenhum alerta", CTA "Novo Alerta"

Triggered History:
  Section title + mobile card list
```

**New Alert**: Bottom sheet (Vaul Drawer, snap to 70% height)
**Edit**: Same bottom sheet, pre-filled
**Delete**: Confirmation bottom sheet (short, snap 30%)

---

## SCR-HISTORY: Histórico (Mobile)

**Route**: `/app/history`
**App bar**: "← Histórico" | [Export] icon button

```
Filter Bar (horizontal scroll, px-4):
  Pill tabs: [Todos] [Depósitos] [Conversões] [Saques]
  (scrollable if more filters)

Filter Row below (horizontal):
  Coin filter (chip) + Period filter (chip) + Status filter (chip)
  Tap chip → bottom sheet with options

Transaction Cards (divide-y):
  Each (p-4):
    Left: Type icon (w-10 h-10 rounded-full bg-muted/20) + Description
    Right: Amount + Status badge
    Below: Date (text-xs muted)
    Tap → Transaction detail bottom sheet

Load More button
Empty: "Nenhuma transação"
Filtered empty: "Nenhum resultado" + "Limpar filtros"
```

**Transaction Detail**: Bottom sheet (Vaul, snap 80%), same content as desktop modal

---

## SCR-SETTINGS: Configurações (Mobile)

**Route**: `/app/settings`
**App bar**: "← Configurações"

```
Settings List (divide-y, bg-card rounded-xl mx-4):
  [User icon] Perfil          [→]
  [Shield]    Segurança       [→]
  [Bell]      Notificações    [→]
  [Building]  Contas Bancárias [→]
  [Palette]   Preferências    [→]

Each item: p-4, flex items-center justify-between, tap → push screen
```

---

## SCR-SET-PROFILE / SECURITY / NOTIF / BANKS / PREFS

Each is a **push screen** from settings:

**Profile**: App bar "← Perfil", Avatar upload (centered, w-20 h-20), Name input, Email display, Save button (sticky footer)

**Security**: App bar "← Segurança", Current password → New password + strength bar → Confirm → Submit (sticky footer)

**Notifications**: App bar "← Notificações", Toggle list (same as desktop but full-width)

**Bank Accounts**: App bar "← Contas Bancárias" | [+] button, Account cards with swipe-to-delete, Add/Edit via bottom sheet

**Preferences**: App bar "← Preferências", Theme toggle + Currency selector

---

## SCR-SUPPORT: Suporte (Mobile)

**Route**: `/app/support`
**App bar**: "← Suporte"

```
Search (px-4, mb-4):
  🔍 "Buscar ajuda..."

FAQ Accordion (px-4):
  Sections with expandable items
  Touch-friendly: min 44px tap target per item

Contact Card (bg-card rounded-xl p-4 mx-4 mt-6):
  "Precisa de ajuda?"
  "suporte@cryptofolio.com.br"
  [Enviar email] (outline, w-full)
```

---

## SCR-404: Página Não Encontrada (Mobile)

Full-screen centered, no tab bar:
- Large "404" or illustration
- Title + description
- [Voltar ao início] button (primary, w-full, max-w-xs)

---

## Screen Coverage Table

| Screen ID | Mobile Pattern | Gesture Notes | Parity with Apollo |
|-----------|---------------|---------------|-------------------|
| SCR-LANDING | Scroll, stacked cards | — | Full parity |
| SCR-AUTH-LOGIN | Full-screen form | Auto-focus email | Full parity |
| SCR-AUTH-SIGNUP | Full-screen form | Auto-focus name | Full parity |
| SCR-AUTH-FORGOT | Full-screen form | — | Full parity |
| SCR-AUTH-RESET | Full-screen form | — | Full parity |
| SCR-DASHBOARD | Tab root, scroll | Pull-to-refresh | Full parity |
| SCR-WALLET | Tab root, card list | Pull-to-refresh | Table → cards |
| SCR-WALLET-DETAIL | Push stack | Pull-to-refresh | Table → cards |
| SCR-DEPOSIT | Push stack | — | Full parity |
| SCR-DEPOSIT-SUCCESS | Bottom sheet | — | Modal → sheet |
| SCR-CONVERT | Tab root | Keyboard-aware | Full parity |
| SCR-CONVERT-SUCCESS | Bottom sheet | — | Modal → sheet |
| SCR-WITHDRAW | Push stack | Keyboard-aware | Full parity |
| SCR-WITHDRAW-SUCCESS | Bottom sheet | — | Modal → sheet |
| SCR-ALERTS | Push stack | — | Grid → list |
| SCR-ALERT-CREATE | Bottom sheet | — | Modal → sheet |
| SCR-HISTORY | Push stack | Pull-to-refresh, filter chips | Table → cards |
| SCR-HISTORY-DETAIL | Bottom sheet | — | Modal → sheet |
| SCR-SETTINGS | Push stack | — | Split → list |
| SCR-SET-PROFILE | Push stack | — | Full parity |
| SCR-SET-SECURITY | Push stack | — | Full parity |
| SCR-SET-NOTIF | Push stack | — | Full parity |
| SCR-SET-BANKS | Push stack | Swipe-to-delete | Full parity |
| SCR-SET-PREFS | Push stack | — | Full parity |
| SCR-SUPPORT | Push stack | — | Full parity |
| SCR-404 | Full-screen | — | Full parity |
